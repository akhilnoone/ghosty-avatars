import { useEffect, useRef, useMemo, CSSProperties } from "react";
import { useRive, Layout, Fit, Alignment } from "@rive-app/react-canvas";
import { ViewModelInstance } from "@rive-app/canvas";
import { deriveTraits, DEFAULT_COLORS } from "./traits";
import { hexToRiveColor } from "./color";

import DEFAULT_RIV_SRC from "./assets/avatar.riv";

export interface GhostyAvatarProps {
  /** String to generate avatar from (username, email, UUID, etc.) */
  name: string;
  /** Avatar size in pixels. Default: 40 */
  size?: number;
  /** Custom color palette (hex strings without #). Default: built-in palette */
  colors?: readonly string[];
  /** Path to the .riv file. Default: bundled avatar.riv */
  src?: string;
  /** Name of the state machine in the Rive file. Default: "State Machine 1" */
  stateMachine?: string;
  /** Name of the View Model. Default: "AvatarVM" */
  viewModel?: string;
  /** CSS class name for the container */
  className?: string;
  /** CSS style overrides for the container */
  style?: CSSProperties;
  /** Border radius. Default: "50%" (circle) */
  borderRadius?: string | number;
  /** Font size of the initial letter in the Rive animation. Default: 66 */
  initialLetterSize?: number;
  /**
   * Accessible label for the avatar.
   * Defaults to "Avatar for {name}". Override for custom descriptions.
   * Pass an empty string to mark as decorative (aria-hidden).
   */
  label?: string;
}

export function GhostyAvatar({
  name,
  size = 40,
  colors = DEFAULT_COLORS,
  src,
  stateMachine = "State Machine 1",
  viewModel = "AvatarVM",
  className,
  style,
  borderRadius = "50%",
  initialLetterSize = 66,
  label,
}: GhostyAvatarProps) {
  const traits = useMemo(() => deriveTraits(name.trim() || "?", colors), [name, colors]);
  const instanceRef = useRef<ViewModelInstance | null>(null);

  // Detect prefers-reduced-motion (WCAG 2.3.3 / 2.2.2)
  const reducedMotion = useRef(
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false
  );

  const { rive, RiveComponent } = useRive({
    src: src ?? DEFAULT_RIV_SRC,
    stateMachines: stateMachine,
    autoplay: !reducedMotion.current,
    layout: new Layout({ fit: Fit.Contain, alignment: Alignment.TopCenter }),
  });

  // Keep reduced-motion preference in sync.
  // rive is in deps so the handler is re-registered once Rive loads,
  // ensuring rive?.pause() / rive?.play() are never stale.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => {
      reducedMotion.current = e.matches;
      const inputs = rive?.stateMachineInputs(stateMachine);
      const isBlinking = inputs?.find(i => i.name === "isBlinking");
      if (isBlinking) isBlinking.value = !e.matches;
      if (e.matches) rive?.pause();
      else rive?.play();
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [rive, stateMachine]);

  // Bind the VM instance once when Rive loads.
  // traits and initialLetterSize are included so the latest values
  // are applied at bind time without needing separate refs.
  useEffect(() => {
    if (!rive || instanceRef.current) return;

    const vm = rive.viewModelByName(viewModel);
    if (!vm) {
      console.warn(`[ghosty-avatars] View Model "${viewModel}" not found`);
      return;
    }

    const instance = vm.defaultInstance();
    if (!instance) {
      console.warn(`[ghosty-avatars] defaultInstance() returned null for "${viewModel}"`);
      return;
    }

    instanceRef.current = instance;
    rive.bindViewModelInstance(instance);

    const letterProp = instance.string("initialLetter");
    if (letterProp) letterProp.value = traits.initial;
    const colorProp = instance.color("bgColour");
    if (colorProp) colorProp.value = hexToRiveColor(traits.bgColor);
    const sizeProp = instance.number("initialLetterSize");
    if (sizeProp) sizeProp.value = initialLetterSize;

    // Only enable blinking if user hasn't requested reduced motion (WCAG 2.2.2)
    if (!reducedMotion.current) {
      const inputs = rive.stateMachineInputs(stateMachine);
      const isBlinking = inputs?.find(i => i.name === "isBlinking");
      if (isBlinking) isBlinking.value = true;
    }
  }, [rive, viewModel, stateMachine, traits, initialLetterSize]);

  // Update VM properties whenever traits or letter size change
  useEffect(() => {
    const instance = instanceRef.current;
    if (!instance) return;

    const letterProp = instance.string("initialLetter");
    if (letterProp) letterProp.value = traits.initial;

    const colorProp = instance.color("bgColour");
    if (colorProp) colorProp.value = hexToRiveColor(traits.bgColor);

    const sizeProp = instance.number("initialLetterSize");
    if (sizeProp) sizeProp.value = initialLetterSize;
  }, [traits, initialLetterSize]);

  // Decorative mode: pass label="" to hide from screen readers
  const isDecorative = label === "";
  const accessibleLabel = isDecorative ? undefined : (label ?? `Avatar for ${name}`);

  return (
    <div
      className={className}
      style={{
        width: size,
        height: size,
        borderRadius,
        overflow: "hidden",
        display: "inline-flex",
        flexShrink: 0,
        ...style,
      }}
      role={isDecorative ? undefined : "img"}
      aria-label={accessibleLabel}
      aria-hidden={isDecorative ? true : undefined}
    >
      {/* Hide canvas from screen readers — the wrapper div carries the a11y role */}
      <RiveComponent
        style={{ width: "100%", height: "100%" }}
        aria-hidden="true"
      />
    </div>
  );
}

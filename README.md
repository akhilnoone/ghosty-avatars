# Ghosty Avatars

Deterministic animated avatars powered by [Rive](https://rive.app). Same name = same face, always.

Drop-in avatar component with eye-blink animations, deterministic colors, and zero randomness. Pass any string — username, email, UUID — and get a unique, consistent, animated avatar.

## Install

```bash
npm i ghosty-avatars @rive-app/react-canvas
```

## Usage

```tsx
import { GhostyAvatar } from "ghosty-avatars";

<GhostyAvatar name="alice" />
<GhostyAvatar name="bob" size={64} />
<GhostyAvatar name="charlie@example.com" />
```

That's it. Same name always produces the same avatar.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | *required* | String to generate avatar from |
| `size` | `number` | `40` | Avatar size in pixels |
| `colors` | `string[]` | built-in palette | Custom color palette (hex without `#`) |
| `borderRadius` | `string \| number` | `"50%"` | Border radius of the container |
| `initialLetterSize` | `number` | `66` | Font size of the initial letter |
| `className` | `string` | — | CSS class for the container |
| `style` | `CSSProperties` | — | Style overrides |
| `src` | `string` | bundled `.riv` | Path to a custom `.riv` file |
| `stateMachine` | `string` | `"State Machine 1"` | State machine name in the Rive file |
| `viewModel` | `string` | `"AvatarVM"` | View Model name in the Rive file |

## How it works

1. Your `name` string is hashed using djb2 to a deterministic 32-bit integer
2. The hash selects a color from the palette
3. The first character of `name` becomes the avatar's initial letter
4. These values are pushed to the Rive View Model (`initialLetter` + `bgColour`)
5. Rive renders the animated avatar with eye-blink animations

Same input → same hash → same color + letter → same avatar. Always.

## Using the utilities standalone

If you're building for a non-React platform, you can use the core utilities directly:

```ts
import { deriveTraits, hexToRiveColor } from "ghosty-avatars";

const traits = deriveTraits("alice");
// { initial: "A", bgColor: "4CAF86", hash: 2943506961 }

// Use with any Rive runtime:
instance.string("initialLetter").value = traits.initial;
instance.color("bgColour").value = hexToRiveColor(traits.bgColor);
```

## Rive View Model contract

The `.riv` file expects a View Model named `AvatarVM` with:

| Property | Type | Description |
|----------|------|-------------|
| `initialLetter` | String | The initial letter displayed on the avatar |
| `bgColour` | Color | Background / body color of the avatar |
| `initialLetterSize` | Number | Font size of the initial letter |

## Custom Rive file

You can supply your own `.riv` file as long as it follows the View Model contract above:

```tsx
<GhostyAvatar name="alice" src="/my-custom-avatar.riv" />
```

## License

MIT — [Akhil Noone](https://www.linkedin.com/in/akhil-noone)

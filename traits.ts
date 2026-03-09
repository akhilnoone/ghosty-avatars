import { stringHash } from "./hash";

/**
 * Default color palette.
 * Each color is a hex string (without #).
 * The hash picks one deterministically.
 */
export const DEFAULT_COLORS = [
  "E8624A", // coral
  "5B8AF0", // periwinkle
  "4CAF86", // emerald
  "F0A030", // amber
  "9B6FE8", // lavender
  "E8734A", // tangerine
  "3BBFB0", // seafoam
  "E85B8A", // rose
  "6BAF4A", // sage
  "4A8FE8", // sky
  "D4654A", // terracotta
  "7B6FE8", // violet
  "EF4444", // red
  "14B8A6", // teal
  "EC4899", // pink
  "EAB308", // yellow
  "6366F1", // indigo
  "F97316", // orange
  "22C55E", // green
  "A855F7", // purple
] as const;

export interface AvatarTraits {
  /** First character of the name, uppercased */
  initial: string;
  /** Background color as hex (without #), e.g. "C24B4B" */
  bgColor: string;
  /** The raw 32-bit hash value */
  hash: number;
}

/**
 * Derives deterministic avatar traits from any string.
 * Same input = same traits, always.
 */
export function deriveTraits(
  name: string,
  colors: readonly string[] = DEFAULT_COLORS
): AvatarTraits {
  const hash = stringHash(name);
  const match = name.match(/[a-zA-Z0-9]/);
  const initial = match ? match[0].toUpperCase() : "?";
  const colorIndex = hash % colors.length;
  const bgColor = colors[colorIndex];

  return {
    initial,
    bgColor,
    hash,
  };
}

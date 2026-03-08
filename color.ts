/**
 * Converts a hex color string (e.g. "C24B4B") to a Rive-compatible
 * ARGB integer that the View Model color property expects.
 *
 * Rive colors are 32-bit integers in ARGB format:
 * 0xAARRGGBB
 */
export function hexToRiveColor(hex: string, alpha = 0xff): number {
  // Strip # if present
  const clean = hex.replace(/^#/, "");

  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);

  // ARGB packed integer
  return ((alpha << 24) | (r << 16) | (g << 8) | b) >>> 0;
}

/**
 * Converts a Rive ARGB integer back to a hex string (without #).
 */
export function riveColorToHex(color: number): string {
  const r = (color >> 16) & 0xff;
  const g = (color >> 8) & 0xff;
  const b = color & 0xff;

  return [r, g, b].map((c) => c.toString(16).padStart(2, "0")).join("");
}

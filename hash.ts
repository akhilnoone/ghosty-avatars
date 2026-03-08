/**
 * Deterministic hash function (djb2).
 * Same input always produces the same unsigned 32-bit integer.
 */
export function stringHash(str: string): number {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash + str.charCodeAt(i)) | 0;
  }
  return hash >>> 0;
}

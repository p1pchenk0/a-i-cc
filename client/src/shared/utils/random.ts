export function getRandomBoolean(chance: number = 0.5): boolean {
  const threshold = 256 * (1 - chance);

  return crypto.getRandomValues(new Uint8Array(1))[0] > threshold;
}

export function getRandomInteger(min: number, max: number): number {
  return (Math.random() * (max - min) + min) | 0;
}

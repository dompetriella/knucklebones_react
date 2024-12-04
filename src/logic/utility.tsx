export function generateRandomInt({
  min = 0,
  max,
}: {
  min?: number;
  max: number;
}) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function waitRandomDelay(
  minMiliSeconds: number,
  maxMiliSeconds: number
): Promise<void> {
  const delay =
    Math.random() * (maxMiliSeconds - minMiliSeconds) + minMiliSeconds;
  return new Promise((resolve) => setTimeout(resolve, delay));
}

export function alterHexColorOpacity(hex: string, opacity: number): string {
  // Remove the hash if it exists
  const sanitizedHex = hex.replace("#", "");

  // Parse the red, green, and blue values
  const r = parseInt(sanitizedHex.substring(0, 2), 16);
  const g = parseInt(sanitizedHex.substring(2, 4), 16);
  const b = parseInt(sanitizedHex.substring(4, 6), 16);

  // Return the RGBA string
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

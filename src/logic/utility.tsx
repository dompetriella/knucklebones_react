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

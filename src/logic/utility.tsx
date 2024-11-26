export function generateRandomInt({
  min = 0,
  max,
}: {
  min?: number;
  max: number;
}) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

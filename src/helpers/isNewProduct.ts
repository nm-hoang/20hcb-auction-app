/**
 * Compare created time and current time
 * @param createdAt in timestamp format
 * @param minutes
 * @returns boolean
 */
export function isNewProduct(createdAt: string, minutes: number = 5): boolean {
  const createdAtTimestamp = new Date(createdAt).getTime();
  const nowTimestamp = new Date().getTime();
  const fiveMinutes = 1000 * 60 * minutes;

  return (nowTimestamp - createdAtTimestamp) < fiveMinutes;
}

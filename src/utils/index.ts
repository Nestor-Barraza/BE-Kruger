export function getExpiresInHours(expiresIn: string): number {
  if (!expiresIn) {
    throw new Error("expiresIn value is not provided");
  }
  const expiresInHours = parseInt(expiresIn, 10);
  if (isNaN(expiresInHours)) {
    throw new Error("expiresIn value is not a valid number");
  }
  return expiresInHours;
}

export function getExpiresInMinutes(expiresIn: string): number {
  if (!expiresIn) {
    throw new Error("expiresIn value is not provided");
  }
  const expiresInMinutes = parseInt(expiresIn, 10) * 60;
  if (isNaN(expiresInMinutes)) {
    throw new Error("expiresIn value is not a valid number");
  }
  return expiresInMinutes;
}

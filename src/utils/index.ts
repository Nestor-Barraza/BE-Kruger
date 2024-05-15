export function getExpiresInHours(expiresIn: string): string {
  if (!expiresIn) {
    throw new Error("expiresIn value is not provided");
  }

  const expiresInHours = parseInt(expiresIn, 10);
  if (isNaN(expiresInHours)) {
    throw new Error("expiresIn value is not a valid number");
  }

  return `${expiresInHours}h`;
}

export function getExpiresInMinutes(expiresIn: string): string {
  if (!expiresIn) {
    throw new Error("expiresIn value is not provided");
  }

  const expiresInMinutes = parseInt(expiresIn, 10);
  if (isNaN(expiresInMinutes)) {
    throw new Error("expiresIn value is not a valid number");
  }

  return `${expiresInMinutes}m`;
}

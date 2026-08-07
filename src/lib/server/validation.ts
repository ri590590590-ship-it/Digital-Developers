export function validateEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function sanitizeString(value: string | null | undefined): string {
  return (value || '').trim();
}

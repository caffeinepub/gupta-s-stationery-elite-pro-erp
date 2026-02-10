export function getCurrentDate(): string {
  return new Date().toISOString().split('T')[0];
}

export function getCurrentTime(): string {
  return new Date().toLocaleTimeString();
}

export function getCurrentDateString(): string {
  return new Date().toLocaleDateString();
}

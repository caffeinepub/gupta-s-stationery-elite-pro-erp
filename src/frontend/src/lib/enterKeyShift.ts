export function handleEnterKeyShift(
  e: React.KeyboardEvent,
  nextId: string,
  onSubmit?: () => void
): void {
  if (e.key === 'Enter') {
    e.preventDefault();
    if (onSubmit) {
      onSubmit();
    } else {
      const nextElement = document.getElementById(nextId);
      if (nextElement) {
        nextElement.focus();
      }
    }
  }
}

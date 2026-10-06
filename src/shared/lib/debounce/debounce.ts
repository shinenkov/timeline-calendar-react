export function debounce<Args extends unknown[]>(
  func: (...args: Args) => void,
  ms: number,
): (...args: Args) => void {
  let timeout: ReturnType<typeof setTimeout> | undefined;

  return function (...args: Args) {
    if (timeout !== undefined) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), ms);
  };
}

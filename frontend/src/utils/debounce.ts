export function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): {
  (...args: Parameters<T>): void;
  cancel: () => void;
} {
  let timeoutId: NodeJS.Timeout;

  const debounced = (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, wait);
  };

  debounced.cancel = () => {
    clearTimeout(timeoutId);
    timeoutId = null as any; 
  };

  return debounced;
}

// Wrapper de localStorage con try/catch: en modo privado o con almacenamiento bloqueado,
// getItem/setItem lanzan excepción. Sin este guard, un throw frena el resto del script.

export const storage = {
  get(key: string): string | null {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set(key: string, value: string): void {
    try {
      localStorage.setItem(key, value);
    } catch {
      /* noop */
    }
  },
  remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch {
      /* noop */
    }
  },
};

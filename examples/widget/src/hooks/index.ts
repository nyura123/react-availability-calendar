import { useState, useCallback } from 'react';

export function useAsyncHandler<T>(handler: (...args: any[]) => T) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const handlerWrapper = useCallback(
    async (...args: any[]) => {
      try {
        setError(null);
        setLoading(true);
        const res = await handler(...args);
        return res;
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    },
    [handler]
  );

  return { handlerWrapper, loading, error };
}

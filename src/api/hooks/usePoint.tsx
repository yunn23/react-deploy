// src/api/hooks/usePoint.ts
import { useEffect,useState } from 'react';

import { fetchInstance } from '../../api/instance';

export const usePoint = () => {
  const [point, setPoint] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPoint = async () => {
    try {
      setLoading(true);
      const response = await fetchInstance().get('/api/points');
      setPoint(response.data);
    } catch (err) {
      setError('포인트를 가져오는데 실패했습니다');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPoint();
  }, []);

  return { point, loading, error, fetchPoint };
};

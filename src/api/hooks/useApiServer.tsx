// useApiServer.tsx
import { useEffect, useState } from 'react';

import type { ApiServerkey } from '../instance';
import { queryClient } from '../instance'; // queryClient import 추가
import { changeApiServer } from '../instance';

export const useApiServer = () => {
  const [apiServer, setApiServer] = useState<ApiServerkey>('server1');

  useEffect(() => {
    changeApiServer(apiServer);
    queryClient.invalidateQueries(); // 모든 쿼리 무효화
  }, [apiServer]);

  const handleChangeApiServer = (serverKey: ApiServerkey) => {
    setApiServer(serverKey);
  };

  return {
    apiServer,
    changeApiServer: handleChangeApiServer,
  };
};

// useApiServer.tsx
import { useState } from 'react';

import type { ApiServerkey } from '../instance';
import { changeApiServer } from '../instance';

// API 서버 선택 상태를 관리하는 훅
export const useApiServer = () => {
  const [apiServer, setApiServer] = useState<ApiServerkey>('server1'); // 초기값 수정

  const handleChangeApiServer = (serverKey: ApiServerkey) => {
    changeApiServer(serverKey); // API 서버 변경 함수 호출
    setApiServer(serverKey); // 상태 업데이트
  };

  return {
    apiServer,
    changeApiServer: handleChangeApiServer, // 변경된 이름으로 변경
  };
};

// src/components/ApiServerSelector.tsx
import React, { useState } from 'react';

import type { ApiServerkey } from '../../../../api/instance';
import { changeApiServer } from '../../../../api/instance';

const apiServerOptions: { key: ApiServerkey; label: string }[] = [
  { key: 'server1', label: '지연우' },
  { key: 'server2', label: '박규현' },
  { key: 'server3', label: '김보민' },
  { key: 'server4', label: '정호성' },
  { key: 'server5', label: 'server' },
];

const ApiSelection: React.FC = () => {
  const [selectedServer, setSelectedServer] = useState<ApiServerkey | ''>('');

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSelectedServer = event.target.value as ApiServerkey;
    setSelectedServer(newSelectedServer);
    changeApiServer(newSelectedServer);
    console.log('Selected server:', newSelectedServer);
  };

  return (
    <div>
      <label htmlFor="api-server-select"></label>
      <select
        id="api-server-select"
        value={selectedServer}
        onChange={handleChange}
      >
        <option value="">
          백엔드 API 선택
        </option>
        {apiServerOptions.map((option) => (
          <option key={option.key} value={option.key}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ApiSelection;

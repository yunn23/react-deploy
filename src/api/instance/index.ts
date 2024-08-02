import { QueryClient } from '@tanstack/react-query';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import axios from 'axios';

import { authSessionStorage } from '@/utils/storage';

// API 서버 목록
const apiServers = {
  server1: 'https://api.example.com',
  server2: 'http://43.201.112.200:8080',
  server3: 'https://api.example.com',
  server4: 'https://api.example.com',
  server5: 'https://api.example.com',
};

// 타입 정의
export type ApiServerkey = keyof typeof apiServers;

// 현재 선택된 API 서버의 기본 URL
let currentBaseURL = apiServers.server1;

export let BASE_URL = currentBaseURL

// Axios 인스턴스 생성 함수
const initInstance = (config: AxiosRequestConfig): AxiosInstance => {
  const instance = axios.create({
    timeout: 5000,
    ...config,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...config.headers,
    },
  });

  return instance;
};

// fetchInstance 생성 함수
export const fetchInstance = () => initInstance({
  baseURL: BASE_URL,
});

// QueryClient 설정
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnMount: true,
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
    },
  },
});

// fetchWithTokenInstance 생성 함수
const initFetchWithTokenInstance = () => {
  const instance = initInstance({
    baseURL: BASE_URL,
  });

  instance.interceptors.request.use((config) => {
    const token = authSessionStorage.get();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return instance;
};

// fetchWithTokenInstance를 생성하는 함수
export const fetchWithTokenInstance = () => initFetchWithTokenInstance();

// API 서버 변경 함수
export const changeApiServer = (serverKey: ApiServerkey) => {
  currentBaseURL = apiServers[serverKey];
  BASE_URL = currentBaseURL
  fetchInstance().defaults.baseURL = BASE_URL
  fetchWithTokenInstance().defaults.baseURL = BASE_URL

  console.log(`API 서버가 변경되었습니다: ${serverKey} ${BASE_URL}`)
};

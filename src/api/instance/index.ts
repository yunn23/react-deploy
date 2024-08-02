import { QueryClient } from '@tanstack/react-query';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import axios from 'axios';

import { authSessionStorage } from '@/utils/storage';


// API 서버 목록
const apiServers = {
  server1: 'http://43.201.112.200:8080',  // 지연우
  server2: 'http://3.35.176.195:8080',  // 박규현
  server3: 'http://13.124.134.51:8080', // 김보민
  server4: 'http://13.125.10.230:8080', // 정호성
  server5: 'https://api.example.com',
};

// 타입 정의
export type ApiServerkey = keyof typeof apiServers;

// 현재 선택된 API 서버의 기본 URL
let currentBaseURL = apiServers.server1;

export let BASE_URL = currentBaseURL

// Axios 인스턴스
let axiosInstance: AxiosInstance;
let axiosInstanceWithToken: AxiosInstance;

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


// 인스턴스 초기화 함수
const initializeInstances = () => {
  axiosInstance = initInstance({
    baseURL: BASE_URL,
  });

  axiosInstanceWithToken = initInstance({
    baseURL: BASE_URL,
  });

  axiosInstanceWithToken.interceptors.request.use((config) => {
    const token = authSessionStorage.get();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
};

// 초기화 호출
initializeInstances();

// fetchInstance 반환 함수
export const fetchInstance = () => axiosInstance;

// fetchWithTokenInstance 반환 함수
export const fetchWithTokenInstance = () => axiosInstanceWithToken;


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

// API 서버 변경 함수
export const changeApiServer = (serverKey: ApiServerkey) => {
  currentBaseURL = apiServers[serverKey];
  BASE_URL = currentBaseURL;

  axiosInstance.defaults.baseURL = BASE_URL;
  axiosInstanceWithToken.defaults.baseURL = BASE_URL;

  console.log(`API 서버가 변경되었습니다: ${serverKey} ${BASE_URL}`);
  console.log('axiosInstance baseURL:', axiosInstance.defaults.baseURL);
  console.log('axiosInstanceWithToken baseURL:', axiosInstanceWithToken.defaults.baseURL);
};


import { createProxyMiddleware } from 'http-proxy-middleware';

const apiServers = {
  server1: 'http://43.201.112.200:8080',
  server2: 'http://3.35.176.195:8080',
  server3: 'http://13.124.134.51:8080',
  server4: 'http://13.125.10.230:8080',
  server5: 'https://api.example.com',
};

export default function(app) {
  Object.keys(apiServers).forEach((key) => {
    app.use(
      `/api/${key}`,
      createProxyMiddleware({
        target: apiServers[key],
        changeOrigin: true,
        pathRewrite: {
          [`^/api/${key}`]: '', // 프록시 경로에서 서버 경로로 변환
        },
        logLevel: 'debug', // 로그를 통해 디버깅
      })
    );
  });
};

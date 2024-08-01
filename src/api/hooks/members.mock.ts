import { rest } from 'msw';

export const membersMockHandler = [
  // 회원 가입 핸들러
  rest.post('/api/members/register', (req, res, ctx) => {
    const { email, password } = req.body as { email: string, password: string };

    // 변수 사용 예: 콘솔에 출력
    console.log('회원 가입 요청', { email, password });

    // 회원 가입 성공 응답 모킹
    return res(
      ctx.status(200),
      ctx.json({
        token: 'mock-token-for-register',
      }),
    );
  }),

  // 로그인 핸들러
  rest.post('/api/members/login', (req, res, ctx) => {
    const { email, password } = req.body as { email: string, password: string };

    // 변수 사용 예: 콘솔에 출력
    console.log('로그인 요청', { email, password });

    // 로그인 성공 응답 모킹
    return res(
      ctx.status(200),
      ctx.json({
        token: 'mock-token-for-login',
      }),
    );
  }),
];

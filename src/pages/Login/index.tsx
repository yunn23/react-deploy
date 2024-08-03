import styled from '@emotion/styled';
import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import { fetchInstance } from '@/api/instance';
import KAKAO_LOGO from '@/assets/kakao_logo.svg';
import { Button } from '@/components/common/Button';
import { UnderlineTextField } from '@/components/common/Form/Input/UnderlineTextField';
import { Spacing } from '@/components/common/layouts/Spacing';
import { RouterPath } from '@/routes/path';
import { breakpoints } from '@/styles/variants';
import { authSessionStorage } from '@/utils/storage';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [queryParams] = useSearchParams();

  const isValidEmail = (emailValue: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailValue);
  };

  const handleConfirm = async () => {
    if (!email || !password) {
      alert('아이디와 비밀번호를 입력해주세요.');
      return;
    }

    if (!isValidEmail(email)) {
      alert('유효하지 않는 이메일 형식입니다.');
      return;
    }

    console.log('로그인 시도:', { email, password });

    try {
      const axiosInstance = fetchInstance();
      const response = await axiosInstance.post('/api/members/login', {
        email,
        password,
      });

      console.log('로그인 응답:', response.data);

      // 헤더에서 Authorization 토큰 추출
      const authHeader = response.headers.authorization;
      if (authHeader) {
        const token = authHeader.replace('Bearer ', '');
        authSessionStorage.set(token);
        const redirectUrl = queryParams.get('redirect') ?? `${window.location.origin}/`;
        console.log('리다이렉트 URL:', redirectUrl);
        window.location.replace(redirectUrl);
      } else {
        console.error('Authorization 헤더에 토큰이 포함되지 않음');
      }
    } catch (error) {
      console.error('로그인 실패:', error);
      alert('로그인에 실패했습니다.');
    }
  };

  return (
    <Wrapper>
      <Logo src={KAKAO_LOGO} alt="카카고 CI" />
      <FormWrapper>
        <UnderlineTextField
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Spacing />
        <UnderlineTextField
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Spacing height={{ initial: 40, sm: 60 }} />
        <Button onClick={handleConfirm}>로그인</Button>
        <Other>
          <Link to={RouterPath.join}>회원가입</Link>
        </Other>
      </FormWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Logo = styled.img`
  width: 88px;
  color: #333;
`;

const FormWrapper = styled.article`
  width: 100%;
  max-width: 580px;
  padding: 16px;

  @media screen and (min-width: ${breakpoints.sm}) {
    border: 1px solid rgba(0, 0, 0, 0.12);
    padding: 60px 52px;
  }
`;

const Other = styled.div`
  display: flex;
  margin-top: 30px;
  justify-content: center;
  align-items: center;
  color: #4C4C4C;
  text-decoration: underline;
  cursor: pointer;
`;

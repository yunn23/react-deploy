import styled from '@emotion/styled';
import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import { fetchInstance } from '@/api/instance'; // 수정된 부분
import KAKAO_LOGO from '@/assets/kakao_logo.svg';
import { Button } from '@/components/common/Button';
import { UnderlineTextField } from '@/components/common/Form/Input/UnderlineTextField';
import { Spacing } from '@/components/common/layouts/Spacing';
import { RouterPath } from '@/routes/path';
import { breakpoints } from '@/styles/variants';
import { authSessionStorage } from '@/utils/storage';

export const JoinPage = () => {
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
      alert('이메일 형식으로 입력해주세요.');
      return;
    }

    console.log('회원가입 시도:', { email, password });

    try {

      // 회원가입 요청
      const response = await fetchInstance().post('/api/members/register', {
        email,
        password,
      });

      console.log('회원가입 응답:', response.data);

      // Authorization 토큰 저장
      const token = response.headers.authorization; // Authorization 헤더에서 토큰 추출
      if (token) {
        authSessionStorage.set(token.replace('Bearer ', '')); // Bearer 스킴 제거 후 저장
      }

      // 리다이렉트
      const redirectUrl = queryParams.get('redirect') ?? `${window.location.origin}/`;
      console.log('리다이렉트 URL:', redirectUrl);
      window.location.replace(redirectUrl);

    } catch (error) {
      console.error('회원가입 실패', error);
      alert('회원가입에 실패했습니다.');
    }
  };

  return (
    <Wrapper>
      <Logo src={KAKAO_LOGO} alt="카카고 CI" />
      <FormWrapper>
        <UnderlineTextField placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Spacing />
        <UnderlineTextField
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Spacing height={{ initial: 40, sm: 60 }} />
        <Button onClick={handleConfirm}>회원가입</Button>
        <Other><Link to={RouterPath.login}>로그인</Link></Other>
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

# react-deploy
### 카카오테크 캠퍼스 FE 6주차 과제

- 질문 1. SPA 페이지를 정적 배포를 하려고 할 때 Vercel을 사용하지 않고 한다면 어떻게 할 수 있을까요?
    1) Github Pages
        - 레포지토리의 gh-pages 브랜치에 빌드된 SPA 파일이 배포됨
    2) Cloud flare Pages
        - 자동 배포 가능, CDN 및 버전 관리 지원
    3) AWS S3 + Cloudfront + Route53
        - AWS S3 버킷에 SPA 파일을 업로드하고, CloudFront를 사용하여 배포
        - AWS S3는 스토리지 서비스이고, CloudFront는 CDN 서비스
    4) Netlify
        - netlify-cli로 로컬에서 직접 배포 가능, 연속 배포 파이프라인 설정 가능

- 질문 2. CSRF나 XSS 공격을 막는 방법은 무엇일까요?
    - CSRF (Cross-Site Request Forgery) 방어 방법
        1) CSRF Token - 요청시 서비에서 발급한 토큰을 클라이언트가 요청에 포함시킴
        2) SameSite 속성을 Strict 또는 Lax로 설정하여 쿠키가 다른 사이트에서 전송되지 않도록 함
        3) CSRF 토큰을 쿠키와 요청 헤더 모두 포함시켜 검증
    - XSS (Cross-Site Scripting) 방어 방법
        1) 서버와 클아이언트 모두에서 입력값 검증
        2) 출력될 데이터는 html, js, url 등에서 안전하게 인코딩하여 스크립트 실행 방지
        3) CSP(Content Security Policy)를 사용하여 웹페이지에서 로드되는 리소스 제어 => 외부 스크립트 실행을 제한하고, 허용된 소스만 스크립트 로드하도록 함
        4) 쿠키에 HttpOnly 속성을 설정하여 js에서 접근할 수 없게 하고, Secure 속성을 설정하여 HTTPS를 통해서만 쿠키가 전송되도록 함

- 질문 3. 브라우저 렌더링 원리에 대해 설명해주세요.
    1) 리소스 요청 - 사용자가 웹 페이지 요청시 브라우저는 HTML, CSS, JS 파일을 서버에서 다운받음
    2) DOM 및 CSSOM 트리 생성 - HTML을 파싱하여 DOM 트리를, CSS를 파싱하여 CSSOM 트리를 생성함
    3) 렌더 트리 생성 - DOM과 CSSOM을 결합하여 화면에 표시될 렌더 트리 생성함
    4) 레이아웃 계산 - 각 요소의 크기와 위치 계산
    5) 페인팅 - 화면에 실제로 내용을 그림
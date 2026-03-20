# Email Notification Setup

## 1. Resend 설정
1. https://resend.com 가입
2. API Key 생성
3. raymind.ai 도메인 인증 (DNS 레코드 추가)

## 2. Supabase Edge Function 배포

```bash
# Supabase CLI 설치 (이미 있으면 스킵)
npm install -g supabase

# 로그인
supabase login

# 프로젝트 연결
supabase link --project-ref buggxqiqbvxospujibji

# Resend API Key를 시크릿으로 등록
supabase secrets set RESEND_API_KEY=re_xxxxxxxxxxxxx

# Edge Function 배포
supabase functions deploy notify-inquiry
```

## 3. 테스트
사이트에서 Contact form을 제출하면 hi@raymind.ai로 알림 이메일이 옵니다.

## Waitlist 알림도 필요하면
같은 패턴으로 `notify-waitlist` Edge Function을 추가할 수 있습니다.

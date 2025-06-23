# Firebase 방명록 설정 가이드

## 1. Firebase 프로젝트 생성

1. [Firebase 콘솔](https://console.firebase.google.com/)에 접속
2. "프로젝트 추가" 클릭
3. 프로젝트 이름 입력 (예: wedding-guestbook)
4. Google Analytics 설정 (선택사항)

## 2. Realtime Database 설정

1. Firebase 콘솔에서 "Realtime Database" 선택
2. "데이터베이스 만들기" 클릭
3. 보안 규칙 모드 선택:
   - 테스트 모드로 시작 (나중에 보안 규칙 적용)
4. 위치 선택 (asia-southeast1 권장)

## 3. 웹 앱 설정

1. Firebase 콘솔에서 "프로젝트 설정" > "일반" 탭
2. "앱" 섹션에서 웹 아이콘(</>)클릭
3. 앱 닉네임 입력
4. Firebase SDK 설정 코드 복사

## 4. 환경 변수 설정

`.env` 파일에서 다음 값들을 실제 Firebase 설정값으로 교체:

```env
VITE_FIREBASE_API_KEY=your-actual-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://your-project-default-rtdb.asia-southeast1.firebasedatabase.app/
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

**주의:** Vite 환경에서는 `VITE_` 접두사가 필요합니다.

## 5. 보안 규칙 적용

1. Firebase 콘솔에서 Realtime Database > "규칙" 탭
2. `database.rules.json` 파일의 내용을 복사하여 붙여넣기
3. "게시" 클릭

## 6. 테스트

1. `npm run dev` 실행
2. 방명록 섹션에서 글쓰기 테스트
3. Firebase 콘솔에서 데이터 확인

## 주요 기능

- ✅ 실시간 데이터 동기화
- ✅ 글 작성/수정/삭제
- ✅ 비밀번호 보호
- ✅ 입력 길이 제한 (이름 20자, 메시지 200자)
- ✅ 데이터 유효성 검증

## 문제 해결

### Firebase 연결 오류
- 환경 변수가 올바르게 설정되었는지 확인
- Firebase 프로젝트가 활성화되어 있는지 확인

### 데이터 읽기/쓰기 오류
- 보안 규칙이 올바르게 설정되었는지 확인
- Realtime Database가 활성화되어 있는지 확인

### 빌드 오류
- Firebase SDK 버전 호환성 확인
- `npm install` 재실행
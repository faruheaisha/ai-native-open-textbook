---
title: "빠른 시작 가이드"
sourceId: "07-coding/fastcampus-ai-agent-vibecoding"
sourceTitle: "FastCampus AI Agent 바이브코딩 강의"
sourceKind: "系统课程"
licenseLabel: "仅引用"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/Koomook/fastcampus-ai-agent-vibecoding"
entryUrl: "https://github.com/Koomook/fastcampus-ai-agent-vibecoding/blob/b24208b48c3945769327dbcafc2d632189369520/Part3_바이브코딩으로_Hybrid_Search_RAG_구현하기/search_app/agent_app/QUICKSTART.md"
sourceRel: "Part3_바이브코딩으로_Hybrid_Search_RAG_구현하기/search_app/agent_app/QUICKSTART.md"
rawUrl: "/raw/07-coding/fastcampus-ai-agent-vibecoding/Part3_바이브코딩으로_Hybrid_Search_RAG_구현하기/search_app/agent_app/QUICKSTART.md"
sourceSha256: "2df91e035cffa9924928735be6e981d30ed3c0073d4eb8518604783464a472ce"
pageSha256: "2df91e035cffa9924928735be6e981d30ed3c0073d4eb8518604783464a472ce"
contentMode: "local-full"
zh: ""
---

# 빠른 시작 가이드

## 1. Tavily API 키 발급 (선택사항)

웹 검색 기능을 사용하려면 Tavily API 키가 필요합니다.

1. https://tavily.com/ 접속
2. 회원가입 후 무료 API 키 발급 (월 1000건 무료)
3. `.env.local` 파일에 추가:
   ```
   TAVILY_API_KEY=tvly-your_api_key_here
   ```

> **참고**: Tavily API 키 없이도 하이브리드 검색 기능은 정상 작동합니다.

## 2. 의존성 설치

### Python 패키지
```bash
# 상위 디렉토리로 이동
cd ..

# UV로 패키지 설치
uv sync
```

### Node.js 패키지
```bash
# agent_app 디렉토리로 이동
cd agent_app

# pnpm으로 패키지 설치
pnpm install
```

## 3. 도구 테스트

백엔드 도구가 제대로 작동하는지 확인:

```bash
uv run python test_tools.py
```

**예상 결과**:
```
✅ Hybrid Search: 성공
✅ Tavily Search: 성공 (API 키가 설정된 경우)
```

## 4. 개발 서버 실행

```bash
pnpm dev
```

브라우저에서 `http://localhost:3000` 접속

## 5. Agent 사용 예시

### 대출 상품 검색
```
"의사 전용 대출 상품 추천해줘"
→ hybrid_search_tool 자동 호출
```

### 최신 금융 정보 검색 (Tavily API 키 필요)
```
"2025년 기준금리는 어떻게 되나요?"
→ tavily_search_tool 자동 호출
```

### 복합 질문
```
"의사에게 적합한 대출 상품과 현재 금리 동향을 알려줘"
→ hybrid_search_tool + tavily_search_tool 조합
```

## 문제 해결

### 1. Hybrid Search 오류
- `.env.local`에 `DATABASE_URL`이 올바르게 설정되었는지 확인
- 상위 디렉토리에서 `uv run python load_data.py` 실행하여 데이터 로드

### 2. Tavily Search 오류
- `.env.local`에 `TAVILY_API_KEY`가 올바르게 설정되었는지 확인
- https://tavily.com/ 에서 API 키 상태 확인

### 3. 프론트엔드 실행 오류
- `pnpm install` 재실행
- `node_modules` 삭제 후 재설치
- `.env.local` 파일이 agent_app 디렉토리에 있는지 확인

## 다음 단계

- [README.md](/lib/07-coding/fastcampus-ai-agent-vibecoding/Part3___Hybrid_Search_RAG__-search_app-agent_app): 전체 프로젝트 문서
- [참고 자료](/lib/07-coding/fastcampus-ai-agent-vibecoding/Part3___Hybrid_Search_RAG__-Chapter3_____Agentic_RAG__-Clip1_Workflow__Agentic____): Agent vs Workflow 개념

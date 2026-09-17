---
title: "PRD: Playwright MCP Client"
sourceId: "07-coding/fastcampus-ai-agent-vibecoding"
sourceTitle: "FastCampus AI Agent 바이브코딩 강의"
sourceKind: "系统课程"
licenseLabel: "仅引用"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/Koomook/fastcampus-ai-agent-vibecoding"
entryUrl: "https://github.com/Koomook/fastcampus-ai-agent-vibecoding/blob/b24208b48c3945769327dbcafc2d632189369520/Part2_Agent_개념과_아키텍처/Chapter4_바이브코딩으로_MCP_AI_에이전트_만들기/PRD.md"
sourceRel: "Part2_Agent_개념과_아키텍처/Chapter4_바이브코딩으로_MCP_AI_에이전트_만들기/PRD.md"
rawUrl: "/raw/07-coding/fastcampus-ai-agent-vibecoding/Part2_Agent_개념과_아키텍처/Chapter4_바이브코딩으로_MCP_AI_에이전트_만들기/PRD.md"
sourceSha256: "d82d8f63bec7c8762f947caf2aa32a3451e5b27cdf1babf5b3cfdefafdfe9391"
pageSha256: "d82d8f63bec7c8762f947caf2aa32a3451e5b27cdf1babf5b3cfdefafdfe9391"
contentMode: "local-full"
zh: ""
---

# PRD: Playwright MCP Client

## 1. 프로젝트 개요
Playwright MCP 서버와 통신하는 Python 기반 CLI MCP 클라이언트 구현

**목적**: MCP 프로토콜을 통해 브라우저 자동화 작업을 수행하는 간단한 AI 에이전트 클라이언트

## 2. 기술 스펙
- **언어**: Python 3.10+
- **패키지 관리**: uv
- **핵심 라이브러리**:
  - `mcp` (Python SDK)
  - `anthropic` (Claude API)

## 3. 핵심 요구사항

### 3.1 MCP 서버 연결
- Playwright MCP 서버와 STDIO 기반 통신
- 서버 초기화 및 세션 관리
- 비동기 처리 (asyncio)

### 3.2 AI 에이전트 통합
- Claude API를 사용한 자연어 처리
- MCP 서버의 tool만 사용하여 작업 수행
- 시스템 프롬프트:
  ```
  당신은 Playwright MCP 서버를 활용하여 웹 브라우저 자동화를 수행하는 전문가입니다.
  사용자의 요청을 분석하고 적절한 MCP tool을 선택하여 작업을 수행하세요.
  각 단계에서 어떤 tool을 사용했는지 명확히 설명하세요.
  ```

### 3.3 실행 흐름
1. MCP 서버 연결 및 초기화
2. 사용 가능한 tool 목록 조회
3. 사용자 입력 받기
4. Claude가 적절한 tool 선택 및 실행
5. 결과 출력 (사용된 tool 이름 포함)

### 3.4 CLI 인터페이스
```bash
# 기본 실행
uv run playwright-mcp-client

# 단일 명령 실행
uv run playwright-mcp-client "네이버 메인 페이지로 이동해줘"

# 대화형 모드
uv run playwright-mcp-client --interactive
```

### 3.5 출력 형식
```
[Tool: playwright_navigate]
https://www.naver.com으로 이동했습니다.

[Tool: playwright_screenshot]
스크린샷을 저장했습니다: output/screenshot.png
```

## 4. 프로젝트 구조
```
playwright-mcp-client/
├── pyproject.toml          # uv 프로젝트 설정
├── README.md               # 사용 가이드
├── src/
│   └── playwright_mcp_client/
│       ├── __init__.py
│       ├── __main__.py     # CLI 엔트리포인트
│       ├── client.py       # MCP 클라이언트
│       ├── agent.py        # Claude 에이전트
│       └── config.py       # 설정 관리
├── tests/
│   ├── __init__.py
│   ├── test_client.py      # 클라이언트 테스트
│   └── test_agent.py       # 에이전트 테스트
└── .env.example            # 환경변수 예시
```

## 5. 환경 변수
```bash
ANTHROPIC_API_KEY=sk-...
PLAYWRIGHT_MCP_SERVER_PATH=npx
PLAYWRIGHT_MCP_SERVER_ARGS=@playwright/mcp@latest
```

## 6. 제약사항
- Playwright MCP 서버가 제공하는 tool만 사용
- 외부 라이브러리 최소화 (mcp, anthropic만 사용)
- 에러 처리는 기본 수준으로 구현
- 파일 저장은 `./output` 디렉토리에만 수행

## 7. 테스트 범위
- MCP 서버 연결 테스트
- Tool 목록 조회 테스트
- 기본 tool 실행 테스트 (navigate)
- 에러 처리 테스트

## 8. 성공 기준
- [x] MCP 서버와 정상 통신
- [x] Claude를 통한 tool 호출
- [x] 사용된 tool 이름 출력
- [x] CLI로 실행 가능
- [x] 테스트 코드 작성 완료

## 9. 참고 문서
- MCP Python SDK: https://github.com/modelcontextprotocol/python-sdk
- Playwright MCP: https://github.com/microsoft/playwright-mcp
- Claude API: https://docs.anthropic.com/

---
출처:
- https://github.com/modelcontextprotocol/python-sdk
- https://github.com/microsoft/playwright-mcp

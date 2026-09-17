---
title: "PRD: LLM 기반 슬랙봇 (교육용)"
sourceId: "07-coding/fastcampus-ai-agent-vibecoding"
sourceTitle: "FastCampus AI Agent 바이브코딩 강의"
sourceKind: "系统课程"
licenseLabel: "仅引用"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/Koomook/fastcampus-ai-agent-vibecoding"
entryUrl: "https://github.com/Koomook/fastcampus-ai-agent-vibecoding/blob/b24208b48c3945769327dbcafc2d632189369520/Part5_AI_Agent_프로젝트_3개/Chapter1_바이브코딩으로_CS_슬랙봇_구현하기/PRD.md"
sourceRel: "Part5_AI_Agent_프로젝트_3개/Chapter1_바이브코딩으로_CS_슬랙봇_구현하기/PRD.md"
rawUrl: "/raw/07-coding/fastcampus-ai-agent-vibecoding/Part5_AI_Agent_프로젝트_3개/Chapter1_바이브코딩으로_CS_슬랙봇_구현하기/PRD.md"
sourceSha256: "c0c721946ee03629e08fa7b0c298b3981676b085b310ac9281b57943c6c5fb0b"
pageSha256: "c0c721946ee03629e08fa7b0c298b3981676b085b310ac9281b57943c6c5fb0b"
contentMode: "local-full"
zh: ""
---

# PRD: LLM 기반 슬랙봇 (교육용)

## 1. 프로젝트 개요

### 목적
LLM을 활용한 슬랙봇의 가장 단순한 형태를 구현하여, 개발자가 LLM 호출과 Google Cloud Run 배포의 핵심 개념을 학습할 수 있도록 한다.

### 핵심 원칙
- **단순성 우선**: 프로덕션 레벨의 복잡성보다 학습 용이성을 우선시
- **교육용 설계**: 학생들이 코드를 읽고 이해하기 쉽도록 구성
- **최소한의 인프라**: 추가 서비스 의존성 최소화

## 2. 기술 스택

| 구성요소 | 기술 | 비고 |
|---------|------|------|
| 언어 | Python 3.11+ | 타입 힌팅 활용 |
| LLM | Claude Haiku 4.5 | Claude Agent SDK 사용 |
| 패키지 관리 | uv | 빠르고 간단한 의존성 관리 |
| 웹 프레임워크 | FastAPI | 비동기 처리, 자동 문서화 |
| 컨테이너 | Docker | Cloud Run 배포용 |
| 배포 플랫폼 | Google Cloud Run | 서버리스 HTTP 서비스 |
| 설정 관리 | .env 파일 | 간단한 환경변수 관리 |

### 채택하지 않는 기술 (교육 목적)
- ❌ Pub-Sub 아키텍처
- ❌ Google Secret Manager
- ❌ Redis/Memcached (상태 저장)
- ❌ Celery/Background Workers
- ❌ Slack Socket Mode (WebSocket)

## 3. 핵심 기능

### 3.1 멘션 감지 및 응답
**사용자 시나리오**:
```
사용자: @slackbot Python으로 피보나치 수열 구현해줘
봇: [스레드로 응답]
```

**동작 흐름**:
1. 슬랙에서 `app_mention` 이벤트 수신
2. 이벤트 검증 (서명 확인)
3. 즉시 HTTP 200 응답 (3초 타임아웃 회피)
4. 백그라운드 태스크에서 처리

### 3.2 즉각적인 피드백
**요구사항**: LLM 호출 전 "생각 중..." 메시지 표시

**구현 방법**:
```python
# 1. "Thinking..." 메시지 먼저 전송
placeholder = slack_client.chat_postMessage(
    channel=channel_id,
    thread_ts=thread_ts,
    text="🤔 Thinking..."
)

# 2. LLM 호출 후 메시지 업데이트
slack_client.chat_update(
    channel=channel_id,
    ts=placeholder["ts"],
    text=llm_response
)
```

### 3.3 스레드 기반 대화
**맥락 유지 전략**:
- 스레드의 **최근 10개 메시지**만 로드 (토큰 절약)
- `conversations.replies` API 사용
- `thread_ts`로 대화 그룹화

**데이터 흐름**:
```
슬랙 스레드 → 최근 10개 메시지 추출 → LLM 컨텍스트 구성 → 응답 생성 → 스레드에 추가
```

### 3.4 MCP 도구 호출 가시화
**요구사항**: 도구 사용 과정을 투명하게 표시

**예시 출력**:
```
🤔 Thinking...

🔧 Using tool: web_search
Query: "Python fibonacci implementation"

📊 Tool result: [검색 결과 요약]

✅ [최종 답변]
```

**구현 접근**:
- Claude Agent SDK의 스트리밍 이벤트 수신
- `tool_use` 이벤트 감지 시 스레드에 메시지 추가
- `tool_result` 이벤트 감지 시 결과 메시지 추가

## 4. 아키텍처

### 4.1 전체 구조
```
[Slack] --HTTPS--> [Cloud Run: FastAPI] --API--> [Claude API]
                           |
                           v
                    [In-Memory State]
```

### 4.2 요청 처리 흐름
```mermaid
sequenceDiagram
    participant U as User
    participant S as Slack
    participant CR as Cloud Run
    participant C as Claude API

    U->>S: @slackbot 질문
    S->>CR: POST /slack/events (app_mention)
    CR->>CR: 서명 검증
    CR->>S: 200 OK (즉시)
    CR->>S: "Thinking..." 메시지
    CR->>S: conversations.replies (스레드 히스토리)
    CR->>C: LLM 호출 (with context)
    C-->>CR: 스트리밍 응답
    CR->>S: chat.update (실시간 업데이트)
    C->>CR: [Tool use 이벤트]
    CR->>S: "🔧 Using tool..." 메시지
    C->>CR: 최종 응답
    CR->>S: chat.update (최종 답변)
```

### 4.3 핵심 설계 결정

#### A. Events API vs Socket Mode
**선택**: Events API + Request URL

**이유**:
- ✅ HTTP 웹훅 패턴으로 이해하기 쉬움
- ✅ Cloud Run이 HTTPS 기본 제공
- ✅ 터널링/WebSocket 불필요
- ✅ 상태 비저장 서비스

#### B. 3초 타임아웃 처리
**문제**: Slack은 3초 내 응답 없으면 재시도

**해결책**:
```python
@app.post("/slack/events")
async def handle_events(request: Request):
    # 1. URL 검증 챌린지 처리
    if body.get("type") == "url_verification":
        return {"challenge": body["challenge"]}

    # 2. 서명 검증
    verify_slack_signature(request)

    # 3. 백그라운드 태스크 생성
    asyncio.create_task(process_mention(event))

    # 4. 즉시 200 반환 (< 1초)
    return {"ok": True}
```

#### C. LLM 타임아웃 관리
**Cloud Run 설정**:
- Request timeout: 60초 (HTTP 요청용)
- Container timeout: 300초 (백그라운드 태스크용)
- Concurrency: 1 (디버깅 용이성)

**LLM 호출 타임아웃**: 120초 (충분한 여유)

#### D. Slack API Rate Limiting
**문제**: `chat.update` 빈번한 호출 시 Rate Limit

**해결책**:
- 스트리밍 델타를 **1-2초 간격**으로 배치 처리
- 또는 **300자마다** 한 번씩 업데이트
- 최종 응답은 반드시 전송

```python
UPDATE_INTERVAL = 2.0  # seconds
last_update = time.time()
accumulated_text = ""

for chunk in llm_stream:
    accumulated_text += chunk

    if time.time() - last_update > UPDATE_INTERVAL:
        slack_client.chat_update(...)
        last_update = time.time()
```

## 5. 슬랙 앱 설정

### 5.1 App Manifest (YAML)
```yaml
display_information:
  name: CS Slackbot
  description: LLM-powered customer support bot
  background_color: "#2c2d30"

features:
  bot_user:
    display_name: CS Bot
    always_online: true

oauth_config:
  scopes:
    bot:
      - app_mentions:read      # @mention 감지
      - chat:write             # 메시지 전송
      - channels:history       # 채널 히스토리 읽기
      - groups:history         # 비공개 채널 히스토리
      - im:history             # DM 히스토리
      - mpim:history           # 그룹 DM 히스토리

settings:
  event_subscriptions:
    request_url: https://your-app.run.app/slack/events
    bot_events:
      - app_mention          # @mention 이벤트

  org_deploy_enabled: false
  socket_mode_enabled: false
  token_rotation_enabled: false
```

### 5.2 수동 설정이 필요한 항목
1. **Slack App 생성**: https://api.slack.com/apps
2. **Manifest 업로드**: 위 YAML 파일 붙여넣기
3. **Request URL 설정**: Cloud Run 배포 후 URL 입력
4. **워크스페이스에 설치**: "Install to Workspace" 클릭
5. **토큰 복사**:
   - `SLACK_BOT_TOKEN` (xoxb-로 시작)
   - `SLACK_SIGNING_SECRET`

### 5.3 .env 파일 구조
```bash
# Slack
SLACK_BOT_TOKEN=xoxb-your-bot-token
SLACK_SIGNING_SECRET=your-signing-secret

# Claude
ANTHROPIC_API_KEY=sk-ant-your-api-key

# 기타
LOG_LEVEL=INFO
MAX_THREAD_MESSAGES=10
UPDATE_INTERVAL_SECONDS=2
```

## 6. 구현 가이드

### 6.1 프로젝트 구조
```
slackbot/
├── app/
│   ├── main.py              # FastAPI 엔트리포인트
│   ├── slack_handler.py     # Slack 이벤트 처리
│   ├── llm_handler.py       # Claude SDK 통합
│   ├── utils.py             # 서명 검증 등
│   └── config.py            # 환경변수 로드
├── tests/
│   ├── test_slack.py
│   └── test_llm.py
├── Dockerfile
├── .env.example
├── pyproject.toml           # uv 의존성
└── README.md
```

### 6.2 핵심 의존성
```toml
[project]
name = "cs-slackbot"
version = "0.1.0"
requires-python = ">=3.11"

dependencies = [
    "fastapi>=0.110.0",
    "uvicorn[standard]>=0.27.0",
    "slack-sdk>=3.26.0",
    "anthropic>=0.40.0",          # Claude Agent SDK
    "python-dotenv>=1.0.0",
    "pydantic>=2.6.0",
    "httpx>=0.26.0",
]
```

### 6.3 로컬 개발 환경
```bash
# 1. uv 설치
curl -LsSf https://astral.sh/uv/install.sh | sh

# 2. 의존성 설치
uv sync

# 3. ngrok으로 로컬 터널링
ngrok http 8000

# 4. ngrok URL을 Slack Request URL에 설정
# https://xxxx.ngrok.io/slack/events

# 5. 앱 실행
uv run uvicorn app.main:app --reload --port 8000
```

## 7. 시나리오별 동작

### 7.1 기본 질문 응답
```
Input:  @slackbot 파이썬 버전 확인하는 명령어는?
Output:
  🤔 Thinking...

  파이썬 버전을 확인하는 명령어는 다음과 같습니다:

  ```bash
  python --version
  # 또는
  python3 --version
  ```
```

### 7.2 MCP 도구 사용
```
Input:  @slackbot 오늘 날씨 어때?
Output:
  🤔 Thinking...

  🔧 Using tool: get_weather
  📍 Location: Seoul, Korea

  📊 Tool result:
  - Temperature: 18°C
  - Condition: Partly Cloudy

  ✅ 오늘 서울 날씨는 18도로 약간 흐립니다.
```

### 7.3 스레드 맥락 유지
```
Thread:
  [User] @slackbot 피보나치 수열 설명해줘
  [Bot]  피보나치 수열은 0, 1, 1, 2, 3, 5, 8... 입니다.

  [User] 이걸 파이썬으로 구현해줘  ← 맥락 이해 필요
  [Bot]  [피보나치 Python 코드 제공]
```

## 8. 주요 트러블슈팅

### 8.1 인증 오류
**증상**: `401 Unauthorized`

**체크리스트**:
- [ ] `SLACK_BOT_TOKEN`이 `xoxb-`로 시작하는가?
- [ ] 토큰이 최신인가? (재설치 후 갱신 필요)
- [ ] 필요한 OAuth scope가 모두 설정되었는가?

### 8.2 이벤트 중복 수신
**증상**: 동일 메시지에 여러 번 응답

**원인**:
- Slack이 3초 내 응답 못 받으면 재시도
- 백그라운드 태스크가 3초 이상 걸림

**해결**:
```python
processed_events = set()  # 메모리 캐시

async def process_mention(event: dict):
    event_id = event["event_id"]

    if event_id in processed_events:
        return  # 중복 처리 방지

    processed_events.add(event_id)
    # ... 처리 로직
```

### 8.3 서명 검증 실패
**증상**: `400 Bad Request` - Invalid signature

**원인**:
- 타임스탬프 오래됨 (5분 이상)
- `SLACK_SIGNING_SECRET` 잘못됨
- Request body를 두 번 읽음 (FastAPI)

**해결**:
```python
@app.post("/slack/events")
async def handle_events(request: Request):
    # Body를 한 번만 읽고 재사용
    body_bytes = await request.body()
    body = json.loads(body_bytes)

    # 서명 검증 시 같은 body_bytes 사용
    verify_signature(request.headers, body_bytes)
```

### 8.4 Rate Limiting
**증상**: `429 Too Many Requests`

**완화 전략**:
- 스트리밍 업데이트 간격을 2초로 제한
- Exponential backoff 구현
- 최종 응답만 전송하고 중간 업데이트 생략 (옵션)

### 8.5 Cloud Run 타임아웃
**증상**: 502 Bad Gateway

**설정 확인**:
```bash
gcloud run deploy slackbot \
  --timeout=300 \
  --concurrency=1 \
  --max-instances=10
```

## 9. 배포

### 9.1 Dockerfile
```dockerfile
FROM python:3.11-slim

WORKDIR /app

# uv 설치
COPY --from=ghcr.io/astral-sh/uv:latest /uv /usr/local/bin/uv

# 의존성 복사 및 설치
COPY pyproject.toml uv.lock ./
RUN uv sync --frozen

# 애플리케이션 코드 복사
COPY app ./app

# 환경변수 (Cloud Run에서 주입)
ENV PORT=8080

# 실행
CMD uv run uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

### 9.2 Cloud Run 배포
```bash
# 1. 프로젝트 설정
export PROJECT_ID=your-gcp-project
export REGION=asia-northeast3

# 2. Docker 이미지 빌드 & 푸시
gcloud builds submit --tag gcr.io/$PROJECT_ID/slackbot

# 3. Cloud Run 배포
gcloud run deploy slackbot \
  --image gcr.io/$PROJECT_ID/slackbot \
  --platform managed \
  --region $REGION \
  --allow-unauthenticated \
  --set-env-vars SLACK_BOT_TOKEN=$SLACK_BOT_TOKEN,SLACK_SIGNING_SECRET=$SLACK_SIGNING_SECRET,ANTHROPIC_API_KEY=$ANTHROPIC_API_KEY \
  --timeout 300 \
  --concurrency 1 \
  --memory 512Mi

# 4. URL 확인
gcloud run services describe slackbot --region $REGION --format 'value(status.url)'
```

### 9.3 배포 후 체크리스트
- [ ] Cloud Run URL 확인
- [ ] Slack App Manifest의 `request_url` 업데이트
- [ ] Slack에서 URL 검증 성공 확인 (초록색 체크)
- [ ] 워크스페이스에서 `@slackbot` 테스트 메시지 전송
- [ ] Cloud Run 로그에서 이벤트 수신 확인

## 10. 성공 지표

### 학습 목표 달성도
- [ ] 학생이 Slack Events API 흐름을 이해함
- [ ] 학생이 LLM 스트리밍 응답을 처리할 수 있음
- [ ] 학생이 Cloud Run에 독립적으로 배포 가능함
- [ ] 학생이 서명 검증의 중요성을 이해함

### 기술적 목표
- [ ] 95% 이벤트가 3초 내 200 응답
- [ ] LLM 응답 지연 < 10초
- [ ] 이벤트 중복 처리율 < 1%
- [ ] 서명 검증 실패율 < 0.1%

## 11. 확장 아이디어 (교육 과제)

### 레벨 1: 기본 개선
- [ ] 사용자별 일일 요청 제한 (in-memory counter)
- [ ] 에러 메시지 한국어화
- [ ] 응답 시간 측정 및 로깅

### 레벨 2: 고급 기능
- [ ] 스레드 요약 기능 (긴 대화 요약)
- [ ] 특정 키워드에 자동 응답 (FAQ)
- [ ] 멀티모달 지원 (이미지 분석)

### 레벨 3: 아키텍처 개선
- [ ] Redis를 사용한 이벤트 중복 체크
- [ ] Pub-Sub 패턴으로 전환
- [ ] Secret Manager로 credential 관리
- [ ] 프로메테우스 메트릭 수집

## 12. 참고 자료

### 공식 문서
- [Slack Events API](https://api.slack.com/apis/connections/events-api)
- [Slack AI App Best Practices](https://docs.slack.dev/ai/ai-apps-best-practices)
- [Claude Agent SDK](https://docs.anthropic.com/en/docs/agents)
- [Google Cloud Run](https://cloud.google.com/run/docs)

### 코드 예제
- [Slack SDK Python Examples](https://github.com/slackapi/python-slack-sdk)
- [FastAPI Background Tasks](https://fastapi.tiangolo.com/tutorial/background-tasks/)

### 트러블슈팅
- [Slack API 디버깅 가이드](https://moldstud.com/articles/p-essential-guide-to-diagnosing-common-slack-api-issues-for-developers)
- [Cloud Run 타임아웃 이슈](https://cloud.google.com/run/docs/troubleshooting)

---

**문서 버전**: 1.0
**최종 수정일**: 2025-10-16
**작성자**: AI Agent Education Team

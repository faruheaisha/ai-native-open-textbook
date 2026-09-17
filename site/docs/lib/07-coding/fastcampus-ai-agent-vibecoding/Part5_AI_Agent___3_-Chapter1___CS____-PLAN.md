---
title: "Slack Claude Bot 구현 계획서"
sourceId: "07-coding/fastcampus-ai-agent-vibecoding"
sourceTitle: "FastCampus AI Agent 바이브코딩 강의"
sourceKind: "系统课程"
licenseLabel: "仅引用"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/Koomook/fastcampus-ai-agent-vibecoding"
entryUrl: "https://github.com/Koomook/fastcampus-ai-agent-vibecoding/blob/b24208b48c3945769327dbcafc2d632189369520/Part5_AI_Agent_프로젝트_3개/Chapter1_바이브코딩으로_CS_슬랙봇_구현하기/PLAN.md"
sourceRel: "Part5_AI_Agent_프로젝트_3개/Chapter1_바이브코딩으로_CS_슬랙봇_구현하기/PLAN.md"
rawUrl: "/raw/07-coding/fastcampus-ai-agent-vibecoding/Part5_AI_Agent_프로젝트_3개/Chapter1_바이브코딩으로_CS_슬랙봇_구현하기/PLAN.md"
sourceSha256: "f5479255003fab31980ac54a71a40f689bda69f58924a8904c5fd790aaaad639"
pageSha256: "f5479255003fab31980ac54a71a40f689bda69f58924a8904c5fd790aaaad639"
contentMode: "local-full"
zh: ""
---

# Slack Claude Bot 구현 계획서

## 목표
유저가 `@slackbot` 멘션으로 질문하면 Claude AI를 호출하여 스레드에 응답하는 슬랙봇을 구축합니다.
- 스레드 대화 맥락을 유지하여 연속적인 대화 지원
- Notion MCP를 통한 지식 검색 기능
- Google Cloud Run에 배포하여 서버리스로 운영

## 제약사항 및 원칙
- **단순함 우선**: 교육용 프로젝트이므로 프로덕션 레벨의 복잡한 아키텍처 지양
- **금지 사항**:
  - Pub-Sub 아키텍처
  - Secrets Manager (환경변수 `.env` 파일 사용)
  - Redis, Celery
  - Slack Socket Mode
- **허용 사항**:
  - 동기적 처리 (단순한 백그라운드 태스크는 가능)
  - FastAPI의 `BackgroundTasks` 또는 `asyncio.create_task`

## 기술 스택
- **언어**: Python 3.11+
- **웹 프레임워크**: FastAPI
- **LLM**: Claude Agent SDK (Haiku 4.5 - 비용 효율적)
- **패키지 관리**: uv (pip 금지)
- **컨테이너**: Docker
- **배포**: Google Cloud Run
- **Slack 라이브러리**: slack_sdk
- **MCP**: Notion MCP

## 아키텍처 개요

```
Slack Event Subscription → Cloud Run (FastAPI) → Slack Web API
                                ↓
                      Claude Agent SDK (Haiku 4.5)
                                ↓
                       Notion MCP (선택적 호출)
```

### 핵심 컴포넌트
1. **FastAPI 앱**: Slack 이벤트 수신 및 헬스체크 엔드포인트
2. **Slack 클라이언트**: `slack_sdk.WebClient`로 메시지 전송/업데이트
3. **Claude 서비스**: Agent SDK 래퍼, 대화 히스토리 관리
4. **Notion MCP**: Claude가 필요 시 호출하는 도구
5. **환경 설정**: `.env` 파일에서 비밀키 로드

## 요청 처리 흐름

1. **Slack 이벤트 수신**
   - FastAPI `/slack/events` 엔드포인트가 POST 요청 수신
   - Slack 서명 검증 (timestamp + HMAC)
   - 3초 이내에 HTTP 200 응답 반환

2. **URL 검증 처리** (초기 설정 시)
   - `type: url_verification` 이벤트 감지
   - `challenge` 파라미터 그대로 반환

3. **멘션 이벤트 처리**
   - HTTP 200 응답 후 백그라운드 태스크 시작
   - "Thinking..." 메시지를 스레드에 즉시 전송 (`chat.postMessage`)
   - 스레드 히스토리 조회 (`conversations.replies`, 최대 15개 메시지)
   - Claude Agent SDK 호출 (히스토리 + Notion MCP 도구)
   - Claude 응답 수신 후 "Thinking..." 메시지 업데이트 (`chat.update`)
   - MCP 도구 사용 시 별도 메시지로 호출 내용 표시

4. **에러 처리**
   - Claude/MCP 실패 시 사용자 친화적 에러 메시지 표시
   - 구조화된 로그 기록

## 단계별 구현 계획

### Phase 1: Hello Bot 배포 및 Event Subscriptions 설정

**목표**: Google Cloud Run에 간단한 "hello" 응답 봇을 배포하고 Slack Event Subscriptions 설정 완료

#### 구현 내용
1. **FastAPI 앱 스캐폴딩**
   - `/slack/events` POST 엔드포인트 (이벤트 수신)
   - `/health` GET 엔드포인트 (헬스체크)
   - Slack 서명 검증 미들웨어

2. **URL Verification Challenge 처리**
   - 참고: https://api.slack.com/events/url_verification
   - `type: url_verification` 이벤트 감지 시 `challenge` 반환
   - **주의사항**: JSON 형식으로 반환, Content-Type은 `application/json`

3. **Docker 컨테이너 구성**
   - `uv`를 사용한 의존성 관리
   - 참고: `uv` 공식 문서 - https://github.com/astral-sh/uv
   - 멀티스테이지 빌드 (빌드 → 런타임)
   - 포트 8080 노출 (Cloud Run 기본 포트)

4. **Cloud Run 배포**
   - 서비스 생성 및 환경변수 설정
   - 인증되지 않은 요청 허용 (Slack 웹훅용)
   - 최소 인스턴스 0, 최대 3 (비용 최적화)
   - 메모리 512MB

5. **Slack App 설정**
   - Slack App Manifest를 사용한 앱 생성 (manifest.json 제공)
   - Bot Token Scopes 설정:
     - `app_mentions:read` - 멘션 이벤트 수신
     - `chat:write` - 메시지 전송
     - `channels:history` - 채널 히스토리 조회
     - `groups:history` - 비공개 채널 히스토리 조회
     - `im:history` - DM 히스토리 조회
     - `mpim:history` - 그룹 DM 히스토리 조회
   - Event Subscriptions 설정:

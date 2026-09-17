---
title: "Clip 1: Claude Code 설치와 기본 사용법"
sourceId: "07-coding/fastcampus-ai-agent-vibecoding"
sourceTitle: "FastCampus AI Agent 바이브코딩 강의"
sourceKind: "系统课程"
licenseLabel: "仅引用"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/Koomook/fastcampus-ai-agent-vibecoding"
entryUrl: "https://github.com/Koomook/fastcampus-ai-agent-vibecoding/blob/b24208b48c3945769327dbcafc2d632189369520/Part1_AI_에이전트와_Claude_Code_기초/Chapter2_Claude_Code_설치와_설정/Clip1_설치와_기본_사용법.md"
sourceRel: "Part1_AI_에이전트와_Claude_Code_기초/Chapter2_Claude_Code_설치와_설정/Clip1_설치와_기본_사용법.md"
rawUrl: "/raw/07-coding/fastcampus-ai-agent-vibecoding/Part1_AI_에이전트와_Claude_Code_기초/Chapter2_Claude_Code_설치와_설정/Clip1_설치와_기본_사용법.md"
sourceSha256: "ba7129a76ec6ad6c69c4ed4a8689bc93a5cc45e9c58623bc41d61f88c183018a"
pageSha256: "ba7129a76ec6ad6c69c4ed4a8689bc93a5cc45e9c58623bc41d61f88c183018a"
contentMode: "local-full"
zh: ""
---

# Clip 1: Claude Code 설치와 기본 사용법

## 📋 학습 개요

### 🎯 학습 목표
- Claude Code를 성공적으로 설치하고 초기 설정을 완료할 수 있다
- 대화형 모드와 일회성 실행 모드의 차이를 이해하고 상황에 맞게 활용할 수 있다
- Plan Mode를 활용하여 안전하게 코드 분석 및 구현 계획을 수립할 수 있다
- 실전 워크플로우(코드베이스 이해, 버그 수정, 기능 추가)를 적용할 수 있다
- Claude Code의 권한 관리 시스템을 이해하고 안전하게 사용할 수 있다

## 🗂️ STEP 1: Claude Code 설치하기

Claude Code는 터미널에서 작동하는 AI 코딩 도구로, Node.js 환경 또는 네이티브 설치를 통해 사용할 수 있습니다.

### 시스템 요구사항

시작하기 전에 다음 사항을 확인하세요:

- **Node.js 18 이상** (NPM 설치 방식 사용 시)
- **Claude.ai 계정** 또는 **Claude Console 계정**
- **터미널 환경** (macOS, Linux, Windows WSL)
  - windows 를 사용하신다면 WSL을 추천드립니다.

### 설치 방법 선택

#### 방법 1: NPM을 통한 설치 (권장)

```bash
# Claude Code 전역 설치
npm install -g @anthropic-ai/claude-code

# 설치 확인
claude --version
```

#### 설치 트러블슈팅 방법
[claude.ai](https://claude.ai) 에 접속해서 오류 메시지를 붙여넣으면서 해결 방법을 알려달라고 하세요. 

### ✅ 설치 확인

설치가 완료되면 다음 명령어로 정상 작동을 확인합니다:

```bash
# Claude Code 실행
claude
```

## 📱 STEP 2: 초기 설정 및 로그인

### 첫 실행 및 로그인

Claude Code를 처음 실행하면 로그인이 필요합니다:

```bash
# Claude Code 대화형 모드 시작
claude
```

터미널에서 다음과 같은 프롬프트가 나타납니다:

```
Welcome to Claude Code!
Please log in to continue.

> /login
```

### 로그인 방법

#### 옵션 1: Claude.ai 계정 (권장)

- 개인 사용자에게 권장
- 구독 플랜을 통해 무제한 사용 가능
- 웹 브라우저를 통한 간편 인증

#### 옵션 2: Claude Console (API 계정)

- 기업 또는 팀 사용
- API 키를 통한 인증
- 사용량 기반 과금 (선불 크레딧)

### 인증 프로세스

```bash
# 대화형 세션에서 로그인 명령 실행
> /login
```

1. 브라우저가 자동으로 열립니다
2. Claude 계정으로 로그인합니다
3. 터미널 접근 권한을 승인합니다
4. 터미널로 돌아와 인증 완료를 확인합니다

**인증 성공 메시지:**
```
✅ Successfully logged in as your-email@example.com
```

### 기본 명령어 확인

로그인 후 사용 가능한 명령어를 확인하세요:

```bash
# 도움말 보기
> /help
```

**주요 명령어 목록:**
- `/help` - 사용 가능한 명령어 목록 표시
- `/clear` - 대화 기록 초기화
- `/mcp` - mcp 도구 관리

## 🎮 STEP 3: 기본 사용법

Claude Code는 두 가지 주요 실행 모드를 제공합니다.

### 모드 1: 대화형 모드 (Interactive Mode)

프로젝트 디렉토리에서 지속적인 작업을 할 때 사용합니다.

```bash
# 프로젝트 디렉토리로 이동
cd ~/projects/my-awesome-project

# 대화형 모드 시작
claude
```

**대화형 모드의 특징:**
- 세션이 유지되며 컨텍스트가 누적됨
- 여러 질문과 작업을 연속적으로 수행 가능
- 프로젝트 파일을 자동으로 읽고 분석

**예제 대화:**
```bash
# 프로젝트 이해하기
> 이 프로젝트가 무엇을 하는지 설명해줘

# 아키텍처 파악하기
> 주요 기술 스택과 폴더 구조를 설명해줘

# 특정 기능 찾기
> 사용자 인증은 어떻게 구현되어 있어?
```

### 모드 2: 일회성 실행 (One-off Execution)

간단한 질문이나 단일 작업에 사용합니다.

```bash
# 직접 질문 전달
claude -p "이 프로젝트의 진입점 파일은 무엇인가?"

# 특정 파일 분석
claude -p "app.py 파일의 주요 함수들을 설명해줘"

# 빠른 코드 검토
claude -p "최근 커밋에서 변경된 내용을 요약해줘"
```

**일회성 실행의 장점:**
- 빠른 정보 확인에 유용
- 스크립트나 자동화에 통합 가능
- 세션 오버헤드 없음

### 파일 참조 방법

특정 파일을 명시적으로 참조할 때는 `@` 기호를 사용합니다:

```bash
# 특정 파일 참조
> @src/main.py 이 파일의 주요 로직을 설명해줘

# 여러 파일 참조
> @models/user.py @controllers/auth.py 이 두 파일이 어떻게 연동되는지 설명해줘
```

## 🎛️ STEP 4: 실행 모드 전환하기

Claude Code는 작업 상황에 맞는 4가지 실행 모드를 제공합니다. **Shift + Tab** 키를 눌러 언제든지 모드를 전환할 수 있습니다.

### 모드 전환 방법

대화형 세션 중 **Shift + Tab**을 누르면 모드를 변경할 수 있습ㄴ다.:

```
Select mode:
❯ Default Mode (기본 모드)
  Accept All Edits (자동 승인)
  Plan Mode (계획 모드)
  Bypass Permissions (권한 무시)
```

### 주의! Bypass Permissions (권한 무시 모드)

**설명:**
시스템 권한 확인을 건너뛰는 고급 모드입니다. **매우 주의해서 사용해야 합니다.**

**특징:**
- ⚠️ 모든 권한 체크 우회
- 🔓 제한된 도구나 명령 실행 가능
- 🚨 보안 위험 증가

**CLI 옵션:**
```bash
# 시작부터 권한 무시 모드로 실행
claude --dangerously-skip-permissions
```

### 팁

**1. 모드 조합 활용:**
```bash
# 1단계: Plan Mode로 계획 수립
[Shift + Tab → Plan Mode]
> 이 기능을 어떻게 구현해야 할까?

# 2단계: Default Mode로 신중하게 구현
[Shift + Tab → Default Mode]
> 계획대로 구현해줘 (각 단계 검토)

# 3단계: 테스트 작성은 빠르게
[Shift + Tab → Accept All Edits]
> 관련 테스트 케이스들 작성해줘
```

**2. Git과 함께 사용:**
```bash
# 작업 전 브랜치 생성
git checkout -b feature/new-feature
```

## 📖 참고 자료

### 공식 문서
- [Claude Code 개요](https://docs.claude.com/ko/docs/claude-code/overview) - Claude Code의 전체 기능과 특징
- [Claude Code 빠른 시작](https://docs.claude.com/ko/docs/claude-code/quickstart) - 설치부터 첫 실행까지 단계별 가이드
- [일반적인 워크플로우](https://docs.claude.com/ko/docs/claude-code/common-workflows) - 실전 사용 패턴과 고급 기능

---

## 강사 정보
- 작성자: 정구봉
- LinkedIn: https://www.linkedin.com/in/gb-jeong/
- 이메일: bong@dio.so

## 강의 자료
- 강의 자료: https://goobong.gitbook.io/fastcampus
- Github: https://github.com/Koomook/fastcampus-ai-agent-vibecoding
- FastCampus 강의 주소: https://fastcampus.co.kr/biz_online_vibeagent

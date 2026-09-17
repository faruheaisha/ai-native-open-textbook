---
title: "Clip 1: Claude Code 등 에이전트가 어떻게 MCP를 활용하는지 보기"
sourceId: "07-coding/fastcampus-ai-agent-vibecoding"
sourceTitle: "FastCampus AI Agent 바이브코딩 강의"
sourceKind: "系统课程"
licenseLabel: "仅引用"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/Koomook/fastcampus-ai-agent-vibecoding"
entryUrl: "https://github.com/Koomook/fastcampus-ai-agent-vibecoding/blob/b24208b48c3945769327dbcafc2d632189369520/Part2_Agent_개념과_아키텍처/Chapter3_MCP_Client_사용하기/Clip1_Claude_Code_등_에이전트가_어떻게_MCP를_활용하는지_보기.md"
sourceRel: "Part2_Agent_개념과_아키텍처/Chapter3_MCP_Client_사용하기/Clip1_Claude_Code_등_에이전트가_어떻게_MCP를_활용하는지_보기.md"
rawUrl: "/raw/07-coding/fastcampus-ai-agent-vibecoding/Part2_Agent_개념과_아키텍처/Chapter3_MCP_Client_사용하기/Clip1_Claude_Code_등_에이전트가_어떻게_MCP를_활용하는지_보기.md"
sourceSha256: "709879b76927c10af20cca9f8c75002c9e814ae5cfdb886534550eba6b2ac821"
pageSha256: "709879b76927c10af20cca9f8c75002c9e814ae5cfdb886534550eba6b2ac821"
contentMode: "local-full"
zh: ""
---

# Clip 1: Claude Code 등 에이전트가 어떻게 MCP를 활용하는지 보기

## 학습 목표
- 여러 MCP를 동시에 사용하면서 Claude Code의 Tool 선택 과정을 실시간으로 관찰
- Tool의 description과 parameters를 기반으로 한 자동 선택 메커니즘 이해
- MCP 클라이언트가 실제로 동작하는 방식을 직접 확인

## 실습: 여러 MCP를 동시에 활용해보기

### 1. 준비: 사용 가능한 MCP 확인

Claude Code를 실행하면 연결된 MCP 서버의 Tool 목록을 확인할 수 있습니다.

```bash
$ claude

# 프롬프트 예시
"최대한 많은 MCP를 사용해봐. 내가 사용할 수 있는 MCP들을 이용해서 재미있는 작업들을 계획해보고 실행해줘."
```

**이 프롬프트를 입력하면 Claude Code는:**
1. 사용 가능한 모든 MCP Tool을 확인
2. 각 Tool로 할 수 있는 작업을 자동으로 계획
3. 여러 Tool을 조합하여 실행

### 2. 실제 동작 예시: YouTube + Linear + Slack + Notion 활용

다음은 실제로 여러 MCP가 어떻게 활용되는지 보여주는 예시입니다.

```bash
User: "최대한 많은 MCP를 사용해봐"

Claude Code의 동작:

🔍 Step 1: 사용 가능한 MCP Tool 확인
- mcp__youtube-transcript__get_video_info
- mcp__youtube-transcript__get_transcript
- mcp__linear__list_issues
- mcp__linear__create_issue
- mcp__slack__list_channels
- mcp__slack__post_message
- mcp__notion__search
- mcp__notion__create_page

📋 Step 2: 작업 계획
1. YouTube에서 AI 관련 인기 영상 정보 가져오기
2. Linear에서 최신 이슈 확인
3. Slack 채널 목록 조회
4. Notion에 정보 정리

🎬 Step 3: YouTube MCP 사용
🔧 Using: mcp__youtube-transcript__get_video_info
Parameters:
  url: "https://youtube.com/watch?v=..."

✅ Result:
  title: "Intro to Large Language Models"
  channel: "Andrej Karpathy"
  views: "2.5M"
  description: "A general audience intro..."

📊 Step 4: Linear MCP 사용
🔧 Using: mcp__linear__list_issues
Parameters:
  limit: 5
  orderBy: "updatedAt"

✅ Result: 5개의 최신 이슈 조회 완료

💬 Step 5: Slack MCP 사용
🔧 Using: mcp__slack__list_channels

✅ Result:
  - #general (id: C123...)
  - #mcp-demo (id: C456...)
  - #dev (id: C789...)
```

### 3. Tool 선택 메커니즘 이해하기

#### 3.1 Claude Code가 Tool을 선택하는 방법

Claude Code는 각 Tool의 **이름(name)**과 **설명(description)**을 보고 어떤 Tool을 사용할지 결정합니다.

**예시: Slack MCP의 Tool 정의**

```json
{
  "name": "slack_post_message",
  "description": "Post a new message to a Slack channel",
  "parameters": {
    "channel_id": {
      "type": "string",
      "description": "The ID of the channel to post to"
    },
    "text": {
      "type": "string",
      "description": "The message text to post"
    }
  }
}
```

```json
{
  "name": "slack_list_channels",
  "description": "List public or pre-defined channels in the workspace",
  "parameters": {
    "limit": {
      "type": "number",
      "description": "Maximum number of channels to return (default 100, max 200)",
      "default": 100
    },
    "cursor": {
      "type": "string",
      "description": "Pagination cursor for next page of results"
    }
  }
}
```

#### 3.2 Tool 선택 과정 상세 분석

```
User: "Slack #mcp-demo 채널에 메시지를 보내줘"

Claude Code의 사고 과정:

1️⃣ 요청 분석
   - 작업: Slack 메시지 전송
   - 필요 정보: 채널 ID, 메시지 내용

2️⃣ Tool 탐색
   - slack_post_message를 발견
   - description: "Post a new message to a Slack channel"
   - 필요한 parameters: channel_id, text

3️⃣ 선행 작업 필요성 판단
   - channel_id가 필요한데 사용자는 "#mcp-demo"라는 이름만 제공
   - channel_id를 얻으려면 먼저 slack_list_channels 실행 필요

4️⃣ Tool 실행 순서 결정
   Step 1: slack_list_channels → 채널 목록에서 ID 찾기
   Step 2: slack_post_message → 메시지 전송
```

### 4. 실제 화면으로 MCP 동작 확인하기

#### 4.1 Claude Code 실행 예시

```bash
$ claude code

You: 최대한 많은 MCP를 사용해서 재미있는 작업을 해봐

Claude Code:
여러 MCP를 활용해서 재미있는 작업을 해보겠습니다!

🎬 YouTube MCP로 AI 관련 인기 영상 가져오기
🔧 mcp__youtube-transcript__get_video_info
Parameters:
  url: "https://youtube.com/watch?v=zjkBMFhNj_g"

✅ Result:
  title: "Intro to Large Language Models"
  channel: "Andrej Karpathy"
  description: "A general audience intro..."

📊 Linear MCP로 최신 이슈 확인하기
🔧 mcp__linear__list_issues
Parameters:
  limit: 3
  orderBy: "updatedAt"

💬 Slack MCP로 채널 목록 확인
🔧 mcp__slack__list_channels

✅ Result:
  - #general (C123...)
  - #mcp-demo (C456...)
  - #dev (C789...)
```

#### 4.2 Tool 선택 과정 실시간 관찰

Claude Code UI에서 볼 수 있는 정보:

1. **Tool 선택 전**: 사용 가능한 모든 Tool 리스트
2. **Tool 선택 중**: LLM이 description을 검토하는 과정
3. **Tool 실행**: 선택된 Tool과 parameters
4. **결과 처리**: Tool 실행 결과를 다음 작업에 활용

---

## 강사 정보
- 작성자: 정구봉
- LinkedIn: https://www.linkedin.com/in/gb-jeong/
- 이메일: bong@dio.so

## 강의 자료
- 강의 자료: https://goobong.gitbook.io/fastcampus
- Github: https://github.com/Koomook/fastcampus-ai-agent-vibecoding
- FastCampus 강의 주소: https://fastcampus.co.kr/biz_online_vibeagent

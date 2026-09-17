---
title: "Clip 3: Hooks, Output Styles 설계하기"
sourceId: "07-coding/fastcampus-ai-agent-vibecoding"
sourceTitle: "FastCampus AI Agent 바이브코딩 강의"
sourceKind: "系统课程"
licenseLabel: "仅引用"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/Koomook/fastcampus-ai-agent-vibecoding"
entryUrl: "https://github.com/Koomook/fastcampus-ai-agent-vibecoding/blob/b24208b48c3945769327dbcafc2d632189369520/Part1_AI_에이전트와_Claude_Code_기초/Chapter3_커스터마이징_기초/Clip3_Hooks_Output_Styles_설계하기.md"
sourceRel: "Part1_AI_에이전트와_Claude_Code_기초/Chapter3_커스터마이징_기초/Clip3_Hooks_Output_Styles_설계하기.md"
rawUrl: "/raw/07-coding/fastcampus-ai-agent-vibecoding/Part1_AI_에이전트와_Claude_Code_기초/Chapter3_커스터마이징_기초/Clip3_Hooks_Output_Styles_설계하기.md"
sourceSha256: "c9843f0b6954bd770aa1a2f38d05a06fd671eceb462033516bb78c423df7b434"
pageSha256: "c9843f0b6954bd770aa1a2f38d05a06fd671eceb462033516bb78c423df7b434"
contentMode: "local-full"
zh: ""
---

# Clip 3: Hooks, Output Styles 설계하기

## 학습 목표
- Claude Code Hooks의 실제 작동 원리 이해
- PreToolUse와 PostToolUse 훅 구현
- Output Styles로 맞춤형 AI 응답 설정

## Hooks 이해하기

### 🪝 Hooks란?
- **정의**: Claude Code가 도구를 사용할 때 자동으로 실행되는 스크립트
- **목적**: 도구 호출 제어, 결과 로깅, 워크플로우 자동화
- **타이밍**: 9가지 Hook 이벤트 타입 제공

### 🔔 Hook 이벤트 타입

#### 1. **PreToolUse** (도구 실행 전)
- Claude가 도구 파라미터를 생성한 후, 실제 실행 전에 트리거
- 도구 호출을 차단하거나 피드백 제공 가능
- 매처: `Task`, `Bash`, `Glob`, `Grep`, `Read`, `Edit`, `Write`, `WebFetch`

#### 2. **PostToolUse** (도구 실행 후)
- 도구가 성공적으로 완료된 직후 실행
- 결과 로깅, 후처리 작업에 활용
- PreToolUse와 동일한 매처 사용

#### 3. **Notification** (알림 발생 시)
- Claude Code가 알림을 보낼 때 트리거
- 알림 상황:
  - Claude가 도구 사용 권한을 요청할 때
  - 프롬프트 입력이 60초 이상 유휴 상태일 때

#### 4. **UserPromptSubmit** (프롬프트 제출 시)
- 사용자가 프롬프트를 제출할 때 실행
- 컨텍스트 추가, 프롬프트 검증, 특정 타입 차단 가능

#### 5. **Stop** (에이전트 응답 완료)
- 메인 Claude Code 에이전트가 응답을 완료했을 때
- 사용자 중단으로 인한 정지 시에는 실행되지 않음

#### 6. **SubagentStop** (서브에이전트 완료)
- Claude Code 서브에이전트(Task 도구 호출)가 응답을 완료했을 때

#### 7. **PreCompact** (컴팩트 작업 전)
- Claude Code가 컴팩트 작업을 수행하기 전에 실행
- 매처:
  - `manual`: `/compact` 명령어로 호출
  - `auto`: 컨텍스트 윈도우가 가득 차서 자동 실행

#### 8. **SessionStart** (세션 시작)
- 새 세션 시작 또는 기존 세션 재개 시 실행
- 매처: `startup`, `resume`, `clear`, `compact`

#### 9. **SessionEnd** (세션 종료)
- Claude Code 세션이 종료될 때 실행
- 정리 작업, 로깅, 세션 상태 저장에 활용

### 💡 Hook 핵심 개념
1. **Matcher**: 특정 도구나 이벤트에만 훅 적용 (예: `Bash`, `mcp__*`, `manual`)
2. **설정 위치**: User(~/.claude/settings.json) 또는 Project(.claude/settings.json)
3. **차단 기능**: PreToolUse와 UserPromptSubmit은 작업을 차단하고 피드백 제공 가능
4. **비동기 처리**: 백그라운드 작업에는 `&`를 사용하지 말고 설정에서 비동기 옵션 활용

## Hook 빠른 시작

### 📋 전제 조건
명령줄에서 JSON 처리를 위해 `jq` 설치:
```bash
# macOS
brew install jq

# Ubuntu/Debian
sudo apt-get install jq
```

### 🚀 실습 1: Bash 명령어 로깅 훅 만들기

#### 1단계: 훅 구성 열기
```bash
# Claude Code REPL에서 실행
/hooks
```
- PreToolUse 훅 이벤트 선택

#### 2단계: 매처 추가
- `+ Add new matcher…` 선택
- 매처에 `Bash` 입력 (Bash 도구 호출에만 훅 실행)

#### 3단계: 훅 명령어 추가
- `+ Add new hook…` 선택
- 다음 명령어 입력:
```bash
jq -r '"\(.tool_input.command) - \(.tool_input.description // "No description")"' >> ~/.claude/bash-command-log.txt
```

#### 4단계: 구성 저장
- 저장 위치: **User settings** 선택
- `Esc`를 눌러 REPL로 복귀

#### 5단계: 훅 확인
~/.claude/settings.json 파일 내용:
```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "jq -r '\"\\(.tool_input.command) - \\(.tool_input.description // \"No description\")\"' >> ~/.claude/bash-command-log.txt"
          }
        ]
      }
    ]
  }
}
```

#### 6단계: 훅 테스트
```bash
# Claude에게 요청
"ls 명령어를 실행해줘"

# 로그 확인
cat ~/.claude/bash-command-log.txt
```

**출처**: [Claude Code Hooks 공식 문서](https://docs.claude.com/en/docs/claude-code/customization/hooks)

## 실전 Hook 예제

### 🚀 실습 2: YouTube 자막 자동 저장 PostToolUse 훅

이 예제는 YouTube 자막을 가져올 때마다 자동으로 파일로 저장하는 실제 동작하는 훅입니다.

#### 훅 구조
```
.claude/
├── hooks/
│   └── youtube_transcript.sh    # PostToolUse 훅 스크립트
└── settings.json                # 훅 설정 파일
logs/
└── {video_title}.txt            # 자동 생성되는 자막 파일
```

#### 1. 훅 스크립트 작성
`.claude/hooks/youtube_transcript.sh`:
```bash
#!/bin/bash

# YouTube 자막을 자동으로 파일로 저장하는 PostToolUse 훅
# Input: JSON via stdin (PostToolUse 형식)
# Output: logs/{sanitized_title}.txt

set -euo pipefail

readonly OUTPUT_DIR="logs"

# 파일명 안전하게 변환
sanitize_filename() {
    local filename="$1"
    # " - YouTube" 접미사 제거
    filename="${filename% - YouTube}"
    # 특수문자를 언더스코어로 변환
    filename=$(echo "$filename" | sed 's/[^a-zA-Z0-9가-힣]/_/g')
    # 연속된 언더스코어 제거
    filename=$(echo "$filename" | sed 's/__*/_/g')
    # 앞뒤 언더스코어 제거
    filename=$(echo "$filename" | sed 's/^_//;s/_$//')
    # 길이 제한 (100자)
    filename=$(echo "$filename" | cut -c1-100)
    echo "$filename"
}

main() {
    local json_input response_data title transcript sanitized_title output_file

    # stdin에서 JSON 읽기
    json_input=$(cat)

    # tool_response 데이터 추출
    response_data=$(echo "$json_input" | jq -r '.tool_response[0].text // empty')

    # 제목과 자막 파싱
    title=$(echo "$response_data" | jq -r '.title // empty')
    transcript=$(echo "$response_data" | jq -r '.transcript // empty')

    # 자막이 존재하면 파일로 저장
    if [[ -n "$transcript" ]]; then
        if [[ -n "$title" ]]; then
            sanitized_title=$(sanitize_filename "$title")
            output_file="${OUTPUT_DIR}/${sanitized_title}.txt"
        else
            output_file="${OUTPUT_DIR}/youtube-transcript.txt"
        fi

        mkdir -p "$OUTPUT_DIR"
        echo "$transcript" > "$output_file"

        # 저장 완료 메시지 (선택사항)
        echo "✅ Transcript saved: $output_file" >&2
    fi
}

main
```

#### 2. 실행 권한 부여
```bash
chmod +x .claude/hooks/youtube_transcript.sh
```

#### 3. 훅 설정
`.claude/settings.json`:
```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "mcp__youtube-transcript__get_transcript",
        "hooks": [
          {
            "type": "command",
            "command": ".claude/hooks/youtube_transcript.sh"
          }
        ]
      }
    ]
  }
}
```

#### 4. 훅 테스트
```bash
# Claude Code에서 YouTube 자막 요청
"https://www.youtube.com/watch?v=dQw4w9WgXcQ 이 영상의 자막을 가져와줘"

# 자동으로 logs/ 디렉토리에 자막 파일이 생성됨
ls -la logs/
cat logs/Rick_Astley_Never_Gonna_Give_You_Up.txt
```
#### 아래 프로젝트를 참고해서 자신만의 Hook 을 만드세요
[Claude Code Hooks Mastery](https://github.com/disler/claude-code-hooks-mastery)

## Output Styles 설계

### 🎨 Output Styles란?
- **정의**: Claude Code의 시스템 프롬프트를 수정하여 응답 스타일 변경
- **목적**: 소프트웨어 엔지니어링 외 용도로 Claude Code 적응
- **핵심 기능 유지**: 파일 읽기/쓰기, 스크립트 실행, TODO 추적 등

### 📚 내장 Output Styles

#### 1. **Default** (기본)
- 소프트웨어 엔지니어링 작업에 최적화
- 간결한 응답, 효율적인 코드 생성
- 테스트 코드로 검증

#### 2. **Explanatory** (설명형)
- 코딩하면서 교육적 "인사이트" 제공
- 구현 선택과 코드베이스 패턴 설명
- **형식**:
```
★ Insight ─────────────────────────────────────
[2-3 key educational points]
─────────────────────────────────────────────────
```

#### 3. **Learning** (학습형)
- 협력적 실습 학습 모드
- Claude가 TODO(human) 마커 추가
- 직접 코드 작성 기회 제공

### 🔧 Output Style 작동 원리
1. Claude Code의 **시스템 프롬프트**를 직접 수정
2. 기본 스타일 외에는 코드 생성 관련 지침 제외
3. 사용자 정의 지침을 시스템 프롬프트에 추가

## Output Styles 실습

### 🚀 실습 4: Output Style 변경하기

#### 방법 1: 대화형 메뉴 사용
```bash
# Claude Code REPL에서 실행
/output-style
```
- 메뉴에서 원하는 스타일 선택 (Default, Explanatory, Learning)
- 또는 `/config` 메뉴에서도 접근 가능

#### 방법 2: 직접 스타일 지정
```bash
# Explanatory 스타일로 전환
/output-style explanatory

# Learning 스타일로 전환
/output-style learning

# Default 스타일로 전환
/output-style default
```

**설정 저장 위치**: `.claude/settings.local.json` (프로젝트 수준)

### 🎨 실습 5: 사용자 정의 Output Style 만들기

Claude의 도움을 받아 새로운 Output Style 생성:

```bash
/output-style:new 다음과 같은 출력 스타일을 원합니다:
- 모든 응답을 마크다운으로 작성
- 코드 블록에는 항상 주석 추가
- 각 응답 끝에 관련 문서 링크 제공
- 전문적이고 간결한 톤 유지
```

#### Output Style 파일 구조
사용자 정의 스타일은 마크다운 파일로 저장:
```
~/.claude/output-styles/
├── professional.md
├── tutorial.md
├── code-reviewer.md
└── research-assistant.md
```

#### 커스텀 스타일 예제
`~/.claude/output-styles/deep-research.md`:
```markdown
@.claude/output-styles/deep-research.md
```

## 참고:
- [Claude Code Hooks 공식 문서](https://docs.claude.com/en/docs/claude-code/customization/hooks)
- [Claude Code Output Styles 공식 문서](https://docs.claude.com/en/docs/claude-code/customization/output-styles)
- [Claude Code Hooks Mastery](https://github.com/disler/claude-code-hooks-mastery)

---

## 강사 정보
- 작성자: 정구봉
- LinkedIn: https://www.linkedin.com/in/gb-jeong/
- 이메일: bong@dio.so

## 강의 자료
- 강의 자료: https://goobong.gitbook.io/fastcampus
- Github: https://github.com/Koomook/fastcampus-ai-agent-vibecoding
- FastCampus 강의 주소: https://fastcampus.co.kr/biz_online_vibeagent

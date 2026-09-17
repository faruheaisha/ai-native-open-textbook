---
title: "Random MCP Server"
sourceId: "07-coding/fastcampus-ai-agent-vibecoding"
sourceTitle: "FastCampus AI Agent 바이브코딩 강의"
sourceKind: "系统课程"
licenseLabel: "仅引用"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/Koomook/fastcampus-ai-agent-vibecoding"
entryUrl: "https://github.com/Koomook/fastcampus-ai-agent-vibecoding/blob/b24208b48c3945769327dbcafc2d632189369520/Part4_바이브코딩으로_MCP_server_구현하기/Chapter2_바이브코딩으로_MCP_server_구현하기/random-mcp-server/README.md"
sourceRel: "Part4_바이브코딩으로_MCP_server_구현하기/Chapter2_바이브코딩으로_MCP_server_구현하기/random-mcp-server/README.md"
rawUrl: "/raw/07-coding/fastcampus-ai-agent-vibecoding/Part4_바이브코딩으로_MCP_server_구현하기/Chapter2_바이브코딩으로_MCP_server_구현하기/random-mcp-server/README.md"
sourceSha256: "b95e4d074fa9e62e7bdb8aa3c6c03e060cfd14a605b6f0992e5b9868653427e0"
pageSha256: "b95e4d074fa9e62e7bdb8aa3c6c03e060cfd14a605b6f0992e5b9868653427e0"
contentMode: "local-full"
zh: ""
---

# Random MCP Server

1부터 100 사이의 랜덤 숫자를 생성하는 간단한 MCP 서버입니다.

## 기능

- `get_random_number`: 1~100 사이의 랜덤 숫자를 생성합니다.

## 설치 및 실행

### 필수 요구사항

- Python 3.10 이상
- uv 패키지 매니저

### 설치

```bash
cd random-mcp-server
uv sync
```

### 실행

```bash
uv run random-mcp-server
```

## MCP 클라이언트와 연결

Claude Code의 `.mcp.json` 설정 파일에 다음을 추가하세요:

```json
{
  "mcpServers": {
    "random": {
      "command": "uv",
      "args": [
        "--directory",
        "random-mcp-server",
        "run",
        "random-mcp-server"
      ],
      "env": {}
    }
  }
}
```

## 사용 예시

Claude Code에서 다음과 같이 요청할 수 있습니다:

- "랜덤 숫자 하나 생성해줘"
- "1부터 100 사이의 숫자를 뽑아줘"

## 프로젝트 구조

```
random-mcp-server/
├── pyproject.toml          # 프로젝트 설정 및 의존성
├── src/
│   └── random_mcp_server/
│       ├── __init__.py
│       └── server.py       # 메인 서버 코드
└── README.md
```

## 디버깅

서버는 실행 중 디버깅 정보를 stderr로 출력합니다. MCP 클라이언트의 로그에서 확인할 수 있습니다.

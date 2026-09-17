---
title: "Calculate MCP Server"
sourceId: "07-coding/fastcampus-ai-agent-vibecoding"
sourceTitle: "FastCampus AI Agent 바이브코딩 강의"
sourceKind: "系统课程"
licenseLabel: "仅引用"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/Koomook/fastcampus-ai-agent-vibecoding"
entryUrl: "https://github.com/Koomook/fastcampus-ai-agent-vibecoding/blob/b24208b48c3945769327dbcafc2d632189369520/Part4_바이브코딩으로_MCP_server_구현하기/Chapter2_바이브코딩으로_MCP_server_구현하기/calculate-mcp-server/README.md"
sourceRel: "Part4_바이브코딩으로_MCP_server_구현하기/Chapter2_바이브코딩으로_MCP_server_구현하기/calculate-mcp-server/README.md"
rawUrl: "/raw/07-coding/fastcampus-ai-agent-vibecoding/Part4_바이브코딩으로_MCP_server_구현하기/Chapter2_바이브코딩으로_MCP_server_구현하기/calculate-mcp-server/README.md"
sourceSha256: "1d253ee2169b83f8ba6c1ade6b7534e255ba62de76cf2b39695e4902425b97c4"
pageSha256: "1d253ee2169b83f8ba6c1ade6b7534e255ba62de76cf2b39695e4902425b97c4"
contentMode: "local-full"
zh: ""
---

# Calculate MCP Server

간단한 계산 기능을 제공하는 MCP(Model Context Protocol) 서버입니다.

## 기능

이 MCP 서버는 다음과 같은 도구를 제공합니다:

- `add`: 두 숫자를 더합니다
- `multiply`: 두 숫자를 곱합니다

각 연산은 디버깅 정보를 stderr로 출력합니다.

## 설치

```bash
uv pip install -e .
```

## 사용법

### MCP 서버로 실행

```bash
uv run calculate-mcp-server
```

### Claude Code에 연결

프로젝트 루트에 `.mcp.json` 파일을 생성하고 다음 설정을 추가합니다:

```json
{
  "mcpServers": {
    "calculate": {
      "command": "uv",
      "args": [
        "--directory",
        "calculate-mcp-server",
        "run",
        "calculate-mcp-server"
      ],
      "env": {}
    }
  }
}
```

## 요구사항

- Python >= 3.10
- mcp >= 1.0.0

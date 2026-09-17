---
title: "Clip 2: 오픈소스 AI Agent의 MCP 활용 코드 까보기"
sourceId: "07-coding/fastcampus-ai-agent-vibecoding"
sourceTitle: "FastCampus AI Agent 바이브코딩 강의"
sourceKind: "系统课程"
licenseLabel: "仅引用"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/Koomook/fastcampus-ai-agent-vibecoding"
entryUrl: "https://github.com/Koomook/fastcampus-ai-agent-vibecoding/blob/b24208b48c3945769327dbcafc2d632189369520/Part2_Agent_개념과_아키텍처/Chapter3_MCP_Client_사용하기/Clip2_오픈소스_AI_Agent의_MCP_활용_코드_까보기.md"
sourceRel: "Part2_Agent_개념과_아키텍처/Chapter3_MCP_Client_사용하기/Clip2_오픈소스_AI_Agent의_MCP_활용_코드_까보기.md"
rawUrl: "/raw/07-coding/fastcampus-ai-agent-vibecoding/Part2_Agent_개념과_아키텍처/Chapter3_MCP_Client_사용하기/Clip2_오픈소스_AI_Agent의_MCP_활용_코드_까보기.md"
sourceSha256: "4edcd8179b77bf4c1794ed33468033a6d39ec6ceff069728c407436b37d5ffd0"
pageSha256: "4edcd8179b77bf4c1794ed33468033a6d39ec6ceff069728c407436b37d5ffd0"
contentMode: "local-full"
zh: ""
---

# Clip 2: 오픈소스 AI Agent의 MCP 활용 코드 까보기

## 📋 학습 개요
- [mcp-use](https://github.com/mcp-use/mcp-use), [Codex CLI](https://github.com/openai/codex) 두 오픈소스에서 mcp 를 어떻게 사용하는지 분석하는 실습을 통해 클로드코드를 활용해 주도적으로 학습하는 방법을 배웁니다.

### 🎯 학습 목표
- MCP 클라이언트의 3단계 처리 프로세스를 이해하고 설명할 수 있다
- 도구 정규화와 스키마 변환 메커니즘을 파악할 수 있다
- LLM 주도 실행 루프의 동작 원리를 분석할 수 있다

## 🔍 STEP 1: MCP 클라이언트 3단계 프로세스

MCP 클라이언트는 **연결 → 도구 발견 → LLM 실행**의 3단계로 동작합니다.

| 단계 | 역할 | 핵심 동작 |
|------|------|-----------|
| ① 연결 | MCPClient | 서버 설정 로드, Connector 생성, Session 초기화 |
| ② 도구 발견 | MCPSession | 서버의 tools/resources/prompts 목록 요청 |
| ③ LLM 실행 | MCPAgent | LLM에게 도구 전달, 실행 결과 처리 |

### mcp-use 예시 코드

```python
# 1단계: 연결
client = MCPClient.from_config_file("config.json")
await client.create_all_sessions()  # 모든 서버 연결

# 2단계: 도구 발견 (자동 수행)
session = client.get_session("linear")
tools = session.list_tools()  # MCP tools 목록

# 3단계: LLM 실행
agent = MCPAgent(llm=ChatOpenAI(model="gpt-5"), client=client)
response = await agent.run("linear에서 이슈 생성해줘")
```

## 🛠️ STEP 2: 도구 정규화와 스키마 변환

### 도구 이름 정규화
MCP 서버의 도구를 LLM이 사용할 때 충돌을 방지하기 위해 **서버명 접두사**를 추가합니다.

| 원본 도구명 | 정규화된 이름 | 변환 로직 |
|------------|--------------|-----------|
| `create_issue` | `linear__create_issue` | mcp-use: `server__tool` |
| `create_issue` | `linear/create_issue` | Codex: `server/tool` |

### 스키마 변환 테이블

| MCP Schema | OpenAI Function Calling | 변환 규칙 |
|-----------|------------------------|----------|
| `type: "integer"` | `type: "number"` | integer는 number로 정규화 |
| `type` 미지정 | `type: "string"` | 기본값 string 할당 |
| `properties` 없음 | `properties: \{\}` | 빈 객체 삽입 |
| 중첩 스키마 | 재귀적 sanitize | `sanitize_json_schema()` 호출 |

### Codex의 스키마 변환 코드 (Rust)

```rust
// codex-rs/core/src/tools/spec.rs
pub(crate) fn mcp_tool_to_openai_tool(
    fully_qualified_name: String,
    tool: mcp_types::Tool,
) -> Result<ResponsesApiTool, serde_json::Error> {
    let mut input_schema = tool.input_schema;

    // OpenAI 필수 필드 처리
    if input_schema.properties.is_none() {
        input_schema.properties = Some(serde_json::Value::Object(Map::new()));
    }

    let mut serialized = serde_json::to_value(input_schema)?;
    sanitize_json_schema(&mut serialized);  // 재귀적 정규화

    Ok(ResponsesApiTool {
        name: fully_qualified_name,
        parameters: serde_json::from_value(serialized)?,
        strict: false,
    })
}
```

## 🤖 STEP 3: LLM 주도 실행 루프

### 실행 흐름
```
사용자 입력 → LLM 판단 → 도구 호출 → 결과 반환 → LLM 판단 (반복)
                ↑                                       ↓
                └────────── 최대 max_steps까지 반복 ──────┘
```

### mcp-use의 LangChain 어댑터 구조

```python
# mcp_use/adapters/langchain_adapter.py
class LangChainAdapter:
    async def _arun(self, **kwargs):
        # ① 도구 실행
        result = await self.tool_connector.call_tool(self.name, kwargs)

        # ② 결과를 문자열로 변환 (LLM이 읽을 수 있게)
        return str(result.content)
```

### Codex의 병렬 도구 실행

```rust
// codex-rs/core/src/tools/registry.rs
pub async fn dispatch(&self, invocation: ToolInvocation)
    -> Result<ResponseInputItem, FunctionCallError> {

    let handler = self.handler(tool_name)?;

    // 병렬 실행 지원 도구는 동시 처리
    if handler.supports_parallel() {
        tokio::spawn(handler.handle(invocation)).await
    } else {
        handler.handle(invocation).await
    }
}
```

## 💻 STEP 4: 바이브코딩으로 분석하기

### 프롬프트 1: mcp-use 구조 파악
```
mcp-use 저장소의 MCPClient, MCPSession, LangChainAdapter 클래스 관계를
클래스 다이어그램으로 보여줘. 주요 메서드만 포함.
```

### 프롬프트 2: Codex 도구 변환 로직
```
codex/codex-rs/core/src/tools/spec.rs 파일에서
mcp_tool_to_openai_tool 함수와 sanitize_json_schema 함수의
변환 로직을 테이블로 요약해줘.
```

### 프롬프트 3: 에러 처리 비교
```
mcp-use와 Codex의 도구 실행 실패 시 에러 처리 방식을
비교 분석해줘. 코드 예시 포함.
```

## ✅ 핵심 정리

- **3단계 프로세스**: 연결(Client) → 발견(Session) → 실행(Agent)
- **도구 정규화**: `server__tool` (mcp-use) 또는 `server/tool` (Codex) 포맷으로 충돌 방지
- **스키마 변환**: MCP 스키마를 OpenAI Function Calling 포맷으로 정규화 (integer→number, 빈 properties 삽입)
- **실행 루프**: LLM이 도구 선택 → 실행 → 결과 평가를 max_steps까지 반복
- **병렬 처리**: Codex는 `supports_parallel_tool_calls` 플래그로 동시 실행 지원

## 📖 참고 자료

- mcp-use GitHub: https://github.com/mcp-use/mcp-use
- Codex GitHub: https://github.com/openai/codex

---

## 강사 정보
- 작성자: 정구봉
- LinkedIn: https://www.linkedin.com/in/gb-jeong/
- 이메일: bong@dio.so

## 강의 자료
- 강의 자료: https://goobong.gitbook.io/fastcampus
- Github: https://github.com/Koomook/fastcampus-ai-agent-vibecoding
- FastCampus 강의 주소: https://fastcampus.co.kr/biz_online_vibeagent

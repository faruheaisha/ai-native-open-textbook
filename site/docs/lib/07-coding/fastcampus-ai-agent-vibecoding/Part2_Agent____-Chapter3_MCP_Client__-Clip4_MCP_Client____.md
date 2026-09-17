---
title: "Clip 4: MCP Client 개념 이해하기"
sourceId: "07-coding/fastcampus-ai-agent-vibecoding"
sourceTitle: "FastCampus AI Agent 바이브코딩 강의"
sourceKind: "系统课程"
licenseLabel: "仅引用"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/Koomook/fastcampus-ai-agent-vibecoding"
entryUrl: "https://github.com/Koomook/fastcampus-ai-agent-vibecoding/blob/b24208b48c3945769327dbcafc2d632189369520/Part2_Agent_개념과_아키텍처/Chapter3_MCP_Client_사용하기/Clip4_MCP_Client_개념_이해하기.md"
sourceRel: "Part2_Agent_개념과_아키텍처/Chapter3_MCP_Client_사용하기/Clip4_MCP_Client_개념_이해하기.md"
rawUrl: "/raw/07-coding/fastcampus-ai-agent-vibecoding/Part2_Agent_개념과_아키텍처/Chapter3_MCP_Client_사용하기/Clip4_MCP_Client_개념_이해하기.md"
sourceSha256: "63cba3fb63233569d923afc6f81f69464f60d34a18dd66bf5deb8478d662bf15"
pageSha256: "63cba3fb63233569d923afc6f81f69464f60d34a18dd66bf5deb8478d662bf15"
contentMode: "local-full"
zh: ""
---

# Clip 4: MCP Client 개념 이해하기

## 학습 목표
- MCP 클라이언트의 역할과 책임 이해
- 클라이언트-서버 통신 메커니즘 학습
- MCP 클라이언트 구축 방법 및 주요 패턴 습득

## MCP Client란?

### 정의

**MCP Client**는 MCP 서버와 통신할 수 있는 표준 프로토콜을 갖춘 AI 에이전트입니다. 실제로 MCP 클라이언트는 AI 에이전트와 거의 동일한 개념이며, 단지 MCP 서버를 이용할 수 있는 표준 프로토콜을 구현한 것이 차이점입니다.

호스트 애플리케이션(예: Claude Code, IDE 확장프로그램, AI 채팅 인터페이스)에 의해 생성되어 하나 이상의 MCP 서버와 통신하는 프로토콜 수준의 구성 요소입니다.

### 핵심 역할

1. **연결 관리**: MCP 서버와의 연결 생성 및 유지
2. **프로토콜 통신**: JSON-RPC 2.0 기반 요청/응답 처리
3. **Tool 탐색**: 서버가 제공하는 Tool 목록 조회
4. **Tool 실행**: 서버의 Tool 호출 및 결과 수신
5. **보안 제어**: 사용자 승인 기반 작업 수행

## 다양한 MCP 클라이언트

MCP 클라이언트 생태계는 빠르게 성장하고 있으며, 다양한 유형의 애플리케이션에서 MCP 표준을 채택하고 있습니다.

### 주요 MCP 클라이언트

#### 1. 개발 도구
- **VS Code GitHub Copilot**: 완전한 MCP 기능 지원
- **Cursor**: AI 기반 코드 에디터, Tools/Prompts/Roots/Elicitation 지원
- **Claude Code**: Anthropic의 코딩 도구, Resources/Prompts/Tools/Roots 지원

#### 2. AI 채팅 인터페이스
- **Zed**: 고성능 협업 코드 에디터
- **Cline**: VS Code 확장 기반 AI 어시스턴트
- **Continue**: 오픈소스 AI 코딩 어시스턴트

#### 3. 프레임워크 & SDK
- **fast-agent**: 모든 MCP 기능 완전 지원 (Resources, Prompts, Tools, Discovery, Sampling, Roots, Elicitation)
- **Genkit**: Google의 AI 애플리케이션 빌드 프레임워크
- **Sourcegraph Cody**: 코드 인텔리전스 플랫폼

> 💡 **참고**: 전체 MCP 클라이언트 목록과 최신 정보는 https://modelcontextprotocol.io/clients 에서 확인할 수 있습니다.

## MCP 기능 지원 현황

MCP 프로토콜은 여러 기능을 정의하고 있지만, **모든 클라이언트가 모든 기능을 지원하는 것은 아닙니다**. 이는 MCP 서버를 개발할 때 반드시 고려해야 할 중요한 사항입니다.

### 기능별 지원 현황

| 기능 | 지원 범위 | 설명 |
|------|-----------|------|
| **Tools** | ✅ 모든 클라이언트 | 가장 보편적으로 지원되는 핵심 기능 |
| **Resources** | ⚠️ 제한적 | 일부 클라이언트만 지원 |
| **Prompts** | ⚠️ 제한적 | 클라이언트마다 지원 여부가 다름 |
| **Sampling** | ❌ 매우 제한적 | 소수의 클라이언트만 지원 |
| **Roots** | ❌ 매우 제한적 | 파일 시스템 접근이 필요한 클라이언트 위주 |
| **Discovery** | ❌ 매우 제한적 | 점진적으로 채택 중 |

### 실무 시사점

```python
# ❌ 좋지 않은 접근: Resources에 의존하는 MCP 서버
# Resources를 지원하지 않는 클라이언트에서는 동작하지 않음
@server.resource("db://schema")
async def get_schema():
    return await fetch_database_schema()

# ✅ 권장 접근: Tool로 구현
# 거의 모든 MCP 클라이언트에서 동작
@server.tool()
async def get_database_schema():
    """데이터베이스 스키마를 조회합니다."""
    return await fetch_database_schema()
```

**핵심 원칙**:
- MCP 서버 개발 시 **Tool 중심으로 구현**하는 것이 가장 안전합니다
- Resources, Prompts 등의 기능을 사용할 때는 대상 클라이언트의 지원 여부를 반드시 확인하세요
- 필요하다면 동일한 기능을 Tool로도 제공하여 호환성을 높일 수 있습니다

## MCP 클라이언트 선택 가이드

자신의 프로젝트에 적합한 MCP 클라이언트를 선택할 때 고려할 사항:

1. **워크플로우 적합성**: 코딩, 채팅, 데이터 분석 등 주요 사용 목적
2. **기능 지원 범위**: 필요한 MCP 기능이 지원되는지 확인
3. **오픈소스 여부**: 커스터마이징이 필요한 경우 오픈소스 클라이언트 선택
4. **커뮤니티 & 문서**: 활발한 커뮤니티와 충분한 문서가 있는지 확인

> 💡 **Tip**: MCP 서버를 개발할 때는 여러 클라이언트에서 테스트해보는 것이 좋습니다. 각 클라이언트의 구현 방식과 성능이 다를 수 있습니다.

## 핵심 요약

- **MCP Client = MCP 프로토콜을 지원하는 AI 에이전트**
- **Tool은 거의 모든 클라이언트가 지원**하지만, Resources/Prompts/Sampling은 제한적
- MCP 서버 개발 시 **Tool 중심으로 구현**하여 최대 호환성 확보
- 70개 이상의 다양한 MCP 클라이언트가 존재하며 빠르게 성장 중
- 프로젝트 목적에 맞는 클라이언트를 선택하고, 필요 시 여러 클라이언트에서 테스트

## 참고 자료
- [MCP Clients](https://modelcontextprotocol.io/clients) - MCP 클라이언트 목록 및 기능 지원 현황
- [MCP Client Concepts](https://modelcontextprotocol.io/docs/learn/client-concepts) - MCP 클라이언트 개념 문서
- [Building an MCP Client](https://modelcontextprotocol.io/docs/develop/build-client) - MCP 클라이언트 개발 가이드

---

## 강사 정보
- 작성자: 정구봉
- LinkedIn: https://www.linkedin.com/in/gb-jeong/
- 이메일: bong@dio.so

## 강의 자료
- 강의 자료: https://goobong.gitbook.io/fastcampus
- Github: https://github.com/Koomook/fastcampus-ai-agent-vibecoding
- FastCampus 강의 주소: https://fastcampus.co.kr/biz_online_vibeagent

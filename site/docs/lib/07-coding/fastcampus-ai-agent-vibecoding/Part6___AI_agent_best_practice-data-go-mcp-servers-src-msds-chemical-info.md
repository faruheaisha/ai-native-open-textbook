---
title: "MSDS Chemical Info MCP Server"
sourceId: "07-coding/fastcampus-ai-agent-vibecoding"
sourceTitle: "FastCampus AI Agent 바이브코딩 강의"
sourceKind: "系统课程"
licenseLabel: "仅引用"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/Koomook/fastcampus-ai-agent-vibecoding"
entryUrl: "https://github.com/Koomook/fastcampus-ai-agent-vibecoding/blob/b24208b48c3945769327dbcafc2d632189369520/Part6_바이브코딩과_AI_agent_best_practice/data-go-mcp-servers/src/msds-chemical-info/README.md"
sourceRel: "Part6_바이브코딩과_AI_agent_best_practice/data-go-mcp-servers/src/msds-chemical-info/README.md"
rawUrl: "/raw/07-coding/fastcampus-ai-agent-vibecoding/Part6_바이브코딩과_AI_agent_best_practice/data-go-mcp-servers/src/msds-chemical-info/README.md"
sourceSha256: "a1830d29643814094e591b18780ff8e448bfdbb86c27f348c8a2df45f658580c"
pageSha256: "a1830d29643814094e591b18780ff8e448bfdbb86c27f348c8a2df45f658580c"
contentMode: "local-full"
zh: ""
---

# MSDS Chemical Info MCP Server

물질안전보건자료(MSDS) 정보를 제공하는 MCP 서버입니다.
Material Safety Data Sheets (MSDS) information provider for chemical substances from Korea Occupational Safety and Health Agency (KOSHA).

## 📋 Overview

이 MCP 서버는 한국산업안전보건공단(KOSHA)에서 제공하는 화학물질 MSDS 정보를 조회할 수 있는 도구를 제공합니다.

Key features:
- 🔍 화학물질 검색 (한글명, CAS No., UN No., KE No., EN No.)
- 📊 16개 섹션의 완전한 MSDS 정보 제공
- ⚠️ 유해성·위험성 정보
- 🧪 물리화학적 특성 및 독성 정보
- 📋 법적 규제현황 및 폐기시 주의사항
- 🚨 응급조치요령 및 누출사고 대처방법

## 🚀 Installation

### Via PyPI

```bash
pip install data-go-mcp.msds-chemical-info
```

### Via UV (Recommended)

```bash
uvx data-go-mcp.msds-chemical-info
```

## 🔑 Configuration

### Getting an API Key

1. Visit [data.go.kr](https://www.data.go.kr)
2. Sign up for an account
3. Search for "물질안전보건자료(MSDS)" API
4. Apply for API access
5. Get your service key from the API management page

### Environment Setup

Set your API key as an environment variable:

```bash
export API_KEY="your-api-key-here"
```

### Claude Desktop Configuration

Add to your Claude Desktop configuration file:

**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "msds-chemical-info": {
      "command": "uvx",
      "args": ["data-go-mcp.msds-chemical-info@latest"],
      "env": {
        "API_KEY": "your-api-key-here"
      }
    }
  }
}
```

## 🛠️ Available Tools

### 1. search_chemicals
화학물질을 검색합니다.

**Parameters:**
- `search_term` (required): 검색어 (화학물질명 또는 번호)
- `search_type` (optional): 검색 타입 (자동 감지됨)
  - `KOREAN_NAME`: 한글명 검색
  - `CAS_NO`: CAS 번호 검색
  - `UN_NO`: UN 번호 검색
  - `KE_NO`: KE 번호 검색
  - `EN_NO`: EN 번호 검색
- `page_no`: 페이지 번호 (default: 1)
- `num_of_rows`: 페이지당 결과 수 (default: 10, max: 100)

**Example:**
```
"벤젠의 MSDS 정보를 찾아줘"
"Search for CAS number 71-43-2"
"UN1114 화학물질 정보 조회"
```

### 2. get_chemical_safety_summary
화학물질의 핵심 안전정보를 조회합니다 (섹션 1-4).

**Parameters:**
- `chem_id` (required): 화학물질ID (6자리)

**Returns:**
- Section 1: 화학제품과 회사에 관한 정보
- Section 2: 유해성·위험성
- Section 3: 구성성분의 명칭 및 함유량
- Section 4: 응급조치요령

### 3. get_chemical_handling_info
화학물질의 취급 및 보호 정보를 조회합니다 (섹션 5-8).

**Returns:**
- Section 5: 폭발·화재시 대처방법
- Section 6: 누출사고시 대처방법
- Section 7: 취급 및 저장방법
- Section 8: 노출방지 및 개인보호구

### 4. get_chemical_properties
화학물질의 물리화학적 특성 및 독성 정보를 조회합니다 (섹션 9-12).

**Returns:**
- Section 9: 물리화학적 특성
- Section 10: 안정성 및 반응성
- Section 11: 독성에 관한 정보
- Section 12: 환경에 미치는 영향

### 5. get_chemical_regulatory_info
화학물질의 규제 및 폐기 정보를 조회합니다 (섹션 13-16).

### 6. get_chemical_section
특정 섹션의 정보만 조회합니다.

**Parameters:**
- `chem_id` (required): 화학물질ID
- `section_number` (required): 섹션 번호 (1-16)

### 7. get_complete_msds
화학물질의 전체 MSDS 정보를 조회합니다 (모든 16개 섹션).

## 📖 Usage Examples

### Example 1: 벤젠 안전정보 조회

```
User: "벤젠의 MSDS 정보를 알려줘"
Assistant uses: search_chemicals("벤젠")
→ Returns chem_id: "000100"

Then: get_chemical_safety_summary("000100")
→ Returns sections 1-4 with safety information
```

### Example 2: CAS 번호로 검색

```
User: "CAS 번호 71-43-2 화학물질 정보"
Assistant uses: search_chemicals("71-43-2")
→ Automatically detects CAS format and returns results
```

### Example 3: 특정 정보 조회

```
User: "메탄올의 독성 정보만 알려줘"
1. search_chemicals("메탄올") → get chem_id
2. get_chemical_section(chem_id, 11) → Section 11 독성 정보
```

## 🧪 Common Chemical Examples

| Chemical Name (한글명) | CAS No. | UN No. | KE No. |
|----------------------|---------|---------|---------|
| 벤젠 | 71-43-2 | UN1114 | KE-02380 |
| 메탄올 | 67-56-1 | UN1230 | KE-23193 |
| 황산 | 7664-93-9 | UN1830 | KE-32570 |
| 암모니아 | 7664-41-7 | UN1005 | KE-01896 |
| 톨루엔 | 108-88-3 | UN1294 | KE-33936 |

## 📝 MSDS Sections Reference

1. **화학제품과 회사에 관한 정보**: Product identification
2. **유해성·위험성**: Hazards identification
3. **구성성분의 명칭 및 함유량**: Composition
4. **응급조치요령**: First aid measures
5. **폭발·화재시 대처방법**: Fire-fighting measures
6. **누출사고시 대처방법**: Accidental release measures
7. **취급 및 저장방법**: Handling and storage
8. **노출방지 및 개인보호구**: Exposure controls/PPE
9. **물리화학적 특성**: Physical/chemical properties
10. **안정성 및 반응성**: Stability and reactivity
11. **독성에 관한 정보**: Toxicological information
12. **환경에 미치는 영향**: Ecological information
13. **폐기시 주의사항**: Disposal considerations
14. **운송에 필요한 정보**: Transport information
15. **법적 규제현황**: Regulatory information
16. **그 밖의 참고사항**: Other information

## Development

### Setup

```bash
# Clone the repository
git clone https://github.com/datago-mcp/data-go-mcp-servers.git
cd data-go-mcp-servers/src/msds-chemical-info

# Install dependencies
uv sync
```

### Testing

```bash
# Run tests
uv run pytest tests/

# Run with coverage
uv run pytest tests/ --cov=data_go_mcp.msds_chemical_info
```

### Running Locally

```bash
# Set your API key
export API_KEY="your-api-key"

# Run the server
uv run python -m data_go_mcp.msds_chemical_info.server
```

## API Documentation

For detailed API documentation, visit: https://msds.kosha.or.kr/openapi/service/msdschem

---
title: "Add MCP Server"
sourceId: "07-coding/fastcampus-ai-agent-vibecoding"
sourceTitle: "FastCampus AI Agent 바이브코딩 강의"
sourceKind: "系统课程"
licenseLabel: "仅引用"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/Koomook/fastcampus-ai-agent-vibecoding"
entryUrl: "https://github.com/Koomook/fastcampus-ai-agent-vibecoding/blob/b24208b48c3945769327dbcafc2d632189369520/Part5_AI_Agent_프로젝트_3개/Chapter3_바이브코딩으로_공공_MCP_자동_생성하고_에이전트_연결하기/.claude/commands/add-mcp-server.md"
sourceRel: "Part5_AI_Agent_프로젝트_3개/Chapter3_바이브코딩으로_공공_MCP_자동_생성하고_에이전트_연결하기/.claude/commands/add-mcp-server.md"
rawUrl: "/raw/07-coding/fastcampus-ai-agent-vibecoding/Part5_AI_Agent_프로젝트_3개/Chapter3_바이브코딩으로_공공_MCP_자동_생성하고_에이전트_연결하기/.claude/commands/add-mcp-server.md"
sourceSha256: "aab1bc41c7039499007146bd86bedba9f21e21e68845d3b538e960cccc525940"
pageSha256: "aab1bc41c7039499007146bd86bedba9f21e21e68845d3b538e960cccc525940"
contentMode: "local-full"
zh: ""
---

# Add MCP Server

You are an expert MCP server developer who will guide the user through creating a new Seoul Open Data MCP server.

## Workflow

### Phase 1: Gather API Specification

1. **Request files from the user:**
   - Ask the user to provide:
     - API specification file (XLS format with columns like: 항목명(영문), 항목명(한글), 항목설명, 샘플데이터, 항목크기)
     - Sample response data file (JSON or similar format)

2. **Read and analyze the files:**
   - Use the Read tool to read the provided specification files
   - Extract key information:
     - API name (Korean and English)
     - API description
     - Field definitions (name, type, description)
     - Sample data structure
     - API endpoint URL pattern

3. **Confirm details with user:**
   - Use AskUserQuestion to confirm:
     - Project domain name (PascalCase, e.g., "CulturalEvents")
     - Author name
     - Author email
     - API description

### Phase 2: Generate Template

1. **Run Cookiecutter:**
   ```bash
   uvx cookiecutter template/data-seoul-mcp
   ```

   Provide the following inputs programmatically or interactively:
   - author_name: (from user confirmation)
   - author_email: (from user confirmation)
   - api_name: (extracted from spec)
   - api_name_korean: (extracted from spec)
   - api_description: (from user confirmation)
   - project_domain: (from user confirmation, PascalCase)

2. **Verify template generation:**
   - Check that the new directory was created in `mcp/`
   - Read the generated `server.py` to understand the structure

### Phase 3: Implement MCP Server

1. **Analyze the API specification:**
   - Map XLS columns to Pydantic models:
     - 항목명(영문) → Field name
     - 항목명(한글) → Field description (Korean)
     - 항목설명 → Additional description
     - 샘플데이터 → Type inference and examples
     - 항목크기 → String length constraints

2. **Implement Pydantic models:**
   ```python
   from pydantic import BaseModel, Field

   class ResponseItem(BaseModel):
       """Response item model based on API spec."""
       field_name: str = Field(..., description="Field description (Korean: 한글설명)")
       # Add all fields from specification
   ```

3. **Implement MCP tools:**
   - Create tools based on common query patterns:
     - Search/filter tool (with parameters from spec)
     - Get detail tool (if applicable)
     - List tool (with pagination if needed)

   Example structure:
   ```python
   @mcp.tool(name='search_items')
   async def search_items(
       keyword: str = "",
       start_date: str = "",
       end_date: str = "",
       start_index: int = 1,
       end_index: int = 100
   ) -> dict:
       """Search items using the Seoul Open Data API.

       Args:
           keyword: Search keyword
           start_date: Start date (YYYYMMDD)
           end_date: End date (YYYYMMDD)
           start_index: Start index for pagination
           end_index: End index for pagination

       Returns:
           Dictionary containing search results
       """
       # Implementation
   ```

4. **Implement API client:**
   - Use httpx.AsyncClient
   - Build proper URL based on Seoul Open Data pattern:
     ```
     http://openapi.seoul.go.kr:8088/\{API_KEY\}/\{RETURN_TYPE\}/\{SERVICE_NAME\}/\{START_INDEX\}/\{END_INDEX\}/
     ```
   - Handle error cases (API errors, network errors, etc.)
   - Parse XML/JSON response
   - Validate response with Pydantic models

5. **Update configuration:**
   - Add environment variables to `.env` if needed
   - Update `pyproject.toml` if additional dependencies are needed

### Phase 4: Implement Tests

1. **Create test fixtures:**
   ```python
   @pytest.fixture
   def sample_response():
       """Sample API response based on provided data."""
       return {...}  # Use actual sample data from user
   ```

2. **Write tool tests:**
   ```python
   @pytest.mark.asyncio
   async def test_search_items():
       """Test search functionality."""
       result = await search_items(keyword="test")
       assert "items" in result
       assert isinstance(result["items"], list)
   ```

3. **Write integration tests:**
   - Test with actual API (if API key available)
   - Test error handling
   - Test edge cases

4. **Run tests:**
   ```bash

---
title: "Tools for Semantic Search Agent"
sourceId: "10-context-memory/context-engineering-intro"
sourceTitle: "Context Engineering Intro"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "10-context-memory"
sourceUrl: "https://github.com/coleam00/context-engineering-intro"
entryUrl: "https://github.com/coleam00/context-engineering-intro/blob/a2d84b021cee1e2f4e77ba854bba0be8cb319035/README.md"
zh: "on"
---

# Tools for Semantic Search Agent

## Tool Implementation Specifications

Based on the requirements from INITIAL.md, this agent needs 3 essential tools for semantic search functionality with automatic search type selection.

<div class="tb-zh"><p>根据 INITIAL.md 中的需求，这个 agent 需要 3 个必要工具，用于带自动检索类型选择的语义检索功能。</p></div>

### Tool 1: semantic_search

**Purpose**: Execute semantic similarity search using PGVector embeddings  
**Pattern**: `@agent.tool` (context-aware, needs database access)  
**Parameters**:
- `query` (str): The search query to find semantically similar content
- `limit` (int, default=10): Maximum number of results to return (1-50)

<div class="tb-zh"><p>用途：使用 PGVector embedding 执行语义相似度检索；模式：@agent.tool（需要上下文感知，需要访问数据库）；参数：query（str）——用于查找语义相似内容的检索查询，limit（int，默认 10）——返回结果的最大数量（1-50）。</p></div>

**Implementation Pattern**:

<div class="tb-zh"><p>实现模式：</p></div>

```python
@agent.tool
async def semantic_search(
    ctx: RunContext[AgentDependencies],
    query: str,
    limit: int = 10
) -> List[Dict[str, Any]]:
    """
    Perform semantic similarity search using vector embeddings.
    
    Args:
        query: Natural language search query
        limit: Maximum number of results (1-50)
    
    Returns:
        List of search results with content, similarity scores, and metadata
    """
```

**Functionality**:
- Generate query embedding using OpenAI text-embedding-3-small
- Call `match_chunks(query_embedding, match_count)` database function
- Return results with similarity scores above 0.7 threshold
- Handle database connection errors with retry logic
- Validate limit parameter (1-50 range)

<div class="tb-zh"><p>功能：用 OpenAI text-embedding-3-small 生成查询 embedding；调用 match_chunks(query_embedding, match_count) 数据库函数；返回相似度分数高于 0.7 阈值的结果；用重试逻辑处理数据库连接错误；校验 limit 参数（范围 1-50）。</p></div>

**Error Handling**:
- Retry database connections up to 3 times
- Fallback to empty results if embedding generation fails
- Log search metrics for performance monitoring

<div class="tb-zh"><p>错误处理：数据库连接最多重试 3 次；embedding 生成失败时回退为空结果；记录检索指标用于性能监控。</p></div>

### Tool 2: hybrid_search

**Purpose**: Execute combined semantic + keyword search for enhanced results  
**Pattern**: `@agent.tool` (context-aware, needs database access)  
**Parameters**:
- `query` (str): The search query for both semantic and text matching
- `limit` (int, default=10): Maximum number of results to return (1-50)
- `text_weight` (float, default=0.3): Weight for text search component (0.0-1.0)

<div class="tb-zh"><p>用途：执行语义与关键词的组合检索以获得更好的结果；模式：@agent.tool（需要上下文感知，需要访问数据库）；参数：query（str）——同时用于语义与文本匹配的检索查询，limit（int，默认 10）——返回结果的最大数量（1-50），text_weight（float，默认 0.3）——文本检索部分的权重（0.0-1.0）。</p></div>

**Implementation Pattern**:

<div class="tb-zh"><p>实现模式：</p></div>

```python
@agent.tool
async def hybrid_search(
    ctx: RunContext[AgentDependencies],
    query: str,
    limit: int = 10,
    text_weight: float = 0.3
) -> List[Dict[str, Any]]:
    """
    Perform hybrid search combining semantic and keyword matching.
    
    Args:
        query: Search query for both vector and text search
        limit: Maximum number of results (1-50)
        text_weight: Weight for text search component (0.0-1.0)
    
    Returns:
        List of search results with combined ranking scores
    """
```

**Functionality**:
- Generate query embedding for semantic component
- Call `hybrid_search(query_embedding, query_text, match_count, text_weight)` database function
- Combine vector similarity with full-text search results
- Return ranked results with composite scores
- Validate text_weight parameter (0.0-1.0 range)

<div class="tb-zh"><p>功能：为语义部分生成查询 embedding；调用 hybrid_search(query_embedding, query_text, match_count, text_weight) 数据库函数；把向量相似度与全文检索结果结合起来；返回带综合分数的排序结果；校验 text_weight 参数（范围 0.0-1.0）。</p></div>

**Error Handling**:
- Fallback to pure semantic search if text search component fails
- Retry database operations with exponential backoff
- Handle malformed query text gracefully

<div class="tb-zh"><p>错误处理：文本检索部分失败时回退为纯语义检索；用指数退避重试数据库操作；优雅地处理格式异常的查询文本。</p></div>

### Tool 3: auto_search

**Purpose**: Automatically select optimal search type based on query analysis  
**Pattern**: `@agent.tool` (context-aware, orchestrates other tools)  
**Parameters**:
- `query` (str): The search query to analyze and execute
- `limit` (int, default=10): Maximum number of results to return (1-50)

<div class="tb-zh"><p>用途：根据查询分析自动选择最优检索类型；模式：@agent.tool（需要上下文感知，编排其他工具）；参数：query（str）——要分析并执行的检索查询，limit（int，默认 10）——返回结果的最大数量（1-50）。</p></div>

**Implementation Pattern**:

<div class="tb-zh"><p>实现模式：</p></div>

```python
@agent.tool
async def auto_search(
    ctx: RunContext[AgentDependencies],
    query: str,
    limit: int = 10
) -> Dict[str, Any]:
    """
    Automatically select and execute optimal search strategy.
    
    Args:
        query: Natural language search query
        limit: Maximum number of results (1-50)
    
    Returns:
        Search results with metadata about search type used
    """
```

**Functionality**:
- Analyze query characteristics to determine optimal search type
- Route to semantic_search for conceptual/abstract queries
- Route to hybrid_search for queries with specific keywords or names
- Return results with metadata indicating search method used
- Default to semantic search if classification is uncertain

<div class="tb-zh"><p>功能：分析查询特征以确定最优检索类型；把概念性、抽象的查询路由到 semantic_search；把带有具体关键词或名称的查询路由到 hybrid_search；返回结果并附带说明所用检索方式的元数据；分类不确定时默认使用语义检索。</p></div>

**Search Type Classification Logic**:
- **Semantic Search**: Abstract concepts, "what is", "how to", philosophical queries
- **Hybrid Search**: Queries with proper nouns, specific terms, technical jargon
- **Decision Factors**: Query length, presence of quotes, technical terminology

<div class="tb-zh"><p>检索类型分类逻辑：语义检索适用于抽象概念、「是什么」、「怎么做」以及偏思辨的查询；混合检索适用于含专有名词、特定术语、技术行话的查询；决策因素包括查询长度、是否带引号、是否出现技术术语。</p></div>

**Error Handling**:
- Default to semantic search on classification failure
- Cascade through search types if initial method fails
- Log decision reasoning for analytics

<div class="tb-zh"><p>错误处理：分类失败时默认使用语义检索；初始方式失败时依次尝试其他检索类型；记录决策理由以供分析。</p></div>

## Utility Functions

### Database Connection Management

```python
async def get_database_connection(ctx: RunContext[AgentDependencies]) -> asyncpg.Connection:
    """Get database connection with retry logic."""
```

### Embedding Generation

```python
async def generate_embedding(ctx: RunContext[AgentDependencies], text: str) -> List[float]:
    """Generate embedding using OpenAI API with caching."""
```

### Result Processing

```python
def format_search_results(results: List, search_type: str) -> Dict[str, Any]:
    """Standardize result format across search types."""
```

## Parameter Validation

All tools include validation for:
- Query length: 1-1000 characters
- Result limit: 1-50 results
- Text weight: 0.0-1.0 for hybrid search
- Non-empty string queries

<div class="tb-zh"><p>所有工具都包含以下校验：查询长度 1-1000 个字符；结果数量限制 1-50；混合检索的 text_weight 在 0.0-1.0 之间；查询必须是非空字符串。</p></div>

## Performance Considerations

- **Caching**: Cache embeddings for repeated queries (5-minute TTL)
- **Connection Pooling**: Reuse database connections across tool calls
- **Rate Limiting**: Respect OpenAI API rate limits with retry logic
- **Timeout Handling**: 30-second timeout for database operations

<div class="tb-zh"><p>缓存：缓存重复查询的 embedding（TTL 5 分钟）；连接池：在多次工具调用之间复用数据库连接；限流：用重试逻辑遵守 OpenAI API 的速率限制；超时处理：数据库操作超时设为 30 秒。</p></div>

## Dependencies Required

```python
from typing import Dict, Any, List, Optional
from pydantic_ai import RunContext
import asyncpg
import openai
import logging
import asyncio
from tenacity import retry, stop_after_attempt, wait_exponential
```

## Integration Notes

- Tools work with `AgentDependencies` containing database URL and API keys
- All tools return consistent result format for easy chaining
- Error responses include helpful context for user feedback
- Logging integrated for search analytics and debugging

<div class="tb-zh"><p>这些工具配合包含数据库 URL 与 API key 的 AgentDependencies 工作；所有工具返回一致的结果格式，便于串联；错误响应包含有助于用户反馈的上下文；集成日志以支持检索分析与调试。</p></div>

## Testing Strategy

- **Unit Tests**: Individual tool parameter validation and logic
- **Integration Tests**: End-to-end database connectivity and search operations
- **Mock Tests**: Test with TestModel to avoid external API calls
- **Performance Tests**: Search response times under load

<div class="tb-zh"><p>单元测试：逐个工具的参数的校验与逻辑；集成测试：端到端的数据库连通性与检索操作；Mock 测试：用 TestModel 测试以避免外部 API 调用；性能测试：负载下的检索响应时间。</p></div>

This tool specification provides the minimal yet complete set of functions needed for the semantic search agent, following Pydantic AI best practices with proper error handling, parameter validation, and performance optimization.

<div class="tb-zh"><p>这份工具规格为语义检索 agent 提供了最小但完整的功能集合，遵循 Pydantic AI 最佳实践，包含恰当的错误处理、参数校验与性能优化。</p></div>

---
title: "🔍 Semantic Search Agent"
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

# 🔍 Semantic Search Agent

An intelligent knowledge base search system powered by Pydantic AI and PostgreSQL with PGVector. This agent provides both semantic and hybrid search capabilities with automatic strategy selection and result summarization.

<div class="tb-zh"><p>一个由 Pydantic AI 和带 PGVector 的 PostgreSQL 驱动的智能知识库检索系统。该 agent 同时提供语义检索与混合检索能力，并支持自动策略选择与结果摘要。</p></div>

## Features

- **Semantic Search**: Pure vector similarity search using embeddings
- **Hybrid Search**: Combined semantic and keyword matching for precise results
- **Intelligent Strategy Selection**: Agent automatically chooses the best search approach
- **Result Summarization**: Coherent insights generated from search results
- **Interactive CLI**: Rich command-line interface with real-time streaming
- **Multi-Provider Support**: Works with any OpenAI-compatible API (OpenAI, Gemini, Ollama, etc.)

<div class="tb-zh"><p>语义检索：使用 embedding 的纯向量相似度检索；混合检索：把语义匹配与关键词匹配结合起来以获得精确结果；智能策略选择：agent 自动选择最合适的检索方式；结果摘要：从检索结果中生成连贯的洞见；交互式 CLI：带实时流式输出的丰富命令行界面；多 provider 支持：兼容任何 OpenAI 风格的 API（OpenAI、Gemini、Ollama 等）。</p></div>

## Prerequisites

- Python 3.10+
- PostgreSQL with PGVector extension
- LLM API key (OpenAI, Gemini, Ollama, Groq, or any OpenAI-compatible provider)
- Existing database with documents and chunks (schema provided)

<div class="tb-zh"><p>环境要求：Python 3.10+；带 PGVector 扩展的 PostgreSQL；LLM API key（OpenAI、Gemini、Ollama、Groq 或任何 OpenAI 兼容的 provider）；已有包含文档与文本块的数据库（schema 已提供）。</p></div>

## Installation

1. **Clone or copy the agent directory**:

<div class="tb-zh"><p>1）克隆或复制 agent 目录：</p></div>

```bash
cd agents/rag_agent
```

2. **Install dependencies**:

<div class="tb-zh"><p>2）安装依赖：</p></div>

```bash
pip install -r requirements.txt
```

3. **Set up PostgreSQL with PGVector**:

<div class="tb-zh"><p>3）搭建带 PGVector 的 PostgreSQL：</p></div>

```bash
# SIMPLEST: Run the SQL in your SQL editor if you are using a platform like Supabase/Postgres

# Or run the schema with psql
psql -d your_database -f sql/schema.sql
```

4. **Configure environment variables**:

<div class="tb-zh"><p>4）配置环境变量：</p></div>

```bash
cp .env.example .env
# Edit .env with your credentials
```

5. **Ingest documents into the database**:

<div class="tb-zh"><p>5）把文档写入数据库：</p></div>

```bash
# This step is required before running the agent
# It will process documents and generate embeddings
python -m ingestion.ingest --documents documents/
```

## Configuration

### Required Environment Variables

- `DATABASE_URL`: PostgreSQL connection string with PGVector
- `LLM_PROVIDER`: Provider name (openai, anthropic, ollama, etc.)
- `LLM_API_KEY`: Your LLM provider API key
- `LLM_MODEL`: Model to use (e.g., gpt-4.1-mini, gemini-2.5-flash)
- `LLM_BASE_URL`: API base URL (default: https://api.openai.com/v1)
- `EMBEDDING_MODEL`: Embedding model to use (e.g., text-embedding-3-small, text-embedding-3-large)

<div class="tb-zh"><p>DATABASE_URL：带 PGVector 的 PostgreSQL 连接串；LLM_PROVIDER：provider 名称（openai、anthropic、ollama 等）；LLM_API_KEY：你的 LLM provider API key；LLM_MODEL：要使用的模型（例如 gpt-4.1-mini、gemini-2.5-flash）；LLM_BASE_URL：API base URL（默认 https://api.openai.com/v1 ）；EMBEDDING_MODEL：要使用的 embedding 模型（例如 text-embedding-3-small、text-embedding-3-large）。</p></div>

## Usage

### Command Line Interface

Run the interactive CLI:

<div class="tb-zh"><p>运行交互式 CLI：</p></div>

```bash
python -m cli
```

The CLI provides:
- Real-time streaming responses
- Tool execution visibility
- Session persistence
- User preference management

<div class="tb-zh"><p>该 CLI 提供：实时流式响应；工具执行的可见性；会话持久化；用户偏好管理。</p></div>

### Available Commands

- `help` - Show available commands
- `info` - Display system configuration
- `clear` - Clear the screen
- `set <key>=<value>` - Set preferences (e.g., `set text_weight=0.5`)
- `exit/quit` - Exit the application

<div class="tb-zh"><p>可用命令：help——显示可用命令；info——展示系统配置；clear——清屏；set &lt;key&gt;=&lt;value&gt;——设置偏好（例如 set text_weight=0.5）；exit/quit——退出程序。</p></div>

## Search Strategies

The agent intelligently selects between two search strategies:

<div class="tb-zh"><p>该 agent 会在两种检索策略之间智能选择：</p></div>

### Semantic Search
Best for conceptual queries and finding related content:
- "concepts similar to machine learning"
- "ideas about artificial intelligence"
- "related to neural networks"

### Hybrid Search
Best for specific facts and technical terms:
- "OpenAI GPT-4 specifications"
- "NASDAQ:NVDA stock price"
- "specific quote from Sam Altman"

The agent automatically chooses the appropriate strategy based on your query, or you can explicitly request a specific search type in your prompt.

<div class="tb-zh"><p>agent 会根据你的查询自动选择合适的策略，你也可以在提示词中明确要求某种检索类型。</p></div>

## Database Setup

### Schema Overview

- **documents**: Stores full documents with metadata
- **chunks**: Stores document chunks with embeddings
- **match_chunks()**: Function for semantic search
- **hybrid_search()**: Function for combined search

<div class="tb-zh"><p>数据库结构：documents 存放带元数据的完整文档；chunks 存放带 embedding 的文档块；match_chunks() 是语义检索函数；hybrid_search() 是组合检索函数。</p></div>

## Development

### Running Tests

```bash
pytest tests/
```

### Code Formatting

```bash
black .
ruff check .
```

### Project Structure

```
semantic_search_agent/
├── agent.py           # Main agent implementation
├── cli.py            # Command-line interface
├── dependencies.py   # Agent dependencies
├── providers.py      # Model providers
├── prompts.py        # System prompts
├── settings.py       # Configuration
├── tools.py          # Search tools
├── ingestion/        # Document ingestion pipeline
├── sql/              # Database schema
└── documents/        # Sample documents
```

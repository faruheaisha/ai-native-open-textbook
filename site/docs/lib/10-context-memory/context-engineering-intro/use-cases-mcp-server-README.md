---
title: "MCP Server Builder - Context Engineering Use Case"
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

# MCP Server Builder - Context Engineering Use Case

This use case demonstrates how to use **Context Engineering** and the **PRP (Product Requirements Prompt) process** to build production-ready Model Context Protocol (MCP) servers. It provides a proven template and workflow for creating MCP servers with GitHub OAuth authentication, database integration, and Cloudflare Workers deployment.

<div class="tb-zh"><p>本用例演示如何用上下文工程与 PRP（Product Requirements Prompt）流程构建生产就绪的 Model Context Protocol（MCP）服务器。它提供了一套经过验证的模板与工作流，用来创建带 GitHub OAuth 鉴权、数据库集成与 Cloudflare Workers 部署的 MCP 服务器。</p></div>

> A PRP is PRD + curated codebase intelligence + agent/runbook—the minimum viable packet an AI needs to plausibly ship production-ready code on the first pass.

<div class="tb-zh"><p>PRP = PRD + 精选的代码库情报 + agent/runbook，是 AI 在第一次尝试中就有望交付生产级代码所需的最小可行信息包。</p></div>

## 🚀 Quick Start

### Prerequisites

- Node.js and npm installed
- Cloudflare account (free tier works)
- GitHub account for OAuth
- PostgreSQL database (local or hosted)

<div class="tb-zh"><p>前置条件：已安装 Node.js 与 npm；Cloudflare 账号（免费额度即可）；用于 OAuth 的 GitHub 账号；PostgreSQL 数据库（本地或托管均可）。</p></div>

### Step 1: Setup Your Project

```bash
# Clone the context engineering repository
git clone https://github.com/coleam00/Context-Engineering-Intro.git
cd Context-Engineering-Intro/use-cases/mcp-server

# Copy template to your new project directory
python copy_template.py my-mcp-server-project

# Navigate to your new project
cd my-mcp-server-project

# Install dependencies
npm install

# Install Wrangler CLI globally
npm install -g wrangler

# Authenticate with Cloudflare
wrangler login
```

**What copy_template.py does:**
- Copies all template files except build artifacts (respects .gitignore)
- Renames README.md to README_TEMPLATE.md (so you can create your own README)
- Includes all source code, examples, tests, and configuration files
- Preserves the complete context engineering setup

<div class="tb-zh"><p>copy_template.py 会做什么： 复制除构建产物之外的所有模板文件（遵循 .gitignore）；把 README.md 重命名为 README_TEMPLATE.md（以便你自己写 README）；包含所有源码、示例、测试与配置文件；完整保留上下文工程的设置。</p></div>

## 🎯 What You'll Learn

This use case teaches you how to:

<div class="tb-zh"><p>本用例会教你：</p></div>

- **Use the PRP process** to systematically build complex MCP servers
- **Leverage specialized context engineering** for MCP development
- **Follow proven patterns** from a production-ready MCP server template
- **Implement secure authentication** with GitHub OAuth and role-based access
- **Deploy to Cloudflare Workers** with monitoring and error handling

<div class="tb-zh"><p>使用 PRP 流程系统化地构建复杂的 MCP 服务器；利用专门的上下文工程开展 MCP 开发；遵循经过验证的模式，它们来自一个生产就绪的 MCP 服务器模板；实现安全鉴权，用 GitHub OAuth 与基于角色的访问；部署到 Cloudflare Workers，并带上监控与错误处理。</p></div>

## 📋 How It Works - The PRP Process for MCP Servers

> **Step 1 is the Quick Start setup above** - clone repo, copy template, install dependencies, setup Wrangler

<div class="tb-zh"><p>第 1 步就是上面的快速开始——克隆仓库、复制模板、安装依赖、配置 Wrangler。</p></div>

### Step 2: Define Your MCP Server

Edit `PRPs/INITIAL.md` to describe your specific MCP server requirements:

<div class="tb-zh"><p>编辑 PRPs/INITIAL.md，描述你具体的 MCP 服务器需求：</p></div>

```markdown
## FEATURE:
We want to create a weather MCP server that provides real-time weather data
with caching and rate limiting.

## ADDITIONAL FEATURES:
- Integration with OpenWeatherMap API
- Redis caching for performance
- Rate limiting per user
- Historical weather data access
- Location search and autocomplete

## OTHER CONSIDERATIONS:
- API key management for external services
- Proper error handling for API failures
- Coordinate validation for location queries
```

### Step 3: Generate Your PRP

Use the specialized MCP PRP command to create a comprehensive implementation plan:

<div class="tb-zh"><p>使用专门的 MCP PRP 命令创建一份完整的实现计划：</p></div>

```bash
/prp-mcp-create INITIAL.md
```

**What this does:**
- Reads your feature request
- Researches the existing MCP codebase patterns
- Studies authentication and database integration patterns
- Creates a comprehensive PRP in `PRPs/your-server-name.md`
- Includes all context, validation loops, and step-by-step tasks

<div class="tb-zh"><p>这一步会做什么： 读取你的功能请求；调研现有 MCP 代码库中的模式；研究鉴权与数据库集成的模式；在 PRPs/your-server-name.md 中生成一份完整的 PRP；包含所有上下文、验证闭环与分步任务。</p></div>

> It's important after your PRP is generated to validate everything! With the PRP framework, you are meant to be a part of the process to ensure the quality of all context! An execution is only as good as your PRP. Use /prp-mcp-create as a solid starting point.

<div class="tb-zh"><p>PRP 生成之后，一定要逐项核查！在 PRP 框架中，你本就应该参与流程，确保所有上下文的质量！执行的效果不会好过你的 PRP。可以把 /prp-mcp-create 当作一个扎实的起点。</p></div>

### Step 4: Execute Your PRP

Use the specialized MCP execution command to build your server:

<div class="tb-zh"><p>使用专门的 MCP 执行命令构建你的服务器：</p></div>

```bash
/prp-mcp-execute PRPs/your-server-name.md
```

**What this does:**
- Loads the complete PRP with all context
- Creates a detailed implementation plan using TodoWrite
- Implements each component following proven patterns
- Runs comprehensive validation (TypeScript, tests, deployment)
- Ensures your MCP server works end-to-end

<div class="tb-zh"><p>这一步会做什么： 加载带完整上下文的 PRP；用 TodoWrite 创建详细的实现计划；按照经过验证的模式逐个实现组件；运行完整的验证（TypeScript、测试、部署）；确保你的 MCP 服务器端到端可用。</p></div>

### Step 5: Configure Environment

```bash
# Create environment file
cp .dev.vars.example .dev.vars

# Edit .dev.vars with your credentials
# - GitHub OAuth app credentials
# - Database connection string
# - Cookie encryption key
```

### Step 6: Test and Deploy

```bash
# Test locally
wrangler dev --config <your wrangler config (.jsonc)>

# Test with MCP Inspector
npx @modelcontextprotocol/inspector@latest
# Connect to: http://localhost:8792/mcp

# Deploy to production
wrangler deploy
```

## 🏗️ MCP-Specific Context Engineering

This use case includes specialized context engineering components designed specifically for MCP server development:

<div class="tb-zh"><p>本用例包含专为 MCP 服务器开发设计的上下文工程组件：</p></div>

### Specialized Slash Commands

Located in `.claude/commands/`:

<div class="tb-zh"><p>位于 .claude/commands/：</p></div>

- **`/prp-mcp-create`** - Generates PRPs specifically for MCP servers
- **`/prp-mcp-execute`** - Executes MCP PRPs with comprehensive validation

<div class="tb-zh"><p>/prp-mcp-create——专门为 MCP 服务器生成 PRP；/prp-mcp-execute——执行 MCP PRP，并做完整验证。</p></div>

These are specialized versions of the generic commands in the root `.claude/commands/`, but tailored for MCP development patterns.

<div class="tb-zh"><p>它们是根目录 .claude/commands/ 中通用命令的专门化版本，针对 MCP 开发模式做了裁剪。</p></div>

### Specialized PRP Template

The template `PRPs/templates/prp_mcp_base.md` includes:

<div class="tb-zh"><p>模板 PRPs/templates/prp_mcp_base.md 包含：</p></div>

- **MCP-specific patterns** for tool registration and authentication
- **Cloudflare Workers configuration** for deployment
- **GitHub OAuth integration** patterns
- **Database security** and SQL injection protection
- **Comprehensive validation loops** from TypeScript to production

<div class="tb-zh"><p>MCP 专属模式，用于工具注册与鉴权；Cloudflare Workers 配置以便部署；GitHub OAuth 集成模式；数据库安全与 SQL 注入防护；完整的验证闭环，从 TypeScript 一直到生产环境。</p></div>

### AI Documentation

The `PRPs/ai_docs/` folder contains:

<div class="tb-zh"><p>PRPs/ai_docs/ 文件夹包含：</p></div>

- **`mcp_patterns.md`** - Core MCP development patterns and security practices
- **`claude_api_usage.md`** - How to integrate with Anthropic's API for LLM-powered features

<div class="tb-zh"><p>mcp_patterns.md——核心 MCP 开发模式与安全实践；claude_api_usage.md——如何集成 Anthropic 的 API 来实现 LLM 驱动的功能。</p></div>

## 🔧 Template Architecture

This template provides a complete, production-ready MCP server with:

<div class="tb-zh"><p>这个模板提供了一个完整、生产就绪的 MCP 服务器，具备：</p></div>

### Core Components

```
src/
├── index.ts                 # Main authenticated MCP server
├── index_sentry.ts         # Version with Sentry monitoring
├── simple-math.ts          # Basic MCP example (no auth)
├── github-handler.ts       # Complete GitHub OAuth implementation
├── database.ts             # PostgreSQL with security patterns
├── utils.ts                # OAuth helpers and utilities
├── workers-oauth-utils.ts  # HMAC-signed cookie system
└── tools/                  # Modular tool registration system
    └── register-tools.ts   # Central tool registry
```

### Example Tools

The `examples/` folder shows how to create MCP tools:

<div class="tb-zh"><p>examples/ 文件夹展示了如何创建 MCP 工具：</p></div>

- **`database-tools.ts`** - Example database tools with proper patterns
- **`database-tools-sentry.ts`** - Same tools with Sentry monitoring

<div class="tb-zh"><p>database-tools.ts——按恰当模式编写的数据库工具示例；database-tools-sentry.ts——同样的工具，但带 Sentry 监控。</p></div>

### Key Features

- **🔐 GitHub OAuth** - Complete authentication flow with role-based access
- **🗄️ Database Integration** - PostgreSQL with connection pooling and security
- **🛠️ Modular Tools** - Clean separation of concerns with central registration
- **☁️ Cloudflare Workers** - Global edge deployment with Durable Objects
- **📊 Monitoring** - Optional Sentry integration for production
- **🧪 Testing** - Comprehensive validation from TypeScript to deployment

<div class="tb-zh"><p>🔐 GitHub OAuth——完整的鉴权流程与基于角色的访问；🗄️ 数据库集成——带连接池与安全措施的 PostgreSQL；🛠️ 模块化工具——通过集中注册实现清晰的关注点分离；☁️ Cloudflare Workers——用 Durable Objects 做全球边缘部署；📊 监控——生产环境可选的 Sentry 集成；🧪 测试——从 TypeScript 到部署的完整验证。</p></div>

## 🔍 Key Files to Understand

To fully understand this use case, examine these files:

<div class="tb-zh"><p>要完整理解本用例，请查看这些文件：</p></div>

### Context Engineering Components

- **`PRPs/templates/prp_mcp_base.md`** - Specialized MCP PRP template
- **`.claude/commands/prp-mcp-create.md`** - MCP-specific PRP generation
- **`.claude/commands/prp-mcp-execute.md`** - MCP-specific execution

<div class="tb-zh"><p>PRPs/templates/prp_mcp_base.md——专门的 MCP PRP 模板；.claude/commands/prp-mcp-create.md——MCP 专属的 PRP 生成；.claude/commands/prp-mcp-execute.md——MCP 专属的执行。</p></div>

### Implementation Patterns

- **`src/index.ts`** - Complete MCP server with authentication
- **`examples/database-tools.ts`** - Tool creation and registration patterns
- **`src/tools/register-tools.ts`** - Modular tool registration system

<div class="tb-zh"><p>src/index.ts——带鉴权的完整 MCP 服务器；examples/database-tools.ts——工具的创建与注册模式；src/tools/register-tools.ts——模块化的工具注册系统。</p></div>

### Configuration & Deployment

- **`wrangler.jsonc`** - Cloudflare Workers configuration
- **`.dev.vars.example`** - Environment variable template
- **`CLAUDE.md`** - Implementation guidelines and patterns

<div class="tb-zh"><p>wrangler.jsonc——Cloudflare Workers 配置；.dev.vars.example——环境变量模板；CLAUDE.md——实现指引与模式。</p></div>

## 📈 Success Metrics

When you successfully use this process, you'll achieve:

<div class="tb-zh"><p>当你成功运用这套流程，你会得到：</p></div>

- **Fast Implementation** - Quickly have an MCP Server with minimal iterations
- **Production Ready** - Secure authentication, monitoring, and error handling
- **Scalable Architecture** - Clean separation of concerns and modular design
- **Comprehensive Testing** - Validation from TypeScript to production deployment

<div class="tb-zh"><p>快速实现——用最少的迭代次数快速得到一个 MCP Server；生产就绪——安全鉴权、监控与错误处理；可扩展的架构——清晰的关注点分离与模块化设计；完整测试——从 TypeScript 到生产部署的验证。</p></div>

## 🤝 Contributing

This use case demonstrates the power of Context Engineering for complex software development. To improve it:

<div class="tb-zh"><p>本用例展示了上下文工程在复杂软件开发中的威力。要改进它：</p></div>

1. **Add new MCP server examples** to show different patterns
2. **Enhance the PRP templates** with more comprehensive context
3. **Improve validation loops** for better error detection
4. **Document edge cases** and common pitfalls

<div class="tb-zh"><p>1）添加新的 MCP 服务器示例以展示不同模式；2）增强 PRP 模板，加入更完整的上下文；3）改进验证闭环以更好地发现错误；4）记录边界情况与常见的坑。</p></div>

The goal is to make MCP server development predictable and successful through comprehensive context engineering.

<div class="tb-zh"><p>目标是通过完整的上下文工程，让 MCP 服务器开发变得可预期、可成功。</p></div>

---

**Ready to build your MCP server?** Follow the complete process above: setup your project with the copy template, configure your environment, define your requirements in `PRPs/INITIAL.md`, then generate and execute your PRP to build your production-ready MCP server.

<div class="tb-zh"><p>准备好构建你的 MCP 服务器了吗？ 按上面的完整流程走：用复制模板搭建项目、配置环境、在 PRPs/INITIAL.md 中定义需求，然后生成并执行你的 PRP，构建出生产就绪的 MCP 服务器。</p></div>

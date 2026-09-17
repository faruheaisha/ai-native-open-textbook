---
title: "Vibe Coding CN"
sourceId: "07-coding/vibe-coding-cn"
sourceTitle: "Vibe Coding CN"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/2025Emma/vibe-coding-cn"
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/claude-code-guide/references/README.md"
sourceRel: "i18n/zh/skills/claude-code-guide/references/README.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/claude-code-guide/references/README.md"
sourceSha256: "0c4f6b41406effc977fe7e18af5e564c48b822bf38aaf59045d5bdc58ab2ef06"
pageSha256: "1ded449512c4c25c19f8a7c3728bda8eedcc07fd9f50c911e93e393f0fa627eb"
contentMode: "local-full"
zh: ""
---

## MCP 集成与子代理

> **🚀 团队力量**：MCP + 子代理 + 后台任务 = 分布式智能。部署专门的代理，使其在您专注于核心开发时持续工作。

[↑ 返回顶部](#快速导航)

### 模型上下文协议 (MCP)
MCP 使用开源集成标准将 Claude Code 连接到外部工具和数据源：

```bash
# MCP 支持：
- 连接到数百个工具（GitHub、Sentry、Notion、数据库）
- 执行操作，例如：
  * “从问题跟踪器实现功能”
  * “分析监控数据”
  * “查询数据库”
  * “从 Figma 集成设计”
  * “自动化工作流”

# 连接方法：
- 本地 stdio 服务器
- 远程 SSE（服务器发送事件）服务器
- 远程 HTTP 服务器

# 认证：
- 支持 OAuth 2.0
- 不同范围：本地、项目、用户
```

### 常见 MCP 集成
```bash
# 流行的集成：
- GitHub（问题、PR、工作流）
- 数据库（PostgreSQL、MySQL 等）
- 监控工具（Sentry、DataDog）
- 设计工具（Figma）
- 通信（Slack）
- 云服务（AWS、GCP）
- 文档（Notion、Confluence）

# 使用示例：
“从 GitHub 拉取最新问题”
“查询用户数据库以获取活跃账户”
“使用新组件更新 Figma 设计”
“将构建状态发布到 Slack 频道”
```

### 自定义子代理（增强版）
Claude Code 现在支持强大的自定义子代理，并支持 @-mention：
```bash
# 创建自定义子代理
/agents                          # 打开代理管理

# 定义专业代理：
- 软件架构师：设计模式，抽象层
- 代码审查员：最佳实践，代码质量，清理
- QA 测试员：单元测试，代码检查，测试覆盖率
- 安全审计员：漏洞扫描，安全编码
- 性能工程师：优化，性能分析，指标
- 文档编写员：API 文档，README，注释

# 使用子代理
@code-reviewer "检查此实现"
@architect "设计认证系统"
@qa-tester "编写全面的测试"
@security "扫描漏洞"

# 团队协调
@architect @reviewer "审查系统设计和实现"
# 多个代理协同完成任务

# 自动代理选择
"审查此代码"               # Claude 选择合适的代理
"设计可扩展的 API"          # 架构师代理自动选择
"查找安全问题"           # 安全代理激活

# 每个代理的模型选择
每个代理可以使用不同的模型：
- 架构师：Claude Opus（复杂推理）
- 审查员：Claude Sonnet（平衡分析）
- 测试员：Claude Haiku（快速执行）
```

**协同代理模式**：
```bash
# 顺序管道
1. @architect 设计解决方案
2. 您根据设计实现
3. @reviewer 检查实现
4. @tester 编写并运行测试
5. @security 进行最终审计

# 并行分析
"分析此代码库以进行改进"
→ @reviewer：代码质量问题
→ @security：漏洞扫描
→ @performance：瓶颈分析
→ 所有分析同时进行，结果汇总

# 专业调试
错误发生 → @debugger 分析日志 → @architect 建议修复 → @tester 验证解决方案
```

**关键理解**：MCP 扩展了 Claude Code 以与外部系统配合工作。自定义子代理提供专业领域的知识，并支持通过 @-mention 直接调用。

### 安全审查系统（新功能）
将主动安全扫描集成到工作流程中：

```bash
# 临时安全审查
/security-review                 # 扫描当前目录
/security-review src/            # 扫描特定目录
/security-review --fix           # 自动修复发现的问题

# 常见漏洞检测
- SQL 注入风险
- XSS 漏洞  
- 不安全的数据处理
- 认证绕过
- CSRF 攻击向量
- 敏感数据泄露
- 不安全的依赖项

# GitHub Actions 集成
# .github/workflows/security.yml
name: Security Review
on: [pull_request]
jobs:
  security:
    runs-on: ubuntu-latest
    steps:
      - uses: anthropics/claude-code-security@v1
        with:
          inline-comments: true
          auto-fix-suggestions: true
```
**Security-First Development Pattern**:
```bash
# Secure Development Workflow
1. Implement feature
2. /security-review              # Check for vulnerabilities
3. "Fix the SQL injection risk"  # Address specific issues
4. @security "Verify fixes"      # Security agent confirmation
5. Git commit with confidence

# Continuous Security Monitoring
npm run dev &                    # Start development
# Set up watch for security issues
"Monitor for security vulnerabilities in real-time"
# Claude watches file changes and alerts on risky patterns
```

**Key Understanding**: Security reviews are now first-class citizens in the development workflow, catching vulnerabilities before they reach production.

### Enhanced File Support (NEW)
Claude Code now handles more file types:

```bash
# PDF Support
@specification.pdf               # Read PDF documents directly
@requirements.pdf                # No conversion needed
@research-paper.pdf              # Extract and analyze content

# Use Cases
- Technical specifications
- API documentation
- Research papers
- Design documents
- Legal requirements
- Architecture diagrams in PDF

# Intelligent PDF Processing
"Implement based on spec.pdf"    # Claude reads PDF, extracts requirements
"Compare our API to api-docs.pdf" # Analyzes differences
"Extract test cases from qa.pdf"  # Pulls actionable items
```

**Key Understanding**: PDF support eliminates conversion steps, allowing direct work with documentation and specifications.

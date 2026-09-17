---
title: "文档生成插件"
sourceId: "09-harness/claude-howto"
sourceTitle: "Claude How-To"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/luongnv89/claude-howto"
entryUrl: "https://github.com/luongnv89/claude-howto/blob/97bfb0685e03112ad39845889061d02cef6e534c/zh/07-plugins/documentation/README.md"
sourceRel: "zh/07-plugins/documentation/README.md"
rawUrl: "/raw/09-harness/claude-howto/zh/07-plugins/documentation/README.md"
sourceSha256: "95332b5949ca6d0238cb29cc8bc851e2b5ee653d338b1e378077817c18b944c9"
pageSha256: "95332b5949ca6d0238cb29cc8bc851e2b5ee653d338b1e378077817c18b944c9"
contentMode: "local-full"
zh: ""
---

# 文档生成插件

这个插件把文档相关的命令、subagents、模板和 MCP 服务器打包在一起，帮助你生成、同步和校验文档。

## 特性

✅ 生成 API 文档
✅ 创建和更新 README
✅ 同步文档
✅ 改进代码注释
✅ 生成示例

## 包含内容

### 命令
- [commands/generate-api-docs.md](/lib/09-harness/claude-howto/zh-07-plugins-documentation-commands-generate-api-docs) - 生成 API 文档
- [commands/generate-readme.md](/lib/09-harness/claude-howto/zh-07-plugins-documentation-commands-generate-) - 生成 README
- [commands/sync-docs.md](https://github.com/luongnv89/claude-howto/blob/97bfb0685e03112ad39845889061d02cef6e534c/zh/07-plugins/documentation/commands/sync-docs.md) - 同步文档
- [commands/validate-docs.md](https://github.com/luongnv89/claude-howto/blob/97bfb0685e03112ad39845889061d02cef6e534c/zh/07-plugins/documentation/commands/validate-docs.md) - 校验文档

### Subagents
- [agents/api-documenter.md](/lib/09-harness/claude-howto/zh-07-plugins-documentation-agents-api-documenter) - API 文档 subagent
- [agents/code-commentator.md](https://github.com/luongnv89/claude-howto/blob/97bfb0685e03112ad39845889061d02cef6e534c/zh/07-plugins/documentation/agents/code-commentator.md) - 代码注释 subagent
- [agents/example-generator.md](https://github.com/luongnv89/claude-howto/blob/97bfb0685e03112ad39845889061d02cef6e534c/zh/07-plugins/documentation/agents/example-generator.md) - 示例生成 subagent

### 模板
- [templates/adr-template.md](/lib/09-harness/claude-howto/zh-07-plugins-documentation-templates-adr-template) - ADR 模板
- [templates/api-endpoint.md](/lib/09-harness/claude-howto/zh-07-plugins-documentation-templates-api-endpoint) - API 端点模板
- [templates/function-docs.md](/lib/09-harness/claude-howto/zh-07-plugins-documentation-templates-function-docs) - 函数文档模板

### MCP 服务器
- GitHub 集成 - 用于文档同步

## 安装

```bash
/plugin install documentation
```

## 使用方式

### 生成 API 文档
```bash
/generate-api-docs
```

### 创建 README
```bash
/generate-readme
```

### 同步文档
```bash
/sync-docs
```

### 校验文档
```bash
/validate-docs
```

## 适用场景

- 想标准化项目文档产出
- 想自动生成 README、API 文档和示例
- 想同步多个文档之间的一致性
- 想维护代码注释和示例质量

## 需求

- Claude Code 2.1+
- GitHub 访问权限（可选）

## 示例工作流

```text
用户：/generate-api-docs

Claude：
1. 扫描 /src/api/ 下的所有 API 端点
2. 委派给 api-documenter subagent
3. 提取函数签名和 JSDoc
4. 按模块 / 端点组织内容
5. 使用 api-endpoint.md 模板
6. 生成完整的 Markdown 文档
7. 包含 curl、JavaScript 和 Python 示例

结果：
✅ API 文档已生成
📄 已创建文件：
   - docs/api/users.md
   - docs/api/auth.md
   - docs/api/products.md
📊 覆盖率：23/23 个端点已文档化
```

## 模板用途

### API 端点模板
用于编写带完整示例的 REST API 文档。

### 函数文档模板
用于编写单个函数或方法的说明文档。

### ADR 模板
用于记录架构决策。

## 配置

为文档同步设置 GitHub token：
```bash
export GITHUB_TOKEN="your_github_token"
```

## 最佳实践

- 文档尽量贴近代码
- 随着代码变化同步更新文档
- 提供可直接执行的示例
- 定期校验文档有效性
- 使用模板保持一致性

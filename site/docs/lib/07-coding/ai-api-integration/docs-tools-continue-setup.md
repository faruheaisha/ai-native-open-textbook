---
title: "Continue (VS Code) 接入大模型 API"
sourceId: "07-coding/ai-api-integration"
sourceTitle: "AI API 接入实战（OpenAI 兼容协议）"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/CCCpan/ai-api-integration"
entryUrl: "https://github.com/CCCpan/ai-api-integration/blob/95cd8c6f48e58dfe96703a37b6c8fccb583bea74/docs/tools/continue-setup.md"
sourceRel: "docs/tools/continue-setup.md"
rawUrl: "/raw/07-coding/ai-api-integration/docs/tools/continue-setup.md"
sourceSha256: "0224c9f7fb8ba283ca55cb7d5ba1d9affbfd8f7b06b073f9d0c1a8e589ceea18"
pageSha256: "0224c9f7fb8ba283ca55cb7d5ba1d9affbfd8f7b06b073f9d0c1a8e589ceea18"
contentMode: "local-full"
zh: ""
---

# Continue (VS Code) 接入大模型 API

> [Continue](https://continue.dev) 是 VS Code 开源 AI 编程助手，对标 Cursor 的免费 fork 替代。

## 配置步骤

### 1. 安装 VS Code 插件

VS Code Extensions 搜 **Continue** 安装。

### 2. 配置 config.json

`Cmd/Ctrl + Shift + P` → 选 **Continue: Configure Models** → 编辑 `~/.continue/config.json`：

```json
{
  "models": [
    {
      "title": "Claude Opus 4.7",
      "provider": "openai",
      "model": "claude-opus-4-7",
      "apiBase": "http://xdhdancer.top/v1",
      "apiKey": "sk-xxx"
    },
    {
      "title": "GPT-5",
      "provider": "openai",
      "model": "gpt-5",
      "apiBase": "http://xdhdancer.top/v1",
      "apiKey": "sk-xxx"
    },
    {
      "title": "DeepSeek V3.2",
      "provider": "openai",
      "model": "deepseek-v3.2",
      "apiBase": "http://xdhdancer.top/v1",
      "apiKey": "sk-xxx"
    }
  ],
  "tabAutocompleteModel": {
    "title": "Codex Fast",
    "provider": "openai",
    "model": "gpt-5-mini",
    "apiBase": "http://xdhdancer.top/v1",
    "apiKey": "sk-xxx"
  }
}
```

### 3. 验证

重启 VS Code，按 `Cmd + L` 打开 Continue 侧边栏。模型选择器应该列出上面配置的 3 个模型 + tab 补全。

## Continue 各功能模型选择

- **Chat（侧边栏对话）**：`claude-opus-4-7`
- **Inline edit（Cmd+I）**：`claude-sonnet-4-6` 或 `gpt-5`
- **Tab autocomplete**：`gpt-5-mini` 或 `claude-haiku-4-5`（要求快）

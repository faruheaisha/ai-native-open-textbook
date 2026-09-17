---
title: "LobeChat 接入大模型 API"
sourceId: "07-coding/ai-api-integration"
sourceTitle: "AI API 接入实战（OpenAI 兼容协议）"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/CCCpan/ai-api-integration"
entryUrl: "https://github.com/CCCpan/ai-api-integration/blob/95cd8c6f48e58dfe96703a37b6c8fccb583bea74/docs/tools/lobechat-setup.md"
sourceRel: "docs/tools/lobechat-setup.md"
rawUrl: "/raw/07-coding/ai-api-integration/docs/tools/lobechat-setup.md"
sourceSha256: "7864b7024ae8d9d8718d84341db34ff704eddb151e78088ff24efbbf286a4cf3"
pageSha256: "7864b7024ae8d9d8718d84341db34ff704eddb151e78088ff24efbbf286a4cf3"
contentMode: "local-full"
zh: ""
---

# LobeChat 接入大模型 API

> [LobeChat](https://github.com/lobehub/lobe-chat) 是开源 ChatGPT 风格 UI，支持自部署、多模型、插件、知识库。GitHub 50k+ stars。

## 配置步骤

### Docker 部署

```bash
docker run -d --name lobe-chat \
  -p 3210:3210 \
  -e OPENAI_API_KEY=sk-xxx \
  -e OPENAI_PROXY_URL=http://xdhdancer.top/v1 \
  -e OPENAI_MODEL_LIST="+gpt-5,+claude-opus-4-7,+gemini-3.1-pro,+deepseek-v3.2,+kimi-k2" \
  lobehub/lobe-chat
```

打开 http://localhost:3210 即可。

### Web 版直接配置

去 [chat-preview.lobehub.com](https://chat-preview.lobehub.com) → 设置 → **Language Model** → **OpenAI** → 填写：

- API Key：`sk-xxx`
- API Proxy Address：`http://xdhdancer.top/v1`
- Custom Model Names：`gpt-5,claude-opus-4-7,gemini-3.1-pro,deepseek-v3.2`

## 启用图片 / 视觉模型

LobeChat 顶部模型选择器选支持视觉的模型（如 `gpt-5` / `claude-opus-4-7`），即可在对话框上传图片让 AI 分析。

## 常见问题

### Q: 模型列表为空

A: `OPENAI_MODEL_LIST` 环境变量必须用 `+` 前缀（表示添加）。例：`+gpt-5,+claude-opus-4-7`

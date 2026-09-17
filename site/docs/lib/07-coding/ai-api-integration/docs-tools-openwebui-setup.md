---
title: "Open WebUI 接入大模型 API"
sourceId: "07-coding/ai-api-integration"
sourceTitle: "AI API 接入实战（OpenAI 兼容协议）"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/CCCpan/ai-api-integration"
entryUrl: "https://github.com/CCCpan/ai-api-integration/blob/95cd8c6f48e58dfe96703a37b6c8fccb583bea74/docs/tools/openwebui-setup.md"
sourceRel: "docs/tools/openwebui-setup.md"
rawUrl: "/raw/07-coding/ai-api-integration/docs/tools/openwebui-setup.md"
sourceSha256: "dc830782df58c622b27fb99c47720f512344918586b906309bcd8eacb7aaa03d"
pageSha256: "dc830782df58c622b27fb99c47720f512344918586b906309bcd8eacb7aaa03d"
contentMode: "local-full"
zh: ""
---

# Open WebUI 接入大模型 API

> [Open WebUI](https://github.com/open-webui/open-webui) 是自部署 Ollama / OpenAI 兼容 UI，社区活跃。GitHub 80k+ stars。

## Docker 部署 + 配置

```bash
docker run -d --name open-webui \
  -p 3000:8080 \
  -e OPENAI_API_BASE_URL=http://xdhdancer.top/v1 \
  -e OPENAI_API_KEY=sk-xxx \
  -v open-webui:/app/backend/data \
  --restart always \
  ghcr.io/open-webui/open-webui:main
```

访问 http://localhost:3000，注册管理员账号。

## 在 Web UI 里配置

设置 → **Connections** → **OpenAI API** → 填：

- API Base URL：`http://xdhdancer.top/v1`
- API Key：`sk-xxx`

保存后回主界面，模型下拉里会出现 `gpt-5` / `claude-opus-4-7` 等。

## 多模型管理

Open WebUI 支持**模型黑/白名单**——管理员后台可控制哪些模型对普通用户可见。

适合**多用户共享部署**的场景：管理员统一对接产灵 API，多个用户使用同一套 Key。

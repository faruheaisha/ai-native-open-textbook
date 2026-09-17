---
title: "解决方案：修正 workspace 路径（macOS 示例）"
sourceId: "11-personal-agents/awesome-openclaw-tutorial"
sourceTitle: "Awesome OpenClaw Tutorial（中文）"
sourceKind: "清单与速查"
licenseLabel: "可转载"
lang: "中文"
tier: 2
volume: "11-personal-agents"
sourceUrl: "https://github.com/xianyu110/awesome-openclaw-tutorial"
entryUrl: "https://github.com/xianyu110/awesome-openclaw-tutorial/blob/0b0943dc41725e80d64f7f8d745d185e7752be4d/docs/03-advanced/09-multi-platform-integration.md"
sourceRel: "docs/03-advanced/09-multi-platform-integration.md"
rawUrl: "/raw/11-personal-agents/awesome-openclaw-tutorial/docs/03-advanced/09-multi-platform-integration.md"
sourceSha256: "28dda0766c7ee67f0daa0a3c2ecd28e56ea81d1380371270f260330ab1c39dbd"
pageSha256: "b4156072128329bfcdd6acb40af2136d6ba961e3673e02fbd34192148b0f8df8"
contentMode: "local-full"
zh: ""
---

# 解决方案：修正 workspace 路径（macOS 示例）
\{
  "agents": \{
    "defaults": \{
      "workspace": "/Users/yourusername/clawd"  // 使用正确的 macOS 路径
    \}
  \}
\}
```
#### App Secret 泄露怎么怎么办

1. 在飞书开放平台重置 App Secret
2. 更新配置文件中的 App Secret
3. 重启网关：`openclaw gateway restart`

#### 发布送消息失败

1. 检查应用是否有 `im:message:send_as_bot` 权限
2. 检查应用是否已发布布
3. 查看日志获取详细错误信息：`openclaw logs --follow`

#### 网关端口被占用

```bash

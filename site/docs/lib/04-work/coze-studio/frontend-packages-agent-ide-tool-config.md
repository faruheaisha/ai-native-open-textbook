---
title: "@coze-agent-ide/tool-config"
sourceId: "04-work/coze-studio"
sourceTitle: "Coze Studio 源码研读"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "04-work"
sourceUrl: "https://github.com/coze-dev/coze-studio"
entryUrl: "https://github.com/coze-dev/coze-studio/blob/fefb05ff27be1da939612fbf9faf5db62583b8ae/frontend/packages/agent-ide/tool-config/README.md"
sourceRel: "frontend/packages/agent-ide/tool-config/README.md"
rawUrl: "/raw/04-work/coze-studio/frontend/packages/agent-ide/tool-config/README.md"
sourceSha256: "77595cf1c0c2e5e841bc27f96472f3295674de38f263ea0cf5dd59435ae34428"
pageSha256: "77595cf1c0c2e5e841bc27f96472f3295674de38f263ea0cf5dd59435ae34428"
contentMode: "local-full"
zh: ""
---

# @coze-agent-ide/tool-config
Tool 区域配置文件

## Features

- 新接入的 tool，需要在 types 文件中新增枚举值
- 新接入的 tool，需要在 constants 文件中配置 TOOL_KEY_STORE_MAP、AGENT_SKILL_KEY_MAP，用于为 ToolKey 和 /api/draftbot/update 接口的入参字段名做映射
- 新接入的 tool，需要在 constants 文件中配置 TOOL_KEY_TO_API_STATUS_KEY_MAP，用于为 ToolKey 和 /api/draftbot/update_display_info 接口的字段名做映射

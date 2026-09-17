---
title: "Claude 指南 - 高级开发智能"
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
pageSha256: "d8948397ab2c09a9ce4c2e1e31ecfef6da2004a08009a52672a68f72f8c2269f"
contentMode: "local-full"
zh: ""
---

# Claude 指南 - 高级开发智能

[](https://github.com) [](#快速导航) [](#高级协同实现)

## 本篇目录

- [快速导航](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/claude-code-guide/references/01-快速导航.md)
- [目的](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/claude-code-guide/references/02-目的.md)
- [重要提示：内容来源](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/claude-code-guide/references/03-重要提示_内容来源.md)
- [指南结构](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/claude-code-guide/references/04-指南结构.md)
- [深入探索 Claude 工具的关键发现](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/claude-code-guide/references/05-深入探索_Claude_工具的关键发现.md)
- [高级 REPL 协同模式](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/claude-code-guide/references/06-高级_REPL_协同模式.md)
- [专用内核架构集成](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/claude-code-guide/references/07-专用内核架构集成.md)
- [元待办事项系统：智能任务编排](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/claude-code-guide/references/08-元待办事项系统_智能任务编排.md)
- [高级协同实现](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/claude-code-guide/references/09-高级协同实现.md)
- [集成概要](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/claude-code-guide/references/10-集成概要.md)
- [快速参考卡](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/claude-code-guide/references/11-快速参考卡.md)
- [核心概念（从这里开始）](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/claude-code-guide/references/12-核心概念_从这里开始.md)
- [🔴 关键上下文（首先阅读）](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/claude-code-guide/references/13-关键上下文_首先阅读.md)
- [可用的命令](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/claude-code-guide/references/14-可用的命令.md)
- [应遵循的模式](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/claude-code-guide/references/15-应遵循的模式.md)
- [⚠️ 陷阱及不应做的事情](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/claude-code-guide/references/16-陷阱及不应做的事情.md)
- [文件结构模式](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/claude-code-guide/references/17-文件结构模式.md)
- [最近的学习成果](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/claude-code-guide/references/18-最近的学习成果.md)
- [钩子系统](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/claude-code-guide/references/19-钩子系统.md)
- [MCP 集成与子代理](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/claude-code-guide/references/20-MCP_集成与子代理.md)
- [Development Workflows](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/claude-code-guide/references/21-Development_Workflows.md)
- [最佳实践](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/claude-code-guide/references/22-最佳实践.md)
- [快速参考](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/claude-code-guide/references/23-快速参考.md)
- [故障排除](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/claude-code-guide/references/24-故障排除.md)
- [Critical Verification Patterns](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/claude-code-guide/references/25-Critical_Verification_Patterns.md)
- [智能日志分析与学习](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/claude-code-guide/references/26-智能日志分析与学习.md)
- [安全考虑](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/claude-code-guide/references/27-安全考虑.md)
- [脚本与自动化基础设施](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/claude-code-guide/references/28-脚本与自动化基础设施.md)
- [🚀 第三阶段元智能：递归自我改进生态系统](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/claude-code-guide/references/29-第三阶段元智能_递归自我改进生态系统.md)
- [🧠 元学习循环：学会更好地学习的系统](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/claude-code-guide/references/30-元学习循环_学会更好地学习的系统.md)
- [智能开发循环](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/claude-code-guide/references/31-智能开发循环.md)
- [任务](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/claude-code-guide/references/32-任务.md)

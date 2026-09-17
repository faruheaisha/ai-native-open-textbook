---
title: "Harness Engineering 学习指南"
sourceId: "09-harness/deusyu-harness-engineering"
sourceTitle: "Harness Engineering 学习指南"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "中文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/deusyu/harness-engineering"
entryUrl: "https://github.com/deusyu/harness-engineering/blob/858c0da6570aad32947c09c7e83fb04f46d22ebe/works/inside-the-scaffold-paper-translation.md"
sourceRel: "works/inside-the-scaffold-paper-translation.md"
rawUrl: "/raw/09-harness/deusyu-harness-engineering/works/inside-the-scaffold-paper-translation.md"
sourceSha256: "1a992825af190f9df14478b1ad81719924ac50bc09d86d87130d636d48ceae4e"
pageSha256: "0ba640c0c939f7b0d713c9489b0ea3d5dce1b9d081b36377d5c599fa0cb0b0fe"
contentMode: "local-full"
zh: ""
---

## Appendix A 候选智能体语料库

Table 14 列出了本研究考虑的全部 22 个候选智能体,以及每个被排除智能体未满足的纳入标准。三项纳入标准在 Section 3.1 中定义。

Table 14: 完整候选池。智能体按处置结果分组:13 个纳入的智能体在前 (排列顺序同 Table 1),其后是按排除标准分组的 9 个被排除智能体。

<table><tbody><tr><td>智能体</td><td>处置</td><td>排除理由</td></tr><tr><td>Gemini CLI</td><td>纳入</td><td>—</td></tr><tr><td>OpenHands</td><td>纳入</td><td>—</td></tr><tr><td>Aider</td><td>纳入</td><td>—</td></tr><tr><td>Cline</td><td>纳入</td><td>—</td></tr><tr><td>SWE-agent</td><td>纳入</td><td>—</td></tr><tr><td>Codex CLI</td><td>纳入</td><td>—</td></tr><tr><td>OpenCode</td><td>纳入</td><td>—</td></tr><tr><td>Agentless</td><td>纳入</td><td>—</td></tr><tr><td>AutoCodeRover</td><td>纳入</td><td>—</td></tr><tr><td>Moatless Tools</td><td>纳入</td><td>—</td></tr><tr><td>Prometheus</td><td>纳入</td><td>—</td></tr><tr><td>DARS-Agent</td><td>纳入</td><td>—</td></tr><tr><td>mini-swe-agent</td><td>纳入</td><td>—</td></tr><tr><td colspan="3"><em>排除: 非编码专用 (标准 1)</em></td></tr><tr><td>Open Interpreter</td><td>排除</td><td>通用代码执行框架。无代码库导航、补丁应用或 git 集成。</td></tr><tr><td>Deep Agents</td><td>排除</td><td>通用 LangGraph 智能体 Harness。无 git 集成、无 diff/补丁应用、无测试运行器、无 AST 工具。</td></tr><tr><td>MetaGPT</td><td>排除</td><td>多智能体编排框架;分析单元是智能体协调,而非单个脚手架架构。</td></tr><tr><td>CrewAI</td><td>排除</td><td>通用多智能体编排平台;与 MetaGPT 排除理由相同。</td></tr><tr><td colspan="3"><em>排除: 无可读源代码 (标准 2)</em></td></tr><tr><td>Claude Code</td><td>排除</td><td>以编译后的 npm 二进制文件分发;无公开源代码仓库。</td></tr><tr><td>MASAI</td><td>排除</td><td>仓库仅包含链接到论文的 README;未发布实现代码。</td></tr><tr><td>Copilot Workspace</td><td>排除</td><td>专有产品;脚手架代码不可公开检视。</td></tr><tr><td>Cursor</td><td>排除</td><td>商业 AI 代码编辑器;脚手架代码不可公开检视。</td></tr><tr><td>Windsurf</td><td>排除</td><td>商业 AI 代码编辑器;脚手架代码不可公开检视。</td></tr></tbody></table>

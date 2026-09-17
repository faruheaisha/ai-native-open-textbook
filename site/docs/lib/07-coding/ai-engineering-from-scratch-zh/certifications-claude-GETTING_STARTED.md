---
title: "在 GitHub 上学习 Claude 认证"
sourceId: "07-coding/ai-engineering-from-scratch-zh"
sourceTitle: "AI 工程从零到一（中文）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh"
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/certifications/claude/GETTING_STARTED.md"
sourceRel: "certifications/claude/GETTING_STARTED.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/certifications/claude/GETTING_STARTED.md"
sourceSha256: "e44855661ecc3a7dbb871e1053e818d605b9082a8ef337d34837394bc05dca7d"
pageSha256: "e44855661ecc3a7dbb871e1053e818d605b9082a8ef337d34837394bc05dca7d"
contentMode: "local-full"
zh: ""
---

# 在 GitHub 上学习 Claude 认证

仓库和网站是同等的学习入口。网站提供交互图表和浏览器内的学习进度；GitHub 则为你的 AI
编程环境提供逐步教学所需的课程源码、场景代码、测试、产物、测验、诊断题和路线顺序。

## 使用 AI 导师开始学习

先克隆仓库，让导师可以运行每个实验和测试：

```bash
git clone https://github.com/fancyboi999/ai-engineering-from-scratch-zh.git
cd ai-engineering-from-scratch
```

Claude Code 会自动发现仓库中的导师。请从下面的命令开始：

```text
/claude-certification
```

若使用 Codex、Cursor 或其他能读取 `SKILL.md` 的本地 agent，请安装可移植的课程 Skill：

```bash
npx skills add fancyboi999/ai-engineering-from-scratch-zh
```

然后调用 `/claude-certification`。若使用 ChatGPT，或使用不能安装本地 Skill、也不支持斜杠命令的环境，请附加或打开此仓库，并粘贴下面这段提示：

```text
Read skills/claude-certification/SKILL.md completely. Use it to choose my
Claude certification track, create my learning plan, and teach me one lesson
at a time with the real labs, artifacts, quizzes, and remediation in this repo.
```

导师会询问你的目标、经验、学习节奏，以及是否需要路线诊断。它会写入
`CLAUDE-CERTIFICATION.md`，并在后续会话中从该文件继续。每一课都要求你：

1. 用自己的话解释决策；
2. 预测并操作课程场景；
3. 运行仓库中的实验和测试；
4. 构建或论证自己的产物；
5. 通过本课测验；
6. 在推进前补强薄弱的考试领域。

你的学习成果应存放在 `learning-artifacts/claude/`，与每节课中已完成的参考产物分开。

## 选择一条路线

| 路线 | 适合人群 | 路线 | 诊断 | 完整模拟题 |
|-------|----------|-------|------------|-----------|
| CCAO-F | 知识工作、分析、验证与负责任地使用 Claude | [9 课路线](https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/certifications/claude/tracks/ccao-f.json) | [16 道题](https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/certifications/claude/assessments/ccao-f/diagnostic.json) | [60 道题](https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/certifications/claude/assessments/ccao-f/mock-01.json) |
| CCDV-F | 构建并保护 Claude 应用的工程师 | [15 课路线](https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/certifications/claude/tracks/ccdv-f.json) | [16 道题](https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/certifications/claude/assessments/ccdv-f/diagnostic.json) | [53 道题](https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/certifications/claude/assessments/ccdv-f/mock-01.json) |
| CCAR-F | 需要论证 Claude Code、Agent SDK、API、MCP 和编排方案取舍的构建者 | [21 课路线](https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/certifications/claude/tracks/ccar-f.json) | [15 道题](https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/certifications/claude/assessments/ccar-f/diagnostic.json) | [60 道题](https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/certifications/claude/assessments/ccar-f/mock-01.json) |
| CCAR-P | 负责从发现阶段到运维的资深工程师与架构师 | [25 课路线](https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/certifications/claude/tracks/ccar-p.json) | [14 道题](https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/certifications/claude/assessments/ccar-p/diagnostic.json) | [63 道题](https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/certifications/claude/assessments/ccar-p/mock-01.json) |

路线 JSON 是路线顺序、前置知识覆盖、领域权重、学习计划和测评路径的机器可读来源。导师会读取它，而不是根据泛泛的学习计划猜测。

## 以引导式无代码模式学习 Associate

CCAO-F 不要求有软件开发经验。课程仍附带 Python，因为确定性校验器能让策略、证据、工作流和评审标准得到测试。导师可以替你运行这些代码；你不需要亲自编写它们。

安装或打开导师后，粘贴下面这段提示：

```text
Start me on CCAO-F in guided no-code mode. Run the local validators for me,
teach every scenario interactively, and help me create each learner-owned
workflow, policy, evidence, or review artifact from my decisions. Do not skip
the practical work or quizzes, and do not require me to write Python.
```

你仍要预测结果、操作场景、论证选择、修订未通过的产物，并完成原创测评。界面会变，证据标准不会变。

## 手动学习一节课

每节认证课都遵循相同的 GitHub 约定：

```text
certifications/claude/lessons/NN-lesson/
├── docs/zh.md          full lesson and interactive-lab reasoning
├── code/main.py        scenario runner, simulator, scorer, or validator
├── code/tests/         deterministic verification
├── outputs/            completed reference artifact
└── quiz.json           six grounded questions with explanations
```

从所选路线中打开下一课的路径。阅读 `docs/zh.md`，预测场景结果，然后运行：

```bash
LESSON=certifications/claude/lessons/27-enterprise-governance-compliance-and-hitl
python3 "$LESSON/code/main.py"
python3 -m unittest discover -s "$LESSON/code/tests" -v
```

第 27 课是治理示例：它的可运行内容会校验一份策略和人工评审材料包。它不会为了概念性主题硬塞虚构的 provider 代码。其他课程提供威胁模型、ADR、审批流程、证据包、工具循环模拟器、RAG 报告、API 生命周期实验和综合项目校验器。

---
title: "Lesson 2 — 文件整理、资料理解、工作流自动化"
sourceId: "08-agents/agent-systems-handbook"
sourceTitle: "Agent Systems Handbook（智能体系统手册）"
sourceKind: "工程手册"
licenseLabel: "限非商用"
lang: "英文"
tier: 1
volume: "08-agents"
sourceUrl: "https://github.com/Prompthon-IO/agent-systems-handbook"
entryUrl: "https://github.com/Prompthon-IO/agent-systems-handbook/blob/5b71cfa598701a34834f33b42be5f8a422138a3c/skills/course-support/zh-Hans/lesson-2.md"
sourceRel: "skills/course-support/zh-Hans/lesson-2.md"
rawUrl: "/raw/08-agents/agent-systems-handbook/skills/course-support/zh-Hans/lesson-2.md"
sourceSha256: "ce9054091849cef72bce923cbf5ef5475785396eee29be3b3208d8410604fc04"
pageSha256: "ce9054091849cef72bce923cbf5ef5475785396eee29be3b3208d8410604fc04"
contentMode: "local-full"
zh: ""
---

# Lesson 2 — 文件整理、资料理解、工作流自动化

[英文版](/lib/08-agents/agent-systems-handbook/skills-course-support-lessons-lesson-2)为规范来源，本页保持相同流程和安全边界。只使用合成文件，不使用真实 Downloads。课程包先合入 `develop`；正式 Handbook 发布是另一项操作。

## 学习目标

Organize 负责文件位置；Understand 负责有来源的知识笔记；Automate 负责工具顺序、审批点与运行状态。先解释三个职责，再组合工作流。

## 准备（5 分钟）

在包含课程代码的 fork/clone 根目录运行：

```bash
python3 skills/course-support/scripts/setup_course_skills.py --lesson 2
python3 skills/course-support/scripts/seed_demo.py
python3 skills/course-support/scripts/course_store.py context
```

第一条命令列出三个 Codex Skill 名称；第二条在 `.local-state/course-demo/lesson-2/` 创建数据，不覆盖旧作业。incoming 中有发票、学校资料和未知扩展名；research 中有重复资料和容量冲突。此时是本地演示身份，不代表已登录生产账号。

## 可选扩展练习：文件整理

老师可以选择其中一个案例，也可以让学生按顺序完成三个案例。三个
案例彼此独立，在一个文件夹中的操作不会影响另外两个。只使用以下
命令生成的合成练习文件，不要用真实的 Downloads 文件夹练习。

在下面的练习中，**预览（preview）**只展示建议，不移动文件；
**计划（plan）**是保存建议移动操作的文件；**冲突（conflict）**是
为了安全而跳过的操作；**操作日志（journal）**记录实际执行结果。
其他术语请参阅 Local Document Organizer 的
[入门术语表](/lib/08-agents/agent-systems-handbook/skills-local-document-organizer#beginner-terminology)。

每条 seed 命令都会拒绝删除或替换已有的输出目录。重复练习时，请
保留之前的作业，并用 `--output` 指定一个新路径，例如
`--output .local-state/course-demo/student-files-attempt-2`。

### 1. 学生文件：只预览

**目的。** 了解清晰可读的文件名和扩展名规则如何生成计划，并观察
无法确定类别的文件如何留在原处。

**准备。** 生成一份新的合成学生文件案例：

```bash
python3 skills/course-support/scripts/seed_demo.py --scenario organizer-student-files
```

**命令。** 扫描 incoming 文件夹。这条命令只查看并提出建议，不会
移动文件。

```bash
python3 skills/local-document-organizer/scripts/course_organizer.py scan --folder .local-state/course-demo/lesson-2-organizer-student-files/incoming
```

**Codex 示例提示。**

```text
使用 $local-document-organizer 预览学生文件练习文件夹。解释每个建议分类，把不确定的文件留在原处。不要移动任何文件。
```

**预期结果。**

- `tuition-invoice.txt` -> `Invoices/`
- `school-reading.md` -> `School/`
- `internship-resume.txt` -> `Resumes/`
- `random-download.zzz` 留在原处
- 预览不会移动任何文件

**思考问题。** 为什么把未知文件留在原处，比猜测一个类别更安全？

### 2. 自由职业者规则：自定义分类

**目的。** 观察更具体的文件名规则如何改善分类，并理解规则顺序
为什么会改变结果。

**准备。** 生成一份新的合成自由职业者案例：

```bash
python3 skills/course-support/scripts/seed_demo.py --scenario organizer-freelancer-rules
```

**命令。** 先使用默认规则生成第一次预览：

```bash
python3 skills/local-document-organizer/scripts/course_organizer.py scan --folder .local-state/course-demo/lesson-2-organizer-freelancer-rules/incoming
```

一开始，`client-meeting-notes.txt` 会进入 `Notes`，因为通用的文本
扩展名规则匹配了 `.txt`。在规范源文件
`skills/local-document-organizer/references/classification-rules.csv` 中，
把下面这一行加在通用 `ext-text` 规则之前：

```csv
keyword-meeting,Meetings,filename_keyword,meeting|minutes,medium,true
```

再次扫描或调用 Skill 前，先从规范包刷新已安装的 Skill 副本：

```bash
python3 skills/course-support/scripts/setup_course_skills.py --lesson 2
```

再次运行同一条扫描命令，生成一份新计划。不要修改已经审阅或批准的
现有计划。

**Codex 示例提示。**

```text
使用 $local-document-organizer 比较加入 Meetings 规则前后的自由职业者练习预览。解释每个文件匹配了哪条规则。不要应用任何一个计划。
```

**预期结果。**

- 发票仍在 `Invoices/`
- 协议仍在 `Contracts/`
- 会议记录从 `Notes/` 变为 `Meetings/`
- 网站项目想法仍在 `Notes/`
- 规则采用首条匹配结果，因此顺序很重要

如果不打算保留这项仓库修改，请在练习后恢复该规则。手动删除
`Meetings` 规则后，再运行一次相同的 setup 命令，使已安装副本与
规范包保持同步。

**思考问题。** 为什么更具体的会议规则必须放在通用 `ext-text`
规则之前？

### 3. 安全恢复：冲突与撤销

**目的。** 使用合成文件练习审批、重名保护、部分成功结果和撤销，
不让真实文件承担风险。

**准备。** 生成一份新的合成安全恢复案例：

```bash
python3 skills/course-support/scripts/seed_demo.py --scenario organizer-safe-recovery
```

**命令。** 扫描 incoming 文件夹：

```bash
python3 skills/local-document-organizer/scripts/course_organizer.py scan --folder .local-state/course-demo/lesson-2-organizer-safe-recovery/incoming
```

预览会建议把 `invoice-august.txt` 移到 `Invoices/`。这仍然只是建议；
真正 apply 时，系统才会安全检查并执行同名冲突保护。

**Codex 示例提示。**

```text
使用 $local-document-organizer 预览安全恢复练习文件夹。解释建议移动操作和已有发票造成的冲突，然后等待我明确批准，再执行任何操作。
```

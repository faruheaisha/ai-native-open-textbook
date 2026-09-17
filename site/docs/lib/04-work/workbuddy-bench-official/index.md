---
title: "WorkBuddy Bench（腾讯官方评测集）"
landing: true
tier: 3
sourceId: "04-work/workbuddy-bench-official"
sourceTitle: "WorkBuddy Bench（腾讯官方评测集）"
sourceKind: "产品仓库"
licenseLabel: "限非商用"
lang: "英文"
volume: "04-work"
sourceUrl: "https://github.com/Tencent/workbuddy-bench"
entryUrl: "https://github.com/Tencent/workbuddy-bench/blob/625b2233093ae4f23e76be28c1f341d41cc70373/README.md"
sourceRel: ""
contentMode: "local-full"
zh: ""
---

# WorkBuddy Bench（腾讯官方评测集）

WorkBuddy Bench is a benchmark for evaluating coding agents on real-world work,
reverse-engineered from actual developer, PM, algo, QA, ops, and security tasks.
Given a task and a sandboxed workspace, an agent is asked to produce the correct
change (a patch, an artifact, a report) and is graded against a test suite.

## 课时

- **.agents**
  - **skills**
    - **wbbench-report-skills**
      - **references**
        - [WB-Bench-Code Report Workflow](/lib/04-work/workbuddy-bench-official/_agents-skills-wbbench-report-skills-references-wb-bench-code.md)
        - [WorkBuddyBench-Office Report Workflow](/lib/04-work/workbuddy-bench-official/_agents-skills-wbbench-report-skills-references-wb-bench-office.md)
        - [WB-Bench-Web Report Workflow](/lib/04-work/workbuddy-bench-official/_agents-skills-wbbench-report-skills-references-wb-bench-web.md)
      - [WB-Bench Report Skills](/lib/04-work/workbuddy-bench-official/_agents-skills-wbbench-report-skills-SKILL.md)
    - **wbbench-run-setup**
      - **references**
        - [Phase 0 — Datasets](/lib/04-work/workbuddy-bench-official/_agents-skills-wbbench-run-setup-references-00-datasets.md)
        - [Phase 1 — Environment](/lib/04-work/workbuddy-bench-official/_agents-skills-wbbench-run-setup-references-01-environment.md)
        - [Phase 2 — Model](/lib/04-work/workbuddy-bench-official/_agents-skills-wbbench-run-setup-references-02-model.md)
        - [Phase 3 — Credentials (.env)](/lib/04-work/workbuddy-bench-official/_agents-skills-wbbench-run-setup-references-03-credentials.md)
        - [Phase 4 — Job](/lib/04-work/workbuddy-bench-official/_agents-skills-wbbench-run-setup-references-04-job.md)
        - [Phase 5 — Launch](/lib/04-work/workbuddy-bench-official/_agents-skills-wbbench-run-setup-references-05-run.md)
        - [Phase 6 — Metrics + trajectory analysis](/lib/04-work/workbuddy-bench-official/_agents-skills-wbbench-run-setup-references-06-analysis.md)
      - [WB-Bench Run Setup](/lib/04-work/workbuddy-bench-official/_agents-skills-wbbench-run-setup-SKILL.md)
- **configs**
  - **harnesses**
    - **claude-code**
      - [claude-code harness](/lib/04-work/workbuddy-bench-official/configs-harnesses-claude-code-CONFIG.md)
    - **codebuddy-code**
      - [CodeBuddy Code (cbc) harness](/lib/04-work/workbuddy-bench-official/configs-harnesses-codebuddy-code-CONFIG.md)
    - [Adding / adjusting a harness](/lib/04-work/workbuddy-bench-official/configs-harnesses-HARNESS_AUTHORING.md)
  - [Configuration system](/lib/04-work/workbuddy-bench-official/configs.md)
  - [配置体系](/lib/04-work/workbuddy-bench-official/configs-README.zh.md)
- **datasets**
  - [Datasets](/lib/04-work/workbuddy-bench-official/datasets.md)
- [README](/lib/04-work/workbuddy-bench-official/src-workbuddy_bench-proxy.md)
- [README.zh](/lib/04-work/workbuddy-bench-official/README.zh.md)

开始学习 → [WB-Bench-Code Report Workflow](_agents-skills-wbbench-report-skills-references-wb-bench-code.md)

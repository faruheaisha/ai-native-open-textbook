---
title: "Clarifications · wire-nanoclaw-channel skill spec"
sourceId: "07-coding/fufan-vibe-coding-course"
sourceTitle: "Vibe Coding：AI 编程实战课"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "中英混排"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse"
entryUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage7_Superpowers_Applied/Lesson13_SpecKit_Superpowers_Cooperation/nanoclaw-v2-backend/specs/wire-nanoclaw-channel-skill/clarifications.md"
sourceRel: "Stage7_Superpowers_Applied/Lesson13_SpecKit_Superpowers_Cooperation/nanoclaw-v2-backend/specs/wire-nanoclaw-channel-skill/clarifications.md"
rawUrl: "/raw/07-coding/fufan-vibe-coding-course/Stage7_Superpowers_Applied/Lesson13_SpecKit_Superpowers_Cooperation/nanoclaw-v2-backend/specs/wire-nanoclaw-channel-skill/clarifications.md"
sourceSha256: "786feeda41be51db48be5c2efa1a17a802780800d73669f707bca9a7bf96d6d2"
pageSha256: "786feeda41be51db48be5c2efa1a17a802780800d73669f707bca9a7bf96d6d2"
contentMode: "local-full"
zh: ""
---

# Clarifications · wire-nanoclaw-channel skill spec

**日期**: 2026-05-12 | **来源 spec**: `specs/wire-nanoclaw-channel-skill/spec.md`
**扫描依据**: baseline-failures.md（Step 3 RED 3坑）+ brainstorming.md（writing-skills 元方法）

---

## Q1 · RC-01~RC-08 症状描述的"锐利度"要求

**模糊点**: spec 里 RC-04 写 "log 有 inbound，但 messaging_groups 表 0 行，wire-dm.ts 报 'No unwired groups'"——学员凭什么知道去查 `messaging_groups` 这张表？其他 RC 同理：症状描述停在表面现象，没说"看到这个症状时你要执行什么命令来确认"。

**为什么会翻车**: 直播现场学员看到 "No unwired groups" 不知道下一步查哪里；SKILL.md 作者如果只照 spec 里的症状描述写，会漏掉诊断命令，学员拿到 SKILL.md 依然卡在"现象已知，不知怎么查"。

**澄清方案 A**: spec 只要求 SKILL.md 覆盖 8 个症状关键词（grep 可命中），具体诊断命令由 SKILL.md 作者自行判断是否加。

**澄清方案 B**: spec 明确要求 SKILL.md 每个 RC 段必须包含 **"症状→诊断命令→修复命令"三件套**，每件套可以是单行 bash 命令，允许用 `<channel>` 占位符。

**澄清方案 C**: spec 在 FR-2 表格里增加第四列 "最少诊断命令"，直接给出机械验证锚（如 RC-04 要求 `pnpm exec tsx scripts/q.ts data/v2.db "SELECT count(*) FROM messaging_groups"`），SKILL.md 必须含这条或等效命令。

**推荐**: **B** — 比 A 锐利（不依赖作者判断），比 C 灵活（不 hardcode 具体 SQL，允许等效命令）。三件套结构本身在 500 词限制内可以每条用 3 行超紧凑格式。

**回写哪段 spec**: FR-2 节，在表格后补 1 条要求："SKILL.md 每个 RC 段须含症状关键词、至少 1 条诊断命令、至少 1 条修复命令"。

---

## Q2 · NFR-1 "不许 hardcode channel 名"的豁免边界

**模糊点**: spec 写 "skill 不许出现 hardcode 的 channel 名"，但 SKILL.md 几乎不可能不举例。`sanity-check.sh telegram` 这个调用示例里的 `telegram`、注释里的 `# e.g., telegram`——算不算违反？

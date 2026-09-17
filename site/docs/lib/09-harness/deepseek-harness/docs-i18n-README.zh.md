---
title: "双语文档"
sourceId: "09-harness/deepseek-harness"
sourceTitle: "DeepSeek Harness"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "中英混排"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/deepseek-ai/deepseek-harness"
entryUrl: "https://github.com/deepseek-ai/deepseek-harness/blob/c291e7961a515f6d7af9304e7fd1d257929aef26/docs/i18n/README.zh.md"
sourceRel: "docs/i18n/README.zh.md"
rawUrl: "/raw/09-harness/deepseek-harness/docs/i18n/README.zh.md"
sourceSha256: "4fed72c9559b2a66c336fe07e27ef85161336485c3c222a6a74f5fb18a0de2d3"
pageSha256: "4fed72c9559b2a66c336fe07e27ef85161336485c3c222a6a74f5fb18a0de2d3"
contentMode: "local-full"
zh: ""
---

# 双语文档

[English](/lib/09-harness/deepseek-harness/docs-i18n) | 中文

本仓库的文档会被公司内外的人和 agent（智能体）阅读，因此范围内的每篇文档都以英文和简体中文维护。本页定义配对约定、检查、范围与排除规则；[translation-rules.md](https://github.com/deepseek-ai/deepseek-harness/blob/c291e7961a515f6d7af9304e7fd1d257929aef26/docs/i18n/translation-rules.zh.md) 定义如何翻译；[terminology.md](https://github.com/deepseek-ai/deepseek-harness/blob/c291e7961a515f6d7af9304e7fd1d257929aef26/docs/i18n/terminology.md) 是术语真源。agent 的日常工作遵循 [docs/AGENTS.md](https://github.com/deepseek-ai/deepseek-harness/blob/c291e7961a515f6d7af9304e7fd1d257929aef26/docs/AGENTS.md) 中的轻量路径；扩展版 [.agents/skills/dsh-translate-docs](https://github.com/deepseek-ai/deepseek-harness/blob/c291e7961a515f6d7af9304e7fd1d257929aef26/.agents/skills/dsh-translate-docs/SKILL.md) 工作流仅在用户显式调用时可用。

## 配对约定

- **两种语言同权。** 一篇文档可以先用任一语言撰写和评审（先写中文的 Agent Note 与先写英文的一样正当），另一侧由它翻译而来。两个文件谁也不高于谁；约束它们的是二者必须说同样的话。
- **一对文档是三个同目录文件。** 英文 `foo.md`、中文 `foo.zh.md`，加一份一致性记录 `foo.i18n.yaml`，都在同一目录。不用语言目录，不用独立翻译仓库，不用中英混排的单文件。配对必须整体合并：PR（Pull Request）永远不会只带一种语言而缺其余两个文件。
- **一致性记录。**`foo.i18n.yaml` 保存两侧文件在上一次被确认「说同样的话」时各自的完整 Git blob hash：

  ```yaml
  foo.md: 3f786850e387550fdab836ed7e6dc881de23001b
  foo.zh.md: 89e6c98d92887913cadf06b2adb97f26cde4849b
  ```

  用 blob hash 而不是 commit hash，这样同一个 PR 里改动的文件也能算出记录（`git hash-object foo.md`），一致性是纯内容比较。`--write` 会先把这些快照存入本地 Git 对象库再写下记录，未提交的 worktree 内容也不例外；它还会在内容寻址的 `refs/dsh/translation-pairing/snapshots/` ref 下固定每个不同的已存 blob，使垃圾回收无法让已记录的恢复指针失效。记录的 hash 能还原任一侧上次确认时的确切文本，所以失去同步的配对是「按被改一侧的 diff 最小化地修补另一侧」，从不整篇重译。日常工作会直接完成这份修补；用户显式调用扩展工作流时，可改由 `pnpm run gen-translation-brief <pair>` 以能安全对齐的最窄粒度汇集这次更新，并由 `--apply` 在结构校验后拼接仅涉及围栏代码块的改动。两侧对齐后，`pnpm run verify-translation-pairing --write <pair>` 重新记录两个 hash；那份 YAML diff 就是「确认一致」这个动作本身，可以被评审，也正因如此，`--write` 要求点名你确认过的配对（`--write --all` 是显式的全语料形式）。

  当两个分支都包含同一配对的有效确认时，已安装的 `dsh-translation-pairing` Git 合并驱动只会在 Git 默认文本合并能分别干净合并记录所指向的英文三方 blob 与中文三方 blob，且合并后的配对仍保留必需的语言切换行和结构签名时，组合出一份新记录。中文文件必须保留指向英文的反向链接；普通撰写的英文源必须保留指向中文的链接，而清单内的生成英文源不作此要求。任何合并驱动无法验证的结构都保留为普通冲突；`pnpm run resolve-translation-pairing-conflicts` 会对已经停止的合并执行同一套遇错即保留冲突的操作，暂存每份可安全生成的配对记录，并在还有其他配对冲突时以非零状态退出。[自动配对合并 Agent Note](https://github.com/deepseek-ai/deepseek-harness/blob/c291e7961a515f6d7af9304e7fd1d257929aef26/.agents/notes/implemented/process/2026-08-08-automatic-translation-pairing-merges.zh.md) 负责记录该机制与备选方案。

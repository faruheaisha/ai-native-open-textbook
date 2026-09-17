---
title: "Bilingual documentation"
sourceId: "09-harness/deepseek-harness"
sourceTitle: "DeepSeek Harness"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "中英混排"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/deepseek-ai/deepseek-harness"
entryUrl: "https://github.com/deepseek-ai/deepseek-harness/blob/c291e7961a515f6d7af9304e7fd1d257929aef26/docs/i18n/README.md"
sourceRel: "docs/i18n/README.md"
rawUrl: "/raw/09-harness/deepseek-harness/docs/i18n/README.md"
sourceSha256: "d644fb0ec4d2dbb9317f813cd499ab3af0506e36356aec8ea5361c25c11f5fe3"
pageSha256: "d644fb0ec4d2dbb9317f813cd499ab3af0506e36356aec8ea5361c25c11f5fe3"
contentMode: "local-full"
zh: ""
---

# Bilingual documentation

English | [中文](/lib/09-harness/deepseek-harness/docs-i18n-README.zh)

This repo's documentation is read by people and agents both inside and outside the company, so every document in scope is maintained in English and Simplified Chinese. This page defines the pairing contract, checks, scope, and exclusions; [translation-rules.md](https://github.com/deepseek-ai/deepseek-harness/blob/c291e7961a515f6d7af9304e7fd1d257929aef26/docs/i18n/translation-rules.md) defines how to translate; [terminology.md](https://github.com/deepseek-ai/deepseek-harness/blob/c291e7961a515f6d7af9304e7fd1d257929aef26/docs/i18n/terminology.md) is the terminology source of truth. Routine agent work follows the lightweight path in [docs/AGENTS.md](https://github.com/deepseek-ai/deepseek-harness/blob/c291e7961a515f6d7af9304e7fd1d257929aef26/docs/AGENTS.md); the extended [.agents/skills/dsh-translate-docs](https://github.com/deepseek-ai/deepseek-harness/blob/c291e7961a515f6d7af9304e7fd1d257929aef26/.agents/skills/dsh-translate-docs/SKILL.md) workflow is available only through explicit user invocation.

## The pairing contract

- **Both languages carry equal authority.** A document may be authored and reviewed in either language first — a Chinese-first Agent Note is as legitimate as an English-first one — and the counterpart is translated from it. Neither file outranks the other; what binds them is that they must say the same thing.
- **A pair is three sibling files.** The English `foo.md`, the Chinese `foo.zh.md`, and a consistency record `foo.i18n.yaml`, all in the same directory. No locale directories, no separate translation repo, no interleaved bilingual files. Pairs merge whole: a PR never lands one language without the other two files.
- **The consistency record.** `foo.i18n.yaml` holds the full git blob hash of each side as of the last time the two were confirmed to say the same thing:

  ```yaml
  foo.md: 3f786850e387550fdab836ed7e6dc881de23001b
  foo.zh.md: 89e6c98d92887913cadf06b2adb97f26cde4849b
  ```

  Blob hashes, not commit hashes, so the record is computable for files edited in the same PR (`git hash-object foo.md`) and consistency is a pure content comparison. `--write` stores those snapshots in the local Git object database before recording them, including uncommitted working-tree contents, and pins every distinct stored blob under a content-addressed `refs/dsh/translation-pairing/snapshots/` ref so garbage collection cannot invalidate a recorded recovery pointer. The recorded hashes recover the exact last-confirmed text of either side, so an out-of-sync pair is updated by patching the counterpart minimally against the edited side's diff — never by re-translating whole files. Routine work makes that patch directly; when the user explicitly invokes the extended workflow, `pnpm run gen-translation-brief <pair>` can instead assemble the update at the narrowest safely aligned granularity and `--apply` can splice a code-fence-only change after structural validation. After bringing the pair back in line, `pnpm run verify-translation-pairing --write <pair>` re-records both hashes; that yaml diff is the reviewable act of confirming consistency, which is why `--write` requires naming the pairs you confirmed (`--write --all` is the explicit corpus-wide form).

  When two branches contain valid confirmations of the same pair, the installed `dsh-translation-pairing` Git merge driver composes a new record only if Git's default text merge succeeds for both recorded owner-blob triplets and the merged pair retains its required switchers and structural signature. The Chinese file must retain its English backlink; an authored English source must retain its Chinese link, while a listed generated English source is exempt. Any structure the driver cannot verify remains an ordinary conflict; `pnpm run resolve-translation-pairing-conflicts` applies the same fail-closed operation to a merge that has already stopped, stages every safe pairing record, and exits unsuccessfully when other pairing conflicts remain. The [automatic pairing merges Agent Note](https://github.com/deepseek-ai/deepseek-harness/blob/c291e7961a515f6d7af9304e7fd1d257929aef26/.agents/notes/implemented/process/2026-08-08-automatic-translation-pairing-merges.md) owns the mechanism and alternatives.

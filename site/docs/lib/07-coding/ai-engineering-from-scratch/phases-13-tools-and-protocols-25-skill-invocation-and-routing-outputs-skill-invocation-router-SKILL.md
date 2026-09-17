---
title: "Skill invocation router"
sourceId: "07-coding/ai-engineering-from-scratch"
sourceTitle: "AI Engineering from Scratch（英文原版）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/rohitg00/ai-engineering-from-scratch"
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/13-tools-and-protocols/25-skill-invocation-and-routing/outputs/skill-invocation-router/SKILL.md"
sourceRel: "phases/13-tools-and-protocols/25-skill-invocation-and-routing/outputs/skill-invocation-router/SKILL.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/13-tools-and-protocols/25-skill-invocation-and-routing/outputs/skill-invocation-router/SKILL.md"
sourceSha256: "7376d66c0da85506c349cae52ea8383896791e39e6499f6a4b1e9ed5dab9313c"
pageSha256: "7376d66c0da85506c349cae52ea8383896791e39e6499f6a4b1e9ed5dab9313c"
contentMode: "local-full"
zh: ""
---

# Skill invocation router

Use this skill when a host needs an auditable activation policy rather than one undifferentiated `invocable` flag.

1. Read `references/invocation-model.md` and classify the requested channel.
2. Review `assets/host-policy.json` as an example adapter configuration, not a portable standard.
3. Run `python3 scripts/simulate_invocation.py --policy assets/host-policy.json --actor ACTOR --name NAME --description DESCRIPTION --query QUERY [--explicit-name NAME] [--caller-name NAME] [--depth N] [--user-invocable true|false] [--disable-model-invocation true|false]`.
4. For a human, application, skill, or harness request, require an exact discovered name and its channel-specific allowlist.
5. For a skill caller, also require caller identity, a non-cyclic target, and a bounded composition depth.
6. For a model or autonomous agent request, remove candidates that the actor or recognized host extensions make ineligible.
7. Score only the remaining descriptions. Select the strongest eligible match or abstain when no eligible candidate clears the threshold.
8. Return the JSON decision with the adapter, channel, score, and policy reason.

Activation loads instructions. It does not approve tools, filesystem changes, network access, secret use, or bundled scripts.

---
title: "v1 API inventory"
sourceId: "10-context-memory/agent-skills-addyosmani"
sourceTitle: "Agent Skills（Addy Osmani）"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/addyosmani/agent-skills"
entryUrl: "https://github.com/addyosmani/agent-skills/blob/6ca0cd7db39b41b1c37e26d335c507ee92382c6d/evals/fixtures/deprecation-and-migration/api-inventory.md"
sourceRel: "evals/fixtures/deprecation-and-migration/api-inventory.md"
rawUrl: "/raw/10-context-memory/agent-skills-addyosmani/evals/fixtures/deprecation-and-migration/api-inventory.md"
sourceSha256: "ac739ed01a61c7dea2e9ce570948cfe5443fce471fe8e3d894bb42c82a7ca6c2"
pageSha256: "ac739ed01a61c7dea2e9ce570948cfe5443fce471fe8e3d894bb42c82a7ca6c2"
contentMode: "local-full"
zh: ""
---

# v1 API inventory

- Public consumers: 200 organizations.
- Replacement: `/v2/orders`, available in production but not yet announced.
- Current v1 traffic: 48,000 requests/day from 173 active API keys.
- Largest consumer contract requires 90 days' notice for breaking changes.
- Existing telemetry records API key, route, status, and response latency.
- Support can contact 188 consumers directly; 12 use reseller-managed accounts.
- v1 currently has no response deprecation headers or migration guide.

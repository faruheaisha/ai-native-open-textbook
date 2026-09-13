---
title: "URL shortener service brief"
sourceId: "10-context-memory/agent-skills-addyosmani"
sourceTitle: "Agent Skills（Addy Osmani）"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/addyosmani/agent-skills"
entryUrl: "https://github.com/addyosmani/agent-skills/blob/6ca0cd7db39b41b1c37e26d335c507ee92382c6d/README.md"
zh: ""
---

# URL shortener service brief

The service needs public operations to create a short URL, resolve a slug, and
read aggregate click statistics. Clients include a browser extension and a
mobile app, so contracts must remain backward compatible.

Known constraints:

- Destination URLs are supplied by untrusted users.
- Slugs are six to twelve URL-safe characters.
- A missing slug and an expired slug must be distinguishable to operators, but
  the public API must not expose internal storage details.
- Statistics may be delayed by up to one minute.

Still undecided:

- Whether callers may request custom slugs.
- Whether links expire by default.
- Whether statistics require authentication.

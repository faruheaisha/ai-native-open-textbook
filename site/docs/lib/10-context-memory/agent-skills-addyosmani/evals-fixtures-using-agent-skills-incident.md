---
title: "Login regression report"
sourceId: "10-context-memory/agent-skills-addyosmani"
sourceTitle: "Agent Skills（Addy Osmani）"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/addyosmani/agent-skills"
entryUrl: "https://github.com/addyosmani/agent-skills/blob/6ca0cd7db39b41b1c37e26d335c507ee92382c6d/evals/fixtures/using-agent-skills/incident.md"
sourceRel: "evals/fixtures/using-agent-skills/incident.md"
rawUrl: "/raw/10-context-memory/agent-skills-addyosmani/evals/fixtures/using-agent-skills/incident.md"
sourceSha256: "e0fa777f873d7616cd6bafa9ff3c9c35b70124ab8a8c05608f785bcab760111c"
pageSha256: "e0fa777f873d7616cd6bafa9ff3c9c35b70124ab8a8c05608f785bcab760111c"
contentMode: "local-full"
zh: ""
---

# Login regression report

The login page began returning HTTP 500 after yesterday's deployment. The
request reaches the authentication callback, then fails before a session cookie
is written. There is no confirmed root cause yet. The user asked for help
getting login working again, not for a new authentication design.

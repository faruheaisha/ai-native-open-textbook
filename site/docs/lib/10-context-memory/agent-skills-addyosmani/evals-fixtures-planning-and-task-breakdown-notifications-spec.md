---
title: "Notifications specification"
sourceId: "10-context-memory/agent-skills-addyosmani"
sourceTitle: "Agent Skills（Addy Osmani）"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/addyosmani/agent-skills"
entryUrl: "https://github.com/addyosmani/agent-skills/blob/6ca0cd7db39b41b1c37e26d335c507ee92382c6d/evals/fixtures/planning-and-task-breakdown/notifications-spec.md"
sourceRel: "evals/fixtures/planning-and-task-breakdown/notifications-spec.md"
rawUrl: "/raw/10-context-memory/agent-skills-addyosmani/evals/fixtures/planning-and-task-breakdown/notifications-spec.md"
sourceSha256: "9705170691d53703e42a0494ead60b09c4d7aa0bd48444426ad8fe8ace6f87f4"
pageSha256: "9705170691d53703e42a0494ead60b09c4d7aa0bd48444426ad8fe8ace6f87f4"
contentMode: "local-full"
zh: ""
---

# Notifications specification

Users can opt into email notifications when a task is assigned or becomes
overdue. Preferences are stored per user and default to disabled. Assignment
events already exist; overdue detection runs every fifteen minutes.

Requirements:

- Add preference read/update endpoints with boundary validation.
- Publish notification jobs from assignment and overdue flows.
- Deduplicate jobs by user, task, event type, and event version.
- Send email through the existing provider adapter.
- Record delivery status without storing message bodies.
- Feature flag the sending path; disabled remains the safe default.

Verification must include preference API tests, job deduplication tests,
provider-adapter integration tests, and one end-to-end assignment scenario.
No SMS, push notifications, or notification history UI is in scope.

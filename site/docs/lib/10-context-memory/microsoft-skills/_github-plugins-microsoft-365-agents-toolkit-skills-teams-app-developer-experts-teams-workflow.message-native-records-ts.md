---
title: "workflow.message-native-records-ts"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/microsoft-365-agents-toolkit/skills/teams-app-developer/experts/teams/workflow.message-native-records-ts.md"
sourceRel: ".github/plugins/microsoft-365-agents-toolkit/skills/teams-app-developer/experts/teams/workflow.message-native-records-ts.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/microsoft-365-agents-toolkit/skills/teams-app-developer/experts/teams/workflow.message-native-records-ts.md"
sourceSha256: "875f5cdff9ecb12f45c9afe502b10e9602096f1a3b583998ace2e232fadae0a9"
pageSha256: "875f5cdff9ecb12f45c9afe502b10e9602096f1a3b583998ace2e232fadae0a9"
contentMode: "local-full"
zh: ""
---

# workflow.message-native-records-ts

## purpose

Implement the "structured records as message objects" pattern where workflow state renders inline as durable, updatable Adaptive Cards tied to backing store rows and anchored in threads.

## rules

1. **Every workflow record is an Adaptive Card backed by a store row.** The card is the visual representation; the list/dataverse row is the source of truth. Card actions read from and write to the store, then refresh the card to reflect current state.
2. **Use `Action.Execute` with `verb` for all record mutations.** `Action.Execute` triggers a server-side `adaptiveCard/action` invoke, allowing the bot to update the backing store and return a refreshed card in one round-trip. Never use `Action.Submit` for records — it doesn't support card refresh. [adaptivecards.io -- Action.Execute](https://adaptivecards.io/explorer/Action.Execute.html)

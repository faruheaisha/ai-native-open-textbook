---
title: "Claude Code System Prompts"
sourceId: "10-context-memory/claude-code-system-prompts"
sourceTitle: "Claude Code System Prompts"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/Piebald-AI/claude-code-system-prompts"
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/data-sdk-request-user-dialog-kind-field.md"
sourceRel: "system-prompts/data-sdk-request-user-dialog-kind-field.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/data-sdk-request-user-dialog-kind-field.md"
sourceSha256: "3856f53b3091fd5e2747db0582b16b976c34c69a30c2bd782062116f7837ba68"
pageSha256: "3856f53b3091fd5e2747db0582b16b976c34c69a30c2bd782062116f7837ba68"
contentMode: "local-full"
zh: ""
---

# Claude Code System Prompts

Identifier for the dialog the host should render. Open string union — new kinds may be added without bumping the protocol. A kind is only sent in sessions where some attached client declared it in initialize.supportedDialogKinds (declare exactly the kinds you can render); on multi-client transports the request still reaches every attached client. A host that receives a kind it did not declare must not answer it (an error-subtype response is discarded and the dialog stays pending) — never with \{behavior: "cancelled"\}, which is a real settlement treated as the user dismissing the dialog. An unanswered dialog is cancelled by the CLI after its dialog deadline.

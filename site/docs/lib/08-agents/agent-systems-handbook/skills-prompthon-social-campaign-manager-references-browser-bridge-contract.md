---
title: "Browser Bridge Contract"
sourceId: "08-agents/agent-systems-handbook"
sourceTitle: "Agent Systems Handbook（智能体系统手册）"
sourceKind: "工程手册"
licenseLabel: "限非商用"
lang: "英文"
tier: 1
volume: "08-agents"
sourceUrl: "https://github.com/Prompthon-IO/agent-systems-handbook"
entryUrl: "https://github.com/Prompthon-IO/agent-systems-handbook/blob/5b71cfa598701a34834f33b42be5f8a422138a3c/skills/prompthon-social-campaign-manager/references/browser-bridge-contract.md"
sourceRel: "skills/prompthon-social-campaign-manager/references/browser-bridge-contract.md"
rawUrl: "/raw/08-agents/agent-systems-handbook/skills/prompthon-social-campaign-manager/references/browser-bridge-contract.md"
sourceSha256: "dcdc154675650eb442f53eccd99353daadcb96e09f8e7ebb3c8ae724f9933038"
pageSha256: "dcdc154675650eb442f53eccd99353daadcb96e09f8e7ebb3c8ae724f9933038"
contentMode: "local-full"
zh: ""
---

# Browser Bridge Contract

## Purpose

Use this reference when the skill needs to work with the live Local-mode browser page instead of only the production API.

This is the correct surface for:
- requesting a short handoff code from the open signed-in page
- requesting live `editor context`
- coordinating a local companion mutation that should also trigger visible page refresh

## Contract Snapshot

- protocol version: `social-manager-local-pack.v2`
- handoff request event: `prompthon:social-manager-local-handoff-request`
- handoff response event: `prompthon:social-manager-local-handoff-response`
- editor-context request event: `prompthon:social-manager-local-editor-context-request`
- editor-context response event: `prompthon:social-manager-local-editor-context-response`
- mutation request event: `prompthon:social-manager-local-mutation-request`
- mutation response event: `prompthon:social-manager-local-mutation-response`
- refresh event: `prompthon:social-manager-local-refresh`
- skill pack id: `prompthon-social-media-manager-local-pack.v2`

## Handoff Request Payload

```json
{
  "protocolVersion": "social-manager-local-pack.v2",
  "requestId": "<uuid>",

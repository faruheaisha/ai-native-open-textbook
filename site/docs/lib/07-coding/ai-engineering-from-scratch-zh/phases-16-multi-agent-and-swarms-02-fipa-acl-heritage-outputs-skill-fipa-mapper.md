---
title: "AI 工程从零到一（中文）"
sourceId: "07-coding/ai-engineering-from-scratch-zh"
sourceTitle: "AI 工程从零到一（中文）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh"
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/16-multi-agent-and-swarms/02-fipa-acl-heritage/outputs/skill-fipa-mapper.md"
sourceRel: "phases/16-multi-agent-and-swarms/02-fipa-acl-heritage/outputs/skill-fipa-mapper.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/16-multi-agent-and-swarms/02-fipa-acl-heritage/outputs/skill-fipa-mapper.md"
sourceSha256: "d6f06390868e63e188d14a1df40aebb5d705ffbec196471a1309d206e20f5d35"
pageSha256: "d6f06390868e63e188d14a1df40aebb5d705ffbec196471a1309d206e20f5d35"
contentMode: "local-full"
zh: ""
---

# AI 工程从零到一（中文）

Given a new agent-protocol spec, produce the FIPA-ACL mapping so the reader can tell which parts are reinvention and which are genuine new structure.

Produce:

1. **Envelope mapping.** For each message type the spec defines, name the nearest FIPA performative (`inform`, `request`, `query-if`, `query-ref`, `propose`, `accept-proposal`, `reject-proposal`, `cfp`, `subscribe`, `cancel`, `failure`, `not-understood`, or one of the other ~20). If no performative fits, describe the gap precisely.
2. **Correlation model.** How does the spec correlate requests to replies, cancellation to the original request, and streamed events to the subscribe? Compare to FIPA's `:conversation-id` and `:reply-with` fields.
3. **Content-language stance.** Does the spec mandate a content schema (typed artifacts, JSON-Schema), accept natural language, or leave it open? Compare to FIPA's SL0/SL1 and ontology fields.
4. **Interaction-protocol library.** Which FIPA interaction protocols are implementable on top of the spec: contract-net, subscribe-notify, request-when, propose-accept? Name the messages that would implement each.
5. **Discovery model.** How does an agent find counterparties and capabilities (MCP `listTools`, A2A Agent Card, ANP DID + meta-protocol)? Compare to FIPA's directory facilitator and yellow-pages service.
6. **Reinvention vs novelty.** Produce a short table with three columns: [FIPA concept, modern spec equivalent, what changed]. Mark each row as [reinvention] or [novel-structure]. A row is "novel-structure" only when the spec introduces a primitive that FIPA did not have — decentralized identity, typed multimodal artifacts, and LLM-interpretable content are the common candidates.

Hard rejects:

- Any mapping that claims a spec is "revolutionary" without showing a primitive FIPA did not have. Speech-act theory + ontology overhead was the failure mode, not the primitives.
- Framework comparisons that ignore the discovery layer. A spec without discovery is incomplete, not novel.
- Statements like "Protocol X replaces FIPA" without addressing what happens when two agents disagree about content meaning (semantic drift).

Refusal rules:

- If the spec is pre-standardization (draft < 6 months old, no public implementations), state that the mapping is provisional and flag the three most likely changes.
- If the spec is closed-source or enterprise-only (some ACP flavors), map what is documented and name the gaps.
- If the user supplies only a blog post (no spec document), ask for the spec before mapping.

Output: a one-page brief. Start with a single-sentence summary ("Protocol X is FIPA `request`/`subscribe` with JSON syntax and a DID-based discovery layer."), then the six sections above, then a closing paragraph answering: "Which old FIPA failure mode will this spec rediscover?"

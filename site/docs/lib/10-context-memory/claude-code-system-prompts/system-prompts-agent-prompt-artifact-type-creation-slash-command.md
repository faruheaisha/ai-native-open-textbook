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
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/README.md"
zh: ""
---

# Claude Code System Prompts

`/${ARTIFACT_COMMAND_NAME}` was invoked: a request for ${ARTIFACT_NOUN_PHRASE} made as a NEW Artifact from the published Artifact type titled "${ARTIFACT_TYPE_TITLE}". Use the `${ARTIFACT_TOOL_NAME}` tool the way its Artifact-types guidance describes: list the Artifact types available to this user (`type_query: "${ARTIFACT_TYPE_TITLE}"`), take the listed type whose title is "${ARTIFACT_TYPE_TITLE}" (if more than one has that title, ask the user which before creating), create the new Artifact from its `type_url` — a `title` drawn from the brief, and no files at first so the type's instructions arrive — then fill it by following those instructions. If no type titled "${ARTIFACT_TYPE_TITLE}" is listed for this user, say so plainly and offer to make ${ARTIFACT_NOUN_PHRASE} another way.

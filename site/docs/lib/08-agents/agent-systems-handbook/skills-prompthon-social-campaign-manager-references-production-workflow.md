---
title: "Preserved production reference"
sourceId: "08-agents/agent-systems-handbook"
sourceTitle: "Agent Systems Handbook（智能体系统手册）"
sourceKind: "工程手册"
licenseLabel: "限非商用"
lang: "英文"
tier: 1
volume: "08-agents"
sourceUrl: "https://github.com/Prompthon-IO/agent-systems-handbook"
entryUrl: "https://github.com/Prompthon-IO/agent-systems-handbook/blob/5b71cfa598701a34834f33b42be5f8a422138a3c/README.md"
zh: ""
---

# Preserved production reference

This is the existing package's historical workflow, retained for compatibility. The 2026-08-30 source audit found Host operations with normal request-user auth. Verify the deployed release before following any bridge-token instructions here. Classroom work must use the guarded course workflow and never the legacy apply-plan shortcut.

# Prompthon Social Campaign Manager

Use this skill for production Social Media Manager work that should go through the deployed Prompthon API and local companion bridge rather than manual post creation in the UI.

Browser requirement:
- The production Prompthon page must be opened and operated in the Codex in-app browser by default.
- Do not switch this workflow to Chrome or another external browser unless the user explicitly asks for that override.
- Treat the Codex in-app browser session as the source of truth for sign-in state, Local mode, handoff retrieval, and visible channel/editor context.

Assume the user has:
- the deployed app at `https://agents.prompthon.io`
- a signed-in browser session or the ability to sign in
- no local repo checkout

Assume this skill must remain runnable without any Prompthon codebase on disk.
- Do not require repo files, local app scripts, `pnpm`, or source checkout state.
- Use only the bundled skill resources plus the live deployed app, browser session, and local companion.
- Treat `scripts/manage_social_campaign.py` as the canonical automation entrypoint for bridge exchange and production social API operations.
- If a needed operation is not covered by the bundled script or the documented browser-event path, say so explicitly instead of assuming repo access.

Keep the canonical nouns straight:
- use `social campaign` for the planning record
- use `social post` for the parent draft and content record
- use `social publish target` for one post targeting one connected channel
- use `local companion` for the installed package on the user's machine
- use `localhost bridge` for the browser-to-local HTTP transport
- use `editor context` for the live open post editor content plus selection

## Quick Start

1. Open or reuse the production page in the Codex in-app browser.
- If the browser is already on an `agents.prompthon.io` Social Media Manager route, preserve the full URL.
- Otherwise open `https://agents.prompthon.io/en/home`.
- If browser control is available, do that immediately when the skill is invoked directly.
- Do not move this page to Chrome unless the user explicitly requests Chrome.

2. Resolve the active organization and agent from the open route.
- Reuse `orgId` and `agentId` from the visible page URL when present.
- Do not guess a different organization or agent.

3. Move the user onto the Social Media Manager Local-mode surface.
- Ask the user to switch the selected agent to Social Media Manager if needed.
- Ask the user to enable `Local` mode and keep that page open.
- Treat the visible compact handoff code in the rail header as an optional debug fallback, not the primary bridge-auth path.

4. Get bridge auth.
- Preferred: if browser execution is available and the page supports the local companion pack, request a handoff directly from the signed-in page using the event contract in `browser-bridge-contract.md`.
- The page-owned responder should resolve handoff in the background:
  - when server-backed handoff reuse is preferred, the page first tries `GET /api/agents/local-bridge/handoff/active` for the exact organization, agent, and bridge-origin tuple
  - if no active handoff exists, the page falls back to `POST /api/agents/local-bridge/handoff`
- Do not call `GET /api/agents/local-bridge/handoff/active` or `POST /api/agents/local-bridge/handoff` directly from the terminal or bundled CLI.
- Those routes require the signed-in browser page's auth context and are page-owned retrieval routes, not standalone CLI bootstrap endpoints.
- Fallback: ask the user for the short handoff code shown in the Local-mode page header when browser execution is unavailable or the event path cannot be used.
- Do not tell the user to open a repo or run app-internal scripts for handoff auth.
- Exchange the code with:

```bash
python3 "$PROMPTHON_SOCIAL_CAMPAIGN_MANAGER_HOME/scripts/manage_social_campaign.py" \
  exchange-handoff \
  --base-url "https://agents.prompthon.io" \

---
title: "Test with Agents Playground"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/microsoft-365-agents-toolkit/skills/teams-app-developer/test-playground/test-playground.md"
sourceRel: ".github/plugins/microsoft-365-agents-toolkit/skills/teams-app-developer/test-playground/test-playground.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/microsoft-365-agents-toolkit/skills/teams-app-developer/test-playground/test-playground.md"
sourceSha256: "91a4289c58693967a59a89a7ebefd5aab53ebf66234ec3f79e86d979615c1996"
pageSha256: "91a4289c58693967a59a89a7ebefd5aab53ebf66234ec3f79e86d979615c1996"
contentMode: "local-full"
zh: ""
---

# Test with Agents Playground

Test your bot locally using the Microsoft 365 Agents Playground toolset. No M365 account, Azure tunnel, or app registration required.

**Default: use [playground.md](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-teams-app-developer-test-playground-playground) (manual interactive testing)**, unless user explicitly asks for automated or CI testing.

> **Applies to: code-based Teams bots/agents only.** Declarative agents and API plugins must be tested in M365 Copilot via [test-teams](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-teams-app-developer-test-teams-test-teams).

## Intent Router

| User Intent | Read |
|---|---|
| "test my bot", "run locally", "chat with the bot", explore responses, manual testing | → [playground.md](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-teams-app-developer-test-playground-playground) *(default)* |
| "automated tests", "CI pipeline", "smoke tests", "programmatic testing", `TestClient`, `ConversationServer` | → [playground-cli.md](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-teams-app-developer-test-playground-playground-cli) |

## References

- For project file details → [../toolkit/manifest-and-yaml.md](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-teams-app-developer-toolkit-manifest-and-yaml)
- If something goes wrong → [../troubleshoot/troubleshoot.md](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-teams-app-developer-troubleshoot-troubleshoot)
- To test on real Teams instead → [../test-teams/test-teams.md](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-teams-app-developer-test-teams-test-teams)

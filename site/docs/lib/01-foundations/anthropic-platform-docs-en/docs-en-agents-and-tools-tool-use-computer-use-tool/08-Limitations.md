---
title: "Anthropic 平台文档（英文全量）"
sourceId: "01-foundations/anthropic-platform-docs-en"
sourceTitle: "Anthropic 平台文档（英文全量）"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "01-foundations"
sourceUrl: "https://platform.claude.com/docs"
entryUrl: "https://platform.claude.com/docs"
sourceRel: "docs/en/agents-and-tools/tool-use/computer-use-tool.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/agents-and-tools/tool-use/computer-use-tool.md"
sourceSha256: "4de659db5a454a438de8f37a25742b665254c305624f55cfcc5b76491ae62d46"
pageSha256: "6b5440a2acc8bff644ce4c39ff9dd73f8efed7d8d8620e37ddf3c5e1eee3ea3e"
contentMode: "local-full"
zh: ""
---

## Limitations

1. **Latency:** The current computer use latency for human-AI interactions might be too slow compared to regular human-directed computer actions. Focus on use cases where speed isn't critical (for example, background information gathering, automated software testing) in trusted environments.
2. **Computer vision accuracy and reliability:** Claude might make mistakes or hallucinate when outputting specific coordinates while generating actions. Claude's [summarized thinking](https://platform.claude.com/docs/en/build-with-claude/thinking#summarized-thinking) output can help you understand the model's reasoning and identify potential issues; set `display: "summarized"` on the thinking configuration, because the models that support the toolset omit thinking text by default.
3. **Tool selection accuracy and reliability:** Claude might make mistakes or hallucinate when selecting tools while generating actions or take unexpected actions to solve problems. Additionally, reliability might be lower when interacting with niche applications or multiple applications at once. Prompt the model carefully when requesting complex tasks.
4. **Scrolling reliability:** The scroll action supports direction control (up, down, left, right) and a specified amount. In applications where scrolling doesn't take effect, keyboard alternatives such as Page Down can help.
5. **Spreadsheet interaction:** Use the fine-grained mouse control actions (`left_mouse_down`, `left_mouse_up`) and modifier-key combinations to select individual cells. Complex spreadsheet operations might still require multiple attempts.
6. **Account creation and content generation on social and communications platforms:** Although Claude visits websites, its ability to create accounts, generate and share content, or otherwise engage in human impersonation across social media websites and platforms is limited.
7. **Vulnerabilities:** Jailbreaks and prompt injection can affect computer use as they can any frontier AI system, including through instructions embedded in webpages or images; apply the precautions in [Security considerations](https://platform.claude.com/docs/en/agents-and-tools/tool-use/computer-use-tool#security-considerations).
8. **Inappropriate or illegal actions:** Under Anthropic's Terms of Service, you must not employ computer use to violate any laws or the Acceptable Use Policy.

Always carefully review and verify Claude's computer use actions and logs. Do not use Claude for tasks requiring perfect precision or sensitive user information without human oversight.

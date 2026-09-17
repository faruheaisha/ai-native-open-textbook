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
sourceRel: "docs/en/build-with-claude/claude-platform-on-aws.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/build-with-claude/claude-platform-on-aws.md"
sourceSha256: "0ff935251ef5bee607ae9d604d1c665269af87e8eda7c66c98362c1d5906779c"
pageSha256: "268e938a0e9959f3c5d03826d6c4a34cfec5030313d2e5157bdd15dc51723677"
contentMode: "local-full"
zh: ""
---

## Billing

Claude Platform on AWS bills through [AWS Marketplace](https://aws.amazon.com/marketplace). Usage is denominated in Claude Consumption Units (CCUs), metered hourly, and invoiced monthly in arrears on your AWS bill. CCUs are not prepaid credits. There is no CCU balance or commitment.

For the CCU price, conversion mechanics, discount application, and per-model token rates, see [Claude Platform on AWS pricing](https://platform.claude.com/docs/en/about-claude/pricing#claude-platform-on-aws-pricing).

### Spend limits

The Start, Build, and Scale usage tiers each carry a monthly spend cap; see the [per-tier spend caps](https://platform.claude.com/docs/en/api/rate-limits#spend-limits) for current values. When your organization's usage for the calendar month reaches its tier's cap, API requests fail with the [spend-cap error](https://platform.claude.com/docs/en/api/rate-limits#reaching-your-spend-cap) until 00:00 UTC on the first day of the next month, and retrying sooner doesn't succeed. The spend cap and rate limits belong to the same tier. To raise the cap, or to restore access after reaching it, request a tier increase through your Anthropic account representative or [Anthropic support](https://support.claude.com) (see [Rate limits and quotas](https://platform.claude.com/docs/en/build-with-claude/claude-platform-on-aws#rate-limits-and-quotas)).

You can also set your own monthly spend limits below the cap, after adding at least one recipient under **Email recipients** on the Billing page:

* **Organization spend limit:** Go to [Settings > Billing](https://platform.claude.com/settings/billing) in the [Claude Console](https://platform.claude.com/docs/en/build-with-claude/claude-platform-on-aws#using-the-claude-console) to set a monthly spend limit.
* **Workspace spend limits:** Select a workspace under [Settings > Workspaces](https://platform.claude.com/settings/workspaces) and open its **Spend limits** page.

When usage reaches a limit you set, requests fail with HTTP 400 (see the [spend limit error](https://platform.claude.com/docs/en/api/rate-limits#setting-your-own-spend-limit)) until 00:00 UTC on the first day of the next month, or until you raise or remove the limit.

Spend is calculated at list prices and can take about 2 hours to reflect recent usage, so usage can exceed the cap or a limit before requests start failing. The overshoot is billed. When the tier cap or an organization spend limit stops your requests, an email notice goes to the recipients listed under **Email recipients** on the Billing page. Role-based recipients, such as all admins, aren't available on Claude Platform on AWS. The tier-cap notice also goes to the email address used at AWS Marketplace sign-up.

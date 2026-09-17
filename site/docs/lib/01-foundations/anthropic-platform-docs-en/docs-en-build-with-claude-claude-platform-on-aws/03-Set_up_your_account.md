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
pageSha256: "b9101382e9a871e63bcdde2a822ee85287083451e421cfff38e234028f4a7122"
contentMode: "local-full"
zh: ""
---

## Set up your account

Setting up Claude Platform on AWS happens in four phases: sign up on the AWS Console service page, complete your Anthropic organization setup, note your workspace ID, and sign in to the Claude Console.

  Signing up through the AWS Console provisions a new Anthropic organization tied to your AWS account. This organization is separate from any existing organizations your company has with Anthropic, including Claude Enterprise organizations procured through AWS Marketplace. API keys, workspaces, and Claude Console settings from a first-party Anthropic organization don't carry over.

  If you have an existing Amazon Bedrock private offer, contact your Anthropic or AWS account representative before signing up so your discount applies from your first request. Discounts cannot be applied retroactively to usage incurred before your private offer is accepted. See [Private offers](https://platform.claude.com/docs/en/about-claude/pricing#private-offers).

    1. Open the [AWS Console](https://console.aws.amazon.com/) and navigate to the **Claude Platform on AWS** service page.
    2. Choose **Sign up**.
    3. On the Sign-up page, review the terms (Anthropic's End User License Agreement, the AWS Privacy Notice, and the AWS Customer Agreement) and select the agreement checkbox.
    4. Choose **Continue**.

    The page shows a **Sign-up in progress** banner. Stay on the page. Sign-up takes a few minutes while AWS handles the AWS Marketplace subscription for you, then redirects you automatically.

    If your organization has a private offer from Anthropic, the Console looks it up and prompts you to accept it in AWS Marketplace. See [Private offers](https://platform.claude.com/docs/en/about-claude/pricing#private-offers) for details.

      If you use Claude Platform on AWS, your content (such as prompts and completions) is processed by Anthropic outside of AWS. See Anthropic's [data use policies](https://www.anthropic.com/legal) for details on how content and metadata are processed and stored.

    After sign-up completes, you're redirected to `platform.claude.com/partner-signup`.

    1. Enter the email address of your organization's owner and choose **Get started**.
    2. Check that email inbox for a setup link and follow it. If your browser shows a **Signed in as a different account** page, choose **Log out and continue**.
    3. Complete the organization details form (organization name, entity type, country, intended use) and choose **Complete setup**.

    Completing setup creates your Anthropic organization and accepts Anthropic's Commercial Terms of Service and Usage Policy. The AWS Console service page now shows a left navigation with **Home**, **API keys**, **Quickstart**, and **Workspaces**.

    After you complete setup, the AWS Console prompts you to create a workspace. See [Workspaces](https://platform.claude.com/docs/en/build-with-claude/claude-platform-on-aws#workspaces) for details on region binding, IAM resource scoping, and creating additional workspaces.

    Find the workspace ID under **Workspaces** on the AWS Console **Claude Platform on AWS** service page or in the [Claude Console](https://platform.claude.com/docs/en/build-with-claude/claude-platform-on-aws#using-the-claude-console). Workspace IDs use the format `wrkspc_` followed by an alphanumeric identifier.

    Access to the Claude Console is federated through AWS IAM:

    1. Assume an IAM role with the `aws-external-anthropic:AssumeConsole` permission. See [IAM actions for Claude Platform on AWS](https://platform.claude.com/docs/en/api/claude-platform-on-aws-iam-actions#console-access).
    2. From the **Claude Platform on AWS** service page, choose **Open Claude Console**. The AWS Console issues a JWT and redirects you to `platform.claude.com`.
    3. On first sign-in, you're prompted for an email address. Enter your work email. The platform provisions your Claude Console user just-in-time.

    When you're signed in through the AWS Console, the Claude Console scopes to your Claude Platform on AWS organization. An **Account managed by AWS** indicator appears in the bottom-left of the Claude Console sidebar.

### Moving from an existing Anthropic organization

Signing up for Claude Platform on AWS always provisions a new Anthropic organization tied to your AWS account. There is no in-place conversion: an existing organization, such as a first-party Claude API organization, can't become a Claude Platform on AWS organization.

Plan a move from an existing organization as a cutover to a new one:

* **Create the new organization first.** Sign up through the AWS Console (see [Set up your account](https://platform.claude.com/docs/en/build-with-claude/claude-platform-on-aws#set-up-your-account)). If your move involves a private offer, complete sign-up before the offer is accepted: discounts apply from acceptance, not retroactively. See [Private offers](https://platform.claude.com/docs/en/about-claude/pricing#private-offers).
* **Recreate access and configuration.** API keys, workspaces, and Claude Console settings don't carry over from an existing organization. Create workspaces in the new organization and switch your applications to [Claude Platform on AWS authentication](https://platform.claude.com/docs/en/build-with-claude/claude-platform-on-aws#authentication).
* **Update your integration.** Claude Platform on AWS serves the Claude API (`/v1/\{endpoint\}`), so request and response shapes are unchanged from the first-party Claude API. What changes is the base URL, the authentication method, and the required `anthropic-workspace-id` header; see [Making requests](https://platform.claude.com/docs/en/build-with-claude/claude-platform-on-aws#making-requests). Some platform features differ; see [Features not supported](https://platform.claude.com/docs/en/build-with-claude/claude-platform-on-aws#features-not-supported).
* **Cut over on your own schedule.** The new organization is independent of your existing one, and both can serve traffic in parallel. There's no need for a hard cutover: shift workloads gradually until all of your traffic is on the new organization.

Once the new organization is running, the differences are concentrated in billing and authentication, which are handled through AWS:

* **Billing** moves to AWS Marketplace: usage is billed in Claude Consumption Units rather than prepaid credits (see [Billing](https://platform.claude.com/docs/en/build-with-claude/claude-platform-on-aws#billing)), and you set spend limits on the Billing page (see [Spend limits](https://platform.claude.com/docs/en/build-with-claude/claude-platform-on-aws#spend-limits)). During the transition, billing stays separate: the existing organization continues to be billed as it is today.
* **Authentication and access** move to AWS: requests authenticate with AWS credentials or with API keys generated in the AWS Console, not the Claude Console (see [Authentication](https://platform.claude.com/docs/en/build-with-claude/claude-platform-on-aws#authentication)). Organization membership is managed through AWS IAM rather than the Claude Console (see [Available pages](https://platform.claude.com/docs/en/build-with-claude/claude-platform-on-aws#available-pages)), and Anthropic's client SDKs provide platform-specific client classes (see [Install an SDK](https://platform.claude.com/docs/en/build-with-claude/claude-platform-on-aws#install-an-sdk)).
* **Day-to-day API usage** works the way it does on the first-party Claude API, except where noted in the [feature limitations](https://platform.claude.com/docs/en/build-with-claude/claude-platform-on-aws#features-not-supported). Before shifting production traffic, check your rate limits: new organizations are placed on the Start tier, and limit increases go through your Anthropic account representative (see [Rate limits and quotas](https://platform.claude.com/docs/en/build-with-claude/claude-platform-on-aws#rate-limits-and-quotas)).

For Claude Enterprise (claude.ai) organizations, which behave differently, see the [offering comparison](https://platform.claude.com/docs/en/build-with-claude/claude-platform-on-aws#claude-platform-on-aws-vs-amazon-bedrock).

### Troubleshooting account setup

* **"Sign-up failed: Failed to enable OutboundWebIdentityFederation":** If you see this banner on first submit, choose **Continue** again. The IAM enablement can take a moment to take effect.
* **No progress indicator during sign-up:** Sign-up takes a few minutes. The page shows a static **Sign-up in progress** banner without a progress bar while AWS provisions your account.
* **"Signed in as a different account" after following the setup link:** Choose **Log out and continue**. The page reauthenticates you with the email address you entered.
* **"Not found" message during sign-in:** This message might appear briefly during redirect. You can dismiss it.
* **Usage page shows no data after your first API call:** Usage data can take a few minutes to appear in the Claude Console.
* **"Outbound web identity federation is disabled" on your first API call:** Enable federation once per account. See [Enable outbound web identity federation](https://platform.claude.com/docs/en/build-with-claude/claude-platform-on-aws#enable-outbound-web-identity-federation).

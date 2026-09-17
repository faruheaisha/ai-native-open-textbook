---
title: "Sites"
sourceId: "09-harness/openai-codex-docs-official"
sourceTitle: "openai-codex-docs-official"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://learn.chatgpt.com/docs"
entryUrl: "https://learn.chatgpt.com/docs"
sourceRel: "docs/sites.md"
rawUrl: "/raw/09-harness/openai-codex-docs-official/docs/sites.md"
sourceSha256: "491a9e2281e15f0b0b6cf5580e9f779559cc4430dc8b890841bf0cfddcc6fde5"
pageSha256: "491a9e2281e15f0b0b6cf5580e9f779559cc4430dc8b890841bf0cfddcc6fde5"
contentMode: "local-full"
zh: ""
---

# Sites

> For the complete documentation index, see [llms.txt](https://learn.chatgpt.com/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

Sites is in public beta and is available with ChatGPT Plus, Pro, Business,
  Enterprise and Edu plans. Plan-specific usage limits apply across all Sites
  during the beta. ChatGPT shows the current limits and notifies you as you
  approach one. Reaching a limit can prevent you from creating a Site, adding
  storage, or keeping a high-usage Site public, but you can still edit and
  manage existing Sites.

Sites lets ChatGPT create, host, refine, and share websites, web apps, and games.
Use Sites when you want to turn a prompt or compatible existing project into a
hosted experience without setting up a separate deployment workflow.

Open **Sites** in the ChatGPT desktop app. You can start a site from a prompt or
from a compatible local project, then return to the Sites view to manage it.

Use Sites in ChatGPT on the web to create and manage hosted sites. Select
**More** > **Sites**, or go directly to
[chatgpt.com/sites](https://chatgpt.com/sites), to find Sites you've created.

Sites doesn't have a standalone Codex CLI management view. Use ChatGPT web or
the desktop app to create, save, deploy, and manage a Sites project. You can
still use Codex CLI to edit and test a local project before publishing it.

Sites doesn't have a standalone IDE extension management view. Use ChatGPT web
or the desktop app for Sites operations, and use the IDE extension to edit and
test the local source project.

Every Sites deployment URL is a production deployment. If you want to review a
  build before it becomes live, ask ChatGPT to save a version without deploying
  it.

## Get started with Sites

In ChatGPT, include the word "website" in your prompt or mention `@Sites` to
start the Sites workflow explicitly.

1. Describe the Site

   Describe the audience, purpose, required behavior, and information the Site
   should use.

2. Review the Site

   Review the generated content and behavior. Check that the Site uses the
   intended information and handles data as expected.

3. Refine the Site

   Describe the changes you want. Add relevant files or visual context when
   they will help ChatGPT make the change.

4. Manage and share the Site

   Return to **Sites** to reopen or refine the Site. When it's ready, choose who
   can visit it and share the resulting link.

In the preview, select **Edit**. Under **Describe website edits**, describe the
changes you want. Use **Screenshot** or **Add files and more** when additional
context would help.

## Prompt Sites for common tasks

For a new website, dashboard, or internal tool, include the audience, core
experience, and required information:

```text
Build a project request dashboard for my operations team. Let team members
submit requests, see who owns each one, update the status, and filter the list.
Require people to sign in with their workspace account, and keep the request
data saved between visits.
```

For an existing project, ask Sites to prepare and publish the current app:

```text
Deploy this project with Sites. Check whether it is compatible, make any
required changes, and give me the deployment URL.
```

When a site needs durable application data or uploaded files, say so in the
request:

```text
Add player scores and avatar uploads to this game. Keep the scores and uploaded
avatars between visits.
```

Browse the [Sites showcase](https://developers.openai.com/showcase) for deployed internal apps and the full
  prompts used to create them.

## Review Site analytics

Sites records traffic automatically, so you can see how people use a deployed
Site without adding an analytics SDK. The analytics view shows total unique
visitors and page views, plus both metrics over time. Change the date range or
granularity to inspect a different period.

Open **Sites**, find the Site, then select **More actions** > **Analytics**.

Go to [chatgpt.com/sites](https://chatgpt.com/sites), find the Site, then select
**More actions** > **Analytics**.

Sites doesn't have a standalone analytics view in the CLI or IDE extension. Open
the Site in ChatGPT on the web or in the desktop app to review its analytics.

> Illustration: Interactive Sites analytics dashboard showing unique visitors and page views over seven days.

Analytics is currently available for Sites that aren't owned by an Enterprise
  workspace.

## Add Sign in with ChatGPT

Public Sites can remain open to everyone while offering optional Sign in with
ChatGPT for identity-aware features, such as saved progress, personalized views,
or records that belong to a specific person. Workspace-restricted Sites already
use ChatGPT identity to enforce their sharing settings.

Ask Sites to add the sign-in experience:

```text
Add Sign in with ChatGPT to this public Site. Keep the Site available to signed-out visitors. Show a Sign in with ChatGPT action when someone is signed out. After they sign in, greet them with their full name when available, or their email address otherwise. Add a Sign out action, and keep authorization decisions in server-side code.
```

Sites handles the sign-in and sign-out flows through platform-provided paths,
then returns the visitor to your Site:

```html
[Sign in with ChatGPT](/signin-with-chatgpt)
[Sign out](/signout-with-chatgpt)
```

After a visitor signs in, Sites forwards their identity to the server through
these request headers:

- `oai-authenticated-user-email` contains the authenticated email address.
- `oai-authenticated-user-full-name` may contain a non-empty profile name. Treat
  it as optional and fall back to the email address.

Keep authorization decisions in server-side code, and don't depend on
name-split headers.

## Understand projects, versions, and deployments

A Site is a persistent hosted output that you can reopen, refine, configure,
and share from **Sites** in ChatGPT.

A Sites project links a local source project to hosting managed through Sites.
Sites stores that linkage and optional storage binding names in
`.openai/hosting.json`. A newly created local starter can begin without a
`project_id`; Sites adds one after it provisions the hosted project.

For example, a provisioned site that uses a relational database binding and no
file storage can contain:

```json
{

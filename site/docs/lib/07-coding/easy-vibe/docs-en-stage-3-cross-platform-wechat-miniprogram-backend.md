---
title: "How to Build a WeChat Mini Program with a Backend"
sourceId: "07-coding/easy-vibe"
sourceTitle: "Easy-Vibe（Datawhale：从零做出真实产品）"
sourceKind: "课时教程"
licenseLabel: "限非商用"
lang: "中英混排"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/datawhalechina/easy-vibe"
entryUrl: "https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/en/stage-3/cross-platform/wechat-miniprogram-backend/index.md"
sourceRel: "docs/en/stage-3/cross-platform/wechat-miniprogram-backend/index.md"
rawUrl: "/raw/07-coding/easy-vibe/docs/en/stage-3/cross-platform/wechat-miniprogram-backend/index.md"
sourceSha256: "832b852395fbc056ce405264b809984602cb66e48f5fdcc6ee779e4b69258d3e"
pageSha256: "832b852395fbc056ce405264b809984602cb66e48f5fdcc6ee779e4b69258d3e"
contentMode: "local-full"
zh: ""
---

# How to Build a WeChat Mini Program with a Backend

The previous chapter built a Mini Program whose pages run on the user's phone. This chapter adds the part that a company service needs behind those pages: trusted identity, shared records, permissions, files, and logs.

We will turn the existing project into **Northstar Service Hub**. A member opens the Mini Program, creates an after-sales ticket, and later sees the same ticket on another device. Staff can process it from a company system without placing company secrets in the Mini Program.

![Route, order, and payment screens in Uber's WeChat Mini Program](/mirror/91/91a103de7074d778b69c84e1b839240ba796f7f5.png)

That is the role of a backend in many company Mini Programs: the Mini Program is the convenient entrance; the backend owns orders, membership, tickets, permissions, and integrations.

## 1. Understand the two sides

The **frontend** is what runs in WeChat: pages, buttons, forms, and visible status. The **backend** runs in a trusted cloud or company environment: identity checks, business rules, database writes, file storage, and calls to internal systems.

A user can alter requests sent by the frontend. The backend must therefore decide who the caller is and what that caller may do.

For a first project, use the shortest official path:

> WeChat Cloud Development → cloud functions → document database and cloud storage

CloudBase hosting and an existing company backend are valid later choices. PostgreSQL is useful for complex SQL relationships and transactions, but it adds setup and migration work. We will not need it for the first ticket workflow.

## 2. Prepare the tools and project

Reuse the account, AppID, WeChat DevTools project, and AI coding tool from the previous chapter.

![Sign in to WeChat DevTools with a QR code](/mirror/6a/6ad133d4c8f7059cbd5bd9a0aa10fd86943d4e4e.png)

![Open the real project in Trae](/mirror/f3/f3f18cac80394974eeb7522b14caa3c3eafd97a4.png)

![Find the Mini Program AppID in the WeChat administration site](/mirror/4f/4f75e65309302682d8ac844cc830777fd5f3bd00.png)

CloudBase's current AI plugin can connect supported coding tools to MCP, Skills, and Hooks. Use the one-click plugin when your tool supports it.

![The current CloudBase AI plugin page](/mirror/65/65d67bb713b8d5bf7d09c720af898ce694a1a017.jpg)

Trae's current guide still explains the CloudBase MCP setup directly. Follow the current steps there and let the tool read the Mini Program, WeChat authentication, and cloud-function guidance before it edits the project.

![The current CloudBase guide for Trae](/mirror/70/70804d1cb44f8b7c0fd08c2d1906382eeef1a4ea.jpg)

## 3. Create a Cloud Development environment

Open Cloud Development in WeChat DevTools and create an environment. The console may offer paid plans; pricing and free quotas change, so read the current purchase page before continuing. A backend is not required merely because the product is a Mini Program—you need it only when users must share accounts, records, files, payments, or company data.

If CloudBase is unsuitable, a company can use its existing HTTPS backend or another managed backend. The identity and permission rules in this chapter still apply.

![The current official guide for creating a Cloud Development environment](/mirror/6f/6f2af296c68a61957934833c8db98cf013fd383c.jpg)

![The current CloudBase console sign-in page](/mirror/9c/9c7e2d046bd19e8bfbe4ad9ba283eb8fa4c908ee.jpg)

Copy the environment ID into the project's central configuration. The environment ID is not a secret, but using one configuration location prevents the development and production IDs from being mixed later.

## 4. Ask AI for the first screen

Confirm the original Mini Program still runs before adding backend work.

![Confirm the base Mini Program files in Trae](/mirror/14/1427d8280bc2c2eef71e04f334e80fe544098792.png)

Give AI one clear product request:

> Turn the current project into a customer service Mini Program. Add a member home page, a Create Ticket page, and a My Tickets page. Use sample data first and keep the current project runnable.

Let AI explain its planned changes before approving them.

![Trae reads the project and explains its plan](/mirror/81/81447c8d309844d57c0decf6cd26153f36bfa3c3.png)

![Trae summarizes the completed changes](/mirror/ec/ec46fb725b229919a26471ef1d3afb7008b8b2af.png)

If the change is wrong, revert before adding more requirements.

![Use rollback to return to the version before the AI edit](/mirror/25/25a297b85a555a931b625b6d90c3e0977b34c48d.png)

Run the project in HBuilderX or directly in WeChat DevTools, following the setup used in the previous chapter.

![Run the project in the WeChat Mini Program simulator](/mirror/cf/cf11454bb427bfc9a396bc02721ee8e1cb58dd86.png)

![Wait for the Mini Program to compile](/mirror/11/112c4cb0c76667d3154c7bd3711679b3e33ccc15.png)

![Inspect the running result in WeChat DevTools](/mirror/84/847fc185eee234966f5befbbb7e07e7f9311c795.png)

## 5. Create the first cloud function

A **cloud function** is backend code that CloudBase runs when the Mini Program calls it. Start with one small function so deployment and logs are easy to understand.

> Add one cloud function that returns the current server time. Add a page button that calls it and displays the result. Then tell me exactly where to deploy the function in WeChat DevTools.

Deploy the function, click the button, and confirm the returned time changes. If the call fails, read the DevTools error and function log before editing more code.

## 6. Let the backend identify the current user

The frontend must not be allowed to say “I am this user” or “I am an administrator.” In the native WeChat cloud path, the cloud function can read the caller from WeChat's trusted call context.

> Add “Get current user” to the working cloud function. Identify the caller from WeChat's trusted context, not from an ID or role sent by the page. Show only the member information needed by the page.

Do not display a full OpenID in the interface or write full identity and contact data into ordinary logs.

## 7. Save the first ticket

Create a document collection for tickets. A first ticket can contain a subject, description, status, creation time, and trusted owner.

> Save the ticket form through a cloud function. Check required fields on the server, add the trusted current user as the owner, and return a readable ticket number.

After deployment, submit one ticket. Success must be visible in two places: the page shows the ticket number and the database console contains one matching record.

![A completed Northstar Service Hub member and ticket interface](/mirror/3b/3b77f5975228636212906f7aaa51946678983293.png)

![The current CloudBase document database guide](/mirror/b1/b191ff808d1f3f2acd270f81aa7daf238f9ed9e3.jpg)

Records written by cloud functions or the management API do not automatically receive `_openid`. If ownership rules need it, the function must write ownership based on the trusted context rather than a value chosen by the frontend.

## 8. Prevent duplicate submissions

One page click test proves only that the button may be disabled. A network retry can still create a second ticket unless the backend recognizes the same request.

> Give each submission a stable `clientRequestId`. If the same ID is sent again, return the original ticket instead of creating another one.

Test by sending the same `clientRequestId` twice independently. Both calls should return the same ticket number and the database should contain one ticket. A new ID should create a new ticket.

## 9. Show only the current user's tickets

> Load My Tickets through a cloud function. Return only tickets owned by the trusted current user. The page must not be able to request another user's tickets by changing an ID.

Test with two WeChat accounts. Each account should see only its own data. Then deliberately alter a request and confirm the backend rejects it.

Database rules are a second layer of protection, especially if the client reads a collection directly. For a beginner project, routing sensitive writes through cloud functions often makes the permission boundary easier to review.

## 10. Add photo attachments

Do not add uploads until ordinary tickets work.

> Let the user attach up to three ticket photos. Limit type and size, show upload progress, and save only controlled cloud file IDs with the ticket.

Use temporary download links or checked backend access rather than making every file permanently public. Before serving real users, add the appropriate content moderation flow for text and uploaded media.

## 11. Read logs when something fails

Common problems include the wrong environment ID, an undeployed function, a missing collection, denied database rules, and a record that was never written.

![The current CloudBase log search guide](/mirror/e6/e6a48ec991fba2a9bf9570e562c67bbdd5da1d00.jpg)

Give AI the exact evidence:

> The page shows this error: 【paste it】. The cloud-function log shows: 【paste it】. Find the first failing step and change only that part.

After the fix, repeat the same operation and keep both the page result and the backend log as evidence.

## 12. Separate development and production

One environment is enough while you learn. Before real users arrive, create separate development, test, and production environments and keep their IDs in central configuration.

Deploy cloud functions and security rules to the intended environment before uploading the Mini Program. Never distribute company-wide API keys inside the client. Calls to existing internal systems should go through a company-controlled backend or gateway.

Modern HTTP cloud functions support more than short request/response calls, including current WebSocket and SSE scenarios. Consider CloudBase hosting when the project genuinely needs a complete framework, custom runtime, or container. Consider PostgreSQL when relationships, SQL, and stronger transaction requirements justify it.

## 13. Upload an experience version

The Mini Program upload steps remain the same as in the previous chapter, but the backend needs its own release check:

- production environment selected;
- cloud functions deployed;
- collections and indexes present;
- access rules reviewed;
- logs and alerts available;
- review account and test records prepared;
- two-account isolation repeated in the release build.

![Enter version details in WeChat DevTools](/mirror/be/be7ed54de16414474f8e9351877a72c1b169d67b.png)

![Wait for the code upload to finish](/mirror/a6/a652d2aea9933e2ede94fbbbb1f8263d8ba8db40.png)

![Find the development version in the administration site](/mirror/14/148ea420aef8567db8aa96b21928e9aa187bb6fe.png)

![Set the uploaded build as an experience version](/mirror/d0/d0bc582064b93c9ec9c189992649c67081263356.png)

## 14. The finish line for this chapter

The workflow is complete when one user can create a ticket, see a ticket number, find the matching database record, reopen the Mini Program on another device, and still see the same ticket—while a second account cannot read it.

The screenshots of CloudBase documentation and console entry points above are real references, but they do not claim that a paid environment was created on the reader's behalf. Pricing, account verification, production rules, and company integrations must be completed in the account that will own the application.

Once this small path is dependable, the same pattern can support appointments, repair requests, membership records, internal approvals, and order after-sales service: the page collects intent, the backend identifies the caller, rules protect the data, and logs show what happened.

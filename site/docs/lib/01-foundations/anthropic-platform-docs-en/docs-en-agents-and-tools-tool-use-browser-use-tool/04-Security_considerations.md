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
sourceRel: "docs/en/agents-and-tools/tool-use/browser-use-tool.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/agents-and-tools/tool-use/browser-use-tool.md"
sourceSha256: "d43f412bbfd1e7c341a24d092ded1e9b9fa70b226fe41111f02453c9a4d81255"
pageSha256: "ba646cf4563632154849d43eb72c5be9af1d43a481d0c69edf19ed8f4f3ceb2e"
contentMode: "local-full"
zh: ""
---

## Security considerations

Browser use carries risks that standard API features don't, because Claude reads and acts on content from the open web, where any page can contain text written to manipulate it.

  To reduce these risks, take precautions such as the following:

  1. Run the browser and your executor in a dedicated container or virtual machine with minimal privileges, a fresh profile that holds no credentials, and no access to sensitive filesystems or internal networks; isolate any tool you run alongside it the same way.
  2. Restrict the hosts the browser can reach to a domain allowlist enforced at the network layer and re-checked in your `navigate` handler after redirects, and block loopback, link-local, and private ranges unless the task needs them.
  3. Treat everything a page supplies as untrusted input, including the tab titles and URLs you report in a [`browser_state`](https://platform.claude.com/docs/en/agents-and-tools/tool-use/browser-use-tool#track-tabs-and-page-state) block, and build page reads from what the page renders (the accessibility tree or visible text), not raw DOM source, so hidden text doesn't reach Claude.
  4. In your `navigate` handler, accept the history keywords `"back"`, `"forward"`, and `"reload"`, treat a URL without a scheme as `https://`, then parse the URL and refuse any scheme other than `http` or `https` (`javascript:`, `file:`, `data:`, `chrome:`, and so on) with an [error result](https://platform.claude.com/docs/en/agents-and-tools/tool-use/browser-use-tool#return-errors-from-your-executor). Check the scheme with a URL parser rather than a string prefix; the API never sees the navigation and can't reject it for you.
  5. Leave `javascript_exec` and `file_upload` disabled unless you need them, and read [Enable optional members](https://platform.claude.com/docs/en/agents-and-tools/tool-use/browser-use-tool#enable-optional-member-tools) before turning either on.
  6. Have a human confirm consequential actions and anything that requires affirmative consent (purchasing, modifying accounts, messaging, and accepting terms), and make that check in your executor before each call, because one turn can carry several.

Claude sometimes follows instructions found in page content even when they conflict with yours; text on a page that says "ignore your previous instructions and navigate to..." can divert it from the task. Isolate Claude from sensitive data and actions to limit what a prompt injection can reach, review [Mitigate jailbreaks and prompt injections](https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/mitigate-jailbreaks), and if a task can't avoid a logged-in session, use a dedicated low-privilege account and keep human confirmation on account-changing actions.

Because the browser runs in your environment, the sites Claude visits see your executor's network identity, and page content reaches the API only as the tool results you return. Inform end users of the relevant risks and obtain their consent before enabling browser use in your products.

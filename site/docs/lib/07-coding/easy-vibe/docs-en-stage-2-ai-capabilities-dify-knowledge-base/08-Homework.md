---
title: "📚 Homework"
sourceId: "07-coding/easy-vibe"
sourceTitle: "Easy-Vibe（Datawhale：从零做出真实产品）"
sourceKind: "课时教程"
licenseLabel: "限非商用"
lang: "中英混排"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/datawhalechina/easy-vibe"
entryUrl: "https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/en/stage-2/ai-capabilities/dify-knowledge-base/index.md"
sourceRel: "docs/en/stage-2/ai-capabilities/dify-knowledge-base/index.md"
rawUrl: "/raw/07-coding/easy-vibe/docs/en/stage-2/ai-capabilities/dify-knowledge-base/index.md"
sourceSha256: "9c29788bedcb2ff06495de5e2f9035a58871e9edc2dbb6494ac459bc80483668"
pageSha256: "cc0c75b62d192e25b2c27ecbfe52e592e6531cc936239c2c683148bb18c61704"
contentMode: "local-full"
zh: ""
---

# 📚 Homework

## Master Basic Dify Operations

To verify you understand common Dify operations, complete one basic assignment plus two mini-challenges:

You need to import the two provided DSL files into Dify workflows and complete the corresponding challenges successfully (if confused, screenshot and ask a model, or explore each parameter yourself until target behavior is reached):

1. Based on the intent-classification workflow approach, ask a model to suggest a completely different scenario, but you must still use intent classification workflow. Submit workflow runtime screenshot, scenario description, and result.
2. `Log in workflow` decryption challenge:

In this challenge, make workflow support:

- Find the correct password.
- Change password to `0925`.
- Provide a second attempt when password is wrong (no third attempt).
- When user asks to log in again, allow password re-entry.

![](https://gh-proxy.com/https://raw.githubusercontent.com/datawhalechina/easy-vibe/130e9b75b28b524e8cc74e615fd9733a4e2b330d/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image94.png)

Reference input/output:

![](https://gh-proxy.com/https://raw.githubusercontent.com/datawhalechina/easy-vibe/130e9b75b28b524e8cc74e615fd9733a4e2b330d/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image95.png)

3. `Love loop workflow` decryption challenge:

![](https://gh-proxy.com/https://raw.githubusercontent.com/datawhalechina/easy-vibe/130e9b75b28b524e8cc74e615fd9733a4e2b330d/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image96.png)

Fix current workflow issues so final output looks similar to:

![](https://gh-proxy.com/https://raw.githubusercontent.com/datawhalechina/easy-vibe/130e9b75b28b524e8cc74e615fd9733a4e2b330d/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image97.png)

If you cannot solve a problem, screenshot and ask a model, or check official docs:
[https://docs.dify.ai/en/use-dify/getting-started/quick-start](https://docs.dify.ai/en/use-dify/getting-started/quick-start)

## Implement Dify API Invocation

To verify you truly mastered Dify API usage, complete:

1. Deploy Dify and create a simple knowledge base (choose any materials you like).
2. Build a chat frontend in Trae IDE and integrate Dify knowledge base via API.
3. Test multi-turn dialogue behavior and ensure program runs normally.

Submit final runtime screenshots and KB processing screenshots.

## Try Third-Party Workflow / Build Your Own Business Workflow

Find a Dify workflow shared by others on GitHub, WeChat public articles, Reddit, X, etc., import and run successfully; or build your own workflow from business references above based on real needs.

Finally submit successful runtime screenshot and explain workflow purpose.

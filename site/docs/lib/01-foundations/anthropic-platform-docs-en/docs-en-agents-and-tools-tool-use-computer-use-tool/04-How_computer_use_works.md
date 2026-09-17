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
pageSha256: "b9e16b2c0946ee8e2c0cab60118d5a3a9835676b3eb00dc914200982a73f73e4"
contentMode: "local-full"
zh: ""
---

## How computer use works

    * Add the computer use toolset (and optionally other tools) to the `tools` array of your API request.
    * Include a user prompt that requires desktop interaction, for example, "Save a picture of a cat to my desktop."

    * Claude assesses whether acting on the desktop can help with the user's query.
    * If so, Claude responds with one or more member `tool_use` blocks, such as `screenshot`, `left_click`, or `type`, each carrying `"toolset_name": "computer"`. A response with several of these blocks is a [batch action](https://platform.claude.com/docs/en/agents-and-tools/tool-use/computer-use-tool#batch-actions).
    * The API response has a `stop_reason` of `tool_use`, signaling a tool use request.

    * Iterate over every `tool_use` block in the response, in order. For each one, dispatch on the member `name` together with `toolset_name`, and perform that action with the block's `input` on your container or virtual machine.
    * Continue the conversation with a new `user` message that contains one `tool_result` block per `tool_use` block, matched by `tool_use_id` and each echoing `"toolset_name": "computer"`. Return an image for `screenshot` and `zoom`; a short text such as `OK` is enough for the other actions.
    * If an action fails, return `is_error: true` for that block and answer the rest of the batch as described in [Batch actions](https://platform.claude.com/docs/en/agents-and-tools/tool-use/computer-use-tool#batch-actions).

    * Claude analyzes the tool results to determine if more actions are needed or the task has been completed.
    * If Claude determines more actions are needed, it responds with another `tool_use` `stop_reason` and you should return to step 3.
    * Otherwise, it returns a text response to the user.

The repetition of steps 3 and 4 without user input is referred to as the "agent loop" (that is, Claude responding with a tool use request and your application responding to Claude with the results of evaluating that request).

### Batch actions

Claude can plan a short sequence of actions, such as click, type, and then take a screenshot, and return them together in one response. This is called a batch action; it uses the same response shape as [parallel tool use](https://platform.claude.com/docs/en/agents-and-tools/tool-use/parallel-tool-use) with one difference: you run the blocks in order rather than concurrently.

A response with a three-action batch looks like this:

```json
{
  "role": "assistant",
  "content": [
    {
      "type": "tool_use",
      "id": "toolu_01HqCF3nJ4Vzr8sTkPZ2wxYA",
      "name": "left_click",
      "toolset_name": "computer",
      "input": { "coordinate": [640, 60] }
    },
    {
      "type": "tool_use",
      "id": "toolu_01Ppr3sZ3TnE9m6VUu4RyH2K",
      "name": "type",
      "toolset_name": "computer",
      "input": { "text": "pictures of cats" }
    },
    {
      "type": "tool_use",
      "id": "toolu_01Xf5W1sD8Q9aBcJ7kLmN2pQ",
      "name": "screenshot",
      "toolset_name": "computer",
      "input": {}
    }
  ]
}
```

Return one `tool_result` block for each `tool_use` block, matched by `tool_use_id`, all in the next `user` message. Every result for a member tool must carry `"toolset_name": "computer"`; a result that omits it, or that names a different toolset than its `tool_use` block, is rejected. Only `screenshot` and `zoom` results need an image; for the other members, a short text acknowledgment such as `OK` is enough (`cursor_position` returns the coordinates as text):

```json
{
  "role": "user",
  "content": [
    {
      "type": "tool_result",
      "tool_use_id": "toolu_01HqCF3nJ4Vzr8sTkPZ2wxYA",
      "toolset_name": "computer",
      "content": [{ "type": "text", "text": "OK" }]
    },
    {
      "type": "tool_result",
      "tool_use_id": "toolu_01Ppr3sZ3TnE9m6VUu4RyH2K",
      "toolset_name": "computer",
      "content": [{ "type": "text", "text": "OK" }]
    },
    {
      "type": "tool_result",
      "tool_use_id": "toolu_01Xf5W1sD8Q9aBcJ7kLmN2pQ",
      "toolset_name": "computer",
      "content": [
        {
          "type": "image",
          "source": {
            "type": "base64",
            "media_type": "image/png",
            "data": "iVBORw0KGgo..."
          }
        }
      ]
    }
  ]
}
```

**Run blocks in order and stop at the first failure.** Later actions in a batch usually depend on earlier ones: the `type` in this example enters text into whatever the preceding click focused. Run the blocks sequentially in the order they appear in `content`, and if one fails, don't run the rest. Every `tool_use` block still needs a `tool_result`, so answer the batch as follows:

* For each action that succeeded, return its normal result.
* For the action that failed, return `is_error: true` with a text description of what went wrong.
* For every later action in the batch, return `is_error: true` with exactly this text (the browser use tool uses its own [halt text](https://platform.claude.com/docs/en/agents-and-tools/tool-use/browser-use-tool#batch-actions)):

```json
{
  "type": "tool_result",
  "tool_use_id": "toolu_01Xf5W1sD8Q9aBcJ7kLmN2pQ",
  "toolset_name": "computer",
  "is_error": true,
  "content": "Not executed: an earlier computer action in this turn failed."
}
```

Claude then sees which actions succeeded, which one failed, and which were skipped, and replans on its next turn. A request that leaves any `tool_use` block in the batch unanswered is rejected with an `invalid_request_error`, so an agent loop that reads only the first block fails on its next call. If your application asks a human to confirm consequential actions, make that check before each block runs, because a batch can complete a multistep action within one turn.

Claude typically finishes a batch with `screenshot` so it can observe the outcome before deciding what to do next. When a batch doesn't end with one, your application can attach a screenshot as an extra `image` block on the last result in the batch so that Claude always sees the current state of the screen, which saves a round trip compared with waiting for Claude to ask. You can also prompt Claude to end every batch with a screenshot (see [Optimize model performance with prompting](https://platform.claude.com/docs/en/agents-and-tools/tool-use/computer-use-tool#optimize-model-performance-with-prompting)).

### The computing environment

Computer use requires a sandboxed computing environment where Claude can safely interact with applications and the web. This environment includes:

1. **Virtual display:** A virtual X11 display server (using Xvfb) that renders the desktop interface Claude will see through screenshots and control with mouse/keyboard actions.

2. **Desktop environment:** A lightweight UI with window manager (Mutter) and panel (Tint2) running on Linux, which provides a consistent graphical interface for Claude to interact with.

3. **Applications:** Pre-installed Linux applications such as Firefox, LibreOffice, text editors, and file managers that Claude can use to complete tasks.

4. **Tool implementations:** Integration code that translates Claude's abstract tool requests (such as "move mouse" or "take screenshot") into actual operations in the virtual environment.

5. **Agent loop:** A program that handles communication between Claude and the environment, sending Claude's actions to the environment and returning the results (screenshots, command outputs) back to Claude.

When you use computer use, Claude doesn't directly connect to this environment. Instead, your application:

1. Receives Claude's tool use requests
2. Translates them into actions in your computing environment
3. Captures the results (such as screenshots and command outputs)
4. Returns these results to Claude

For security and isolation, the reference implementation runs all of this inside a Docker container with appropriate port mappings for viewing and interacting with the environment.

***

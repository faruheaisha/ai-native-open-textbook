---
title: "OpenAI API 文档（英文）"
sourceId: "01-foundations/openai-api-docs-en"
sourceTitle: "OpenAI API 文档（英文）"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "01-foundations"
sourceUrl: "https://developers.openai.com/api/docs"
entryUrl: "https://developers.openai.com/api/docs"
sourceRel: "api/docs/guides/tools-computer-use-integration.md"
rawUrl: "/raw/01-foundations/openai-api-docs-en/api/docs/guides/tools-computer-use-integration.md"
sourceSha256: "430b2356ad0b51acfd86c2b34302f97b04af09c03b34cc8f995d7c1016c2f461"
pageSha256: "9951bb9fc04de080d70d7131889c20208957fd97d5d96114618ff107c5b1601c"
contentMode: "local-full"
zh: ""
---

## Use your own UI tools

If you already expose browser or desktop operations through tools, you can keep that interface. The model does not need the built-in `computer` tool to call a function that operates a browser or a desktop.

With [function calling](https://developers.openai.com/api/docs/guides/function-calling), you define each tool's name, description, and arguments. Your application receives a `function_call`, executes the operation, and returns a `function_call_output` with the matching `call_id`. Tool outputs can include text and images, so a function can return page information, a screenshot, or both. With [remote MCP tools](https://developers.openai.com/api/docs/guides/tools-connectors-mcp), the Responses API calls the remote server and incorporates its output as an `mcp_call`. Your application handles `mcp_approval_request` items when approval is required; it does not return `function_call_output` items for that integration.

For example, a browser tool might select an element using a locator rather than screen coordinates. Another tool might read visible page text or return a screenshot. Describe what each tool can observe and change so the model can choose the appropriate operation.

Enforce execution controls in the function implementation or MCP server: keep the environment isolated, apply permissions before actions, and return the actual result. If the UI state is unknown, give the model a current observation before it acts.

Compare tool designs on task success, time to completion, number of model turns, recovery from unexpected UI state, and adherence to your permission rules.

### Expose a code-execution tool

A code-execution tool accepts a script and runs it in a runtime you provide. This lets the model use loops, conditional logic, DOM inspection, and browser libraries within a tool call. The model can combine programmatic operations with visual checks by requesting screenshots from that runtime.

The examples here use ordinary function tools named `exec_js` and `exec_py`. Their `code` argument contains the generated script. Your application sends that script to your execution service, then returns its text and image outputs to the model. If the model asks for clarification instead of returning a tool call, surface that question to the user before continuing.

The code runtime can be temporary or persistent. If you need to resume the same browser session, preserve that session separately from individual scripts. A persistent runtime can also retain variables between tool calls. Tell the model which objects, helpers, and state are available.

Provide only the capabilities the task requires:

- Browser or desktop controls for the permitted environment.
- A way to return concise text to the model.
- A way to capture screenshots and return them as image inputs.
- A way to pause for user input or confirmation.
- Execution deadlines and resource and network limits.

#### Connect to your execution service

The [code-execution examples](https://developers.openai.com/api/docs/guides/tools-computer-use#connect-your-own-runtime) separate the Responses API loop from your runtime. The sample app provides a complete implementation. If you are building your own service, the adapter here uses this application-defined contract:

| Requirement | Your service provides                                                                                      |
| ----------- | ---------------------------------------------------------------------------------------------------------- |
| Request     | Accept `\{ session_id, language, code \}` from the API client                                                |
| Runtime     | Execute the script in an isolated browser or desktop environment                                           |
| Session     | Preserve the environment and runtime variables for calls with the same `session_id`                        |
| Output      | Return `\{ output \}` containing `input_text` or `input_image` items; include `detail: "original"` on images |
| Controls    | Authenticate callers, enforce execution deadlines, and restrict resources and network access               |

For Python, provide PyAutoGUI, Pillow, `time`, `log(value)`, and `display(PIL_image)` in a persistent namespace. PyAutoGUI needs a graphical desktop. On Linux, the browser and PyAutoGUI must use the same X11 display, with a screenshot utility such as `scrot` installed. Keep PyAutoGUI's fail-safe enabled. See the [PyAutoGUI installation guide](https://pyautogui.readthedocs.io/en/latest/install.html) for platform requirements.

For JavaScript, provide Playwright's `browser`, `context`, and `page` objects in a persistent runtime that supports `await`. Set the context's `viewport` to 1440×900, and provide `console.log(value)` for text and `display(base64Image)` for images. Preserve variables assigned to `globalThis` between calls.

The `display` helper belongs to your runtime. Encode screenshots in memory and return them as image outputs; do not print large image payloads into text output. The model needs those images to inspect the screen and choose its next action.

Set `OPENAI_API_KEY` for the API client and `OPENAI_EXAMPLE_CODE_EXECUTION_URL` to your service endpoint. Set `OPENAI_EXAMPLE_CODE_EXECUTION_TOKEN` if your service requires a bearer token. These service settings are example configuration, not OpenAI API parameters.

Connect the API client to your execution service

```javascript
import readline from "node:readline/promises";
import { z } from "zod";

const executionOutput = z
  .array(
    z.discriminatedUnion("type", [
      z.object({ type: z.literal("input_text"), text: z.string() }),
      z.object({
        type: z.literal("input_image"),
        image_url: z.string(),
        detail: z.literal("original"),
      }),
    ])
  )
  .nonempty();

/** @returns {Promise<import("openai/resources/responses/responses").ResponseFunctionCallOutputItemList>} */
async function executeInSandbox(code, sessionId, endpoint) {
  console.log(code);
  const terminal = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  let approval;
  try {
    approval = await terminal.question(
      "Run this code in the isolated runtime? Type yes: "
    );
  } finally {
    terminal.close();
  }
  if (approval.trim() !== "yes") {
    return [{ type: "input_text", text: "The user declined this execution." }];
  }

  const headers = new Headers({ "content-type": "application/json" });
  const token = process.env.OPENAI_EXAMPLE_CODE_EXECUTION_TOKEN;
  if (token) headers.set("authorization", `Bearer ${token}`);
  const response = await fetch(endpoint, {
    method: "POST",
    headers,
    body: JSON.stringify({
      session_id: sessionId,
      language: "javascript",
      code,
    }),
    signal: AbortSignal.timeout(30_000),
  });
  if (!response.ok) {
    throw new Error(`Execution service returned HTTP ${response.status}.`);
  }
  const result = executionOutput.safeParse((await response.json()).output);
  if (!result.success) {
    throw new Error(
      "Expected input_text or an input_image with original detail."
    );
  }
  return result.data;
}
```

```python
import os
from json import dumps, loads
from urllib import request

from openai.types.responses import ResponseFunctionCallOutputItemListParam

def execute_in_sandbox(
    code: str, session_id: str, endpoint: str
) -> ResponseFunctionCallOutputItemListParam:
    """Send approved code to your separately isolated execution service."""
    print(code)
    if input("Run this code in the isolated runtime? Type yes: ").strip() != "yes":
        return [{"type": "input_text", "text": "The user declined this execution."}]

    headers = {"Content-Type": "application/json"}
    token = os.environ.get("OPENAI_EXAMPLE_CODE_EXECUTION_TOKEN")
    if token:
        headers["Authorization"] = f"Bearer {token}"
    body = dumps(
        {"session_id": session_id, "language": "python", "code": code}
    ).encode()
    sandbox_request = request.Request(
        endpoint, data=body, headers=headers, method="POST"
    )
    with request.urlopen(sandbox_request, timeout=30) as response:
        payload = loads(response.read())

    output = payload.get("output") if isinstance(payload, dict) else None
    if not isinstance(output, list) or not output:
        raise ValueError("The execution service returned no observations.")
    observations: ResponseFunctionCallOutputItemListParam = []
    for item in output:
        if not isinstance(item, dict):
            raise ValueError("Invalid execution-service output item.")
        if item.get("type") == "input_text" and isinstance(item.get("text"), str):
            observations.append({"type": "input_text", "text": item["text"]})
            continue
        if (
            item.get("type") == "input_image"
            and isinstance(item.get("image_url"), str)
            and item.get("detail") == "original"
        ):
            observations.append(
                {
                    "type": "input_image",
                    "image_url": item["image_url"],
                    "detail": "original",
                }
            )
            continue
        raise ValueError("Expected input_text or an input_image with original detail.")
    return observations
```

```ruby
require "net/http"

def execute_in_sandbox(code, session_id, endpoint)
  puts(code)
  print("Run this code in the isolated runtime? Type yes: ")
  unless $stdin.gets&.strip == "yes"
    return [{type: "input_text", text: "The user declined this execution."}]
  end
  uri = URI(endpoint)
  request = Net::HTTP::Post.new(uri)
  request["Content-Type"] = "application/json"
  token = ENV["OPENAI_EXAMPLE_CODE_EXECUTION_TOKEN"]
  request["Authorization"] = "Bearer #{token}" if token
  request.body = JSON.generate(session_id: session_id, language: "python", code: code)
  response = Net::HTTP.start(uri.hostname, uri.port, use_ssl: uri.scheme == "https", open_timeout: 10, read_timeout: 30) do |http|
    http.request(request)
  end
  response.value
  payload = JSON.parse(response.body)
  output = payload.is_a?(Hash) && payload["output"]
  raise "The execution service returned no observations" unless output.is_a?(Array) && !output.empty?
  output.map do |item|
    raise "Invalid execution-service output item" unless item.is_a?(Hash)
    if item["type"] == "input_text" && item["text"].is_a?(String)
      {type: "input_text", text: item["text"]}
    elsif item["type"] == "input_image" && item["image_url"].is_a?(String) && item["detail"] == "original"
      {type: "input_image", image_url: item["image_url"], detail: "original"}
    else
      raise "Expected input_text or input_image with original detail"
    end
  end
end
```

Combine the adapter with the [API loop](https://developers.openai.com/api/docs/guides/tools-computer-use#connect-your-own-runtime), then call `run_computer_use` in Python or `runComputerUse` in JavaScript with your endpoint and task. The loop preserves the runtime session and uses `previous_response_id` to continue the model conversation. It stops after 20 responses if the task has not finished.

This adapter asks for approval before every generated script as a conservative demonstration. A production runtime must enforce the action-specific rules in [Handle user confirmation and consent](#handle-user-confirmation-and-consent). Removing the prompt does not supply those controls.

Run generated code in a disposable, least-privilege container or VM, in a separate security boundary from the API client and its credentials. Node.js `vm` and restricted Python global variables are not security boundaries. Enforce execution limits inside the runtime and stop code that exceeds them. The adapter's 30-second timeout only limits how long the client waits.

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
pageSha256: "3a53515d32ba7b665274d9d6b7275528ea266204187cf5a620711235029dc36d"
contentMode: "local-full"
zh: ""
---

## How browser use works

Browser use runs as an agent loop in your application: Claude returns member tool calls, your executor runs them against the browser, and you return the results until Claude answers in text.

    * Add the `browser_toolset_20260801` entry, and optionally other tools, to your API request.
    * Include a user prompt that calls for working with webpages, for example, "Open example.com/docs and tell me how to get started."

    * Claude returns one or more `tool_use` blocks in a single assistant turn; several in one turn form a batch action, for example, `left_click`, then `type`, then `key`.
    * Each block's `name` is the member name, each carries `"toolset_name": "browser"`, and `input` holds only that member's parameters, with no `action` field. The response's `stop_reason` is `tool_use`.

    * Iterate every `tool_use` block in `response.content` (don't assume there's exactly one) and run them sequentially, in the order they appear, because later calls usually depend on earlier ones.
    * Return one `tool_result` per block in a new `user` message, matched by `tool_use_id`, and echo `"toolset_name": "browser"` on each. Every call must be answered or the next request is rejected.
    * If a call fails, return `is_error: true` with a text description for that block, then apply the halt rule in [Batch actions](https://platform.claude.com/docs/en/agents-and-tools/tool-use/browser-use-tool#batch-actions) to every later block in the turn.

    * Claude reads the results (page text, accessibility trees, screenshots, tab state) and, if it needs more, returns further member calls, which takes you back to step 3.
    * Otherwise, it returns a text response to the user.

Here's a skeleton of that loop's tool-call step in two parts. First, stub member handlers stand in for your browser automation. Five members (`navigate`, `read_page`, `left_click`, `type`, and `screenshot`) return the text, or for `screenshot` the image block, that becomes the result content, and the dispatcher raises an error for any member it doesn't implement.

  ```python Python
  # Placeholder image data; a real executor captures the viewport and returns the PNG bytes
  PLACEHOLDER_PNG = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="

  def navigate(url):
      return f"navigated to {url}"

  def read_page():
      return 'link "Docs" [ref_1]\nbutton "Search" [ref_2]'

  def click(target):
      # A target is an element reference from read_page or find, or a viewport coordinate
      if target["type"] == "ref":
          return f"clicked {target['ref']}"
      return f"clicked at ({target['x']}, {target['y']})"

  def type_text(text):
      return f"typed: {text}"

  def capture_screenshot() -> list[ImageBlockParam]:
      # screenshot answers with an image block rather than text: return the result content list
      return [
          {
              "type": "image",
              "source": {"type": "base64", "media_type": "image/png", "data": PLACEHOLDER_PNG},
          }
      ]

  def handle_browser_action(name, tool_input):
      if name == "navigate":
          return navigate(tool_input["url"])
      elif name == "read_page":
          return read_page()
      elif name == "left_click":
          return click(tool_input["target"])
      elif name == "type":
          return type_text(tool_input["text"])
      elif name == "screenshot":
          return capture_screenshot()
      # Handle other actions as needed
      raise ValueError(f"Unknown or unimplemented member: {name}")
  ```

  ```typescript TypeScript
  // Placeholder image data; a real executor captures the viewport as PNG bytes
  const PLACEHOLDER_PNG = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==";

  function navigate(url: string): string {
    return `navigated to ${url}`;
  }

  function readPage(): string {
    return 'link "Docs" [ref_1]\nbutton "Search" [ref_2]';
  }

  function clickElement(ref: string): string {
    return `clicked ${ref}`;
  }

  function clickAt(x: number, y: number): string {
    return `clicked at (${x}, ${y})`;
  }

  function typeText(text: string): string {
    return `typed: ${text}`;
  }

  function captureScreenshot(): Anthropic.ImageBlockParam[] {
    // screenshot answers with an image block rather than text
    return [
      {
        type: "image",
        source: {
          type: "base64",
          media_type: "image/png",
          data: PLACEHOLDER_PNG,
        },
      },
    ];
  }

  function handleBrowserAction(
    action: string,
    input: unknown,
  ): string | Anthropic.ImageBlockParam[] {
    const params: object =
      typeof input === "object" && input !== null ? input : {};
    if (action === "navigate" && "url" in params) {
      return navigate(String(params.url));
    } else if (action === "read_page") {
      return readPage();
    } else if (action === "left_click" && "target" in params) {
      // target is an element reference from read_page or a viewport coordinate
      const target: object =
        typeof params.target === "object" && params.target !== null
          ? params.target
          : {};
      if ("type" in target && target.type === "ref" && "ref" in target) {
        return clickElement(String(target.ref));
      } else if ("x" in target && "y" in target) {
        return clickAt(Number(target.x), Number(target.y));
      }
    } else if (action === "type" && "text" in params) {
      return typeText(String(params.text));
    } else if (action === "screenshot") {
      return captureScreenshot();
    }
    // Handle other actions as needed
    throw new Error(`Unknown or unimplemented member: ${action}`);
  }
  ```

  ```csharp C#
  // Placeholder image data; a real executor captures the viewport and returns the PNG bytes
  const string PlaceholderPng = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==";

  string Navigate(string url) => $"navigated to {url}";

  string ReadPage() =>
      """
      link "Docs" [ref_1]
      button "Search" [ref_2]
      """;

  string ClickRef(string elementRef) => $"clicked {elementRef}";

  string ClickAt(int x, int y) => $"clicked at ({x}, {y})";

  // target is {"type": "ref", "ref": "ref_1"} or {"type": "coordinate", "x": 640, "y": 380}
  string Click(JsonElement target) =>
      target.GetProperty("type").GetString() == "ref"
          ? ClickRef(target.GetProperty("ref").GetString()!)
          : ClickAt(target.GetProperty("x").GetInt32(), target.GetProperty("y").GetInt32());

  string TypeText(string text) => $"typed: {text}";

  // screenshot answers with an image block rather than text: return the result content list
  List<Block> CaptureScreenshot() =>
      [
          new ImageBlockParam(
              new Base64ImageSource { Data = PlaceholderPng, MediaType = MediaType.ImagePng }
          ),
      ];

  ToolResultBlockParamContent HandleBrowserAction(
      string action,
      IReadOnlyDictionary<string, JsonElement> input
  ) =>
      action switch
      {
          "navigate" => Navigate(input["url"].GetString()!),
          "read_page" => ReadPage(),
          "left_click" => Click(input["target"]),
          "type" => TypeText(input["text"].GetString()!),
          "screenshot" => CaptureScreenshot(),
          // Handle other actions as needed
          _ => throw new NotSupportedException($"Unknown or unimplemented member: {action}"),
      };
  ```

  ```go Go
  // placeholderPNG stands in for a real capture: an executor returns the
  // viewport as base64-encoded PNG data.
  const placeholderPNG = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="

  // textContent wraps text as tool_result content.
  func textContent(text string) []anthropic.ToolResultBlockParamContentUnion {
  	return []anthropic.ToolResultBlockParamContentUnion{
  		{OfText: &anthropic.TextBlockParam{Text: text}},
  	}
  }

  func navigate(url string) string {
  	return fmt.Sprintf("navigated to %s", url)
  }

  func readPage() string {
  	return "link \"Docs\" [ref_1]\nbutton \"Search\" [ref_2]"
  }

  func clickRef(ref string) string {
  	return fmt.Sprintf("clicked %s", ref)
  }

  func clickAt(x, y int) string {
  	return fmt.Sprintf("clicked at (%d, %d)", x, y)
  }

  func typeText(text string) string {
  	return fmt.Sprintf("typed: %s", text)
  }

  // captureScreenshot returns an image block rather than text.
  func captureScreenshot() []anthropic.ToolResultBlockParamContentUnion {
  	return []anthropic.ToolResultBlockParamContentUnion{{
  		OfImage: &anthropic.ImageBlockParam{
  			Source: anthropic.ImageBlockParamSourceUnion{
  				OfBase64: &anthropic.Base64ImageSourceParam{
  					MediaType: anthropic.Base64ImageSourceMediaTypeImagePNG,
  					Data:      placeholderPNG,
  				},
  			},
  		},
  	}}
  }

  func handleBrowserAction(action string, params map[string]any) ([]anthropic.ToolResultBlockParamContentUnion, error) {
  	switch action {
  	case "navigate":
  		if url, ok := params["url"].(string); ok {
  			return textContent(navigate(url)), nil
  		}
  	case "read_page":
  		return textContent(readPage()), nil
  	case "left_click":
  		// target is either an element reference from read_page or a viewport coordinate
  		target, _ := params["target"].(map[string]any)
  		if ref, ok := target["ref"].(string); ok && target["type"] == "ref" {
  			return textContent(clickRef(ref)), nil
  		}
  		x, xok := target["x"].(float64)
  		y, yok := target["y"].(float64)
  		if xok && yok {
  			return textContent(clickAt(int(x), int(y))), nil
  		}
  	case "type":
  		if text, ok := params["text"].(string); ok {
  			return textContent(typeText(text)), nil
  		}
  	case "screenshot":
  		return captureScreenshot(), nil
  	// Handle other actions as needed
  	default:
  		return nil, fmt.Errorf("unknown or unimplemented member: %s", action)
  	}
  	// Reached when a member's input is missing a field or a field has the wrong type
  	return nil, fmt.Errorf("invalid input for %s", action)
  }

  ```

  ```java Java
  /** Placeholder pixels; a real executor captures the viewport and base64-encodes the PNG. */
  static final String PLACEHOLDER_PNG = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==";

  ToolResultBlockParam.Content captureScreenshot() {
      ImageBlockParam image = ImageBlockParam.builder()
              .source(Base64ImageSource.builder()
                      .mediaType(Base64ImageSource.MediaType.IMAGE_PNG)
                      .data(PLACEHOLDER_PNG)
                      .build())
              .build();
      return ToolResultBlockParam.Content.ofBlocks(
              List.of(ToolResultBlockParam.Content.Block.ofImage(image)));
  }

  String navigate(String url) {
      return "navigated to " + url;
  }

  String readPage() {
      return """
              link "Docs" [ref_1]
              button "Search" [ref_2]""";
  }

  String clickRef(String ref) {
      return "clicked " + ref;
  }

  String clickAt(long x, long y) {
      return "clicked at (" + x + ", " + y + ")";
  }

  String typeText(String text) {
      return "typed: " + text;
  }

  /** Runs one browser toolset member; {@code action} is the tool_use block's name. */
  ToolResultBlockParam.Content handleBrowserAction(String action, Map<String, JsonValue> input) {
      if (action.equals("screenshot")) {
          return captureScreenshot(); // the one member here that answers with an image block
      }
      String output = switch (action) {
          case "navigate" -> navigate(input.get("url").asStringOrThrow());
          case "read_page" -> readPage();
          case "left_click" -> {
              // target is {"type": "ref", "ref": "ref_1"} or {"type": "coordinate", "x": 640, "y": 380}
              Map<String, JsonValue> target =
                      (Map<String, JsonValue>) input.get("target").asObject().get();
              if (target.get("type").asStringOrThrow().equals("ref")) {
                  yield clickRef(target.get("ref").asStringOrThrow());
              }
              long x = ((Number) target.get("x").asNumber().get()).longValue();
              long y = ((Number) target.get("y").asNumber().get()).longValue();
              yield clickAt(x, y);
          }
          case "type" -> typeText(input.get("text").asStringOrThrow());
          // Handle other actions as needed
          default -> throw new UnsupportedOperationException("Unknown or unimplemented member: " + action);
      };
      return ToolResultBlockParam.Content.ofString(output);
  }
  ```

  ```php PHP
  // Stand-in for real PNG bytes; a real executor captures the viewport
  const PLACEHOLDER_PNG = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';

  function navigateTo(string $url): string
  {
      return "navigated to {$url}";
  }

  function readPage(): string
  {
      return <<<'TEXT'
          link "Docs" [ref_1]
          button "Search" [ref_2]
          TEXT;
  }

  function clickTarget(array $target): string
  {
      // A target is an element reference from read_page or find, or a viewport pixel coordinate
      if ($target['type'] === 'ref') {
          return "clicked {$target['ref']}";
      }

      return "clicked at ({$target['x']}, {$target['y']})";
  }

  function typeText(string $text): string
  {
      return "typed: {$text}";
  }

  function captureScreenshot(): array
  {
      // screenshot answers with an image block rather than text, so return the result content list
      $image = [
          'type' => 'image',
          'source' => ['type' => 'base64', 'media_type' => 'image/png', 'data' => PLACEHOLDER_PNG],
      ];

      return [$image];
  }

  function handleBrowserAction(string $name, array $input): string|array
  {
      return match ($name) {
          'navigate' => navigateTo($input['url']),
          'read_page' => readPage(),
          'left_click' => clickTarget($input['target']),
          'type' => typeText($input['text']),
          'screenshot' => captureScreenshot(),
          // Handle other actions as needed
          default => throw new RuntimeException("Unknown or unimplemented member: {$name}"),
      };
  }
  ```

  ```ruby Ruby
  # Stand-in image data; a real executor captures the viewport as a PNG.
  PLACEHOLDER_PNG = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="

  def navigate(url)
    "navigated to #{url}"
  end

  def read_page
    <<~TREE
      link "Docs" [ref_1]
      button "Search" [ref_2]
    TREE
  end

  def click(target)
    return "clicked #{target[:ref]}" if target[:type] == "ref"

    "clicked at (#{target[:x]}, #{target[:y]})"
  end

  def type_text(text)
    "typed: #{text}"
  end

  def capture_screenshot
    [
      {
        type: "image",
        source: { type: "base64", media_type: "image/png", data: PLACEHOLDER_PNG }
      }
    ]
  end

  def handle_browser_action(name, input)
    case name
    when "navigate"
      navigate(input[:url])
    when "read_page"
      read_page
    when "left_click"
      # target is an element reference (from read_page or find) or a coordinate
      click(input[:target])
    when "type"
      type_text(input[:text])
    when "screenshot"
      capture_screenshot
    # Handle other actions as needed
    else
      raise ArgumentError, "Unknown or unimplemented member: #{name}"
    end
  end
  ```

The second part runs a batch in order, dispatches each block to those handlers, echoes `toolset_name` on every result, and applies the halt rule from [Batch actions](https://platform.claude.com/docs/en/agents-and-tools/tool-use/browser-use-tool#batch-actions), turning a handler error into an error result. The sampling loop that calls it is the one shown in [Understand the agent loop](https://platform.claude.com/docs/en/agents-and-tools/tool-use/computer-use-tool#understanding-the-agentic-loop), with the browser toolset in `tools`.

  ```python Python
  NOT_EXECUTED = "Not executed: an earlier action in this turn failed."

  def process_tool_calls(response: Message) -> list[ToolResultBlockParam]:
      """
      Run the browser actions in Claude's response in order and answer each
      one. After the first failure the rest are skipped, because Claude planned
      them assuming the earlier actions succeeded.
      """
      tool_results: list[ToolResultBlockParam] = []
      failed = False
      for block in response.content:
          # Only the browser toolset is declared; route other tools here if you add them
          if block.type != "tool_use" or block.toolset_name != "browser":
              continue
          result: ToolResultBlockParam = {
              "type": "tool_result",
              "tool_use_id": block.id,
              "toolset_name": "browser",
          }
          if failed:
              result["content"] = NOT_EXECUTED
              result["is_error"] = True
          else:
              try:
                  # A string or a list of content blocks; a real executor also adds a
                  # browser_state block to navigation and tab-management results
                  result["content"] = handle_browser_action(block.name, block.input)
              except Exception as err:
                  result["content"] = f"Error: {err}"
                  result["is_error"] = True
                  failed = True
          tool_results.append(result)
      return tool_results
  ```

  ```typescript TypeScript
  const HALT_TEXT = "Not executed: an earlier action in this turn failed.";

  function browserResult(
    toolUseId: string,
    content: string | Anthropic.ImageBlockParam[],
    isError?: boolean,
  ): Anthropic.ToolResultBlockParam {
    return {
      type: "tool_result",
      tool_use_id: toolUseId,
      toolset_name: "browser",
      content,
      is_error: isError,
    };
  }

  function processToolCalls(
    response: Anthropic.Message,
  ): Anthropic.ToolResultBlockParam[] {
    const toolResults: Anthropic.ToolResultBlockParam[] = [];
    let failed = false;
    for (const block of response.content) {
      if (block.type !== "tool_use") {
        continue;
      }
      if (block.toolset_name !== "browser") {
        // This example declares only the browser toolset; route other tools
        // here if you add them.
        continue;
      }
      if (failed) {
        // A batch stops at its first failure; answer later actions unexecuted
        toolResults.push(browserResult(block.id, HALT_TEXT, true));
        continue;
      }
      try {
        // A string or an image block list; a real executor also adds a
        // browser_state block to navigation and tab-management results
        const result = handleBrowserAction(block.name, block.input);
        toolResults.push(browserResult(block.id, result));
      } catch (error) {
        failed = true;
        const message = error instanceof Error ? error.message : String(error);
        toolResults.push(browserResult(block.id, `Error: ${message}`, true));
      }
    }
    return toolResults;
  }
  ```

  ```csharp C#
  const string HaltText = "Not executed: an earlier action in this turn failed.";

  List<ContentBlockParam> ProcessToolCalls(Message response)
  {
      List<ContentBlockParam> toolResults = [];
      var failed = false;
      foreach (var block in response.Content)
      {
          if (!block.TryPickToolUse(out var toolUse))
          {
              continue;
          }

          if (toolUse.ToolsetName != "browser")
          {
              // This example declares only the browser toolset; route other tools
              // here if you add them.
              continue;
          }

          if (failed)
          {
              // A batch stops at its first failure; answer later actions without running them
              toolResults.Add(
                  new ToolResultBlockParam(toolUse.ID)
                  {
                      Content = HaltText,
                      IsError = true,
                      ToolsetName = "browser",
                  }
              );
              continue;
          }

          try
          {
              // A string or a list of content blocks; a real executor also adds a
              // browser_state block to navigation and tab-management results
              var result = HandleBrowserAction(toolUse.Name, toolUse.Input);
              toolResults.Add(
                  new ToolResultBlockParam(toolUse.ID) { Content = result, ToolsetName = "browser" }
              );
          }
          catch (Exception e)
          {
              failed = true;
              toolResults.Add(
                  new ToolResultBlockParam(toolUse.ID)
                  {
                      Content = $"Error: {e.Message}",
                      IsError = true,
                      ToolsetName = "browser",
                  }
              );
          }
      }
      return toolResults;
  }
  ```

  ```go Go
  const notExecuted = "Not executed: an earlier action in this turn failed."

  // browserToolResult builds the result for one browser action. Unlike an
  // ordinary tool result, it must echo the toolset name. A real executor also
  // adds a browser_state block to navigation and tab-management results.
  func browserToolResult(toolUseID string, content []anthropic.ToolResultBlockParamContentUnion, isError bool) anthropic.ContentBlockParamUnion {
  	result := anthropic.ToolResultBlockParam{
  		ToolUseID:   toolUseID,
  		ToolsetName: anthropic.String("browser"),
  		Content:     content,
  	}
  	if isError {
  		result.IsError = anthropic.Bool(true)
  	}
  	return anthropic.ContentBlockParamUnion{OfToolResult: &result}
  }

  // processToolCalls runs the browser actions in Claude's response in order and
  // builds one tool_result per tool_use block. After the first failure it skips
  // the rest: Claude planned them assuming the earlier actions succeeded.
  func processToolCalls(response *anthropic.Message) []anthropic.ContentBlockParamUnion {
  	var toolResults []anthropic.ContentBlockParamUnion
  	failed := false
  	for _, block := range response.Content {
  		switch variant := block.AsAny().(type) {
  		case anthropic.ToolUseBlock:
  			// This example declares only the browser toolset; route other tools here if you add them.
  			if variant.ToolsetName != "browser" {
  				continue
  			}
  			if failed {
  				toolResults = append(toolResults, browserToolResult(variant.ID, textContent(notExecuted), true))
  				continue
  			}
  			var input map[string]any
  			var content []anthropic.ToolResultBlockParamContentUnion
  			err := json.Unmarshal(variant.Input, &input)
  			if err == nil {
  				content, err = handleBrowserAction(variant.Name, input)
  			}
  			if err != nil {
  				failed = true
  				content = textContent("Error: " + err.Error())
  			}
  			toolResults = append(toolResults, browserToolResult(variant.ID, content, err != nil))
  		}
  	}
  	return toolResults
  }

  ```

  ```java Java
  /** The exact text the toolset contract prescribes for member calls skipped after a failure. */
  static final String HALT_TEXT = "Not executed: an earlier action in this turn failed.";

  /** Every result answering a browser toolset member echoes toolset_name. */
  ToolResultBlockParam.Builder browserResult(ToolUseBlock toolUse) {
      return ToolResultBlockParam.builder()
              .toolUseId(toolUse.id())
              .toolsetName("browser");
  }

  /**
   * Run the browser actions in Claude's response in order and build one
   * tool_result per tool_use block. After the first failure, skip the rest:
   * Claude planned them assuming the earlier actions succeeded.
   */
  List<ContentBlockParam> processToolCalls(Message response) {
      List<ContentBlockParam> toolResults = new ArrayList<>();
      boolean failed = false;
      for (ContentBlock block : response.content()) {
          // This example declares only the browser toolset; route other tools here if you add them.
          if (!block.isToolUse() || !block.asToolUse().toolsetName().equals(Optional.of("browser"))) {
              continue;
          }
          ToolUseBlock toolUse = block.asToolUse();
          ToolResultBlockParam result;
          if (failed) {
              result = browserResult(toolUse).content(HALT_TEXT).isError(true).build();
          } else {
              try {
                  Map<String, JsonValue> input =
                          (Map<String, JsonValue>) toolUse._input().asObject().get();
                  ToolResultBlockParam.Content output = handleBrowserAction(toolUse.name(), input);
                  // A real executor also adds a browser_state block to navigation and
                  // tab-management results; see "Track tabs with browser_state" on this page.
                  result = browserResult(toolUse).content(output).build();
              } catch (RuntimeException e) {
                  failed = true;
                  result = browserResult(toolUse).content("Error: " + e.getMessage()).isError(true).build();
              }
          }
          toolResults.add(ContentBlockParam.ofToolResult(result));
      }
      return toolResults;
  }
  ```

  ```php PHP
  const HALT_TEXT = 'Not executed: an earlier action in this turn failed.';

  function processToolCalls(Message $response): array
  {
      $toolResults = [];
      $failed = false;
      foreach ($response->content as $block) {
          // This example declares only the browser toolset; route other tools here if you add them.
          if (!($block instanceof ToolUseBlock) || $block->toolsetName !== 'browser') {
              continue;
          }
          $result = ['type' => 'tool_result', 'tool_use_id' => $block->id, 'toolset_name' => 'browser'];
          if ($failed) {
              // A batch stops at its first failure; the remaining actions are answered without running
              $toolResults[] = [...$result, 'content' => HALT_TEXT, 'is_error' => true];
              continue;
          }
          try {
              // A real executor also returns a browser_state block on navigation and tab-management results
              $toolResults[] = [...$result, 'content' => handleBrowserAction($block->name, $block->input)];
          } catch (Throwable $e) {
              $failed = true;
              $toolResults[] = [...$result, 'content' => 'Error: ' . $e->getMessage(), 'is_error' => true];
          }
      }

      return $toolResults;
  }
  ```

  ```ruby Ruby
  NOT_EXECUTED = "Not executed: an earlier action in this turn failed."

  # Run the browser actions in Claude's response in order and build one
  # tool_result per tool_use block. After the first failure, skip the rest:
  # Claude planned them assuming the earlier actions succeeded.
  def process_tool_calls(response)
    tool_results = []
    failed = false
    response.content.each do |block|
      # This example declares only the browser toolset; route other tools here
      # if you add them.
      next unless block.type == :tool_use && block.toolset_name == "browser"

      result = { type: "tool_result", tool_use_id: block.id, toolset_name: "browser" }
      if failed
        result.update(content: NOT_EXECUTED, is_error: true)
      else
        begin
          # A String, or content blocks for a screenshot. A real executor also adds
          # a browser_state block to navigation and tab-management results.
          result[:content] = handle_browser_action(block.name, block.input)
        rescue => e
          result.update(content: "Error: #{e.message}", is_error: true)
          failed = true
        end
      end
      tool_results << result
    end
    tool_results
  end
  ```

Dispatch each block on the pair (`toolset_name`, `name`) rather than on `name` alone, because a custom tool in the same request may share a member's name; [Client toolsets](https://platform.claude.com/docs/en/agents-and-tools/tool-use/tool-reference#client-toolsets) describes the parts of this contract both toolsets share. If Claude names a member your executor doesn't implement, or one you disabled, answer that block with an [error result](https://platform.claude.com/docs/en/agents-and-tools/tool-use/browser-use-tool#return-errors-from-your-executor) rather than dropping it.

When you stream the response, each member's `input` arrives as one complete `input_json_delta` rather than as fragments, so wait for the turn to finish before running the batch.

### Batch actions

A turn with several member calls is a batch action: run the calls in the order they appear, stop at the first failure, and answer every later call with `is_error: true` and the exact text `Not executed: an earlier action in this turn failed.` A batch uses the same response shape as [parallel tool use](https://platform.claude.com/docs/en/agents-and-tools/tool-use/parallel-tool-use); the difference is that you run the blocks in order rather than concurrently. Here Claude clicks the search box it found earlier, types a query, and presses Enter in one turn:

```json
{
  "role": "assistant",
  "content": [
    {
      "type": "tool_use",
      "id": "toolu_01D7FLrfh4GYq7yT1ULFeyMV",
      "name": "left_click",
      "toolset_name": "browser",
      "input": { "target": { "type": "ref", "ref": "ref_3" } }
    },
    {
      "type": "tool_use",
      "id": "toolu_01Ez4kLb1nQ2vXo8sJ9pWm3c",
      "name": "type",
      "toolset_name": "browser",
      "input": { "text": "install" }
    },
    {
      "type": "tool_use",
      "id": "toolu_01FkP8rTz6uYh2mNq4LsXw7v",
      "name": "key",
      "toolset_name": "browser",
      "input": { "text": "Enter" }
    }
  ]
}
```

Your application returns three `tool_result` blocks in one `user` message, each carrying `toolset_name` and a short text acknowledgment such as `Clicked element ref_3.` Pressing Enter loads a results page, so the `key` result also carries a `browser_state` block with the tab's updated URL ([Tab context on other results](https://platform.claude.com/docs/en/agents-and-tools/tool-use/browser-use-tool#tab-context-on-other-results)). If the click had failed instead, its result would carry your error text and the other two results would carry the halt text, as shown under [Return errors from your executor](https://platform.claude.com/docs/en/agents-and-tools/tool-use/browser-use-tool#return-errors-from-your-executor).

You don't need to return a screenshot after every call. Claude typically ends a batch with an observation call (`screenshot`, `read_page`, or `get_page_text`), and your application can also attach its own observation, such as a fresh screenshot or accessibility tree, as an extra content block on the last result in the batch to save a round trip. Because a tab-management result must be exactly one `browser_state` block, attach it to the last result that isn't a tab-management call.

If your executor can run only one call per round trip, set `disable_parallel_tool_use` to `true` in `tool_choice` and Claude returns at most one member call per turn, at the cost of more round trips ([Disable parallel tool use](https://platform.claude.com/docs/en/agents-and-tools/tool-use/parallel-tool-use#disable-parallel-tool-use)). The rest of the contract under [Batch actions for the computer use tool](https://platform.claude.com/docs/en/agents-and-tools/tool-use/computer-use-tool#batch-actions) carries over, including one `tool_result` for every `tool_use` in the next `user` message, except for two things: the halt text and what a successful result's `content` holds. Result content follows [Member tools](https://platform.claude.com/docs/en/agents-and-tools/tool-use/browser-use-tool#member-tools) on this page instead: a `new_tab`, `switch_tab`, `close_tab`, or `list_tabs` result is exactly one `browser_state` block with no text or image ([Tab management results](https://platform.claude.com/docs/en/agents-and-tools/tool-use/browser-use-tool#tab-management-results)), and any other member's result may add a `browser_state` block to its text or image ([Tab context on other results](https://platform.claude.com/docs/en/agents-and-tools/tool-use/browser-use-tool#tab-context-on-other-results)). Where cache breakpoints inside a batch take effect is described in the `cache_control` row of the computer use tool's [Tool parameters](https://platform.claude.com/docs/en/agents-and-tools/tool-use/computer-use-tool#tool-parameters).

### Targets and coordinates

Member tools that act on a location take a `target` object, which is either a viewport-pixel coordinate or a reference to an element that `read_page` or `find` returned. The [Member tools](https://platform.claude.com/docs/en/agents-and-tools/tool-use/browser-use-tool#member-tools) tables write `Target` for a parameter that accepts either shape.

| Shape              | `target.type`  | Fields                                         | Accepted by                                                                                                                                                                               |
| ------------------ | -------------- | ---------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CoordinateTarget` | `"coordinate"` | `x`, `y` (integers, viewport pixels)           | `left_click`, `right_click`, `middle_click`, `double_click`, `triple_click`, `hover`, `left_click_drag` (`from` and `target`), `left_mouse_down`, `left_mouse_up`, `mouse_move`, `scroll` |
| `RefTarget`        | `"ref"`        | `ref` (an element reference such as `"ref_2"`) | `left_click`, `right_click`, `middle_click`, `double_click`, `triple_click`, `hover`, `scroll_to`, `form_input`, `file_upload`                                                            |

**Coordinates are viewport pixels**, the pixel space of a full-viewport `screenshot` with the origin at the top left of the rendered page; there's no surrounding desktop or window frame. The toolset declares no display dimensions and Claude infers the viewport size from the screenshots you return, so keep them one consistent size. A `zoom` doesn't change the frame, so its `region` and any coordinates Claude emits after seeing the zoomed image are still full-viewport pixels.

**Screenshots must fit the image limits.** The API doesn't downscale toolset images: a screenshot or zoom image over your model's [image size limits](https://platform.claude.com/docs/en/build-with-claude/vision#evaluate-image-size), or over the stricter per-image limit that applies once a request holds [more than 20 images](https://platform.claude.com/docs/en/build-with-claude/vision#request-limits), is rejected. Resize before returning, and scale Claude's coordinates back up by the inverse of your factor before dispatching them ([Size screenshots to fit image limits](https://platform.claude.com/docs/en/agents-and-tools/tool-use/computer-use-tool#handle-coordinate-scaling-for-higher-resolutions)).

**Element references come from `read_page` and `find`.** Each element in their output carries a tag such as `[ref_2]`, as in the Quick start result:

```text wrap
link "Documentation" [ref_1]
link "Getting started" [ref_2]
textbox "Search docs" [ref_3]
button "Search" [ref_4]
link "Pricing" [ref_5]
```

Claude passes a reference back as a `\{"type": "ref", "ref": "ref_2"\}` target on a later click, `hover`, `scroll_to`, `form_input`, or `file_upload` call, or as the `ref` parameter on `read_page` to read a subtree. Your executor assigns the references, keeps the mapping from each one to the underlying node (an accessibility-node ID, a stored selector, or equivalent), and acts on that node when a reference comes back.

References are scoped to the tab that produced them and stay valid until that tab navigates or its DOM changes materially. The API can't detect a stale or unknown reference, so when Claude passes a reference your executor no longer recognizes, return an error result such as `Error: ref_3 is stale or not found on the current page. Re-read the page to get fresh references.` Claude then reads the page again. Don't renumber references you've already handed out for a tab until it navigates, because that silently invalidates references Claude still holds.

Claude uses both targeting styles and switches between them based on what the page exposes; your prompt and what your executor returns steer the choice:

* **Prefer references where the page has a usable accessibility tree.** A reference survives layout shifts and reflows that make pixel coordinates fragile, and lets Claude act on controls that are hard to hit with a pointer.
* **Fall back to coordinates for content the tree doesn't describe.** Canvas-rendered interfaces, embedded video or remote-desktop surfaces, heavily virtualized lists, and elements inside cross-origin iframes often have no useful node, so Claude works from `screenshot` and `zoom` and clicks by coordinate; your executor resolves which frame a coordinate lands in.
* **Scope reads, and read the tree before you screenshot.** On large pages, `read_page` with `filter: "interactive"` or the `ref` of a container returns a focused subtree, and a tree read of a typical page often costs fewer input tokens than a screenshot while giving Claude references it can act on immediately. Screenshots remain the right observation when visual layout, images, or rendering state matter.

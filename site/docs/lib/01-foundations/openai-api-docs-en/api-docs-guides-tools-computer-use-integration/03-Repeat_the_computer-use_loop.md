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
pageSha256: "ffaa73120fd01fef4c24dabcc974d199eb1b0fdc476bcfca5b7058f8bf32f336"
contentMode: "local-full"
zh: ""
---

## Repeat the computer-use loop

### Show the loop skeleton

This function assumes you have an action handler and a screenshot helper. Add permission checks, cancellation, and step and time limits for your application. It illustrates the exchange rather than a complete runtime.

Repeat the Computer use loop

```javascript
import OpenAI from "openai";

const client = new OpenAI();

async function computerUseLoop(target, response) {
  while (true) {
    const computerCall = response.output.find(
      (item) => item.type === "computer_call"
    );
    if (!computerCall) {
      return response;
    }

    await handleComputerActions(target, computerCall.actions);

    const screenshot = await captureScreenshot(target);
    const screenshotBase64 = Buffer.from(screenshot).toString("base64");
    const output = /** @type {const} */ ({
      type: "computer_screenshot",
      image_url: `data:image/png;base64,${screenshotBase64}`,
      detail: "original",
    });

    response = await client.responses.create({
      model: "gpt-5.6-sol",
      tools: [{ type: "computer" }],
      previous_response_id: response.id,
      input: [
        {
          type: "computer_call_output",
          call_id: computerCall.call_id,
          output,
        },
      ],
    });
  }
}
```

```python
import base64

from openai import OpenAI

client = OpenAI()

def computer_use_loop(target, response):
    while True:
        computer_call = next(
            (item for item in response.output if item.type == "computer_call"),
            None,
        )
        if computer_call is None:
            return response

        handle_computer_actions(target, computer_call.actions)

        screenshot = capture_screenshot(target)
        screenshot_base64 = base64.b64encode(screenshot).decode("utf-8")

        response = client.responses.create(
            model="gpt-5.6-sol",
            tools=[{"type": "computer"}],
            previous_response_id=response.id,
            input=[
                {
                    "type": "computer_call_output",
                    "call_id": computer_call.call_id,
                    "output": {
                        "type": "computer_screenshot",
                        "image_url": f"data:image/png;base64,{screenshot_base64}",
                        "detail": "original",
                    },
                }
            ],
        )
```

```java
import com.openai.client.OpenAIClient;
import com.openai.client.okhttp.OpenAIOkHttpClient;
import com.openai.core.JsonValue;
import com.openai.models.responses.ComputerAction;
import com.openai.models.responses.ResponseComputerToolCallOutputScreenshot;
import com.openai.models.responses.ResponseCreateParams;
import com.openai.models.responses.ResponseInputItem;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Locale;
import java.util.Map;

@FunctionalInterface
interface ContainerAction {
  void run() throws Exception;
}

static int wheelUnits(long pixels) {
  if (pixels == 0) return 0;
  long rounded = Math.round(pixels / 100.0);
  if (rounded == 0) rounded = Long.signum(pixels);
  return Math.toIntExact(Math.max(-100, Math.min(100, rounded)));
}

static String isolatedContainerName(String name) {
  if (name == null || !name.matches("[A-Za-z0-9][A-Za-z0-9_.-]{0,127}")) {
    throw new IllegalStateException(
        "Computer use requires an explicitly isolated Docker container; "
            + "start the documented VM and set OPENAI_EXAMPLE_COMPUTER_CONTAINER.");
  }
  return name;
}

record IsolatedContainer(String name) {
  byte[] run(String... arguments) throws IOException, InterruptedException {
    var command = new ArrayList<>(List.of("docker", "exec", "--env", "DISPLAY=:99", name));
    command.addAll(List.of(arguments));

    Process process = new ProcessBuilder(command).redirectErrorStream(true).start();
    byte[] output = process.getInputStream().readAllBytes();
    if (process.waitFor() != 0) {
      throw new IOException(
          "Isolated Docker command failed: " + new String(output, StandardCharsets.UTF_8));
    }
    return output;
  }

  String key(String name) {
    return switch (name.toUpperCase(Locale.ROOT)) {
      case "CTRL", "CONTROL" -> "ctrl";
      case "SHIFT" -> "shift";
      case "ALT", "OPTION" -> "alt";
      case "META", "CMD", "COMMAND" -> "super";
      case "ENTER", "RETURN" -> "Return";
      case "TAB" -> "Tab";
      case "ESC", "ESCAPE" -> "Escape";
      case "BACKSPACE" -> "BackSpace";
      case "DELETE" -> "Delete";
      case "ARROWLEFT" -> "Left";
      case "ARROWRIGHT" -> "Right";
      case "ARROWUP" -> "Up";
      case "ARROWDOWN" -> "Down";
      default -> {
        if (name.length() != 1 || !Character.isLetterOrDigit(name.charAt(0))) {
          throw new IllegalArgumentException("Unsupported key: " + name);
        }
        yield name;
      }
    };
  }

  void withModifiers(List<String> modifiers, ContainerAction action) throws Exception {
    var keys = modifiers.stream().map(this::key).toList();
    for (String key : keys) run("xdotool", "keydown", key);
    try {
      action.run();
    } finally {
      for (int index = keys.size() - 1; index >= 0; index--) {
        run("xdotool", "keyup", keys.get(index));
      }
    }
  }

  void move(long x, long y) throws IOException, InterruptedException {
    if (x < 0 || y < 0) throw new IllegalArgumentException("Negative mouse coordinates");
    run("xdotool", "mousemove", Long.toString(x), Long.toString(y));
  }

  String button(String name) {
    return switch (name) {
      case "left" -> "1";
      case "wheel" -> "2";
      case "right" -> "3";
      case "back" -> "8";
      case "forward" -> "9";
      default -> throw new IllegalArgumentException("Unsupported button: " + name);
    };
  }

  void scroll(long pixels, String negative, String positive)
      throws IOException, InterruptedException {
    int units = wheelUnits(pixels);
    if (units != 0) {
      run(
          "xdotool",
          "click",
          "--repeat",
          Integer.toString(Math.abs(units)),
          units < 0 ? negative : positive);
    }
  }

  void execute(ComputerAction action) throws Exception {
    if (action.isScreenshot()) return;
    if (action.isWait()) {
      Thread.sleep(1000);
      return;
    }
    if (action.isType()) {
      run("xdotool", "type", "--delay", "0", "--", action.asType().text());
      return;
    }
    if (action.isKeypress()) {
      var keys = action.asKeypress().keys().stream().map(this::key).toList();
      run("xdotool", "key", String.join("+", keys));
      return;
    }
    if (action.isClick()) {
      var click = action.asClick();
      withModifiers(
          click.keys().orElse(List.of()),
          () -> {
            move(click.x(), click.y());
            run("xdotool", "click", button(click.button().asString()));
          });
      return;
    }
    if (action.isDoubleClick()) {
      var click = action.asDoubleClick();
      withModifiers(
          click.keys().orElse(List.of()),
          () -> {
            move(click.x(), click.y());
            run("xdotool", "click", "--repeat", "2", "1");
          });
      return;
    }
    if (action.isMove()) {
      var move = action.asMove();
      withModifiers(move.keys().orElse(List.of()), () -> move(move.x(), move.y()));
      return;
    }
    if (action.isScroll()) {
      var scroll = action.asScroll();
      withModifiers(
          scroll.keys().orElse(List.of()),
          () -> {
            move(scroll.x(), scroll.y());
            scroll(scroll.scrollY(), "4", "5");
            scroll(scroll.scrollX(), "6", "7");
          });
      return;
    }
    if (action.isDrag()) {
      var drag = action.asDrag();
      if (drag.path().size() < 2) {
        throw new IllegalArgumentException("Drag path requires at least two points");
      }
      withModifiers(
          drag.keys().orElse(List.of()),
          () -> {
            var first = drag.path().get(0);
            move(first.x(), first.y());
            run("xdotool", "mousedown", "1");
            try {
              for (var point : drag.path()) move(point.x(), point.y());
            } finally {
              run("xdotool", "mouseup", "1");
            }
          });
      return;
    }
    throw new IllegalArgumentException("Unsupported computer action: " + action);
  }
}

var container =
    new IsolatedContainer(
        isolatedContainerName(System.getenv("OPENAI_EXAMPLE_COMPUTER_CONTAINER")));
var response = client.responses().retrieve(System.getenv("OPENAI_RESPONSE_ID"));
while (true) {
  var computerCall =
      response.output().stream().flatMap(item -> item.computerCall().stream()).findFirst();
  if (computerCall.isEmpty()) break;

  for (ComputerAction action : computerCall.get().actions().orElse(List.of())) {
    container.execute(action);
  }

  byte[] screenshot = container.run("import", "-window", "root", "png:-");
  String encoded = Base64.getEncoder().encodeToString(screenshot);

  response =
      client
          .responses()
          .create(
              ResponseCreateParams.builder()
                  .model("gpt-5.6-sol")
                  .previousResponseId(response.id())
                  .putAdditionalBodyProperty(
                      "tools", JsonValue.from(List.of(Map.of("type", "computer"))))
                  .inputOfResponse(
                      List.of(
                          ResponseInputItem.ofComputerCallOutput(
                              ResponseInputItem.ComputerCallOutput.builder()
                                  .callId(computerCall.get().callId())
                                  .output(
                                      ResponseComputerToolCallOutputScreenshot.builder()
                                          .imageUrl("data:image/png;base64," + encoded)
                                          .putAdditionalProperty(
                                              "detail", JsonValue.from("original"))
                                          .build())
                                  .build())))
                  .build());
}

response.output().stream()
    .flatMap(item -> item.message().stream())
    .flatMap(message -> message.content().stream())
    .flatMap(content -> content.outputText().stream())
    .forEach(text -> System.out.println(text.text()));
```

Stop if the API returns an incomplete or failed response, or if your application reaches its step or time limit. Do not execute a partially generated action. Keep the same environment available and return each completed action batch with its original `call_id`.

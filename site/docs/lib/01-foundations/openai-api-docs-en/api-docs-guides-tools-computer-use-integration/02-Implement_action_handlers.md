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
pageSha256: "5c61283b8ef8e8c36c760dc235e0b569f15f07a4538a207b4026a04095741fdb"
contentMode: "local-full"
zh: ""
---

## Implement action handlers

An action handler maps the model's structured requests to the controls exposed by your runtime. Keep details of the browser or operating system in these helpers so the rest of the loop can use the same action interface.

### Supported actions

The `computer` tool can request:

- `click`
- `double_click`
- `scroll`
- `type`
- `wait`
- `keypress`
- `drag`
- `move`
- `screenshot`

Map key and button names to the values your runtime accepts, and check drag paths before executing them. The helpers handle those translations for the browser and desktop examples.

#### Add normalization helpers

Playwright

    Normalization helpers

```javascript
// Map model-emitted key names to the names Playwright expects.
const normalizeKey = (key) => {
  switch (key) {
    case "ENTER":
    case "RETURN":
      return "Enter";
    case "ESC":
    case "ESCAPE":
      return "Escape";
    case "TAB":
      return "Tab";
    case "SPACE":
      return "Space";
    case "BACKSPACE":
      return "Backspace";
    case "DELETE":
    case "DEL":
      return "Delete";
    case "HOME":
      return "Home";
    case "END":
      return "End";
    case "PAGEUP":
      return "PageUp";
    case "PAGEDOWN":
      return "PageDown";
    case "UP":
    case "ARROWUP":
      return "ArrowUp";
    case "DOWN":
    case "ARROWDOWN":
      return "ArrowDown";
    case "LEFT":
    case "ARROWLEFT":
      return "ArrowLeft";
    case "RIGHT":
    case "ARROWRIGHT":
      return "ArrowRight";
    case "CTRL":
    case "CONTROL":
      return "Control";
    case "SHIFT":
      return "Shift";
    case "OPTION":
    case "ALT":
      return "Alt";
    case "META":
    case "CMD":
    case "COMMAND":
      return "Meta";
    default:
      return key;
  }
};

// Translate API button names to Playwright's supported button names.
const normalizePlaywrightButton = (button = "left") => {
  const buttons = {
    left: "left",
    right: "right",
    wheel: "middle",
  };
  const normalized = buttons[button];
  if (!normalized) {
    throw new Error(
      `Unsupported Playwright mouse button: ${button}. The back and forward buttons are not supported.`
    );
  }
  return normalized;
};

// Accept drag paths as either [x, y] pairs or {x, y} objects.
const normalizeDragPath = (path) => {
  if (!Array.isArray(path)) {
    throw new Error("drag action requires a path array");
  }

  return path.map((point) => {
    if (Array.isArray(point) && point.length >= 2) {
      return [point[0], point[1]];
    }
    if (point && typeof point === "object" && "x" in point && "y" in point) {
      return [point.x, point.y];
    }
    throw new Error(
      "drag path entries must be coordinate pairs or {x, y} objects"
    );
  });
};
```

```python
def normalize_key(key):
    """Map model-emitted key names to the names Playwright expects."""
    key_map = {
        "ENTER": "Enter",
        "RETURN": "Enter",
        "ESC": "Escape",
        "ESCAPE": "Escape",
        "TAB": "Tab",
        "SPACE": "Space",
        "BACKSPACE": "Backspace",
        "DELETE": "Delete",
        "DEL": "Delete",
        "HOME": "Home",
        "END": "End",
        "PAGEUP": "PageUp",
        "PAGEDOWN": "PageDown",
        "UP": "ArrowUp",
        "DOWN": "ArrowDown",
        "LEFT": "ArrowLeft",
        "RIGHT": "ArrowRight",
        "ARROWUP": "ArrowUp",
        "ARROWDOWN": "ArrowDown",
        "ARROWLEFT": "ArrowLeft",
        "ARROWRIGHT": "ArrowRight",
        "CTRL": "Control",
        "CONTROL": "Control",
        "SHIFT": "Shift",
        "OPTION": "Alt",
        "ALT": "Alt",
        "META": "Meta",
        "CMD": "Meta",
        "COMMAND": "Meta",
    }
    return key_map.get(key, key)

def normalize_playwright_button(button="left"):
    """Translate API button names to Playwright's supported button names."""
    button_map = {
        "left": "left",
        "right": "right",
        "wheel": "middle",
    }
    if button not in button_map:
        raise ValueError(
            f"Unsupported Playwright mouse button: {button}. "
            "The back and forward buttons are not supported."
        )
    return button_map[button]

def normalize_drag_path(path):
    """Convert the Python SDK's drag-path points to coordinate pairs."""
    return [(point.x, point.y) for point in path]
```

  

  

    
Docker

    Normalization helpers

```javascript
// Map model-emitted key names to the names xdotool expects.
const normalizeXdotoolKey = (key) => {
  switch (key) {
    case "ENTER":
    case "RETURN":
      return "Return";
    case "ESC":
    case "ESCAPE":
      return "Escape";
    case "TAB":
      return "Tab";
    case "SPACE":
      return "space";
    case "BACKSPACE":
      return "BackSpace";
    case "DELETE":
    case "DEL":
      return "Delete";
    case "HOME":
      return "Home";
    case "END":
      return "End";
    case "PAGEUP":
      return "Page_Up";
    case "PAGEDOWN":
      return "Page_Down";
    case "UP":
    case "ARROWUP":
      return "Up";
    case "DOWN":
    case "ARROWDOWN":
      return "Down";
    case "LEFT":
    case "ARROWLEFT":
      return "Left";
    case "RIGHT":
    case "ARROWRIGHT":
      return "Right";
    case "CTRL":
    case "CONTROL":
      return "ctrl";
    case "SHIFT":
      return "shift";
    case "OPTION":
    case "ALT":
      return "alt";
    case "META":
    case "CMD":
    case "COMMAND":
      return "super";
    default:
      return key;
  }
};

// Translate API button names to X11 button numbers.
const normalizeXdotoolButton = (button = "left") => {
  const buttons = {
    left: 1,
    wheel: 2,
    right: 3,
    back: 8,
    forward: 9,
  };
  const normalized = buttons[button];
  if (!normalized) {
    throw new Error(`Unsupported xdotool mouse button: ${button}`);
  }
  return normalized;
};

// Translate API scroll deltas to vertical and horizontal X11 wheel clicks.
const getXdotoolScrollButtons = (scrollX, scrollY) => {
  const scrollButtons = [];
  const appendClicks = (delta, negativeButton, positiveButton) => {
    if (!delta) {
      return;
    }
    const button = delta < 0 ? negativeButton : positiveButton;
    const clicks = Math.max(1, Math.abs(Math.round(delta / 100)));
    scrollButtons.push(...Array(clicks).fill(button));
  };

  appendClicks(scrollY, 4, 5);
  appendClicks(scrollX, 6, 7);
  return scrollButtons;
};

// Accept drag paths as either [x, y] pairs or {x, y} objects.
const normalizeDragPath = (path) => {
  if (!Array.isArray(path)) {
    throw new Error("drag action requires a path array");
  }

  return path.map((point) => {
    if (Array.isArray(point) && point.length >= 2) {
      return [point[0], point[1]];
    }
    if (point && typeof point === "object" && "x" in point && "y" in point) {
      return [point.x, point.y];
    }
    throw new Error(
      "drag path entries must be coordinate pairs or {x, y} objects"
    );
  });
};
```

```python
def normalize_xdotool_key(key):
    """Map model-emitted key names to the names xdotool expects."""
    key_map = {
        "ENTER": "Return",
        "RETURN": "Return",
        "ESC": "Escape",
        "ESCAPE": "Escape",
        "TAB": "Tab",
        "SPACE": "space",
        "BACKSPACE": "BackSpace",
        "DELETE": "Delete",
        "DEL": "Delete",
        "HOME": "Home",
        "END": "End",
        "PAGEUP": "Page_Up",
        "PAGEDOWN": "Page_Down",
        "UP": "Up",
        "DOWN": "Down",
        "LEFT": "Left",
        "RIGHT": "Right",
        "ARROWUP": "Up",
        "ARROWDOWN": "Down",
        "ARROWLEFT": "Left",
        "ARROWRIGHT": "Right",
        "CTRL": "ctrl",
        "CONTROL": "ctrl",
        "SHIFT": "shift",
        "OPTION": "alt",
        "ALT": "alt",
        "META": "super",
        "CMD": "super",
        "COMMAND": "super",
    }
    return key_map.get(key, key)

def normalize_xdotool_button(button="left"):
    """Translate API button names to X11 button numbers."""
    button_map = {
        "left": 1,
        "wheel": 2,
        "right": 3,
        "back": 8,
        "forward": 9,
    }
    if button not in button_map:
        raise ValueError(f"Unsupported xdotool mouse button: {button}")
    return button_map[button]

def get_xdotool_scroll_buttons(scroll_x, scroll_y):
    """Translate API scroll deltas to vertical and horizontal X11 wheel clicks."""
    buttons = []
    for delta, negative_button, positive_button in (
        (scroll_y, 4, 5),
        (scroll_x, 6, 7),
    ):
        if not delta:
            continue
        button = negative_button if delta < 0 else positive_button
        clicks = max(1, abs(round(delta / 100)))
        buttons.extend([button] * clicks)
    return buttons

def normalize_drag_path(path):
    """Convert the Python SDK's drag-path points to coordinate pairs."""
    return [(point.x, point.y) for point in path]
```

The following helpers show how to run a batch of actions in either environment:

Playwright

    Execute Computer use actions

```javascript
// Reuse normalizeKey from the helper above.
// Reuse normalizePlaywrightButton from the helper above.
// Reuse normalizeDragPath from the helper above.

function rejectModifiers(action) {
  if (action.keys?.length) {
    throw new Error(
      "This handler does not support modifier keys. Use the modifier-aware handler below."
    );
  }
}

async function handleComputerActions(page, actions) {
  for (const action of actions) {
    switch (action.type) {
      case "click": {
        rejectModifiers(action);
        await page.mouse.click(action.x, action.y, {
          button: normalizePlaywrightButton(action.button),
        });
        break;
      }
      case "double_click":
        rejectModifiers(action);
        await page.mouse.dblclick(action.x, action.y);
        break;
      case "drag": {
        rejectModifiers(action);
        const path = normalizeDragPath(action.path);
        if (path.length < 2) {
          throw new Error("drag action requires at least two path points");
        }
        const [[startX, startY], ...rest] = path;
        await page.mouse.move(startX, startY);
        await page.mouse.down();
        for (const [x, y] of rest) {
          await page.mouse.move(x, y);
        }
        await page.mouse.up();
        break;
      }
      case "move":
        rejectModifiers(action);
        await page.mouse.move(action.x, action.y);
        break;
      case "scroll":
        rejectModifiers(action);
        await page.mouse.move(action.x, action.y);
        await page.mouse.wheel(action.scroll_x, action.scroll_y);
        break;
      case "keypress":
        await page.keyboard.press(action.keys.map(normalizeKey).join("+"));
        break;
      case "type":
        await page.keyboard.type(action.text);
        break;
      case "wait":
        await page.waitForTimeout(2000);
        break;
      case "screenshot":
        break;
      default:
        throw new Error(`Unsupported action: ${action.type}`);
    }
  }
}
```

```python
import time

# Reuse normalize_key from the helper above.
# Reuse normalize_playwright_button from the helper above.
# Reuse normalize_drag_path from the helper above.

def reject_modifiers(action):
    if getattr(action, "keys", None):
        raise ValueError(
            "This handler does not support modifier keys. "
            "Use the modifier-aware handler below."
        )

def handle_computer_actions(page, actions):
    for action in actions:
        match action.type:
            case "click":
                reject_modifiers(action)
                page.mouse.click(
                    action.x,
                    action.y,
                    button=normalize_playwright_button(
                        getattr(action, "button", "left")
                    ),
                )
            case "double_click":
                reject_modifiers(action)
                page.mouse.dblclick(action.x, action.y)
            case "drag":
                reject_modifiers(action)
                path = normalize_drag_path(action.path)
                if len(path) < 2:
                    raise ValueError("drag action requires at least two path points")
                start_x, start_y = path[0]
                page.mouse.move(start_x, start_y)
                page.mouse.down()
                for x, y in path[1:]:
                    page.mouse.move(x, y)
                page.mouse.up()
            case "move":
                reject_modifiers(action)
                page.mouse.move(action.x, action.y)
            case "scroll":
                reject_modifiers(action)
                page.mouse.move(action.x, action.y)
                page.mouse.wheel(
                    action.scroll_x,
                    action.scroll_y,
                )
            case "keypress":
                page.keyboard.press("+".join(normalize_key(key) for key in action.keys))
            case "type":
                page.keyboard.type(action.text)
            case "wait":
                time.sleep(2)
            case "screenshot":
                # The caller captures a screenshot after every action.
                continue
            case _:
                raise ValueError(f"Unsupported action: {action.type}")
```

  

  

    
Docker

    Execute Computer use actions

```javascript
// Reuse normalizeXdotoolKey from the helper above.
// Reuse normalizeXdotoolButton and getXdotoolScrollButtons from the helper above.
// Reuse normalizeDragPath from the helper above.

function rejectModifiers(action) {
  if (action.keys?.length) {
    throw new Error(
      "This handler does not support modifier keys. Use the modifier-aware handler below."
    );
  }
}

async function handleComputerActions(vm, actions) {
  for (const action of actions) {
    switch (action.type) {
      case "click": {
        rejectModifiers(action);
        const button = normalizeXdotoolButton(action.button);
        await dockerExec(
          vm.containerName,
          "xdotool",
          ["mousemove", action.x, action.y, "click", button],
          { env: { DISPLAY: vm.display } }
        );
        break;
      }
      case "double_click": {
        rejectModifiers(action);
        await dockerExec(
          vm.containerName,
          "xdotool",
          ["mousemove", action.x, action.y, "click", "--repeat", 2, 1],
          { env: { DISPLAY: vm.display } }
        );
        break;
      }
      case "drag": {
        rejectModifiers(action);
        const path = normalizeDragPath(action.path);
        if (path.length < 2) {
          throw new Error("drag action requires at least two path points");
        }
        const [[startX, startY], ...rest] = path;
        await dockerExec(
          vm.containerName,
          "xdotool",
          ["mousemove", startX, startY, "mousedown", 1],
          { env: { DISPLAY: vm.display } }
        );
        for (const [x, y] of rest) {
          await dockerExec(vm.containerName, "xdotool", ["mousemove", x, y], {
            env: { DISPLAY: vm.display },
          });
        }
        await dockerExec(vm.containerName, "xdotool", ["mouseup", 1], {
          env: { DISPLAY: vm.display },
        });
        break;
      }
      case "move":
        rejectModifiers(action);
        await dockerExec(
          vm.containerName,
          "xdotool",
          ["mousemove", action.x, action.y],
          { env: { DISPLAY: vm.display } }
        );
        break;
      case "scroll": {
        rejectModifiers(action);
        const buttons = getXdotoolScrollButtons(
          action.scroll_x,
          action.scroll_y
        );
        await dockerExec(
          vm.containerName,
          "xdotool",
          ["mousemove", action.x, action.y],
          { env: { DISPLAY: vm.display } }
        );
        for (const button of buttons) {
          await dockerExec(vm.containerName, "xdotool", ["click", button], {
            env: { DISPLAY: vm.display },
          });
        }
        break;
      }
      case "keypress":
        await dockerExec(
          vm.containerName,
          "xdotool",
          ["key", action.keys.map(normalizeXdotoolKey).join("+")],
          { env: { DISPLAY: vm.display } }
        );
        break;
      case "type":
        await dockerExec(
          vm.containerName,
          "xdotool",
          ["type", "--delay", 0, action.text],
          { env: { DISPLAY: vm.display } }
        );
        break;
      case "wait":
        await new Promise((resolve) => setTimeout(resolve, 2000));
        break;
      case "screenshot":
        break;
      default:
        throw new Error(`Unsupported action: ${action.type}`);
    }
  }
}
```

```python
import time

# Reuse normalize_xdotool_key from the helper above.
# Reuse normalize_xdotool_button and get_xdotool_scroll_buttons from the helper above.
# Reuse normalize_drag_path from the helper above.

def reject_modifiers(action):
    if getattr(action, "keys", None):
        raise ValueError(
            "This handler does not support modifier keys. "
            "Use the modifier-aware handler below."
        )

def handle_computer_actions(vm, actions):
    for action in actions:
        match action.type:
            case "click":
                reject_modifiers(action)
                button = normalize_xdotool_button(getattr(action, "button", "left"))
                docker_exec(
                    f"DISPLAY={vm.display} xdotool mousemove {action.x} {action.y} click {button}",
                    vm.container_name,
                )
            case "double_click":
                reject_modifiers(action)
                docker_exec(
                    f"DISPLAY={vm.display} xdotool mousemove {action.x} {action.y} click --repeat 2 1",
                    vm.container_name,
                )
            case "drag":
                reject_modifiers(action)
                path = normalize_drag_path(action.path)
                if len(path) < 2:
                    raise ValueError("drag action requires at least two path points")
                start_x, start_y = path[0]
                docker_exec(
                    f"DISPLAY={vm.display} xdotool mousemove {start_x} {start_y} mousedown 1",
                    vm.container_name,
                )
                for x, y in path[1:]:
                    docker_exec(
                        f"DISPLAY={vm.display} xdotool mousemove {x} {y}",
                        vm.container_name,
                    )
                docker_exec(
                    f"DISPLAY={vm.display} xdotool mouseup 1",
                    vm.container_name,
                )
            case "move":
                reject_modifiers(action)
                docker_exec(
                    f"DISPLAY={vm.display} xdotool mousemove {action.x} {action.y}",
                    vm.container_name,
                )
            case "scroll":
                reject_modifiers(action)
                buttons = get_xdotool_scroll_buttons(
                    action.scroll_x,
                    action.scroll_y,
                )

                docker_exec(
                    f"DISPLAY={vm.display} xdotool mousemove {action.x} {action.y}",
                    vm.container_name,
                )
                for button in buttons:
                    docker_exec(
                        f"DISPLAY={vm.display} xdotool click {button}",
                        vm.container_name,
                    )
            case "keypress":
                keys = "+".join(normalize_xdotool_key(key) for key in action.keys)
                docker_exec(
                    f"DISPLAY={vm.display} xdotool key '{keys}'",
                    vm.container_name,
                )
            case "type":
                docker_exec(
                    f"DISPLAY={vm.display} xdotool type --delay 0 '{action.text}'",
                    vm.container_name,
                )
            case "wait":
                time.sleep(2)
            case "screenshot":
                # The caller captures a screenshot after every action.
                continue
            case _:
                raise ValueError(f"Unsupported action: {action.type}")
```

For mouse interactions that need held modifiers, use the mouse action's `keys` array. Use `keypress` for standalone keyboard input.

#### Add modifier-key mouse actions

Mouse actions can include an optional `keys` array for modifier-assisted workflows such as `Ctrl`+click to open a link in a new tab or `Shift`+click to extend a selection. When `keys` is present on `click`, `double_click`, `drag`, `move`, or `scroll`, hold those modifiers for the duration of the mouse action, then release them before continuing to the next action.

You may also need to map model-emitted key names such as `CTRL`, `ALT`, `META`, and `ARROWLEFT` to the names your runtime expects.

Modifier-assisted action

```json
{
  "output": [
    {
      "type": "computer_call",
      "call_id": "call_003",
      "actions": [
        {
          "type": "click",
          "button": "left",
          "x": 405,
          "y": 157,
          "keys": ["SHIFT"]
        }
      ],
      "status": "completed"
    }
  ]
}
```

Playwright

    Execute modifier-assisted Computer use actions

```javascript
// Reuse normalizeKey from the helper above.
// Reuse normalizePlaywrightButton from the helper above.
// Reuse normalizeDragPath from the helper above.

async function withModifiers(page, keys, callback) {
  const normalizedKeys = (keys ?? []).map(normalizeKey);
  const pressedKeys = [];

  try {
    for (const key of normalizedKeys) {
      await page.keyboard.down(key);
      pressedKeys.push(key);
    }

    await callback();
  } finally {
    for (const key of [...pressedKeys].reverse()) {
      await page.keyboard.up(key);
    }
  }
}

async function handleComputerActions(page, actions) {
  for (const action of actions) {
    switch (action.type) {
      case "click":
        await withModifiers(page, action.keys, async () => {
          await page.mouse.click(action.x, action.y, {
            button: normalizePlaywrightButton(action.button),
          });
        });
        break;
      case "double_click":
        await withModifiers(page, action.keys, async () => {
          await page.mouse.dblclick(action.x, action.y);
        });
        break;
      case "drag": {
        const path = normalizeDragPath(action.path);
        if (path.length < 2) {
          throw new Error("drag action requires at least two path points");
        }
        await withModifiers(page, action.keys, async () => {
          const [[startX, startY], ...rest] = path;
          await page.mouse.move(startX, startY);
          await page.mouse.down();
          for (const [x, y] of rest) {
            await page.mouse.move(x, y);
          }
          await page.mouse.up();
        });
        break;
      }
      case "move":
        await withModifiers(page, action.keys, async () => {
          await page.mouse.move(action.x, action.y);
        });
        break;
      case "scroll":
        await withModifiers(page, action.keys, async () => {
          await page.mouse.move(action.x, action.y);
          await page.mouse.wheel(action.scroll_x, action.scroll_y);
        });
        break;
      case "keypress":
        await page.keyboard.press(action.keys.map(normalizeKey).join("+"));
        break;
      case "type":
        await page.keyboard.type(action.text);
        break;
      case "wait":
        await page.waitForTimeout(2000);
        break;
      case "screenshot":
        break;
      default:
        throw new Error(`Unsupported action: ${action.type}`);
    }
  }
}
```

```python
import time

# Reuse normalize_key from the helper above.
# Reuse normalize_playwright_button from the helper above.
# Reuse normalize_drag_path from the helper above.

def with_modifiers(page, keys, callback):
    normalized_keys = [normalize_key(key) for key in (keys or [])]
    pressed_keys = []

    try:
        for key in normalized_keys:
            page.keyboard.down(key)
            pressed_keys.append(key)

        callback()
    finally:
        for key in reversed(pressed_keys):
            page.keyboard.up(key)

def handle_computer_actions(page, actions):
    for action in actions:
        match action.type:
            case "click":
                with_modifiers(
                    page,
                    getattr(action, "keys", None),
                    lambda: page.mouse.click(
                        action.x,
                        action.y,
                        button=normalize_playwright_button(
                            getattr(action, "button", "left")
                        ),
                    ),
                )
            case "double_click":
                with_modifiers(
                    page,
                    getattr(action, "keys", None),
                    lambda: page.mouse.dblclick(action.x, action.y),
                )
            case "drag":
                path = normalize_drag_path(action.path)
                if len(path) < 2:
                    raise ValueError("drag action requires at least two path points")

                def do_drag():
                    start_x, start_y = path[0]
                    page.mouse.move(start_x, start_y)
                    page.mouse.down()
                    for x, y in path[1:]:
                        page.mouse.move(x, y)
                    page.mouse.up()

                with_modifiers(
                    page,
                    getattr(action, "keys", None),
                    do_drag,
                )
            case "move":
                with_modifiers(
                    page,
                    getattr(action, "keys", None),
                    lambda: page.mouse.move(action.x, action.y),
                )
            case "scroll":
                with_modifiers(
                    page,
                    getattr(action, "keys", None),
                    lambda: (
                        page.mouse.move(action.x, action.y),
                        page.mouse.wheel(
                            action.scroll_x,
                            action.scroll_y,
                        ),
                    ),
                )
            case "keypress":
                page.keyboard.press("+".join(normalize_key(key) for key in action.keys))
            case "type":
                page.keyboard.type(action.text)
            case "wait":
                time.sleep(2)
            case "screenshot":
                # The caller captures a screenshot after every action.
                continue
            case _:
                raise ValueError(f"Unsupported action: {action.type}")
```

  

  

    
Docker

    Execute modifier-assisted Computer use actions

```javascript
// Reuse normalizeXdotoolKey from the helper above.
// Reuse normalizeXdotoolButton and getXdotoolScrollButtons from the helper above.
// Reuse normalizeDragPath from the helper above.

async function withModifiers(vm, keys, callback) {
  const normalizedKeys = (keys ?? []).map(normalizeXdotoolKey);
  const pressedKeys = [];

  try {
    for (const key of normalizedKeys) {
      await dockerExec(vm.containerName, "xdotool", ["keydown", key], {
        env: { DISPLAY: vm.display },
      });
      pressedKeys.push(key);
    }

    await callback();
  } finally {
    for (const key of [...pressedKeys].reverse()) {
      await dockerExec(vm.containerName, "xdotool", ["keyup", key], {
        env: { DISPLAY: vm.display },
      });
    }
  }
}

async function handleComputerActions(vm, actions) {
  for (const action of actions) {
    switch (action.type) {
      case "click": {
        const button = normalizeXdotoolButton(action.button);
        await withModifiers(vm, action.keys, async () => {
          await dockerExec(
            vm.containerName,
            "xdotool",
            ["mousemove", action.x, action.y, "click", button],
            { env: { DISPLAY: vm.display } }
          );
        });
        break;
      }
      case "double_click": {
        await withModifiers(vm, action.keys, async () => {
          await dockerExec(
            vm.containerName,
            "xdotool",
            ["mousemove", action.x, action.y, "click", "--repeat", 2, 1],
            { env: { DISPLAY: vm.display } }
          );
        });
        break;
      }
      case "drag": {
        const path = normalizeDragPath(action.path);
        if (path.length < 2) {
          throw new Error("drag action requires at least two path points");
        }
        await withModifiers(vm, action.keys, async () => {
          const [[startX, startY], ...rest] = path;
          await dockerExec(
            vm.containerName,
            "xdotool",
            ["mousemove", startX, startY, "mousedown", 1],
            { env: { DISPLAY: vm.display } }
          );
          for (const [x, y] of rest) {
            await dockerExec(vm.containerName, "xdotool", ["mousemove", x, y], {
              env: { DISPLAY: vm.display },
            });
          }
          await dockerExec(vm.containerName, "xdotool", ["mouseup", 1], {
            env: { DISPLAY: vm.display },
          });
        });
        break;
      }
      case "move": {
        await withModifiers(vm, action.keys, async () => {
          await dockerExec(
            vm.containerName,
            "xdotool",
            ["mousemove", action.x, action.y],
            { env: { DISPLAY: vm.display } }
          );
        });
        break;
      }
      case "scroll": {
        const buttons = getXdotoolScrollButtons(
          action.scroll_x,
          action.scroll_y
        );
        await withModifiers(vm, action.keys, async () => {
          await dockerExec(
            vm.containerName,
            "xdotool",
            ["mousemove", action.x, action.y],
            { env: { DISPLAY: vm.display } }
          );
          for (const button of buttons) {
            await dockerExec(vm.containerName, "xdotool", ["click", button], {
              env: { DISPLAY: vm.display },
            });
          }
        });
        break;
      }
      case "keypress":
        await dockerExec(
          vm.containerName,
          "xdotool",
          ["key", action.keys.map(normalizeXdotoolKey).join("+")],
          { env: { DISPLAY: vm.display } }
        );
        break;
      case "type":
        await dockerExec(
          vm.containerName,
          "xdotool",
          ["type", "--delay", 0, action.text],
          { env: { DISPLAY: vm.display } }
        );
        break;
      case "wait":
        await new Promise((resolve) => setTimeout(resolve, 2000));
        break;
      case "screenshot":
        break;
      default:
        throw new Error(`Unsupported action: ${action.type}`);
    }
  }
}
```

```python
import time

# Reuse normalize_xdotool_key from the helper above.
# Reuse normalize_xdotool_button and get_xdotool_scroll_buttons from the helper above.
# Reuse normalize_drag_path from the helper above.

def with_modifiers(vm, keys, callback):
    normalized_keys = [normalize_xdotool_key(key) for key in (keys or [])]
    pressed_keys = []

    try:
        for key in normalized_keys:
            docker_exec(
                f"DISPLAY={vm.display} xdotool keydown '{key}'",
                vm.container_name,
            )
            pressed_keys.append(key)

        callback()
    finally:
        for key in reversed(pressed_keys):
            docker_exec(
                f"DISPLAY={vm.display} xdotool keyup '{key}'",
                vm.container_name,
            )

def handle_computer_actions(vm, actions):
    for action in actions:
        match action.type:
            case "click":
                button = normalize_xdotool_button(getattr(action, "button", "left"))
                with_modifiers(
                    vm,
                    getattr(action, "keys", None),
                    lambda: docker_exec(
                        f"DISPLAY={vm.display} xdotool mousemove {action.x} {action.y} click {button}",
                        vm.container_name,
                    ),
                )
            case "double_click":
                with_modifiers(
                    vm,
                    getattr(action, "keys", None),
                    lambda: docker_exec(
                        f"DISPLAY={vm.display} xdotool mousemove {action.x} {action.y} click --repeat 2 1",
                        vm.container_name,
                    ),
                )
            case "drag":
                path = normalize_drag_path(action.path)
                if len(path) < 2:
                    raise ValueError("drag action requires at least two path points")

                def do_drag():
                    start_x, start_y = path[0]
                    docker_exec(
                        f"DISPLAY={vm.display} xdotool mousemove {start_x} {start_y} mousedown 1",
                        vm.container_name,
                    )
                    for x, y in path[1:]:
                        docker_exec(
                            f"DISPLAY={vm.display} xdotool mousemove {x} {y}",
                            vm.container_name,
                        )
                    docker_exec(
                        f"DISPLAY={vm.display} xdotool mouseup 1",
                        vm.container_name,
                    )

                with_modifiers(vm, getattr(action, "keys", None), do_drag)
            case "move":
                with_modifiers(
                    vm,
                    getattr(action, "keys", None),
                    lambda: docker_exec(
                        f"DISPLAY={vm.display} xdotool mousemove {action.x} {action.y}",
                        vm.container_name,
                    ),
                )
            case "scroll":
                buttons = get_xdotool_scroll_buttons(
                    action.scroll_x,
                    action.scroll_y,
                )

                def do_scroll():
                    docker_exec(
                        f"DISPLAY={vm.display} xdotool mousemove {action.x} {action.y}",
                        vm.container_name,
                    )
                    for button in buttons:
                        docker_exec(
                            f"DISPLAY={vm.display} xdotool click {button}",
                            vm.container_name,
                        )

                with_modifiers(vm, getattr(action, "keys", None), do_scroll)
            case "keypress":
                keys = "+".join(normalize_xdotool_key(key) for key in action.keys)
                docker_exec(
                    f"DISPLAY={vm.display} xdotool key '{keys}'",
                    vm.container_name,
                )
            case "type":
                docker_exec(
                    f"DISPLAY={vm.display} xdotool type --delay 0 '{action.text}'",
                    vm.container_name,
                )
            case "wait":
                time.sleep(2)
            case "screenshot":
                # The caller captures a screenshot after every action.
                continue
            case _:
                raise ValueError(f"Unsupported action: {action.type}")
```

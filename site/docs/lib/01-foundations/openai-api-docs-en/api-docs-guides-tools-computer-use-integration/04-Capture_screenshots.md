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
pageSha256: "80aabd1d4826851ef1150b31c83b33bac84317f38509f530515aaecf22f4b5dc"
contentMode: "local-full"
zh: ""
---

## Capture screenshots

Return a screenshot after the action batch finishes. When the model needs visual context before acting, it can first request a screenshot:

Screenshot request

```json
{
  "output": [
    {
      "type": "computer_call",
      "call_id": "call_001",
      "actions": [
        { "type": "screenshot" }
      ],
      "status": "completed"
    }
  ]
}
```

Capture the screen from the environment used by your action handler:

Playwright

    Capture a screenshot

```javascript
async function captureScreenshot(page) {
  return await page.screenshot({ type: "png" });
}
```

```python
def capture_screenshot(page):
    return page.screenshot(type="png")
```

  

  

    
Docker

    Capture a screenshot

```javascript
async function captureScreenshot(vm) {
  return await dockerExec(
    vm.containerName,
    "import",
    ["-window", "root", "png:-"],
    { decode: false, env: { DISPLAY: vm.display } }
  );
}
```

```python
def capture_screenshot(vm):
    return docker_exec(
        f"export DISPLAY={vm.display} && import -window root png:-",
        vm.container_name,
        decode=False,
    )
```

For Computer use, prefer `detail: "original"` on screenshot inputs to preserve resolution and improve click accuracy. Large screenshots can use more input tokens, and `original` can still resize images that exceed the model's dimension limits. For patch-based image inputs, the API rejects screenshots that still exceed the [30,000-patch limit](https://developers.openai.com/api/docs/guides/images-vision#image-input-requirements) after resizing. It does not resize them to fit that limit. If `detail: "original"` uses too many tokens or exceeds the limit, downscale the image before sending it to the API, and make sure you remap model-generated coordinates from the downscaled coordinate space to the original image's coordinate space. Avoid using `high` or `low` image detail for computer use tasks. When downscaling, we observe strong performance with 1440x900 and 1600x900 desktop resolutions. See the [Images and Vision guide](https://developers.openai.com/api/docs/guides/images-vision#model-sizing-behavior) for the limits that apply to each model.

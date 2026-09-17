---
title: "OpenAI API 参考（字段级）"
sourceId: "01-foundations/openai-api-reference-en"
sourceTitle: "OpenAI API 参考（字段级）"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "01-foundations"
sourceUrl: "https://developers.openai.com/api/reference"
entryUrl: "https://developers.openai.com/api/reference"
sourceRel: "api/reference/resources/conversations.md"
rawUrl: "/raw/01-foundations/openai-api-reference-en/api/reference/resources/conversations.md"
sourceSha256: "6123458c0e5f960336caab8f4ed471cfe0776f9b3a73f4f86126c614cfabefca"
pageSha256: "078dde288be39ca7a777d0b87c6e3af8c100712f3469d48d770ce29ee5be1c07"
contentMode: "local-full"
zh: ""
---

### Computer Screenshot Content

- `ComputerScreenshotContent object \{ detail, file_id, image_url, 2 more \}`

  A screenshot of a computer.

  - `detail: ImageDetail`

    The detail level of the screenshot image to be sent to the model. One of `high`, `low`, `auto`, or `original`. Defaults to `auto`.

    - `"low"`

    - `"high"`

    - `"auto"`

    - `"original"`

  - `file_id: string or null`

    The identifier of an uploaded file that contains the screenshot.

  - `image_url: string or null`

    The URL of the screenshot image.

  - `type: "computer_screenshot"`

    Specifies the event type. For a computer screenshot, this property is always set to `computer_screenshot`.

    - `"computer_screenshot"`

  - `prompt_cache_breakpoint: optional object \{ mode \}`

    Marks the exact end of a reusable prompt prefix. The breakpoint inherits its TTL from the request's `prompt_cache_options.ttl`; the boundary is not rounded to a token block.

    - `mode: "explicit"`

      The breakpoint mode. Always `explicit`.

      - `"explicit"`

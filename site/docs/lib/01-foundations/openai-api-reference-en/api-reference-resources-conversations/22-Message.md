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
pageSha256: "25d595d601eaed2ff3d5e0a4ba5133df888c8cdd0d48ca5929541440dc0ee24e"
contentMode: "local-full"
zh: ""
---

### Message

- `Message object \{ id, content, role, 3 more \}`

  A message to or from the model.

  - `id: string`

    The unique ID of the message.

  - `content: array of ResponseInputText or ResponseOutputText or TextContent or 6 more`

    The content of the message

    - `ResponseInputText object \{ text, type, prompt_cache_breakpoint \}`

      A text input to the model.

      - `text: string`

        The text input to the model.

      - `type: "input_text"`

        The type of the input item. Always `input_text`.

        - `"input_text"`

      - `prompt_cache_breakpoint: optional object \{ mode \}`

        Marks the exact end of a reusable prompt prefix. The breakpoint inherits its TTL from the request's `prompt_cache_options.ttl`; the boundary is not rounded to a token block.

        - `mode: "explicit"`

          The breakpoint mode. Always `explicit`.

          - `"explicit"`

    - `ResponseOutputText object \{ annotations, logprobs, text, type \}`

      A text output from the model.

      - `annotations: array of object \{ file_id, filename, index, type \}  or object \{ end_index, start_index, title, 2 more \}  or object \{ container_id, end_index, file_id, 3 more \}  or object \{ file_id, index, type \}`

        The annotations of the text output.

        - `FileCitation object \{ file_id, filename, index, type \}`

          A citation to a file.

          - `file_id: string`

            The ID of the file.

          - `filename: string`

            The filename of the file cited.

          - `index: number`

            The index of the file in the list of files.

          - `type: "file_citation"`

            The type of the file citation. Always `file_citation`.

            - `"file_citation"`

        - `URLCitation object \{ end_index, start_index, title, 2 more \}`

          A citation for a web resource used to generate a model response.

          - `end_index: number`

            The index of the last character of the URL citation in the message.

          - `start_index: number`

            The index of the first character of the URL citation in the message.

          - `title: string`

            The title of the web resource.

          - `type: "url_citation"`

            The type of the URL citation. Always `url_citation`.

            - `"url_citation"`

          - `url: string`

            The URL of the web resource.

        - `ContainerFileCitation object \{ container_id, end_index, file_id, 3 more \}`

          A citation for a container file used to generate a model response.

          - `container_id: string`

            The ID of the container file.

          - `end_index: number`

            The index of the last character of the container file citation in the message.

          - `file_id: string`

            The ID of the file.

          - `filename: string`

            The filename of the container file cited.

          - `start_index: number`

            The index of the first character of the container file citation in the message.

          - `type: "container_file_citation"`

            The type of the container file citation. Always `container_file_citation`.

            - `"container_file_citation"`

        - `FilePath object \{ file_id, index, type \}`

          A path to a file.

          - `file_id: string`

            The ID of the file.

          - `index: number`

            The index of the file in the list of files.

          - `type: "file_path"`

            The type of the file path. Always `file_path`.

            - `"file_path"`

      - `logprobs: array of object \{ token, bytes, logprob, top_logprobs \}`

        - `token: string`

        - `bytes: array of number`

        - `logprob: number`

        - `top_logprobs: array of object \{ token, bytes, logprob \}`

          - `token: string`

          - `bytes: array of number`

          - `logprob: number`

      - `text: string`

        The text output from the model.

      - `type: "output_text"`

        The type of the output text. Always `output_text`.

        - `"output_text"`

    - `TextContent object \{ text, type \}`

      A text content.

      - `text: string`

      - `type: "text"`

        - `"text"`

    - `SummaryTextContent object \{ text, type \}`

      A summary text from the model.

      - `text: string`

        A summary of the reasoning output from the model so far.

      - `type: "summary_text"`

        The type of the object. Always `summary_text`.

        - `"summary_text"`

    - `ReasoningText object \{ text, type \}`

      Reasoning text from the model.

      - `text: string`

        The reasoning text from the model.

      - `type: "reasoning_text"`

        The type of the reasoning text. Always `reasoning_text`.

        - `"reasoning_text"`

    - `ResponseOutputRefusal object \{ refusal, type \}`

      A refusal from the model.

      - `refusal: string`

        The refusal explanation from the model.

      - `type: "refusal"`

        The type of the refusal. Always `refusal`.

        - `"refusal"`

    - `ResponseInputImage object \{ detail, type, file_id, 2 more \}`

      An image input to the model. Learn about [image inputs](https://developers.openai.com/api/docs/guides/images-vision).

      - `detail: ImageDetail`

        The detail level of the image to be sent to the model. One of `high`, `low`, `auto`, or `original`. Defaults to `auto`.

        - `"low"`

        - `"high"`

        - `"auto"`

        - `"original"`

      - `type: "input_image"`

        The type of the input item. Always `input_image`.

        - `"input_image"`

      - `file_id: optional string or null`

        The ID of the file to be sent to the model.

      - `image_url: optional string or null`

        The URL of the image to be sent to the model. A fully qualified URL or base64 encoded image in a data URL.

      - `prompt_cache_breakpoint: optional object \{ mode \}`

        Marks the exact end of a reusable prompt prefix. The breakpoint inherits its TTL from the request's `prompt_cache_options.ttl`; the boundary is not rounded to a token block.

        - `mode: "explicit"`

          The breakpoint mode. Always `explicit`.

          - `"explicit"`

    - `ComputerScreenshotContent object \{ detail, file_id, image_url, 2 more \}`

      A screenshot of a computer.

      - `detail: ImageDetail`

        The detail level of the screenshot image to be sent to the model. One of `high`, `low`, `auto`, or `original`. Defaults to `auto`.

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

    - `ResponseInputFile object \{ type, detail, file_data, 4 more \}`

      A file input to the model.

      - `type: "input_file"`

        The type of the input item. Always `input_file`.

        - `"input_file"`

      - `detail: optional "auto" or "low" or "high"`

        The detail level of the file to be sent to the model. Use `auto` to let the system select the detail level; for GPT-5.6 and later models, `auto` uses high-quality rendering, which may increase input token usage. Use `low` for lower-cost rendering, or `high` to render the file at higher quality. Defaults to `auto`.

        - `"auto"`

        - `"low"`

        - `"high"`

      - `file_data: optional string`

        The content of the file to be sent to the model.

      - `file_id: optional string or null`

        The ID of the file to be sent to the model.

      - `file_url: optional string`

        The URL of the file to be sent to the model.

      - `filename: optional string`

        The name of the file to be sent to the model.

      - `prompt_cache_breakpoint: optional object \{ mode \}`

        Marks the exact end of a reusable prompt prefix. The breakpoint inherits its TTL from the request's `prompt_cache_options.ttl`; the boundary is not rounded to a token block.

        - `mode: "explicit"`

          The breakpoint mode. Always `explicit`.

          - `"explicit"`

  - `role: "unknown" or "user" or "assistant" or 5 more`

    The role of the message. One of `unknown`, `user`, `assistant`, `system`, `critic`, `discriminator`, `developer`, or `tool`.

    - `"unknown"`

    - `"user"`

    - `"assistant"`

    - `"system"`

    - `"critic"`

    - `"discriminator"`

    - `"developer"`

    - `"tool"`

  - `status: "in_progress" or "completed" or "incomplete"`

    The status of item. One of `in_progress`, `completed`, or `incomplete`. Populated when items are returned via API.

    - `"in_progress"`

    - `"completed"`

    - `"incomplete"`

  - `type: "message"`

    The type of the message. Always set to `message`.

    - `"message"`

  - `phase: optional "commentary" or "final_answer" or null`

    Labels an `assistant` message as intermediate commentary (`commentary`) or the final answer (`final_answer`). For models like `gpt-5.3-codex` and beyond, when sending follow-up requests, preserve and resend phase on all assistant messages — dropping it can degrade performance. Not used for user messages.

    - `"commentary"`

    - `"final_answer"`

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
sourceRel: "api/docs/guides/image-generation.md"
rawUrl: "/raw/01-foundations/openai-api-docs-en/api/docs/guides/image-generation.md"
sourceSha256: "74ec2240ab2e82662388b9f4780f7c10c6b7386892c03b1c8f00f67376efd263"
pageSha256: "615e294b440ea00ef98d7297b3e0aab2ab5ddc0ba565fa88317013462974295d"
contentMode: "local-full"
zh: ""
---

## Limitations

GPT Image models are powerful and versatile image generation models, but they still have some limitations to be aware of:

- **Latency:** Complex prompts may take up to 2 minutes to process.
- **Text Rendering:** Although significantly improved, the model can still struggle with precise text placement and clarity.
- **Consistency:** While capable of producing consistent imagery, the model may occasionally struggle to maintain visual consistency for recurring characters or brand elements across multiple generations.
- **Composition Control:** Despite improved instruction following, the model may have difficulty placing elements precisely in structured or layout-sensitive compositions.

### Content Moderation

All prompts and generated images are filtered in accordance with our [content policy](https://openai.com/policies/usage-policies/).

For image generation using GPT Image models, you can control moderation strictness with the `moderation` parameter. This parameter supports two values:

- `auto` (default): Standard filtering that seeks to limit creating certain categories of potentially age-inappropriate content.
- `low`: Less restrictive filtering.

### Handling blocked requests and other errors

Handle image generation failures the same way you handle other API errors: check the HTTP status or SDK exception type, log the request ID, and refer to the [error codes guide](https://developers.openai.com/api/docs/guides/error-codes) for authentication, quota, rate-limit, and server failures. Retry transient rate-limit and server failures with backoff. Don't automatically retry quota errors or image generation user errors that require changing the request.

Some image generation failures are user-correctable and may return `error.type = "image_generation_user_error"`. Don't automatically retry these errors without modifying the prompt or input images. For programmatic handling, use `error.code` as the stable discriminator.

When `error.code = "moderation_blocked"`, the error may also include an optional `error.moderation_details` object:

```json
{
  "error": {
    "type": "image_generation_user_error",
    "code": "moderation_blocked",
    "moderation_details": {
      "moderation_stage": "input",
      "categories": ["harassment"]
    }
  }
}
```

The `moderation_details` object provides coarse debugging context without exposing internal classifier labels or scores.

`moderation_stage` can be:

- `input`: The block came from the prompt or request inputs.
- `output`: The block came from a generated image or downstream output moderation stage.
- `unknown`: A rare fallback when provenance is hard to determine.

`categories` contains coarse public labels. For example, you might see values like `harassment`, `self-harm`, `sexual`, or `violence`.

For most apps, keep the primary end-user message generic. Use `moderation_details` for developer logs, support workflows, analytics, and light remediation hints.

Handle moderation-blocked image generation errors

```javascript
import OpenAI from "openai";

const openai = new OpenAI();

try {
  // The same error handling pattern applies to image generation requests,
  // image edits, and Responses API tool calls that generate images.
  await openai.images.generate({
    model: "gpt-image-2.5-sunburst",
    prompt: "Create a poster humiliating my coworker with insulting captions",
  });
} catch (error) {
  if (error?.code !== "moderation_blocked") {
    throw error;
  }

  const moderationDetails = error.error?.moderation_details;
  const categories = moderationDetails?.categories ?? [];
  const stage = moderationDetails?.moderation_stage;

  let hint =
    "This request could not be completed because it did not meet safety requirements.";

  if (categories.includes("harassment")) {
    hint =
      "Try removing abusive or targeting language and focus on neutral visual details instead.";
  } else if (stage === "input") {
    hint =
      "Try revising the prompt or input images and submit the request again.";
  } else if (stage === "output") {
    hint =
      "The generated result was blocked by a safety check. Try changing the prompt and generating again.";
  }

  console.error("Image generation blocked", {
    request_id: error?.requestID,
    code: error?.code,
    moderation_details: moderationDetails,
  });

  console.log(hint);
}
```

```python
import openai
from openai import OpenAI

client = OpenAI()

try:
    # The same error handling pattern applies to image generation requests,
    # image edits, and Responses API tool calls that generate images.
    client.images.generate(
        model="gpt-image-2.5-sunburst",
        prompt="Create a poster humiliating my coworker with insulting captions",
    )
except openai.BadRequestError as error:
    if error.code != "moderation_blocked":
        raise

    error_body = error.body if isinstance(error.body, dict) else {}
    moderation_details = error_body.get("moderation_details") or {}
    categories = moderation_details.get("categories") or []
    stage = moderation_details.get("moderation_stage")

    hint = "This request could not be completed because it did not meet safety requirements."

    if "harassment" in categories:
        hint = "Try removing abusive or targeting language and focus on neutral visual details instead."
    elif stage == "input":
        hint = "Try revising the prompt or input images and submit the request again."
    elif stage == "output":
        hint = "The generated result was blocked by a safety check. Try changing the prompt and generating again."

    print(
        "Image generation blocked",
        {
            "request_id": error.request_id,
            "code": error.code,
            "moderation_details": moderation_details,
        },
    )

    print(hint)
```

```go
package main

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"slices"

	"github.com/openai/openai-go/v3"
)

func main() {
	client := openai.NewClient()
	_, err := client.Images.Generate(context.Background(), openai.ImageGenerateParams{
		Model:  openai.ImageModel("gpt-image-2.5-sunburst"),
		Prompt: "Create a poster humiliating my coworker with insulting captions",
	})
	if err == nil {
		return
	}

	var apiError *openai.Error
	if !errors.As(err, &apiError) || apiError.Code != "moderation_blocked" {
		panic(err)
	}

	var body struct {
		ModerationDetails struct {
			Categories      []string `json:"categories"`
			ModerationStage string   `json:"moderation_stage"`
		} `json:"moderation_details"`
	}
	if err := json.Unmarshal([]byte(apiError.RawJSON()), &body); err != nil {
		panic(err)
	}

	hint := "This request could not be completed because it did not meet safety requirements."
	if slices.Contains(body.ModerationDetails.Categories, "harassment") {
		hint = "Try removing abusive or targeting language and focus on neutral visual details instead."
	} else if body.ModerationDetails.ModerationStage == "input" {
		hint = "Try revising the prompt or input images and submit the request again."
	} else if body.ModerationDetails.ModerationStage == "output" {
		hint = "The generated result was blocked by a safety check. Try changing the prompt and generating again."
	}

	fmt.Printf("Image generation blocked (%s): %s\n", apiError.Code, hint)
}
```

```java
import com.openai.client.OpenAIClient;
import com.openai.client.okhttp.OpenAIOkHttpClient;
import com.openai.errors.BadRequestException;
import com.openai.models.images.ImageGenerateParams;
import java.util.List;
import java.util.Map;

try {
  var images =
      client
          .images()
          .generate(
              ImageGenerateParams.builder()
                  .model("gpt-image-2.5-sunburst")
                  .prompt("Create a poster humiliating my coworker with insulting captions")
                  .build());

  System.out.println(images.data().orElseThrow().get(0).b64Json().orElseThrow());
} catch (BadRequestException error) {
  if (!error.code().orElse("").equals("moderation_blocked")) {
    throw error;
  }
  Map<?, ?> body = error.body().convert(Map.class);
  Object detailsValue = body.get("moderation_details");
  Map<?, ?> details = detailsValue instanceof Map<?, ?> values ? values : Map.of();
  Object categories = details.get("categories");
  Object stage = details.get("moderation_stage");

  String hint = "This request did not meet safety requirements.";
  if (categories instanceof List<?> values && values.contains("harassment")) {
    hint = "Remove abusive or targeting language and focus on neutral visual details.";
  } else if ("input".equals(stage)) {
    hint = "Revise the prompt or input images, then submit the request again.";
  } else if ("output".equals(stage)) {
    hint = "Change the prompt and generate again; the generated result was blocked.";
  }
  System.err.println("Image generation blocked (" + error.code().orElseThrow() + "): " + hint);
}
```

```ruby
require "openai"

client = OpenAI::Client.new
begin
  client.images.generate(
    model: "gpt-image-2.5-sunburst",
    prompt: "Create a poster humiliating my coworker with insulting captions"
  )
rescue OpenAI::Errors::BadRequestError => error
  raise unless error.code == "moderation_blocked"

  body = Hash.try_convert(error.body) || {}
  moderation_details = body[:moderation_details] || body["moderation_details"] || {}
  categories = moderation_details[:categories] || moderation_details["categories"] || []
  stage = moderation_details[:moderation_stage] || moderation_details["moderation_stage"]

  hint = "This request did not meet safety requirements."
  if categories.include?("harassment")
    hint = "Remove abusive or targeting language and focus on neutral visual details."
  elsif stage == "input"
    hint = "Revise the prompt or input images, then submit the request again."
  elsif stage == "output"
    hint = "Change the prompt and generate again; the generated result was blocked."
  end

  warn("Image generation blocked (#{error.code}): #{hint}")
end
```

### Supported models

When using image generation in the Responses API, `gpt-5` and newer models should support the image generation tool. [Check the model detail page for your model](https://developers.openai.com/api/docs/models) to confirm if your desired model can use the image generation tool.

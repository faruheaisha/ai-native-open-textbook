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
pageSha256: "3e8c7cc4fb76376cdedd21941d6e9fec72847f6d2d5d2a4a0b6f7f72f62697c5"
contentMode: "local-full"
zh: ""
---

## Generate Images

You can use the [image generation endpoint](https://developers.openai.com/api/reference/resources/images) to create images based on text prompts, or the [image generation tool](https://developers.openai.com/api/docs/guides/tools?api-mode=responses) in the Responses API to generate images as part of a conversation.

To learn more about customizing the output (size, quality, format, compression), refer to the [customize image output](#customize-image-output) section below.

You can set the `n` parameter to generate multiple images at once in a single request (by default, the API returns a single image).

Image API

    Generate an image

```javascript
import OpenAI from "openai";
import fs from "fs";
const openai = new OpenAI();

const prompt = `
A children's book drawing of a veterinarian using a stethoscope to
listen to the heartbeat of a baby otter.
`;

const result = await openai.images.generate({
  model: "gpt-image-2.5-sunburst",
  prompt,
});

// Save the image to a file
const image_base64 = result.data[0].b64_json;
const image_bytes = Buffer.from(image_base64, "base64");
fs.writeFileSync("otter.png", image_bytes);
```

```python
from openai import OpenAI
import base64

client = OpenAI()

prompt = """
A children's book drawing of a veterinarian using a stethoscope to
listen to the heartbeat of a baby otter.
"""

result = client.images.generate(model="gpt-image-2.5-sunburst", prompt=prompt)

image_base64 = result.data[0].b64_json
image_bytes = base64.b64decode(image_base64)

# Save the image to a file
with open("otter.png", "wb") as f:
    f.write(image_bytes)
```

```go
package main

import (
	"context"
	"encoding/base64"
	"os"

	"github.com/openai/openai-go/v3"
)

func main() {
	client := openai.NewClient()
	result, err := client.Images.Generate(context.Background(), openai.ImageGenerateParams{
		Model: openai.ImageModel("gpt-image-2.5-sunburst"),
		Prompt: "A children's book drawing of a veterinarian using a stethoscope to " +
			"listen to the heartbeat of a baby otter.",
	})
	if err != nil {
		panic(err)
	}
	image, err := base64.StdEncoding.DecodeString(result.Data[0].B64JSON)
	if err != nil {
		panic(err)
	}
	if err := os.WriteFile("otter.png", image, 0o600); err != nil {
		panic(err)
	}
}
```

```java
import com.openai.client.OpenAIClient;
import com.openai.client.okhttp.OpenAIOkHttpClient;
import com.openai.models.images.ImageGenerateParams;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Base64;

var images =
    client
        .images()
        .generate(
            ImageGenerateParams.builder()
                .model("gpt-image-2.5-sunburst")
                .prompt("A watercolor robot reading in a library")
                .build());

Files.write(
    Path.of("generated-image.png"),
    Base64.getDecoder().decode(images.data().orElseThrow().get(0).b64Json().orElseThrow()));
```

```csharp
using OpenAI.Images;

string key = Environment.GetEnvironmentVariable("OPENAI_API_KEY")!;
string model = "gpt-image-2.5-sunburst";
ImageClient client = new(model, key);

GeneratedImage image = await client.GenerateImageAsync(
    "A children's book drawing of a veterinarian using a stethoscope to "
        + "listen to the heartbeat of a baby otter."
);

await File.WriteAllBytesAsync("otter.png", image.ImageBytes.ToArray());
```

```ruby
require "base64"
require "openai"

client = OpenAI::Client.new
result = client.images.generate(
  model: "gpt-image-2.5-sunburst",
  prompt: "A watercolor robot reading in a library"
)
generated_image = result.data&.first or raise "No image returned"
File.binwrite(
  "generated-image.png",
  Base64.strict_decode64(generated_image.b64_json)
)
```

```bash
curl -X POST "https://api.openai.com/v1/images/generations" \
    -H "Authorization: Bearer $OPENAI_API_KEY" \
    -H "Content-type: application/json" \
    -d '{
        "model": "gpt-image-2.5-sunburst",
        "prompt": "A children'\''s book drawing of a veterinarian using a stethoscope to listen to the heartbeat of a baby otter."
    }' | jq -r '.data[0].b64_json' | base64 --decode > otter.png
```

```bash
openai images generate \
  --model gpt-image-2.5-sunburst \
  --prompt "A children's book drawing of a veterinarian using a stethoscope to listen to the heartbeat of a baby otter." \
  --raw-output \
  --transform 'data.0.b64_json' | base64 --decode > otter.png
```

  

  

    
Responses API

    Generate an image

```javascript
import OpenAI from "openai";
const openai = new OpenAI();

const response = await openai.responses.create({
  model: "gpt-6-astra",
  input:
    "Generate an image of gray tabby cat hugging an otter with an orange scarf",
  tools: [{ type: "image_generation", model: "gpt-image-2.5-sunburst" }],
});

// Save the image to a file
const imageData = response.output
  .filter((output) => output.type === "image_generation_call")
  .map((output) => output.result);

if (imageData.length > 0) {
  const imageBase64 = imageData[0];
  const fs = await import("fs");
  fs.writeFileSync("otter.png", Buffer.from(imageBase64, "base64"));
}
```

```python
from openai import OpenAI
import base64

client = OpenAI()

response = client.responses.create(
    model="gpt-6-astra",
    input="Generate an image of gray tabby cat hugging an otter with an orange scarf",
    tools=[{"type": "image_generation", "model": "gpt-image-2.5-sunburst"}],
)

# Save the image to a file
image_data = [
    output.result
    for output in response.output
    if output.type == "image_generation_call"
]

if image_data:
    image_base64 = image_data[0]
    with open("otter.png", "wb") as f:
        f.write(base64.b64decode(image_base64))
```

```go
package main

import (
	"context"
	"encoding/base64"
	"os"

	"github.com/openai/openai-go/v3"
	"github.com/openai/openai-go/v3/responses"
)

func main() {
	client := openai.NewClient()
	response, err := client.Responses.New(context.Background(), responses.ResponseNewParams{
		Model: "gpt-6-astra",
		Input: responses.ResponseNewParamsInputUnion{
			OfString: openai.String("Generate an image of gray tabby cat hugging an otter with an orange scarf"),
		},
		Tools: []responses.ToolUnionParam{{OfImageGeneration: &responses.ToolImageGenerationParam{Model: "gpt-image-2.5-sunburst"}}},
	})
	if err != nil {
		panic(err)
	}
	saveFirstGeneratedImage(response, "otter.png")
}

func saveFirstGeneratedImage(response *responses.Response, filename string) {
	for _, output := range response.Output {
		if output.Type != "image_generation_call" {
			continue
		}
		image, err := base64.StdEncoding.DecodeString(output.AsImageGenerationCall().Result)
		if err != nil {
			panic(err)
		}
		if err := os.WriteFile(filename, image, 0o600); err != nil {
			panic(err)
		}
		return
	}
	panic("response did not include an image generation call")
}
```

```java
import com.openai.client.OpenAIClient;
import com.openai.client.okhttp.OpenAIOkHttpClient;
import com.openai.models.responses.ResponseCreateParams;
import com.openai.models.responses.Tool;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Base64;

ResponseCreateParams params =
    ResponseCreateParams.builder()
        .model("gpt-6-astra")
        .input("Generate an image of a gray tabby cat hugging an otter with an orange scarf.")
        .addTool(Tool.ImageGeneration.builder().build())
        .build();

var image =
    client.responses().create(params).output().stream()
        .flatMap(item -> item.imageGenerationCall().stream())
        .findFirst()
        .orElseThrow(() -> new IllegalStateException("No image generation call returned"));
String encoded =
    image.result().orElseThrow(() -> new IllegalStateException("No image returned"));
Files.write(Path.of("otter.png"), Base64.getDecoder().decode(encoded));
```

```csharp
using OpenAI.Responses;
#pragma warning disable OPENAI001

string key = Environment.GetEnvironmentVariable("OPENAI_API_KEY")!;
ResponsesClient client = new(key);

CreateResponseOptions options = new() { Model = "gpt-6-astra" };
options.InputItems.Add(
    ResponseItem.CreateUserMessageItem(
        "Generate an image of a gray tabby cat hugging an otter with an orange scarf."
    )
);
options.Tools.Add(ResponseTool.CreateImageGenerationTool(model: "gpt-image-2.5-sunburst"));

ResponseResult response = await client.CreateResponseAsync(options);
ImageGenerationCallResponseItem image = response
    .OutputItems.OfType<ImageGenerationCallResponseItem>()
    .FirstOrDefault()
    ?? throw new InvalidOperationException("No generated image was returned.");
await File.WriteAllBytesAsync("otter.png", image.ImageResultBytes.ToArray());
```

```ruby
require "base64"
require "openai"

client = OpenAI::Client.new
response = client.responses.create(
  model: "gpt-6-astra",
  input: "Generate an image of a gray tabby cat hugging an otter with an orange scarf.",
  tools: [{type: :image_generation, model: "gpt-image-2.5-sunburst"}]
)

image_call = response.output.find do |item|
  item.is_a?(OpenAI::Models::Responses::ResponseOutputItem::ImageGenerationCall)
end
unless image_call.is_a?(OpenAI::Models::Responses::ResponseOutputItem::ImageGenerationCall)
  raise "No image generation call returned"
end

encoded_image = image_call.result or raise "No image returned"
File.binwrite("otter.png", Base64.strict_decode64(encoded_image))
```

### Multi-turn image generation

With the Responses API, you can build multi-turn conversations involving image generation either by providing image generation calls outputs within context (you can also just use the image ID), or by using the [`previous_response_id` parameter](https://developers.openai.com/api/docs/guides/conversation-state?api-mode=responses#openai-apis-for-conversation-state).
This lets you iterate on images across multiple turns—refining prompts, applying new instructions, and evolving the visual output as the conversation progresses.

With the Responses API image generation tool, supported tool models can choose whether to generate a new image or edit one already in the conversation. The optional `action` parameter controls this behavior: keep `action: "auto"` to let the model decide, set `action: "generate"` to always create a new image, or set `action: "edit"` to force editing when an image is in context.

Force image creation with action

```javascript
import OpenAI from "openai";
const openai = new OpenAI();

const response = await openai.responses.create({
  model: "gpt-6-astra",
  input:
    "Generate an image of gray tabby cat hugging an otter with an orange scarf",
  tools: [
    { type: "image_generation", model: "gpt-image-2.5-sunburst", action: "generate" },
  ],
});

// Save the image to a file
const imageData = response.output
  .filter((output) => output.type === "image_generation_call")
  .map((output) => output.result);

if (imageData.length > 0) {
  const imageBase64 = imageData[0];
  const fs = await import("fs");
  fs.writeFileSync("otter.png", Buffer.from(imageBase64, "base64"));
}
```

```python
from openai import OpenAI
import base64

client = OpenAI()

response = client.responses.create(
    model="gpt-6-astra",
    input="Generate an image of gray tabby cat hugging an otter with an orange scarf",
    tools=[
        {"type": "image_generation", "model": "gpt-image-2.5-sunburst", "action": "generate"}
    ],
)

# Save the image to a file
image_data = [
    output.result
    for output in response.output
    if output.type == "image_generation_call"
]

if image_data:
    image_base64 = image_data[0]
    with open("otter.png", "wb") as f:
        f.write(base64.b64decode(image_base64))
```

```go
package main

import (
	"context"
	"encoding/base64"
	"os"

	"github.com/openai/openai-go/v3"
	"github.com/openai/openai-go/v3/responses"
)

func main() {
	client := openai.NewClient()
	response, err := client.Responses.New(context.Background(), responses.ResponseNewParams{
		Model: "gpt-6-astra",
		Input: responses.ResponseNewParamsInputUnion{
			OfString: openai.String("Generate an image of gray tabby cat hugging an otter with an orange scarf"),
		},
		Tools: []responses.ToolUnionParam{{OfImageGeneration: &responses.ToolImageGenerationParam{Model: "gpt-image-2.5-sunburst", Action: "generate"}}},
	})
	if err != nil {
		panic(err)
	}
	for _, output := range response.Output {
		if output.Type != "image_generation_call" {
			continue
		}
		image, err := base64.StdEncoding.DecodeString(output.AsImageGenerationCall().Result)
		if err != nil {
			panic(err)
		}
		if err := os.WriteFile("otter.png", image, 0o600); err != nil {
			panic(err)
		}
		return
	}
	panic("response did not include an image generation call")
}
```

```java
import com.openai.client.OpenAIClient;
import com.openai.client.okhttp.OpenAIOkHttpClient;
import com.openai.models.responses.ResponseCreateParams;
import com.openai.models.responses.Tool;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Base64;

ResponseCreateParams params =
    ResponseCreateParams.builder()
        .model("gpt-6-astra")
        .input("Generate an image of a gray tabby cat hugging an otter with an orange scarf.")
        .addTool(
            Tool.ImageGeneration.builder().action(Tool.ImageGeneration.Action.GENERATE).build())
        .build();

String imageResult =
    client.responses().create(params).output().stream()
        .flatMap(item -> item.imageGenerationCall().stream())
        .flatMap(call -> call.result().stream())
        .findFirst()
        .orElseThrow(() -> new IllegalStateException("No generated image returned"));
Path output = Path.of(System.getenv().getOrDefault("OPENAI_EXAMPLE_OUTPUT_PATH", "otter.png"));
Files.write(output, Base64.getDecoder().decode(imageResult));
System.out.println(output);
```

```csharp
using OpenAI.Responses;
#pragma warning disable OPENAI001

string key = Environment.GetEnvironmentVariable("OPENAI_API_KEY")!;
ResponsesClient client = new(key);

CreateResponseOptions options = new() { Model = "gpt-6-astra" };
options.InputItems.Add(
    ResponseItem.CreateUserMessageItem(
        "Generate an image of a gray tabby cat hugging an otter with an orange scarf."
    )
);
options.Tools.Add(
    ResponseTool.CreateImageGenerationTool(
        model: "gpt-image-2.5-sunburst",
        action: ImageGenerationToolAction.Generate
    )
);

ResponseResult response = await client.CreateResponseAsync(options);
ImageGenerationCallResponseItem image = response
    .OutputItems.OfType<ImageGenerationCallResponseItem>()
    .FirstOrDefault()
    ?? throw new InvalidOperationException("No generated image was returned.");
await File.WriteAllBytesAsync("otter.png", image.ImageResultBytes.ToArray());
```

```ruby
require "base64"
require "openai"

client = OpenAI::Client.new
response = client.responses.create(
  model: "gpt-6-astra",
  input: "Generate an image of a gray tabby cat hugging an otter with an orange scarf.",
  tools: [{type: :image_generation, model: "gpt-image-2.5-sunburst", action: :generate}]
)

image_call = response.output.find do |item|
  item.is_a?(OpenAI::Models::Responses::ResponseOutputItem::ImageGenerationCall)
end
unless image_call.is_a?(OpenAI::Models::Responses::ResponseOutputItem::ImageGenerationCall)
  raise "No image generation call returned"
end

encoded_image = image_call.result or raise "No image returned"
output_path = ENV.fetch("OPENAI_EXAMPLE_OUTPUT_PATH", "otter.png")
File.binwrite(output_path, Base64.decode64(encoded_image))
puts(output_path)
```

If you force `edit` without providing an image in context, the call will return an error. Leave `action` at `auto` to have the model decide when to generate or edit.

Using previous response ID

    Multi-turn image generation

```javascript
import OpenAI from "openai";
const openai = new OpenAI();

const response = await openai.responses.create({
  model: "gpt-6-astra",
  input:
    "Generate an image of gray tabby cat hugging an otter with an orange scarf",
  tools: [{ type: "image_generation", model: "gpt-image-2.5-sunburst" }],
});

const imageData = response.output
  .filter((output) => output.type === "image_generation_call")
  .map((output) => output.result);

if (imageData.length > 0) {
  const imageBase64 = imageData[0];
  const fs = await import("fs");
  fs.writeFileSync("cat_and_otter.png", Buffer.from(imageBase64, "base64"));
}

// Follow up

const response_fwup = await openai.responses.create({
  model: "gpt-6-astra",
  previous_response_id: response.id,
  input: "Now make it look realistic",
  tools: [{ type: "image_generation", model: "gpt-image-2.5-sunburst" }],
});

const imageData_fwup = response_fwup.output
  .filter((output) => output.type === "image_generation_call")
  .map((output) => output.result);

if (imageData_fwup.length > 0) {
  const imageBase64 = imageData_fwup[0];
  const fs = await import("fs");
  fs.writeFileSync(
    "cat_and_otter_realistic.png",
    Buffer.from(imageBase64, "base64")
  );
}
```

```python
from openai import OpenAI
import base64

client = OpenAI()

response = client.responses.create(
    model="gpt-6-astra",
    input="Generate an image of gray tabby cat hugging an otter with an orange scarf",
    tools=[{"type": "image_generation", "model": "gpt-image-2.5-sunburst"}],
)

image_data = [
    output.result
    for output in response.output
    if output.type == "image_generation_call"
]

if image_data:
    image_base64 = image_data[0]

    with open("cat_and_otter.png", "wb") as f:
        f.write(base64.b64decode(image_base64))

# Follow up

response_fwup = client.responses.create(
    model="gpt-6-astra",
    previous_response_id=response.id,
    input="Now make it look realistic",
    tools=[{"type": "image_generation", "model": "gpt-image-2.5-sunburst"}],
)

image_data_fwup = [
    output.result
    for output in response_fwup.output
    if output.type == "image_generation_call"
]

if image_data_fwup:
    image_base64 = image_data_fwup[0]
    with open("cat_and_otter_realistic.png", "wb") as f:
        f.write(base64.b64decode(image_base64))
```

```go
package main

import (
	"context"
	"encoding/base64"
	"os"

	"github.com/openai/openai-go/v3"
	"github.com/openai/openai-go/v3/responses"
)

func main() {
	client := openai.NewClient()
	first, err := client.Responses.New(context.Background(), responses.ResponseNewParams{
		Model: "gpt-6-astra",
		Input: responses.ResponseNewParamsInputUnion{
			OfString: openai.String("Generate an image of gray tabby cat hugging an otter with an orange scarf"),
		},
		Tools: []responses.ToolUnionParam{{OfImageGeneration: &responses.ToolImageGenerationParam{Model: "gpt-image-2.5-sunburst"}}},
	})
	if err != nil {
		panic(err)
	}
	saveFirstGeneratedImage(first, "cat_and_otter.png")

	followUp, err := client.Responses.New(context.Background(), responses.ResponseNewParams{
		Model:              "gpt-6-astra",
		PreviousResponseID: openai.String(first.ID),
		Input: responses.ResponseNewParamsInputUnion{
			OfString: openai.String("Now make it look realistic"),
		},
		Tools: []responses.ToolUnionParam{{OfImageGeneration: &responses.ToolImageGenerationParam{Model: "gpt-image-2.5-sunburst"}}},
	})
	if err != nil {
		panic(err)
	}
	saveFirstGeneratedImage(followUp, "cat_and_otter_realistic.png")
}

func saveFirstGeneratedImage(response *responses.Response, filename string) {
	for _, output := range response.Output {
		if output.Type != "image_generation_call" {
			continue
		}
		image, err := base64.StdEncoding.DecodeString(output.AsImageGenerationCall().Result)
		if err != nil {
			panic(err)
		}
		if err := os.WriteFile(filename, image, 0o600); err != nil {
			panic(err)
		}
		return
	}
	panic("response did not include an image generation call")
}
```

```java
import com.openai.client.OpenAIClient;
import com.openai.client.okhttp.OpenAIOkHttpClient;
import com.openai.models.responses.ResponseCreateParams;
import com.openai.models.responses.Tool;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Base64;

var first =
    client
        .responses()
        .create(
            ResponseCreateParams.builder()
                .model("gpt-6-astra")
                .input(
                    "Generate an image of a gray tabby cat hugging an otter with an orange scarf.")
                .addTool(Tool.ImageGeneration.builder().build())
                .build());
var firstImage =
    first.output().stream()
        .flatMap(item -> item.imageGenerationCall().stream())
        .findFirst()
        .orElseThrow(() -> new IllegalStateException("No image generation call returned"));
Files.write(
    Path.of("cat_and_otter.png"),
    Base64.getDecoder()
        .decode(
            firstImage
                .result()
                .orElseThrow(() -> new IllegalStateException("No image returned"))));

var second =
    client
        .responses()
        .create(
            ResponseCreateParams.builder()
                .model("gpt-6-astra")
                .input("Now make it look realistic.")
                .previousResponseId(first.id())
                .addTool(Tool.ImageGeneration.builder().build())
                .build());
var secondImage =
    second.output().stream()
        .flatMap(item -> item.imageGenerationCall().stream())
        .findFirst()
        .orElseThrow(
            () -> new IllegalStateException("No follow-up image generation call returned"));
Files.write(
    Path.of("cat_and_otter_realistic.png"),
    Base64.getDecoder()
        .decode(
            secondImage
                .result()
                .orElseThrow(() -> new IllegalStateException("No follow-up image returned"))));
```

```csharp
using OpenAI.Responses;
#pragma warning disable OPENAI001

string key = Environment.GetEnvironmentVariable("OPENAI_API_KEY")!;
ResponsesClient client = new(key);

CreateResponseOptions options = new() { Model = "gpt-6-astra" };
options.Tools.Add(ResponseTool.CreateImageGenerationTool(model: "gpt-image-2.5-sunburst"));
options.InputItems.Add(
    ResponseItem.CreateUserMessageItem(
        "Generate an image of a gray tabby cat hugging an otter with an orange scarf."
    )
);

ResponseResult first = await client.CreateResponseAsync(options);
ImageGenerationCallResponseItem initialImage = first
    .OutputItems.OfType<ImageGenerationCallResponseItem>()
    .First();
await File.WriteAllBytesAsync("cat_and_otter.png", initialImage.ImageResultBytes.ToArray());

CreateResponseOptions followUp = new()
{
    Model = "gpt-6-astra",
    PreviousResponseId = first.Id,
};
followUp.Tools.Add(ResponseTool.CreateImageGenerationTool(model: "gpt-image-2.5-sunburst"));
followUp.InputItems.Add(ResponseItem.CreateUserMessageItem("Now make it look realistic."));

ResponseResult second = await client.CreateResponseAsync(followUp);
ImageGenerationCallResponseItem updatedImage = second
    .OutputItems.OfType<ImageGenerationCallResponseItem>()
    .First();
await File.WriteAllBytesAsync(
    "cat_and_otter_realistic.png",
    updatedImage.ImageResultBytes.ToArray()
);
```

```ruby
require "base64"
require "openai"

client = OpenAI::Client.new
first = client.responses.create(
  model: "gpt-6-astra",
  input: "Generate an image of a gray tabby cat hugging an otter with an orange scarf.",
  tools: [{type: :image_generation, model: "gpt-image-2.5-sunburst"}]
)

first_image = first.output.find do |item|
  item.is_a?(OpenAI::Models::Responses::ResponseOutputItem::ImageGenerationCall)
end
unless first_image.is_a?(OpenAI::Models::Responses::ResponseOutputItem::ImageGenerationCall)
  raise "No image generation call returned"
end

encoded_image = first_image.result or raise "No image returned"
File.binwrite("cat_and_otter.png", Base64.strict_decode64(encoded_image))

follow_up = client.responses.create(
  model: "gpt-6-astra",
  input: "Now make it look realistic.",
  previous_response_id: first.id,
  tools: [{type: :image_generation, model: "gpt-image-2.5-sunburst"}]
)

follow_up_image = follow_up.output.find do |item|
  item.is_a?(OpenAI::Models::Responses::ResponseOutputItem::ImageGenerationCall)
end
unless follow_up_image.is_a?(OpenAI::Models::Responses::ResponseOutputItem::ImageGenerationCall)
  raise "No follow-up image generation call returned"
end

encoded_image = follow_up_image.result or raise "No follow-up image returned"
File.binwrite("cat_and_otter_realistic.png", Base64.strict_decode64(encoded_image))
```

  

  

    
Using image ID

    Multi-turn image generation

```javascript
import OpenAI from "openai";
const openai = new OpenAI();

const response = await openai.responses.create({
  model: "gpt-6-astra",
  input:
    "Generate an image of gray tabby cat hugging an otter with an orange scarf",
  tools: [{ type: "image_generation", model: "gpt-image-2.5-sunburst" }],
});

const imageGenerationCalls = response.output.filter(
  (output) => output.type === "image_generation_call"
);

const imageData = imageGenerationCalls.map((output) => output.result);

if (imageData.length > 0) {
  const imageBase64 = imageData[0];
  const fs = await import("fs");
  fs.writeFileSync("cat_and_otter.png", Buffer.from(imageBase64, "base64"));
}

// Follow up

const response_fwup = await openai.responses.create({
  model: "gpt-6-astra",
  input: [
    {
      role: "user",
      content: [{ type: "input_text", text: "Now make it look realistic" }],
    },
    {
      type: "image_generation_call",
      id: imageGenerationCalls[0].id,
    },
  ],
  tools: [{ type: "image_generation", model: "gpt-image-2.5-sunburst" }],
});

const imageData_fwup = response_fwup.output
  .filter((output) => output.type === "image_generation_call")
  .map((output) => output.result);

if (imageData_fwup.length > 0) {
  const imageBase64 = imageData_fwup[0];
  const fs = await import("fs");
  fs.writeFileSync(
    "cat_and_otter_realistic.png",
    Buffer.from(imageBase64, "base64")
  );
}
```

```python
import openai
import base64

response = openai.responses.create(
    model="gpt-6-astra",
    input="Generate an image of gray tabby cat hugging an otter with an orange scarf",
    tools=[{"type": "image_generation", "model": "gpt-image-2.5-sunburst"}],
)

image_generation_calls = [
    output for output in response.output if output.type == "image_generation_call"
]

image_data = [output.result for output in image_generation_calls]

if image_data:
    image_base64 = image_data[0]

    with open("cat_and_otter.png", "wb") as f:
        f.write(base64.b64decode(image_base64))

# Follow up

response_fwup = openai.responses.create(
    model="gpt-6-astra",
    input=[
        {
            "role": "user",
            "content": [{"type": "input_text", "text": "Now make it look realistic"}],
        },
        {
            "type": "image_generation_call",
            "id": image_generation_calls[0].id,
        },
    ],
    tools=[{"type": "image_generation", "model": "gpt-image-2.5-sunburst"}],
)

image_data_fwup = [
    output.result
    for output in response_fwup.output
    if output.type == "image_generation_call"
]

if image_data_fwup:
    image_base64 = image_data_fwup[0]
    with open("cat_and_otter_realistic.png", "wb") as f:
        f.write(base64.b64decode(image_base64))
```

```go
package main

import (
	"context"
	"encoding/base64"
	"encoding/json"
	"os"

	"github.com/openai/openai-go/v3"
	"github.com/openai/openai-go/v3/responses"
)

func main() {
	client := openai.NewClient()
	first, err := client.Responses.New(context.Background(), responses.ResponseNewParams{
		Model: "gpt-6-astra",
		Input: responses.ResponseNewParamsInputUnion{
			OfString: openai.String("Generate an image of gray tabby cat hugging an otter with an orange scarf"),
		},
		Tools: []responses.ToolUnionParam{{OfImageGeneration: &responses.ToolImageGenerationParam{Model: "gpt-image-2.5-sunburst"}}},
	})
	if err != nil {
		panic(err)
	}
	call := firstImageGenerationCall(first)
	saveImage("cat_and_otter.png", call.Result)
	input := outputAsInput(first.Output)
	input = append(input, responses.ResponseInputItemParamOfMessage(
		responses.ResponseInputMessageContentListParam{responses.ResponseInputContentParamOfInputText("Now make it look realistic")},
		responses.EasyInputMessageRoleUser,
	))

	followUp, err := client.Responses.New(context.Background(), responses.ResponseNewParams{
		Model: "gpt-6-astra",
		Input: responses.ResponseNewParamsInputUnion{OfInputItemList: input},
		Tools: []responses.ToolUnionParam{{OfImageGeneration: &responses.ToolImageGenerationParam{Model: "gpt-image-2.5-sunburst"}}},
	})
	if err != nil {
		panic(err)
	}
	saveImage("cat_and_otter_realistic.png", firstImageGenerationCall(followUp).Result)
}

func firstImageGenerationCall(response *responses.Response) responses.ResponseOutputItemImageGenerationCall {
	for _, output := range response.Output {
		if output.Type == "image_generation_call" {
			return output.AsImageGenerationCall()
		}
	}
	panic("response did not include an image generation call")
}

func outputAsInput(output []responses.ResponseOutputItemUnion) []responses.ResponseInputItemUnionParam {
	input := make([]responses.ResponseInputItemUnionParam, 0, len(output))
	for _, item := range output {
		var converted responses.ResponseInputItemUnion
		if err := json.Unmarshal([]byte(item.RawJSON()), &converted); err != nil {
			panic(err)
		}
		input = append(input, converted.ToParam())
	}
	return input
}

func saveImage(filename, encoded string) {
	image, err := base64.StdEncoding.DecodeString(encoded)
	if err != nil {
		panic(err)
	}
	if err := os.WriteFile(filename, image, 0o600); err != nil {
		panic(err)
	}
}
```

```java
import com.openai.client.OpenAIClient;
import com.openai.client.okhttp.OpenAIOkHttpClient;
import com.openai.core.JsonValue;
import com.openai.models.responses.ResponseCreateParams;
import com.openai.models.responses.ResponseInputItem;
import com.openai.models.responses.Tool;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Base64;
import java.util.List;
import java.util.Map;

var first =
    client
        .responses()
        .create(
            ResponseCreateParams.builder()
                .model("gpt-6-astra")
                .input(
                    "Generate an image of a gray tabby cat hugging an otter with an orange scarf.")
                .addTool(Tool.ImageGeneration.builder().build())
                .build());
var firstImage =
    first.output().stream()
        .flatMap(item -> item.imageGenerationCall().stream())
        .findFirst()
        .orElseThrow(() -> new IllegalStateException("No image generation call returned"));
Files.write(
    Path.of("cat_and_otter.png"),
    Base64.getDecoder()
        .decode(
            firstImage
                .result()
                .orElseThrow(() -> new IllegalStateException("No image returned"))));

var second =
    client
        .responses()
        .create(
            ResponseCreateParams.builder()
                .model("gpt-6-astra")
                .inputOfResponse(
                    List.of(
                        ResponseInputItem.ofMessage(
                            ResponseInputItem.Message.builder()
                                .role(ResponseInputItem.Message.Role.USER)
                                .addInputTextContent("Now make it look realistic.")
                                .build()),
                        JsonValue.from(
                                Map.of("type", "image_generation_call", "id", firstImage.id()))
                            .convert(ResponseInputItem.class)))
                .addTool(Tool.ImageGeneration.builder().build())
                .build());
var secondImage =
    second.output().stream()
        .flatMap(item -> item.imageGenerationCall().stream())
        .findFirst()
        .orElseThrow(
            () -> new IllegalStateException("No follow-up image generation call returned"));
Files.write(
    Path.of("cat_and_otter_realistic.png"),
    Base64.getDecoder()
        .decode(
            secondImage
                .result()
                .orElseThrow(() -> new IllegalStateException("No follow-up image returned"))));
```

```csharp
using OpenAI.Responses;
#pragma warning disable OPENAI001

string key = Environment.GetEnvironmentVariable("OPENAI_API_KEY")!;
ResponsesClient client = new(key);

CreateResponseOptions options = new() { Model = "gpt-6-astra" };
options.Tools.Add(ResponseTool.CreateImageGenerationTool(model: "gpt-image-2.5-sunburst"));
options.InputItems.Add(
    ResponseItem.CreateUserMessageItem(
        "Generate an image of a gray tabby cat hugging an otter with an orange scarf."
    )
);

ResponseResult first = await client.CreateResponseAsync(options);
ImageGenerationCallResponseItem initialImage = first
    .OutputItems.OfType<ImageGenerationCallResponseItem>()
    .First();
await File.WriteAllBytesAsync("cat_and_otter.png", initialImage.ImageResultBytes.ToArray());

CreateResponseOptions followUp = new() { Model = "gpt-6-astra" };
followUp.Tools.Add(ResponseTool.CreateImageGenerationTool(model: "gpt-image-2.5-sunburst"));
followUp.InputItems.Add(ResponseItem.CreateUserMessageItem("Now make it look realistic."));
followUp.InputItems.Add(ResponseItem.CreateReferenceItem(initialImage.Id));

ResponseResult second = await client.CreateResponseAsync(followUp);
ImageGenerationCallResponseItem updatedImage = second
    .OutputItems.OfType<ImageGenerationCallResponseItem>()
    .First();
await File.WriteAllBytesAsync(
    "cat_and_otter_realistic.png",
    updatedImage.ImageResultBytes.ToArray()
);
```

```ruby
require "base64"
require "openai"

client = OpenAI::Client.new
first = client.responses.create(
  model: "gpt-6-astra",
  input: "Generate an image of a gray tabby cat hugging an otter with an orange scarf.",
  tools: [{type: :image_generation, model: "gpt-image-2.5-sunburst"}]
)

first_image = first.output.find do |item|
  item.is_a?(OpenAI::Models::Responses::ResponseOutputItem::ImageGenerationCall)
end
unless first_image.is_a?(OpenAI::Models::Responses::ResponseOutputItem::ImageGenerationCall)
  raise "No image generation call returned"
end

encoded_image = first_image.result or raise "No image returned"
File.binwrite("cat_and_otter.png", Base64.strict_decode64(encoded_image))

follow_up = client.responses.create(
  model: "gpt-6-astra",
  input: [
    {
      role: :user,
      content: [{type: :input_text, text: "Now make it look realistic."}]
    },
    {type: :image_generation_call, id: first_image.id}
  ],
  tools: [{type: :image_generation, model: "gpt-image-2.5-sunburst"}]
)

follow_up_image = follow_up.output.find do |item|
  item.is_a?(OpenAI::Models::Responses::ResponseOutputItem::ImageGenerationCall)
end
unless follow_up_image.is_a?(OpenAI::Models::Responses::ResponseOutputItem::ImageGenerationCall)
  raise "No follow-up image generation call returned"
end

encoded_image = follow_up_image.result or raise "No follow-up image returned"
File.binwrite("cat_and_otter_realistic.png", Base64.strict_decode64(encoded_image))
```

#### Result

  &lt;table style=&#123;&#123; width: "100%" &#125;&#125;>
    <tbody>
      <tr>
        &lt;td style=&#123;&#123; verticalAlign: "top", padding: "0 16px 16px 0" &#125;&#125;>
          "Generate an image of gray tabby cat hugging an otter with an orange
          scarf"
        
        &lt;td
          style=&#123;&#123;
            textAlign: "right",
            verticalAlign: "top",
            paddingBottom: "16px",
          &#125;&#125;
        >
          &lt;img src="https://developers.openai.com/images/image-25-article/cat_and_otter.png"
            alt="A cat and an otter"
            style=&#123;&#123; width: "200px", borderRadius: "8px" &#125;&#125;
          />
        
      </tr>
      <tr>
        &lt;td style=&#123;&#123; verticalAlign: "top", padding: "0 16px 0 0" &#125;&#125;>
          "Now make it look realistic"
        
        &lt;td style=&#123;&#123; textAlign: "right", verticalAlign: "top" &#125;&#125;>
          &lt;img src="https://developers.openai.com/images/image-25-article/cat_and_otter_realistic.png"
            alt="A cat and an otter"
            style=&#123;&#123; width: "200px", borderRadius: "8px" &#125;&#125;
          />
        
      </tr>
    </tbody>
  

### Streaming

The Responses API and Image API support streaming image generation. You can stream partial images as the APIs generate them, providing a more interactive experience.

You can adjust the `partial_images` parameter to receive 0-3 partial images.

- If you set `partial_images` to 0, you will only receive the final image.
- For values larger than zero, you may not receive the full number of partial images you requested if the full image is generated more quickly.

Responses API

    Stream an image

```javascript
import OpenAI from "openai";
import fs from "fs";
const openai = new OpenAI();

function saveBase64Image(filename, imageBase64) {
  const imageBuffer = Buffer.from(imageBase64, "base64");
  fs.writeFileSync(filename, imageBuffer);
}

const stream = await openai.responses.create({
  model: "gpt-6-astra",
  input:
    "Draw a gorgeous image of a river made of white owl feathers, snaking its way through a serene winter landscape",
  stream: true,
  tools: [
    { type: "image_generation", model: "gpt-image-2.5-sunburst", partial_images: 2 },
  ],
});

for await (const event of stream) {
  if (event.type === "response.image_generation_call.partial_image") {
    const idx = event.partial_image_index;
    saveBase64Image(`river-partial-${idx}.png`, event.partial_image_b64);
  } else if (event.type === "response.completed") {
    const imageData = event.response.output
      .filter((output) => output.type === "image_generation_call")
      .map((output) => output.result);

    if (imageData.length > 0) {
      saveBase64Image("river-final.png", imageData[0]);
    }
  }
}
```

```python
from openai import OpenAI
import base64

client = OpenAI()

def save_base64_image(filename, image_base64):
    image_bytes = base64.b64decode(image_base64)
    with open(filename, "wb") as f:
        f.write(image_bytes)

stream = client.responses.create(
    model="gpt-6-astra",
    input="Draw a gorgeous image of a river made of white owl feathers, snaking its way through a serene winter landscape",
    stream=True,
    tools=[
        {"type": "image_generation", "model": "gpt-image-2.5-sunburst", "partial_images": 2}
    ],
)

for event in stream:
    if event.type == "response.image_generation_call.partial_image":
        idx = event.partial_image_index
        save_base64_image(f"river-partial-{idx}.png", event.partial_image_b64)
    elif event.type == "response.completed":
        image_data = [
            output.result
            for output in event.response.output
            if output.type == "image_generation_call"
        ]

        if image_data:
            save_base64_image("river-final.png", image_data[0])
```

```go
package main

import (
	"context"
	"encoding/base64"
	"fmt"
	"os"

	"github.com/openai/openai-go/v3"
	"github.com/openai/openai-go/v3/responses"
)

func main() {
	client := openai.NewClient()
	stream := client.Responses.NewStreaming(context.Background(), responses.ResponseNewParams{
		Model: "gpt-6-astra",
		Input: responses.ResponseNewParamsInputUnion{
			OfString: openai.String("Draw a gorgeous image of a river made of white owl feathers, snaking its way through a serene winter landscape"),
		},
		Tools: []responses.ToolUnionParam{{OfImageGeneration: &responses.ToolImageGenerationParam{Model: "gpt-image-2.5-sunburst", PartialImages: openai.Int(2)}}},
	})
	for stream.Next() {
		event := stream.Current()
		if event.Type == "response.image_generation_call.partial_image" {
			partial := event.AsResponseImageGenerationCallPartialImage()
			saveImage(fmt.Sprintf("river-partial-%d.png", partial.PartialImageIndex), partial.PartialImageB64)
		}
		if event.Type == "response.completed" {
			for _, output := range event.AsResponseCompleted().Response.Output {
				if output.Type == "image_generation_call" {
					saveImage("river-final.png", output.AsImageGenerationCall().Result)
				}
			}
		}
	}
	if err := stream.Err(); err != nil {
		panic(err)
	}
}

func saveImage(filename, encoded string) {
	image, err := base64.StdEncoding.DecodeString(encoded)
	if err != nil {
		panic(err)
	}
	if err := os.WriteFile(filename, image, 0o600); err != nil {
		panic(err)
	}
}
```

```java
import com.openai.client.OpenAIClient;
import com.openai.client.okhttp.OpenAIOkHttpClient;
import com.openai.core.http.StreamResponse;
import com.openai.models.responses.ResponseCreateParams;
import com.openai.models.responses.ResponseStreamEvent;
import com.openai.models.responses.Tool;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Base64;

ResponseCreateParams params =
    ResponseCreateParams.builder()
        .model("gpt-6-astra")
        .input("Generate an image of a river made of white owl feathers.")
        .addTool(Tool.ImageGeneration.builder().partialImages(2).build())
        .build();

try (StreamResponse<ResponseStreamEvent> stream = client.responses().createStreaming(params)) {
  var events = stream.stream().iterator();
  while (events.hasNext()) {
    ResponseStreamEvent event = events.next();
    if (event.imageGenerationCallPartialImage().isPresent()) {
      var partial = event.imageGenerationCallPartialImage().orElseThrow();
      Files.write(
          Path.of("river-partial-" + partial.partialImageIndex() + ".png"),
          Base64.getDecoder().decode(partial.partialImageB64()));
    }
    if (event.completed().isPresent()) {
      var image =
          event.completed().orElseThrow().response().output().stream()
              .flatMap(item -> item.imageGenerationCall().stream())
              .findFirst()
              .orElseThrow(() -> new IllegalStateException("No generated image returned"));
      Files.write(
          Path.of("river-final.png"),
          Base64.getDecoder()
              .decode(
                  image
                      .result()
                      .orElseThrow(
                          () -> new IllegalStateException("No final image returned"))));
    }
  }
}
```

```ruby
require "base64"
require "openai"

client = OpenAI::Client.new
stream = client.responses.stream(
  model: "gpt-6-astra",
  input: "Generate an image of a river made of white owl feathers.",
  tools: [{type: :image_generation, model: "gpt-image-2.5-sunburst", partial_images: 2}]
)

stream.each do |event|
  case event
  when OpenAI::Models::Responses::ResponseImageGenCallPartialImageEvent
    image = Base64.strict_decode64(event.partial_image_b64)
    File.binwrite("river-partial-#{event.partial_image_index}.png", image)
  when OpenAI::Models::Responses::ResponseCompletedEvent
    image_call = event.response.output.find do |item|
      item.is_a?(OpenAI::Models::Responses::ResponseOutputItem::ImageGenerationCall)
    end
    next unless image_call.is_a?(OpenAI::Models::Responses::ResponseOutputItem::ImageGenerationCall)

    File.binwrite(
      "river-final.png",
      Base64.strict_decode64(image_call.result)
    )
  end
end
```

  

  

    
Image API

    Stream an image

```javascript
import fs from "fs";
import OpenAI from "openai";

const openai = new OpenAI();

const prompt =
  "Draw a gorgeous image of a river made of white owl feathers, snaking its way through a serene winter landscape";
const stream = await openai.images.generate({
  prompt: prompt,
  model: "gpt-image-2.5-sunburst",
  stream: true,
  partial_images: 2,
});

for await (const event of stream) {
  if (event.type === "image_generation.partial_image") {
    const idx = event.partial_image_index;
    const imageBase64 = event.b64_json;
    const imageBuffer = Buffer.from(imageBase64, "base64");
    fs.writeFileSync(`river${idx}.png`, imageBuffer);
  }
}
```

```python
from openai import OpenAI
import base64

client = OpenAI()

stream = client.images.generate(
    prompt="Draw a gorgeous image of a river made of white owl feathers, snaking its way through a serene winter landscape",
    model="gpt-image-2.5-sunburst",
    stream=True,
    partial_images=2,
)

for event in stream:
    if event.type == "image_generation.partial_image":
        idx = event.partial_image_index
        image_base64 = event.b64_json
        image_bytes = base64.b64decode(image_base64)
        with open(f"river{idx}.png", "wb") as f:
            f.write(image_bytes)
```

```go
package main

import (
	"context"
	"encoding/base64"
	"fmt"
	"os"

	"github.com/openai/openai-go/v3"
)

func main() {
	client := openai.NewClient()
	stream := client.Images.GenerateStreaming(context.Background(), openai.ImageGenerateParams{
		Model:         openai.ImageModel("gpt-image-2.5-sunburst"),
		Prompt:        "Draw a gorgeous image of a river made of white owl feathers, snaking its way through a serene winter landscape",
		PartialImages: openai.Int(2),
	})
	for stream.Next() {
		event := stream.Current()
		if event.Type != "image_generation.partial_image" {
			continue
		}
		partial := event.AsImageGenerationPartialImage()
		saveImage(fmt.Sprintf("river%d.png", partial.PartialImageIndex), partial.B64JSON)
	}
	if err := stream.Err(); err != nil {
		panic(err)
	}
}

func saveImage(filename, encoded string) {
	image, err := base64.StdEncoding.DecodeString(encoded)
	if err != nil {
		panic(err)
	}
	if err := os.WriteFile(filename, image, 0o600); err != nil {
		panic(err)
	}
}
```

```ruby
require "base64"
require "openai"

client = OpenAI::Client.new
stream = client.images.generate_stream_raw(
  model: "gpt-image-2.5-sunburst",
  prompt: "A river made of white owl feathers in a winter landscape",
  partial_images: 2
)

stream.each do |event|
  next unless event.is_a?(OpenAI::Models::ImageGenPartialImageEvent)

  image = Base64.strict_decode64(event.b64_json)
  File.binwrite("river#{event.partial_image_index}.png", image)
end
```

#### Result

| Partial 1                                                                                                     | Partial 2                                                                                                     | Final image                                                                                               |
| ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| <img className="images-example-image" src="https://developers.openai.com/images/image-25-article/river-partial-0.png" alt="1st partial" /> | <img className="images-example-image" src="https://developers.openai.com/images/image-25-article/river-partial-1.png" alt="2nd partial" /> | <img className="images-example-image" src="https://developers.openai.com/images/image-25-article/river-final.png" alt="Final image" /> |

  Prompt: Draw a gorgeous image of a river made of white owl feathers, snaking
  its way through a serene winter landscape

### Revised prompt

When using the image generation tool in the Responses API, the mainline model (for example, `gpt-5.5`) will automatically revise your prompt for improved performance.

You can access the revised prompt in the `revised_prompt` field of the image generation call:

Revised prompt response

```json
{
  "id": "ig_123",
  "type": "image_generation_call",
  "status": "completed",
  "revised_prompt": "A gray tabby cat hugging an otter. The otter is wearing an orange scarf. Both animals are cute and friendly, depicted in a warm, heartwarming style.",
  "result": "..."
}
```

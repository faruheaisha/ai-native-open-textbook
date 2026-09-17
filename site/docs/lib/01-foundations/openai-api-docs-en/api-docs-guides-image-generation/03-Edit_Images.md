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
pageSha256: "ae800cfe303a3dacdd137d4c556fce990ca96bbf8d73753962e0833592a79258"
contentMode: "local-full"
zh: ""
---

## Edit Images

The [image edits](https://developers.openai.com/api/reference/resources/images) endpoint lets you:

- Edit existing images
- Generate new images using other images as a reference
- Edit parts of an image by uploading an image and mask that identifies the areas to replace

### Create a new image using image references

You can use one or more images as a reference to generate a new image.

In this example, we'll use 4 input images to generate a new image of a gift basket containing the items in the reference images.

Responses API

    

With the Responses API, you can provide input images in 3 different ways:

- By providing a fully qualified URL
- By providing an image as a Base64-encoded data URL
- By providing a file ID (created with the [Files API](https://developers.openai.com/api/reference/resources/files))

#### Create a File

Create a File

```javascript
import fs from "fs";
import OpenAI from "openai";

const openai = new OpenAI();

async function createFile(filePath) {
  const fileContent = fs.createReadStream(filePath);
  const result = await openai.files.create({
    file: fileContent,
    purpose: "vision",
  });
  return result.id;
}
```

```python
from openai import OpenAI

client = OpenAI()

def create_file(file_path):
    with open(file_path, "rb") as file_content:
        result = client.files.create(
            file=file_content,
            purpose="vision",
        )
        return result.id
```

```go
package main

import (
	"context"
	"fmt"
	"os"

	"github.com/openai/openai-go/v3"
)

func main() {
	client := openai.NewClient()
	file, err := os.Open("image.png")
	if err != nil {
		panic(err)
	}
	defer file.Close()

	uploaded, err := client.Files.New(context.Background(), openai.FileNewParams{
		File:    file,
		Purpose: openai.FilePurposeVision,
	})
	if err != nil {
		panic(err)
	}
	fmt.Println(uploaded.ID)
}
```

```java
import com.openai.client.OpenAIClient;
import com.openai.client.okhttp.OpenAIOkHttpClient;
import com.openai.models.files.FileCreateParams;
import com.openai.models.files.FilePurpose;
import java.nio.file.Path;

var file =
    client
        .files()
        .create(
            FileCreateParams.builder()
                .file(Path.of(System.getenv("OPENAI_EXAMPLE_FILE_PATH")))
                .purpose(FilePurpose.VISION)
                .build());

System.out.println(file.id());
```

```ruby
require "openai"
require "pathname"

client = OpenAI::Client.new
file = client.files.create(
  file: Pathname("image.png"),
  purpose: OpenAI::Models::FilePurpose::VISION
)
puts(file.id)
```

#### Create a base64 encoded image

Create a base64 encoded image

```javascript
import fs from "fs";

function encodeImage(filePath) {
  const base64Image = fs.readFileSync(filePath, "base64");
  return base64Image;
}
```

```python
import base64

def encode_image(file_path):
    with open(file_path, "rb") as f:
        base64_image = base64.b64encode(f.read()).decode("utf-8")
    return base64_image
```

```go
package main

import (
	"encoding/base64"
	"fmt"
	"os"
)

func main() {
	image, err := os.ReadFile("image.png")
	if err != nil {
		panic(err)
	}
	fmt.Println(base64.StdEncoding.EncodeToString(image))
}
```

```ruby
require "base64"

image = File.binread("image.png")
puts(Base64.strict_encode64(image))
```

Edit an image

```javascript
import fs from "fs";
import OpenAI from "openai";

const openai = new OpenAI();

function encodeImage(filePath) {
  return fs.readFileSync(filePath, "base64");
}

async function createFile(filePath) {
  const result = await openai.files.create({
    file: fs.createReadStream(filePath),
    purpose: "vision",
  });
  return result.id;
}

const prompt = `Generate a photorealistic image of a gift basket on a white background
labeled 'Relax & Unwind' with a ribbon and handwriting-like font,
containing all the items in the reference pictures.`;

const base64Image1 = encodeImage("fixtures/body-lotion.png");
const base64Image2 = encodeImage("fixtures/soap.png");
const fileId1 = await createFile("fixtures/bath-bomb.png");
const fileId2 = await createFile("fixtures/incense-kit.png");

const response = await openai.responses.create({
  model: "gpt-6-astra",
  input: [
    {
      role: "user",
      content: [
        { type: "input_text", text: prompt },
        {
          type: "input_image",
          image_url: `data:image/png;base64,${base64Image1}`,
          detail: "auto",
        },
        {
          type: "input_image",
          image_url: `data:image/png;base64,${base64Image2}`,
          detail: "auto",
        },
        {
          type: "input_image",
          file_id: fileId1,
          detail: "auto",
        },
        {
          type: "input_image",
          file_id: fileId2,
          detail: "auto",
        },
      ],
    },
  ],
  tools: [{ type: "image_generation", model: "gpt-image-2.5-sunburst" }],
});

const imageData = response.output
  .filter((output) => output.type === "image_generation_call")
  .map((output) => output.result);

if (imageData.length > 0) {
  const imageBase64 = imageData[0];
  fs.writeFileSync("gift-basket.png", Buffer.from(imageBase64, "base64"));
} else {
  console.log(response.output_text);
}
```

```python
from openai import OpenAI
import base64

client = OpenAI()

def encode_image(file_path):
    with open(file_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode("utf-8")

def create_file(file_path):
    with open(file_path, "rb") as file_content:
        result = client.files.create(file=file_content, purpose="vision")
    return result.id

prompt = """Generate a photorealistic image of a gift basket on a white background
labeled 'Relax & Unwind' with a ribbon and handwriting-like font,
containing all the items in the reference pictures."""

base64_image1 = encode_image("body-lotion.png")
base64_image2 = encode_image("soap.png")
file_id1 = create_file("bath-bomb.png")
file_id2 = create_file("incense-kit.png")

response = client.responses.create(
    model="gpt-6-astra",
    input=[
        {
            "role": "user",
            "content": [
                {"type": "input_text", "text": prompt},
                {
                    "type": "input_image",
                    "image_url": f"data:image/png;base64,{base64_image1}",
                },
                {
                    "type": "input_image",
                    "image_url": f"data:image/png;base64,{base64_image2}",
                },
                {
                    "type": "input_image",
                    "file_id": file_id1,
                },
                {
                    "type": "input_image",
                    "file_id": file_id2,
                },
            ],
        }
    ],
    tools=[{"type": "image_generation", "model": "gpt-image-2.5-sunburst"}],
)

image_generation_calls = [
    output for output in response.output if output.type == "image_generation_call"
]

image_data = [output.result for output in image_generation_calls]

if image_data:
    image_base64 = image_data[0]
    with open("gift-basket.png", "wb") as f:
        f.write(base64.b64decode(image_base64))
else:
    print(response.output_text)
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
	bathBombID := uploadImage(client, "bath-bomb.png")
	incenseKitID := uploadImage(client, "incense-kit.png")

	response, err := client.Responses.New(context.Background(), responses.ResponseNewParams{
		Model: "gpt-6-astra",
		Input: responses.ResponseNewParamsInputUnion{OfInputItemList: responses.ResponseInputParam{
			responses.ResponseInputItemParamOfMessage(
				responses.ResponseInputMessageContentListParam{
					responses.ResponseInputContentParamOfInputText("Generate a photorealistic image of a gift basket on a white background labeled 'Relax & Unwind' with a ribbon and handwriting-like font, containing all the items in the reference pictures."),
					{OfInputImage: &responses.ResponseInputImageParam{ImageURL: openai.String(dataURL("body-lotion.png")), Detail: responses.ResponseInputImageDetailAuto}},
					{OfInputImage: &responses.ResponseInputImageParam{ImageURL: openai.String(dataURL("soap.png")), Detail: responses.ResponseInputImageDetailAuto}},
					{OfInputImage: &responses.ResponseInputImageParam{FileID: openai.String(bathBombID), Detail: responses.ResponseInputImageDetailAuto}},
					{OfInputImage: &responses.ResponseInputImageParam{FileID: openai.String(incenseKitID), Detail: responses.ResponseInputImageDetailAuto}},
				},
				responses.EasyInputMessageRoleUser,
			),
		}},
		Tools: []responses.ToolUnionParam{{OfImageGeneration: &responses.ToolImageGenerationParam{Model: "gpt-image-2.5-sunburst"}}},
	})
	if err != nil {
		panic(err)
	}
	saveFirstGeneratedImage(response, "gift-basket.png")
}

func uploadImage(client openai.Client, filename string) string {
	file, err := os.Open(filename)
	if err != nil {
		panic(err)
	}
	defer file.Close()
	uploaded, err := client.Files.New(context.Background(), openai.FileNewParams{File: file, Purpose: openai.FilePurposeVision})
	if err != nil {
		panic(err)
	}
	return uploaded.ID
}

func dataURL(filename string) string {
	image, err := os.ReadFile(filename)
	if err != nil {
		panic(err)
	}
	return "data:image/png;base64," + base64.StdEncoding.EncodeToString(image)
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
import com.openai.models.files.FileCreateParams;
import com.openai.models.files.FilePurpose;
import com.openai.models.responses.ResponseCreateParams;
import com.openai.models.responses.ResponseInputImage;
import com.openai.models.responses.ResponseInputItem;
import com.openai.models.responses.Tool;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Base64;
import java.util.List;

Path lotionImage = Path.of(System.getenv("OPENAI_EXAMPLE_IMAGE_PATH"));
Path soapImage = Path.of(System.getenv("OPENAI_EXAMPLE_IMAGE_PATH_2"));
Path bathBombImage = Path.of(System.getenv("OPENAI_EXAMPLE_IMAGE_PATH_3"));
Path incenseImage = Path.of(System.getenv("OPENAI_EXAMPLE_IMAGE_PATH_4"));
String lotionBase64 = Base64.getEncoder().encodeToString(Files.readAllBytes(lotionImage));
String soapBase64 = Base64.getEncoder().encodeToString(Files.readAllBytes(soapImage));
var firstFile =
    client
        .files()
        .create(
            FileCreateParams.builder().file(bathBombImage).purpose(FilePurpose.VISION).build());
var secondFile =
    client
        .files()
        .create(
            FileCreateParams.builder().file(incenseImage).purpose(FilePurpose.VISION).build());
String prompt =
    """
    Generate a photorealistic image of a gift basket on a white background
    labeled 'Relax & Unwind' with a ribbon and handwriting-like font,
    containing all the items in the reference pictures.
    """;
var input =
    ResponseInputItem.ofMessage(
        ResponseInputItem.Message.builder()
            .role(ResponseInputItem.Message.Role.USER)
            .addInputTextContent(prompt)
            .addContent(
                ResponseInputImage.builder()
                    .detail(ResponseInputImage.Detail.AUTO)
                    .imageUrl("data:image/png;base64," + lotionBase64)
                    .build())
            .addContent(
                ResponseInputImage.builder()
                    .detail(ResponseInputImage.Detail.AUTO)
                    .imageUrl("data:image/png;base64," + soapBase64)
                    .build())
            .addContent(
                ResponseInputImage.builder()
                    .detail(ResponseInputImage.Detail.AUTO)
                    .fileId(firstFile.id())
                    .build())
            .addContent(
                ResponseInputImage.builder()
                    .detail(ResponseInputImage.Detail.AUTO)
                    .fileId(secondFile.id())
                    .build())
            .build());
var response =
    client
        .responses()
        .create(
            ResponseCreateParams.builder()
                .model("gpt-6-astra")
                .inputOfResponse(List.of(input))
                .addTool(Tool.ImageGeneration.builder().build())
                .build());
var image =
    response.output().stream()
        .flatMap(item -> item.imageGenerationCall().stream())
        .findFirst()
        .orElseThrow(() -> new IllegalStateException("No image generation call returned"));
Files.write(
    Path.of("gift-basket.png"),
    Base64.getDecoder()
        .decode(
            image.result().orElseThrow(() -> new IllegalStateException("No image returned"))));
```

```ruby
require "base64"
require "openai"
require "pathname"

client = OpenAI::Client.new
base64_images = ["body-lotion.png", "soap.png"].map do |path|
  Base64.strict_encode64(File.binread(path))
end
file_ids = [
  client.files.create(file: Pathname("bath-bomb.png"), purpose: :vision).id,
  client.files.create(file: Pathname("incense-kit.png"), purpose: :vision).id
]
prompt = <<~PROMPT
  Generate a photorealistic image of a gift basket on a white background
  labeled 'Relax & Unwind' with a ribbon and handwriting-like font,
  containing all the items in the reference pictures.
PROMPT
response = client.responses.create(
  model: "gpt-6-astra",
  input: [{
    role: :user,
    content: [
      {type: :input_text, text: prompt},
      *base64_images.map do |image|
        {type: :input_image, image_url: "data:image/png;base64,#{image}"}
      end,
      *file_ids.map do |file_id|
        {type: :input_image, file_id: file_id}
      end
    ]
  }],
  tools: [{type: :image_generation, model: "gpt-image-2.5-sunburst"}]
)

image_call = response.output.find do |item|
  item.is_a?(OpenAI::Models::Responses::ResponseOutputItem::ImageGenerationCall)
end
unless image_call.is_a?(OpenAI::Models::Responses::ResponseOutputItem::ImageGenerationCall)
  raise "No image generation call returned"
end

File.binwrite("gift-basket.png", Base64.strict_decode64(image_call.result))
```

  

  

    
Image API

    Edit an image

```javascript
import fs from "fs";
import OpenAI, { toFile } from "openai";

const client = new OpenAI();

const prompt = `
Generate a photorealistic image of a gift basket on a white background
labeled 'Relax & Unwind' with a ribbon and handwriting-like font,
containing all the items in the reference pictures.
`;

const imageFiles = [
  "fixtures/bath-bomb.png",
  "fixtures/body-lotion.png",
  "fixtures/incense-kit.png",
  "fixtures/soap.png",
];

const images = await Promise.all(
  imageFiles.map(
    async (file) =>
      await toFile(fs.createReadStream(file), null, {
        type: "image/png",
      })
  )
);

const response = await client.images.edit({
  model: "gpt-image-2.5-sunburst",
  image: images,
  prompt,
});

// Save the image to a file
const image_base64 = response.data[0].b64_json;
const image_bytes = Buffer.from(image_base64, "base64");
fs.writeFileSync("basket.png", image_bytes);
```

```python
import base64
from openai import OpenAI

client = OpenAI()

prompt = """
Generate a photorealistic image of a gift basket on a white background
labeled 'Relax & Unwind' with a ribbon and handwriting-like font,
containing all the items in the reference pictures.
"""

result = client.images.edit(
    model="gpt-image-2.5-sunburst",
    image=[
        open("body-lotion.png", "rb"),
        open("bath-bomb.png", "rb"),
        open("incense-kit.png", "rb"),
        open("soap.png", "rb"),
    ],
    prompt=prompt,
)

image_base64 = result.data[0].b64_json
image_bytes = base64.b64decode(image_base64)

# Save the image to a file
with open("gift-basket.png", "wb") as f:
    f.write(image_bytes)
```

```go
package main

import (
	"context"
	"encoding/base64"
	"io"
	"os"

	"github.com/openai/openai-go/v3"
)

func main() {
	client := openai.NewClient()
	files, closeFiles := openImages(
		"bath-bomb.png",
		"body-lotion.png",
		"incense-kit.png",
		"soap.png",
	)
	defer closeFiles()

	response, err := client.Images.Edit(context.Background(), openai.ImageEditParams{
		Model: openai.ImageModel("gpt-image-2.5-sunburst"),
		Image: openai.ImageEditParamsImageUnion{OfFileArray: files},
		Prompt: "Generate a photorealistic image of a gift basket on a white background " +
			"labeled 'Relax & Unwind' with a ribbon and handwriting-like font, containing all the items in the reference pictures.",
	})
	if err != nil {
		panic(err)
	}
	saveImage("basket.png", response.Data[0].B64JSON)
}

func openImages(names ...string) ([]io.Reader, func()) {
	images := make([]io.Reader, 0, len(names))
	files := make([]*os.File, 0, len(names))
	for _, name := range names {
		file, err := os.Open(name)
		if err != nil {
			closeFiles(files)
			panic(err)
		}
		images = append(images, openai.File(file, name, "image/png"))
		files = append(files, file)
	}
	return images, func() { closeFiles(files) }
}

func closeFiles(files []*os.File) {
	for _, file := range files {
		if err := file.Close(); err != nil {
			panic(err)
		}
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
import com.openai.core.MultipartField;
import com.openai.models.images.ImageEditParams;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Base64;
import java.util.List;

Path lotion = Path.of(System.getenv("OPENAI_EXAMPLE_IMAGE_PATH"));
Path soap = Path.of(System.getenv("OPENAI_EXAMPLE_IMAGE_PATH_2"));
Path bathBomb = Path.of(System.getenv("OPENAI_EXAMPLE_IMAGE_PATH_3"));
Path incense = Path.of(System.getenv("OPENAI_EXAMPLE_IMAGE_PATH_4"));
try (InputStream lotionImage = Files.newInputStream(lotion);
    InputStream bathBombImage = Files.newInputStream(bathBomb);
    InputStream incenseImage = Files.newInputStream(incense);
    InputStream soapImage = Files.newInputStream(soap)) {
  var images =
      client
          .images()
          .edit(
              ImageEditParams.builder()
                  .model("gpt-image-2.5-sunburst")
                  .image(
                      MultipartField.<ImageEditParams.Image>builder()
                          .value(
                              ImageEditParams.Image.ofInputStreams(
                                  List.of(lotionImage, bathBombImage, incenseImage, soapImage)))
                          .contentType("image/png")
                          .filename("gift-basket-reference.png")
                          .build())
                  .prompt(
                      """
                      Generate a photorealistic image of a gift basket on a white background
                      labeled 'Relax & Unwind' with a ribbon and handwriting-like font,
                      containing all the items in the reference pictures.
                      """)
                  .build());

  Files.write(
      Path.of("gift-basket.png"),
      Base64.getDecoder().decode(images.data().orElseThrow().get(0).b64Json().orElseThrow()));
}
```

```ruby
require "base64"
require "openai"
require "pathname"

client = OpenAI::Client.new
images = %w[body-lotion.png bath-bomb.png incense-kit.png soap.png].map do |path|
  Pathname(path)
end
result = client.images.edit(
  image: images,
  model: "gpt-image-2.5-sunburst",
  prompt: <<~PROMPT
    Generate a photorealistic image of a gift basket on a white background
    labeled 'Relax & Unwind' with a ribbon and handwriting-like font,
    containing all the items in the reference pictures.
  PROMPT
)
generated_image = result.data&.first or raise "No image returned"
File.binwrite("gift-basket.png", Base64.strict_decode64(generated_image.b64_json))
```

```bash
curl -s -D >(grep -i x-request-id >&2) \
  -o >(jq -r '.data[0].b64_json' | base64 --decode > gift-basket.png) \
  -X POST "https://api.openai.com/v1/images/edits" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -F "model=gpt-image-2.5-sunburst" \
  -F "image[]=@body-lotion.png" \
  -F "image[]=@bath-bomb.png" \
  -F "image[]=@incense-kit.png" \
  -F "image[]=@soap.png" \
  -F 'prompt=Generate a photorealistic image of a gift basket on a white background labeled "Relax & Unwind" with a ribbon and handwriting-like font, containing all the items in the reference pictures'
```

```bash
openai images edit \
  --model gpt-image-2.5-sunburst \
  --image body-lotion.png \
  --image bath-bomb.png \
  --image incense-kit.png \
  --image soap.png \
  --prompt 'Generate a photorealistic image of a gift basket on a white background labeled "Relax & Unwind" with a ribbon and handwriting-like font, containing all the items in the reference pictures' \
  --raw-output \
  --transform 'data.0.b64_json' | base64 --decode > gift-basket.png
```

### Edit an image using a mask

You can provide a mask to indicate which part of the image should be edited.

When using a mask with GPT Image, additional instructions are sent to the model to help guide the editing process accordingly.

Masking with GPT Image is entirely prompt-based. The model uses the mask as
  guidance, but may not follow its exact shape with complete precision.

If you provide multiple input images, the mask will be applied to the first image.

Responses API

    Edit an image with a mask

```javascript
import fs from "fs";
import OpenAI from "openai";

const openai = new OpenAI();

async function createFile(filePath) {
  const result = await openai.files.create({
    file: fs.createReadStream(filePath),
    purpose: "vision",
  });
  return result.id;
}

const fileId = await createFile("fixtures/sunlit_lounge.png");
const maskId = await createFile("fixtures/mask.png");

const response = await openai.responses.create({
  model: "gpt-6-astra",
  input: [
    {
      role: "user",
      content: [
        {
          type: "input_text",
          text: "generate an image of the same sunlit indoor lounge area with a pool but the pool should contain a flamingo",
        },
        {
          type: "input_image",
          file_id: fileId,
          detail: "auto",
        },
      ],
    },
  ],
  tools: [
    {
      type: "image_generation",
      model: "gpt-image-2.5-sunburst",
      quality: "high",
      input_image_mask: {
        file_id: maskId,
      },
    },
  ],
});

const imageData = response.output
  .filter((output) => output.type === "image_generation_call")
  .map((output) => output.result);

if (imageData.length > 0) {
  const imageBase64 = imageData[0];
  fs.writeFileSync("lounge.png", Buffer.from(imageBase64, "base64"));
}
```

```python
from openai import OpenAI
import base64

client = OpenAI()

def create_file(file_path):
    with open(file_path, "rb") as file_content:
        result = client.files.create(file=file_content, purpose="vision")
    return result.id

fileId = create_file("sunlit_lounge.png")
maskId = create_file("mask.png")

response = client.responses.create(
    model="gpt-6-astra",
    input=[
        {
            "role": "user",
            "content": [
                {
                    "type": "input_text",
                    "text": "generate an image of the same sunlit indoor lounge area with a pool but the pool should contain a flamingo",
                },
                {
                    "type": "input_image",
                    "file_id": fileId,
                },
            ],
        },
    ],
    tools=[
        {
            "type": "image_generation",
            "model": "gpt-image-2.5-sunburst",
            "quality": "high",
            "input_image_mask": {
                "file_id": maskId,
            },
        },
    ],
)

image_data = [
    output.result
    for output in response.output
    if output.type == "image_generation_call"
]

if image_data:
    image_base64 = image_data[0]
    with open("lounge.png", "wb") as f:
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
	imageID := uploadImage(client, "sunlit_lounge.png")
	maskID := uploadImage(client, "mask.png")
	response, err := client.Responses.New(context.Background(), responses.ResponseNewParams{
		Model: "gpt-6-astra",
		Input: responses.ResponseNewParamsInputUnion{OfInputItemList: responses.ResponseInputParam{
			responses.ResponseInputItemParamOfMessage(
				responses.ResponseInputMessageContentListParam{
					responses.ResponseInputContentParamOfInputText("Generate an image of the same sunlit indoor lounge area with a pool, but the pool should contain a flamingo."),
					{OfInputImage: &responses.ResponseInputImageParam{FileID: openai.String(imageID), Detail: responses.ResponseInputImageDetailAuto}},
				},
				responses.EasyInputMessageRoleUser,
			),
		}},
		Tools: []responses.ToolUnionParam{{OfImageGeneration: &responses.ToolImageGenerationParam{
			Model:          "gpt-image-2.5-sunburst",
			Quality:        "high",
			InputImageMask: responses.ToolImageGenerationInputImageMaskParam{FileID: openai.String(maskID)},
		}}},
	})
	if err != nil {
		panic(err)
	}
	saveFirstGeneratedImage(response, "lounge.png")
}

func uploadImage(client openai.Client, filename string) string {
	file, err := os.Open(filename)
	if err != nil {
		panic(err)
	}
	defer file.Close()
	uploaded, err := client.Files.New(context.Background(), openai.FileNewParams{File: file, Purpose: openai.FilePurposeVision})
	if err != nil {
		panic(err)
	}
	return uploaded.ID
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
import com.openai.models.files.FileCreateParams;
import com.openai.models.files.FilePurpose;
import com.openai.models.responses.ResponseCreateParams;
import com.openai.models.responses.ResponseInputImage;
import com.openai.models.responses.ResponseInputItem;
import com.openai.models.responses.Tool;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Base64;
import java.util.List;

var image =
    client
        .files()
        .create(
            FileCreateParams.builder()
                .file(Path.of(System.getenv("OPENAI_EXAMPLE_FILE_PATH")))
                .purpose(FilePurpose.VISION)
                .build());

var mask =
    client
        .files()
        .create(
            FileCreateParams.builder()
                .file(Path.of(System.getenv("OPENAI_EXAMPLE_IMAGE_MASK_PATH")))
                .purpose(FilePurpose.VISION)
                .build());

var response =
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
                                .addInputTextContent("Add a flamingo to the pool.")
                                .addContent(
                                    ResponseInputImage.builder()
                                        .detail(ResponseInputImage.Detail.AUTO)
                                        .fileId(image.id())
                                        .build())
                                .build())))
                .addTool(
                    Tool.ImageGeneration.builder()
                        .inputImageMask(
                            Tool.ImageGeneration.InputImageMask.builder()
                                .fileId(mask.id())
                                .build())
                        .build())
                .build());

String imageResult =
    response.output().stream()
        .flatMap(item -> item.imageGenerationCall().stream())
        .flatMap(call -> call.result().stream())
        .findFirst()
        .orElseThrow(() -> new IllegalStateException("No generated image returned"));
Files.write(Path.of("lounge.png"), Base64.getDecoder().decode(imageResult));
```

```ruby
require "base64"
require "openai"
require "pathname"

client = OpenAI::Client.new
image = client.files.create(file: Pathname("sunlit_lounge.png"), purpose: :vision)
mask = client.files.create(file: Pathname("mask.png"), purpose: :vision)
response = client.responses.create(
  model: "gpt-6-astra",
  input: [{
    role: :user,
    content: [
      {type: :input_text, text: "Add a flamingo to the pool."},
      {type: :input_image, file_id: image.id}
    ]
  }],
  tools: [{
    type: :image_generation, model: "gpt-image-2.5-sunburst",
    input_image_mask: {file_id: mask.id}
  }]
)

image_call = response.output.find do |item|
  item.is_a?(OpenAI::Models::Responses::ResponseOutputItem::ImageGenerationCall)
end
unless image_call.is_a?(OpenAI::Models::Responses::ResponseOutputItem::ImageGenerationCall)
  raise "No image generation call returned"
end

File.binwrite("lounge.png", Base64.strict_decode64(image_call.result))
```

  

  

    
Image API

    Edit an image with a mask

```javascript
import fs from "fs";
import OpenAI, { toFile } from "openai";

const client = new OpenAI();

const rsp = await client.images.edit({
  model: "gpt-image-2.5-sunburst",
  image: await toFile(fs.createReadStream("fixtures/sunlit_lounge.png"), null, {
    type: "image/png",
  }),
  mask: await toFile(fs.createReadStream("fixtures/mask.png"), null, {
    type: "image/png",
  }),
  prompt: "A sunlit indoor lounge area with a pool containing a flamingo",
});

// Save the image to a file
const image_base64 = rsp.data[0].b64_json;
const image_bytes = Buffer.from(image_base64, "base64");
fs.writeFileSync("lounge.png", image_bytes);
```

```python
from openai import OpenAI
import base64

client = OpenAI()

result = client.images.edit(
    model="gpt-image-2.5-sunburst",
    image=open("sunlit_lounge.png", "rb"),
    mask=open("mask.png", "rb"),
    prompt="A sunlit indoor lounge area with a pool containing a flamingo",
)

image_base64 = result.data[0].b64_json
image_bytes = base64.b64decode(image_base64)

# Save the image to a file
with open("composition.png", "wb") as f:
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
	image, err := os.Open("sunlit_lounge.png")
	if err != nil {
		panic(err)
	}
	defer image.Close()
	mask, err := os.Open("mask.png")
	if err != nil {
		panic(err)
	}
	defer mask.Close()

	response, err := client.Images.Edit(context.Background(), openai.ImageEditParams{
		Model:  openai.ImageModel("gpt-image-2.5-sunburst"),
		Image:  openai.ImageEditParamsImageUnion{OfFile: openai.File(image, "sunlit_lounge.png", "image/png")},
		Mask:   openai.File(mask, "mask.png", "image/png"),
		Prompt: "A sunlit indoor lounge area with a pool containing a flamingo",
	})
	if err != nil {
		panic(err)
	}
	result, err := base64.StdEncoding.DecodeString(response.Data[0].B64JSON)
	if err != nil {
		panic(err)
	}
	if err := os.WriteFile("lounge.png", result, 0o600); err != nil {
		panic(err)
	}
}
```

```java
import com.openai.client.OpenAIClient;
import com.openai.client.okhttp.OpenAIOkHttpClient;
import com.openai.core.MultipartField;
import com.openai.models.images.ImageEditParams;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Base64;

Path imagePath = Path.of(System.getenv("OPENAI_EXAMPLE_FILE_PATH"));
Path maskPath = Path.of(System.getenv("OPENAI_EXAMPLE_IMAGE_MASK_PATH"));
try (InputStream image = Files.newInputStream(imagePath);
    InputStream mask = Files.newInputStream(maskPath)) {
  var images =
      client
          .images()
          .edit(
              ImageEditParams.builder()
                  .model("gpt-image-2.5-sunburst")
                  .image(
                      MultipartField.<ImageEditParams.Image>builder()
                          .value(ImageEditParams.Image.ofInputStream(image))
                          .contentType("image/png")
                          .filename(imagePath.getFileName().toString())
                          .build())
                  .prompt("A sunlit indoor lounge area with a pool containing a flamingo")
                  .mask(
                      MultipartField.<InputStream>builder()
                          .value(mask)
                          .contentType("image/png")
                          .filename(maskPath.getFileName().toString())
                          .build())
                  .build());

  Files.write(
      Path.of("lounge.png"),
      Base64.getDecoder().decode(images.data().orElseThrow().get(0).b64Json().orElseThrow()));
}
```

```ruby
require "openai"
require "pathname"
require "base64"

client = OpenAI::Client.new
image = Pathname("sunlit_lounge.png")
mask = Pathname("mask.png")
result = client.images.edit(
  image: image,
  mask: mask,
  model: "gpt-image-2.5-sunburst",
  prompt: "A sunlit indoor lounge area with a pool containing a flamingo"
)
generated_image = result.data&.first or raise "No image returned"
File.binwrite("lounge.png", Base64.strict_decode64(generated_image.b64_json))
```

```bash
curl -s -D >(grep -i x-request-id >&2) \
  -o >(jq -r '.data[0].b64_json' | base64 --decode > lounge.png) \
  -X POST "https://api.openai.com/v1/images/edits" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -F "model=gpt-image-2.5-sunburst" \
  -F "mask=@mask.png" \
  -F "image[]=@sunlit_lounge.png" \
  -F 'prompt=A sunlit indoor lounge area with a pool containing a flamingo'
```

```bash
openai images edit \
  --model gpt-image-2.5-sunburst \
  --image sunlit_lounge.png \
  --mask mask.png \
  --prompt "A sunlit indoor lounge area with a pool containing a flamingo" \
  --raw-output \
  --transform 'data.0.b64_json' | base64 --decode > out.png
```

| Image                                                                                                                                 | Mask                                                                                                                            | Output                                                                                                                                                                  |
| ------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <img className="images-example-image" src="https://cdn.openai.com/API/docs/images/sunlit_lounge.png" alt="A pink room with a pool" /> | <img className="images-example-image" src="https://cdn.openai.com/API/docs/images/mask.png" alt="A mask in part of the pool" /> | <img className="images-example-image" src="https://developers.openai.com/images/image-25-article/sunlit_lounge_result.png" alt="The original pool with an inflatable flamingo replacing the mask" /> |

  Prompt: a sunlit indoor lounge area with a pool containing a flamingo

#### Mask requirements

The image to edit and mask must be of the same format and size (less than 50MB in size).

The mask image must also contain an alpha channel. If you're using an image editing tool to create the mask, make sure to save the mask with an alpha channel.

You can modify a black and white image programmatically to add an alpha channel.

Add an alpha channel to a black and white mask

```python
from PIL import Image
from io import BytesIO

# 1. Load your black & white mask as a grayscale image
mask = Image.open("mask.png").convert("L")

# 2. Convert it to RGBA so it has space for an alpha channel
mask_rgba = mask.convert("RGBA")

# 3. Then use the mask itself to fill that alpha channel
mask_rgba.putalpha(mask)

# 4. Convert the mask into bytes
buf = BytesIO()
mask_rgba.save(buf, format="PNG")
mask_bytes = buf.getvalue()

# 5. Save the resulting file
img_path_mask_alpha = "mask_alpha.png"
with open(img_path_mask_alpha, "wb") as f:
    f.write(mask_bytes)
```

```go
package main

import (
	"image"
	"image/color"
	"image/png"
	"os"
)

func main() {
	file, err := os.Open("mask.png")
	if err != nil {
		panic(err)
	}
	defer file.Close()

	mask, _, err := image.Decode(file)
	if err != nil {
		panic(err)
	}
	bounds := mask.Bounds()
	withAlpha := image.NewNRGBA(bounds)
	for y := bounds.Min.Y; y < bounds.Max.Y; y++ {
		for x := bounds.Min.X; x < bounds.Max.X; x++ {
			gray := color.GrayModel.Convert(mask.At(x, y)).(color.Gray)
			withAlpha.SetNRGBA(x, y, color.NRGBA{R: gray.Y, G: gray.Y, B: gray.Y, A: gray.Y})
		}
	}

	output, err := os.Create("mask_alpha.png")
	if err != nil {
		panic(err)
	}
	if err := png.Encode(output, withAlpha); err != nil {
		panic(err)
	}
	if err := output.Close(); err != nil {
		panic(err)
	}
}
```

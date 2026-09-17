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
sourceRel: "docs/en/build-with-claude/skills-guide.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/build-with-claude/skills-guide.md"
sourceSha256: "920c3ac1bb9cf546c0c32c24f1318aa13e58fb4ebadca36bc8b51ea6bd1fb78f"
pageSha256: "86f68a2f1e61c32e055ff33bb4a13a3c99025791561474b12f4f3ace2bd7a138"
contentMode: "local-full"
zh: ""
---

## Managing custom Skills

  **Custom Skills are accessible to your entire workspace, not scoped to an end user, conversation, or session.** Any API key with access to a workspace can read, invoke, and delete every custom Skill uploaded to that workspace. Every service account, and every user whose organization role allows API access, can use the Default Workspace in addition to any workspace you add them to, so keep Skills that must stay separate in their own [workspace](https://platform.claude.com/docs/en/manage-claude/workspaces#api-keys-and-resource-scoping) and access them only with keys scoped to that workspace.

  If you are building a multi-tenant platform on the Skills API, create a separate [workspace](https://platform.claude.com/docs/en/manage-claude/workspaces) for each tenant. The workspace is the isolation boundary for custom Skills, so a workspace per tenant gives each tenant's Skills hard isolation from every other tenant. Each organization can have up to 100 workspaces by default (see [How workspaces work](https://platform.claude.com/docs/en/manage-claude/workspaces#how-workspaces-work)); if you need more for tenant isolation, contact your account team.

### Creating a Skill

A Skill bundle is a directory containing a `SKILL.md` file at the top level with `name` and `description` YAML frontmatter, plus any supporting scripts or resources. See [Get started with Agent Skills in the API](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/quickstart) to author one, and the **Requirements** list following the examples for the full constraints.

Upload your custom Skill to make it available in your workspace. You can upload a zip archive or individual file objects. The Python SDK also provides a `files_from_dir` helper that accepts a directory path.

Files are identified by the filename you attach (the `;filename=` suffix in the cURL example and the filename arguments in the SDK examples). For the walkthrough's skill, create a zip with `zip -r financial_skill.zip financial_skill/` and substitute it for the `example_skill.zip` placeholder in the zip-upload options.

  ```bash cURL
  curl -X POST "https://api.anthropic.com/v1/skills" \
    -H "x-api-key: $ANTHROPIC_API_KEY" \
    -H "anthropic-version: 2023-06-01" \
    -F "files[]=@financial_skill/SKILL.md;filename=financial_skill/SKILL.md" \
    -F "files[]=@financial_skill/analyze.py;filename=financial_skill/analyze.py"
  ```

    ```bash CLI
    zip -r financial_skill.zip financial_skill/
    ant skills create --file financial_skill.zip
    ```

      ```markdown
      ---
      name: financial-skill
      description: Docs example skill.
      ---
      ```

      ```python
      print("financial analysis helper")
      ```

  ```python Python
  from anthropic.lib import files_from_dir

  client = anthropic.Anthropic()

  # Option 1: Using a zip file
  skill = client.skills.create(
      files=[open("example_skill.zip", "rb")],
  )

  # Option 2: Using file tuples (filename, file_content, mime_type)
  skill = client.skills.create(
      files=[
          (
              "financial_skill/SKILL.md",
              open("financial_skill/SKILL.md", "rb"),
              "text/markdown",
          ),
          (
              "financial_skill/analyze.py",
              open("financial_skill/analyze.py", "rb"),
              "text/x-python",
          ),
      ],
  )

  # Option 3: Using the files_from_dir helper (Python only)
  skill = client.skills.create(
      files=files_from_dir("financial_skill"),
  )

  print(f"Created skill: {skill.id}")
  print(f"Latest version: {skill.latest_version_id}")
  ```

  ```typescript TypeScript
  import { toFile } from "@anthropic-ai/sdk";
  import fs from "node:fs";
  // ...

  const client = new Anthropic();

  // Option 1: Using a zip file
  const skillFromZip = await client.skills.create({
    files: [await toFile(fs.createReadStream("example_skill.zip"), "example_skill.zip")]
  });

  // Option 2: Using individual file objects
  const skill = await client.skills.create({
    files: [
      await toFile(fs.createReadStream("financial_skill/SKILL.md"), "financial_skill/SKILL.md", {
        type: "text/markdown"
      }),
      await toFile(
        fs.createReadStream("financial_skill/analyze.py"),
        "financial_skill/analyze.py",
        { type: "text/x-python" }
      )
    ]
  });

  console.log(`Created skill: ${skill.id}`);
  console.log(`Latest version: ${skill.latest_version_id}`);
  ```

  ```csharp C#
  using Anthropic.Core;
  // ...

  AnthropicClient client = new();

  // Option 1: Using a zip file
  var parameters = new SkillCreateParams
  {
      Files = [File.OpenRead("example_skill.zip")],
  };

  var skill = await client.Skills.Create(parameters);

  // Option 2: Using individual files (path-qualified filenames preserve the Skill's directory layout)
  var parameters2 = new SkillCreateParams
  {
      Files =
      [
          new BinaryContent
          {
              Stream = File.OpenRead("financial_skill/SKILL.md"),
              FileName = "financial_skill/SKILL.md",
          },
          new BinaryContent
          {
              Stream = File.OpenRead("financial_skill/analyze.py"),
              FileName = "financial_skill/analyze.py",
          },
      ],
  };

  var skill2 = await client.Skills.Create(parameters2);

  Console.WriteLine($"Created skill: {skill.ID}");
  Console.WriteLine($"Latest version: {skill.LatestVersionID}");
  Console.WriteLine($"Created skill 2: {skill2.ID}");
  ```

  ```go Go
  client := anthropic.NewClient()

  // Option 1: Using a zip file
  zipFile, err := os.Open("example_skill.zip")
  if err != nil {
  	log.Fatal(err)
  }
  defer zipFile.Close()

  skill, err := client.Skills.New(context.TODO(), anthropic.SkillNewParams{
  	Files: []io.Reader{zipFile},
  })
  if err != nil {
  	log.Fatal(err)
  }

  // Option 2: Using individual files
  skillMd, err := os.Open("financial_skill/SKILL.md")
  if err != nil {
  	log.Fatal(err)
  }
  defer skillMd.Close()

  analyzePy, err := os.Open("financial_skill/analyze.py")
  if err != nil {
  	log.Fatal(err)
  }
  defer analyzePy.Close()

  skill2, err := client.Skills.New(context.TODO(), anthropic.SkillNewParams{
  	Files: []io.Reader{
  		anthropic.File(skillMd, "financial_skill/SKILL.md", "text/markdown"),
  		anthropic.File(analyzePy, "financial_skill/analyze.py", "text/x-python"),
  	},
  })
  if err != nil {
  	log.Fatal(err)
  }

  fmt.Printf("Created skill: %s\n", skill.ID)
  fmt.Printf("Latest version: %s\n", skill.LatestVersionID)
  fmt.Printf("Created skill 2: %s\n", skill2.ID)
  ```

  ```java Java
  import com.anthropic.core.MultipartField;
  import com.anthropic.models.skills.SkillCreateParams;
  import com.anthropic.models.skills.Skill;
  // ...
  void main() throws Exception {
  // ...
      AnthropicClient client = AnthropicOkHttpClient.fromEnv();

      // Option 1: Using a zip file
      SkillCreateParams params = SkillCreateParams.builder()
          .addFile(MultipartField.<InputStream>builder()
              .value(Files.newInputStream(Path.of("example_skill.zip")))
              .filename("example_skill.zip")
              .contentType("application/zip")
              .build())
          .build();

      Skill skill = client.skills().create(params);

      // Option 2: Using individual files (path-qualified filenames preserve the Skill's directory layout)
      SkillCreateParams params2 = SkillCreateParams.builder()
          .addFile(MultipartField.<InputStream>builder()
              .value(Files.newInputStream(Path.of("financial_skill/SKILL.md")))
              .filename("financial_skill/SKILL.md")
              .contentType("text/markdown")
              .build())
          .addFile(MultipartField.<InputStream>builder()
              .value(Files.newInputStream(Path.of("financial_skill/analyze.py")))
              .filename("financial_skill/analyze.py")
              .contentType("text/x-python")
              .build())
          .build();

      Skill skill2 = client.skills().create(params2);

      System.out.println("Created skill: " + skill.id());
      System.out.println("Latest version: " + skill.latestVersionId());
      System.out.println("Created skill 2: " + skill2.id());
  }
  ```

  ```php PHP
  use Anthropic\Core\FileParam;
  // ...

  $client = new Client();

  // Option 1: Using a zip file
  $skill = $client->skills->create(
      files: [
          FileParam::fromResource(fopen('example_skill.zip', 'r')),
      ],
  );

  // Option 2: Using individual files
  $skill = $client->skills->create(
      files: [
          FileParam::fromResource(
              fopen('financial_skill/SKILL.md', 'r'),
              filename: 'financial_skill/SKILL.md',
              contentType: 'text/markdown',
          ),
          FileParam::fromResource(
              fopen('financial_skill/analyze.py', 'r'),
              filename: 'financial_skill/analyze.py',
              contentType: 'text/x-python',
          ),
      ],
  );

  echo "Created skill: {$skill->id}\n";
  echo "Latest version: {$skill->latestVersionID}\n";
  ```

  ```ruby Ruby
  client = Anthropic::Client.new

  # Option 1: Using a zip file
  skill = client.skills.create(
    files: [
      File.open("example_skill.zip", "rb")
    ]
  )

  # Option 2: Using individual files
  skill = client.skills.create(
    files: [
      Anthropic::FilePart.new(
        Pathname("financial_skill/SKILL.md"),
        filename: "financial_skill/SKILL.md",
        content_type: "text/markdown"
      ),
      Anthropic::FilePart.new(
        Pathname("financial_skill/analyze.py"),
        filename: "financial_skill/analyze.py",
        content_type: "text/x-python"
      )
    ]
  )

  puts "Created skill: #{skill.id}"
  puts "Latest version: #{skill.latest_version_id}"
  ```

**Requirements:**

* Must include a `SKILL.md` file at the upload root (or at the top of a single enclosing folder)

* `display_name` is optional: when omitted, it derives from the `SKILL.md` `name`; an explicit value may be up to 255 characters and does not need to be unique within the workspace

* Total upload size must be under 30 MB (uncompressed)

* YAML frontmatter requirements:

  * `name`: Maximum 64 characters, lowercase letters/numbers/hyphens only, no XML tags, no reserved words ("anthropic", "claude")
  * `description`: Maximum 1024 characters, non-empty, no XML tags

For complete request/response schemas, see the [Create Skill API reference](https://platform.claude.com/docs/en/api/skills/create).

### Listing Skills

Retrieve all Skills available to your workspace, including both Anthropic pre-built Skills and your custom Skills. Use the `source` parameter to filter by skill type:

  ```bash cURL
  # List all Skills
  curl "https://api.anthropic.com/v1/skills" \
    -H "x-api-key: $ANTHROPIC_API_KEY" \
    -H "anthropic-version: 2023-06-01"

  # List only custom Skills
  curl "https://api.anthropic.com/v1/skills?source=custom" \
    -H "x-api-key: $ANTHROPIC_API_KEY" \
    -H "anthropic-version: 2023-06-01"
  ```

  ```bash CLI
  # List all Skills
  ant skills list

  # List only custom Skills
  ant skills list --source custom
  ```

  ```python Python
  client = anthropic.Anthropic()

  # List all Skills
  for skill in client.skills.list():
      print(f"{skill.id}: {skill.display_name} (source: {skill.source.type})")

  # List only custom Skills
  custom_skills = client.skills.list(source="custom")
  ```

  ```typescript TypeScript
  const client = new Anthropic();

  // List all Skills
  for await (const skill of client.skills.list()) {
    console.log(`${skill.id}: ${skill.display_name} (source: ${skill.source.type})`);
  }

  // List only custom Skills
  const customSkills = await client.skills.list({
    source: "custom"
  });
  ```

  ```csharp C#
  AnthropicClient client = new();

  // List all Skills
  await foreach (var skill in (await client.Skills.List()).Paginate())
  {
      Console.WriteLine($"{skill.ID}: {skill.DisplayName} (source: {skill.Source.Type})");
  }

  // List only custom Skills
  var customSkills = await client.Skills.List(new SkillListParams { Source = "custom" });
  ```

  ```go Go
  client := anthropic.NewClient()

  // List all Skills
  skills := client.Skills.ListAutoPaging(context.TODO(), anthropic.SkillListParams{})

  for skills.Next() {
  	skill := skills.Current()
  	fmt.Printf("%s: %s (source: %s)\n", skill.ID, skill.DisplayName, skill.Source.Type)
  }
  if skills.Err() != nil {
  	log.Fatal(skills.Err())
  }

  // List only custom Skills
  customSkills := client.Skills.ListAutoPaging(context.TODO(), anthropic.SkillListParams{
  	Source: anthropic.String("custom"),
  })

  for customSkills.Next() {
  	skill := customSkills.Current()
  	fmt.Printf("%s: %s (source: %s)\n", skill.ID, skill.DisplayName, skill.Source.Type)
  }
  if customSkills.Err() != nil {
  	log.Fatal(customSkills.Err())
  }
  ```

  ```java Java
  import com.anthropic.models.skills.SkillListParams;
  import com.anthropic.models.skills.SkillListPage;
  import com.anthropic.models.skills.Skill;
  // ...
  void main() {
      AnthropicClient client = AnthropicOkHttpClient.fromEnv();

      // List Skills (first page)
      SkillListPage skills = client.skills().list();

      for (Skill skill : skills.data()) {
          System.out.println(skill.id() + ": " + skill.displayName() + " (source: " + skill.source().type() + ")");
      }

      // List only custom Skills
      SkillListParams customParams = SkillListParams.builder()
          .source("custom")
          .build();

      SkillListPage customSkills = client.skills().list(customParams);
  }
  ```

  ```php PHP
  $client = new Client();

  // List Skills (first page)
  foreach ($client->skills->list()->getItems() as $skill) {
      echo "{$skill->id}: {$skill->displayName} (source: {$skill->source->type})\n";
  }

  // List only custom Skills
  $customSkills = $client->skills->list(
      source: 'custom',
  );
  ```

  ```ruby Ruby
  client = Anthropic::Client.new

  # List all Skills
  client.skills.list.auto_paging_each do |skill|
    puts "#{skill.id}: #{skill.display_name} (source: #{skill.source.type})"
  end

  # List only custom Skills
  custom_skills = client.skills.list(
    source: "custom"
  )
  ```

See the [List Skills API reference](https://platform.claude.com/docs/en/api/skills/list) for pagination and filtering options.

### Retrieving a Skill

Get details about a specific Skill:

  ```bash cURL
  curl "https://api.anthropic.com/v1/skills/skill_01AbCdEfGhIjKlMnOpQrStUv" \
    -H "x-api-key: $ANTHROPIC_API_KEY" \
    -H "anthropic-version: 2023-06-01"
  ```

  ```bash CLI
  ant skills retrieve --skill-id skill_01AbCdEfGhIjKlMnOpQrStUv
  ```

  ```python Python
  client = anthropic.Anthropic()

  skill = client.skills.retrieve(skill_id="skill_01AbCdEfGhIjKlMnOpQrStUv")

  print(f"Skill: {skill.display_name}")
  print(f"Latest version: {skill.latest_version_id}")
  print(f"Created: {skill.created_at}")
  ```

  ```typescript TypeScript
  const client = new Anthropic();

  const skill = await client.skills.retrieve("skill_01AbCdEfGhIjKlMnOpQrStUv");

  console.log(`Skill: ${skill.display_name}`);
  console.log(`Latest version: ${skill.latest_version_id}`);
  console.log(`Created: ${skill.created_at}`);
  ```

  ```csharp C#
  AnthropicClient client = new();

  var skill = await client.Skills.Retrieve("skill_01AbCdEfGhIjKlMnOpQrStUv");

  Console.WriteLine($"Skill: {skill.DisplayName}");
  Console.WriteLine($"Latest version: {skill.LatestVersionID}");
  Console.WriteLine($"Created: {skill.CreatedAt}");
  ```

  ```go Go
  client := anthropic.NewClient()

  skill, err := client.Skills.Get(
  	context.TODO(),
  	"skill_01AbCdEfGhIjKlMnOpQrStUv",
  )
  if err != nil {
  	log.Fatal(err)
  }

  fmt.Printf("Skill: %s\n", skill.DisplayName)
  fmt.Printf("Latest version: %s\n", skill.LatestVersionID)
  fmt.Printf("Created: %s\n", skill.CreatedAt)
  ```

  ```java Java
  import com.anthropic.models.skills.Skill;
  // ...
  void main() {
      AnthropicClient client = AnthropicOkHttpClient.fromEnv();

      Skill skill = client.skills().retrieve("skill_01AbCdEfGhIjKlMnOpQrStUv");

      System.out.println("Skill: " + skill.displayName());
      System.out.println("Latest version: " + skill.latestVersionId());
      System.out.println("Created: " + skill.createdAt());
  }
  ```

  ```php PHP
  $client = new Client();

  $skill = $client->skills->retrieve('skill_01AbCdEfGhIjKlMnOpQrStUv');

  echo "Skill: {$skill->displayName}\n";
  echo "Latest version: {$skill->latestVersionID}\n";
  echo "Created: {$skill->createdAt->format(DATE_ATOM)}\n";
  ```

  ```ruby Ruby
  client = Anthropic::Client.new

  skill = client.skills.retrieve("skill_01AbCdEfGhIjKlMnOpQrStUv")

  puts "Skill: #{skill.display_name}"
  puts "Latest version: #{skill.latest_version_id}"
  puts "Created: #{skill.created_at}"
  ```

### Deleting a Skill

Deleting a Skill also removes all of its versions.

  ```bash cURL
  curl -X DELETE "https://api.anthropic.com/v1/skills/skill_01AbCdEfGhIjKlMnOpQrStUv" \
    -H "x-api-key: $ANTHROPIC_API_KEY" \
    -H "anthropic-version: 2023-06-01"
  ```

  ```bash CLI
  ant skills delete --skill-id skill_01AbCdEfGhIjKlMnOpQrStUv >/dev/null
  ```

  ```python Python
  client = anthropic.Anthropic()

  client.skills.delete(skill_id="skill_01AbCdEfGhIjKlMnOpQrStUv")
  ```

  ```typescript TypeScript
  const client = new Anthropic();

  await client.skills.delete("skill_01AbCdEfGhIjKlMnOpQrStUv");
  ```

  ```csharp C#
  AnthropicClient client = new();

  await client.Skills.Delete("skill_01AbCdEfGhIjKlMnOpQrStUv");
  ```

  ```go Go
  client := anthropic.NewClient()

  _, err := client.Skills.Delete(
  	context.TODO(),
  	"skill_01AbCdEfGhIjKlMnOpQrStUv",
  )
  if err != nil {
  	log.Fatal(err)
  }
  ```

  ```java Java
  void main() {
      AnthropicClient client = AnthropicOkHttpClient.fromEnv();

      client.skills().delete("skill_01AbCdEfGhIjKlMnOpQrStUv");
  }
  ```

  ```php PHP
  $client = new Client();

  $client->skills->delete('skill_01AbCdEfGhIjKlMnOpQrStUv');
  ```

  ```ruby Ruby
  client = Anthropic::Client.new

  client.skills.delete("skill_01AbCdEfGhIjKlMnOpQrStUv")
  ```

### Versioning

Skills support versioning to manage updates safely:

**Anthropic Skills:**

* Versions use date format: `20251013`
* New versions released as updates are made
* Specify exact versions for stability

**Custom Skills:**

* Auto-generated version IDs: `skver_01AbCdEfGhIjKlMnOpQrStUv`
* Use `"latest"` to always get the most recent version
* Create new versions when updating Skill files

A new version is a complete snapshot, not a delta: upload the Skill's full file set each time. Files you omit are not carried over, and the `name` in the new version's `SKILL.md` must match the Skill's existing name. The following examples re-upload the complete `financial_skill/` bundle from [Creating a Skill](https://platform.claude.com/docs/en/build-with-claude/skills-guide#creating-a-skill).

  ```bash cURL
  # Create a new version
  NEW_VERSION=$(curl -X POST "https://api.anthropic.com/v1/skills/skill_01AbCdEfGhIjKlMnOpQrStUv/versions" \
    -H "x-api-key: $ANTHROPIC_API_KEY" \
    -H "anthropic-version: 2023-06-01" \
    -F "files[]=@financial_skill/SKILL.md;filename=financial_skill/SKILL.md" \
    -F "files[]=@financial_skill/analyze.py;filename=financial_skill/analyze.py")

  VERSION_ID=$(echo "$NEW_VERSION" | jq -r '.id')

  # Use specific version
  curl https://api.anthropic.com/v1/messages \
    -H "x-api-key: $ANTHROPIC_API_KEY" \
    -H "anthropic-version: 2023-06-01" \
    -H "content-type: application/json" \
    -d "{
      \"model\": \"claude-opus-5\",
      \"max_tokens\": 4096,
      \"container\": {
        \"skills\": [{
          \"type\": \"custom\",
          \"skill_id\": \"skill_01AbCdEfGhIjKlMnOpQrStUv\",
          \"version\": \"$VERSION_ID\"
        }]
      },
      \"messages\": [{\"role\": \"user\", \"content\": \"Use updated Skill\"}],
      \"tools\": [{\"type\": \"code_execution_20250825\", \"name\": \"code_execution\"}]
    }"

  # Use latest version
  curl https://api.anthropic.com/v1/messages \
    -H "x-api-key: $ANTHROPIC_API_KEY" \
    -H "anthropic-version: 2023-06-01" \
    -H "content-type: application/json" \
    -d '{
      "model": "claude-opus-5",
      "max_tokens": 4096,
      "container": {
        "skills": [{
          "type": "custom",
          "skill_id": "skill_01AbCdEfGhIjKlMnOpQrStUv",
          "version": "latest"
        }]
      },
      "messages": [{"role": "user", "content": "Use latest Skill version"}],
      "tools": [{"type": "code_execution_20250825", "name": "code_execution"}]
    }'
  ```

  ```bash CLI
  # Create a new version
  VERSION_ID=$(ant skills:versions create \
    --skill-id skill_01AbCdEfGhIjKlMnOpQrStUv \
    --file financial_skill.zip \
    --transform id \
    --raw-output)

  # Use specific version
  ant messages create <<YAML
  model: claude-opus-5
  max_tokens: 4096
  container:
    skills:
      - type: custom
        skill_id: skill_01AbCdEfGhIjKlMnOpQrStUv
        version: "$VERSION_ID"
  messages:
    - role: user
      content: Use updated Skill
  tools:
    - type: code_execution_20250825
      name: code_execution
  YAML

  # Use latest version
  ant messages create <<YAML
  model: claude-opus-5
  max_tokens: 4096
  container:
    skills:
      - type: custom
        skill_id: skill_01AbCdEfGhIjKlMnOpQrStUv
        version: latest
  messages:
    - role: user
      content: Use latest Skill version
  tools:
    - type: code_execution_20250825
      name: code_execution
  YAML
  ```

  ```python Python
  from anthropic.lib import files_from_dir

  client = anthropic.Anthropic()

  # Create a new version

  new_version = client.skills.versions.create(
      skill_id="skill_01AbCdEfGhIjKlMnOpQrStUv",
      files=files_from_dir("financial_skill"),
  )

  # Use specific version
  response = client.messages.create(
      model="claude-opus-5",
      max_tokens=4096,
      container={
          "skills": [
              {
                  "type": "custom",
                  "skill_id": "skill_01AbCdEfGhIjKlMnOpQrStUv",
                  "version": new_version.id,
              }
          ]
      },
      messages=[{"role": "user", "content": "Use updated Skill"}],
      tools=[{"type": "code_execution_20250825", "name": "code_execution"}],
  )

  # Use latest version
  response = client.messages.create(
      model="claude-opus-5",
      max_tokens=4096,
      container={
          "skills": [
              {
                  "type": "custom",
                  "skill_id": "skill_01AbCdEfGhIjKlMnOpQrStUv",
                  "version": "latest",
              }
          ]
      },
      messages=[{"role": "user", "content": "Use latest Skill version"}],
      tools=[{"type": "code_execution_20250825", "name": "code_execution"}],
  )
  ```

  ```typescript TypeScript
  import fs from "node:fs";

  const client = new Anthropic();

  // Create a new version from a zip of the complete financial_skill/ bundle
  const newVersion = await client.skills.versions.create("skill_01AbCdEfGhIjKlMnOpQrStUv", {
    files: [fs.createReadStream("financial_skill.zip")]
  });

  // Use specific version
  const specificVersionResponse = await client.messages.create({
    model: "claude-opus-5",
    max_tokens: 4096,
    container: {
      skills: [
        {
          type: "custom",
          skill_id: "skill_01AbCdEfGhIjKlMnOpQrStUv",
          version: newVersion.id
        }
      ]
    },
    messages: [{ role: "user", content: "Use updated Skill" }],
    tools: [{ type: "code_execution_20250825", name: "code_execution" }]
  });

  // Use latest version
  const latestVersionResponse = await client.messages.create({
    model: "claude-opus-5",
    max_tokens: 4096,
    container: {
      skills: [
        {
          type: "custom",
          skill_id: "skill_01AbCdEfGhIjKlMnOpQrStUv",
          version: "latest"
        }
      ]
    },
    messages: [{ role: "user", content: "Use latest Skill version" }],
    tools: [{ type: "code_execution_20250825", name: "code_execution" }]
  });
  ```

  ```csharp C#
  using Anthropic.Core;
  using Anthropic.Models.Skills.Versions;
  // ...
  AnthropicClient client = new();

  // Create a new version
  var versionParams = new VersionCreateParams
  {
      Files =
      [
          new BinaryContent
          {
              Stream = File.OpenRead("financial_skill/SKILL.md"),
              FileName = "financial_skill/SKILL.md",
          },
          new BinaryContent
          {
              Stream = File.OpenRead("financial_skill/analyze.py"),
              FileName = "financial_skill/analyze.py",
          },
      ],
  };

  var newVersion = await client.Skills.Versions.Create("skill_01AbCdEfGhIjKlMnOpQrStUv", versionParams);

  // Use specific version
  var specificVersionParams = new MessageCreateParams
  {
      Model = "claude-opus-5",
      MaxTokens = 4096,
      Container = new ContainerParams
      {
          Skills =
          [
              new SkillParams
              {
                  Type = SkillParamsType.Custom,
                  SkillID = "skill_01AbCdEfGhIjKlMnOpQrStUv",
                  Version = newVersion.ID,
              },
          ],
      },
      Messages = [new() { Role = Role.User, Content = "Use updated Skill" }],
      Tools = [new CodeExecutionTool20250825()],
  };

  var response = await client.Messages.Create(specificVersionParams);
  Console.WriteLine(response);

  // Use latest version
  var latestVersionParams = new MessageCreateParams
  {
      Model = "claude-opus-5",
      MaxTokens = 4096,
      Container = new ContainerParams
      {
          Skills =
          [
              new SkillParams
              {
                  Type = SkillParamsType.Custom,
                  SkillID = "skill_01AbCdEfGhIjKlMnOpQrStUv",
                  Version = "latest",
              },
          ],
      },
      Messages = [new() { Role = Role.User, Content = "Use latest Skill version" }],
      Tools = [new CodeExecutionTool20250825()],
  };

  var latestResponse = await client.Messages.Create(latestVersionParams);
  Console.WriteLine(latestResponse);
  ```

  ```go Go
  client := anthropic.NewClient()

  // Create a new version
  skillMd, err := os.Open("financial_skill/SKILL.md")
  if err != nil {
  	log.Fatal(err)
  }
  defer skillMd.Close()
  analyzePy, err := os.Open("financial_skill/analyze.py")
  if err != nil {
  	log.Fatal(err)
  }
  defer analyzePy.Close()

  newVersion, err := client.Skills.Versions.New(
  	context.TODO(),
  	"skill_01AbCdEfGhIjKlMnOpQrStUv",
  	anthropic.SkillVersionNewParams{
  		Files: []io.Reader{
  			anthropic.File(skillMd, "financial_skill/SKILL.md", "text/markdown"),
  			anthropic.File(analyzePy, "financial_skill/analyze.py", "text/x-python"),
  		},
  	},
  )
  if err != nil {
  	log.Fatal(err)
  }

  // Use specific version
  response, err := client.Messages.New(context.TODO(), anthropic.MessageNewParams{
  	Model:     "claude-opus-5",
  	MaxTokens: 4096,
  	Container: anthropic.MessageCreateParamsContainerUnion{
  		OfContainers: &anthropic.ContainerParams{
  			Skills: []anthropic.SkillParams{
  				{
  					Type:    anthropic.SkillParamsTypeCustom,
  					SkillID: "skill_01AbCdEfGhIjKlMnOpQrStUv",
  					Version: anthropic.String(newVersion.ID),
  				},
  			},
  		},
  	},
  	Messages: []anthropic.MessageParam{
  		anthropic.NewUserMessage(anthropic.NewTextBlock("Use updated Skill")),
  	},
  	Tools: []anthropic.ToolUnionParam{
  		{OfCodeExecutionTool20250825: &anthropic.CodeExecutionTool20250825Param{}},
  	},
  })
  if err != nil {
  	log.Fatal(err)
  }
  fmt.Println(response)

  // Use latest version
  latestResponse, err := client.Messages.New(context.TODO(), anthropic.MessageNewParams{
  	Model:     "claude-opus-5",
  	MaxTokens: 4096,
  	Container: anthropic.MessageCreateParamsContainerUnion{
  		OfContainers: &anthropic.ContainerParams{
  			Skills: []anthropic.SkillParams{
  				{
  					Type:    anthropic.SkillParamsTypeCustom,
  					SkillID: "skill_01AbCdEfGhIjKlMnOpQrStUv",
  					Version: anthropic.String("latest"),
  				},
  			},
  		},
  	},
  	Messages: []anthropic.MessageParam{
  		anthropic.NewUserMessage(anthropic.NewTextBlock("Use latest Skill version")),
  	},
  	Tools: []anthropic.ToolUnionParam{
  		{OfCodeExecutionTool20250825: &anthropic.CodeExecutionTool20250825Param{}},
  	},
  })
  if err != nil {
  	log.Fatal(err)
  }
  fmt.Println(latestResponse)
  ```

  ```java Java
  import com.anthropic.models.messages.MessageCreateParams;
  import com.anthropic.models.messages.Message;
  import com.anthropic.models.messages.Model;
  import com.anthropic.core.MultipartField;
  import com.anthropic.models.messages.ContainerParams;
  import com.anthropic.models.messages.SkillParams;
  import com.anthropic.models.messages.CodeExecutionTool20250825;
  import com.anthropic.models.skills.versions.VersionCreateParams;
  import com.anthropic.models.skills.versions.SkillVersion;
  import java.io.InputStream;
  import java.nio.file.Files;
  import java.nio.file.Path;

  AnthropicClient client = AnthropicOkHttpClient.fromEnv();

  // Create a new version from a zip of the complete financial_skill/ bundle
  VersionCreateParams versionParams = VersionCreateParams.builder()
      .addFile(MultipartField.<InputStream>builder()
          .value(Files.newInputStream(Path.of("financial_skill.zip")))
          .filename("financial_skill.zip")
          .contentType("application/zip")
          .build())
      .build();

  SkillVersion newVersion = client.skills().versions()
      .create("skill_01AbCdEfGhIjKlMnOpQrStUv", versionParams);

  // Use specific version
  MessageCreateParams specificVersionParams = MessageCreateParams.builder()
      .model(Model.CLAUDE_OPUS_5)
      .maxTokens(4096L)
      .container(ContainerParams.builder()
          .addSkill(SkillParams.builder()
              .type(SkillParams.Type.CUSTOM)
              .skillId("skill_01AbCdEfGhIjKlMnOpQrStUv")
              .version(newVersion.id())
              .build())
          .build())
      .addUserMessage("Use updated Skill")
      .addTool(CodeExecutionTool20250825.builder().build())
      .build();

  Message response = client.messages().create(specificVersionParams);
  System.out.println(response);

  // Use latest version
  MessageCreateParams latestVersionParams = MessageCreateParams.builder()
      .model(Model.CLAUDE_OPUS_5)
      .maxTokens(4096L)
      .container(ContainerParams.builder()
          .addSkill(SkillParams.builder()
              .type(SkillParams.Type.CUSTOM)
              .skillId("skill_01AbCdEfGhIjKlMnOpQrStUv")
              .version("latest")
              .build())
          .build())
      .addUserMessage("Use latest Skill version")
      .addTool(CodeExecutionTool20250825.builder().build())
      .build();

  Message latestResponse = client.messages().create(latestVersionParams);
  System.out.println(latestResponse);
  ```

  ```php PHP
  use Anthropic\Core\FileParam;
  // ...

  $client = new Client();

  // Create a new version
  $newVersion = $client->skills->versions->create(
      skillID: 'skill_01AbCdEfGhIjKlMnOpQrStUv',
      files: [
          FileParam::fromResource(
              fopen('financial_skill/SKILL.md', 'r'),
              filename: 'financial_skill/SKILL.md',
              contentType: 'text/markdown',
          ),
          FileParam::fromResource(
              fopen('financial_skill/analyze.py', 'r'),
              filename: 'financial_skill/analyze.py',
              contentType: 'text/x-python',
          ),
      ],
  );

  // Use specific version
  $response = $client->messages->create(
      maxTokens: 4096,
      messages: [['role' => 'user', 'content' => 'Use updated Skill']],
      model: 'claude-opus-5',
      container: [
          'skills' => [[
              'type' => 'custom',
              'skillID' => 'skill_01AbCdEfGhIjKlMnOpQrStUv',
              'version' => $newVersion->id
          ]]
      ],
      tools: [['type' => 'code_execution_20250825', 'name' => 'code_execution']]
  );
  echo $response;

  // Use latest version
  $latestResponse = $client->messages->create(
      maxTokens: 4096,
      messages: [['role' => 'user', 'content' => 'Use latest Skill version']],
      model: 'claude-opus-5',
      container: [
          'skills' => [[
              'type' => 'custom',
              'skillID' => 'skill_01AbCdEfGhIjKlMnOpQrStUv',
              'version' => 'latest'
          ]]
      ],
      tools: [['type' => 'code_execution_20250825', 'name' => 'code_execution']]
  );
  echo $latestResponse;
  ```

  ```ruby Ruby
  client = Anthropic::Client.new

  # Create a new version
  new_version = client.skills.versions.create(
    "skill_01AbCdEfGhIjKlMnOpQrStUv",
    files: [
      Anthropic::FilePart.new(
        Pathname("financial_skill/SKILL.md"),
        filename: "financial_skill/SKILL.md",
        content_type: "text/markdown"
      ),
      Anthropic::FilePart.new(
        Pathname("financial_skill/analyze.py"),
        filename: "financial_skill/analyze.py",
        content_type: "text/x-python"
      )
    ]
  )

  # Use specific version
  response = client.messages.create(
    model: "claude-opus-5",
    max_tokens: 4096,
    container: {
      skills: [{
        type: "custom",
        skill_id: "skill_01AbCdEfGhIjKlMnOpQrStUv",
        version: new_version.id
      }]
    },
    messages: [{ role: "user", content: "Use updated Skill" }],
    tools: [{ type: "code_execution_20250825", name: "code_execution" }]
  )
  puts response

  # Use latest version
  latest_response = client.messages.create(
    model: "claude-opus-5",
    max_tokens: 4096,
    container: {
      skills: [{
        type: "custom",
        skill_id: "skill_01AbCdEfGhIjKlMnOpQrStUv",
        version: "latest"
      }]
    },
    messages: [{ role: "user", content: "Use latest Skill version" }],
    tools: [{ type: "code_execution_20250825", name: "code_execution" }]
  )
  puts latest_response
  ```

See the [Create Skill Version API reference](https://platform.claude.com/docs/en/api/skills/versions/create) for complete details.

***

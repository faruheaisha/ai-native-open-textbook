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
sourceRel: "docs/en/managed-agents/skills.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/managed-agents/skills.md"
sourceSha256: "05606beda4d42e0b46d47342ae915d48f326a344117b775f4afbe51d3c022020"
pageSha256: "05606beda4d42e0b46d47342ae915d48f326a344117b775f4afbe51d3c022020"
contentMode: "local-full"
zh: ""
---

# Anthropic 平台文档（英文全量）

Skills are reusable, filesystem-based resources that give your agent domain-specific expertise: workflows, context, and best practices that turn a general-purpose agent into a specialist. Each skill you add incurs a modest cost on the session's context window, adding instructions and metadata that help the model use the skill. Learn more in the [Agent Skills](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview) overview.

Skills reach your agent in two ways: attach them through the agent's `skills` array, or [load them from a GitHub repository](https://platform.claude.com/docs/en/managed-agents/skills#load-skills-from-a-github-repository) mounted on the session. Attached skills come in two types. All skills work the same way: your agent invokes them automatically when they are relevant to the task.

* **Pre-built Anthropic skills:** Common document tasks such as PowerPoint, Excel, Word, and PDF handling (`pptx`, `xlsx`, `docx`, `pdf`).
* **Custom skills:** Skills you author and upload to your workspace.

To learn how to author custom skills, see [Agent Skills](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview) and [Skill authoring best practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices). To upload a custom skill to your workspace, see [Create a custom skill](https://platform.claude.com/docs/en/managed-agents/skills#create-a-custom-skill).

  Managed Agents API requests require the `managed-agents-2026-04-01` beta header, except memory store endpoints, which use `agent-memory-2026-07-22` instead. The SDK sets the correct beta header automatically. See [Beta headers](https://platform.claude.com/docs/en/api/beta-headers#endpoint-specific-headers).

## Create a custom skill

A custom skill is a directory containing a `SKILL.md` file plus any supporting files, uploaded to your workspace as a zip archive or as individual files. Creating the skill returns the `skill_*` ID you reference when attaching it to an agent. Anthropic pre-built skills are already available in every workspace and don't require this step. To use only pre-built skills, skip to [Attach skills to an agent](https://platform.claude.com/docs/en/managed-agents/skills#attach-skills-to-an-agent).

These examples omit the optional `display_name` field, so the skill's display name is derived from the `name` field in `SKILL.md`. An explicit `display_name` can be up to 255 characters and doesn't need to be unique within your workspace.

  ```bash cURL
  curl -X POST "https://api.anthropic.com/v1/skills" \
    -H "x-api-key: $ANTHROPIC_API_KEY" \
    -H "anthropic-version: 2023-06-01" \
    -F "files[]=@example_skill.zip"
  ```

  ```bash CLI
  ant skills create --file example_skill.zip
  ```

  ```python Python
  import anthropic
  from anthropic.lib import files_from_dir

  client = anthropic.Anthropic()

  skill = client.skills.create(
      files=files_from_dir("example_skill"),
  )

  print(f"Created skill: {skill.id}")
  print(f"Latest version: {skill.latest_version_id}")
  ```

  ```typescript TypeScript
  import Anthropic from "@anthropic-ai/sdk";
  import { toFile } from "@anthropic-ai/sdk";
  import fs from "node:fs";

  const client = new Anthropic();

  const skill = await client.skills.create({
    files: [await toFile(fs.createReadStream("example_skill.zip"), "example_skill.zip")]
  });

  console.log(`Created skill: ${skill.id}`);
  console.log(`Latest version: ${skill.latest_version_id}`);
  ```

  ```csharp C#
  using System.IO;
  using Anthropic;
  using Anthropic.Models.Skills;

  AnthropicClient client = new();

  var parameters = new SkillCreateParams
  {
      Files = [
          new FileStream("example_skill.zip", FileMode.Open, FileAccess.Read)
      ],
  };

  var skill = await client.Skills.Create(parameters);

  Console.WriteLine($"Created skill: {skill.ID}");
  Console.WriteLine($"Latest version: {skill.LatestVersionID}");
  ```

  ```go Go
  package main

  import (
  	"context"
  	"fmt"
  	"io"
  	"log"
  	"os"

  	"github.com/anthropics/anthropic-sdk-go"
  )

  func main() {
  	client := anthropic.NewClient()

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

  	fmt.Printf("Created skill: %s\n", skill.ID)
  	fmt.Printf("Latest version: %s\n", skill.LatestVersionID)
  }
  ```

  ```java Java
  import com.anthropic.client.AnthropicClient;
  import com.anthropic.client.okhttp.AnthropicOkHttpClient;
  import com.anthropic.core.MultipartField;
  import com.anthropic.models.skills.Skill;
  import com.anthropic.models.skills.SkillCreateParams;
  import java.io.IOException;
  import java.io.InputStream;
  import java.nio.file.Files;
  import java.nio.file.Path;

  void main() throws IOException {
      AnthropicClient client = AnthropicOkHttpClient.fromEnv();

      SkillCreateParams params = SkillCreateParams.builder()
          .addFile(MultipartField.<InputStream>builder()
              .value(Files.newInputStream(Path.of("example_skill.zip")))
              .filename("example_skill.zip")
              .contentType("application/zip")
              .build())
          .build();

      Skill skill = client.skills().create(params);

      IO.println("Created skill: " + skill.id());
      IO.println("Latest version: " + skill.latestVersionId());
  }
  ```

  ```php PHP
  use Anthropic\Client;
  use Anthropic\Core\FileParam;

  $client = new Client();

  $skill = $client->skills->create(
      files: [
          FileParam::fromResource(fopen('example_skill.zip', 'r')),
      ],
  );

  echo "Created skill: {$skill->id}\n";
  echo "Latest version: {$skill->latestVersionID}\n";
  ```

  ```ruby Ruby
  require "anthropic"

  client = Anthropic::Client.new

  skill = client.skills.create(
    files: [
      File.open("example_skill.zip", "rb")
    ]
  )

  puts "Created skill: #{skill.id}"
  puts "Latest version: #{skill.latest_version_id}"
  ```

To list, retrieve, delete, and version custom skills, see [Managing custom skills](https://platform.claude.com/docs/en/build-with-claude/skills-guide#managing-custom-skills). For the full request and response schemas, see the [Create Skill API reference](https://platform.claude.com/docs/en/api/skills/create). Skill bundles upload directly to the Skills API rather than through the [Files API](https://platform.claude.com/docs/en/build-with-claude/files).

## Attach skills to an agent

Attach skills when creating an agent. Each [session](https://platform.claude.com/docs/en/managed-agents/sessions) supports up to 500 skills, counted as the deduplicated set across every agent in the session (see [Multiagent orchestration](https://platform.claude.com/docs/en/managed-agents/multiagent-orchestration)).

  Mounting more skills increases the time it takes for the session's sandbox to start. Attach only the skills each agent needs for its task.

Each entry in the `skills` array uses the following fields:

| Field      | Description                                                                                                                                                                                                                                                        |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `type`     | Either `anthropic` for pre-built skills or `custom` for workspace-authored skills.                                                                                                                                                                                 |
| `skill_id` | The skill identifier. For Anthropic skills, use the short name (for example, `xlsx`). For custom skills, use the `skill_*` ID returned at creation (see [Create a custom skill](https://platform.claude.com/docs/en/managed-agents/skills#create-a-custom-skill)). |
| `version`  | Pin to a specific version or use `latest`. Optional. Defaults to `latest` when omitted. Applies to both Anthropic and custom skills.                                                                                                                               |

  ```bash cURL
  agent=$(curl -sS https://api.anthropic.com/v1/agents \
    -H "x-api-key: $ANTHROPIC_API_KEY" \
    -H "anthropic-version: 2023-06-01" \
    -H "anthropic-beta: managed-agents-2026-04-01" \
    --json @- <<'EOF'
  {
    "name": "Financial Analyst",
    "model": "claude-opus-5",
    "system": "You are a financial analysis agent.",
    "skills": [
      {"type": "anthropic", "skill_id": "xlsx"},
      {"type": "custom", "skill_id": "skill_01AbCdEfGhIjKlMnOpQrStUv", "version": "latest"}
    ]
  }
  EOF
  )
  ```

    ```bash CLI
    ant apply agent.md
    ```

      ```markdown
      ---
      name: Financial Analyst
      model: claude-opus-5
      skills:
        - type: anthropic
          skill_id: xlsx
        - type: custom
          skill_id: skill_01AbCdEfGhIjKlMnOpQrStUv
          version: latest
      ---

      You are a financial analysis agent.
      ```

  ```python Python
  agent = client.beta.agents.create(
      name="Financial Analyst",
      model="claude-opus-5",
      system="You are a financial analysis agent.",
      skills=[
          {
              "type": "anthropic",
              "skill_id": "xlsx",
          },
          {
              "type": "custom",
              "skill_id": "skill_01AbCdEfGhIjKlMnOpQrStUv",
              "version": "latest",
          },
      ],
  )
  ```

  ```typescript TypeScript
  const agent = await client.beta.agents.create({
    name: "Financial Analyst",
    model: "claude-opus-5",
    system: "You are a financial analysis agent.",
    skills: [
      {
        type: "anthropic",
        skill_id: "xlsx"
      },
      {
        type: "custom",
        skill_id: "skill_01AbCdEfGhIjKlMnOpQrStUv",
        version: "latest"
      }
    ]
  });
  ```

  ```csharp C#
  using Anthropic.Models.Beta.Agents;

  var agent = await client.Beta.Agents.Create(new()
  {
      Name = "Financial Analyst",
      Model = BetaManagedAgentsModel.ClaudeOpus5,
      System = "You are a financial analysis agent.",
      Skills =
      [
          new BetaManagedAgentsAnthropicSkillParams { Type = BetaManagedAgentsAnthropicSkillParamsType.Anthropic, SkillID = "xlsx" },
          new BetaManagedAgentsCustomSkillParams { Type = BetaManagedAgentsCustomSkillParamsType.Custom, SkillID = "skill_01AbCdEfGhIjKlMnOpQrStUv", Version = "latest" },
      ],
  });
  ```

  ```go Go
  agent, err := client.Beta.Agents.New(ctx, anthropic.BetaAgentNewParams{
  	Name: "Financial Analyst",
  	Model: anthropic.BetaManagedAgentsModelConfigParams{
  		ID: anthropic.BetaManagedAgentsModelClaudeOpus5,
  	},
  	System: anthropic.String("You are a financial analysis agent."),
  	Skills: []anthropic.BetaManagedAgentsSkillParamsUnion{
  		{OfAnthropic: &anthropic.BetaManagedAgentsAnthropicSkillParams{
  			SkillID: "xlsx",
  			Type:    anthropic.BetaManagedAgentsAnthropicSkillParamsTypeAnthropic,
  		}},
  		{OfCustom: &anthropic.BetaManagedAgentsCustomSkillParams{
  			SkillID: "skill_01AbCdEfGhIjKlMnOpQrStUv",
  			Type:    anthropic.BetaManagedAgentsCustomSkillParamsTypeCustom,
  			Version: anthropic.String("latest"),
  		}},
  	},
  })
  if err != nil {
  	panic(err)
  }
  _ = agent
  ```

  ```java Java
  import com.anthropic.models.beta.agents.*;

  var agent = client.beta().agents().create(
      AgentCreateParams.builder()
          .name("Financial Analyst")
          .model(BetaManagedAgentsModel.CLAUDE_OPUS_5)
          .system("You are a financial analysis agent.")
          .addSkill(
              BetaManagedAgentsAnthropicSkillParams.builder()
                  .type(BetaManagedAgentsAnthropicSkillParams.Type.ANTHROPIC)
                  .skillId("xlsx")
                  .build()
          )
          .addSkill(
              BetaManagedAgentsCustomSkillParams.builder()
                  .type(BetaManagedAgentsCustomSkillParams.Type.CUSTOM)
                  .skillId("skill_01AbCdEfGhIjKlMnOpQrStUv")
                  .version("latest")
                  .build()
          )
          .build()
  );
  ```

  ```php PHP
  $agent = $client->beta->agents->create(
      name: 'Financial Analyst',
      model: 'claude-opus-5',
      system: 'You are a financial analysis agent.',
      skills: [
          ['type' => 'anthropic', 'skillID' => 'xlsx'],
          ['type' => 'custom', 'skillID' => 'skill_01AbCdEfGhIjKlMnOpQrStUv', 'version' => 'latest'],
      ],
  );
  ```

  ```ruby Ruby
  agent = client.beta.agents.create(
    name: "Financial Analyst",
    model: "claude-opus-5",
    system_: "You are a financial analysis agent.",
    skills: [
      {type: "anthropic", skill_id: "xlsx"},
      {type: "custom", skill_id: "skill_01AbCdEfGhIjKlMnOpQrStUv", version: "latest"}
    ]
  )
  ```

## Load skills from a GitHub repository

Skills can also live in your codebase. When a session mounts a repository through the [`github_repository` resource](https://platform.claude.com/docs/en/managed-agents/github), the repository's root `.claude/skills` directory is scanned at session start, and each skill found there becomes available to the agent. No upload and no entry in the agent's `skills` array are required. The agent sees each discovered skill's name, description, and path in the sandbox, and reads the skill's `SKILL.md` when a task matches, including any scripts and resources the skill ships. Discovery relies on the agent's `read` tool from the [agent toolset](https://platform.claude.com/docs/en/managed-agents/tools), which is enabled by default; an agent with `read` disabled doesn't load repository skills.

  Repository skills are agent instructions, so a mounted repository is part of your agent's trust boundary. Anyone who can commit to the repository (a merged external pull request, a compromised dependency, a contributor) can add or change a skill, the platform loads it at session start without a review step, and session tools such as `bash` and `web_fetch` give those instructions real reach. Mount only repositories you trust, and review `.claude/skills` before mounting a repository that accepts outside contributions.

  Repository skill discovery runs in cloud sandboxes. [Self-hosted sandboxes](https://platform.claude.com/docs/en/managed-agents/self-hosted-sandboxes) don't support GitHub repository resources.

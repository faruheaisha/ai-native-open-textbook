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
sourceRel: "docs/en/managed-agents/self-hosted-sandboxes.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/managed-agents/self-hosted-sandboxes.md"
sourceSha256: "1f7859dc89e17f00a3dc7ec93296471611247acca42ed2149c714b5102c1ac2b"
pageSha256: "bada3bf559cf15e23d453564431bd1f265df0f04f77bd1bb420f00485711a551"
contentMode: "local-full"
zh: ""
---

## Before you begin

You need:

* **An existing agent.** If you don't have one, complete the [Quickstart](https://platform.claude.com/docs/en/managed-agents/quickstart) first and note its agent ID.
* **A Linux host** with `/bin/bash` at that exact path. The worker's bash tool invokes it directly, without consulting `PATH`. The TypeScript SDK additionally requires `unzip` and `tar` on the `PATH` and Node.js 22 or later; the Python and Go SDKs use their standard libraries for archive extraction and have no additional binary requirements.
* **The `ant` CLI or an Anthropic SDK** (Python, TypeScript, or Go) on the worker host.
* **Credentials:** an environment key (generated in the Console in the steps that follow) authenticates the worker to its queue; your Claude API key creates sessions and reads queue stats from outside the worker host. Key generation is Console-only. Claimed work items also carry a per-session `secret` that the worker uses to mount [memory stores](https://platform.claude.com/docs/en/managed-agents/self-hosted-sandboxes#use-memory-stores); you don't generate it, but in the sandbox-per-session pattern you forward it into the sandbox yourself (see [Run one sandbox per session](https://platform.claude.com/docs/en/managed-agents/self-hosted-sandboxes#run-one-sandbox-per-session)).
* **For memory stores, a prepared host.** If sessions on this environment will attach memory stores, prepare `/mnt/memory` on the worker host before you start the worker; see [Prepare the host](https://platform.claude.com/docs/en/managed-agents/self-hosted-sandboxes#prepare-the-host).

  On [Claude Platform on AWS](https://platform.claude.com/docs/en/build-with-claude/claude-platform-on-aws), the worker authenticates with AWS IAM (SigV4) or an [API key generated in the AWS Console](https://platform.claude.com/docs/en/build-with-claude/claude-platform-on-aws#api-key-authentication), not an environment key. Attach the [`AnthropicSelfHostedEnvironmentAccess`](https://platform.claude.com/docs/en/api/claude-platform-on-aws-iam-actions#managed-policies) managed policy to the IAM principal your worker runs as. Environment keys generated in the Claude Console don't work with the Claude Platform on AWS endpoint.

  Memory stores cannot be attached to sessions on self-hosted environments on Claude Platform on AWS.

    In the [Console](https://platform.claude.com/workspaces/default/environments): **Workspace > Environments > New > Self-hosted**

    Or through the API:

      ```bash cURL
      curl -sS --fail-with-body https://api.anthropic.com/v1/environments \
        -H "x-api-key: $ANTHROPIC_API_KEY" \
        -H "anthropic-version: 2023-06-01" \
        -H "anthropic-beta: managed-agents-2026-04-01" \
        -H "content-type: application/json" \
        -d '{
          "name": "self-hosted",
          "config": {"type": "self_hosted"}
        }'
      ```

        ```bash CLI
        ant apply environment.yaml
        ```

          ```yaml
          name: self-hosted
          config:
            type: self_hosted
          ```

      ```python Python
      client = anthropic.Anthropic()

      environment = client.beta.environments.create(
          name="self-hosted", config={"type": "self_hosted"}
      )
      print(environment.id)
      ```

      ```typescript TypeScript
      const client = new Anthropic();

      const environment = await client.beta.environments.create({
        name: "self-hosted",
        config: { type: "self_hosted" }
      });
      console.log(environment.id);
      ```

      ```csharp C#
      using Anthropic.Models.Beta.Environments;

      var client = new AnthropicClient();

      var environment = await client.Beta.Environments.Create(
          new EnvironmentCreateParams
          {
              Name = "self-hosted",
              Config = new BetaSelfHostedConfigParams(),
          }
      );
      Console.WriteLine(environment.ID);
      ```

      ```go Go
      client := anthropic.NewClient()

      environment, err := client.Beta.Environments.New(context.Background(), anthropic.BetaEnvironmentNewParams{
      	Name: "self-hosted",
      	Config: anthropic.BetaEnvironmentNewParamsConfigUnion{
      		OfSelfHosted: &anthropic.BetaSelfHostedConfigParams{},
      	},
      })
      if err != nil {
      	panic(err)
      }
      fmt.Println(environment.ID)
      ```

      ```java Java
      import com.anthropic.models.beta.environments.BetaSelfHostedConfigParams;
      import com.anthropic.models.beta.environments.EnvironmentCreateParams;

      void main() {
          var client = AnthropicOkHttpClient.fromEnv();

          var environment = client.beta().environments().create(
              EnvironmentCreateParams.builder()
                  .name("self-hosted")
                  .config(BetaSelfHostedConfigParams.builder().build())
                  .build()
          );
          IO.println(environment.id());
      }
      ```

      ```php PHP
      $client = new Anthropic\Client();

      $environment = $client->beta->environments->create(
          name: 'self-hosted',
          config: ['type' => 'self_hosted'],
      );
      echo $environment->id, PHP_EOL;
      ```

      ```ruby Ruby
      client = Anthropic::Client.new

      environment = client.beta.environments.create(
        name: "self-hosted",
        config: \{type: :self_hosted\}
      )
      puts environment.id
      ```

    In the Console, open the environment and click **Generate environment key**. Key generation is Console-only, regardless of whether you created the environment through the Console or the API. Then export the environment ID and key on the worker host:

    ```bash
    export ANTHROPIC_ENVIRONMENT_KEY="sk-ant-oat01-..."
    export ANTHROPIC_ENVIRONMENT_ID="env_..."
    ```

  Skills can include executables that the agent may run directly. The CLI and SDK workers preserve the executable permissions recorded in the skill bundle when they extract it. If you implement skills download manually, you are responsible for setting executable permissions.

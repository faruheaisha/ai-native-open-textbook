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
pageSha256: "f038394a3d8bf6bc33204b68b9545fc6377710b15a02a9da3450a5a05aab13d7"
contentMode: "local-full"
zh: ""
---

## Start a session

Once your worker is running, create a session that targets the environment. Set `AGENT_ID` to the agent ID you noted in [Before you begin](https://platform.claude.com/docs/en/managed-agents/self-hosted-sandboxes#before-you-begin). The session enters the environment's work queue and waits there until a worker claims it; if no worker is connected, the session stays queued rather than failing.

Anthropic doesn't mount files or GitHub repositories into self-hosted sandboxes. To make session-specific files available, pass file references (such as an S3 path or commit SHA) in the session `metadata` field. The claimed work item doesn't carry the session's metadata, but it does carry the session ID: your spawn script or `--on-work` handler retrieves the session (`GET /v1/sessions/\{session_id\}`) to read the `metadata` field, then stages the files into the working directory before tool execution begins.

  ```bash cURL
  curl -sS --fail-with-body https://api.anthropic.com/v1/sessions \
    -H "x-api-key: $ANTHROPIC_API_KEY" \
    -H "anthropic-version: 2023-06-01" \
    -H "anthropic-beta: managed-agents-2026-04-01" \
    -H "content-type: application/json" \
    -d @- <<EOF
  {
    "agent": "$AGENT_ID",
    "environment_id": "$ANTHROPIC_ENVIRONMENT_ID",
    "metadata": {"input_file": "s3://my-bucket/data.csv"}
  }
  EOF
  ```

  ```bash CLI
  ant beta:sessions create \
    --agent "$AGENT_ID" \
    --environment-id "$ANTHROPIC_ENVIRONMENT_ID" \
    --metadata '{"input_file": "s3://my-bucket/data.csv"}'
  ```

  ```python Python
  session = client.beta.sessions.create(
      agent=agent.id,
      environment_id=environment.id,
      metadata={"input_file": "s3://my-bucket/data.csv"},
  )
  ```

  ```typescript TypeScript
  const session = await client.beta.sessions.create({
    agent: agent.id,
    environment_id: environment.id,
    metadata: { input_file: "s3://my-bucket/data.csv" }
  });
  ```

  ```csharp C#
  var session = await client.Beta.Sessions.Create(new()
  {
      Agent = agent.ID,
      EnvironmentID = environment.ID,
      Metadata = new Dictionary<string, string> { ["input_file"] = "s3://my-bucket/data.csv" },
  });
  ```

  ```go Go
  session, err := client.Beta.Sessions.New(ctx, anthropic.BetaSessionNewParams{
  	Agent:         anthropic.BetaSessionNewParamsAgentUnion{OfString: anthropic.String(agent.ID)},
  	EnvironmentID: environment.ID,
  	Metadata: map[string]string{
  		"input_file": "s3://my-bucket/data.csv",
  	},
  })
  if err != nil {
  	panic(err)
  }
  ```

  ```java Java
  var session = client.beta().sessions().create(SessionCreateParams.builder()
      .agent(agent.id())
      .environmentId(environment.id())
      .metadata(SessionCreateParams.Metadata.builder()
          .putAdditionalProperty("input_file", JsonValue.from("s3://my-bucket/data.csv"))
          .build())
      .build());
  ```

  ```php PHP
  $session = $client->beta->sessions->create(
      agent: $agent->id,
      environmentID: $environment->id,
      metadata: ['input_file' => 's3://my-bucket/data.csv'],
  );
  ```

  ```ruby Ruby
  session = client.beta.sessions.create(
    agent: agent.id,
    environment_id: environment.id,
    metadata: {input_file: "s3://my-bucket/data.csv"}
  )
  ```

  Self-hosted sandboxes support `memory_store` resources only; see [Use memory stores](https://platform.claude.com/docs/en/managed-agents/self-hosted-sandboxes#use-memory-stores). A session on a self-hosted environment that includes a `file` or `github_repository` resource is rejected with a 400 error:

  ```text wrap
  Environment env_... is a self-hosted environment. `resources` are not supported with self-hosted environments.
  ```

  [Deployments](https://platform.claude.com/docs/en/managed-agents/scheduled-deployments) that target a self-hosted environment follow the same rule.

See [Self-hosted worker](https://platform.claude.com/docs/en/managed-agents/reference#self-hosted-worker) in the reference for the full list of CLI flags, and [SDK helpers](https://platform.claude.com/docs/en/managed-agents/self-hosted-sandboxes#sdk-helpers) for the SDK helper options.

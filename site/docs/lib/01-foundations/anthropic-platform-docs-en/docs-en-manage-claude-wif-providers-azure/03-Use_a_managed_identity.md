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
sourceRel: "docs/en/manage-claude/wif-providers/azure.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/manage-claude/wif-providers/azure.md"
sourceSha256: "952202dd6887403d9a88e6fd385834a36f495c73cd33536fe2d20c2acfccfa6a"
pageSha256: "72b1fa406dd2eceadef4b1e62c3901aa5eefd4baca41a2c6a525b3abd3324a1f"
contentMode: "local-full"
zh: ""
---

## Use a managed identity

Use this path when your workload runs on a VM, a VM Scale Set, App Service, Functions, or Container Apps. The workload requests an Entra-issued JWT for its assigned managed identity from the platform's local token endpoint, then exchanges that JWT with Anthropic.

### Configure the managed identity

    Enable a system-assigned or user-assigned managed identity on your Azure resource. In the Azure portal, open the resource, go to **Identity**, and turn on **System assigned** (or attach a user-assigned identity).

    After the identity is created, note its **Object (principal) ID**. This GUID appears as both the `sub` and `oid` claims in the issued token, and your Anthropic federation rule will match on it. You can find it on the resource's **Identity** page; for a user-assigned identity, it is the **Object (principal) ID** on the managed identity resource's **Overview** page. (A managed identity has only a service principal in Microsoft Entra ID, not an app registration.)

    The platform exposes a local token endpoint once the identity is attached:

    * **VMs and VM Scale Sets:** IMDS at `http://169.254.169.254/metadata/identity/oauth2/token` with the header `Metadata: true` and `api-version=2018-02-01`.
    * **App Service, Functions, and Container Apps:** The URL in the `IDENTITY_ENDPOINT` environment variable with the header `X-IDENTITY-HEADER` set to the value of `IDENTITY_HEADER`, and `api-version=2019-08-01`. IMDS is not reachable on these platforms.

    If the resource has more than one user-assigned managed identity, add `client_id=<IDENTITY_CLIENT_ID>` to the token request to select one. Azure recommends always specifying it. Without it, the outcome depends on whether the resource also has a system-assigned identity enabled: if it does, the request silently falls back to that identity and then fails your federation rule's `oid` match; if it does not, the request fails outright as soon as a second user-assigned identity is attached.

    Request a token from the endpoint and decode its payload to confirm the claims your federation rule needs to match. (For the decode command, see [Troubleshoot a failed exchange](https://platform.claude.com/docs/en/manage-claude/wif-reference#troubleshoot-a-failed-exchange).) A v2.0 token for a managed identity carries these claims:

    ```json
    \{
      "iss": "https://login.microsoftonline.com/&lt;TENANT_ID>/v2.0",
      "sub": "9f8e7d6c-1a2b-3c4d-5e6f-...",
      "aud": "&lt;APP_ID>",
      "oid": "9f8e7d6c-1a2b-3c4d-5e6f-...",
      "tid": "&lt;TENANT_ID>",
      "azp": "&lt;IDENTITY_CLIENT_ID>",
      "ver": "2.0",
      "exp": 1775527120
    \}
    ```

    | Claim | Value                                                                                                                                                                                                 | Match this when                                                                                                                                                                                                    |
    | ----- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
    | `oid` | The managed identity's object ID, identical to `sub`                                                                                                                                                  | You want to authorize one specific managed identity. This is the default; the rule in [Configure Anthropic](https://platform.claude.com/docs/en/manage-claude/wif-providers/azure#configure-anthropic) matches it. |
    | `azp` | The calling identity's client ID                                                                                                                                                                      | You want to authorize every workload that shares one app registration. For a managed identity, `azp` is unique to that identity, so it is equivalent to `oid`.                                                     |
    | `aud` | The audience app registration's client ID (the `<APP_ID>` GUID from [Register the token audience](https://platform.claude.com/docs/en/manage-claude/wif-providers/azure#register-the-token-audience)) | Always. The rule's `audience` field must equal the token's `aud` value exactly.                                                                                                                                    |
    | `tid` | Your tenant ID                                                                                                                                                                                        | You want defense in depth. The issuer URL already pins the tenant.                                                                                                                                                 |

    If the decoded token's `ver` claim is `1.0`, the claim names and values differ. See [If your tokens are v1.0](https://platform.claude.com/docs/en/manage-claude/wif-providers/azure#if-your-tokens-are-v1-0) before continuing.

### Configure Anthropic

In the Claude Console, open **Settings → Workload identity**, click **Connect workload**, and select the **Microsoft Entra** tile. The wizard walks you through registering the issuer, creating a service account, and creating a federation rule.

The wizard creates these resources for you. Use the following values whether you enter them in the wizard or send them to the [Admin API](https://platform.claude.com/docs/en/manage-claude/wif-admin-api):

**Federation issuer:** Choose **v2.0 (login.microsoftonline.com)** in the wizard's **Token issuer** selector. (The selector defaults to v1; that default exists for tenants reusing older registrations that still emit v1.0 tokens.) Entra publishes an OIDC discovery document at the per-tenant issuer URL, so use discovery mode. Each Microsoft Entra tenant you federate needs its own issuer record.

```json
{
  "name": "azure-prod-tenant",
  "issuer_url": "https://login.microsoftonline.com/<TENANT_ID>/v2.0",
  "jwks": { "type": "discovery" },
  "max_jwt_lifetime_seconds": 86400
}
```

  Managed identity workloads need `max_jwt_lifetime_seconds: 86400`. Azure issues managed identity tokens with up to 24 hours between `iat` and `exp` because it caches each resource's token for that window and offers no way to force an early refresh, and the issuer's 1-hour default rejects those tokens, so the exchange fails with the opaque `401` `authentication_error` response (message `Authentication failed`). The Connect workload wizard's Microsoft Entra tile creates the issuer with `max_jwt_lifetime_seconds` set to `7500` and provides no field to change it during creation, so finish the wizard, then open **Settings → Workload identity → Issuers**, edit the issuer, and raise the value to `86400`. You can also update the issuer through the Admin API.

A longer accepted lifetime means a leaked Entra token stays exchangeable for longer. If a token leaks, the lever is disabling the federation rule; a tight `oid` match limits which identities can exchange a token in the first place, as described in [Scope your rule](https://platform.claude.com/docs/en/manage-claude/wif-providers/azure#scope-your-rule).

**Federation rule:** Match on the managed identity's object ID and your tenant ID. For the v2.0 tokens this guide configures, the `audience` value is the audience app registration's client ID (the `<APP_ID>` GUID from [Register the token audience](https://platform.claude.com/docs/en/manage-claude/wif-providers/azure#register-the-token-audience)). Use the exact `aud` value from your decoded token.

```json
{
  "name": "azure-inference-worker",
  "issuer_id": "fdis_...",
  "match": {
    "audience": "<APP_ID>",
    "claims": {
      "oid": "9f8e7d6c-1a2b-3c4d-5e6f-...",
      "tid": "<TENANT_ID>"
    }
  },
  "target": {
    "type": "service_account",
    "service_account_id": "svac_..."
  },
  "workspace_id": "wrkspc_...",
  "oauth_scope": "workspace:developer",
  "token_lifetime_seconds": 600
}
```

`token_lifetime_seconds` is the lifetime of the Anthropic access token the exchange returns, not of the Entra token; the SDK refreshes it for you.

### Acquire and use the token

At runtime your workload fetches its Entra token, exchanges it at `POST /v1/oauth/token`, and uses the returned bearer token to call Claude. Each Anthropic SDK handles the exchange and refresh loop when you supply a token-provider callable, as shown in the following examples. The cURL tab shows the raw flow.

The samples fetch the managed identity token from the platform's token endpoint: IMDS on VMs and VM Scale Sets, or the `IDENTITY_ENDPOINT` service on App Service, Functions, and Container Apps. Replace `<APP_ID>` in the `api://<APP_ID>` resource value with the audience app registration's client ID from [Register the token audience](https://platform.claude.com/docs/en/manage-claude/wif-providers/azure#register-the-token-audience).

  If your workload already uses the Azure Identity client library, pass its token acquisition (`DefaultAzureCredential` with the scope `api://<APP_ID>/.default`) as the identity token provider instead of calling the token endpoints directly. The library selects the correct endpoint on every Azure platform, including AKS with Entra Workload Identity.

  ```bash cURL
  # 1. Fetch the Entra-issued token (managed identity).
  #    On a VM or VM Scale Set, use IMDS. With multiple user-assigned
  #    identities, append &client_id=<IDENTITY_CLIENT_ID>.
  ENTRA_TOKEN=$(curl -sS -H "Metadata: true" \
    "http://169.254.169.254/metadata/identity/oauth2/token?api-version=2018-02-01&resource=api://<APP_ID>" \
    | jq -r .access_token)

  #    On App Service, Functions, or Container Apps, use the local token
  #    service instead (IMDS is not reachable there):
  # ENTRA_TOKEN=$(curl -sS -H "X-IDENTITY-HEADER: $IDENTITY_HEADER" \
  #   "$IDENTITY_ENDPOINT?api-version=2019-08-01&resource=api://<APP_ID>" \
  #   | jq -r .access_token)

  #    For AKS with Entra Workload Identity, use the two-hop exchange in the
  #    "Use Entra Workload Identity on AKS" section instead.

  # 2. Exchange it for an Anthropic access token.
  RESPONSE=$(curl -sS https://api.anthropic.com/v1/oauth/token \
    -H "content-type: application/json" \
    -d @- <<JSON
  {
    "grant_type": "urn:ietf:params:oauth:grant-type:jwt-bearer",
    "assertion": "$ENTRA_TOKEN",
    "federation_rule_id": "$ANTHROPIC_FEDERATION_RULE_ID",
    "organization_id": "$ANTHROPIC_ORGANIZATION_ID",
    "service_account_id": "$ANTHROPIC_SERVICE_ACCOUNT_ID",
    "workspace_id": "$ANTHROPIC_WORKSPACE_ID"
  }
  JSON
  )

  ACCESS_TOKEN=$(echo "$RESPONSE" | jq -r .access_token)

  # 3. Call the Claude API with the bearer token.
  curl https://api.anthropic.com/v1/messages \
    -H "authorization: Bearer $ACCESS_TOKEN" \
    -H "anthropic-version: 2023-06-01" \
    -H "content-type: application/json" \
    -d '{
      "model": "claude-opus-5",
      "max_tokens": 1024,
      "messages": [{"role": "user", "content": "Hello from Azure"}]
    }' | jq -r '.content[] | select(.type == "text") | .text'
  ```

  ```python Python
  import os

  import anthropic
  import requests
  from anthropic import WorkloadIdentityCredentials

  # The audience app registration's identifier URI (see Register the token audience).
  AUDIENCE = "api://<APP_ID>"

  def fetch_entra_token() -> str:
      """Fetch a managed identity token from the platform's token endpoint."""
      # With multiple user-assigned identities, add client_id=<IDENTITY_CLIENT_ID>
      # to the request params to select one.
      if endpoint := os.environ.get("IDENTITY_ENDPOINT"):
          # App Service, Functions, Container Apps
          response = requests.get(
              endpoint,
              headers={"X-IDENTITY-HEADER": os.environ["IDENTITY_HEADER"]},
              params={"api-version": "2019-08-01", "resource": AUDIENCE},
              timeout=5,
          )
      else:
          # VM or VM Scale Set: Azure Instance Metadata Service (IMDS)
          response = requests.get(
              "http://169.254.169.254/metadata/identity/oauth2/token",
              headers={"Metadata": "true"},
              params={"api-version": "2018-02-01", "resource": AUDIENCE},
              timeout=5,
          )
      response.raise_for_status()
      return response.json()["access_token"]

  client = anthropic.Anthropic(
      credentials=WorkloadIdentityCredentials(
          identity_token_provider=fetch_entra_token,
          federation_rule_id=os.environ["ANTHROPIC_FEDERATION_RULE_ID"],
          organization_id=os.environ["ANTHROPIC_ORGANIZATION_ID"],
          service_account_id=os.environ["ANTHROPIC_SERVICE_ACCOUNT_ID"],
          workspace_id=os.environ.get("ANTHROPIC_WORKSPACE_ID"),
      ),
  )

  message = client.messages.create(
      model="claude-opus-5",
      max_tokens=1024,
      messages=[{"role": "user", "content": "Hello from Azure"}],
  )
  print(next(block.text for block in message.content if block.type == "text"))
  ```

  ```typescript TypeScript
  import Anthropic from "@anthropic-ai/sdk";
  import { oidcFederationProvider } from "@anthropic-ai/sdk/lib/credentials/oidc-federation";

  // The audience app registration's identifier URI (see Register the token audience).
  const AUDIENCE = "api://<APP_ID>";

  async function fetchEntraToken(): Promise<string> {
    // App Service, Functions, and Container Apps inject IDENTITY_ENDPOINT;
    // VMs and VM Scale Sets use IMDS.
    // With multiple user-assigned identities, append &client_id=<IDENTITY_CLIENT_ID>.
    const identityEndpoint = process.env.IDENTITY_ENDPOINT;
    const url = identityEndpoint
      ? `${identityEndpoint}?api-version=2019-08-01&resource=${AUDIENCE}`
      : `http://169.254.169.254/metadata/identity/oauth2/token?api-version=2018-02-01&resource=${AUDIENCE}`;
    const headers: Record<string, string> = identityEndpoint
      ? { "X-IDENTITY-HEADER": process.env.IDENTITY_HEADER! }
      : { Metadata: "true" };
    const response = await fetch(url, { headers });
    const body = (await response.json()) as { access_token: string };
    return body.access_token;
  }

  const client = new Anthropic({
    credentials: oidcFederationProvider({
      identityTokenProvider: fetchEntraToken,
      federationRuleId: process.env.ANTHROPIC_FEDERATION_RULE_ID!,
      organizationId: process.env.ANTHROPIC_ORGANIZATION_ID!,
      serviceAccountId: process.env.ANTHROPIC_SERVICE_ACCOUNT_ID,
      workspaceId: process.env.ANTHROPIC_WORKSPACE_ID,
      baseURL: "https://api.anthropic.com",
      fetch
    })
  });

  const message = await client.messages.create({
    model: "claude-opus-5",
    max_tokens: 1024,
    messages: [{ role: "user", content: "Hello from Azure" }]
  });
  for (const block of message.content) {
    if (block.type === "text") {
      console.log(block.text);
    }
  }
  ```

  ```go Go
  package main

  import (
  	"context"
  	"encoding/json"
  	"fmt"
  	"net/http"
  	"os"

  	"github.com/anthropics/anthropic-sdk-go"
  	"github.com/anthropics/anthropic-sdk-go/option"
  )

  // The audience app registration's identifier URI (see Register the token audience).
  const audience = "api://<APP_ID>"

  // fetchEntraToken fetches a managed identity token from the platform's token
  // endpoint: IMDS on VMs and VM Scale Sets, or the IDENTITY_ENDPOINT service
  // on App Service, Functions, and Container Apps.
  func fetchEntraToken(ctx context.Context) (string, error) {
  	// With multiple user-assigned identities, append &client_id=<IDENTITY_CLIENT_ID>.
  	tokenURL := "http://169.254.169.254/metadata/identity/oauth2/token" +
  		"?api-version=2018-02-01&resource=" + audience
  	header, value := "Metadata", "true"
  	if endpoint := os.Getenv("IDENTITY_ENDPOINT"); endpoint != "" {
  		tokenURL = endpoint + "?api-version=2019-08-01&resource=" + audience
  		header, value = "X-IDENTITY-HEADER", os.Getenv("IDENTITY_HEADER")
  	}
  	req, err := http.NewRequestWithContext(ctx, http.MethodGet, tokenURL, nil)
  	if err != nil {
  		return "", err
  	}
  	req.Header.Set(header, value)
  	resp, err := http.DefaultClient.Do(req)
  	if err != nil {
  		return "", fmt.Errorf("call token endpoint: %w", err)
  	}
  	defer resp.Body.Close()
  	var body struct {
  		AccessToken string `json:"access_token"`
  	}
  	if err := json.NewDecoder(resp.Body).Decode(&body); err != nil {
  		return "", fmt.Errorf("decode token response: %w", err)
  	}
  	return body.AccessToken, nil
  }

  func main() {
  	client := anthropic.NewClient(
  		option.WithFederationTokenProvider(fetchEntraToken, option.FederationOptions{
  			FederationRuleID: os.Getenv("ANTHROPIC_FEDERATION_RULE_ID"),
  			OrganizationID:   os.Getenv("ANTHROPIC_ORGANIZATION_ID"),
  			ServiceAccountID: os.Getenv("ANTHROPIC_SERVICE_ACCOUNT_ID"),
  			WorkspaceID:      os.Getenv("ANTHROPIC_WORKSPACE_ID"),
  		}),
  	)

  	message, err := client.Messages.New(context.TODO(), anthropic.MessageNewParams{
  		Model:     anthropic.ModelClaudeOpus5,
  		MaxTokens: 1024,
  		Messages: []anthropic.MessageParam{
  			anthropic.NewUserMessage(anthropic.NewTextBlock("Hello from Azure")),
  		},
  	})
  	if err != nil {
  		panic(err)
  	}
  	for _, block := range message.Content {
  		if textBlock, ok := block.AsAny().(anthropic.TextBlock); ok {
  			fmt.Println(textBlock.Text)
  			break
  		}
  	}
  }
  ```

  ```java Java
  HttpClient http = HttpClient.newHttpClient();
  // The audience app registration's identifier URI (see Register the token audience).
  String audience = "api://<APP_ID>";
  // App Service, Functions, and Container Apps inject IDENTITY_ENDPOINT;
  // VMs and VM Scale Sets use IMDS.
  // With multiple user-assigned identities, append &client_id=<IDENTITY_CLIENT_ID>.
  String identityEndpoint = System.getenv("IDENTITY_ENDPOINT");
  HttpRequest tokenRequest = identityEndpoint != null
          ? HttpRequest.newBuilder(URI.create(identityEndpoint + "?api-version=2019-08-01&resource=" + audience))
                  .header("X-IDENTITY-HEADER", System.getenv("IDENTITY_HEADER"))
                  .build()
          : HttpRequest.newBuilder(URI.create("http://169.254.169.254/metadata/identity/oauth2/token?api-version=2018-02-01&resource=" + audience))
                  .header("Metadata", "true")
                  .build();

  IdentityTokenProvider fetchEntraToken = () -> {
      try {
          var response = http.send(tokenRequest, HttpResponse.BodyHandlers.ofString());
          return new ObjectMapper().readTree(response.body()).get("access_token").asText();
      } catch (Exception e) {
          throw new RuntimeException(e);
      }
  };

  AnthropicClient client = AnthropicOkHttpClient.builder()
          .federationTokenProvider(
                  fetchEntraToken,
                  System.getenv("ANTHROPIC_FEDERATION_RULE_ID"),
                  System.getenv("ANTHROPIC_ORGANIZATION_ID"),
                  System.getenv("ANTHROPIC_SERVICE_ACCOUNT_ID"),
                  System.getenv("ANTHROPIC_WORKSPACE_ID"))
          .build();

  var message = client.messages().create(MessageCreateParams.builder()
          .model(Model.CLAUDE_OPUS_5)
          .maxTokens(1024)
          .addUserMessage("Hello from Azure")
          .build());

  IO.println(message.content());
  ```

  ```csharp C#
  using Anthropic.Credentials;
  // ...

  var credentials = new WorkloadIdentityCredentials(new WorkloadIdentityOptions
  {
      FederationRuleId = Environment.GetEnvironmentVariable("ANTHROPIC_FEDERATION_RULE_ID")!,
      OrganizationId = Environment.GetEnvironmentVariable("ANTHROPIC_ORGANIZATION_ID"),
      ServiceAccountId = Environment.GetEnvironmentVariable("ANTHROPIC_SERVICE_ACCOUNT_ID"),
      WorkspaceId = Environment.GetEnvironmentVariable("ANTHROPIC_WORKSPACE_ID"),
      IdentityTokenProvider = new EntraTokenProvider(),
  });
  using var client = new AnthropicClient(new ClientOptions { Credentials = credentials });

  var message = await client.Messages.Create(new()
  {
      Model = Model.ClaudeOpus5,
      MaxTokens = 1024,
      Messages = [new() { Role = Role.User, Content = "Hello from Azure" }],
  });
  foreach (var block in message.Content)
  {
      if (block.Value is TextBlock textBlock)
      {
          Console.WriteLine(textBlock.Text);
      }
  }

  class EntraTokenProvider : IIdentityTokenProvider
  {
      // The audience app registration's identifier URI (see Register the token audience).
      private const string Audience = "api://<APP_ID>";

      private static readonly HttpClient httpClient = new();

      public async Task<string> GetIdentityTokenAsync(CancellationToken ct = default)
      {
          // App Service, Functions, and Container Apps inject IDENTITY_ENDPOINT;
          // VMs and VM Scale Sets use IMDS.
          // With multiple user-assigned identities, append &client_id=<IDENTITY_CLIENT_ID>.
          var identityEndpoint = Environment.GetEnvironmentVariable("IDENTITY_ENDPOINT");
          using var request = identityEndpoint is not null
              ? new HttpRequestMessage(HttpMethod.Get,
                  $"{identityEndpoint}?api-version=2019-08-01&resource={Audience}")
              {
                  Headers = { { "X-IDENTITY-HEADER", Environment.GetEnvironmentVariable("IDENTITY_HEADER") } },
              }
              : new HttpRequestMessage(HttpMethod.Get,
                  $"http://169.254.169.254/metadata/identity/oauth2/token?api-version=2018-02-01&resource={Audience}")
              {
                  Headers = { { "Metadata", "true" } },
              };
          using var response = await httpClient.SendAsync(request, ct);
          response.EnsureSuccessStatusCode();
          using var json = await JsonDocument.ParseAsync(
              await response.Content.ReadAsStreamAsync(ct), default, ct);
          return json.RootElement.GetProperty("access_token").GetString()!;
      }
  }
  ```

  ```php PHP
  use Anthropic\Client;
  use Anthropic\Credentials\WorkloadIdentityCredentials;

  // The audience app registration's identifier URI (see Register the token audience).
  const AUDIENCE = 'api://<APP_ID>';

  function fetchEntraToken(): string
  {
      // App Service, Functions, and Container Apps inject IDENTITY_ENDPOINT;
      // VMs and VM Scale Sets use IMDS.
      // With multiple user-assigned identities, append &client_id=<IDENTITY_CLIENT_ID>.
      $identityEndpoint = getenv('IDENTITY_ENDPOINT');
      if ($identityEndpoint !== false) {
          $url = $identityEndpoint . '?api-version=2019-08-01&resource=' . AUDIENCE;
          $header = 'X-IDENTITY-HEADER: ' . getenv('IDENTITY_HEADER');
      } else {
          $url = 'http://169.254.169.254/metadata/identity/oauth2/token?api-version=2018-02-01&resource=' . AUDIENCE;
          $header = 'Metadata: true';
      }
      $context = stream_context_create([
          'http' => ['header' => $header . "\r\n"],
      ]);
      $body = json_decode(file_get_contents($url, false, $context), true);
      return $body['access_token'];
  }

  $credentials = new WorkloadIdentityCredentials(
      identityTokenProvider: fetchEntraToken(...),
      federationRuleId: getenv('ANTHROPIC_FEDERATION_RULE_ID'),
      organizationId: getenv('ANTHROPIC_ORGANIZATION_ID'),
      serviceAccountId: getenv('ANTHROPIC_SERVICE_ACCOUNT_ID'),
      workspaceId: getenv('ANTHROPIC_WORKSPACE_ID') ?: null,
  );
  $client = new Client(credentials: $credentials);

  $message = $client->messages->create(
      model: 'claude-opus-5',
      maxTokens: 1024,
      messages: [['role' => 'user', 'content' => 'Hello from Azure']],
  );
  $textBlock = array_find($message->content, static fn ($block): bool => $block->type === 'text');
  echo $textBlock->text, PHP_EOL;
  ```

  ```ruby Ruby
  require "anthropic"
  require "json"
  require "net/http"

  # The audience app registration's identifier URI (see Register the token audience).
  AUDIENCE = "api://<APP_ID>"

  def fetch_entra_token
    # App Service, Functions, and Container Apps inject IDENTITY_ENDPOINT;
    # VMs and VM Scale Sets use IMDS.
    # With multiple user-assigned identities, append &client_id=<IDENTITY_CLIENT_ID>.
    if (endpoint = ENV["IDENTITY_ENDPOINT"])
      url = "#{endpoint}?api-version=2019-08-01&resource=#{AUDIENCE}"
      headers = {"X-IDENTITY-HEADER" => ENV.fetch("IDENTITY_HEADER")}
    else
      url = "http://169.254.169.254/metadata/identity/oauth2/token?api-version=2018-02-01&resource=#{AUDIENCE}"
      headers = {"Metadata" => "true"}
    end
    response = Net::HTTP.get(URI(url), headers)
    JSON.parse(response).fetch("access_token")
  end

  credentials = Anthropic::WorkloadIdentityCredentials.new(
    identity_token_provider: -> { fetch_entra_token },
    federation_rule_id: ENV.fetch("ANTHROPIC_FEDERATION_RULE_ID"),
    organization_id: ENV.fetch("ANTHROPIC_ORGANIZATION_ID"),
    service_account_id: ENV.fetch("ANTHROPIC_SERVICE_ACCOUNT_ID"),
    workspace_id: ENV["ANTHROPIC_WORKSPACE_ID"]
  )
  client = Anthropic::Client.new(credentials: credentials)

  message = client.messages.create(
    model: "claude-opus-5",
    max_tokens: 1024,
    messages: [{role: "user", content: "Hello from Azure"}]
  )
  puts message.content.find { it.type == :text }.text
  ```

  ```bash CLI
  # Write the Entra-issued access token to a file the CLI can read.
  # Shown for a VM or VM Scale Set (IMDS). On App Service, Functions, or
  # Container Apps, fetch from "$IDENTITY_ENDPOINT?api-version=2019-08-01&resource=api://<APP_ID>"
  # with -H "X-IDENTITY-HEADER: $IDENTITY_HEADER" instead.
  # With multiple user-assigned identities, append &client_id=<IDENTITY_CLIENT_ID>.
  ANTHROPIC_IDENTITY_TOKEN_FILE=$(mktemp)
  trap 'rm -f "$ANTHROPIC_IDENTITY_TOKEN_FILE"' EXIT
  curl -sS -H "Metadata: true" \
    "http://169.254.169.254/metadata/identity/oauth2/token?api-version=2018-02-01&resource=api://<APP_ID>" \
    | jq -r .access_token > "$ANTHROPIC_IDENTITY_TOKEN_FILE"
  export ANTHROPIC_IDENTITY_TOKEN_FILE

  # ANTHROPIC_FEDERATION_RULE_ID, ANTHROPIC_ORGANIZATION_ID,
  # ANTHROPIC_SERVICE_ACCOUNT_ID, and ANTHROPIC_WORKSPACE_ID are read from the environment.
  ant messages create \
    --model claude-opus-5 \
    --max-tokens 1024 \
    --message '{role: user, content: "Hello from Azure"}'
  ```

### Verify the setup

From your Azure resource, run the cURL exchange shown in [Acquire and use the token](https://platform.claude.com/docs/en/manage-claude/wif-providers/azure#acquire-and-use-the-token) and confirm that `POST /v1/oauth/token` returns a `200` with an `access_token` beginning with `sk-ant-oat01-` and an `expires_in` value in seconds. If the exchange fails with the opaque `401` `authentication_error` response (message `Authentication failed`), check the [authentication history page](https://platform.claude.com/settings/workload-identity-federation?tab=history) for the deny reason, then decode the Entra token (see [Troubleshoot a failed exchange](https://platform.claude.com/docs/en/manage-claude/wif-reference#troubleshoot-a-failed-exchange) for the command) and check the most common Azure-side causes:

* **Issuer mismatch:** The registered `issuer_url` must match the token's `iss` claim exactly. A v2.0 token carries `https://login.microsoftonline.com/<TENANT_ID>/v2.0`; if the decoded `ver` claim is `1.0`, see [If your tokens are v1.0](https://platform.claude.com/docs/en/manage-claude/wif-providers/azure#if-your-tokens-are-v1-0).
* **Token lifetime:** Managed identity tokens carry up to 24 hours between `iat` and `exp`. If the issuer still has the wizard's `7500` (or the 1-hour default), raise `max_jwt_lifetime_seconds` to `86400` as described in [Configure Anthropic](https://platform.claude.com/docs/en/manage-claude/wif-providers/azure#configure-anthropic).
* **Audience mismatch:** The rule's `audience` must equal the token's `aud` exactly: the audience app registration's client ID for the v2.0 tokens this guide configures.
* **Claim name mismatch:** A rule that matches on a claim the token does not carry never passes. v1.0 tokens carry the client ID in `appid`, not `azp`; see [If your tokens are v1.0](https://platform.claude.com/docs/en/manage-claude/wif-providers/azure#if-your-tokens-are-v1-0).

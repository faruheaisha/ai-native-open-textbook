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
pageSha256: "edd0f0fe54dc5765bd1f6e8b4c07b61f932d940e45dedc1bdf2316e765f64fb2"
contentMode: "local-full"
zh: ""
---

## Use Entra Workload Identity on AKS

Use this path when your workload runs in an AKS pod. Entra Workload Identity federates a Kubernetes service account with a user-assigned managed identity: Kubernetes projects a service account token (signed by the AKS cluster's OIDC issuer) into the pod at the path in `AZURE_FEDERATED_TOKEN_FILE`. That projected token is not an Entra-issued token, so to stay on the Entra-mediated path described on this page, the workload performs a two-hop exchange: it first redeems the projected token at `https://login.microsoftonline.com/<TENANT_ID>/oauth2/v2.0/token` (federated `client_credentials` grant) for an Entra-issued access token, then passes that Entra token to the Anthropic SDK as the identity token.

  AKS pods can alternatively skip the Entra exchange and present the Kubernetes-projected service account token to Anthropic directly. That path registers your AKS cluster's OIDC issuer with Anthropic instead of your Entra tenant. See [Use WIF with Kubernetes](https://platform.claude.com/docs/en/manage-claude/wif-providers/kubernetes) for that flow.

### Configure Entra Workload Identity

    Enabling workload identity installs the `azure-workload-identity` mutating webhook for you; deploy it manually only on non-AKS clusters. Capture the cluster's OIDC issuer URL for the federated credential you create in a later step.

    ```bash
    az aks update \
      --resource-group &lt;RESOURCE_GROUP> \
      --name &lt;CLUSTER_NAME> \
      --enable-oidc-issuer \
      --enable-workload-identity

    AKS_OIDC_ISSUER=$(az aks show \
      --resource-group &lt;RESOURCE_GROUP> \
      --name &lt;CLUSTER_NAME> \
      --query oidcIssuerProfile.issuerUrl -o tsv)
    ```

    Capture two values from the identity: the **Client ID** goes into the service account annotation (and is injected into the pod as `AZURE_CLIENT_ID`), and the **Object (principal) ID** appears as the `oid` claim that your Anthropic federation rule matches.

    ```bash
    az identity create \
      --resource-group &lt;RESOURCE_GROUP> \
      --name claude-inference-identity \
      --location &lt;LOCATION>

    # Goes in the service account annotation; injected into the pod as AZURE_CLIENT_ID.
    IDENTITY_CLIENT_ID=$(az identity show \
      --resource-group &lt;RESOURCE_GROUP> \
      --name claude-inference-identity \
      --query clientId -o tsv)

    # Appears as the oid claim that your federation rule matches.
    IDENTITY_OBJECT_ID=$(az identity show \
      --resource-group &lt;RESOURCE_GROUP> \
      --name claude-inference-identity \
      --query principalId -o tsv)
    ```

    The `azure-workload-identity` webhook reads the `azure.workload.identity/client-id` annotation to inject `AZURE_CLIENT_ID` into the pod, which the samples in [Acquire and use the token](https://platform.claude.com/docs/en/manage-claude/wif-providers/azure#acquire-and-use-the-token-2) read from the environment.

    ```yaml
    apiVersion: v1
    kind: ServiceAccount
    metadata:
      name: claude-inference
      namespace: inference
      annotations:
        azure.workload.identity/client-id: &lt;IDENTITY_CLIENT_ID>
    ```

    The federated credential trusts your cluster's OIDC issuer for that specific service account. The `--audience api://AzureADTokenExchange` value is Entra's fixed audience for incoming Kubernetes service account tokens; it is unrelated to the Claude API audience you registered earlier.

    ```bash
    az identity federated-credential create \
      --resource-group &lt;RESOURCE_GROUP> \
      --identity-name claude-inference-identity \
      --name claude-inference-aks \
      --issuer "$AKS_OIDC_ISSUER" \
      --subject system:serviceaccount:inference:claude-inference \
      --audience api://AzureADTokenExchange
    ```

    The pod must carry the `azure.workload.identity/use: "true"` label and run as the annotated service account. The webhook then injects `AZURE_FEDERATED_TOKEN_FILE`, `AZURE_CLIENT_ID`, and `AZURE_TENANT_ID` into the pod. The file at `AZURE_FEDERATED_TOKEN_FILE` contains the Kubernetes-projected service account token, signed by the AKS cluster's OIDC issuer.

    ```yaml
    apiVersion: v1
    kind: Pod
    metadata:
      name: inference-worker
      namespace: inference
      labels:
        azure.workload.identity/use: "true"
    spec:
      serviceAccountName: claude-inference
      containers:
        - name: app
          image: your-registry/inference-worker:latest
    ```

    The token your Anthropic federation rule sees is not the projected file; it is the Entra-issued token returned by the `client_credentials` exchange. From inside a labeled pod, run step 1 of the cURL sample in [Acquire and use the token](https://platform.claude.com/docs/en/manage-claude/wif-providers/azure#acquire-and-use-the-token-2) and decode the result. It carries the same claim shape as the managed identity path:

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

    `sub` and `oid` are the managed identity's object ID, `aud` is the audience app registration's client ID, and `azp` is the managed identity's client ID (the value of `AZURE_CLIENT_ID`). The lifetime differs from the managed identity path: `client_credentials` tokens default to a random 60 to 90 minute window between `iat` and `exp`, not 24 hours.

### Configure Anthropic

In the Claude Console, open **Settings → Workload identity**, click **Connect workload**, and select the **Microsoft Entra** tile. The wizard walks you through registering the issuer, creating a service account, and creating a federation rule.

The wizard creates these resources for you. Use the following values whether you enter them in the wizard or send them to the [Admin API](https://platform.claude.com/docs/en/manage-claude/wif-admin-api):

**Federation issuer:** Choose **v2.0 (login.microsoftonline.com)** in the wizard's **Token issuer** selector. (The selector defaults to v1; that default exists for tenants reusing older registrations that still emit v1.0 tokens.) Entra publishes an OIDC discovery document at the per-tenant issuer URL, so use discovery mode. Each Microsoft Entra tenant you federate needs its own issuer record.

```json
{
  "name": "azure-prod-tenant",
  "issuer_url": "https://login.microsoftonline.com/<TENANT_ID>/v2.0",
  "jwks": { "type": "discovery" },
  "max_jwt_lifetime_seconds": 7500
}
```

  The Connect workload wizard's Microsoft Entra tile creates the issuer with `max_jwt_lifetime_seconds` set to `7500` (just over 2 hours), which covers the default 60 to 90 minute lifetime of `client_credentials` tokens. A tenant token-lifetime policy or Continuous Access Evaluation (CAE) can extend that lifetime. If your decoded token's `exp` minus `iat` exceeds 7500 seconds, edit the issuer in **Settings → Workload identity → Issuers** and raise `max_jwt_lifetime_seconds` to match, or exchanges fail with the opaque `401` `authentication_error` response (message `Authentication failed`). If your tenant also runs managed-identity workloads from [Use a managed identity](https://platform.claude.com/docs/en/manage-claude/wif-providers/azure#use-a-managed-identity), use that section's `86400` value, which covers both paths.

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

At runtime the pod performs the two-hop exchange: it sends the Kubernetes-projected token (the file at `AZURE_FEDERATED_TOKEN_FILE`) to Entra's token endpoint as a federated `client_credentials` assertion, then exchanges the resulting Entra access token at `POST /v1/oauth/token`. Each Anthropic SDK handles the second exchange and the refresh loop when you supply the Entra fetch as a token-provider callable, as shown in the following examples. The cURL tab shows the raw flow.

Two different client IDs appear in the samples. `<APP_ID>` is the audience app registration's client ID from [Register the token audience](https://platform.claude.com/docs/en/manage-claude/wif-providers/azure#register-the-token-audience); the scope `api://<APP_ID>/.default` asks Entra for a token addressed to that audience. `$AZURE_CLIENT_ID` is the managed identity's client ID, injected by the webhook, and identifies the caller. Do not substitute one for the other.

  If your workload already uses the Azure Identity client library, pass its token acquisition (`DefaultAzureCredential` with the scope `api://<APP_ID>/.default`) as the identity token provider instead of performing the two-hop exchange yourself. The library reads the same `AZURE_FEDERATED_TOKEN_FILE`, `AZURE_CLIENT_ID`, and `AZURE_TENANT_ID` environment variables and handles the Entra exchange.

  ```bash cURL
  # 1. Exchange the Kubernetes-projected token (at $AZURE_FEDERATED_TOKEN_FILE)
  #    for an Entra-issued JWT.
  ENTRA_JWT=$(curl -sS "https://login.microsoftonline.com/$AZURE_TENANT_ID/oauth2/v2.0/token" \
    -d grant_type=client_credentials \
    -d "client_id=$AZURE_CLIENT_ID" \
    --data-urlencode "scope=api://<APP_ID>/.default" \
    -d client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer \
    --data-urlencode "client_assertion@$AZURE_FEDERATED_TOKEN_FILE" \
    | jq -r .access_token)

  # 2. Exchange the Entra JWT for an Anthropic access token.
  ACCESS_TOKEN=$(curl -sS https://api.anthropic.com/v1/oauth/token \
    -H "content-type: application/json" \
    -d @- <<JSON | jq -r .access_token
  {
    "grant_type": "urn:ietf:params:oauth:grant-type:jwt-bearer",
    "assertion": "$ENTRA_JWT",
    "federation_rule_id": "$ANTHROPIC_FEDERATION_RULE_ID",
    "organization_id": "$ANTHROPIC_ORGANIZATION_ID",
    "service_account_id": "$ANTHROPIC_SERVICE_ACCOUNT_ID",
    "workspace_id": "$ANTHROPIC_WORKSPACE_ID"
  }
  JSON
  )

  # 3. Call the Claude API.
  curl -sS https://api.anthropic.com/v1/messages \
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
  from pathlib import Path

  import anthropic
  import requests
  from anthropic import WorkloadIdentityCredentials

  def fetch_entra_token_via_federation() -> str:
      federated_token = Path(os.environ["AZURE_FEDERATED_TOKEN_FILE"]).read_text()
      response = requests.post(
          f"https://login.microsoftonline.com/{os.environ['AZURE_TENANT_ID']}/oauth2/v2.0/token",
          data={
              "client_id": os.environ["AZURE_CLIENT_ID"],
              "grant_type": "client_credentials",
              "scope": "api://<APP_ID>/.default",
              "client_assertion_type": "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
              "client_assertion": federated_token,
          },
          timeout=5,
      )
      response.raise_for_status()
      return response.json()["access_token"]

  client = anthropic.Anthropic(
      credentials=WorkloadIdentityCredentials(
          identity_token_provider=fetch_entra_token_via_federation,
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
  import { readFile } from "node:fs/promises";

  async function fetchEntraTokenViaFederation(): Promise<string> {
    const federatedToken = await readFile(process.env.AZURE_FEDERATED_TOKEN_FILE!, "utf8");
    const response = await fetch(
      `https://login.microsoftonline.com/${process.env.AZURE_TENANT_ID}/oauth2/v2.0/token`,
      {
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          client_id: process.env.AZURE_CLIENT_ID!,
          grant_type: "client_credentials",
          scope: "api://<APP_ID>/.default",
          client_assertion_type: "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
          client_assertion: federatedToken
        })
      }
    );
    const body = (await response.json()) as { access_token: string };
    return body.access_token;
  }

  const client = new Anthropic({
    credentials: oidcFederationProvider({
      identityTokenProvider: fetchEntraTokenViaFederation,
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
  	"net/url"
  	"os"
  	"strings"

  	"github.com/anthropics/anthropic-sdk-go"
  	"github.com/anthropics/anthropic-sdk-go/option"
  )

  func fetchEntraTokenViaFederation(ctx context.Context) (string, error) {
  	federatedToken, err := os.ReadFile(os.Getenv("AZURE_FEDERATED_TOKEN_FILE"))
  	if err != nil {
  		return "", err
  	}
  	form := url.Values{
  		"client_id":             {os.Getenv("AZURE_CLIENT_ID")},
  		"grant_type":            {"client_credentials"},
  		"scope":                 {"api://<APP_ID>/.default"},
  		"client_assertion_type": {"urn:ietf:params:oauth:client-assertion-type:jwt-bearer"},
  		"client_assertion":      {strings.TrimSpace(string(federatedToken))},
  	}
  	tokenURL := "https://login.microsoftonline.com/" + os.Getenv("AZURE_TENANT_ID") + "/oauth2/v2.0/token"
  	req, err := http.NewRequestWithContext(ctx, http.MethodPost, tokenURL, strings.NewReader(form.Encode()))
  	if err != nil {
  		return "", err
  	}
  	req.Header.Set("content-type", "application/x-www-form-urlencoded")
  	resp, err := http.DefaultClient.Do(req)
  	if err != nil {
  		return "", err
  	}
  	defer resp.Body.Close()
  	var body struct {
  		AccessToken string `json:"access_token"`
  	}
  	if err := json.NewDecoder(resp.Body).Decode(&body); err != nil {
  		return "", err
  	}
  	return body.AccessToken, nil
  }

  func main() {
  	client := anthropic.NewClient(
  		option.WithFederationTokenProvider(option.IdentityTokenFunc(fetchEntraTokenViaFederation), option.FederationOptions{
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
  IdentityTokenProvider fetchEntraTokenViaFederation = () -> {
      try {
          var form = Map.of(
                          "client_id", System.getenv("AZURE_CLIENT_ID"),
                          "grant_type", "client_credentials",
                          "scope", "api://<APP_ID>/.default",
                          "client_assertion_type", "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
                          "client_assertion", Files.readString(Path.of(System.getenv("AZURE_FEDERATED_TOKEN_FILE"))))
                  .entrySet().stream()
                  .map(entry -> entry.getKey() + "=" + URLEncoder.encode(entry.getValue(), UTF_8))
                  .collect(Collectors.joining("&"));
          var request = HttpRequest.newBuilder(URI.create(
                          "https://login.microsoftonline.com/" + System.getenv("AZURE_TENANT_ID") + "/oauth2/v2.0/token"))
                  .header("content-type", "application/x-www-form-urlencoded")
                  .POST(HttpRequest.BodyPublishers.ofString(form))
                  .build();
          var response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
          return new ObjectMapper().readTree(response.body()).get("access_token").asText();
      } catch (Exception e) {
          throw new RuntimeException(e);
      }
  };

  AnthropicClient client = AnthropicOkHttpClient.builder()
          .federationTokenProvider(
                  fetchEntraTokenViaFederation,
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
      IdentityTokenProvider = new EntraFederationTokenProvider(),
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

  class EntraFederationTokenProvider : IIdentityTokenProvider
  {
      private static readonly HttpClient Http = new();

      public async Task<string> GetIdentityTokenAsync(CancellationToken ct = default)
      {
          var federatedToken = await File.ReadAllTextAsync(
              Environment.GetEnvironmentVariable("AZURE_FEDERATED_TOKEN_FILE")!, ct);
          var tenantId = Environment.GetEnvironmentVariable("AZURE_TENANT_ID");
          var form = new FormUrlEncodedContent(new Dictionary<string, string>
          {
              ["client_id"] = Environment.GetEnvironmentVariable("AZURE_CLIENT_ID")!,
              ["grant_type"] = "client_credentials",
              ["scope"] = "api://<APP_ID>/.default",
              ["client_assertion_type"] = "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
              ["client_assertion"] = federatedToken,
          });
          var response = await Http.PostAsync(
              $"https://login.microsoftonline.com/{tenantId}/oauth2/v2.0/token", form, ct);
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

  function fetchEntraTokenViaFederation(): string
  {
      $ch = curl_init('https://login.microsoftonline.com/' . getenv('AZURE_TENANT_ID') . '/oauth2/v2.0/token');
      curl_setopt_array($ch, [
          CURLOPT_RETURNTRANSFER => true,
          CURLOPT_POSTFIELDS => http_build_query([
              'client_id' => getenv('AZURE_CLIENT_ID'),
              'grant_type' => 'client_credentials',
              'scope' => 'api://<APP_ID>/.default',
              'client_assertion_type' => 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
              'client_assertion' => file_get_contents(getenv('AZURE_FEDERATED_TOKEN_FILE')),
          ]),
      ]);
      $body = json_decode(curl_exec($ch), true);
      curl_close($ch);
      return $body['access_token'];
  }

  $client = new Client(
      credentials: new WorkloadIdentityCredentials(
          identityTokenProvider: fetchEntraTokenViaFederation(...),
          federationRuleId: getenv('ANTHROPIC_FEDERATION_RULE_ID'),
          organizationId: getenv('ANTHROPIC_ORGANIZATION_ID'),
          serviceAccountId: getenv('ANTHROPIC_SERVICE_ACCOUNT_ID'),
          workspaceId: getenv('ANTHROPIC_WORKSPACE_ID') ?: null,
      ),
  );

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

  def fetch_entra_token_via_federation
    tenant_id = ENV.fetch("AZURE_TENANT_ID")
    federated_token = File.read(ENV.fetch("AZURE_FEDERATED_TOKEN_FILE"))
    response = Net::HTTP.post_form(
      URI("https://login.microsoftonline.com/#{tenant_id}/oauth2/v2.0/token"),
      "client_id" => ENV.fetch("AZURE_CLIENT_ID"),
      "grant_type" => "client_credentials",
      "scope" => "api://<APP_ID>/.default",
      "client_assertion_type" => "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
      "client_assertion" => federated_token
    )
    JSON.parse(response.body).fetch("access_token")
  end

  client = Anthropic::Client.new(
    credentials: Anthropic::WorkloadIdentityCredentials.new(
      identity_token_provider: -> { fetch_entra_token_via_federation },
      federation_rule_id: ENV.fetch("ANTHROPIC_FEDERATION_RULE_ID"),
      organization_id: ENV.fetch("ANTHROPIC_ORGANIZATION_ID"),
      service_account_id: ENV.fetch("ANTHROPIC_SERVICE_ACCOUNT_ID"),
      workspace_id: ENV["ANTHROPIC_WORKSPACE_ID"]
    )
  )

  message = client.messages.create(
    model: "claude-opus-5",
    max_tokens: 1024,
    messages: [{role: "user", content: "Hello from Azure"}]
  )
  puts message.content.find { it.type == :text }.text
  ```

  ```bash CLI
  # 1. Exchange the Kubernetes-projected token for an Entra-issued access
  # token and write it to a temp file the CLI can read.
  ANTHROPIC_IDENTITY_TOKEN_FILE=$(mktemp)
  trap 'rm -f "$ANTHROPIC_IDENTITY_TOKEN_FILE"' EXIT
  curl -sS "https://login.microsoftonline.com/$AZURE_TENANT_ID/oauth2/v2.0/token" \
    -d client_id="$AZURE_CLIENT_ID" \
    -d grant_type=client_credentials \
    --data-urlencode "scope=api://<APP_ID>/.default" \
    -d client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer \
    --data-urlencode client_assertion@"$AZURE_FEDERATED_TOKEN_FILE" \
    | jq -r .access_token > "$ANTHROPIC_IDENTITY_TOKEN_FILE"
  export ANTHROPIC_IDENTITY_TOKEN_FILE

  # 2. Call the Claude API. ANTHROPIC_FEDERATION_RULE_ID,
  # ANTHROPIC_ORGANIZATION_ID, ANTHROPIC_SERVICE_ACCOUNT_ID, and ANTHROPIC_WORKSPACE_ID are read
  # from the environment.
  ant messages create \
    --model claude-opus-5 \
    --max-tokens 1024 \
    --message '{role: user, content: "Hello from Azure"}'
  ```

### Verify the setup

From inside a labeled pod, run the cURL exchange shown in [Acquire and use the token](https://platform.claude.com/docs/en/manage-claude/wif-providers/azure#acquire-and-use-the-token-2) and confirm that `POST /v1/oauth/token` returns a `200` with an `access_token` beginning with `sk-ant-oat01-` and an `expires_in` value in seconds. If the exchange fails with the opaque `401` `authentication_error` response (message `Authentication failed`), check the [authentication history page](https://platform.claude.com/settings/workload-identity-federation?tab=history) for the deny reason, then decode the Entra-issued token from step 1 (see [Troubleshoot a failed exchange](https://platform.claude.com/docs/en/manage-claude/wif-reference#troubleshoot-a-failed-exchange) for the command) and check the most common Azure-side causes:

* **Issuer mismatch:** The registered `issuer_url` must match the token's `iss` claim exactly. A v2.0 token carries `https://login.microsoftonline.com/<TENANT_ID>/v2.0`; if the decoded `ver` claim is `1.0`, see [If your tokens are v1.0](https://platform.claude.com/docs/en/manage-claude/wif-providers/azure#if-your-tokens-are-v1-0).
* **Token lifetime:** If a tenant token-lifetime policy or CAE extends the `client_credentials` token past 7500 seconds, raise the issuer's `max_jwt_lifetime_seconds` as described in [Configure Anthropic](https://platform.claude.com/docs/en/manage-claude/wif-providers/azure#configure-anthropic-2).
* **Audience mismatch:** The rule's `audience` must equal the token's `aud` exactly: the audience app registration's client ID for the v2.0 tokens this guide configures.
* **Claim name mismatch:** A rule that matches on a claim the token does not carry never passes. v1.0 tokens carry the client ID in `appid`, not `azp`; see [If your tokens are v1.0](https://platform.claude.com/docs/en/manage-claude/wif-providers/azure#if-your-tokens-are-v1-0).

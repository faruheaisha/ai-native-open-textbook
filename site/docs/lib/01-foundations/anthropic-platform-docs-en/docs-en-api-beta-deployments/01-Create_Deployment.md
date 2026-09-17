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
sourceRel: "docs/en/api/beta/deployments.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/api/beta/deployments.md"
sourceSha256: "ec497d87ec4e05f5253f557864ee60e42923543a12ff1c6347fd30d6f1331276"
pageSha256: "2a2e4da58b1377b8969eae2cf074002e060b66672ffc6eb70589e1bb7707449b"
contentMode: "local-full"
zh: ""
---

## Create Deployment

**POST** `/v1/deployments`

Create Deployment

### Headers

- `"anthropic-beta": optional array of AnthropicBeta`

  Optional header to specify the beta version(s) you want to use.

  - `string`

  - `"message-batches-2024-09-24" or "prompt-caching-2024-07-31" or "computer-use-2024-10-22" or 42 more`

    - `"message-batches-2024-09-24"`

    - `"prompt-caching-2024-07-31"`

    - `"computer-use-2024-10-22"`

    - `"computer-use-2025-01-24"`

    - `"pdfs-2024-09-25"`

    - `"token-counting-2024-11-01"`

    - `"token-efficient-tools-2025-02-19"`

    - `"output-128k-2025-02-19"`

    - `"files-api-2025-04-14"`

    - `"mcp-client-2025-04-04"`

    - `"mcp-client-2025-11-20"`

    - `"dev-full-thinking-2025-05-14"`

    - `"interleaved-thinking-2025-05-14"`

    - `"code-execution-2025-05-22"`

    - `"extended-cache-ttl-2025-04-11"`

    - `"context-1m-2025-08-07"`

    - `"context-management-2025-06-27"`

    - `"model-context-window-exceeded-2025-08-26"`

    - `"skills-2025-10-02"`

    - `"fast-mode-2026-02-01"`

    - `"output-300k-2026-03-24"`

    - `"user-profiles-2026-03-24"`

    - `"user-profiles-2026-08-18"`

    - `"user-profiles-2026-09-04"`

    - `"advisor-tool-2026-03-01"`

    - `"managed-agents-2026-04-01"`

    - `"cache-diagnosis-2026-04-07"`

    - `"dreaming-2026-04-21"`

    - `"thinking-token-count-2026-05-13"`

    - `"server-side-fallback-2026-06-01"`

    - `"server-side-fallback-2026-07-01"`

    - `"fallback-credit-2026-06-01"`

    - `"fallback-credit-2026-07-01"`

    - `"agent-memory-2026-07-22"`

    - `"mid-conversation-tool-changes-2026-07-01"`

    - `"compact-2026-01-12"`

    - `"computer-use-2025-11-24"`

    - `"mcp-tunnels-2026-06-22"`

    - `"structured-outputs-2025-11-13"`

    - `"task-budgets-2026-03-13"`

    - `"thinking-display-updates-2026-08-18"`

    - `"ce-user-management-2026-07-13"`

    - `"mid-conversation-output-config-2026-07-01"`

    - `"thinking-binding-controls-2026-08-01"`

    - `"mid-conversation-system-clear-at-2026-08-21"`

- `"anthropic-workspace-id": optional string`

### Body parameters

- `agent: string or BetaManagedAgentsAgentParams`

  Agent to deploy. Accepts the `agent` ID string, which pins the latest version, or an `agent` object with both id and version specified. The agent must exist and not be archived.

  - `string`

  - `BetaManagedAgentsAgentParams object`

    Specification for an Agent. Provide a specific `version` or use the short-form `agent="agent_id"` for the most recent version

    - `type: "agent"`

    - `id: string`

      The `agent` ID.

      minLength: 1, maxLength: 128

    - `version: optional number`

      The specific `agent` version to use. Omit to use the latest version. Must be at least 1 if specified.

      format: int32

- `environment_id: string`

  ID of the `environment` defining the container configuration for sessions created from this deployment.

  minLength: 1, maxLength: 128

- `initial_events: array of BetaManagedAgentsDeploymentInitialEventParams`

  Events to send to each session immediately after creation. At least 1, maximum 50.

  - `BetaManagedAgentsUserMessageEventParams object`

    Parameters for sending a user message to the session.

    - `type: "user.message"`

    - `content: array of BetaManagedAgentsTextBlock or BetaManagedAgentsImageBlock or BetaManagedAgentsDocumentBlock or BetaManagedAgentsRedactedBlock`

      Array of content blocks for the user message.

      - `BetaManagedAgentsTextBlock object`

        Regular text content.

        - `type: "text"`

        - `text: string`

          The text content.

          minLength: 1

      - `BetaManagedAgentsImageBlock object`

        Image content specified directly as base64 data or as a reference via a URL.

        - `type: "image"`

        - `source: BetaManagedAgentsBase64ImageSource or BetaManagedAgentsURLImageSource or BetaManagedAgentsFileImageSource`

          Union type for image source variants.

          - `BetaManagedAgentsBase64ImageSource object`

            Base64-encoded image data.

            - `type: "base64"`

            - `data: string`

              Base64-encoded image data.

              minLength: 1

            - `media_type: string`

              MIME type of the image (e.g., "image/png", "image/jpeg", "image/gif", "image/webp").

              minLength: 1

          - `BetaManagedAgentsURLImageSource object`

            Image referenced by URL.

            - `type: "url"`

            - `url: string`

              URL of the image to fetch.

              minLength: 1

          - `BetaManagedAgentsFileImageSource object`

            Image referenced by file ID.

            - `type: "file"`

            - `file_id: string`

              ID of a previously uploaded file.

              minLength: 1

      - `BetaManagedAgentsDocumentBlock object`

        Document content, either specified directly as base64 data, as text, or as a reference via a URL.

        - `type: "document"`

        - `source: BetaManagedAgentsBase64DocumentSource or BetaManagedAgentsPlainTextDocumentSource or BetaManagedAgentsURLDocumentSource or BetaManagedAgentsFileDocumentSource`

          Union type for document source variants.

          - `BetaManagedAgentsBase64DocumentSource object`

            Base64-encoded document data.

            - `type: "base64"`

            - `data: string`

              Base64-encoded document data.

              minLength: 1

            - `media_type: string`

              MIME type of the document (e.g., "application/pdf").

              minLength: 1

          - `BetaManagedAgentsPlainTextDocumentSource object`

            Plain text document content.

            - `type: "text"`

            - `data: string`

              The plain text content.

              minLength: 1

            - `media_type: "text/plain"`

              MIME type of the text content. Must be "text/plain".

          - `BetaManagedAgentsURLDocumentSource object`

            Document referenced by URL.

            - `type: "url"`

            - `url: string`

              URL of the document to fetch.

              minLength: 1

          - `BetaManagedAgentsFileDocumentSource object`

            Document referenced by file ID.

            - `type: "file"`

            - `file_id: string`

              ID of a previously uploaded file.

              minLength: 1

        - `context: optional string or null`

          Additional context about the document for the model.

        - `title: optional string or null`

          The title of the document.

      - `BetaManagedAgentsRedactedBlock object`

        Placeholder for content withheld by Anthropic model policy.

        - `type: "redacted"`

  - `BetaManagedAgentsUserDefineOutcomeEventParams object`

    Parameters for defining an outcome the agent should work toward. The agent begins work on receipt.

    - `type: "user.define_outcome"`

    - `description: string`

      What the agent should produce. This is the task specification.

    - `rubric: BetaManagedAgentsFileRubricParams or BetaManagedAgentsTextRubricParams`

      Rubric for grading the quality of an outcome.

      - `BetaManagedAgentsFileRubricParams object`

        Rubric referenced by a file uploaded via the Files API.

        - `type: "file"`

        - `file_id: string`

          ID of the rubric file.

      - `BetaManagedAgentsTextRubricParams object`

        Rubric content provided inline as text.

        - `type: "text"`

        - `content: string`

          Rubric content. Plain text or markdown — the grader treats it as freeform text. Maximum 262144 characters.

          maxLength: 262144

    - `max_iterations: optional number or null`

      Eval→revision cycles before giving up. Default 3, max 20.

      format: int32

  - `BetaManagedAgentsSystemMessageEventParams object`

    Privileged context for the accompanying turn and all subsequent turns, appended to the session's system context as a `role: "system"` turn rather than replacing the top-level system prompt. At most one per request: it must be the final event and immediately follow the `user.message`, `user.tool_result`, or `user.custom_tool_result` it accompanies. Only supported on models that accept mid-conversation system messages.

    - `type: "system.message"`

    - `content: array of BetaManagedAgentsSystemContentBlock`

      System content blocks to append. Text-only.

      - `type: "text"`

      - `text: string`

        The text content.

        minLength: 1

- `name: string`

  Human-readable name for the deployment.

  minLength: 1, maxLength: 256

- `budget: optional BetaManagedAgentsBudgetLimit or null`

  A hard spend ceiling. The session stops issuing new model requests once the tracked list cost reaches `max_list_cost`.

  - `type: "limit"`

  - `max_list_cost: BetaMonetaryAmount`

    A monetary amount in a specific currency.

    - `amount: string`

      Amount in minor units of the currency, as an integer decimal string with no leading zeros: "2500" is $25.00 and "50" is fifty cents. A string rather than a number so no float rounding is ever applied.

    - `currency: BetaCurrency`

      Uppercase ISO-4217 currency code. `USD` is the only currency currently supported; the accepted set is closed and grows only when a new currency is priced.

- `description: optional string or null`

  Description of what the deployment does.

  maxLength: 2048

- `metadata: optional map[string]`

  Arbitrary key-value metadata. Maximum 16 pairs, keys up to 64 chars, values up to 512 chars.

- `resources: optional array of BetaManagedAgentsGitHubRepositoryResourceParams or BetaManagedAgentsFileResourceParams or BetaManagedAgentsMemoryStoreResourceParam`

  Resources (e.g. repositories, files) to mount into each session's container. Maximum 500.

  - `BetaManagedAgentsGitHubRepositoryResourceParams object`

    Mount a GitHub repository into the session's container.

    - `type: "github_repository"`

    - `url: string`

      Github URL of the repository

      minLength: 1, maxLength: 2048

    - `authorization_token: optional string`

      GitHub authorization token used to clone the repository. Required for private repositories; optional for public ones.

      minLength: 1, maxLength: 4096

    - `checkout: optional BetaManagedAgentsBranchCheckout or BetaManagedAgentsCommitCheckout or null`

      Branch or commit to check out. Defaults to the repository's default branch.

      - `BetaManagedAgentsBranchCheckout object`

        - `type: "branch"`

        - `name: string`

          Branch name to check out.

          minLength: 1, maxLength: 255

      - `BetaManagedAgentsCommitCheckout object`

        - `type: "commit"`

        - `sha: string`

          Full commit SHA to check out.

          minLength: 7, maxLength: 64

    - `mount_path: optional string or null`

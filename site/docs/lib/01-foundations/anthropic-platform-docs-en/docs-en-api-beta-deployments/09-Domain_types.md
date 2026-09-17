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
pageSha256: "11499d8191b81a8ba54cdc7145fcb264209a8dd72c80c73bce90a9b474a24fab"
contentMode: "local-full"
zh: ""
---

## Domain types

### Beta Managed Agents Agent Archived Deployment Paused Reason Error

- `BetaManagedAgentsAgentArchivedDeploymentPausedReasonError object`

  The deployment's agent was archived.

  - `type: "agent_archived_error"`

### Beta Managed Agents Cron Schedule

- `BetaManagedAgentsCronSchedule object`

  5-field POSIX cron schedule with computed runtime timestamps.

  - `type: "cron"`

  - `expression: string`

    5-field POSIX cron expression: minute hour day-of-month month day-of-week (e.g., "0 9 * * 1-5" for weekdays at 9am). Day-of-week is 0-7 where 0 and 7 both mean Sunday. Extended cron syntax - seconds or year fields, and the special characters L, W, #, and ? - is not supported, nor are predefined shortcuts (@daily).

    minLength: 1, maxLength: 256

  - `timezone: string`

    IANA timezone identifier (e.g., "America/Los_Angeles", "UTC").

    minLength: 1

  - `last_run_at: optional string or null`

    A timestamp in RFC 3339 format

    format: date-time

  - `upcoming_runs_at: optional array of string`

    Up to 5 timestamps of upcoming cron occurrences. Non-empty for active and paused deployments (reflects what the schedule would do if unpaused); empty once the deployment is archived (`archived_at` set). Each fire is offset by a small per-schedule jitter, so a run will actually start at or shortly after its listed time.

### Beta Managed Agents Cron Schedule Params

- `BetaManagedAgentsCronScheduleParams object`

  5-field POSIX cron schedule. Literal wall-clock matching in the configured timezone.

  - `type: "cron"`

  - `expression: string`

    5-field POSIX cron expression: minute hour day-of-month month day-of-week (e.g., "0 9 * * 1-5" for weekdays at 9am). Day-of-week is 0-7 where 0 and 7 both mean Sunday. Extended cron syntax - seconds or year fields, and the special characters L, W, #, and ? - is not supported, nor are predefined shortcuts (@daily).

    minLength: 1, maxLength: 256

  - `timezone: string`

    Required. IANA timezone identifier (e.g., "America/Los_Angeles", "UTC"). Validated against the IANA timezone database.

    minLength: 1

### Beta Managed Agents Deployment

- `BetaManagedAgentsDeployment object`

  A deployment is a configured instance of an agent — it binds the agent to everything needed to run it autonomously: an environment, credentials, initial events, and an optional schedule.

  - `type: "deployment"`

  - `id: string`

    Unique identifier for this deployment.

  - `agent: BetaManagedAgentsAgentReference`

    A resolved agent reference with a concrete version.

    - `type: "agent"`

    - `id: string`

    - `version: number`

      format: int32

  - `archived_at: string or null`

    A timestamp in RFC 3339 format

    format: date-time

  - `created_at: string`

    A timestamp in RFC 3339 format

    format: date-time

  - `description: string or null`

    Description of what the deployment does.

  - `environment_id: string`

    ID of the `environment` where sessions run.

  - `initial_events: array of BetaManagedAgentsDeploymentInitialEvent`

    Events sent to each session immediately after creation.

    - `BetaManagedAgentsDeploymentUserMessageEvent object`

      A user message sent to the session.

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

    - `BetaManagedAgentsDeploymentUserDefineOutcomeEvent object`

      An outcome the agent should work toward. The agent begins work on receipt.

      - `type: "user.define_outcome"`

      - `description: string`

        What the agent should produce. This is the task specification.

      - `rubric: BetaManagedAgentsFileRubric or BetaManagedAgentsTextRubric`

        Rubric for grading the quality of an outcome.

        - `BetaManagedAgentsFileRubric object`

          Rubric referenced by a file uploaded via the Files API.

          - `type: "file"`

          - `file_id: string`

            ID of the rubric file.

        - `BetaManagedAgentsTextRubric object`

          Rubric content provided inline as text.

          - `type: "text"`

          - `content: string`

            Rubric content. Plain text or markdown — the grader treats it as freeform text.

      - `max_iterations: optional number or null`

        Eval→revision cycles before giving up. Default 3, max 20.

        format: int32

    - `BetaManagedAgentsDeploymentSystemMessageEvent object`

      Privileged context for the accompanying turn and all subsequent turns, appended to the session's system context as a `role: "system"` turn rather than replacing the top-level system prompt.

      - `type: "system.message"`

      - `content: array of BetaManagedAgentsSystemContentBlock`

        System content blocks to append. Text-only.

        - `type: "text"`

        - `text: string`

          The text content.

          minLength: 1

  - `metadata: map[string]`

    Arbitrary key-value metadata. Maximum 16 pairs.

  - `name: string`

    Human-readable name.

  - `paused_reason: BetaManagedAgentsDeploymentPausedReason or null`

    Why a deployment is paused. Non-null exactly when `status` is `paused`.

    - `BetaManagedAgentsManualDeploymentPausedReason object`

      The caller invoked the pause endpoint on the deployment.

      - `type: "manual"`

    - `BetaManagedAgentsErrorDeploymentPausedReason object`

      A scheduled fire recorded a failed run whose error auto-pauses the deployment.

      - `type: "error"`

      - `error: BetaManagedAgentsDeploymentPausedReasonError`

        The error that triggered an auto-pause. Matches the failed run's `error.type`.

        - `BetaManagedAgentsEnvironmentArchivedDeploymentPausedReasonError object`

          The deployment's environment was archived.

          - `type: "environment_archived_error"`

        - `BetaManagedAgentsAgentArchivedDeploymentPausedReasonError object`

          The deployment's agent was archived.

          - `type: "agent_archived_error"`

        - `BetaManagedAgentsEnvironmentNotFoundDeploymentPausedReasonError object`

          The deployment's environment no longer exists.

          - `type: "environment_not_found_error"`

        - `BetaManagedAgentsVaultNotFoundDeploymentPausedReasonError object`

          A vault referenced by the deployment no longer exists.

          - `type: "vault_not_found_error"`

        - `BetaManagedAgentsFileNotFoundDeploymentPausedReasonError object`

          A file resource referenced by the deployment no longer exists.

          - `type: "file_not_found_error"`

        - `BetaManagedAgentsSessionResourceNotFoundDeploymentPausedReasonError object`

          A referenced resource no longer exists and its kind was not reported.

          - `type: "session_resource_not_found_error"`

        - `BetaManagedAgentsWorkspaceArchivedDeploymentPausedReasonError object`

          The deployment's workspace was archived.

          - `type: "workspace_archived_error"`

        - `BetaManagedAgentsOrganizationDisabledDeploymentPausedReasonError object`

          The deployment's organization is disabled.

          - `type: "organization_disabled_error"`

        - `BetaManagedAgentsMemoryStoreArchivedDeploymentPausedReasonError object`

          A memory store referenced by the deployment is archived.

          - `type: "memory_store_archived_error"`

        - `BetaManagedAgentsSkillNotFoundDeploymentPausedReasonError object`

          A skill referenced by the deployment's agent no longer exists.

          - `type: "skill_not_found_error"`

        - `BetaManagedAgentsVaultArchivedDeploymentPausedReasonError object`

          A vault referenced by the deployment is archived.

          - `type: "vault_archived_error"`

        - `BetaManagedAgentsUnknownDeploymentPausedReasonError object`

          An unrecognized error auto-paused the deployment. A fallback variant; matches a run whose `error.type` is `unknown_error`.

          - `type: "unknown_error"`

        - `BetaManagedAgentsSelfHostedResourcesUnsupportedDeploymentPausedReasonError object`

          The deployment configures resources, but its environment is self-hosted and cannot mount them.

          - `type: "self_hosted_resources_unsupported_error"`

        - `BetaManagedAgentsMCPEgressBlockedDeploymentPausedReasonError object`

          An MCP server host used by the deployment's agent is blocked by the environment's network policy.

          - `type: "mcp_egress_blocked_error"`

  - `resources: array of BetaManagedAgentsSessionResourceConfig`

    Resources attached to sessions created from this deployment. Echoes the input minus write-only credentials.

    - `BetaManagedAgentsGitHubRepositoryResourceConfig object`

      A GitHub repository mounted into each session's container. The authorization token is write-only and never returned.

      - `type: "github_repository"`

      - `url: string`

        Github URL of the repository

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

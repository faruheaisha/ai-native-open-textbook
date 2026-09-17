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
sourceRel: "api/docs/guides/your-data.md"
rawUrl: "/raw/01-foundations/openai-api-docs-en/api/docs/guides/your-data.md"
sourceSha256: "9798847c992fcd27535b8b883568a2b793ab86d0097afa6cc34e383c05e86e94"
pageSha256: "32a555e3beef8be53c1a886b3d87e99ab4f00f411d4e95085d7b441acb57c3d5"
contentMode: "local-full"
zh: ""
---

## Data retention controls for abuse monitoring

Abuse monitoring logs may contain certain customer content, such as prompts and responses, as well as metadata derived from that customer content, such as classifier outputs. By default, abuse monitoring logs are generated for all API feature usage and retained for up to 30 days, unless longer retention is required by law, or is reasonably necessary to protect our services or any third party from harm.

Eligible customers may have their customer content excluded from these abuse monitoring logs, subject to the limitations below, by getting approved for the [Zero Data Retention](#zero-data-retention) or [Modified Abuse Monitoring](#modified-abuse-monitoring) controls. Currently, these controls are subject to prior approval by OpenAI and acceptance of additional requirements. Approved customers may select between Modified Abuse Monitoring or Zero Data Retention for their API Organization or project.

Customers who enable Modified Abuse Monitoring or Zero Data Retention are responsible for ensuring their users abide by OpenAI's policies for safe and responsible use of AI and complying with any moderation and reporting requirements under applicable law.

Get in touch with our [sales team](https://openai.com/contact-sales) to learn more about these offerings and inquire about eligibility.

### Modified Abuse Monitoring

Modified Abuse Monitoring excludes customer content (other than image and file inputs in rare cases, as described [below](https://developers.openai.com/api/docs/guides/your-data#image-and-file-inputs)) from abuse monitoring logs across all API endpoints, while still allowing the customer to take advantage of the full capabilities of the OpenAI platform.

### Zero Data Retention

Zero Data Retention excludes customer content from abuse monitoring logs in the same way as Modified Abuse Monitoring.

Additionally, Zero Data Retention changes some endpoint behavior: the `store` parameter for `/v1/responses` and `v1/chat/completions` will always be treated as `false`, even if the request attempts to set the value to `true`.

Besides those specific behavior changes, the endpoints and capabilities listed as No for Zero Data Retention Eligible in the table below may still store application state, even if Zero Data Retention is enabled.

### Eyes Off

For customers approved for Zero Data Retention or Modified Abuse Monitoring, we reserve the right to make models ineligible for Zero Data Retention or Modified Abuse Monitoring for specific customers, as notified in advance to the impacted customers in writing. In this instance, customer content will be retained in abuse monitoring logs, but such content will be excluded from human review unless required by applicable law. For customers who have executed an OpenAI Business Associate and Healthcare Addendum, once your org ID is provisioned with Eyes Off, BAA-eligible endpoints can be used for processing PHI, even if data is retained.

### Safety Retention

For customers approved for Zero Data Retention or Modified Abuse Monitoring, we reserve the right to make models ineligible for Zero Data Retention or Modified Abuse Monitoring for specific customers if reasonably necessary to investigate or prevent severe risk activity, as notified in advance to the impacted customers in writing. In this instance, we may retain and human review customer content when using these models that our classifiers detect as potentially violating our [Usage Policies](https://openai.com/policies/usage-policies/) or your agreement. Otherwise retention will not be affected. For customers who have executed an OpenAI Business Associate and Healthcare Addendum, once your org ID is provisioned with Safety Retention, BAA-eligible endpoints can be used for processing PHI, even if data is retained.

### Configuring data retention controls

Once your organization has been approved for data retention controls, you'll see a **Data Retention** tab within [Settings → Organization → Data controls](https://platform.openai.com/settings/organization/data-controls/data-retention). From that tab, you can configure data retention controls at both the organization and project level.

- **Organization-level controls:** Choose between Zero Data Retention or Modified Abuse Monitoring for your entire organization.
- **Project-level controls:** For each project, select `default` to inherit the organization-level setting, explicitly pick Zero Data Retention or Modified Abuse Monitoring, or select **None** to disable these controls for that project.

### Storage requirements and retention controls per endpoint

The table below indicates when application state is stored for each endpoint. Zero Data Retention eligible endpoints do not retain any customer content for application state, subject to the limitations below. Zero Data Retention ineligible endpoints or capabilities may retain application state when used, even if you have Zero Data Retention enabled.

| Endpoint                   | Data used for training | Abuse monitoring retention |  Application state retention   |  Zero Data Retention eligible  | Eyes Off and Safety Retention eligible |
| -------------------------- | :--------------------: | :------------------------: | :----------------------------: | :----------------------------: | :------------------------------------: |
| `/v1/chat/completions`     |           No           |          30 days           | None, see below for exceptions | Yes, see below for limitations |     Yes, see below for limitations     |
| `/v1/responses`            |           No           |          30 days           | None, see below for exceptions | Yes, see below for limitations |     Yes, see below for limitations     |
| `/v1/conversations`        |           No           |       Until deleted        |         Until deleted          |               No               |                   No                   |
| `/v1/conversations/items`  |           No           |       Until deleted        |         Until deleted          |               No               |                   No                   |
| `/v1/chatkit/threads`      |           No           |       Until deleted        |         Until deleted          |               No               |                   No                   |
| `/v1/agents`               |           No           |          30 days           |         Until deleted          |               No               |                   No                   |
| `/v1/assistants`           |           No           |          30 days           |         Until deleted          |               No               |                   No                   |
| `/v1/threads`              |           No           |          30 days           |         Until deleted          |               No               |                   No                   |
| `/v1/threads/messages`     |           No           |          30 days           |         Until deleted          |               No               |                   No                   |
| `/v1/threads/runs`         |           No           |          30 days           |         Until deleted          |               No               |                   No                   |
| `/v1/threads/runs/steps`   |           No           |          30 days           |         Until deleted          |               No               |                   No                   |
| `/v1/vector_stores`        |           No           |          30 days           |         Until deleted          |               No               |                   No                   |
| `/v1/images/generations`   |           No           |          30 days           |              None              | Yes, see below for limitations |                   No                   |
| `/v1/images/edits`         |           No           |          30 days           |              None              | Yes, see below for limitations |                   No                   |
| `/v1/embeddings`           |           No           |          30 days           |              None              |              Yes               |                   No                   |
| `/v1/audio/transcriptions` |           No           |            None            |              None              |              Yes               |                   No                   |
| `/v1/audio/translations`   |           No           |            None            |              None              |              Yes               |                   No                   |
| `/v1/audio/speech`         |           No           |          30 days           |              None              |              Yes               |                   No                   |
| `/v1/files`                |           No           |          30 days           |        Until deleted\*         |               No               |                   No                   |
| `/v1/fine_tuning/jobs`     |           No           |          30 days           |         Until deleted          |               No               |                   No                   |
| `/v1/evals`                |           No           |          30 days           |         Until deleted          |               No               |                   No                   |
| `/v1/batches`              |           No           |          30 days           |         Until deleted          |               No               |                   No                   |
| `/v1/moderations`          |           No           |            None            |              None              |              Yes               |                   No                   |
| `/v1/completions`          |           No           |          30 days           |              None              |              Yes               |                   No                   |
| `/v1/live/sessions`        |           No           |          30 days           |   None, or 30 days if stored   |  Yes, with limitations below   |                   No                   |
| `/v1/realtime`             |           No           |          30 days           |              None              |              Yes               |                   No                   |
| `/v1/videos`               |           No           |          30 days           |              None              |               No               |                   No                   |

#### `/v1/chat/completions`

- Audio outputs application state is stored for 1 hour to enable [multi-turn conversations](https://developers.openai.com/api/docs/guides/audio).
- When Zero Data Retention is enabled for an organization, the `store` parameter will always be treated as `false`, even if the request attempts to set the value to `true`.
- See [image and file inputs](#image-and-file-inputs).
- Prompt caching may store encrypted key/value tensors in GPU-local storage as application state. This data is stored on the local GPU machines and is not retained after the 24-hour expiration. For `gpt-5.5` and `gpt-5.5-pro`, setting `prompt_cache_retention` to `in_memory` returns an error. For GPT-5.6 models and later model families, `prompt_cache_options.ttl` controls the minimum cache lifetime, not this maximum application-state retention period. To learn more, see the [prompt caching guide](https://developers.openai.com/api/docs/guides/prompt-caching#prompt-cache-retention).

#### `/v1/responses`

- Except as noted below, the Responses API has a 30 day Application State retention period by default, or when the `store` parameter is set to `true`. In those cases, response data will be stored for at least 30 days.
- When Zero Data Retention is enabled for an organization, the `store` parameter will always be treated as `false`, even if the request attempts to set the value to `true`.
- Background mode stores response data to disk for roughly 10 minutes to enable polling. For projects using [Modified Abuse Monitoring](#modified-abuse-monitoring), including enhanced Modified Abuse Monitoring, foreground requests follow standard retention when `store` is omitted or set to `true`. Background responses follow the standard retention period only when the request explicitly sets `store=true`. If `store` is omitted or set to `false` for a background request, the response is deleted after the temporary polling period.
- Audio outputs application state is stored for 1 hour to enable [multi-turn conversations](https://developers.openai.com/api/docs/guides/audio).
- See [image and file inputs](#image-and-file-inputs).
- MCP servers (used with the [remote MCP server tool](https://developers.openai.com/api/docs/guides/tools-connectors-mcp)) are third-party services, and data sent to an MCP server is subject to their data retention policies.
- Hosted containers used by [Hosted Shell](https://developers.openai.com/api/docs/guides/tools-shell#hosted-shell-quickstart) and [Code Interpreter](https://developers.openai.com/api/docs/guides/tools-code-interpreter) may write temporary application state to the container filesystem (backed by ephemeral block storage) while the container is active. Container data is deleted when the container expires or is explicitly deleted.
- Prompt caching may store encrypted key/value tensors in GPU-local storage as application state. This data is stored on the local GPU machines and is not retained after the 24-hour expiration. For `gpt-5.5` and `gpt-5.5-pro`, setting `prompt_cache_retention` to `in_memory` returns an error. For GPT-5.6 models and later model families, `prompt_cache_options.ttl` controls the minimum cache lifetime, not this maximum application-state retention period. To learn more, see the [prompt caching guide](https://developers.openai.com/api/docs/guides/prompt-caching#prompt-cache-retention).
- When Zero Data Retention is not enabled for an organization, all queries use extended prompt caching for all supported models.
- For server-side compaction, no data is retained when `store="false"`.
- We support [Skills](https://developers.openai.com/api/docs/guides/tools-skills) in two form factors, both local execution and hosted container-based execution. Hosted skills follow the same container lifecycle as hosted shell: mounted skills and container files remain available while the container is active and are discarded when the container expires or is deleted.
- Data transmitted to third-party services over network connections is subject to their data retention policies.

#### `/v1/assistants`, `/v1/threads`, and `/v1/vector_stores`

- Objects related to the Assistants API are deleted from our servers 30 days after you delete them via the API or the dashboard. Objects that are not deleted via the API or dashboard are retained indefinitely.

#### `/v1/images`

- Image generation is Zero Data Retention compatible when using `gpt-image-2.5-sunburst`, `gpt-image-2.5-sunburst-2026-09-08`, `gpt-image-2.5-flare`, `gpt-image-2.5-flare-2026-09-08`, `gpt-image-2`, `gpt-image-1.5`, `gpt-image-1`, and `gpt-image-1-mini`.

#### `/v1/files`

- Files can be manually deleted via the API or the dashboard, or can be automatically deleted by setting the `expires_after` parameter. See [here](https://developers.openai.com/api/reference/resources/files/methods/create#files_create-expires_after) for more information.

#### `/v1/videos`

- The `v1/videos` API includes a workflow that saves data to disk while processing and retains it for 48 hours to allow the caller to download the produced video and then for 30 days for abuse monitoring. `v1/videos` is currently blocked for MAM or ZDR requests. If your organization has data retention controls enabled, configure a project with its retention setting set to **None** as described in [Configuring data retention controls](#configuring-data-retention-controls) to use `/v1/videos` with that project.

#### Image and file inputs

Images and files may be uploaded as inputs to `/v1/responses` (including when using the Computer Use tool), `/v1/chat/completions`, and `/v1/images`. Image and file inputs are scanned for CSAM content upon submission. If the classifier detects potential CSAM content, the image will be retained for manual review, even if Zero Data Retention, Modified Abuse Monitoring, or Eyes Off is enabled.

#### Web Search

Web Search with live internet access is not HIPAA eligible and is not covered by a BAA. Web Search in offline/cache-only mode (`external_web_access: false`) is eligible to be covered by a BAA when used with an API key from a ZDR-enabled project within a ZDR organization. This HIPAA/BAA guidance applies only to the Responses API `web_search` tool. Note: Preview variants (`web_search_preview`) ignore this parameter and behave as if `external_web_access` is `true`. We recommend using `web_search`.

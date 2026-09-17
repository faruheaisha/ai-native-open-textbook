---
title: "Strands Harness SDK"
sourceId: "09-harness/strands-harness-sdk"
sourceTitle: "Strands Harness SDK"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/strands-agents/harness-sdk"
entryUrl: "https://github.com/strands-agents/harness-sdk/blob/7bda6c70e71cd07279470268c3d3b3f4b36adf53/site/src/content/changelog/harness/python-v1.35.0.md"
sourceRel: "site/src/content/changelog/harness/python-v1.35.0.md"
rawUrl: "/raw/09-harness/strands-harness-sdk/site/src/content/changelog/harness/python-v1.35.0.md"
sourceSha256: "36d59a0b2348b45429335cc7416cf0183251092f05b6d1ae4f740192c358460c"
pageSha256: "36d59a0b2348b45429335cc7416cf0183251092f05b6d1ae4f740192c358460c"
contentMode: "local-full"
zh: ""
---

# Strands Harness SDK

### Features

#### Bedrock Service Tier Support — [PR#1799](https://github.com/strands-agents/sdk-python/pull/1799)

Amazon Bedrock now offers service tiers (Priority, Standard, Flex) that let you control the trade-off between latency and cost on a per-request basis. `BedrockModel` accepts a new `service_tier` configuration field, consistent with how other Bedrock-specific features like guardrails are exposed. When not set, the field is omitted and Bedrock uses its default behavior.

```python
from strands import Agent
from strands.models.bedrock import BedrockModel

# Use "flex" tier for cost-optimized batch processing
model = BedrockModel(
    model_id="us.anthropic.claude-sonnet-4-20250514-v1:0",
    service_tier="flex",
)
agent = Agent(model=model)

# Use "priority" for latency-sensitive applications
realtime_model = BedrockModel(
    model_id="us.anthropic.claude-sonnet-4-20250514-v1:0",
    service_tier="priority",
)
```

Valid values are `"default"`, `"priority"`, and `"flex"`. If a model or region does not support the specified tier, Bedrock returns a `ValidationException`.

### Bug Fixes

- **Sliding window conversation manager user-first enforcement** — [PR#2087](https://github.com/strands-agents/sdk-python/pull/2087): The sliding window could produce a trimmed conversation starting with an assistant message, causing `ValidationException` on providers that require user-first ordering (including Bedrock Nova). The trim-point validation now ensures the first remaining message always has `role == "user"`. Also fixed a short-circuit logic bug in the `toolUse` guard that let orphaned tool-use blocks slip through at window boundaries.

- **MCP `_meta` forwarding** — [PR#1918](https://github.com/strands-agents/sdk-python/pull/1918), [PR#2081](https://github.com/strands-agents/sdk-python/pull/2081): Custom metadata per the MCP spec was silently dropped because `MCPClient` never forwarded the `_meta` field to `ClientSession.call_tool()`. Additionally, the OTEL instrumentation used `model_dump()` instead of `model_dump(by_alias=True)`, serializing the field as `"meta"` instead of `"_meta"` and corrupting the payload. Both the direct `call_tool` and task-augmented execution paths now correctly forward `meta`.

- **Tool exception propagation to OpenTelemetry spans** — [PR#2046](https://github.com/strands-agents/sdk-python/pull/2046): When a tool raised an exception, the original exception was dropped before reaching `end_tool_call_span`, causing all tool spans to get `StatusCode.OK` even on errors. Tool errors now correctly propagate with `StatusCode.ERROR`, preserving the original exception type and traceback for observability backends like Langfuse.

- **Anthropic premature stream termination** — [PR#2047](https://github.com/strands-agents/sdk-python/pull/2047): The Anthropic provider crashed with `AttributeError` when the stream terminated before the final `message_stop` event, because it accessed `event.message.usage` on event types that lack a `.message` attribute. Now uses the Anthropic SDK's `stream.get_final_message()` to read accumulated usage from all received events, gracefully handling premature termination and empty streams.

- **Anthropic Pydantic deprecation warnings** — [PR#2044](https://github.com/strands-agents/sdk-python/pull/2044): Fixed `message_stop` event handling to avoid Pydantic deprecation warnings.

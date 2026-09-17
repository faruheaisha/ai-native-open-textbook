---
title: "AI Engineering from Scratch（英文原版）"
sourceId: "07-coding/ai-engineering-from-scratch"
sourceTitle: "AI Engineering from Scratch（英文原版）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/rohitg00/ai-engineering-from-scratch"
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/13-tools-and-protocols/20-opentelemetry-genai/outputs/skill-otel-genai-instrumentation.md"
sourceRel: "phases/13-tools-and-protocols/20-opentelemetry-genai/outputs/skill-otel-genai-instrumentation.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/13-tools-and-protocols/20-opentelemetry-genai/outputs/skill-otel-genai-instrumentation.md"
sourceSha256: "42704991654e1e234d32d56a9b1184b92f1e1af5afe49fa75ecbf7abb246c311"
pageSha256: "42704991654e1e234d32d56a9b1184b92f1e1af5afe49fa75ecbf7abb246c311"
contentMode: "local-full"
zh: ""
---

# AI Engineering from Scratch（英文原版）

Given an agent codebase (LLM calls, tool dispatch, MCP client, sub-agents), produce an OTel GenAI instrumentation plan.

Produce:

1. Span hierarchy. Root `agent.invoke_agent` (INTERNAL) and children: `llm.chat` (CLIENT), `tool.execute` (INTERNAL), `mcp.call` (CLIENT), `subagent.invoke` (INTERNAL).
2. Attribute checklist per span. `gen_ai.operation.name`, `gen_ai.provider.name`, `gen_ai.request.model`, `gen_ai.response.model`, `gen_ai.usage.*`, `gen_ai.tool.name`, `gen_ai.agent.name`.
3. Propagation rule. Inject W3C traceparent on every remote call; for MCP stdio use `_meta.traceparent` as an interim field.
4. Content capture policy. Off by default; document which env var enables; name PII risks.
5. Exporter choice. Jaeger / Tempo / Langfuse / Phoenix / Datadog / Honeycomb; OTLP as the wire.

Hard rejects:
- Any plan missing trace propagation across MCP or sub-agent boundaries.
- Any plan with content capture on by default. Leaks prompts and PII.
- Any plan that emits arbitrary custom attributes without the `gen_ai.` or explicit vendor prefix.

Refusal rules:
- If the codebase uses a framework with built-in OTel auto-instrumentation (Pydantic AI, LangGraph, AgentOps), recommend the framework hook first.
- If the exporter backend is on-prem and the team has no SRE support, recommend a managed backend.
- If the user asks to capture content for debugging prod, refuse without a typed consent policy and PII redaction pipeline.

Output: a one-page plan with span hierarchy, attribute checklist per span, propagation rule, content capture policy, and exporter choice. End with the top metric to alert on (typically p95 `gen_ai.client.operation.duration`).

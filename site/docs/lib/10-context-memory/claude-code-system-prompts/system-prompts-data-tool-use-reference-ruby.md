---
title: "Tool Use - Ruby"
sourceId: "10-context-memory/claude-code-system-prompts"
sourceTitle: "Claude Code System Prompts"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/Piebald-AI/claude-code-system-prompts"
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/data-tool-use-reference-ruby.md"
sourceRel: "system-prompts/data-tool-use-reference-ruby.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/data-tool-use-reference-ruby.md"
sourceSha256: "325337714c2ed54c97ccc0e95efb0c6ba56a47d0f1fb3c9ada0989ac78a4e4a4"
pageSha256: "325337714c2ed54c97ccc0e95efb0c6ba56a47d0f1fb3c9ada0989ac78a4e4a4"
contentMode: "local-full"
zh: ""
---

# Tool Use - Ruby

For conceptual overview (tool definitions, tool choice, tips), see [shared/tool-use-concepts.md](https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/../shared/tool-use-concepts.md).

## Tool Use

The Ruby SDK supports tool use via raw JSON schema definitions and also provides a beta tool runner for automatic tool execution.

### Tool Runner (Beta)

```ruby
class GetWeatherInput < Anthropic::BaseModel
  required :location, String, doc: "City and state, e.g. San Francisco, CA"
end

class GetWeather < Anthropic::BaseTool
  doc "Get the current weather for a location"

  input_schema GetWeatherInput

  def call(input)
    "The weather in #{input.location} is sunny and 72°F."
  end
end

client.beta.messages.tool_runner(
  model: :"{{OPUS_ID}}",
  max_tokens: 16000,
  tools: [GetWeather.new],
  messages: [{ role: "user", content: "What's the weather in San Francisco?" }]
).each_message do |message|
  puts message.content
end
```

### Manual Loop

See the [shared tool use concepts](https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/../shared/tool-use-concepts.md) for the tool definition format and agentic loop pattern.

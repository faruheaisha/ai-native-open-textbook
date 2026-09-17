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
sourceRel: "docs/en/agents-and-tools/tool-use/advisor-tool.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/agents-and-tools/tool-use/advisor-tool.md"
sourceSha256: "e798608a5dfa622e88c58c702ea92d194e53b19d6d35af59857ed01dddea26ab"
pageSha256: "4a0b0fb2058442b0f25f68496d6a551c88ff6257eed2cb4c3700103aa127de9e"
contentMode: "local-full"
zh: ""
---

## Advisor prompt caching

There are two independent caching layers.

### Executor-side caching

The `advisor_tool_result` block is cacheable like any other content block. A `cache_control` breakpoint placed after it on a subsequent turn hits. The executor's prompt always contains the plaintext advice regardless of whether your client received `text` or `encrypted_content`, so caching behavior is identical for both result variants.

### Advisor-side caching

Set `caching` on the tool definition to enable prompt caching for the advisor's own transcript across calls within the same conversation:

  ```python Python
  tools = [
      {
          "type": "advisor_20260301",
          "name": "advisor",
          "model": "claude-opus-5",
          "caching": {"type": "ephemeral", "ttl": "5m"},
      }
  ]
  ```

  ```typescript TypeScript
  const tools: Anthropic.Beta.Messages.BetaToolUnion[] = [
    {
      type: "advisor_20260301",
      name: "advisor",
      model: "claude-opus-5",
      caching: { type: "ephemeral", ttl: "5m" }
    }
  ];
  ```

  ```csharp C#
  using Anthropic.Models.Beta.Messages;
  using Messages = Anthropic.Models.Messages;

  var tools = new BetaToolUnion[]
  {
      new BetaAdvisorTool20260301
      {
          Model = Messages::Model.ClaudeOpus5,
          Caching = new BetaCacheControlEphemeral { Ttl = Ttl.Ttl5m }
      }
  };
  ```

  ```go Go
  tools := []anthropic.BetaToolUnionParam{
  	{OfAdvisorTool20260301: &anthropic.BetaAdvisorTool20260301Param{
  		Model:   anthropic.ModelClaudeOpus5,
  		Caching: anthropic.BetaCacheControlEphemeralParam{TTL: anthropic.BetaCacheControlEphemeralTTLTTL5m},
  	}},
  }
  ```

  ```java Java
  import com.anthropic.models.beta.messages.BetaAdvisorTool20260301;
  import com.anthropic.models.beta.messages.BetaCacheControlEphemeral;
  import com.anthropic.models.beta.messages.BetaToolUnion;
  import com.anthropic.models.messages.Model;

  List<BetaToolUnion> tools = List.of(
      BetaToolUnion.ofAdvisorTool20260301(BetaAdvisorTool20260301.builder()
          .model(Model.CLAUDE_OPUS_5)
          .caching(BetaCacheControlEphemeral.builder()
              .ttl(BetaCacheControlEphemeral.Ttl.TTL_5M)
              .build())
          .build()));
  ```

  ```php PHP
  $tools = [
      [
          'type' => 'advisor_20260301',
          'name' => 'advisor',
          'model' => 'claude-opus-5',
          'caching' => ['type' => 'ephemeral', 'ttl' => '5m'],
      ],
  ];
  ```

  ```ruby Ruby
  tools = [
    {
      type: "advisor_20260301",
      name: "advisor",
      model: "claude-opus-5",
      caching: { type: "ephemeral", ttl: "5m" }
    }
  ]
  ```

The advisor's prompt on the Nth call is the (N-1)th call's prompt with one more segment appended, so the prefix is stable across calls. With `caching` enabled, each advisor call writes a cache entry, and the next call reads up to that point and pays only for the delta. You'll see `cache_read_input_tokens` become non-zero on the second and later `advisor_message` iterations.

**When to enable it:** The cache write costs more than the reads save when the advisor is called two or fewer times per conversation. Caching breaks even at roughly three advisor calls and improves from there. Enable it for long agent loops, and keep it off for short tasks.

**Keep it consistent:** Set `caching` once and leave it for the whole conversation. Toggling it off and on mid-conversation causes cache misses.

  [`clear_thinking`](https://platform.claude.com/docs/en/build-with-claude/context-editing) with a `keep` value other than `"all"` shifts the advisor's quoted transcript each turn, causing advisor-side cache misses. This is a cost degradation only. Advice quality is unaffected. When extended thinking is enabled without explicit `clear_thinking` configuration, the API defaults to `keep: \{type: "thinking_turns", value: 1\}`, which triggers this behavior (the default on earlier Opus/Sonnet models and all Haiku models, whereas on Opus 4.5+ and Sonnet 4.6+ the default is to keep all turns). Set `keep: "all"` to preserve advisor cache stability.

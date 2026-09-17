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
sourceRel: "docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices.md"
sourceSha256: "f98aa130a7974b2edf98f8c3babe806ab140d5cdd3933a506f5211335b431c5f"
pageSha256: "92906ca5633967c6ea4ad0cb727e37bf2012305c2ebc48417f0fba7a7e3a9c19"
contentMode: "local-full"
zh: ""
---

## Output and formatting

### Communication style and verbosity

Claude's latest models have a more concise and natural communication style compared to previous models:

* **More direct and grounded:** Provides fact-based progress reports rather than self-celebratory updates
* **More conversational:** Slightly more fluent and colloquial, less machine-like
* **Less verbose:** May skip detailed summaries for efficiency unless prompted otherwise

This means Claude may skip verbal summaries after tool calls, jumping directly to the next action. If you prefer more visibility into its reasoning:

```text Sample prompt wrap
After completing a task that involves tool use, provide a quick summary of the work you've done.
```

Claude Opus 5 is an exception on verbosity: its default user-facing responses run longer than prior models', and raising or lowering [effort](https://platform.claude.com/docs/en/build-with-claude/effort) does not reliably change visible response length. Prompt explicitly for conciseness instead. See [Prompting Claude Opus 5](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-5#response-length-and-verbosity) for a sample instruction. Claude Fable 5.1 has the opposite tendency during agentic work: it writes fewer user-facing updates between tool calls. Ask for progress text explicitly, and remove any instruction telling it to keep that text brief. See [Ask for user-facing progress updates](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5-1#ask-for-user-facing-progress-updates).

### Control the format of responses

There are a few particularly effective ways to steer output formatting:

1. **Tell Claude what to do instead of what not to do**

   * Instead of: "Do not use markdown in your response"
   * Try: "Your response should be composed of smoothly flowing prose paragraphs."

2. **Use XML format indicators**

   * Try: "Write the prose sections of your response in \&lt;smoothly\_flowing\_prose\_paragraphs> tags."

3. **Match your prompt style to the desired output**

   The formatting style used in your prompt may influence Claude's response style. If you are still experiencing steerability issues with output formatting, try matching your prompt style to your desired output style as closely as possible. For example, removing markdown from your prompt can reduce the volume of markdown in the output.

4. **Use detailed prompts for specific formatting preferences**

   For more control over markdown and formatting usage, provide explicit guidance:

````text Sample prompt to minimize markdown wrap
<avoid_excessive_markdown_and_bullet_points>
When writing reports, documents, technical explanations, analyses, or any long-form
content, write in clear, flowing prose using complete paragraphs and sentences. Use
standard paragraph breaks for organization and reserve markdown primarily for `inline
code`, code blocks (```...```), and simple headings (## and ###). Avoid using **bold**
and *italics*.

DO NOT use ordered lists (1. ...) or unordered lists (*) unless: a) you're presenting
truly discrete items where a list format is the best option, or b) the user explicitly
requests a list or ranking

Instead of listing items with bullets or numbers, incorporate them naturally into
sentences. This guidance applies especially to technical writing. Using prose instead of
excessive formatting will improve user satisfaction. NEVER output a series of overly
short bullet points.

Your goal is readable, flowing text that guides the reader naturally through ideas
rather than fragmenting information into isolated points.
</avoid_excessive_markdown_and_bullet_points>
````

Claude Fable 5.1 already formats less than earlier models, so on that model a block like this can suppress structure the content needs. Remove it, or replace it with the shorter rule in [Formatting in chat](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5-1#formatting-in-chat).

### LaTeX output

Claude's latest models default to LaTeX for mathematical expressions, equations, and technical explanations. If you prefer plain text, add the following instructions to your prompt:

```text Sample prompt wrap
Format your response in plain text only. Do not use LaTeX, MathJax, or any markup
notation such as \( \), $, or \frac{}{}. Write all math expressions using standard text
characters (e.g., "/" for division, "*" for multiplication, and "^" for exponents).
```

### Document creation

Claude's latest models create presentations, animations, and visual documents with strong instruction following, and usually produce usable output on the first try.

For best results with document creation:

```text Sample prompt wrap
Create a professional presentation on [topic]. Include thoughtful design elements,
visual hierarchy, and engaging animations where appropriate.
```

### Migrating away from prefilled responses

Starting with Claude 4.6 models and [Claude Mythos Preview](https://anthropic.com/glasswing), prefilled responses (providing a partial assistant message for Claude to continue from) on the last assistant turn are no longer supported. Requests with prefilled assistant messages to these models return a 400 error. Model intelligence and instruction following have advanced such that most use cases of prefill no longer require it. Earlier models continue to support prefills, and adding assistant messages elsewhere in the conversation is not affected.

Here are common prefill scenarios and how to migrate away from them:

  Prefills have been used to force specific output formats like JSON/YAML, classification, and similar patterns where the prefill constrains Claude to a particular structure.

  **Migration:** The [Structured Outputs](https://platform.claude.com/docs/en/build-with-claude/structured-outputs) feature is designed specifically to constrain Claude's responses to follow a given schema. Try asking the model to conform to your output structure first, as newer models can reliably match complex schemas when told to, especially if implemented with retries. For classification tasks, use either tools with an enum field containing your valid labels or structured outputs.

  Prefills like `Here is the requested summary:\n` were used to skip introductory text.

  **Migration:** Use direct instructions in the system prompt: "Respond directly without preamble. Do not start with phrases like 'Here is...', 'Based on...', etc." Alternatively, direct the model to output within XML tags, use structured outputs, or use tool calling. If the occasional preamble slips through, strip it in post-processing.

  Prefills were used to steer around unnecessary refusals.

  **Migration:** Claude is much better at appropriate refusals now. Clear prompting within the `user` message without prefill should be sufficient.

  Prefills were used to continue partial completions, resume interrupted responses, or pick up where a previous generation left off.

  **Migration:** Move the continuation to the user message, and include the final text from the interrupted response: "Your previous response was interrupted and ended with \`\[previous\_response]\`. Continue from where you left off." If this is part of error-handling or incomplete-response-handling and there is no UX penalty, retry the request.

  Prefills were used to periodically ensure refreshed or injected context.

  **Migration:** For very long conversations, inject what were previously prefilled-assistant reminders into the user turn. If context hydration is part of a more complex agentic system, consider hydrating through tools (expose or encourage use of tools containing context based on heuristics such as number of turns) or during [context compaction](https://platform.claude.com/docs/en/build-with-claude/compaction).

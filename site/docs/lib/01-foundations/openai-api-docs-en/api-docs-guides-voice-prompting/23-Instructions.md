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
sourceRel: "api/docs/guides/voice-prompting.md"
rawUrl: "/raw/01-foundations/openai-api-docs-en/api/docs/guides/voice-prompting.md"
sourceSha256: "5f08b8a5661181c66582baad274d7700e4aba37b4fd02cc2e4b41265a24ea075"
pageSha256: "425c8c54f804d0672682b52647ff9da46ff2e8da3be81c7af96b7475ceff84d2"
contentMode: "local-full"
zh: ""
---

## Instructions

This section covers prompt guidance for instructing your model to solve your task, apply best practices, and fix possible problems.

Perhaps unsurprisingly, we recommend prompting patterns that are similar to [GPT-4.1 for best results](https://developers.openai.com/cookbook/examples/gpt4-1_prompting_guide).

### Instruction Following

Like GPT-4.1 and GPT-5, if the instructions are conflicting, ambiguous, or unclear, `gpt-realtime-1.5` will perform worse.

- **When to use**: Outputs drift from rules, skip phases, or misuse tools.
- **What it does**: Uses an LLM to point out ambiguity, conflicts, and missing definitions before you ship.

#### **Instructions Quality Prompt (can be used in ChatGPT or with API)**

Use the following prompt with GPT-5 to identify problematic areas in your prompt that you can fix.

```
## Role & Objective
You are a **Prompt-Critique Expert**.
Examine a user-supplied LLM prompt and surface any weaknesses following the instructions below.

## Instructions
Review the prompt that is meant for an LLM to follow and identify the following issues:
- Ambiguity: Could any wording be interpreted in more than one way?
- Lacking Definitions: Are there any class labels, terms, or concepts that are not defined that might be misinterpreted by an LLM?
- Conflicting, missing, or vague instructions: Are directions incomplete or contradictory?
- Unstated assumptions: Does the prompt assume the model has to be able to do something that is not explicitly stated?

## Do **NOT** list issues of the following types:
- Invent new instructions, tool calls, or external information. You do not know what tools need to be added that are missing.
- Issues that you are unsure about.

## Output Format
"""
# Issues
- Numbered list; include brief quote snippets.

# Improvements
- Numbered list; provide the revised lines you would change and how you would change them.

# Revised Prompt
- Revised prompt where you have applied all your improvements surgically with minimal edits to the original prompt
"""
```

#### **Prompt Optimization Meta Prompt (can be used in ChatGPT or with API)**

This meta-prompt helps you improve your base system prompt by targeting a specific failure mode. Provide the current prompt and describe the issue you’re seeing, the model (GPT-5) will suggest refined variants that tighten constraints and reduce the problem.

```
Here's my current prompt to an LLM:
[BEGIN OF CURRENT PROMPT]
{CURRENT_PROMPT}
[END OF CURRENT PROMPT]

But I see this issue happening from the LLM:
[BEGIN OF ISSUE]
{ISSUE}
[END OF ISSUE]
Can you provide some variants of the prompt so that the model can better understand the constraints to alleviate the issue?
```

### No Audio or Unclear Audio

Sometimes the model thinks it hears something and tries to respond. You can add a custom instruction telling the model how to behave when it hears unclear audio or user input. Modify the desired behavior to fit your use case. For example, you may want the model to repeat the same question instead of asking for clarification.

- **When to use**: Background noise, partial words, or silence trigger unwanted replies.
- **What it does**: Stops spurious responses and creates graceful clarification.
- **How to adapt**: Choose whether to ask for clarification or repeat the last question depending on use case.

#### Example (coughing and unclear audio)

```
# Instructions/Rules
...

## Unclear audio
- Always respond in the same language the user is speaking in, if unintelligible.
- Only respond to clear audio or text.
- If the user's audio is not clear (e.g. ambiguous input/background noise/silent/unintelligible) or if you did not fully hear or understand the user, ask for clarification using {preferred_language} phrases.
```

These are the responses **after** applying the instruction using `gpt-realtime-1.5`.

  In this example, the model asks for clarification after my _(very)_ loud cough and unclear audio.

### Background Music or Sounds

Occasionally, the model may generate unintended background music, humming, rhythmic noises, or sound-like artifacts during speech generation. These artifacts can diminish clarity, distract users, or make the assistant feel less professional. The following instructions help prevent or significantly reduce these occurrences.

- **When to use**: Use when you observe unintended musical elements or sound effects in Realtime audio responses.
- **What it does**: Steers the model to avoid generating these unwanted audio artifacts.
- **How to adapt**: Adjust the instruction to try to explicitly suppress the specific sound patterns you are encountering.

#### Example

```
# Instructions/Rules
...
- Do not include any sound effects or onomatopoeic expressions in your responses.
```

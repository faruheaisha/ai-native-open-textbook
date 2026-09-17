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
sourceRel: "docs/en/build-with-claude/mid-conversation-effort-example.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/build-with-claude/mid-conversation-effort-example.md"
sourceSha256: "88a2fa6d07b354b90d37bbab7c6c1f65502776a31e4be76eaefe73d788798fbd"
pageSha256: "d1173e344b13f0ccb336bb1810cae3f1a4aff1563bcf6bbc6fdfd28ffbb41ddb"
contentMode: "local-full"
zh: ""
---

## Define the mode reminders

The reminders are short on purpose. They flip the mode and point at the tool description, where the heavyweight instructions live. The full text is sent once when the mode turns on, the refresher is re-sent only after several user turns, and the exit notice is sent once when the mode turns off.

  ```python Python
  MODE_ENTER = (
      "Orchestration mode is on: optimize for the most exhaustive, correct answer rather than "
      "the fastest one. Use the Workflow tool on every substantive task, sized to the problem's "
      "natural decomposition rather than the maximum the tool allows. See the Workflow tool's "
      "description for standing consent, granularity guidance, and quality patterns. Work solo "
      "only on conversational or trivial turns."
  )
  MODE_REFRESH = (
      "Orchestration mode is still on. Use the Workflow tool; see its standing consent section."
  )
  MODE_EXIT = (
      "Orchestration mode is off. The Workflow tool's standard opt-in rule applies again."
  )
  ```

  ```typescript TypeScript
  const MODE_ENTER =
    "Orchestration mode is on: optimize for the most exhaustive, correct answer rather than " +
    "the fastest one. Use the Workflow tool on every substantive task, sized to the problem's " +
    "natural decomposition rather than the maximum the tool allows. See the Workflow tool's " +
    "description for standing consent, granularity guidance, and quality patterns. Work solo " +
    "only on conversational or trivial turns.";
  const MODE_REFRESH =
    "Orchestration mode is still on. Use the Workflow tool; see its standing consent section.";
  const MODE_EXIT =
    "Orchestration mode is off. The Workflow tool's standard opt-in rule applies again.";
  ```

  ```csharp C#
  const string modeEnter =
      "Orchestration mode is on: optimize for the most exhaustive, correct answer rather than "
      + "the fastest one. Use the Workflow tool on every substantive task, sized to the problem's "
      + "natural decomposition rather than the maximum the tool allows. See the Workflow tool's "
      + "description for standing consent, granularity guidance, and quality patterns. Work solo "
      + "only on conversational or trivial turns.";
  const string modeRefresh =
      "Orchestration mode is still on. Use the Workflow tool; see its standing consent section.";
  const string modeExit =
      "Orchestration mode is off. The Workflow tool's standard opt-in rule applies again.";
  ```

  ```go Go
  const (
  	modeEnter = "Orchestration mode is on: optimize for the most exhaustive, correct answer rather than " +
  		"the fastest one. Use the Workflow tool on every substantive task, sized to the problem's " +
  		"natural decomposition rather than the maximum the tool allows. See the Workflow tool's " +
  		"description for standing consent, granularity guidance, and quality patterns. Work solo " +
  		"only on conversational or trivial turns."
  	modeRefresh = "Orchestration mode is still on. Use the Workflow tool; see its standing consent section."
  	modeExit    = "Orchestration mode is off. The Workflow tool's standard opt-in rule applies again."
  )

  ```

  ```java Java
  static final String MODE_ENTER =
          "Orchestration mode is on: optimize for the most exhaustive, correct answer rather than "
                  + "the fastest one. Use the Workflow tool on every substantive task, sized to the problem's "
                  + "natural decomposition rather than the maximum the tool allows. See the Workflow tool's "
                  + "description for standing consent, granularity guidance, and quality patterns. Work solo "
                  + "only on conversational or trivial turns.";
  static final String MODE_REFRESH =
          "Orchestration mode is still on. Use the Workflow tool; see its standing consent section.";
  static final String MODE_EXIT =
          "Orchestration mode is off. The Workflow tool's standard opt-in rule applies again.";
  ```

  ```php PHP
  const MODE_ENTER =
      'Orchestration mode is on: optimize for the most exhaustive, correct answer rather than '
      . 'the fastest one. Use the Workflow tool on every substantive task, sized to the problem\'s '
      . 'natural decomposition rather than the maximum the tool allows. See the Workflow tool\'s '
      . 'description for standing consent, granularity guidance, and quality patterns. Work solo '
      . 'only on conversational or trivial turns.';
  const MODE_REFRESH =
      'Orchestration mode is still on. Use the Workflow tool; see its standing consent section.';
  const MODE_EXIT =
      'Orchestration mode is off. The Workflow tool\'s standard opt-in rule applies again.';
  ```

  ```ruby Ruby
  MODE_ENTER =
    "Orchestration mode is on: optimize for the most exhaustive, correct answer rather than " \
    "the fastest one. Use the Workflow tool on every substantive task, sized to the problem's " \
    "natural decomposition rather than the maximum the tool allows. See the Workflow tool's " \
    "description for standing consent, granularity guidance, and quality patterns. Work solo " \
    "only on conversational or trivial turns."
  MODE_REFRESH =
    "Orchestration mode is still on. Use the Workflow tool; see its standing consent section."
  MODE_EXIT =
    "Orchestration mode is off. The Workflow tool's standard opt-in rule applies again."
  ```

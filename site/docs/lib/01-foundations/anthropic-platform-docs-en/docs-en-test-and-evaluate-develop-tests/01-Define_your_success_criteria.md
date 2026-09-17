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
sourceRel: "docs/en/test-and-evaluate/develop-tests.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/test-and-evaluate/develop-tests.md"
sourceSha256: "df88c8c7e4b3990cbb558d16fcf6e02c4a542e576079e96b377ecaf24e525138"
pageSha256: "a6640da9d5c948de3640dfaf936f9d53754673af30bfc5c79f7b58271484b7ee"
contentMode: "local-full"
zh: ""
---

## Define your success criteria

Good success criteria are:

* **Specific:** Clearly define what you want to achieve. Instead of "good performance," specify "accurate sentiment classification."

* **Measurable:** Use quantitative metrics or well-defined qualitative scales. Numbers provide clarity and scalability, but qualitative measures can be valuable if consistently applied *along* with quantitative measures.

  * Even "hazy" topics such as ethics and safety can be quantified:

    |      | Safety criteria                                                                            |
    | ---- | ------------------------------------------------------------------------------------------ |
    | Bad  | Safe outputs                                                                               |
    | Good | Less than 0.1% of outputs out of 10,000 trials flagged for toxicity by the content filter. |

    **Quantitative metrics:**

    * Task-specific: F1 score, BLEU score, perplexity
    * Generic: Accuracy, precision, recall
    * Operational: Response time (ms), uptime (%)

    **Quantitative methods:**

    * A/B testing: Compare performance against a baseline model or earlier version.
    * User feedback: Implicit measures like task completion rates.
    * Edge case analysis: Percentage of edge cases handled without errors.

    **Qualitative scales:**

    * Likert scales: "Rate coherence from 1 (nonsensical) to 5 (perfectly logical)"
    * Expert rubrics: Linguists rating translation quality on defined criteria

* **Achievable:** Base your targets on industry benchmarks, prior experiments, AI research, or expert knowledge. Your success metrics should not be unrealistic to current frontier model capabilities.

* **Relevant:** Align your criteria with your application's purpose and user needs. Strong citation accuracy might be critical for medical apps but less so for casual chatbots.

  |      | Criteria                                                                                                                                                                                                                               |
  | ---- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
  | Bad  | The model should classify sentiments well                                                                                                                                                                                              |
  | Good | The sentiment analysis model should achieve an F1 score of at least 0.85 (Measurable, Specific) on a held-out test set\* of 10,000 diverse Twitter posts (Relevant), which is a 5% improvement over the current baseline (Achievable). |

  \*More on held-out test sets in the next section.

### Common success criteria

Here are some criteria that might be important for your use case. This list is non-exhaustive.

    How well does the model need to perform on the task? You may also need to consider edge case handling, such as how well the model needs to perform on rare or challenging inputs.

    How similar do the model's responses need to be for similar types of input? If a user asks the same question twice, how important is it that they get semantically similar answers?

    How well does the model directly address the user's questions or instructions? How important is it for the information to be presented in a logical, easy to follow manner?

    How well does the model's output style match expectations? How appropriate is its language for the target audience?

    What is a successful metric for how the model handles personal or sensitive information? Can it follow instructions not to use or share certain details?

    How effectively does the model use provided context? How well does it reference and build upon information given in its history?

    What is the acceptable response time for the model? This depends on your application's real-time requirements and user expectations.

    What is your budget for running the model? Consider factors like the cost for each API call, the size of the model, and the frequency of usage.

Most use cases need multidimensional evaluation along several success criteria.

  |      | Criteria                                                                                                                                                                                                                                                           |
  | ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
  | Bad  | The model should classify sentiments well                                                                                                                                                                                                                          |
  | Good | On a held-out test set of 10,000 diverse Twitter posts, the sentiment analysis model should achieve: - an F1 score of at least 0.85 - 99.5% of outputs are non-toxic - 90% of errors would cause inconvenience, not egregious error\* - 95% response time \< 200ms |

  \*In reality, you would also define what "inconvenience" and "egregious" mean.

***

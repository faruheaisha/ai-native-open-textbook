---
title: "Quiz: Evaluating AI Agents"
sourceId: "08-agents/huggingface-agents-course"
sourceTitle: "Hugging Face Agents Course（智能体课程）"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "08-agents"
sourceUrl: "https://github.com/huggingface/agents-course"
entryUrl: "https://github.com/huggingface/agents-course/blob/b3946b1d09d29c65736e219d48a8a736a2c52154/units/en/bonus-unit2/quiz.mdx"
sourceRel: "units/en/bonus-unit2/quiz.mdx"
rawUrl: "/raw/08-agents/huggingface-agents-course/units/en/bonus-unit2/quiz.mdx"
sourceSha256: "1002fc5c1d508e1decbf95c8df0e30547b77c9a6eaad297bbed304ee457a72ad"
pageSha256: "1002fc5c1d508e1decbf95c8df0e30547b77c9a6eaad297bbed304ee457a72ad"
contentMode: "local-full"
zh: ""
---

# Quiz: Evaluating AI Agents

Let's assess your understanding of the agent tracing and evaluation concepts covered in this bonus unit.

This quiz is optional and ungraded.

### Q1: What does observability in AI agents primarily refer to?
Which statement accurately describes the purpose of observability for AI agents?


**选项**

- A. It involves tracking internal operations through logs, metrics, and spans to understand agent behavior.
- B. It is solely focused on reducing the financial cost of running the agent.
- C. It refers only to the external appearance and UI of the agent.
- D. It is concerned with coding style and code aesthetics only.

**答案解析**

- **A（正确答案）** — Correct! Observability means using logs, metrics, and spans to shed light on the inner workings of the agent.
- **B** — Observability covers cost but is not limited to it.
- **C** — Observability is about the internal processes, not the UI.
- **D** — Code style is unrelated to observability in this context.


### Q2: Which of the following is NOT a common metric monitored in agent observability?
Select the metric that does not typically fall under the observability umbrella.


**选项**

- A. Latency
- B. Cost per Agent Run
- C. User Feedback and Ratings
- D. Lines of Code of the Agent

**答案解析**

- **A** — Latency is commonly tracked to assess agent responsiveness.
- **B** — Monitoring cost is a key aspect of observability.
- **C** — User feedback is crucial for evaluating agent performance.
- **D（正确答案）** — The number of lines of code is not a typical observability metric.


### Q3: What best describes offline evaluation of an AI agent?
Determine the statement that correctly captures the essence of offline evaluation.


**选项**

- A. Evaluating the agent using real user interactions in a live environment.
- B. Assessing agent performance using curated datasets with known ground truth.
- C. Monitoring the agent's internal logs in real-time.
- D. Running the agent without any evaluation metrics.

**答案解析**

- **A** — This describes online evaluation rather than offline.
- **B（正确答案）** — Correct! Offline evaluation uses test datasets to gauge performance against known answers.
- **C** — This is more related to observability rather than evaluation.
- **D** — This approach does not provide meaningful insights.


### Q4: Which advantage does online evaluation of agents offer?
Pick the statement that best reflects the benefit of online evaluation.


**选项**

- A. It provides controlled testing scenarios using pre-defined datasets.
- B. It captures live user interactions and real-world performance data.
- C. It eliminates the need for any offline testing and benchmarks.
- D. It solely focuses on reducing the computational cost of the agent.

**答案解析**

- **A** — Controlled testing is a benefit of offline evaluation, not online.
- **B（正确答案）** — Correct! Online evaluation offers insights by monitoring the agent in a live setting.
- **C** — Both offline and online evaluations are important and complementary.
- **D** — Cost monitoring is part of observability, not the primary advantage of online evaluation.


### Q5: What role does OpenTelemetry play in AI agent observability and evaluation?
Which statement best describes the role of OpenTelemetry in monitoring AI agents?


**选项**

- A. It provides a standardized framework to instrument code, enabling the collection of traces, metrics, and logs for observability.
- B. It acts as a replacement for manual debugging by automatically fixing code issues.
- C. It primarily serves as a database for storing historical logs without real-time capabilities.
- D. It is used to optimize the computational performance of the AI agent by automatically tuning model parameters.

**答案解析**

- **A（正确答案）** — Correct! OpenTelemetry standardizes instrumentation for telemetry data, which is crucial for monitoring and diagnosing agent behavior.
- **B** — Incorrect. OpenTelemetry is used for gathering telemetry data, not for debugging code issues.
- **C** — Incorrect. OpenTelemetry focuses on real-time telemetry data collection and exporting data to analysis tools.
- **D** — Incorrect. OpenTelemetry is centered on observability rather than performance tuning.


Congratulations on completing this quiz! 🎉 If you missed any questions, consider reviewing the content of this bonus unit for a deeper understanding. If you did well, you're ready to explore more advanced topics in agent observability and evaluation!

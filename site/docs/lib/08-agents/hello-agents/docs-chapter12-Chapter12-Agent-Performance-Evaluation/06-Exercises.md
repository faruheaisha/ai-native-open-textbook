---
title: "Hello Agents（Datawhale 智能体教程）"
sourceId: "08-agents/hello-agents"
sourceTitle: "Hello Agents（Datawhale 智能体教程）"
sourceKind: "课时教程"
licenseLabel: "限非商用"
lang: "中文"
tier: 2
volume: "08-agents"
sourceUrl: "https://github.com/datawhalechina/hello-agents"
entryUrl: "https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter12/Chapter12-Agent-Performance-Evaluation.md"
sourceRel: "docs/chapter12/Chapter12-Agent-Performance-Evaluation.md"
rawUrl: "/raw/08-agents/hello-agents/docs/chapter12/Chapter12-Agent-Performance-Evaluation.md"
sourceSha256: "91d6fa1d4417d683df300138cfc2d23f00b72848dae2392002de77d829213db9"
pageSha256: "5871cdbf28d24234da5ccf788fe7a323862a974f847ff8407361230ea1249baf"
contentMode: "local-full"
zh: ""
---

## Exercises

> **Hint**: Some exercises have no standard answers, focusing on cultivating learners' comprehensive understanding and practical ability in agent performance evaluation.

1. This chapter introduced multiple agent evaluation benchmarks. Please analyze:

   - In Section 12.1.2, BFCL, GAIA, AgentBench and other evaluation benchmarks were introduced. Please compare BFCL and GAIA: What core capabilities of agents do they evaluate respectively? Why does BFCL use AST matching algorithm while GAIA uses Quasi Exact Match? What are the advantages and disadvantages of these two evaluation methods?
   - Suppose you want to build an "intelligent customer service system" that needs to evaluate the following capabilities: (1) accuracy of understanding user intent; (2) correctness of calling backend APIs; (3) friendliness and professionalism of responses; (4) robustness in handling exceptional situations. Please select or design appropriate evaluation metrics and methods for each capability.
   - In Section 12.1.1, it was mentioned that agent evaluation faces three major challenges: "output uncertainty", "evaluation standard diversity", and "high evaluation cost". Please propose specific solutions for each challenge and analyze the feasibility and limitations of the solutions.

2. BFCL (Berkeley Function Calling Leaderboard) is an important benchmark for evaluating tool calling capabilities. Based on Section 12.2 content, please think deeply:

   > **Hint**: This is a hands-on practice question, actual operation is recommended

   - In the AST matching algorithm in Section 12.2.3, we judge whether function calls are correct by comparing abstract syntax trees. Please analyze: Why is AST matching more suitable than simple string matching? In what situations might AST matching produce misjudgments (false positives or false negatives)? How to improve the AST matching algorithm to increase accuracy?
   - BFCL dataset contains four categories: simple, multiple, parallel, irrelevance. Please design 2-3 new test samples for each category, requiring ability to test boundary cases or error-prone scenarios under that category.
   - Please extend the BFCL evaluator based on the code in Section 12.2.4, adding the following functions: (1) support evaluating execution order of tool calls (for multiple tool calls with dependencies); (2) evaluate tool calling efficiency (such as whether minimum number of calls was used); (3) generate detailed error analysis report (such as which types of errors are most common).

3. GAIA (General AI Assistants) evaluates agent comprehensive capabilities. Based on Section 12.3 content, please complete the following extension practice:

   > **Hint**: This is a hands-on practice question, actual operation is recommended

   - In Section 12.3.2, three difficulty levels of GAIA (Level 1/2/3) were introduced. Please analyze: What are the differences between these three levels in task complexity, required capabilities, evaluation standards, etc.? If designing Level 4 (ultra-high difficulty), what types of tasks should it include?
   - GAIA uses "Quasi Exact Match" algorithm to evaluate answer correctness. Please analyze: How does this method handle answer diversity (such as "42", "forty-two", "42.0" should all be considered correct)? In what situations might quasi exact match not be sufficient? Please design a more intelligent answer matching algorithm that can handle semantically equivalent answers.
   - Please implement a "custom GAIA evaluation set" based on the code in Section 12.3.4: select a specific domain (such as medical, legal, financial), design 10 real-world questions, and implement complete evaluation flow. Require questions to cover different difficulty levels, and provide standard answers and scoring criteria.

4. LLM Judge is an emerging method of using large language models for evaluation. Based on Section 12.4 content, please analyze in depth:

   - In Section 12.4.2, we used GPT-4 as judge to evaluate agent response quality. Please analyze: What advantages does LLM Judge have compared to traditional rule matching or metric calculation? What potential biases or limitations does it have (such as preference for certain response styles, sensitivity to length)?
   - LLM Judge scoring criteria design is crucial. Please design detailed scoring criteria (including scoring dimensions, weights, examples) for the following three different evaluation scenarios: (1) code generation quality evaluation; (2) creative writing quality evaluation; (3) technical documentation quality evaluation.
   - In Section 12.4.3, it was mentioned that multiple LLM Judges can be used for "jury-style" evaluation. Please design a "multi-judge evaluation system": using 3-5 different LLMs (such as GPT-4, Claude, Qwen) as judges, how to aggregate their scores? How to handle disagreements between judges? How to detect and filter abnormal scores?

5. Practical application of agent evaluation needs to consider multiple aspects. Please think:

   - In actual projects, evaluation often needs to balance between "evaluation cost" and "evaluation quality". Please design a "tiered evaluation strategy": (1) quick evaluation (low cost, for daily development iteration); (2) standard evaluation (medium cost, for pre-release); (3) comprehensive evaluation (high cost, for major updates or public release). What evaluation items should each tier include? How to design evaluation flow?
   - Agent performance may change over time (such as changes in dependent external APIs, changes in user needs). Please design a "continuous evaluation system": able to periodically automatically run evaluation, monitor agent performance change trends, and alert in time when performance declines. What components should this system include? How to design alert rules?
   - Evaluation results need to be presented clearly to different audiences (such as developers, product managers, users). Please design an "evaluation report generation system": able to automatically generate reports with different levels of detail based on audience type. What technical details should developer reports include? What business metrics should product manager reports highlight? How should user reports be simplified and visualized?

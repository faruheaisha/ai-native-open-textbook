---
title: "The Context Course"
landing: true
tier: 1
sourceId: "10-context-memory/hf-context-course"
sourceTitle: "The Context Course"
sourceKind: "系统课程"
licenseLabel: "仅引用"
lang: "英文"
volume: "10-context-memory"
sourceUrl: "https://github.com/huggingface/context-course"
entryUrl: "https://github.com/huggingface/context-course/blob/0448a7ca721a63a81531e1ba94f46f897c70645b/README.md"
sourceRel: ""
contentMode: "local-full"
zh: ""
---

# The Context Course

The Context Course teaches you **context engineering for code agents** — the skill of giving agents the right knowledge, tools, and structure to do their best work. Whether you're using Claude Code, Codex, or open source agents, this course will help you get dramatically more out of them.

## 课时

- **projects**
  - **inference**
    - **.agents**
      - **skills**
        - **huggingface-local-models**
          - **references**
            - [Hybrid for large models](/lib/10-context-memory/hf-context-course/projects-inference-_agents-skills-huggingface-local-models-references-hardware.md)
            - [Hugging Face URL Workflows for llama.cpp](/lib/10-context-memory/hf-context-course/projects-inference-_agents-skills-huggingface-local-models-references-hub-discovery.md)
            - [GGUF Quantization Guide](/lib/10-context-memory/hf-context-course/projects-inference-_agents-skills-huggingface-local-models-references-quantization.md)
          - [Hugging Face Local Models](/lib/10-context-memory/hf-context-course/projects-inference-_agents-skills-huggingface-local-models-SKILL.md)
    - **.claude**
      - **agents**
        - [benchmarker](/lib/10-context-memory/hf-context-course/projects-inference-_claude-agents-benchmarker.md)
        - [inference lab](/lib/10-context-memory/hf-context-course/projects-inference-_claude-agents-inference-lab.md)
        - [optimizer](/lib/10-context-memory/hf-context-course/projects-inference-_claude-agents-optimizer.md)
    - **.opencode**
      - **agent**
        - [benchmarker](/lib/10-context-memory/hf-context-course/projects-inference-_opencode-agent-benchmarker.md)
        - [inference lab](/lib/10-context-memory/hf-context-course/projects-inference-_opencode-agent-inference-lab.md)
        - [optimizer](/lib/10-context-memory/hf-context-course/projects-inference-_opencode-agent-optimizer.md)
    - **.pi**
      - **agents**
        - [benchmarker](/lib/10-context-memory/hf-context-course/projects-inference-_pi-agents-benchmarker.md)
        - [optimizer](/lib/10-context-memory/hf-context-course/projects-inference-_pi-agents-optimizer.md)
      - [llama.cpp Inference Pi Coordinator](/lib/10-context-memory/hf-context-course/projects-inference-_pi-APPEND_SYSTEM.md)
      - **prompts**
        - [inference lab](/lib/10-context-memory/hf-context-course/projects-inference-_pi-prompts-inference-lab.md)
    - **docs**
      - [Claude Code Subagents Guide](/lib/10-context-memory/hf-context-course/projects-inference-docs-claude-subagents-guide.md)
      - [Codex Subagents Guide](/lib/10-context-memory/hf-context-course/projects-inference-docs-codex-subagents-guide.md)
      - [OpenCode Workflow](/lib/10-context-memory/hf-context-course/projects-inference-docs-opencode-workflow.md)
      - [Pi Subagents Guide](/lib/10-context-memory/hf-context-course/projects-inference-docs-pi-subagents-guide.md)
    - [Program](/lib/10-context-memory/hf-context-course/projects-inference-program.md)
    - [llama.cpp Inference Autoresearch](/lib/10-context-memory/hf-context-course/projects-inference.md)
    - **research**
      - [Do Not Repeat](/lib/10-context-memory/hf-context-course/projects-inference-research-do-not-repeat.md)
      - **experiments**
        - [Experiments](/lib/10-context-memory/hf-context-course/projects-inference-research-experiments.md)
      - [Inference Notes](/lib/10-context-memory/hf-context-course/projects-inference-research-notes.md)
      - **templates**
        - [Experiment:](/lib/10-context-memory/hf-context-course/projects-inference-research-templates-experiment.md)
  - **post-training**
    - **.pi**
      - **agents**
        - [experiment worker](/lib/10-context-memory/hf-context-course/projects-post-training-_pi-agents-experiment-worker.md)
        - [memory keeper](/lib/10-context-memory/hf-context-course/projects-post-training-_pi-agents-memory-keeper.md)
        - [planner](/lib/10-context-memory/hf-context-course/projects-post-training-_pi-agents-planner.md)
        - [reporter](/lib/10-context-memory/hf-context-course/projects-post-training-_pi-agents-reporter.md)
        - [researcher](/lib/10-context-memory/hf-context-course/projects-post-training-_pi-agents-researcher.md)
        - [reviewer](/lib/10-context-memory/hf-context-course/projects-post-training-_pi-agents-reviewer.md)
      - [Post-Training Pi Coordinator](/lib/10-context-memory/hf-context-course/projects-post-training-_pi-APPEND_SYSTEM.md)
      - **prompts**
        - [posttrain](/lib/10-context-memory/hf-context-course/projects-post-training-_pi-prompts-posttrain.md)
    - **docs**
      - [Pi Subagents Guide](/lib/10-context-memory/hf-context-course/projects-post-training-docs-pi-subagents-guide.md)
    - [Program](/lib/10-context-memory/hf-context-course/projects-post-training-program.md)
    - [Post-Training Autoresearch](/lib/10-context-memory/hf-context-course/projects-post-training.md)
    - **research**
      - [Post-Training Notes](/lib/10-context-memory/hf-context-course/projects-post-training-research-notes.md)
    - **src**
      - **eval**
        - **tasks**
          - **nanochat**
            - **task_context**
              - [NanoChat Task Context](/lib/10-context-memory/hf-context-course/projects-post-training-src-eval-tasks-nanochat-task_context.md)
  - **pre-training**
    - **.agents**
      - **skills**
        - **autolab-hermes-delegation**
          - [SKILL](/lib/10-context-memory/hf-context-course/projects-pre-training-_agents-skills-autolab-hermes-delegation-SKILL.md)
        - **autolab-managed-experiment**
          - [SKILL](/lib/10-context-memory/hf-context-course/projects-pre-training-_agents-skills-autolab-managed-experiment-SKILL.md)
        - **autolab-reporter**
          - [SKILL](/lib/10-context-memory/hf-context-course/projects-pre-training-_agents-skills-autolab-reporter-SKILL.md)
        - **hf-cli**
          - [SKILL](/lib/10-context-memory/hf-context-course/projects-pre-training-_agents-skills-hf-cli-SKILL.md)
    - **.claude**
      - **agents**
        - [autolab](/lib/10-context-memory/hf-context-course/projects-pre-training-_claude-agents-autolab.md)
        - [experiment worker](/lib/10-context-memory/hf-context-course/projects-pre-training-_claude-agents-experiment-worker.md)
        - [memory keeper](/lib/10-context-memory/hf-context-course/projects-pre-training-_claude-agents-memory-keeper.md)
        - [planner](/lib/10-context-memory/hf-context-course/projects-pre-training-_claude-agents-planner.md)
        - [reporter](/lib/10-context-memory/hf-context-course/projects-pre-training-_claude-agents-reporter.md)
        - [researcher](/lib/10-context-memory/hf-context-course/projects-pre-training-_claude-agents-researcher.md)
        - [reviewer](/lib/10-context-memory/hf-context-course/projects-pre-training-_claude-agents-reviewer.md)
    - **.opencode**
      - **agent**
        - [autolab](/lib/10-context-memory/hf-context-course/projects-pre-training-_opencode-agent-autolab.md)
        - [experiment worker](/lib/10-context-memory/hf-context-course/projects-pre-training-_opencode-agent-experiment-worker.md)
        - [memory keeper](/lib/10-context-memory/hf-context-course/projects-pre-training-_opencode-agent-memory-keeper.md)
        - [planner](/lib/10-context-memory/hf-context-course/projects-pre-training-_opencode-agent-planner.md)
        - [reporter](/lib/10-context-memory/hf-context-course/projects-pre-training-_opencode-agent-reporter.md)
        - [researcher](/lib/10-context-memory/hf-context-course/projects-pre-training-_opencode-agent-researcher.md)
        - [reviewer](/lib/10-context-memory/hf-context-course/projects-pre-training-_opencode-agent-reviewer.md)
    - **.pi**
      - **agents**
        - [experiment worker](/lib/10-context-memory/hf-context-course/projects-pre-training-_pi-agents-experiment-worker.md)
        - [memory keeper](/lib/10-context-memory/hf-context-course/projects-pre-training-_pi-agents-memory-keeper.md)
        - [planner](/lib/10-context-memory/hf-context-course/projects-pre-training-_pi-agents-planner.md)
        - [reporter](/lib/10-context-memory/hf-context-course/projects-pre-training-_pi-agents-reporter.md)
        - [researcher](/lib/10-context-memory/hf-context-course/projects-pre-training-_pi-agents-researcher.md)
        - [reviewer](/lib/10-context-memory/hf-context-course/projects-pre-training-_pi-agents-reviewer.md)
      - [Autolab Pi Coordinator](/lib/10-context-memory/hf-context-course/projects-pre-training-_pi-APPEND_SYSTEM.md)
      - **prompts**
        - [autolab](/lib/10-context-memory/hf-context-course/projects-pre-training-_pi-prompts-autolab.md)
    - [We made an open source AI lab of agents to train models](/lib/10-context-memory/hf-context-course/projects-pre-training-blogpost.md)
    - **docs**
      - **archive**
        - [Historical Hosted Backend](/lib/10-context-memory/hf-context-course/projects-pre-training-docs-archive-hosted-backend.md)
        - [Legacy Control Planes](/lib/10-context-memory/hf-context-course/projects-pre-training-docs-archive-legacy-control-planes.md)
      - [Claude Code Subagents Guide](/lib/10-context-memory/hf-context-course/projects-pre-training-docs-claude-subagents-guide.md)
      - [Codex Subagents Guide](/lib/10-context-memory/hf-context-course/projects-pre-training-docs-codex-subagents-guide.md)
      - [Getting Started](/lib/10-context-memory/hf-context-course/projects-pre-training-docs-getting-started.md)
      - [Winning Autolab With Hermes Delegation](/lib/10-context-memory/hf-context-course/projects-pre-training-docs-hermes-subagents-guide.md)
      - [OpenCode Workflow](/lib/10-context-memory/hf-context-course/projects-pre-training-docs-opencode-workflow.md)
      - [Pi Subagents Guide](/lib/10-context-memory/hf-context-course/projects-pre-training-docs-pi-subagents-guide.md)
      - [Script Reference](/lib/10-context-memory/hf-context-course/projects-pre-training-docs-script-reference.md)
      - [Troubleshooting](/lib/10-context-memory/hf-context-course/projects-pre-training-docs-troubleshooting.md)
    - [Program](/lib/10-context-memory/hf-context-course/projects-pre-training-program.md)
    - [Multi-Agent Autoresearch](/lib/10-context-memory/hf-context-course/projects-pre-training.md)
    - **research**
      - **campaigns**
        - [Optimizer Tuning Campaign](/lib/10-context-memory/hf-context-course/projects-pre-training-research-campaigns-optimizer-tuning.md)
        - [Campaign Notes](/lib/10-context-memory/hf-context-course/projects-pre-training-research-campaigns.md)
        - [Regularization Tuning Campaign](/lib/10-context-memory/hf-context-course/projects-pre-training-research-campaigns-regularization-tuning.md)
      - [Autolab Do-Not-Repeat Ledger](/lib/10-context-memory/hf-context-course/projects-pre-training-research-do-not-repeat.md)
      - **experiments**
        - [Experiment: Increase embedding weight decay from 0.0005 to 0.001 to test whether stronger regularization on token embeddings improves validation bpb, following the success of the lm_head weight decay increase.](/lib/10-context-memory/hf-context-course/projects-pre-training-research-experiments-embedding-wd-001.md)
        - [Experiment: Lower FINAL_LR_FRAC from 0.025 to 0.018 to continue the winning direction of lower final LR floor.](/lib/10-context-memory/hf-context-course/projects-pre-training-research-experiments-final-lr-018.md)
        - [Experiment: Increase lm_head weight_decay from 0.003 to 0.004 to continue the winning direction of stronger output layer regularization.](/lib/10-context-memory/hf-context-course/projects-pre-training-research-experiments-lm-head-wd-004.md)
        - [Experiment: Lower MATRIX_LR from 0.042 to 0.038 to test whether slower learning of Muon matrix parameters improves validation bpb.](/lib/10-context-memory/hf-context-course/projects-pre-training-research-experiments-matrix-lr-038.md)
        - [Experiment Notes](/lib/10-context-memory/hf-context-course/projects-pre-training-research-experiments.md)
        - [Experiment: Lower SCALAR_LR from 0.7 to 0.6 to test whether slower learning of per-layer residual and initial scaling parameters improves validation bpb.](/lib/10-context-memory/hf-context-course/projects-pre-training-research-experiments-scalar-lr-06.md)
        - [Experiment: Increase SCALAR_LR from 0.7 to 0.8 to test whether faster learning of per-layer residual and initial scaling parameters improves validation bpb.](/lib/10-context-memory/hf-context-course/projects-pre-training-research-experiments-scalar-lr-08.md)
        - [Experiment: Increase UNEMBEDDING_LR from 0.01 to 0.015 to test whether a higher learning rate for the output layer improves validation bpb.](/lib/10-context-memory/hf-context-course/projects-pre-training-research-experiments-unembedding-lr-015.md)
        - [Experiment: Increase value_embeds weight_decay from 0.004 to 0.005 to test whether stronger regularization on value embeddings improves validation bpb.](/lib/10-context-memory/hf-context-course/projects-pre-training-research-experiments-value-embeds-wd-005.md)
        - [Experiment: Decrease WARMDOWN_RATIO from 0.825 to 0.75 to allow more time at higher learning rates before the final LR floor.](/lib/10-context-memory/hf-context-course/projects-pre-training-research-experiments-warmdown-075.md)
      - [Autolab Notes](/lib/10-context-memory/hf-context-course/projects-pre-training-research-notes.md)
      - [Hugging Face Paper Ideas](/lib/10-context-memory/hf-context-course/projects-pre-training-research-paper-ideas.md)
      - **templates**
        - [Campaign:](/lib/10-context-memory/hf-context-course/projects-pre-training-research-templates-campaign.md)
        - [Do-Not-Repeat Template](/lib/10-context-memory/hf-context-course/projects-pre-training-research-templates-do-not-repeat.md)
        - [Experiment:](/lib/10-context-memory/hf-context-course/projects-pre-training-research-templates-experiment.md)
  - [Multi-Autoresearch](/lib/10-context-memory/hf-context-course/projects.md)
- **units**
  - **en**
    - **unit0**
      - [Welcome to The Context Course](/lib/10-context-memory/hf-context-course/units-en-unit0-introduction.md)
    - **unit1**
      - [Building Your First Skill](/lib/10-context-memory/hf-context-course/units-en-unit1-building-skills.md)
      - [Unit 1: Agent Skills](/lib/10-context-memory/hf-context-course/units-en-unit1-introduction.md)
      - [Quiz 1: Understanding Skills and the Specification](/lib/10-context-memory/hf-context-course/units-en-unit1-quiz1.md)
      - [Quiz 2: Building and Using Skills](/lib/10-context-memory/hf-context-course/units-en-unit1-quiz2.md)
      - [The SKILL.md Format](/lib/10-context-memory/hf-context-course/units-en-unit1-skill-format.md)
      - [Using Skills with Code Agents](/lib/10-context-memory/hf-context-course/units-en-unit1-using-skills.md)
      - [What Are Agent Skills?](/lib/10-context-memory/hf-context-course/units-en-unit1-what-are-skills.md)
    - **unit2**
      - [Building MCP Servers with Python](/lib/10-context-memory/hf-context-course/units-en-unit2-building-servers.md)
      - [Gradio MCP Integration: Web UIs + MCP Servers](/lib/10-context-memory/hf-context-course/units-en-unit2-gradio-mcp.md)
      - [Hands-On: Build and Deploy an MCP Server](/lib/10-context-memory/hf-context-course/units-en-unit2-hands-on.md)
      - [Introduction to Model Context Protocol](/lib/10-context-memory/hf-context-course/units-en-unit2-introduction.md)
      - [MCP Key Concepts and Architecture](/lib/10-context-memory/hf-context-course/units-en-unit2-key-concepts.md)
      - [Configuring Agents as MCP Clients](/lib/10-context-memory/hf-context-course/units-en-unit2-mcp-clients.md)
      - [Quiz 1: MCP Fundamentals](/lib/10-context-memory/hf-context-course/units-en-unit2-quiz1.md)
      - [Quiz 2: MCP in Practice](/lib/10-context-memory/hf-context-course/units-en-unit2-quiz2.md)
    - **unit3**
      - [Plugin Anatomy](/lib/10-context-memory/hf-context-course/units-en-unit3-anatomy.md)
      - [Building Your Own Plugin](/lib/10-context-memory/hf-context-course/units-en-unit3-building-plugins.md)
      - [Unit 3: Plugins](/lib/10-context-memory/hf-context-course/units-en-unit3-introduction.md)
      - [Quiz 1: Plugin Fundamentals](/lib/10-context-memory/hf-context-course/units-en-unit3-quiz1.md)
      - [Quiz 2: Building and Distributing Plugins](/lib/10-context-memory/hf-context-course/units-en-unit3-quiz2.md)
      - [Using Plugins](/lib/10-context-memory/hf-context-course/units-en-unit3-using-plugins.md)
    - **unit4**
      - [Hands-On: Multi-Agent Workflow](/lib/10-context-memory/hf-context-course/units-en-unit4-hands-on.md)
      - [Unit 4: Subagents](/lib/10-context-memory/hf-context-course/units-en-unit4-introduction.md)
      - [Subagent Patterns](/lib/10-context-memory/hf-context-course/units-en-unit4-patterns.md)
      - [Quiz 1: Subagent Concepts](/lib/10-context-memory/hf-context-course/units-en-unit4-quiz1.md)
      - [Quiz 2: Multi-Agent Workflows](/lib/10-context-memory/hf-context-course/units-en-unit4-quiz2.md)
      - [Using Subagents](/lib/10-context-memory/hf-context-course/units-en-unit4-using-subagents.md)
    - **unit5**
      - [Hands-On: Build an Agent Activity Dashboard with Gradio](/lib/10-context-memory/hf-context-course/units-en-unit5-hands-on.md)
      - [Hook Events and the Agent Lifecycle](/lib/10-context-memory/hf-context-course/units-en-unit5-hook-events.md)
      - [Unit 5: Hooks](/lib/10-context-memory/hf-context-course/units-en-unit5-introduction.md)
      - [Quiz 1: Hook Fundamentals](/lib/10-context-memory/hf-context-course/units-en-unit5-quiz1.md)
      - [Quiz 2: Hooks in Practice](/lib/10-context-memory/hf-context-course/units-en-unit5-quiz2.md)
    - **unit6**
      - [The Agentic Loop Deep Dive](/lib/10-context-memory/hf-context-course/units-en-unit6-agent-loop.md)
      - [Hands-On: Extending Nano Harness](/lib/10-context-memory/hf-context-course/units-en-unit6-hands-on.md)
      - [Introduction to Nano Harness](/lib/10-context-memory/hf-context-course/units-en-unit6-introduction.md)
      - [Quiz: Nano Harness and Agent Internals](/lib/10-context-memory/hf-context-course/units-en-unit6-quiz1.md)
      - [Tools and Sandboxing in Detail](/lib/10-context-memory/hf-context-course/units-en-unit6-tools-and-sandboxing.md)

开始学习 → [The Context Course](projects-inference-_agents-skills-huggingface-local-models-references-hardware.md)

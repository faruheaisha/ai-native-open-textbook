---
title: "Quiz: Nano Harness and Agent Internals"
sourceId: "10-context-memory/hf-context-course"
sourceTitle: "The Context Course"
sourceKind: "系统课程"
licenseLabel: "仅引用"
lang: "英文"
tier: 1
volume: "10-context-memory"
sourceUrl: "https://github.com/huggingface/context-course"
entryUrl: "https://github.com/huggingface/context-course/blob/0448a7ca721a63a81531e1ba94f46f897c70645b/units/en/unit6/quiz1.mdx"
sourceRel: "units/en/unit6/quiz1.mdx"
rawUrl: "/raw/10-context-memory/hf-context-course/units/en/unit6/quiz1.mdx"
sourceSha256: "2950e535143bfe8ea19c24f1abd344b677aae8913aed31b5b1288cd3815d0afd"
pageSha256: "2950e535143bfe8ea19c24f1abd344b677aae8913aed31b5b1288cd3815d0afd"
contentMode: "local-full"
zh: ""
---

# Quiz: Nano Harness and Agent Internals

Test your understanding of agent loops, tools, and sandboxing.

**选项**

- A. Call model → return result immediately
- B. Call model → parse Python code → execute with tools → observe → repeat until final_answer()
- C. Model returns JSON → parse → store in database → done
- D. Keep calling the model until it returns the word 'done'

**答案解析**

- **A** — That's not an agent loop. A loop requires observation and repetition.
- **B（正确答案）** — Correct! That's the core loop: model → code → execute → observe → repeat.
- **C** — That's a one-shot API call, not an agent loop.
- **D** — The agent needs to execute code, not just call the model repeatedly.

**选项**

- A. The model outputs English text like 'The answer is 42'
- B. The model outputs Python code that calls tools; agent executes that code in a sandbox
- C. The model outputs JSON which the agent parses
- D. The model outputs commands like 'list_dir' and the agent translates them

**答案解析**

- **A** — Nano Harness is code-first. Model outputs Python code, not prose.
- **B（正确答案）** — Correct! Model → Python code → execution → observation.
- **C** — Some models do this, but nano_harness expects Python code.
- **D** — The model directly outputs Python function calls.

**选项**

- A. The message history grows with every loop iteration (model output + observation)
- B. The message history is cleared every step to save tokens
- C. The message history is stored in a database for later analysis
- D. The message history doesn't matter; only the latest model output matters

**答案解析**

- **A（正确答案）** — Correct! Each step adds assistant response + user observation. History provides memory.
- **B** — False. Full history is kept so the model can learn from prior steps.
- **C** — The history is maintained in memory during the loop.
- **D** — False. History provides crucial context for the model to make good decisions.

**选项**

- A. safe_path() allows reading any file on the system
- B. safe_path() prevents directory traversal by checking that paths stay within WORKSPACE
- C. safe_path() is optional; security isn't really needed
- D. safe_path() encrypts paths for transmission

**答案解析**

- **A** — False. safe_path() confines paths to the workspace directory.
- **B（正确答案）** — Correct! It resolves paths and ensures they're within the workspace.
- **C** — Safety is critical. Without safe_path(), agents could read /etc/passwd.
- **D** — No, it just prevents path escape attacks.

**选项**

- A. exec_cmd() allows any shell command to run
- B. exec_cmd() maintains a whitelist of safe commands; anything else is blocked
- C. exec_cmd() has a timeout to prevent hanging commands
- D. exec_cmd() runs commands with admin privileges

**答案解析**

- **A** — False. Only whitelisted commands (ls, cat, pwd, etc.) are allowed.
- **B（正确答案）** — Correct! Only safe commands like 'ls' work. 'rm' and 'curl' are blocked.
- **C** — True, but the whitelist is the primary security control.
- **D** — No. Commands run with normal user privileges and are rate-limited.

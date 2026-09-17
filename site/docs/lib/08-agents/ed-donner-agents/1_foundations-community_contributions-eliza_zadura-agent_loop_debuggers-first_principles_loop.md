---
title: "Buggy Kata"
sourceId: "08-agents/ed-donner-agents"
sourceTitle: "Ed Donner：AI Agents 实战课"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://github.com/ed-donner/agents"
entryUrl: "https://github.com/ed-donner/agents/blob/8ceaf66c24643627c1e4806851736bdd444bdd4b/1_foundations/community_contributions/eliza_zadura/agent_loop_debuggers/first_principles_loop/README.md"
sourceRel: "1_foundations/community_contributions/eliza_zadura/agent_loop_debuggers/first_principles_loop/README.md"
rawUrl: "/raw/08-agents/ed-donner-agents/1_foundations/community_contributions/eliza_zadura/agent_loop_debuggers/first_principles_loop/README.md"
sourceSha256: "29cb94f174fa07e2a8d54f5df876dcc71ebcbc10685330ce5859ea682263c414"
pageSha256: "29cb94f174fa07e2a8d54f5df876dcc71ebcbc10685330ce5859ea682263c414"
contentMode: "local-full"
zh: ""
---

# Buggy Kata

A minimal Python repo for practicing writing agent loops. Contains 4 utility functions with intentionally seeded bugs and a pytest test suite to verify fixes. Run the agent loop from the `agent_tool_loop.py` file, or the `agent_tool_loop.ipynb` notebook.

Reset to the initial buggy state anytime with:
`python buggy_kata/reset_kata.py`

## The Challenge

This repo contains 4 utility functions, each with a bug:

| Function | Purpose | Status |
|----------|---------|--------|
| `reverse_string(s)` | Reverse a string | Buggy |
| `is_prime(n)` | Check if a number is prime | Buggy |
| `find_max(items)` | Find the maximum value in a list | Buggy |
| `word_count(text)` | Count words in a text | Buggy |

### Your agent should

1. Run `pytest -v` to see which tests fail
2. Read the failing test output to understand the bug
3. Fix the bug in `src/utils.py`
4. Repeat until all tests pass

## Expected Failures

When you first run the tests, you should see **7 failing tests** from 4 bugs:

| Bug | Failing Tests |
| :---: | :---: |
| `reverse_string` drops last char | `test_reverse_simple`, `test_reverse_single_char`, `test_reverse_palindrome` |
| `is_prime(1)` returns True | `test_edge_cases` |
| `find_max` returns minimum | `test_find_max_positive`, `test_find_max_negative` |
| `word_count` doesn't split on punctuation | `test_count_with_punctuation` |

## Project Structure

```
buggy_kata/
├── src/
│   ├── __init__.py
│   └── utils.py          # Functions with seeded bugs
├── tests/
│   ├── __init__.py
│   └── test_utils.py     # Test suite
├── requirements.txt
└── README.md
```

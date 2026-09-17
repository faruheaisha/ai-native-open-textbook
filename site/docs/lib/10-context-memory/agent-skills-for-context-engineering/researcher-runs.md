---
title: "Researcher Runs"
sourceId: "10-context-memory/agent-skills-for-context-engineering"
sourceTitle: "Agent Skills for Context Engineering"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering"
entryUrl: "https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering/blob/6dbe1a1d868eab51a3bc9011b0f55e2891513e40/researcher/runs/README.md"
sourceRel: "researcher/runs/README.md"
rawUrl: "/raw/10-context-memory/agent-skills-for-context-engineering/researcher/runs/README.md"
sourceSha256: "f312c3625f1117d645a211ce4e1c7cecb141229dbb33f9599572e56866da3dc0"
pageSha256: "f312c3625f1117d645a211ce4e1c7cecb141229dbb33f9599572e56866da3dc0"
contentMode: "local-full"
zh: ""
---

# Researcher Runs

Each run is one trip through the research-to-skill state machine. Run directories are runtime artifacts; only the seed run is committed as a worked example.

## Layout

```
researcher/runs/<timestamp>-<slug>/
  run-state.json              # state machine, locked surfaces, transition history
  THREAD.md                   # human-readable thread log
  sources/
    queue.jsonl               # source records for this run
    evaluations/              # source-evaluation JSON (drafts allowed, completed required for publish)
    evidence/
      retrieval.md            # pointer log of retrieved evidence
      raw/                    # raw fetched HTML/JSON
  proposals/
    skill-proposal.md         # proposal targeting a specific skill change
    mechanism-proposal.jsonl  # candidate mechanisms for the registry
  reports/
    validation-report.json    # repo-level validation snapshot at init time
    validation-report.md      # human summary
    novelty-result.json       # latest novelty check (created by `research_loop.py novelty`)
    pr-readiness.md           # PR summary, test plan, risks (created by `pr-ready`)
    closure.json              # set by `close`
    run-readiness.{json,md}   # set by `validate-run`
  logs/
```

## State machine

```
initialized -> retrieved -> evaluated -> proposed -> novelty_checked -> validated -> pr_ready -> closed
```

Use `researcher/scripts/research_loop.py` subcommands rather than editing `run-state.json` directly:

```bash
python3 researcher/scripts/research_loop.py init --title "..." --url "..."
python3 researcher/scripts/research_loop.py retrieve --run-dir <run> --file <evidence>
python3 researcher/scripts/research_loop.py evaluate --run-dir <run>
python3 researcher/scripts/research_loop.py propose --run-dir <run>
python3 researcher/scripts/research_loop.py novelty --run-dir <run>
python3 researcher/scripts/research_loop.py validate-run --run-dir <run>
python3 researcher/scripts/research_loop.py pr-ready --run-dir <run> --summary <text> --test-plan <text> --risks <text>
python3 researcher/scripts/research_loop.py close --run-dir <run> --status reference-only --reason <text> --reviewed-by <handle>
```

## What is committed

Only `researcher/runs/20260515-035228-executable-autonomous-research-frameworks/` is committed. It is the worked example that bootstrapped the harness-engineering skill and the mechanism registry. Its `current_state` is `closed` and `close_status` is `reference-only`.

All other run directories are local runtime state and are excluded by `.gitignore`. PRs should not introduce new committed runs; if you need a regression fixture, add it under `researcher/fixtures/` instead.

---
title: "Framework Detection (Advisory)"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/python-appservice-deploy/references/detect.md"
sourceRel: ".github/plugins/azure-skills/skills/python-appservice-deploy/references/detect.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/python-appservice-deploy/references/detect.md"
sourceSha256: "318e1a2ccd214082c79aeb418f39471bdcf565c9adbb638e319101a356e1f4cf"
pageSha256: "318e1a2ccd214082c79aeb418f39471bdcf565c9adbb638e319101a356e1f4cf"
contentMode: "local-full"
zh: ""
---

# Framework Detection (Advisory)

Framework detection is **advisory only**. The deployment never blocks because of an unknown framework.

## What to check

1. **Confirm Python project** — at least one of:
   - `requirements.txt`
   - `pyproject.toml`
   - `*.py` files in workspace root
2. **Scan dependencies** in `requirements.txt` or `pyproject.toml`:

| Token (case-insensitive) | Detected framework |
|---|---|
| `flask`, `Flask` | **flask** |
| `django`, `Django` | **django** |
| `fastapi` | **fastapi** |
| `gunicorn` (alone, no flask) | **wsgi-generic** |
| `uvicorn` (alone, no fastapi) | **asgi-generic** |
| None of the above | **unknown** |

3. **Locate the WSGI / ASGI entry point** (best-effort):
   - Flask common: `app.py` exporting `app`, `application.py`, `wsgi.py`
   - Django common: `<project>/wsgi.py`
   - FastAPI common: `main.py` exporting `app`
4. **Record findings** in your working memory so Step 5 (startup) can use them.

## Outcomes

| Detection | Step 5 behavior |
|---|---|
| `flask` | Skip startup auto-config. Oryx auto-detects Flask and starts it. |
| `django` | Skip startup auto-config. Oryx auto-detects Django via `wsgi.py` and starts it. |
| `fastapi` (any Python version) | **Always auto-set** startup: `python -m uvicorn main:app --host 0.0.0.0` (replace `main:app` with the discovered entry point if different — e.g., `app.main:app`). The skill does not rely on Oryx FastAPI auto-detection. |

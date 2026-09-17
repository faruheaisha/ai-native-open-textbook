---
title: "Flask Knowledge Pack"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-kubernetes/azure-kubernetes-app-deploy/knowledge-packs/frameworks/flask.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-kubernetes/azure-kubernetes-app-deploy/knowledge-packs/frameworks/flask.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-kubernetes/azure-kubernetes-app-deploy/knowledge-packs/frameworks/flask.md"
sourceSha256: "d8403f95736a0215544f472dbb542269ec9769803487c1ff4ce1b724fcf63d9e"
pageSha256: "d8403f95736a0215544f472dbb542269ec9769803487c1ff4ce1b724fcf63d9e"
contentMode: "local-full"
zh: ""
---

# Flask Knowledge Pack

> **Applies to:** Projects detected with `requirements.txt`, `pyproject.toml`, or `Pipfile` containing `flask`

## Quick Reference

| Property | Value |
|----------|-------|
| Signal files | `requirements.txt`/`pyproject.toml`/`Pipfile` containing `flask` |
| Default port | `8000` prod (`5000` dev — never in prod) |
| Health path | `/health` + `/ready` |
| Base template | `templates/dockerfiles/python.Dockerfile` (+ `references/base-images.md`) |

---

## Health Endpoints

Flask does not include health check endpoints — they must be defined explicitly in application code:

### Minimal health route

```python
from flask import Flask, jsonify

app = Flask(__name__)

@app.route("/health")
def health():
    return jsonify(status="ok"), 200
```

### Readiness route with database check

```python
from flask import jsonify
from sqlalchemy import text

@app.route("/ready")
def ready():
    try:
        db.session.execute(text("SELECT 1"))
        return jsonify(status="ready"), 200
    except Exception:
        return jsonify(status="not ready"), 503
```

### Probe configuration in Deployment manifest

```yaml
livenessProbe:
  httpGet:
    path: /health
    port: 8000
  initialDelaySeconds: 5
  periodSeconds: 15
  timeoutSeconds: 3
  failureThreshold: 3
readinessProbe:
  httpGet:
    path: /ready
    port: 8000
  initialDelaySeconds: 5
  periodSeconds: 10
  timeoutSeconds: 3
  failureThreshold: 3
```

**Note:** Flask apps behind gunicorn start quickly (typically <3s), so `initialDelaySeconds: 5` is sufficient — much lower than JVM-based frameworks.

---

## Database Profiles

Flask does not have a built-in profile system. Database configuration is typically driven by environment variables:

| ORM / Driver | Package(s) | Connection String Env Var |
|-------------|-----------|--------------------------|
| Flask-SQLAlchemy | `flask-sqlalchemy`, `psycopg2-binary` | `SQLALCHEMY_DATABASE_URI` |
| SQLAlchemy direct | `sqlalchemy`, `psycopg2-binary` | `DATABASE_URL` |
| psycopg2 direct | `psycopg2-binary` | `DATABASE_URL` |

**Important:** Flask-SQLAlchemy reads the connection string from `app.config["SQLALCHEMY_DATABASE_URI"]`, which is typically set via `os.environ.get("SQLALCHEMY_DATABASE_URI")` or `os.environ.get("DATABASE_URL")`. Ensure the env var name matches what the app expects.

### Environment variables for PostgreSQL on AKS

```yaml
env:
  - name: SQLALCHEMY_DATABASE_URI
    value: "postgresql://{{IDENTITY_NAME}}@{{PG_SERVER_NAME}}.postgres.database.azure.com:5432/{{DB_NAME}}?sslmode=require"
  - name: SECRET_KEY
    valueFrom:
      secretKeyRef:
        name: {{APP_NAME}}-secrets
        key: secret-key
```

### Secret for SECRET_KEY

Flask requires `SECRET_KEY` for session signing, CSRF tokens, and any use of `flask.session`. Never hardcode it — store it in a Kubernetes Secret:

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: {{APP_NAME}}-secrets
type: Opaque
stringData:

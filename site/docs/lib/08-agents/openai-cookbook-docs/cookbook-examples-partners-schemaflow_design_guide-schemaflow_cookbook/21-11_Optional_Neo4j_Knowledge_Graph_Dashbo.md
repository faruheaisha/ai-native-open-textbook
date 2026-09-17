---
title: "openai-cookbook-docs"
sourceId: "08-agents/openai-cookbook-docs"
sourceTitle: "openai-cookbook-docs"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://developers.openai.com/cookbook"
entryUrl: "https://developers.openai.com/cookbook"
sourceRel: "cookbook/examples/partners/schemaflow_design_guide/schemaflow_cookbook.md"
rawUrl: "/raw/08-agents/openai-cookbook-docs/cookbook/examples/partners/schemaflow_design_guide/schemaflow_cookbook.md"
sourceSha256: "afab413d868b1d2b8951a5c01c177c86ce2789efff0e64115a37780fd84076dc"
pageSha256: "d741939af97f91d006f48fec9ad2cd88b72a165ac28197be2fe0cd1b63c590c5"
contentMode: "local-full"
zh: ""
---

## 11) Optional Neo4j Knowledge Graph & Dashboard

This optional section is **fully self-contained** and **does not affect the core pipeline above**. It uses a small synthetic customer-loyalty graph seed plus inline dashboard code so the cookbook stays portable. Readers can treat it as a visual appendix: the core workflow works without Neo4j, but graph views make lineage and downstream impact easier to inspect.

**What this section does, in order:**

1. **Step 1 - Seed**: define a synthetic customer-loyalty graph with ODS, staging, core, mart, and CRM objects, their columns, lineage, and joins as an inline Python data structure - no external files.
2. **Step 2 - AI Enrichment**: use the OpenAI `client` already loaded in Section 1 to fill in `semantic_meaning` (a short 2-5 word tag like `natural-key`, `foreign-key`, `monetary-amount`, `timestamp`) for every column.
3. **Step 3 - Upsert to Neo4j**: write the enriched data to a running Neo4j instance via idempotent `MERGE` Cypher. Nodes are labeled `SchemaFlowCookbook` so the dashboard ignores stale sample data from older local runs.
4. **Dashboard**: write a small FastAPI server + D3.js page next to the notebook, launch it on `http://127.0.0.1:8005`, and print a clickable link.

**Prerequisites for this section:**

- A running Neo4j instance, e.g. via Docker: `docker run -d -p 7687:7687 -p 7474:7474 -e NEO4J_AUTH=neo4j/change-me-please neo4j:5` (Neo4j Desktop or AuraDB free tier also work).
- `NEO4J_URI`, `NEO4J_USER`, `NEO4J_PASSWORD` (loaded via env, or entered at the prompt below).
- A free local port `8005` for the dashboard (override via `NEO4J_DASHBOARD_PORT`).
- Optional packages `neo4j`, `fastapi`, `uvicorn` - the next cell will install them lazily if missing.

If any prerequisite is missing, every cell below short-circuits with a clear message; nothing throws and the rest of the notebook is unaffected.

### 11.1) Environment Setup & Optional Dependencies

Mirrors Section 1's OpenAI env loading pattern. Lazy-installs `neo4j`, `fastapi`, and `uvicorn` only when they are not importable, then reads `NEO4J_URI`, `NEO4J_USER`, and `NEO4J_PASSWORD` from the environment (or prompts via `getpass` if missing). If you press Enter at any prompt without typing, the section is disabled (`NEO4J_SECTION_ENABLED = False`) and the remaining cells skip cleanly.

```python
import os
import subprocess
import sys
from getpass import getpass
from urllib.parse import urlparse

NEO4J_SECTION_ENABLED = True

def _ensure_pkg(pkg, import_name=None):
    name = import_name or pkg
    try:
        __import__(name)
        return True
    except Exception:
        print(f"Installing {pkg} (only needed for Section 11)...", flush=True)
        rc = subprocess.call([sys.executable, "-m", "pip", "install", "-q", pkg])
        if rc != 0:
            print(f"  pip install {pkg} failed (rc={rc}); Section 11 will be skipped.")
            return False
        try:
            __import__(name)
            return True
        except Exception as e:
            print(f"  Import still failing after install of {pkg}: {e}")
            return False

for _pkg, _imp in [("neo4j", "neo4j"), ("fastapi", "fastapi"), ("uvicorn", "uvicorn")]:
    if not _ensure_pkg(_pkg, _imp):
        NEO4J_SECTION_ENABLED = False

if not os.getenv("NEO4J_URI"):
    os.environ["NEO4J_URI"] = getpass("Enter NEO4J_URI (e.g. neo4j://127.0.0.1:7687) or press Enter to skip: ")
if not os.getenv("NEO4J_USER"):
    os.environ["NEO4J_USER"] = getpass("Enter NEO4J_USER (default 'neo4j') or press Enter to skip: ") or "neo4j"
if not os.getenv("NEO4J_PASSWORD"):
    os.environ["NEO4J_PASSWORD"] = getpass("Enter NEO4J_PASSWORD or press Enter to skip: ")

NEO4J_URI = (os.getenv("NEO4J_URI") or "").strip()
NEO4J_USER = (os.getenv("NEO4J_USER") or "").strip()
NEO4J_PASSWORD = os.getenv("NEO4J_PASSWORD") or ""

def _normalize_neo4j_uri(uri):
    parsed = urlparse(uri)
    if parsed.scheme in {"bolt", "bolt+ssc", "bolt+s", "neo4j", "neo4j+ssc", "neo4j+s"}:
        return uri
    if parsed.scheme in {"http", "https"} and parsed.hostname in {"127.0.0.1", "localhost", "::1"}:
        return f"neo4j://{parsed.hostname}:7687"
    return uri

_normalized_neo4j_uri = _normalize_neo4j_uri(NEO4J_URI)
if _normalized_neo4j_uri != NEO4J_URI:
    print(f"Converted Neo4j browser URL {NEO4J_URI!r} to driver URI {_normalized_neo4j_uri!r}.")
    NEO4J_URI = _normalized_neo4j_uri
    os.environ["NEO4J_URI"] = NEO4J_URI

if not (NEO4J_URI and NEO4J_USER and NEO4J_PASSWORD):
    print("Neo4j credentials not fully provided. Section 11 will be skipped (other cells will short-circuit safely).")
    NEO4J_SECTION_ENABLED = False
else:
    print(f"Neo4j configured: {NEO4J_USER}@{NEO4J_URI}")

print(f"NEO4J_SECTION_ENABLED = {NEO4J_SECTION_ENABLED}")
```

### 11.2) Step 1 - Seed: Define the Knowledge Graph Data

Builds the in-memory data structure for the graph: schemas, tables (with `description`, `primary_key`), columns (with `type`, `nullable`, `is_primary_key`, optional `description`, and a `semantic_meaning` placeholder to be filled by AI in the next step), foreign keys, views, lineage edges (`DERIVED_FROM`), and joins.

This inline synthetic retail graph is aligned to the cookbook change request: `LOYALTY_TIER` is added to `ODS.ODS_CUSTOMER_PROFILE`, sourced from `CORE.DIM_CUSTOMER`, and propagated into downstream staging, core, mart, and CRM consumers.

**No Neo4j calls here** - this cell only prepares Python data structures. Nothing is written until Step 3.

```python
SCHEMAS = ["ODS", "STG", "CORE", "MARTS", "CRM"]

TABLES = {
    "ODS.ODS_CUSTOMER_PROFILE": {
        "description": "Raw customer profile table that receives LOYALTY_TIER in this change.",
        "primary_key": ["CUSTOMER_ID"],
        "columns": [
            {"name": "CUSTOMER_ID", "type": "VARCHAR(32)", "nullable": False,
             "description": "Stable customer identifier from the source system.",
             "semantic_meaning": "customer-identifier"},
            {"name": "EMAIL_HASH", "type": "VARCHAR(64)", "nullable": True,
             "description": "Hashed email value used for matching without exposing PII."},
            {"name": "CUSTOMER_STATUS", "type": "VARCHAR(20)", "nullable": True},
            {"name": "LOYALTY_TIER", "type": "VARCHAR(20)", "nullable": True,
             "description": "Nullable loyalty segment added by the change request and backfilled from CORE.DIM_CUSTOMER.",
             "semantic_meaning": "loyalty-segment"},
            {"name": "UPDATED_AT", "type": "TIMESTAMP", "nullable": True},
            {"name": "INGESTED_AT", "type": "TIMESTAMP", "nullable": True},
        ],
    },
    "ODS.ODS_ORDER": {
        "description": "Raw order header feed used to measure loyalty-tier revenue impact.",
        "primary_key": ["ORDER_ID"],
        "columns": [
            {"name": "ORDER_ID", "type": "VARCHAR(40)", "nullable": False,
             "semantic_meaning": "order-identifier"},
            {"name": "ORDER_TS", "type": "TIMESTAMP", "nullable": False},
            {"name": "CUSTOMER_ID", "type": "VARCHAR(32)", "nullable": True},
            {"name": "ORDER_STATUS", "type": "VARCHAR(30)", "nullable": True},
            {"name": "NET_AMOUNT", "type": "NUMERIC(12,2)", "nullable": True},
        ],
    },
    "STG.STG_CUSTOMER_PROFILE": {
        "description": "Staging table that normalizes customer profile rows for downstream dimensions and views.",
        "primary_key": ["CUSTOMER_ID"],
        "columns": [
            {"name": "CUSTOMER_ID", "type": "VARCHAR(32)", "nullable": False,
             "semantic_meaning": "customer-identifier"},
            {"name": "CUSTOMER_STATUS", "type": "VARCHAR(20)", "nullable": True},
            {"name": "LOYALTY_TIER", "type": "VARCHAR(20)", "nullable": True,
             "description": "Propagated loyalty segment from ODS.ODS_CUSTOMER_PROFILE.",
             "semantic_meaning": "loyalty-segment"},
            {"name": "PROFILE_UPDATED_AT", "type": "TIMESTAMP", "nullable": True},
        ],
    },
    "STG.STG_ORDER_ENRICHED": {
        "description": "Staging order table enriched with customer status and loyalty tier for metrics.",
        "primary_key": ["ORDER_ID"],
        "columns": [
            {"name": "ORDER_ID", "type": "VARCHAR(40)", "nullable": False},
            {"name": "CUSTOMER_ID", "type": "VARCHAR(32)", "nullable": True},
            {"name": "LOYALTY_TIER", "type": "VARCHAR(20)", "nullable": True,
             "semantic_meaning": "loyalty-segment"},
            {"name": "ORDER_TS", "type": "TIMESTAMP", "nullable": False},
            {"name": "NET_AMOUNT", "type": "NUMERIC(12,2)", "nullable": True},
        ],
    },
    "CORE.DIM_CUSTOMER": {
        "description": "Conformed customer dimension and source for the LOYALTY_TIER backfill.",
        "primary_key": ["CUSTOMER_SK"],
        "columns": [
            {"name": "CUSTOMER_SK", "type": "BIGINT", "nullable": False,
             "semantic_meaning": "surrogate-key"},
            {"name": "CUSTOMER_ID", "type": "VARCHAR(32)", "nullable": False,
             "semantic_meaning": "customer-identifier"},
            {"name": "EMAIL_HASH", "type": "VARCHAR(64)", "nullable": True},
            {"name": "COUNTRY_CODE", "type": "VARCHAR(2)", "nullable": True},
            {"name": "LOYALTY_TIER", "type": "VARCHAR(20)", "nullable": True,
             "description": "Current loyalty segment used as the backfill source.",
             "semantic_meaning": "loyalty-segment"},
            {"name": "IS_CURRENT", "type": "BOOLEAN", "nullable": False,
             "semantic_meaning": "current-row-flag"},
            {"name": "VALID_FROM_TS", "type": "TIMESTAMP", "nullable": True},
            {"name": "VALID_TO_TS", "type": "TIMESTAMP", "nullable": True},
        ],
    },
    "CORE.DIM_LOYALTY_TIER": {
        "description": "Reference dimension for loyalty tier labels, rank, and benefits.",
        "primary_key": ["LOYALTY_TIER"],
        "columns": [
            {"name": "LOYALTY_TIER", "type": "VARCHAR(20)", "nullable": False,
             "semantic_meaning": "loyalty-segment"},
            {"name": "TIER_RANK", "type": "INTEGER", "nullable": True},
            {"name": "TIER_DESCRIPTION", "type": "VARCHAR(255)", "nullable": True},
            {"name": "ACTIVE_FLAG", "type": "BOOLEAN", "nullable": True},
        ],
    },
    "CORE.FACT_ORDER": {
        "description": "Order fact table used by revenue and customer 360 marts.",
        "primary_key": ["ORDER_ID"],
        "columns": [
            {"name": "ORDER_ID", "type": "VARCHAR(40)", "nullable": False},
            {"name": "CUSTOMER_SK", "type": "BIGINT", "nullable": True},
            {"name": "ORDER_TS", "type": "TIMESTAMP", "nullable": False},
            {"name": "NET_AMOUNT", "type": "NUMERIC(12,2)", "nullable": True,
             "semantic_meaning": "monetary-amount"},
        ],
    },
    "CORE.FACT_CUSTOMER_ACTIVITY": {
        "description": "Daily customer activity fact used for retention and loyalty reporting.",
        "primary_key": ["CUSTOMER_SK", "ACTIVITY_DATE"],
        "columns": [
            {"name": "CUSTOMER_SK", "type": "BIGINT", "nullable": False},
            {"name": "ACTIVITY_DATE", "type": "DATE", "nullable": False},
            {"name": "LOYALTY_TIER", "type": "VARCHAR(20)", "nullable": True,
             "semantic_meaning": "loyalty-segment"},
            {"name": "ORDER_COUNT", "type": "INTEGER", "nullable": True},
            {"name": "NET_AMOUNT", "type": "NUMERIC(12,2)", "nullable": True},
        ],
    },
    "CRM.CUSTOMER_SEGMENT_EXPORT": {
        "description": "Activation export consumed by marketing journeys and retention campaigns.",
        "primary_key": ["CUSTOMER_ID"],
        "columns": [
            {"name": "CUSTOMER_ID", "type": "VARCHAR(32)", "nullable": False},
            {"name": "LOYALTY_TIER", "type": "VARCHAR(20)", "nullable": True,
             "semantic_meaning": "loyalty-segment"},
            {"name": "SEGMENT_CODE", "type": "VARCHAR(40)", "nullable": True},
            {"name": "EXPORT_BATCH_ID", "type": "VARCHAR(40)", "nullable": True},
        ],
    },
}

VIEWS = {
    "MARTS.VW_CUSTOMER_360": {"description": "Customer 360 view with profile, loyalty tier, and recent activity."},
    "MARTS.VW_LOYALTY_REVENUE": {"description": "Revenue by loyalty tier for dashboarding and finance checks."},
    "MARTS.VW_RETENTION_BY_TIER": {"description": "Retention metrics grouped by current loyalty tier."},
}

# (from_schema, from_table, from_col, to_schema, to_table, to_col)
FOREIGN_KEYS = [
    ("ODS",  "ODS_ORDER",              "CUSTOMER_ID",  "ODS",  "ODS_CUSTOMER_PROFILE", "CUSTOMER_ID"),
    ("STG",  "STG_CUSTOMER_PROFILE",   "CUSTOMER_ID",  "ODS",  "ODS_CUSTOMER_PROFILE", "CUSTOMER_ID"),
    ("STG",  "STG_ORDER_ENRICHED",     "CUSTOMER_ID",  "STG",  "STG_CUSTOMER_PROFILE", "CUSTOMER_ID"),
    ("CORE", "DIM_CUSTOMER",           "CUSTOMER_ID",  "ODS",  "ODS_CUSTOMER_PROFILE", "CUSTOMER_ID"),
    ("CORE", "DIM_CUSTOMER",           "LOYALTY_TIER", "CORE", "DIM_LOYALTY_TIER",    "LOYALTY_TIER"),
    ("CORE", "FACT_ORDER",             "CUSTOMER_SK",  "CORE", "DIM_CUSTOMER",        "CUSTOMER_SK"),
    ("CORE", "FACT_CUSTOMER_ACTIVITY", "CUSTOMER_SK",  "CORE", "DIM_CUSTOMER",        "CUSTOMER_SK"),
    ("CORE", "FACT_CUSTOMER_ACTIVITY", "LOYALTY_TIER", "CORE", "DIM_LOYALTY_TIER",    "LOYALTY_TIER"),
    ("CRM",  "CUSTOMER_SEGMENT_EXPORT", "CUSTOMER_ID",  "ODS",  "ODS_CUSTOMER_PROFILE", "CUSTOMER_ID"),
]

DERIVED_FROM = [
    ("ODS.ODS_CUSTOMER_PROFILE",      "CORE.DIM_CUSTOMER"),
    ("STG.STG_CUSTOMER_PROFILE",      "ODS.ODS_CUSTOMER_PROFILE"),
    ("STG.STG_ORDER_ENRICHED",        "ODS.ODS_ORDER"),
    ("STG.STG_ORDER_ENRICHED",        "STG.STG_CUSTOMER_PROFILE"),
    ("CORE.DIM_CUSTOMER",             "STG.STG_CUSTOMER_PROFILE"),
    ("CORE.DIM_CUSTOMER",             "CORE.DIM_LOYALTY_TIER"),
    ("CORE.FACT_ORDER",               "STG.STG_ORDER_ENRICHED"),
    ("CORE.FACT_ORDER",               "CORE.DIM_CUSTOMER"),
    ("CORE.FACT_CUSTOMER_ACTIVITY",   "CORE.FACT_ORDER"),
    ("CORE.FACT_CUSTOMER_ACTIVITY",   "CORE.DIM_CUSTOMER"),
    ("MARTS.VW_CUSTOMER_360",         "CORE.DIM_CUSTOMER"),
    ("MARTS.VW_CUSTOMER_360",         "CORE.FACT_CUSTOMER_ACTIVITY"),
    ("MARTS.VW_LOYALTY_REVENUE",      "CORE.FACT_ORDER"),
    ("MARTS.VW_LOYALTY_REVENUE",      "CORE.DIM_LOYALTY_TIER"),
    ("MARTS.VW_RETENTION_BY_TIER",    "CORE.FACT_CUSTOMER_ACTIVITY"),
    ("MARTS.VW_RETENTION_BY_TIER",    "CORE.DIM_LOYALTY_TIER"),
    ("CRM.CUSTOMER_SEGMENT_EXPORT",   "MARTS.VW_CUSTOMER_360"),
    ("CRM.CUSTOMER_SEGMENT_EXPORT",   "MARTS.VW_RETENTION_BY_TIER"),
]

JOINS = [
    ("STG.STG_ORDER_ENRICHED",      "STG.STG_CUSTOMER_PROFILE"),
    ("CORE.FACT_ORDER",             "CORE.DIM_CUSTOMER"),
    ("CORE.FACT_CUSTOMER_ACTIVITY", "CORE.DIM_CUSTOMER"),
    ("CORE.FACT_CUSTOMER_ACTIVITY", "CORE.DIM_LOYALTY_TIER"),
    ("MARTS.VW_CUSTOMER_360",       "CORE.DIM_CUSTOMER"),
    ("MARTS.VW_LOYALTY_REVENUE",    "CORE.DIM_LOYALTY_TIER"),
    ("MARTS.VW_RETENTION_BY_TIER",  "CORE.DIM_LOYALTY_TIER"),
]

for _tid, _meta in TABLES.items():
    _pk = set(_meta.get("primary_key", []) or [])
    for _c in _meta["columns"]:
        _c.setdefault("is_primary_key", _c["name"] in _pk)
        _c.setdefault("description", None)
        _c.setdefault("semantic_meaning", None)

_total_cols = sum(len(t["columns"]) for t in TABLES.values())
_total_pks = sum(len(t.get("primary_key", []) or []) for t in TABLES.values())
print(f"Seed prepared: {len(SCHEMAS)} schemas, {len(TABLES)} tables, {len(VIEWS)} views, "
      f"{_total_cols} columns ({_total_pks} primary keys), {len(FOREIGN_KEYS)} FKs, "
      f"{len(DERIVED_FROM)} DERIVED_FROM edges, {len(JOINS)} JOINS edges.")
```

### 11.3) Step 2 - AI Enrichment

Uses the OpenAI `client` and `MODEL` already initialized in Section 1 to generate a short `semantic_meaning` tag (2-5 words, e.g. `natural-key`, `foreign-key`, `monetary-amount`, `timestamp`, `descriptive-text`) for every column whose value is currently `None`. One LLM call per column, plain-text response. The prompt is defined inline so this cell remains self-contained.

Cost control: capped at **`MAX_ENRICH_COLS = 30`** columns per run (override via env `SEED_AI_ENRICH_LIMIT`). Set `SEED_AI_ENRICH=0` to skip enrichment entirely. Per-column failures are caught and logged; the cell never raises. Skipped entirely if Section 11 was disabled in Step 0.

```python
ENRICH_SYSTEM = (
    "You are a data architect assistant. Your task is to provide concise semantic-meaning "
    "tags (2-5 words) for database columns. Do not add any preamble or explanation."
)

def _enrich_one(_client, _model, table_name, c):
    user_prompt = (
        f"Provide a short 2-5 word semantic-meaning tag for a database column "
        f"named '{c['name']}'. It is part of the table '{table_name}'. "
        f"It has a data type of '{c.get('type','UNKNOWN')}'. "
        f"Examples of valid tags: natural-key, foreign-key, surrogate-key, "
        f"monetary-amount, timestamp, descriptive-text, category-code, count, boolean-flag. "
        f"Return only the tag, with no quotes, no punctuation at the end, no extra prose."
    )
    try:
        resp = _client.responses.create(
            model=_model,
            input=[
                {"role": "system", "content": ENRICH_SYSTEM},
                {"role": "user", "content": user_prompt},
            ],
        )
        text = (getattr(resp, "output_text", None) or "").strip()
        if not text:
            for item in (getattr(resp, "output", []) or []):
                for sub in getattr(item, "content", []) or []:
                    t = getattr(sub, "text", None)
                    if isinstance(t, str):
                        text += t
                    elif isinstance(sub, dict):
                        text += sub.get("text", "")
        text = text.strip().strip('"').strip("'").strip(".")
        return text or None
    except Exception as e:
        print(f"  ! enrichment failed for {table_name}.{c['name']}: {type(e).__name__}: {e}")
        return None

def _run_ai_enrichment():
    if not NEO4J_SECTION_ENABLED:
        print("Section 11 disabled (see Step 0). Skipping AI enrichment.")
        return

    enabled = (os.getenv("SEED_AI_ENRICH", "1").strip().lower() in ("1", "true", "yes", "on"))
    max_cols = int(os.getenv("SEED_AI_ENRICH_LIMIT", "30"))

    if not enabled:
        print("AI enrichment disabled via SEED_AI_ENRICH=0. Columns will be upserted without semantic_meaning.")
        return

    try:
        _c = client
        _m = MODEL
    except NameError:
        print("OpenAI client/MODEL not found. Run Section 1 first, then re-run this cell.")
        return

    missing = []
    for tid, meta in TABLES.items():
        for col in meta["columns"]:
            if not col.get("semantic_meaning"):
                missing.append((tid, col))

    cap = min(len(missing), max_cols)
    print(f"AI enrichment: {len(missing)} column(s) need semantic_meaning; processing first {cap} "
          f"(cap via SEED_AI_ENRICH_LIMIT, model='{_m}').")

    updated = 0
    for tid, col in missing[:cap]:
        tag = _enrich_one(_c, _m, tid, col)
        if tag:
            col["semantic_meaning"] = tag
            updated += 1
            print(f"  + {tid}.{col['name']}: {tag}")

    print(f"\nAI enrichment complete: {updated}/{cap} columns updated.")

_run_ai_enrichment()
```

### 11.4) Step 3 - Upsert the Enriched Graph to Neo4j

Opens a Neo4j driver using the env vars loaded in Step 0, creates uniqueness constraints, then performs idempotent `MERGE` upserts for:

- **Schemas** (`Schema` nodes with `:CONTAINS` edges to Tables/Views)
- **Tables** with `description`
- **Columns** with `type`, `nullable`, `is_primary_key`, `description`, `semantic_meaning`
- **Foreign Keys** as `Column-[:FK_TO]->Column`
- **Views** with `description`
- **Lineage** as `(Table|View)-[:DERIVED_FROM]->(Table|View)`
- **Joins** as `(Table|View)-[:JOINS]->(Table|View)`

The Cypher is intentionally written inline so this cell remains self-contained. The `MERGE` pattern matches the inline seed structures above, and every cookbook node receives a `SchemaFlowCookbook` label so re-running refreshes this sample graph without exposing older local seed data in the dashboard.

The whole operation is wrapped in `try/except` - if Neo4j is unreachable, the cell prints a clear diagnostic and returns without raising.

```python
def _upsert_to_neo4j():
    if not NEO4J_SECTION_ENABLED:
        print("Section 11 disabled (see Step 0). Skipping Neo4j upsert.")
        return

    try:
        from neo4j import GraphDatabase
    except Exception as e:
        print(f"neo4j package not importable: {e}. Skipping upsert.")
        return

    try:
        drv = GraphDatabase.driver(NEO4J_URI, auth=(NEO4J_USER, NEO4J_PASSWORD))
    except Exception as e:
        print(f"Neo4j driver init failed: {e}. Skipping upsert.")
        return

    counts = {"schemas": 0, "tables": 0, "columns": 0, "fks": 0,
              "views": 0, "derived": 0, "joins": 0}
    try:
        with drv.session() as s:
            s.run("RETURN 1 AS ok").single()
            print(f"Neo4j connection OK ({NEO4J_USER}@{NEO4J_URI})")

            for cypher in [
                "CREATE CONSTRAINT IF NOT EXISTS FOR (t:Table)  REQUIRE t.id  IS UNIQUE",
                "CREATE CONSTRAINT IF NOT EXISTS FOR (c:Column) REQUIRE c.id  IS UNIQUE",
                "CREATE CONSTRAINT IF NOT EXISTS FOR (v:View)   REQUIRE v.id  IS UNIQUE",
                "CREATE CONSTRAINT IF NOT EXISTS FOR (sc:Schema) REQUIRE sc.name IS UNIQUE",
            ]:
                s.run(cypher)

            for sch in SCHEMAS:
                s.run("MERGE (sc:Schema {name:$name}) SET sc:SchemaFlowCookbook", name=sch)
                counts["schemas"] += 1

            for tid, meta in TABLES.items():
                schema, table = tid.split(".", 1)
                s.run(
                    """
                    MERGE (sc:Schema {name:$schema})
                    SET sc:SchemaFlowCookbook
                    MERGE (t:Table {id:$id})
                      ON CREATE SET t.created_by='schemaflow-cookbook'
                    SET t:SchemaFlowCookbook,
                        t.name=$table,
                        t.schema=$schema,
                        t.type='TABLE',
                        t.description = coalesce($desc, t.description)
                    MERGE (sc)-[:CONTAINS]->(t)
                    """,
                    id=tid, schema=schema, table=table, desc=meta.get("description"),
                )
                counts["tables"] += 1
                for c in meta["columns"]:
                    cid = f"{tid}.{c['name']}"
                    s.run(
                        """
                        MERGE (t:Table {id:$tid})
                        SET t:SchemaFlowCookbook
                        MERGE (c:Column {id:$cid})
                          ON CREATE SET c.created_by='schemaflow-cookbook'
                        SET c:SchemaFlowCookbook,
                            c.name=$name,
                            c.type=$dtype,
                            c.nullable=$nullable,
                            c.is_primary_key=$is_pk,
                            c.description=coalesce($description, c.description),
                            c.semantic_meaning=coalesce($smean, c.semantic_meaning)
                        MERGE (t)-[:HAS_COLUMN]->(c)
                        """,
                        tid=tid, cid=cid, name=c["name"],
                        dtype=c.get("type", "UNKNOWN"),
                        nullable=bool(c.get("nullable", True)),
                        is_pk=bool(c.get("is_primary_key", False)),
                        description=c.get("description"),
                        smean=c.get("semantic_meaning"),
                    )
                    counts["columns"] += 1

            for f_s, f_t, f_c, t_s, t_t, t_c in FOREIGN_KEYS:
                s.run(
                    """
                    MATCH (src:Column {id:$src})
                    MATCH (dst:Column {id:$dst})
                    SET src:SchemaFlowCookbook, dst:SchemaFlowCookbook
                    MERGE (src)-[:FK_TO]->(dst)
                    """,
                    src=f"{f_s}.{f_t}.{f_c}",
                    dst=f"{t_s}.{t_t}.{t_c}",
                )
                counts["fks"] += 1

            for vid, vmeta in VIEWS.items():
                schema, name = vid.split(".", 1)
                s.run(
                    """
                    MERGE (sc:Schema {name:$schema})
                    SET sc:SchemaFlowCookbook
                    MERGE (v:View {id:$id})
                      ON CREATE SET v.created_by='schemaflow-cookbook'
                    SET v:SchemaFlowCookbook,
                        v.name=$name,
                        v.schema=$schema,
                        v.type='VIEW',
                        v.description = coalesce($desc, v.description)
                    MERGE (sc)-[:CONTAINS]->(v)
                    """,
                    id=vid, schema=schema, name=name, desc=vmeta.get("description"),
                )
                counts["views"] += 1

            for a, b in DERIVED_FROM:
                a_lbl = "View:SchemaFlowCookbook" if a in VIEWS else "Table:SchemaFlowCookbook"
                b_lbl = "View:SchemaFlowCookbook" if b in VIEWS else "Table:SchemaFlowCookbook"
                s.run(
                    f"MATCH (x:{a_lbl} {{id:$a}}),(y:{b_lbl} {{id:$b}}) "
                    "MERGE (x)-[:DERIVED_FROM]->(y)",
                    a=a, b=b,
                )
                counts["derived"] += 1

            for a, b in JOINS:
                a_lbl = "View:SchemaFlowCookbook" if a in VIEWS else "Table:SchemaFlowCookbook"
                b_lbl = "View:SchemaFlowCookbook" if b in VIEWS else "Table:SchemaFlowCookbook"
                s.run(
                    f"MATCH (x:{a_lbl} {{id:$a}}),(y:{b_lbl} {{id:$b}}) "
                    "MERGE (x)-[:JOINS]->(y)",
                    a=a, b=b,
                )
                counts["joins"] += 1

        print("Upsert complete:")
        for k, v in counts.items():
            print(f"  {k:>10}: {v}")
        print("Dashboard scope: nodes labeled :SchemaFlowCookbook. Re-run the dashboard launch cell to refresh the UI.")
    except Exception as e:
        print(f"Upsert failed: {type(e).__name__}: {e}")
    finally:
        try:
            drv.close()
        except Exception:
            pass

_upsert_to_neo4j()
```

### 11.5) Launch the Local Dashboard

The next six cells set up and launch a small FastAPI + D3.js dashboard pointed at your Neo4j instance. Files live in `_neo4j_dashboard/` next to this notebook so you can read and edit them in place - no base64, no encoding tricks.

1. **Prep cell**: `mkdir _neo4j_dashboard/` and pick the dashboard port (default `8005`, override via `NEO4J_DASHBOARD_PORT`).
2. **`%%writefile _neo4j_dashboard/graph_server.py`**: FastAPI backend - exposes `GET /api/knowledge-graph` (read), `POST /api/update-column-semantic-meaning` (write), `POST /api/update-relationship`, `POST /api/delete-relationship`.
3. **`%%writefile _neo4j_dashboard/index.html`**: DOM skeleton with the stats bar, SVG graph container, sidebar, and AI Semantic Insights panel (with Edit / Save buttons).
4. **`%%writefile _neo4j_dashboard/style.css`**: All visual styling.
5. **`%%writefile _neo4j_dashboard/script.js`**: D3 force simulation, click handlers, fetch calls. The Edit button turns Semantic Meaning values into inputs; Save POSTs each one to the backend, which `MATCH ... SET c.semantic_meaning = ...` against Neo4j.
6. **Launch cell**: starts `uvicorn graph_server:app` via `subprocess.Popen` on `127.0.0.1:8005`, polls `GET /api/knowledge-graph` for up to 20 s, then prints a clickable Markdown link only when the graph API is ready, plus the server PID.

These cells generate a small local dashboard app next to the notebook, using `semantic_meaning` as the editable column insight field. Open any generated file in the notebook workspace to tweak colors, add endpoints, etc. - changes take effect the next time you re-run the writefile and launch cells. Re-running the launch cell restarts the prior dashboard process from the same kernel so the browser is not left on stale graph data.

**To stop the dashboard later**, run `kill <pid>` (the PID is printed by the launch cell) - or simply restart the Jupyter kernel.

```python
import os
from pathlib import Path

DASHBOARD_DIR = Path("_neo4j_dashboard").resolve()
DASHBOARD_PORT = int(os.getenv("NEO4J_DASHBOARD_PORT", "8005"))

DASHBOARD_DIR.mkdir(parents=True, exist_ok=True)
print(f"Dashboard directory ready: {DASHBOARD_DIR}")
print(f"Dashboard port: {DASHBOARD_PORT} (override via NEO4J_DASHBOARD_PORT)")
```

```python
%%writefile _neo4j_dashboard/graph_server.py
import os
import json
from fastapi import FastAPI, Response, HTTPException
from pydantic import BaseModel
from fastapi.staticfiles import StaticFiles
from neo4j import GraphDatabase

app = FastAPI()

# Neo4j connection details from environment variables
NEO4J_URI = os.getenv("NEO4J_URI", "neo4j://127.0.0.1:7687")
NEO4J_USER = os.getenv("NEO4J_USER", "neo4j")
NEO4J_PASSWORD = os.getenv("NEO4J_PASSWORD", "")

driver = GraphDatabase.driver(NEO4J_URI, auth=(NEO4J_USER, NEO4J_PASSWORD))

def fetch_knowledge_graph_data():
    """Queries Neo4j to build the database hierarchy and relationships."""
    db_hierarchy = {}
    relationships = []
    db_name = "SCHEMAFLOW_GRAPH_DB" # Synthetic graph database label for this cookbook

    with driver.session() as session:
        # 1. Fetch hierarchy (tables and columns)
        hierarchy_query = """        MATCH (t:Table:SchemaFlowCookbook)
        OPTIONAL MATCH (t)-[:HAS_COLUMN]->(c:Column:SchemaFlowCookbook)
        RETURN t.schema AS schema_name, t.name AS table_name, t.type as table_type, collect({
            column_name: c.name,
            data_type: c.type,
            semantic_meaning: c.semantic_meaning
        }) AS columns
        """
        hierarchy_result = session.run(hierarchy_query)
        for record in hierarchy_result:
            schema_name = record["schema_name"] or "default_schema"
            table_name = record["table_name"]
            if not table_name: continue

            if db_name not in db_hierarchy:
                db_hierarchy[db_name] = {"schemas": {}}
            if schema_name not in db_hierarchy[db_name]["schemas"]:
                db_hierarchy[db_name]["schemas"][schema_name] = {"tables": {}}

            table_columns = {c['column_name']: c for c in record["columns"] if c and c.get('column_name')}
            db_hierarchy[db_name]["schemas"][schema_name]["tables"][table_name] = {
                "table_type": record["table_type"] or "TABLE",
                "columns": table_columns
            }

        # 2. Fetch relationships between tables
        relationship_query = """        MATCH (source:Table:SchemaFlowCookbook)-[r]-(target:Table:SchemaFlowCookbook)
        WHERE id(source) < id(target)
        RETURN 
            source.schema AS source_schema, source.name AS source_table,
            target.schema AS target_schema, target.name AS target_table,
            type(r) AS relationship_type
        """
        relationship_result = session.run(relationship_query)
        for record in relationship_result:
            source_id = f"{db_name}.{record['source_schema']}.{record['source_table']}"
            target_id = f"{db_name}.{record['target_schema']}.{record['target_table']}"
            relationships.append({
                "source": source_id,
                "target": target_id,
                "type": record["relationship_type"]
            })

    return {"database_hierarchy": db_hierarchy, "relationships": relationships}

@app.get("/api/knowledge-graph")
async def get_knowledge_graph():
    """Endpoint to fetch and return the knowledge graph data."""
    data = fetch_knowledge_graph_data()
    # Return as a JSON response, ensuring proper content type
    return Response(content=json.dumps(data), media_type="application/json")

class RelationshipUpdateRequest(BaseModel):
    source_table_id: str
    target_table_id: str
    old_relationship_type: str
    new_relationship_type: str

class RelationshipDeleteRequest(BaseModel):
    source_table_id: str
    target_table_id: str
    relationship_type: str

class ColumnSemanticUpdateRequest(BaseModel):
    table_id: str
    column_name: str
    semantic_meaning: str

@app.post("/api/update-relationship")
async def update_relationship(request: RelationshipUpdateRequest):
    """Endpoint to update the type of a relationship between two tables."""
    try:
        _, source_schema, source_table = request.source_table_id.split('.', 2)
        _, target_schema, target_table = request.target_table_id.split('.', 2)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid table_id format. Expected 'db.schema.table'.")

    # This query is complex because Cypher doesn't allow dynamic relationship types in SET.
    # We must delete the old relationship and create a new one.
    # NOTE: Using an installed APOC procedure (apoc.refactor.rename.type) would simplify this.
    # This query is now direction-agnostic.
    update_query = f"""    MATCH (source:Table:SchemaFlowCookbook {{name: $source_table, schema: $source_schema}})
    MATCH (target:Table:SchemaFlowCookbook {{name: $target_table, schema: $target_schema}})
    MATCH (source)-[r:`{request.old_relationship_type}`]-(target)
    CREATE (source)-[new_r:`{request.new_relationship_type}`]->(target)
    DELETE r
    RETURN type(new_r) as new_type
    """

    with driver.session() as session:
        result = session.run(
            update_query,
            source_table=source_table,
            source_schema=source_schema,
            target_table=target_table,
            target_schema=target_schema,
        )
        updated_record = result.single()
        if updated_record:
            return {"status": "success", "updated_relationship": dict(updated_record)}
        else:
            raise HTTPException(status_code=404, detail="Relationship not found or not updated.")

@app.post("/api/delete-relationship")
async def delete_relationship(request: RelationshipDeleteRequest):
    """Endpoint to delete a specific relationship between two tables."""
    try:
        _, source_schema, source_table = request.source_table_id.split('.', 2)
        _, target_schema, target_table = request.target_table_id.split('.', 2)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid table_id format. Expected 'db.schema.table'.")

    # This query is now direction-agnostic.
    delete_query = f"""    MATCH (source:Table:SchemaFlowCookbook {{name: $source_table, schema: $source_schema}})-[r:`{request.relationship_type}`]-(target:Table:SchemaFlowCookbook {{name: $target_table, schema: $target_schema}})
    DELETE r
    RETURN count(r) as deleted_count
    """

    with driver.session() as session:
        result = session.run(
            delete_query,
            source_table=source_table,
            source_schema=source_schema,
            target_table=target_table,
            target_schema=target_schema,
        )
        # Even if nothing is deleted, the query succeeds. We just confirm it ran.
        return {"status": "success"}

@app.post("/api/update-column-semantic-meaning")
async def update_column_semantic_meaning(request: ColumnSemanticUpdateRequest):
    """Endpoint to update the semantic_meaning of a specific column."""
    try:
        _, schema_name, table_name = request.table_id.split('.', 2)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid table_id format. Expected 'db.schema.table'.")

    update_query = """    MATCH (t:Table:SchemaFlowCookbook {name: $table_name, schema: $schema_name})-[:HAS_COLUMN]->(c:Column:SchemaFlowCookbook {name: $column_name})
    SET c.semantic_meaning = $semantic_meaning
    RETURN c.name AS column_name, c.semantic_meaning AS new_meaning
    """

    with driver.session() as session:
        result = session.run(
            update_query,
            table_name=table_name,
            schema_name=schema_name,
            column_name=request.column_name,
            semantic_meaning=request.semantic_meaning,
        )
        updated_record = result.single()
        if updated_record:
            return {"status": "success", "updated_column": dict(updated_record)}
        else:
            raise HTTPException(status_code=404, detail="Column not found or not updated.")

# Mount the current directory to serve static files (HTML, CSS, JS)
# The `html=True` argument makes it serve index.html for the root path.
import os
current_dir = os.path.dirname(os.path.abspath(__file__))
app.mount("/", StaticFiles(directory=current_dir, html=True), name="static")

if __name__ == "__main__":
    import uvicorn
    print("Starting server...")
    print(f"Connect to Neo4j at: {NEO4J_URI}")
    print("View the Graph UI at http://127.0.0.1:8005")
    uvicorn.run(app, host="127.0.0.1", port=8005)
```

```python
%%writefile _neo4j_dashboard/index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SchemaFlow Knowledge Graph</title>
    <link rel="stylesheet" href="style.css?v=5">
    
</head>
<body>
    <div class="container" id="mainContainer" style="display:none;">
        <div class="header">
            <div class="header-content">
                <div class="header-text">
                    <h1>Knowledge Graph View</h1>
                    <div class="subtitle">AI-Powered Database Schema Visualization & Analytics</div>
                </div>
            </div>
        </div>
        
        <div class="stats-bar" id="statsBar">
            
        </div>
        
        <div class="main-content">
            <div class="graph-container">
                <div class="graph-header">
                    <span>🕸️ Interactive Schema Network</span>
                    <div class="controls">
                        <button class="control-btn" onclick="resetGraph()">🔄 Reset</button>
                        <button class="control-btn" onclick="togglePhysics()">⚡ Physics</button>
                        <button class="control-btn" onclick="fitToScreen()">📐 Fit</button>
                        <button class="control-btn" onclick="toggleRelationships()">🔗 Toggle Relations</button>
                    </div>
                </div>
                <svg id="graph"></svg>
                <div id="tooltip" class="tooltip"></div>
                <div id="loadingGraph" class="loading-overlay"><h2>Loading Graph...</h2></div>
            </div>
            
            <div class="sidebar">
                <div class="panel">
                    <div class="panel-header">🎯 Legend & Controls</div>
                    <div class="panel-content">
                        <div class="legend">
                            <div class="legend-item"><div class="legend-circle" style="background:#4CAF50;"></div><span>Database</span></div>
                            <div class="legend-item"><div class="legend-circle" style="background:#2196F3;"></div><span>Schema</span></div>
                            <div class="legend-item"><div class="legend-circle" style="background:#FF9800;"></div><span>Table</span></div>
                        </div>
                        <p style="font-size:0.9em;color:#6c757d;margin-top:15px;line-height:1.6">💡 <strong>Interactive Features:</strong><br>• Drag nodes to reorganize layout<br>• Hover over nodes for quick details<br>• Click nodes to view full information<br>• Use control buttons for navigation<br>• Zoom and pan to explore large schemas</p>
                    </div>
                </div>
                
                <div class="panel">
                    <div class="panel-header">
                        <span>📊 Selected Node Details</span>
                        <div class="controls">
                            <button id="editNodeBtn" class="control-btn" style="display:none;">✏️ Edit</button>
                            <button id="saveNodeBtn" class="control-btn" style="display:none;">💾 Save</button>
                        </div>
                    </div>
                    <div class="panel-content">
                        <div id="nodeDetails">
                            <p style="color:#6c757d;text-align:center;padding:30px;font-style:italic">Click on any node in the graph to view detailed information</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="ai-insights-section">
            <div class="insights-header">
                <span>🧠 AI-Powered Column Semantic Insights</span>
                <div class="controls">
                    <button id="editInsightsBtn" class="control-btn">✏️ Edit</button>
                    <button id="saveInsightsBtn" class="control-btn" style="display:none;">💾 Save</button>
                </div>
            </div>
            <div class="insights-grid" id="insightsGrid">
                
            </div>
        </div>
    </div>

    <div id="loadingScreen" class="loading-overlay">
        <h2>Fetching Knowledge Graph from Neo4j...</h2>
        <p>This may take a moment.</p>
    </div>

    <div id="errorScreen" class="loading-overlay" style="display:none;">
        <div style="text-align: center; padding: 40px; background: white; border-radius: 16px; border: 2px solid #dc3545; max-width: 600px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
            <div style="font-size: 4em; margin-bottom: 20px; opacity: 0.7;">⚠️</div>
            <h1 style="font-size: 2em; color: #dc3545; margin-bottom: 15px;">Knowledge Graph Error</h1>
            <p id="errorMessage" style="font-size: 1.1em; color: #495057; line-height: 1.6;"></p>
        </div>
    </div>
    
    
</body>
</html>
```

```python
%%writefile _neo4j_dashboard/style.css
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Segoe UI','Roboto',sans-serif;background:#f8f9fa;min-height:100vh;color:#1a1a1a}
.container{max-width:1800px;margin:0 auto;padding:20px}
.header{background:white;color:#1a1a1a;padding:40px;border-radius:16px;text-align:center;margin-bottom:30px;box-shadow:0 6px 25px rgba(0,0,0,0.2);position:relative;overflow:hidden;border:2px solid #c0c0c0}
.header::before{content:'';position:absolute;top:0;left:0;right:0;bottom:0;background:linear-gradient(135deg,rgba(248,249,250,0.8) 0%,rgba(233,236,239,0.8) 100%)}
.header-content{position:relative;z-index:2;display:flex;align-items:center;justify-content:center;gap:20px}
.logo-container{display:flex;align-items:center;gap:15px}
.logo-img{width:80px;height:80px;border-radius:12px;object-fit:cover;border:2px solid #6c757d}
.header-text{text-align:center}
.header h1{font-size:3.2em;margin-bottom:15px;text-shadow:none;font-weight:300;color:#2c2c2c}
.header .subtitle{font-size:1.3em;opacity:0.9;font-weight:300;letter-spacing:0.5px;color:#4a4a4a}
.stats-bar{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:20px;margin-bottom:30px}
.stat-item{background:white;padding:25px;border-radius:12px;text-align:center;box-shadow:0 4px 12px rgba(0,0,0,0.2);border:2px solid #c0c0c0;transition:transform 0.3s ease,box-shadow 0.3s ease}
.stat-item:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(0,0,0,0.25)}
.stat-number{font-size:2.2em;font-weight:bold;color:#2c2c2c;display:block;margin-bottom:8px}
.stat-label{color:#4a4a4a;font-size:0.9em;text-transform:uppercase;font-weight:600;letter-spacing:1px}
.main-content{display:grid;grid-template-columns:1fr 350px;gap:30px;margin-bottom:30px}
.graph-container{background:white;border-radius:16px;box-shadow:0 6px 25px rgba(0,0,0,0.2);overflow:hidden;position:relative;border:2px solid #c0c0c0}
.graph-header{background:white;color:#2c2c2c;padding:20px 25px;font-size:1.3em;font-weight:600;display:flex;justify-content:space-between;align-items:center;border-bottom:2px solid #c0c0c0}
.controls{display:flex;gap:12px}
.control-btn{background:#f8f9fa;border:2px solid #4a4a4a;color:#2c2c2c;padding:8px 16px;border-radius:6px;cursor:pointer;font-size:0.9em;transition:all 0.3s ease}
.control-btn:hover{background:#e9ecef;transform:translateY(-1px);box-shadow:0 4px 8px rgba(0,0,0,0.2)}
#graph{width:100%;height:650px;background:#ffffff}
.sidebar{display:flex;flex-direction:column;gap:20px}
.panel{background:white;border-radius:12px;box-shadow:0 4px 12px rgba(0,0,0,0.2);overflow:hidden;border:2px solid #c0c0c0}
.panel-header{background:#f8f9fa;color:#2c2c2c;padding:18px 20px;font-weight:600;font-size:1.1em;border-bottom:2px solid #c0c0c0}
.panel-content{padding:20px;max-height:400px;overflow-y:auto;color:#2c2c2c}
.node-info{background:#f8f9fa;border-radius:8px;padding:15px;margin-bottom:12px;border:2px solid #c0c0c0}
.node-name{font-weight:bold;color:#2c2c2c;margin-bottom:8px;font-size:1.1em}
.node-details{font-size:0.9em;color:#4a4a4a;line-height:1.4;word-wrap:break-word;overflow-wrap:break-word;}
.legend{display:flex;flex-wrap:wrap;gap:15px;margin-bottom:20px}
.legend-item{display:flex;align-items:center;gap:8px;font-size:0.95em;color:#2c2c2c}
.legend-circle{width:14px;height:14px;border-radius:50%;border:2px solid #4a4a4a}
.tooltip{position:absolute;background:white;color:#2c2c2c;padding:12px 16px;border-radius:8px;font-size:0.9em;pointer-events:none;z-index:1000;opacity:0;border:2px solid #c0c0c0;box-shadow:0 6px 18px rgba(0,0,0,0.25);transform:translateX(-50%);text-align:center;}
.ai-insights-section{grid-column:1/-1;background:white;border-radius:16px;box-shadow:0 6px 25px rgba(0,0,0,0.2);overflow:hidden;border:2px solid #c0c0c0}
.insights-header{background:#f8f9fa;color:#2c2c2c;padding:25px 30px;font-size:1.4em;font-weight:600;border-bottom:2px solid #c0c0c0}
.insights-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(350px,1fr));gap:20px;padding:30px}
.insight-item{background:#f8f9fa;border-radius:10px;padding:20px;border:2px solid #c0c0c0;transition:transform 0.3s ease,box-shadow 0.3s ease}
.insight-item:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(0,0,0,0.25)}
.insight-column{font-weight:bold;color:#2c2c2c;margin-bottom:10px;font-size:1.1em}
.insight-meta{color:#4a4a4a;font-size:0.85em;margin-bottom:12px}
.insight-description{color:#2c2c2c;line-height:1.5;font-size:0.9em}
.loading-overlay { position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: rgba(255,255,255,0.9); display: flex; align-items: center; justify-content: center; z-index: 1001; color: #495057; flex-direction: column; }
.loading-overlay h2 { margin-bottom: 15px; }

.edge-label {
    background: rgba(248, 249, 250, 0.9);
    padding: 1px 4px;
    border-radius: 4px;
    font-weight: 600;
    color: #2563eb;
    border: 1px solid #2563eb;
    pointer-events: none; /* So it doesn't interfere with mouse events on the line */
}

#graph circle:hover {
    stroke: #495057;
    stroke-width: 3px;
}
@media (max-width:1400px){.main-content{grid-template-columns:1fr}.sidebar{grid-template-columns:repeat(auto-fit,minmax(300px,1fr));display:grid}}
@media (max-width:768px){.header h1{font-size:2.2em}.stats-bar{grid-template-columns:repeat(2,1fr)}.insights-grid{grid-template-columns:1fr;padding:20px}.header-content{flex-direction:column;gap:15px}.logo-img{width:60px;height:60px}}
```

```python
%%writefile _neo4j_dashboard/script.js
document.addEventListener('DOMContentLoaded', function() {
    fetch('/api/knowledge-graph')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (!data || !data.database_hierarchy || Object.keys(data.database_hierarchy).length === 0) {
                throw new Error('No knowledge graph data found in database response.');
            }
            graphDataStore = data; // Store data globally
            document.getElementById('loadingScreen').style.display = 'none';
            document.getElementById('mainContainer').style.display = 'block';
            renderKnowledgeGraph(data);
        })
        .catch(error => {
            console.error('Error fetching or processing knowledge graph:', error);
            document.getElementById('loadingScreen').style.display = 'none';
            const errorMessage = document.getElementById('errorMessage');
            const errorScreen = document.getElementById('errorScreen');
            if (errorMessage) {
                errorMessage.textContent = "Failed to load knowledge graph: " + error.message;
            }
            if (errorScreen) {
                errorScreen.style.display = 'flex';
            }
        });

    const _ei = document.getElementById('editInsightsBtn'); if (_ei) _ei.addEventListener('click', toggleEditMode);
    const _si = document.getElementById('saveInsightsBtn'); if (_si) _si.addEventListener('click', saveChanges);
    const _en = document.getElementById('editNodeBtn'); if (_en) _en.addEventListener('click', toggleNodeEditMode);
    const _sn = document.getElementById('saveNodeBtn'); if (_sn) _sn.addEventListener('click', saveNodeChanges);
});

let simulation, physicsEnabled = true;
let svg, width, height, tooltip, zoom;
let relationshipsVisible = true;
let graphDataStore = {}; // To store the full graph data for later access
let isEditMode = false;
let isNodeEditMode = false;

function renderKnowledgeGraph(knowledgeGraph) {
    const nodes = [];
    const links = [];
    const databaseStats = {};
    let totalSchemas = 0;
    let totalTables = 0;
    let totalColumns = 0;
    const columnInsights = [];

    if (knowledgeGraph.database_hierarchy) {
        // Add relationships from the API to the links array
        if (knowledgeGraph.relationships && Array.isArray(knowledgeGraph.relationships)) {
            knowledgeGraph.relationships.forEach(rel => {
                // Validate relationship data
                if (rel.source && rel.target && rel.type) {
                    links.push({
                        source: rel.source,
                        target: rel.target,
                        type: 'relationship',
                        label: rel.type.replace(/_/g, ' ')
                    });
                }
            });
        }

        Object.entries(knowledgeGraph.database_hierarchy).forEach(([dbName, dbData]) => {
            // Validate dbData structure
            if (!dbData || typeof dbData !== 'object') {
                console.warn(`Invalid database data for ${dbName}`);
                return;
            }

            const dbNode = { id: dbName, name: dbName, type: 'database', size: 30, level: 0 };
            nodes.push(dbNode);

            const schemaCount = Object.keys(dbData.schemas || {}).length;
            databaseStats[dbName] = { schemas: schemaCount, tables: 0, columns: 0 };
            totalSchemas += schemaCount;

            Object.entries(dbData.schemas || {}).forEach(([schemaName, schemaData]) => {
                // Validate schemaData structure
                if (!schemaData || typeof schemaData !== 'object') {
                    console.warn(`Invalid schema data for ${schemaName}`);
                    return;
                }

                const schemaId = `${dbName}.${schemaName}`;
                const schemaNode = { id: schemaId, name: schemaName, type: 'schema', size: 20, level: 1, parent: dbName };
                nodes.push(schemaNode);
                links.push({ source: dbName, target: schemaId, type: 'hierarchy' });

                const tableCount = Object.keys(schemaData.tables || {}).length;
                databaseStats[dbName].tables += tableCount;
                totalTables += tableCount;

                Object.entries(schemaData.tables || {}).forEach(([tableName, tableData]) => {
                    // Validate tableData structure
                    if (!tableData || typeof tableData !== 'object') {
                        console.warn(`Invalid table data for ${tableName}`);
                        return;
                    }

                    const tableId = `${dbName}.${schemaName}.${tableName}`;
                    const columnCount = Object.keys(tableData.columns || {}).length;
                    const tableNode = { 
                        id: tableId, 
                        name: `${schemaName}.${tableName}`,
                        schemaName: schemaName,
                        tableName: tableName,
                        type: 'table', 
                        size: Math.max(8, Math.min(15, columnCount / 2)), 
                        level: 2, 
                        parent: schemaId, 
                        columnCount: columnCount, 
                        tableType: tableData.table_type || 'TABLE' 
                    };
                    nodes.push(tableNode);
                    links.push({ source: schemaId, target: tableId, type: 'hierarchy' });
                    databaseStats[dbName].columns += columnCount;
                    totalColumns += columnCount;

                    Object.entries(tableData.columns || {}).forEach(([columnName, columnData]) => {
                        // Validate columnData structure
                        if (columnData && typeof columnData === 'object' && 
                            columnData.semantic_meaning) {
                            columnInsights.push({
                                column: columnData.column_name || columnName,
                                table: `${dbName}.${schemaName}.${tableName}`,
                                type: columnData.data_type || 'Unknown',
                                semantic: columnData.semantic_meaning || '',
                                relationships: Array.isArray(columnData.potential_relationships) ? 
                                    columnData.potential_relationships : []
                            });
                        }
                    });
                });
            });
        });
    }

    // Populate UI elements with safe DOM access
    const dbNameHeader = document.getElementById('dbNameHeader');
    if (dbNameHeader) {
        const firstDbName = Object.keys(databaseStats)[0] || 'Unknown Database';
        dbNameHeader.textContent = `${firstDbName} Knowledge Graph`;
    }

    const statsBar = document.getElementById('statsBar');
    if (statsBar) {
        statsBar.innerHTML = `
            <div class="stat-item"><span class="stat-number">${Object.keys(databaseStats).length}</span><div class="stat-label">Databases</div></div>
            <div class="stat-item"><span class="stat-number">${totalSchemas}</span><div class="stat-label">Schemas</div></div>
            <div class="stat-item"><span class="stat-number">${totalTables.toLocaleString()}</span><div class="stat-label">Tables</div></div>
            <div class="stat-item"><span class="stat-number">${totalColumns.toLocaleString()}</span><div class="stat-label">Columns</div></div>
            <div class="stat-item"><span class="stat-number">${columnInsights.length}</span><div class="stat-label">AI Insights</div></div>
        `;
    }

    const insightsGrid = document.getElementById('insightsGrid');
    if (insightsGrid) {
        if (columnInsights.length > 0) {
            insightsGrid.innerHTML = columnInsights.map(insight => `
                <div class="insight-item" data-table-id="${escapeHtml(insight.table)}" data-column-name="${escapeHtml(insight.column)}">
                    <div class="insight-column">${escapeHtml(insight.column)}</div>
                    <div class="insight-meta">📊 ${escapeHtml(formatTablePath(insight.table))} • ${escapeHtml(insight.type)}</div>
                    <div class="insight-description">
                        <div class="semantic-meaning-container"><strong>Semantic Meaning:</strong> <span class="semantic-text">${insight.semantic ? escapeHtml(insight.semantic) : ''}</span></div>

                        ${insight.relationships.length > 0 ? 
                            `<br><br><strong>Related Fields:</strong> ${insight.relationships.slice(0, 3).map(escapeHtml).join(', ')}` : ''}
                    </div>
                </div>
            `).join('');
        } else {
            insightsGrid.innerHTML = `
                <div style="grid-column:1/-1;text-align:center;padding:60px;color:#999">
                    <div style="font-size:3em;margin-bottom:20px;opacity:0.5">🤖</div>
                    <h3 style="margin-bottom:10px;color:#ccc">No AI Insights Available</h3>
                    <p>Column semantic meanings have not been generated for this schema yet.</p>
                </div>
            `;
        }
    }

    // Initialize D3 graph if D3 is available
    if (typeof d3 !== 'undefined') {
        svg = d3.select("#graph");
        if (!svg.empty()) {
            width = parseInt(svg.style("width")) || 800;
            height = parseInt(svg.style("height")) || 600;
            tooltip = d3.select("#tooltip");
            const colorScale = {database: "#4CAF50", schema: "#2196F3", table: "#FF9800"};

            initializeGraph({nodes, links}, colorScale);

            const loadingGraph = document.getElementById('loadingGraph');
            if (loadingGraph) {
                loadingGraph.style.display = 'none';
            }
        }
    } else {
        console.error('D3.js library is not loaded');
    }
}

// Helper function to escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function formatTablePath(tableId) {
    const parts = String(tableId || '').split('.');
    if (parts.length >= 3) {
        return `${parts[parts.length - 2]}.${parts[parts.length - 1]}`;
    }
    return String(tableId || '');
}

function initializeGraph(graphData, colorScale) {
    if (!svg || !graphData.nodes || !Array.isArray(graphData.nodes)) {
        console.error('Invalid graph data or SVG element');
        return;
    }

    svg.selectAll("*").remove();

    simulation = d3.forceSimulation(graphData.nodes)
        .force("link", d3.forceLink(graphData.links).id(d => d.id).distance(d => d.type === 'relationship' ? 200 : 100))
        .force("charge", d3.forceManyBody().strength(-600))
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force("x", d3.forceX(width / 2).strength(0.05))
        .force("y", d3.forceY(height / 2).strength(0.05))
        .force("collision", d3.forceCollide().radius(d => d.size + 10));

    zoom = d3.zoom().scaleExtent([0.1, 4]).on("zoom", (event) => {
        container.attr("transform", event.transform);
    });
    const container = svg.append("g");
    svg.call(zoom).on("dblclick.zoom", null);

    // Create link groups
    const linkGroup = container.append("g").selectAll("g")
        .data(graphData.links)
        .enter().append("g")
        .attr('class', d => d.type === 'relationship' ? 'relationship-link-group' : 'hierarchy-link-group');

    // Create links
    const link = linkGroup.append("line")
        .attr("stroke", d => d.type === "relationship" ? "#2563eb" : "#666")
        .style("stroke", d => d.type === "relationship" ? "#2563eb" : "#666")
        .attr("stroke-opacity", d => d.type === "relationship" ? 0.9 : 0.7)
        .attr("stroke-width", d => d.type === "relationship" ? 1.5 : 2)
        .attr("stroke-dasharray", d => d.type === "relationship" ? "8, 4" : "none");

    // Create edge labels
    const edgeLabels = linkGroup.append("text")
        .attr('class', 'edge-label')
        .attr('font-size', 10)
        .attr('fill', '#2563eb')
        .text(d => d.label || '');

    // Create nodes
    const node = container.append("g").selectAll("circle")
        .data(graphData.nodes)
        .enter().append("circle")
        .attr("r", d => d.size)
        .attr("fill", d => colorScale[d.type] || "#ccc")
        .attr("stroke", "#fff")
        .attr("stroke-width", 3)
        .style("cursor", "pointer")
        .style("filter", "drop-shadow(0px 4px 8px rgba(0,0,0,0.3))")
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended)
        )
        .on("mouseover", showTooltip)
        .on("mouseout", hideTooltip)
        .on("click", showNodeDetails);

    // Create labels
    const label = container.append("g").selectAll("text")
        .data(graphData.nodes)
        .enter().append("text")
        .text(d => d.name)
        .attr("font-size", d => Math.max(11, d.size / 2.2))
        .attr("text-anchor", "middle")
        .attr("dy", "0.35em")
        .attr("fill", "#333")
        .style("pointer-events", "none")
        .style("user-select", "none")
        .style("font-weight", "600");

    // Simulation tick function
    simulation.on("tick", () => {
        link.attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        node.attr("cx", d => d.x)
            .attr("cy", d => d.y);

        label.attr("x", d => d.x)
             .attr("y", d => d.y);

        edgeLabels
            .attr('x', d => (d.source.x + d.target.x) / 2)
            .attr('y', d => (d.source.y + d.target.y) / 2)
            .attr('transform', d => {
                const angle = Math.atan((d.target.y - d.source.y) / (d.target.x - d.source.x)) * 180 / Math.PI;
                return `rotate(${angle}, ${(d.source.x + d.target.x) / 2}, ${(d.source.y + d.target.y) / 2})`;
            });
    });

    setTimeout(fitToScreen, 500);
}

// Drag functions
function dragstarted(event, d) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
}

function dragged(event, d) {
    d.fx = event.x;
    d.fy = event.y;
}

function dragended(event, d) {
    if (!event.active) simulation.alphaTarget(0);
    if (!physicsEnabled) {
        d.fx = event.x;
        d.fy = event.y;
    } else {
        d.fx = null;
        d.fy = null;
    }
}

// Tooltip functions
function showTooltip(event, d) {
    if (!tooltip) return;

    const transform = d3.zoomTransform(svg.node());
    const [screenX, screenY] = transform.apply([d.x, d.y]);

    let content = `<strong>${escapeHtml(d.name)}</strong><br><span style="color:#2563eb">Type:</span> ${escapeHtml(d.type)}`;
    if (d.columnCount) content += `<br><span style="color:#2563eb">Columns:</span> ${d.columnCount}`;
    if (d.tableType) content += `<br><span style="color:#2563eb">Table Type:</span> ${escapeHtml(d.tableType)}`;

    tooltip.html(content)
        .style("left", `${screenX}px`)
        .style("top", `${screenY + d.size + 10}px`)
        .style("opacity", 1);
}

function hideTooltip() {
    if (tooltip) {
        tooltip.style("opacity", 0);
    }
}

// Node details function
function showNodeDetails(event, d) {
    let details = `<div class="node-info"><div class="node-name">${escapeHtml(d.name)}</div><div class="node-details"><strong>Type:</strong> ${escapeHtml(d.type)}<br><strong>Full Path:</strong> ${escapeHtml(d.id)}<br>${d.schemaName ? `<strong>Schema:</strong> ${escapeHtml(d.schemaName)}<br>` : ''}${d.tableName ? `<strong>Table:</strong> ${escapeHtml(d.tableName)}<br>` : ''}<strong>Hierarchy Level:</strong> ${d.level}<br>${d.columnCount ? `<strong>Column Count:</strong> ${d.columnCount}<br>` : ''}${d.tableType ? `<strong>Table Type:</strong> ${escapeHtml(d.tableType)}<br>` : ''}${d.parent ? `<strong>Parent Node:</strong> ${escapeHtml(d.parent)}<br>` : ''}</div></div>`;

    const editNodeBtn = document.getElementById('editNodeBtn');
    const saveNodeBtn = document.getElementById('saveNodeBtn');

    if (d.type === 'table' && graphDataStore.relationships && Array.isArray(graphDataStore.relationships)) {
        const connectedRelations = graphDataStore.relationships.filter(rel => rel.source === d.id || rel.target === d.id);
        if (connectedRelations.length > 0) {
            editNodeBtn.style.display = 'inline-block';
            let relationsHtml = '<div class="node-info" style="margin-top:10px;"><div class="node-name">Relationships</div><div class="node-details"><ul class="relationship-list">';
            connectedRelations.forEach(rel => {
                const isSource = rel.source === d.id;
                const otherTable = formatTablePath(isSource ? rel.target : rel.source);
                const otherTableId = isSource ? rel.target : rel.source;
                const relationType = rel.type.replace(/_/g, ' ');
                relationsHtml += `<li data-source-id="${escapeHtml(d.id)}" data-target-id="${escapeHtml(otherTableId)}" data-old-type="${escapeHtml(rel.type)}"> • <strong class="relationship-type">${escapeHtml(relationType)}</strong> ${isSource ? 'to' : 'from'} <strong>${escapeHtml(otherTable)}</strong></li>`;
            });
            relationsHtml += '</ul></div></div>';
            details += relationsHtml;
        } else {
            editNodeBtn.style.display = 'none';
            saveNodeBtn.style.display = 'none';
        }
    } else {
        editNodeBtn.style.display = 'none';
        saveNodeBtn.style.display = 'none';
    }

    const nodeDetailsElement = document.getElementById('nodeDetails');
    if (nodeDetailsElement) {
        nodeDetailsElement.innerHTML = details;
    }
    highlightConnectedNodes(d);
}

function resetGraph() {
    if (!svg) return;
    svg.selectAll("circle").style("opacity", 1).style("stroke", "#fff").style("stroke-width", 3);
    svg.selectAll("line").style("opacity", d => d.type === "relationship" ? 0.9 : 0.7);
    svg.selectAll("text").style("opacity", 1);
    if (simulation) {
        simulation.alpha(1).restart();
    }
    const nodeDetailsElement = document.getElementById('nodeDetails');
    if (nodeDetailsElement) {
        nodeDetailsElement.innerHTML = '<p style="color:#999;text-align:center;padding:30px;font-style:italic">Click on any node in the graph to view detailed information</p>';
    }
}

function togglePhysics() {
    physicsEnabled = !physicsEnabled;
    if (physicsEnabled) {
        if (simulation) {
            simulation.alpha(1).restart();
            simulation.nodes().forEach(d => {
                d.fx = null;
                d.fy = null;
            });
        }
    } else {
        if (simulation) {
            simulation.stop();
        }
    }
}

function toggleRelationships() {
    relationshipsVisible = !relationshipsVisible;
    if (svg) {
        svg.selectAll('.relationship-link-group').style('display', relationshipsVisible ? 'block' : 'none');
    }
}

// Highlight connected nodes
function highlightConnectedNodes(selectedNode) {
    if (!svg) return;

    svg.selectAll("circle").style("opacity", 0.3);
    svg.selectAll("line").style("opacity", 0.1);
    svg.selectAll("text").style("opacity", 0.3);

    const connectedNodes = new Set([selectedNode.id]);

    svg.selectAll("line")
        .filter(l => l.source.id === selectedNode.id || l.target.id === selectedNode.id)
        .style("opacity", 1)
        .each(l => {
            connectedNodes.add(l.source.id);
            connectedNodes.add(l.target.id);
        });

    svg.selectAll("circle")
        .filter(n => connectedNodes.has(n.id))
        .style("opacity", 1);

    svg.selectAll("circle")
        .filter(n => n.id === selectedNode.id)
        .style("stroke", "#cc6600")
        .style("stroke-width", 5);

    svg.selectAll("text")
        .filter(d => connectedNodes.has(d.id))
        .style("opacity", 1);
}

function toggleEditMode() {
    isEditMode = !isEditMode;
    const editBtn = document.getElementById('editInsightsBtn');
    const saveBtn = document.getElementById('saveInsightsBtn');
    const containers = document.querySelectorAll('.semantic-meaning-container');

    if (editBtn) editBtn.style.display = isEditMode ? 'none' : 'inline-block';
    if (saveBtn) saveBtn.style.display = isEditMode ? 'inline-block' : 'none';

    containers.forEach(container => {
        const textSpan = container.querySelector('.semantic-text');
        const currentText = textSpan ? textSpan.textContent : '';

        if (isEditMode) {
            container.innerHTML = `<strong>Semantic Meaning:</strong> <input type="text" class="semantic-input" style="width: 80%; min-height: 36px; border: 2px solid #2563eb; border-radius: 6px; padding: 6px 10px; font-family: inherit; font-size: 1rem; line-height: 1.4; box-sizing: border-box;" value="${escapeHtml(currentText)}">`;
        } else {
            const input = container.querySelector('.semantic-input');
            const newText = input ? input.value : currentText;
            container.innerHTML = `<strong>Semantic Meaning:</strong> <span class="semantic-text">${escapeHtml(newText)}</span>`;
        }
    });
}

function saveChanges() {
    const insightItems = document.querySelectorAll('.insight-item');
    const updatePromises = [];

    insightItems.forEach(item => {
        const input = item.querySelector('.semantic-input');
        if (input) {
            const tableId = item.dataset.tableId;
            const columnName = item.dataset.columnName;
            const newMeaning = input.value;

            const promise = fetch('/api/update-column-semantic-meaning', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    table_id: tableId,
                    column_name: columnName,
                    semantic_meaning: newMeaning,
                }),
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to save semantic_meaning for ' + columnName);
                }
                return response.json();
            })
            .catch(error => console.error('Save error:', error));

            updatePromises.push(promise);
        }
    });

    Promise.all(updatePromises).then(() => {
        console.log('All semantic_meaning changes saved.');
        toggleEditMode();
    }).catch(err => {
        console.error("Error saving one or more semantic meanings.", err);
        toggleEditMode();
    });
}

function toggleNodeEditMode() {
    isNodeEditMode = !isNodeEditMode;
    const editBtn = document.getElementById('editNodeBtn');
    const saveBtn = document.getElementById('saveNodeBtn');
    const relationshipItems = document.querySelectorAll('#nodeDetails .relationship-list li');

    editBtn.style.display = isNodeEditMode ? 'none' : 'inline-block';
    saveBtn.style.display = isNodeEditMode ? 'inline-block' : 'none';

    relationshipItems.forEach(item => {
        const typeElement = item.querySelector('.relationship-type');
        if (isNodeEditMode) {
            const currentType = typeElement.textContent;
            // Make a larger, comfortable input for editing
            typeElement.innerHTML = `<input type="text" class="relationship-type-input" style="display:block; width: 100%; min-height: 44px; border: 2px solid #2563eb; border-radius: 6px; padding: 10px 12px; font-family: inherit; font-size: 1rem; line-height: 1.4; box-sizing: border-box;" value="${escapeHtml(currentType)}">`;

            const deleteBtn = document.createElement('span');
            deleteBtn.className = 'delete-rel-btn';
            deleteBtn.innerHTML = ' 🗑️';
            deleteBtn.style.cursor = 'pointer';
            deleteBtn.onclick = () => {
                item.classList.toggle('marked-for-deletion');
                item.style.textDecoration = item.classList.contains('marked-for-deletion') ? 'line-through' : 'none';
            };
            item.appendChild(deleteBtn);
        } else {
            const input = item.querySelector('.relationship-type-input');
            const newType = input ? input.value : typeElement.textContent;
            typeElement.innerHTML = escapeHtml(newType);
            item.querySelector('.delete-rel-btn')?.remove();
        }
    });
}

async function saveNodeChanges() {
    const relationshipItems = document.querySelectorAll('#nodeDetails .relationship-list li');
    const promises = [];

    relationshipItems.forEach(item => {
        const sourceId = item.dataset.sourceId;
        const targetId = item.dataset.targetId;
        const oldType = item.dataset.oldType;
        const input = item.querySelector('.relationship-type-input');
        const newType = input ? input.value.replace(/\s+/g, '_') : oldType; // Sanitize new type

        if (item.classList.contains('marked-for-deletion')) {
            promises.push(fetch('/api/delete-relationship', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ 
                    source_table_id: sourceId, 
                    target_table_id: targetId, 
                    relationship_type: oldType 
                })
            }));
        } else if (newType !== oldType.replace(/_/g, ' ')) {
            promises.push(fetch('/api/update-relationship', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ 
                    source_table_id: sourceId, 
                    target_table_id: targetId, 
                    old_relationship_type: oldType, 
                    new_relationship_type: newType 
                })
            }));
        }
    });

    await Promise.all(promises);
    console.log('Node changes saved.');
    toggleNodeEditMode(); // Switch back to view mode

    // Refetch graph data to show changes
    const mainContainer = document.getElementById('mainContainer');
    if(mainContainer) mainContainer.style.display = 'none';
    const loadingScreen = document.getElementById('loadingScreen');
    if(loadingScreen) loadingScreen.style.display = 'block';

    // Re-trigger the initial fetch
    document.dispatchEvent(new Event('DOMContentLoaded'));
}

// Placeholder for fitToScreen function if not defined elsewhere
function fitToScreen() {
    if (!svg || !zoom) return;

    const bounds = svg.select('g').node().getBBox();
    const fullWidth = width;
    const fullHeight = height;
    const widthScale = fullWidth / bounds.width;
    const heightScale = fullHeight / bounds.height;
    const scale = Math.min(widthScale, heightScale) * 0.8;

    const translate = [
        fullWidth / 2 - scale * (bounds.x + bounds.width / 2),
        fullHeight / 2 - scale * (bounds.y + bounds.height / 2)
    ];

    svg.transition()
        .duration(750)
        .call(zoom.transform, d3.zoomIdentity.translate(translate[0], translate[1]).scale(scale));
}
```

```python
import json as _json
import subprocess
import sys
import time
import urllib.request

def _launch_dashboard():
    if not NEO4J_SECTION_ENABLED:
        print("Section 11 disabled (see Step 0). Skipping dashboard launch.")
        return None

    required = ["graph_server.py", "index.html", "style.css", "script.js"]
    missing = [f for f in required if not (DASHBOARD_DIR / f).exists()]
    if missing:
        print(f"Dashboard files missing in {DASHBOARD_DIR}: {missing}.")
        print("Run the four %%writefile cells above first, then re-run this cell.")
        return None

    previous_proc = globals().get("_dashboard_proc")
    if previous_proc is not None and getattr(previous_proc, "poll", lambda: None)() is None:
        print(f"Stopping previous dashboard process (pid={previous_proc.pid}) before restart.")
        previous_proc.terminate()
        try:
            previous_proc.wait(timeout=5)
        except subprocess.TimeoutExpired:
            previous_proc.kill()
            previous_proc.wait(timeout=5)

    env = os.environ.copy()
    env["NEO4J_URI"] = NEO4J_URI
    env["NEO4J_USER"] = NEO4J_USER
    env["NEO4J_PASSWORD"] = NEO4J_PASSWORD
    env["PYTHONUNBUFFERED"] = "1"

    log_path = DASHBOARD_DIR / "uvicorn.log"
    log_fh = open(log_path, "w")

    cmd = [
        sys.executable, "-m", "uvicorn", "graph_server:app",
        "--host", "127.0.0.1", "--port", str(DASHBOARD_PORT),
        "--app-dir", str(DASHBOARD_DIR),
        "--log-level", "warning",
    ]

    try:
        proc = subprocess.Popen(cmd, env=env, stdout=log_fh,
                                stderr=subprocess.STDOUT, cwd=str(DASHBOARD_DIR))
    except Exception as e:
        print(f"Failed to spawn uvicorn: {e}")
        log_fh.close()
        return None

    print(f"Dashboard starting (pid={proc.pid}) on port {DASHBOARD_PORT}; log -> {log_path}")

    url = f"http://127.0.0.1:{DASHBOARD_PORT}"
    ready = False
    for i in range(20):
        time.sleep(1)
        if proc.poll() is not None:
            print(f"Server process exited early (rc={proc.returncode}). See {log_path} for details.")
            return proc
        try:
            with urllib.request.urlopen(f"{url}/api/knowledge-graph", timeout=2) as r:
                _ = _json.loads(r.read())
                print(f"Dashboard ready after ~{i+1}s")
                ready = True
                break
        except Exception:
            continue

    if ready:
        print(f"\nDashboard URL: {url}")
        try:
            from IPython.display import display, Markdown
            display(Markdown(f"**[Open Neo4j Knowledge Graph Dashboard]({url})**"))
        except Exception:
            pass
    else:
        print(f"Dashboard did not respond at {url} within 20s. "
              f"Check {log_path} (Neo4j unreachable is the most common cause).")
        print("No dashboard link emitted because the graph API was not ready.")

    print(f"\nTo stop the dashboard later, run:  kill {proc.pid}")
    return proc

_dashboard_proc = _launch_dashboard()
```

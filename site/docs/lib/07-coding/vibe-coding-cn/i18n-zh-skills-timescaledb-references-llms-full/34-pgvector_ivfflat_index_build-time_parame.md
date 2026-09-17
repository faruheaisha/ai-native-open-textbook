---
title: "Vibe Coding CN"
sourceId: "07-coding/vibe-coding-cn"
sourceTitle: "Vibe Coding CN"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/2025Emma/vibe-coding-cn"
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/llms-full.md"
sourceRel: "i18n/zh/skills/timescaledb/references/llms-full.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/timescaledb/references/llms-full.md"
sourceSha256: "5b223f41e9b421d89aa3ada311e079bfcf943fd79ec6f83793d0e93a29f910da"
pageSha256: "14897dbbfa1366bd0fbaecc3d14fc9e379032a547813ed2c60676b40b00ea569"
contentMode: "local-full"
zh: ""
---

#### pgvector ivfflat index build-time parameters

Pgvector has a `lists` parameter that should be set as follows:
For datasets with less than one million rows, use lists =  rows / 1000.
For datasets with more than one million rows, use lists = sqrt(rows).
It is generally advisable to have at least 10 clusters.

You can use the following code to simplify creating ivfflat indexes:
```python
def create_ivfflat_index(conn, table_name, column_name, query_operator="<=>"):
    index_method = "invalid"
    if query_operator == "<->":
        index_method = "vector_l2_ops"
    elif query_operator == "<#>":
        index_method = "vector_ip_ops"
    elif query_operator == "<=>":
        index_method = "vector_cosine_ops"
    else:
        raise ValueError(f"unrecognized operator {query_operator}")

    with conn.cursor() as cur:
        cur.execute(f"SELECT COUNT(*) as cnt FROM {table_name};")
        num_records = cur.fetchone()[0]

        num_lists = num_records / 1000
        if num_lists < 10:
            num_lists = 10
        if num_records > 1000000:
            num_lists = math.sqrt(num_records)

        cur.execute(f'CREATE INDEX ON {table_name} USING ivfflat ({column_name} {index_method}) WITH (lists = {num_lists});')
        conn.commit()
```

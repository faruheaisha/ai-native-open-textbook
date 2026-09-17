---
title: "Zep Documentation Data Directory"
sourceId: "10-context-memory/ai-engineering-hub"
sourceTitle: "AI Engineering Hub"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/patchy631/ai-engineering-hub"
entryUrl: "https://github.com/patchy631/ai-engineering-hub/blob/2c9b106168d4540b88e727e4aa316c06c856c2b7/ai-avatar-demo/data/README.md"
sourceRel: "ai-avatar-demo/data/README.md"
rawUrl: "/raw/10-context-memory/ai-engineering-hub/ai-avatar-demo/data/README.md"
sourceSha256: "825e0c873aa608697b391faaf2841eca6c80e1ce6653d8c55b137f492c533cb6"
pageSha256: "825e0c873aa608697b391faaf2841eca6c80e1ce6653d8c55b137f492c533cb6"
contentMode: "local-full"
zh: ""
---

# Zep Documentation Data Directory

This directory contains the (sample) data used for the Zep knowledge graph.

## Files

- **chunked-docs.json** - Sample chunked data provided for ingestion into the Zep knowledge graph.

## Using Your Own Data

If you want to use your own data, you must generate a `chunked-docs.json` file with a similar structure to the provided sample. Ensure the file is formatted correctly for ingestion.

## Ingesting the Data

To ingest the `chunked-docs.json` file into the Zep knowledge graph:

```bash
python scripts/ingest_to_graph.py
```

After running the script, make sure to check the Zep dashboard and wait a few minutes for the data to be fully processed and available for use.

---
title: "Azure Data Explorer (Kusto) Query & Analytics"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-kusto/SKILL.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-kusto/SKILL.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-kusto/SKILL.md"
sourceSha256: "a8b8e9f6743b0f0a400a06fa2ded9f5273b44cda9be15d3bb64cafbe16074c68"
pageSha256: "a8b8e9f6743b0f0a400a06fa2ded9f5273b44cda9be15d3bb64cafbe16074c68"
contentMode: "local-full"
zh: ""
---

# Azure Data Explorer (Kusto) Query & Analytics

Execute KQL queries and manage Azure Data Explorer resources for fast, scalable big data analytics on log, telemetry, and time series data.

## Skill Activation Triggers

**Use this skill immediately when the user asks to:**
- "Query my Kusto database for [data pattern]"
- "Show me events in the last hour from Azure Data Explorer"
- "Analyze logs in my ADX cluster"
- "Run a KQL query on [database]"
- "What tables are in my Kusto database?"
- "Show me the schema for [table]"
- "List my Azure Data Explorer clusters"
- "Aggregate telemetry data by [dimension]"
- "Create a time series chart from my logs"

**Key Indicators:**
- Mentions "Kusto", "Azure Data Explorer", "ADX", or "KQL"
- Log analytics or telemetry analysis requests
- Time series data exploration
- IoT data analysis queries
- SIEM or security analytics tasks
- Requests for data aggregation on large datasets
- Performance monitoring or APM queries

## Overview

This skill enables querying and managing Azure Data Explorer (Kusto), a fast and highly scalable data exploration service optimized for log and telemetry data. Azure Data Explorer provides sub-second query performance on billions of records using the Kusto Query Language (KQL).

Key capabilities:
- **Query Execution**: Run KQL queries against massive datasets
- **Schema Exploration**: Discover tables, columns, and data types
- **Resource Management**: List clusters and databases
- **Analytics**: Aggregations, time series, anomaly detection, machine learning

## Core Workflow

1. **Discover Resources**: List available clusters and databases in subscription
2. **Explore Schema**: Retrieve table structures to understand data model
3. **Query Data**: Execute KQL queries for analysis, filtering, aggregation
4. **Analyze Results**: Process query output for insights and reporting

## Query Patterns

### Pattern 1: Basic Data Retrieval
Fetch recent records from a table with simple filtering.

**Example KQL**:
```kql
Events
| where Timestamp > ago(1h)
| take 100
```

**Use for**: Quick data inspection, recent event retrieval

### Pattern 2: Aggregation Analysis
Summarize data by dimensions for insights and reporting.

**Example KQL**:
```kql
Events
| summarize count() by EventType, bin(Timestamp, 1h)
| order by count_ desc
```

**Use for**: Event counting, distribution analysis, top-N queries

### Pattern 3: Time Series Analytics
Analyze data over time windows for trends and patterns.

**Example KQL**:
```kql
Telemetry
| where Timestamp > ago(24h)
| summarize avg(ResponseTime), percentiles(ResponseTime, 50, 95, 99) by bin(Timestamp, 5m)
| render timechart
```

**Use for**: Performance monitoring, trend analysis, anomaly detection

### Pattern 4: Join and Correlation
Combine multiple tables for cross-dataset analysis.

**Example KQL**:
```kql
Events
| where EventType == "Error"
| join kind=inner (
    Logs
    | where Severity == "Critical"
) on CorrelationId
| project Timestamp, EventType, LogMessage, Severity
```

**Use for**: Root cause analysis, correlated event tracking

### Pattern 5: Schema Discovery
Explore table structure before querying.

**Tools**: `kusto_table_schema_get`

**Use for**: Understanding data model, query planning

## Key Data Fields

When executing queries, common field patterns:
- **Timestamp**: Time of event (datetime) - use `ago()`, `between()`, `bin()` for time filtering
- **EventType/Category**: Classification field for grouping
- **CorrelationId/SessionId**: For tracing related events
- **Severity/Level**: For filtering by importance
- **Dimensions**: Custom properties for grouping and filtering

## Result Format

Query results include:
- **Columns**: Field names and data types
- **Rows**: Data records matching query
- **Statistics**: Row count, execution time, resource utilization
- **Visualization**: Chart rendering hints (timechart, barchart, etc.)

## KQL Best Practices

**🟢 Performance Optimized:**
- Filter early: Use `where` before joins and aggregations
- Limit result size: Use `take` or `limit` to reduce data transfer
- Time filters: Always filter by time range for time series data
- Indexed columns: Filter on indexed columns first

**🔵 Query Patterns:**
- Use `summarize` for aggregations instead of `count()` alone
- Use `bin()` for time bucketing in time series
- Use `project` to select only needed columns
- Use `extend` to add calculated fields

**🟡 Common Functions:**
- `ago(timespan)`: Relative time (ago(1h), ago(7d))
- `between(start .. end)`: Range filtering
- `startswith()`, `contains()`, `matches regex`: String filtering
- `parse`, `extract`: Extract values from strings
- `percentiles()`, `avg()`, `sum()`, `max()`, `min()`: Aggregations

## Best Practices

- Always include time range filters to optimize query performance
- Use `take` or `limit` for exploratory queries to avoid large result sets
- Leverage `summarize` for aggregations instead of client-side processing
- Store frequently-used queries as functions in the database
- Use materialized views for repeated aggregations
- Monitor query performance and resource consumption
- Apply data retention policies to manage storage costs
- Use streaming ingestion for real-time analytics (< 1 second latency)
- Integrate with Azure Monitor for operational insights

## MCP Tools Used

| Tool | Purpose |
|------|---------|
| `kusto_cluster_list` | List all Azure Data Explorer clusters in a subscription |
| `kusto_database_list` | List all databases in a specific Kusto cluster |
| `kusto_query` | Execute KQL queries against a Kusto database |
| `kusto_table_schema_get` | Retrieve schema information for a specific table |

**Required Parameters**:
- `subscription`: Azure subscription ID or display name
- `cluster`: Kusto cluster name (e.g., "mycluster")
- `database`: Database name
- `query`: KQL query string (for query operations)
- `table`: Table name (for schema operations)

**Optional Parameters**:
- `resource-group`: Resource group name (for listing operations)
- `tenant`: Azure AD tenant ID

## Fallback Strategy: Azure CLI Commands

If Azure MCP Kusto tools fail, timeout, or are unavailable, use Azure CLI commands as fallback.

### CLI Command Reference

| Operation | Azure CLI Command |
|-----------|-------------------|

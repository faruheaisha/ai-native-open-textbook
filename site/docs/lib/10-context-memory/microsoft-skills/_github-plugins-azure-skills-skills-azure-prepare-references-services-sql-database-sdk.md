---
title: "SQL Database - SDK Patterns"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-prepare/references/services/sql-database/sdk.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-prepare/references/services/sql-database/sdk.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-prepare/references/services/sql-database/sdk.md"
sourceSha256: "bb2c098fa34abebc96c64a145c89f8b0f2a0fc9978fbbabcebb936d7675c4059"
pageSha256: "bb2c098fa34abebc96c64a145c89f8b0f2a0fc9978fbbabcebb936d7675c4059"
contentMode: "local-full"
zh: ""
---

# SQL Database - SDK Patterns

## Node.js (mssql)

```javascript
const sql = require('mssql');

const config = \{
  server: process.env.SQL_SERVER,
  database: process.env.SQL_DATABASE,
  authentication: \{
    type: 'azure-active-directory-default'
  \},
  options: \{
    encrypt: true
  \}
\};

const pool = await sql.connect(config);
```

## Python (pyodbc)

> **Auth:** `DefaultAzureCredential` is for local development. See [auth-best-practices.md](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-prepare/references/auth-best-practices.md) for production patterns.

```python
import pyodbc
from azure.identity import DefaultAzureCredential

credential = DefaultAzureCredential()
token = credential.get_token("https://database.windows.net/.default")

conn = pyodbc.connect(
    f"Driver=&#123;&#123;ODBC Driver 18 for SQL Server&#125;&#125;;"
    f"Server=\{os.environ['SQL_SERVER']\};"
    f"Database=\{os.environ['SQL_DATABASE']\};"
    f"Authentication=ActiveDirectoryMsi"
)
```

## .NET (Entity Framework Core)

**Required NuGet Packages:**
```bash
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet add package Microsoft.Data.SqlClient --version 5.1.0
dotnet add package Azure.Identity
```

**Connection string (Entra ID):**
```
Server=tcp:\{server\}.database.windows.net,1433;Database=\{database\};Authentication=Active Directory Default;Encrypt=True;
```

**Configuration:**
```csharp
services.AddDbContext&lt;AppDbContext>(options =>
    options.UseSqlServer(
        Configuration.GetConnectionString("DefaultConnection"),
        sqlOptions => sqlOptions.EnableRetryOnFailure()
    ));
```

**appsettings.json:**
```json
\{
  "ConnectionStrings": \{
    "DefaultConnection": "Server=tcp:myserver.database.windows.net,1433;Database=mydb;Authentication=Active Directory Default;Encrypt=True;"
  \}
\}
```

## Connection String Format

```
Server=tcp:\{server\}.database.windows.net,1433;Database=\{database\};Authentication=Active Directory Default;Encrypt=True;
```

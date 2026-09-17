---
title: "Microsoft Agent Skills"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/skills/skill-creator/SKILL.md"
sourceRel: ".github/skills/skill-creator/SKILL.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/skills/skill-creator/SKILL.md"
sourceSha256: "15ce951aec071c813150e6794628664725c164223108792e15bd3db18e959da0"
pageSha256: "a6f9ab1ad3ab2a169b5397af4b8a0fbd66d7e6c60536e7eea757dde5080701a5"
contentMode: "local-full"
zh: ""
---

## Creating Azure SDK Skills

When creating skills for Azure SDKs, follow these patterns consistently.

### Token Budget Guidelines (REQUIRED)

Every Azure SDK skill MUST stay within these token limits:

| Section                       | Target           | Absolute Max     |
| ----------------------------- | ---------------- | ---------------- |
| Installation + Env Vars       | 100 tokens       | 150              |
| Authentication & Lifecycle    | 200 tokens       | 300              |
| Core Workflow (1 example)     | 300 tokens       | 400              |
| Feature Tables                | 200 tokens       | 300              |
| Best Practices (6-8 items)    | 200 tokens       | 250              |
| References (reference/ links) | 100 tokens       | 150              |
| **Total SKILL.md**            | **~1100 tokens** | **~1500 tokens** |

**Enforcement**:

- Exceeding max limit → refactor into `/references/` subdirectories
- When approaching 500 lines → move entire sections to reference files
- Annotate with `` immediately below the skill's H1

---

### Reference Extraction Guide (REQUIRED)

Decide what goes in SKILL.md vs. `/references/` using these signals:

| Signal         | Move to `/references/`              | Keep in SKILL.md       |
| -------------- | ----------------------------------- | ---------------------- |
| Use frequency  | <20% of typical use                 | ~80%+ of workflows     |
| Cognitive load | Advanced patterns, multiple options | Single happy path      |
| Example length | >10 lines, multiple paths           | 1-5 lines, single path |

**Content extraction rules:**

- **Batch operations** → `/references/batch-operations.md`
- **Error handling** (beyond try-except) → `/references/error-handling.md`
- **Performance tuning** → `/references/performance.md`
- **Alternative workflows** → `/references/workflows-comparison.md`
- **Streaming/events** → `/references/streaming.md`
- **Advanced auth** → `/references/auth-strategies.md`
- **Tool integration** → `/references/tools.md`
- **Breaking changes** → `/references/migration.md`

**Decision:** Keep common case in SKILL.md, move edge cases to `/references/`.

---

### Core Workflow Discipline (REQUIRED)

Every Azure SDK skill must clarify which workflow(s) it documents.

**Case 1: Single clear "core workflow"** (majority of services)

If one pattern handles ~80% of use cases:

1. Designate it as the core workflow
2. Show ONLY this workflow in SKILL.md (one complete, runnable example)
3. Defer alternatives to `/references/`:
   - Batch operations → `/references/batch-operations.md`
   - Error handling → `/references/error-handling.md`
   - Performance tuning → `/references/performance.md`
   - Alternative workflows → `/references/workflows-comparison.md`

**Example**: Azure Key Vault Secrets (core workflow: retrieve a secret using managed identity). Alternative authentication workflows in `/references/`: local development with `DefaultAzureCredential`, workload identity, and service-principal credentials (client secret or certificate).

**Case 2: Multiple equally-valid "core workflows"** (e.g., authentication strategies, deployment targets)

If no single pattern dominates:

1. Include every hero scenario in SKILL.md, even when that means multiple equally valid workflows
2. Show one complete, runnable example for each hero scenario in SKILL.md
3. Use `/references/workflows-comparison.md` for trade-offs, secondary variations, and deeper context that would otherwise bloat the main file
4. Do NOT treat valid alternatives as "advanced" when they are core to real usage — they're equally valid, just different contexts

**Example**: Azure Identity SDK has several hero scenarios. Keep the primary local-development and production-safe credential flows in SKILL.md, then use `/references/credential-types.md` for deeper comparisons across `AzureCliCredential`, workload identity, service principal variants, and other secondary credential choices.

**Decision rule**: If you're unsure, ask: "Would a user choosing the other approach call what I wrote wrong?" If yes, it's another hero scenario and belongs in SKILL.md. If no, it can be summarized and linked from `/references/`.

---

### Skill Section Order

Follow this structure (based on existing Azure SDK skills):

1. **Title** — `# SDK Name`
2. **Installation** — `pip install`, `npm install`, etc.
3. **Environment Variables** — Required configuration, with an inline comment explaining when it's required. If using `DefaultAzureCredential` in production, include `AZURE_TOKEN_CREDENTIALS` (set to `prod` or `<specific_credential>`)
4. **Authentication & Lifecycle** — For Python skills, prefer `DefaultAzureCredential`: use it as-is for local development, and constrain it for production by setting `AZURE_TOKEN_CREDENTIALS` to `prod` (or a specific target credential name). A specific Microsoft Entra Token credential such as `ManagedIdentityCredential` or `WorkloadIdentityCredential` may be used directly instead. **For Python skills, this section MUST start with the standard callout block** (see [Required Authentication & Lifecycle Callout (Python)](#required-authentication--lifecycle-callout-python) below).
5. **Core Workflow** — Minimal viable example (per core workflow discipline above)
6. **Feature Tables** — Clients, methods, tools
7. **Best Practices** — Numbered list
8. **Reference Links** — Table linking to `/references/*.md` (for Azure SDK skills, include `capabilities.md` + `non-hero-scenarios.md`)

### Required Authentication & Lifecycle Callout (Python)

> **Scope:** Python skills (`-py` suffix) only. Other languages may follow their own idioms.

Every Python Azure SDK skill MUST open its `## Authentication & Lifecycle` section with the following callout block, **verbatim**, before any code samples. This makes the two non-negotiable rules visible to users before they read or copy any client setup code.

```markdown
## Authentication & Lifecycle

> **🔑 Two rules apply to every code sample below:**
>
> 1. **Prefer `DefaultAzureCredential` for local development.** It works as-is with Azure CLI / VS Code / Developer CLI. For production, either constrain `DefaultAzureCredential` to production-safe credentials or use a specific credential directly. Avoid connection strings, account/API keys — they bypass Entra audit and rotation.
>    - Local dev: `DefaultAzureCredential` works as-is.
>    - Production: set `AZURE_TOKEN_CREDENTIALS=prod` (or `AZURE_TOKEN_CREDENTIALS=<specific_credential>`) to constrain the credential chain to production-safe credentials.
> 2. **Wrap every client in a context manager** so HTTP transports, sockets, and token caches are released deterministically:
>    - Sync: `with <Client>(...) as client:`
>    - Async: `async with <Client>(...) as client:` **and** `async with DefaultAzureCredential() as credential:` (from `azure.identity.aio`)
>
> Snippets may abbreviate this setup, but production code should always follow both rules.
```

**Placement rules:**

- Insert immediately under the `## Authentication & Lifecycle` heading, before the first code sample.
- Do not paraphrase or restructure the wording — the consistency across skills is the point.
- If the SDK does not support Entra ID at all (rare — e.g. some legacy speech REST endpoints, websocket APIs that require subscription keys), keep rule #2 (context managers) and replace rule #1 with a single sentence noting the SDK requires API-key auth and explaining why Entra is not yet available.
- If the SDK is async-only (e.g. `azure-ai-voicelive`), keep both rules but show only the async form in the bullets.
- Skip the callout entirely for non-Azure Python skills with no client lifecycle (e.g. `pydantic-models-py`).

**Code sample enforcement.** Every client construction in the skill body must demonstrate both rules:

- Show `with` / `async with` on every client instantiation in usage examples (not just the auth section).
- Show `DefaultAzureCredential` in the primary auth example. **Do not delete API-key examples for SDKs where keys are still officially supported** — many existing users (especially in regulated environments still completing their Entra rollout) need a copy-pastable working sample. Demote the keyed snippet into a clearly-labeled `### Legacy: API Key (existing keyed deployments)` subsection placed _after_ the primary `DefaultAzureCredential` block in the same `## Authentication & Lifecycle` section. Include a one-line note that new code should use `DefaultAzureCredential` and that the keyed path is for existing deployments. Also add the `<SERVICE>_KEY` env var back to the Environment Variables block with a `# Only required for the legacy API-key auth path below` comment.
- A handful of services have key-specific quirks worth calling out in the Legacy subsection (e.g. `azure-ai-translation-text` requires a `region=` parameter when using a key against the global endpoint, because token-credential auth requires a custom subdomain endpoint). Surface these in the demoted block rather than dropping the example.
- For async examples, wrap `DefaultAzureCredential` from `azure.identity.aio` in `async with credential:` alongside the client.

### Authentication Pattern (All Languages)

For local development, use `DefaultAzureCredential` which supports multiple auth methods. For production, use a specific credential type or configure `DefaultAzureCredential` with environment variable `AZURE_TOKEN_CREDENTIALS` set to `prod` or specify the target credential.

If configuring a Rust skill, use `DeveloperToolsCredential` for local development and `ManagedIdentityCredential` for production. The Rust SDK does not support `DefaultAzureCredential`, so explicitly use the appropriate credential in each environment.

```python
# Python — note: client is wrapped in `with` for deterministic cleanup
from azure.identity import DefaultAzureCredential, ManagedIdentityCredential
# Local dev: DefaultAzureCredential works as-is.
credential = DefaultAzureCredential()
# Production alternative: constrain DefaultAzureCredential with AZURE_TOKEN_CREDENTIALS.
# credential = DefaultAzureCredential(require_envvar=True)
# Or use a specific credential directly in production:
# See https://learn.microsoft.com/python/api/overview/azure/identity-readme?view=azure-python#credential-classes
# credential = ManagedIdentityCredential()
with ServiceClient(endpoint, credential) as client:
    client.do_thing()
```

```csharp
// C#
using Azure.Identity;

// Local dev: DefaultAzureCredential. Production: set AZURE_TOKEN_CREDENTIALS=prod or AZURE_TOKEN_CREDENTIALS=<specific_credential>
var credential = new DefaultAzureCredential(
    DefaultAzureCredential.DefaultEnvironmentVariableName
);
// Or use a specific credential directly in production:
// See https://learn.microsoft.com/dotnet/api/overview/azure/identity-readme?view=azure-dotnet#credential-classes
// var credential = new ManagedIdentityCredential();
var client = new ServiceClient(new Uri(endpoint), credential);
```

```java
// Java
import com.azure.identity.AzureIdentityEnvVars;
import com.azure.identity.DefaultAzureCredentialBuilder;
import com.azure.identity.ManagedIdentityCredential;
import com.azure.identity.ManagedIdentityCredentialBuilder;

// Local dev: DefaultAzureCredential. Production: set AZURE_TOKEN_CREDENTIALS=prod or AZURE_TOKEN_CREDENTIALS=<specific_credential>
TokenCredential credential = new DefaultAzureCredentialBuilder()
    .requireEnvVars(AzureIdentityEnvVars.AZURE_TOKEN_CREDENTIALS)
    .build();
// Or use a specific credential directly in production:
// See https://learn.microsoft.com/java/api/overview/azure/identity-readme?view=azure-java-stable#credential-classes
// TokenCredential credential = new ManagedIdentityCredentialBuilder().build();
ServiceClient client = new ServiceClientBuilder()
    .endpoint(endpoint)
    .credential(credential)
    .buildClient();
```

```typescript
// TypeScript
import {
  DefaultAzureCredential,
  ManagedIdentityCredential,
} from "@azure/identity";
// Local dev: DefaultAzureCredential. Production: set AZURE_TOKEN_CREDENTIALS=prod or AZURE_TOKEN_CREDENTIALS=<specific_credential>
const credential = new DefaultAzureCredential({
  requiredEnvVars: ["AZURE_TOKEN_CREDENTIALS"],
});
// Or use a specific credential directly in production:
// See https://learn.microsoft.com/javascript/api/overview/azure/identity-readme?view=azure-node-latest#credential-classes
// const credential = new ManagedIdentityCredential();
const client = new ServiceClient(endpoint, credential);
```

```go
// Go
import (
  "context"

  "github.com/Azure/azure-sdk-for-go/sdk/azidentity"
  "github.com/Azure/azure-sdk-for-go/sdk/storage/azblob"
)

ctx := context.Background()

// Local dev: DefaultAzureCredential. Production: set AZURE_TOKEN_CREDENTIALS=prod or AZURE_TOKEN_CREDENTIALS=<specific_credential>
cred, err := azidentity.NewDefaultAzureCredential(nil)
if err != nil {
  panic(err)
}

// Or use a specific credential directly in production:
// cred, err := azidentity.NewManagedIdentityCredential(nil)

client, err := azblob.NewClient("https://<account>.blob.core.windows.net/", cred, nil)
if err != nil {
  panic(err)
}

_ = client
_ = ctx
```

```rust
// Rust
use azure_identity::DeveloperToolsCredential;
use azure_storage_blob::BlobServiceClient;

let credential = DeveloperToolsCredential::new(); // Local dev
let client = BlobServiceClient::new(
    "https://<account>.blob.core.windows.net/",
    credential,
    None,
)?;
```

**Never hardcode credentials. Use environment variables.**

### Anti-Patterns: What NOT to Do (REQUIRED Reading)

**These patterns cause bloat and inefficiency. Every skill author must review this section before writing.**

#### Anti-Pattern 1: "Exhaustive API Reference"

- ❌ **Don't**: List all 50 SDK methods in a feature table with code samples for every variant
- ✅ **Do**: Show 3-5 core methods in a table; link to official Azure API reference for exhaustive list
- **Token cost**: Listing all methods + examples = 400-600 tokens wasted
- **User impact**: Overwhelming cognitive load; users don't know what to use

#### Anti-Pattern 2: "Multiple Ways to Solve One Problem"

- ❌ **Don't**: "Here's approach A, B, C, and D to paginate results" in the main body
- ✅ **Do**: "Use `ItemPaged` for sync pagination" (primary example); link alternatives to `/references/`
- **Token cost**: Each alternate approach = 50-100 tokens; 5 approaches = skill becomes inefficient
- **User impact**: Decision paralysis; users re-read everything

#### Anti-Pattern 3: "Beginner + Intermediate + Advanced in One Skill"

- ❌ **Don't**: Skill that goes from "what is a client?" to "custom retry policies" to "circuit breaker patterns"
- ✅ **Do**: Core workflow covers 80% use case; advanced patterns in `/references/`
- **Token cost**: Every skill level adds 200-300 tokens; three levels = 600-900 extra tokens
- **User impact**: Experts bored, beginners overwhelmed; nobody gets what they need

#### Anti-Pattern 4: "Restating Official Documentation"

- ❌ **Don't**: "The CosmosClient constructor takes an endpoint (string) and credential (TokenCredential). The endpoint identifies the Azure Cosmos resource..."
- ✅ **Do**: Show code: `client = CosmosClient(endpoint, credential)`. Link to official docs: `microsoft-docs` MCP.
- **Token cost**: Verbose explanation = 50-100 tokens per parameter; large APIs waste 300+ tokens
- **User impact**: Redundant; official docs are authoritative, skill should show usage not repeat them

#### Anti-Pattern 5: "Verbose Explanation When Example Suffices"

- ❌ **Don't**: "To create a client, you first instantiate the class using the constructor, passing the endpoint and credential parameters. The endpoint is a string that identifies your resource..."
- ✅ **Do**: Show code immediately: `with CosmosClient(endpoint, credential) as client:`

---

### Efficiency Validation (REQUIRED - Phase 2)

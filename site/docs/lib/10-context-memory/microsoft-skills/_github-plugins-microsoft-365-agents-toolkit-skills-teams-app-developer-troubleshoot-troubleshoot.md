---
title: "Troubleshooting"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/microsoft-365-agents-toolkit/skills/teams-app-developer/troubleshoot/troubleshoot.md"
sourceRel: ".github/plugins/microsoft-365-agents-toolkit/skills/teams-app-developer/troubleshoot/troubleshoot.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/microsoft-365-agents-toolkit/skills/teams-app-developer/troubleshoot/troubleshoot.md"
sourceSha256: "a3b2554c970a9c1f515f4789816ff216a790caef7f07bf97b3e8ec73c0fc1ed3"
pageSha256: "a3b2554c970a9c1f515f4789816ff216a790caef7f07bf97b3e8ec73c0fc1ed3"
contentMode: "local-full"
zh: ""
---

# Troubleshooting

Consolidated troubleshooting for ATK projects — provisioning, runtime, Playground, and Teams issues.

## Error Code Quick Reference

| Error Code | Section |
|------------|---------|
| `Ext.FindProcessError` | [Port already in use](#port-already-in-use) |
| `Ext.PortsConflictError` | [Port already in use](#port-already-in-use) |
| `fileCreateOrUpdateEnvironmentFile.MissingEnvironmentVariablesError` | [Missing environment variables at runtime](#missing-environment-variables-at-runtime) |
| `botFrameworkCreate.MissingEnvironmentVariablesError` | [Missing environment variables at runtime](#missing-environment-variables-at-runtime) |
| `devToolInstall.TestToolInstallationError` | [Agents Playground installation failed](#agents-playground-installation-failed) |
| `devToolInstall.FuncInstallationError` | [Azure Functions Core Tools installation failed](#azure-functions-core-tools-installation-failed) |
| `Ext.DebugTestToolFailedToStartError` | [Playground won't start](#playground-wont-start) |
| `AppStudioPlugin.ManifestValidationFailed` | [Manifest validation failed](#manifest-validation-failed) |
| `armDeploy.DeployArmError` | [ARM deployment failed](#arm-deployment-failed) |
| `Ext.DevTunnelOperationError` | [Dev tunnel operation failed](#dev-tunnel-operation-failed) |

## Common Provisioning Issues

| Symptom | Cause | Fix |
|---------|-------|-----|
| YAML schema validation error during `atk provision` | Wrong field names in `m365agents.yml` or `m365agents.local.yml` | Check [field reference](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-teams-app-developer-toolkit-manifest-and-yaml). Common: `outputJsonPath` → `outputFolder`, missing `description: ""` in `botFramework/create` |
| `teamsApp/validateManifest` fails with network error | Schema URL (`https://developer.microsoft.com/...`) unreachable | Remove `teamsApp/validateManifest` from local YAML, or retry with network access |
| `AADSTS7000229: missing service principal` | `aadApp/create` missing `generateServicePrincipal: true` | Add `generateServicePrincipal: true` to `aadApp/create` in YAML, re-provision — see [Missing Service Principal](#missing-service-principal-aadsts7000229) |
| 401 from Bot Connector (bot receives messages but can't reply) | `TENANT_ID` missing from `.localConfigs` → SDK uses wrong token authority | Copy `TENANT_ID` from `env/.env.local` to `.localConfigs` — see [Missing TENANT_ID](#missing-tenant_id-wrong-token-authority--401) |
| Bot still gets 401 after fixing auth issues | Devtunnel URL blacklisted by Bot Framework due to repeated prior failures | Create a fresh devtunnel (`devtunnel delete` + `devtunnel create`), update `BOT_ENDPOINT`, re-provision — see [Blacklisted Devtunnel URL](#blacklisted-devtunnel-url) |
| `Authorization: Bearer null` (401) at runtime | `clientId`/`clientSecret` not passed to Teams SDK `App` constructor | Pass credentials explicitly: `new App(\{ adapter: \{ credentials: \{ clientId, clientSecret, tenantId \} \} \})` |
| 401 after changing to single-tenant (`AzureADMyOrg`) | Tenant mismatch — SDK doesn't accept `api://botid-\{appId\}` audience | Add custom JWT middleware accepting all audience formats, or stay with `AzureADMultipleOrgs` |
| Stale bot after re-provisioning | Old AAD app still referenced by Bot Framework registration | Delete `env/.env.local` and `env/.env.local.user`, re-run `atk provision --env local -i false` + `atk deploy --env local -i false` |
| Bot works in Playground but not in Teams | Missing dev tunnel or wrong `BOT_ENDPOINT` | Start `devtunnel host -p 3978 --allow-anonymous`, set `BOT_ENDPOINT` in `env/.env.local` before provisioning |
| Manifest v1.25 validation fails with `"team"` scope | `supportsChannelFeatures` required at runtime but rejected by v1.25 schema | Use `"personal"` scope only in v1.25, or use devPreview schema that defines the property |

## YAML Schema Errors

Common field name mistakes in `m365agents.local.yml`:
- `outputJsonPath` does not exist — use `outputFolder` in `teamsApp/zipAppPackage`
- `AAD_APP_OBJECT_ID` — use `BOT_OBJECT_ID` in local YAML's `aadApp/create` writeToEnvironmentFile
- Missing `description: ""` in `botFramework/create` — this field is required

See [../toolkit/manifest-and-yaml.md](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-teams-app-developer-toolkit-manifest-and-yaml) for the full field reference.

## Known ATK Pitfalls

| Pitfall | Symptom | Fix |
|---------|---------|-----|
| `aadApp/create` missing `generateServicePrincipal: true` | `AADSTS7000229: missing service principal in tenant` when bot calls Bot Connector | Add `generateServicePrincipal: true` to `aadApp/create` in YAML, then re-provision |
| `TENANT_ID` not written to `.localConfigs` | SDK defaults to `botframework.com` tenant → 401 from Bot Connector (wrong issuer/tid in token) | Copy `TENANT_ID` from `env/.env.local` (where `aadApp/create` writes it) into `.localConfigs` |
| Devtunnel URL blacklisted after repeated 401s | Bot still gets 401 even after fixing auth — Bot Framework cached the tunnel URL as failing | Delete old tunnel, create a fresh one, update `BOT_ENDPOINT`, re-provision |

## Authorization / 401 Issues

### Missing Service Principal (AADSTS7000229)

The `aadApp/create` action in `m365agents.local.yml` must include `generateServicePrincipal: true` to create the service principal (enterprise application) alongside the app registration. Without it, the client credentials grant fails:

```
AADSTS7000229: The client application <BOT_ID> is missing service principal in the tenant <TENANT_ID>
```

**Fix — add `generateServicePrincipal: true` to your YAML:**
```yaml
  - uses: aadApp/create
    with:
      name: ${{CONFIG__MANIFEST__NAME}}-aad
      generateClientSecret: true
      generateServicePrincipal: true   # ← REQUIRED — without this, no SP is created
      signInAudience: AzureADMultipleOrgs
    writeToEnvironmentFile:
      clientId: BOT_ID
      clientSecret: SECRET_BOT_PASSWORD
      objectId: BOT_OBJECT_ID
```

Then re-provision:
```bash
atk provision --env local -i false
```

> **Manual fallback** (if you can't re-provision): `az ad sp create --id <BOT_ID>`

### Blacklisted Devtunnel URL

After repeated 401 failures (e.g., from a missing service principal), Bot Framework may blacklist the devtunnel URL. Even after fixing the auth issue, the bot continues to get 401.

**Fix — create a fresh devtunnel:**
```bash

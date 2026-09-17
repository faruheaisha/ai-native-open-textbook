---
title: "Static Web Apps - Routing & Authentication"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-prepare/references/services/static-web-apps/routing.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-prepare/references/services/static-web-apps/routing.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-prepare/references/services/static-web-apps/routing.md"
sourceSha256: "c46b02d2fa3c18440ac62188aed9d2df6816a43f7a9c31543b22fd832b4d6426"
pageSha256: "c46b02d2fa3c18440ac62188aed9d2df6816a43f7a9c31543b22fd832b4d6426"
contentMode: "local-full"
zh: ""
---

# Static Web Apps - Routing & Authentication

## Route Configuration

Create `staticwebapp.config.json` in the app root:

```json
\{
  "routes": [
    \{
      "route": "/api/*",
      "allowedRoles": ["authenticated"]
    \}
  ],
  "navigationFallback": \{
    "rewrite": "/index.html",
    "exclude": ["/api/*", "/*.\{png,jpg,gif\}"]
  \},
  "responseOverrides": \{
    "404": \{
      "rewrite": "/404.html"
    \}
  \}
\}
```

## Authentication

### Built-in Providers

```json
\{
  "routes": [
    \{
      "route": "/admin/*",
      "allowedRoles": ["admin"]
    \}
  ],
  "auth": \{
    "identityProviders": \{
      "azureActiveDirectory": \{
        "registration": \{
          "openIdIssuer": "https://login.microsoftonline.com/\{tenant-id\}",
          "clientIdSettingName": "AAD_CLIENT_ID",
          "clientSecretSettingName": "AAD_CLIENT_SECRET"
        \}
      \}
    \}
  \}
\}
```

### Supported Providers

- Azure Active Directory / Entra ID
- GitHub
- Twitter
- Custom OpenID Connect

## Role-Based Access

```json
\{
  "routes": [
    \{ "route": "/admin/*", "allowedRoles": ["admin"] \},
    \{ "route": "/account/*", "allowedRoles": ["authenticated"] \},
    \{ "route": "/*", "allowedRoles": ["anonymous"] \}
  ]
\}
```

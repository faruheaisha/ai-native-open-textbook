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
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/entra-app-registration/SKILL.md"
sourceRel: ".github/plugins/azure-skills/skills/entra-app-registration/SKILL.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/entra-app-registration/SKILL.md"
sourceSha256: "8f8e7b7429b04c3150c7393997d6ccd433defd497ad22a7e43979cc43e309c32"
pageSha256: "8f8e7b7429b04c3150c7393997d6ccd433defd497ad22a7e43979cc43e309c32"
contentMode: "local-full"
zh: ""
---

# Microsoft Agent Skills

## Overview

Microsoft Entra ID (formerly Azure Active Directory) is Microsoft's cloud-based identity and access management service. App registrations allow applications to authenticate users and access Azure resources securely.

### Key Concepts

| Concept | Description |
|---------|-------------|
| **App Registration** | Configuration that allows an app to use Microsoft identity platform |
| **Application (Client) ID** | Unique identifier for your application |
| **Tenant ID** | Unique identifier for your Azure AD tenant/directory |
| **Client Secret** | Password for the application (confidential clients only) |
| **Redirect URI** | URL where authentication responses are sent |
| **API Permissions** | Access scopes your app requests |
| **Service Principal** | Identity created in your tenant when you register an app |

### Application Types

| Type | Use Case |
|------|----------|
| **Web Application** | Server-side apps, APIs |
| **Single Page App (SPA)** | JavaScript/React/Angular apps |
| **Mobile/Native App** | Desktop, mobile apps |
| **Daemon/Service** | Background services, APIs |

## Core Workflow

### Step 1: Register the Application

Create an app registration in the Azure portal or using Azure CLI.

**Portal Method:**
1. Navigate to Azure Portal → Microsoft Entra ID → App registrations
2. Click "New registration"
3. Provide name, supported account types, and redirect URI
4. Click "Register"

**CLI Method:** See [references/cli-commands.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-entra-app-registration-references-cli-commands)
**IaC Method:** See [references/BICEP-EXAMPLE.bicep](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/entra-app-registration/references/BICEP-EXAMPLE.bicep)

It's highly recommended to use the IaC to manage Entra app registration if you already use IaC in your project, need a scalable solution for managing lots of app registrations or need fine-grained audit history of the configuration changes. 

### Step 2: Configure Authentication

Set up authentication settings based on your application type.

- **Web Apps**: Add redirect URIs, enable ID tokens if needed
- **SPAs**: Add redirect URIs, enable implicit grant flow if necessary
- **Mobile/Desktop**: Use `http://localhost` or custom URI scheme
- **Services**: No redirect URI needed for client credentials flow

### Step 3: Configure API Permissions

Grant your application permission to access Microsoft APIs or your own APIs.

**Common Microsoft Graph Permissions:**
- `User.Read` - Read user profile
- `User.ReadWrite.All` - Read and write all users
- `Directory.Read.All` - Read directory data
- `Mail.Send` - Send mail as a user

**Details:** See [references/api-permissions.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-entra-app-registration-references-api-permissions)

### Step 4: Create Client Credentials (if needed)

For confidential client applications (web apps, services), create a client secret, certificate or federated identity credential.

**Client Secret:**
- Navigate to "Certificates & secrets"
- Create new client secret
- Copy the value immediately (only shown once)
- Store securely (Key Vault recommended)

**Certificate:** For production environments, use certificates instead of secrets for enhanced security. Upload certificate via "Certificates & secrets" section.

**Federated Identity Credential:** For dynamically authenticating the confidential client to Entra platform.

### Step 5: Implement OAuth Flow

Integrate the OAuth flow into your application code.

**See:**
- [references/oauth-flows.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-entra-app-registration-references-oauth-flows) - OAuth 2.0 flow details
- [references/console-app-example.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-entra-app-registration-references-console-app-example) - Console app implementation

## Common Patterns

### Pattern 1: First-Time App Registration

Walk user through their first app registration step-by-step.

**Required Information:**
- Application name
- Application type (web, SPA, mobile, service)
- Redirect URIs (if applicable)
- Required permissions

**Script:** See [references/first-app-registration.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-entra-app-registration-references-first-app-registration)

### Pattern 2: Console Application with User Authentication

Create a .NET/Python/Node.js console app that authenticates users.

**Required Information:**
- Programming language (C#, Python, JavaScript, etc.)
- Authentication library (MSAL recommended)
- Required permissions

**Example:** See [references/console-app-example.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-entra-app-registration-references-console-app-example)

### Pattern 3: Service-to-Service Authentication

Set up daemon/service authentication without user interaction.

**Required Information:**
- Service/app name
- Target API/resource
- Whether to use secret or certificate

**Implementation:** Use Client Credentials flow (see [references/oauth-flows.md#client-credentials-flow](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-entra-app-registration-references-oauth-flows#client-credentials-flow))

## MCP Tools and CLI

### Azure CLI Commands

| Command | Purpose |
|---------|---------|
| `az ad app create` | Create new app registration |
| `az ad app list` | List app registrations |
| `az ad app show` | Show app details |
| `az ad app permission add` | Add API permission |
| `az ad app credential reset` | Generate new client secret |
| `az ad sp create` | Create service principal |

**Complete reference:** See [references/cli-commands.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-entra-app-registration-references-cli-commands)

### Microsoft Authentication Library (MSAL)

MSAL is the recommended library for integrating Microsoft identity platform.

**Supported Languages:**
- .NET/C# - `Microsoft.Identity.Client`
- JavaScript/TypeScript - `@azure/msal-browser`, `@azure/msal-node`
- Python - `msal`

**Examples:** See [references/console-app-example.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-entra-app-registration-references-console-app-example)

## Security Best Practices

| Practice | Recommendation |
|----------|---------------|
| **Never hardcode secrets** | Use environment variables, Azure Key Vault, or managed identity |
| **Rotate secrets regularly** | Set expiration, automate rotation |
| **Use certificates over secrets** | More secure for production |
| **Least privilege permissions** | Request only required API permissions |
| **Enable MFA** | Require multi-factor authentication for users |
| **Use managed identity** | For Azure-hosted apps, avoid secrets entirely |
| **Validate tokens** | Always validate issuer, audience, expiration |
| **Use HTTPS only** | All redirect URIs must use HTTPS (except localhost) |
| **Monitor sign-ins** | Use Entra ID sign-in logs for anomaly detection |

## SDK Quick References

- **Azure Identity**: [Python](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/entra-app-registration/references/sdk/azure-identity-py.md) | [.NET](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/entra-app-registration/references/sdk/azure-identity-dotnet.md) | [TypeScript](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/entra-app-registration/references/sdk/azure-identity-ts.md) | [Java](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/entra-app-registration/references/sdk/azure-identity-java.md) | [Rust](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-entra-app-registration-references-sdk-azure-identity-rust)
- **Key Vault (secrets)**: [Python](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/entra-app-registration/references/sdk/azure-keyvault-py.md) | [TypeScript](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/entra-app-registration/references/sdk/azure-keyvault-secrets-ts.md)
- **Auth Events**: [.NET](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-entra-app-registration-references-sdk-microsoft-azure-webjobs-extensions-authentication-events-dotnet)

## References

- [OAuth Flows](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-entra-app-registration-references-oauth-flows) - Detailed OAuth 2.0 flow explanations
- [CLI Commands](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-entra-app-registration-references-cli-commands) - Azure CLI reference for app registrations
- [Console App Example](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-entra-app-registration-references-console-app-example) - Complete working examples
- [First App Registration](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-entra-app-registration-references-first-app-registration) - Step-by-step guide for beginners
- [API Permissions](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-entra-app-registration-references-api-permissions) - Understanding and configuring permissions
- [Troubleshooting](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-entra-app-registration-references-troubleshooting) - Common issues and solutions

## External Resources

- [Microsoft Identity Platform Documentation](https://learn.microsoft.com/entra/identity-platform/)
- [OAuth 2.0 and OpenID Connect protocols](https://learn.microsoft.com/entra/identity-platform/v2-protocols)
- [MSAL Documentation](https://learn.microsoft.com/entra/msal/)
- [Microsoft Graph API](https://learn.microsoft.com/graph/)

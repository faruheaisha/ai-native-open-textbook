---
title: "secrets-ts"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/microsoft-365-agents-toolkit/skills/teams-app-developer/experts/security/secrets-ts.md"
sourceRel: ".github/plugins/microsoft-365-agents-toolkit/skills/teams-app-developer/experts/security/secrets-ts.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/microsoft-365-agents-toolkit/skills/teams-app-developer/experts/security/secrets-ts.md"
sourceSha256: "99fdd5afde86c9ec144a12e6f3f56d7303240ebdba04768055fc3e18a6662443"
pageSha256: "99fdd5afde86c9ec144a12e6f3f56d7303240ebdba04768055fc3e18a6662443"
contentMode: "local-full"
zh: ""
---

# secrets-ts

## purpose

Secrets management best practices for Teams bots: environment variables, Key Vault, managed identity, and credential hygiene across development and production environments.

## rules

1. Never commit secrets to source control. Add `.env` to `.gitignore` before the first commit. Create a `.env.example` file with placeholder values and comments documenting each required variable. Scan repositories with tools like `git-secrets` or GitHub secret scanning to catch accidental commits. [OWASP -- Hard-coded credentials](https://owasp.org/www-community/vulnerabilities/Use_of_hard-coded_password)
2. A Teams bot requires at minimum three secrets for Azure Bot registration: `CLIENT_ID` (Azure AD app registration ID), `CLIENT_SECRET` (app credential), and `TENANT_ID` (Azure AD tenant). These are configured in the `App` constructor via `clientId`, `clientSecret`, and `tenantId` options. [learn.microsoft.com -- Azure Bot registration](https://learn.microsoft.com/en-us/azure/bot-service/bot-service-quickstart-registration)
3. Use Azure Key Vault for all secrets in production environments. Store `CLIENT_SECRET`, `OPENAI_API_KEY`, database connection strings, and any other sensitive values in Key Vault. Access them via Key Vault references in App Settings or programmatically with `@azure/keyvault-secrets`. [learn.microsoft.com -- Key Vault overview](https://learn.microsoft.com/en-us/azure/key-vault/general/overview)
4. Use managed identity (system-assigned or user-assigned) for zero-secret production deployments. The Teams SDK supports `managedIdentityClientId: "system"` or a specific client ID, eliminating the need for `CLIENT_SECRET` entirely. This also works for accessing Key Vault, Cosmos DB, and Blob Storage without connection strings. [learn.microsoft.com -- Managed identity](https://learn.microsoft.com/en-us/azure/active-directory/managed-identities-azure-resources/overview)
5. Apply the least-privilege principle to Azure AD app registrations. Grant only the Microsoft Graph permissions the bot actually needs (e.g., `User.Read` for profile access, not `Directory.ReadWrite.All`). Use delegated permissions where possible (user-level) rather than application permissions (admin-level). Review and remove unused permissions quarterly. [learn.microsoft.com -- Graph permissions](https://learn.microsoft.com/en-us/graph/permissions-overview)
6. Rotate `CLIENT_SECRET` before expiration. Azure AD app credentials can be set with 6-month, 12-month, or 24-month expiration. Create a new credential before the old one expires, update Key Vault, verify the bot works, then remove the old credential. Automate this with Key Vault rotation policies and Event Grid notifications. [learn.microsoft.com -- Credential rotation](https://learn.microsoft.com/en-us/azure/key-vault/secrets/tutorial-rotation)
7. Secure API keys (`OPENAI_API_KEY`, `AZURE_OPENAI_API_KEY`) with the same rigor as bot credentials. Store in Key Vault, access via managed identity or Key Vault references, and set usage limits/quotas on the OpenAI/Azure OpenAI side to limit blast radius if a key is compromised. [learn.microsoft.com -- Azure OpenAI](https://learn.microsoft.com/en-us/azure/ai-services/openai/overview)
8. Never log secrets or tokens. Implement log scrubbing to redact patterns matching API keys, JWTs, and connection strings. The Teams SDK `ConsoleLogger` does not automatically redact secrets -- wrap or post-process log output if it might contain token values from error stack traces. [OWASP -- Logging Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html)
9. Use the Teams SDK `token` option for custom credential factories when managed identity does not fit your architecture. The token factory pattern `token: (config) => getToken()` lets you integrate with custom secret stores or token services without hardcoding credentials. [github.com/microsoft/teams.ts](https://github.com/microsoft/teams.ts)
10. For local development, use `.env` files loaded via `dotenv` (included in the project template via `node -r dotenv/config .`). Keep local `.env` secrets separate from production secrets. Use Azure CLI login (`az login`) with `DefaultAzureCredential` to access Key Vault and other Azure services locally without storing production secrets on dev machines. [learn.microsoft.com -- DefaultAzureCredential](https://learn.microsoft.com/en-us/azure/developer/javascript/sdk/authentication/credential-chains)

## patterns

### Secure .env setup and gitignore configuration

```shell
# .gitignore — always include these
.env
.env.local
.env.*.local
*.pem
*.key
credentials.json

# .env.example — commit this to document required variables
# Azure Bot Registration (required)

---
title: "azure-identity-py capability coverage"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-python/skills/azure-identity-py/references/capabilities.md"
sourceRel: ".github/plugins/azure-sdk-python/skills/azure-identity-py/references/capabilities.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-sdk-python/skills/azure-identity-py/references/capabilities.md"
sourceSha256: "294c3cb8b688c5a435acfd5633ecea51cd07845363fc893fa29efcc418f597b0"
pageSha256: "294c3cb8b688c5a435acfd5633ecea51cd07845363fc893fa29efcc418f597b0"
contentMode: "local-full"
zh: ""
---

# azure-identity-py capability coverage

**SDK/package**: `azure-identity`

This index maps hero scenarios in `SKILL.md` and links non-hero scenarios documented in dedicated reference files.

## Hero scenarios covered in SKILL.md

- `get_bearer_token_provider`
- `Credential Types`
- `Specific Credential Examples`
- `Getting Tokens Directly`

## Non-hero scenarios

- `Async Credentials`: Async credentials are in `azure.identity.aio`. Always close them or use `async with`:  
  See: [`non-hero-scenarios.md#async-credentials`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-identity-py-references-non-hero-scenarios#async-credentials)
- `Sovereign Clouds`: Use `AzureAuthorityHosts` or the `AZURE_AUTHORITY_HOST` env var:  
  See: [`non-hero-scenarios.md#sovereign-clouds`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-identity-py-references-non-hero-scenarios#sovereign-clouds)
- `Persistent Token Caching`: Opt-in disk-based caching with `TokenCachePersistenceOptions`:  
  See: [`non-hero-scenarios.md#persistent-token-caching`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-identity-py-references-non-hero-scenarios#persistent-token-caching)
- `Multi-Tenant Support`: Allow token acquisition for additional tenants beyond the configured one:  
  See: [`non-hero-scenarios.md#multi-tenant-support`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-identity-py-references-non-hero-scenarios#multi-tenant-support)
- `Error Handling`: Dedicated example and implementation notes.  
  See: [`non-hero-scenarios.md#error-handling`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-identity-py-references-non-hero-scenarios#error-handling)
- `Logging`: Enable authentication logging for debugging:  
  See: [`non-hero-scenarios.md#logging`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-identity-py-references-non-hero-scenarios#logging)
- `Credential Selection Matrix`: | Environment | Recommended Credential |  
  See: [`non-hero-scenarios.md#credential-selection-matrix`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-identity-py-references-non-hero-scenarios#credential-selection-matrix)

## Related deep-dive references

- [`non-hero-scenarios.md`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-identity-py-references-non-hero-scenarios): Dedicated non-hero examples and implementation notes.

## API breadth checklist

- Verify client/auth mode for the environment before coding.
- Confirm operation-group/method names against current Microsoft Learn API reference.
- For Python SDKs with both sync and async clients, document both forms without a blanket preference.
- Include cleanup/delete paths for created resources in examples.
- Prefer idempotent create/update operations where available.
- Validate paging/LRO/error-handling patterns for production paths.

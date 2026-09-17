---
title: "Authentication Events — .NET SDK Quick Reference"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/entra-app-registration/references/sdk/microsoft-azure-webjobs-extensions-authentication-events-dotnet.md"
sourceRel: ".github/plugins/azure-skills/skills/entra-app-registration/references/sdk/microsoft-azure-webjobs-extensions-authentication-events-dotnet.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/entra-app-registration/references/sdk/microsoft-azure-webjobs-extensions-authentication-events-dotnet.md"
sourceSha256: "33c98b6d5014a5ce4b99aad1aee231687e5771cf9691169888d0efd4c48e7ade"
pageSha256: "33c98b6d5014a5ce4b99aad1aee231687e5771cf9691169888d0efd4c48e7ade"
contentMode: "local-full"
zh: ""
---

# Authentication Events — .NET SDK Quick Reference

> Condensed from **microsoft-azure-webjobs-extensions-authentication-events-dotnet**.
> Full patterns (attribute collection, OTP customization, external data enrichment)
> in the source plugin skill if installed.

## Install
dotnet add package Microsoft.Azure.WebJobs.Extensions.AuthenticationEvents

## Quick Start
```csharp
using Microsoft.Azure.WebJobs.Extensions.AuthenticationEvents;
using Microsoft.Azure.WebJobs.Extensions.AuthenticationEvents.TokenIssuanceStart;

[FunctionName("OnTokenIssuanceStart")]
public static WebJobsAuthenticationEventResponse Run(
    [WebJobsAuthenticationEventsTrigger] WebJobsTokenIssuanceStartRequest request,
    ILogger log)
{
    var response = new WebJobsTokenIssuanceStartResponse();
    response.Actions.Add(new WebJobsProvideClaimsForToken
    {
        Claims = new Dictionary<string, string> { { "claim", "value" } }
    });
    return response;
}
```

## Best Practices
- Validate all inputs — never trust request data; validate before processing
- Handle errors gracefully — return appropriate error responses, don't throw
- Log correlation IDs — use CorrelationId for troubleshooting
- Keep functions fast — authentication events have timeout limits
- Use managed identity — access Azure resources securely
- Cache external data — avoid slow lookups on every request
- Test locally — use Azure Functions Core Tools with sample payloads
- Monitor with App Insights — track function execution and errors

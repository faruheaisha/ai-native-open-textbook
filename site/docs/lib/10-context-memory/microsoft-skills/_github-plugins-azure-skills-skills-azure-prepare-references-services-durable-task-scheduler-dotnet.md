---
title: "Durable Task Scheduler — .NET"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-prepare/references/services/durable-task-scheduler/dotnet.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-prepare/references/services/durable-task-scheduler/dotnet.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-prepare/references/services/durable-task-scheduler/dotnet.md"
sourceSha256: "8445a2eaee82ac1504c060d0779d61ca45c8fe49ebb22a2ce58882fc38bce00f"
pageSha256: "8445a2eaee82ac1504c060d0779d61ca45c8fe49ebb22a2ce58882fc38bce00f"
contentMode: "local-full"
zh: ""
---

# Durable Task Scheduler — .NET

## Learn More

- [Durable Task Scheduler documentation](https://learn.microsoft.com/azure/durable-task-scheduler/)
- [Durable Functions .NET isolated worker guide](https://learn.microsoft.com/azure/azure-functions/durable/durable-functions-dotnet-isolated-overview)

## Durable Functions Setup

### Required NuGet Packages

```xml
```

> **💡 Finding latest versions**: Search [nuget.org](https://www.nuget.org/) for each package name to find the current stable version. Look for the `Microsoft.Azure.Functions.Worker.Extensions.DurableTask` and `Microsoft.Azure.Functions.Worker.Extensions.DurableTask.AzureManaged` packages.

### host.json

```json
{
  "version": "2.0",
  "extensions": {
    "durableTask": {
      "storageProvider": {
        "type": "azureManaged",
        "connectionStringName": "DURABLE_TASK_SCHEDULER_CONNECTION_STRING"
      },
      "hubName": "default"
    }
  }
}
```

> **💡 NOTE**: .NET isolated uses the `DurableTask.AzureManaged` NuGet package, which registers the `azureManaged` storage provider type. Other runtimes (Python, Java, JavaScript) use extension bundles and require `durabletask-scheduler` instead — see the respective language files. All runtimes use the same `DURABLE_TASK_SCHEDULER_CONNECTION_STRING` environment variable.

### local.settings.json

```json
{
  "IsEncrypted": false,
  "Values": {
    "FUNCTIONS_WORKER_RUNTIME": "dotnet-isolated",
    "AzureWebJobsStorage": "UseDevelopmentStorage=true",
    "DURABLE_TASK_SCHEDULER_CONNECTION_STRING": "Endpoint=http://localhost:8080;TaskHub=default;Authentication=None"
  }
}
```

## Minimal Example

```csharp
using Microsoft.Azure.Functions.Worker;
using Microsoft.DurableTask;
using Microsoft.DurableTask.Client;

public static class DurableFunctionsApp
{
    [Function("HttpStart")]
    public static async Task<HttpResponseData> HttpStart(
        [HttpTrigger(AuthorizationLevel.Function, "post")] HttpRequestData req,
        [DurableClient] DurableTaskClient client)
    {
        string instanceId = await client.ScheduleNewOrchestrationInstanceAsync(nameof(MyOrchestration));
        return await client.CreateCheckStatusResponseAsync(req, instanceId);
    }

    [Function(nameof(MyOrchestration))]
    public static async Task<string> MyOrchestration([OrchestrationTrigger] TaskOrchestrationContext context)
    {
        var result1 = await context.CallActivityAsync<string>(nameof(SayHello), "Tokyo");
        var result2 = await context.CallActivityAsync<string>(nameof(SayHello), "Seattle");
        return $"{result1}, {result2}";
    }

    [Function(nameof(SayHello))]
    public static string SayHello([ActivityTrigger] string name) => $"Hello {name}!";
}
```

## Workflow Patterns

### Fan-Out/Fan-In

```csharp
[Function(nameof(FanOutFanIn))]
public static async Task<string[]> FanOutFanIn([OrchestrationTrigger] TaskOrchestrationContext context)
{
    string[] cities = { "Tokyo", "Seattle", "London", "Paris", "Berlin" };

    // Fan-out: schedule all in parallel
    var tasks = cities.Select(city => context.CallActivityAsync<string>(nameof(SayHello), city));

    // Fan-in: wait for all
    return await Task.WhenAll(tasks);
}
```

### Human Interaction

```csharp
[Function(nameof(ApprovalWorkflow))]
public static async Task<string> ApprovalWorkflow([OrchestrationTrigger] TaskOrchestrationContext context)
{
    await context.CallActivityAsync(nameof(SendApprovalRequest), context.GetInput<string>());
    
    // Wait for approval event with timeout
    using var cts = new CancellationTokenSource();
    var approvalTask = context.WaitForExternalEvent<bool>("ApprovalEvent");
    var timeoutTask = context.CreateTimer(context.CurrentUtcDateTime.AddDays(3), cts.Token);
    
    var winner = await Task.WhenAny(approvalTask, timeoutTask);
    
    if (winner == approvalTask)
    {
        cts.Cancel();
        return await approvalTask ? "Approved" : "Rejected";
    }
    return "Timed out";
}
```

## Orchestration Determinism

| ❌ NEVER | ✅ ALWAYS USE |
|----------|--------------|
| `DateTime.Now` | `context.CurrentUtcDateTime` |
| `Guid.NewGuid()` | `context.NewGuid()` |
| `Random` | Pass random values from activities |
| `Task.Delay()`, `Thread.Sleep()` | `context.CreateTimer()` |
| Direct I/O, HTTP, database | `context.CallActivityAsync()` |

### Replay-Safe Logging

```csharp
[Function(nameof(MyOrchestration))]
public static async Task<string> MyOrchestration([OrchestrationTrigger] TaskOrchestrationContext context)
{
    ILogger logger = context.CreateReplaySafeLogger(nameof(MyOrchestration));
    logger.LogInformation("Started");  // Only logs once, not on replay
    return await context.CallActivityAsync<string>(nameof(MyActivity), "input");
}
```

## Error Handling & Retry

```csharp
var retryOptions = new TaskOptions
{
    Retry = new RetryPolicy(
        maxNumberOfAttempts: 3,
        firstRetryInterval: TimeSpan.FromSeconds(5),
        backoffCoefficient: 2.0,
        maxRetryInterval: TimeSpan.FromMinutes(1))
};

var input = context.GetInput<string>();

try
{
    await context.CallActivityAsync<string>(nameof(UnreliableService), input, retryOptions);
}
catch (TaskFailedException ex)
{
    context.SetCustomStatus(new { Error = ex.Message });
    await context.CallActivityAsync(nameof(CompensationActivity), input);
}
```

## Durable Task SDK (Non-Functions)

For applications running outside Azure Functions (containers, VMs, Azure Container Apps, Azure Kubernetes Service):

```csharp
var connectionString = "Endpoint=http://localhost:8080;TaskHub=default;Authentication=None";

// Worker
builder.Services.AddDurableTaskWorker()
    .AddTasks(registry => registry.AddAllGeneratedTasks())
    .UseDurableTaskScheduler(connectionString);

// Client
var client = DurableTaskClientBuilder.UseDurableTaskScheduler(connectionString).Build();
string instanceId = await client.ScheduleNewOrchestrationInstanceAsync("MyOrchestration", input);
```

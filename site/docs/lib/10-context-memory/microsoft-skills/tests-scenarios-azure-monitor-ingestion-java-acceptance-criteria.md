---
title: "Azure Monitor Ingestion SDK for Java Acceptance Criteria"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/tests/scenarios/azure-monitor-ingestion-java/acceptance-criteria.md"
sourceRel: "tests/scenarios/azure-monitor-ingestion-java/acceptance-criteria.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/tests/scenarios/azure-monitor-ingestion-java/acceptance-criteria.md"
sourceSha256: "071d011da8af7aa9f229339b76a914a34c23fbb4dd0a759415099492b73021d9"
pageSha256: "071d011da8af7aa9f229339b76a914a34c23fbb4dd0a759415099492b73021d9"
contentMode: "local-full"
zh: ""
---

# Azure Monitor Ingestion SDK for Java Acceptance Criteria

**SDK**: `com.azure:azure-monitor-ingestion`
**Repository**: https://github.com/Azure/azure-sdk-for-java/tree/main/sdk/monitor/azure-monitor-ingestion
**Purpose**: Skill testing acceptance criteria for validating generated code correctness

---

## 1. Correct Import Patterns

### 1.1 Client Imports

#### ✅ CORRECT: Ingestion Clients
```java
import com.azure.monitor.ingestion.LogsIngestionClient;
import com.azure.monitor.ingestion.LogsIngestionClientBuilder;
import com.azure.monitor.ingestion.LogsIngestionAsyncClient;
```

#### ✅ CORRECT: Authentication
```java
import com.azure.identity.DefaultAzureCredential;
import com.azure.identity.DefaultAzureCredentialBuilder;
```

### 1.2 Model Imports

#### ✅ CORRECT: Ingestion Models
```java
import com.azure.monitor.ingestion.models.LogsUploadOptions;
```

---

## 2. Client Creation Patterns

### 2.1 ✅ CORRECT: Builder with DefaultAzureCredential
```java
String endpoint = System.getenv("DATA_COLLECTION_ENDPOINT");

DefaultAzureCredential credential = new DefaultAzureCredentialBuilder().build();

LogsIngestionClient client = new LogsIngestionClientBuilder()
    .endpoint(endpoint)
    .credential(credential)
    .buildClient();
```

### 2.2 ✅ CORRECT: Async Client
```java
LogsIngestionAsyncClient asyncClient = new LogsIngestionClientBuilder()
    .endpoint(endpoint)
    .credential(new DefaultAzureCredentialBuilder().build())
    .buildAsyncClient();
```

---

## 3. Upload Logs

### 3.1 ✅ CORRECT: Basic Upload
```java
String ruleId = System.getenv("DATA_COLLECTION_RULE_ID");
String streamName = System.getenv("STREAM_NAME");

List<Object> logs = new ArrayList<>();
logs.add(new MyLogEntry("2024-01-15T10:30:00Z", "INFO", "Application started"));
logs.add(new MyLogEntry("2024-01-15T10:30:05Z", "DEBUG", "Processing request"));

client.upload(ruleId, streamName, logs);
```

### 3.2 ✅ CORRECT: Upload with Concurrency
```java
LogsUploadOptions options = new LogsUploadOptions()
    .setMaxConcurrency(3);

client.upload(ruleId, streamName, logs, options, Context.NONE);
```

### 3.3 ✅ CORRECT: Upload with Error Handling
```java
LogsUploadOptions options = new LogsUploadOptions()
    .setLogsUploadErrorConsumer(uploadError -> {
        System.err.println("Upload error: " + uploadError.getResponseException().getMessage());
        System.err.println("Failed logs count: " + uploadError.getFailedLogs().size());
    });

client.upload(ruleId, streamName, logs, options, Context.NONE);
```

---

## 4. Log Entry Model

### 4.1 ✅ CORRECT: Log Entry Class
```java
public class MyLogEntry {
    private String timeGenerated;
    private String level;
    private String message;
    
    public MyLogEntry(String timeGenerated, String level, String message) {
        this.timeGenerated = timeGenerated;
        this.level = level;
        this.message = message;
    }
    
    public String getTimeGenerated() { return timeGenerated; }
    public String getLevel() { return level; }
    public String getMessage() { return message; }
}
```

---

## 5. Error Handling

### 5.1 ✅ CORRECT: HTTP Exception Handling
```java
import com.azure.core.exception.HttpResponseException;

try {
    client.upload(ruleId, streamName, logs);
} catch (HttpResponseException e) {
    System.err.println("HTTP Status: " + e.getResponse().getStatusCode());
    if (e.getResponse().getStatusCode() == 403) {
        System.err.println("Check DCR permissions");
    }
}
```

---

## 6. Best Practices Checklist

- [ ] Use DefaultAzureCredential for authentication
- [ ] Use environment variables for DCE endpoint and DCR ID
- [ ] Batch logs for upload efficiency
- [ ] Use concurrency for large uploads
- [ ] Handle partial failures with error consumer
- [ ] Include TimeGenerated field in log entries
- [ ] Reuse client throughout application

---
title: "Azure Communication CallingServer SDK for Java Acceptance Criteria"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/tests/scenarios/azure-communication-callingserver-java/acceptance-criteria.md"
sourceRel: "tests/scenarios/azure-communication-callingserver-java/acceptance-criteria.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/tests/scenarios/azure-communication-callingserver-java/acceptance-criteria.md"
sourceSha256: "3e1c6e2dd234cdbebd9a35b69b0e733700a9befee6e99386e005679a6cde226f"
pageSha256: "3e1c6e2dd234cdbebd9a35b69b0e733700a9befee6e99386e005679a6cde226f"
contentMode: "local-full"
zh: ""
---

# Azure Communication CallingServer SDK for Java Acceptance Criteria

**SDK**: `com.azure:azure-communication-callingserver` (DEPRECATED)
**Repository**: https://github.com/Azure/azure-sdk-for-java/tree/main/sdk/communication/azure-communication-callingserver
**Purpose**: Skill testing acceptance criteria for validating generated code correctness

---

## ⚠️ DEPRECATION NOTICE

**This SDK is deprecated.** For new projects, use `azure-communication-callautomation` instead.

---

## 1. Correct Migration Pattern

### 1.1 ✅ CORRECT: Migrate to Call Automation
```java
// OLD (deprecated)
import com.azure.communication.callingserver.CallingServerClient;
import com.azure.communication.callingserver.CallingServerClientBuilder;

// NEW (use this)
import com.azure.communication.callautomation.CallAutomationClient;
import com.azure.communication.callautomation.CallAutomationClientBuilder;
```

### 1.2 Anti-Patterns (ERRORS)

#### ❌ INCORRECT: Using deprecated SDK for new projects
```java
// WRONG - use CallAutomationClient for new projects
CallingServerClient client = new CallingServerClientBuilder()

---
title: "🚀 DEPLOYMENT FLOW"
sourceId: "07-coding/cloudflare-vibesdk"
sourceTitle: "Cloudflare VibeSDK"
sourceKind: "产品仓库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/cloudflare/vibesdk"
entryUrl: "https://github.com/cloudflare/vibesdk/blob/9da158d82c597a0e8f4bf033cdccd1053fb6fb15/docs/llm.md"
sourceRel: "docs/llm.md"
rawUrl: "/raw/07-coding/cloudflare-vibesdk/docs/llm.md"
sourceSha256: "5cade1cd8dea6404f985f3f367e0c0233441fc841f741f71f3da1e6c1e0c9cf7"
pageSha256: "d39e585ea406b6f761a70a95efe337faa7cee07c8587dfef6a4e0e84ad59b6a3"
contentMode: "local-full"
zh: ""
---

# 🚀 DEPLOYMENT FLOW

## Complete Deployment Process

### **Trigger:** User clicks "Preview" button

**Step-by-step:**

1. **Pre-deployment Validation**
   - Check files exist in generatedFilesMap
   - Verify no generation in progress
   - Get or create sessionId

2. **Sandbox Instance Check**
   - If no sandboxInstanceId: create new instance
   - If exists: check health status
   - If unhealthy: reset session, create new instance

3. **Create Instance (if needed)**
   ```
   → createInstance(templateName, projectName, webhookUrl)
   ← { instanceId, url, status }
   → Save instanceId to state
   ```

4. **File Synchronization**
   ```
   → Collect all files from generatedFilesMap
   → Format as { path, content, encoding: 'utf-8' }[]
   → writeFiles(instanceId, files, "Deploy generated code")
   ← { success: true, filesWritten: 42 }
   ```

5. **Package.json Sync**
   ```
   → Check if package.json changed
   → If changed: executeCommands(['npm install'])
   → Wait for completion (timeout: 60s)
   → Cache new package.json in state
   ```

6. **Bootstrap Commands (if needed)**
   ```
   → Execute commandsHistory (previously run user commands)
   → Validates/filters dangerous commands
   → Runs: npm install, setup scripts, etc.
   ```

7. **Start Dev Server**
   ```
   → Already running from instance creation
   → Or trigger via command if stopped
   → Monitor startup logs
   ```

8. **Health Check Loop**
   ```
   → setInterval(30s): ping sandbox
   → Check status endpoint
   → If unhealthy: log warning, may reset
   ```

9. **Return Preview URL**
   ```
   → Send URL to frontend via WebSocket
   → User can open in iframe or new tab
   → App is live and interactive
   ```

---

## Redeployment (Incremental Updates)

When files change after initial deploy:

1. **Diff Detection**
   - Compare file hashes in generatedFilesMap
   - Only sync changed files

2. **Partial Sync**
   ```
   → writeFiles(instanceId, [changedFiles])
   ← Hot reload triggered automatically
   ```

3. **No Full Rebuild**
   - Dev server hot reloads changes
   - Fast iteration (< 1s typically)

---

## Deployment Errors & Recovery

**Common errors:**

1. **Timeout (60s)**
   - Cause: npm install too slow, network issues
   - Recovery: Reset sessionId, retry with fresh instance

2. **Instance Not Found**
   - Cause: Container crashed or evicted
   - Recovery: Create new instance, redeploy all files

3. **Command Execution Failed**
   - Cause: Invalid package.json, dependency conflicts
   - Recovery: Show error to user, allow editing

4. **Health Check Failed**
   - Cause: Dev server crashed, port conflict
   - Recovery: Reset session on next deploy attempt

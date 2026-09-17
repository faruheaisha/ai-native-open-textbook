---
title: "Anthropic 平台文档（英文全量）"
sourceId: "01-foundations/anthropic-platform-docs-en"
sourceTitle: "Anthropic 平台文档（英文全量）"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "01-foundations"
sourceUrl: "https://platform.claude.com/docs"
entryUrl: "https://platform.claude.com/docs"
sourceRel: "docs/en/managed-agents/self-hosted-sandboxes.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/managed-agents/self-hosted-sandboxes.md"
sourceSha256: "1f7859dc89e17f00a3dc7ec93296471611247acca42ed2149c714b5102c1ac2b"
pageSha256: "f70fcb1b33e4f8bad7ddeced98bc3d22d13ca1ee229ae0f8d70d409e5b577dc8"
contentMode: "local-full"
zh: ""
---

## Use memory stores

Sessions on a self-hosted environment attach [memory stores](https://platform.claude.com/docs/en/managed-agents/memory) exactly as sessions on cloud environments do: list them in `resources` when you create the session, as shown in [Attach a memory store to a session](https://platform.claude.com/docs/en/managed-agents/memory#attach-a-memory-store-to-a-session). A session accepts up to 8 memory stores. On a self-hosted environment the SDK worker, rather than Anthropic's infrastructure, materializes each store for the agent, so memory stores there require `EnvironmentWorker` (or its `handle_item()` method) from the Python, TypeScript, or Go SDK.

The `ant` CLI worker (`ant beta:worker poll` and `ant beta:worker run`) does not mount memory stores. To combine the CLI poller with memory stores, run the SDK worker inside a per-session sandbox as described in [Run one sandbox per session](https://platform.claude.com/docs/en/managed-agents/self-hosted-sandboxes#run-one-sandbox-per-session).

Memory stores cannot be attached to sessions on self-hosted environments on [Claude Platform on AWS](https://platform.claude.com/docs/en/build-with-claude/claude-platform-on-aws).

### How the worker handles memory

When the worker claims a work item whose session has memory stores attached, it:

1. Downloads each attached store to its `mount_path` on the worker host, authenticating with the work item's per-session `secret`. The `mount_path` is the same directory under `/mnt/memory/` that cloud sessions use (for example, `/mnt/memory/user-preferences/` for a store named "User Preferences"), and the session's system prompt describes it to the agent.
2. Adds those directories to the file tools' allowed roots, and the directories of stores attached with `access: "read_only"` to their read-only roots, so the agent works on memories with the same `read`, `write`, `edit`, `glob`, and `grep` tools it uses in the working directory.
3. Reconciles local and remote changes after tool calls, at most once per sync interval (15 seconds by default): memories that changed in the store are written to disk, and files the agent changed are uploaded to the store.
4. Runs a final sync when the session ends, flushes any uploads still pending for up to 30 seconds, and then removes the directories it created. A worker that is cancelled while a session runs skips the final sync but still uploads changed files and removes the directories before it exits.

The memory store on Anthropic's side remains the source of truth. [Memory versions](https://platform.claude.com/docs/en/managed-agents/memory#audit-memory-changes), redaction, and viewing or editing memories in the Console work as they do for cloud sessions, and the agent's memory reads and writes appear in the [event stream](https://platform.claude.com/docs/en/managed-agents/events-and-streaming) as ordinary tool events. Because each worker syncs on an interval, a change written in one session becomes visible to another running session only after both have synced, typically well under a minute at the default interval; sessions on cloud sandboxes see each other's changes almost immediately.

Each store directory contains a marker file named `.anthropic-memory-store` that ties the directory to its store. Leave it in place: the worker does not sync a directory whose marker is missing or altered.

### Prepare the host

Memory stores on self-hosted sandboxes need a POSIX filesystem on the worker host (the Linux host from [Before you begin](https://platform.claude.com/docs/en/managed-agents/self-hosted-sandboxes#before-you-begin)); Windows hosts are not supported, because the worker requires `O_NOFOLLOW` when it opens memory files. A case-sensitive filesystem is recommended, so that memory paths that differ only in case do not collide.

Before you start the worker, create the parent directory and make it writable by the user the worker runs as:

```bash
sudo mkdir -p /mnt/memory && sudo chown "$USER" /mnt/memory
```

Do not create the per-store directories yourself. The worker creates each store's `mount_path` directory (for example, `/mnt/memory/user-preferences`) when a session starts, refuses to start the session's work if something already exists at that path, and removes the directory when the session ends. Two operating rules follow:

* **Run one session per filesystem when sessions attach the same store.** Two sessions cannot mount the same store on one host at the same time, because both need the same path. Giving each session its own sandbox, as described in [Run one sandbox per session](https://platform.claude.com/docs/en/managed-agents/self-hosted-sandboxes#run-one-sandbox-per-session), satisfies this rule.
* **Stop workers gracefully.** When you stop a worker while a session runs, `EnvironmentWorker` uploads the session's changed memory files and removes its store directories only if it is cancelled rather than killed: a killed process runs no teardown, and the worker does not install signal handlers itself. Wire SIGTERM and SIGINT to cancellation in the process that runs it: abort the `signal` you pass to the worker in TypeScript, cancel the context in Go, and in Python cancel the task that runs `run()` or `handle_item()`. Do that from a signal handler when your worker is the process, as the standalone workers on this page do, or from your server's own shutdown hook when the worker runs inside a webhook handler, which must not take over the server's signals. Then stop workers with SIGTERM and give them at least 30 seconds to exit before any hard kill, because the final upload can take that long. If a worker is killed before its teardown runs, remove the leftover store directory under `/mnt/memory/` before the next session that attaches that store; any edits in it that had not synced are lost.

### Run one sandbox per session

The sandbox-per-session pattern in [Run a worker](https://platform.claude.com/docs/en/managed-agents/self-hosted-sandboxes#run-a-worker) gives each session a fresh filesystem, which is what [Prepare the host](https://platform.claude.com/docs/en/managed-agents/self-hosted-sandboxes#prepare-the-host) calls for when sessions attach the same store. Keep `ant beta:worker poll --on-work` (or the SDK's work poller) as the poller on the host.

The `ant beta:worker run` entrypoint shown there does not mount memory stores, so build the per-session image around the SDK worker instead: its entrypoint constructs `EnvironmentWorker` and calls `handle_item()` (`handleItem` in TypeScript, `HandleItem` in Go), which reads the session, work, and environment identifiers from the `ANTHROPIC_*` variables and the work item's per-session `secret` from `ANTHROPIC_WORK_SECRET`. You can also pass the secret explicitly as `work_secret` (`workSecret` in TypeScript, `WorkSecret` in Go).

  ```python Python
  import asyncio
  import contextlib
  import os
  import signal
  from anthropic import AsyncAnthropic
  from anthropic.lib.environments import EnvironmentWorker

  async def main() -> None:
      async with AsyncAnthropic(auth_token=os.environ["ANTHROPIC_ENVIRONMENT_KEY"]) as client:
          worker = EnvironmentWorker(client, workdir="/workspace")
          # With no arguments, handle_item() reads the ANTHROPIC_* variables the spawn
          # script forwarded, including ANTHROPIC_WORK_SECRET.
          task = asyncio.create_task(worker.handle_item())
          # Cancelling the task when the container is stopped lets the worker upload
          # changed memory files and remove the store directories before it exits.
          loop = asyncio.get_running_loop()
          for signum in (signal.SIGINT, signal.SIGTERM):
              loop.add_signal_handler(signum, task.cancel)
          with contextlib.suppress(asyncio.CancelledError):
              await task

  asyncio.run(main())
  ```

  ```typescript TypeScript
  import Anthropic from "@anthropic-ai/sdk";
  import { EnvironmentWorker } from "@anthropic-ai/sdk/helpers/beta/environments";

  const client = new Anthropic({ authToken: process.env.ANTHROPIC_ENVIRONMENT_KEY });
  const controller = new AbortController();
  // Aborting when the container is stopped lets the worker upload changed memory
  // files and remove the store directories before it exits.
  process.once("SIGTERM", () => controller.abort());
  process.once("SIGINT", () => controller.abort());

  // With no arguments, handleItem() reads the ANTHROPIC_* variables the spawn
  // script forwarded, including ANTHROPIC_WORK_SECRET.
  await new EnvironmentWorker({
    client,
    workdir: "/workspace",
    signal: controller.signal
  }).handleItem();
  ```

  ```csharp C#
  // EnvironmentWorker is not currently available in the C# SDK.
  ```

  ```go Go
  package main

  import (
  	"context"
  	"log"
  	"os"
  	"os/signal"
  	"syscall"

  	"github.com/anthropics/anthropic-sdk-go"
  	"github.com/anthropics/anthropic-sdk-go/lib/environments"
  	"github.com/anthropics/anthropic-sdk-go/option"
  )

  func main() {
  	// Cancelling the context when the container is stopped lets the worker upload
  	// changed memory files and remove the store directories before it exits.
  	ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)
  	defer stop()

  	client := anthropic.NewClient(option.WithAuthToken(os.Getenv("ANTHROPIC_ENVIRONMENT_KEY")))
  	worker := environments.NewEnvironmentWorker(client, environments.EnvironmentWorkerOptions{
  		Workdir: "/workspace",
  	})
  	// With zero-value options, HandleItem reads the ANTHROPIC_* variables the spawn
  	// script forwarded, including ANTHROPIC_WORK_SECRET.
  	if err := worker.HandleItem(ctx, environments.HandleItemOptions{}); err != nil {
  		log.Fatalf("worker: %v", err)
  	}
  }

  ```

  ```java Java
  // EnvironmentWorker is not currently available in the Java SDK.
  ```

  ```php PHP
  // EnvironmentWorker is not currently available in the PHP SDK.
  ```

  ```ruby Ruby
  # EnvironmentWorker is not currently available in the Ruby SDK.
  ```

`ant beta:worker poll --on-work` does not set `ANTHROPIC_WORK_SECRET` for the script it spawns, so the spawn script reads the secret from the work item JSON on its standard input and passes it into the sandbox:

```bash
#!/bin/bash
# spawn.sh: called once per claimed work item
# The claimed work item arrives as JSON on stdin. Its secret is the
# per-session credential that the memory store endpoints require.
ANTHROPIC_WORK_SECRET="$(jq -r '.secret // empty')"
export ANTHROPIC_WORK_SECRET
mkdir -p "/host/outputs/$ANTHROPIC_SESSION_ID"
exec docker run --rm \
  -e ANTHROPIC_SESSION_ID -e ANTHROPIC_ENVIRONMENT_KEY \
  -e ANTHROPIC_WORK_ID -e ANTHROPIC_ENVIRONMENT_ID -e ANTHROPIC_BASE_URL \
  -e ANTHROPIC_WORK_SECRET \
  -v "/host/outputs/$ANTHROPIC_SESSION_ID":/workspace \
  your-sdk-worker-image
```

If you claim work with the SDK's work poller instead, pass each claimed item's `secret` into the sandbox you launch in the same way. Pass it only into the sandbox that serves that session, and never log it.

The sandbox image also needs a writable `/mnt/memory` (see [Prepare the host](https://platform.claude.com/docs/en/managed-agents/self-hosted-sandboxes#prepare-the-host)). Because each sandbox serves one session and is discarded afterward, no leftover directories need cleanup, and the memory directories do not need to be bind-mounted to the host: the worker uploads their contents to the store before the sandbox exits. If you stop a container before its session ends, send a signal that the entrypoint turns into cancellation (see [Prepare the host](https://platform.claude.com/docs/en/managed-agents/self-hosted-sandboxes#prepare-the-host)) rather than killing it, so that upload still runs. Give the container time to finish the upload as well: Docker follows the stop signal with SIGKILL after 10 seconds by default, so raise that limit to at least the 30 seconds that Prepare the host calls for, with `--stop-timeout` on `docker run` or your orchestrator's termination grace period.

### Configure sync

Two `EnvironmentWorker` options control memory behavior:

* **`memory_sync_interval`** (Python, in seconds; `memorySyncIntervalMs` in TypeScript, in milliseconds; `MemorySyncInterval` in Go, a duration): how often attached stores reconcile with the server while the session runs. Defaults to 15 seconds; the minimum is 5 seconds. A shorter interval narrows the window in which another session sees stale memories, at the cost of more memory store requests. `None` in Python, `null` in TypeScript, or a negative duration in Go disables memory support entirely: the worker neither downloads nor syncs stores, and a session with memory stores attached runs without them even though its system prompt still describes them, so disable memory support only on workers whose sessions attach no memory stores. While memory support is enabled, a work item that arrives without a per-session `secret` for a session with attached stores fails rather than running without memory (see [Troubleshoot memory mounts](https://platform.claude.com/docs/en/managed-agents/self-hosted-sandboxes#troubleshoot-memory-mounts)).
* **`memory_sync_deletions`** (`memorySyncDeletions` in TypeScript, `MemorySyncDeletions` in Go): whether a file the agent deletes locally is also deleted from the store. The value is one of `"enabled"` (the default), `"log_only"`, or `"disabled"` in Python and TypeScript, and one of the constants `environments.MemorySyncDeletionsEnabled` (the zero value), `environments.MemorySyncDeletionsLogOnly`, or `environments.MemorySyncDeletionsDisabled` in Go. When enabled, the worker deletes the memory from the store once a later sync confirms the file is still gone; in log-only mode it runs the same checks but only logs what it would have deleted, which lets you watch what your workers would delete before you trust the enabled mode; when disabled, it never deletes from the store. Uploads and downloads are unaffected by this setting.

Set these options where you construct the worker, whether through the `EnvironmentWorker` constructor or, in Python and TypeScript, the `client.beta.environments.work.worker()` factory that the webhook handler uses.

For example, to sync every 10 seconds and only log the deletes the worker would have made:

  ```python Python
  worker = EnvironmentWorker(
      client,
      environment_id=environment_id,
      environment_key=environment_key,
      workdir="/workspace",
      memory_sync_interval=10,  # seconds
      memory_sync_deletions="log_only",
  )
  ```

  ```typescript TypeScript
  const worker = new EnvironmentWorker({
    client,
    environmentId,
    environmentKey,
    workdir: "/workspace",
    memorySyncIntervalMs: 10_000,
    memorySyncDeletions: "log_only"
  });
  ```

  ```csharp C#
  // EnvironmentWorker is not currently available in the C# SDK.
  ```

  ```go Go
  worker := environments.NewEnvironmentWorker(client, environments.EnvironmentWorkerOptions{
  	EnvironmentID:       environmentID,
  	EnvironmentKey:      environmentKey,
  	Workdir:             "/workspace",
  	MemorySyncInterval:  10 * time.Second,
  	MemorySyncDeletions: environments.MemorySyncDeletionsLogOnly,
  })
  ```

  ```java Java
  // EnvironmentWorker is not currently available in the Java SDK.
  ```

  ```php PHP
  // EnvironmentWorker is not currently available in the PHP SDK.
  ```

  ```ruby Ruby
  # EnvironmentWorker is not currently available in the Ruby SDK.
  ```

### Read-only stores and conflicts

For a store attached with `access: "read_only"`, the `write` and `edit` tools refuse to change files inside its directory, and the worker never uploads anything from it. Changes made through `bash`, or through a custom tool or MCP server you serve from the sandbox, are not blocked locally: they are never synced to the store, and the next remote change to that memory overwrites them. If you need the local copy itself to stay unchanged during the session, disable the `bash` tool for that agent and give it no custom tool that writes to the sandbox's filesystem; do not mount the store path read-only, because the worker itself must create the directory and write the downloaded memories into it.

Conflicts resolve in favor of the store. When the agent changes a memory file that also changed in the store since the session last synced it, the worker keeps the store's version at the next sync, overwrites the local file with it, and logs a warning; the `write` and `edit` tools themselves succeed and no error reaches the agent. If the agent's change still applies, it can re-read the file after the sync and make the change again.

### Troubleshoot memory mounts

The worker logs mount and background sync failures rather than reporting them to the session; only read-only refusals reach the agent, as tool errors (see [Read-only stores and conflicts](https://platform.claude.com/docs/en/managed-agents/self-hosted-sandboxes#read-only-stores-and-conflicts)). If a memory store cannot be mounted when the worker claims a session, the worker fails the work item: the session emits no error event and stays idle.

| Symptom                                                                                                                                 | Cause                                                                                                                                                                                                          | Fix                                                                                                                                                                                                                                                                                                                              |
| --------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| The worker log contains `the work item carried no sessions token` (in Go, the `ErrSessionMemoryNoToken` error) and the work item fails. | The work item's per-session `secret` did not reach the worker: memory stores on self-hosted sandboxes are not enabled for your organization, or your spawn script did not forward the secret into the sandbox. | In the sandbox-per-session pattern, forward `ANTHROPIC_WORK_SECRET` into the sandbox as shown in [Run one sandbox per session](https://platform.claude.com/docs/en/managed-agents/self-hosted-sandboxes#run-one-sandbox-per-session). If the worker polls and runs sessions in one process and still logs this, contact support. |
| The worker log contains `something already exists at the memory store's path`.                                                          | A directory left over from a previous session, usually one whose worker was killed before its teardown ran.                                                                                                    | Remove the leftover directory that the log line names. Edits in it that had not synced are lost.                                                                                                                                                                                                                                 |
| The worker log contains `cannot create the memory store's folder` and `the worker host must make this mount path writable`.             | The user the worker runs as cannot create directories under `/mnt/memory`.                                                                                                                                     | Create `/mnt/memory` and `chown` it to that user; see [Prepare the host](https://platform.claude.com/docs/en/managed-agents/self-hosted-sandboxes#prepare-the-host).                                                                                                                                                             |
| The session sits `idle` with a `requires_action` stop reason and no error event shortly after a worker claimed it.                      | The worker failed the work item because it could not mount a memory store, for one of the preceding reasons.                                                                                                   | Fix the cause on the host, then send a [`user.interrupt`](https://platform.claude.com/docs/en/managed-agents/events-and-streaming#integrating-events) event: the session's work is queued again and the next worker that claims it retries the mount.                                                                            |

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
pageSha256: "5120662ae4164c4cba0df93dff0730f7bb5974fa2f344ac267cb0d32e7806ffa"
contentMode: "local-full"
zh: ""
---

## Run a worker

Choose **always-on** for the simplest setup: a long-running process polls the queue continuously and needs only outbound HTTPS. Choose **webhook-triggered** to avoid running an idle poller; it requires a webhook endpoint that Anthropic can reach (see [Webhooks](https://platform.claude.com/docs/en/managed-agents/webhooks) for endpoint setup and signature verification).

```
```
        Run this on the worker host.

            For Linux environments, download the release binary directly.

            ```bash
            VERSION=1.30.0
            OS=$(uname -s | tr '[:upper:]' '[:lower:]')
            case $(uname -m) in
              x86_64) ARCH=amd64 ;;
              aarch64) ARCH=arm64 ;;
            esac
            curl -fsSL "https://github.com/anthropics/anthropic-cli/releases/download/v${VERSION}/ant_${VERSION\}_${OS}_${ARCH\}.tar.gz" \
              | sudo tar -xz -C /usr/local/bin ant
            ```

            You can find all releases on the [GitHub releases page](https://github.com/anthropics/anthropic-cli/releases).

            ```bash
            brew install anthropics/tap/ant
            ```
```
```

        **In-process**

        `ant beta:worker poll` claims work items assigned to the environment, downloads skills, executes tool calls in the working directory, and posts results back. It reads `ANTHROPIC_ENVIRONMENT_KEY` and `ANTHROPIC_ENVIRONMENT_ID` from the environment.

        ```bash
        ant beta:worker poll --workdir "/workspace"
        ```

        The worker exits cleanly on SIGTERM or SIGINT: it cancels any in-flight tool call, posts its error result, and releases the work item before stopping.

        **Sandbox per session**

        If you need stronger isolation (a fresh filesystem, resource limits, or per-session network controls), run each session in its own sandbox. Build an image with `ant` installed and `ant beta:worker run` as the entrypoint. The base image must provide `/bin/bash`; `curl` is only used at build time. When a sandbox starts, it reads session details from environment variables, handles that session, and exits:

        ```text
        FROM your-base-image
        ARG ANT_VERSION=1.30.0
        ARG TARGETARCH
        RUN ARCH=$([ "$TARGETARCH" = "arm64" ] && echo arm64 || echo amd64) && \
            curl -fsSL "https://github.com/anthropics/anthropic-cli/releases/download/v${ANT_VERSION}/ant_${ANT_VERSION\}_linux_${ARCH}.tar.gz" \
              | tar -xz -C /usr/local/bin ant
        WORKDIR /workspace
        VOLUME /workspace
        ENTRYPOINT ["ant", "beta:worker", "run"]
        ```

        Then write a spawn script that forwards session details into a fresh sandbox. The poller injects `ANTHROPIC_SESSION_ID`, `ANTHROPIC_WORK_ID`, `ANTHROPIC_ENVIRONMENT_ID`, and `ANTHROPIC_ENVIRONMENT_KEY` into the script's environment, and writes the claimed work item to the script's standard input as JSON, including the work item's per-session `secret` when Anthropic issued one. `ANTHROPIC_BASE_URL` is optional and is passed through only if it was set on the poller host; it overrides the default API endpoint. In the example, `/host/outputs` is a host directory you choose; it is bind-mounted to the sandbox's working directory (`/workspace`) so you can retrieve session deliverables after the sandbox exits. On self-hosted environments the agent writes deliverables under the working directory rather than `/mnt/session/outputs` (see [Sandbox filesystem](https://platform.claude.com/docs/en/managed-agents/self-hosted-sandboxes#sandbox-filesystem)), so mounting the working directory is what captures them; the mount also picks up the downloaded `skills/` tree and any intermediate files the agent creates.

        ```bash
        #!/bin/bash
        # spawn.sh: called once per claimed work item
        mkdir -p "/host/outputs/$ANTHROPIC_SESSION_ID"
        exec docker run --rm \
          -e ANTHROPIC_SESSION_ID -e ANTHROPIC_ENVIRONMENT_KEY \
          -e ANTHROPIC_WORK_ID -e ANTHROPIC_ENVIRONMENT_ID -e ANTHROPIC_BASE_URL \
          -v "/host/outputs/$ANTHROPIC_SESSION_ID":/workspace \
          your-image
        ```

        The `ant beta:worker run` entrypoint does not mount [memory stores](https://platform.claude.com/docs/en/managed-agents/self-hosted-sandboxes#use-memory-stores). If sessions on this environment attach memory stores, keep the poller, but build the per-session image around the SDK worker and extend the spawn script to forward the work item's `secret` into the sandbox, as shown in [Run one sandbox per session](https://platform.claude.com/docs/en/managed-agents/self-hosted-sandboxes#run-one-sandbox-per-session).

        Start the poller pointing at the script:

        ```bash
        ant beta:worker poll --on-work ./spawn.sh
        ```
```
```

```
```
        `EnvironmentWorker` claims work items assigned to the environment, downloads skills, executes tool calls in the working directory, and posts results back. Authenticate with the environment key you generated in [Before you begin](https://platform.claude.com/docs/en/managed-agents/self-hosted-sandboxes#before-you-begin).

          ```python Python
          import asyncio
          import contextlib
          import os
          import signal
          from anthropic import AsyncAnthropic
          from anthropic.lib.environments import EnvironmentWorker

          async def main() -> None:
              environment_key = os.environ["ANTHROPIC_ENVIRONMENT_KEY"]
              environment_id = os.environ["ANTHROPIC_ENVIRONMENT_ID"]
              async with AsyncAnthropic(auth_token=environment_key) as client:
                  worker = EnvironmentWorker(
                      client,
                      environment_id=environment_id,
                      environment_key=environment_key,
                      workdir="/workspace",
                  )
                  task = asyncio.create_task(worker.run())
                  # Cancelling the task, rather than killing the process, lets the worker stop its
                  # in-flight work item and upload changed memory files before it exits.
                  loop = asyncio.get_running_loop()
                  for signum in (signal.SIGINT, signal.SIGTERM):
                      loop.add_signal_handler(signum, task.cancel)
                  with contextlib.suppress(asyncio.CancelledError):
                      await task

          asyncio.run(main())
          ```

          ```typescript TypeScript
          import Anthropic from "@anthropic-ai/sdk";
          import \{ EnvironmentWorker \} from "@anthropic-ai/sdk/helpers/beta/environments";

          const environmentKey = process.env.ANTHROPIC_ENVIRONMENT_KEY!;
          const environmentId = process.env.ANTHROPIC_ENVIRONMENT_ID!;
          const client = new Anthropic(\{ authToken: environmentKey \});
          const controller = new AbortController();
          // Aborting on either signal lets the worker upload changed memory files and remove its
          // store directories before the process exits.
          process.once("SIGINT", () => controller.abort());
          process.once("SIGTERM", () => controller.abort());

          await new EnvironmentWorker(\{
            client,
            environmentId,
            environmentKey,
            workdir: "/workspace",
            signal: controller.signal
          \}).run();
          ```

          ```csharp C#
          // EnvironmentWorker is not currently available in the C# SDK. See the Always-on (ant CLI) tab.
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

          func main() \{
          	environmentKey := os.Getenv("ANTHROPIC_ENVIRONMENT_KEY")
          	environmentID := os.Getenv("ANTHROPIC_ENVIRONMENT_ID")

          	ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)
          	defer stop()

          	client := anthropic.NewClient(option.WithAuthToken(environmentKey))

          	worker := environments.NewEnvironmentWorker(client, environments.EnvironmentWorkerOptions\{
          		EnvironmentID:  environmentID,
          		EnvironmentKey: environmentKey,
          		Workdir:        "/workspace",
          	\})
          	if err := worker.Run(ctx); err != nil \{
          		log.Fatalf("worker: %v", err)
          	\}
          \}

          ```

          ```java Java
          // EnvironmentWorker is not currently available in the Java SDK. See the Always-on (ant CLI) tab.
          ```

          ```php PHP
          // EnvironmentWorker is not currently available in the PHP SDK. See the Always-on (ant CLI) tab.
          ```

          ```ruby Ruby
          # EnvironmentWorker is not currently available in the Ruby SDK. See the Always-on (ant CLI) tab.
          ```
```
```

```
```
        In the [Console](https://platform.claude.com/settings/workspaces/default/webhooks), define a webhook endpoint that listens for `session.status_run_started` events. See [Webhooks](https://platform.claude.com/docs/en/managed-agents/webhooks) for details.

        In addition to the environment ID and key from [Before you begin](https://platform.claude.com/docs/en/managed-agents/self-hosted-sandboxes#before-you-begin), export the webhook signing key on your handler host so the handler can verify incoming payloads. Signature verification in the Python handler needs the webhooks extra: `pip install "anthropic[webhooks]"`.

        ```bash
        export ANTHROPIC_WEBHOOK_SIGNING_KEY="whsec_..."
        ```

        `EnvironmentWorker` claims the work item, downloads skills, executes tool calls in the working directory, posts results back, and exits. Invoke it when `session.status_run_started` fires.

        When you hand a claimed work item to `handle_item()` yourself, as this handler does, pass the work item's `secret` along as `work_secret` (`workSecret` in TypeScript, `WorkSecret` in Go) so the session can mount any [memory stores](https://platform.claude.com/docs/en/managed-agents/self-hosted-sandboxes#use-memory-stores) attached to it. A handler like this one runs every claimed item in one process on one host, so two sessions that attach the same memory store cannot run through it at the same time (see [Prepare the host](https://platform.claude.com/docs/en/managed-agents/self-hosted-sandboxes#prepare-the-host)); if your sessions share stores, launch [one sandbox per session](https://platform.claude.com/docs/en/managed-agents/self-hosted-sandboxes#run-one-sandbox-per-session) instead.

          ```python Python
          import asyncio
          import os
          import anthropic
          import standardwebhooks  # installed by the anthropic[webhooks] extra

          environment_key = os.environ["ANTHROPIC_ENVIRONMENT_KEY"]
          environment_id = os.environ["ANTHROPIC_ENVIRONMENT_ID"]
          client = anthropic.AsyncAnthropic(
              auth_token=environment_key,
          )
          # Cancelled by shutdown() so an in-flight work item can upload changed memory files and
          # remove its store directories before the process exits.
          inflight: set[asyncio.Task[None]] = set()

          # Await this from the host's shutdown hook, such as an ASGI lifespan shutdown (the code after
          # `yield` in a FastAPI lifespan), which uvicorn runs on SIGTERM. uvicorn lets open requests
          # finish before that hook runs, so set --timeout-graceful-shutdown to bound the wait.
          async def shutdown() -> None:
              for task in inflight:
                  task.cancel()
              await asyncio.gather(*inflight, return_exceptions=True)

          async def handle(raw: bytes, headers: dict[str, str]) -> tuple[dict[str, str], int]:
              try:
                  event = client.beta.webhooks.unwrap(raw.decode(), headers=headers)
              except standardwebhooks.WebhookVerificationError:
                  return \{"error": "signature verification failed"\}, 401
              if event.data.type != "session.status_run_started":
                  return \{"status": "ignored"\}, 200
              task = asyncio.create_task(run_queued_work())
              inflight.add(task)
              task.add_done_callback(inflight.discard)
              try:
                  # Shielded: a dropped or timed-out delivery must not cancel the item; shutdown() does.
                  await asyncio.shield(task)
              except asyncio.CancelledError:
                  return \{"status": "shutting down"\}, 503
              return \{"status": "ok"\}, 200

          async def run_queued_work() -> None:
              async for work in client.beta.environments.work.poller(
                  environment_id=environment_id,
                  environment_key=environment_key,
                  block_ms=None,
                  reclaim_older_than_ms=2000,
                  drain=True,
                  auto_stop=False,
              ):
                  await client.beta.environments.work.worker(workdir="/workspace").handle_item(
                      work_id=work.id,
                      environment_id=environment_id,
                      session_id=work.data.id,
                      environment_key=environment_key,
                      # The per-session secret is what lets the worker mount the session's memory stores.
                      work_secret=work.secret,
                  )
          ```

          ```typescript TypeScript
          import Anthropic from "@anthropic-ai/sdk";

          const environmentKey = process.env.ANTHROPIC_ENVIRONMENT_KEY!;
          const environmentId = process.env.ANTHROPIC_ENVIRONMENT_ID!;
          const client = new Anthropic(\{
            authToken: environmentKey
          \});
          // Call shutdown.abort() from the host's SIGTERM/SIGINT handler, alongside closing the server,
          // then wait for in-flight handle() calls before exiting: the abort lets a running work item
          // upload changed memory files and remove its store directories first.
          export const shutdown = new AbortController();

          export async function handle(req: Request): Promise&lt;Response> \{
            // Never acknowledge a delivery whose work will not run here; a 503 makes the sender retry.
            if (shutdown.signal.aborted) \{
              return Response.json(\{ status: "shutting down" \}, \{ status: 503 \});
            \}
            const body = await req.text();
            let event;
            try \{
              event = client.beta.webhooks.unwrap(body, \{ headers: Object.fromEntries(req.headers) \});
            \} catch \{
              return new Response("signature verification failed", \{ status: 401 \});
            \}
            if (event.data.type !== "session.status_run_started") \{
              return Response.json(\{ status: "ignored" \});
            \}

            for await (const work of client.beta.environments.work.poller(\{
              environmentId,
              environmentKey,
              blockMs: null,
              reclaimOlderThanMs: 2000,
              drain: true,
              autoStop: false,
              signal: shutdown.signal
            \})) \{
              await client.beta.environments.work.worker(\{ workdir: "/workspace" \}).handleItem(\{
                workId: work.id,
                environmentId,
                sessionId: work.data.id,
                environmentKey,
                // The per-session secret is what lets the worker mount the session's memory stores.
                workSecret: work.secret ?? undefined,
                signal: shutdown.signal
              \});
            \}
            // The poller and handleItem return quietly on abort, so a drain cut short lands here.
            if (shutdown.signal.aborted) \{
              return Response.json(\{ status: "shutting down" \}, \{ status: 503 \});
            \}
            return Response.json(\{ status: "ok" \});
          \}
          ```

          ```csharp C#
          // EnvironmentWorker is not currently available in the C# SDK.
          // To handle work items directly, see the Environments Work endpoints.
          ```

          ```go Go
          package main

          import (
          	"context"
          	"encoding/json"
          	"errors"
          	"io"
          	"log/slog"
          	"net/http"
          	"os"
          	"os/signal"
          	"syscall"

          	"github.com/anthropics/anthropic-sdk-go"
          	"github.com/anthropics/anthropic-sdk-go/lib/environments"
          	"github.com/anthropics/anthropic-sdk-go/option"
          	"github.com/anthropics/anthropic-sdk-go/packages/param"
          )

          var (
          	environmentKey = os.Getenv("ANTHROPIC_ENVIRONMENT_KEY")
          	environmentID  = os.Getenv("ANTHROPIC_ENVIRONMENT_ID")
          	client         = anthropic.NewClient(
          		option.WithAuthToken(environmentKey),
          		option.WithWebhookKey(os.Getenv("ANTHROPIC_WEBHOOK_SIGNING_KEY")),
          	)
          	worker = environments.NewEnvironmentWorker(client, environments.EnvironmentWorkerOptions\{
          		Workdir: "/workspace",
          	\})
          	// Cancelled on SIGINT or SIGTERM (set in main) so an in-flight work item can
          	// upload changed memory files and remove its store directories before exit.
          	shutdown context.Context
          )

          func handle(w http.ResponseWriter, r *http.Request) \{
          	body, err := io.ReadAll(r.Body)
          	if err != nil \{
          		http.Error(w, "bad request", http.StatusBadRequest)
          		return
          	\}
          	event, err := client.Beta.Webhooks.Unwrap(body, r.Header)
          	if err != nil \{
          		http.Error(w, "signature verification failed", http.StatusUnauthorized)
          		return
          	\}
          	if event.Data.Type != "session.status_run_started" \{
          		json.NewEncoder(w).Encode(map[string]string\{"status": "ignored"\})
          		return
          	\}

          	// The Go SDK does not provide a RunOne convenience: drain pending items
          	// with WorkPoller and run each one with HandleItem.
          	// Detach from r.Context(): the session can outlive the webhook delivery timeout.
          	// The process-wide shutdown context still ends the item cleanly on SIGTERM.
          	ctx := shutdown
          	poller := environments.NewWorkPoller(ctx, client, environments.WorkPollerOptions\{
          		EnvironmentID:      environmentID,
          		EnvironmentKey:     environmentKey,
          		BlockMs:            param.Null[int64](),
          		ReclaimOlderThanMs: param.NewOpt[int64](https://platform.claude.com/docs),
          		Drain:              true,
          		AutoStop:           param.NewOpt(false),
          	\})
          	defer poller.Close()
          	for poller.Next() \{
          		item := poller.Current()
          		if err := worker.HandleItem(ctx, environments.HandleItemOptions\{
          			WorkID:         item.ID,
          			EnvironmentID:  item.EnvironmentID,
          			SessionID:      item.Data.ID,
          			EnvironmentKey: environmentKey,
          			// The per-session secret is what lets the worker mount the session's memory stores.
          			WorkSecret: item.Secret,
          		\}); err != nil \{
          			slog.Error("handle work item", "work_id", item.ID, "err", err)
          			http.Error(w, "internal error", http.StatusInternalServerError)
          			return
          		\}
          	\}
          	if err := poller.Err(); err != nil \{
          		slog.Error("poll work queue", "err", err)
          		http.Error(w, "internal error", http.StatusInternalServerError)
          		return
          	\}
          	json.NewEncoder(w).Encode(map[string]string\{"status": "ok"\})
          \}

          func main() \{
          	ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)
          	defer stop()
          	shutdown = ctx

          	server := &http.Server\{Addr: ":8080"\}
          	http.HandleFunc("POST /webhook", handle)
          	go func() \{
          		if err := server.ListenAndServe(); err != nil && !errors.Is(err, http.ErrServerClosed) \{
          			slog.Error("http server", "err", err)
          			os.Exit(1)
          		\}
          	\}()
          	// On a signal, stop accepting deliveries and return only after in-flight
          	// handlers, and therefore their work items' memory teardown, have finished.
          	<-ctx.Done()
          	if err := server.Shutdown(context.Background()); err != nil \{
          		slog.Error("http shutdown", "err", err)
          	\}
          \}

          ```

          ```java Java
          // EnvironmentWorker is not currently available in the Java SDK.
          // To handle work items directly, see the Environments Work endpoints.
          ```

          ```php PHP
          // EnvironmentWorker is not currently available in the PHP SDK.
          // To handle work items directly, see the Environments Work endpoints.
          ```

          ```ruby Ruby
          # EnvironmentWorker is not currently available in the Ruby SDK.
          # To handle work items directly, see the Environments Work endpoints.
          ```
```
```

### SDK helpers

The SDK provides three helpers at different levels of control. `EnvironmentWorker` covers most use cases; drop to the lower-level helpers when you need to launch your own per-session process or run tools against an already-claimed session.

* **`EnvironmentWorker`:** the out-of-the-box worker. Handles polling, setup, and execution end to end.

  * `.run()`: runs indefinitely, picking up sessions as they arrive.
  * `.handle_item()`: handles a single claimed work item and exits. Pass the work, session, and environment identifiers explicitly, or let it read the `ANTHROPIC_*` variables that `ant beta:worker poll --on-work` sets for the process it spawns. To let the session mount its [memory stores](https://platform.claude.com/docs/en/managed-agents/self-hosted-sandboxes#use-memory-stores), also pass the work item's `secret` as `work_secret` (`workSecret` in TypeScript, `WorkSecret` in Go) or set `ANTHROPIC_WORK_SECRET`; `ant beta:worker poll --on-work` does not set that variable, so read the secret from the work item JSON it writes to your script's standard input, as shown in [Run one sandbox per session](https://platform.claude.com/docs/en/managed-agents/self-hosted-sandboxes#run-one-sandbox-per-session).
  * `memory_sync_interval` (`memorySyncIntervalMs` in TypeScript, `MemorySyncInterval` in Go) and `memory_sync_deletions` (`memorySyncDeletions`, `MemorySyncDeletions`): how often attached memory stores reconcile with the server while the session runs, and whether files the agent deletes locally are also deleted from the store. See [Configure sync](https://platform.claude.com/docs/en/managed-agents/self-hosted-sandboxes#configure-sync) for units, defaults, and how to disable memory support.

* **`work.poller()`:** polls the work queue on your behalf and gives you each claimed session. Use this when you want to decide what happens for each session, for example launching a sandbox rather than running tools in-process.

  * `drain`: whether to stop polling once the queue is empty rather than waiting for new work.
  * `block_ms`: how long to wait for work to arrive before returning, in milliseconds. Must be between 1 and 999 (per-poll wait; the helper re-polls automatically). Pass `null` (`None` in Python, `param.Null[int64]()` in Go) for a non-blocking check; omitting the parameter uses the default 999 ms long-poll.
  * `reclaim_older_than_ms`: re-claim work items that were claimed but never acknowledged within this many milliseconds.
  * `auto_stop` (`autoStop` in TypeScript, `AutoStop` in Go): whether to post a stop signal for each work item once your loop body finishes with it. Turn it off whenever whatever runs the work item posts the stop itself: `handle_item()` does, so set it to false when you hand claimed items to `handle_item()` as the webhook handlers on this page do, and so does a sandbox you launch that owns the stop call.

* **`client.beta.sessions.events.tool_runner()`:** runs tool calls for a single session, given the session ID and a tool list. Use when you've already claimed the work and only need the execution layer.

Use the work poller directly when you want to launch your own per-session process, for example spinning up a sandbox for each claimed session:

  ```bash cURL
  # The work poller is an SDK helper (Python, TypeScript, Go), not a raw
  # endpoint. From the shell, use `ant beta:worker poll --on-work` instead;
  # see the Always-on (ant CLI) tab.
  ```

  ```bash CLI
  # The work poller is an SDK helper (Python, TypeScript, Go), not a raw
  # endpoint. From the shell, use `ant beta:worker poll --on-work` instead;
  # see the Always-on (ant CLI) tab.
  ```

  ```python Python
  import asyncio
  import os

  from anthropic import AsyncAnthropic
  from anthropic.types.beta.environments import BetaSelfHostedWork

  SANDBOX_ENV = (
      "ANTHROPIC_ENVIRONMENT_ID",
      "ANTHROPIC_ENVIRONMENT_KEY",
      "ANTHROPIC_WORK_ID",
      "ANTHROPIC_SESSION_ID",
      "ANTHROPIC_WORK_SECRET",
      "ANTHROPIC_BASE_URL",  # forwarded only when set on this host
  )

  async def launch_container(work: BetaSelfHostedWork) -> None:
      print(f"claimed session {work.data.id}")
      # Replace `docker run` with your own sandbox launcher. Forward the environment
      # key (never your API key) and the work item's per-session secret: the worker
      # inside needs the secret to mount the session's memory stores.
      env = os.environ | {
          "ANTHROPIC_WORK_ID": work.id,
          "ANTHROPIC_SESSION_ID": work.data.id,
          "ANTHROPIC_WORK_SECRET": work.secret or "",
      }
      forward = [arg for name in SANDBOX_ENV for arg in ("-e", name)]
      launcher = await asyncio.create_subprocess_exec(
          "docker", "run", "--rm", "--detach", *forward, "your-sdk-worker-image", env=env
      )
      await launcher.wait()

  async def main() -> None:
      environment_key = os.environ["ANTHROPIC_ENVIRONMENT_KEY"]
      environment_id = os.environ["ANTHROPIC_ENVIRONMENT_ID"]
      async with AsyncAnthropic(auth_token=environment_key) as client:
          async for work in client.beta.environments.work.poller(
              environment_id=environment_id,
              environment_key=environment_key,
              auto_stop=False,  # the launched sandbox owns the stop call
          ):
              await launch_container(work)

  asyncio.run(main())
  ```

  ```typescript TypeScript
  import { spawn } from "node:child_process";
  import { once } from "node:events";
  import Anthropic from "@anthropic-ai/sdk";
  import { WorkPoller } from "@anthropic-ai/sdk/helpers/beta/environments";
  import type { BetaSelfHostedWork } from "@anthropic-ai/sdk/resources/beta/environments";

  const SANDBOX_ENV = [
    "ANTHROPIC_ENVIRONMENT_ID",
    "ANTHROPIC_ENVIRONMENT_KEY",
    "ANTHROPIC_WORK_ID",
    "ANTHROPIC_SESSION_ID",
    "ANTHROPIC_WORK_SECRET",
    "ANTHROPIC_BASE_URL" // forwarded only when set on this host
  ];

  const environmentKey = process.env.ANTHROPIC_ENVIRONMENT_KEY!;
  const environmentId = process.env.ANTHROPIC_ENVIRONMENT_ID!;
  const client = new Anthropic({ authToken: environmentKey });

  async function launchContainer(work: BetaSelfHostedWork): Promise<void> {
    console.log(`claimed session ${work.data.id}`);
    // Replace `docker run` with your own sandbox launcher. Forward the environment
    // key (never your API key) and the work item's per-session secret: the worker
    // inside needs the secret to mount the session's memory stores.
    const env = {
      ...process.env,
      ANTHROPIC_WORK_ID: work.id,
      ANTHROPIC_SESSION_ID: work.data.id,
      ANTHROPIC_WORK_SECRET: work.secret ?? ""
    };
    const forward = SANDBOX_ENV.flatMap((name) => ["-e", name]);
    const launcher = spawn(
      "docker",
      ["run", "--rm", "--detach", ...forward, "your-sdk-worker-image"],
      { env, stdio: "inherit" }
    );
    await once(launcher, "close");
  }

  const poller = new WorkPoller({
    client,
    environmentId,
    environmentKey,
    autoStop: false // the launched sandbox owns the stop call
  });

  for await (const work of poller) {
    await launchContainer(work);
  }
  ```

  ```csharp C#
  // A work-polling helper is not currently available in the C# SDK.
  // To claim work directly, see the Environments Work endpoints.
  ```

  ```go Go
  package main

  import (
  	"context"
  	"fmt"
  	"log"
  	"os"
  	"os/exec"

  	"github.com/anthropics/anthropic-sdk-go"
  	"github.com/anthropics/anthropic-sdk-go/lib/environments"
  	"github.com/anthropics/anthropic-sdk-go/option"
  	"github.com/anthropics/anthropic-sdk-go/packages/param"
  )

  var sandboxEnv = []string{
  	"ANTHROPIC_ENVIRONMENT_ID",
  	"ANTHROPIC_ENVIRONMENT_KEY",
  	"ANTHROPIC_WORK_ID",
  	"ANTHROPIC_SESSION_ID",
  	"ANTHROPIC_WORK_SECRET",
  	"ANTHROPIC_BASE_URL", // forwarded only when set on this host
  }

  func launchContainer(ctx context.Context, work *anthropic.BetaSelfHostedWork) error {
  	fmt.Printf("claimed session %s\n", work.Data.ID)
  	// Replace `docker run` with your own sandbox launcher. Forward the environment
  	// key (never your API key) and the work item's per-session secret: the worker
  	// inside needs the secret to mount the session's memory stores.
  	args := []string{"run", "--rm", "--detach"}
  	for _, name := range sandboxEnv {
  		args = append(args, "-e", name)
  	}
  	launcher := exec.CommandContext(ctx, "docker", append(args, "your-sdk-worker-image")...)
  	launcher.Env = append(os.Environ(),
  		"ANTHROPIC_WORK_ID="+work.ID,
  		"ANTHROPIC_SESSION_ID="+work.Data.ID,
  		"ANTHROPIC_WORK_SECRET="+work.Secret,
  	)
  	launcher.Stdout, launcher.Stderr = os.Stdout, os.Stderr
  	return launcher.Run()
  }

  func main() {
  	environmentID := os.Getenv("ANTHROPIC_ENVIRONMENT_ID")
  	environmentKey := os.Getenv("ANTHROPIC_ENVIRONMENT_KEY")

  	client := anthropic.NewClient(option.WithAuthToken(environmentKey))

  	ctx := context.Background()

  	poller := environments.NewWorkPoller(ctx, client, environments.WorkPollerOptions{
  		EnvironmentID:  environmentID,
  		EnvironmentKey: environmentKey,
  		AutoStop:       param.NewOpt(false), // the launched sandbox owns the stop call
  	})
  	defer poller.Close()

  	for work, err := range poller.All() {
  		if err != nil {
  			log.Fatal(err)
  		}
  		if err := launchContainer(ctx, work); err != nil {
  			log.Fatal(err)
  		}
  	}
  }
  ```

  ```java Java
  // A work-polling helper is not currently available in the Java SDK.
  // To claim work directly, see the Environments Work endpoints.
  ```

  ```php PHP
  // A work-polling helper is not currently available in the PHP SDK.
  // To claim work directly, see the Environments Work endpoints.
  ```

  ```ruby Ruby
  # A work-polling helper is not currently available in the Ruby SDK.
  # To claim work directly, see the Environments Work endpoints.
  ```

Whatever launches the sandbox must forward the claimed work item's `secret` into it (for example as `ANTHROPIC_WORK_SECRET`) alongside the session, work, and environment identifiers, so the worker inside can mount the session's [memory stores](https://platform.claude.com/docs/en/managed-agents/self-hosted-sandboxes#use-memory-stores); see [Run one sandbox per session](https://platform.claude.com/docs/en/managed-agents/self-hosted-sandboxes#run-one-sandbox-per-session).

**`AgentToolContext`** is the execution context for tool calls. It defines the working directory and path policy, and can download the session's skills. The file tools (`read`, `write`, `edit`, `glob`, `grep`) are confined to the working directory plus any directories listed in `allowed_roots` (`allowedRoots` in TypeScript, `AllowedRoots` in Go), and `write` and `edit` additionally refuse paths under `read_only_roots` (`readOnlyRoots`, `ReadOnlyRoots`). `EnvironmentWorker` adds the session's memory store directories to these lists itself. The confinement is a guardrail for the file tools only, not a sandbox; it does not constrain `bash`. **`beta_agent_toolset_20260401(env)`** takes an `AgentToolContext` and returns the standard tool implementations (`bash`, `read`, `write`, `edit`, `glob`, `grep`).

**With `EnvironmentWorker`:** both are managed automatically. Pass a `tools` factory to customize the tool list:

  ```python Python
  EnvironmentWorker(client, ..., tools=lambda env: [beta_bash_tool(env), my_custom_tool])
  ```

  ```typescript TypeScript
  new EnvironmentWorker({
    client,
    environmentId,
    environmentKey,
    tools: (ctx) => [betaBashTool(ctx), myCustomTool]
  });
  ```

  ```csharp C#
  // EnvironmentWorker is not currently available in the C# SDK.
  // To answer custom tool calls directly, see the session event stream.
  ```

  ```go Go
  worker := environments.NewEnvironmentWorker(client, environments.EnvironmentWorkerOptions{
  	EnvironmentID:  environmentID,
  	EnvironmentKey: environmentKey,
  	ToolsFunc: func(env *agenttoolset.AgentToolContext) []anthropic.BetaTool {
  		return []anthropic.BetaTool{agenttoolset.BetaBashTool(env), myCustomTool}
  	},
  })
  ```

  ```java Java
  // EnvironmentWorker is not currently available in the Java SDK.
  // To answer custom tool calls directly, see the session event stream.
  ```

  ```php PHP
  // EnvironmentWorker is not currently available in the PHP SDK.
  // To answer custom tool calls directly, see the session event stream.
  ```

  ```ruby Ruby
  # EnvironmentWorker is not currently available in the Ruby SDK.
  # To answer custom tool calls directly, see the session event stream.
  ```

**With `work.poller()` and `tool_runner()`:** pass a tool list as `tools` to `client.beta.sessions.events.tool_runner()`. To build that list, set up `AgentToolContext` yourself and call `beta_agent_toolset_20260401(env)`:

  ```python Python
  from anthropic.lib.tools.agent_toolset import (
      AgentToolContext,
      beta_agent_toolset_20260401,
  )

  async with AgentToolContext(
      workdir="/workspace", client=client, session_id=work.data.id
  ) as env:
      # skills downloaded to /workspace/skills/<name>/
      tools = beta_agent_toolset_20260401(env)
  ```

  ```typescript TypeScript
  import {
    setupSkills,
    betaAgentToolset20260401
  } from "@anthropic-ai/sdk/tools/agent-toolset/node";

  const ctx = { workdir: "/workspace", client, sessionId: work.data.id };
  await setupSkills(ctx);
  const tools = betaAgentToolset20260401(ctx);
  ```

  ```csharp C#
  // AgentToolContext is not currently available in the C# SDK.
  ```

  ```go Go
  env := &agenttoolset.AgentToolContext{Workdir: "/workspace"}
  if err := env.SetupSkills(ctx, client, work.Data.ID); err != nil {
  	panic(err)
  }
  // skills downloaded to /workspace/skills/<name>/
  tools := agenttoolset.BetaAgentToolset20260401(env)
  ```

  ```java Java
  // AgentToolContext is not currently available in the Java SDK.
  ```

  ```php PHP
  // AgentToolContext is not currently available in the PHP SDK.
  ```

  ```ruby Ruby
  # AgentToolContext is not currently available in the Ruby SDK.
  ```

### Verify the worker is connected

From a separate shell, with `ANTHROPIC_API_KEY` set to your Claude API key (not the environment key), confirm `workers_polling` is at least 1:

```bash
ant beta:environments:work stats --environment-id "$ANTHROPIC_ENVIRONMENT_ID"
```

If `workers_polling` stays at 0, the worker isn't reaching the queue: confirm `ANTHROPIC_ENVIRONMENT_KEY` and `ANTHROPIC_ENVIRONMENT_ID` are set on the worker host. See [Read queue depth](https://platform.claude.com/docs/en/managed-agents/self-hosted-sandboxes#read-queue-depth) for the full stats response and other language examples.

---
title: "openai-cookbook-docs"
sourceId: "08-agents/openai-cookbook-docs"
sourceTitle: "openai-cookbook-docs"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://developers.openai.com/cookbook"
entryUrl: "https://developers.openai.com/cookbook"
sourceRel: "cookbook/examples/agents_sdk/computer_use_with_daytona/computer_use_with_daytona.md"
rawUrl: "/raw/08-agents/openai-cookbook-docs/cookbook/examples/agents_sdk/computer_use_with_daytona/computer_use_with_daytona.md"
sourceSha256: "a94c68575973ef4c95f8c051e8a957e937b7c2d59e117cba4310a5cb7d7b5595"
pageSha256: "a4cdf1c85a51706ff30e3c4b0797bd71be49cd608e4e97cf4fc7a8c4c302edfe"
contentMode: "local-full"
zh: ""
---

## Serve the form inside the sandbox

We upload `form.html` into the sandbox and serve it with `python3 -m http.server` on port 8080. Two small details:

1. The Daytona Python SDK uploads bytes, not paths, so we read `form.html` on the host and push the bytes to `/home/daytona/form/index.html`.
2. `sandbox.process.exec(...)` waits for the child's stdout/stderr pipes to close, so a naive `python3 -m http.server &` would hang even though the shell exits — the backgrounded server keeps those pipes open. Redirecting stdout/stderr to a log file closes the inherited pipes, so `exec` returns immediately and the server keeps running.

```python
form_html = Path("form.html").read_bytes()
await sandbox.fs.create_folder(_FORM_DIR, "0755")
await sandbox.fs.upload_file(form_html, f"{_FORM_DIR}/index.html")
print(f"Form uploaded to {_FORM_DIR}/index.html")

await sandbox.process.exec(
    f"sh -c 'cd {_FORM_DIR} && python3 -m http.server {_SERVER_PORT} "
    f"> /tmp/httpd.log 2>&1 &'"
)

# Poll until the server answers (or fail after a few seconds).
for _ in range(10):
    check = await sandbox.process.exec(
        f"curl -sf -o /dev/null http://localhost:{_SERVER_PORT}/"
    )
    if check.exit_code == 0:
        break
    await asyncio.sleep(0.5)
else:
    raise RuntimeError(f"HTTP server did not respond on port {_SERVER_PORT}")

print(f"HTTP server started on port {_SERVER_PORT}")
```

```text
Form uploaded to /home/daytona/form/index.html
HTTP server started on port 8080
```

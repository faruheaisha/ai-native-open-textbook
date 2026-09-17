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
pageSha256: "1a5f944a65879665d702d821bb5c847d3944b89fce2749c4b74c100b3e9535be"
contentMode: "local-full"
zh: ""
---

## Run the agent

This is the main event. We:

1. Enter the `DaytonaAsyncComputer` context manager, which starts the sandbox's computer-use processes (Xvfb, window manager, VNC).
2. Start a session recording. `sandbox.computer_use.recording.start(...)` returns a handle we need later to stop and download.
3. Build the `Agent` with a single tool, `ComputerTool(computer=computer)`, and run it with `Runner.run(...)` inside a `trace(...)` block so the run shows up in the OpenAI [traces dashboard](https://platform.openai.com/traces).
4. In a `finally` block, stop the recording and download it locally, using the filename Daytona reports (currently an `.mp4`).

`max_turns=50` is a generous ceiling for a form this size; a good run will come in well under that.

```python
async with DaytonaAsyncComputer(sandbox) as computer:
    recording = await sandbox.computer_use.recording.start("form-fill")
    print(f"Recording started: {recording.id}")

    try:
        with trace("Daytona form-fill demo"):
            agent = Agent(
                name="Form filler",
                instructions=INSTRUCTIONS,
                tools=[ComputerTool(computer=computer)],
                model="gpt-5.4",
            )
            result = await Runner.run(agent, TASK, max_turns=50)
            print(f"\n--- Final output ---\n{result.final_output}")
    finally:
        stopped = await sandbox.computer_use.recording.stop(recording.id)
        print(f"\nRecording stopped: {stopped.file_name} ({stopped.status})")

        local_recording_path = Path(stopped.file_name).name
        await sandbox.computer_use.recording.download(recording.id, local_recording_path)
        print(f"Recording downloaded to: {local_recording_path}")
```

```text
Recording started: de5b8077-352e-41b0-b2da-165ede8cbca0

--- Final output ---
DONE

Recording stopped: de5b8077-352e-41b0-b2da-165ede8cbca0_form-fill_20260419_161419.mp4 (completed)
Recording downloaded to: de5b8077-352e-41b0-b2da-165ede8cbca0_form-fill_20260419_161419.mp4
```

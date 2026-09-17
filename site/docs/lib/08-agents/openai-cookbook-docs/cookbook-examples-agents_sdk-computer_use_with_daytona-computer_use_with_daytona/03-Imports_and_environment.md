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
pageSha256: "187fabc5cb82b73074b87c19ff6b12435ff6dde8556702e627a47e777643a4ea"
contentMode: "local-full"
zh: ""
---

## Imports and environment

We import from three places: the Agents SDK (`Agent`, `Runner`, `ComputerTool`, and the `AsyncComputer` / `Button` / `Environment` types we'll implement against), the Daytona SDK (`AsyncDaytona` plus `CreateSandboxFromSnapshotParams`), and the usual standard-library async/path helpers. `IPython.display.Video` is only needed at the very end, to play the recording inline.

```python
from __future__ import annotations

import asyncio
import logging
import os
from pathlib import Path
from typing import Any

from daytona import AsyncDaytona, CreateSandboxFromSnapshotParams

from agents import Agent, AsyncComputer, Button, ComputerTool, Environment, Runner, trace

from IPython.display import Video

# The Daytona and OpenAI keys live in the shell environment.
assert os.environ.get("DAYTONA_API_KEY"), "DAYTONA_API_KEY is not set."
assert os.environ.get("OPENAI_API_KEY"), "OPENAI_API_KEY is not set."

logger = logging.getLogger("computer_use_with_daytona")
```

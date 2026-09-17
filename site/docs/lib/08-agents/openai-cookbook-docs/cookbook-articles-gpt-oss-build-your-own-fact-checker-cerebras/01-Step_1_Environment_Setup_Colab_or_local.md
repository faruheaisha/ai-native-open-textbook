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
sourceRel: "cookbook/articles/gpt-oss/build-your-own-fact-checker-cerebras.md"
rawUrl: "/raw/08-agents/openai-cookbook-docs/cookbook/articles/gpt-oss/build-your-own-fact-checker-cerebras.md"
sourceSha256: "c23ee72ef44cd43583465f3b05986ec7af53affda1156cc299c50330f84b3efc"
pageSha256: "006b2ad9357a0e9b78664008fded2bb05d2a3140b56ea0bf013d972b3df89322"
contentMode: "local-full"
zh: ""
---

### **Step 1: Environment Setup (Colab or local)**

This guide supports both local Jupyter environments and Google Colab. Set the following environment variables:
- CEREBRAS_API_KEY
- PARALLEL_API_KEY

```python
python3 -m pip install -U cerebras_cloud_sdk parallel-web
```

```python
import os
from cerebras.cloud.sdk import Cerebras
from parallel import Parallel

# API keys: Colab userdata (if available) -> env vars fallback
try:
    from google.colab import userdata  # type: ignore
    CEREBRAS_API_KEY = userdata.get("CEREBRAS_API_KEY") or os.getenv("CEREBRAS_API_KEY")
    PARALLEL_API_KEY = userdata.get("PARALLEL_API_KEY") or os.getenv("PARALLEL_API_KEY")
except ImportError:
    CEREBRAS_API_KEY = os.getenv("CEREBRAS_API_KEY")
    PARALLEL_API_KEY = os.getenv("PARALLEL_API_KEY")

if not CEREBRAS_API_KEY or not PARALLEL_API_KEY:
    raise RuntimeError("Set CEREBRAS_API_KEY and PARALLEL_API_KEY as environment variables.")

cerebras_client = Cerebras(
    api_key=CEREBRAS_API_KEY,
    default_headers={
        "X-Cerebras-3rd-Party-Integration": "parallel-ai-workshop"
    }
)

parallel_client = Parallel(api_key=PARALLEL_API_KEY)

CEREBRAS_MODEL_NAME = "gpt-oss-120B"

print("Clients initialized, model:", CEREBRAS_MODEL_NAME)
```

```text
Clients initialized, model: gpt-oss-120b
```

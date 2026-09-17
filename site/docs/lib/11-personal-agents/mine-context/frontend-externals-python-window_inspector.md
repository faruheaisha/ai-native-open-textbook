---
title: "macOS Window Inspector"
sourceId: "11-personal-agents/mine-context"
sourceTitle: "MineContext（火山引擎个人上下文助手）"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "11-personal-agents"
sourceUrl: "https://github.com/volcengine/MineContext"
entryUrl: "https://github.com/volcengine/MineContext/blob/171c7a9ea8091e326ddcf0f10718aa1b58c83c65/frontend/externals/python/window_inspector/README.md"
sourceRel: "frontend/externals/python/window_inspector/README.md"
rawUrl: "/raw/11-personal-agents/mine-context/frontend/externals/python/window_inspector/README.md"
sourceSha256: "9abfaa6d7d72abcf61da88aa47eae51736c3bbf477bdc482c01a18def79ac5ae"
pageSha256: "9abfaa6d7d72abcf61da88aa47eae51736c3bbf477bdc482c01a18def79ac5ae"
contentMode: "local-full"
zh: ""
---

# macOS Window Inspector

## Steps

1. Install dependencies

```bash
python3 -m venv venv
source venv/bin/activate
pip3 install -r requirements.txt
pip3 install pyinstaller
pyinstaller --onedir --name window_inspector window_inspector.py (optional)
pyinstaller window_inspector.spec
```

2. Test run

```bash
./dist/window_inspector/window_inspector
```

3. Calling in Electron

   Add the following to `build.extraResources` in `package.json`:

```json
{
  "build": {
    "extraResources": [
      {
        "from": "python/window_inspector",
        "to": "bin/window_inspector"
      }
    ]
  }
}
```

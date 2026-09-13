---
title: "macOS Window Capture"
sourceId: "11-personal-agents/mine-context"
sourceTitle: "MineContext（火山引擎个人上下文助手）"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "11-personal-agents"
sourceUrl: "https://github.com/volcengine/MineContext"
entryUrl: "https://github.com/volcengine/MineContext/blob/171c7a9ea8091e326ddcf0f10718aa1b58c83c65/README.md"
zh: ""
---

# macOS Window Capture

## Steps

1. Install dependencies

```bash
python3 -m venv venv
source venv/bin/activate
pip3 install -r requirements.txt
pip3 install pyinstaller
pyinstaller --onedir --name window_capture window_capture.py (optional)
pyinstaller window_capture.spec
```

2. Test run

```bash
./dist/window_capture/window_capture
```

3. Calling in Electron

   Add the following to `build.extraResources` in `package.json`:

```json
{
  "build": {
    "extraResources": [
      {
        "from": "python/window_capture",
        "to": "bin/window_capture"
      }
    ]
  }
}
```

---
title: "@cozeloop/api-schema"
sourceId: "04-work/coze-loop"
sourceTitle: "Coze Loop 源码研读"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "04-work"
sourceUrl: "https://github.com/coze-dev/coze-loop"
entryUrl: "https://github.com/coze-dev/coze-loop/blob/5f1e4c234fc110c1bf674e882a6fd02109e1e1e6/frontend/packages/loop-base/api-schema/README.md"
sourceRel: "frontend/packages/loop-base/api-schema/README.md"
rawUrl: "/raw/04-work/coze-loop/frontend/packages/loop-base/api-schema/README.md"
sourceSha256: "4ff9021fdf0bb9cede95a09696e2051e29c2cee98ac4223796beb33d518486d7"
pageSha256: "4ff9021fdf0bb9cede95a09696e2051e29c2cee98ac4223796beb33d518486d7"
contentMode: "local-full"
zh: ""
---

# @cozeloop/api-schema

Coze Loop 的 API Schema 定义包。

## 安装

```json
{
  "dependencies": {
    "@cozeloop/api-schema": "workspace:*"
  }
}
```

```bash
rush update
```

## 更新 API Schema

当后端 API 发生变更时，运行以下命令更新：

```bash
rushx update
```

### 指定分支

默认从 `main` 分支拉取 IDL 定义。如需从其他分支更新，可以修改 [package.json](https://github.com/coze-dev/coze-loop/blob/5f1e4c234fc110c1bf674e882a6fd02109e1e1e6/frontend/packages/loop-base/api-schema/package.json) 中 `prethrift` 脚本的 `--branch` 参数：

```json
{
  "scripts": {
    "prethrift": "bash ./scripts/download-thrift.sh --branch=your-branch"
  }
}
```

然后执行 `rushx update` 即可从指定分支拉取最新的 API Schema。

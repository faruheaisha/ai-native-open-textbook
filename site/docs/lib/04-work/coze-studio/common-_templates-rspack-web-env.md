---
title: "环境变量"
sourceId: "04-work/coze-studio"
sourceTitle: "Coze Studio 源码研读"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "04-work"
sourceUrl: "https://github.com/coze-dev/coze-studio"
entryUrl: "https://github.com/coze-dev/coze-studio/blob/fefb05ff27be1da939612fbf9faf5db62583b8ae/common/_templates/rspack-web/env/README.md"
sourceRel: "common/_templates/rspack-web/env/README.md"
rawUrl: "/raw/04-work/coze-studio/common/_templates/rspack-web/env/README.md"
sourceSha256: "549f58e175cc54edbdfdc73c908f035e7b7cc0f730f34f4566734109f575783f"
pageSha256: "549f58e175cc54edbdfdc73c908f035e7b7cc0f730f34f4566734109f575783f"
contentMode: "local-full"
zh: ""
---

# 环境变量
## 配置
index.ts 文件中配置环境变量，可根据多环境（地区）的环境变量可分别设置相关变量。

# 注意事项
## dts 自动生成约定
- src/typings/env/index.d.ts 由脚本自动更新
- 类型来源：env/index.ts 文件中的 envs 变量，请确保新增的环境变量都作为 envs 的一组 key-value

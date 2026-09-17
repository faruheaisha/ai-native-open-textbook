---
title: "@coze-arch/bot-error 使用文档"
sourceId: "04-work/coze-studio"
sourceTitle: "Coze Studio 源码研读"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "04-work"
sourceUrl: "https://github.com/coze-dev/coze-studio"
entryUrl: "https://github.com/coze-dev/coze-studio/blob/fefb05ff27be1da939612fbf9faf5db62583b8ae/frontend/packages/arch/bot-error/README.md"
sourceRel: "frontend/packages/arch/bot-error/README.md"
rawUrl: "/raw/04-work/coze-studio/frontend/packages/arch/bot-error/README.md"
sourceSha256: "40be2cb6f3c7a9011e9547acc1d570176d46413191cf2da3336f8f7e63680e5c"
pageSha256: "40be2cb6f3c7a9011e9547acc1d570176d46413191cf2da3336f8f7e63680e5c"
contentMode: "local-full"
zh: ""
---

# @coze-arch/bot-error 使用文档
## 安装
```
cd ${path/to/project}
rush add  @coze-arch/bot-error
```
## 使用
提供了一些用于错误处理的工具。

### CustomError

CustomError 是一个自定义错误类，用来代替原生的Error，使用 throw new CustomerError抛出的错误会上报到slardar的自定义事件中，使用方可以根据需要进行监控处理，不会统计到jsError

```
import { CustomError } from '@coze-arch/bot-error';

throw new CustomError('parmasValidation', 'empty copy');

```

### isCustomError

isCustomError 是一个函数，它可以检查一个错误是否是 CustomError

```
import { isCustomError, CustomError } from '@coze-arch/bot-error';

const myError = new CustomError('parmasValidation', 'empty copy');

console.log(isCustomError(error)); // 输出：true
```

### useErrorCatch

useErrorCatch 是一个 React Hook，它可以帮助你在组件中捕获和处理错误。
1. 监听全局 unhandledrejection、error 事件，上报相关内容由业务侧自行补充
2. 对于已知错误，上报自定义事件进行监控

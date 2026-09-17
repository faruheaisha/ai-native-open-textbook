---
title: "@coze-devops/common-modules"
sourceId: "04-work/coze-studio"
sourceTitle: "Coze Studio 源码研读"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "04-work"
sourceUrl: "https://github.com/coze-dev/coze-studio"
entryUrl: "https://github.com/coze-dev/coze-studio/blob/fefb05ff27be1da939612fbf9faf5db62583b8ae/frontend/packages/devops/common-modules/README.md"
sourceRel: "frontend/packages/devops/common-modules/README.md"
rawUrl: "/raw/04-work/coze-studio/frontend/packages/devops/common-modules/README.md"
sourceSha256: "ce4354b80dc9bd58b2c635e13b8d40eee3e073286f09c32df2c524a49c48b395"
pageSha256: "ce4354b80dc9bd58b2c635e13b8d40eee3e073286f09c32df2c524a49c48b395"
contentMode: "local-full"
zh: ""
---

# @coze-devops/common-modules

> Project template for react component with storybook.

## 目录结构说明

``` bash
├── __tests__
├── .storybook
├── config
├── src
│   ├── assets  ## 公共静态资源
│   │   ├── react.svg
│   │   └── rspack.png
│   ├── components  ## 公共组件
│   ├── hooks  ## 公共组件
│   ├── index.tsx  ## 对外统一出口, 导出内容类型可以是：component, hook, util, typing
│   ├── modules  ## 模块集合：子目录按业务模块划分；另外，index.tsx中导出的资源都是来自于modules目录
│   │   └── query-trace
│   ├── services  ## 请求 api 封装
│   ├── styles  ## 公共样式
│   ├── typings  ## 公共类型
│   ├── typings.d.ts
│   └── utils  ## 公共工具库
├── stories  ## 文档
├── .eslintrc.js
├── .stylelintrc.js
├── OWNERS
├── package.json
├── README.md
├── tsconfig.build.json
├── tsconfig.json
└── vitest.config.ts
```

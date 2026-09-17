---
title: "@cozeloop/guard"
sourceId: "04-work/coze-loop"
sourceTitle: "Coze Loop 源码研读"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "04-work"
sourceUrl: "https://github.com/coze-dev/coze-loop"
entryUrl: "https://github.com/coze-dev/coze-loop/blob/5f1e4c234fc110c1bf674e882a6fd02109e1e1e6/frontend/packages/loop-base/guard/README.md"
sourceRel: "frontend/packages/loop-base/guard/README.md"
rawUrl: "/raw/04-work/coze-loop/frontend/packages/loop-base/guard/README.md"
sourceSha256: "d2fc504fb8091c5257b1b06aafc7fc98b1e6b42d6f3b7fc1add1450dbba1f23b"
pageSha256: "d2fc504fb8091c5257b1b06aafc7fc98b1e6b42d6f3b7fc1add1450dbba1f23b"
contentMode: "local-full"
zh: ""
---

# @cozeloop/guard

Cozeloop 权限守卫组件，用于管理和控制用户界面中的权限点。

## 安装

```bash
pnpm add @cozeloop/guard
```

## 特性

- 支持多种权限控制方式（隐藏、只读、拦截等）
- 提供上下文管理权限状态
- 支持路由级别的权限控制
- 可扩展的权限点定义

## 使用方法

### 基础使用

```tsx
import { Guard, GuardPoint } from '@cozeloop/guard';

function MyComponent() {
  return (
      <button onClick={() => console.log('创建提示词')}>
        创建提示词
      </button>
  );
}
```

### 路由权限控制

```tsx
import { GuardRoute, GuardPoint } from '@cozeloop/guard';

function ProtectedRoute() {
  return (
      <div>受保护的内容</div>
  );
}
```

### 权限上下文

```tsx
import { GuardProvider } from '@cozeloop/guard';

function App() {
  // 自定义权限策略
  const customStrategy = {
    // 实现 GuardStrategy 接口
  };

  return (
  );
}
```

## Features

- [x] eslint & ts
- [x] esm bundle
- [x] umd bundle
- [x] storybook

## Commands

- init: `rush update`
- dev: `npm run dev`
- build: `npm run build`

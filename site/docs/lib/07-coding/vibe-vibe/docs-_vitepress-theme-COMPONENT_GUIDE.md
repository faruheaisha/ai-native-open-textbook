---
title: "组件开发工具"
sourceId: "07-coding/vibe-vibe"
sourceTitle: "Vibe Vibe —— 人人都能学会的 AI 编程（Vibe Coding）指南"
sourceKind: "课时教程"
licenseLabel: "限非商用"
lang: "中文"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/datawhalechina/vibe-vibe"
entryUrl: "https://github.com/datawhalechina/vibe-vibe/blob/f2e121d9b6c689c0e682921df60d73e279c5e316/docs/.vitepress/theme/COMPONENT_GUIDE.md"
sourceRel: "docs/.vitepress/theme/COMPONENT_GUIDE.md"
rawUrl: "/raw/07-coding/vibe-vibe/docs/.vitepress/theme/COMPONENT_GUIDE.md"
sourceSha256: "4a1659ee051c77958cd2ebc6067008509d21fbdd67c3792241703b0064074e62"
pageSha256: "4a1659ee051c77958cd2ebc6067008509d21fbdd67c3792241703b0064074e62"
contentMode: "local-full"
zh: ""
---

# 组件开发工具

本目录包含用于开发 Vue 组件的通用工具函数、类型定义和样式变量。

## 目录结构

```
docs/.vitepress/theme/
├── composables/
│   └── useAnimation.ts      # 动画工具 Composable
├── types/
│   └── components.ts        # 通用类型定义
└── styles/
    └── variables.css        # 样式变量和混入
```

## 使用指南

### 1. 动画工具 (useAnimation)

提供定时器管理和常用动画函数，自动清理定时器避免内存泄漏。

```vue

```

**可用函数：**

- `delay(ms)` - 延迟执行（自动管理定时器）
- `setTimeout(callback, ms)` - 创建受管理的 setTimeout
- `setInterval(callback, ms)` - 创建受管理的 setInterval
- `clearTimeout(id)` - 清除特定的 timeout
- `clearInterval(id)` - 清除特定的 interval
- `clearAll()` - 清除所有定时器
- `typeText(targetText, speed, onUpdate)` - 打字机效果
- `animatePacket(duration, onUpdate)` - 数据包移动动画
- `playSteps(steps, stepDelay, onStepChange)` - 步骤导航动画
- `fade(element, duration, fadeIn)` - 淡入淡出动画

### 2. 类型定义 (components.ts)

提供常用的组件类型定义。

```vue

```

**可用类型：**

- `Step` - 步骤定义
- `AnimationPhase` - 动画阶段
- `ComparisonItem` - 对比项
- `FlowNode` - 流程节点
- `FlowConnection` - 流程连接
- `HierarchyNode` - 层级节点
- `MatrixCell` - 矩阵单元格
- `CardItem` - 卡片项
- `TimelineEvent` - 时序事件
- `NetworkLayer` - 网络层级
- `TestScenario` - 测试场景
- `AuthMethod` - 认证方法
- `DeploymentMethod` - 部署方式
- `Priority` - 优先级
- `Status` - 状态

### 3. 样式变量 (variables.css)

提供统一的样式变量和工具类。

```vue

```

**可用变量：**

**颜色：**
- `--color-success` - 成功色 (#15a051)
- `--color-info` - 信息色 (#2eb3df)
- `--color-warning` - 警告色 (#D4952C)
- `--color-error` - 错误色 (#ff3b30)
- `--color-primary` - 主色 (#007aff)

**间距：**
- `--spacing-xs` - 4px
- `--spacing-sm` - 8px
- `--spacing-md` - 16px
- `--spacing-lg` - 24px
- `--spacing-xl` - 32px

**圆角：**
- `--radius-sm` - 4px
- `--radius-md` - 8px
- `--radius-lg` - 12px
- `--radius-xl` - 16px
- `--radius-full` - 9999px

**阴影：**
- `--shadow-sm` - 小阴影
- `--shadow-md` - 中阴影
- `--shadow-lg` - 大阴影
- `--shadow-xl` - 超大阴影

**工具类：**
- `.component-wrapper` - 组件容器
- `.component-header` - 组件头部
- `.component-title` - 组件标题
- `.component-body` - 组件主体
- `.btn` - 按钮基础样式
- `.btn-primary` - 主按钮样式
- `.card` - 卡片样式
- `.badge` - 徽章样式
- `.badge-success/info/warning/error` - 不同状态的徽章

**动画：**
- `@keyframes fadeIn` - 淡入动画
- `@keyframes slideIn` - 滑入动画
- `@keyframes pulse` - 脉冲动画
- `@keyframes spin` - 旋转动画

## 组件开发模板

```vue

<template>
  <div class="component-wrapper">
    <div class="component-header">
      <h3 class="component-title">组件标题</h3>
      <button class="btn btn-primary" @click="startAnimation" :disabled="isAnimating">
        {{ isAnimating ? '播放中...' : '播放' }}
      </button>
    </div>

    <div class="component-body">
      
    </div>
  </div>
</template>

```

## 最佳实践

1. **定时器管理**：始终使用 `useAnimation` 提供的定时器函数，确保组件卸载时自动清理
2. **类型安全**：使用 TypeScript 类型定义，提高代码可维护性
3. **样式一致性**：使用统一的样式变量，确保组件风格一致
4. **响应式设计**：所有组件都应支持移动端（640px 断点）
5. **深色模式**：使用 VitePress 主题变量，自动适配深色模式
6. **性能优化**：避免不必要的重渲染，使用 `computed` 缓存计算结果

## 注意事项

- 所有定时器都会在组件卸载时自动清理，无需手动调用 `onUnmounted`
- 样式变量会自动适配深色模式，无需额外处理
- 响应式断点统一使用 640px（移动端）
- 动画时长建议：快速 150ms，基础 200ms，慢速 300ms

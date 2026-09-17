---
title: "函数：functionName"
sourceId: "09-harness/claude-howto"
sourceTitle: "Claude How-To"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/luongnv89/claude-howto"
entryUrl: "https://github.com/luongnv89/claude-howto/blob/97bfb0685e03112ad39845889061d02cef6e534c/zh/07-plugins/documentation/templates/function-docs.md"
sourceRel: "zh/07-plugins/documentation/templates/function-docs.md"
rawUrl: "/raw/09-harness/claude-howto/zh/07-plugins/documentation/templates/function-docs.md"
sourceSha256: "0e4277f3bb0c02bd1c0deffde93364d1e2dabeb9f4f0e8f297a1ea20e10bfa99"
pageSha256: "0e4277f3bb0c02bd1c0deffde93364d1e2dabeb9f4f0e8f297a1ea20e10bfa99"
contentMode: "local-full"
zh: ""
---

# 函数：`functionName`

## 描述
简要说明这个函数的作用。

## 签名
```typescript
function functionName(param1: Type1, param2: Type2): ReturnType
```

## 参数

| 参数 | 类型 | 必填 | 描述 |
|------|------|------|------|
| param1 | Type1 | 是 | param1 的说明 |
| param2 | Type2 | 否 | param2 的说明 |

## 返回值
**类型**：`ReturnType`

返回内容的说明。

## 抛出异常
- `Error`：在输入无效时抛出
- `TypeError`：在传入错误类型时抛出

## 示例

### 基本用法
```typescript
const result = functionName('value1', 'value2');
console.log(result);
```

### 高级用法
```typescript
const result = functionName(
  complexParam1,
  { option: true }
);
```

## 备注
- 其他说明或警告
- 性能注意事项
- 最佳实践

## 另请参阅
- [相关函数](#)
- [API 文档](#)

---
title: "Function: functionName"
sourceId: "09-harness/claude-howto"
sourceTitle: "Claude How-To"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/luongnv89/claude-howto"
entryUrl: "https://github.com/luongnv89/claude-howto/blob/97bfb0685e03112ad39845889061d02cef6e534c/07-plugins/documentation/templates/function-docs.md"
sourceRel: "07-plugins/documentation/templates/function-docs.md"
rawUrl: "/raw/09-harness/claude-howto/07-plugins/documentation/templates/function-docs.md"
sourceSha256: "bac98ba4ab8942f1ec10dce4bcd661ebe03594ecfa5091d5400ca2c11d214b60"
pageSha256: "bac98ba4ab8942f1ec10dce4bcd661ebe03594ecfa5091d5400ca2c11d214b60"
contentMode: "local-full"
zh: ""
---

# Function: `functionName`

## Description
Brief description of what the function does.

## Signature
```typescript
function functionName(param1: Type1, param2: Type2): ReturnType
```

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| param1 | Type1 | Yes | Description of param1 |
| param2 | Type2 | No | Description of param2 |

## Returns
**Type**: `ReturnType`

Description of what is returned.

## Throws
- `Error`: When invalid input is provided
- `TypeError`: When wrong type is passed

## Examples

### Basic Usage
```typescript
const result = functionName('value1', 'value2');
console.log(result);
```

### Advanced Usage
```typescript
const result = functionName(
  complexParam1,
  { option: true }
);
```

## Notes
- Additional notes or warnings
- Performance considerations
- Best practices

## See Also
- [Related Function](#)
- [API Documentation](#)

---

**Last Updated**: August 4, 2026
**Claude Code Version**: 2.1.220
**Sources**:
- https://code.claude.com/docs/en/plugins
**Compatible Models**: Claude Fable 5, Claude Opus 5, Claude Sonnet 5, Claude Sonnet 4.6, Claude Opus 4.8, Claude Haiku 4.5

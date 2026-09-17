---
title: "API 文档生成 Skill"
sourceId: "09-harness/claude-howto"
sourceTitle: "Claude How-To"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/luongnv89/claude-howto"
entryUrl: "https://github.com/luongnv89/claude-howto/blob/97bfb0685e03112ad39845889061d02cef6e534c/zh/03-skills/doc-generator/SKILL.md"
sourceRel: "zh/03-skills/doc-generator/SKILL.md"
rawUrl: "/raw/09-harness/claude-howto/zh/03-skills/doc-generator/SKILL.md"
sourceSha256: "9821c665b86d1208d1b43007d238bbc8264bcc73e0cd1c9b05e85d52c6d01993"
pageSha256: "9821c665b86d1208d1b43007d238bbc8264bcc73e0cd1c9b05e85d52c6d01993"
contentMode: "local-full"
zh: ""
---

# API 文档生成 Skill

## 可生成内容

- OpenAPI / Swagger 规范
- API 端点文档
- SDK 使用示例
- 集成指南
- 错误码参考
- 认证指南

## 文档结构

### 每个端点的写法

````markdown
## GET /api/v1/users/:id

### 描述
简要说明这个端点做什么

### 参数

| 名称 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | string | 是 | 用户 ID |

### 响应

**200 成功**
```json
{
  "id": "usr_123",
  "name": "John Doe",
  "email": "john@example.com",
  "created_at": "2025-01-15T10:30:00Z"
}
```

**404 未找到**
```json
{
  "error": "USER_NOT_FOUND",
  "message": "User does not exist"
}
```

### 示例

**cURL**
```bash
curl -X GET "https://api.example.com/api/v1/users/usr_123" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**JavaScript**
```javascript
const user = await fetch('/api/v1/users/usr_123', {
  headers: { 'Authorization': 'Bearer token' }
}).then(r => r.json());
```

**Python**
```python
response = requests.get(
    'https://api.example.com/api/v1/users/usr_123',
    headers={'Authorization': 'Bearer token'}
)
user = response.json()
```
````

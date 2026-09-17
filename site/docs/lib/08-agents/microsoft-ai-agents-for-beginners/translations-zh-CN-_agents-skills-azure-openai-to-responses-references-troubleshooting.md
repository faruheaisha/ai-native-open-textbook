---
title: "故障排除、风险表及注意事项"
sourceId: "08-agents/microsoft-ai-agents-for-beginners"
sourceTitle: "AI Agents for Beginners（微软官方入门课）"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "08-agents"
sourceUrl: "https://github.com/microsoft/ai-agents-for-beginners"
entryUrl: "https://github.com/microsoft/ai-agents-for-beginners/blob/25b7985f3b2dc37a84f4a7387ccd3c9f0e5b1595/translations/zh-CN/.agents/skills/azure-openai-to-responses/references/troubleshooting.md"
sourceRel: "translations/zh-CN/.agents/skills/azure-openai-to-responses/references/troubleshooting.md"
rawUrl: "/raw/08-agents/microsoft-ai-agents-for-beginners/translations/zh-CN/.agents/skills/azure-openai-to-responses/references/troubleshooting.md"
sourceSha256: "1a527a4a755ad0eb6e79ae480a19b1759b57d4eb9e480561fb15e826e6b818c2"
pageSha256: "1a527a4a755ad0eb6e79ae480a19b1759b57d4eb9e480561fb15e826e6b818c2"
contentMode: "local-full"
zh: ""
---

# 故障排除、风险表及注意事项

## 400错误故障排除

| 错误 | 解决方法 |
|-------|-----|
| `missing_required_parameter: tools[0].name` | 工具定义使用了旧的聊天完成嵌套格式 | 将 <code v-pre>\{"type": "function", "function": \{"name": ...}}</code> 平铺为 `\{"type": "function", "name": ..., "parameters": ...\}` — name、description、parameters 放到顶层 |
| `unknown_parameter: input[N].tool_calls` | 多轮工具结果使用了旧的聊天完成格式 | 用 `response.output` 项和 `\{"type": "function_call_output", "call_id": ..., "output": ...\}` 替换 `\{"role": "assistant", "tool_calls": [...]\}` + `\{"role": "tool", ...\}` |
| `invalid_function_parameters: 'required' is required` | `strict: true` 的工具缺少 `required` 数组 | 当 `strict: true` 时，所有属性必须列在 `required` 中且必须设置 `additionalProperties: false` |
| `invalid_function_parameters: 'additionalProperties' is required` | `strict: true` 的工具缺少 `additionalProperties: false` | 在参数对象中添加 `"additionalProperties": false` |
| `invalid input[N].id: Expected an ID that begins with 'fc'` | 少样本 function_call ID 前缀错误 | function_call ID 必须以 `fc_` 开头（例如 `fc_example1`），而不是 `call_` |
| `missing_required_parameter: text.format.name` | 为格式字典添加 `"name"` 键（例如 `"name": "Output"`） |
| `invalid_type: text.format` | 确保 `text.format` 是包含 `type`、`name`、`strict`、`schema` 键的字典 — 而非字符串 |
| `invalid input content type` | 使用 `input_text`/`output_text` 内容类型代替聊天 `text` |
| `invalid input content type`（图片） | 图片内容仍使用 `"type": "image_url"` | 更改为 `"type": "input_image"` |
| `Expected object, got string` 在 `image_url` 上 | `image_url` 仍是嵌套对象 `\{"url": "..."\}` | 展平为纯字符串：`"image_url": "https://..."` 或 `"image_url": "data:image/...;base64,..."` |
| `integer below minimum value` 针对 `max_output_tokens` | Azure OpenAI 最小值为 **16**。测试中使用 50+，生产中使用 1000+。 |
| 流式传输时出现 `429 Too Many Requests` | 请求频率限制。将流式传输包裹在 `try/except`，向前端返回错误 JSON，实现重试/退避。 |
| 内容过滤错误时出现 `KeyError: 'innererror'` | 内容过滤错误体结构在 Responses API 中变更 | 聊天完成使用 `error.body["innererror"]["content_filter_result"]`；Responses API 使用 `error.body["content_filters"][0]["content_filter_results"]`（复数且在数组中）。重写所有 `innererror` 访问。 |

---

## 迁移风险表

| 症状 | 可能错误 | 解决方案 |
|---------|---------------|-----|
| 空的 `output_text` / 响应被截断 | 对推理模型 `max_output_tokens` 过低 | 设置 `max_output_tokens=1000` 或更高 — 推理令牌计入限制 |
| `400 invalid_type: text.format` | 传入了 `response_format` 字符串而非 `text.format` 字典 | 使用 <code v-pre>text=\{"format": \{"type": "json_schema", "name": "...", "strict": True, "schema": \{...}}\}</code> |
| `/openai/v1/responses` 返回 `404 Not Found` | 错误的 `base_url` — 缺少 `/openai/v1/` 后缀 | 确保 `base_url=f"\{endpoint\}/openai/v1/"`（包括尾部斜杠） |
| 切换到 `OpenAI()` 后出现 `401 Unauthorized` | `api_key` 未设置或令牌提供者传递不正确 | 对于 EntraID：`api_key=token_provider`（可调用）。对 API 密钥：`api_key=os.environ["AZURE_OPENAI_API_KEY"]` |
| 模型返回 `deployment not found` | `model` 参数与 Azure 部署名称不符 | 使用 `model=os.environ["AZURE_OPENAI_DEPLOYMENT"]` — 它是部署名称，不是模型名称 |
| `json.loads(resp.output_text)` 抛出 `JSONDecodeError` | 未强制执行 schema 或模型不支持严格 JSON | 确保 schema 中有 `"strict": True`，并确认模型支持结构化输出 |
| 流式传输无 `delta` 事件 | 检查了错误的事件类型 | 过滤条件应为 `event.type == "response.output_text.delta"`，而非聊天的 `chat.completion.chunk` |
| 迁移后图片输入出现 `400` 错误 | 图片内容类型未更新 | 将 `"type": "image_url"` 改为 `"type": "input_image"`，并将 `"image_url": \{"url": "..."\}` 展平为 `"image_url": "..."`（纯字符串） |
| 工具调用无限循环 | 后续 `input` 缺少工具结果 | 执行完工具后，在下一次请求的 `input` 中追加 `\{"type": "function_call_output", "call_id": ..., "output": ...\}` 项 |
| GPT-5 或 o 系列出现 `temperature` 错误 | 明确指定了非 1 的 `temperature` 值 | 移除 `temperature` 或设为 `1`，适用于 GPT-5 和 o 系列模型（o1、o3-mini、o3、o4-mini） |
| o 系列出现 `top_p` 错误 | 不支持 `top_p` | 针对 o 系列模型移除 `top_p` |
| 不识别 `max_completion_tokens` | 使用了 Azure 特有参数 | 用 `max_output_tokens` 替代。对 o 系列设置为 4096+（推理令牌计入限制）。 |
| o 系列输出为空或被截断 | `max_output_tokens` 过低 | o 系列内部使用推理令牌。设置 `max_output_tokens=4096` 或更高，避免 500–1000。 |
| `400 integer_below_min_value` 针对 `max_output_tokens` | 值低于 16 | Azure OpenAI 强制 `max_output_tokens >= 16`。烟雾测试用 50+，生产用 1000+。 |
| 流程中出现 `429 Too Many Requests` | 被 Azure OpenAI 限速 | 流被无声中断且不报错。始终将 `async for event in await coroutine:` 包裹在 `try/except` 中，向前端返回 `\{"error": str(e)\}`。 |

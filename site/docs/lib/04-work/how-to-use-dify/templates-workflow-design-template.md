---
title: "Workflow 设计模板"
sourceId: "04-work/how-to-use-dify"
sourceTitle: "Dify 中文系统教程（How-to-use-dify）"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "04-work"
sourceUrl: "https://github.com/hijasonxu1/How-to-use-dify"
entryUrl: "https://github.com/hijasonxu1/How-to-use-dify/blob/8d32c2067bfeab108a9646fe0371319f6c1d5134/templates/workflow-design-template.md"
sourceRel: "templates/workflow-design-template.md"
rawUrl: "/raw/04-work/how-to-use-dify/templates/workflow-design-template.md"
sourceSha256: "6799864988ddf811a2e0a0438ee41b91f3e6af31b72eca831b899ad1097919c8"
pageSha256: "6799864988ddf811a2e0a0438ee41b91f3e6af31b72eca831b899ad1097919c8"
contentMode: "local-full"
zh: ""
---

# Workflow 设计模板

## 1. 任务目标

这个工作流要解决什么问题？

```text
用户输入：{{输入}}
系统输出：{{输出}}
成功标准：{{怎样算完成}}
```

## 2. 输入变量

| 变量名 | 类型 | 必填 | 示例 | 说明 |
| --- | --- | --- | --- | --- |
| query | 文本 | 是 | 如何申请退款？ | 用户原始问题 |
| user_type | 选择 | 否 | 新用户 | 用于分支判断 |

## 3. 节点规划

| 步骤 | 节点 | 作用 | 输入 | 输出 |
| --- | --- | --- | --- | --- |
| 1 | Start | 收集输入 | 用户表单 | query |
| 2 | LLM | 判断意图 | query | intent |
| 3 | IF/ELSE | 分流 | intent | path |
| 4 | Knowledge Retrieval | 查资料 | query | context |
| 5 | LLM | 生成回答 | query + context | answer |
| 6 | Answer | 返回结果 | answer | 用户可见结果 |

## 4. 错误路径

| 风险 | 处理方式 |
| --- | --- |
| 用户输入为空 | 提示补充问题 |
| 知识库无结果 | 说明无法确认 |
| API 调用失败 | 返回稍后重试或人工处理 |
| 模型输出格式错误 | 增加强约束或增加格式化节点 |

## 5. 测试用例

| 输入 | 预期输出 | 是否通过 | 备注 |
| --- | --- | --- | --- |
| &#123;&#123;测试输入&#125;&#125; | &#123;&#123;预期结果&#125;&#125; | 待测试 |  |

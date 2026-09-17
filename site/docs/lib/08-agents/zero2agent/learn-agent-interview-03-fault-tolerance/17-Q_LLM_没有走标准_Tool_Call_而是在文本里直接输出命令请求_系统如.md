---
title: "Zero2Agent：从零实现 Agent"
sourceId: "08-agents/zero2agent"
sourceTitle: "Zero2Agent：从零实现 Agent"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中文"
tier: 2
volume: "08-agents"
sourceUrl: "https://github.com/ranxi2001/zero2Agent"
entryUrl: "https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/learn-agent-interview/03-fault-tolerance/index.md"
sourceRel: "learn-agent-interview/03-fault-tolerance/index.md"
rawUrl: "/raw/08-agents/zero2agent/learn-agent-interview/03-fault-tolerance/index.md"
sourceSha256: "ec931d48d76195508909df9d726fa4662052593581a0a4b80cae3e9b5dc97699"
pageSha256: "df1fc7330a98e6d518e7ac3bf4b1b3e6f8245fdb409b95698640d5b26c24b50a"
contentMode: "local-full"
zh: ""
---

## Q：LLM 没有走标准 Tool Call，而是在文本里直接输出命令请求，系统如何识别、执行并拦截风险？

> 来源：小红书 Agent 岗一面【[启云方AI Agent一面凉经](https://www.nowcoder.com/feed/main/detail/fea2d18bd59a421da7d16fe16223d38c)追问：模型是不是返回一段普通文本，然后从文本里通过正则等方式解析出工具调用？】

**新手答**：“从文本里用正则提取命令，然后执行前检查一下。”

**高手答**：

安全设计的第一原则是：**模型输出永远只是数据，只有受控执行器拥有执行权**。标准 Tool Call 由 SDK 在流式事件或响应对象中暴露 `tool_use/tool_calls`，编排器校验 schema 后交给工具执行器；普通文本没有执行语义，默认只能展示，不能因为出现 `rm`、`curl` 或代码块就自动执行。

如果产品确实兼容 ReAct 文本协议或旧模型的命令格式，应先由协议解析器把文本转换为统一的内部 `ActionRequest`，而不是直接交给 shell：

```text
模型输出 → 响应解析器 → ActionRequest → 策略引擎 → 参数校验
        → 人工确认/拒绝/沙箱执行 → 结果标准化 → 回传模型
```

拦截点必须位于**所有执行入口汇合后的策略网关**，覆盖原生 Tool Call、文本兼容协议、API、定时任务和子 Agent。规则引擎综合命令类别、参数、工作目录、身份权限、资源范围和副作用等级，执行白名单、危险模式检测、路径规范化、网络策略及审批规则。高风险命令拒绝或要求确认；放行后仍在最小权限沙箱中执行并记录审计日志。

不要把正则当安全边界：别名、变量展开、管道、重定向、命令替换和编码都可能绕过字符串匹配。应优先使用结构化参数和 AST/argv 级检查，并以操作系统权限、容器和网络隔离兜底。

**差距在哪**：面试官考的不是某个接口名，而是系统是否存在绕过标准工具协议的“第二执行通道”，以及安全策略能否在真正产生副作用之前覆盖所有通道。

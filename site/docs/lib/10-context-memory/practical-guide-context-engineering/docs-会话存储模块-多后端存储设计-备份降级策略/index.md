---
title: "多后端存储设计-备份降级策略"
sourceId: "10-context-memory/practical-guide-context-engineering"
sourceTitle: "大模型应用开发 -上下文工程与运行空间实践指南"
sourceKind: "工程手册"
licenseLabel: "仅引用"
lang: "中文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/WakeUp-Jin/Practical-Guide-to-Context-Engineering"
entryUrl: "https://github.com/WakeUp-Jin/Practical-Guide-to-Context-Engineering/blob/ec349a470e2992adc1d98899a46cb085839c0676/docs/会话存储模块/多后端存储设计-备份降级策略.md"
sourceRel: "docs/会话存储模块/多后端存储设计-备份降级策略.md"
rawUrl: "/raw/10-context-memory/practical-guide-context-engineering/docs/会话存储模块/多后端存储设计-备份降级策略.md"
sourceSha256: "6ad1cc392c20b5d31fea1447aab4339da3208d3f9adf08b74ddd52ee26f28b88"
pageSha256: "3d270f733a1467e94ae55119c3ec87c3789cdf48edc1220e898f209ff0a7fe0b"
contentMode: "local-full"
zh: ""
---

# 多后端存储设计-备份降级策略
使用多后端存储的设计，为大模型应用提供高可用性，容错性和持久性的对话历史存储，**通过结合快速主数据库、持久备份和预写日志（WAL）来确保大模型应用的聊天历史永不丢失 - 即使在后端数据库出现故障或网络中断的情况下也是如此**

## 本篇目录

- [一、为什么需要多后端](https://github.com/WakeUp-Jin/Practical-Guide-to-Context-Engineering/blob/ec349a470e2992adc1d98899a46cb085839c0676/docs/会话存储模块/01-一_为什么需要多后端.md)
- [二、架构设计](https://github.com/WakeUp-Jin/Practical-Guide-to-Context-Engineering/blob/ec349a470e2992adc1d98899a46cb085839c0676/docs/会话存储模块/02-二_架构设计.md)
- [三、工作原理](https://github.com/WakeUp-Jin/Practical-Guide-to-Context-Engineering/blob/ec349a470e2992adc1d98899a46cb085839c0676/docs/会话存储模块/03-三_工作原理.md)
- [四、主备数据库同步](https://github.com/WakeUp-Jin/Practical-Guide-to-Context-Engineering/blob/ec349a470e2992adc1d98899a46cb085839c0676/docs/会话存储模块/04-四_主备数据库同步.md)
- [五、代码层实现细节](https://github.com/WakeUp-Jin/Practical-Guide-to-Context-Engineering/blob/ec349a470e2992adc1d98899a46cb085839c0676/docs/会话存储模块/05-五_代码层实现细节.md)
- [六、最佳实践](https://github.com/WakeUp-Jin/Practical-Guide-to-Context-Engineering/blob/ec349a470e2992adc1d98899a46cb085839c0676/docs/会话存储模块/06-六_最佳实践.md)

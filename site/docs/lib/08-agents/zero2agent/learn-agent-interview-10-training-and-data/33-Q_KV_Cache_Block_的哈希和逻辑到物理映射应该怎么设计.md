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
entryUrl: "https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/learn-agent-interview/10-training-and-data/index.md"
sourceRel: "learn-agent-interview/10-training-and-data/index.md"
rawUrl: "/raw/08-agents/zero2agent/learn-agent-interview/10-training-and-data/index.md"
sourceSha256: "60b85a3adcd582f7bde8a1650b86f319915c75ffe2c989d6ec17686177cb35ee"
pageSha256: "93f48487374a5719c8a849c1cef19282f71a04f9b0204e5653a76c8274b6add8"
contentMode: "local-full"
zh: ""
---

## Q：KV Cache Block 的哈希和逻辑到物理映射应该怎么设计？

> 来源：智象未来 AI Infra 一面（2026-08-20）

**新手答**：“对 Token 前缀做 Hash，命中后复用对应 KV Cache。”

**高手答**：

哈希键不能只有 Token 内容，还应包含模型与权重版本、Tokenizer、位置编码配置、adapter/LoRA、模态输入摘要及影响 KV 的前缀配置。通常按固定 Token Block 递归计算前缀哈希，逻辑块表记录序列的第几个块，物理块由全局分配器管理引用计数、空闲表和设备位置；请求命中最长共享前缀后，只为剩余 Token 分配新块。

写时采用 copy-on-write，避免共享块被后续生成修改。释放、换出和抢占必须更新引用计数与块表；哈希碰撞需要二次校验。模型或 Prompt 配置变化时应使用命名空间版本自然失效，不能跨不兼容请求复用。监控命中率、碎片率、复制量、换入换出和错误共享校验。

**差距在哪**：新手只有哈希表，高手说明了缓存正确性所依赖的版本键、块表、引用计数和写时复制。

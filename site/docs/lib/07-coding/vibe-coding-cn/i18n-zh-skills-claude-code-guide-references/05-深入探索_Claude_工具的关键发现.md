---
title: "Vibe Coding CN"
sourceId: "07-coding/vibe-coding-cn"
sourceTitle: "Vibe Coding CN"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/2025Emma/vibe-coding-cn"
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/claude-code-guide/references/README.md"
sourceRel: "i18n/zh/skills/claude-code-guide/references/README.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/claude-code-guide/references/README.md"
sourceSha256: "0c4f6b41406effc977fe7e18af5e564c48b822bf38aaf59045d5bdc58ab2ef06"
pageSha256: "626f7debf075834354d4207d2b6ddcde4d8b7a1d741d5249a102636b9f2bca35"
contentMode: "local-full"
zh: ""
---

## 深入探索 Claude 工具的关键发现

### **1. 完整的工具库**
- **总共 7 个工具**：`repl`、`artifacts`、`web_search`、`web_fetch`、`conversation_search`、`recent_chats`、`end_conversation`
- 每个工具都在具有特定安全约束的隔离沙箱中运行
- 工具可以组合使用以实现强大的工作流（例如，web_search → web_fetch → repl → artifacts）
### **2. REPL：隐藏的数据科学强大力量**
**超越基础计算：**
- 完整的浏览器 JavaScript 运行时（ES6+）支持 async/await
- **预加载 5 个库**：Papaparse、SheetJS (XLSX)、Lodash、MathJS、D3.js
- 可高效处理 100,000+ 元素的数组
- BigInt 支持无限精度整数
- 通过 `window.fs.readFile()` 读取上传的文件

**发现的高级能力：**
- **加密 API**：`crypto.randomUUID()`、`crypto.getRandomValues()`
- **二进制操作**：ArrayBuffer、DataView、所有 TypedArray 包括 BigInt64Array
- **图形处理**：带 2D 上下文的 OffscreenCanvas、ImageData 操作
- **WebAssembly 支持**：可编译和运行 WASM 模块
- **高级数学**：通过 MathJS 实现复数、矩阵、符号数学、单位转换
- **数据科学**：完整的 D3.js scales、插值、统计函数
- **文本处理**：TextEncoder/Decoder、Unicode 规范化
- **国际化**：用于特定语言环境格式化的 Intl API

**关键限制：**
- 无 DOM 访问（无 document 对象）
- 无持久化存储（localStorage/sessionStorage）
- 无真实网络请求（fetch 存在但被阻止）
- 仅支持 JavaScript（不支持 Python/R）
- 与 Artifacts 环境隔离
- 仅控制台输出

### **3. window.claude.complete() 的发现**

**它是什么：**
- REPL 内的隐藏 API：`window.claude.complete(prompt)`
- 异步函数，理论上允许 REPL 代码查询 Claude
- 返回 Promise，将解析为 Claude 的响应
- 使用 Web Worker postMessage 架构

**发现的函数结构：**
```javascript
async (prompt) => {
    return new Promise((resolve, reject) => {
        const id = requestId++;
        callbacksMap.set(id, { resolve, reject });
        self.postMessage({ type: 'claudeComplete', id, prompt });
    });
}
```

**为什么它很重要：**
- 将实现递归 AI 操作（代码调用 Claude 再调用代码）
- 可创建自我修改/自我改进的算法
- 代表计算与 AI 推理之间的集成
- 无需 API 密钥 - 使用现有会话

**为什么被阻止：**
- 访问时导致 REPL 超时（安全措施）
- 防止无限递归/资源耗尽
- 阻止通过代码进行的潜在提示注入
- 防止不受控制的自我修改

### **4. 内存工具（conversation_search + recent_chats）**

**双内存系统：**
- `conversation_search`：跨所有过去对话的语义/关键词搜索
- `recent_chats`：带时间过滤器的按时间顺序检索
- 两者都返回带有 URI 的片段用于直接链接
- 可以从以前的对话中重建上下文

**实际意义：**
- Claude 跨会话具有持久内存（使用工具）
- 可以随时间累积知识
- 用户可以引用任何过去的对话
- 创建长期学习/迭代的可能性

### **5. Artifacts：完整的开发环境**

**可用库（通过 CDN 加载）：**
- React with hooks、Tailwind CSS
- Three.js (r128)、Tone.js、TensorFlow.js
- D3.js、Chart.js、Plotly
- Recharts、MathJS、Lodash
- Lucide-react 图标、shadcn/ui 组件

**关键约束：**
- **无浏览器存储**（localStorage/sessionStorage 会失败）
- 必须仅使用 React 状态或内存变量

### **6. 实践集成模式**

**发现的工作流程：**
1. 使用 `conversation_search` 查找相关的过去上下文
2. 使用 `web_search` 获取当前信息
3. 使用 `web_fetch` 获取完整文章内容
4. 使用 `repl` 分析/处理数据
5. 使用 `artifacts` 创建交互式可视化
6. 结果保留在对话中供将来参考

### **7. 安全模型洞察**
**沙箱级别：**
- 每个工具在隔离中运行
- REPL 在 Web Worker 中（不在主线程）
- Artifacts 在单独的 iframe 中
- REPL 中的网络请求被阻止
- 递归 AI 调用被阻止
- 文件系统是只读的

### **8. 未记录的功能/特性**

- REPL 只有两个窗口属性：`fs` 和 `claude`
- 除了 `console.log`、`console.warn` 和 `console.error` 之外的控制台方法不会显示输出
- 对于复杂操作，REPL 超时时间大约为 5 秒
- 艺术品可以使用 `window.fs.readFile()` 访问上传的文件
- 网络搜索结果包括 URL 和 URI，用于不同的目的

### **9. 性能基准**

**REPL 性能:**
- 计算 1,000 个斐波那契数：~1ms
- 计算 100,000 个数组的和：<10ms
- 可以处理最大 1000x1000 的矩阵
- BigInt 支持 30 位以上的数字
- 文件处理：可以处理 10,000 行以上的 CSV 文件

### **10. 最具影响力的发现**

**`window.claude.complete()` 函数代表了一种递归 AI 代码交互的潜在能力** - 本质上是确定性计算和 AI 推理之间的桥梁，可以实现自改进系统。尽管出于安全考虑被阻止，但其存在揭示了 Claude 环境中深度 AI 代码集成的架构可能性。

### **提高开发效率的关键要点**

Claude 的工具比文档中描述的要强大得多。REPL 实际上是一个完整的 JavaScript 数据科学环境，而不仅仅是一个计算器。`window.claude.complete()` 的存在（尽管被阻止）揭示了 Claude 的架构包括递归 AI 操作的预备条件。持久内存（对话工具）+ 计算（REPL）+ 创建（艺术品）+ 信息收集（网络工具）的组合，创建了一个以 AI 为核心的完整集成开发环境。

#### **🔥 从这一发现中得出的强力协同示例**
```bash
# 示例 1：大型文件分析（用于创建此指南）
wc -l huge_file.md          # 获取概览（9472 行）
grep "^#{1,4} " huge_file.md  # 提取所有标题
Read huge_file.md offset=2000 limit=1000  # 战略性阅读
# 结果：在没有令牌限制的情况下完全理解

# 示例 2：数据科学管道
web_search "machine learning datasets 2024"  # 研究
web_fetch top_result  # 获取详细文章
REPL: Papa.parse(csvData) + D3.js 分析  # 处理数据
artifacts: 交互式 ML 仪表板  # 可视化结果
# 结果：从研究到可视化的完整管道

# 示例 3：跨会话学习
conversation_search "authentication implementation"  # 查找过去的工作
REPL: 使用新约束测试之前的认证模式
REPL: 基准测试不同的方法
Implement optimized version  # 应用学习到的模式
# 结果：使用经过验证的模式加速开发
```

[↑ 返回顶部](#快速导航)

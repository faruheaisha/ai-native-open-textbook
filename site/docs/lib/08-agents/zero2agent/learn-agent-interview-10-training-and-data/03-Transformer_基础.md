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
pageSha256: "f6a26b6db66135d916fc9d6f4e106b4d0c2099e11478b6285c8fc3b721d99de7"
contentMode: "local-full"
zh: ""
---

## Transformer 基础

### Q：手撕 Multi-Head Attention

> 来源：腾讯 AI 应用开发【[0907 百度一面 （AI Infra）](https://www.nowcoder.com/feed/main/detail/91f5187146864de5878349a2ecf497ce)追问：你对 AI 算法或模型架构有一定了解吗？Transformer、Attention 如何计算？】

**新手答**：写了个 `softmax(QK^T)V` 但没处理 mask 和多头。

**高手答**：

```python
import torch
import torch.nn as nn
import math
import torch.nn.functional as F

def scaled_dot_product_attention(query, key, value, mask=None):
    """
    query/key/value: [batch, n_heads, seq_len, head_dim]
    mask: [batch, 1, 1, seq_len] or [batch, 1, seq_len, seq_len]
    """
    d_k = query.size(-1)
    scores = torch.matmul(query, key.transpose(-2, -1)) / math.sqrt(d_k)
    if mask is not None:
        scores = scores.masked_fill(mask == 0, float('-inf'))
    attention_weights = F.softmax(scores, dim=-1)
    output = torch.matmul(attention_weights, value)
    return output, attention_weights

class MultiHeadAttention(nn.Module):
    def __init__(self, d_model, n_heads):
        super().__init__()
        assert d_model % n_heads == 0
        self.d_model = d_model
        self.n_heads = n_heads
        self.head_dim = d_model // n_heads
        self.W_q = nn.Linear(d_model, d_model)
        self.W_k = nn.Linear(d_model, d_model)
        self.W_v = nn.Linear(d_model, d_model)
        self.W_o = nn.Linear(d_model, d_model)

    def forward(self, query, key, value, mask=None):
        batch_size = query.size(0)
        # 线性投影
        Q = self.W_q(query)
        K = self.W_k(key)
        V = self.W_v(value)
        # 拆多头: [batch, seq, d_model] -> [batch, n_heads, seq, head_dim]
        Q = Q.view(batch_size, -1, self.n_heads, self.head_dim).transpose(1, 2)
        K = K.view(batch_size, -1, self.n_heads, self.head_dim).transpose(1, 2)
        V = V.view(batch_size, -1, self.n_heads, self.head_dim).transpose(1, 2)
        # Attention
        output, attn_weights = scaled_dot_product_attention(Q, K, V, mask)
        # 合并多头: [batch, n_heads, seq, head_dim] -> [batch, seq, d_model]
        output = output.transpose(1, 2).contiguous().view(batch_size, -1, self.d_model)
        return self.W_o(output), attn_weights
```

**面试官可能追问的细节**：

1. **为什么除以 √d_k**：d_k 越大，QK^T 点积的方差越大，softmax 输出越接近 one-hot，梯度消失。除以 √d_k 做缩放保持梯度健康
2. **多头的意义**：不同头在不同子空间学不同的 attention pattern（语法关系、语义关系、位置关系）
3. **mask 的两种用途**：padding mask（忽略填充位置）和 causal mask（自回归时防止看到未来 token）
4. **contiguous() 的作用**：transpose 后内存不连续，view 前需要 contiguous 保证内存布局正确

**差距在哪**：新手只写了核心公式。高手写出完整的多头实现（含 mask、拆头、合并、输出投影），且能解释每一步的设计动机。手撕 Attention 是 AI 岗基本功。

---

### Q：位置编码的作用是什么？

> 来源：腾讯 AI 应用开发 【字节二面同题：QKV 机制 + 为什么引入位置编码和多头注意力】

**新手答**：“告诉模型 token 的位置。”

**高手答**：

Transformer 的 Self-Attention 本质上是**置换不变的（permutation invariant）**——把输入 token 打乱顺序，Attention 的计算结果完全一样。这意味着没有位置编码的 Transformer 无法区分“我喜欢你”和“你喜欢我”。

位置编码的作用是**把序列顺序信息注入到模型中**，让每个 token 不仅知道“我是什么”，还知道“我在哪”。

为什么 Attention 是置换不变的：Attention 计算 `softmax(QK^T/√d)V`，Q、K、V 都是 token embedding 的线性变换。点积只关心向量本身的值，不关心向量在序列中的位置。

注入方式有两种：
1. **加法注入**：把位置向量加到 token embedding 上（GPT、BERT 的做法）
2. **注意力偏置**：不改 embedding，在 Attention score 上加一个位置相关的偏置项（ALiBi 的做法）

**差距在哪**：新手只说了“告诉位置”四个字。高手从 Attention 的置换不变性出发，解释了为什么需要位置编码、怎么注入。面试官考的是你理不理解这个设计的动机。

---

### Q：绝对位置编码和相对位置编码的区别？应用场景有什么不同？

> 来源：腾讯 AI 应用开发

**新手答**：“绝对编码给每个位置一个固定向量，相对编码看距离。”

**高手答**：

| 维度 | 绝对位置编码 | 相对位置编码 |
|------|-----------|-----------|
| 编码内容 | 每个位置的绝对索引（第 1 个、第 2 个…） | 两个 token 之间的相对距离 |
| 长度泛化 | 差，超过训练长度性能急剧下降 | 好，天然支持外推到更长序列 |
| 代表方法 | Sinusoidal（原始 Transformer）、Learned（BERT/GPT） | RoPE（LLaMA）、ALiBi（BLOOM） |

**绝对位置编码**：
- **Sinusoidal**：用不同频率的正弦/余弦函数生成位置向量，不需要学习。理论上可推广到任意长度，但实际效果在超出训练长度后衰减明显
- **Learned**：每个位置训练一个可学习的 embedding（BERT 512、GPT-2 1024）。效果好但长度固定

**相对位置编码**：
- **RoPE（Rotary Position Embedding）**：通过旋转矩阵把位置信息编码到 Q、K 向量中，两个 token 做 Attention 时旋转角度的差值反映相对距离。LLaMA、Qwen、DeepSeek 系列都用 RoPE
- **ALiBi**：不修改 embedding，在 Attention score 上减去与距离成正比的惩罚项，天然支持长度外推

**场景选择**：短序列固定长度用绝对编码够用；LLM 长文本生成用 RoPE（当前主流）；极长序列且推理效率优先用 ALiBi。当前大模型几乎都用 RoPE，配合 NTK-aware scaling 或 YaRN 可进一步扩展上下文。

**差距在哪**：新手只说了区别没说应用。高手从原理到代表方法到场景选择做了完整对比。面试官考的是你能不能根据需求选择合适的位置编码方案。

---

### Q：常用解决过拟合的方法？

> 来源：腾讯 AI 应用开发

**新手答**：“Dropout 和正则化。”

**高手答**：

过拟合的本质是模型学到了训练集中的噪声模式。解决方法分三个层面：

**数据层面**：
1. **数据增强**：NLP 中用同义词替换、回译、随机删除；CV 中用翻转、裁剪、颜色抖动
2. **增加数据量**：最直接有效——数据量够大，模型没机会记住噪声

**训练层面**：
3. **Early Stopping**：监控验证集 loss，连续 N 个 epoch 不下降就停止。简单但有效，几乎是标配
4. **L1/L2 正则化**：loss 中加权重范数惩罚。L2（权重衰减）让权重趋小；L1 产生稀疏权重，起特征选择作用
5. **Dropout**：训练时随机丢弃一定比例神经元输出（0.1-0.5），迫使网络不依赖单一神经元。推理时关闭，权重乘以保留概率
6. **归一化**：BatchNorm / LayerNorm 本身有轻微正则化效果

**架构层面**：
7. **降低模型复杂度**：减少层数、隐藏维度、参数量
8. **交叉验证**：K-Fold 评估泛化能力，选择多个 fold 上表现稳定的超参数

实际工程中通常组合使用——Early Stopping + Dropout + 权重衰减是最常见的三件套。

**差距在哪**：新手只背了两个方法名。高手按数据/训练/架构三层分类，每种方法说清了原理。面试官考的是你对过拟合的理解是否系统。

---

### Q：LayerNorm 和 BatchNorm 的区别？应用场景？

> 来源：腾讯 AI 应用开发

**新手答**：“LayerNorm 用在 Transformer，BatchNorm 用在 CNN。”

**高手答**：

两者都是归一化技术，核心区别在于**归一化的维度不同**：

```text
输入张量形状：[batch_size, seq_len, hidden_dim]

BatchNorm：对同一个特征，在 batch 维度上归一化
LayerNorm：对同一个样本，在特征维度上归一化
```

**BatchNorm**：
- 训练时用 mini-batch 统计量，推理时用 running mean/variance
- 优点：加速收敛、允许更高学习率
- 局限：依赖 batch size（太小统计量不准）；对变长序列不友好（同一位置在不同样本中语义不同）

**LayerNorm**：
- 对每个样本独立归一化，不依赖 batch 内其他样本
- 训练和推理行为一致，batch size 为 1 也正常
- 几乎所有 Transformer 都用 LayerNorm

**为什么 Transformer 用 LayerNorm**：
1. NLP 输入是变长序列，不同样本同一位置语义完全不同——BatchNorm 在这个维度上求统计量没有意义
2. 推理时可能 batch size = 1，BatchNorm 的 running statistics 不可靠
3. LayerNorm 和序列长度、batch size 都无关

补充：RMSNorm（LLaMA 使用）去掉了均值中心化，只做方差归一化，计算更快。

**差距在哪**：新手死记了结论。高手从归一化维度的本质差异出发，推导出各自的适用场景。面试官考的是你能不能从原理推出应用。

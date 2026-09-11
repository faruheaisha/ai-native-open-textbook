---
source_id: SRC-AGENT-SKILLS-ECOSYSTEM
title: Agent Skills 生态（协议规范 + 三份清单 + 两份厂商官方目录）
publisher: 社区 / Microsoft / OpenAI
source_tier: T2–T1（厂商目录）
source_type: ecosystem_survey
canonical_url: https://github.com/VoltAgent/awesome-agent-skills
published_at: 2026 年内
retrieved_at: 2026-09-10
last_verified: 2026-09-10
version: 见表
status: accepted（清单）/ pending（厂商目录）
license: 见表
rights_status: mixed_see_table
language: 中英混合
---

# Source Record：Agent Skills 生态

## 结论

**"Skill" 已从提示词技巧升级为一个有协议、有目录、有分发方式的独立品类。** 卷 10 原有的"Skill = 提示词模板"定义必须作废重写。

## 一、协议层：SKILL.md 规范（来自 `libukai/awesome-agent-skills` README）

> ⚠️ 该仓库**无 LICENSE 文件**（README 内的 Apache-2.0 徽章不构成许可文本），按本项目纪律**只能 INDEX**。以下为对社区一致表述的**转述**，落地前须回到协议发布方（Anthropic Agent Skills 规范 / `agentskills` 相关官方仓库）核验原文。

- 一个 Skill = **一个目录**，根目录必须有 `SKILL.md`
- `SKILL.md` 的 YAML frontmatter：
  - 必填：`name`、`description`
  - 可选：`license`、`compatibility`、`metadata`、实验性 `allowed-tools`
  - `name` ≤ 64 字符，只允许小写字母、数字、连字符，且**必须与父目录同名**
- 可选子目录：`scripts/`（可执行脚本）、`references/`（参考资料）、`assets/`（模板/图片/查找表/Schema）
- 引用方式：在 `SKILL.md` 中以**相对 Skill 根目录**的路径引用，并声明"什么情况下 Agent 需要读取或执行"
- 使用分**三阶段**：发现（discovery）→ 加载（loading）→ 执行（execution）——即"渐进式加载"

**教学含义**：Skill 的关键设计点是**按需加载**（不是把所有内容塞进系统提示）。这一点与卷 10 的上下文工程主线（预算、压缩、分层加载）直接咬合。

## 二、清单层（可迁入）

| 本地目录 | 仓库 | Stars | 许可 | pinned commit | 形态 |
|---|---|---|---|---|---|
| `awesome-agent-skills-voltagent/` | `VoltAgent/awesome-agent-skills` | 34,033 | MIT | `8873794b` | 单文件 1000+ skills 索引 |
| `awesome-agent-skills-heilcheng/` | `heilcheng/awesome-agent-skills` | 6,191 | MIT | `de905685` | 教程 + 指南 + 目录 |

## 三、厂商官方目录（**尚未迁入，待核**）

| 仓库 | Stars | 定位 | 状态 |
|---|---|---|---|
| `openai/skills` | 26,843 | **OpenAI 官方** Codex Skills Catalog | 未核许可、未抓取 |
| `microsoft/skills` | 3,006 | **微软官方** Skills / MCP servers / Custom Agents / AGENTS.md | 未核许可、未抓取 |

> 这两个是本轮发现的**最高价值未处理项**。它们是"Skill 已成为平台一等公民"的直接证据：两大厂商各自维护官方 Skill 目录。

## 四、无许可但值得索引的中文来源

| 仓库 | Stars | 说明 |
|---|---|---|
| `libukai/awesome-agent-skills` | 5,080 | "Agent Skills 终极指南"，含最完整的 SKILL.md 规范说明 |
| `JackyST0/awesome-agent-skills` | 634 | 中文精选（Cursor / Claude Code / Copilot） |
| `itgoyo/awesome-agent-skills` | 191 | 中文收集 |

## 五、安全侧线索

`LLMSecurity/awesome-agent-skills-security`（96★）—— 目前已有的 **Agent Skills 安全**专项清单（攻击 / 防御）。**卷 12 应把"Skill 的安全边界"单列一节**：Skill 是可执行能力的载体，第三方 Skill 的引入等同于引入依赖。

## 权利与复用

- MIT 两份：可 Link / Quote / Adapt / Fork。
- 无许可来源：**只 INDEX**，不得迁入或改编。
- 厂商目录：待核，未核前不得引用其内容作为事实。

## 教材价值

- 映射卷册：**10（主）**；12（安全）；09（Skill 加载属 harness 机制）；07（编码 Agent 使用）。
- 映射 Concepts：Agent Skill、SKILL.md、Progressive Disclosure、Discovery/Loading/Execution、Capability Packaging、Skill Supply Chain Risk。
- 结构复用 S1：**高** —— 可直接形成"协议 → 分发 → 发现 → 加载 → 执行 → 安全"的六段式单元。
- 知识复用 S2：高（协议层需回官方核验后使用）。
- 案例/资产复用 S3：中。
- 建议处理：**CURATE（协议与分类）+ INDEX（清单内条目）**。

## 质量与风险

- Authority：协议层为社区一致表述，非官方原文；清单层为社区众包，条目质量参差。
- Freshness：2026 年内，前沿。
- **风险 1（供应链）**：Skill 可包含 `scripts/` 与 `allowed-tools`，引入第三方 Skill = 引入可执行代码。**本项目不得在未审计的情况下运行上游 Skill**。
- **风险 2（计数通胀）**："1000+ skills" 属众包计数，存在重复与失效链接，不能当事实。
- **风险 3（定义漂移）**：不同平台对 "Skill" 的实现有差异（目录式 vs 单文件式），教学须先声明以哪一版协议为准。

## 提取的 Claims

1. Agent Skill 的载体是"目录 + SKILL.md"，frontmatter 必含 `name` 与 `description`，`name` 必须与父目录同名且 ≤64 字符。来源：`libukai` README（转述，待核原文）。
2. Skill 的使用分发现 / 加载 / 执行三阶段，采用渐进式加载。来源：同上（转述）。
3. `VoltAgent/awesome-agent-skills` 收录 1000+ skills，来自官方开发团队与社区。来源：仓库 description。
4. OpenAI 与 Microsoft 各自维护官方 Skills 目录。来源：`gh search repos` 结果（`openai/skills` 26,843★；`microsoft/skills` 3,006★），**内容未核**。
5. 存在 Agent Skills 安全专项清单 `LLMSecurity/awesome-agent-skills-security`。来源：`gh search repos`。

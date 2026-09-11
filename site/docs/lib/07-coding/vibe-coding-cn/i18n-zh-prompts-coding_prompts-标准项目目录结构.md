---
title: "🧠 AI 文件与代码生成规范"
sourceId: "07-coding/vibe-coding-cn"
sourceTitle: "Vibe Coding CN"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/2025Emma/vibe-coding-cn"
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/README.md"
zh: ""
---

# 🧠 AI 文件与代码生成规范

## 一、目标

统一 AI 生成内容（文档、代码、测试文件等）的结构与路径，避免污染根目录或出现混乱命名。

---

## 二、项目结构约定

```
项目目录结构通用标准模型，用于任何中大型软件或科研工程项目

### 一、顶层目录结构

project/
├── .claude                # openspec vibe coding管理
├── openspec               # openspec vibe coding管理
├── README.md              # 项目说明、安装与使用指南
├── LICENSE                # 开源或商业许可
├── requirements.txt       # Python依赖（或 package.json / go.mod 等）
├── setup.py / pyproject.toml  # 可选：构建或安装配置
├── .gitignore             # Git 忽略规则
├── .env                   # 环境变量文件（敏感信息不入库）
├── src/                   # 核心源代码
├── tests/                 # 测试代码（单元、集成、端到端）
├── docs/                  # 文档、架构说明、设计规范
├── data/                  # 数据（原始、处理后、示例）
├── scripts/               # 脚本、工具、批处理任务
├── configs/               # 配置文件（YAML/JSON/TOML）
├── logs/                  # 运行日志输出
├── notebooks/             # Jupyter分析或实验文件
├── results/               # 结果输出（模型、报告、图表等）
├── docker/                # 容器化部署相关（Dockerfile、compose）
├── requirements.txt       # 依赖清单文件（没有就根据项目识别并且新建）
├── .日志                  # 存储重要信息的文件
├── CLAUDE.md              # claude code记忆文件
└── AGENTS.md              # ai记忆文件

### 二、`src/` 内部结构标准

src/
├── **init**.py
├── main.py                # 程序入口
├── core/                  # 核心逻辑（算法、模型、管线）
├── modules/               # 功能模块（API、服务、任务）
├── utils/                 # 通用工具函数
├── interfaces/            # 接口层（REST/gRPC/CLI）
├── config/                # 默认配置
├── data/                  # 数据访问层（DAO、repository）
└── pipelines/             # 流程或任务调度逻辑

### 三、`tests/` 结构

tests/
├── unit/                  # 单元测试
├── integration/           # 集成测试
├── e2e/                   # 端到端测试
└── fixtures/              # 测试数据与mock

### 四、版本化与环境管理

- `venv/` 或 `.venv/`：虚拟环境（不入库）
- `Makefile` 或 `tasks.py`：标准化任务执行（build/test/deploy）
- `.pre-commit-config.yaml`：代码质量钩子
- `.github/workflows/`：CI/CD流水线

### 五、数据与实验型项目（AI/ML方向补充）

experiments/
├── configs/               # 各实验配置
├── runs/                  # 每次运行的结果、日志
├── checkpoints/           # 模型权重
├── metrics/               # 性能指标记录
└── analysis/              # 结果分析脚本

这种结构满足：
- **逻辑分层清晰**
- **部署、测试、文档独立**
- **可扩展、可协作、可版本化**

可在后续阶段按具体语言或框架（Python/Node/Go/Java等）衍生出专属变体。
```

---

## 三、生成规则

| 文件类型         | 存放路径      | 命名规则                   | 备注           |
| ------------ | --------- | ---------------------- | ------------ |
| Python 源代码   | `/src`    | 模块名小写，下划线分隔            | 遵守 PEP8      |
| 测试代码         | `/tests`  | `test_模块名.py`          | 使用 pytest 格式 |
| 文档（Markdown） | `/docs`   | 使用模块名加说明，如 `模块名_说明.md` | UTF-8 编码     |
| 临时输出或压缩包     | `/output` | 自动生成时间戳后缀              | 可被自动清理       |

---

## 五、AI 生成约定

当 AI 生成文件或代码时，必须遵守以下规则：

* 不得在根目录创建文件；
* 所有新文件必须放入正确的分类文件夹；
* 文件名应具有可读性与语义性；
* 若未明确指定文件路径，请默认：

  * 代码 → `/src`
  * 测试 → `/tests`
  * 文档 → `/docs`
  * 临时内容 → `/output`

---

## 强调

> 请遵守以下项目结构：
>
> * 源代码放入 `/src`；
> * 测试代码放入 `/tests`；
> * 文档放入 `/docs`；
> * 不要在根目录创建任何文件；
>   并确保符合命名规范。

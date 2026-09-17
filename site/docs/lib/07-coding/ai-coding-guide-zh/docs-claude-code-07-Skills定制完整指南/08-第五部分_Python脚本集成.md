---
title: "Claude Code & OpenClaw & Codex & WorkBuddy 中文教程"
sourceId: "07-coding/ai-coding-guide-zh"
sourceTitle: "Claude Code & OpenClaw & Codex & WorkBuddy 中文教程"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中文"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/KimYx0207/AI-Coding-Guide-Zh"
entryUrl: "https://github.com/KimYx0207/AI-Coding-Guide-Zh/blob/7a7c21b8e7dc976e8ade33b79ee000a172e63daf/docs/claude-code/07-Skills定制完整指南.md"
sourceRel: "docs/claude-code/07-Skills定制完整指南.md"
rawUrl: "/raw/07-coding/ai-coding-guide-zh/docs/claude-code/07-Skills定制完整指南.md"
sourceSha256: "08d59f9361ab023a91b05efb9383116c7f71eb884c8755c7a83ecf46cba2ef7d"
pageSha256: "52fdfcaa6bb85e7c0549fa9b54fa408484c68e005b4b603be6f6c072fc31b409"
contentMode: "local-full"
zh: ""
---

## 第五部分：Python脚本集成

**本节目的**：学习如何将Python脚本集成到Skill中，扩展Claude Code的能力。

### 5.1 为什么需要脚本

**脚本能做什么Claude Code做不到的事？**

| 任务类型 | Claude Code原生 | 脚本增强 |
|----------|----------------|---------|
| 文本分析 | ❌ 只能模糊判断 | ✅ 精确的NLP分析 |
| 数据计算 | ⚠️ 可能出错 | ✅ 100%准确计算 |
| 文件批处理 | ⚠️ 效率低 | ✅ 高效批量处理 |
| API调用 | ⚠️ 格式不确定 | ✅ 标准化输出 |
| 复杂校验 | ❌ 难以保证一致 | ✅ 确定性校验 |

### 5.2 脚本模板

**标准Python脚本模板**：

```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
脚本名称 V版本号 - 简短描述

详细功能说明...

用法:
    python script.py <input> [options]

参数:
    input    必需，输入数据
    --json   可选，输出JSON格式

版本历史:
- V1.0.0 (2025-01-01): 初始版本
"""

import sys
import io
import json
from typing import Dict, Any, Optional
from dataclasses import dataclass, asdict

# ==================================================
# 数据类定义
# ==================================================

@dataclass
class ProcessResult:
    """处理结果数据类"""
    success: bool
    data: Dict[str, Any]
    message: str
    errors: list

# ==================================================
# 核心处理类
# ==================================================

class Processor:
    """处理器类"""

    def __init__(self, config: Optional[Dict] = None):
        """初始化处理器"""
        self.config = config or {}

    def process(self, input_data: str) -> ProcessResult:
        """
        处理输入数据

        Args:
            input_data: 输入数据

        Returns:
            ProcessResult: 处理结果
        """
        try:
            # 1. 验证输入
            if not input_data or not input_data.strip():
                return ProcessResult(
                    success=False,
                    data={},
                    message="输入数据为空",
                    errors=["输入不能为空"]
                )

            # 2. 核心处理逻辑
            result_data = self._core_process(input_data)

            # 3. 返回成功结果
            return ProcessResult(
                success=True,
                data=result_data,
                message="处理成功",
                errors=[]
            )

        except Exception as e:
            return ProcessResult(
                success=False,
                data={},
                message=f"处理失败: {str(e)}",
                errors=[str(e)]
            )

    def _core_process(self, data: str) -> Dict:
        """核心处理逻辑（子类可覆盖）"""
        # 在这里实现具体逻辑
        return {"processed": data}

    def generate_report(self, result: ProcessResult) -> str:
        """生成可读报告"""
        lines = [
            "=" * 60,
            "处理报告",
            "=" * 60,
            "",
            f"状态: {'成功' if result.success else '失败'}",
            f"消息: {result.message}",
            "",
        ]

        if result.data:
            lines.append("-" * 60)
            lines.append("处理结果:")
            for key, value in result.data.items():
                lines.append(f"  {key}: {value}")

        if result.errors:
            lines.append("")
            lines.append("错误信息:")
            for error in result.errors:
                lines.append(f"  - {error}")

        lines.extend(["", "=" * 60])
        return "\n".join(lines)

# ==================================================
# 命令行入口
# ==================================================

def main():
    """命令行入口函数"""
    # 设置UTF-8输出（Windows兼容）
    sys.stdout = io.TextIOWrapper(
        sys.stdout.buffer,
        encoding='utf-8'
    )

    # 参数验证
    if len(sys.argv) < 2:
        print("用法: python script.py <input> [--json]")
        print("")
        print("示例:")
        print("  python script.py '测试输入'")
        print("  python script.py '测试' --json")
        sys.exit(1)

    # 解析参数
    input_data = sys.argv[1]
    output_json = "--json" in sys.argv

    # 执行处理
    processor = Processor()
    result = processor.process(input_data)

    # 输出结果
    if output_json:
        print(json.dumps(asdict(result), ensure_ascii=False, indent=2))
    else:
        print(processor.generate_report(result))

    # 返回状态码
    sys.exit(0 if result.success else 1)

if __name__ == "__main__":
    main()
```

### 5.3 在Command中调用脚本

**调用方式**：

```markdown
# 在Command中调用脚本示例

### 步骤X：执行质量检测

**调用脚本**：
```bash
cd ".claude/skills/gongzhonghao-writer/scripts" && python quality_detector.py "文章内容" --json
```

**脚本参数说明**：
- 第一个参数：要检测的内容
- `--json`：输出JSON格式（便于解析）

**预期输出**：
````json
{
  "success": true,
  "data": {
    "ai_score": 15,
    "natural_score": 85,
    "passed": true
  },
  "message": "检测通过"
}
```
````

### 5.4 参数传递方式

| 方式 | 适用场景 | 示例 |
|------|---------|------|
| 命令行参数 | 简单参数 | `python script.py "topic"` |
| 标准输入 | 大量文本 | `echo "content" \| python script.py` |
| 文件传递 | 复杂数据 | `python script.py --input file.json` |
| 环境变量 | 配置信息 | `API_KEY=xxx python script.py` |

### 5.5 结果解析规范

**标准输出格式（JSON）**：

```json
{
  "success": true,
  "data": {
    "result_key": "result_value"
  },
  "message": "处理成功",
  "errors": []
}
```

**Claude Code解析模式**：

```markdown
当脚本执行完成后，解析输出：

1. **检查执行状态**
   - 返回码为0：执行成功
   - 返回码非0：执行失败，查看错误信息

2. **解析JSON输出**
   - 检查 `success` 字段
   - 提取 `data` 中的结果
   - 如有 `errors`，记录错误信息

3. **应用到后续步骤**
   - 使用解析结果继续工作流
```

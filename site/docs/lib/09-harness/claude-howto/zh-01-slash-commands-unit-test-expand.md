---
title: "扩充单元测试"
sourceId: "09-harness/claude-howto"
sourceTitle: "Claude How-To"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/luongnv89/claude-howto"
entryUrl: "https://github.com/luongnv89/claude-howto/blob/97bfb0685e03112ad39845889061d02cef6e534c/zh/01-slash-commands/unit-test-expand.md"
sourceRel: "zh/01-slash-commands/unit-test-expand.md"
rawUrl: "/raw/09-harness/claude-howto/zh/01-slash-commands/unit-test-expand.md"
sourceSha256: "1bed4f74c14e23525c9c922c4ca9e24aa72c809df28be3cef45d14ce56729a7d"
pageSha256: "1bed4f74c14e23525c9c922c4ca9e24aa72c809df28be3cef45d14ce56729a7d"
contentMode: "local-full"
zh: ""
---

# 扩充单元测试

根据项目的测试框架，扩充现有单元测试：

1. **分析覆盖率**：运行覆盖率报告，找出未测试分支、边界情况和低覆盖区域
2. **识别缺口**：审查代码中的逻辑分支、错误路径、边界条件、空值/空输入
3. **编写测试**，使用项目现有框架：
   - Jest/Vitest/Mocha（JavaScript/TypeScript）
   - pytest/unittest（Python）
   - Go testing/testify（Go）
   - Rust test framework（Rust）
4. **针对具体场景**：
   - 错误处理和异常
   - 边界值（最小/最大、空值、空输入）
   - 边缘情况和极端情况
   - 状态转换和副作用
5. **验证提升**：再次运行覆盖率，确认有可衡量的提升

只展示新增的测试代码块。遵循现有测试模式和命名约定。

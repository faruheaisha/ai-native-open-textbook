---
title: "BFCL评估报告"
sourceId: "08-agents/hello-agents"
sourceTitle: "Hello Agents（Datawhale 智能体教程）"
sourceKind: "课时教程"
licenseLabel: "限非商用"
lang: "中文"
tier: 2
volume: "08-agents"
sourceUrl: "https://github.com/datawhalechina/hello-agents"
entryUrl: "https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/code/chapter12/template_output/evaluation_reports/bfcl_report_20251011_010343.md"
sourceRel: "code/chapter12/template_output/evaluation_reports/bfcl_report_20251011_010343.md"
rawUrl: "/raw/08-agents/hello-agents/code/chapter12/template_output/evaluation_reports/bfcl_report_20251011_010343.md"
sourceSha256: "73dc176540457fc3e169797c1762f48d204b76c99d2513c427cb92d8b4390253"
pageSha256: "73dc176540457fc3e169797c1762f48d204b76c99d2513c427cb92d8b4390253"
contentMode: "local-full"
zh: ""
---

# BFCL评估报告

**生成时间**: 2025-10-11 01:03:43

## 📊 评估概览

- **智能体**: TestAgent
- **评估类别**: simple_python
- **总体准确率**: 100.00%
- **正确样本数**: 5/5

## 📈 详细指标

### 分类准确率

- **simple_python**: 100.00% (5/5)

## 📝 样本详情

| 样本ID | 问题 | 预测结果 | 正确答案 | 是否正确 |
|--------|------|----------|----------|----------|
| simple_python_0 | Find the area of a triangle with a base of 10 units and heig... | [\{'name': 'calculate_triangle_area', 'ar... | [\{'calculate_triangle_area': \{'base': [1... | ✅ |
| simple_python_1 | Calculate the factorial of 5 using math functions. | [\{'name': 'math.factorial', 'arguments':... | [\{'math.factorial': \{'number': [5]&#125;&#125;] | ✅ |
| simple_python_2 | Calculate the hypotenuse of a right triangle given the lengt... | [\{'name': 'math.hypot', 'arguments': \{'x... | [\{'math.hypot': \{'x': [4], 'y': [5], 'z'... | ✅ |
| simple_python_3 | Find the roots of a quadratic equation with coefficients a=1... | [\{'name': 'algebra.quadratic_roots', 'ar... | [\{'algebra.quadratic_roots': \{'a': [1], ... | ✅ |
| simple_python_4 | Solve a quadratic equation where a=2, b=6, and c=5 | [\{'name': 'solve_quadratic_equation', 'a... | [\{'solve_quadratic_equation': \{'a': [2],... | ✅ |

## 📊 准确率可视化

```
准确率: ██████████████████████████████████████████████████ 100.00%
```

## 💡 建议

- ✅ 表现优秀！智能体在工具调用方面表现出色。

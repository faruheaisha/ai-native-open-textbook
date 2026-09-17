---
title: "11.DeepSeek+飞书多维表格批量生成文案"
sourceId: "04-work/agent-guide-office"
sourceTitle: "Agent 办公实战指南（社区）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "中文"
tier: 2
volume: "04-work"
sourceUrl: "https://github.com/tangshiyegit/agent-guide"
entryUrl: "https://github.com/tangshiyegit/agent-guide/blob/ae8b2262e7a1e5bd0d466037c6ad9f6037b72c33/src/Coze指南/AI基础知识/11.DeepSeek+飞书多维表格批量生成文案.md"
sourceRel: "src/Coze指南/AI基础知识/11.DeepSeek+飞书多维表格批量生成文案.md"
rawUrl: "/raw/04-work/agent-guide-office/src/Coze指南/AI基础知识/11.DeepSeek+飞书多维表格批量生成文案.md"
sourceSha256: "2291abfbe7c9d96f5d7513a970d15a4582ff02f67f9e7cbaaf92c3bf03c2bbb4"
pageSha256: "2291abfbe7c9d96f5d7513a970d15a4582ff02f67f9e7cbaaf92c3bf03c2bbb4"
contentMode: "local-full"
zh: ""
---

# 11.DeepSeek+飞书多维表格批量生成文案

飞书已经引入了Deepseek，飞书×Deepseek的组合，绝对算得上批量化工作的提效神器。

那么，飞书结合Deepseek究竟有什么亮点呢？简单来说，就是让你批量处理工作更加高效。

以批量生成文案为例，只需短短几步，就能快速输出上百条文案，省时又省力。

下面，我就一步步教你如何用飞书和Deepseek快速批量生成文案，话不多说，直接上干货！

## 第一步：新建多维表格

首先打开飞书云文档，点击右上角的【新建】—【多维表格】—【新建多维表格】，创建一个新的多维表格。

![image.png](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122453Z-a8c1ad5a8f37a37f-7d18ff9d.jpg)

## 第二步：修改字段标题

在新建好的表格里，鼠标点击第一列的标题，右键选择【修改字段/列】，然后将字段标题改为“选题”，字段类型默认是文本，无需更改。

![image.png](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122448Z-c91672800a0d4312-88c5e2e0.jpg)

## 第三步：引入Deepseek

接下来点击第二列，我们将用这一列调用Deepseek批量生成文案。

同样是右键点击第二列标题，选择【修改字段】，标题修改为“生成文案”，然后在字段类型里点击下方的【探索字段捷径】—选择【Deepseek R1】。

如果列表中没有看到Deepseek R1，可以通过【字段捷径中心】搜索找到它。

![image.png](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122449Z-07614b8b84bf6f6c-f8d04f2e.jpg)

## 第四步：Deepseek的详细配置

选择Deepseek R1后，会出现一个详细配置界面：

**1、引用字段**

点击“引用字段”，选择“选题”这一列，告诉Deepseek需要批量处理这一列的内容。

![image.png](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122450Z-7e6673a1b491f9c3-4f670054.jpg)

**2、输入指令**

也就是给Deepseek的具体指令，这里我们填写下面的提示词

```markdown
你的任务是根据提供的选题：【选题】，结合下面的短视频文案方法论，按照指定的脚本模型创作原创文案。文案要自然、口语化，符合中国人的日常表达方式。

## 选题提炼与文案创作方法论：
1. 脚本模型选择：根据选题特点，选择最适合的脚本模型进行创作。
    - 示例：对于"如何提高自己的AI使用能力"这个选题，可以使用"脚本模型 4：罗列痛点+制造认同+给出答案+聚合推荐"。
2. 脚本模型 1：讲故事+唤起疑问+引导互动+给出答案：
    - 讲故事：分享与选题相关的个人经历或观察
    - 唤起疑问：激发观众的好奇心
    - 引导互动：鼓励点赞收藏
    - 给出答案：提供清晰的解决方案
    - 三段论：用三个理由或事实支撑答案
3. 脚本模型 2：输出结果+讲故事+确认承诺+给出答案+引导互动：
    - 输出结果：开门见山展示亮点
    - 讲故事：分享结果背后的经历
    - 确认承诺：保证视频的价值
    - 给出答案：分享关键步骤或方法
    - 引导互动：鼓励观众参与
4. 脚本模型 3：唤起选择+制造冲突+给出分析+说明原因+下结论：
    - 唤起选择：抛出思考题
    - 制造冲突：展示不同观点
    - 给出分析：权衡利弊
    - 说明原因：阐述立场
    - 下结论：引导观众选择
5. 脚本模型 4：罗列痛点+制造认同+给出答案+聚合推荐：
    - 罗列痛点：点出问题
    - 制造认同：分享共鸣经历
    - 给出答案：提供解决方案
    - 聚合推荐：推荐实用资源
6. 脚本模型 5：引起恐慌+给出论据+唤起需求+满足需求：
    - 引起恐慌：提示风险
    - 给出论据：展示数据证据
    - 唤起需求：强调解决必要性
    - 满足需求：提供应对策略
7. 口语化表达：使用自然、接地气的词语，让文案更贴近观众的日常用语习惯。

## 创作要求：
1. 选用合适的开头方法和脚本模型
2. 保持口语化、自然的表达
3. 适当加入个人经历和案例增加吸引力
4. 不使用"嘿""哈喽""大家好"等开场白
5. 用"第一/第一个、第二/第二个、第三/第三个"代替"首先、其次、最后"

直接输出完整文案即可，无需标注使用的公式和方法论。
```

![image.png](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122448Z-f61cc694ca37d8e2-2869224a.jpg)

**3、展示最终结果**

此外，还可以选择是否展示Deepseek的推理过程，或者只展示最终结果，以及是否自动更新内容。

![image.png](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122449Z-60167ad5dda11d82-a641cfea.jpg)

设置完毕后，点击确定保存配置，删除表格后面多余的默认字段，这样，一个批量总结工具就制作完成了！

## 第五步：快速测试

这时候，我们只需要在第一列随意输入几个选题，稍微等待片刻，Deepseek就会自动输出每个选题的短视频文案，非常方便。

![image.png](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122450Z-5c9cf1f6d99212ac-960469a5.jpg)

![image.png](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122452Z-6ca9b7d1e19bc836-aff393e6.jpg)

是不是很简单？通过这样的方式，我们就轻松实现了批量处理需求，大幅提高了工作效率。

## 小结

以上只是一个基础示例，事实上，飞书×Deepseek还有很多丰富有趣的用法等待我们去探索。

比如，结合飞书自带的豆包视觉理解模型，先自动识别并描述图片内容，然后再用Deepseek进一步处理这些内容，完成更多进阶的批量操作。

赶紧打开你的飞书，发挥创意，解锁更多强大的功能吧。

---
title: "扣子Coze实战：1分钟自动仿写公众号爆文，一键自动发布"
sourceId: "04-work/agent-guide-office"
sourceTitle: "Agent 办公实战指南（社区）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "中文"
tier: 2
volume: "04-work"
sourceUrl: "https://github.com/tangshiyegit/agent-guide"
entryUrl: "https://github.com/tangshiyegit/agent-guide/blob/ae8b2262e7a1e5bd0d466037c6ad9f6037b72c33/src/Coze指南/Coze实战案例/扣子Coze实战：1分钟自动仿写公众号爆文，一键自动发布.md"
sourceRel: "src/Coze指南/Coze实战案例/扣子Coze实战：1分钟自动仿写公众号爆文，一键自动发布.md"
rawUrl: "/raw/04-work/agent-guide-office/src/Coze指南/Coze实战案例/扣子Coze实战：1分钟自动仿写公众号爆文，一键自动发布.md"
sourceSha256: "3f0451f5e525703509246b4f3960581de71e5c8a29e9b0a3561384fea8e437c8"
pageSha256: "3f0451f5e525703509246b4f3960581de71e5c8a29e9b0a3561384fea8e437c8"
contentMode: "local-full"
zh: ""
---

# 扣子Coze实战：1分钟自动仿写公众号爆文，一键自动发布

大家好，我是汤师爷，专注AI智能体分享，致力于帮助100W人用智能体创富~

你有没有遇到过这样的情况：

- 看到一篇爆文，想改成自己的风格却不知从何下手？
- 每天为公众号内容发愁，想发又怕质量不高？
- 文章改写费时费力，排版更是让人头大？

我今天要分享的Coze智能体工作流，将彻底解决这些问题，轻松实现一键仿写+自动发布，让你1分钟搞定从文章改写到公众号发布的全流程！

这套工作流非常适合需要快速创作内容的自媒体人，它能显著提升你的内容生产效率。如下图所示，智能体不仅能生成高质量的公众号爆文，还能直接将文章同步到你的草稿箱。

![image.png](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122542Z-5e4f0e65182a018c-36cc03ac.jpg)

## 1.工作流整体流程

![image.png](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122547Z-f2ffa45c81736d10-cfb568fa.jpg)

1. 获取原文章内容：使用Coze插件从指定URL中提取完整的文章内容，包括标题、正文和图片等元素。
2. AI分析提取核心观点：AI大模型深入分析原文章的结构和内容，提取出关键观点、论据和写作风格特点。
3. 根据要求改写文章：基于用户输入的具体需求（如受众群体、写作风格、特定观点等），AI对文章进行创造性改写。
4. 生成爆款文案：AI大模型根据前面的分析结果，创作出吸引眼球的爆款文案。
5. 转换成公众号格式：将文本内容转换为公众号支持的HTML格式，添加适当的排版、字体和颜色样式，确保手机端阅读体验良好。
6. 上传封面图片：通过AI大模型生成精美图片，并上传至公众号素材库。一张优质封面图能显著提升文章的吸引力和传播效果。
7. 发布到公众号草稿箱：最后将完整排版的文章和封面图自动提交到公众号后台的草稿箱中，等待创作者最终确认和发布。

## 2.详细工作流节点

### 2.1 开始节点

开始节点需要4个输入变量：

- 输入：
    - url：原文章链接（可选）
    - prompt：改写要求（必填）
    - appid：公众号AppID（必填）
    - appsecret：公众号AppSecret（必填）

![image.png](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122548Z-9470d0b5bdc3de59-45da3a27.jpg)

### 2.2 如何获取公众号AppID和AppSecret？

1. 登录微信公众平台

2. 进入「设置与开发」-「基本配置」

3. 在「公众号开发信息」中找到AppID

4. 点击AppSecret后面的「查看」，扫码后即可获取

### 2.3 文章内容获取

通过【微信公众号API】插件的【extract_wx_article】工具，获取对标文章的内容。

- 输入：开始 - url

![image.png](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122620Z-a2fb7c36592c7693-00ad7d15.jpg)

### 2.4 观点提取

接下来，这里我们使用了一个大模型节点，专门用于分析文章的写作风格和提取核心观点。

![image.png](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122543Z-247b22d3caf6af3b-d0fcf00a.jpg)

大模型_观点提取节点配置：

- 输入：
    - title：extract_wx_article - title
    - content：extract_wx_article - content
- 系统提示词：根据用户提供文章内容，分析文章的风格和写作方式，提取文章核心观点，最终输出，文章风格、文章摘要、核心观点。
- 用户提示词：&#123;&#123;title&#125;&#125; &#123;&#123;content&#125;&#125;
- 输出变量：
    - style：写作风格
    - point：核心观点
    - abstract：文章摘要

![image.png](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122548Z-05976ff952c8efa3-bcb633cd.jpg)

### 2.5 改写文章内容

使用大模型节点，根据提取的观点和用户要求，重新创作文章。

![image.png](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122544Z-2810d33b3332c867-63f1595a.jpg)

- 输入：
    - style：大模型_观点提取 - style
    - point：大模型_观点提取 - point
    - abstract：大模型_观点提取 - abstract
    - prompt：开始 - prompt
- 系统提示词

```markdown
##角色：自媒体博主
作为自媒体作者擅长爆款文案写作，把握读者心里，根据用户给定的主题和题目按要求创作文章，创作一篇文章，文章不少于1200字。
##Style:
1.作者日常观点论述文章，注意文章开头技巧（开篇、调动读者情绪、激发引导读者思考），引发读者阅读兴趣。
2.开门见山，提出主题和观点，着重引发读者的情感共鸣，以情动人，让读者在阅读中产生强烈的情感体验;
3.语言风格：个人深度思考风格，简洁的日常表达方式
4.长短句组合，短句使语言简洁、明快，整句散句结合使语言错落有致，丰富文章的层次和可读性;
5.段落转折连接，避免使用：首先、其次、最后、总而言之、总之等逻辑连接词，不要使用“繁杂的世界，快节奏的世界，充满变化的世界里”等虚无的形容词。杜绝AI味道
##Step：
1.根据用户提供的标题和观点信息进行创作，文章不少于1200字
2.深度思考后，构思主题、大纲和内容
3.创作符合风格和要求的文章
4.完成文章后，自行审稿和修改润色
5.最后直接输出文章正文内容，不需要输出标题。

##内容格式：
1、使用Markdown语法风格，区分一级、二级、三级标题使用标签“#、##、###”。
2、文中核心句子使用HTML标签包裹
<span style="color: rgb(202,88,99); font-weight: bold;" >句子</span>
3、长短句组合，避免单个句子超过3行。

##注意事项:
1.【禁止使用和出现英文、单词】
2.文章须严格遵循1200字的字数要求,控制篇幅,做到详略得当,避免内容单薄。
3.杜绝任何抄袭、剽窃等侵权行为,文章内容须为原创,切勿照搬照抄他人作品。
4.严禁在文章中出现任何违反国家法律法规、社会公序良俗或影响平台形象的不当言论。
```

- 用户提示词：

```markdown
参考文章信息如下：
风格：<{{style}}>
观点：<{{point}}>
摘要：<{{abstract}}>
#额外写作要求
<{{prompt}}>
```

- 输出：
    - content：改写后的文章内容

这个节点的系统提示词设计得很巧妙，要求AI：

- 作为自媒体作者擅长爆款文案写作
- 开门见山，引发读者情感共鸣
- 使用长短句组合，避免AI味道
- 文章不少于1200字
- 使用Markdown语法，核心句子用HTML标签突出

### 2.6 生成爆款标题

![image.png](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122543Z-adb375226afe63f2-e063bfba.jpg)

使用大模型节点，**大模型_标题**节点专门负责生成吸引人的标题。

- 输入：
    - content：改写后的文章内容
- 系统提示词：

```markdown
# 角色
你是一位擅长创作爆款标题的助手，能够根据文章内容精准提炼出吸引人的标题
自媒体写作，标题决定点击率，内容决定转发率。
## 技能
### 技能 1: 生成爆款标题
1. 当用户提供文章信息时，仔细分析文章的主题、关键内容和亮点。
2. 情感词汇用于引起读者情绪波动，核心问题点明文章关键，反常识制造冲击
长度建议:20-40个字，不可有特殊字符
标题风格特征总结:
富有感染力
强调情感共鸣
突出问题观点
简洁有力
能调动读者情绪
3.直接返回标题
## 限制:
- 只根据文章信息生成标题，不进行其他无关创作。
- 直接返回标题，无需其他信息。
```

### 2.7 Markdown转公众号HTML

使用【**markdown 转微信公众号 html**】插件，将Markdown格式的文章转换成公众号支持的HTML格式。

- 输入：
    - markdown：改写后的文章内容
    - theme：配色主题
    - font：字体样式

![image.png](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122544Z-3c8e2c3242fda1f9-6a981be5.jpg)

### 2.8 生成图片

使用【图像生成】插件，生成文章封面图片

![image.png](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122542Z-881eb8ec6fd0ca26-b730122b.jpg)

### **2.9 获取公众号Access Token**

使用【微信公众号API】插件，【get_access_token】工具节点获取公众号API调用凭证。

![image.png](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122621Z-44d7c57b9f261a10-f99766be.jpg)

- 输入：
    - appid：开始节点的appid
    - appsecret：开始节点的appsecret

![image.png](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122622Z-4835003be3361ab3-40000568.jpg)

### 2.10 上传封面图片

使用【微信公众号API】插件，【add_material】工具节点负责上传文章封面图片到公众号素材库。

- 输入：
    - access_token：上一步获取的token
    - image_url：图片链接地址

![image.png](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122621Z-8d10fc7470caaf22-ae463688.jpg)

### 2.11 文章排版美化

**代码_排版**节点会给文章添加公众号头部样式，让文章更美观。

这个节点会在文章顶部添加"点击蓝字，关注我们"的提示，并插入封面图片。

- 输入：
    - contentHtml
    - imageUrl：add_material - url
    - contentHtml：md2html - data

contentHtml的代码：

```markdown
<section style="font-size: 16px;text-align: center;justify-content: center;display: flex;flex-flow: row;margin-top: 10px;margin-bottom: 10px;"class=""><section style="display: inline-block;vertical-align: middle;width: auto;align-self: center;flex: 0 0 auto;min-width: 5%;height: auto;box-sizing:border-box;"><section style="text-align: right;margin-top: 10px;margin-bottom: 10px;line-height: 0;"><section style="vertical-align: middle;display: inline-block;line-height: 0;width: 50px;height: auto;box-sizing:border-box;"><p style="margin-left: 0px; margin-right: 0px;"><img class="rich_pages wxw-img"data-imgfileid="100001574"data-s="300,640"src="https://mmbiz.qpic.cn/sz_mmbiz_png/MVPvEL7Qg0GVeTBgmu2jBFwpXRXOe4Kf7Hfj3INGtpUwRTibBHDicib4rtGLstNjJ5VgOa0qqnRDSOicZ2rLxicB2uQ/640?wx_fmt=png"data-type="png"style="vertical-align: middle;width: 100%;box-sizing:border-box;max-width:100% !important;"data-ratio="0.34869240348692404"data-w="803"/></p></section></section></section><section style="display: inline-block;vertical-align: middle;width: auto;align-self: center;flex: 0 0 auto;border-width: 0px;border-style: none;border-color: #3e3e3e;border-radius: 0px 5px 5px 0px;overflow: hidden;min-width: 5%;height: auto;padding: 5px 15px;box-shadow: #d3f3ed 0px 0px 0px;box-sizing:border-box;"class=""><section style="text-align: justify;color: #3e3e3e;"><p style="text-wrap: wrap; margin-left: 0px; margin-right: 0px;">点击蓝字，关注我们</p></section></section><section style="display: inline-block;vertical-align: top;width: auto;min-width: 5%;flex: 0 0 auto;height: auto;box-sizing:border-box;"><section style="text-align: left;margin-top: 10px;margin-bottom: 10px;line-height: 0;"><section style="vertical-align: middle;display: inline-block;line-height: 0;width: 50px;height: auto;box-sizing:border-box;"class=""><p style="margin-left: 0px; margin-right: 0px;"><img class="rich_pages wxw-img"data-s="300,640"data-type="png"style="vertical-align: middle;width: 100%;box-sizing:border-box;max-width:100% !important;"src="https://mmbiz.qpic.cn/sz_mmbiz_png/MVPvEL7Qg0GVeTBgmu2jBFwpXRXOe4Kf7Hfj3INGtpUwRTibBHDicib4rtGLstNjJ5VgOa0qqnRDSOicZ2rLxicB2uQ/640?wx_fmt=png"data-imgfileid="100001575"data-ratio="0.34869240348692404"data-w="803"/></p></section></section></section></section><section style="font-size: 16px;text-align: center;margin-top: 10px;margin-bottom: 10px;line-height: 0;"><section style="display: inline-block;"class=""><p style="margin-left: 0px; margin-right: 0px;"><img class="rich_pages wxw-img"  src="图片地址" data-type="jpg" style="vertical-align: baseline;box-sizing:border-box;" data-ratio="0.7320754716981132" /></p></section></section><section style="font-size: 16px;text-align: left;justify-content: flex-start;display: flex;flex-flow: row;margin-top: 10px;margin-bottom: 10px;"><section style="display: inline-block;width: auto;vertical-align: middle;align-self: center;flex: 100 100 0%;background-color: rgba(255, 255, 255, 0);height: auto;box-sizing:border-box;"class=""><section style="margin-bottom: 10px;"><section style="background-color: #edc0a9;height: 1px;"><br/></section></section></section></section><section class="_135editor"data-role="paragraph"></section>
```

Python代码：

```python
import json
async def main(args: Args) -> Output:
    params = args.params
    headerHtml = params['headerHtml']
    contentHtml = params['contentHtml']
    imageUrl = params['imageUrl']
    headerHtml = headerHtml.replace('图片地址',imageUrl)
    html = headerHtml+contentHtml

    ret: Output = {
        "html": html
    }
    return ret
```

- 输出：
    - html：文章终稿的html代码

### 2.12 发布到草稿箱

使用【微信公众号API】插件，【add_draft】工具节点将最终的文章发布到公众号草稿箱。

- 输入：
    - access_token：API凭证
    - content：排版后的HTML内容
    - thumb_media_id：封面图片ID
    - title：文章标题
    - need_open_comment：是否开启评论

![image.png](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122549Z-5d4ddc1cff85ba48-d417550b.jpg)

### 2.13 获取草稿预览链接

使用【微信公众号API】插件，【get_draft】工具节点获取草稿的预览链接，方便你查看效果。

![image.png](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122545Z-a616e046508ed52f-32d21f5e.jpg)

### 2.14 结束节点

最终输出草稿预览链接，整个流程完成！

![image.png](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122545Z-d3cef8aa0ac5d2b4-5f7259c4.jpg)

## 3.总结

通过这套工作流，你可以轻松实现：

- 快速提取文章核心观点
- 按自己的风格和需求改写文章
- 自动生成吸引眼球的爆款标题
- 一键发布到公众号草稿箱

整个过程完全自动化，显著提升内容创作效率，特别适合需要持续输出优质内容的自媒体创作者。

在AI时代，掌握这些智能工具就等于抢占了内容创作的快车道。学会运用AI智能体，让你的创作之路更轻松、更高效！

如果你觉得这篇文章有帮助，**别忘了点赞、关注、收藏哟，传统美德不能丢~**

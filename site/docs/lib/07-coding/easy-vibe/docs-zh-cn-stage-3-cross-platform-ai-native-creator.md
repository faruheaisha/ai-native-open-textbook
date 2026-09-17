---
title: "从开发一个网页，到真正的程序，再到 AI 原生创作者"
sourceId: "07-coding/easy-vibe"
sourceTitle: "Easy-Vibe（Datawhale：从零做出真实产品）"
sourceKind: "课时教程"
licenseLabel: "限非商用"
lang: "中英混排"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/datawhalechina/easy-vibe"
entryUrl: "https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/zh-cn/stage-3/cross-platform/ai-native-creator/index.md"
sourceRel: "docs/zh-cn/stage-3/cross-platform/ai-native-creator/index.md"
rawUrl: "/raw/07-coding/easy-vibe/docs/zh-cn/stage-3/cross-platform/ai-native-creator/index.md"
sourceSha256: "70f333a8ef663490ea71996c194590b6c59222782647f48086aa6025efbf4568"
pageSha256: "70f333a8ef663490ea71996c194590b6c59222782647f48086aa6025efbf4568"
contentMode: "local-full"
zh: ""
---

# 从开发一个网页，到真正的程序，再到 AI 原生创作者

## 章节导读

很多人的 Vibe Coding 从一句“帮我做个网页”开始。页面出现以后，下一步不是堆更多按钮，而是让它真正保存数据、服务用户，最后再让 AI 参与完成任务。

这一章只讲清楚这三次成长，以及每一步最值得补上的能力。

<div style="margin: 38px 0 28px;">
</div>

![从一个网页到完整程序，再到 AI 原生产品的成长路线](https://gh-proxy.com/https://raw.githubusercontent.com/datawhalechina/easy-vibe/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/zh-cn/stage-3/cross-platform/ai-native-creator/images/creator-journey.svg)

## 1. 第一站：先做出一个网页

网页是最好的起点。你描述想要的内容和样子，AI 帮你写出页面；几分钟后，想法就变成了可以打开、点击和分享的东西。

这一阶段最重要的不是用了什么框架，而是学会三件事：

- 把模糊想法说成清楚的页面结构；
- 通过反复修改，让页面真的符合自己的判断；
- 把本地页面部署成别人可以打开的链接。

一个个人主页、活动页、作品集或小工具，都可以是很好的第一个作品。

::: tip 网页什么时候算完成？
陌生人打开链接后知道它是做什么的，手机上也能正常使用，而且每个可见按钮都有真实作用。
:::

如果你还没有公开链接，可以从[现代 Web 落地页工程](https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/zh-cn/stage-2/assignments/modern-landing-page/README.md)开始。

## 2. 第二站：从页面变成真正的程序

漂亮页面可以展示想法，但真正的程序要帮助用户完成一件事。

比如，一个“冰箱大厨”网页只展示输入框和演示菜谱；完整程序则要让用户提交食材、获得结果、保存历史，关闭页面后再打开仍然能继续使用。

从网页走到程序，通常只需先补齐四件关键能力：

1. **真实数据**：内容可以保存、修改和删除，不是写死在页面里；
2. **后端服务**：账号、业务逻辑和密钥不暴露在浏览器中；
3. **失败处理**：断网、空输入和请求失败时，用户知道怎样继续；
4. **正式发布**：别人不连接你的电脑，也能稳定打开、安装或升级。

这里说的“程序”不一定是手机 App。网站、小程序、桌面软件和浏览器插件，只要能可靠完成真实任务，都是完整程序。

可以继续学习[数据库与 Supabase](https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/zh-cn/stage-2/backend/database-supabase/README.md)，再根据用户场景[选择应用平台](https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/zh-cn/stage-3/cross-platform/choose-platform/README.md)。

## 3. 第三站：成为 AI 原生创作者

给程序加一个聊天框，不等于 AI 原生。

传统程序等待用户一步步点击；AI 原生产品先理解用户想完成什么，再读取必要信息、使用工具，并在关键动作前请用户确认。

例如，普通会议工具让用户手动整理待办；AI 原生会议助手可以：

- 从会议内容中找出承诺和风险；
- 对不清楚的负责人或日期继续提问；
- 调用任务系统创建待办草稿；
- 在真正发送前交给用户确认。

AI 原生创作者要学会分工：

- **普通代码**负责确定的规则、数据和权限；
- **AI**负责理解、生成和处理不完全确定的信息；
- **人**负责目标、高风险决定和最终确认。

这比“让 AI 多写一点代码”更重要。你开始设计的，是人、程序和 AI 怎样一起完成任务。

## 4. 点击看看三次成长

下面的组件把同一个想法放在三个阶段里。点击卡片，看看每一步真正增加了什么。

```
```

## 5. 你现在应该做哪一步

### 还没有做出公开网页

先完成一个小页面，部署成链接，再请一个人打开。暂时不要加入登录、支付和复杂 Agent。

### 已经做了很多漂亮 Demo

选择其中一个，补上真实数据、后端和错误处理。目标是让别人不需要你在旁边，也能从开始用到结果。

### 已经能开发完整程序

不要在每个页面加入聊天框。选择一个过去必须由人理解和判断的步骤，让 AI 获得必要上下文和一个受控工具，并保留人的确认。

::: warning AI 自主性要慢慢增加
先让 AI 生成草稿，再让它调用只读工具；结果稳定后，才考虑写入、发送或发布。越接近真实世界的动作，越需要权限、确认和撤销能力。
:::

## 6. 只记住这三句话

<div class="creator-summary">
  <strong>网页让想法被看见。</strong>
  <strong>程序让用户完成事情。</strong>
  <strong>AI 原生产品让软件参与完成事情。</strong>
</div>

不要急着跳到最后一层。一个可靠的小程序，比一个无法验证结果的复杂 Agent 更有价值。

先把网页做出来，再把一条真实任务做完整；当程序的数据、权限和发布都站稳以后，再让 AI 逐步理解目标、调用工具并与人协作。走完这三步，你创造的就不再只是一张页面，而是一件真正能够工作的智能产品。

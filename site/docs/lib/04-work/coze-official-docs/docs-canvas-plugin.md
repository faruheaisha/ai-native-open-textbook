---
title: "扣子 Coze 官方文档"
sourceId: "04-work/coze-official-docs"
sourceTitle: "扣子 Coze 官方文档"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "中文"
tier: 3
volume: "04-work"
sourceUrl: ""
entryUrl: null
sourceRel: "docs/canvas-plugin.md"
rawUrl: "/raw/04-work/coze-official-docs/docs/canvas-plugin.md"
sourceSha256: "7fdf6288ad316ee9d36030d821b3cac323aa7d60955f9fffc64cc3ebdb04058c"
pageSha256: "7fdf6288ad316ee9d36030d821b3cac323aa7d60955f9fffc64cc3ebdb04058c"
contentMode: "local-full"
zh: ""
---

# 扣子 Coze 官方文档

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.coze.cn/llms.txt
> Use this file to discover all available pages before exploring further.

你可能会遇到这种情况：让 Agent 生成了几张海报、几段视频、一组网页原型，但内容都散在对话里。想对比版本、圈出要改的位置、继续让 Agent 按某张图延展，就要反复翻记录、重新描述，很容易说不清。

画布插件可以帮你解决这个问题。它会把图片、视频、音频、网页等内容放到一张可视化画布上。你可以在画布上任意拖拽、预览、评论，Agent 能够根据你选中的内容继续生成或修改。

## 能帮你做什么 \{#hPd1VqOlp\}

* **集中展示文件**：图片、视频、音频、网页等内容可以放在同一张画布里，方便一起查看，不用在对话记录里来回找。
* **对比多个版本**：把不同版本并排放在画布上，对比构图、色调、文案、节奏和整体效果。
* **标记修改位置**：在图片上圈出区域，在视频的指定时间点添加评论，或在网页中选中具体元素，让 Agent 更明确地理解要修改的位置。
* **整理素材关系**：通过移动、缩放、文本说明和连线，把参考图、生成结果、修改版本整理成清楚的创作路径。
* **管理不同任务**：为不同任务创建不同画布，比如海报、视频分镜、网页原型等。

:::tip 说明
* 画布中的内容会和项目文件关联。文件更新后，画布上的对应节点会同步刷新。
* 删除画布节点不会删除源文件。如果你想彻底删除文件，需要到项目文件中操作。
:::

## 开始使用画布 \{#hFyJ35f4Z\}

你可以把画布当成你和 Agent 的设计工作台。扣子 Agent 已内置画布插件，无需手动添加。使用时，直接在对话中输入 `@`，选择**画布插件**，然后输入你想生成的内容即可。

例如，你可以这样输入：

```Plain Text
@ 画布，请在「画布1」中，帮我制作一组未来城市主题的视觉方案，先生成关键参考图，再整理到画布中。
```

Agent 生成好图片后，右侧画布中会同步展示图片。你可以先浏览整体效果，比较不同方向的构图、色调和氛围，选出最接近目标的一张继续修改。

![Image=474x244](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/debea10cff9f417e97ae967c8910f532~tplv-goo7wpa0wc-topic.webp)

## 在画布上细化设计 \{#hrcE7gipm\}

Agent 生成图片、视频、网页、音频等内容后，如果还需要继续调整，关键是先明确要优化的对象。你可以选中并引用要调整的图片、视频、网页或音频，再告诉 Agent：要改哪里、改成什么，以及哪些部分需要保留。

### **图片** \{#hnusveBuL\}

在画布上，你可以对图片进行引用、擦除、局部重绘、改字、去背景或画质提升等处理。处理后的结果会作为新节点出现在画布中，方便继续对比和修改。

#### **生成图片：根据需求生成新图片** \{#hQaeYFCcy\}

你可以直接在画布中让 Agent 生成图片。描述需求时，建议说清图片的使用场景、主体、画面结构、风格要求，以及不希望出现的内容。

在画布中，单击+ > **图片**，输入生图提示词并提交。Agent 将直接在画布中生成图片。

你也可以在对话中，`@画布插件`，输入生图需求，Agent 会自动生成图片并添加到画布中。

::::cols
@col 50
添加图片节点

![Image=1082x1424](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/45d7315540384ea4987d2c93221d311e~tplv-goo7wpa0wc-topic.webp)

@col 50
生成产物

![Image=1678x1894](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/09481ab7ca9c47ec83643b5f209e93f1~tplv-goo7wpa0wc-topic.webp)
::::

#### **评论：手动标出图片里的具体位置** \{#hcqwkzsyo\}

如果要修改图片中的某些局部内容，可以直接在图片上添加评论，并写清修改说明。评论用于标出“改哪里”，文字说明用于补充“怎么改、保留什么”。

在画布底部单击**添加评论**，进入评论模式后，在目标图片上标出需要修改的位置。添加完成后，单击**发布给 Agent**。Agent 会根据你的评论重新生成图片。

::::cols
@col 50
添加评论

![Image=2986x1442](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/4d9a61eb169146289eac733e6a8de362~tplv-goo7wpa0wc-topic.webp)

@col 50
生成结果

![Image=1196x770](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/8d154f0a6dfe469ab179cf02273e1fcd~tplv-goo7wpa0wc-topic.webp)
::::

#### **局部重绘：保留整体，只替换局部内容** \{#hXaFOgCzU\}

当图片整体满意，但某个区域不对时使用局部重绘。比如天空颜色、人物服装、产品背景、局部道具、画面角落。

在画布中选中图片，单击工具栏中的**局部重绘**，手动标出需要重绘的区域，说明希望替换成什么，以及哪些内容不能动，单击**生成**。画布中会生成一个新的图片节点，用来展示新图片。

::::cols
@col 50
框选重绘区域

![Image=1242x1806](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/2c77c46a6dad4bf6b4e9936e5f75acc8~tplv-goo7wpa0wc-topic.webp)

@col 50
生成结果

![Image=1184x1562](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/f082d48732c74e5a90d9ac3d06b78dfc~tplv-goo7wpa0wc-topic.webp)
::::

#### **擦除：手动选择要去掉的画面元素** \{#hm1xg3hR8\}

如果你想去掉图片中的路人、杂物、旧文字、水印感元素或干扰背景，可以使用擦除。

在画布中选中图片，单击工具栏中的**擦除**，选中需要擦除的元素，单击**生成**。画布中会生成一个新的图片节点，用来展示擦除后的结果图。

::::cols
@col 50
框选擦除区域

![Image=1868x1220](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/aa61eb0d465e4ea5b5890f2881d3157b~tplv-goo7wpa0wc-topic.webp)

@col 50
生成结果

![Image=1838x1082](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/c1cef031af454e9baa3684d2b741ffa3~tplv-goo7wpa0wc-topic.webp)
::::

#### **改字：替换图片里的已有文字。** \{#hHnLZ0e3n\}

适合海报、封面、Banner 上的标题、日期、按钮文案。使用时先选中图片，再选择改字能力，写清原文字和新文字。重点不是重新设计整张图，而是让文字替换后仍然贴合原来的字体风格、位置和背景。

::::cols
@col 50
框选文字

![Image=1494x1154](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/7f285eb9d4be4dbe90371c4d3eebf216~tplv-goo7wpa0wc-topic.webp)

@col 50
生成结果

![Image=1338x790](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/9908abea55734f1b8c9ab277543d2922~tplv-goo7wpa0wc-topic.webp)
::::

#### **去背景：把主体抠出来用于后续合成** \{#hO6yocpYx\}

当你想把人物、商品或某个物体放到新的海报、封面里时，可以先去背景。

在画布中选中图片，单击工具栏中的**去背景**，画布中会生成一个新的图片节点，用来展示去除背景后的结果图。

![Image=384x204](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/d6481dcb5abb4b56b737ec41f235e2aa~tplv-goo7wpa0wc-topic.webp)

#### **画质超清：提升清晰度，不改变画面内容** \{#hZS3lhJwB\}

当参考图尺寸太小、压缩明显、细节发糊时，可以使用画质超清。

在画布中选中图片，单击工具栏中的**画质超清**，画布中会生成一个新的图片节点，用来展示增强后的结果图。

![Image=485x162](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/8b813ebb93b84ee9bac8af4f5c189d48~tplv-goo7wpa0wc-topic.webp)

### 视频 \{#hzJOiJeGl\}

在画布上，你可以直接预览视频，也可以对视频进行评论、剪辑、取帧、音频分离、画质增强、字幕擦除等处理。处理完成后，新的结果会作为节点出现在画布中，方便继续对比和修改。

#### **生成视频：根据需求生成视频** \{#hjeb2C0zO\}

你可以直接在画布中让 Agent 生成视频。描述需求时，建议说清视频的使用场景、主体、画面结构、风格要求，以及不希望出现的内容等。

在画布中，单击+ > **视频**，输入生视频提示词并提交。Agent 将直接在画布中生成视频。

你可以选择以下方式生成视频：

* 全能参考：适合参考图片、视频或风格来生成视频。你可以上传参考素材，并说明希望生成的画面内容、风格和动作。
* 首尾帧：适合控制视频的开始和结束画面。你可以提供首帧和尾帧，Agent 会生成中间过渡，让画面从开始状态自然变化到结束状态。

![Image=288x340](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/416bc49d878647d1b477b9924cce0095~tplv-goo7wpa0wc-topic.webp)

#### **视频评论与编辑：在指定时间点标记修改意见** \{#hbEmaCJSE\}

如果你想修改视频中某几帧画面，比如删除画面里的物体、调整某个区域的颜色，可以使用视频评论与编辑。

在画布中选中视频节点，单击工具栏中的**视频编辑**。画布会聚焦到当前视频，并进入评论模式。

你可以拖动时间轴，找到需要修改的画面。如需标记具体区域，可以使用框选或画笔圈出画面位置，然后输入评论指令，单击**提交**完成当前评论。你可以定位多个时间点，分别添加评论。

单击**提交修改**后，系统会根据你的评论位置截取对应画面，并在画布右侧生成一个空白视频节点。单击该节点，可以查看和编辑本次视频修改的提示词，还可以查看预计积分消耗，选择模型、结果分辨率等配置，并按需选择全能参考或资产预审核能力。

开启全能参考后，Agent 会更充分地参考已选素材的主体、画面内容、动作、构图、光影氛围等信息。开启资产预审核后，系统会自动审核本次引用的图片素材；审核通过后，生成视频时无需再次审核。

**视频编辑会重新生成完整视频，消耗较多积分。请确认评论和提示词符合预期后，再提交生成。**

::::cols
@col 50
添加评论

![Image=1358x1206](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/67144a8961944fbeb09c14f2509c4cd9~tplv-goo7wpa0wc-topic.webp)

@col 50
确认提示词，重新生成视频

![Image=2164x1236](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/84e4e2fb2c654f95b3b30a1468f41b7a~tplv-goo7wpa0wc-topic.webp)
::::

#### **剪辑：截取你真正需要的片段** \{#hpNKcPTNx\}

如果你需要从一段长视频里截取一段做素材，或者删除开头、结尾和中间无效片段，可以使用**剪辑**。

你在画布中选中视频节点，单击**剪辑**，拖动时间轴两侧手柄选择要保留的片段，然后单击**裁剪**，视频右侧将生成新的视频节点。

![Image=365x269](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/0aac099011e24671aeb5bbd901511823~tplv-goo7wpa0wc-topic.webp)

#### **截图取帧：把视频里的某一帧变成图片素材** \{#hRoh4iKQV\}

如果要从视频里截出封面图、分镜图或参考图，可以使用截图取帧。比如某一秒构图很好，就可以取出来继续做海报或主视觉设计。

在画布中选中视频节点，将视频播放到想要截取的画面，然后单击顶部工具栏中的 **截图取帧 > 截当前帧**，即可截取当前画面。截取完成后，图片会作为新节点出现在画布中。

如果想直接截取视频开头或结尾的画面，也可以选择**截首帧** 或**截尾帧**。

![Image=535x202](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/e7f9cc74578d4bfbb1af8d686e346c76~tplv-goo7wpa0wc-topic.webp)

#### **音频分离：单独处理声音或画面** \{#hkbz2c03y\}

如果你想保留视频画面，去掉背景音等，或想单独提取人声、背景音继续处理，可以使用音频分离。**音频分离按照 2 积分/秒收费。**

在画布中选中视频节点，单击**音频分离**，然后选择需要的分离方式：

* **人声/背景音分离**：将视频中的人声和背景音拆分出来。
* **音视频分离**：生成一个音频节点。

分离成功后，会在画布上展示音频节点，你可以对音频进行编辑。

![Image=511x195](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/c51c3f0d73f94cfa9469f9368106016b~tplv-goo7wpa0wc-topic.webp)

#### **画质超清：提升视频清晰度** \{#haVIA4ZmF\}

如果视频画面压缩明显、细节不够清楚，或导出后看起来发糊，可以使用画质超清，支持选择 1080P、2K 或 4K 分辨率。不同分辨率会消耗不同积分：1080P 为 200 积分/秒，2K 为 400 积分/秒，4K 为 800 积分/秒。分辨率越高，消耗的积分越多。提交后，画布中会生成一个新的视频节点，用来展示增强后的结果。

你在画布中选中视频节点，单击**画质超清**，选择**新分辨率**。

![Image=418x261](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/3993be9f21ec4f6fb315ba452e9e4ee8~tplv-goo7wpa0wc-topic.webp)

#### **字幕擦除：去掉画面里已有字幕** \{#hNBACNe18\}

如果要去掉遮挡画面的旧字幕、重做字幕文案，或更换字幕语言和样式，可以先擦除原字幕，再让 Agent 添加新的字幕。**字幕擦除按照 17 积分/秒收费。**

你在画布中选中视频节点，单击**字幕擦除**。

![Image=526x315](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/3977516cb7dc4384a12746426e4c8e6e~tplv-goo7wpa0wc-topic.webp)

### 音频 \{#hnu3B4EC8\}

在画布上，你可以播放、引用、下载，或继续生成配音、音乐等内容。处理后的结果会作为新节点出现在画布中，方便继续试听、对比和使用。

#### **生成音频：根据需求生成音频** \{#hAZu5Jh8P\}

你可以直接在画布中让 Agent 生成音频。描述需求时，描述清楚音频用途、情绪、节奏、时长和是否需要避开人声等信息。音频节点支持三种生成模式，满足不同创作场景下的音频生产需求。你可以通过**文本生成**快速将文案转化为自然语音；也可以使用**音频生成**根据目标风格生成完整音频内容；还可以选择**参考音频生成**，基于已有声音或音频素材进行延展与复刻。三种模式分别适用于配音制作、创意音频生成和风格化声音创作，让音频内容的生成更加灵活、高效。

在画布中，单击+ > **音频**，输入生音频提示词并提交。Agent 将直接在画布中生成音频。

![Image=191x371](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/290a22f74750467a925c8a332aa50ed8~tplv-goo7wpa0wc-topic.webp)

#### **继续创作：基于已有音频生成视频** \{#hiydyzW8t\}

生成音频后，可以让 Agent 基于这段音频继续生成视频。

在画布中选中音频节点，单击连线上的 **➕**，选择**视频**节点，然后在视频生成提示词中，输入 `@`，指定要使用的音频元素。这样可以让新生成的视频引用这段音频。

![Image=403x203](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/d9d503dc307d4535ba9052666529333d~tplv-goo7wpa0wc-topic.webp)

### 网页 \{#hc5EukOdR\}

在画布上，你可以预览网页原型，并基于已有页面继续让 Agent 修改。

#### **生成网页**：把想法变成网页 \{#hUFOdn18L\}

当你想快速做出一个网页原型时，可以在画布中添加 HTML 节点。描述需求时，建议说清楚页面用途、主要内容、布局结构和视觉风格。开发网页时，建议添加扣子官方的轻量级静态网页开发插件 Pages。

在画布中，单击 `+` > **HTML**，输入需求并提交。随后在对话框中添加 Pages 插件，再次单击提交。Agent 会调用插件开发网页，并将结果展示在画布上。

![Image=433x271](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/9fc1546a77f740b19f9229d091f257a5~tplv-goo7wpa0wc-topic.webp)

#### **继续优化：让 Agent 修改页面** \{#hxoqO3iM7\}

如果你需要调整页面，可以选中对应的 HTML 节点，告诉 Agent 你想改哪里、改成什么样。例如：

```Plain Text
把表单改成左右分栏布局
增加预算和同行人选项
让按钮更醒目一些
整体风格更像旅行 App
```

在画布中选中 HTML 节点，输入你想调整的内容并提交；随后在对话框中确认修改需求，再次单击提交。

![Image=437x222](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/4a6bd57e25184deebe2ce922101427ed~tplv-goo7wpa0wc-topic.webp)

**手动修改：直接改页面文字**

如果只是想调整页面里的少量文字，可以直接手动编辑。

在画布上双击 HTML 节点进入编辑态，将鼠标悬停在文本上，即可直接修改对应文案。

![Image=306x302](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/acb1ed7a1d8047f4a007cb12c7f12a91~tplv-goo7wpa0wc-topic.webp)

### 画布 \{#hIxZBImUx\}

当图片、视频、网页原型、文案和分镜越来越多时，画布可以帮你把这些内容整理在一起。建议边生成边整理，清晰展示生成产物。

你可以用以下方式管理画布内容：

#### **添加节点：把相关素材集中到同一张画布** \{#hRDSllczg\}

你可以在画布上生成网页、图片、视频、音频等内容，也可以从本地或项目文件中导入素材。画布适合把参考图、旧版本、生成结果和素材文件放在一起统一查看。

这样后续不用在对话记录和文件列表里反复查找素材；需要让 Agent 继续修改时，也可以直接引用画布中的节点。

#### **添加文本：给画布内容补充说明** \{#hN5WFmI3e\}

你可以在画布上补充备注信息，比如这版为什么保留、哪里还要改、下一步让 Agent 做什么。素材越多，越建议用文本节点标注关键信息，方便后续对比和继续修改。

你可以在画布底部，单击**文本**图标，然后在文本框中输入文字。添加后，可以按需调整字号、加粗、斜体、颜色和位置等样式。

![Image=239x198](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/65f2b6000c1246fd87ae4738a99fb9f7~tplv-goo7wpa0wc-topic.webp)

#### **添加连线：记录素材之间的来源和演变关系** \{#hg6CcQBRw\}

连线适合表达“这张参考图影响了哪张生成图”、“这个脚本对应哪些分镜”、“这个网页原型后面改出了哪个版本”。它能让画布从素材堆变成一条清楚的创作路径。后续你或 Agent 再回来看，也能知道每个版本为什么存在。

#### **批量操作**：**一次处理多个节点。** \{#hZmFF8Zdc\}

框选多个节点后，可以一起处理。你可以将多个节点组合在一起，也可以基于多张图片进行溶图，或选择素材生成视频。

![Image=474x186](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/e77afa98f5a145f6bdeca334fe00f5a7~tplv-goo7wpa0wc-topic.webp)

为了后续更容易查找和继续修改，建议按任务管理画布，不要把所有内容都堆在同一张画布里。

* **新建画布**：开启一个新的设计任务，比如“618 海报方向”、“官网首页原型”、“品牌视觉探索”。
* **切换画布**：如果一个对话或项目里有多张画布，可以切换到对应画布继续工作。
* **自由拖拽画布**：扣子提供无限画布，你可以自由拖拽查看不同区域，也可以移动节点调整布局。
* **撤销操作**：如果误移动、误删除或误修改了画布内容，可以使用撤销恢复上一步操作。
* **重命名**：建议用清楚的任务名，给画布命名，比如“露营品牌海报第一版”、“短视频分镜修改版”。
   你也可以给图片、视频等节点重命名，方便后续查找和引用。   

## 引用到对话 \{#hrol1JbDz\}

如果想让 Agent 基于画布中的图片、视频、音频或HTML 页面继续修改或生成，可以先选中对应节点，单击**引用**，把它带入对话，再说明你的需求。

![Image=394x217](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/d61ae6a29f2e4b71a4cc1ee5e8556682~tplv-goo7wpa0wc-topic.webp)

## 使用案例 \{#hqer3gqhy\}

### 制作小红书首图 \{#hD7Zij4sy\}

1. 说明任务目标，生成多选方案。
   例如输入：
   ```Plain Text
   @ 画布，请在「画布1」中做一组咖啡新品的小红书首图。目标用户是年轻上班族，风格要干净、明亮、有生活感。请先生成 4 个不同构图方向，放在同一张画布上，方便我对比。
   ```
   ![Image=462x243](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/59290e9a8c60402e9def2a2d99dfcd5d~tplv-goo7wpa0wc-topic.webp)
2. 对比并选择主方向。
   生成后，先比较几版的构图、色调和信息重点。比如哪一版更突出产品，哪一版更有生活感，哪一版更适合继续做活动海报。
   你也可以在每张图旁边添加简短文本，记录各个方案的优点、问题和是否保留。这样后续继续修改时，你和 Agent 都能更快理解为什么选择这一版。
3. 基于选中版本继续优化。
   选中最接近目标的一版，添加修改要求，让 Agent 重新生成图片。
   ![Image=433x311](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/306dc19b4b7247fc8794c25c256322ab~tplv-goo7wpa0wc-topic.webp)
4. 确认最终版本。
   整体方向和局部细节都确认后，可以将当前图片作为最终版本。后续如果还需要适配其他渠道，也可以继续让 Agent 调整尺寸、替换文案或延展成系列图。生成的各个图片都保存在工作目录中。

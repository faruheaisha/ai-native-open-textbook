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
sourceRel: "docs/coze_pro_plugin_fee.md"
rawUrl: "/raw/04-work/coze-official-docs/docs/coze_pro_plugin_fee.md"
sourceSha256: "d997ab66be3673e1d720737d19581d4445b6adaf95bbb123f16a3ce264d9a1bc"
pageSha256: "d997ab66be3673e1d720737d19581d4445b6adaf95bbb123f16a3ce264d9a1bc"
contentMode: "local-full"
zh: ""
---

# 扣子 Coze 官方文档

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.coze.cn/llms.txt
> Use this file to discover all available pages before exploring further.

扣子插件可以通过 API 的方式调用外部数据或工具。目前扣子提供百余款能力丰富的官方插件，可直接绑定智能体，或作为工作流节点提供服务。其中部分插件为收费插件，根据调用量收取一定费用。

## 计费方式 \{#3cd126b8\}

根据收费插件的调用量收费。扣子每小时统计插件用量，并通过积分抵扣费用。

## 计费公式 \{#4ba4bf33\}

插件的计费公式如下：

**插件费用 = 收费插件调用量 ✖️ 单价**

其中：

* **收费插件调用量**：根据插件的调用次数、音频时长等计费。例如智能体直接绑定插件时，通常每次对话最多执行一次插件；工作流如果添加了多个插件节点，或在循环、批处理中添加了插件节点，每次执行工作流可能多次执行插件。仅扣子官方提供的**添加文字**等部分插件为收费插件。
* **单价**：每个插件的单价不同，具体价格可参考下表。

## 单价 \{#a3c8082f\}

### 扣子官方付费插件 \{#c1827e9e\}

在扣子中，所有扣子官方付费插件的消耗默认通过积分进行抵扣。当企业版账户内的积分余额不足时，系统将自动从你的现金账户中扣除对应的金额。扣子官方付费插件的计费方式包括按次计费、按图片张数计费、按秒计费、按分钟计费等。每个插件对应的免费额度、并发限制及单价如下表所示：

:::tip 说明
* 企业版具备相应的插件免费额度。
* 主账号及其所有子账号共享并发限制，共享免费额度。
* 如果某个插件内包含多个工具，则调用这些工具的次数将共同计入该插件的免费额度。
:::

* **按次计费**
   
   | | | | | || \
   |**插件名称** |**计费项** |**免费额度** |**并发限制** |**单价** | |
   |^^|^^|^^|^^| | | \
   | | | | |**积分结算** |\
   | | | | | |\
   | | | | |**（积分/次）** |**现金结算** |\
   | | | | | | |\
   | | | | | |**（元/次）** |
   |---|---|---|---|---|---|
   |[添加文字](https://docs.coze.cn/guides/add_text_to_image_plugin) |添加文字 |30 次/天 |10 |10 |0.01 |
   |[提示词优化](https://docs.coze.cn/guides/better_prompt_plugin) |提示词优化 |30 次/天 |无 |10 |0.01 |
   |[图片裁剪](https://docs.coze.cn/guides/cut_image_plugin) |图片裁剪 |30 次/天 |4 |10 |0.01 |
   |[图片叠图](https://docs.coze.cn/guides/add_image_to_image_plugin) |图片叠图 |30 次/天 |10 |10 |0.01 |
   |[图片缩放](https://docs.coze.cn/guides/resize_image_plugin) |图片缩放 |30 次/天 |无 |10 |0.01 |
   |[图片旋转](https://docs.coze.cn/guides/rotate_image_plugin) |图片旋转 |30 次/天 |无 |10 |0.01 |
   |[图像调整](https://docs.coze.cn/guides/change_image_plugin) |图像调整 |30 次/天 |4 |10 |0.01 |
   |[ByteArtist](https://docs.coze.cn/guides/byteartist_plugin) |ByteArtist |30 次/天 |4 |25 |0.025 |
   |[宠物风格化](https://docs.coze.cn/guides/pet_image_plugin) |宠物风格化 |30 次/天 |4 |25 |0.025 |
   |[Doubao-图像生成](https://docs.coze.cn/guides/doubao_image_plugin) |豆包图像生成大模型 |30 次/天 |5 |25 |0.025 |
   |[风格滤镜](https://docs.coze.cn/guides/style_transfer_plugin) |风格滤镜 |30 次/天 |4 |25 |0.025 |
   |[画质提升](https://docs.coze.cn/guides/improve_image_quality_plugin) |画质提升 |30 次/天 |4 |25 |0.025 |
   |[智能抠图](https://docs.coze.cn/guides/cutout_plugin) |智能抠图 |30 次/天 |4 |25 |0.025 |
   |[音乐生成](https://docs.coze.cn/guides/doubao_song_plugin) |豆包音乐大模型 |10 次/天 |1 |1000 |1 |
   |[火山联网问答](https://docs.coze.cn/guides/Internet_based_search_plugin) |火山联网问答 |10 次/天 |5 |30 |0.03 |
   |[智能绘图_文生图](https://docs.coze.cn/guides/gen_image_pay_plugin) |智能绘图（文生图） |10 次/天 |7 |200 |0.2 |
   |[音乐搜索和播放](https://docs.coze.cn/guides/music_agent_plugin) |音乐搜索 |30 次/天 |10 |10 |0.01 |
   |[火山图像增强](https://docs.coze.cn/guides/image_enhancement_plugin) |图像增强 |0 |2 |20 |火山图像增强插件阶梯价 |
   |[图像超分辨率](https://docs.coze.cn/guides/image_super_resolution_plugin) |图像超分辨率 |0 |2 |6 |图片超分辨率插件阶梯价 |
   |[商品图像分割](https://docs.coze.cn/guides/product_image_segmentation_plugin) |商品图像分割 |0 |无 |20 |商品图像分割插件阶梯价 |
* **按图片张数计费**
   
   | | | | | || \
   |**插件名称** |**计费项** |**免费额度** |**并发限制** |**单价** | |
   |^^|^^|^^|^^| | | \
   | | | | |**积分结算** |\
   | | | | | |\
   | | | | |**（积分/张）** |**现金结算** |\
   | | | | | | |\
   | | | | | |**（元/张）** |
   |---|---|---|---|---|---|
   |[Doubao-Seedream-5.0](https://docs.coze.cn/guides/image_generation_node) |文生图-Seedream 5.0 |0 |无 |220 |0.22 |
   |^^| | | | | | \
   | |图生图-Seedream 5.0 |0 |无 |220 |0.22 |
   |[Doubao-Seedream-4.5](https://docs.coze.cn/guides/image_generation_node) |文生图-Seedream 4.5 |0 |无 |250 |0.25 |
   |^^| | | | | | \
   | |图生图-Seedream 4.5 |0 |无 |250 |0.25 |
   |[Doubao-Seedream-4.0](https://docs.coze.cn/guides/doubao_seedream_4_plugin) |文生图-Seedream 4.0 |10 张（累计） |无 |200 |0.2 |
   |^^| | | | | | \
   | |图生图-Seedream 4.0 |10 张（累计） |无 |200 |0.2 |
* **按秒计费**
   
   | | | | | || \
   |**插件名称** |**计费项** |**免费额度** |**并发限制** |**单价** | |
   |^^|^^|^^|^^| | | \
   | | | | |**积分结算** |\
   | | | | | |\
   | | | | |**（积分/秒）** |**现金结算** |\
   | | | | | | |\
   | | | | | |**（元/秒）** |
   |---|---|---|---|---|---|
   |[Doubao-音乐生成](https://docs.coze.cn/guides/gen_song_v2_plugin) |音乐生成 V2 |120 秒（累计） |2 |2 |0.002 |
* **按分钟计费**
   :::tip 说明
   * 视频剪辑工具插件的计费方式为**基准计费项✖️抵扣系数✖️时长（分钟）**。
   * 输出视频或音频的时长不足 1 分钟的部分，将按实际秒数折算，例如 1 分 30 秒折算为 1.5 分钟。
   :::   

| | | | || \
|**插件名称** |**计费项** |**免费额度** |**单价** | |
|^^|^^|^^| | | \
| | | |**积分结算** |\
| | | | |\
| | | |**（积分/分钟）** |**现金结算** |\
| | | | | |\
| | | | |**（元/分钟）** |
|---|---|---|---|---|
|[视频剪辑工具](https://docs.coze.cn/guides/video_Editing_plugin) |视频剪辑工具-处理时长 |120 分钟（累计） |10 |0.01 |

不同工具输出不同分辨率的视频或音频时，对应的抵扣系数不同，抵扣系数列表如下。例如调用 image_to_video 工具生成一个 90 秒视频，视频分辨率固定为 1080 P，则该工具对应的计费抵扣系数为 6，消耗的积分为 **`10 积分/分钟 ✖️ 6（系数） ✖️ 1.5 分钟    = 90 积分`。**

| | | \
|**工具** |**抵扣系数** |
|---|---|
|[add_subtitles 工具](https://docs.coze.cn/guides/video_Editing_plugin#217cd7ca) |该类工具中，不同视频输出规格对应的抵扣系数如下： |\
| | |\
| |* 4K（3840x2160）分辨率及以下：24 |\
| |* 2K（2560x1440）分辨率及以下：12 |\
| |* 1080P（1920x1080)分辨率及以下：6 |\
| |* 720P（1280x720）分辨率及以下：3 |\
| |* 540P （720x540）分辨率及以下：2 |\
| |* 480P （640x480）分辨率及以下：1.5 |\
| |* 360P（480x360）分辨率及以下：1 |\
| |* 音频：1 |
| |^^| \
|[compile_video_audio 工具](https://docs.coze.cn/guides/video_Editing_plugin#489696fe) | |
| |^^| \
|[audio_extract 工具](https://docs.coze.cn/guides/video_Editing_plugin#7b3f070a) | |
| |^^| \
|[video_trim 工具](https://docs.coze.cn/guides/video_Editing_plugin#ef134354) | |
| |^^| \
|[concat_videos 工具](https://docs.coze.cn/guides/video_Editing_plugin#3d8c73ef) | |
| |^^| \
|[compile_image_audio 工具](https://docs.coze.cn/guides/video_Editing_plugin#74133b43) | |
| |^^| \
|[add_subvideo 工具](https://docs.coze.cn/guides/video_Editing_plugin#5ebf0a38) | |
| |^^| \
|[add_text 工具](https://docs.coze.cn/guides/video_Editing_plugin#44b6a676) | |
| |^^| \
|[image_to_video 工具](https://docs.coze.cn/guides/video_Editing_plugin#7f84a015) | |
| |^^| \
|[audio_mix 工具](https://docs.coze.cn/guides/video_Editing_plugin#ef9ed5b3) | |
| |^^| \
|[video_speed 工具](https://docs.coze.cn/guides/video_Editing_plugin#b6e21434) | |
| |^^| \
|[ajust_audio_volume 工具](https://docs.coze.cn/guides/video_Editing_plugin#57d54cf6) | |
| |^^| \
|[ajust_video_resolution 工具](https://docs.coze.cn/guides/video_Editing_plugin#792d8474) | |
| |^^| \
|[video_fps 工具](https://docs.coze.cn/guides/video_Editing_plugin#7fcfe094) | |
| |^^| \
|[video_flip 工具](https://docs.coze.cn/guides/video_Editing_plugin#cb1aa420) | |
| |^^| \
|[audio_loudness_normalization 工具](https://docs.coze.cn/guides/video_Editing_plugin#506411f9) | |
|[insert_frame 工具](https://docs.coze.cn/guides/video_Editing_plugin#77bde67c) |该类工具中，不同视频输出规格对应的抵扣系数如下： |\
| | |\
| |* 4K（3840x2160）分辨率及以下：600 |\
| |* 2K（2560x1440）分辨率及以下：300 |\
| |* 1080P（1920x1080)分辨率及以下：150 |\
| |* 720P（1280x720）分辨率及以下：75 |
| |^^| \
|[video_super_resolution 工具](https://docs.coze.cn/guides/video_Editing_plugin#9be4feb1) | |
| |^^| \
|[video_hdr 工具](https://docs.coze.cn/guides/video_Editing_plugin#7dd34d4c) | |
| |^^| \
|[audio_denoise 工具](https://docs.coze.cn/guides/video_Editing_plugin#f77d3447) | |
|[audio_to_subtitle 工具](https://docs.coze.cn/guides/video_Editing_plugin#1ccc340a) |5 |
|[audio_separate 工具](https://docs.coze.cn/guides/video_Editing_plugin#41a7cd80) |7 |

#### 火山图像增强插件阶梯价 \{#881a84f7\}

火山图像增强插件调用次数为**超额累进**模式的阶梯计费，按月统计，单价被划分为不同的阶梯区间，每个阶梯对应不同的单价，但**仅对超出部分**按该阶梯的单价计算费用，而之前的用量仍按较低阶梯的单价计算。各档位的单价如下：

| | | | \
|**火山图像增强插件调用次数档位** |**单价** |**费用计算公式** |\
| | | |\
| | |（X 为每月的图像增强插件调用次数总次数） |
|---|---|---|
|0~100,000 次 |0.02 元/次 |X **✖️** 0.02 元 |
|100,001~1,000,000 次 |0.015 元/次 |100,000 **✖️** 0.02 |\
| | | |\
| | |➕ (X ➖ 100,000) **✖️** 0.015 元 |
|1,000,001~5,000,000 次 |0.01 元/次 |100,000 **✖️** 0.02 |\
| | | |\
| | |➕ (1,000,000 ➖ 100,000) **✖️** 0.015 |\
| | | |\
| | |➕ (X ➖ 1,000,000) **✖️** 0.01 元 |
|5,000,001~10,000,000 |0.008 元/次 |100,000 **✖️** 0.02 |\
| | | |\
| | |➕ (1,000,000 ➖ 100,000) **✖️** 0.015 |\
| | | |\
| | |➕ (5,000,000 ➖ 1,000,000) **✖️** 0.01 |\
| | | |\
| | |➕ (X ➖ 5,000,000) **✖️** 0.008 元 |
|10,000,001 次及以上 |0.005 元/次 |100,000 **✖️** 0.02 |\
| | | |\
| | |➕ (1,000,000 ➖ 100,000) **✖️** 0.015 |\
| | | |\
| | |➕ (5,000,000 ➖ 1,000,000) **✖️** 0.01 |\
| | | |\
| | |➕ (10,000,000 ➖ 5,000,000) **✖️** 0.008 |\
| | | |\
| | |➕ (X ➖ 10,000,000) **✖️** 0.005 元 |

#### 图片超分辨率插件阶梯价 \{#49a1b577\}

图片超分辨率插件调用次数为**超额累进**模式的阶梯计费，按月统计，单价被划分为不同的阶梯区间，每个阶梯对应不同的单价，但**仅对超出部分**按该阶梯的单价计算费用，而之前的用量仍按较低阶梯的单价计算。各档位的单价如下：

| | | | \
|**图片超分辨率插件调用次数档位** |**单价** |**费用计算公式** |\
| | | |\
| | |（X 为每月的图片超分辨率插件调用次数总次数） |
|---|---|---|
|0~100,000 次 |0.006 元/次 |X **✖️** 0.006 元 |
|100,001~1,000,000 次 |0.005 元/次 |100,000 **✖️** 0.006 |\
| | | |\
| | |➕ (X ➖ 100,000) **✖️** 0.005 元 |
|1,000,001~5,000,000 次 |0.0045 元/次 |100,000 **✖️** 0.006 |\
| | | |\
| | |➕ (1,000,000 ➖ 100,000) **✖️** 0.005 |\
| | | |\
| | |➕ (X ➖ 1,000,000) **✖️** 0.0045 元 |
|5,000,001~10,000,000 |0.004 元/次 |100,000 **✖️** 0.006 |\
| | | |\
| | |➕ (1,000,000 ➖ 100,000) **✖️** 0.005 |\
| | | |\
| | |➕ (5,000,000 ➖ 1,000,000) **✖️** 0.0045 |\
| | | |\
| | |➕ (X ➖ 5,000,000) **✖️** 0.004 元 |
|10,000,001 次及以上 |0.0035 元/次 |100,000 **✖️** 0.006 |\
| | | |\
| | |➕ (1,000,000 ➖ 100,000) **✖️** 0.005 |\
| | | |\
| | |➕ (5,000,000 ➖ 1,000,000) **✖️** 0.0045 |\
| | | |\
| | |➕ (10,000,000 ➖ 5,000,000) **✖️** 0.004 |\
| | | |\
| | |➕ (X ➖ 10,000,000) **✖️** 0.0035 |

#### 商品图像分割插件阶梯价 \{#259ade9f\}

商品图像分割插件调用次数为**超额累进**模式的阶梯计费，按月统计，单价被划分为不同的阶梯区间，每个阶梯对应不同的单价，但**仅对超出部分**按该阶梯的单价计算费用，而之前的用量仍按较低阶梯的单价计算。各档位的单价如下：

| | | | \
|**商品图像分割插件调用次数档位** |**单价** |**费用计算公式** |\
| | | |\
| | |（X 为每月的商品图像分割插件调用次数总次数） |
|---|---|---|
|0~100,000 次 |0.02 元/次 |X **✖️** 0.02 元 |
|100,001~1,000,000 次 |0.015 元/次 |100,000 **✖️** 0.02 |\
| | | |\
| | |➕ (X ➖ 100,000) **✖️** 0.015 元 |
|1,000,001~5,000,000 次 |0.01 元/次 |100,000 **✖️** 0.02 |\
| | | |\
| | |➕ (1,000,000 ➖ 100,000) **✖️** 0.015 |\
| | | |\
| | |➕ (X ➖ 1,000,000) **✖️** 0.01 元 |
|5,000,001~10,000,000 |0.008 元/次 |100,000 **✖️** 0.02 |\
| | | |\
| | |➕ (1,000,000 ➖ 100,000) **✖️** 0.015 |\
| | | |\
| | |➕ (5,000,000 ➖ 1,000,000) **✖️** 0.01 |\
| | | |\
| | |➕ (X ➖ 5,000,000) **✖️** 0.008 |
|10,000,001 次及以上 |0.005 元/次 |100,000 **✖️** 0.02 |\
| | | |\
| | |➕ (1,000,000 ➖ 100,000) **✖️** 0.015 |\
| | | |\
| | |➕ (5,000,000 ➖ 1,000,000) **✖️** 0.01 |\
| | | |\
| | |➕ (10,000,000 ➖ 5,000,000) **✖️** 0.008 |\
| | | |\
| | |➕ (X ➖ 10,000,000) **✖️** 0.005 元 |

### 三方付费插件 \{#ffb37c4a\}

:::tip 说明
目前仅企业标准版、企业旗舰版支持使用三方付费插件。
:::

三方付费插件是指由开发者开发并上架到扣子插件商店的付费插件，三方付费插件会有**三方**、**付费**标识，相关说明请参考[插件分类](https://docs.coze.cn/guides/plugin#8ff3afcf)。

三方插件的价格由插件开发者自行设定，你可以在添加三方付费插件时，可查看插件的单价及免费额度。使用三方付费插件时，将根据插件调用量（次数、时长等）从使用者的**现金账户余额**中扣除，不支持积分抵扣。

三方付费插件在账单中的产品名为`扣子三方插件-\{插件名\}`，计费项名称为`\{插件名\}`。

![Image=597x222](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/b322ed4a1a7640b6a7f9f930c44ae3aa~tplv-goo7wpa0wc-image.image)

## 常见问题 \{#ff482741\}

### 收费插件限制并发吗？ \{#1626ac53\}

限制，各个节点的并发限制及限速策略可参考官方插件文档，例如[添加文字插件](https://docs.coze.cn/guides/add_text_to_image_plugin)。

### 哪些插件是收费的？ \{#319e2357\}

收费插件清单及价格可参考单价。你也可以在插件商店中通过计费标识判断某个插件是否收费。

![Image=631x277](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/cbd9a195c06145de9fde46aa0cac139c~tplv-goo7wpa0wc-image.image)

### 工作流节点收费吗？ \{#d7cf1fcc\}

工作流节点中，**画板**以外的**图像处理类节点**将作为官方收费插件，按调用次数收费。

![Image=383x321](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/94283a7032ac458b82f9ab6f332ebacf~tplv-goo7wpa0wc-image.image)

### 如何查看三方插件价格？ \{#81e37c61\}

三方插件是由开发者开发并上架到扣子插件商店的插件，分为免费插件和付费插件。其中，三方付费插件会有**三方**、**付费**标识。

在[插件商店](https://www.coze.cn/store/plugin?cate_type=recommend&cate_value=recommend&surl_token=FJvCs&zlink_code=FFKdE&utm_medium=docs&utm_source=docs&utm_content=landingpage&utm_id=&utm_campaign=&utm_term=docs&utm_source_platform=)查看插件详情，或在智能体、工作流中使用插件时，如果插件上有**三方**、**付费**标识，则表示该插件为三方付费插件。你可以将鼠标移至**付费**标识上，查看该插件的免费额度、单价及 QPS 等信息。

使用该类插件时，系统将根据插件调用量（次数、时长等）从你的**现金账户余额**中扣除费用。

![Image=641x235](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/2215a67c149b4fdeb52d742279622398~tplv-goo7wpa0wc-image.image)

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
sourceRel: "docs/cozeloop_multi-modal-dataset.md"
rawUrl: "/raw/04-work/coze-official-docs/docs/cozeloop_multi-modal-dataset.md"
sourceSha256: "9adc19dd88b1f10f39184031ac3d4c7e2970dcbc1fe63ad6388037aee9b54f33"
pageSha256: "9adc19dd88b1f10f39184031ac3d4c7e2970dcbc1fe63ad6388037aee9b54f33"
contentMode: "local-full"
zh: ""
---

# 扣子 Coze 官方文档

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.coze.cn/llms.txt
> Use this file to discover all available pages before exploring further.

扣子罗盘支持全链路的多模态评测，准备多模态的评测集数据后，可以基于评测集发起针对多模态 Agent 的评测实验。本文档介绍如何准备多模态的评测集。
## 什么是多模态数据 \{#272466de\}
多模态数据，可以是图片、音频或视频，也可以是文字、图片、音频与视频的组合。
以下示例展示了混合了文字、图片、音频和视频的多模态数据。该数据的结构为 `Array<Object>`，其中每个 `Object` 的 `key` 指明了多模态类型，`value` 为对应的数据。
对于图片、音频和视频，其 `value` 均为 URL。在你向评测集添加数据时，扣子罗盘处理此 URL 的方式有两种：

* **上传源文件**：扣子罗盘会将文件上传至云端，并自动将生成的 URL 填入 `value`。
* **使用外部链接**：扣子罗盘会直接将你提供的链接填入 `value`。

```JSON
[
  {
    "type": "text",
    "text": "What is in this image?"
  },
  {
    "type": "image_url",
    "image_url": {
      "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg"
    }
  }，
  {
    "type": "audio_url",
    "audio_url": {
      "url": "https://example.com/audio"
    }
  }，
  {
    "type": "video_url",
    "video_url": {
      "url": "https://example.com/video"
    }
  }
]
```

## 步骤一：创建多模态类型的评测集 \{#85b38f10\}
创建多模态评测集的操作步骤如下：

1. 登录[扣子罗盘](https://loop.coze.cn)。
2. 在左侧导航栏顶部，选择一个空间。
3. 在左侧导航栏选择**评测 > 评测集**，然后单击 **+ 新建评测集**。
   ![Image=585x217](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/286983f23f644939ac27242a92855610~tplv-goo7wpa0wc-image.image)
4. 在**新建评测**集页面，为评测集设置名称和描述。
5. 配置评测集的列，确保评测集中存在多模态类型的字段。
   例如评测一个支持图片理解的 Agent，评测集的输入字段（input）设置为多模态，数据结构固定为 Arrary&lt;Object>，且不可编辑。
   ![Image=324x226](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/00fd42356f594f98bca12d188053a30c~tplv-goo7wpa0wc-image.image)
6. 单击**创建**。

## 步骤二：上传多模态数据 \{#378c7e04\}
创建评测集并定义多模态数据结构之后，即可上传多模态的测试数据。
### 手动添加数据 \{#c19e3b30\}

1. 在评测集详情页面，选择添加**数据 > 手动添加**来添加测试数据。
   ![Image=520x216](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/36e0a29e0ccd4a75926d2cd7f9272df3~tplv-goo7wpa0wc-image.image)
2. 在**添加数据**页面，输入第一组测试数据。
   对于多模态类型的字段，单击**添加数据**，最多可添加 50 条。多模态字段支持以下类型：
   * **文本**：文本格式的内容。
   * **图片：​**图片格式的内容。
      * **源文件**：本地上传图片文件。单个图片文件不能超过 20 MB。支持一次上传多张图片。
      * **外链**：输入在线图片 URL。上传时扣子罗盘会校验 URL 有效性。如果上传的图片链接解析失败，可以检查 URL 是否以 `http://` 或 `https://` 开头、域名格式是否正确，或尝试更换其他 URL。
         :::tip 说明
         为了提升多模态数据的稳定性和访问可靠性，扣子罗盘在导入外部 URL 资源（图片、视频、音频）时提供了“转存”和“不转存”两种策略。详情参阅 多模态数据的转存策略。
         :::
         ![Image=465x375](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/58975634674b423084f9583553200671~tplv-goo7wpa0wc-image.image)
   * **视频**：视频格式的内容。
      * **源文件**：本地上传视频文件。单个视频文件不能超过 100 MB。支持一次上传多个视频。
      * **外链**：输入在线视频 URL。上传时扣子罗盘会校验 URL 有效性。如果上传的视频链接解析失败，可以检查 URL 是否以 `http://` 或 `https://` 开头、域名格式是否正确，或尝试更换其他 URL。
         :::tip 说明
         为了提升多模态数据的稳定性和访问可靠性，扣子罗盘在导入外部 URL 资源（图片、视频、音频）时提供了“转存”和“不转存”两种策略。详情参阅 多模态数据的转存策略。
         :::
         ![Image=208x306](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/3f26440321614143853b1ccf8906088a~tplv-goo7wpa0wc-image.image)
   * **音频：​**音频格式的内容。
      * **源文件**：本地上传音频文件。单个音频文件不能超过 100 MB。支持一次上传多个音频。
      * **外链**：输入在线音频 URL。上传时扣子罗盘会校验 URL 有效性。如果上传的音频链接解析失败，可以检查 URL 是否以 `http://` 或 `https://` 开头、域名格式是否正确，或尝试更换其他 URL。
         :::tip 说明
         为了提升多模态数据的稳定性和访问可靠性，扣子罗盘在导入外部 URL 资源（图片、视频、音频）时提供了“转存”和“不转存”两种策略。详情参阅 多模态数据的转存策略。
         :::
      ![Image=196x326](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/471187cd2f384158bae31fc541ba789d~tplv-goo7wpa0wc-image.image)
3. 单击 **+ 添加数据项** 添加更多测试数据。
4. 单击 **添加** 完成数据添加。

### 上传本地文件 \{#8dcf1c6d\}
向评测集中上传包含多模态数据的本地文件。
#### 格式要求 \{#289e9708\}
详细说明可参考多模态文件格式要求。
#### 上传步骤 \{#2ff1ea12\}

1. 在评测集详情页面，选择添加**数据 > 本地导入**来添加测试数据。
   ![Image=2426x579](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/40e854dc61494291a2b82087446203d3~tplv-goo7wpa0wc-image.image)
2. 在**导入数据**对话框，上传要导入的测试数据文件。
3. 当完成数据导入后，将文件中的数据列与评测集的数据列进行映射。
   :::notice 注意
   * 确保在配置列映射关系时，文件中指定列的数据格式与评测集对应格式一致。如果不一致，你需要手动设置。
   * 由于 CSV、Excel 文件不包含数据类型信息，上传时，扣子罗盘会根据文件中每行的数据内容来校验其数据格式。如果校验不通过，该行数据将不会被上传。
      例如，CSV 文件中有一列 A，包含两行数据 `10` 和 `helloworld`。在创建评测集时，你指定了列 B 的数据类型为 **int**。当添加数据时，将 CSV 中的列 A 映射到评测集的列 B，即将 CSV 的 A 列数据导入到评测集的 B 列。在上传校验过程中，由于 B 列的数据类型为 **int**，`helloworld` 这一行数据将无法导入。
   * CSV 模板和 EXCEL模板支持导入图片源文件和 URL；对于视频/音频，仅支持通过 URL 导入。
   * ZIP 模板支持通过 URL 或文件的相对路径导入视频/音频。
   :::
   ![Image=637x473](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/8e58c76f63124300b20e06252c1c5931~tplv-goo7wpa0wc-image.image)
   如果你的文件列中只包含纯 URL（例如 `http://.../a.png`），而没有使用 `<ref_*_url:...>` 标签进行类型声明，系统会在此处提示你为该列指定模态类型（图片、视频或音频）。
   ![Image=636x475](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/c35b4457544d4fd09f01bbf667f57bad~tplv-goo7wpa0wc-image.image)
4. （可选）点击指定多模态列右侧的齿轮图标，为指定列统一选择多模态数据转存策略：**转存到平台存储** 或 **保留原始 URL，不转存**。详情参阅 多模态数据的转存策略。默认为 **转存到平台存储**。
   :::tip 说明
   如果选择了 **转存到平台存储**，但某条数据的 URL 无法访问或下载失败，该条数据将被跳过。如果平台校验发现资源类型与声明不符（例如链接指向一个视频但声明为图片），该条数据也将被跳过。所有因格式校验或转存失败而被跳过的数据行，都会被自动汇总到一个 Excel 文件中，你可以在导入任务的详情页面下载该文件进行核对。
   :::
   ![Image=649x483](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/798561a64fe2425296b7d544b9b0470b~tplv-goo7wpa0wc-image.image)
5. 选择一种导入方式，追加数据或者全量覆盖已有测试数据。
   ![Image=660x490](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/8e58c76f63124300b20e06252c1c5931~tplv-goo7wpa0wc-image.image)
6. 单击**导入**。

### Trace 回流评测集 \{#73b138ff\}
扣子罗盘 SDK 支持将 Trace 数据回流至评测集，我们可以将多模态 Agent 线上的真实对话对应的 Trace 数据回流到评测集中，作为评测实验的评测集，用于评估多模态 Agent 的图片理解能力。
操作步骤如下：

1. 在左侧导航栏，选择**观测 > Trace**，并使用过滤器筛选出多模态 Agent 的 Trace 数据。
   筛选出带有多模态（图片）问题和回复的 Span 节点，通常是 root span 节点。
2. 在页面右上角单击**添加到评测集**。
3. 选择需要回流的 Trace 数据，并再次单击**添加到评测集**。
4. 根据页面提示配置字段映射，依次将用户问题、多模态数据、Agent 回复回流至评测集的对应字段。
   需要注意的是，对于多模态字段（图片），需要为其映射评测集的**多模态**类型字段。关于回流 Trace 到评测集的详细操作步骤、字段映射配置可参考Trace 数据回流。
   <div style="text-align: center"><img src="https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/3dc5cd41797a4847a473ab4191c26638~tplv-goo7wpa0wc-image.image" width="1836px" height="730px" />   </div>

## 相关信息 \{#eb63c993\}
### 多模态数据的转存策略 \{#bc4d220d\}
为了提升多模态数据的稳定性和访问可靠性，扣子罗盘在导入外部 URL 资源（图片、视频、音频）时提供了 **转存到平台存储** 和 **保留原始 URL，不转存** 两种策略。你在通过 **手动添加数据** 或 **上传本地文件** 导入包含外部 URL 的多模态列时，可以在页面中选择对应的转存策略。
![Image=441x228](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/12ea0dade5754e55b772ca0370b8e3b7~tplv-goo7wpa0wc-image.image)
下面对两种转存策略进行说明：

* **转存到平台存储**：平台将自动抓取你提供的外部 URL 资源，并将其下载、保存至扣子罗盘内部的对象存储服务中。数据集中最终引用的是平台内部的稳定链接。这是推荐的默认选项，尤其适用于长期评测、模型训练或生产环境。通过转存，可以避免因原始链接失效、过期或访问策略变更而导致的数据丢失或模型推理失败问题。数据持久性高，访问速度和稳定性由平台保障。
* **保留原始 URL，不转存**：平台直接记录并使用你提供的原始外部 URL，不做任何下载或存储操作。适用于临时性的数据验证，或者当你的多模态资源已托管在有高可用保障的公有云 CDN（内容分发网络）上，且链接为永久公开、无需鉴权时。你必须自行确保 URL 的长期有效性和可访问性。如果原始链接失效，将直接影响后续的模型访问，可能导致评测或训练任务失败。
   :::notice 使用外部 URL 的注意事项
   当你选择“不转存”策略，直接使用原始 URL 时，请务必确认以下事项，以避免数据不可用导致的各类问题：
   
   * **URL 公开可访问**：确保 URL 指向的是公网地址，不包含任何 IP 白名单、内网限制或需要登录才能访问的内容。
   * **链接长期有效**：避免使用包含临时签名或访问令牌的 URL（例如各类云存储的预签名 URL），这类链接会在短时间后失效。
   * **源站性能**：确认你的资源服务器具备足够的带宽和并发处理能力，以承受模型在训练或评测时可能发起的高频、批量访问。
   * **资源稳定性**：确保 URL 指向的资源在模型使用期间不会被删除、移动或替换。
   
   若 URL 失效，将直接导致模型推理或训练失败。为保障数据完整性和任务稳定性，强烈建议你优先选择“转存到平台存储”。
   :::

### 多模态文件格式要求 \{#27cb376e\}
#### CSV \{#91ca35fb\}

* 首行为标题行，表示列名，也就是字段名称。
* CSV 文件必须是 UTF-8 编码。
* 对于多模态的内容，其格式要求如下：
   :::tip 说明
   如果你的列中直接填写了无标签的纯 URL（例如 `http://.../a.png`），在导入时，你需要为该列手动指定模态类型（如“图片”）。同一列中的所有纯 URL 必须属于同一种模态类型。
   同一列内不建议纯 URL 和带标签的的 URL 混用。
   :::
   
   | | | \
   |**多模态类型** |**格式要求** |
   |---|---|
   | | | \
   |图片 |使用图片 URL 来引用图片。多张图片之间通过换行符隔开。例如： |\
   | |```Plain Text |\
   | |&lt;ref_image_url:https://lf9-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/37361.png> |\
   | |&lt;ref_image_url:https://lf-coze-web-cdn.coze.cn/obj/coze-web-cn/MODEL_ICON/doubao_v2.png> |\
   | |``` |\
   | | |
   | | | \
   |音频 |使用音频 URL 来引用图片。多个音频之间通过换行符隔开。例如： |\
   | |```Plain Text |\
   | |&lt;ref_audio_url:https://lf9-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/speech_01.mp3> |\
   | |&lt;ref_audio_url:https://lf9-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/speech_02.mp3> |\
   | |``` |\
   | | |
   | | | \
   |视频 |使用视频 URL 来引用图片。多个视频之间通过换行符隔开。例如： |\
   | |```Plain Text |\
   | |&lt;ref_video_url:https://lf-coze-web-cdn.coze.cn/obj/coze-web-cn/MODEL_ICON/video_01.mp3> |\
   | |&lt;ref_video_url:https://lf-coze-web-cdn.coze.cn/obj/coze-web-cn/MODEL_ICON/video_02.mp3> |\
   | |``` |\
   | | |
   | | | \
   |文字、图片、音频、视频混排 |文字、图片、音频、视频混合排列。列内容也可以是纯文本，上传评测集时平台可正常解析。 |\
   | |例如： |\
   | |```Plain Text |\
   | |这是一张图片  |\
   | |&lt;ref_image_url:https://lf9-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/37361.png> |\
   | |这是一段音频 |\
   | |&lt;ref_video_url:https://lf-coze-web-cdn.coze.cn/obj/coze-web-cn/MODEL_ICON/speech_01.mp3> |\
   | |这是一段视频 |\
   | |``` |\
   | | |

#### Excel \{#96f9a91b\}

* 首行为标题行，表示列名，也就是字段名称。
* 支持 `*.xlsx`、`*.xls` 格式的 Excel 表格文件。
* 对于多模态的内容，其格式要求如下：
   :::tip 说明
   如果你的列中直接填写了无标签的纯 URL（例如 `http://.../a.png`），在导入时，你需要为该列手动指定模态类型（如“图片”）。同一列中的所有纯 URL 必须属于同一种模态类型。
   同一列内不建议纯 URL 和带标签的的 URL 混用。
   :::
   
   | | | \
   |**多模态类型** |**格式要求** |
   |---|---|
   | | | \
   |单张图片 |在 Excel 格式下可导入通过 URL 引用或嵌入到单元格中的图片。url的引用格式为 `<ref_image_url:\{替换为有效的图片链接\}>`，例如： |\
   | | |\
   | |* 嵌入： |\
   | |   ![Image=306x88](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/4f4596fcfb9d4d92a29114b623b225bf~tplv-goo7wpa0wc-image.image) |\
   | |* URL 引用： |\
   | |   ![Image=280x102](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/d401eed558254b9491fc4644cc48bebf~tplv-goo7wpa0wc-image.image) |
   | | | \
   |多张图片 |图片与图片之间通过换行符隔开，多图片列仅支持通过 url 引用，不支持直接嵌入图片。例如： |\
   | |```Plain Text |\
   | |&lt;ref_image_url:https://lf9-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/37361.png> |\
   | |&lt;ref_image_url:https://lf-coze-web-cdn.coze.cn/obj/coze-web-cn/MODEL_ICON/doubao_v2.png> |\
   | |``` |\
   | | |
   | | | \
   |单个音频 |在 Excel 格式下可导入通过 URL 引用或嵌入到单元格中的音频。 |\
   | |URL 引用格式为： |\
   | |```Plain Text |\
   | |&lt;ref_audio_url:https://lf9-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/speech_01.mp3> |\
   | |``` |\
   | | |
   | | | \
   |多个音频 |使用音频 URL 来引用图片。多个音频之间通过换行符隔开。例如： |\
   | |```Plain Text |\
   | |&lt;ref_audio_url:https://lf9-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/speech_01.mp3> |\
   | |&lt;ref_audio_url:https://lf9-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/speech_02.mp3> |\
   | |``` |\
   | | |
   | | | \
   |单个视频 |在 Excel 格式下可导入通过 URL 引用或嵌入到单元格中的图片。 |\
   | |URL 引用格式为： |\
   | |```Plain Text |\
   | |&lt;ref_video_url:https://lf-coze-web-cdn.coze.cn/obj/coze-web-cn/MODEL_ICON/video_01.mp3> |\
   | |``` |\
   | | |
   | | | \
   |多个视频 |使用视频 URL 来引用图片。多个视频之间通过换行符隔开。例如： |\
   | |```Plain Text |\
   | |&lt;ref_video_url:https://lf-coze-web-cdn.coze.cn/obj/coze-web-cn/MODEL_ICON/video_01.mp3> |\
   | |&lt;ref_video_url:https://lf-coze-web-cdn.coze.cn/obj/coze-web-cn/MODEL_ICON/video_02.mp3> |\
   | |``` |\
   | | |
   | | | \
   |文字、图片、音频、视频混排 |文字、图片、音频、视频混合排列。其中图片、音频和视频仅支持通过 url 引用，不支持直接嵌入。 |\
   | |也可以是纯文本格式。 |\
   | |例如： |\
   | |```Plain Text |\
   | |这是一张图片  |\
   | |&lt;ref_image_url:https://lf9-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/37361.png> |\
   | |这是一段音频 |\
   | |&lt;ref_video_url:https://lf-coze-web-cdn.coze.cn/obj/coze-web-cn/MODEL_ICON/speech_01.mp3> |\
   | |这是一段视频 |\
   | |``` |\
   | | |

#### ZIP \{#b5aaded0\}
ZIP 文件通常用于多模态场景，你可以通过 ZIP 文件将多模态内容打包在一起，并以 `index.csv` 作为索引文件。ZIP 包的结构示例如下：
```Plain Text
ZIP 模板  // ZIP包
├── images   
│   ├── pic1.png
│   ├── pic2.jpeg
│   └── pic3.webp
│   └── pic4.jpeg
├── videos  
│   ├── video_01.mp3
│   ├── video_02.mov
│   └── video_03.mp4
├── audios  
│   ├── speech_01.mp3
│   ├── speech_02.mp3
│   └── speech_03.mp3
└── index.csv  // 名称固定index.csv 
```

对于多模态的内容，其格式要求如下：
:::tip 说明
如果你的列中直接填写了无标签的纯 URL（例如 `http://.../a.png`），在导入时，你需要为该列手动指定模态类型（如“图片”）。同一列中的所有纯 URL 必须属于同一种模态类型。
同一列内不建议纯 URL 和带标签的的 URL 混用。
:::

| | | \
|**多模态类型** |**格式要求** |
|---|---|
| | | \
|单张图片 |在 `index.csv` 索引文件中引用图片，支持 URL 方式引用、嵌入图片文件，或者引用 Zip 压缩包中的文件。示例如下： |\
| | |\
| |* **url 引用**：url 的引用格式为 `<ref_image_url:\{替换为有效的图片链接\}>`，例如： |\
| |   ![Image=280x102](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/d401eed558254b9491fc4644cc48bebf~tplv-goo7wpa0wc-image.image) |\
| |* **嵌入**： |\
| |   ![Image=306x88](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/4f4596fcfb9d4d92a29114b623b225bf~tplv-goo7wpa0wc-image.image) |\
| |* **引用 Zip 压缩包中的图片文件**：使用Zip 压缩包中的图片文件的相对路径。 |\
| |   ![Image=318x128](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/6c05546e545144f8ad1543e417e98374~tplv-goo7wpa0wc-image.image) |
| | | \
|多张图片 |图片与图片之间通过换行符隔开，多图片列支持引用图片 URL 或者引用压缩包中的图片文件，不支持直接嵌入图片。例如： |\
| |```Plain Text |\
| |&lt;ref_image_url:images/pic1.png> |\
| |&lt;ref_image_url:https://lf-coze-web-cdn.coze.cn/obj/coze-web-cn/MODEL_ICON/doubao_v2.png> |\
| |``` |\
| | |
| | | \
|音频 |引用 URL 或者引用压缩包中的文件。多个音频之间通过换行符隔开。例如： |\
| |```Plain Text |\
| |&lt;ref_audio_url:https://lf9-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/speech_01.mp3> |\
| |&lt;ref_audio_path:audios/audio1.mp3> |\
| |``` |\
| | |
| | | \
|视频 |引用 URL 或者引用压缩包中的文件。多个视频之间通过换行符隔开。例如： |\
| |```Plain Text |\
| |&lt;ref_video_url:https://lf-coze-web-cdn.coze.cn/obj/coze-web-cn/MODEL_ICON/video_01.mp3> |\
| |&lt;ref_video_path:audios/video1.mp3> |\
| |``` |\
| | |
| | | \
|文字、图片、音频、视频混排 |文字、图片、音频、视频混合排列，其中图片、音频和视频仅支持引用 URL 或者引用压缩包中的文件，不支持直接嵌入。 |\
| |列内容也可以是纯文本，上传评测集时平台可正常解析。 |\
| |例如： |\
| |```Plain Text |\
| |图片：  |\
| |&lt;ref_image_path:images/pic1.png>  |\
| |音频：  |\
| |&lt;ref_audio_path:audios/audio1.mp3>  |\
| |视频：  |\
| |&lt;ref_video_url:https://lf-coze-web-cdn.coze.cn/obj/coze-web-cn/MODEL_ICON/vedio2.mp3>  |\
| |``` |\
| | |

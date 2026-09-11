---
title: "扣子Coze实战：从0到1打造抖音+小红书热点监控智能体"
sourceId: "04-work/agent-guide-office"
sourceTitle: "Agent 办公实战指南（社区）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "中文"
tier: 2
volume: "04-work"
sourceUrl: "https://github.com/tangshiyegit/agent-guide"
entryUrl: "https://github.com/tangshiyegit/agent-guide/blob/ae8b2262e7a1e5bd0d466037c6ad9f6037b72c33/README.md"
zh: ""
---

# 扣子Coze实战：从0到1打造抖音+小红书热点监控智能体

热点监控智能体是帮你自动发现爆款选题的利器。

它能全天候扫描各大平台的热门内容，从海量信息中筛选出最有价值的话题和创意。

你不需要再手动搜索，智能体会自动将热点内容整理成表格，让你清晰直观地掌握行业动态。

### 1 为什么要做热点监控

热点监控是内容创作者和营销人员的必备工具，它帮助我们在信息爆炸时代精准把握用户关注点，提升内容效果和影响力。以下是进行热点监控的四大核心理由：

**1. 把握用户兴趣，提高内容相关性**

用户的注意力是稀缺资源。通过实时监控热点话题，我们能了解目标受众当下最关心的问题和兴趣点。热点本质上是用户兴趣的集中体现，基于热点创作的内容自然具有更高的用户匹配度，更容易获得关注和互动。

**2. 节约选题时间，提高创作效率**

没有热点监控系统时，创作者需要在各平台间不断切换，手动搜索和筛选信息，这个过程既耗时又低效。自动化热点监控能持续追踪多平台热门内容，将重复性工作交给智能体，让创作者能专注于内容创作本身。

**3. 抓住时机，提高曝光机会**

热点具有明显的时效性，越早参与讨论，获得的曝光机会就越多。自动化热点监控系统能在热点刚出现时就发出提醒，帮助创作者抢占先机。比起等热点完全爆发后再跟进，提前布局能获得更多流量红利和平台算法青睐。

**4. 发现内容机会，避免同质化**

热点监控不只是追踪已经爆发的话题，更重要的是发现潜在新兴热点。通过分析热点数据，创作者可以识别尚未被充分挖掘的内容机会，避开同质化竞争，找到差异化表达角度，从而在激烈的内容竞争中脱颖而出。

### 2 热点监控智能体搭建流程

智能体的搭建流程主要分为两个步骤：梳理工作流和设置智能体。

**1、梳理工作流**

热点监控工作流是一套自动化信息采集和处理系统，能将人工需要几小时甚至几天完成的工作压缩至几分钟内自动完成。这一工作流主要包含三大环节：

**（1）根据关键词，批量获取热门视频**

系统根据预设的关键词（如行业热词、产品名称、竞品信息等），自动从抖音、小红书等平台搜索相关视频。这一步骤替代了手动搜索和浏览结果的过程，大幅提高效率。

**（2）批量获取视频详细信息**

获取视频列表后，系统进一步抓取每个视频的详细数据，包括：

- 基础信息：视频ID、标题、链接、发布时间、视频时长等
- 互动数据：点赞数、评论数、收藏数、分享数等关键指标
- 创作者信息：作者名称、用户ID、个人简介等

这些数据是分析视频热度和受欢迎程度的关键指标，也是判断内容价值的重要依据。系统将这些零散数据整合成结构化信息，便于后续分析。

**（3）将数据添加到多维表格**

最后，系统将处理好的数据自动导入到预设的飞书多维表格中。

通过这样的自动化处理，我们能建立一个实时更新的热点内容库，随时查看行业动态，发现爆款选题灵感。

这种工作流显著减轻了运营人员的工作负担，让我们能将更多精力投入到内容创作和策略制定上。

**2、设置智能体**

完成工作流搭建后，我们需要创建一个热点监控智能体来执行这个工作流。智能体设置过程分为三个关键步骤：

1. 设置人设与逻辑：配置智能体的特征、回复风格和决策逻辑
2. 绑定工作流：将工作流与智能体关联，赋予它执行具体任务的能力
3. 测试并发布：进行全面功能测试，确认一切正常后将智能体正式发布到生产环境

完成这三个步骤后，我们就成功搭建了一个热点监控智能体。

### 3 抖音热点监控工作流

前面我们详细介绍了热点监控的重要性和智能体搭建的基本流程，接下来我们将深入了解如何实际搭建一个抖音热点监控工作流。

登录Coze官网，在“资源库-工作流”里新建一个空白工作流，取名“fetch_douyin_hot_videos”。

工作流整体预览如图所示。

![image.png](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122453Z-8bbebb62e7f933e5-ca17d1ba.jpg)

**1、开始节点**

这里用于定义工作流启动时所需的输入参数。如图6-2所示。

- 输入：
    - keywords：用于搜索热点的关键词，可以是产品名称、行业术语、竞品名称或热门话题，系统会自动搜索相关的热门内容

![image.png](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122454Z-13977ce9901f693d-13a34340.jpg)

**2、插件节点：根据关键词，批量获取热门视频**

我们将使用"视频搜索"插件的"douyin_search"工具。通过这个功能，我们可以根据关键词批量获取热门视频。

- 输入：
    - api_token：这里需要填入你的API密钥，可以从插件的官方平台获取，它是调用视频数据的重要凭证，相当于你的身份证明
    - keyword：关键词，从开始节点获取
    - page：获取第几页的内容
    - publish_time：发布时间，可用值为_0(不限)、_1(一天之内)、_7(一周之内)、_180(半年之内)，这里我们选择_7
    - sort_type：排序类型，可用值：_0(综合)、_1(最多点赞)、_2(最新发布)，这里我们选择_1

![image.png](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122500Z-d805842d6dae5dfc-03d8f510.jpg)

**4、批处理节点：批量获取视频详细信息**

批量获取视频详细信息是工作流中的核心节点，它负责将上一步骤中获取的视频列表进一步深入处理，获取每个视频的完整信息。

- 输入：
    - 并行运行数量：设置适当的并行数量可提高工作流执行效率，设置为1则按顺序串行执行
    - 批处理次数上限：批处理操作不会超过这个设定的最大次数
    - aweme_list：从"根据关键词，批量获取热门视频"节点输出中，选择data，类型为Array

![image.png](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122455Z-4873da3f489a4d5d-4077d464.jpg)

**5、批处理体内插件节点：获取单个视频详细信息**

接下来，我们需要添加批处理体内的节点。我们将使用"视频搜索"插件的douyin_data工具，通过这个功能可以根据抖音视频链接获取视频的详细信息。

- 输入：
    - api_token：API密钥
    - douyin_url：从"批量获取视频详细信息"节点的输出中，选择share_url

![image.png](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122459Z-b8c92363741fa9bf-58a044cc.jpg)

**6、批处理体内代码节点：将视频详情整合进视频列表中**

这一步将从抖音API获取的详细视频信息与之前收集的视频列表数据合并。

通过这个过程，我们能掌握每个视频的完整信息，包括互动数据（点赞、评论、收藏数）、创作者信息和内容详情，从而为后续分析提供全面的数据基础。

- 输入：
    - aweme_detail：从"获取单个视频详细信息"节点的输出中，选择aweme_detail
    - aweme：从"批量获取视频详细信息"节点的输出中，选择item
- 输出：
    - aweme_list：变量类型设置为 Array 对象数组，表示处理后的视频列表

![image.png](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122606Z-5c2492eef6558fb3-a629228c.jpg)

下面是处理数据的Python代码，它会将视频信息转换成我们需要的格式。

```python
async def main(args: Args) -> Output:
    params = args.params
    aweme_detail = params.get("aweme_detail", {})
    aweme = params.get("aweme", {})
    aweme["aweme_detail"] = aweme_detail

    ret: Output = {
        "aweme_list": [aweme]
    }
    return ret
```

**7、批处理体内代码节点：将信息整理为飞书表格可以使用的数据**

在这个环节中，我们会提取视频的核心信息（如标题、点赞数、评论数等），并将它们转换成飞书表格能够直接识别和处理的格式。

- 输入：
    - aweme_list：从"将视频详情整合进视频列表中"节点的输出中，选择aweme_list
    - keywords：从开始节点中，选择keywords
- 输出：
    - records：处理后的表格数据，选择Array类型

![image.png](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122606Z-b69e073e3f1edf1d-e9d8abbd.jpg)

下面是处理数据的Python代码，这段代码非常重要，它负责将抖音API返回的原始数据转换成结构化的表格数据。

```python
async def main(args: Args) -> Output:
    params = args.params
    aweme_list = params.get("aweme_list", [])

    result = []

    # 遍历 aweme_list，依次处理
    for aweme in aweme_list:

        # 获取 aweme_detail 并判空
        aweme_detail = aweme.get("aweme_detail") or {}
        title = aweme_detail.get("desc") or ""
        link = aweme_detail.get("share_url") or ""

        # 安全获取 statistics
        statistics = aweme_detail.get("statistics") or {}

        # 提取各字段信息，并在取值时加默认值
        video_id = statistics.get("aweme_id") or ""
        digg_count = statistics.get("digg_count") or 0
        comment_count = statistics.get("comment_count") or 0
        collect_count = statistics.get("collect_count") or 0
        share_count = statistics.get("share_count") or 0

        # 获取作者信息
        author_info = aweme_detail.get("author") or {}
        author_name = author_info.get("nickname") or ""
        signature = author_info.get("signature") or ""
        sec_uid = author_info.get("sec_uid") or ""
        raw_create_time = aweme_detail.get("create_time", 0)
        # 如果不是 int，就尝试转换，失败则为 0
        try:
            create_time = int(raw_create_time)
        except (TypeError, ValueError):
            create_time = 0

        # 创建时间以毫秒计，避免 None 或非法值导致报错
        create_time_ms = create_time * 1000

        raw_duration = aweme_detail.get("duration", 0)
        # 如果不是数字，尝试转换为 float，失败则为 0
        try:
            duration = float(raw_duration)
        except (TypeError, ValueError):
            duration = 0.0
        duration_sec = duration / 1000

        # 组装返回数据
        item_dict = {
            "fields": {
                "视频ID": video_id,
                "标题": title.strip(),
                "关键词": params.get("keywords", ""),
                "链接": {
                    "text": "查看视频",
                    "link": link.strip(),
                },
                "点赞数": digg_count,
                "评论数": comment_count,
                "收藏数": collect_count,
                "分享数": share_count,
                "作者": author_name,
                "用户简介": signature,
                "用户ID": sec_uid,
                "发布日期": create_time_ms,  # 毫秒级时间戳
                "时长": duration_sec        # 秒
            }
        }
        result.append(item_dict)

    return result
```

**8、批处理体内插件节点：将数据添加到多维表格**

首先，我们需要创建一个多维表格并设置好表头字段，为后续数据采集做好准备。这个表格是存储和分析抖音热点视频数据的核心，因此表头设计至关重要。我们应包含视频ID、标题、点赞数、评论数等关键信息，便于后期分析和筛选。创建好的表格界面如下图所示。

![image.png](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122457Z-17e3d0444e10248f-adc31f4f.jpg)

选择"飞书表格"插件节点的add_records工具，将数据添加到多维表格。

![image.png](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122457Z-714d0287bb343c5c-c1f2ee07.jpg)

- 输入：
    - app_token：提前创建一个多维表格，将多维表格的链接复制进去。
    - records：从"将信息整理为飞书表格可以使用的数据"的输出变量中，选择records。
    - table_id：多维表格数据表的唯一标识符，如图6-10所示。

![image.png](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122605Z-80bed787a12d83c6-1790a19b.jpg)

**9、结束节点**

选择"返回文本"，并将回答内容设置为："获取关键词下的所有抖音视频【完成】"。

![image.png](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122453Z-22fcf4d618d3236d-26e86b31.jpg)

### 4.抖音热点监控智能体设置

到目前为止，我们已经介绍了抖音热点监控工作流的搭建过程。接下来，我们将介绍抖音热点监控智能体的设置。这个环节将工作流与智能体绑定，只有完成这一步，我们才能真正实现抖音热点监控智能体的功能。

接下来，我们将逐步指导你完成整个设置过程，包括创建智能体、配置基本参数、连接工作流以及进行测试，帮助你快速掌握这项实用技能。

**1、新建智能体**

在Coze平台创建一个新的智能体，将其命名为"抖音热点监控智能体"。

![image.png](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122455Z-73dc5b7286f0432d-ad7b7b2e.jpg)

**2、设置人设与逻辑**

设置人设与逻辑是创建智能体的关键步骤。在这一环节，我们需要明确智能体的行为模式和响应方式。

对于抖音热点监控智能体，我们希望它能直接执行任务，无需过多交互。因此，我们设置简单明了的指令，让智能体在接收到关键词后立即执行视频采集工作。

```
直接执行`fetch_douyin_hot_videos`
```

**3、绑定工作流**

把"fetch_douyin_hot_videos"工作流添加到智能体中。这个工作流是我们之前设计的抖音视频采集工作流，将它绑定到智能体后，用户只需输入关键词，智能体就会自动执行工作流，帮助我们高效地收集抖音热点视频。

![image.png](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122607Z-f02782ff4f8db9d1-1e9bae29.jpg)

**5、测试并发布**

在预览与调试窗口中输入关键词，测试智能体采集热点抖音视频的功能。系统会自动执行工作流，并将结果添加到飞书表格中。

使用不同关键词进行多次测试，确保智能体在各种情况下都能稳定运行。测试无误后，点击"发布"按钮将智能体正式发布到生产环境，供用户使用。

![image.png](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122458Z-dac547114c04fe3b-dcc75499.jpg)

### 5.小红书热点监控工作流

接下来我们将深入了解如何实际搭建一个小红书热点监控工作流。

这个工作流能帮你自动收集小红书平台上的热门内容，让你不用手动浏览就能掌握最新趋势。

我们将使用简单易懂的步骤，带你从零开始构建这个强大的监控系统，即使你没有编程经验也能轻松上手。

登录Coze官网，在“资源库-工作流”里新建一个空白工作流，取名“xhs_keywords”。工作流整体预览如图所示。

![image.png](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122454Z-5c860c5d4c84ee0c-d849f8b7.jpg)

**1、开始节点**

这里用于定义工作流启动时所需的输入参数。

- 输入：
    - foldUrl：飞书表格链接，需要提前创建好一个飞书多维表格，并复制其链接。该表格将用于存储我们采集到的小红书热点视频
    - cookie：小红书网站的cookie信息，这是访问小红书API的必要凭证，我们将在后面详细讲解如何获取
    - keywords：用于搜索热点的关键词，可以是产品名称、行业术语、竞品名称或热门话题，系统会自动搜索相关的热门内容

![image.png](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122458Z-8a57a39fa3d80e7d-4bf886ce.jpg)

**2、如何获取小红书cookie**

在Chrome浏览器中，登录小红书主页：[https://www.xiaohongshu.com/](https://www.xiaohongshu.com/)

按F12键打开开发者工具面板，然后按照以下步骤操作：

- 第一步：点击「网络」选项卡
- 第二步：点击「文档」标签
- 第三步：点击「explore」文档
- 第四步：点击「标头」选项卡
- 第五步：滚动页面找到Cookie字段，复制整段Cookie信息。

![image.png](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122459Z-75c05525780be49f-1fb00704.jpg)

**2、插件节点：根据关键词获取笔记**

我们将使用“小红书”插件的xhs_search_note工具。通过这个功能，我们可以根据关键词，批量获取热门视频。

![image.png](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122605Z-8f4bc9785db20f18-39e7d1bb.jpg)

- 输入：
    - cookieStr：开始节点的 cookie
    - keywords：关键词，从开始节点获取
    - notType：查询类型（0=全部，1=视频，2=图文），这里我们选择1 视频类型
    - sort：排序（默认为综合，0=综合，1=最新，2=最热），这里我们选择2 最热
    - totalNumber：查询总数，这里我们输入20

**3、循环节点：循环获取笔记详情**

循环获取笔记详情是工作流中的关键环节，它使我们能够一次性处理多条小红书笔记。从搜索结果中获取笔记链接后，我们需要逐一获取每条笔记的详细信息，包括标题、内容、作者和点赞数等。

- 输入：
    - input：从"根据关键词获取笔记"节点的输出中，选择 data

![image.png](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122607Z-dc584b91d90fb45b-36ab116b.jpg)

**4、循环体内插件节点：获取笔记详情**

我们将使用小红书插件的xhs_note_detail工具。该工具能获取每条笔记的完整信息，包括标题、内容、作者信息和互动数据等。

![image.png](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122458Z-c44a701b65c9ed77-2640df1f.jpg)

- 输入
    - cookieStr：开始节点的 cookie
    - noteUrl：从 “循环笔记详情” 节点的输出中，选择 noteUrl

**5、循环体内插件节点：提取视频文案**

我们将使用"字幕获取"插件的generate_video_captions_sync工具。该工具能自动从视频中提取文字内容，将口述转换为文本，省去手动听写的麻烦。它能精准识别视频中的语音并生成文字记录，帮助我们快速理解视频的主题和关键信息。

输入：

- url：从"获取笔记详情"节点的输出中，选择 video_h264_url，表示H264标准编码格式视频链接
- lang：视频语言，如汉语、英语等，不填时默认为汉语

![image.png](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122459Z-f88f54d00bf69614-b2801880.jpg)

**6、循环体内代码节点：将笔记数据整理成飞书表格格式**

这一步将采集到的视频信息转换为标准化数据结构，以便写入飞书表格。我们需要提取视频的标题、内容、作者和点赞数等关键信息，并按飞书表格要求进行格式化。这样不仅便于数据整理和筛选，还能帮助我们更直观地分析热门内容的特点。

- 输入
    - input：从"获取笔记详情"节点的输出中，选择note
    - data：从"提取视频文案"节点的输出中，选择data
- 输出
    - records：变量类型设置为 Array 对象数组，表示处理后的视频列表

![image.png](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122456Z-2fbe7f0a4d81a389-ca5d7e78.jpg)

下面是处理数据的Python代码，它将采集到的小红书视频信息转换为标准格式，便于存储和分析。

代码提取视频的标题、内容、作者等关键信息，将其组织成飞书表格所需的格式，然后返回处理好的数据。这样我们能将所有热门视频整齐地存放在同一张表格中，方便后续分析：

```python
async def main(args: Args) -> Output:
    input_data = args.params.get('input')  or {}
    data = args.params.get('data') or {}

    records = []  # 初始化 records 列表

    # 提取 note 相关字段
    title = input_data.get('note_display_title', '')  # 标题
    desc = input_data.get('note_desc', '')  # 描述
    url = input_data.get('note_url', '')  # 链接
    nickname = input_data.get('auther_nick_name', '')  # 作者昵称
    likedCount = input_data.get('note_liked_count', '0')  # 点赞数
    videoUrl = input_data.get('video_h264_url', '')  # 视频地址
    collectedCount = input_data.get('collected_count', '0')  # 收藏数
    imageList = input_data.get('note_image_list', [])  # 图片列表

    # 构建记录对象
    record = {
        "fields": {
            "笔记链接": url,
            "标题": title,
            "内容": desc,
            "作者": nickname,
            "点赞数": likedCount,
            "链接": {
                "link": url,
                "text": title
            },
            "收藏数": collectedCount,
            "图片地址": '\n'.join(imageList),  # 将图片列表拼接成字符串
            "视频地址": videoUrl,
            "视频文案": data.get("content", "") 
        }
    }
    records.append(record)  # 将记录对象添加到 records 列表中

    # 构建输出对象
    ret: Output = {
        "records": records
    }
    return ret
```

**7、循环体内插件节点：写入飞书表格**

最后，我们将收集到的所有数据添加到飞书多维表格中。

我们需要提前创建一个多维表格，并设置好对应的表头字段。

![image.png](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122500Z-866f333394a2a283-a42c414e.jpg)

表头字段包括视频的所有关键信息：笔记链接、标题、内容、作者、点赞数、链接、收藏数、图片地址、视频地址和视频文案。

接下来，选择"飞书表格"插件节点的add_records工具，将采集到的数据添加到多维表格中。

![image.png](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122457Z-714d0287bb343c5c-c1f2ee07.jpg)

- 输入：
    - app_token：提前创建一个多维表格，然后将多维表格的链接复制到此处。
    - records：从"将信息整理为飞书表格可以使用的数据"节点的输出变量中，选择records。
    - table_id：需填入多维表格数据表的唯一标识符。

**8、结束节点**

最后添加结束节点，完成整个工作流程。如图6-25所示。

- 输出：
    - output：开始节点的foldUrl，也就是飞书多维表格的链接

![image.png](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122604Z-8bbebb62e7f933e5-799fe873.jpg)

### 6.小红书热点监控智能体设置

至此，我们已完成小红书热点监控工作流的搭建。接下来，我们将介绍如何设置小红书热点监控智能体。这个关键环节将工作流与智能体绑定在一起，只有完成这一步，才能真正实现小红书热点监控智能体的功能。

**1、新建智能体**

在Coze平台创建一个新的智能体，命名“小红书热点监控智能体”。如图6-26所示。

![image.png](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122456Z-53ced557428736d7-5a6c660b.jpg)

**2、设置人设与逻辑**

设置人设与逻辑是创建智能体的关键步骤。在这一环节，我们需要明确智能体的行为模式和响应方式。

对于小红书热点监控智能体，我们希望它能直接执行任务，无需过多交互。因此，我们设置简单明了的指令，让智能体在接收到关键词后立即执行视频采集工作。

```
直接执行`xhs_keywords`
```

**3、绑定工作流**

把"xhs_keywords"工作流添加到智能体中。

![image.png](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122454Z-1bf62f7bfd21cc27-b502def0.jpg)

**4、测试并发布**

在预览与调试窗口中输入关键词，测试智能体的小红书热点视频采集功能。系统会自动执行工作流，并将结果直接添加到飞书表格中。

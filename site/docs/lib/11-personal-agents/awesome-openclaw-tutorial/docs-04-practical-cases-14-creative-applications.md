---
title: "第14章节 创意应用实战（图片、视频、音乐、TTS、ComfyUI）"
sourceId: "11-personal-agents/awesome-openclaw-tutorial"
sourceTitle: "Awesome OpenClaw Tutorial（中文）"
sourceKind: "清单与速查"
licenseLabel: "可转载"
lang: "中文"
tier: 2
volume: "11-personal-agents"
sourceUrl: "https://github.com/xianyu110/awesome-openclaw-tutorial"
entryUrl: "https://github.com/xianyu110/awesome-openclaw-tutorial/blob/0b0943dc41725e80d64f7f8d745d185e7752be4d/docs/04-practical-cases/14-creative-applications.md"
sourceRel: "docs/04-practical-cases/14-creative-applications.md"
rawUrl: "/raw/11-personal-agents/awesome-openclaw-tutorial/docs/04-practical-cases/14-creative-applications.md"
sourceSha256: "d8e929c5b09ef2cf68da197a2f0c7ec314a232b34d8611a6427ab867ba340fa9"
pageSha256: "d8e929c5b09ef2cf68da197a2f0c7ec314a232b34d8611a6427ab867ba340fa9"
contentMode: "local-full"
zh: ""
---

# 第14章节 创意应用实战（图片、视频、音乐、TTS、ComfyUI）

> 本章目标：把旧教程里零散的“画图 / 视频 / 语音 / 第三方 Skill”写法，收束成 OpenClaw 当前官方支持的媒体工作流。

---

## 版本基线

- **当前稳定版**：`v2026.9.3`（2026-09-08 发布）
- 本章默认按 `v2026.9.3` 稳定版写；所有创意能力优先参考官方媒体能力矩阵

---

## 先给小白的阅读说明

### 如果你只是想先做出一个结果，别整章都看

- **想先出一张图**：直接看 `14.2`
- **想先生成语音**：直接看 `14.4.2`
- **想先试视频**：直接看 `14.3`，但要知道视频是异步任务
- **想做本地可控工作流**：最后再看 `14.5` 的 ComfyUI

### 开始前要先知道的 2 件事

1. 图片和 TTS 通常是**同步返回**，比较适合新手先试
2. 视频和音乐通常是**后台异步任务**，所以不要以为“命令没立刻吐文件就是失败”

### 小白最容易误会的地方

- 把“图片理解模型”当成“图片生成模型”
- 不知道视频生成要去 `tasks` 里看状态
- 看见 provider 很多，就误以为每个都必须配置

---

## 14.1 先记住这张官方媒体能力图谱

OpenClaw 当前的媒体能力不是零散插件，而是一套共享能力层：

| 能力 | 工具 / 命令 | 常见 provider | 说明 |
|------|-------------|---------------|------|
| 图片生成 | `image_generate` / `openclaw infer image generate` | ComfyUI、fal、Google、MiniMax、OpenAI、Vydra | 文生图、参考图编辑 |
| 视频生成 | `video_generate` / `openclaw infer video generate` | Alibaba、BytePlus、ComfyUI、fal、Google、MiniMax、OpenAI、Qwen、Runway、Together、Vydra、xAI | 文生视频、图生视频、视频转视频 |
| 音乐生成 | `music_generate` | ComfyUI、Google、MiniMax | 生成音乐 / 音轨 |
| TTS | `tts` / `openclaw infer tts convert` | ElevenLabs、Microsoft、MiniMax、OpenAI | 把文本转成语音 |
| 媒体理解 | `image describe` / `audio transcribe` / `video describe` | 各类多模态 provider | 读图、读音频、读视频 |

最重要的两点：

1. **图片和 TTS 更偏同步**
2. **视频和音乐是异步后台任务**，会进入 task ledger，完成后再唤醒 agent 把结果发回原会话

---

## 14.2 图片工作流：现在应该怎么做

### 14.2.1 命令行直出图

如果你是第一次试媒体能力，强烈建议从这里开始，因为它反馈最快，也最容易判断到底是提示词问题，还是 provider 没配好。

```bash
openclaw infer image generate   --prompt "一张手写白板风格的 OpenClaw 自动化架构图"   --json
```

适合：

- 教程配图
- 封面图
- 白板图
- 社交媒体海报
- 结构示意图

#### 看到什么算图片能力已经跑通

- 命令能返回 JSON 结果或文件输出信息
- 生成效果不满意时，你知道先改提示词，而不是先怀疑整套系统坏了
- 你已经能分清“命令行直出图”和“会话里让 agent 自动调工具”这两种方式

### 14.2.2 对话里直接让 agent 生成

```text
帮我生成一张白板手写风格的配图，主题是“从 cron 到 Task Flow 的自动化升级路径”。
```

如果 `image_generate` 已可用，agent 会自动调用对应工具。相比旧教程里的历史 Skill 名称，这才是当前默认主线。

### 14.2.3 什么时候要单独配 `imageGenerationModel`

当你满足下面任一情况时，建议手动指定：

- 团队里统一使用某个 provider
- 你想严格控制成本
- 你不希望 OpenClaw 自动推断 provider

```json
{
  "agents": {
    "defaults": {
      "imageGenerationModel": {
        "primary": "openai/gpt-image-1"
      }
    }
  }
}
```

---

## 14.3 视频工作流：理解“异步返回”很关键

### 14.3.1 最短可用示例

视频生成比图片慢很多，所以你第一次测视频时，目标不是“直接出大片”，而是先确认任务能成功入账并最终完成。

```bash
openclaw infer video generate   --prompt "一段 5 秒的电影感镜头：桌面上的 OpenClaw 仪表盘正在更新任务状态"   --json
```

### 14.3.2 当前视频工作流的正确心智模型

视频生成不是“一条命令马上拿到 mp4”。更准确的过程是：

1. OpenClaw 把请求发给 provider
2. provider 返回任务 id
3. 任务进入 background task ledger
4. 完成后 OpenClaw 唤醒原会话，把视频回贴回来

所以你需要学会看：

```bash
openclaw tasks list

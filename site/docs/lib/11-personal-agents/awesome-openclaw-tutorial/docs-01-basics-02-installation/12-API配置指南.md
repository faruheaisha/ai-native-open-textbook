---
title: "Awesome OpenClaw Tutorial（中文）"
sourceId: "11-personal-agents/awesome-openclaw-tutorial"
sourceTitle: "Awesome OpenClaw Tutorial（中文）"
sourceKind: "清单与速查"
licenseLabel: "可转载"
lang: "中文"
tier: 2
volume: "11-personal-agents"
sourceUrl: "https://github.com/xianyu110/awesome-openclaw-tutorial"
entryUrl: "https://github.com/xianyu110/awesome-openclaw-tutorial/blob/0b0943dc41725e80d64f7f8d745d185e7752be4d/docs/01-basics/02-installation.md"
sourceRel: "docs/01-basics/02-installation.md"
rawUrl: "/raw/11-personal-agents/awesome-openclaw-tutorial/docs/01-basics/02-installation.md"
sourceSha256: "ad38987b0e0a4f1aa9ff89c15af14b56823a0c189f58e461da221a3dd919f40b"
pageSha256: "b3f0189ee6bbc9807888f95e53b920a4eb190ed976eea7307ada6e1e3e7d2afd"
contentMode: "local-full"
zh: ""
---

## API配置指南

> OpenClaw需要连接AI模型才能工作，推荐使用**国产大模型**，性价比高。

### 为什么需要API？

OpenClaw本身不包含AI模型，需要连接第三方API：
- 官方API：价格贵、国内访问困难
- 第三方API：价格便宜、国内直连

### API模型分类

OpenClaw支持两种类型的API模型配置：

#### 1. 内置 API 模型（推荐新手）

**什么是内置API模型？**

OpenClaw已经预先配置好了多个主流AI模型的连接方式，你只需要：
- ✅ 获取API Key
- ✅ 在配置向导中选择对应模型
- ✅ 粘贴API Key即可使用

**支持的内置模型**：

OpenClaw内置支持非常多的API模型，包括但不限于：

![内置API模型列表](https://upload.maynor1024.live/file/1770957195044__null_)

**国内模型**（推荐）：
- 🌙 **Moonshot AI (Kimi)**：长文本专家，200万字上下文
- 🧠 **DeepSeek**：性价比之王，推理能力强
- 🎯 **智谱GLM**：中文理解好，多模态支持
- 🚀 **通义千访问 (Qwen)**：阿里出品，稳定可靠
- 🎨 **MiniMax**：对话自然，创意能力强
- 📚 **百度文心**：中文语料丰富
- 🔥 **字节豆包**：性价比高

**国外模型**：
- 🤖 **OpenAI (GPT-4/GPT-3.5)**：最强大但价格贵
- 🦙 **Anthropic (Claude)**：推理能力强，安全性高
- 🔷 **Google (Gemini)**：多模态能力强
- 🌐 **Groq**：推理速度快

**优势**：
- ✅ 配置简单，无需手动编写配置文件
- ✅ 参数已优化，开箱即用
- ✅ 自动更新，跟随OpenClaw版本
- ✅ 适合新手，降低使用门槛

**使用场景**：
- 🎯 新手用户快速上手
- 🎯 使用主流大模型
- 🎯 不想折腾配置文件

#### 2. 自定义 API（进阶用户）

**什么是自定义API？**

如果你想使用：
- 🔧 OpenClaw未内置的模型
- 🔧 自己搭建的模型服务
- 🔧 第三方API代理服务
- 🔧 企业内部的模型接口

就需要使用自定义API配置。

**配置方式**：

需要手动编辑配置文件 `~/.openclaw/openclaw.json`，指定：
- `baseUrl`：API服务地址
- `apiKey`：认证密钥
- `api`：API协议类型（如 `openai-chat`、`anthropic-messages`）
- `models`：模型列表和参数

**优势**：
- ✅ 灵活性高，支持任何兼内容的API
- ✅ 可以使用小众模型
- ✅ 可以自定义模型参数
- ✅ 适合企业定制化需求

**劣势**：
- ⚠️ 配置复杂，需要了解JSON格式
- ⚠️ 需要手动维护配置
- ⚠️ 参数错误可能导致无法使用

**使用场景**：
- 🎯 进阶用户
- 🎯 使用非主流模型
- 🎯 企业内部部署
- 🎯 需要精细控制参数

### 配置方式对比

两种配置方式的对比如表 2-6 所示。

**表 2-6 API 配置方式对比**

| 特性 | 内置API模型 | 自定义API |
|------|------------|-----------|
| 适用人群 | 新手 | 进阶用户 |
| 模型选择 | 主流模型 | 任意模型 |
| 配置方式 | 向导选择 | 手动编辑 |
| 维护成本 | 低 | 高 |
| 灵活性 | 中 | 高 |

### 推荐配置路径

**新手推荐**：
```
1. 使用内置API模型
2. 选择国产模型（如 Kimi、DeepSeek）
3. 通过 openclaw onboard 向导配置
4. 先体验，熟悉后再考虑自定义
```

**进阶用户**：
```
1. 先用内置API模型熟悉OpenClaw
2. 了解配置文件结构
3. 根据需求添加自定义API
4. 测试验证后投入使用
```
---

### 自定义API配置（进阶用户）

> ⚠️ **适合人群**：进阶用户、需要使用非主流模型、企业定制化需求

#### 什么时候需要自定义API？

如果你遇到以下情况，需要使用自定义API配置：

1. **使用非内置模型**：
   - OpenClaw未内置的小众模型
   - 新发布布的模型（OpenClaw还未更新）
   - 区域限定的模型

2. **使用第三方代理**：
   - API代理服务（如 OpenRouter、API2D）
   - 企业内部的API网关
   - 自建的模型服务

3. **精细控制参数**：
   - 自定义模型参数
   - 调整上下文窗口大小
   - 修改默认配置

#### 配置文件位置

> 📖 **详细说明**: 完整的配置文件结构和使用指南请参考 [配置文件结构完整指南](/lib/11-personal-agents/awesome-openclaw-tutorial/docs-config-file-structure)

```bash
# 配置文件路径
~/.openclaw/openclaw.json

# 编辑配置文件
nano ~/.openclaw/openclaw.json
```

#### 配置文件结构

```json
{
  "models": {
    "mode": "merge",
    "providers": {
      "你的供应商名称": {
        "baseUrl": "API服务地址",
        "apiKey": "你的API 密钥",
        "auth": "认证方式",
        "api": "API协议类型",
        "models": [
          {
            "id": "模型ID",
            "name": "模型显示名称",
            "contextWindow": 上下文窗口大小,
            "maxTokens": 最大输出tokens
          }
        ]
      }
    }
  },
  "agents": {
    "defaults": {
      "model": {
        "primary": "供应商名称/模型ID"
      }
    }
  }
}
```

#### 示例1：配置DeepSeek（自定义方式）

```json
{
  "models": {
    "mode": "merge",
    "providers": {
      "deepseek": {
        "baseUrl": "https://api.deepseek.com",
        "apiKey": "sk-你的API 密钥",
        "auth": "api-key",
        "api": "openai-chat",
        "models": [
          {
            "id": "deepseek-chat",
            "name": "DeepSeek Chat",
            "contextWindow": 64000,
            "maxTokens": 4096
          },
          {
            "id": "deepseek-coder",
            "name": "DeepSeek Coder",
            "contextWindow": 64000,
            "maxTokens": 4096
          }
        ]
      }
    }
  },
  "agents": {
    "defaults": {
      "model": {
        "primary": "deepseek/deepseek-chat"
      }
    }
  }
}
```

#### 示例2：配置第三方API代理

如果你使用API代理服务（如OpenRouter），配置如下：

```json
{
  "models": {
    "mode": "merge",
    "providers": {
      "openrouter": {
        "baseUrl": "https://openrouter.ai/api/v1",
        "apiKey": "sk-or-v1-你的密钥",
        "auth": "api-key",
        "api": "openai-chat",
        "models": [
          {
            "id": "anthropic/claude-3.5-sonnet",
            "name": "Claude 3.5 Sonnet",
            "contextWindow": 200000,
            "maxTokens": 8192
          },
          {
            "id": "openai/gpt-4",
            "name": "GPT-4",
            "contextWindow": 128000,
            "maxTokens": 4096
          }
        ]
      }
    }
  },
  "agents": {
    "defaults": {
      "model": {
        "primary": "openrouter/anthropic/claude-3.5-sonnet"
      }
    }
  }
}
```

#### 示例3：配置多个模型供应商

你可以同时配置多个供应商，根据需要切换：

```json
{
  "models": {
    "mode": "merge",
    "providers": {
      "deepseek": {
        "baseUrl": "https://api.deepseek.com",
        "apiKey": "sk-你的DeepSeek密钥",
        "auth": "api-key",
        "api": "openai-chat",
        "models": [
          {
            "id": "deepseek-chat",
            "name": "DeepSeek Chat",
            "contextWindow": 64000,
            "maxTokens": 4096
          }
        ]
      },
      "moonshot": {
        "baseUrl": "https://api.moonshot.cn/v1",
        "apiKey": "sk-你的Kimi密钥",
        "auth": "api-key",
        "api": "openai-chat",
        "models": [
          {
            "id": "moonshot-v1-128k",
            "name": "Kimi 128K",
            "contextWindow": 128000,
            "maxTokens": 4096
          }
        ]
      }
    }
  },
  "agents": {
    "defaults": {
      "model": {
        "primary": "deepseek/deepseek-chat",
        "fallback": "moonshot/moonshot-v1-128k"
      }
    }
  }
}
```

#### 配置参数说明

| 参数 | 说明 | 示例 |
|------|------|------|
| `baseUrl` | API服务地址 | `https://api.deepseek.com` |
| `apiKey` | API 密钥 | `sk-xxx` |
| `auth` | 认证方式 | `api-key` 或 `bearer` |
| `api` | API协议 | `openai-chat`、`anthropic-messages` |
| `id` | 模型ID | `deepseek-chat` |
| `name` | 显示名称 | `DeepSeek Chat` |
| `contextWindow` | 上下文窗口 | `64000` |
| `maxTokens` | 最大输出 | `4096` |

#### 常见API协议类型

- `openai-chat`：OpenAI兼内容接口（最常用）
- `anthropic-messages`：Anthropic Claude接口
- `google-generative-ai`：Google Gemini接口
- `azure-openai`：Azure OpenAI接口

#### 配置后重启服务

```bash
# 方式1：重启Gateway
openclaw gateway restart

# 方式2：停止后重新启动
systemctl --user stop openclaw-gateway.service
systemctl --user start openclaw-gateway.service

# 方式3：完全重启
systemctl --user restart openclaw-gateway.service
```

#### 验证配置

```bash
# 查看当前配置的模型
openclaw models list

# 测试模型连接
openclaw models test deepseek/deepseek-chat
```

#### 常见访问题

**Q1：配置后无法连接？**
```
检查项：
✅ baseUrl是否正确
✅ apiKey是否有效
✅ 网络是否能访问API地址
✅ 配置文件JSON格式是否正确
```

**Q2：如何切换模型？**
```bash
# 临时切换
openclaw agent --message --model deepseek/deepseek-chat

# 永久切换：修改配置文件中的 primary 字段
```

**Q3：如何添加多个模型？**
```
在 models 数组中添加多个模型对象即可
每个模型需要有唯一的 id
```
---

### 内置API模型配置（推荐新手）

> 💡 **适合人群**：新手用户、想要快速上手的用户

以下是几个常用的内置API模型配置教程，选择一个你喜欢的即可。

#### 1. Kimi 2.5 配置（推荐）

**特点**：
- 📚 **超长上下文**：支持200万字
- 📄 **长文档处理**：论文、报告分析专家
- 🎯 **中文理解好**：适合中文场景
- 💰 **套餐划算**：重度使用建议购买套餐

**配置步骤**：

**第一步：访问Kimi Code平台**

访问：https://www.kimi.com/code

![Kimi Code平台](https://upload.maynor1024.live/file/1770957261204__null_-20260213123415103._null_)

**第二步：购买套餐（可选）**

> 💡 **提示**：OpenClaw消耗token较大，建议购买套餐更划算。

推荐套餐：
- **Allegretto套餐**：适合日常使用
- 按需选择其他套餐

![购买套餐](https://my.feishu.cn/space/api/box/stream/download/asynccode/?code=Mzk3ODdjZjE0NDY3Y2NkMTU1ZDZmMzg4YTAwYTg3ZDdfV3haZXdRMEU5OENVN0RCTzBwbmp2U2M5dU1XSm9MMWdfVG9rZW46Q0dYQWJ5NzRVbzB4MWt4b09QRmNwckUybm1lXzE3NzA5NTcyMzY6MTc3MDk2MDgzNl9WNA)

**第三步：创建API Key**

1. 打开控制台
2. 创建API Key
3. 名称随便取

![创建API Key](https://upload.maynor1024.live/file/1770957262024__null_-20260213123418045._null_)

**第四步：保存API Key**

⚠️ **重要**：这个API Key一定要复制并保存！点击"完成"后就无法再查看了。

![保存API Key](https://upload.maynor1024.live/file/1770957271422__null_-20260213123420103._null_)

**第五步：配置到OpenClaw**

```bash
# 运行配置向导
openclaw onboard

# 配置流程：
# 1. 选择 QuickStart
# 2. 选择模型供应商：Moonshot AI
# 3. 粘贴刚才复制的API Key
# 4. 选择默认模型：kimi-code/kimi-for-codi
# 5. 完成其他配置
```

**成本估算**：
- 轻度使用：10-20元/月
- 中度使用：30-50元/月
- 重度使用：建议购买套餐

---

#### 2. DeepSeek 配置（性价比之王）

**特点**：
- 💰 **最便宜**：输入0.001元/千tokens
- 🧠 **推理能力强**：适合复杂任务
- 💻 **编程能力出色**：代码生成质量高

**配置步骤**：

**第一步：注册并充值**

访问：https://platform.deepseek.com/

> ⚠️ **注意**：DeepSeek采用按量付费，账户余额必须大于0才能调用API。

![DeepSeek平台](https://upload.maynor1024.live/file/1770957195044__null_)

**第二步：充值账户**

建议先充值10元试用：

![充值账户](https://my.feishu.cn/space/api/box/stream/download/asynccode/?code=OWU5ZGEzMDE0Y2YyNDhhOTYwZjliNWY0OTM1YjgzMmVfa0dlYzNvMzFvUDVuY0J3cWZ6b3VDUkNLRHpKbmhHSURfVG9rZW46UmZuamJDV29vb0Q2bXl4VHUwcWNxYWFRbnZ1XzE3NzA5NTcxNjg6MTc3MDk2MDc2OF9WNA)

**第三步：创建API Key**

1. 保证账号有余额
2. 点击"API keys"
3. 点击"创建API key"

![创建API Key](https://upload.maynor1024.live/file/1770957195220__null_-20260213123309627._null_)

**第四步：保存API Key**

⚠️ **重要**：API Key只显示一次，务必复制保存！

名称随便取，复制API Key后妥善保存。

![保存API Key](https://upload.maynor1024.live/file/1770957204667__null_-20260213123316852._null_)

**第五步：配置到OpenClaw**

```bash
# 运行配置向导
openclaw onboard

# 配置流程：
# 1. 选择 QuickStart
# 2. 选择模型供应商：DeepSeek
# 3. 粘贴API Key
# 4. 选择默认模型：deepseek-chat
# 5. 完成其他配置
```

**成本估算**：
- 日常使用：5-10元/月
- 中度使用：10-30元/月
- 重度使用：30-50元/月

---

### 国产大模型配置（其他选项）

#### 1. DeepSeek配置（性价比之王）

**特点**：
- 💰 **最便宜**：输入0.001元/千tokens
- 🧠 **推理能力强**：适合复杂任务
- 💻 **编程能力出色**：代码生成质量高

 DeepSeek 的 API 调用是**按量付费**的，你的账户余额必须大于 0 才能正常调用接口。

 如果账户没钱或余额不足，API 请求会直接失败，所以提前充值是保证服务可用的必要操作。

 其他大模型也是同理，你要去找到对应网址去充值，然后获取API keys

![img](https://upload.maynor1024.live/file/1770957195044__null_)

 如果你只想先尝，可以就先花个10块钱玩一下

![img](https://upload.maynor1024.live/file/1770961892504__null_-20260213135123663._null_)

 保证账号有余额之后，点击”API keys“，然后点”创建 API key“

![img](https://upload.maynor1024.live/file/1770961848240_1770957195220__null_-20260213123309627._null_)

 API key的名称：随便取。然后这个APIkey一定！一定！要复制下来，因为一般你点完”关闭“之后，你就再也无法查看你的API key了，如果你我忘记了你的API key，那只能重新创建一个了。

 复制完后，找地方先存起来，后续在”第四步：OpenClaw 配置“的时候会用到

![img](https://upload.maynor1024.live/file/1770957204667__null_-20260213123316852._null_)

好，至此”第二步：配置模型“完成，进入”第三步：配置Bot“吧

**配置步骤**：

1. **注册账号**：
   ```
   访问：https://platform.deepseek.com/
   注册并登录
   ```

2. **获取API Key**：
   
   ```
   进入"API管理"
   点击"创建API Key"
   复制API Key（格式：sk-xxx）
   ```
   
3. **配置到OpenClaw**：
   ```bash
   # 编辑配置文件
   nano ~/.openclaw/openclaw.json
   ```

   添加配置：
   ```json
   {
     "models": {
       "mode": "merge",
       "providers": {
         "deepseek": {
           "baseUrl": "https://api.deepseek.com",
           "apiKey": "sk-你的API 密钥",
           "auth": "api-key",
           "api": "openai-chat",
           "models": [
             {
               "id": "deepseek-chat",
               "name": "DeepSeek Chat",
               "contextWindow": 64000,
               "maxTokens": 4096
             }
           ]
         }
       }
     },
     "agents": {
       "defaults": {
         "model": {
           "primary": "deepseek/deepseek-chat"
         }
       }
     }
   }
   ```

4. **重启Gateway**：
   ```bash
   openclaw gateway restart
   ```

**成本估算**：
- 日常使用：5-10元/月
- 中度使用：10-30元/月
- 重度使用：30-50元/月

#### 2. Kimi配置（长文本专家）

**特点**：
- 📚 **超长上下文**：支持200万字
- 📄 **长文档处理**：论文、报告分析专家
- 🎯 **中文理解好**：适合中文场景

 那如何使用，第一步，搜索 kimi code：https://www.kimi.com/code

![img](https://upload.maynor1024.live/file/1770957261204__null_-20260213123415103._null_)

 第二步，购买优惠套餐 plan，说实话，目前 OpenClaw 消耗 token 还挺大的，最好买个套餐划算一些，我买的是 Allegretto 套餐。

![img](https://upload.maynor1024.live/file/1770961947439__null_-20260213135221938._null_)

 第二步，打开控制台，创建 API key。名字随便取。

![img](https://upload.maynor1024.live/file/1770957262024__null_-20260213123418045._null_)

 这个APIkey一定！一定！要复制下来，因为一般你点完”完成“之后，你就再也无法查看你的API key了，如果你忘记了你的API key，那就只能重新创建一个了。复制完后，找地方先存起来，后续在”第四步：OpenClaw 配置“的时候会用到

![img](https://upload.maynor1024.live/file/1770957271422__null_-20260213123420103._null_)

**配置步骤**：

1. **注册账号**：
   ```
   访问：https://platform.moonshot.cn/
   注册并登录
   ```

2. **获取API Key**：
   ```
   进入"API管理"
   点击"创建API Key"
   复制API Key
   ```

3. **配置到OpenClaw**：
   ```json
   {
     "models": {
       "mode": "merge",
       "providers": {
         "moonshot": {
           "baseUrl": "https://api.moonshot.cn/v1",
           "apiKey": "sk-你的API 密钥",
           "auth": "api-key",
           "api": "openai-chat",
           "models": [
             {
               "id": "moonshot-v1-8k",
               "name": "Kimi k2.5",
               "contextWindow": 8000,
               "maxTokens": 4096
             }
           ]
         }
       }
     },
     "agents": {
       "defaults": {
         "model": {
           "primary": "moonshot/moonshot-v1-8k"
         }
       }
     }
   }
   ```

**成本估算**：
- 日常使用：10-20元/月
- 中度使用：20-50元/月
- 重度使用：50-100元/月

#### 3. 其他国产大模型

| 模型 | 特点 | 价格 | 官网 |
|------|------|------|------|
| GLM-4 | 多模态能力强 | 中等 | https://open.bigmodel.cn/ |
| 文心一言 | 百度生态 | 中高 | https://cloud.baidu.com/ |
| 通义千访问 | 阿里生态 | 中等 | https://dashscope.aliyun.com/ |

### 国际模型配置（可选）

如果需要使用Claude、GPT等国际模型：

1. **直接使用官方API**（需要魔法）
2. **使用第三方API服务**（国内直连）

**推荐第三方API**：

- 价格便宜50%-70%
- 国内直连，无需魔法
- 支持支付宝、微信支付

### 成本对比

| 模型 | 输入价格 | 输出价格 | 月费用估算 |
|------|----------|----------|-----------|
| DeepSeek | 0.001元/千tokens | 0.002元/千tokens | 5-30元 |
| Kimi | 0.012元/千tokens | 0.012元/千tokens | 10-50元 |
| GLM-4 | 0.005元/千tokens | 0.005元/千tokens | 10-40元 |
| Claude（第三方） | 0.015元/千tokens | 0.075元/千tokens | 50-200元 |
| GPT-4（第三方） | 0.03元/千tokens | 0.06元/千tokens | 100-300元 |

💡 **省钱技巧**：
- 日常对话用DeepSeek（最便宜）
- 长文档用Kimi（长上下文）
- 复杂任务用Claude（质量最高）

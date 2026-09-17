---
title: "Claude Code & OpenClaw & Codex & WorkBuddy 中文教程"
sourceId: "07-coding/ai-coding-guide-zh"
sourceTitle: "Claude Code & OpenClaw & Codex & WorkBuddy 中文教程"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中文"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/KimYx0207/AI-Coding-Guide-Zh"
entryUrl: "https://github.com/KimYx0207/AI-Coding-Guide-Zh/blob/7a7c21b8e7dc976e8ade33b79ee000a172e63daf/docs/claude-code/01-Claude-Code完整安装指南.md"
sourceRel: "docs/claude-code/01-Claude-Code完整安装指南.md"
rawUrl: "/raw/07-coding/ai-coding-guide-zh/docs/claude-code/01-Claude-Code完整安装指南.md"
sourceSha256: "faa9c4a018405b1408c9cd9bbe81590453531a86b5e3100f6dba6afafac0f4bf"
pageSha256: "0b604b98927f6ba1dce8dd488f173e2155a34105daba7cc65db0447080ed40d7"
contentMode: "local-full"
zh: ""
---

## 第四部分：Anthropic 账号准备

> **💡 为什么现在就要准备API Key？**
>
> **小白常见疑问**："我还没装Claude Code，为什么先要API Key？"
>
> **答案很简单**：
> 1. Claude Code是AI助手，需要连接Anthropic的AI服务才能工作
> 2. API Key就像"通行证"，证明你有权使用AI服务
> 3. **提前准备好Key的好处**：装完Claude Code立即就能用，不用再等待
>
> **生活类比**：
> - Claude Code = 你新买的手机
> - API Key = SIM卡
> - 先办好SIM卡，手机到手插卡就能用！

> **💡 选择提示**：可选择使用**中转站**（更便宜、更稳定），或官方账号。
>
> - **中转站优势**：价格低（约官方1/3-1/2）、无需科学上网、支付方便
> - **官方账号优势**：更稳定、有免费额度、支持订阅
>
> 本课程同时讲解两种方式的配置方法。

### 4.1 注册 Anthropic 账号

**注册流程：**

1. **访问注册页面**：https://console.anthropic.com/
2. **点击"Sign Up"（注册）**
3. **选择注册方式**（三种任选其一）：

   - Google账号登录（推荐，最快）
   - 邮箱+密码注册
   - GitHub账号登录
4. **完善账号信息**：

   - 姓名：真实姓名或开发者昵称
   - 使用场景：选择"Personal Use"（个人使用）或"Business"（商业）
   - 主要编程语言：可多选
5. **手机验证（可能需要）**：

   - 支持中国大陆号码（+86）
   - 会收到6位数验证码短信
   - 如果未收到，可选择语音验证

> **注意**：国内手机号注册成功率约80%。如果多次失败，可尝试使用Google Voice虚拟号码、香港/台湾号码，或联系Anthropic支持。

### 4.2 API Key 获取步骤

**什么是API Key？**

API Key是一串密钥，作用类似密码，用于：

- 证明你有权使用Claude AI服务
- 追踪API调用次数（计费依据）
- 控制访问权限

**格式示例：**

```
sk-ant-api03-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**获取步骤：**

1. **进入API Keys页面**

   登录后点击左侧菜单：`Settings → API Keys`

   或直接访问：https://console.anthropic.com/settings/keys
2. **创建新Key**

   点击"Create Key"按钮，填写：

   - Key名称：例如"claude-code-laptop"（方便区分多个key）
   - 权限：选择"Full Access"（完全访问）
3. **复制并保存Key**

   ⚠️ **关键警告**：

   - Key只显示一次！关闭窗口后无法再看到
   - 必须立即复制并保存到安全位置
   - 不要分享给任何人

   **保存方法**：

   1. 创建文本文件 `anthropic-key.txt`
   2. 粘贴完整key
   3. 保存到电脑安全位置（如Documents文件夹）
4. **验证Key有效性**

   ```bash
   # macOS/Linux
   curl https://api.anthropic.com/v1/messages \
     -H "x-api-key: 你的API_KEY" \
     -H "anthropic-version: 2023-06-01" \
     -H "content-type: application/json" \
     -d '{
       "model": "claude-sonnet-5",
       "max_tokens": 1024,
       "messages": [{"role": "user", "content": "Hello"}]
     }'

   # 如果返回JSON响应(而不是错误),说明Key有效
   ```

   **Windows PowerShell测试：**

   ```powershell
   $headers = @{
       "x-api-key" = "你的API_KEY"
       "anthropic-version" = "2023-06-01"
       "content-type" = "application/json"
   }
   $body = '{"model":"claude-sonnet-5","max_tokens":1024,"messages":[{"role":"user","content":"Hello"}]}'
   Invoke-RestMethod -Uri "https://api.anthropic.com/v1/messages" -Method POST -Headers $headers -Body $body
   ```

### 4.3 环境变量配置

**什么是环境变量？**

环境变量是操作系统级别的配置，让程序可以读取敏感信息（如API Key），而不需要写在代码里。

**好处：**

- ✅ 安全：不会意外提交到GitHub
- ✅ 灵活：不同电脑可用不同Key
- ✅ 标准：所有开发工具都支持

#### Windows配置方法

**推荐方法：PowerShell 7（最佳选择）**

```powershell
# 永久添加用户环境变量（PowerShell 7）
[System.Environment]::SetEnvironmentVariable('ANTHROPIC_API_KEY', 'sk-ant-api03-你的key', 'User')

# 验证配置
$env:ANTHROPIC_API_KEY

# 重启PowerShell后生效
```

**临时配置（仅当前终端有效）：**

```powershell
# PowerShell（包括PowerShell 5和7）
$env:ANTHROPIC_API_KEY="sk-ant-api03-你的key"

# CMD（不推荐，功能有限）
set ANTHROPIC_API_KEY=sk-ant-api03-你的key
```

**永久配置方法2：通过图形界面**

1. 右键"此电脑" → 属性
2. 点击"高级系统设置"
3. 点击"环境变量"
4. 在"用户变量"区域点击"新建"
5. 变量名：`ANTHROPIC_API_KEY`
6. 变量值：`sk-ant-api03-你的完整key`
7. 点击"确定"保存
8. **重启所有终端窗口**

> **提示**：图形界面方法适合不熟悉命令行的用户，但PowerShell 7方法更快捷。

#### macOS/Linux配置方法

```bash
# 确定使用的Shell
echo $SHELL

# 如果是bash,编辑~/.bashrc
# 如果是zsh(macOS默认),编辑~/.zshrc

# 添加以下行（替换为真实Key）
export ANTHROPIC_API_KEY="sk-ant-api03-你的key"

# 保存后重新加载
source ~/.zshrc  # 或 source ~/.bashrc

# 验证
echo $ANTHROPIC_API_KEY
```

**使用nano编辑器示例：**

```bash
# 打开配置文件
nano ~/.zshrc

# 添加Key配置
export ANTHROPIC_API_KEY="sk-ant-api03-xxxxx"

# 保存：Ctrl+O → 回车 → Ctrl+X退出
```

#### 安全注意事项

**✅ 正确做法：**

- 只在本地配置环境变量
- 不要提交 `.env` 文件到Git
- 定期轮换API Key

**❌ 错误做法：**

- 把Key直接写在代码里：`const key = "sk-ant-..."`
- 在GitHub Issues/论坛公开Key
- 与他人共享Key

**泄露后的处理：**

1. 立即到Console删除泄露的Key
2. 创建新Key
3. 更新环境变量
4. 检查API使用记录是否异常

### 4.3.1 API中转站配置（可选）

> 💡 **什么是API中转站？** 中转站是第三方提供的API代理服务，将你的请求转发到Anthropic官方API。对于国内用户来说，中转站可以解决网络访问问题，通常价格也更低。

**中转站 vs 官方API对比：**

| 对比项 | 官方API | 中转站 |
|--------|---------|--------|
| 价格 | 官方定价 | 通常为官方的 1/3 ~ 1/2 |
| 网络要求 | 需要科学上网 | 无需科学上网 |
| 支付方式 | 信用卡（Visa/Master） | 支付宝/微信 |
| 稳定性 | 最稳定 | 取决于中转站质量 |
| 免费额度 | 新用户有 $5 额度 | 通常无免费额度 |

**配置方法：**

中转站会提供一个自定义的 API 地址（Base URL），你需要同时配置 `ANTHROPIC_API_KEY` 和 `ANTHROPIC_BASE_URL` 两个环境变量。

**Windows（PowerShell）：**

```powershell
# 设置中转站API Key（中转站提供的Key）
[System.Environment]::SetEnvironmentVariable('ANTHROPIC_API_KEY', '你的中转站Key', 'User')

# 设置中转站API地址
[System.Environment]::SetEnvironmentVariable('ANTHROPIC_BASE_URL', 'https://你的中转站地址/v1', 'User')

# 重启终端后验证
$env:ANTHROPIC_BASE_URL
```

**macOS/Linux：**

```bash
# 在 ~/.zshrc 或 ~/.bashrc 中添加
export ANTHROPIC_API_KEY="你的中转站Key"
export ANTHROPIC_BASE_URL="https://你的中转站地址/v1"

# 使配置生效
source ~/.zshrc
```

**验证中转站是否生效：**

```bash
# 启动Claude Code后，观察是否能正常连接
claude

# 如果连接成功，说明中转站配置正确
# 如果报错，检查URL末尾是否需要 /v1
```

> ⚠️ **安全提醒**：选择中转站时注意甄别，优先选择口碑好、运营时间长的服务商。中转站可以看到你的API请求内容，避免传输高度敏感的数据。

### 4.4 计费与订阅

**Claude Code需要付费吗？**

两层计费：

1. **Claude Code工具本身**

   - ✅ 免费开源
   - 无需购买License
2. **Claude API使用费**

   - ⚠️ 按调用量计费
   - 类似手机话费（用多少付多少）

**Token是什么？**

Token是AI处理文本的最小单位，用于计费：

- 1 token ≈ 0.75个英文单词
- 1 token ≈ 1-2个汉字
- 1000 tokens ≈ 750字短文

> 💡 **成本说明**：
>
> Claude Code的使用成本取决于你的API调用量。具体计费方式和价格请查看：
> - **官方价格页面**：https://www.anthropic.com/pricing
> - **Console账单页面**：https://console.anthropic.com/ → Settings → Billing
>
> 建议在实际使用中监控自己的消耗情况，根据需求调整使用频率。

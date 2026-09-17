---
title: "Telegram Bot 按钮与键盘实现指南"
sourceId: "07-coding/vibe-coding-cn"
sourceTitle: "Vibe Coding CN"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/2025Emma/vibe-coding-cn"
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/telegram-dev/references/Telegram_Bot_按钮和键盘实现模板.md"
sourceRel: "i18n/zh/skills/telegram-dev/references/Telegram_Bot_按钮和键盘实现模板.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/telegram-dev/references/Telegram_Bot_按钮和键盘实现模板.md"
sourceSha256: "edd7160fc0021d203d88c67302cf46eb341b217b73752282711c382a5704e972"
pageSha256: "edd7160fc0021d203d88c67302cf46eb341b217b73752282711c382a5704e972"
contentMode: "local-full"
zh: ""
---

# Telegram Bot 按钮与键盘实现指南

> 完整的 Telegram Bot 交互式功能开发参考

---

## 📋 目录

1. [按钮和键盘类型](#按钮和键盘类型)
2. [实现方式对比](#实现方式对比)
3. [核心代码示例](#核心代码示例)
4. [最佳实践](#最佳实践)

---

## 按钮和键盘类型

### 1. Inline Keyboard（内联键盘）

**特点**：
- 显示在消息下方
- 点击后触发回调，不发送消息
- 支持回调数据、URL、切换查询等

**应用场景**：确认/取消、菜单导航、分页控制、设置选项

### 2. Reply Keyboard（底部虚拟键盘）

**特点**：
- 显示在输入框上方
- 点击后发送文本消息
- 可设置持久化或一次性

**应用场景**：快捷命令、常用操作、表单输入、主菜单

### 3. Bot Command Menu（命令菜单）

**特点**：
- 显示在输入框左侧 "/" 按钮
- 通过 BotFather 或 API 设置
- 提供命令列表和描述

**应用场景**：功能索引、新用户引导、快速命令访问

### 4. 类型对比

| 特性 | Inline | Reply | Command Menu |
|------|--------|-------|--------------|
| 位置 | 消息下方 | 输入框上方 | "/" 菜单 |
| 触发 | 回调查询 | 文本消息 | 命令 |
| 持久化 | 随消息 | 可配置 | 始终存在 |
| 场景 | 临时交互 | 常驻功能 | 命令索引 |

---

## 实现方式对比

### python-telegram-bot（推荐 Bot 开发）

**优点**：
- 官方推荐，完整的 Handler 系统
- 丰富的按钮和键盘支持
- 异步版本性能优异

**安装**：
```bash
pip install python-telegram-bot==20.7
```

### Telethon（适合用户账号自动化）

**优点**：
- 完整的 MTProto API 访问
- 可使用用户账号和 Bot
- 强大的消息监听能力

**安装**：
```bash
pip install telethon cryptg
```

---

## 核心代码示例

### 1. Inline Keyboard 实现

**python-telegram-bot：**
```python
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import Application, CommandHandler, CallbackQueryHandler, ContextTypes

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """显示内联键盘"""
    keyboard = [
        [
            InlineKeyboardButton("📊 查看数据", callback_data="view_data"),
            InlineKeyboardButton("⚙️ 设置", callback_data="settings"),
        ],
        [
            InlineKeyboardButton("🔗 访问网站", url="https://example.com"),
        ],
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    await update.message.reply_text("请选择：", reply_markup=reply_markup)

async def button_callback(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """处理按钮点击"""
    query = update.callback_query
    await query.answer()  # 必须调用

    if query.data == "view_data":
        await query.edit_message_text("显示数据...")
    elif query.data == "settings":
        await query.edit_message_text("设置选项...")

# 注册处理器
app = Application.builder().token("TOKEN").build()
app.add_handler(CommandHandler("start", start))
app.add_handler(CallbackQueryHandler(button_callback))
app.run_polling()
```

**Telethon：**
```python
from telethon import TelegramClient, events, Button

client = TelegramClient('bot', api_id, api_hash).start(bot_token=BOT_TOKEN)

@client.on(events.NewMessage(pattern='/start'))
async def start(event):
    buttons = [
        [Button.inline("📊 查看数据", b"view_data"), Button.inline("⚙️ 设置", b"settings")],
        [Button.url("🔗 访问网站", "https://example.com")]
    ]
    await event.respond("请选择：", buttons=buttons)

@client.on(events.CallbackQuery)
async def callback(event):
    if event.data == b"view_data":
        await event.edit("显示数据...")
    elif event.data == b"settings":
        await event.edit("设置选项...")

client.run_until_disconnected()
```

### 2. Reply Keyboard 实现

**python-telegram-bot：**
```python
from telegram import KeyboardButton, ReplyKeyboardMarkup, ReplyKeyboardRemove

async def menu(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """显示底部键盘"""
    keyboard = [
        [KeyboardButton("📊 查看数据"), KeyboardButton("⚙️ 设置")],
        [KeyboardButton("📚 帮助"), KeyboardButton("❌ 隐藏键盘")],
    ]
    reply_markup = ReplyKeyboardMarkup(
        keyboard,
        resize_keyboard=True,
        one_time_keyboard=False
    )
    await update.message.reply_text("菜单已激活", reply_markup=reply_markup)

async def handle_text(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """处理文本消息"""
    text = update.message.text
    if text == "📊 查看数据":
        await update.message.reply_text("显示数据...")
    elif text == "❌ 隐藏键盘":
        await update.message.reply_text("已隐藏", reply_markup=ReplyKeyboardRemove())
```

**Telethon：**
```python
@client.on(events.NewMessage(pattern='/menu'))
async def menu(event):
    buttons = [
        [Button.text("📊 查看数据"), Button.text("⚙️ 设置")],
        [Button.text("📚 帮助"), Button.text("❌ 隐藏键盘")]
    ]
    await event.respond("菜单已激活", buttons=buttons)

@client.on(events.NewMessage)
async def handle_text(event):
    if event.text == "📊 查看数据":
        await event.respond("显示数据...")
```

### 3. Bot Command Menu 设置

**通过 BotFather：**
```
1. 发送 /setcommands 到 @BotFather
2. 选择你的 Bot
3. 输入命令列表（每行格式：command - description）

start - 启动机器人
help - 获取帮助
menu - 显示主菜单
settings - 配置设置
```

**通过 API（python-telegram-bot）：**
```python
from telegram import BotCommand

async def set_commands(app: Application):
    """设置命令菜单"""
    commands = [
        BotCommand("start", "启动机器人"),
        BotCommand("help", "获取帮助"),
        BotCommand("menu", "显示主菜单"),
        BotCommand("settings", "配置设置"),
    ]
    await app.bot.set_my_commands(commands)

# 在启动时调用
app.post_init = set_commands
```

### 4. 项目结构示例

```
telegram_bot/
├── bot.py                    # 主程序
├── config.py                 # 配置管理
├── requirements.txt
├── .env
├── handlers/
│   ├── command_handlers.py   # 命令处理器
│   ├── callback_handlers.py  # 回调处理器
│   └── message_handlers.py   # 消息处理器
├── keyboards/
│   ├── inline_keyboards.py   # 内联键盘布局
│   └── reply_keyboards.py    # 回复键盘布局
└── utils/
    ├── logger.py             # 日志
    └── database.py           # 数据库
```

**模块化示例（keyboards/inline_keyboards.py）：**
```python
from telegram import InlineKeyboardButton, InlineKeyboardMarkup

def get_main_menu():
    """主菜单键盘"""
    return InlineKeyboardMarkup([
        [
            InlineKeyboardButton("📊 数据", callback_data="data"),
            InlineKeyboardButton("⚙️ 设置", callback_data="settings"),
        ],
        [InlineKeyboardButton("📚 帮助", callback_data="help")],
    ])

def get_data_menu():
    """数据菜单键盘"""
    return InlineKeyboardMarkup([
        [
            InlineKeyboardButton("📈 实时", callback_data="data_realtime"),
            InlineKeyboardButton("📊 历史", callback_data="data_history"),
        ],
        [InlineKeyboardButton("⬅️ 返回", callback_data="back")],
    ])
```

---

## 最佳实践

### 1. Handler 优先级

```python
# 先注册先匹配，按从特殊到通用的顺序
app.add_handler(CommandHandler("start", start))           # 1. 特定命令
app.add_handler(CallbackQueryHandler(callback))           # 2. 回调查询
app.add_handler(ConversationHandler(...))                 # 3. 对话流程
app.add_handler(MessageHandler(filters.TEXT, text_msg))   # 4. 通用消息（最后）
```

### 2. 错误处理

```python
async def error_handler(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """全局错误处理"""
    logger.error(f"更新 {update} 引起错误", exc_info=context.error)

    # 通知用户
    if update and update.effective_message:
        await update.effective_message.reply_text("操作失败，请重试")

app.add_error_handler(error_handler)
```

### 3. 回调数据管理

```python
# 使用结构化的 callback_data
callback_data = "action:page:item"  # 例如 "view:1:product_123"

# 解析回调数据
async def callback(update: Update, context: ContextTypes.DEFAULT_TYPE):
    query = update.callback_query
    parts = query.data.split(":")
    action, page, item = parts

    if action == "view":
        await show_item(query, page, item)
```

### 4. 键盘设计原则

- **简洁**：每行最多 2-3 个按钮
- **清晰**：使用 emoji 增强识别度
- **一致**：保持统一的布局风格
- **响应**：及时反馈用户操作

### 5. 安全考虑

```python
# 验证用户权限
ADMIN_IDS = [123456789]

async def admin_only(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user_id = update.effective_user.id
    if user_id not in ADMIN_IDS:
        await update.message.reply_text("无权限")
        return

    # 执行管理员操作
```

### 6. 部署方案

**Webhook（推荐生产环境）：**
```python
from flask import Flask, request

app_flask = Flask(__name__)

@app_flask.route('/webhook', methods=['POST'])
def webhook():
    update = Update.de_json(request.get_json(), bot)
    application.update_queue.put(update)
    return "OK"

# 设置 webhook
bot.set_webhook(f"https://yourdomain.com/webhook")
```

**Systemd Service（Linux）：**
```ini
[Unit]
Description=Telegram Bot
After=network.target

[Service]
Type=simple
User=your_user
WorkingDirectory=/path/to/bot
ExecStart=/path/to/venv/bin/python bot.py
Restart=always

[Install]
WantedBy=multi-user.target
```

### 7. 常用库版本

```txt
# requirements.txt
python-telegram-bot==20.7
python-dotenv==1.0.0
aiosqlite==0.19.0
httpx==0.25.2
```

---

## 快速参考

### Inline Keyboard 按钮类型

```python
InlineKeyboardButton("文本", callback_data="data")     # 回调按钮
InlineKeyboardButton("链接", url="https://...")        # URL按钮
InlineKeyboardButton("切换", switch_inline_query="")   # 内联查询
InlineKeyboardButton("登录", login_url=...)            # 登录按钮
InlineKeyboardButton("支付", pay=True)                 # 支付按钮
InlineKeyboardButton("应用", web_app=WebAppInfo(...))  # Mini App
```

### 常用事件类型

- `events.NewMessage` - 新消息
- `events.CallbackQuery` - 回调查询
- `events.InlineQuery` - 内联查询
- `events.ChatAction` - 群组动作

---

**这份指南涵盖了 Telegram Bot 按钮和键盘的所有核心实现！**

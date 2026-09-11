---
title: "附录A 命令速查表"
sourceId: "11-personal-agents/awesome-openclaw-tutorial"
sourceTitle: "Awesome OpenClaw Tutorial（中文）"
sourceKind: "清单与速查"
licenseLabel: "可转载"
lang: "中文"
tier: 2
volume: "11-personal-agents"
sourceUrl: "https://github.com/xianyu110/awesome-openclaw-tutorial"
entryUrl: "https://github.com/xianyu110/awesome-openclaw-tutorial/blob/0b0943dc41725e80d64f7f8d745d185e7752be4d/README.md"
zh: ""
---

# 附录A 命令速查表

> 💡 **本附录目标**：提供OpenClaw常用命令的快速参考。所有命令均基于官方CLI文档（https://docs.openclaw.ai/cli）验证，适用于v2026.3.7+版本。

## 📋 目录

-   A.1 安装与初始化
-   A.2 配置管理（config）
-   A.3 Gateway与守护进程（daemon）
-   A.4 状态与诊断
-   A.5 通道管理（channels）
-   A.6 模型管理（models）
-   A.7 Skills管理
-   A.8 插件管理（plugins）
-   A.9 日志与会话
-   A.10 定时任务（cron）
-   A.11 消息发送（message）
-   A.12 安全与备份
-   A.13 重置与卸载
-   A.14 常用场景组合
-   A.15 配置文件路径

## A.1 安装与初始化

    # 全局安装OpenClaw
    npm install -g openclaw@latest

    # 首次引导向导（推荐）
    openclaw onboard

    # 引导向导（高级模式，完整控制每个步骤）
    openclaw onboard --advanced

    # 重新运行引导向导（重置配置+凭据+会话）
    openclaw onboard --reset

    # 交互式配置向导（已安装后修改配置）
    openclaw configure

    # 查看版本
    openclaw --version

    # 查看帮助
    openclaw --help

    # 查看子命令帮助
    openclaw config --help

## A.2 配置管理（config）

> ⚠️ `openclaw config` 不带子命令等同于 `openclaw configure`（打开交互式向导）。
> config 仅支持 `get`、`set`、`unset`、`file`、`validate` 五个子命令。

    # 查看特定配置项
    openclaw config get &lt;path>
    openclaw config get gateway.port
    openclaw config get agents.defaults.workspace
    openclaw config get agents.list[0].id

    # 设置配置项（值自动解析为JSON5，否则视为字符串）
    openclaw config set &lt;path> &lt;value>
    openclaw config set gateway.port 19001 --strict-json
    openclaw config set agents.defaults.heartbeat.every "2h"
    openclaw config set channels.whatsapp.groups '["*"]' --strict-json

    # 删除配置项
    openclaw config unset &lt;path>
    openclaw config unset tools.web.search.apiKey

    # 查看配置文件路径
    openclaw config file

    # 校验配置文件
    openclaw config validate

> ⚠️ **不存在的命令**：`config list`、`config reset`、`config export`、`config import`、`config delete` 均不是有效子命令。查看全部配置请直接打开配置文件：`openclaw config file`。重置配置请使用 `openclaw reset`。

## A.3 Gateway与守护进程（daemon）

> ⚠️ Gateway的启停通过 `daemon` 命令管理，而非 `gateway start/stop`。

    # 安装系统服务（macOS: LaunchAgent / Linux: systemd）
    openclaw daemon install

    # 启动守护进程
    openclaw daemon start

    # 停止守护进程
    openclaw daemon stop

    # 重启守护进程（配置变更后执行）
    openclaw daemon restart

    # 查看守护进程状态
    openclaw daemon status

    # 卸载系统服务
    openclaw daemon uninstall

    # 查看守护进程日志
    openclaw daemon logs

    # 直接运行Gateway（前台模式，适合调试）
    openclaw gateway

    # Gateway运行参数
    openclaw gateway --port 18789 --verbose

    # 查询运行中的Gateway健康状态
    openclaw gateway health

    # 查询Gateway详细状态
    openclaw gateway status

    # 探测Gateway（附加检查）
    openclaw gateway probe

    # 发现局域网内的Gateway（Bonjour/mDNS）
    openclaw gateway discover

    # 调用Gateway RPC方法
    openclaw gateway call &lt;method>

    # 打开控制面板（Web UI）
    openclaw dashboard

## A.4 状态与诊断

    # 查看整体运行状态
    openclaw status

    # 健康检查
    openclaw health

    # 综合诊断与修复建议
    openclaw doctor

    # 自动执行修复
    openclaw doctor --yes

    # 非交互模式诊断
    openclaw doctor --non-interactive

    # 深度扫描（检查系统服务等）
    openclaw doctor --deep

    # 启动TUI终端界面
    openclaw tui

    # 搜索官方文档
    openclaw docs <关键词>

## A.5 通道管理（channels）

    # 列出已配置的通道
    openclaw channels list

    # 查看通道状态（含连接健康检查）
    openclaw channels status

    # 通道状态（附加探测）
    openclaw channels status --probe

    # 添加通道
    openclaw channels add &lt;channel>

    # 移除通道
    openclaw channels remove &lt;channel>

    # 通道登录
    openclaw channels login &lt;channel>

    # 通道登出
    openclaw channels logout &lt;channel>

    # 配对管理（WhatsApp/Telegram DM配对）
    openclaw pairing list &lt;channel>
    openclaw pairing approve &lt;channel> &lt;code>

## A.6 模型管理（models）

    # 列出已配置的模型
    openclaw models list

    # 查看模型状态
    openclaw models status

    # 切换默认模型
    openclaw models set &lt;model>
    openclaw models set anthropic/claude-sonnet-4-5

    # 设置图片模型
    openclaw models set-image &lt;model>

    # 添加认证（API Key / OAuth / setup-token）
    openclaw models auth add
    openclaw models auth login --provider openai --set-default

    # 模型别名管理
    openclaw models aliases list
    openclaw models aliases add &lt;alias> &lt;model>
    openclaw models aliases remove &lt;alias>

    # 备用模型管理
    openclaw models fallbacks list
    openclaw models fallbacks add &lt;model>
    openclaw models fallbacks remove &lt;model>
    openclaw models fallbacks clear

    # 图片模型备用
    openclaw models image-fallbacks list
    openclaw models image-fallbacks add &lt;model>
    openclaw models image-fallbacks remove &lt;model>

    # 扫描可用模型
    openclaw models scan

    # 认证优先级
    openclaw models auth order get
    openclaw models auth order set &lt;providers...>

## A.7 Skills管理

> ⚠️ **2026.9 主线**：优先使用 `openclaw skills` 查看/检查/管理；`clawhub install …` 仅作历史参考，不要默认照抄。

### openclaw skills（查看与检查）

    # 列出所有Skills（内置+工作区+托管）
    openclaw skills list

    # 仅列出符合条件可加载的Skills
    openclaw skills list --eligible

    # 查看Skills详情

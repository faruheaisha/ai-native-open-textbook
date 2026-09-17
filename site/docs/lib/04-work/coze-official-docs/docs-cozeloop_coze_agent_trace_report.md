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
sourceRel: "docs/cozeloop_coze_agent_trace_report.md"
rawUrl: "/raw/04-work/coze-official-docs/docs/cozeloop_coze_agent_trace_report.md"
sourceSha256: "f1ef5a23fab95e7eb1af29877ac541b7c151aac31ec61886391e4820983888df"
pageSha256: "f1ef5a23fab95e7eb1af29877ac541b7c151aac31ec61886391e4820983888df"
contentMode: "local-full"
zh: ""
---

# 扣子 Coze 官方文档

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.coze.cn/llms.txt
> Use this file to discover all available pages before exploring further.

本文介绍如何通过扣子罗盘 SDK 和扣子编程 SDK，将扣子编程智能体对话过程的 Trace 数据与扣子罗盘 Trace 数据串联，并上报至扣子罗盘进行观测分析。
## 功能介绍 \{#a5570a05\}
扣子编程支持自动上报智能体对话过程的 Trace 数据到扣子罗盘，实现可视化观测，详细说明请参考平台自动上报。同时，扣子罗盘 SDK 提供自定义上报功能，能够上报多种自定义 Trace 数据，如性能数据、执行过程数据、业务数据等。
当你需要将扣子罗盘 SDK 上报的自定义 Trace 数据与扣子编程自动上报的智能体对话过程 Trace 数据串联，形成一个 Trace 调用树时，可参考本文档集成扣子罗盘 SDK 和扣子编程 SDK 来实现。
目前，支持串联如下智能体对话接口的 Trace 数据。

| | | | \
|**接口** |**功能** |**对应 Coze SDK 方法** |
|---|---|---|
| | | | \
|/v3/chat |向指定智能体发起一次对话。更多信息，请参考[发起对话](https://loop.coze.cn/open/docs/developer_guides/chat_v3)。 |CozeCli.Chat.Create |\
| | |CozeCli.Chat.CreateAndPoll |\
| | |CozeCli.Chat.Stream（流式） |

## 准备工作 \{#71bd8c52\}
目前支持通过  Go SDK 串联 Trace 数据。在进行相关操作前，需要先安装 Go SDK。

* 安装扣子编程 Go SDK。具体操作，请参考安装 Go SDK
* 安装扣子罗盘 Go SDK。具体操作，请参考快速开始。

## 步骤一：配置环境变量 \{#cc4fe06e\}
在上报 Trace 数据前，你需要正确配置扣子罗盘和扣子编程的环境变量，以确保数据能够正确上报。环境变量配置格式及说明如下： 

| | | \
|**环境变量** |**说明** |
|---|---|
| | | \
|COZELOOP_API_TOKEN  |用于设置上报数据时所需的扣子罗盘认证信息，配置为扣子罗盘的个人访问令牌或服务访问令牌，获取访问令牌的步骤，请参考配置个人访问令牌、配置服务访问令牌。 |\
| |:::tip 说明 |\
| |设置令牌权限时，需要选择**罗盘**相关权限和**Bot 管理-chat**权限（用于调用Bot）。 |\
| |::: |
| | | \
|COZELOOP_WORKSPACE_ID  |配置为扣子罗盘工作空间 ID。获取空间 ID 的步骤，请参考获取扣子罗盘工作空间 ID。 |
| | | \
|PUBLISHED_BOT_ID |已发布为 API 的智能体 ID。 |\
| |进入智能体的开发页面，开发页面 URL 中 `bot` 参数后的数字就是智能体 ID。例如`https://www.coze.cn/space/341****/bot/73428668*****`，智能体 ID 为`73428668*****`。 |\
| |:::tip 说明 |\
| |确保当前使用的访问密钥已被授予智能体所属空间的 chat 权限。 |\
| |::: |
| | | \
|USER_ID |当前与智能体对话的用户 ID，由使用方自行定义、生成与维护。USER_ID 用于标识对话中的不同用户，不同的用户 ID，其对话的上下文消息、数据库等对话记忆数据互相隔离。如果不需要用户数据隔离，可将此参数固定为一个任意字符串，例如 `123`，`abc` 等。 |\
| |:::tip 说明 |\
| |出于数据隐私及信息安全等方面的考虑，不建议使用业务系统中定义的用户 ID。 |\
| |::: |

## 步骤二：上报 Trace  \{#3d587931\}
如下示例通过扣子编程 SDK 向智能体发起对话，实现用户与智能体的交互，并集成扣子罗盘 SDK 实现了 Trace 数据串联。Trace 数据串联的具体流程如下：

1. 通过扣子罗盘 SDK 创建了一个名为 `my_type` 的 Span 节点。
2. 将 Span 上下文以 HTTP 请求头形式传递给扣子编程的智能体服务端。

```Go
// Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
// SPDX-License-Identifier: MIT

package main

import (
    "context"
    "errors"
    "fmt"
    "io"
    "net/http"
    "os"
    "time"

    "github.com/coze-dev/coze-go"
    "github.com/coze-dev/cozeloop-go"
)

type newTransport struct {
    TraceContextFunc func(ctx context.Context) map[string]string
}

// pass span context to http header
func (n *newTransport) RoundTrip(req *http.Request) (*http.Response, error) {
    if n.TraceContextFunc != nil && len(n.TraceContextFunc(req.Context())) > 0 {
       for key, value := range n.TraceContextFunc(req.Context()) {
          req.Header.Set(key, value)
       }
    }
    return http.DefaultTransport.RoundTrip(req)
}

var httpCli *http.Client
var cozeloopClient cozeloop.Client

func init() {
    var err error
    // init cozeloop client
    // global env COZELOOP_WORKSPACE_ID=your workspace id
    // global env COZELOOP_API_TOKEN=your token
    cozeloopClient, err = cozeloop.NewClient()
    if err != nil {
       panic(err)
    }

    httpCli = &http.Client{Timeout: time.Second * 20}
    httpCli.Transport = &newTransport{
       TraceContextFunc: func(ctx context.Context) map[string]string {
          header, err := cozeloop.GetSpanFromContext(ctx).ToHeader()
          if err != nil {
             fmt.Printf("cozeloop.GetSpanFromContext ToHeader err: %v", err)
             return nil
          }
          return header
       },
    }
}

func main() {
    // Should use the ctx passed down from upstream (for automatic concatenation of traces), and here for simplicity, we will directly use Background
    ctx, cancel := context.WithTimeout(context.Background(), 20*time.Second)
    defer cancel()

    // Set the following environment variables first.
    // COZELOOP_WORKSPACE_ID=your workspace id, for cozeloop client init by default
    // COZELOOP_API_TOKEN=your token, for cozeloop client init by default
    userID := os.Getenv("USER_ID")
    token := os.Getenv("COZELOOP_API_TOKEN")
    botID := os.Getenv("PUBLISHED_BOT_ID")
    authCli := coze.NewTokenAuth(token)
    cozeApiBase := "https://api.coze.cn" // os.Getenv("COZE_API_BASE")

    // This is a span of cozeloop sdk.
    ctx, span := cozeloopClient.StartSpan(ctx, "my_span", "MyType")

    // Init the Coze client through the access_token.
    cozeCli := coze.NewCozeAPI(authCli,
       coze.WithBaseURL(cozeApiBase),
       coze.WithHttpClient(httpCli),
    )

    // Step one, create chats
    req := &coze.CreateChatsReq{
       BotID:  botID,
       UserID: userID,
       Messages: []*coze.Message{
          coze.BuildUserQuestionText("What can you do?", nil),
       },
    }

    resp, err := cozeCli.Chat.Stream(ctx, req) // Ctx must be transmitted throughout the entire chain, otherwise trace cannot be concatenated
    if err != nil {
       fmt.Printf("Error starting chats: %v\n", err)
       return
    }

    defer resp.Close()
    for {
       event, err := resp.Recv()
       if errors.Is(err, io.EOF) {
          fmt.Println("Stream finished")
          break
       }
       if err != nil {
          fmt.Println(err)
          break
       }
       if event.Event == coze.ChatEventConversationMessageDelta {
          fmt.Print(event.Message.Content)
       } else if event.Event == coze.ChatEventConversationChatCompleted {
          fmt.Printf("Token usage:%d\n", event.Chat.Usage.TokenCount)
       } else {
          fmt.Printf("\n")
       }
    }

    fmt.Printf("done, log:%s\n", resp.Response().LogID())

    span.Finish(ctx) // span finish
    cozeloop.Flush(ctx)
}
```

## 步骤三：查看 Trace \{#7ec3e934\}
上报 Trace 数据后，你可以在[扣子罗盘](https://loop.coze.cn/)的 **Trace** 页面，筛选**SDK上报**类型，找到目标 Span，查看上报的 Trace 数据。如示下图中所示，扣子罗盘的 `my_span` Span 已与扣子编程智能体对话过程的 Span 串联，形成一个 Trace 调用树。

::::cols
@col 50
![Image=1738x415](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/b3823c21158b45eb8a0f7bcce8616e2e~tplv-goo7wpa0wc-image.image)

@col 50
![Image=2558x1003](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/beead2243b8d41f8a4ce1503d559ce35~tplv-goo7wpa0wc-image.image)

::::

## 示例地址 \{#5a581656\}
关于关联扣子智能体对话 Trace 数据的更多 Go SDK 示例代码，请参考 [bot_chat](https://github.com/coze-dev/cozeloop-examples/tree/main/go/integration/coze/bot_chat)。

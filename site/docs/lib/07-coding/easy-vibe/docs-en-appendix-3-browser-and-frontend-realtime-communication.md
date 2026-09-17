---
title: "Principles of Real-Time Communication: Polling, SSE, and WebSocket"
sourceId: "07-coding/easy-vibe"
sourceTitle: "Easy-Vibe（Datawhale：从零做出真实产品）"
sourceKind: "课时教程"
licenseLabel: "限非商用"
lang: "中英混排"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/datawhalechina/easy-vibe"
entryUrl: "https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/en/appendix/3-browser-and-frontend/realtime-communication.md"
sourceRel: "docs/en/appendix/3-browser-and-frontend/realtime-communication.md"
rawUrl: "/raw/07-coding/easy-vibe/docs/en/appendix/3-browser-and-frontend/realtime-communication.md"
sourceSha256: "1a69d60e73d68033e48c2d53558e36ce79a583369e8bbf58f636350c26292a35"
pageSha256: "1a69d60e73d68033e48c2d53558e36ce79a583369e8bbf58f636350c26292a35"
contentMode: "local-full"
zh: ""
---

# Principles of Real-Time Communication: Polling, SSE, and WebSocket

::: tip Core Reading Guide
**How does the browser achieve real-time data updates?**
The traditional HTTP protocol is based on a "request-response" model, where the client must proactively initiate a request before the server can return data. If we need to implement real-time scenarios such as chat rooms or stock market feeds, this model faces significant challenges.

This chapter introduces three main technologies the frontend uses for real-time data communication: Short Polling, Server-Sent Events (SSE), and full-duplex WebSocket, and explores their principles and applicable scenarios.
:::

---

## 1. Limitations of Traditional HTTP

The HTTP protocol was originally designed for document retrieval. It has the characteristics of being **stateless** and **unidirectionally initiated by the client**:
1. The client initiates an HTTP request.
2. The server processes the request and returns a response.
3. After the task is completed, the connection is typically released (although HTTP/1.1 supports persistent connection reuse, the request-response model at the business level remains unchanged).

In this model, the server cannot proactively notify waiting clients of state changes at any time. To obtain the latest data, other technical architecture solutions must be sought.

---

## 2. Short Polling

The most straightforward solution is **short polling**. The client uses a timer (such as `setInterval`) to automatically send an HTTP request to the server at fixed intervals, asking whether new data has arrived.

**Technical Characteristics and Limitations:**
- **Advantages**: Extremely simple implementation mechanism, relying entirely on standard HTTP protocol and AJAX/Fetch technology.
- **Disadvantages**: Can generate massive network overhead and resource waste. Most of the time, the server's response may be "no new data." Regardless of whether there is data, each request must carry complete HTTP headers (Headers, Cookies, etc.). In high-concurrency scenarios, network resources can be occupied by large amounts of meaningless queries.

---

## 3. Server-Sent Events (SSE)

To reduce the overhead of frequently establishing HTTP connections, **Server-Sent Events (SSE)** provides a lightweight unidirectional data stream push architecture.

SSE is built on top of the HTTP protocol. After the client initiates an HTTP request with a special header (`Accept: text/event-stream`), the server keeps the underlying TCP connection open when returning the response. Subsequently, the server can continuously push text-formatted data to the client through this persistent channel.

**Technical Characteristics and Limitations:**
- **Advantages**: Persistent connection with low network overhead; browser natively supports automatic reconnection on disconnection; very suitable for **unidirectional** streaming data transmission from server to client (such as large language model text output token by token, real-time trading feeds).
- **Disadvantages**: The communication channel is unidirectional. If the client needs to send control commands or new data to the server, it must establish a separate regular HTTP request.

---

## 4. WebSocket: Full-Duplex Communication Protocol

When application scenarios involve high-frequency bidirectional interaction (such as multiplayer online action games, precision collaborative document editing), we need a technology that both reduces communication overhead and enables true duplex communication — **WebSocket**.

WebSocket is an independent network communication protocol. It elegantly leverages the HTTP protocol to complete the initial connection:
1. **Handshake Phase**: The client sends a special HTTP request declaring the intention to upgrade to a new protocol (carrying the `Upgrade: websocket` header).
2. **Connection Transformation**: If the server supports and agrees to the protocol, it responds with a `101 Switching Protocols` status code.
3. **Complete Freedom**: At this point, HTTP's specification mission ends, and the underlying TCP connection is handed over to the WebSocket protocol. Thereafter, the client and server enjoy equal full-duplex communication rights, and both sides can send and receive minimal-format data frames at any time.

**Technical Characteristics and Limitations:**
- **Advantages**: Supports true bidirectional real-time communication; data frame headers are extremely small, with low communication latency and high throughput efficiency; supports native binary data (ArrayBuffer) transmission.
- **Disadvantages**: Higher architectural and development complexity; due to maintaining persistent long connections, it places stricter engineering requirements on server-side system architecture, load balancing strategies, and heartbeat monitoring design.

---

## 5. Summary: Technology Selection Comparison

| Dimension | Short Polling | Server-Sent Events (SSE) | WebSocket |
| :--- | :--- | :--- | :--- |
| **Communication Direction** | Client proactively polls and pulls (unidirectional) | Server continuously pushes proactively (unidirectional) | Client and server have equal send/receive rights (bidirectional full-duplex) |
| **Underlying Protocol** | Standard HTTP | Standard HTTP | Independent WebSocket protocol (based on TCP) |
| **Data Overhead** | Extremely high (includes complete HTTP headers) | Low | Extremely low (minimal data frame headers) |
| **Typical Use Cases** | Periodically checking completion status of backend async tasks | LLM dialogue unidirectional stream output, news or system notification push | Real-time audio/video signaling, multiplayer online gaming, collaborative whiteboard and editing |

In actual engineering, developers should balance system maintenance complexity and communication efficiency based on the specific business scenario's requirements for real-time performance and bidirectional interaction frequency, choosing the most fitting technology stack.

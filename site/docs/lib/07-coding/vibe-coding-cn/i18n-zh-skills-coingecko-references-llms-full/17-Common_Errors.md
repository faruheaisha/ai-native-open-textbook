---
title: "Vibe Coding CN"
sourceId: "07-coding/vibe-coding-cn"
sourceTitle: "Vibe Coding CN"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/2025Emma/vibe-coding-cn"
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/llms-full.md"
sourceRel: "i18n/zh/skills/coingecko/references/llms-full.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/coingecko/references/llms-full.md"
sourceSha256: "a3cd0a16407a7e6b85ceb3cc714181ec1aecb3fdb5043afd1a82ec9cfdea8ec8"
pageSha256: "56d9035a59fe9b3bebefea94279f7591bd9db874b8be6a963affe7b0c7f625a4"
contentMode: "local-full"
zh: ""
---

## Common Errors

The server responds to a user’s request by issuing status codes when the request is made to the server. Kindly refer to the table below to further understand the status codes when indicating the success or failure of an API call.

| Status Codes                  | Description                                                                                                                                                                                                                                                   |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `400` (Bad Request)           | This is due to an invalid request and the server could not process the user's request                                                                                                                                                                         |
| `401` (Unauthorized)          | This is due to the lack of valid authentication credentials for the requested resource by the user                                                                                                                                                            |
| `403` (Forbidden)             | This is likely indicating that your access is blocked by our server, and we're unable to authorize your request                                                                                                                                               |
| `408` (Timeout)               | This error indicates that our server did not receive your complete request within our allowed time frame. This is usually caused by a slow network connection on your end or network latency. Please check your connection and try sending the request again. |
| `429` (Too many requests)     | This is likely indicating that the rate limit has reached. The user should reduce the number of calls made, or consider scaling their service plan that has much higher rate limits and call credits                                                          |
| `500` (Internal Server Error) | This is a generic error response indicating that the server has encountered an unexpected issue that prevented it from fulfilling the request                                                                                                                 |
| `503` (Service Unavailable)   | The service is currently unavailable. Please check the API status and updates on [https://status.coingecko.com](https://status.coingecko.com)                                                                                                                 |
| `1020` (Access Denied)        | This is due to violation of CDN firewall rule                                                                                                                                                                                                                 |
| `10005`                       | You may not have access to this endpoint. e.g. 'This request is limited Pro API subscribers'. You may wanna subscribe to a paid plan [here](https://www.coingecko.com/en/api/pricing)                                                                         |
| `10002` (Missing API Key)     | API Key Missing. Please make sure you're using the right authentication method.<br />For Pro API, ensure you pass in `x_cg_pro_api_key` parameter with a Pro Key.<br />For Demo API, ensure you pass in `x_cg_demo_api_key` parameter with a Demo Key.        |
| `10010` (Invalid API Key)     | You have provided incorrect API key credentials. If you are using Pro API key, please change your root URL from `api.coingecko.com` to `pro-api.coingecko.com`                                                                                                |
| `10011` (Invalid API Key)     | You have provided incorrect API key credentials. If you are using Demo API key, please change your root URL from `pro-api.coingecko.com` to `api.coingecko.com`                                                                                               |
| CORS error                    | Occurs when the server doesn't return the CORS headers required. You may learn more and attempt the recommended solutions [here](https://www.bannerbear.com/blog/what-is-a-cors-error-and-how-to-fix-it-3-ways/#how-to-fix-a-cors-error)                      |

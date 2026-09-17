---
title: "[Bug] HTTP 请求错误问题的解决方法"
sourceId: "07-coding/easy-vibe"
sourceTitle: "Easy-Vibe（Datawhale：从零做出真实产品）"
sourceKind: "课时教程"
licenseLabel: "限非商用"
lang: "中英混排"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/datawhalechina/easy-vibe"
entryUrl: "https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/index.md"
sourceRel: "docs/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/index.md"
rawUrl: "/raw/07-coding/easy-vibe/docs/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/index.md"
sourceSha256: "bc9f9efcbaa6843d18780ab41a4e81f5bb8260454ddefec519f3f30775f36776"
pageSha256: "58e7c110c1236b2da5f29b3d9c3cf21153ec1c09deb1f1e55e612e6ab0cd3ac2"
contentMode: "local-full"
zh: ""
---

# [Bug] HTTP 请求错误问题的解决方法

如果你遇到了如下图所示的问题，才需要参考本节方案进行解决，否则可以不理会当前部分。

有时候可能你会把 Dify 部署在自己的服务器，但是服务器的对外地址通常都是 http 而不是 https 的，但当我们请求一个只支持 HTTP 的服务时，你可能会看到类似这样的提示（启用 F12 浏览器调试信息模式，查看有问题的点）：

![](/mirror/db/dbe000ad82c28cc2b65d5f37a4b26fde95c3a63c.png)

出现这个问题的原因，是因为我们默认把 Dify 部署在一台只支持 HTTP 而不支持 HTTPS 的服务器上。 HTTPS（HyperText Transfer Protocol Secure）是在 HTTP（超文本传输协议）的基础上增加了 SSL/TLS 加密层，可以简单理解为“更安全版的 HTTP”。

如果要让服务支持 HTTPS，一般可以：

- 使用其他程序转发请求（例如在有证书的 nginx 上做反向代理），或者
- 绑定域名后为该域名申请证书。

但这些操作都比较复杂，在这里我们使用 Zeabur 作为网络转发网关来解决问题。

Zeabur 的网页默认是通过 HTTPS 访问的，因此我们只需要把原来请求的域名转发到 Zeabur 提供的域名，就可以修复这个问题。

- 原始地址：`http://\{DIFY_API_URL\}/v1/chat-messages`
- 现在地址：`https://\{DIFY_NEW_API_URL\}.zeabur.app/v1/chat-messages`

你只需要简单地把 URL 中的域名部分（公网 IP 或域名）替换为已经在 Zeabur 上部署好的域名即可，我们已经提前在服务里配置好了转发功能。

如果你感兴趣，也可以自己在 Zeabur 上部署一个转发服务。在 Zeabur 中创建服务时，选择 Python，然后填入下面的 Python 代码，部署后即可得到一个 https 的地址，https 即可正常使用。

部署完成后，在网络设置中把程序监听端口设置为本地 8080，并对外暴露该端口。

注意：请将 `\{DIFY_API_URL\}` 替换为实际的 Dify API 地址。

```python
from flask import Flask, request, Response
import requests

app = Flask(__name__)

TARGET_BASE_URL = "{DIFY_API_URL}"
LISTEN_PORT = 8080

@app.route('/', defaults={'path': ''}, methods=['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD'])
@app.route('/<path:path>', methods=['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD'])
def proxy_request(path):
    target_url = f"{TARGET_BASE_URL}/{path}"
    if request.query_string:
        target_url += f"?{request.query_string.decode('utf-8')}"

    headers = {key: value for key, value in request.headers if key.lower() not in ['host', 'connection', 'content-length', 'accept-encoding']}

    try:
        resp = requests.request(
            method=request.method,
            url=target_url,
            headers=headers,
            data=request.get_data(),
            cookies=request.cookies,
            allow_redirects=False,
            timeout=30
        )

        excluded_headers = ['content-encoding', 'content-length', 'transfer-encoding', 'connection']
        response_headers = [(name, value) for name, value in resp.raw.headers.items() if name.lower() not in excluded_headers]

        return Response(resp.content, resp.status_code, response_headers)

    except requests.exceptions.RequestException as e:
        print(f"Error forwarding request to {target_url}: {e}")
        return Response(f"Proxy Error: Could not reach target server or invalid response: {e}", status=502)
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        return Response(f"Internal Proxy Error: {e}", status=500)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=LISTEN_PORT, debug=True)
```

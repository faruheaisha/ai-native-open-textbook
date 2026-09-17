---
title: "[Bug] HTTP 請求錯誤問題的解決方法"
sourceId: "07-coding/easy-vibe"
sourceTitle: "Easy-Vibe（Datawhale：从零做出真实产品）"
sourceKind: "课时教程"
licenseLabel: "限非商用"
lang: "中英混排"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/datawhalechina/easy-vibe"
entryUrl: "https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/zh-tw/stage-2/ai-capabilities/dify-knowledge-base/index.md"
sourceRel: "docs/zh-tw/stage-2/ai-capabilities/dify-knowledge-base/index.md"
rawUrl: "/raw/07-coding/easy-vibe/docs/zh-tw/stage-2/ai-capabilities/dify-knowledge-base/index.md"
sourceSha256: "570426dbcdd14e7c78d6bffc55c47fbeaa2e8a4ae17f0d2ae43e66ae83fa22ea"
pageSha256: "6399c8ed39308449c94df67c34339b4045e7795961abfc2ee9d222e24a594a21"
contentMode: "local-full"
zh: ""
---

# [Bug] HTTP 請求錯誤問題的解決方法

如果你遇到了如下圖所示的問題，才需要參考本節方案進行解決，否則可以不理會當前部分。

有時候可能你會把 Dify 部署在自己的服務器，但是服務器的對外地址通常都是 http 而不是 https 的，但當我們請求一個只支持 HTTP 的服務時，你可能會看到類似這樣的提示（啟用 F12 瀏覽器調試資訊模式，查看有問題的點）：

![](https://gh-proxy.com/https://raw.githubusercontent.com/datawhalechina/easy-vibe/130e9b75b28b524e8cc74e615fd9733a4e2b330d/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image98.png)

出現這個問題的原因，是因為我們默認把 Dify 部署在一臺只支持 HTTP 而不支持 HTTPS 的服務器上。 HTTPS（HyperText Transfer Protocol Secure）是在 HTTP（超文本傳輸協議）的基礎上增加了 SSL/TLS 加密層，可以簡單理解為“更安全版的 HTTP”。

如果要讓服務支持 HTTPS，一般可以：

- 使用其他程序轉發請求（例如在有證書的 nginx 上做反向代理），或者
- 綁定域名後為該域名申請證書。

但這些操作都比較複雜，在這裡我們使用 Zeabur 作為網路轉發網關來解決問題。

Zeabur 的網頁默認是通過 HTTPS 訪問的，因此我們只需要把原來請求的域名轉發到 Zeabur 提供的域名，就可以修復這個問題。

- 原始地址：`http://\{DIFY_API_URL\}/v1/chat-messages`
- 現在地址：`https://\{DIFY_NEW_API_URL\}.zeabur.app/v1/chat-messages`

你只需要簡單地把 URL 中的域名部分（公網 IP 或域名）替換為已經在 Zeabur 上部署好的域名即可，我們已經提前在服務裡配置好了轉發功能。

如果你感興趣，也可以自己在 Zeabur 上部署一個轉發服務。在 Zeabur 中創建服務時，選擇 Python，然後填入下面的 Python 程式碼，部署後即可得到一個 https 的地址，https 即可正常使用。

部署完成後，在網路設置中把程序監聽端口設置為本地 8080，並對外暴露該端口。

注意：請將 `\{DIFY_API_URL\}` 替換為實際的 Dify API 地址。

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

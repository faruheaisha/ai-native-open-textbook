---
title: "[Bug] How to Fix HTTP Request Errors"
sourceId: "07-coding/easy-vibe"
sourceTitle: "Easy-Vibe（Datawhale：从零做出真实产品）"
sourceKind: "课时教程"
licenseLabel: "限非商用"
lang: "中英混排"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/datawhalechina/easy-vibe"
entryUrl: "https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/en/stage-2/ai-capabilities/dify-knowledge-base/index.md"
sourceRel: "docs/en/stage-2/ai-capabilities/dify-knowledge-base/index.md"
rawUrl: "/raw/07-coding/easy-vibe/docs/en/stage-2/ai-capabilities/dify-knowledge-base/index.md"
sourceSha256: "9c29788bedcb2ff06495de5e2f9035a58871e9edc2dbb6494ac459bc80483668"
pageSha256: "4523e9a58495e20530a2ecd4f7a7085e46ba1c27664d78e40c8ced7f67628835"
contentMode: "local-full"
zh: ""
---

# [Bug] How to Fix HTTP Request Errors

Only refer to this section if you encounter the issue shown below. Otherwise you can ignore this part.

Sometimes you deploy Dify on your own server where public endpoint is HTTP (not HTTPS). If you request an HTTP-only service, you may see errors like this (enable browser F12 debug info to inspect):

![](https://gh-proxy.com/https://raw.githubusercontent.com/datawhalechina/easy-vibe/130e9b75b28b524e8cc74e615fd9733a4e2b330d/zh-cn/stage-2/ai-capabilities/dify-knowledge-base/images/image98.png)

Root cause: Dify is deployed on a server that supports HTTP but not HTTPS.
HTTPS (HyperText Transfer Protocol Secure) adds SSL/TLS encryption over HTTP, basically a more secure HTTP.

To support HTTPS, common options are:

- Forward requests through another service (for example reverse proxy on certificate-enabled nginx), or
- Bind domain and issue TLS certificate.

These are relatively complex, so here we use Zeabur as network forwarding gateway.

Zeabur pages are accessed via HTTPS by default. So if you forward the original domain to Zeabur domain, the issue is fixed.

- Original URL: `http://\{DIFY_API_URL\}/v1/chat-messages`
- New URL: `https://\{DIFY_NEW_API_URL\}.zeabur.app/v1/chat-messages`

You only need to replace URL domain (public IP/domain) with your deployed Zeabur domain. Forwarding is preconfigured in service.

If interested, you can deploy your own forwarding service on Zeabur. Create a Python service and use the following code. After deployment you get an HTTPS endpoint that works normally.

After deployment, set service listen port to local `8080` and expose this port publicly.

Note: replace `\{DIFY_API_URL\}` with your actual Dify API URL.

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

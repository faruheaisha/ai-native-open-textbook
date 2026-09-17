---
title: "Easy-Vibe（Datawhale：从零做出真实产品）"
sourceId: "07-coding/easy-vibe"
sourceTitle: "Easy-Vibe（Datawhale：从零做出真实产品）"
sourceKind: "课时教程"
licenseLabel: "限非商用"
lang: "中英混排"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/datawhalechina/easy-vibe"
entryUrl: "https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/zh-cn/appendix/4-server-and-backend/backend-languages.md"
sourceRel: "docs/zh-cn/appendix/4-server-and-backend/backend-languages.md"
rawUrl: "/raw/07-coding/easy-vibe/docs/zh-cn/appendix/4-server-and-backend/backend-languages.md"
sourceSha256: "f887229db26bb12d013c0dc316335f4632b1cef8dc4ed48e19b0a160328cd078"
pageSha256: "0b6b1f421168d9f88c5f288473178cc2264e3b0d8f21eedaf75359fe369c1038"
contentMode: "local-full"
zh: ""
---

## Python：AI 与数据科学的第一语言

**定位**：AI/ML 第一语言 · 万能胶水 · 数据科学 · 自动化 · 快速原型

### Python 的 14 大应用方向

| 应用方向 | 细分示例与说明 | 典型应用 / 程序 |
| :--- | :--- | :--- |
| **AI 模型训练与推理** | PyTorch / TensorFlow 深度学习；Hugging Face 微调 LLM（LoRA/QLoRA）；YOLO 检测；Stable Diffusion 生图；ONNX 导出 | PyTorch 训练脚本<br>Hugging Face Trainer<br>YOLO 项目<br>Diffusers Pipeline<br>vLLM 推理服务 |
| **AI Agent 应用开发** | LangChain / LangGraph 多步 Agent；AutoGPT 自主 Agent；Function Calling 工具调用；多 Agent 协作 | LangChain Agent<br>CrewAI<br>AutoGen<br>Dify 工作流<br>Coze Bot |
| **RAG 知识库应用** | 向量数据库（Chroma/Pinecone/Milvus）检索增强生成；企业私有知识库问答；文档解析→Embedding→检索→生成 | LlamaIndex 项目<br>Dify RAG<br>FastGPT<br>MaxKB<br>QAnything |
| **AI 演示界面** | Gradio 模型 Demo；Streamlit 数据/AI 应用；Chainlit ChatGPT 风格界面；Mesop | Gradio Demo<br>Streamlit App<br>Chainlit Chat<br>Open WebUI |
| **MCP Server 开发** | 为 AI 助手开发 MCP 工具服务；让 AI 调用自定义 API/数据库/文件系统 | MCP Filesystem<br>MCP Database<br>MCP GitHub<br>自定义 MCP 工具 |
| **Web 后端开发** | Django 全栈（ORM/Admin/Auth）；FastAPI 异步 API（自动 OpenAPI 文档）；Flask 微服务；Celery 异步任务 | Django 项目<br>FastAPI 服务<br>Flask App<br>Sanic<br>Litestar |
| **网络爬虫** | Scrapy 分布式爬虫；Selenium/Playwright 动态爬取；BeautifulSoup 解析 | Scrapy 项目<br>Playwright 脚本<br>Crawl4AI<br>新闻/电商爬虫 |
| **数据分析与可视化** | Pandas 清洗分析；NumPy 科学计算；Matplotlib/Seaborn/Plotly 可视化；Jupyter 交互报告 | Jupyter Notebook<br>Pandas Pipeline<br>Plotly Dashboard<br>Kaggle Kernel |
| **自动化脚本** | 办公自动化（Excel/Word/PDF/邮件）；文件批处理；自动化测试（pytest）；RPA | openpyxl 脚本<br>python-docx<br>PyAutoGUI<br>Robot Framework |
| **Bot 开发** | Telegram Bot；Discord Bot；微信 Bot；飞书/钉钉机器人 Webhook | python-telegram-bot<br>discord.py Bot<br>wechaty<br>飞书 Bot |
| **DevOps 运维** | Ansible 配置管理；Fabric 远程操作；云 SDK 管理资源 | Ansible Playbook<br>Fabric 脚本<br>Boto3 (AWS)<br>Pulumi |
| **嵌入式 / IoT** | MicroPython 在 ESP32 运行；CircuitPython（Adafruit）；树莓派 GPIO/传感器/智能家居网关 | MicroPython 固件<br>CircuitPython 项目<br>树莓派 Home Assistant |
| **科学计算与仿真** | SciPy 工程计算；SymPy 符号数学；SimPy 离散事件模拟；天文/生物仿真 | SciPy 仿真<br>SymPy 推导<br>AstroPy<br>BioPython |
| **3D / 创意工具脚本** | Blender Python 插件；Maya/Houdini 脚本；Pillow/OpenCV 图像批处理 | Blender Addon<br>Maya MEL/Py<br>OpenCV 流水线<br>Pillow 批处理 |

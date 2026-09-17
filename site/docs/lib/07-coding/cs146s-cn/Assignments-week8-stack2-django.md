---
title: "Stack 2：Django Taskboard"
sourceId: "07-coding/cs146s-cn"
sourceTitle: "动手学 CS146S 中文版"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/ShouZhengAI/CS146S_CN"
entryUrl: "https://github.com/ShouZhengAI/CS146S_CN/blob/0d65f36f6673147d6c298670da4f9b4bd7f991fa/Assignments/week8/stack2-django/README.md"
sourceRel: "Assignments/week8/stack2-django/README.md"
rawUrl: "/raw/07-coding/cs146s-cn/Assignments/week8/stack2-django/README.md"
sourceSha256: "2b10937dc95a1039a32585a8fb4f6205e528e4962e0cda543a230c3c7ab8b3c6"
pageSha256: "2b10937dc95a1039a32585a8fb4f6205e528e4962e0cda543a230c3c7ab8b3c6"
contentMode: "local-full"
zh: ""
---

# Stack 2：Django Taskboard

Django 服务端渲染的任务管理应用。模型、表单、视图、模板、管理后台与 JSON API 都在一个项目中；SQLite 持久化数据。支持完整 CRUD 和完成状态切换。

## 前置条件

- Python 3.10+

## 安装与运行

```bash
python3 -m venv .venv
source .venv/bin/activate              # Windows: .venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

访问 `http://127.0.0.1:8000/`。

可选：运行 `python manage.py createsuperuser` 后访问 `/admin/` 管理任务。

## 数据与环境配置

- 数据库：项目根目录自动创建的 `db.sqlite3`
- 开发设置位于 `taskboard_project/settings.py`
- 当前配置只允许本机访问并开启 `DEBUG`。部署时必须从环境变量读取 `SECRET_KEY`，关闭 `DEBUG`，设置 `ALLOWED_HOSTS` 并使用生产级 WSGI 服务器。

## 页面与 API

页面路由覆盖列表、新建、编辑、切换状态和删除确认。REST 风格接口：

- `GET/POST /api/tasks/`
- `GET/PUT/DELETE /api/tasks/\{id\}/`

写接口接收 `\{ "title": "...", "notes": "...", "completed": false \}`。Django 的 CSRF 中间件默认保护不安全请求；浏览器/API 客户端写入时需提供 CSRF Cookie 与 `X-CSRFToken`。

## 偏离、手动修复与已知问题

没有偏离最低功能范围。手动补充了初始迁移、ModelForm 校验、删除确认、管理后台过滤/搜索和 JSON API。为保持作业重点，未实现账户隔离，所有本地用户共享任务数据。

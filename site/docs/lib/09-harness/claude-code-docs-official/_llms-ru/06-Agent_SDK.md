---
title: "claude-code-docs-official"
sourceId: "09-harness/claude-code-docs-official"
sourceTitle: "claude-code-docs-official"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://code.claude.com/docs"
entryUrl: "https://code.claude.com/docs"
sourceRel: "_llms/ru.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/_llms/ru.md"
sourceSha256: "d8a921265c5132424c15e9a265c90d84659ce0f8d04dacaa344451e82b4dca72"
pageSha256: "0c2dea4a022a463fb3563470639ca71caa7d2886c5a38d1c2dff44ab2a1212c3"
contentMode: "local-full"
zh: ""
---

### Agent SDK

#### Agent SDK

- [Обзор Agent SDK](https://code.claude.com/docs/ru/agent-sdk/overview.md): Создавайте производственные AI-агентов с Claude Code как библиотеку
- [Быстрый старт](https://code.claude.com/docs/ru/agent-sdk/quickstart.md): Начните работу с Python или TypeScript Agent SDK для создания AI-агентов, которые работают автономно

#### Основные концепции

- [Как работает цикл агента](https://code.claude.com/docs/ru/agent-sdk/agent-loop.md): Поймите жизненный цикл сообщений, выполнение инструментов, контекстное окно и архитектуру, которые питают ваших агентов SDK.
- [Использование функций Claude Code в SDK](https://code.claude.com/docs/ru/agent-sdk/claude-code-features.md): Загружайте инструкции проекта, skills, hooks и другие функции Claude Code в ваши SDK-агентов.
- [Работа с сеансами](https://code.claude.com/docs/ru/agent-sdk/sessions.md): Как сеансы сохраняют историю разговора агента, и когда использовать continue, resume и fork для возврата к предыдущему запуску.
- [Сохранение сеансов во внешнее хранилище](https://code.claude.com/docs/ru/agent-sdk/session-storage.md): Зеркалируйте стенограммы сеансов в S3, Redis или собственный бэкенд, чтобы другие хосты могли возобновить ваши сеансы.

#### Ввод и вывод

- [Streaming Input](https://code.claude.com/docs/ru/agent-sdk/streaming-vs-single-mode.md): Понимание двух режимов ввода для Claude Agent SDK и когда использовать каждый
- [Обработка одобрений и пользовательского ввода](https://code.claude.com/docs/ru/agent-sdk/user-input.md): Выводите запросы на одобрение Claude и уточняющие вопросы пользователям, а затем возвращайте их решения в SDK.
- [Потоковая передача ответов в реальном времени](https://code.claude.com/docs/ru/agent-sdk/streaming-output.md): Получайте ответы в реальном времени от Agent SDK по мере поступления текста и вызовов инструментов
- [Получение структурированного вывода от агентов](https://code.claude.com/docs/ru/agent-sdk/structured-outputs.md): Возвращайте валидированный JSON из рабочих процессов агентов, используя JSON Schema, Zod или Pydantic. Получайте типобезопасные структурированные данные после многоходового использования инструментов.

#### Расширить с помощью инструментов

- [Предоставьте Claude пользовательские инструменты](https://code.claude.com/docs/ru/agent-sdk/custom-tools.md): Определите пользовательские инструменты с помощью встроенного MCP-сервера Agent SDK, чтобы Claude мог вызывать ваши функции, обращаться к вашим API и выполнять операции, специфичные для вашей области.
- [Подключение к внешним инструментам с помощью MCP](https://code.claude.com/docs/ru/agent-sdk/mcp.md): Настройте MCP серверы для расширения вашего агента внешними инструментами. Охватывает типы транспорта, поиск инструментов для больших наборов инструментов, аутентификацию и обработку ошибок.
- [Масштабирование на множество инструментов с помощью поиска инструментов](https://code.claude.com/docs/ru/agent-sdk/tool-search.md): Масштабируйте вашего агента на тысячи инструментов, обнаруживая и загружая только необходимое по требованию.
- [Subagents в SDK](https://code.claude.com/docs/ru/agent-sdk/subagents.md): Определяйте и вызывайте subagents для изоляции контекста, параллельного выполнения задач и применения специализированных инструкций в приложениях Claude Agent SDK.

#### Настройка поведения

- [Изменение системных подсказок](https://code.claude.com/docs/ru/agent-sdk/modifying-system-prompts.md): Выберите между предустановкой `claude_code` и пользовательской системной подсказкой, и настройте поведение с помощью CLAUDE.md, стилей вывода, append или полностью пользовательской подсказки.
- [Расширьте агентов с помощью skills](https://code.claude.com/docs/ru/agent-sdk/skills.md): Управляйте тем, какие skills может вызывать Claude в сеансах Claude Agent SDK, отправляйте команды по имени и создавайте skills, которые обнаруживают ваши сеансы
- [Plugins в SDK](https://code.claude.com/docs/ru/agent-sdk/plugins.md): Загружайте пользовательские plugins для расширения Claude Code с помощью skills, agents, hooks и MCP серверов через Agent SDK

#### Управление и наблюдаемость

- [Настройка разрешений](https://code.claude.com/docs/ru/agent-sdk/permissions.md): Контролируйте использование инструментов вашим агентом с помощью режимов разрешений, hooks и декларативных правил allow/deny.
- [Перехватывайте и контролируйте поведение агента с помощью hooks](https://code.claude.com/docs/ru/agent-sdk/hooks.md): Перехватывайте и настраивайте поведение агента в ключевых точках выполнения с помощью hooks
- [Отмотка изменений файлов с помощью checkpointing](https://code.claude.com/docs/ru/agent-sdk/file-checkpointing.md): Отслеживайте изменения файлов во время сеансов агента и восстанавливайте файлы в любое предыдущее состояние
- [Отслеживание затрат и использования](https://code.claude.com/docs/ru/agent-sdk/cost-tracking.md): Узнайте, как отслеживать использование токенов, оценивать затраты и настраивать кэширование подсказок с помощью Claude Agent SDK.
- [Наблюдаемость с OpenTelemetry](https://code.claude.com/docs/ru/agent-sdk/observability.md): Экспортируйте трассировки, метрики и события из Agent SDK в ваш бэкенд наблюдаемости с помощью OpenTelemetry.
- [Отслеживание задач](https://code.claude.com/docs/ru/agent-sdk/todo-tracking.md): Отслеживайте задачи в сеансах Agent SDK и отображайте прогресс Claude в вашем приложении с помощью структурированных вызовов инструментов

#### Развертывание

- [Размещение Agent SDK](https://code.claude.com/docs/ru/agent-sdk/hosting.md): Развертывание Agent SDK в production: архитектура подпроцессов, сохранение сеансов, масштабирование, наблюдаемость и изоляция нескольких арендаторов для Docker, Kubernetes и поставщиков песочниц.
- [Безопасное развертывание AI-агентов](https://code.claude.com/docs/ru/agent-sdk/secure-deployment.md): Руководство по защите развертываний Claude Code и Agent SDK с использованием изоляции, управления учетными данными и сетевых элементов управления

#### Справочные материалы SDK

- [Справочник Agent SDK - TypeScript](https://code.claude.com/docs/ru/agent-sdk/typescript.md): Полный справочник API для TypeScript Agent SDK, включая все функции, типы и интерфейсы.
- [TypeScript SDK V2 session API (removed)](https://code.claude.com/docs/ru/agent-sdk/typescript-v2-preview.md): Справочник по удалённому V2 TypeScript Agent SDK session API с паттернами отправки/потока на основе сессий для многооборотных разговоров.
- [Справочник Agent SDK - Python](https://code.claude.com/docs/ru/agent-sdk/python.md): Полный справочник API для Python Agent SDK, включая все функции, типы и классы.
- [Миграция на Claude Agent SDK](https://code.claude.com/docs/ru/agent-sdk/migration-guide.md): Руководство по миграции Claude Code TypeScript и Python SDK на Claude Agent SDK

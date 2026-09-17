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
pageSha256: "055175742cd95ece05d908634d1f962621570f9a67f4165ec4d384ebaa4a3011"
contentMode: "local-full"
zh: ""
---

### Разработка с Claude Code

#### Агенты и параллельная работа

- [Запуск агентов параллельно](https://code.claude.com/docs/ru/agents.md): Сравните способы, которыми Claude Code может выполнять несколько задач одновременно: подагенты, представление агентов, команды агентов и динамические рабочие процессы.
- [Создание пользовательских subagents](https://code.claude.com/docs/ru/sub-agents.md): Создавайте и используйте специализированные AI subagents в Claude Code для рабочих процессов, ориентированных на конкретные задачи, и улучшенного управления контекстом.
- [Управление несколькими агентами с помощью agent view](https://code.claude.com/docs/ru/agent-view.md): Отправляйте и управляйте множеством сеансов Claude Code с одного экрана. Agent view показывает, что делает каждый сеанс и какие из них требуют вашего ввода.
- [Координируйте команды сеансов Claude Code](https://code.claude.com/docs/ru/agent-teams.md): Координируйте несколько экземпляров Claude Code, работающих вместе как команда, с общими задачами, обменом сообщениями между агентами и централизованным управлением.
- [Оркестрируйте множество подагентов с помощью динамических workflows](https://code.claude.com/docs/ru/workflows.md): Dynamic workflows оркестрируют множество подагентов из скрипта, который пишет Claude, и вы можете его переиспользовать. Используйте их для аудитов кодовой базы, крупных миграций и перекрёстной проверки исследований.
- [Запуск параллельных сеансов с worktrees](https://code.claude.com/docs/ru/worktrees.md): Изолируйте параллельные сеансы Claude Code в отдельных git worktrees, чтобы изменения не конфликтовали. Охватывает флаг `--worktree`, изоляцию subagent, `.worktreeinclude`, очистку и hooks для не-git VCS.

#### MCP

- [Подключение к серверам MCP](https://code.claude.com/docs/ru/mcp-quickstart.md): Добавьте сервер MCP в Claude Code, проверьте соединение и найдите конфигурацию на диске.
- [Подключите Claude Code к инструментам через MCP](https://code.claude.com/docs/ru/mcp.md): Узнайте, как подключить Claude Code к вашим инструментам с помощью Model Context Protocol.

#### Навыки

- [Расширьте Claude с помощью skills](https://code.claude.com/docs/ru/skills.md): Создавайте, управляйте и делитесь skills для расширения возможностей Claude в Claude Code. Включает пользовательские команды и встроенные skills.

#### Плагины

- [Откройте и установите готовые плагины через маркетплейсы](https://code.claude.com/docs/ru/discover-plugins.md): Найдите и установите плагины из маркетплейсов, чтобы расширить Claude Code новыми skills, agents и возможностями.
- [Создание plugins](https://code.claude.com/docs/ru/plugins.md): Создавайте пользовательские plugins для расширения Claude Code с помощью skills, agents, hooks и MCP servers.

#### Артефакты

- [Поделитесь выходом сеанса как артефактами](https://code.claude.com/docs/ru/artifacts.md): Артефакты превращают работу Claude Code в живые интерактивные страницы на claude.ai, которые вы можете хранить в приватном режиме, делиться с вашей организацией или публиковать по общедоступной ссылке.

#### Автоматизация

- [Автоматизация действий с помощью hooks](https://code.claude.com/docs/ru/hooks-guide.md): Запускайте команды оболочки автоматически, когда Claude Code редактирует файлы, завершает задачи или требует ввода. Форматируйте код, отправляйте уведомления, проверяйте команды и применяйте правила проекта.
- [Отправка событий в активный сеанс через каналы](https://code.claude.com/docs/ru/channels.md): Используйте каналы для отправки сообщений, оповещений и вебхуков в ваш сеанс Claude Code из MCP-сервера. Перенаправляйте результаты CI, сообщения чата и события мониторинга, чтобы Claude мог реагировать, пока вас нет.
- [Запуск подсказок по расписанию](https://code.claude.com/docs/ru/scheduled-tasks.md): Используйте /loop и инструменты планирования cron для повторного запуска подсказок, опроса статуса или установки одноразовых напоминаний в сеансе Claude Code.
- [Держите Claude в работе над целью](https://code.claude.com/docs/ru/goal.md): Установите условие завершения с помощью /goal, и Claude будет работать над его достижением, пока условие не будет выполнено, модель не сочтет его невозможным или ошибка, которую вам нужно исправить, не очистит цель.
- [Запуск Claude Code программно](https://code.claude.com/docs/ru/headless.md): Используйте Agent SDK для программного запуска Claude Code из CLI, Python или TypeScript.
- [Запуск сеансов по ссылкам](https://code.claude.com/docs/ru/deep-links.md): Откройте сеанс терминала Claude Code по URL. Встраивайте ссылки `claude-cli://` в runbook'и, оповещения и панели мониторинга, чтобы при клике открывался Claude Code в нужном репозитории с нужным приглашением.

#### Руководства

- [Настройка Claude Code в монорепозитории или большой кодовой базе](https://code.claude.com/docs/ru/large-codebases.md): Настройте Claude Code для монорепозиториев и больших однодеревных кодовых баз с вложенными файлами CLAUDE.md, разреженными worktrees, интеллектом кода и навыками для каждого пакета, чтобы Claude оставался сосредоточенным на коде, над которым вы работаете.

#### Устранение неполадок

- [Устранение неполадок при установке и входе](https://code.claude.com/docs/ru/troubleshoot-install.md): Исправьте ошибки command not found, PATH, разрешений, сети и аутентификации при установке или входе в Claude Code.
- [Troubleshooting](https://code.claude.com/docs/ru/troubleshooting.md): Исправьте высокое использование CPU или памяти, зависания, auto-compact thrashing и проблемы поиска в Claude Code, и найдите нужную страницу для других проблем.
- [Отладка конфигурации](https://code.claude.com/docs/ru/debug-your-config.md): Диагностируйте, почему CLAUDE.md, параметры, hooks, MCP серверы или skills не вступают в силу. Используйте /context, /doctor, /hooks и /mcp, чтобы увидеть, что действительно загрузилось.
- [Справочник по ошибкам](https://code.claude.com/docs/ru/errors.md): Найдите сообщения об ошибках runtime Claude Code, узнайте, что они означают и как их исправить.

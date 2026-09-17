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
pageSha256: "4ca4fbd978a02fff5e97401895e6ab3049286fd62b94594a3bc9f32f63bbda72"
contentMode: "local-full"
zh: ""
---

### Начало работы

#### Начало работы

- [Обзор](https://code.claude.com/docs/ru/overview.md): Claude Code — это агентский инструмент кодирования, который читает вашу кодовую базу, редактирует файлы, выполняет команды и интегрируется с вашими инструментами разработки. Доступен в вашем терминале, IDE, приложении для рабочего стола и браузере.
- [Быстрый старт](https://code.claude.com/docs/ru/quickstart.md): Добро пожаловать в Claude Code!
- [Журнал изменений](https://code.claude.com/docs/ru/changelog.md)

#### Основные концепции

- [Как работает Claude Code](https://code.claude.com/docs/ru/how-claude-code-works.md): Поймите агентивный цикл, встроенные инструменты и то, как Claude Code взаимодействует с вашим проектом.
- [Расширение Claude Code](https://code.claude.com/docs/ru/features-overview.md): Узнайте, когда использовать CLAUDE.md, Skills, subagents, hooks, MCP и plugins.
- [Изучите директорию .claude](https://code.claude.com/docs/ru/claude-directory.md): Где Claude Code читает CLAUDE.md, settings.json, hooks, skills, commands, subagents, workflows, rules и auto memory. Изучите директорию .claude в вашем проекте и ~/.claude в вашей домашней директории.
- [Изучите контекстное окно](https://code.claude.com/docs/ru/context-window.md): Интерактивная симуляция того, как контекстное окно Claude Code заполняется во время сеанса. Посмотрите, что загружается автоматически, какую стоимость имеет каждое чтение файла и когда срабатывают правила и hooks.
- [Как Claude Code использует prompt caching](https://code.claude.com/docs/ru/prompt-caching.md): Claude Code управляет prompt caching автоматически. Узнайте, почему переключение модели вызывает медленный ход без кэша, какова стоимость `/compact`, почему изменения CLAUDE.md не применяются в середине сеанса и как проверить коэффициент попаданий в кэш.

#### Использовать Claude Code

- [Как Claude запоминает ваш проект](https://code.claude.com/docs/ru/memory.md): Дайте Claude постоянные инструкции с помощью файлов CLAUDE.md и позвольте Claude автоматически накапливать знания с помощью auto memory.
- [Выберите режим разрешений](https://code.claude.com/docs/ru/permission-modes.md): Контролируйте, будет ли Claude просить разрешение перед редактированием файлов или выполнением команд. Переключайте режимы с помощью Shift+Tab в CLI, индикатора режима в VS Code или селектора режима в Desktop.
- [Управление сеансами](https://code.claude.com/docs/ru/sessions.md): Назовите, возобновите, создавайте ветви и переключайтесь между диалогами Claude Code. Охватывает `--continue`, `--resume`, `--from-pr`, средство выбора `/resume`, именование сеансов, экспорт стенограмм и место хранения стенограмм.
- [Распространённые рабочие процессы](https://code.claude.com/docs/ru/common-workflows.md): Пошаговые руководства по изучению кодовых баз, исправлению ошибок, рефакторингу, тестированию и другим повседневным задачам с Claude Code.
- [Библиотека промптов](https://code.claude.com/docs/ru/prompt-library.md): Копируйте и вставляйте промпты для Claude Code, отсортированные по задачам и ролям.
- [Лучшие практики для Claude Code](https://code.claude.com/docs/ru/best-practices.md): Советы и паттерны для максимального использования Claude Code, от настройки окружения до масштабирования на параллельные сеансы.

#### Платформы и интеграции

- [Платформы и интеграции](https://code.claude.com/docs/ru/platforms.md): Выберите, где запустить Claude Code и что к нему подключить. Сравните CLI, Desktop, VS Code, JetBrains, веб, мобильные приложения и интеграции, такие как Chrome, Slack и CI/CD.
- [Продолжайте локальные сеансы с любого устройства с помощью Remote Control](https://code.claude.com/docs/ru/remote-control.md): Продолжайте локальный сеанс Claude Code со своего телефона, планшета или любого браузера, используя Remote Control. Работает с claude.ai/code и мобильным приложением Claude.
- [Использование Claude Code с Chrome](https://code.claude.com/docs/ru/chrome.md): Подключите Claude Code к браузеру Chrome для тестирования веб-приложений, отладки с помощью логов консоли, автоматизации заполнения форм и извлечения данных со страниц.
- [Позвольте Claude использовать ваш компьютер из CLI](https://code.claude.com/docs/ru/computer-use.md): Включите computer use в Claude Code CLI, чтобы Claude мог открывать приложения, кликать, печатать и видеть ваш экран на macOS. Тестируйте нативные приложения, отлаживайте визуальные проблемы и автоматизируйте инструменты только с GUI без необходимости покидать терминал.
- [Использование Claude Code в VS Code](https://code.claude.com/docs/ru/vs-code.md): Установите и настройте расширение Claude Code для VS Code. Получите помощь AI при кодировании с встроенными diff, @-упоминаниями, проверкой плана и сочетаниями клавиш.
- [JetBrains IDEs](https://code.claude.com/docs/ru/jetbrains.md): Используйте Claude Code с JetBrains IDEs, включая IntelliJ, PyCharm, WebStorm и другие
- [Claude Code в Slack](https://code.claude.com/docs/ru/slack.md): Делегируйте задачи кодирования прямо из вашего рабочего пространства Slack. Anthropic снимает с производства эту более раннюю версию для рабочих пространств Team и Enterprise в пользу Claude Tag; она остается путем настройки для планов Pro и Max.

##### Claude Code в веб-браузере

- [Начало работы с Claude Code в веб-версии](https://code.claude.com/docs/ru/web-quickstart.md): Запустите Claude Code в облаке из браузера или мобильного приложения. Подключите репозиторий GitHub, отправьте задачу и просмотрите PR без локальной настройки.
- [Использование Claude Code в веб-интерфейсе](https://code.claude.com/docs/ru/claude-code-on-the-web.md): Перемещайте сессии между веб-интерфейсом и терминалом с помощью `--cloud` и `--teleport`, управляйте и делитесь сессиями, а также автоматически исправляйте pull requests из облака.
- [Автоматизация работы с помощью рутин](https://code.claude.com/docs/ru/routines.md): Переведите Claude Code на автопилот. Определите рутины, которые запускаются по расписанию, срабатывают при вызовах API или реагируют на события GitHub из облачной инфраструктуры.
- [Поиск ошибок с помощью ultrareview](https://code.claude.com/docs/ru/ultrareview.md): Запустите глубокий многоагентный анализ кода в облаке с помощью /code-review ultra, чтобы найти и проверить ошибки перед слиянием.

##### Claude Code на рабочем столе

- [Начало работы с настольным приложением](https://code.claude.com/docs/ru/desktop-quickstart.md): Установите Claude Code на рабочий стол и начните свой первый сеанс кодирования
- [Настольное приложение](https://code.claude.com/docs/ru/desktop.md): Получите больше возможностей от Claude Code Desktop: параллельные сеансы с изоляцией Git, макет панелей с перетаскиванием, интегрированный терминал и редактор файлов, боковые чаты, использование компьютера, отправка сеансов со своего телефона, визуальный просмотр различий, предпросмотр приложений, м…
- [Claude Desktop на Linux (бета)](https://code.claude.com/docs/ru/desktop-linux.md): Установка и обновление приложения Claude Desktop на Ubuntu и Debian
- [Claude Code Desktop в WSL](https://code.claude.com/docs/ru/desktop-wsl.md): Запуск сеансов Code внутри дистрибутива WSL 2 на Windows
- [Планирование повторяющихся задач в Claude Code Desktop](https://code.claude.com/docs/ru/desktop-scheduled-tasks.md): Настройте запланированные задачи в Claude Code Desktop для автоматического запуска Claude на регулярной основе для ежедневных проверок кода, аудитов зависимостей или утренних брифингов.

##### Проверка кода и CI/CD

- [Выявляйте проблемы безопасности по мере написания кода Claude](https://code.claude.com/docs/ru/security-guidance.md): Установите плагин security-guidance, чтобы Claude проверял собственные изменения кода на уязвимости и исправлял их в одном сеансе.
- [Code Review](https://code.claude.com/docs/ru/code-review.md): Настройте автоматизированные проверки PR, которые выявляют логические ошибки, уязвимости безопасности и регрессии с помощью многоагентного анализа всей вашей кодовой базы
- [Claude Code GitHub Actions](https://code.claude.com/docs/ru/github-actions.md): Запускайте Claude Code в рабочих процессах GitHub Actions для ответа на упоминания @claude, автоматизации задач и преобразования issues в pull requests
- [Claude Code с GitHub Enterprise Server](https://code.claude.com/docs/ru/github-enterprise-server.md): Подключите Claude Code к вашему самостоятельно размещённому экземпляру GitHub Enterprise Server для веб-сессий, проверки кода и маркетплейсов плагинов.
- [Claude Code GitLab CI/CD](https://code.claude.com/docs/ru/gitlab-ci-cd.md): Узнайте об интеграции Claude Code в ваш рабочий процесс разработки с GitLab CI/CD

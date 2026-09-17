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
pageSha256: "11918e5a4ad97ae6245eea2bdbeb96daf9a5b10686e32bf5857d0ba279160ba0"
contentMode: "local-full"
zh: ""
---

### Администрирование

#### Настройка и доступ

- [Настройка Claude Code для вашей организации](https://code.claude.com/docs/ru/admin-setup.md): Карта решений для администраторов, развертывающих Claude Code, охватывающая поставщиков API, управляемые параметры, принудительное применение политики, мониторинг использования и обработку данных.
- [Расширенная настройка](https://code.claude.com/docs/ru/setup.md): Системные требования, установка для конкретной платформы, управление версиями и удаление Claude Code.
- [Аутентификация](https://code.claude.com/docs/ru/authentication.md): Войдите в Claude Code и настройте аутентификацию для отдельных пользователей, команд и организаций.
- [Настройка параметров, управляемых сервером](https://code.claude.com/docs/ru/server-managed-settings.md): Централизованно настраивайте Claude Code для вашей организации через параметры, доставляемые сервером, без необходимости инфраструктуры управления устройствами.
- [Контролируйте доступ к серверам MCP для вашей организации](https://code.claude.com/docs/ru/managed-mcp.md): Ограничьте, какие серверы MCP пользователи могут добавлять или подключать, или предоставьте серверы каждому пользователю с помощью управляемых файлов конфигурации, управляемых параметров, списков разрешений и списков запретов.
- [Настройка режима auto](https://code.claude.com/docs/ru/auto-mode-config.md): Сообщите классификатору режима auto, какие репозитории, бакеты и домены доверяет ваша организация. Установите контекст окружения, переопределите правила блокировки и разрешения по умолчанию и проверьте вашу эффективную конфигурацию с помощью подкоманд CLI auto-mode.

#### Развертывание

- [Обзор корпоративного развертывания](https://code.claude.com/docs/ru/third-party-integrations.md): Узнайте, как Claude Code может интегрироваться с различными сторонними сервисами и инфраструктурой для удовлетворения требований корпоративного развертывания.
- [Доступность функций](https://code.claude.com/docs/ru/feature-availability.md): Сравните, какие функции Claude Code доступны в планах подписки Anthropic, Anthropic Console, Amazon Bedrock, Claude Platform на AWS, Google Cloud's Agent Platform и Microsoft Foundry.
- [Claude Code на Amazon Bedrock](https://code.claude.com/docs/ru/amazon-bedrock.md): Узнайте о настройке Claude Code через Amazon Bedrock, включая установку, конфигурацию IAM и устранение неполадок.
- [Claude Code на Claude Platform on AWS](https://code.claude.com/docs/ru/claude-platform-on-aws.md): Настройте Claude Code для использования API Claude, управляемого Anthropic, с аутентификацией AWS, контролем доступа IAM и выставлением счетов через AWS Marketplace.
- [Claude Code на Google Cloud's Agent Platform](https://code.claude.com/docs/ru/google-vertex-ai.md): Узнайте о настройке Claude Code через Google Cloud's Agent Platform, ранее известную как Vertex AI, включая установку, конфигурацию IAM и устранение неполадок.
- [Claude Code на Microsoft Foundry](https://code.claude.com/docs/ru/microsoft-foundry.md): Узнайте о настройке Claude Code через Microsoft Foundry, включая установку, конфигурацию и устранение неполадок.
- [Конфигурация сети для предприятия](https://code.claude.com/docs/ru/network-config.md): Настройте Claude Code для корпоративных сред с прокси-серверами, пользовательскими центрами сертификации (CA) и взаимной аутентификацией Transport Layer Security (mTLS).
- [Запуск Claude Code через корпоративный launcher](https://code.claude.com/docs/ru/corporate-launcher.md): Маршрутизируйте процессы, которые Claude Code запускает из собственного бинарного файла, включая фоновый сервис и каждый сеанс agent view, через требуемый launcher с помощью CLAUDE_CODE_PROCESS_WRAPPER или параметра processWrapper.
- [Контейнеры разработки](https://code.claude.com/docs/ru/devcontainer.md): Запустите Claude Code внутри контейнера разработки для согласованных, изолированных сред во всей вашей команде.

#### Шлюзы

- [Запуск Claude Code через шлюз](https://code.claude.com/docs/ru/gateways.md): Маршрутизируйте Claude Code через самостоятельно размещаемый шлюз для централизованного управления учетными данными, отслеживания использования и контроля затрат. Охватывает архитектуру, шлюз Claude apps от Anthropic и использование других продуктов шлюзов.

##### Шлюз приложений Claude

- [Шлюз Claude apps для Amazon Bedrock, Claude Platform на AWS, Google Cloud и Microsoft Foundry](https://code.claude.com/docs/ru/claude-apps-gateway.md): Запускайте Claude Code через Amazon Bedrock, Claude Platform на AWS, Google Cloud или Microsoft Foundry за самостоятельно размещаемым шлюзом с входом SSO, доступом к моделям по группам и телеметрией OTLP.
- [Конфигурация Claude apps gateway](https://code.claude.com/docs/ru/claude-apps-gateway-config.md): Справочник по каждому параметру gateway.yaml: listener и TLS, OIDC, session, хранилище Postgres, upstreams Amazon Bedrock, Claude Platform на AWS, Agent Platform Google Cloud и Microsoft Foundry, маршрутизация моделей, управляемые политики и телеметрия.
- [Лимиты расходов Claude apps gateway](https://code.claude.com/docs/ru/claude-apps-gateway-spend-limits.md): Ограничьте расходы каждого разработчика через Claude apps gateway по дням, неделям или месяцам. Установите лимиты с помощью Admin API, и шлюз будет их соблюдать в реальном времени при каждом запросе.
- [Развертывание и эксплуатация шлюза Claude apps](https://code.claude.com/docs/ru/claude-apps-gateway-deploy.md): Зарегистрируйте шлюз в вашем поставщике идентификации, создайте контейнер, разверните на Kubernetes или Cloud Run и управляйте им: проверки здоровья, ротация секретов, обновления и безопасность.
- [Развертывание Claude apps gateway на Google Cloud](https://code.claude.com/docs/ru/claude-apps-gateway-on-gcp.md): Практический пример запуска Claude apps gateway на Google Cloud: Cloud Run или GKE, Cloud SQL для PostgreSQL, Secret Manager и аутентификация через сервисный аккаунт для Agent Platform Google Cloud.

##### Другие шлюзы

- [Другие LLM gateways](https://code.claude.com/docs/ru/llm-gateway.md): Маршрутизируйте Claude Code через LLM gateway, который уже запускает ваша организация. Охватывает подключение Claude Code к шлюзу, развертывание шлюза для вашей организации и то, что Claude Code отправляет на шлюз.
- [Подключение Claude Code к шлюзу LLM](https://code.claude.com/docs/ru/llm-gateway-connect.md): Направьте Claude Code на шлюз LLM вашей организации. Проверьте, уже ли администратор его настроил, или установите базовый URL и учетные данные самостоятельно, затем проверьте соединение и исправьте ошибки шлюза.
- [Развертывание LLM-шлюза для вашей организации](https://code.claude.com/docs/ru/llm-gateway-rollout.md): Разверните продукт шлюза для Claude Code: настройте его для перенаправления того, что отправляет Claude Code, выдайте учетные данные разработчика, распределите конфигурацию через управляемые параметры и проверьте развертывание.
- [Справочник протокола Gateway](https://code.claude.com/docs/ru/llm-gateway-protocol.md): Контракт API между Claude Code и LLM gateway: конечные точки, заголовки и поля тела для пересылки, деградация функций при удалении полей, заголовки атрибуции для отслеживания затрат и обнаружение моделей.

#### Использование и затраты

- [Мониторинг](https://code.claude.com/docs/ru/monitoring-usage.md): Узнайте, как включить и настроить OpenTelemetry для Claude Code.
- [Эффективное управление затратами](https://code.claude.com/docs/ru/costs.md): Отслеживайте использование токенов, устанавливайте лимиты расходов команды и снижайте затраты Claude Code с помощью управления контекстом, выбора модели, настроек расширенного мышления и предварительной обработки hooks.
- [Отслеживание использования команды с помощью аналитики](https://code.claude.com/docs/ru/analytics.md): Просмотрите метрики использования Claude Code, отслеживайте внедрение и измеряйте скорость разработки на панели аналитики.

#### Распространение плагинов

- [Создание и распространение marketplace плагинов](https://code.claude.com/docs/ru/plugin-marketplaces.md): Создавайте и размещайте marketplace плагинов для распространения расширений Claude Code по командам и сообществам.
- [Ограничение версий зависимостей плагина](https://code.claude.com/docs/ru/plugin-dependencies.md): Объявляйте ограничения версий для зависимостей плагина и объедините подобранный набор плагинов в одну установку.
- [Рекомендуйте ваш плагин из вашего CLI](https://code.claude.com/docs/ru/plugin-hints.md): Выведите однострочный маркер из вашего CLI, чтобы Claude Code предложил пользователям установить ваш официальный плагин.
- [Рекомендуйте plugins для вашей организации](https://code.claude.com/docs/ru/plugin-relevance.md): Добавьте блок relevance к записям plugins на marketplace, чтобы Claude Code предлагал их, когда работа пользователя совпадает.

#### Безопасность и данные

- [Безопасность](https://code.claude.com/docs/ru/security.md): Узнайте о защитных механизмах Claude Code и лучших практиках безопасного использования.
- [Использование данных](https://code.claude.com/docs/ru/data-usage.md): Узнайте о политике использования данных Anthropic для Claude
- [Нулевое хранение данных](https://code.claude.com/docs/ru/zero-data-retention.md): Узнайте о нулевом хранении данных (ZDR) для Claude Code, доступном для квалифицированных учетных записей на Claude for Enterprise, включая область применения, отключенные функции и способы запроса активации.

#### Внедрение

- [Коммуникационный набор](https://code.claude.com/docs/ru/communications-kit.md): Объявления о запуске, сообщения для капельной кампании и ответы на часто задаваемые вопросы для развертывания Claude Code в вашей инженерной организации.
- [Набор инструментов чемпиона](https://code.claude.com/docs/ru/champion-kit.md): Руководство для инженеров, продвигающих Claude Code внутри организации: что делиться, как отвечать на вопросы и как увеличить внедрение в вашей команде.

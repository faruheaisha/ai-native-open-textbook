---
title: "Anthropic 平台文档（英文全量）"
sourceId: "01-foundations/anthropic-platform-docs-en"
sourceTitle: "Anthropic 平台文档（英文全量）"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "01-foundations"
sourceUrl: "https://platform.claude.com/docs"
entryUrl: "https://platform.claude.com/docs"
sourceRel: "docs/en/build-with-claude/claude-platform-on-aws.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/build-with-claude/claude-platform-on-aws.md"
sourceSha256: "0ff935251ef5bee607ae9d604d1c665269af87e8eda7c66c98362c1d5906779c"
pageSha256: "51250e1bf11f26631c5811532412fda2086da9ba1b0205c55744d45021c2441a"
contentMode: "local-full"
zh: ""
---

## Install an SDK

Anthropic's [client SDKs](https://platform.claude.com/docs/en/cli-sdks-libraries/overview) support Claude Platform on AWS. Each SDK provides a platform-specific client class that handles SigV4 signing, region-based base URL construction, and the `anthropic-workspace-id` header.

    ```bash
    pip install -U "anthropic[aws]"
    ```

      On macOS with Homebrew Python or other externally managed Python environments, `pip install` can fail with a PEP 668 `externally-managed-environment` error. Create and activate a virtual environment first: `python3 -m venv .venv && source .venv/bin/activate`.

    ```bash
    npm install @anthropic-ai/aws-sdk
    ```

    ```bash
    dotnet add package Anthropic.Aws
    ```

    ```bash
    go get github.com/anthropics/anthropic-sdk-go
    ```

    ```kotlin Gradle
    implementation("com.anthropic:anthropic-java-aws:2.60.0")
    ```

    ```xml Maven
    &lt;dependency>
      &lt;groupId>com.anthropic&lt;/groupId>
      &lt;artifactId>anthropic-java-aws&lt;/artifactId>
      &lt;version>2.60.0&lt;/version>
    &lt;/dependency>
    ```

    ```bash
    composer require anthropic-ai/sdk aws/aws-sdk-php
    ```

    ```bash
    gem install anthropic aws-sdk-core
    ```

  SDK clients for Claude Platform on AWS are in beta.

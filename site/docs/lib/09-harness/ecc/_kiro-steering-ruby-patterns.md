---
title: "Ruby Patterns"
sourceId: "09-harness/ecc"
sourceTitle: "ECC —— Harness 性能优化系统"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/affaan-m/ECC"
entryUrl: "https://github.com/affaan-m/ECC/blob/928c1dea72f5c330442fc1f595563398b8f389f7/.kiro/steering/ruby-patterns.md"
sourceRel: ".kiro/steering/ruby-patterns.md"
rawUrl: "/raw/09-harness/ecc/.kiro/steering/ruby-patterns.md"
sourceSha256: "64eee2275d2d47dc2ba9092cff087fac89f3e7db55da8197fc31cef1407555e6"
pageSha256: "64eee2275d2d47dc2ba9092cff087fac89f3e7db55da8197fc31cef1407555e6"
contentMode: "local-full"
zh: ""
---

# Ruby Patterns

> This file extends the common patterns with Ruby and Rails specific content.

## Standards

- Target **Ruby 3.3+** for new Rails work
- Add `# frozen_string_literal: true` to new files when the project uses that convention
- Prefer clear Ruby over clever metaprogramming

## Formatting & Linting

```bash
bundle exec rubocop
bundle exec rubocop -A
```

## Rails Way First

- Start with plain Rails MVC and Active Record conventions
- Introduce service objects, query objects, form objects when model/controller carries multiple responsibilities
- Keep controllers transport-focused: auth, params, response shape

## Persistence

- Prefer PostgreSQL for multi-host production Rails apps
- Keep raw SQL behind query objects or model scopes; parameterize every dynamic value

## Background Jobs

- Use **Solid Queue** for greenfield Rails 8 apps with modest throughput
- Use **Sidekiq** for mature observability, high throughput, or existing Redis infrastructure

## Frontend

- Prefer **Hotwire** (Turbo, Stimulus, Importmap, Propshaft) for server-rendered Rails apps
- Use React/Vue/Inertia when interaction complexity justifies the extra client surface

## Authentication

- Use Rails 8 authentication generator for straightforward session auth
- Use Devise when requirements include OAuth, MFA, confirmable/lockable flows

## Security

- Keep CSRF protection enabled for state-changing browser requests
- Use strong parameters or typed boundary objects before mass assignment
- Store secrets in Rails credentials or environment variables — never commit plaintext keys
- Prefer Active Record query APIs and parameterized SQL — never interpolate user input into SQL

```bash
bundle exec bundle-audit check --update
bundle exec brakeman --no-progress
```

## Testing

- Use **Minitest** when the app follows default Rails test stack
- Use **RSpec** when already established in the project
- Put fast domain behavior in model/service/query tests
- Use system tests with Capybara for browser-critical flows only

```bash
bin/rails test
bundle exec rspec
```

## Reference

See skill: `backend-patterns` for service boundaries and adapter patterns.
See skill: `security-review` for secure-by-default review patterns.

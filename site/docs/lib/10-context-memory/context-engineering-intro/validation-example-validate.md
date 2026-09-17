---
title: "Validate Codebase"
sourceId: "10-context-memory/context-engineering-intro"
sourceTitle: "Context Engineering Intro"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "10-context-memory"
sourceUrl: "https://github.com/coleam00/context-engineering-intro"
entryUrl: "https://github.com/coleam00/context-engineering-intro/blob/a2d84b021cee1e2f4e77ba854bba0be8cb319035/validation/example-validate.md"
sourceRel: "validation/example-validate.md"
rawUrl: "/raw/10-context-memory/context-engineering-intro/validation/example-validate.md"
sourceSha256: "931c277b1112ad72ee947ad049b33bc9e05a324cf12cdb28c188cc053db3fba7"
pageSha256: "931c277b1112ad72ee947ad049b33bc9e05a324cf12cdb28c188cc053db3fba7"
contentMode: "local-full"
zh: ""
---

# Validate Codebase

> **Example generated validation command** for a React + FastAPI + PostgreSQL app

## Phase 1: Linting
!`cd frontend && npm run lint`
!`cd backend && ruff check src/`

## Phase 2: Type Checking
!`cd frontend && npx tsc --noEmit`
!`cd backend && mypy src/`

## Phase 3: Style Checking
!`cd frontend && npm run format:check`
!`cd backend && black --check src/`

## Phase 4: Unit Testing
!`cd frontend && npm test -- --coverage`
!`cd backend && pytest tests/unit -v --cov=src`

## Phase 5: End-to-End Testing

### Setup
!`docker-compose up -d`
!`timeout 60 bash -c 'until curl -f http://localhost:8000/health; do sleep 2; done'`

### Frontend E2E (Playwright)
!`cd frontend && npx playwright test`

**Tests:**
- User registration → email verification → login
- Create item → edit item → delete item
- Search and filter functionality
- Error handling and validation
- All main user workflows

### Backend E2E (API + Database)

**Test all API endpoints:**
!`curl -X POST http://localhost:8000/api/auth/register -d '\{"email":"test@test.com","password":"Test123!"\}'`
!`TOKEN=$(curl -X POST http://localhost:8000/api/auth/login -d '{"email":"test@test.com","password":"Test123!"}' | jq -r '.token')`
!`curl http://localhost:8000/api/items -H "Authorization: Bearer $TOKEN"`
!`curl -X POST http://localhost:8000/api/items -H "Authorization: Bearer $TOKEN" -d '{"name":"Test"}'`

**Verify database:**
!`docker exec postgres psql -U user -d db -c "SELECT COUNT(*) FROM users;"`
!`docker exec postgres psql -U user -d db -c "SELECT * FROM items WHERE name='Test';"`

**Test error handling:**
!`curl -w "%{http_code}" http://localhost:8000/api/items/invalid-id` # Should be 404
!`curl -w "%{http_code}" http://localhost:8000/api/admin -H "Authorization: Bearer $TOKEN"` # Should be 403

### Cleanup
!`docker-compose down -v`

## Summary
All validation passed! Ready for deployment.

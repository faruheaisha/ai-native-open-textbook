---
title: "@cozeloop/auth-pages"
sourceId: "04-work/coze-loop"
sourceTitle: "Coze Loop 源码研读"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "04-work"
sourceUrl: "https://github.com/coze-dev/coze-loop"
entryUrl: "https://github.com/coze-dev/coze-loop/blob/5f1e4c234fc110c1bf674e882a6fd02109e1e1e6/frontend/packages/loop-pages/auth-pages/README.md"
sourceRel: "frontend/packages/loop-pages/auth-pages/README.md"
rawUrl: "/raw/04-work/coze-loop/frontend/packages/loop-pages/auth-pages/README.md"
sourceSha256: "03bf58d7b46fcb7a22d4a98f0d15f1f051b44d9281aa67f620d4f98196e05f53"
pageSha256: "03bf58d7b46fcb7a22d4a98f0d15f1f051b44d9281aa67f620d4f98196e05f53"
contentMode: "local-full"
zh: ""
---

# @cozeloop/auth-pages

Authentication and account management pages for CozeLoop.

## Overview

This package provides authentication-related pages and components for the CozeLoop platform, including login pages, account settings, and user management interfaces. It's part of the CozeLoop monorepo and integrates with the platform's authentication system.

## Getting Started

### Installation

Add this package to your `package.json`:

```json
{
  "dependencies": {
    "@cozeloop/auth-pages": "workspace:*"
  }
}
```

Then run:

```bash
rush update
```

### Usage

#### Using the Auth App (Default Export)

```typescript
import AuthApp from '@cozeloop/auth-pages';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
  );
}
```

The default export provides a complete auth application with routing:

- `/login` - Login page
- Automatic redirect to login for unmatched routes

#### Using Individual Components

```typescript
import { AccountSetting, SwitchLang } from '@cozeloop/auth-pages';

function SettingsPage() {
  return (
    <div>
    </div>
  );
}
```

## Features

- **Login Flow**: Complete login page with authentication handling
- **Account Settings**: User profile and account management interface
- **Personal Access Token (PAT) Management**: Create, view, and manage API tokens
- **User Information Panel**: Edit user profile, username, and account details
- **Language Switching**: Multi-language support with language switcher component
- **Responsive Auth Frame**: Consistent layout for authentication pages

## Components

### Main Exports

- **`App` (default)**: Complete auth application with routing
- **`AccountSetting`**: Account settings and management interface
- **`SwitchLang`**: Language switcher component

### Internal Components

- `AuthFrame`: Layout wrapper for auth pages
- `LoginPanel`: Login form component
- `Logo`: CozeLoop logo component
- `UserInfoPanel`: User profile management
- `PATPanel`: Personal Access Token management

## API Reference

### Default Export: `App`

A React component that provides the complete authentication application with built-in routing.

### Named Exports

#### `AccountSetting`

Component for managing user account settings, including:

- User information editing
- Personal Access Token (PAT) management
- Account preferences

#### `SwitchLang`

Language switcher component for changing the application language.

For detailed API documentation, please refer to the TypeScript definitions.

## Dependencies

This package depends on:

- `@cozeloop/account`: Account management functionality
- `@cozeloop/api-schema`: API type definitions
- `@cozeloop/i18n-adapter`: Internationalization support
- `@cozeloop/stores`: State management
- `@coze-arch/coze-design`: UI component library
- `react-router-dom`: Routing functionality

## Development

This package is built with:

- TypeScript for type safety
- React 18+ for UI components
- React Router for navigation
- Vitest for testing
- ESLint for code quality
- Coze Design System for UI components

### Scripts

```bash
# Build the package
npm run build

# Run linting
npm run lint

# Run tests
npm run test

# Run tests with coverage
npm run test:cov
```

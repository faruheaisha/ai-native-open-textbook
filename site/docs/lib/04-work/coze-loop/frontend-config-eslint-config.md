---
title: "@coze-arch/eslint-config"
sourceId: "04-work/coze-loop"
sourceTitle: "Coze Loop 源码研读"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "04-work"
sourceUrl: "https://github.com/coze-dev/coze-loop"
entryUrl: "https://github.com/coze-dev/coze-loop/blob/5f1e4c234fc110c1bf674e882a6fd02109e1e1e6/README.md"
zh: ""
---

# @coze-arch/eslint-config

A comprehensive ESLint configuration package for the Coze architecture ecosystem, providing standardized linting rules for JavaScript, TypeScript, React, and Node.js projects.

## Features

- 🔧 **Multi-environment support**: Separate configurations for web, node, and base environments
- 🎯 **TypeScript-first**: Full TypeScript support with advanced rules
- ⚛️ **React optimized**: Built-in React hooks and XSS protection rules
- 🔒 **Security focused**: Integrated security plugins and best practices
- 🎨 **Prettier integration**: Seamless code formatting with Prettier
- 📦 **Workspace-aware**: Import resolution for monorepo environments
- 🚫 **Dependency control**: Built-in rules to prevent disallowed dependencies
- 🧪 **Test-friendly**: Special configurations for test files

## Get Started

### Installation

```bash
# Install the package
pnpm add @coze-arch/eslint-config --save-dev

# Update workspace dependencies
rush update
```

### Basic Usage

Create an `eslint.config.js` file in your project root:

```javascript
const { defineConfig } = require('@coze-arch/eslint-config');

module.exports = defineConfig({
  packageRoot: __dirname,
  preset: 'web', // or 'node' or 'base'
});
```

## API Reference

### `defineConfig(config)`

The main function to create ESLint configurations.

#### Parameters

- `config` (EnhanceESLintConfig): Configuration object

#### EnhanceESLintConfig Interface

```typescript
interface EnhanceESLintConfig extends ESLintConfig {
  /**
   * Project root directory
   */
  packageRoot: string;
  
  /**
   * Configuration preset mode
   */
  preset: 'web' | 'node' | 'base';
  
  /**
   * Additional configuration overrides
   */
  overrides?: ESLintConfig[];
  
  /**
   * Custom ignore patterns
   */
  ignores?: string[];
  
  /**
   * Custom rules
   */
  rules?: Linter.RulesRecord;
  
  /**
   * ESLint settings
   */
  settings?: any;
}
```

### Configuration Presets

#### Web Preset (`preset: 'web'`)

Optimized for React web applications:

```javascript
module.exports = defineConfig({
  packageRoot: __dirname,
  preset: 'web',
});
```

**Includes:**
- React and React Hooks rules
- XSS protection with `eslint-plugin-risxss`
- Browser globals
- Restricted imports for architecture compliance

#### Node Preset (`preset: 'node'`)

Optimized for Node.js applications:

```javascript
module.exports = defineConfig({
  packageRoot: __dirname,
  preset: 'node',
});
```

**Includes:**
- Node.js globals and environment
- Security plugin for Node.js
- Server-side specific rules

#### Base Preset (`preset: 'base'`)

Minimal configuration for libraries:

```javascript
module.exports = defineConfig({
  packageRoot: __dirname,
  preset: 'base',
});
```

**Includes:**
- Core JavaScript and TypeScript rules
- Import resolution
- Common code quality rules

### Custom Configuration

#### Adding Custom Rules

```javascript
module.exports = defineConfig({
  packageRoot: __dirname,
  preset: 'web',
  rules: {
    'no-console': 'warn',
    '@typescript-eslint/no-unused-vars': 'error',
  },
});
```

#### Adding Overrides

```javascript
module.exports = defineConfig({
  packageRoot: __dirname,
  preset: 'web',
  overrides: [
    {
      files: ['**/*.test.ts', '**/*.spec.ts'],
      rules: {
        'max-lines': 'off',
      },
    },
  ],
});
```

#### Custom Ignores

```javascript
module.exports = defineConfig({
  packageRoot: __dirname,
  preset: 'web',
  ignores: [
    'custom-build/**',
    'temp/**',
  ],
});
```

### CLI Scripts

The package provides convenient CLI scripts:

#### ESLint Script

```bash
# Using the built-in eslint script
npx eslint ./src

# Using the reslint alias
npx reslint ./src
```

#### Prettier Script

```bash
# Format code with Prettier
npx prettier --write ./src
```

## Development

### Project Structure

```
config/eslint-config/
├── src/
│   ├── index.js              # Main entry point
│   └── define-config.ts      # Configuration function
├── rules/                    # Rule configurations
│   ├── common-standard.js    # Common rules
│   ├── import.js            # Import rules
│   ├── js-standard.js       # JavaScript rules
│   ├── ts-standard.js       # TypeScript rules
│   └── test-standard.js     # Test file rules
├── scripts/
│   ├── reslint.sh           # ESLint wrapper script
│   └── rprettier.sh         # Prettier wrapper script
├── eslint.config.base.js    # Base configuration
├── eslint.config.web.js     # Web configuration
├── eslint.config.node.js    # Node.js configuration
└── package.json
```

### Building

```bash
# Build the package
rush build --to @coze-arch/eslint-config

# Run linting
rush lint --to @coze-arch/eslint-config
```

### Testing

```bash
# Run tests
rush test --to @coze-arch/eslint-config
```

## Dependencies

### Main Dependencies

- **@typescript-eslint/eslint-plugin**: TypeScript-specific linting rules
- **@typescript-eslint/parser**: TypeScript parser for ESLint
- **eslint-plugin-react**: React-specific linting rules
- **eslint-plugin-react-hooks**: Rules for React Hooks
- **eslint-plugin-prettier**: Prettier integration
- **eslint-plugin-import**: Import/export syntax validation
- **eslint-plugin-security**: Security-focused linting rules
- **eslint-plugin-risxss**: XSS prevention for React

### Internal Dependencies

- **@coze-arch/eslint-plugin**: Custom rules for Coze architecture
- **@coze-arch/ts-config**: TypeScript configuration

### Build Tools

- **sucrase**: Fast TypeScript transpilation
- **prettier**: Code formatting
- **eslint**: Core linting engine

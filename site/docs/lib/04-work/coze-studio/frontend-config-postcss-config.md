---
title: "@coze-arch/postcss-config"
sourceId: "04-work/coze-studio"
sourceTitle: "Coze Studio 源码研读"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "04-work"
sourceUrl: "https://github.com/coze-dev/coze-studio"
entryUrl: "https://github.com/coze-dev/coze-studio/blob/fefb05ff27be1da939612fbf9faf5db62583b8ae/frontend/config/postcss-config/README.md"
sourceRel: "frontend/config/postcss-config/README.md"
rawUrl: "/raw/04-work/coze-studio/frontend/config/postcss-config/README.md"
sourceSha256: "64ff6cc88b4b5ad40089b06f2c711860e5ee760273a7954ecb4390d4aece756b"
pageSha256: "64ff6cc88b4b5ad40089b06f2c711860e5ee760273a7954ecb4390d4aece756b"
contentMode: "local-full"
zh: ""
---

# @coze-arch/postcss-config

A shared PostCSS configuration for Coze architecture projects that provides a standardized set of PostCSS plugins for modern CSS preprocessing and Tailwind CSS integration.

## Features

- **PostCSS Import**: Process `@import` statements and inline imported files
- **Tailwind CSS Nesting**: Full support for CSS nesting with Tailwind CSS compatibility
- **Autoprefixer**: Automatic vendor prefixing for cross-browser compatibility
- **Modern CSS Support**: Enhanced pseudo-class support with `:is()` functionality
- **Zero Configuration**: Works out of the box with sensible defaults
- **Optimized Build**: Configured for both development and production workflows

## Get Started

### Installation

```bash
# Install as a workspace dependency
npm install @coze-arch/postcss-config@workspace:*

# Update rush dependencies
rush update
```

### Basic Usage

Create a `postcss.config.js` file in your project root:

```javascript
module.exports = require('@coze-arch/postcss-config');
```

Or extend the configuration:

```javascript
const baseConfig = require('@coze-arch/postcss-config');

module.exports = {
  ...baseConfig,
  plugins: {
    ...baseConfig.plugins,
    // Add your custom plugins here
    'postcss-custom-plugin': {},
  },
};
```

### Integration with Build Tools

#### Webpack

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader', // Will automatically use postcss.config.js
        ],
      },
    ],
  },
};
```

#### Vite

```javascript
// vite.config.js
export default {
  css: {
    postcss: require('@coze-arch/postcss-config'),
  },
};
```

#### Rsbuild

```javascript
// rsbuild.config.js
export default {
  tools: {
    postcss: require('@coze-arch/postcss-config'),
  },
};
```

## API Reference

### Default Configuration

The package exports a PostCSS configuration object with the following plugins:

```javascript
{
  plugins: {
    'postcss-import': {},
    'tailwindcss/nesting': 'postcss-nesting',
    'tailwindcss': {},
    'autoprefixer': {},
    '@csstools/postcss-is-pseudo-class': {},
  }
}
```

### Plugin Details

#### postcss-import
- **Purpose**: Processes `@import` statements and inlines imported CSS files
- **Configuration**: Default settings (empty object)
- **Use Case**: Modular CSS organization and file imports

#### tailwindcss/nesting
- **Purpose**: Enables CSS nesting syntax compatible with Tailwind CSS
- **Configuration**: Uses `postcss-nesting` as the nesting implementation
- **Use Case**: Writing nested CSS with Tailwind utility classes

#### tailwindcss
- **Purpose**: Processes Tailwind CSS utility classes and directives
- **Configuration**: Default settings (reads from `tailwind.config.js`)
- **Use Case**: Utility-first CSS framework integration

#### autoprefixer
- **Purpose**: Automatically adds vendor prefixes to CSS properties
- **Configuration**: Default settings (uses browserslist configuration)
- **Use Case**: Cross-browser compatibility without manual prefixing

#### @csstools/postcss-is-pseudo-class
- **Purpose**: Transforms `:is()` pseudo-class for better browser support
- **Configuration**: Default settings
- **Use Case**: Modern CSS pseudo-class support in older browsers

### Customization Examples

#### Adding Custom Plugins

```javascript
const baseConfig = require('@coze-arch/postcss-config');

module.exports = {
  ...baseConfig,
  plugins: {
    ...baseConfig.plugins,
    'postcss-custom-properties': {
      preserve: false,
    },
    'cssnano': {
      preset: 'default',
    },
  },
};
```

#### Plugin Order Customization

```javascript
const baseConfig = require('@coze-arch/postcss-config');

module.exports = {
  plugins: {
    'postcss-import': baseConfig.plugins['postcss-import'],
    'custom-plugin': {},
    'tailwindcss/nesting': baseConfig.plugins['tailwindcss/nesting'],
    'tailwindcss': baseConfig.plugins['tailwindcss'],
    'autoprefixer': baseConfig.plugins['autoprefixer'],
    '@csstools/postcss-is-pseudo-class': baseConfig.plugins['@csstools/postcss-is-pseudo-class'],
  },
};
```

## Development

### Project Structure

```
config/postcss-config/
├── src/
│   └── index.js          # Main configuration export
├── package.json          # Package configuration
├── eslint.config.js      # ESLint configuration
├── tsconfig.*.json       # TypeScript configurations
└── README.md            # This file
```

### Development Commands

```bash
# Lint the code
rush lint

# Run all checks
rush build
```

---
title: "@coze-arch/bot-semi"
sourceId: "04-work/coze-studio"
sourceTitle: "Coze Studio 源码研读"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "04-work"
sourceUrl: "https://github.com/coze-dev/coze-studio"
entryUrl: "https://github.com/coze-dev/coze-studio/blob/fefb05ff27be1da939612fbf9faf5db62583b8ae/frontend/packages/components/bot-semi/README.md"
sourceRel: "frontend/packages/components/bot-semi/README.md"
rawUrl: "/raw/04-work/coze-studio/frontend/packages/components/bot-semi/README.md"
sourceSha256: "3cc1ff58111f083af9a9e1f54f53f029a2f9d1b34226235f0c8ef7aa51f6f316"
pageSha256: "3cc1ff58111f083af9a9e1f54f53f029a2f9d1b34226235f0c8ef7aa51f6f316"
contentMode: "local-full"
zh: ""
---

# @coze-arch/bot-semi

A comprehensive UI component library that provides wrapped and enhanced components based on SemiDesign UI framework. This package serves as the foundation UI layer for the Coze bot studio platform, offering both direct Semi UI re-exports and custom-styled components.

## Features

- **Enhanced Semi UI Components** - Custom-styled versions of Semi UI components with platform-specific theming
- **Direct Semi UI Re-exports** - Access to all Semi UI components through a single package
- **Custom Hooks** - Specialized hooks like `useGrab` for advanced UI interactions
- **TypeScript Support** - Full TypeScript definitions and type safety
- **Modular Exports** - Individual component imports for optimal bundle size
- **Platform Integration** - Built-in integration with Coze icons and internationalization

## Get Started

### Installation

Add the package to your project using workspace dependencies:

```json
{
  "dependencies": {
    "@coze-arch/bot-semi": "workspace:*"
  }
}
```

Then run:

```bash
rush update
```

### Basic Usage

Import components individually for optimal tree-shaking:

```tsx
import { UIButton, UIModal, useUIModal } from '@coze-arch/bot-semi';
import { Button, Input, Table } from '@coze-arch/bot-semi';

function MyComponent() {
  const modal = useUIModal();

  return (
    <div>
      <UIButton onClick={() => modal.show()}>
        Open Modal
        Modal Content
    </div>
  );
}
```

## API Reference

### Enhanced UI Components

#### UIButton
Custom-styled button component with enhanced theming:

```tsx
import { UIButton } from '@coze-arch/bot-semi/Button';

  Click me
```

#### UIModal
Enhanced modal with platform-specific styling and behavior:

```tsx
import { UIModal, useUIModal } from '@coze-arch/bot-semi/Modal';

const modal = useUIModal();

<UIModal
  type="info"
  showScrollBar={false}
  {...modal.props}
>
  Content
```

#### UITable
Feature-rich table component with action integration:

```tsx
import { UITable, UITableAction } from '@coze-arch/bot-semi';

<UITable
  columns={columns}
  dataSource={data}
  renderActions={(record) => (
    <UITableAction
      items={[
        { key: 'edit', label: 'Edit' },
        { key: 'delete', label: 'Delete' }
      ]}
    />
  )}
/>
```

#### UIInput
Enhanced input component with platform styling:

```tsx
import { UIInput } from '@coze-arch/bot-semi/Input';

<UIInput
  placeholder="Enter text"
  size="default"
/>
```

### Form Components

#### UIFormInput, UIFormTextArea, UIFormSelect
Pre-configured form components:

```tsx
import { UIFormInput, UIFormTextArea, UIFormSelect } from '@coze-arch/bot-semi';

```

### Layout Components

#### UILayout
Platform-specific layout wrapper:

```tsx
import { UILayout } from '@coze-arch/bot-semi/Layout';

<UILayout header={<Header />} footer={<Footer />}>
```

#### UITabBar
Enhanced tab navigation:

```tsx
import { UITabBar } from '@coze-arch/bot-semi';

<UITabBar
  tabs={[
    { key: 'tab1', label: 'Tab 1' },
    { key: 'tab2', label: 'Tab 2' }
  ]}
  activeKey="tab1"
  onChange={handleTabChange}
/>
```

### Utility Components

#### UIEmpty
Customized empty state component:

```tsx
import { UIEmpty } from '@coze-arch/bot-semi/Empty';

<UIEmpty
  image={UIEmpty.PRESENTED_IMAGE_SIMPLE}
  description="No data available"
/>
```

#### UITag
Enhanced tag component with color variants:

```tsx
import { UITag } from '@coze-arch/bot-semi/Tag';

  Sample Tag
```

### Hooks

#### useGrab
Hook for drag-and-drop functionality:

```tsx
import { useGrab } from '@coze-arch/bot-semi';

const targetRef = useRef(null);
const { subscribeGrab, grabbing } = useGrab({
  grabTarget: targetRef,
  isModifyStyle: true,
  onPositionChange: ({ left, top }) => {
    console.log('Position:', { left, top });
  }
});

useEffect(() => {
  const unsubscribe = subscribeGrab();
  return unsubscribe;
}, []);
```

#### useUIModal
Hook for modal state management:

```tsx
import { useUIModal } from '@coze-arch/bot-semi';

const modal = useUIModal();

// Show modal
modal.show();

// Hide modal
modal.hide();

// Use props in component
```

### Semi UI Re-exports

All Semi UI components are available as direct imports:

```tsx
import {
  Button,
  Input,
  Table,
  Form,
  DatePicker,
  Select,
  // ... all other Semi UI components
} from '@coze-arch/bot-semi';
```

## Development

### Project Structure

```
src/
├── components/          # Enhanced UI components
│   ├── ui-button/      # Custom button implementation
│   ├── ui-modal/       # Custom modal implementation
│   ├── ui-table/       # Custom table implementation
│   └── ...
├── hooks/              # Custom hooks
│   └── use-grab.ts     # Drag and drop hook
├── semi/               # Semi UI re-exports
│   ├── index.ts        # Main re-export file
│   ├── button.ts       # Button types re-export
│   └── ...
└── utils/              # Utility functions
```

### Build Commands

```bash
# Type checking
rush ts-check

# Linting
rush lint

# Testing
rush test

# Test with coverage
rush test:cov
```

---
title: "Software Design Notes"
sourceId: "09-harness/learn-harness-engineering"
sourceTitle: "Learn Harness Engineering"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/walkinglabs/learn-harness-engineering"
entryUrl: "https://github.com/walkinglabs/learn-harness-engineering/blob/77e7a3e21469dcbece2558086c8d91657abeaa40/projects/shared/data/sample-documents/design-notes.md"
sourceRel: "projects/shared/data/sample-documents/design-notes.md"
rawUrl: "/raw/09-harness/learn-harness-engineering/projects/shared/data/sample-documents/design-notes.md"
sourceSha256: "b65f92b9f6ccca9409a82c264167525c6c4c54e30968b1003f2d3f8f18fbc5a8"
pageSha256: "b65f92b9f6ccca9409a82c264167525c6c4c54e30968b1003f2d3f8f18fbc5a8"
contentMode: "local-full"
zh: ""
---

# Software Design Notes

## Architecture Overview

The knowledge base application follows a layered architecture pattern with clear separation of concerns. The system is divided into four primary layers: the main process, preload scripts, the renderer layer, and services.

## Main Process

The main process is responsible for window management, IPC handler registration, and lifecycle management. It serves as the entry point for the Electron application and coordinates between the operating system and the renderer process.

Key responsibilities:
- BrowserWindow creation and configuration
- IPC channel registration
- Service initialization and dependency injection
- Application lifecycle events (ready, window-all-closed, activate)

## Preload Layer

The preload script acts as a secure bridge between the main and renderer processes. It uses Electron's contextBridge to expose a typed API to the renderer without granting full Node.js access.

The exposed API is organized into three namespaces:
- `documents` - CRUD operations for document management
- `indexing` - Document chunking and index management
- `qa` - Question answering with citations

## Renderer Layer

The renderer uses React with TypeScript to build the user interface. Components communicate exclusively through the preload bridge API, never directly accessing Node.js APIs or the filesystem.

## Services Layer

Business logic lives in service classes that run in the main process:
- `PersistenceService` - Filesystem read/write operations
- `DocumentService` - Document import, storage, and retrieval
- `IndexingService` - Text chunking and index building
- `QaService` - Mock Q&A with citation support

## Data Flow

1. User action in renderer triggers IPC call via preload bridge
2. IPC handler in main process delegates to appropriate service
3. Service performs business logic using persistence layer
4. Result flows back through IPC to renderer for display

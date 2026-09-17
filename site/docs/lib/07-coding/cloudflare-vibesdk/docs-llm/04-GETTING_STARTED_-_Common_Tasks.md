---
title: "🚀 GETTING STARTED - Common Tasks"
sourceId: "07-coding/cloudflare-vibesdk"
sourceTitle: "Cloudflare VibeSDK"
sourceKind: "产品仓库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/cloudflare/vibesdk"
entryUrl: "https://github.com/cloudflare/vibesdk/blob/9da158d82c597a0e8f4bf033cdccd1053fb6fb15/docs/llm.md"
sourceRel: "docs/llm.md"
rawUrl: "/raw/07-coding/cloudflare-vibesdk/docs/llm.md"
sourceSha256: "5cade1cd8dea6404f985f3f367e0c0233441fc841f741f71f3da1e6c1e0c9cf7"
pageSha256: "2c458c5df395d60e9b37e302795a216759ace272eed7e8196a8dd2b232abc555"
contentMode: "local-full"
zh: ""
---

# 🚀 GETTING STARTED - Common Tasks

## **Adding a New LLM Tool**

**Steps:**
1. Create tool file: `/worker/agents/tools/toolkit/my-new-tool.ts`
2. Structure:
```typescript
import { CodingAgentInterface } from 'worker/agents/services/implementations/CodingAgent';
import { StructuredLogger } from '../../../logger';

export function createMyNewTool(agent: CodingAgentInterface, logger: StructuredLogger) {
  return {
    type: 'function' as const,
    function: {
      name: 'my_new_tool',
      description: 'Clear 2-3 line description. LLM uses this to decide when to call.',
      parameters: {
        type: 'object',
        properties: {
          input: {
            type: 'string',
            description: 'What this parameter does'
          }
        },
        required: ['input']
      }
    },
    implementation: async (args: { input: string }) => {
      logger.info('Tool called', { args });
      // Your logic here
      return { result: 'success' };
    }
  };
}
```
3. Register in `/worker/agents/tools/customTools.ts`:
   - Import: `import \{ createMyNewTool \} from './toolkit/my-new-tool';`
   - Add to `buildTools()` array (line 44): `createMyNewTool(agent, logger),`
4. Tool is now available to conversation agent (Orange AI)

## **Modifying Deep Debugger Behavior**

**File:** `/worker/agents/assistants/codeDebugger.ts`

**System prompt sections:**
- **Identity** (lines 11-25): Who the debugger is
- **Available Tools** (lines 27-70): Tool descriptions (keep concise!)
- **Required Workflow** (lines 72-80): Step-by-step process
- **Diagnostic Priority** (lines 82-110): When to use which tool
- **Action-Oriented** (lines 112-120): Prevents "explain instead of do"
- **Common Pitfalls** (lines 122-140): What NOT to do

**To change tool priority:** Edit "Diagnostic Priority" section

**To add tool to debugger:**
1. Create tool in `/worker/agents/tools/toolkit/`
2. Import in `customTools.ts`
3. Add to `buildDebugTools()` function (line 59)
4. Update debugger system prompt's "Available Tools" section

## **Adding a New WebSocket Message Type**

**Backend:**
1. Add type to `/worker/agents/constants.ts`:
   - `WebSocketMessageRequests` (client → server)
   - `WebSocketMessageResponses` (server → client)
2. Handle in `/worker/agents/core/websocket.ts` → `handleWebSocketMessage()`
3. Send via `sendToConnection(connection, messageType, data)`

**Frontend:**
1. Add type to `/src/api-types.ts` → `WebSocketMessage` union
2. Handle in `/src/routes/chat/utils/handle-websocket-message.ts`
3. Update state in handler

## **Modifying Database Schema**

**Steps:**
1. Edit `/worker/database/schema.ts`
2. Generate migration: `npm run db:generate`
3. Review SQL in `/migrations/\{number\}_*.sql`
4. Apply locally: `npm run db:migrate:local`
5. Test changes
6. Apply to production: `npm run db:migrate:remote`

**Never:** Manually edit migration files

## **Adding a New Database Service Method**

**Example:** Add method to UserService

**File:** `/worker/database/services/UserService.ts`

```typescript
export class UserService extends BaseService {
  // Existing methods...
  
  async getNewMethod(userId: string): Promise<ResultType> {
    // Use 'fresh' for user's own data
    const readDb = this.getReadDb('fresh');
    
    const result = await readDb
      .select()
      .from(schema.users)
      .where(eq(schema.users.id, userId));
      
    if (!result) throw new Error('Not found');
    return result;
  }
}
```

**Call from controller:**
```typescript
const userService = new UserService(c.env);
const data = await userService.getNewMethod(userId);
```

## **Understanding Agent State Machine**

**Current state:** Check `agent.state.currentDevState`

**States:** Defined in `/worker/agents/core/state.ts` → `CurrentDevState` enum
- `IDLE` (0): No generation
- `PHASE_GENERATING` (1): Planning next phase  
- `PHASE_IMPLEMENTING` (2): Generating files
- `REVIEWING` (3): Code review
- `FINALIZING` (4): Final touches

**State machine logic:** `/worker/agents/core/simpleGeneratorAgent.ts` → `launchStateMachine()` (line 856)

**Operations:**
- Phase Generation: `/worker/agents/operations/PhaseGeneration.ts`
- Phase Implementation: `/worker/agents/operations/PhaseImplementation.ts`
- Code Review: `/worker/agents/operations/PostPhaseCodeFixer.ts`
- Conversation: `/worker/agents/operations/UserConversationProcessor.ts`

## **Finding Where Something is Implemented**

**"Where is X implemented?"**

| Feature | Primary Location |
|---------|------------------|
| Agent state machine | `/worker/agents/core/simpleGeneratorAgent.ts` → `launchStateMachine()` |
| Blueprint generation | `/worker/agents/operations/PhaseGeneration.ts` → system prompt |
| File generation | `/worker/agents/operations/PhaseImplementation.ts` |
| Chat messages | `/worker/agents/operations/UserConversationProcessor.ts` |
| Deep debugging | `/worker/agents/assistants/codeDebugger.ts` |
| Sandbox deployment | `/worker/agents/services/implementations/DeploymentManager.ts` |
| Git operations | `/worker/agents/services/implementations/GitService.ts` |
| WebSocket handling | `/worker/agents/core/websocket.ts` → `handleWebSocketMessage()` |
| Database queries | `/worker/database/services/\{Domain\}Service.ts` |
| API routes | `/worker/api/routes/*.ts` |
| API controllers | `/worker/api/controllers/\{domain\}/controller.ts` |
| Frontend API calls | `/src/lib/api-client.ts` (ALL calls in one place) |
| Chat UI state | `/src/routes/chat/hooks/use-chat.ts` |
| Phase timeline UI | `/src/routes/chat/components/phase-timeline.tsx` |
| Auth guards | `/src/hooks/useAuthGuard.ts` |

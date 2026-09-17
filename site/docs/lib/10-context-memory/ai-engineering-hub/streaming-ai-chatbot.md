---
title: "Streaming AI Chatbot"
sourceId: "10-context-memory/ai-engineering-hub"
sourceTitle: "AI Engineering Hub"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/patchy631/ai-engineering-hub"
entryUrl: "https://github.com/patchy631/ai-engineering-hub/blob/2c9b106168d4540b88e727e4aa316c06c856c2b7/streaming-ai-chatbot/README.md"
sourceRel: "streaming-ai-chatbot/README.md"
rawUrl: "/raw/10-context-memory/ai-engineering-hub/streaming-ai-chatbot/README.md"
sourceSha256: "72841dfc30c7da641e64ac43d906bb48b8198741b24a8177fcc6383326aadc6a"
pageSha256: "72841dfc30c7da641e64ac43d906bb48b8198741b24a8177fcc6383326aadc6a"
contentMode: "local-full"
zh: ""
---

# Streaming AI Chatbot

A minimal example demonstrating **real-time AI streaming** and **conversation state management** using the Motia framework.
![streaming-ai-chatbot](https://gh-proxy.com/https://raw.githubusercontent.com/patchy631/ai-engineering-hub/2c9b106168d4540b88e727e4aa316c06c856c2b7/streaming-ai-chatbot/docs/images/streaming-ai-chatbot.gif)

## 🚀 Features

- **Real-time AI Streaming**: Token-by-token response generation using OpenAI's streaming API
- **Live State Management**: Conversation state updates in real-time with message history
- **Event-driven Architecture**: Clean API → Event → Streaming Response flow
- **Minimal Complexity**: Maximum impact with just 3 core files

## 📁 Architecture

```
streaming-ai-chatbot/
├── steps/
│   ├── conversation.stream.ts    # Real-time conversation state
│   ├── chat-api.step.ts         # Simple chat API endpoint  
│   └── ai-response.step.ts      # Streaming AI response handler
├── package.json                 # Dependencies
├── tsconfig.json               # TypeScript configuration
└── README.md                    # This file
```

## 🛠️ Setup

### Installation & Setup

```bash
# Clone the repository
git clone https://github.com/patchy631/ai-engineering-hub.git
cd streaming-ai-chatbot

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Configure OpenAI API
   ```bash
   cp .env.example .env
   # Edit .env and add your OpenAI API key
   ```

**Open Motia Workbench**:
   Navigate to `http://localhost:3000` to interact with the chatbot

## 🔧 Usage

### Send a Chat Message

**POST** `/chat`

```json
{
  "message": "Hello, how are you?",
  "conversationId": "optional-conversation-id"  // Optional: If not provided, a new conversation will be created
}
```

**Response:**
```json
{
  "conversationId": "uuid-v4",
  "message": "Message received, AI is responding...",
  "status": "streaming"
}
```

The response will update as the AI processes the message, with possible status values:
- `created`: Initial message state
- `streaming`: AI is generating the response
- `completed`: Response is complete with full message

When completed, the response will contain the actual AI message instead of the processing message.

### Real-time State Updates

The conversation state stream provides live updates as the AI generates responses:

- **User messages**: Immediately stored with `status: 'completed'`
- **AI responses**: Start with `status: 'streaming'`, update in real-time, end with `status: 'completed'`

## 🎯 Key Concepts Demonstrated

### 1. **Streaming API Integration**
```typescript
const stream = await openai.chat.completions.create({
  model: 'gpt-4o-mini',
  messages: [...],
  stream: true, // Enable streaming
})

for await (const chunk of stream) {
  // Update state with each token
  await streams.conversation.set(conversationId, messageId, {
    message: fullResponse,
    status: 'streaming',
    // ...
  })
}
```

### 2. **Real-time State Management**
```typescript
export const config: StreamConfig = {
  name: 'conversation',
  schema: z.object({
    message: z.string(),
    from: z.enum(['user', 'assistant']),
    status: z.enum(['created', 'streaming', 'completed']),
    timestamp: z.string(),
  }),
  baseConfig: { storageType: 'default' },
}
```

### 3. **Event-driven Flow**
```typescript
// API emits event
await emit({
  topic: 'chat-message',
  data: { message, conversationId, assistantMessageId },
})

// Event handler subscribes and processes
export const config: EventConfig = {
  subscribes: ['chat-message'],
  // ...
}
```

## 🌟 Why This Example Matters

This example showcases Motia's power in just **3 files**:

- **Effortless streaming**: Real-time AI responses with automatic state updates
- **Type-safe events**: End-to-end type safety from API to event handlers
- **Built-in state management**: No external state libraries needed
- **Scalable architecture**: Event-driven design that grows with your needs

Perfect for demonstrating how Motia makes complex real-time applications simple and maintainable.

## 🔑 Environment Variables

- `OPENAI_API_KEY`: Your OpenAI API key (required)
- `AZURE_OPENAI_ENDPOINT`: Your Azure OpenAI endpoint URL (optional)
- `AZURE_OPENAI_API_KEY`: Your Azure OpenAI API key (optional)

## 📝 Notes

- Azure OpenAI integration code is included but commented out for demo purposes
- The example uses `gpt-4o-mini` model for cost-effective responses
- All conversation data is stored in Motia's built-in state management

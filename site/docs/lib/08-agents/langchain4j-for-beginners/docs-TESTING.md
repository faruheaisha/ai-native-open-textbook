---
title: "Testing LangChain4j Applications"
sourceId: "08-agents/langchain4j-for-beginners"
sourceTitle: "LangChain4j for Beginners"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://github.com/microsoft/LangChain4j-for-Beginners"
entryUrl: "https://github.com/microsoft/LangChain4j-for-Beginners/blob/9aed2ec27717775def0da2ff2d7950baa8995a64/README.md"
zh: ""
---

# Testing LangChain4j Applications

## Table of Contents

- [Quick Start](#quick-start)
- [What the Tests Cover](#what-the-tests-cover)
- [Running the Tests](#running-the-tests)
- [Running Tests in VS Code](#running-tests-in-vs-code)
- [Testing Patterns](#testing-patterns)
- [Testing Philosophy](#testing-philosophy)
- [Next Steps](#next-steps)

This guide walks you through the tests that demonstrate how to test AI applications without requiring API keys or external services.

## Quick Start

Run all tests with a single command:

**Bash:**
```bash
mvn test
```

**PowerShell:**
```powershell
mvn --% test
```

When all tests pass, you should see output like the screenshot below — tests run with zero failures.

<img src="/mirror/a0/a0d76d22e2852e9cabd739faa794a845447d3407.png" alt="Successful Test Results" width="800"/>

*Successful test execution showing all tests passing with zero failures*

## What the Tests Cover

This course focuses on **unit tests** that run locally. Each test demonstrates a specific LangChain4j concept in isolation. The testing pyramid below shows where unit tests fit — they form the fast, reliable foundation that the rest of your test strategy builds on.

<img src="/mirror/e3/e31092a64faf0218562afe39e50ce5723352a15a.png" alt="Testing Pyramid" width="800"/>

*Testing pyramid showing the balance between unit tests (fast, isolated), integration tests (real components), and end-to-end tests. This training covers unit testing.*

| Module | Tests | Focus | Key Files |
|--------|-------|-------|-----------|
| **01 - Introduction** | 8 | Conversation memory and stateful chat | `SimpleConversationTest.java` |
| **02 - Prompt Engineering** | 12 | GPT-5.2 patterns, eagerness levels, structured output | `SimpleGpt5PromptTest.java` |
| **03 - RAG** | 10 | Document ingestion, embeddings, similarity search | `DocumentServiceTest.java` |
| **04 - Tools** | 12 | Function calling and tool chaining | `SimpleToolsTest.java` |
| **05 - MCP** | 8 | Model Context Protocol with Stdio transport | `SimpleMcpTest.java` |

## Running the Tests

**Run all tests from root:**

**Bash:**
```bash
mvn test
```

**PowerShell:**
```powershell
mvn --% test
```

**Run tests for a specific module:**

**Bash:**
```bash
cd 01-introduction && mvn test
# Or from root
mvn test -pl 01-introduction
```

**PowerShell:**
```powershell
cd 01-introduction; mvn --% test
# Or from root
mvn --% test -pl 01-introduction
```

**Run a single test class:**

**Bash:**
```bash
mvn test -Dtest=SimpleConversationTest
```

**PowerShell:**
```powershell
mvn --% test -Dtest=SimpleConversationTest
```

**Run a specific test method:**

**Bash:**
```bash
mvn test -Dtest=SimpleConversationTest#shouldMaintainConversationHistory
```

**PowerShell:**
```powershell
mvn --% test -Dtest=SimpleConversationTest#shouldMaintainConversationHistory
```

## Running Tests in VS Code

If you're using Visual Studio Code, the Test Explorer provides a graphical interface for running and debugging tests.

<img src="/mirror/15/15f29d3f210177eeac715fe57d545c7b6ba72691.png" alt="VS Code Test Explorer" width="800"/>

*VS Code Test Explorer showing the test tree with all Java test classes and individual test methods*

**To run tests in VS Code:**

1. Open the Test Explorer by clicking the beaker icon in the Activity Bar
2. Expand the test tree to see all modules and test classes
3. Click the play button next to any test to run it individually
4. Click "Run All Tests" to execute the entire suite
5. Right-click any test and select "Debug Test" to set breakpoints and step through code

The Test Explorer shows green checkmarks for passing tests and provides detailed failure messages when tests fail.

## Testing Patterns

### Pattern 1: Testing Prompt Templates

The simplest pattern tests prompt templates without calling any AI model. You verify that variable substitution works correctly and prompts are formatted as expected.

<img src="/mirror/d7/d738cf4804ea1c2f675c995ae08a6788b9a0adc1.png" alt="Prompt Template Testing" width="800"/>

*Testing prompt templates showing variable substitution flow: template with placeholders → values applied → formatted output verified*

```java
@Test
@DisplayName("Should format prompt template with variables")
void testPromptTemplateFormatting() {
    PromptTemplate template = PromptTemplate.from(
        "Best time to visit {{destination}} for {{activity}}?"
    );
    
    Prompt prompt = template.apply(Map.of(
        "destination", "Paris",
        "activity", "sightseeing"
    ));
    
    assertThat(prompt.text()).isEqualTo("Best time to visit Paris for sightseeing?");
}
```

This pattern verifies that variable substitution works correctly and prompts are formatted as expected — no API key or model call required.

### Pattern 2: Mocking Language Models

When testing conversation logic, use Mockito to create fake models that return predetermined responses. This makes tests fast, free, and deterministic.

<img src="/mirror/ae/ae51cb63e1a68118c242405b1d5391e11d044cbf.png" alt="Mock vs Real API Comparison" width="800"/>

*Comparison showing why mocks are preferred for testing: they're fast, free, deterministic, and require no API keys*

```java
@ExtendWith(MockitoExtension.class)
class SimpleConversationTest {
    
    private ConversationService conversationService;
    
    @Mock
    private OpenAiOfficialChatModel mockChatModel;
    
    @BeforeEach
    void setUp() {
        ChatResponse mockResponse = ChatResponse.builder()
            .aiMessage(AiMessage.from("This is a test response"))
            .build();
        when(mockChatModel.chat(anyList())).thenReturn(mockResponse);
        
        conversationService = new ConversationService(mockChatModel);
    }
    
    @Test
    void shouldMaintainConversationHistory() {
        String conversationId = conversationService.startConversation();
        
        ChatResponse mockResponse1 = ChatResponse.builder()
            .aiMessage(AiMessage.from("Response 1"))
            .build();
        ChatResponse mockResponse2 = ChatResponse.builder()
            .aiMessage(AiMessage.from("Response 2"))
            .build();
        ChatResponse mockResponse3 = ChatResponse.builder()
            .aiMessage(AiMessage.from("Response 3"))
            .build();
        
        when(mockChatModel.chat(anyList()))
            .thenReturn(mockResponse1)
            .thenReturn(mockResponse2)
            .thenReturn(mockResponse3);

        conversationService.chat(conversationId, "First message");
        conversationService.chat(conversationId, "Second message");
        conversationService.chat(conversationId, "Third message");

        List<ChatMessage> history = conversationService.getHistory(conversationId);
        assertThat(history).hasSize(6); // 3 user + 3 AI messages
    }
}
```

This pattern appears in `01-introduction/src/test/java/com/example/langchain4j/service/SimpleConversationTest.java`. The mock ensures consistent behavior so you can verify memory management works correctly.

### Pattern 3: Testing Conversation Isolation

Conversation memory must keep multiple users separate. This test verifies that conversations don't mix contexts.

<img src="/mirror/e9/e90422334483acbfea641344ae319d90c79bedae.png" alt="Conversation Isolation" width="800"/>

*Testing conversation isolation showing separate memory stores for different users to prevent context mixing*

```java
@Test
void shouldIsolateConversationsByid() {
    String conv1 = conversationService.startConversation();
    String conv2 = conversationService.startConversation();
    
    ChatResponse mockResponse = ChatResponse.builder()
        .aiMessage(AiMessage.from("Response"))
        .build();
    when(mockChatModel.chat(anyList())).thenReturn(mockResponse);

    conversationService.chat(conv1, "Message for conversation 1");
    conversationService.chat(conv2, "Message for conversation 2");

    List<ChatMessage> history1 = conversationService.getHistory(conv1);
    List<ChatMessage> history2 = conversationService.getHistory(conv2);
    
    assertThat(history1).hasSize(2);
    assertThat(history2).hasSize(2);
}
```

Each conversation maintains its own independent history. In production systems, this isolation is critical for multi-user applications.

### Pattern 4: Testing Tools Independently

Tools are functions the AI can call. Test them directly to ensure they work correctly regardless of AI decisions.

<img src="/mirror/48/48651d0eec162b17ac072017fdf70a548e64f05d.png" alt="Tools Testing" width="800"/>

*Testing tools independently showing mock tool execution without AI calls to verify business logic*

```java
@Test
void shouldConvertCelsiusToFahrenheit() {
    TemperatureTool tempTool = new TemperatureTool();
    String result = tempTool.celsiusToFahrenheit(25.0);
    assertThat(result).containsPattern("77[.,]0°F");
}

@Test
void shouldDemonstrateToolChaining() {
    WeatherTool weatherTool = new WeatherTool();
    TemperatureTool tempTool = new TemperatureTool();

    String weatherResult = weatherTool.getCurrentWeather("Seattle");
    assertThat(weatherResult).containsPattern("\\d+°C");

    String conversionResult = tempTool.celsiusToFahrenheit(22.0);
    assertThat(conversionResult).containsPattern("71[.,]6°F");
}
```

These tests from `04-tools/src/test/java/com/example/langchain4j/agents/tools/SimpleToolsTest.java` validate tool logic without AI involvement. The chaining example shows how one tool's output feeds into another's input.

### Pattern 5: In-Memory RAG Testing

RAG systems traditionally require vector databases and embedding services. The in-memory pattern lets you test the entire pipeline without external dependencies.

<img src="/mirror/97/979ca09aa4e330a90ce870660227b61fd780a062.png" alt="In-Memory RAG Testing" width="800"/>

*In-memory RAG testing workflow showing document parsing, embedding storage, and similarity search without requiring a database*

```java
@Test
void testProcessTextDocument() {
    String content = "This is a test document.\nIt has multiple lines.";
    InputStream inputStream = new ByteArrayInputStream(content.getBytes(StandardCharsets.UTF_8));
    
    DocumentService.ProcessedDocument result = 
        documentService.processDocument(inputStream, "test.txt");

    assertNotNull(result);
    assertTrue(result.segments().size() > 0);
    assertEquals("test.txt", result.segments().get(0).metadata().getString("filename"));
}
```

This test from `03-rag/src/test/java/com/example/langchain4j/rag/service/DocumentServiceTest.java` creates a document in memory and verifies chunking and metadata handling.

### Pattern 6: MCP Integration Testing

The MCP module tests the Model Context Protocol integration using stdio transport. These tests verify that your application can spawn and communicate with MCP servers as subprocesses.

The tests in `05-mcp/src/test/java/com/example/langchain4j/mcp/SimpleMcpTest.java` validate MCP client behavior.

**Run them:**

**Bash:**
```bash
cd 05-mcp && mvn test
```

**PowerShell:**
```powershell
cd 05-mcp; mvn --% test
```

## Testing Philosophy

Test your code, not the AI. Your tests should validate the code you write by checking how prompts are constructed, how memory is managed, and how tools execute. AI responses vary and shouldn't be part of test assertions. Ask yourself whether your prompt template correctly substitutes variables, not whether the AI gives the right answer.

Use mocks for language models. They're external dependencies that are slow, expensive, and non-deterministic. Mocking makes tests fast with milliseconds instead of seconds, free with no API costs, and deterministic with the same result every time.

Keep tests independent. Each test should set up its own data, not rely on other tests, and clean up after itself. Tests should pass regardless of execution order.

Test edge cases beyond the happy path. Try empty inputs, very large inputs, special characters, invalid parameters, and boundary conditions. These often reveal bugs that normal usage doesn't expose.

Use descriptive names. Compare `shouldMaintainConversationHistoryAcrossMultipleMessages()` with `test1()`. The first tells you exactly what's being tested, making debugging failures much easier.

## Next Steps

Now that you understand the testing patterns, dive deeper into each module:

- **[01 - Introduction](/lib/08-agents/langchain4j-for-beginners/01-introduction)** - Learn conversation memory management
- **[02 - Prompt Engineering](/lib/08-agents/langchain4j-for-beginners/02-prompt-engineering)** - Master GPT-5.2 prompting patterns
- **[03 - RAG](/lib/08-agents/langchain4j-for-beginners/03-rag)** - Build retrieval-augmented generation systems
- **[04 - Tools](/lib/08-agents/langchain4j-for-beginners/04-tools)** - Implement function calling and tool chains
- **[05 - MCP](/lib/08-agents/langchain4j-for-beginners/05-mcp)** - Integrate Model Context Protocol

Each module's README provides detailed explanations of the concepts tested here.

---

**Navigation:** [← Back to Main](/lib/08-agents/langchain4j-for-beginners/overview)

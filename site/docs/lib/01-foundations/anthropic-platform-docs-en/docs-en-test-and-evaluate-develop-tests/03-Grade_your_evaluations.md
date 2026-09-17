---
title: "Anthropic 平台文档（英文全量）"
sourceId: "01-foundations/anthropic-platform-docs-en"
sourceTitle: "Anthropic 平台文档（英文全量）"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "01-foundations"
sourceUrl: "https://platform.claude.com/docs"
entryUrl: "https://platform.claude.com/docs"
sourceRel: "docs/en/test-and-evaluate/develop-tests.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/test-and-evaluate/develop-tests.md"
sourceSha256: "df88c8c7e4b3990cbb558d16fcf6e02c4a542e576079e96b377ecaf24e525138"
pageSha256: "1a7735a9b86fd07586c93d74e35dae58df16dfb154009d3270fb730ca9fc5dd4"
contentMode: "local-full"
zh: ""
---

## Grade your evaluations

When deciding which method to use to grade evals, choose the fastest, most reliable, most scalable method:

1. **Code-based grading:** Fastest and most reliable, extremely scalable, but also lacks nuance for more complex judgments that require less rule-based rigidity.

   * Exact match: `output == golden_answer`
   * String match: `key_phrase in output`

2. **Human grading:** Most flexible and high quality, but slow and expensive. Avoid if possible.

3. **LLM-based grading:** Fast and flexible, scalable and suitable for complex judgment. Test to ensure reliability first then scale.

### Tips for LLM-based grading

* **Have detailed, clear rubrics:** "The answer should always mention 'Acme Inc.' in the first sentence. If it does not, the answer is automatically graded as 'incorrect.'"
    A given use case, or even a specific success criteria for that use case, might require several rubrics for holistic evaluation.
* **Empirical or specific:** For example, instruct the LLM to output only 'correct' or 'incorrect', or to judge from a scale of 1–5. Purely qualitative evaluations are hard to assess quickly and at scale.
* **Encourage reasoning:** Ask the LLM to reason first before producing an evaluation score, and then discard the reasoning. This increases evaluation performance, particularly for tasks requiring complex judgment.

    ```python Python
    client = anthropic.Anthropic()

    def build_grader_prompt(answer, rubric):
        return f"""Grade this answer based on the rubric:
        &lt;rubric>\{rubric\}&lt;/rubric>
        &lt;answer>\{answer\}&lt;/answer>
        Think through your reasoning in &lt;thinking> tags, then output 'correct' or 'incorrect' in &lt;result> tags."""

    def grade_completion(output, golden_answer):
        grader_message = client.messages.create(
            model="claude-opus-5",
            max_tokens=2048,
            messages=[
                \{"role": "user", "content": build_grader_prompt(output, golden_answer)\}
            ],
        )
        grader_response = next(
            block.text for block in grader_message.content if block.type == "text"
        )

        return (
            "correct"
            if "&lt;result>correct&lt;/result>" in grader_response.lower()
            else "incorrect"
        )

    # Example usage
    eval_data = [
        \{
            "question": "Is 42 the answer to life, the universe, and everything?",
            "golden_answer": "Yes, according to 'The Hitchhiker's Guide to the Galaxy'.",
        \},
        \{
            "question": "What is the capital of France?",
            "golden_answer": "The capital of France is Paris.",
        \},
    ]

    def get_completion(prompt: str):
        message = client.messages.create(
            model="claude-opus-5",
            max_tokens=1024,
            messages=[\{"role": "user", "content": prompt\}],
        )
        return next(block.text for block in message.content if block.type == "text")

    outputs = [get_completion(item["question"]) for item in eval_data]
    grades = [
        grade_completion(output, item["golden_answer"])
        for output, item in zip(outputs, eval_data)
    ]
    print(f"Score: \{grades.count('correct') / len(grades) * 100\}%")
    ```

    ```typescript TypeScript
    const client = new Anthropic();

    function buildGraderPrompt(answer: string, rubric: string): string \{
      return `Grade this answer based on the rubric:
    &lt;rubric>${rubric}&lt;/rubric>
    &lt;answer>${answer\}&lt;/answer>
    Think through your reasoning in &lt;thinking> tags, then output 'correct' or 'incorrect' in &lt;result> tags.`;
    \}

    async function gradeCompletion(output: string, goldenAnswer: string): Promise&lt;string> \{
      const graderResponse = await client.messages.create(\{
        model: "claude-opus-5",
        max_tokens: 2048,
        messages: [\{ role: "user", content: buildGraderPrompt(output, goldenAnswer) \}]
      \});
      const textBlock = graderResponse.content.find((block) => block.type === "text");
      const graderText = textBlock ? textBlock.text : "";
      return graderText.toLowerCase().includes("&lt;result>correct&lt;/result>")
        ? "correct"
        : "incorrect";
    \}

    // Example usage
    const evalData = [
      \{
        question: "Is 42 the answer to life, the universe, and everything?",
        goldenAnswer: "Yes, according to 'The Hitchhiker's Guide to the Galaxy'."
      \},
      \{
        question: "What is the capital of France?",
        goldenAnswer: "The capital of France is Paris."
      \}
    ];

    async function getCompletion(prompt: string): Promise&lt;string> \{
      const message = await client.messages.create(\{
        model: "claude-opus-5",
        max_tokens: 1024,
        messages: [\{ role: "user", content: prompt \}]
      \});
      const textBlock = message.content.find((block) => block.type === "text");
      return textBlock ? textBlock.text : "";
    \}

    const grades: string[] = [];
    for (const item of evalData) \{
      const output = await getCompletion(item.question);
      grades.push(await gradeCompletion(output, item.goldenAnswer));
    \}
    const score = (grades.filter((grade) => grade === "correct").length / grades.length) * 100;
    console.log(`Score: ${score}%`);
    ```

    ```csharp C#
    var client = new AnthropicClient();

    string BuildGraderPrompt(string answer, string rubric)
    {
        return $"""
            Grade this answer based on the rubric:
            &lt;rubric>\{rubric\}&lt;/rubric>
            &lt;answer>\{answer\}&lt;/answer>
            Think through your reasoning in &lt;thinking> tags, then output 'correct' or 'incorrect' in &lt;result> tags.
            """;
    \}

    async Task&lt;string> GradeCompletion(string output, string goldenAnswer)
    \{
        var graderResponse = await client.Messages.Create(new MessageCreateParams
        \{
            Model = Model.ClaudeOpus5,
            MaxTokens = 2048,
            Messages = [new() \{ Role = Role.User, Content = BuildGraderPrompt(output, goldenAnswer) \}],
        \});
        return ContentText(graderResponse).ToLowerInvariant().Contains("&lt;result>correct&lt;/result>")
            ? "correct"
            : "incorrect";
    \}

    // Example usage
    EvalItem[] evalData =
    [
        new("Is 42 the answer to life, the universe, and everything?",
            "Yes, according to 'The Hitchhiker's Guide to the Galaxy'."),
        new("What is the capital of France?",
            "The capital of France is Paris."),
    ];

    async Task&lt;string> GetCompletion(string prompt)
    \{
        var message = await client.Messages.Create(new MessageCreateParams
        \{
            Model = Model.ClaudeOpus5,
            MaxTokens = 1024,
            Messages = [new() \{ Role = Role.User, Content = prompt \}],
        \});
        return ContentText(message);
    \}

    string ContentText(Message message)
    \{
        var text = "";
        foreach (var block in message.Content)
        \{
            if (block.TryPickText(out var textBlock))
            \{
                text += textBlock.Text;
            \}
        \}
        return text;
    \}

    var correct = 0;
    foreach (var item in evalData)
    \{
        var output = await GetCompletion(item.Question);
        if (await GradeCompletion(output, item.GoldenAnswer) == "correct")
        \{
            correct++;
        \}
    \}
    Console.WriteLine($"Score: {100.0 * correct / evalData.Length}%");

    record EvalItem(string Question, string GoldenAnswer);
    ```

    ```go Go
    var client = anthropic.NewClient()

    func contentText(message *anthropic.Message) string {
    	var text strings.Builder
    	for _, block := range message.Content {
    		if textBlock, ok := block.AsAny().(anthropic.TextBlock); ok {
    			text.WriteString(textBlock.Text)
    		}
    	}
    	return text.String()
    }

    func buildGraderPrompt(answer, rubric string) string {
    	return fmt.Sprintf(`Grade this answer based on the rubric:
    &lt;rubric>%s&lt;/rubric>
    &lt;answer>%s&lt;/answer>
    Think through your reasoning in &lt;thinking> tags, then output 'correct' or 'incorrect' in &lt;result> tags.`, rubric, answer)
    }

    func gradeCompletion(output, goldenAnswer string) string {
    	graderResponse, err := client.Messages.New(context.Background(), anthropic.MessageNewParams{
    		Model:     anthropic.ModelClaudeOpus5,
    		MaxTokens: 2048,
    		Messages: []anthropic.MessageParam{
    			anthropic.NewUserMessage(anthropic.NewTextBlock(buildGraderPrompt(output, goldenAnswer))),
    		},
    	})
    	if err != nil {
    		log.Fatal(err)
    	}
    	if strings.Contains(strings.ToLower(contentText(graderResponse)), "&lt;result>correct&lt;/result>") {
    		return "correct"
    	}
    	return "incorrect"
    }

    func getCompletion(prompt string) string {
    	message, err := client.Messages.New(context.Background(), anthropic.MessageNewParams{
    		Model:     anthropic.ModelClaudeOpus5,
    		MaxTokens: 1024,
    		Messages: []anthropic.MessageParam{
    			anthropic.NewUserMessage(anthropic.NewTextBlock(prompt)),
    		},
    	})
    	if err != nil {
    		log.Fatal(err)
    	}
    	return contentText(message)
    }

    func main() {
    	evalData := []struct {
    		Question     string
    		GoldenAnswer string
    	}{
    		{"Is 42 the answer to life, the universe, and everything?", "Yes, according to 'The Hitchhiker's Guide to the Galaxy'."},
    		{"What is the capital of France?", "The capital of France is Paris."},
    	}

    	correct := 0
    	for _, item := range evalData {
    		output := getCompletion(item.Question)
    		if gradeCompletion(output, item.GoldenAnswer) == "correct" {
    			correct++
    		}
    	}
    	fmt.Printf("Score: %.1f%%\n", float64(correct)/float64(len(evalData))*100)
    }
    ```

    ```java Java
    record EvalItem(String question, String goldenAnswer) {}

    // Example usage
    List&lt;EvalItem> evalData = List.of(
        new EvalItem(
            "Is 42 the answer to life, the universe, and everything?",
            "Yes, according to 'The Hitchhiker's Guide to the Galaxy'."),
        new EvalItem(
            "What is the capital of France?",
            "The capital of France is Paris."));

    AnthropicClient client = AnthropicOkHttpClient.fromEnv();

    String contentText(Message message) {
        var text = new StringBuilder();
        for (var block : message.content()) {
            block.text().ifPresent(textBlock -> text.append(textBlock.text()));
        }
        return text.toString();
    }

    String buildGraderPrompt(String answer, String rubric) {
        return """
            Grade this answer based on the rubric:
            &lt;rubric>%s&lt;/rubric>
            &lt;answer>%s&lt;/answer>
            Think through your reasoning in &lt;thinking> tags, then output 'correct' or 'incorrect' in &lt;result> tags.""".formatted(rubric, answer);
    }

    String gradeCompletion(String output, String goldenAnswer) {
        var params = MessageCreateParams.builder()
            .model(Model.CLAUDE_OPUS_5)
            .maxTokens(2048L)
            .addUserMessage(buildGraderPrompt(output, goldenAnswer))
            .build();
        var graderResponse = contentText(client.messages().create(params));
        return graderResponse.toLowerCase().contains("&lt;result>correct&lt;/result>") ? "correct" : "incorrect";
    }

    String getCompletion(String prompt) {
        var params = MessageCreateParams.builder()
            .model(Model.CLAUDE_OPUS_5)
            .maxTokens(1024L)
            .addUserMessage(prompt)
            .build();
        return contentText(client.messages().create(params));
    }

    void main() {
        int correct = 0;
        for (var item : evalData) {
            var output = getCompletion(item.question());
            if (gradeCompletion(output, item.goldenAnswer()).equals("correct")) {
                correct++;
            }
        }
        IO.println("Score: " + (100.0 * correct / evalData.size()) + "%");
    }
    ```

    ```php PHP
    $client = new Client();

    function buildGraderPrompt(string $answer, string $rubric): string
    \{
        return <<&lt;PROMPT
        Grade this answer based on the rubric:
        &lt;rubric>\{$rubric}&lt;/rubric>
        &lt;answer>{$answer\}&lt;/answer>
        Think through your reasoning in &lt;thinking> tags, then output 'correct' or 'incorrect' in &lt;result> tags.
        PROMPT;
    \}

    function gradeCompletion(Client $client, string $output, string $goldenAnswer): string
    {
        $graderResponse = $client->messages->create(
            model: Model::CLAUDE_OPUS_5,
            maxTokens: 2048,
            messages: [
                [
                    'role' => 'user',
                    'content' => buildGraderPrompt($output, $goldenAnswer),
                ],
            ],
        );
        return str_contains(strtolower(contentText($graderResponse)), '&lt;result>correct&lt;/result>')
            ? 'correct'
            : 'incorrect';
    \}

    // Example usage
    $evalData = [
        [
            'question' => 'Is 42 the answer to life, the universe, and everything?',
            'goldenAnswer' => "Yes, according to 'The Hitchhiker's Guide to the Galaxy'.",
        ],
        [
            'question' => 'What is the capital of France?',
            'goldenAnswer' => 'The capital of France is Paris.',
        ],
    ];

    function getCompletion(Client $client, string $prompt): string
    {
        $message = $client->messages->create(
            model: Model::CLAUDE_OPUS_5,
            maxTokens: 1024,
            messages: [
                [
                    'role' => 'user',
                    'content' => $prompt,
                ],
            ],
        );
        return contentText($message);
    }

    function contentText($message): string
    \{
        $text = '';
        foreach ($message->content as $block) {
            if ($block instanceof TextBlock) \{
                $text .= $block->text;
            \}
        \}
        return $text;
    }

    $correct = 0;
    foreach ($evalData as $item) \{
        $output = getCompletion($client, $item['question']);
        if (gradeCompletion($client, $output, $item['goldenAnswer']) === 'correct') \{
            $correct++;
        }
    }
    echo 'Score: ' . (100 * $correct / count($evalData)) . '%' . PHP_EOL;
    ```

    ```ruby Ruby
    client = Anthropic::Client.new

    def content_text(message)
      message.content.filter_map \{ |block| block.text if block.type == :text \}.join
    end

    def build_grader_prompt(answer, rubric)
      <<~PROMPT
        Grade this answer based on the rubric:
        &lt;rubric>#\{rubric\}&lt;/rubric>
        &lt;answer>#\{answer\}&lt;/answer>
        Think through your reasoning in &lt;thinking> tags, then output 'correct' or 'incorrect' in &lt;result> tags.
      PROMPT
    end

    def grade_completion(client, output, golden_answer)
      grader_response = client.messages.create(
        model: Anthropic::Model::CLAUDE_OPUS_5,
        max_tokens: 2048,
        messages: [
          \{
            role: "user",
            content: build_grader_prompt(output, golden_answer)
          \}
        ]
      )
      content_text(grader_response).downcase.include?("&lt;result>correct&lt;/result>") ? "correct" : "incorrect"
    end

    # Example usage
    eval_data = [
      \{
        question: "Is 42 the answer to life, the universe, and everything?",
        golden_answer: "Yes, according to 'The Hitchhiker's Guide to the Galaxy'."
      \},
      \{
        question: "What is the capital of France?",
        golden_answer: "The capital of France is Paris."
      \}
    ]

    def get_completion(client, prompt)
      message = client.messages.create(
        model: Anthropic::Model::CLAUDE_OPUS_5,
        max_tokens: 1024,
        messages: [
          \{
            role: "user",
            content: prompt
          \}
        ]
      )
      content_text(message)
    end

    grades = eval_data.map do |item|
      output = get_completion(client, item[:question])
      grade_completion(client, output, item[:golden_answer])
    end
    puts "Score: #\{100.0 * grades.count("correct") / grades.length\}%"
    ```

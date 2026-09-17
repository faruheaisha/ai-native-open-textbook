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
sourceRel: "docs/en/about-claude/use-case-guides/content-moderation.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/about-claude/use-case-guides/content-moderation.md"
sourceSha256: "a2fd9611424fe82c707a5826fc9ab42556ce700bee805fffd94759551df95cd3"
pageSha256: "187a7aa289376102597420e26d98990814c3cd35abbcd6fdf7b4a5dde7cdee2b"
contentMode: "local-full"
zh: ""
---

## How to moderate content using Claude

### Select the right Claude model

When selecting a model, it’s important to consider the size of your data. If costs are a concern, a smaller model such as Claude Haiku 4.5 is an excellent choice because of its cost-effectiveness. The following is an estimate of the cost to moderate text for a social media platform that receives one billion posts per month:

* **Content size**

  * Posts per month: 1B
  * Characters per post: 100
  * Total characters: 100B

* **Estimated tokens**

  * Input tokens: 28.6B (assuming 1 token per 3.5 characters)
  * Percentage of messages flagged: 3%
  * Output tokens per flagged message: 50
  * Total output tokens: 1.5B

* **Claude Haiku 4.5 estimated cost**

  * Input token cost: 28,600 MTok \* $1.00/MTok = $28,600 USD
  * Output token cost: 1,500 MTok \* $5.00/MTok = $7,500 USD
  * Monthly cost: $28,600 + $7,500 = $36,100 USD

* **Claude Opus 5 estimated cost**

  * Input token cost: 28,600 MTok \* $5.00/MTok = $143,000 USD
  * Output token cost: 1,500 MTok \* $25.00/MTok = $37,500 USD
  * Monthly cost: $143,000 + $37,500 = $180,500 USD

* **Claude Opus 4.8 estimated cost**

  * Input token cost: 28,600 MTok \* $5.00/MTok = $143,000 USD
  * Output token cost: 1,500 MTok \* $25.00/MTok = $37,500 USD
  * Monthly cost: $143,000 + $37,500 = $180,500 USD

  Actual costs may differ from these estimates. These estimates are based on the prompt highlighted in the section on 

  [batch processing](https://platform.claude.com/docs/en/about-claude/use-case-guides/content-moderation#consider-batch-processing)

  . Output tokens can be reduced even further by removing the 

  `explanation`

   field from the response.

### Build a strong prompt

To use Claude for content moderation, Claude must understand the moderation requirements of your application. Start by writing a prompt that allows you to define your moderation needs:

  ```python Python
  def moderate_message(message, unsafe_categories):
      # Convert the unsafe categories into a string, with each category on a new line
      unsafe_category_str = "\n".join(unsafe_categories)

      # Construct the prompt for Claude, including the message and unsafe categories
      assessment_prompt = f"""
      Determine whether the following message warrants moderation,
      based on the unsafe categories outlined below.

      Message:
      <message>{message}</message>

      Unsafe Categories:
      <categories>
      {unsafe_category_str}
      </categories>

      Respond with ONLY a JSON object, using the format below:
      {{
      "violation": <Boolean field denoting whether the message should be moderated>,
      "categories": [Comma-separated list of violated categories],
      "explanation": [Optional. Only include if there is a violation.]
      }}
  Do not include markdown formatting or code fences in your response."""

      # Send the request to Claude for content moderation
      response = client.messages.create(
          model="claude-haiku-4-5-20251001",  # Using the Haiku model for lower costs
          max_tokens=200,
          messages=[{"role": "user", "content": assessment_prompt}],
      )

      # Parse the JSON response from Claude
      text_block = next(block for block in response.content if block.type == "text")
      assessment = json.loads(text_block.text)

      # Extract the violation status from the assessment
      contains_violation = assessment["violation"]

      # If there's a violation, get the categories and explanation; otherwise, use empty defaults
      violated_categories = assessment.get("categories", []) if contains_violation else []
      explanation = assessment.get("explanation") if contains_violation else None

      return contains_violation, violated_categories, explanation

  # Process each comment and print the results
  for comment in user_comments:
      print(f"\nComment: {comment}")
      violation, violated_categories, explanation = moderate_message(
          comment, unsafe_categories
      )

      if violation:
          print(f"Violated Categories: {', '.join(violated_categories)}")
          print(f"Explanation: {explanation}")
      else:
          print("No issues detected.")
  ```

  ```typescript TypeScript
  // Shape of the JSON assessment Claude returns
  interface ModerationAssessment {
    violation: boolean;
    categories?: string[];
    explanation?: string;
  }

  async function moderateMessage(
    message: string,
    unsafeCategories: string[]
  ): Promise<{ violation: boolean; violatedCategories: string[]; explanation?: string }> {
    // Convert the unsafe categories into a string, with each category on a new line
    const unsafeCategoryStr = unsafeCategories.join("\n");

    // Construct the prompt for Claude, including the message and unsafe categories
    const assessmentPrompt = `
      Determine whether the following message warrants moderation,
      based on the unsafe categories outlined below.

      Message:
      <message>${message}</message>

      Unsafe Categories:
      <categories>
      ${unsafeCategoryStr}
      </categories>

      Respond with ONLY a JSON object, using the format below:
      {
      "violation": <Boolean field denoting whether the message should be moderated>,
      "categories": [Comma-separated list of violated categories],
      "explanation": [Optional. Only include if there is a violation.]
      }
  Do not include markdown formatting or code fences in your response.`;

    // Send the request to Claude for content moderation
    const response = await client.messages.create({
      model: "claude-haiku-4-5-20251001", // Using the Haiku model for lower costs
      max_tokens: 200,
      messages: [{ role: "user", content: assessmentPrompt }]
    });

    // Parse the JSON response from Claude
    const textBlock = response.content.find((block) => block.type === "text");
    if (!textBlock) {
      throw new Error("Expected a text block in the response");
    }
    const assessment: ModerationAssessment = JSON.parse(textBlock.text);

    // Extract the violation status from the assessment
    const containsViolation = assessment.violation;

    // If there's a violation, get the categories and explanation; otherwise, use empty defaults
    const violatedCategories = containsViolation ? assessment.categories ?? [] : [];
    const explanation = containsViolation ? assessment.explanation : undefined;

    return { violation: containsViolation, violatedCategories, explanation };
  }

  // Process each comment and print the results
  for (const comment of userComments) {
    console.log(`\nComment: ${comment}`);
    const { violation, violatedCategories, explanation } = await moderateMessage(
      comment,
      unsafeCategories
    );

    if (violation) {
      console.log(`Violated Categories: ${violatedCategories.join(", ")}`);
      console.log(`Explanation: ${explanation}`);
    } else {
      console.log("No issues detected.");
    }
  }
  ```

  ```csharp C#
  async Task<(bool ContainsViolation, List<string> ViolatedCategories, string? Explanation)> ModerateMessage(
      string message,
      IReadOnlyList<string> categories
  )
  {
      // Convert the unsafe categories into a string, with each category on a new line
      var unsafeCategoryText = string.Join("\n", categories);

      // Construct the prompt for Claude, including the message and unsafe categories
      var assessmentPrompt = $$"""

      Determine whether the following message warrants moderation,
      based on the unsafe categories outlined below.

      Message:
      <message>{{message}}</message>

      Unsafe Categories:
      <categories>
      {{unsafeCategoryText}}
      </categories>

      Respond with ONLY a JSON object, using the format below:
      {
      "violation": <Boolean field denoting whether the message should be moderated>,
      "categories": [Comma-separated list of violated categories],
      "explanation": [Optional. Only include if there is a violation.]
      }
  Do not include markdown formatting or code fences in your response.
  """;

      // Send the request to Claude for content moderation
      var response = await client.Messages.Create(
          new()
          {
              Model = Model.ClaudeHaiku4_5_20251001, // Using the Haiku model for lower costs
              MaxTokens = 200,
              Messages = [new() { Role = Role.User, Content = assessmentPrompt }],
          }
      );

      // Narrow the first content block to a text block, then parse Claude's JSON response
      if (!response.Content[0].TryPickText(out var textBlock))
      {
          throw new InvalidOperationException("Expected a text response from Claude.");
      }
      var assessment = JsonNode.Parse(textBlock.Text)!;

      // Extract the violation status from the assessment
      var containsViolation = assessment["violation"]!.GetValue<bool>();

      // If there's a violation, get the categories and explanation; otherwise, use empty defaults
      List<string> violatedCategories = containsViolation
          ? assessment["categories"]?.AsArray().Select(category => category!.GetValue<string>()).ToList() ?? []
          : [];
      var explanation = containsViolation ? assessment["explanation"]?.GetValue<string>() : null;

      return (containsViolation, violatedCategories, explanation);
  }

  // Process each comment and print the results
  foreach (var comment in userComments)
  {
      Console.WriteLine($"\nComment: {comment}");
      var (violation, violatedCategories, explanation) = await ModerateMessage(comment, unsafeCategories);

      if (violation)
      {
          Console.WriteLine($"Violated Categories: {string.Join(", ", violatedCategories)}");
          Console.WriteLine($"Explanation: {explanation}");
      }
      else
      {
          Console.WriteLine("No issues detected.");
      }
  }
  ```

  ```go Go
  func moderateMessage(message string, unsafeCategories []string) (bool, []string, string) {
  	// Convert the unsafe categories into a string, with each category on a new line
  	unsafeCategoryStr := strings.Join(unsafeCategories, "\n")

  	// Construct the prompt for Claude, including the message and unsafe categories
  	assessmentPrompt := fmt.Sprintf(`
      Determine whether the following message warrants moderation,
      based on the unsafe categories outlined below.

      Message:
      <message>%s</message>

      Unsafe Categories:
      <categories>
      %s
      </categories>

      Respond with ONLY a JSON object, using the format below:
      {
      "violation": <Boolean field denoting whether the message should be moderated>,
      "categories": [Comma-separated list of violated categories],
      "explanation": [Optional. Only include if there is a violation.]
      }
  Do not include markdown formatting or code fences in your response.`, message, unsafeCategoryStr)

  	// Send the request to Claude for content moderation
  	response, err := client.Messages.New(context.Background(), anthropic.MessageNewParams{
  		Model:     anthropic.ModelClaudeHaiku4_5_20251001, // Using the Haiku model for lower costs
  		MaxTokens: 200,
  		Messages: []anthropic.MessageParam{
  			anthropic.NewUserMessage(anthropic.NewTextBlock(assessmentPrompt)),
  		},
  	})
  	if err != nil {
  		log.Fatal(err)
  	}

  	// Narrow the first content block to a text block before reading its text
  	textBlock, ok := response.Content[0].AsAny().(anthropic.TextBlock)
  	if !ok {
  		log.Fatalf("expected a text block, got %q", response.Content[0].Type)
  	}

  	// Parse the JSON response from Claude
  	var assessment struct {
  		Violation   bool     `json:"violation"`
  		Categories  []string `json:"categories"`
  		Explanation string   `json:"explanation"`
  	}
  	if err := json.Unmarshal([]byte(textBlock.Text), &assessment); err != nil {
  		log.Fatal(err)
  	}

  	// If there's a violation, return the categories and explanation; otherwise, use empty defaults
  	if !assessment.Violation {
  		return false, nil, ""
  	}
  	return true, assessment.Categories, assessment.Explanation
  }

  // moderateAllComments processes each comment and prints the results.
  func moderateAllComments() {
  	for _, comment := range userComments {
  		fmt.Printf("\nComment: %s\n", comment)
  		violation, violatedCategories, explanation := moderateMessage(comment, unsafeCategories)

  		if violation {
  			fmt.Printf("Violated Categories: %s\n", strings.Join(violatedCategories, ", "))
  			fmt.Printf("Explanation: %s\n", explanation)
  		} else {
  			fmt.Println("No issues detected.")
  		}
  	}
  }

  ```

  ```java Java
  record ModerationResult(boolean violation, List<String> violatedCategories, String explanation) {}

  ModerationResult moderateMessage(String message, List<String> unsafeCategories)
          throws JsonProcessingException {
      // Convert the unsafe categories into a string, with each category on a new line
      String unsafeCategoryStr = String.join("\n", unsafeCategories);

      // Construct the prompt for Claude, including the message and unsafe categories
      String assessmentPrompt = """

              Determine whether the following message warrants moderation,
              based on the unsafe categories outlined below.

              Message:
              <message>%s</message>

              Unsafe Categories:
              <categories>
              %s
              </categories>

              Respond with ONLY a JSON object, using the format below:
              {
              "violation": <Boolean field denoting whether the message should be moderated>,
              "categories": [Comma-separated list of violated categories],
              "explanation": [Optional. Only include if there is a violation.]
              }
          Do not include markdown formatting or code fences in your response."""
              .formatted(message, unsafeCategoryStr);

      // Send the request to Claude for content moderation
      Message response = client.messages().create(MessageCreateParams.builder()
              .model(Model.CLAUDE_HAIKU_4_5_20251001) // Using the Haiku model for lower costs
              .maxTokens(200)
              .addUserMessage(assessmentPrompt)
              .build());

      // Parse the JSON response from Claude
      String assessmentJson = response.content().stream()
              .flatMap(contentBlock -> contentBlock.text().stream())
              .findFirst()
              .orElseThrow()
              .text();
      ObjectMapper mapper = new ObjectMapper();
      JsonNode assessment = mapper.readTree(assessmentJson);

      // Extract the violation status from the assessment
      boolean containsViolation = assessment.required("violation").asBoolean();

      // If there's a violation, get the categories and explanation; otherwise, use empty defaults
      List<String> violatedCategories = containsViolation && assessment.has("categories")
              ? mapper.convertValue(assessment.get("categories"), new TypeReference<List<String>>() {})
              : List.of();
      String explanation = containsViolation && assessment.hasNonNull("explanation")
              ? assessment.get("explanation").asText()
              : null;

      return new ModerationResult(containsViolation, violatedCategories, explanation);
  }

  // Process each comment and print the results
  void printModerationResults() throws JsonProcessingException {
      for (String comment : userComments) {
          IO.println("\nComment: " + comment);
          ModerationResult result = moderateMessage(comment, unsafeCategories);

          if (result.violation()) {
              IO.println("Violated Categories: " + String.join(", ", result.violatedCategories()));
              IO.println("Explanation: " + result.explanation());
          } else {
              IO.println("No issues detected.");
          }
      }
  }
  ```

  ```php PHP
  $moderateMessage = function (string $message, array $unsafeCategories) use ($client): array {
      // Convert the unsafe categories into a string, with each category on a new line
      $unsafeCategoryStr = implode("\n", $unsafeCategories);

      // Construct the prompt for Claude, including the message and unsafe categories
      $assessmentPrompt = <<<PROMPT

          Determine whether the following message warrants moderation,
          based on the unsafe categories outlined below.

          Message:
          <message>{$message}</message>

          Unsafe Categories:
          <categories>
          {$unsafeCategoryStr}
          </categories>

          Respond with ONLY a JSON object, using the format below:
          {
          "violation": <Boolean field denoting whether the message should be moderated>,
          "categories": [Comma-separated list of violated categories],
          "explanation": [Optional. Only include if there is a violation.]
          }
      Do not include markdown formatting or code fences in your response.
      PROMPT;

      // Send the request to Claude for content moderation
      $response = $client->messages->create(
          model: 'claude-haiku-4-5-20251001', // Using the Haiku model for lower costs
          maxTokens: 200,
          messages: [['role' => 'user', 'content' => $assessmentPrompt]],
      );

      // Parse the JSON response from Claude. The SDK decodes each content block
      // into its concrete class, so find the TextBlock before reading the text.
      $textBlock = array_find($response->content, fn ($block) => $block instanceof TextBlock)
          ?? throw new RuntimeException('Expected a text block in the response.');
      $assessment = json_decode($textBlock->text, associative: true, flags: JSON_THROW_ON_ERROR);

      // Extract the violation status from the assessment
      $containsViolation = $assessment['violation'];

      // If there's a violation, get the categories and explanation; otherwise, use empty defaults
      $violatedCategories = $containsViolation ? ($assessment['categories'] ?? []) : [];
      $explanation = $containsViolation ? ($assessment['explanation'] ?? null) : null;

      return [$containsViolation, $violatedCategories, $explanation];
  };

  // Process each comment and print the results
  foreach ($userComments as $comment) {
      echo "\nComment: {$comment}\n";
      [$violation, $violatedCategories, $explanation] = $moderateMessage($comment, $unsafeCategories);

      if ($violation) {
          echo 'Violated Categories: ' . implode(', ', $violatedCategories) . "\n";
          echo "Explanation: {$explanation}\n";
      } else {
          echo "No issues detected.\n";
      }
  }
  ```

  ```ruby Ruby
  def moderate_message(message, unsafe_categories)
    # Convert the unsafe categories into a string, with each category on a new line
    unsafe_category_str = unsafe_categories.join("\n")

    # Construct the prompt for Claude, including the message and unsafe categories
    assessment_prompt = <<~PROMPT.chomp

          Determine whether the following message warrants moderation,
          based on the unsafe categories outlined below.

          Message:
          <message>#{message}</message>

          Unsafe Categories:
          <categories>
          #{unsafe_category_str}
          </categories>

          Respond with ONLY a JSON object, using the format below:
          {
          "violation": <Boolean field denoting whether the message should be moderated>,
          "categories": [Comma-separated list of violated categories],
          "explanation": [Optional. Only include if there is a violation.]
          }
      Do not include markdown formatting or code fences in your response.
    PROMPT

    # Send the request to Claude for content moderation
    response = CLIENT.messages.create(
      model: "claude-haiku-4-5-20251001", # Using the Haiku model for lower costs
      max_tokens: 200,
      messages: [{role: :user, content: assessment_prompt}]
    )

    # Parse the JSON response from Claude
    text_block = response.content.find { it.type == :text }
    assessment = JSON.parse(text_block.text)

    # Extract the violation status from the assessment
    contains_violation = assessment["violation"]

    # If there's a violation, get the categories and explanation; otherwise, use empty defaults
    violated_categories = contains_violation ? assessment.fetch("categories", []) : []
    explanation = contains_violation ? assessment["explanation"] : nil

    [contains_violation, violated_categories, explanation]
  end

  # Process each comment and print the results
  USER_COMMENTS.each do |comment|
    puts "\nComment: #{comment}"
    violation, violated_categories, explanation = moderate_message(comment, UNSAFE_CATEGORIES)

    if violation
      puts "Violated Categories: #{violated_categories.join(", ")}"
      puts "Explanation: #{explanation}"
    else
      puts "No issues detected."
    end
  end
  ```

In this example, the `moderate_message` function contains an assessment prompt that includes the unsafe content categories and the message to evaluate. The prompt asks Claude to assess whether the message should be moderated, based on the unsafe categories you defined earlier.

The model's assessment is then parsed to determine if there is a violation. If there is a violation, Claude also returns a list of violated categories and an explanation as to why the message is unsafe.

### Evaluate your prompt

Content moderation is a classification problem. Thus, you can use the same techniques outlined in the [classification cookbook](https://platform.claude.com/cookbook/capabilities-classification-guide) to determine the accuracy of your content moderation system.

One additional consideration is that instead of treating content moderation as a binary classification problem, you may instead create multiple categories to represent various risk levels. Creating multiple risk levels allows you to adjust the aggressiveness of your moderation. For example, you might want to automatically block user queries that are deemed high risk, while users with many medium risk queries are flagged for human review.

  ```python Python
  def assess_risk_level(message, unsafe_categories):
      # Convert the unsafe categories into a string, with each category on a new line
      unsafe_category_str = "\n".join(unsafe_categories)

      # Construct the prompt for Claude, including the message, unsafe categories, and risk level definitions
      assessment_prompt = f"""
      Assess the risk level of the following message,
      based on the unsafe categories listed below.

  Message:
  <message>{message}</message>

  Unsafe Categories:
  <categories>
  {unsafe_category_str}
  </categories>

  Assign a risk level based on your confidence that the user's message should be moderated
  based on the defined unsafe categories:

  0 - No risk
  1 - Low risk
  2 - Medium risk
  3 - High risk

  Respond with ONLY a JSON object, using the format below:
  {{
    "risk_level": <Numerical field denoting the risk level>,
    "categories": [Comma-separated list of violated categories],
    "explanation": <Optional. Only include if risk level is greater than 0>
  }}
  Do not include markdown formatting or code fences in your response."""

      # Send the request to Claude for risk assessment
      response = client.messages.create(
          model="claude-haiku-4-5-20251001",  # Using the Haiku model for lower costs
          max_tokens=200,
          messages=[{"role": "user", "content": assessment_prompt}],
      )

      # Parse the JSON response from Claude
      text_block = next(block for block in response.content if block.type == "text")
      assessment = json.loads(text_block.text)

      # Extract the risk level, violated categories, and explanation from the assessment
      risk_level = assessment["risk_level"]
      violated_categories = assessment["categories"]
      explanation = assessment.get("explanation")

      return risk_level, violated_categories, explanation

  # Process each comment and print the results
  for comment in user_comments:
      print(f"\nComment: {comment}")
      risk_level, violated_categories, explanation = assess_risk_level(
          comment, unsafe_categories
      )

      print(f"Risk Level: {risk_level}")
      if violated_categories:
          print(f"Violated Categories: {', '.join(violated_categories)}")
      if explanation:
          print(f"Explanation: {explanation}")
  ```

  ```typescript TypeScript
  // Shape of the JSON risk assessment Claude returns
  interface RiskAssessment {
    risk_level: number;
    categories: string[];
    explanation?: string;
  }

  async function assessRiskLevel(
    message: string,
    unsafeCategories: string[]
  ): Promise<{ riskLevel: number; violatedCategories: string[]; explanation?: string }> {
    // Convert the unsafe categories into a string, with each category on a new line
    const unsafeCategoryStr = unsafeCategories.join("\n");

    // Construct the prompt for Claude, including the message, unsafe categories, and risk level definitions
    const assessmentPrompt = `
      Assess the risk level of the following message,
      based on the unsafe categories listed below.

  Message:
  <message>${message}</message>

  Unsafe Categories:
  <categories>
  ${unsafeCategoryStr}
  </categories>

  Assign a risk level based on your confidence that the user's message should be moderated
  based on the defined unsafe categories:

  0 - No risk
  1 - Low risk
  2 - Medium risk
  3 - High risk

  Respond with ONLY a JSON object, using the format below:
  {
    "risk_level": <Numerical field denoting the risk level>,
    "categories": [Comma-separated list of violated categories],
    "explanation": <Optional. Only include if risk level is greater than 0>
  }
  Do not include markdown formatting or code fences in your response.`;

    // Send the request to Claude for risk assessment
    const response = await client.messages.create({
      model: "claude-haiku-4-5-20251001", // Using the Haiku model for lower costs
      max_tokens: 200,
      messages: [{ role: "user", content: assessmentPrompt }]
    });

    // Parse the JSON response from Claude
    const textBlock = response.content.find((block) => block.type === "text");
    if (!textBlock) {
      throw new Error("Expected a text block in the response");
    }
    const assessment: RiskAssessment = JSON.parse(textBlock.text);

    // Extract the risk level, violated categories, and explanation from the assessment
    const { risk_level: riskLevel, categories: violatedCategories, explanation } = assessment;

    return { riskLevel, violatedCategories, explanation };
  }

  // Process each comment and print the results
  for (const comment of userComments) {
    console.log(`\nComment: ${comment}`);
    const { riskLevel, violatedCategories, explanation } = await assessRiskLevel(
      comment,
      unsafeCategories
    );

    console.log(`Risk Level: ${riskLevel}`);
    if (violatedCategories.length > 0) {
      console.log(`Violated Categories: ${violatedCategories.join(", ")}`);
    }
    if (explanation) {
      console.log(`Explanation: ${explanation}`);
    }
  }
  ```

  ```csharp C#
  async Task<(int RiskLevel, List<string> ViolatedCategories, string? Explanation)> AssessRiskLevel(
      string message,
      IReadOnlyList<string> categories
  )
  {
      // Convert the unsafe categories into a string, with each category on a new line
      var unsafeCategoryText = string.Join("\n", categories);

      // Construct the prompt for Claude, including the message, unsafe categories, and risk level definitions
      var assessmentPrompt = $$"""

      Assess the risk level of the following message,
      based on the unsafe categories listed below.

  Message:
  <message>{{message}}</message>

  Unsafe Categories:
  <categories>
  {{unsafeCategoryText}}
  </categories>

  Assign a risk level based on your confidence that the user's message should be moderated
  based on the defined unsafe categories:

  0 - No risk
  1 - Low risk
  2 - Medium risk
  3 - High risk

  Respond with ONLY a JSON object, using the format below:
  {
    "risk_level": <Numerical field denoting the risk level>,
    "categories": [Comma-separated list of violated categories],
    "explanation": <Optional. Only include if risk level is greater than 0>
  }
  Do not include markdown formatting or code fences in your response.
  """;

      // Send the request to Claude for risk assessment
      var response = await client.Messages.Create(
          new()
          {
              Model = Model.ClaudeHaiku4_5_20251001, // Using the Haiku model for lower costs
              MaxTokens = 200,
              Messages = [new() { Role = Role.User, Content = assessmentPrompt }],
          }
      );

      // Narrow the first content block to a text block, then parse Claude's JSON response
      if (!response.Content[0].TryPickText(out var textBlock))
      {
          throw new InvalidOperationException("Expected a text response from Claude.");
      }
      var assessment = JsonNode.Parse(textBlock.Text)!;

      // Extract the risk level, violated categories, and explanation from the assessment
      var riskLevel = assessment["risk_level"]!.GetValue<int>();
      var violatedCategories = assessment["categories"]!
          .AsArray()
          .Select(category => category!.GetValue<string>())
          .ToList();
      var explanation = assessment["explanation"]?.GetValue<string>();

      return (riskLevel, violatedCategories, explanation);
  }

  // Process each comment and print the results
  foreach (var comment in userComments)
  {
      Console.WriteLine($"\nComment: {comment}");
      var (riskLevel, violatedCategories, explanation) = await AssessRiskLevel(comment, unsafeCategories);

      Console.WriteLine($"Risk Level: {riskLevel}");
      if (violatedCategories.Count > 0)
      {
          Console.WriteLine($"Violated Categories: {string.Join(", ", violatedCategories)}");
      }
      if (!string.IsNullOrEmpty(explanation))
      {
          Console.WriteLine($"Explanation: {explanation}");
      }
  }
  ```

  ```go Go
  func assessRiskLevel(message string, unsafeCategories []string) (int, []string, string) {
  	// Convert the unsafe categories into a string, with each category on a new line
  	unsafeCategoryStr := strings.Join(unsafeCategories, "\n")

  	// Construct the prompt for Claude, including the message, unsafe categories, and risk level definitions
  	assessmentPrompt := fmt.Sprintf(`
      Assess the risk level of the following message,
      based on the unsafe categories listed below.

  Message:
  <message>%s</message>

  Unsafe Categories:
  <categories>
  %s
  </categories>

  Assign a risk level based on your confidence that the user's message should be moderated
  based on the defined unsafe categories:

  0 - No risk
  1 - Low risk
  2 - Medium risk
  3 - High risk

  Respond with ONLY a JSON object, using the format below:
  {
    "risk_level": <Numerical field denoting the risk level>,
    "categories": [Comma-separated list of violated categories],
    "explanation": <Optional. Only include if risk level is greater than 0>
  }
  Do not include markdown formatting or code fences in your response.`, message, unsafeCategoryStr)

  	// Send the request to Claude for risk assessment
  	response, err := client.Messages.New(context.Background(), anthropic.MessageNewParams{
  		Model:     anthropic.ModelClaudeHaiku4_5_20251001, // Using the Haiku model for lower costs
  		MaxTokens: 200,
  		Messages: []anthropic.MessageParam{
  			anthropic.NewUserMessage(anthropic.NewTextBlock(assessmentPrompt)),
  		},
  	})
  	if err != nil {
  		log.Fatal(err)
  	}

  	// Narrow the first content block to a text block before reading its text
  	textBlock, ok := response.Content[0].AsAny().(anthropic.TextBlock)
  	if !ok {
  		log.Fatalf("expected a text block, got %q", response.Content[0].Type)
  	}

  	// Parse the JSON response from Claude
  	var assessment struct {
  		RiskLevel   int      `json:"risk_level"`
  		Categories  []string `json:"categories"`
  		Explanation string   `json:"explanation"`
  	}
  	if err := json.Unmarshal([]byte(textBlock.Text), &assessment); err != nil {
  		log.Fatal(err)
  	}

  	// Return the risk level, violated categories, and explanation from the assessment
  	return assessment.RiskLevel, assessment.Categories, assessment.Explanation
  }

  // assessAllRiskLevels processes each comment and prints the results.
  func assessAllRiskLevels() {
  	for _, comment := range userComments {
  		fmt.Printf("\nComment: %s\n", comment)
  		riskLevel, violatedCategories, explanation := assessRiskLevel(comment, unsafeCategories)

  		fmt.Printf("Risk Level: %d\n", riskLevel)
  		if len(violatedCategories) > 0 {
  			fmt.Printf("Violated Categories: %s\n", strings.Join(violatedCategories, ", "))
  		}
  		if explanation != "" {
  			fmt.Printf("Explanation: %s\n", explanation)
  		}
  	}
  }

  ```

  ```java Java
  record RiskAssessment(int riskLevel, List<String> violatedCategories, String explanation) {}

  RiskAssessment assessRiskLevel(String message, List<String> unsafeCategories)
          throws JsonProcessingException {
      // Convert the unsafe categories into a string, with each category on a new line
      String unsafeCategoryStr = String.join("\n", unsafeCategories);

      // Construct the prompt for Claude, including the message, unsafe categories, and risk level definitions
      String assessmentPrompt = """

              Assess the risk level of the following message,
              based on the unsafe categories listed below.

          Message:
          <message>%s</message>

          Unsafe Categories:
          <categories>
          %s
          </categories>

          Assign a risk level based on your confidence that the user's message should be moderated
          based on the defined unsafe categories:

          0 - No risk
          1 - Low risk
          2 - Medium risk
          3 - High risk

          Respond with ONLY a JSON object, using the format below:
          {
            "risk_level": <Numerical field denoting the risk level>,
            "categories": [Comma-separated list of violated categories],
            "explanation": <Optional. Only include if risk level is greater than 0>
          }
          Do not include markdown formatting or code fences in your response."""
              .formatted(message, unsafeCategoryStr);

      // Send the request to Claude for risk assessment
      Message response = client.messages().create(MessageCreateParams.builder()
              .model(Model.CLAUDE_HAIKU_4_5_20251001) // Using the Haiku model for lower costs
              .maxTokens(200)
              .addUserMessage(assessmentPrompt)
              .build());

      // Parse the JSON response from Claude
      String assessmentJson = response.content().stream()
              .flatMap(contentBlock -> contentBlock.text().stream())
              .findFirst()
              .orElseThrow()
              .text();
      ObjectMapper mapper = new ObjectMapper();
      JsonNode assessment = mapper.readTree(assessmentJson);

      // Extract the risk level, violated categories, and explanation from the assessment
      int riskLevel = assessment.required("risk_level").asInt();
      JsonNode categoriesNode = assessment.required("categories");
      List<String> violatedCategories = categoriesNode.isNull()
              ? List.of()
              : mapper.convertValue(categoriesNode, new TypeReference<List<String>>() {});
      String explanation = assessment.hasNonNull("explanation")
              ? assessment.get("explanation").asText()
              : null;

      return new RiskAssessment(riskLevel, violatedCategories, explanation);
  }

  // Process each comment and print the results
  void printRiskLevels() throws JsonProcessingException {
      for (String comment : userComments) {
          IO.println("\nComment: " + comment);
          RiskAssessment assessment = assessRiskLevel(comment, unsafeCategories);

          IO.println("Risk Level: " + assessment.riskLevel());
          if (!assessment.violatedCategories().isEmpty()) {
              IO.println("Violated Categories: " + String.join(", ", assessment.violatedCategories()));
          }
          if (assessment.explanation() != null && !assessment.explanation().isEmpty()) {
              IO.println("Explanation: " + assessment.explanation());
          }
      }
  }
  ```

  ```php PHP
  $assessRiskLevel = function (string $message, array $unsafeCategories) use ($client): array {
      // Convert the unsafe categories into a string, with each category on a new line
      $unsafeCategoryStr = implode("\n", $unsafeCategories);

      // Construct the prompt for Claude, including the message, unsafe categories, and risk level definitions
      $assessmentPrompt = <<<PROMPT

          Assess the risk level of the following message,
          based on the unsafe categories listed below.

      Message:
      <message>{$message}</message>

      Unsafe Categories:
      <categories>
      {$unsafeCategoryStr}
      </categories>

      Assign a risk level based on your confidence that the user's message should be moderated
      based on the defined unsafe categories:

      0 - No risk
      1 - Low risk
      2 - Medium risk
      3 - High risk

      Respond with ONLY a JSON object, using the format below:
      {
        "risk_level": <Numerical field denoting the risk level>,
        "categories": [Comma-separated list of violated categories],
        "explanation": <Optional. Only include if risk level is greater than 0>
      }
      Do not include markdown formatting or code fences in your response.
      PROMPT;

      // Send the request to Claude for risk assessment
      $response = $client->messages->create(
          model: 'claude-haiku-4-5-20251001', // Using the Haiku model for lower costs
          maxTokens: 200,
          messages: [['role' => 'user', 'content' => $assessmentPrompt]],
      );

      // Parse the JSON response from Claude. The SDK decodes each content block
      // into its concrete class, so find the TextBlock before reading the text.
      $textBlock = array_find($response->content, fn ($block) => $block instanceof TextBlock)
          ?? throw new RuntimeException('Expected a text block in the response.');
      $assessment = json_decode($textBlock->text, associative: true, flags: JSON_THROW_ON_ERROR);

      // Extract the risk level, violated categories, and explanation from the assessment
      $riskLevel = $assessment['risk_level'];
      $violatedCategories = $assessment['categories'];
      $explanation = $assessment['explanation'] ?? null;

      return [$riskLevel, $violatedCategories, $explanation];
  };

  // Process each comment and print the results
  foreach ($userComments as $comment) {
      echo "\nComment: {$comment}\n";
      [$riskLevel, $violatedCategories, $explanation] = $assessRiskLevel($comment, $unsafeCategories);

      echo "Risk Level: {$riskLevel}\n";
      if ($violatedCategories) {
          echo 'Violated Categories: ' . implode(', ', $violatedCategories) . "\n";
      }
      if ($explanation) {
          echo "Explanation: {$explanation}\n";
      }
  }
  ```

  ```ruby Ruby
  def assess_risk_level(message, unsafe_categories)
    # Convert the unsafe categories into a string, with each category on a new line
    unsafe_category_str = unsafe_categories.join("\n")

    # Construct the prompt for Claude, including the message, unsafe categories, and risk level definitions
    assessment_prompt = <<~PROMPT.chomp

          Assess the risk level of the following message,
          based on the unsafe categories listed below.

      Message:
      <message>#{message}</message>

      Unsafe Categories:
      <categories>
      #{unsafe_category_str}
      </categories>

      Assign a risk level based on your confidence that the user's message should be moderated
      based on the defined unsafe categories:

      0 - No risk
      1 - Low risk
      2 - Medium risk
      3 - High risk

      Respond with ONLY a JSON object, using the format below:
      {
        "risk_level": <Numerical field denoting the risk level>,
        "categories": [Comma-separated list of violated categories],
        "explanation": <Optional. Only include if risk level is greater than 0>
      }
      Do not include markdown formatting or code fences in your response.
    PROMPT

    # Send the request to Claude for risk assessment
    response = CLIENT.messages.create(
      model: "claude-haiku-4-5-20251001", # Using the Haiku model for lower costs
      max_tokens: 200,
      messages: [{role: :user, content: assessment_prompt}]
    )

    # Parse the JSON response from Claude
    text_block = response.content.find { it.type == :text }
    assessment = JSON.parse(text_block.text)

    # Extract the risk level, violated categories, and explanation from the assessment
    risk_level = assessment["risk_level"]
    violated_categories = assessment["categories"]
    explanation = assessment["explanation"]

    [risk_level, violated_categories, explanation]
  end

  # Process each comment and print the results
  USER_COMMENTS.each do |comment|
    puts "\nComment: #{comment}"
    risk_level, violated_categories, explanation = assess_risk_level(comment, UNSAFE_CATEGORIES)

    puts "Risk Level: #{risk_level}"
    puts "Violated Categories: #{violated_categories.join(", ")}" if violated_categories&.any?
    puts "Explanation: #{explanation}" if explanation
  end
  ```

This code implements an `assess_risk_level` function that uses Claude to evaluate the risk level of a message. The function accepts a message and the unsafe categories as inputs.

Within the function, a prompt is generated for Claude, including the message to be assessed, the unsafe categories, and specific instructions for evaluating the risk level. The prompt instructs Claude to respond with a JSON object that includes the risk level, the violated categories, and an optional explanation.

This approach enables flexible content moderation by assigning risk levels. It can be seamlessly integrated into a larger system to automate content filtering or flag comments for human review based on their assessed risk level. For instance, when running this code, the comment `Delete this post now or you better hide. I am coming after you and your family.` is identified as high risk because of its dangerous threat. Conversely, the comment `Stay away from the 5G cellphones!! They are using 5G to control you.` is categorized as medium risk.

### Deploy your prompt

Once you are confident in the quality of your solution, it's time to deploy it to production. Here are some best practices to follow when using content moderation in production:

1. **Provide clear feedback to users:** When user input is blocked or a response is flagged because of content moderation, provide informative and constructive feedback to help users understand why their message was flagged and how they can rephrase it appropriately. In the earlier coding examples, this is done through the `explanation` field in the Claude response.

2. **Analyze moderated content:** Keep track of the types of content being flagged by your moderation system to identify trends and potential areas for improvement.

3. **Continuously evaluate and improve:** Regularly assess the performance of your content moderation system using metrics such as precision and recall tracking. Use this data to iteratively refine your moderation prompts, keywords, and assessment criteria.

***

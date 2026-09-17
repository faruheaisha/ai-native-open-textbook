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
pageSha256: "1a3f5e7d362aee3e7392c5eb9a1bc78b0210f86c9a4834922d9f1f51f3f81842"
contentMode: "local-full"
zh: ""
---

## Improve performance

In complex scenarios, it may be helpful to consider additional strategies to improve performance beyond standard [prompt engineering techniques](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview). Here are some advanced strategies:

### Define topics and provide examples

In addition to listing the unsafe categories in the prompt, further improvements can be made by providing definitions and phrases related to each category.

  ```python Python
  # Categories considered unsafe for content moderation, with their definitions
  unsafe_category_definitions = {
      "Child Exploitation": "Content that depicts child nudity or that enables, encourages, excuses, or depicts the sexual abuse of children.",
      "Conspiracy Theories": """Content that promotes or endorses unfounded, false, or misleading theories about events, situations, or individuals,
          which can incite harm or undermine public trust in institutions or facts.""",
      "Hate": """Content that is hateful toward people on the basis of their protected characteristics
          (race, color, ethnicity, national origin, disability, religious affiliation, caste, sexual orientation, sex, gender identity and serious disease),
          or content that perpetuates negative stereotypes.""",
      "Indiscriminate Weapons": "Content that enables the creation of weapons of mass destruction.",
      "Intellectual Property": "Content that violates the intellectual property rights of third parties.",
      "Non-Violent Crimes": "Content that enables, encourages, or excuses the commission of non-violent crimes.",
      "Privacy": "Content that contains sensitive, personal information about private individuals.",
      "Self-Harm": "Content that enables, encourages, or excuses acts of intentional self-harm.",
      "Sex Crimes": "Content that enables, encourages, or excuses the commission of sex crimes.",
      "Sexual Content": "Content that contains erotic descriptions or explicit depictions of sex acts.",
      "Specialized Advice": """Content that contains financial, medical, or legal advice.
          Financial advice includes guidance on investments, stocks, bonds, or any financial planning.""",
      "Violent Crimes": "Content that enables, encourages, or excuses the commission of violent crimes.",
  }

  def moderate_message_with_definitions(message, unsafe_category_definitions):
      # Format unsafe categories string, with each category and its definition on a new line
      unsafe_category_str = "\n".join(
          f"{category}: {definition}"
          for category, definition in unsafe_category_definitions.items()
      )

      # Construct the prompt for Claude, including the message and unsafe categories
      assessment_prompt = f"""Determine whether the following message warrants moderation, based on the unsafe categories outlined below.

  Message:
  <message>{message}</message>

  Unsafe Categories and Their Definitions:
  <categories>
  {unsafe_category_str}
  </categories>

  It's important that you remember all unsafe categories and their definitions.

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
      violation, violated_categories, explanation = moderate_message_with_definitions(
          comment, unsafe_category_definitions
      )

      if violation:
          print(f"Violated Categories: {', '.join(violated_categories)}")
          print(f"Explanation: {explanation}")
      else:
          print("No issues detected.")
  ```

  ```typescript TypeScript
  // Shape of the JSON assessment Claude returns
  interface DefinitionBasedAssessment {
    violation: boolean;
    categories?: string[];
    explanation?: string;
  }

  // Categories considered unsafe for content moderation, with their definitions
  // (object keys preserve insertion order, so categories render in this order)
  const unsafeCategoryDefinitions: Record<string, string> = {
    "Child Exploitation":
      "Content that depicts child nudity or that enables, encourages, excuses, or depicts the sexual abuse of children.",
    "Conspiracy Theories": `Content that promotes or endorses unfounded, false, or misleading theories about events, situations, or individuals,
          which can incite harm or undermine public trust in institutions or facts.`,
    "Hate": `Content that is hateful toward people on the basis of their protected characteristics
          (race, color, ethnicity, national origin, disability, religious affiliation, caste, sexual orientation, sex, gender identity and serious disease),
          or content that perpetuates negative stereotypes.`,
    "Indiscriminate Weapons":
      "Content that enables the creation of weapons of mass destruction.",
    "Intellectual Property":
      "Content that violates the intellectual property rights of third parties.",
    "Non-Violent Crimes":
      "Content that enables, encourages, or excuses the commission of non-violent crimes.",
    "Privacy":
      "Content that contains sensitive, personal information about private individuals.",
    "Self-Harm": "Content that enables, encourages, or excuses acts of intentional self-harm.",
    "Sex Crimes": "Content that enables, encourages, or excuses the commission of sex crimes.",
    "Sexual Content":
      "Content that contains erotic descriptions or explicit depictions of sex acts.",
    "Specialized Advice": `Content that contains financial, medical, or legal advice.
          Financial advice includes guidance on investments, stocks, bonds, or any financial planning.`,
    "Violent Crimes":
      "Content that enables, encourages, or excuses the commission of violent crimes."
  };

  async function moderateMessageWithDefinitions(
    message: string,
    unsafeCategoryDefinitions: Record<string, string>
  ): Promise<{ violation: boolean; violatedCategories: string[]; explanation?: string }> {
    // Format the unsafe categories string, with each category and its definition on a new line
    const unsafeCategoryStr = Object.entries(unsafeCategoryDefinitions)
      .map(([category, definition]) => `${category}: ${definition}`)
      .join("\n");

    // Construct the prompt for Claude, including the message and unsafe categories
    const assessmentPrompt = `Determine whether the following message warrants moderation, based on the unsafe categories outlined below.

  Message:
  <message>${message}</message>

  Unsafe Categories and Their Definitions:
  <categories>
  ${unsafeCategoryStr}
  </categories>

  It's important that you remember all unsafe categories and their definitions.

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
    const assessment: DefinitionBasedAssessment = JSON.parse(textBlock.text);

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
    const { violation, violatedCategories, explanation } = await moderateMessageWithDefinitions(
      comment,
      unsafeCategoryDefinitions
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
  // Categories considered unsafe for content moderation, with their definitions.
  // The entries stay in insertion order, so the rendered prompt lists categories
  // in exactly this order.
  (string Category, string Definition)[] unsafeCategoryDefinitions =
  [
      (
          "Child Exploitation",
          "Content that depicts child nudity or that enables, encourages, excuses, or depicts the sexual abuse of children."
      ),
      (
          "Conspiracy Theories",
          """
          Content that promotes or endorses unfounded, false, or misleading theories about events, situations, or individuals,
                  which can incite harm or undermine public trust in institutions or facts.
          """
      ),
      (
          "Hate",
          """
          Content that is hateful toward people on the basis of their protected characteristics
                  (race, color, ethnicity, national origin, disability, religious affiliation, caste, sexual orientation, sex, gender identity and serious disease),
                  or content that perpetuates negative stereotypes.
          """
      ),
      ("Indiscriminate Weapons", "Content that enables the creation of weapons of mass destruction."),
      ("Intellectual Property", "Content that violates the intellectual property rights of third parties."),
      ("Non-Violent Crimes", "Content that enables, encourages, or excuses the commission of non-violent crimes."),
      ("Privacy", "Content that contains sensitive, personal information about private individuals."),
      ("Self-Harm", "Content that enables, encourages, or excuses acts of intentional self-harm."),
      ("Sex Crimes", "Content that enables, encourages, or excuses the commission of sex crimes."),
      ("Sexual Content", "Content that contains erotic descriptions or explicit depictions of sex acts."),
      (
          "Specialized Advice",
          """
          Content that contains financial, medical, or legal advice.
                  Financial advice includes guidance on investments, stocks, bonds, or any financial planning.
          """
      ),
      ("Violent Crimes", "Content that enables, encourages, or excuses the commission of violent crimes."),
  ];

  async Task<(bool ContainsViolation, List<string> ViolatedCategories, string? Explanation)> ModerateMessageWithDefinitions(
      string message,
      IReadOnlyList<(string Category, string Definition)> categoryDefinitions
  )
  {
      // Format the unsafe categories string, with each category and its definition on a new line
      var unsafeCategoryText = string.Join(
          "\n",
          categoryDefinitions.Select(entry => $"{entry.Category}: {entry.Definition}")
      );

      // Construct the prompt for Claude, including the message and unsafe categories
      var assessmentPrompt = $$"""
  Determine whether the following message warrants moderation, based on the unsafe categories outlined below.

  Message:
  <message>{{message}}</message>

  Unsafe Categories and Their Definitions:
  <categories>
  {{unsafeCategoryText}}
  </categories>

  It's important that you remember all unsafe categories and their definitions.

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
      var (violation, violatedCategories, explanation) = await ModerateMessageWithDefinitions(
          comment,
          unsafeCategoryDefinitions
      );

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
  // Categories considered unsafe for content moderation, with their definitions.
  // A slice of category/definition pairs (rather than a map) keeps the rendered
  // order stable; Go maps iterate in random order.
  type categoryDefinition struct {
  	category   string
  	definition string
  }

  var unsafeCategoryDefinitions = []categoryDefinition{
  	{"Child Exploitation", "Content that depicts child nudity or that enables, encourages, excuses, or depicts the sexual abuse of children."},
  	{"Conspiracy Theories", `Content that promotes or endorses unfounded, false, or misleading theories about events, situations, or individuals,
          which can incite harm or undermine public trust in institutions or facts.`},
  	{"Hate", `Content that is hateful toward people on the basis of their protected characteristics
          (race, color, ethnicity, national origin, disability, religious affiliation, caste, sexual orientation, sex, gender identity and serious disease),
          or content that perpetuates negative stereotypes.`},
  	{"Indiscriminate Weapons", "Content that enables the creation of weapons of mass destruction."},
  	{"Intellectual Property", "Content that violates the intellectual property rights of third parties."},
  	{"Non-Violent Crimes", "Content that enables, encourages, or excuses the commission of non-violent crimes."},
  	{"Privacy", "Content that contains sensitive, personal information about private individuals."},
  	{"Self-Harm", "Content that enables, encourages, or excuses acts of intentional self-harm."},
  	{"Sex Crimes", "Content that enables, encourages, or excuses the commission of sex crimes."},
  	{"Sexual Content", "Content that contains erotic descriptions or explicit depictions of sex acts."},
  	{"Specialized Advice", `Content that contains financial, medical, or legal advice.
          Financial advice includes guidance on investments, stocks, bonds, or any financial planning.`},
  	{"Violent Crimes", "Content that enables, encourages, or excuses the commission of violent crimes."},
  }

  func moderateMessageWithDefinitions(message string, unsafeCategoryDefinitions []categoryDefinition) (bool, []string, string) {
  	// Format unsafe categories string, with each category and its definition on a new line
  	categoryLines := make([]string, len(unsafeCategoryDefinitions))
  	for i, entry := range unsafeCategoryDefinitions {
  		categoryLines[i] = fmt.Sprintf("%s: %s", entry.category, entry.definition)
  	}
  	unsafeCategoryStr := strings.Join(categoryLines, "\n")

  	// Construct the prompt for Claude, including the message and unsafe categories
  	assessmentPrompt := fmt.Sprintf(`Determine whether the following message warrants moderation, based on the unsafe categories outlined below.

  Message:
  <message>%s</message>

  Unsafe Categories and Their Definitions:
  <categories>
  %s
  </categories>

  It's important that you remember all unsafe categories and their definitions.

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

  // moderateAllCommentsWithDefinitions processes each comment and prints the results.
  func moderateAllCommentsWithDefinitions() {
  	for _, comment := range userComments {
  		fmt.Printf("\nComment: %s\n", comment)
  		violation, violatedCategories, explanation := moderateMessageWithDefinitions(comment, unsafeCategoryDefinitions)

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
  // Categories considered unsafe for content moderation, with their definitions
  record CategoryDefinition(String category, String definition) {}

  final List<CategoryDefinition> unsafeCategoryDefinitions = List.of(
          new CategoryDefinition(
                  "Child Exploitation",
                  "Content that depicts child nudity or that enables, encourages, excuses, or depicts the sexual abuse of children."),
          new CategoryDefinition(
                  "Conspiracy Theories",
                  """
                  Content that promotes or endorses unfounded, false, or misleading theories about events, situations, or individuals,
                          which can incite harm or undermine public trust in institutions or facts."""),
          new CategoryDefinition(
                  "Hate",
                  """
                  Content that is hateful toward people on the basis of their protected characteristics
                          (race, color, ethnicity, national origin, disability, religious affiliation, caste, sexual orientation, sex, gender identity and serious disease),
                          or content that perpetuates negative stereotypes."""),
          new CategoryDefinition(
                  "Indiscriminate Weapons",
                  "Content that enables the creation of weapons of mass destruction."),
          new CategoryDefinition(
                  "Intellectual Property",
                  "Content that violates the intellectual property rights of third parties."),
          new CategoryDefinition(
                  "Non-Violent Crimes",
                  "Content that enables, encourages, or excuses the commission of non-violent crimes."),
          new CategoryDefinition(
                  "Privacy",
                  "Content that contains sensitive, personal information about private individuals."),
          new CategoryDefinition(
                  "Self-Harm",
                  "Content that enables, encourages, or excuses acts of intentional self-harm."),
          new CategoryDefinition(
                  "Sex Crimes",
                  "Content that enables, encourages, or excuses the commission of sex crimes."),
          new CategoryDefinition(
                  "Sexual Content",
                  "Content that contains erotic descriptions or explicit depictions of sex acts."),
          new CategoryDefinition(
                  "Specialized Advice",
                  """
                  Content that contains financial, medical, or legal advice.
                          Financial advice includes guidance on investments, stocks, bonds, or any financial planning."""),
          new CategoryDefinition(
                  "Violent Crimes",
                  "Content that enables, encourages, or excuses the commission of violent crimes."));

  record ModerationDecision(boolean violation, List<String> violatedCategories, String explanation) {}

  ModerationDecision moderateMessageWithDefinitions(
          String message, List<CategoryDefinition> unsafeCategoryDefinitions)
          throws JsonProcessingException {
      // Format unsafe categories string, with each category and its definition on a new line
      String unsafeCategoryStr = unsafeCategoryDefinitions.stream()
              .map(categoryDefinition ->
                      categoryDefinition.category() + ": " + categoryDefinition.definition())
              .collect(Collectors.joining("\n"));

      // Construct the prompt for Claude, including the message and unsafe categories
      String assessmentPrompt = """
          Determine whether the following message warrants moderation, based on the unsafe categories outlined below.

          Message:
          <message>%s</message>

          Unsafe Categories and Their Definitions:
          <categories>
          %s
          </categories>

          It's important that you remember all unsafe categories and their definitions.

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

      return new ModerationDecision(containsViolation, violatedCategories, explanation);
  }

  // Process each comment and print the results
  void printModerationResultsWithDefinitions() throws JsonProcessingException {
      for (String comment : userComments) {
          IO.println("\nComment: " + comment);
          ModerationDecision result = moderateMessageWithDefinitions(comment, unsafeCategoryDefinitions);

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
  // Categories considered unsafe for content moderation, with their definitions
  $unsafeCategoryDefinitions = [
      'Child Exploitation' => 'Content that depicts child nudity or that enables, encourages, excuses, or depicts the sexual abuse of children.',
      'Conspiracy Theories' => 'Content that promotes or endorses unfounded, false, or misleading theories about events, situations, or individuals,
          which can incite harm or undermine public trust in institutions or facts.',
      'Hate' => 'Content that is hateful toward people on the basis of their protected characteristics
          (race, color, ethnicity, national origin, disability, religious affiliation, caste, sexual orientation, sex, gender identity and serious disease),
          or content that perpetuates negative stereotypes.',
      'Indiscriminate Weapons' => 'Content that enables the creation of weapons of mass destruction.',
      'Intellectual Property' => 'Content that violates the intellectual property rights of third parties.',
      'Non-Violent Crimes' => 'Content that enables, encourages, or excuses the commission of non-violent crimes.',
      'Privacy' => 'Content that contains sensitive, personal information about private individuals.',
      'Self-Harm' => 'Content that enables, encourages, or excuses acts of intentional self-harm.',
      'Sex Crimes' => 'Content that enables, encourages, or excuses the commission of sex crimes.',
      'Sexual Content' => 'Content that contains erotic descriptions or explicit depictions of sex acts.',
      'Specialized Advice' => 'Content that contains financial, medical, or legal advice.
          Financial advice includes guidance on investments, stocks, bonds, or any financial planning.',
      'Violent Crimes' => 'Content that enables, encourages, or excuses the commission of violent crimes.',
  ];

  $moderateMessageWithDefinitions = function (string $message, array $unsafeCategoryDefinitions) use ($client): array {
      // Format the unsafe categories string, with each category and its definition on a new line
      $categoryLines = [];
      foreach ($unsafeCategoryDefinitions as $category => $definition) {
          $categoryLines[] = "{$category}: {$definition}";
      }
      $unsafeCategoryStr = implode("\n", $categoryLines);

      // Construct the prompt for Claude, including the message and unsafe categories
      $assessmentPrompt = <<<PROMPT
      Determine whether the following message warrants moderation, based on the unsafe categories outlined below.

      Message:
      <message>{$message}</message>

      Unsafe Categories and Their Definitions:
      <categories>
      {$unsafeCategoryStr}
      </categories>

      It's important that you remember all unsafe categories and their definitions.

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
      [$violation, $violatedCategories, $explanation] = $moderateMessageWithDefinitions($comment, $unsafeCategoryDefinitions);

      if ($violation) {
          echo 'Violated Categories: ' . implode(', ', $violatedCategories) . "\n";
          echo "Explanation: {$explanation}\n";
      } else {
          echo "No issues detected.\n";
      }
  }
  ```

  ```ruby Ruby
  # Categories considered unsafe for content moderation, with their definitions
  UNSAFE_CATEGORY_DEFINITIONS = {
    "Child Exploitation" => "Content that depicts child nudity or that enables, encourages, excuses, or depicts the sexual abuse of children.",
    "Conspiracy Theories" => "Content that promotes or endorses unfounded, false, or misleading theories about events, situations, or individuals,
          which can incite harm or undermine public trust in institutions or facts.",
    "Hate" => "Content that is hateful toward people on the basis of their protected characteristics
          (race, color, ethnicity, national origin, disability, religious affiliation, caste, sexual orientation, sex, gender identity and serious disease),
          or content that perpetuates negative stereotypes.",
    "Indiscriminate Weapons" => "Content that enables the creation of weapons of mass destruction.",
    "Intellectual Property" => "Content that violates the intellectual property rights of third parties.",
    "Non-Violent Crimes" => "Content that enables, encourages, or excuses the commission of non-violent crimes.",
    "Privacy" => "Content that contains sensitive, personal information about private individuals.",
    "Self-Harm" => "Content that enables, encourages, or excuses acts of intentional self-harm.",
    "Sex Crimes" => "Content that enables, encourages, or excuses the commission of sex crimes.",
    "Sexual Content" => "Content that contains erotic descriptions or explicit depictions of sex acts.",
    "Specialized Advice" => "Content that contains financial, medical, or legal advice.
          Financial advice includes guidance on investments, stocks, bonds, or any financial planning.",
    "Violent Crimes" => "Content that enables, encourages, or excuses the commission of violent crimes."
  }

  def moderate_message_with_definitions(message, unsafe_category_definitions)
    # Format the unsafe categories string, with each category and its definition on a new line
    unsafe_category_str = unsafe_category_definitions
      .map { |category, definition| "#{category}: #{definition}" }
      .join("\n")

    # Construct the prompt for Claude, including the message and unsafe categories
    assessment_prompt = <<~PROMPT.chomp
      Determine whether the following message warrants moderation, based on the unsafe categories outlined below.

      Message:
      <message>#{message}</message>

      Unsafe Categories and Their Definitions:
      <categories>
      #{unsafe_category_str}
      </categories>

      It's important that you remember all unsafe categories and their definitions.

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
    violation, violated_categories, explanation = moderate_message_with_definitions(comment, UNSAFE_CATEGORY_DEFINITIONS)

    if violation
      puts "Violated Categories: #{violated_categories.join(", ")}"
      puts "Explanation: #{explanation}"
    else
      puts "No issues detected."
    end
  end
  ```

The `moderate_message_with_definitions` function expands upon the earlier `moderate_message` function by allowing each unsafe category to be paired with a detailed definition. This occurs in the code by replacing the `unsafe_categories` collection from the original function with an `unsafe_category_definitions` mapping. This mapping pairs each unsafe category with its corresponding definition. Both the category names and their definitions are included in the prompt.

Notably, the definition for the `Specialized Advice` category now specifies the types of financial advice that should be prohibited. As a result, the comment `It is a great time to invest in gold!`, which previously passed the `moderate_message` assessment, now triggers a violation.

### Consider batch processing

To reduce costs in situations where real-time moderation isn't necessary, consider moderating messages in batches. Include multiple messages within the prompt's context, and ask Claude to assess which messages should be moderated.

  ```python Python
  def batch_moderate_messages(messages, unsafe_categories):
      # Convert the unsafe categories into a string, with each category on a new line
      unsafe_category_str = "\n".join(unsafe_categories)

      # Format messages string, with each message wrapped in XML-like tags and given an ID
      messages_str = "\n".join(
          [f"<message id={idx}>{msg}</message>" for idx, msg in enumerate(messages)]
      )

      # Construct the prompt for Claude, including the messages and unsafe categories
      assessment_prompt = f"""Determine the messages to moderate, based on the unsafe categories outlined below.

  Messages:
  <messages>
  {messages_str}
  </messages>

  Unsafe Categories:
  <categories>
  {unsafe_category_str}
  </categories>

  Respond with ONLY a JSON object, using the format below:
  {{
    "violations": [
      {{
        "id": <message id>,
        "categories": [list of violated categories],
        "explanation": <Explanation of why there's a violation>
      }}
    ]
  }}

  Important Notes:
  - Remember to analyze every message for a violation.
  - Select any number of violations that reasonably apply.
  - Do not include markdown formatting or code fences in your response."""

      # Send the request to Claude for content moderation
      response = client.messages.create(
          model="claude-haiku-4-5-20251001",  # Using the Haiku model for lower costs
          max_tokens=2048,  # Increased max token count to handle batches
          messages=[{"role": "user", "content": assessment_prompt}],
      )

      # Parse the JSON response from Claude
      text_block = next(block for block in response.content if block.type == "text")
      assessment = json.loads(text_block.text)
      return assessment

  # Process the batch of comments and get the response
  response_obj = batch_moderate_messages(user_comments, unsafe_categories)

  # Print the results for each detected violation
  for violation in response_obj["violations"]:
      print(f"""Comment: {user_comments[violation["id"]]}
  Violated Categories: {", ".join(violation["categories"])}
  Explanation: {violation["explanation"]}
  """)
  ```

  ```typescript TypeScript
  // Shape of the JSON batch assessment Claude returns
  interface BatchAssessment {
    violations: {
      id: number;
      categories: string[];
      explanation: string;
    }[];
  }

  async function batchModerateMessages(
    messages: string[],
    unsafeCategories: string[]
  ): Promise<BatchAssessment> {
    // Convert the unsafe categories into a string, with each category on a new line
    const unsafeCategoryStr = unsafeCategories.join("\n");

    // Format the messages string, with each message wrapped in XML-like tags and given an ID
    const messagesStr = messages
      .map((msg, idx) => `<message id=${idx}>${msg}</message>`)
      .join("\n");

    // Construct the prompt for Claude, including the messages and unsafe categories
    const assessmentPrompt = `Determine the messages to moderate, based on the unsafe categories outlined below.

  Messages:
  <messages>
  ${messagesStr}
  </messages>

  Unsafe Categories:
  <categories>
  ${unsafeCategoryStr}
  </categories>

  Respond with ONLY a JSON object, using the format below:
  {
    "violations": [
      {
        "id": <message id>,
        "categories": [list of violated categories],
        "explanation": <Explanation of why there's a violation>
      }
    ]
  }

  Important Notes:
  - Remember to analyze every message for a violation.
  - Select any number of violations that reasonably apply.
  - Do not include markdown formatting or code fences in your response.`;

    // Send the request to Claude for content moderation
    const response = await client.messages.create({
      model: "claude-haiku-4-5-20251001", // Using the Haiku model for lower costs
      max_tokens: 2048, // Increased max token count to handle batches
      messages: [{ role: "user", content: assessmentPrompt }]
    });

    // Parse the JSON response from Claude
    const textBlock = response.content.find((block) => block.type === "text");
    if (!textBlock) {
      throw new Error("Expected a text block in the response");
    }
    const assessment: BatchAssessment = JSON.parse(textBlock.text);
    return assessment;
  }

  // Process the batch of comments and get the response
  const batchAssessment = await batchModerateMessages(userComments, unsafeCategories);

  // Print the results for each detected violation
  for (const violation of batchAssessment.violations) {
    console.log(`Comment: ${userComments[violation.id]}
  Violated Categories: ${violation.categories.join(", ")}
  Explanation: ${violation.explanation}
  `);
  }
  ```

  ```csharp C#
  async Task<JsonNode> BatchModerateMessages(IReadOnlyList<string> messages, IReadOnlyList<string> categories)
  {
      // Convert the unsafe categories into a string, with each category on a new line
      var unsafeCategoryText = string.Join("\n", categories);

      // Format the messages string, with each message wrapped in XML-like tags and given an ID
      var messagesText = string.Join(
          "\n",
          messages.Select((message, index) => $"<message id={index}>{message}</message>")
      );

      // Construct the prompt for Claude, including the messages and unsafe categories
      var assessmentPrompt = $$"""
  Determine the messages to moderate, based on the unsafe categories outlined below.

  Messages:
  <messages>
  {{messagesText}}
  </messages>

  Unsafe Categories:
  <categories>
  {{unsafeCategoryText}}
  </categories>

  Respond with ONLY a JSON object, using the format below:
  {
    "violations": [
      {
        "id": <message id>,
        "categories": [list of violated categories],
        "explanation": <Explanation of why there's a violation>
      }
    ]
  }

  Important Notes:
  - Remember to analyze every message for a violation.
  - Select any number of violations that reasonably apply.
  - Do not include markdown formatting or code fences in your response.
  """;

      // Send the request to Claude for content moderation
      var response = await client.Messages.Create(
          new()
          {
              Model = Model.ClaudeHaiku4_5_20251001, // Using the Haiku model for lower costs
              MaxTokens = 2048, // Increased max token count to handle batches
              Messages = [new() { Role = Role.User, Content = assessmentPrompt }],
          }
      );

      // Narrow the first content block to a text block, then parse Claude's JSON response
      if (!response.Content[0].TryPickText(out var textBlock))
      {
          throw new InvalidOperationException("Expected a text response from Claude.");
      }
      return JsonNode.Parse(textBlock.Text)!;
  }

  // Process the batch of comments and get the response
  var moderationResults = await BatchModerateMessages(userComments, unsafeCategories);

  // Print the results for each detected violation
  foreach (var violation in moderationResults["violations"]!.AsArray())
  {
      var flaggedComment = userComments[violation!["id"]!.GetValue<int>()];
      var violatedCategories = string.Join(
          ", ",
          violation["categories"]!.AsArray().Select(category => category!.GetValue<string>())
      );
      var explanation = violation["explanation"]!.GetValue<string>();

      Console.WriteLine($"""
          Comment: {flaggedComment}
          Violated Categories: {violatedCategories}
          Explanation: {explanation}

          """);
  }
  ```

  ```go Go
  // batchViolation is one entry in Claude's "violations" array: the index of the
  // offending message plus the categories it violated and why.
  type batchViolation struct {
  	ID          int      `json:"id"`
  	Categories  []string `json:"categories"`
  	Explanation string   `json:"explanation"`
  }

  func batchModerateMessages(messages []string, unsafeCategories []string) []batchViolation {
  	// Convert the unsafe categories into a string, with each category on a new line
  	unsafeCategoryStr := strings.Join(unsafeCategories, "\n")

  	// Format messages string, with each message wrapped in XML-like tags and given an ID
  	messageLines := make([]string, len(messages))
  	for i, message := range messages {
  		messageLines[i] = fmt.Sprintf("<message id=%d>%s</message>", i, message)
  	}
  	messagesStr := strings.Join(messageLines, "\n")

  	// Construct the prompt for Claude, including the messages and unsafe categories
  	assessmentPrompt := fmt.Sprintf(`Determine the messages to moderate, based on the unsafe categories outlined below.

  Messages:
  <messages>
  %s
  </messages>

  Unsafe Categories:
  <categories>
  %s
  </categories>

  Respond with ONLY a JSON object, using the format below:
  {
    "violations": [
      {
        "id": <message id>,
        "categories": [list of violated categories],
        "explanation": <Explanation of why there's a violation>
      }
    ]
  }

  Important Notes:
  - Remember to analyze every message for a violation.
  - Select any number of violations that reasonably apply.
  - Do not include markdown formatting or code fences in your response.`, messagesStr, unsafeCategoryStr)

  	// Send the request to Claude for content moderation
  	response, err := client.Messages.New(context.Background(), anthropic.MessageNewParams{
  		Model:     anthropic.ModelClaudeHaiku4_5_20251001, // Using the Haiku model for lower costs
  		MaxTokens: 2048,                                   // Increased max token count to handle batches
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
  		Violations []batchViolation `json:"violations"`
  	}
  	if err := json.Unmarshal([]byte(textBlock.Text), &assessment); err != nil {
  		log.Fatal(err)
  	}
  	return assessment.Violations
  }

  // moderateAllCommentsAsBatch moderates the whole batch of comments in a single
  // request and prints the results for each detected violation.
  func moderateAllCommentsAsBatch() {
  	// Process the batch of comments and get the response
  	violations := batchModerateMessages(userComments, unsafeCategories)

  	// Print the results for each detected violation
  	for _, violation := range violations {
  		fmt.Printf(`Comment: %s
  Violated Categories: %s
  Explanation: %s

  `, userComments[violation.ID], strings.Join(violation.Categories, ", "), violation.Explanation)
  	}
  }

  ```

  ```java Java
  JsonNode batchModerateMessages(List<String> messages, List<String> unsafeCategories)
          throws JsonProcessingException {
      // Convert the unsafe categories into a string, with each category on a new line
      String unsafeCategoryStr = String.join("\n", unsafeCategories);

      // Format messages string, with each message wrapped in XML-like tags and given an ID
      String messagesStr = IntStream.range(0, messages.size())
              .mapToObj(idx -> "<message id=%d>%s</message>".formatted(idx, messages.get(idx)))
              .collect(Collectors.joining("\n"));

      // Construct the prompt for Claude, including the messages and unsafe categories
      String assessmentPrompt = """
          Determine the messages to moderate, based on the unsafe categories outlined below.

          Messages:
          <messages>
          %s
          </messages>

          Unsafe Categories:
          <categories>
          %s
          </categories>

          Respond with ONLY a JSON object, using the format below:
          {
            "violations": [
              {
                "id": <message id>,
                "categories": [list of violated categories],
                "explanation": <Explanation of why there's a violation>
              }
            ]
          }

          Important Notes:
          - Remember to analyze every message for a violation.
          - Select any number of violations that reasonably apply.
          - Do not include markdown formatting or code fences in your response."""
              .formatted(messagesStr, unsafeCategoryStr);

      // Send the request to Claude for content moderation
      Message response = client.messages().create(MessageCreateParams.builder()
              .model(Model.CLAUDE_HAIKU_4_5_20251001) // Using the Haiku model for lower costs
              .maxTokens(2048) // Increased max token count to handle batches
              .addUserMessage(assessmentPrompt)
              .build());

      // Parse the JSON response from Claude
      String assessmentJson = response.content().stream()
              .flatMap(contentBlock -> contentBlock.text().stream())
              .findFirst()
              .orElseThrow()
              .text();
      return new ObjectMapper().readTree(assessmentJson);
  }

  // Process the batch of comments and print the results for each detected violation
  void printBatchViolations() throws JsonProcessingException {
      JsonNode response = batchModerateMessages(userComments, unsafeCategories);

      ObjectMapper mapper = new ObjectMapper();
      for (JsonNode violation : response.required("violations")) {
          List<String> violatedCategories =
                  mapper.convertValue(violation.required("categories"), new TypeReference<List<String>>() {});
          IO.println("""
                  Comment: %s
                  Violated Categories: %s
                  Explanation: %s
                  """.formatted(
                          userComments.get(violation.required("id").asInt()),
                          String.join(", ", violatedCategories),
                          violation.required("explanation").asText()));
      }
  }
  ```

  ```php PHP
  $batchModerateMessages = function (array $messages, array $unsafeCategories) use ($client): array {
      // Convert the unsafe categories into a string, with each category on a new line
      $unsafeCategoryStr = implode("\n", $unsafeCategories);

      // Format the messages string, with each message wrapped in XML-like tags and given an ID
      $messageLines = [];
      foreach ($messages as $idx => $msg) {
          $messageLines[] = "<message id={$idx}>{$msg}</message>";
      }
      $messagesStr = implode("\n", $messageLines);

      // Construct the prompt for Claude, including the messages and unsafe categories
      $assessmentPrompt = <<<PROMPT
      Determine the messages to moderate, based on the unsafe categories outlined below.

      Messages:
      <messages>
      {$messagesStr}
      </messages>

      Unsafe Categories:
      <categories>
      {$unsafeCategoryStr}
      </categories>

      Respond with ONLY a JSON object, using the format below:
      {
        "violations": [
          {
            "id": <message id>,
            "categories": [list of violated categories],
            "explanation": <Explanation of why there's a violation>
          }
        ]
      }

      Important Notes:
      - Remember to analyze every message for a violation.
      - Select any number of violations that reasonably apply.
      - Do not include markdown formatting or code fences in your response.
      PROMPT;

      // Send the request to Claude for content moderation
      $response = $client->messages->create(
          model: 'claude-haiku-4-5-20251001', // Using the Haiku model for lower costs
          maxTokens: 2048, // Increased max token count to handle batches
          messages: [['role' => 'user', 'content' => $assessmentPrompt]],
      );

      // Parse the JSON response from Claude. The SDK decodes each content block
      // into its concrete class, so find the TextBlock before reading the text.
      $textBlock = array_find($response->content, fn ($block) => $block instanceof TextBlock)
          ?? throw new RuntimeException('Expected a text block in the response.');

      return json_decode($textBlock->text, associative: true, flags: JSON_THROW_ON_ERROR);
  };

  // Process the batch of comments and get the response
  $responseObj = $batchModerateMessages($userComments, $unsafeCategories);

  // Print the results for each detected violation
  foreach ($responseObj['violations'] as $violation) {
      echo "Comment: {$userComments[$violation['id']]}\n";
      echo 'Violated Categories: ' . implode(', ', $violation['categories']) . "\n";
      echo "Explanation: {$violation['explanation']}\n\n";
  }
  ```

  ```ruby Ruby
  def batch_moderate_messages(messages, unsafe_categories)
    # Convert the unsafe categories into a string, with each category on a new line
    unsafe_category_str = unsafe_categories.join("\n")

    # Format the messages string, with each message wrapped in XML-like tags and given an ID
    messages_str = messages
      .map.with_index { |message, index| "<message id=#{index}>#{message}</message>" }
      .join("\n")

    # Construct the prompt for Claude, including the messages and unsafe categories
    assessment_prompt = <<~PROMPT.chomp
      Determine the messages to moderate, based on the unsafe categories outlined below.

      Messages:
      <messages>
      #{messages_str}
      </messages>

      Unsafe Categories:
      <categories>
      #{unsafe_category_str}
      </categories>

      Respond with ONLY a JSON object, using the format below:
      {
        "violations": [
          {
            "id": <message id>,
            "categories": [list of violated categories],
            "explanation": <Explanation of why there's a violation>
          }
        ]
      }

      Important Notes:
      - Remember to analyze every message for a violation.
      - Select any number of violations that reasonably apply.
      - Do not include markdown formatting or code fences in your response.
    PROMPT

    # Send the request to Claude for content moderation
    response = CLIENT.messages.create(
      model: "claude-haiku-4-5-20251001", # Using the Haiku model for lower costs
      max_tokens: 2048, # Increased max token count to handle batches
      messages: [{role: :user, content: assessment_prompt}]
    )

    # Parse the JSON response from Claude
    text_block = response.content.find { it.type == :text }
    JSON.parse(text_block.text)
  end

  # Process the batch of comments and get the response
  response_obj = batch_moderate_messages(USER_COMMENTS, UNSAFE_CATEGORIES)

  # Print the results for each detected violation
  response_obj["violations"].each do |violation|
    puts <<~RESULT
      Comment: #{USER_COMMENTS[violation["id"]]}
      Violated Categories: #{violation["categories"].join(", ")}
      Explanation: #{violation["explanation"]}

    RESULT
  end
  ```

In this example, the `batch_moderate_messages` function handles the moderation of an entire batch of messages with a single Claude API call. Inside the function, a prompt is created that includes the list of messages to evaluate and the unsafe content categories. The prompt directs Claude to return a JSON object listing all messages that contain violations. Each message in the response is identified by its `id`, which corresponds to the message's position in the batch. Keep in mind that finding the optimal batch size for your specific needs may require some experimentation. While larger batch sizes can lower costs, they might also lead to a slight decrease in quality. Additionally, you may need to increase the `max_tokens` parameter in the Claude API call to accommodate longer responses. For details on the maximum number of tokens your chosen model can output, refer to the [model comparison table](https://platform.claude.com/docs/en/models/overview#latest-models-comparison).

    View a fully implemented code-based example of how to use Claude for content moderation.

    Explore guardrail techniques to moderate interactions with Claude.

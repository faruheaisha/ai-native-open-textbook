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
sourceRel: "docs/en/build-with-claude/mid-conversation-effort-example.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/build-with-claude/mid-conversation-effort-example.md"
sourceSha256: "88a2fa6d07b354b90d37bbab7c6c1f65502776a31e4be76eaefe73d788798fbd"
pageSha256: "b570ece9cb3204f1e7fae9f82bae120f86a77b26978a6f76b95898887cb9d12e"
contentMode: "local-full"
zh: ""
---

## Fan out, then verify

The fan-out accepts up to `MAX_TOTAL_SUBTASKS` prompts, runs them through the journal with at most `MAX_CONCURRENT` in flight (sequential in the PHP port), and isolates failures so one broken subagent degrades to an error string instead of ending the run. Once the first wave finishes, a second wave reuses the same subagent path to try to refute each result: every verifier re-derives the claims from the source, defaulting to refuted when uncertain. Both the original result and its verdict are returned to the orchestrator so it can weigh them together.

  ```python Python
  def normalize_subtasks(raw) -> list[str]:
      """Accept the subtasks input in whatever shape the model emits: an array, the array
      JSON-encoded as a single string, or a newline-separated list."""
      if isinstance(raw, str):
          try:
              raw = json.loads(raw)
          except json.JSONDecodeError:
              raw = raw.splitlines() if "\n" in raw else [raw]
      if not isinstance(raw, list):
          return []
      return [task.strip() for task in raw if isinstance(task, str) and task.strip()]

  def verify_prompt_for(subtask: str, result: str) -> str:
      return (
          "Adversarially verify the subagent result below: try to REFUTE it. Re-derive the "
          "claims yourself with bash rather than trusting the result, and look for evidence "
          "that contradicts them. Default to refuted if uncertain. Call report_findings with "
          "summary 'refuted: <why>' or 'confirmed: <why>', citing the file:line or command "
          "output that decided it.\n\n"
          f"Subtask: {subtask}\n\nResult to verify:\n{result}"
      )

  def run_workflow(model: str, raw_subtasks) -> tuple[str, bool]:
      """Run subtasks as parallel subagents, then run a second verification wave over
      the results, and return both. MAX_TOTAL_SUBTASKS bounds how many the model can
      queue; MAX_CONCURRENT bounds how many run at once."""
      all_subtasks = normalize_subtasks(raw_subtasks)
      subtasks = all_subtasks[:MAX_TOTAL_SUBTASKS]
      dropped = len(all_subtasks) - len(subtasks)
      if not subtasks:
          return "Workflow error: no usable subtasks were provided.", True
      print(f"[workflow] fanning out {len(subtasks)} agents", file=sys.stderr)

      def run_one(prompt: str) -> str:
          try:
              return journaled(prompt, lambda: run_subagent(model, prompt))
          except Exception as error:  # isolation boundary: one bad subagent should not end the run
              return f"(subagent failed: {type(error).__name__}: {error})"

      with concurrent.futures.ThreadPoolExecutor(max_workers=MAX_CONCURRENT) as pool:
          results = list(pool.map(run_one, subtasks))
          print(f"[workflow] verifying {len(results)} results", file=sys.stderr)
          verify_prompts = [verify_prompt_for(task, result) for task, result in zip(subtasks, results)]
          verdicts = list(pool.map(run_one, verify_prompts))

      joined = "\n\n".join(
          f"[agent {index + 1}: {task}]\n{result}\n\n[verify {index + 1}]\n{verdict}"
          for index, (task, result, verdict) in enumerate(zip(subtasks, results, verdicts))
      )
      if dropped > 0:
          joined = (
              f"(note: {dropped} subtasks beyond MAX_TOTAL_SUBTASKS={MAX_TOTAL_SUBTASKS} were not "
              "run; rerun them in a follow-up Workflow call)\n\n" + joined
          )
      return joined, False
  ```

  ```typescript TypeScript
  // Accept the subtasks input in whatever shape the model emits: an array, the array
  // JSON-encoded as a single string, or a newline-separated list.
  function normalizeSubtasks(raw: unknown): string[] {
    let value = raw;
    if (typeof raw === "string") {
      try {
        value = JSON.parse(raw);
      } catch {
        value = raw.includes("\n") ? raw.split("\n") : [raw];
      }
    }
    if (!Array.isArray(value)) {
      return [];
    }
    return value
      .filter((task): task is string => typeof task === "string")
      .map((task) => task.trim())
      .filter((task) => task.length > 0);
  }

  function verifyPromptFor(subtask: string, result: string): string {
    return (
      "Adversarially verify the subagent result below: try to REFUTE it. Re-derive the " +
      "claims yourself with bash rather than trusting the result, and look for evidence " +
      "that contradicts them. Default to refuted if uncertain. Call report_findings with " +
      "summary 'refuted: <why>' or 'confirmed: <why>', citing the file:line or command " +
      "output that decided it.\n\n" +
      `Subtask: ${subtask}\n\nResult to verify:\n${result}`
    );
  }

  // Map with a concurrency limit: at most `limit` tasks are in flight at once.
  async function mapWithLimit<In, Out>(
    items: readonly In[],
    limit: number,
    task: (item: In) => Promise<Out>,
  ): Promise<Out[]> {
    const results = new Array<Out>(items.length);
    let cursor = 0;
    const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
      while (cursor < items.length) {
        const index = cursor++;
        results[index] = await task(items[index]);
      }
    });
    await Promise.all(workers);
    return results;
  }

  // Run subtasks as parallel subagents, then run a second verification wave over
  // the results, and return both. MAX_TOTAL_SUBTASKS bounds how many the model can
  // queue; MAX_CONCURRENT bounds how many run at once.
  async function runWorkflow(
    model: string,
    rawSubtasks: unknown,
  ): Promise<{ output: string; isError: boolean }> {
    const allSubtasks = normalizeSubtasks(rawSubtasks);
    const subtasks = allSubtasks.slice(0, MAX_TOTAL_SUBTASKS);
    const dropped = allSubtasks.length - subtasks.length;
    if (subtasks.length === 0) {
      return { output: "Workflow error: no usable subtasks were provided.", isError: true };
    }
    console.error(`[workflow] fanning out ${subtasks.length} agents`);

    const runOne = async (prompt: string): Promise<string> => {
      try {
        return await journaled(prompt, () => runSubagent(model, prompt));
      } catch (error) {
        // Isolation boundary: one bad subagent should not end the run.
        const reason = error instanceof Error ? `${error.name}: ${error.message}` : String(error);
        return `(subagent failed: ${reason})`;
      }
    };

    const results = await mapWithLimit(subtasks, MAX_CONCURRENT, runOne);
    console.error(`[workflow] verifying ${results.length} results`);
    const verifyPrompts = subtasks.map((task, index) => verifyPromptFor(task, results[index]));
    const verdicts = await mapWithLimit(verifyPrompts, MAX_CONCURRENT, runOne);

    let joined = subtasks
      .map(
        (task, index) =>
          `[agent ${index + 1}: ${task}]\n${results[index]}\n\n[verify ${index + 1}]\n${verdicts[index]}`,
      )
      .join("\n\n");
    if (dropped > 0) {
      joined =
        `(note: ${dropped} subtasks beyond MAX_TOTAL_SUBTASKS=${MAX_TOTAL_SUBTASKS} were not ` +
        "run; rerun them in a follow-up Workflow call)\n\n" +
        joined;
    }
    return { output: joined, isError: false };
  }
  ```

  ```csharp C#
  // Accept the subtasks input in whatever shape the model emits: an array, the array
  // JSON-encoded as a single string, or a newline-separated list.
  List<string> NormalizeSubtasks(JsonElement raw)
  {
      List<string> tasks = [];
      if (raw.ValueKind == JsonValueKind.Array)
      {
          tasks = raw.EnumerateArray()
              .Where(item => item.ValueKind == JsonValueKind.String)
              .Select(item => item.GetString()!)
              .ToList();
      }
      else if (raw.ValueKind == JsonValueKind.String)
      {
          var single = raw.GetString()!;
          try
          {
              tasks = JsonSerializer.Deserialize<List<string>>(single) ?? [];
          }
          catch (JsonException)
          {
              tasks = [.. single.Split('\n')];
          }
      }
      return tasks.Where(task => task != null).Select(task => task.Trim()).Where(task => task.Length > 0).ToList();
  }

  string VerifyPromptFor(string subtask, string result) =>
      "Adversarially verify the subagent result below: try to REFUTE it. Re-derive the "
      + "claims yourself with bash rather than trusting the result, and look for evidence "
      + "that contradicts them. Default to refuted if uncertain. Call report_findings with "
      + "summary 'refuted: <why>' or 'confirmed: <why>', citing the file:line or command "
      + "output that decided it.\n\n"
      + $"Subtask: {subtask}\n\nResult to verify:\n{result}";

  // Run subtasks as parallel subagents, then run a second verification wave over
  // the results, and return both. maxTotalSubtasks bounds how many the model can
  // queue; maxConcurrent bounds how many run at once.
  async Task<(string Output, bool IsError)> RunWorkflow(JsonElement rawSubtasks)
  {
      var allSubtasks = NormalizeSubtasks(rawSubtasks);
      var subtasks = allSubtasks.Take(maxTotalSubtasks).ToList();
      var dropped = allSubtasks.Count - subtasks.Count;
      if (subtasks.Count == 0)
      {
          return ("Workflow error: no usable subtasks were provided.", true);
      }
      Console.Error.WriteLine($"[workflow] fanning out {subtasks.Count} agents");

      using SemaphoreSlim gate = new(maxConcurrent);
      async Task<string> RunOne(string prompt)
      {
          await gate.WaitAsync();
          try
          {
              return await Journaled(prompt, () => RunSubagent(prompt));
          }
          catch (Exception error)
          {
              // Isolation boundary: one bad subagent should not end the run.
              return $"(subagent failed: {error.GetType().Name}: {error.Message})";
          }
          finally
          {
              gate.Release();
          }
      }

      var results = await Task.WhenAll(subtasks.Select(RunOne));
      Console.Error.WriteLine($"[workflow] verifying {results.Length} results");
      var verifyPrompts = subtasks.Select((task, index) => VerifyPromptFor(task, results[index])).ToList();
      var verdicts = await Task.WhenAll(verifyPrompts.Select(RunOne));

      var joined = string.Join(
          "\n\n",
          subtasks.Select((task, index) =>
              $"[agent {index + 1}: {task}]\n{results[index]}\n\n[verify {index + 1}]\n{verdicts[index]}"));
      if (dropped > 0)
      {
          joined = $"(note: {dropped} subtasks beyond maxTotalSubtasks={maxTotalSubtasks} were not run; "
              + "rerun them in a follow-up Workflow call)\n\n" + joined;
      }
      return (joined, false);
  }
  ```

  ```go Go
  // normalizeSubtasks accepts the subtasks input in whatever shape the model emits: an
  // array, the array JSON-encoded as a single string, or a newline-separated list.
  func normalizeSubtasks(raw json.RawMessage) []string {
  	var tasks []string
  	if err := json.Unmarshal(raw, &tasks); err != nil {
  		var single string
  		if err := json.Unmarshal(raw, &single); err != nil {
  			return nil
  		}
  		if err := json.Unmarshal([]byte(single), &tasks); err != nil {
  			tasks = strings.Split(single, "\n")
  		}
  	}
  	cleaned := make([]string, 0, len(tasks))
  	for _, task := range tasks {
  		if trimmed := strings.TrimSpace(task); trimmed != "" {
  			cleaned = append(cleaned, trimmed)
  		}
  	}
  	return cleaned
  }

  func verifyPromptFor(subtask, result string) string {
  	return "Adversarially verify the subagent result below: try to REFUTE it. Re-derive the " +
  		"claims yourself with bash rather than trusting the result, and look for evidence " +
  		"that contradicts them. Default to refuted if uncertain. Call report_findings with " +
  		"summary 'refuted: <why>' or 'confirmed: <why>', citing the file:line or command " +
  		"output that decided it.\n\n" +
  		"Subtask: " + subtask + "\n\nResult to verify:\n" + result
  }

  // mapWithLimit runs task over items with at most limit goroutines in flight.
  func mapWithLimit(items []string, limit int, task func(string) string) []string {
  	results := make([]string, len(items))
  	semaphore := make(chan struct{}, limit)
  	var waitGroup sync.WaitGroup
  	for index, item := range items {
  		waitGroup.Add(1)
  		semaphore <- struct{}{}
  		go func() {
  			defer waitGroup.Done()
  			defer func() { <-semaphore }()
  			results[index] = task(item)
  		}()
  	}
  	waitGroup.Wait()
  	return results
  }

  // runWorkflow runs subtasks as parallel subagents, then runs a second verification wave
  // over the results, and returns both. maxTotalSubtasks bounds how many the model can
  // queue; maxConcurrent bounds how many run at once.
  func runWorkflow(ctx context.Context, model string, rawSubtasks json.RawMessage) (string, bool) {
  	allSubtasks := normalizeSubtasks(rawSubtasks)
  	subtasks := allSubtasks
  	if len(subtasks) > maxTotalSubtasks {
  		subtasks = subtasks[:maxTotalSubtasks]
  	}
  	dropped := len(allSubtasks) - len(subtasks)
  	if len(subtasks) == 0 {
  		return "Workflow error: no usable subtasks were provided.", true
  	}
  	fmt.Fprintf(os.Stderr, "[workflow] fanning out %d agents\n", len(subtasks))

  	runOne := func(prompt string) string {
  		report, err := journaled(prompt, func() (string, error) { return runSubagent(ctx, model, prompt) })
  		if err != nil {
  			// Isolation boundary: one bad subagent should not end the run.
  			return fmt.Sprintf("(subagent failed: %s)", err)
  		}
  		return report
  	}

  	results := mapWithLimit(subtasks, maxConcurrent, runOne)
  	fmt.Fprintf(os.Stderr, "[workflow] verifying %d results\n", len(results))
  	verifyPrompts := make([]string, len(subtasks))
  	for index, task := range subtasks {
  		verifyPrompts[index] = verifyPromptFor(task, results[index])
  	}
  	verdicts := mapWithLimit(verifyPrompts, maxConcurrent, runOne)

  	sections := make([]string, len(subtasks))
  	for index, task := range subtasks {
  		sections[index] = fmt.Sprintf("[agent %d: %s]\n%s\n\n[verify %d]\n%s",
  			index+1, task, results[index], index+1, verdicts[index])
  	}
  	joined := strings.Join(sections, "\n\n")
  	if dropped > 0 {
  		joined = fmt.Sprintf("(note: %d subtasks beyond maxTotalSubtasks=%d were not run; "+
  			"rerun them in a follow-up Workflow call)\n\n", dropped, maxTotalSubtasks) + joined
  	}
  	return joined, false
  }

  ```

  ```java Java
  // Accept the subtasks input in whatever shape the model emits: an array, the array
  // JSON-encoded as a single string, or a newline-separated list.
  List<String> normalizeSubtasks(JsonValue raw) {
      List<String> tasks = new ArrayList<>();
      if (raw.asArray().isPresent()) {
          for (JsonValue item : (List<JsonValue>) raw.asArray().get()) {
              tasks.add(item.asString().isPresent() ? item.asStringOrThrow() : item.toString());
          }
      } else if (raw.asString().isPresent()) {
          String single = raw.asStringOrThrow();
          try {
              String[] parsed = new ObjectMapper().readValue(single, String[].class);
              if (parsed != null) {
                  for (String task : parsed) {
                      tasks.add(task);
                  }
              }
          } catch (JsonProcessingException error) {
              for (String task : single.split("\n")) {
                  tasks.add(task);
              }
          }
      }
      return tasks.stream()
              .filter(task -> task != null)
              .map(String::trim)
              .filter(task -> !task.isEmpty())
              .toList();
  }

  String verifyPromptFor(String subtask, String result) {
      return "Adversarially verify the subagent result below: try to REFUTE it. Re-derive the "
              + "claims yourself with bash rather than trusting the result, and look for evidence "
              + "that contradicts them. Default to refuted if uncertain. Call report_findings with "
              + "summary 'refuted: <why>' or 'confirmed: <why>', citing the file:line or command "
              + "output that decided it.\n\n"
              + "Subtask: " + subtask + "\n\nResult to verify:\n" + result;
  }

  List<String> runAll(ExecutorService pool, List<String> prompts, Model model) throws InterruptedException {
      List<Callable<String>> jobs = prompts.stream()
              .<Callable<String>>map(prompt -> () -> journaled(prompt, () -> runSubagent(model, prompt)))
              .toList();
      List<String> results = new ArrayList<>();
      for (Future<String> future : pool.invokeAll(jobs)) {
          try {
              results.add(future.get());
          } catch (ExecutionException | CancellationException error) {
              // Isolation boundary: one bad subagent should not end the run.
              Throwable cause = error.getCause() != null ? error.getCause() : error;
              results.add("(subagent failed: " + cause + ")");
          }
      }
      return results;
  }

  // Run subtasks as parallel subagents, then run a second verification wave over
  // the results, and return both. MAX_TOTAL_SUBTASKS bounds how many the model can
  // queue; MAX_CONCURRENT bounds how many run at once.
  ToolOutput runWorkflow(Model model, JsonValue rawSubtasks) throws InterruptedException {
      List<String> allSubtasks = normalizeSubtasks(rawSubtasks);
      List<String> subtasks = allSubtasks.stream().limit(MAX_TOTAL_SUBTASKS).toList();
      int dropped = allSubtasks.size() - subtasks.size();
      if (subtasks.isEmpty()) {
          return new ToolOutput("Workflow error: no usable subtasks were provided.", true);
      }
      System.err.println("[workflow] fanning out " + subtasks.size() + " agents");

      List<String> results;
      List<String> verdicts;
      try (ExecutorService pool = Executors.newFixedThreadPool(MAX_CONCURRENT, Thread.ofVirtual().factory())) {
          results = runAll(pool, subtasks, model);
          System.err.println("[workflow] verifying " + results.size() + " results");
          List<String> verifyPrompts = IntStream.range(0, subtasks.size())
                  .mapToObj(index -> verifyPromptFor(subtasks.get(index), results.get(index)))
                  .toList();
          verdicts = runAll(pool, verifyPrompts, model);
      }
      String joined = IntStream.range(0, subtasks.size())
              .mapToObj(index -> "[agent " + (index + 1) + ": " + subtasks.get(index) + "]\n" + results.get(index)
                      + "\n\n[verify " + (index + 1) + "]\n" + verdicts.get(index))
              .collect(Collectors.joining("\n\n"));
      if (dropped > 0) {
          joined = "(note: " + dropped + " subtasks beyond MAX_TOTAL_SUBTASKS=" + MAX_TOTAL_SUBTASKS
                  + " were not run; rerun them in a follow-up Workflow call)\n\n" + joined;
      }
      return new ToolOutput(joined, false);
  }
  ```

  ```php PHP
  /**
   * Accept the subtasks input in whatever shape the model emits: an array, the array
   * JSON-encoded as a single string, or a newline-separated list.
   */
  function normalizeSubtasks(mixed $raw): array
  {
      if (is_string($raw)) {
          try {
              $raw = json_decode($raw, true, flags: JSON_THROW_ON_ERROR);
          } catch (JsonException) {
              $raw = str_contains($raw, "\n") ? explode("\n", $raw) : [$raw];
          }
      }
      if (!is_array($raw)) {
          return [];
      }
      $tasks = array_map('trim', array_filter($raw, 'is_string'));
      return array_values(array_filter($tasks, fn ($task) => $task !== ''));
  }

  function verifyPromptFor(string $subtask, string $result): string
  {
      return 'Adversarially verify the subagent result below: try to REFUTE it. Re-derive the '
          . 'claims yourself with bash rather than trusting the result, and look for evidence '
          . 'that contradicts them. Default to refuted if uncertain. Call report_findings with '
          . "summary 'refuted: <why>' or 'confirmed: <why>', citing the file:line or command "
          . "output that decided it.\n\n"
          . "Subtask: {$subtask}\n\nResult to verify:\n{$result}";
  }

  /**
   * Run subtasks through the journal, then run a second verification wave over the
   * results, and return both. PHP's standard runtime has no lightweight thread pool,
   * so both waves run sequentially here (MAX_CONCURRENT is unused); the SDK examples
   * in other languages fan them out in parallel.
   */
  function runWorkflow(Client $client, string $model, mixed $rawSubtasks): array
  {
      $allSubtasks = normalizeSubtasks($rawSubtasks);
      $subtasks = array_slice($allSubtasks, 0, MAX_TOTAL_SUBTASKS);
      $dropped = count($allSubtasks) - count($subtasks);
      if ($subtasks === []) {
          return ['Workflow error: no usable subtasks were provided.', true];
      }
      fwrite(STDERR, '[workflow] running ' . count($subtasks) . " agents\n");

      $runOne = function (string $prompt) use ($client, $model): string {
          try {
              return journaled($prompt, fn () => runSubagent($client, $model, $prompt));
          } catch (Throwable $error) {
              // Isolation boundary: one bad subagent should not end the run.
              return '(subagent failed: ' . $error::class . ': ' . $error->getMessage() . ')';
          }
      };

      $results = array_map($runOne, $subtasks);
      fwrite(STDERR, '[workflow] verifying ' . count($results) . " results\n");
      $verifyPrompts = array_map(verifyPromptFor(...), $subtasks, $results);
      $verdicts = array_map($runOne, $verifyPrompts);

      $sections = [];
      foreach ($subtasks as $index => $task) {
          $sections[] = '[agent ' . ($index + 1) . ": {$task}]\n{$results[$index]}"
              . "\n\n[verify " . ($index + 1) . "]\n{$verdicts[$index]}";
      }
      $joined = implode("\n\n", $sections);
      if ($dropped > 0) {
          $joined = '(note: ' . $dropped . ' subtasks beyond MAX_TOTAL_SUBTASKS=' . MAX_TOTAL_SUBTASKS
              . " were not run; rerun them in a follow-up Workflow call)\n\n" . $joined;
      }
      return [$joined, false];
  }
  ```

  ```ruby Ruby
  # Accept the subtasks input in whatever shape the model emits: an array, the array
  # JSON-encoded as a single string, or a newline-separated list.
  def normalize_subtasks(raw)
    if raw.is_a?(String)
      begin
        raw = JSON.parse(raw)
      rescue JSON::ParserError
        raw = raw.include?("\n") ? raw.split("\n") : [raw]
      end
    end
    return [] unless raw.is_a?(Array)
    raw.select { |task| task.is_a?(String) }.map(&:strip).reject(&:empty?)
  end

  def verify_prompt_for(subtask, result)
    "Adversarially verify the subagent result below: try to REFUTE it. Re-derive the " \
      "claims yourself with bash rather than trusting the result, and look for evidence " \
      "that contradicts them. Default to refuted if uncertain. Call report_findings with " \
      "summary 'refuted: <why>' or 'confirmed: <why>', citing the file:line or command " \
      "output that decided it.\n\n" \
      "Subtask: #{subtask}\n\nResult to verify:\n#{result}"
  end

  # Map with a concurrency limit: at most `limit` threads are in flight at once.
  def map_with_limit(items, limit)
    results = Array.new(items.length)
    queue = Queue.new
    items.each_with_index { |item, index| queue << [index, item] }
    workers = Array.new([limit, items.length].min) do
      Thread.new do
        until queue.empty?
          index, item = queue.pop(true) rescue break
          results[index] = yield item
        end
      end
    end
    workers.each(&:join)
    results
  end

  # Run subtasks as parallel subagents, then run a second verification wave over
  # the results, and return both. MAX_TOTAL_SUBTASKS bounds how many the model can
  # queue; MAX_CONCURRENT bounds how many run at once.
  def run_workflow(model, raw_subtasks)
    all_subtasks = normalize_subtasks(raw_subtasks)
    subtasks = all_subtasks.first(MAX_TOTAL_SUBTASKS)
    dropped = all_subtasks.length - subtasks.length
    return ["Workflow error: no usable subtasks were provided.", true] if subtasks.empty?

    warn "[workflow] fanning out #{subtasks.length} agents"
    run_one = lambda do |prompt|
      journaled(prompt) { run_subagent(model, prompt) }
    rescue => error # isolation boundary: one bad subagent should not end the run
      "(subagent failed: #{error.class}: #{error.message})"
    end

    results = map_with_limit(subtasks, MAX_CONCURRENT, &run_one)
    warn "[workflow] verifying #{results.length} results"
    verify_prompts = subtasks.zip(results).map { |task, result| verify_prompt_for(task, result) }
    verdicts = map_with_limit(verify_prompts, MAX_CONCURRENT, &run_one)

    joined = subtasks.each_with_index.map do |task, index|
      "[agent #{index + 1}: #{task}]\n#{results[index]}\n\n[verify #{index + 1}]\n#{verdicts[index]}"
    end.join("\n\n")
    if dropped > 0
      joined =
        "(note: #{dropped} subtasks beyond MAX_TOTAL_SUBTASKS=#{MAX_TOTAL_SUBTASKS} were not " \
        "run; rerun them in a follow-up Workflow call)\n\n#{joined}"
    end
    [joined, false]
  end
  ```

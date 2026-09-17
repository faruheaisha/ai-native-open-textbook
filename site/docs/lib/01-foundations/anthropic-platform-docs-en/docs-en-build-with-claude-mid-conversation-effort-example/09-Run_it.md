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
pageSha256: "4b733101a6d27a49db6a217719a9c13551a43aad01f035ba019bf707d7204f78"
contentMode: "local-full"
zh: ""
---

## Run it

  The bash tool in this example runs model-written commands directly on your machine with no sandbox, and the fan-out runs several of those agents in parallel. Run it in a directory and environment you are comfortable exposing, and add sandboxing before adapting it for anything beyond local experimentation.

  ```python Python
  if __name__ == "__main__":
      task = (
          sys.argv[1]
          if len(sys.argv) > 1
          else "Explore the current directory, then give a thorough review: what it does, "
          "code-quality issues, and concrete improvements."
      )
      agent = ModeAgent(MODEL)
      print(agent.turn(task))
      agent.set_mode(False)
      print(agent.turn("Briefly summarize what you found above, no fan-out needed."))
  ```

  ```typescript TypeScript
  const task =
    process.argv[2] ??
    "Explore the current directory, then give a thorough review: what it does, " +
      "code-quality issues, and concrete improvements.";
  const agent = new ModeAgent(MODEL);
  console.log(await agent.turn(task));
  agent.setMode(false);
  console.log(await agent.turn("Briefly summarize what you found above, no fan-out needed."));
  ```

  ```csharp C#
  var task = args.Length > 0
      ? args[0]
      : "Explore the current directory, then give a thorough review: what it does, "
          + "code-quality issues, and concrete improvements.";
  Console.WriteLine(await Turn(task));
  SetMode(false);
  Console.WriteLine(await Turn("Briefly summarize what you found above, no fan-out needed."));
  ```

  ```go Go
  func main() {
  	if err := run(context.Background()); err != nil {
  		log.Fatal(err)
  	}
  }

  func run(ctx context.Context) error {
  	if docTestMode {
  		defer os.RemoveAll(workDir)
  	}
  	task := "Explore the current directory, then give a thorough review: what it does, " +
  		"code-quality issues, and concrete improvements."
  	if len(os.Args) > 1 {
  		task = os.Args[1]
  	}
  	agent := newModeAgent(modelID)
  	answer, err := agent.turn(ctx, task)
  	if err != nil {
  		return err
  	}
  	fmt.Println(answer)

  	agent.setMode(false)
  	summary, err := agent.turn(ctx, "Briefly summarize what you found above, no fan-out needed.")
  	if err != nil {
  		return err
  	}
  	fmt.Println(summary)
  	return nil
  }

  ```

  ```java Java
  void main(String[] args) throws InterruptedException {
      String task = args.length > 0
              ? args[0]
              : "Explore the current directory, then give a thorough review: what it does, "
                      + "code-quality issues, and concrete improvements.";
      ModeAgent agent = new ModeAgent(MODEL);
      IO.println(agent.turn(task));
      agent.setMode(false);
      IO.println(agent.turn("Briefly summarize what you found above, no fan-out needed."));
  }
  ```

  ```php PHP
  $task = $argv[1] ??
      'Explore the current directory, then give a thorough review: what it does, '
      . 'code-quality issues, and concrete improvements.';
  $agent = new ModeAgent($client, MODEL);
  echo $agent->turn($task), PHP_EOL;
  $agent->setMode(false);
  echo $agent->turn('Briefly summarize what you found above, no fan-out needed.'), PHP_EOL;
  ```

  ```ruby Ruby
  task = ARGV[0] ||
    "Explore the current directory, then give a thorough review: what it does, " \
    "code-quality issues, and concrete improvements."
  agent = ModeAgent.new(MODEL)
  puts agent.turn(task)
  agent.set_mode(false)
  puts agent.turn("Briefly summarize what you found above, no fan-out needed.")
  ```

Start the example from the directory you want the agents to work in, for example the root of a repository to review:

```bash
python orchestration_mode.py "Review this repository for flaky tests and propose fixes."
```

With the mode on, expect the model to scout with a few bash commands, dispatch the Workflow tool unprompted, and synthesize the subagent reports into a final answer. Trivial or conversational requests stay solo, as the reminder instructs.

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
pageSha256: "6afd0e2b5234c021eeadd5317af9b4350493d0878810a286b4bed7960db791ce"
contentMode: "local-full"
zh: ""
---

## Run the bash tool locally

The bash handler runs the requested command with a timeout, captures combined stdout and stderr, and truncates the result so a runaway command can't flood the context window. Commands run in the directory you launch the example from, so pointing it at a project means starting it there; when `DOC_TEST_MODE` is set, the harness instead gives bash a small throwaway fixture directory that is removed on exit. There is no sandbox here: the command runs with the permissions of the process that launched the example. For clarity this example runs each call in a fresh subshell rather than maintaining the persistent session the `bash_20250124` contract describes; a production agent should back the tool with a long-lived shell so that working directory, environment, and the `restart` action behave as documented.

  ```python Python
  # Run bash where the example was launched. In DOC_TEST_MODE the docs harness
  # points it at a throwaway fixture directory instead, removed on exit.
  if DOC_TEST_MODE:
      WORK_DIR = tempfile.mkdtemp(prefix="orchestration-")
      atexit.register(shutil.rmtree, WORK_DIR, ignore_errors=True)
      with open(os.path.join(WORK_DIR, "sample.py"), "w") as fixture:
          fixture.write(
              "def fib(n):\n"
              "    return n if n < 2 else fib(n - 1) + fib(n - 2)\n\n"
              "print(fib(10))\n"
          )
  else:
      WORK_DIR = os.getcwd()

  def run_bash(command: str) -> tuple[str, bool]:
      """Run a shell command and return (output, is_error). No sandbox: example code only."""
      print(f"[bash] {command}", file=sys.stderr)
      try:
          proc = subprocess.run(
              ["bash", "-c", command],
              cwd=WORK_DIR,
              capture_output=True,
              text=True,
              errors="replace",
              timeout=BASH_TIMEOUT_SECONDS,
          )
      except subprocess.TimeoutExpired:
          return f"command timed out after {BASH_TIMEOUT_SECONDS}s", True
      output = (proc.stdout + proc.stderr).strip() or "(no output)"
      if len(output) > TOOL_RESULT_MAX_CHARS:
          output = output[:TOOL_RESULT_MAX_CHARS] + f"\n(truncated at {TOOL_RESULT_MAX_CHARS} chars)"
      if proc.returncode != 0:
          output = f"(exit code {proc.returncode})\n{output}"
      return output, proc.returncode != 0

  def handle_bash_block(block) -> tuple[str, bool]:
      if block.input.get("restart") is True:
          return "Shell restarted.", False
      command = block.input.get("command")
      if not isinstance(command, str) or not command:
          return "bash error: no command was provided.", True
      return run_bash(command)
  ```

  ```typescript TypeScript
  const execShell = promisify(exec);

  // Run bash where the example was launched. In DOC_TEST_MODE the docs harness
  // points it at a throwaway fixture directory instead, removed on exit.
  const WORK_DIR = DOC_TEST_MODE
    ? await mkdtemp(join(tmpdir(), "orchestration-"))
    : process.cwd();
  if (DOC_TEST_MODE) {
    await writeFile(
      join(WORK_DIR, "sample.py"),
      "def fib(n):\n" +
        "    return n if n < 2 else fib(n - 1) + fib(n - 2)\n\n" +
        "print(fib(10))\n",
    );
    process.on("exit", () => rmSync(WORK_DIR, { recursive: true, force: true }));
  }

  // Run a shell command and return its output. No sandbox: example code only.
  async function runBash(command: string): Promise<{ output: string; isError: boolean }> {
    console.error(`[bash] ${command}`);
    let stdout = "";
    let stderr = "";
    let exitCode = 0;
    try {
      ({ stdout, stderr } = await execShell(command, {
        shell: "/bin/bash",
        cwd: WORK_DIR,
        timeout: BASH_TIMEOUT_SECONDS * 1000,
        maxBuffer: 16 * 1024 * 1024,
      }));
    } catch (error) {
      const failure = error as {
        stdout?: string;
        stderr?: string;
        code?: number | string;
        killed?: boolean;
      };
      if (failure.killed && failure.code !== "ERR_CHILD_PROCESS_STDIO_MAXBUFFER") {
        return { output: `command timed out after ${BASH_TIMEOUT_SECONDS}s`, isError: true };
      }
      stdout = failure.stdout ?? "";
      stderr = failure.stderr ?? "";
      exitCode = typeof failure.code === "number" ? failure.code : 1;
    }
    let output = (stdout + stderr).trim() || "(no output)";
    const codePoints = [...output];
    if (codePoints.length > TOOL_RESULT_MAX_CHARS) {
      output =
        codePoints.slice(0, TOOL_RESULT_MAX_CHARS).join("") +
        `\n(truncated at ${TOOL_RESULT_MAX_CHARS} chars)`;
    }
    if (exitCode !== 0) {
      output = `(exit code ${exitCode})\n${output}`;
    }
    return { output, isError: exitCode !== 0 };
  }

  async function handleBashBlock(
    block: Anthropic.ToolUseBlock,
  ): Promise<{ output: string; isError: boolean }> {
    const input = block.input as { command?: string; restart?: boolean };
    if (input.restart === true) {
      return { output: "Shell restarted.", isError: false };
    }
    if (!input.command) {
      return { output: "bash error: no command was provided.", isError: true };
    }
    return runBash(input.command);
  }
  ```

  ```csharp C#
  // Run bash where the example was launched. In DOC_TEST_MODE the docs harness
  // points it at a throwaway fixture directory instead, removed on exit.
  var workDir = Environment.CurrentDirectory;
  if (docTestMode)
  {
      workDir = Directory.CreateTempSubdirectory("orchestration-").FullName;
      File.WriteAllText(Path.Combine(workDir, "sample.py"),
          "def fib(n):\n" +
          "    return n if n < 2 else fib(n - 1) + fib(n - 2)\n\n" +
          "print(fib(10))\n");
      var fixtureDir = workDir;
      AppDomain.CurrentDomain.ProcessExit += (_, _) =>
      {
          try { Directory.Delete(fixtureDir, recursive: true); }
          catch { /* Best-effort cleanup; the OS tmp sweeper handles leftovers. */ }
      };
  }

  // Run a shell command and return its output plus an error flag. No sandbox: example code only.
  async Task<(string Output, bool IsError)> RunBash(string command)
  {
      Console.Error.WriteLine($"[bash] {command}");
      using var process = Process.Start(new ProcessStartInfo("bash")
      {
          ArgumentList = { "-c", command },
          WorkingDirectory = workDir,
          RedirectStandardOutput = true,
          RedirectStandardError = true,
      });
      if (process is null)
      {
          return ("bash error: the shell process failed to start.", true);
      }
      var stdoutTask = process.StandardOutput.ReadToEndAsync();
      var stderrTask = process.StandardError.ReadToEndAsync();
      using var timeout = new CancellationTokenSource(TimeSpan.FromSeconds(bashTimeoutSeconds));
      try
      {
          await process.WaitForExitAsync(timeout.Token);
      }
      catch (OperationCanceledException)
      {
          process.Kill(entireProcessTree: true);
          // Let the reader tasks finish before the process is disposed.
          try
          {
              await Task.WhenAll(stdoutTask, stderrTask);
          }
          catch
          {
              // The output is discarded on timeout, so reader failures are ignored too.
          }
          return ($"command timed out after {bashTimeoutSeconds}s", true);
      }
      var output = (await stdoutTask + await stderrTask).Trim();
      if (output.Length == 0)
      {
          output = "(no output)";
      }
      if (output.Length > toolResultMaxChars)
      {
          output = output[..toolResultMaxChars] + $"\n(truncated at {toolResultMaxChars} chars)";
      }
      if (process.ExitCode != 0)
      {
          output = $"(exit code {process.ExitCode})\n{output}";
      }
      return (output, process.ExitCode != 0);
  }

  // Execute one bash tool call requested by the model.
  async Task<(string Output, bool IsError)> HandleBashBlock(ToolUseBlock block)
  {
      if (block.Input.TryGetValue("restart", out var restart) && restart.ValueKind == JsonValueKind.True)
      {
          return ("Shell restarted.", false);
      }
      var command = block.Input.TryGetValue("command", out var rawCommand) && rawCommand.ValueKind == JsonValueKind.String
          ? rawCommand.GetString()!
          : "";
      if (command.Length == 0)
      {
          return ("bash error: no command was provided.", true);
      }
      return await RunBash(command);
  }
  ```

  ```go Go
  // Run bash where the example was launched. In DOC_TEST_MODE the docs harness
  // points it at a throwaway fixture directory instead, removed on exit.
  var workDir = func() string {
  	if !docTestMode {
  		dir, err := os.Getwd()
  		if err != nil {
  			log.Fatal(err)
  		}
  		return dir
  	}
  	dir, err := os.MkdirTemp("", "orchestration-")
  	if err != nil {
  		log.Fatal(err)
  	}
  	fixture := "def fib(n):\n" +
  		"    return n if n < 2 else fib(n - 1) + fib(n - 2)\n\n" +
  		"print(fib(10))\n"
  	if err := os.WriteFile(filepath.Join(dir, "sample.py"), []byte(fixture), 0o644); err != nil {
  		log.Fatal(err)
  	}
  	return dir
  }()

  // runBash runs a shell command and returns its output plus an error flag.
  // No sandbox: example code only.
  func runBash(ctx context.Context, command string) (string, bool) {
  	fmt.Fprintf(os.Stderr, "[bash] %s\n", command)
  	ctx, cancel := context.WithTimeout(ctx, bashTimeoutSeconds*time.Second)
  	defer cancel()
  	cmd := exec.CommandContext(ctx, "bash", "-c", command)
  	cmd.Dir = workDir
  	combined, err := cmd.CombinedOutput()
  	if errors.Is(ctx.Err(), context.DeadlineExceeded) {
  		return fmt.Sprintf("command timed out after %ds", bashTimeoutSeconds), true
  	}
  	output := strings.TrimSpace(string(combined))
  	if output == "" {
  		output = "(no output)"
  	}
  	if runes := []rune(output); len(runes) > toolResultMaxChars {
  		output = string(runes[:toolResultMaxChars]) + fmt.Sprintf("\n(truncated at %d chars)", toolResultMaxChars)
  	}
  	if err == nil {
  		return output, false
  	}
  	var exitErr *exec.ExitError
  	if errors.As(err, &exitErr) {
  		return fmt.Sprintf("(exit code %d)\n%s", exitErr.ExitCode(), output), true
  	}
  	return fmt.Sprintf("(%s)\n%s", err, output), true
  }

  // handleBashBlock executes one bash tool call requested by the model.
  func handleBashBlock(ctx context.Context, block anthropic.ToolUseBlock) (string, bool) {
  	var input struct {
  		Command string `json:"command"`
  		Restart bool   `json:"restart"`
  	}
  	if err := json.Unmarshal(block.Input, &input); err != nil {
  		return fmt.Sprintf("bash error: could not parse input: %s", err), true
  	}
  	if input.Restart {
  		return "Shell restarted.", false
  	}
  	if input.Command == "" {
  		return "bash error: no command was provided.", true
  	}
  	return runBash(ctx, input.Command)
  }

  ```

  ```java Java
  record ToolOutput(String output, boolean isError) {}

  // Run bash where the example was launched. In DOC_TEST_MODE the docs harness
  // points it at a throwaway fixture directory instead, removed on exit.
  static final Path WORK_DIR = createWorkDir();

  static Path createWorkDir() {
      if (!DOC_TEST_MODE) {
          return Path.of(System.getProperty("user.dir"));
      }
      try {
          var dir = Files.createTempDirectory("orchestration-");
          Files.writeString(dir.resolve("sample.py"), """
                  def fib(n):
                      return n if n < 2 else fib(n - 1) + fib(n - 2)

                  print(fib(10))
                  """);
          Runtime.getRuntime().addShutdownHook(new Thread(() -> {
              try (var paths = Files.walk(dir)) {
                  paths.sorted(Comparator.reverseOrder()).forEach(p -> {
                      try { Files.deleteIfExists(p); } catch (IOException ignored) {}
                  });
              } catch (IOException ignored) {
                  // Best-effort cleanup; the OS tmp sweeper handles leftovers.
              }
          }));
          return dir;
      } catch (IOException error) {
          throw new UncheckedIOException(error);
      }
  }

  // Run a shell command and return its output plus an error flag. No sandbox: example code only.
  ToolOutput runBash(String command) throws InterruptedException {
      System.err.println("[bash] " + command);
      Process process;
      try {
          process = new ProcessBuilder("bash", "-c", command)
                  .directory(WORK_DIR.toFile())
                  .redirectErrorStream(true)
                  .start();
      } catch (IOException error) {
          return new ToolOutput("(" + error + ")", true);
      }
      // Drain stdout on another thread so a filled pipe cannot stall the timeout wait below.
      CompletableFuture<String> outputReader = CompletableFuture.supplyAsync(() -> {
          try (var stdout = process.getInputStream()) {
              return new String(stdout.readAllBytes(), StandardCharsets.UTF_8);
          } catch (IOException error) {
              return "";
          }
      });
      if (!process.waitFor(BASH_TIMEOUT_SECONDS, TimeUnit.SECONDS)) {
          process.destroyForcibly();
          outputReader.cancel(true);
          return new ToolOutput("command timed out after " + BASH_TIMEOUT_SECONDS + "s", true);
      }
      String output = outputReader.join().trim();
      if (output.isEmpty()) {
          output = "(no output)";
      }
      if (output.length() > TOOL_RESULT_MAX_CHARS) {
          output = output.substring(0, TOOL_RESULT_MAX_CHARS)
                  + "\n(truncated at " + TOOL_RESULT_MAX_CHARS + " chars)";
      }
      int exitCode = process.exitValue();
      if (exitCode != 0) {
          return new ToolOutput("(exit code " + exitCode + ")\n" + output, true);
      }
      return new ToolOutput(output, false);
  }

  // Execute one bash tool call requested by the model.
  ToolOutput handleBashBlock(ToolUseBlock block) throws InterruptedException {
      Map<String, JsonValue> input = (Map<String, JsonValue>) block._input().asObject().orElse(Map.of());
      JsonValue restart = input.getOrDefault("restart", JsonValue.from(false));
      if (Boolean.TRUE.equals(restart.asBoolean().orElse(false))) {
          return new ToolOutput("Shell restarted.", false);
      }
      JsonValue raw = input.get("command");
      String command = raw != null && raw.asString().isPresent() ? raw.asStringOrThrow() : "";
      if (command.isEmpty()) {
          return new ToolOutput("bash error: no command was provided.", true);
      }
      return runBash(command);
  }
  ```

  ```php PHP
  // Run bash where the example was launched. In DOC_TEST_MODE the docs harness
  // points it at a throwaway fixture directory instead, removed on exit.
  if (DOC_TEST_MODE) {
      $workDir = sys_get_temp_dir() . '/orchestration-' . bin2hex(random_bytes(8));
      if (!mkdir($workDir, 0700)) {
          throw new RuntimeException("could not create working directory {$workDir}");
      }
      file_put_contents(
          $workDir . '/sample.py',
          "def fib(n):\n"
          . "    return n if n < 2 else fib(n - 1) + fib(n - 2)\n\n"
          . "print(fib(10))\n",
      );
      register_shutdown_function(function () use ($workDir): void {
          foreach (glob($workDir . '/*') ?: [] as $entry) {
              @unlink($entry);
          }
          @rmdir($workDir);
      });
  } else {
      $workDir = getcwd() ?: '.';
  }
  define('WORK_DIR', $workDir);

  /**
   * Run a shell command and return [output, isError]. The coreutils timeout command
   * enforces the time limit. No sandbox: example code only.
   */
  function runBash(string $command): array
  {
      fwrite(STDERR, "[bash] {$command}\n");
      // Requires GNU coreutils 'timeout'. On macOS: brew install coreutils, or replace with gtimeout.
      exec(
          'cd ' . escapeshellarg(WORK_DIR) . ' && timeout ' . BASH_TIMEOUT_SECONDS
              . ' bash -c ' . escapeshellarg($command) . ' 2>&1',
          $outputLines,
          $exitCode,
      );
      if ($exitCode === 124) {
          return ['command timed out after ' . BASH_TIMEOUT_SECONDS . 's', true];
      }
      $output = trim(implode("\n", $outputLines));
      if ($output === '') {
          $output = '(no output)';
      }
      if (mb_strlen($output) > TOOL_RESULT_MAX_CHARS) {
          $output = mb_substr($output, 0, TOOL_RESULT_MAX_CHARS)
              . "\n(truncated at " . TOOL_RESULT_MAX_CHARS . ' chars)';
      }
      if ($exitCode !== 0) {
          $output = "(exit code {$exitCode})\n{$output}";
      }
      return [$output, $exitCode !== 0];
  }

  /** Execute one bash tool call requested by the model. */
  function handleBashBlock(ToolUseBlock $block): array
  {
      if (($block->input['restart'] ?? null) === true) {
          return ['Shell restarted.', false];
      }
      $command = $block->input['command'] ?? '';
      if (!is_string($command) || $command === '') {
          return ['bash error: no command was provided.', true];
      }
      return runBash($command);
  }
  ```

  ```ruby Ruby
  # Run bash where the example was launched. In DOC_TEST_MODE the docs harness
  # points it at a throwaway fixture directory instead, removed on exit.
  WORK_DIR =
    if DOC_TEST_MODE
      Dir.mktmpdir("orchestration-").tap do |dir|
        File.write(File.join(dir, "sample.py"), <<~PYTHON)
          def fib(n):
              return n if n < 2 else fib(n - 1) + fib(n - 2)

          print(fib(10))
        PYTHON
        at_exit { FileUtils.remove_entry(dir, true) }
      end
    else
      Dir.pwd
    end

  # Tool input arrives as a Hash or as a raw JSON string from the streaming
  # accumulator; normalize either shape to a string-keyed Hash.
  def parse_tool_input(raw)
    return raw.transform_keys(&:to_s) if raw.is_a?(Hash)
    parsed = JSON.parse(raw.to_s) rescue nil
    parsed.is_a?(Hash) ? parsed : {}
  end

  # Run a shell command and return [output, is_error]. No sandbox: example code only.
  def run_bash(command)
    warn "[bash] #{command}"
    begin
      stdin, stdout_and_stderr, wait_thr = Open3.popen2e("bash", "-c", command, pgroup: true, chdir: WORK_DIR)
      stdin.close
      reader = Thread.new { stdout_and_stderr.read.scrub }
      # Enforce the time limit with a monotonic-clock deadline so a timed-out command is
      # terminated rather than left running in the background.
      deadline = Process.clock_gettime(Process::CLOCK_MONOTONIC) + BASH_TIMEOUT_SECONDS
      until wait_thr.join(0.1)
        next if Process.clock_gettime(Process::CLOCK_MONOTONIC) < deadline

        begin
          Process.kill("-TERM", wait_thr.pid)
        rescue Errno::ESRCH
        end
        unless wait_thr.join(2)
          begin
            Process.kill("-KILL", wait_thr.pid)
          rescue Errno::ESRCH
          end
        end
        wait_thr.join(5)
        reader.join(1) || reader.kill
        stdout_and_stderr.close rescue nil
        return ["command timed out after #{BASH_TIMEOUT_SECONDS}s", true]
      end
      status = wait_thr.value
      output = reader.value.strip
      stdout_and_stderr.close
      output = "(no output)" if output.empty?
      if output.length > TOOL_RESULT_MAX_CHARS
        output = "#{output[0, TOOL_RESULT_MAX_CHARS]}\n(truncated at #{TOOL_RESULT_MAX_CHARS} chars)"
      end
      output = "(exit code #{status.exitstatus})\n#{output}" unless status.success?
      [output, !status.success?]
    rescue Errno::ENOENT => e
      return ["bash error: #{e.message}", true]
    end
  end

  # Execute one bash tool call requested by the model.
  def handle_bash_block(block)
    input = parse_tool_input(block.input)
    return ["Shell restarted.", false] if input["restart"] == true

    command = input["command"]
    return ["bash error: no command was provided.", true] unless command.is_a?(String) && !command.empty?

    run_bash(command)
  end

  # Convert response content to request-shaped params. The streaming accumulator
  # returns tool_use input as a raw JSON string and includes response-only fields,
  # so reshape each block to the request schema before echoing it back.
  def assistant_content_param(content)
    content.map do |block|
      case block.type
      when :tool_use
        input = parse_tool_input(block.input)
        {type: "tool_use", id: block.id, name: block.name, input: input}
      when :text
        {type: "text", text: block.text}
      when :thinking
        {type: "thinking", thinking: block.thinking, signature: block.signature}
      when :redacted_thinking then {type: "redacted_thinking", data: block.data}
      else
        block.to_h
      end
    end
  end
  ```

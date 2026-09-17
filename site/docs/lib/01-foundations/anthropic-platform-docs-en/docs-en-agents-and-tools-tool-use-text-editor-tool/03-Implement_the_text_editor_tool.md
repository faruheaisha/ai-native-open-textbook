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
sourceRel: "docs/en/agents-and-tools/tool-use/text-editor-tool.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/agents-and-tools/tool-use/text-editor-tool.md"
sourceSha256: "177d2635fdb6362ac4880d096f3046f73bf79cc947c8abb6d8e5036e64835759"
pageSha256: "d9c9389a03381a07cff5fde6609bc766b90c20fc3eda3f55f8f9cde70da6a224"
contentMode: "local-full"
zh: ""
---

## Implement the text editor tool

The text editor tool is implemented as a schema-less tool. When using this tool, you don't need to provide an input schema as with other tools; the schema is built into Claude's model and can't be modified.

The tool type is `type: "text_editor_20250728"` for Claude 4 and later models.

    Create helper functions to handle file operations like reading, writing, and modifying files. Consider implementing backup functionality to recover from mistakes.

    Create a function that processes tool calls from Claude based on the command type:

      ```python Python
      def handle_editor_tool(tool_call):
          input_params = tool_call.input
          command = input_params.get("command", "")
          file_path = input_params.get("path", "")

          if command == "view":
              # Read and return file contents
              pass
          elif command == "str_replace":
              # Replace text in file
              pass
          elif command == "create":
              # Create new file
              pass
          elif command == "insert":
              # Insert text at location
              pass
      ```

      ```typescript TypeScript
      function handleEditorTool(toolCall: \{ input: \{ command?: string; path?: string \} \}): void \{
        const inputParams = toolCall.input;
        const command = inputParams.command ?? "";
        const filePath = inputParams.path ?? "";

        if (command === "view") \{
          // Read and return file contents
        \} else if (command === "str_replace") \{
          // Replace text in file
        \} else if (command === "create") \{
          // Create new file
        \} else if (command === "insert") \{
          // Insert text at location
        \}
      \}
      ```

      ```csharp C#
      static string HandleEditorTool(IReadOnlyDictionary&lt;string, JsonElement> input)
      \{
          input.TryGetValue("command", out var commandEl);
          input.TryGetValue("path", out var pathEl);
          var command = commandEl.ValueKind == JsonValueKind.String ? commandEl.GetString() : null;
          var filePath = pathEl.ValueKind == JsonValueKind.String ? pathEl.GetString() : null;

          if (command == "view")
          \{
              // Read and return file contents
          \}
          else if (command == "str_replace")
          \{
              // Replace text in file
          \}
          else if (command == "create")
          \{
              // Create new file
          \}
          else if (command == "insert")
          \{
              // Insert text at location
          \}
          return "";
      \}
      ```

      ```go Go
      func handleEditorTool(input map[string]any) string \{
      	command, _ := input["command"].(string)
      	filePath, _ := input["path"].(string)
      // ...

      	switch command \{
      	case "view":
      		// Read and return file contents
      	case "str_replace":
      		// Replace text in file
      	case "create":
      		// Create new file
      	case "insert":
      		// Insert text at location
      	\}
      	return ""
      \}
      ```

      ```java Java
      static void handleEditorTool(Map&lt;String, Object> input) \{
        var command = (String) input.getOrDefault("command", "");
        var filePath = (String) input.getOrDefault("path", "");

        if (command.equals("view")) \{
          // Read and return file contents
        \} else if (command.equals("str_replace")) \{
          // Replace text in file
        \} else if (command.equals("create")) \{
          // Create new file
        \} else if (command.equals("insert")) \{
          // Insert text at location
        \}
      \}
      ```

      ```php PHP
      function handle_editor_tool(array $input): string
      {
          $command = $input['command'] ?? '';
          $filePath = $input['path'] ?? '';

          if ($command === 'view') \{
              // Read and return file contents
          \} elseif ($command === 'str_replace') {
              // Replace text in file
          } elseif ($command === 'create') \{
              // Create new file
          \} elseif ($command === 'insert') {
              // Insert text at location
          }
          return '';
      }
      ```

      ```ruby Ruby
      def handle_editor_tool(input)
        command = input[:command] || ""
        file_path = input[:path] || ""

        case command
        when "view"
          # Read and return file contents
        when "str_replace"
          # Replace text in file
        when "create"
          # Create new file
        when "insert"
          # Insert text at location
        end
      end
      ```

    Add validation and security checks:

    * Validate file paths to prevent directory traversal
    * Create backups before making changes
    * Handle errors gracefully
    * Implement permissions checks

    Extract and handle tool calls from Claude's responses:

      ```python Python
      # Process tool use in Claude's response
      for content in response.content:
          if content.type == "tool_use":
              # Execute the tool based on command
              result = handle_editor_tool(content)

              # Return result to Claude
              tool_result = {
                  "type": "tool_result",
                  "tool_use_id": content.id,
                  "content": result,
              }
      ```

      ```typescript TypeScript
      // Process tool use in Claude's response
      for (const block of response.content) {
        if (block.type === "tool_use") {
          // Execute the tool based on command
          const result = handleEditorTool(block);

          // Return result to Claude
          const toolResult = {
            type: "tool_result",
            tool_use_id: block.id,
            content: result
          };
        }
      }
      ```

      ```csharp C#
      // Process tool use in Claude's response
      foreach (var block in response.Content)
      {
          if (block.TryPickToolUse(out var toolUse))
          {
              var result = HandleEditorTool(toolUse.Input);
              var toolResult = new ToolResultBlockParam
              {
                  ToolUseID = toolUse.ID,
                  Content = result,
              };
          }
      }
      ```

      ```go Go
      // Process tool use in Claude's response
      for _, block := range response.Content {
      	if block.Type == "tool_use" {
      		var input map[string]any
      		if err := json.Unmarshal(block.Input, &input); err != nil {
      			log.Fatal(err)
      		}
      		result := handleEditorTool(input)

      		toolResult := anthropic.NewToolResultBlock(block.ID, result, false)
      // ...
      	}
      }
      ```

      ```java Java
      // Process tool use in Claude's response
      for (var block : response.content()) {
        if (block.type().equals("tool_use")) {
          // Execute the tool based on command
          var result = handleEditorTool(block);

          // Return result to Claude
          var toolResult = Map.of(
            "type", "tool_result",
            "tool_use_id", block.id(),
            "content", result
          );
        }
      }
      ```

      ```php PHP
      // Process tool use in Claude's response
      foreach ($response->content as $block) {
          if ($block->type === 'tool_use') \{
              // Execute the tool based on command
              $result = handle_editor_tool($block->input);

              // Return result to Claude
              $toolResult = [
                  'type' => 'tool_result',
                  'tool_use_id' => $block->id,
                  'content' => $result,
              ];
          \}
      \}
      ```

      ```ruby Ruby
      # Process tool use in Claude's response
      tool_results = response.content.filter_map do |block|
        next unless block.type == :tool_use

        \{type: "tool_result", tool_use_id: block.id, content: handle_editor_tool(block.input)\}
      end
      ```
```
```

  When implementing the text editor tool, keep in mind:

  1. **Security:** The tool has access to your local filesystem, so implement proper security measures.
  2. **Backup:** Always create backups before allowing edits to important files.
  3. **Validation:** Validate all inputs to prevent unintended changes.
  4. **Unique matching:** Make sure replacements match exactly one location to avoid unintended edits.

### Handle errors

When using the text editor tool, various errors may occur. Here is guidance on how to handle them:

    If Claude tries to view or modify a file that doesn't exist, return an appropriate error message in the `tool_result`:

    ```json
    \{
      "role": "user",
      "content": [
        \{
          "type": "tool_result",
          "tool_use_id": "toolu_01A09q90qw90lq917835lq9",
          "content": "Error: File not found",
          "is_error": true
        \}
      ]
    \}
    ```

    If Claude's `str_replace` command matches multiple locations in the file, return an appropriate error message:

    ```json
    \{
      "role": "user",
      "content": [
        \{
          "type": "tool_result",
          "tool_use_id": "toolu_01A09q90qw90lq917835lq9",
          "content": "Error: Found 3 matches for replacement text. Please provide more context to make a unique match.",
          "is_error": true
        \}
      ]
    \}
    ```

    If Claude's `str_replace` command doesn't match any text in the file, return an appropriate error message:

    ```json
    \{
      "role": "user",
      "content": [
        \{
          "type": "tool_result",
          "tool_use_id": "toolu_01A09q90qw90lq917835lq9",
          "content": "Error: No match found for replacement. Please check your text and try again.",
          "is_error": true
        \}
      ]
    \}
    ```

    If there are permission issues with creating, reading, or modifying files, return an appropriate error message:

    ```json
    \{
      "role": "user",
      "content": [
        \{
          "type": "tool_result",
          "tool_use_id": "toolu_01A09q90qw90lq917835lq9",
          "content": "Error: Permission denied. Cannot write to file.",
          "is_error": true
        \}
      ]
    \}
    ```

### Follow implementation best practices

    When asking Claude to fix or modify code, be specific about what files need to be examined or what issues need to be addressed. Clear context helps Claude identify the right files and make appropriate changes.

    **Less helpful prompt:** "Can you fix my code?"

    **Better prompt:** "There's a syntax error in my primes.py file that prevents it from running. Can you fix it?"

    Specify file paths clearly when needed, especially if you're working with multiple files or files in different directories.

    **Less helpful prompt:** "Review my helper file"

    **Better prompt:** "Can you check my utils/helpers.py file for any performance issues?"

    Implement a backup system in your application that creates copies of files before allowing Claude to edit them, especially for important or production code.

      ```python Python
      def backup_file(file_path):
          """Create a backup of a file before editing."""
          backup_path = f"\{file_path\}.backup"
          if os.path.exists(file_path):
              with open(file_path, "r") as src, open(backup_path, "w") as dst:
                  dst.write(src.read())
      ```

      ```typescript TypeScript
      async function backupFile(filePath: string): Promise&lt;void> \{
        const backupPath = `${filePath}.backup`;
        try {
          await access(filePath);
          await copyFile(filePath, backupPath);
        } catch {
          // File does not exist; nothing to back up
        }
      }
      ```

      ```csharp C#
      static void BackupFile(string filePath)
      {
          var backupPath = $"\{filePath\}.backup";
          if (File.Exists(filePath))
          \{
              File.Copy(filePath, backupPath, overwrite: true);
          \}
      \}
      ```

      ```go Go
      func backupFile(filePath string) error \{
      	backupPath := filePath + ".backup"
      	data, err := os.ReadFile(filePath)
      	if err != nil \{
      		if os.IsNotExist(err) \{
      			return nil
      		\}
      		return err
      	\}
      	return os.WriteFile(backupPath, data, 0o644)
      \}
      ```

      ```java Java
      static void backupFile(String filePath) throws IOException \{
        Path source = Path.of(filePath);
        Path backupPath = Path.of(filePath + ".backup");
        if (Files.exists(source)) \{
          Files.copy(source, backupPath, StandardCopyOption.REPLACE_EXISTING);
        \}
      \}
      ```

      ```php PHP
      function backup_file(string $filePath): void
      {
          $backupPath = $filePath . '.backup';
          if (file_exists($filePath)) \{
              copy($filePath, $backupPath);
          \}
      \}
      ```

      ```ruby Ruby
      def backup_file(file_path)
        backup_path = "#\{file_path\}.backup"
        FileUtils.cp(file_path, backup_path) if File.exist?(file_path)
      end
      ```

    The `str_replace` command requires an exact match for the text to be replaced. Your application should ensure that there is exactly one match for the old text or provide appropriate error messages.

      ```python Python
      def safe_replace(file_path, old_text, new_text):
          """Replace text only if there's exactly one match."""
          with open(file_path, "r") as f:
              content = f.read()

          count = content.count(old_text)
          if count == 0:
              return "Error: No match found"
          elif count > 1:
              return f"Error: Found \{count\} matches"
          else:
              new_content = content.replace(old_text, new_text)
              with open(file_path, "w") as f:
                  f.write(new_content)
              return "Successfully replaced text"
      ```

      ```typescript TypeScript
      async function safeReplace(
        filePath: string,
        oldText: string,
        newText: string
      ): Promise&lt;string> \{
        const content = await readFile(filePath, "utf8");

        const count = content.split(oldText).length - 1;
        if (count === 0) \{
          return "Error: No match found";
        \} else if (count > 1) \{
          return `Error: Found ${count} matches`;
        } else {
          const newContent = content.replace(oldText, newText);
          await writeFile(filePath, newContent, "utf8");
          return "Successfully replaced text";
        }
      }
      ```

      ```csharp C#
      static string SafeReplace(string filePath, string oldText, string newText)
      {
          var content = File.ReadAllText(filePath);

          var count = content.Split(oldText).Length - 1;
          if (count == 0)
          {
              return "Error: No match found";
          }
          else if (count > 1)
          {
              return $"Error: Found \{count\} matches";
          \}
          else
          \{
              var newContent = content.Replace(oldText, newText);
              File.WriteAllText(filePath, newContent);
              return "Successfully replaced text";
          \}
      \}
      ```

      ```go Go
      func safeReplace(filePath, oldText, newText string) string \{
      	data, err := os.ReadFile(filePath)
      	if err != nil \{
      		return fmt.Sprintf("Error: %v", err)
      	\}
      	content := string(data)

      	count := strings.Count(content, oldText)
      	if count == 0 \{
      		return "Error: No match found"
      	\} else if count > 1 \{
      		return fmt.Sprintf("Error: Found %d matches", count)
      	\}

      	newContent := strings.Replace(content, oldText, newText, 1)
      	if err := os.WriteFile(filePath, []byte(newContent), 0o644); err != nil \{
      		return fmt.Sprintf("Error: %v", err)
      	\}
      	return "Successfully replaced text"
      \}
      ```

      ```java Java
      static String safeReplace(String filePath, String oldText, String newText) throws IOException \{
        String content = Files.readString(Path.of(filePath));

        int count = content.split(Pattern.quote(oldText), -1).length - 1;
        if (count == 0) \{
          return "Error: No match found";
        \} else if (count > 1) \{
          return "Error: Found " + count + " matches";
        \} else \{
          String newContent = content.replace(oldText, newText);
          Files.writeString(Path.of(filePath), newContent);
          return "Successfully replaced text";
        \}
      \}
      ```

      ```php PHP
      function safe_replace(string $filePath, string $oldText, string $newText): string
      {
          $content = file_get_contents($filePath);

          $count = substr_count($content, $oldText);
          if ($count === 0) {
              return 'Error: No match found';
          } elseif ($count > 1) \{
              return "Error: Found \{$count} matches";
          } else {
              $newContent = str_replace($oldText, $newText, $content);
              file_put_contents($filePath, $newContent);
              return 'Successfully replaced text';
          }
      }
      ```

      ```ruby Ruby
      def safe_replace(file_path, old_text, new_text)
        content = File.read(file_path)

        count = content.scan(old_text).length
        if count == 0
          "Error: No match found"
        elsif count > 1
          "Error: Found #{count} matches"
        else
          new_content = content.sub(old_text) { new_text }
          File.write(file_path, new_content)
          "Successfully replaced text"
        end
      end
      ```

    After Claude makes changes to a file, verify the changes by running tests or checking that the code still works as expected.

      ```python Python
      def verify_changes(file_path):
          """Run tests or checks after making changes."""
          try:
              # For Python files, check for syntax errors
              if file_path.endswith(".py"):
                  import ast

                  with open(file_path, "r") as f:
                      ast.parse(f.read())
                  return "Syntax check passed"
          except Exception as e:
              return f"Verification failed: {str(e)}"
      ```

      ```typescript TypeScript
      function verifyChanges(filePath: string): string {
        try {
          // For Python files, check for syntax errors
          if (filePath.endsWith(".py")) {
            execFileSync("python3", ["-m", "py_compile", filePath]);
            return "Syntax check passed";
          }
          return "No checks defined for this file type";
        } catch (err) {
          return `Verification failed: ${err\}`;
        \}
      \}
      ```

      ```csharp C#
      static string VerifyChanges(string filePath)
      \{
          try
          \{
              // For Python files, check for syntax errors
              if (filePath.EndsWith(".py"))
              \{
                  var psi = new ProcessStartInfo("python3")
                  \{
                      RedirectStandardError = true,
                  \};
                  psi.ArgumentList.Add("-m");
                  psi.ArgumentList.Add("py_compile");
                  psi.ArgumentList.Add(filePath);
                  using var proc = Process.Start(psi)!;
                  proc.WaitForExit();
                  if (proc.ExitCode != 0)
                  \{
                      return $"Verification failed: {proc.StandardError.ReadToEnd()}";
                  }
                  return "Syntax check passed";
              }
              return "No checks defined for this file type";
          }
          catch (Exception e)
          {
              return $"Verification failed: \{e.Message\}";
          \}
      \}
      ```

      ```go Go
      func verifyChanges(filePath string) string \{
      	// For Python files, check for syntax errors
      	if strings.HasSuffix(filePath, ".py") \{
      		cmd := exec.Command("python3", "-m", "py_compile", filePath)
      		if out, err := cmd.CombinedOutput(); err != nil \{
      			return fmt.Sprintf("Verification failed: %v: %s", err, out)
      		\}
      		return "Syntax check passed"
      	\}
      	return "No checks defined for this file type"
      \}
      ```

      ```java Java
      static String verifyChanges(String filePath) \{
        try \{
          // For Python files, check for syntax errors
          if (filePath.endsWith(".py")) \{
            Process proc = new ProcessBuilder("python3", "-m", "py_compile", filePath)
              .redirectErrorStream(true)
              .start();
            if (proc.waitFor() != 0) \{
              return "Verification failed: " + new String(proc.getInputStream().readAllBytes());
            \}
            return "Syntax check passed";
          \}
          return "No checks defined for this file type";
        \} catch (IOException | InterruptedException e) \{
          return "Verification failed: " + e.getMessage();
        \}
      \}
      ```

      ```php PHP
      function verify_changes(string $filePath): string
      {
          // For Python files, check for syntax errors
          if (str_ends_with($filePath, '.py')) \{
              exec('python3 -m py_compile ' . escapeshellarg($filePath) . ' 2>&1', $output, $exitCode);
              if ($exitCode !== 0) \{
                  return 'Verification failed: ' . implode("\n", $output);
              \}
              return 'Syntax check passed';
          \}
          return 'No checks defined for this file type';
      \}
      ```

      ```ruby Ruby
      def verify_changes(file_path)
        # For Python files, check for syntax errors
        if file_path.end_with?(".py")
          if system("python3", "-m", "py_compile", file_path)
            "Syntax check passed"
          else
            "Verification failed: syntax error in #\{file_path\}"
          end
        else
          "No checks defined for this file type"
        end
      end
      ```

***

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
pageSha256: "711cd8caf7014ca01c574346bf33708b5c3fc515f6fb4bd887314540a21c30f6"
contentMode: "local-full"
zh: ""
---

## Journal results so reruns resume

A fan-out that spawns dozens of subagents is expensive to restart from scratch. A small content-addressed journal makes it idempotent: before dispatching a subagent, look up the SHA-256 of its prompt in a local JSON file, and return the recorded result if one exists. Interrupt the run, rerun it, and only the subtasks that never finished are recomputed. The journal deduplicates across runs, not within a single fan-out wave; delete the journal file to start fresh.

  ```python Python
  _journal_lock = threading.Lock()

  def _load_journal() -> dict:
      try:
          with open(JOURNAL_PATH) as file:
              return json.load(file) or {}
      except (OSError, json.JSONDecodeError):
          return {}

  def journaled(prompt: str, compute) -> str:
      """Return a cached result for this exact prompt, or compute and persist it. This
      makes the fan-out resumable: interrupt the run, rerun it, and only the subtasks
      that never finished are recomputed. Delete the journal file to start fresh."""
      key = hashlib.sha256(prompt.encode()).hexdigest()
      cached = _load_journal().get(key)
      if cached is not None:
          print(f"[journal] cache hit for {key[:12]}", file=sys.stderr)
          return cached
      result = compute()
      try:
          with _journal_lock:  # fan-out writes from many threads
              journal = _load_journal()
              journal[key] = result
              temp = f"{JOURNAL_PATH}.tmp"
              with open(temp, "w") as file:
                  json.dump(journal, file)
              os.replace(temp, JOURNAL_PATH)  # atomic on POSIX and Windows
      except OSError as error:  # the journal is best-effort; never discard a computed result
          print(f"[journal] write failed: {error}", file=sys.stderr)
      return result
  ```

  ```typescript TypeScript
  let journalWriteChain = Promise.resolve();

  async function loadJournal(): Promise<Record<string, string>> {
    try {
      return JSON.parse(await readFile(JOURNAL_PATH, "utf8")) ?? {};
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
        console.error(`[journal] discarding unreadable journal: ${error}`);
      }
      return {};
    }
  }

  // Return a cached result for this exact prompt, or compute and persist it. This
  // makes the fan-out resumable: interrupt the run, rerun it, and only the subtasks
  // that never finished are recomputed. Delete the journal file to start fresh.
  async function journaled(prompt: string, compute: () => Promise<string>): Promise<string> {
    const key = createHash("sha256").update(prompt).digest("hex");
    const cached = (await loadJournal())[key];
    if (cached !== undefined) {
      console.error(`[journal] cache hit for ${key.slice(0, 12)}`);
      return cached;
    }
    const result = await compute();
    // Chain writes so concurrent subagents do not clobber each other's entries.
    // The chain is kept settled so one failed write does not poison later ones.
    await (journalWriteChain = journalWriteChain
      .then(async () => {
        const journal = await loadJournal();
        journal[key] = result;
        const temp = `${JOURNAL_PATH}.tmp`;
        await writeFile(temp, JSON.stringify(journal));
        await rename(temp, JOURNAL_PATH);
      })
      .catch((error) => console.error(`[journal] write failed: ${error}`)));
    return result;
  }
  ```

  ```csharp C#
  SemaphoreSlim journalLock = new(1, 1);

  async Task<Dictionary<string, string>> LoadJournal()
  {
      try
      {
          return JsonSerializer.Deserialize<Dictionary<string, string>>(await File.ReadAllTextAsync(journalPath)) ?? [];
      }
      catch (Exception error) when (error is IOException or UnauthorizedAccessException or JsonException)
      {
          return [];
      }
  }

  // Return a cached result for this exact prompt, or compute and persist it. This
  // makes the fan-out resumable: interrupt the run, rerun it, and only the subtasks
  // that never finished are recomputed. Delete the journal file to start fresh.
  async Task<string> Journaled(string prompt, Func<Task<string>> compute)
  {
      var key = Convert.ToHexString(SHA256.HashData(Encoding.UTF8.GetBytes(prompt))).ToLowerInvariant();
      if ((await LoadJournal()).TryGetValue(key, out var cached))
      {
          Console.Error.WriteLine($"[journal] cache hit for {key[..12]}");
          return cached;
      }
      var result = await compute();
      await journalLock.WaitAsync(); // fan-out writes from many tasks
      try
      {
          var journal = await LoadJournal();
          journal[key] = result;
          var temp = journalPath + ".tmp";
          await File.WriteAllTextAsync(temp, JsonSerializer.Serialize(journal));
          File.Move(temp, journalPath, overwrite: true);
      }
      catch (Exception error) when (error is IOException or UnauthorizedAccessException or NotSupportedException)
      {
          // The journal is best-effort; never discard a computed result.
          Console.Error.WriteLine($"[journal] write failed: {error.Message}");
      }
      finally
      {
          journalLock.Release();
      }
      return result;
  }
  ```

  ```go Go
  var journalMutex sync.Mutex

  func loadJournal() map[string]string {
  	data, err := os.ReadFile(journalPath)
  	if err != nil {
  		return map[string]string{}
  	}
  	var journal map[string]string
  	if err := json.Unmarshal(data, &journal); err != nil || journal == nil {
  		return map[string]string{}
  	}
  	return journal
  }

  // journaled returns a cached result for this exact prompt, or computes and persists
  // it. This makes the fan-out resumable: interrupt the run, rerun it, and only the
  // subtasks that never finished are recomputed. Delete the journal file to start fresh.
  func journaled(prompt string, compute func() (string, error)) (string, error) {
  	sum := sha256.Sum256([]byte(prompt))
  	key := hex.EncodeToString(sum[:])
  	if cached, ok := loadJournal()[key]; ok {
  		fmt.Fprintf(os.Stderr, "[journal] cache hit for %s\n", key[:12])
  		return cached, nil
  	}
  	result, err := compute()
  	if err != nil {
  		return "", err
  	}
  	journalMutex.Lock() // fan-out writes from many goroutines
  	defer journalMutex.Unlock()
  	journal := loadJournal()
  	journal[key] = result
  	data, _ := json.Marshal(journal)
  	temp := journalPath + ".tmp"
  	if err := os.WriteFile(temp, data, 0o644); err != nil {
  		fmt.Fprintf(os.Stderr, "[journal] write failed: %s\n", err)
  	} else if err := os.Rename(temp, journalPath); err != nil {
  		fmt.Fprintf(os.Stderr, "[journal] write failed: %s\n", err)
  		_ = os.Remove(temp)
  	}
  	return result, nil
  }

  ```

  ```java Java
  static final ObjectMapper JOURNAL_MAPPER = new ObjectMapper();
  static final ReentrantLock JOURNAL_LOCK = new ReentrantLock();

  Map<String, String> loadJournal() {
      try {
          return Objects.requireNonNullElseGet(
                  JOURNAL_MAPPER.readValue(Files.readString(JOURNAL_PATH), new TypeReference<HashMap<String, String>>() {}),
                  HashMap::new);
      } catch (IOException error) {
          return new HashMap<>();
      }
  }

  // Return a cached result for this exact prompt, or compute and persist it. This
  // makes the fan-out resumable: interrupt the run, rerun it, and only the subtasks
  // that never finished are recomputed. Delete the journal file to start fresh.
  String journaled(String prompt, Callable<String> compute) throws Exception {
      var digest = MessageDigest.getInstance("SHA-256").digest(prompt.getBytes(StandardCharsets.UTF_8));
      String key = HexFormat.of().formatHex(digest);
      String cached = loadJournal().get(key);
      if (cached != null) {
          System.err.println("[journal] cache hit for " + key.substring(0, 12));
          return cached;
      }
      String result = compute.call();
      JOURNAL_LOCK.lock(); // fan-out writes from many threads
      try {
          Map<String, String> journal = loadJournal();
          journal.put(key, result);
          Path temp = JOURNAL_PATH.resolveSibling(JOURNAL_PATH.getFileName() + ".tmp");
          Files.writeString(temp, JOURNAL_MAPPER.writeValueAsString(journal));
          Files.move(temp, JOURNAL_PATH, StandardCopyOption.REPLACE_EXISTING, StandardCopyOption.ATOMIC_MOVE);
      } catch (IOException error) {
          // The journal is best-effort; never discard a computed result.
          System.err.println("[journal] write failed: " + error);
      } finally {
          JOURNAL_LOCK.unlock();
      }
      return result;
  }
  ```

  ```php PHP
  function loadJournal(): array
  {
      $raw = @file_get_contents(JOURNAL_PATH);
      if ($raw === false) {
          return [];
      }
      $decoded = json_decode($raw, true);
      return is_array($decoded) ? $decoded : [];
  }

  /**
   * Return a cached result for this exact prompt, or compute and persist it. This
   * makes the fan-out resumable: interrupt the run, rerun it, and only the subtasks
   * that never finished are recomputed. Delete the journal file to start fresh.
   */
  function journaled(string $prompt, callable $compute): string
  {
      $key = hash('sha256', $prompt);
      $journal = loadJournal();
      if (array_key_exists($key, $journal)) {
          fwrite(STDERR, '[journal] cache hit for ' . substr($key, 0, 12) . "\n");
          return $journal[$key];
      }
      $result = $compute();
      $journal = loadJournal();
      $journal[$key] = $result;
      $temp = JOURNAL_PATH . '.tmp';
      $encoded = json_encode($journal, JSON_INVALID_UTF8_SUBSTITUTE);
      if ($encoded === false || @file_put_contents($temp, $encoded) === false || !@rename($temp, JOURNAL_PATH)) {
          fwrite(STDERR, '[journal] write failed: ' . (error_get_last()['message'] ?? json_last_error_msg()) . "\n");
          @unlink($temp);
      }
      return $result;
  }
  ```

  ```ruby Ruby
  JOURNAL_LOCK = Mutex.new

  def load_journal
    JSON.parse(File.read(JOURNAL_PATH)) || {}
  rescue SystemCallError, JSON::ParserError
    {}
  end

  # Return a cached result for this exact prompt, or compute and persist it. This
  # makes the fan-out resumable: interrupt the run, rerun it, and only the subtasks
  # that never finished are recomputed. Delete the journal file to start fresh.
  def journaled(prompt)
    key = Digest::SHA256.hexdigest(prompt)
    cached = load_journal[key]
    unless cached.nil?
      warn "[journal] cache hit for #{key[0, 12]}"
      return cached
    end
    result = yield
    begin
      JOURNAL_LOCK.synchronize do # fan-out writes from many threads
        journal = load_journal
        journal[key] = result
        temp = "#{JOURNAL_PATH}.tmp"
        File.write(temp, JSON.generate(journal))
        File.rename(temp, JOURNAL_PATH)
      end
    rescue SystemCallError => error # the journal is best-effort; never discard a computed result
      warn "[journal] write failed: #{error}"
    end
    result
  end
  ```

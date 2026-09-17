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
pageSha256: "f3393aaa62f2a7047055dc4b96e4dd352f05137291cb20145712cc89a2d57aac"
contentMode: "local-full"
zh: ""
---

## Set up the loop

The example is a single file. The constants control the effort level, the fan-out shape, and how often the mode refresher is re-sent. `MAX_CONCURRENT` caps how many subagents run at the same time (the PHP port is sequential and ignores it); `MAX_TOTAL_SUBTASKS` caps how many the model may queue in a single Workflow call. Splitting the two lets the model plan a large backlog without launching it all at once. The `DOC_TEST_MODE` check caps the loops to a single turn when that environment variable is set, so the automated docs harness can validate that the file compiles and finishes quickly without running the full orchestration; leave it unset when running the example yourself.

  ```python Python
  import atexit
  import concurrent.futures
  import hashlib
  import json
  import os
  import shutil
  import subprocess
  import sys
  import tempfile
  import threading

  import anthropic

  client = anthropic.Anthropic()

  MODEL = "claude-opus-5"
  EFFORT = "xhigh"

  SYSTEM_PROMPT = "You are a helpful general-purpose agent. Answer the user's request directly."

  REQUEST_TIMEOUT_SECONDS = 600
  BASH_TIMEOUT_SECONDS = 60
  TOOL_RESULT_MAX_CHARS = 8000
  MAX_CONCURRENT = 10
  DOC_TEST_MODE = bool(os.environ.get("DOC_TEST_MODE"))
  MAX_TOTAL_SUBTASKS = 2 if DOC_TEST_MODE else 200
  MAX_SUBAGENT_TURNS = 1 if DOC_TEST_MODE else 15
  MAX_MAIN_TURNS = 1 if DOC_TEST_MODE else 30
  TURNS_BETWEEN_REFRESHERS = 10
  JOURNAL_PATH = os.environ.get("ORCH_JOURNAL") or "orchestration_journal.json"
  ```

  ```typescript TypeScript
  import { exec } from "node:child_process";
  import { createHash } from "node:crypto";
  import { rmSync } from "node:fs";
  import { mkdtemp, readFile, rename, writeFile } from "node:fs/promises";
  import { tmpdir } from "node:os";
  import { join } from "node:path";
  import { promisify } from "node:util";

  import Anthropic from "@anthropic-ai/sdk";

  const client = new Anthropic();

  const MODEL = "claude-opus-5";
  const EFFORT = "xhigh";

  const SYSTEM_PROMPT =
    "You are a helpful general-purpose agent. Answer the user's request directly.";

  const REQUEST_TIMEOUT_SECONDS = 600;
  const BASH_TIMEOUT_SECONDS = 60;
  const TOOL_RESULT_MAX_CHARS = 8000;
  const MAX_CONCURRENT = 10;
  const DOC_TEST_MODE = Boolean(process.env.DOC_TEST_MODE);
  const MAX_TOTAL_SUBTASKS = DOC_TEST_MODE ? 2 : 200;
  const MAX_SUBAGENT_TURNS = DOC_TEST_MODE ? 1 : 15;
  const MAX_MAIN_TURNS = DOC_TEST_MODE ? 1 : 30;
  const TURNS_BETWEEN_REFRESHERS = 10;
  const JOURNAL_PATH = process.env.ORCH_JOURNAL || "orchestration_journal.json";
  ```

  ```csharp C#
  using System.Diagnostics;
  using System.Security.Cryptography;
  using System.Text;
  using System.Text.Json;
  using Anthropic;
  using Anthropic.Models.Messages;

  AnthropicClient client = new();

  const Model model = Model.ClaudeOpus5;
  var effort = Effort.Xhigh;

  const string systemPrompt = "You are a helpful general-purpose agent. Answer the user's request directly.";

  const int requestTimeoutSeconds = 600;
  // The other ports stream with max_tokens 64000. This port uses non-streaming
  // Messages.Create, and the API rejects non-streaming requests at that size.
  // 8192 is the non-streaming ceiling for Opus 4.0 and 4.1 and a conservative
  // choice for newer Opus models.
  const int requestMaxTokens = 8192;
  const int bashTimeoutSeconds = 60;
  const int toolResultMaxChars = 8000;
  const int maxConcurrent = 10;
  var docTestMode = Environment.GetEnvironmentVariable("DOC_TEST_MODE") is { Length: > 0 };
  int maxTotalSubtasks = docTestMode ? 2 : 200;
  int maxSubagentTurns = docTestMode ? 1 : 15;
  int maxMainTurns = docTestMode ? 1 : 30;
  const int turnsBetweenRefreshers = 10;
  var journalPath = Environment.GetEnvironmentVariable("ORCH_JOURNAL") is { Length: > 0 } p ? p : "orchestration_journal.json";
  ```

  ```go Go
  import (
  	"bytes"
  	"cmp"
  	"context"
  	"crypto/sha256"
  	"encoding/hex"
  	"encoding/json"
  	"errors"
  	"fmt"
  	"log"
  	"os"
  	"os/exec"
  	"path/filepath"
  	"strings"
  	"sync"
  	"time"

  	"github.com/anthropics/anthropic-sdk-go"
  )

  var client = anthropic.NewClient()

  const (
  	modelID = anthropic.ModelClaudeOpus5
  	effort  = anthropic.OutputConfigEffortXhigh

  	systemPrompt = "You are a helpful general-purpose agent. Answer the user's request directly."

  	requestTimeoutSeconds  = 600
  	bashTimeoutSeconds     = 60
  	toolResultMaxChars     = 8000
  	maxConcurrent          = 10
  	turnsBetweenRefreshers = 10
  )

  var (
  	docTestMode      = os.Getenv("DOC_TEST_MODE") != ""
  	maxTotalSubtasks = ifTest(2, 200)
  	maxSubagentTurns = ifTest(1, 15)
  	maxMainTurns     = ifTest(1, 30)
  	journalPath      = cmp.Or(os.Getenv("ORCH_JOURNAL"), "orchestration_journal.json")
  )

  func ifTest(test, normal int) int {
  	if docTestMode {
  		return test
  	}
  	return normal
  }

  ```

  ```java Java
  import com.anthropic.client.AnthropicClient;
  import com.anthropic.client.okhttp.AnthropicOkHttpClient;
  import com.anthropic.core.JsonValue;
  import com.anthropic.core.RequestOptions;
  import com.anthropic.helpers.MessageAccumulator;
  import com.anthropic.models.messages.ContentBlock;
  import com.anthropic.models.messages.ContentBlockParam;
  import com.anthropic.models.messages.Message;
  import com.anthropic.models.messages.MessageCreateParams;
  import com.anthropic.models.messages.MessageParam;
  import com.anthropic.models.messages.Model;
  import com.anthropic.models.messages.OutputConfig;
  import com.anthropic.models.messages.StopReason;
  import com.anthropic.models.messages.TextBlock;
  import com.anthropic.models.messages.Tool;
  import com.anthropic.models.messages.ToolBash20250124;
  import com.anthropic.models.messages.ToolResultBlockParam;
  import com.anthropic.models.messages.ToolUseBlock;
  import com.fasterxml.jackson.core.JsonProcessingException;
  import com.fasterxml.jackson.core.type.TypeReference;
  import com.fasterxml.jackson.databind.JsonNode;
  import com.fasterxml.jackson.databind.ObjectMapper;
  import java.io.IOException;
  import java.io.UncheckedIOException;
  import java.nio.charset.StandardCharsets;
  import java.nio.file.Files;
  import java.nio.file.Path;
  import java.nio.file.StandardCopyOption;
  import java.security.MessageDigest;
  import java.time.Duration;
  import java.util.ArrayList;
  import java.util.Comparator;
  import java.util.HashMap;
  import java.util.HexFormat;
  import java.util.List;
  import java.util.Map;
  import java.util.Objects;
  import java.util.Optional;
  import java.util.concurrent.Callable;
  import java.util.concurrent.CancellationException;
  import java.util.concurrent.CompletableFuture;
  import java.util.concurrent.ExecutionException;
  import java.util.concurrent.ExecutorService;
  import java.util.concurrent.Executors;
  import java.util.concurrent.Future;
  import java.util.concurrent.TimeUnit;
  import java.util.concurrent.locks.ReentrantLock;
  import java.util.stream.Collectors;
  import java.util.stream.IntStream;

  AnthropicClient client = AnthropicOkHttpClient.fromEnv();

  static final Model MODEL = Model.CLAUDE_OPUS_5;
  static final boolean DOC_TEST_MODE =
          !Objects.requireNonNullElse(System.getenv("DOC_TEST_MODE"), "").isEmpty();
  static final OutputConfig.Effort EFFORT = OutputConfig.Effort.XHIGH;

  static final String SYSTEM_PROMPT =
          "You are a helpful general-purpose agent. Answer the user's request directly.";

  static final int REQUEST_TIMEOUT_SECONDS = 600;
  static final RequestOptions REQUEST_OPTIONS =
          RequestOptions.builder().timeout(Duration.ofSeconds(REQUEST_TIMEOUT_SECONDS)).build();
  static final int BASH_TIMEOUT_SECONDS = 60;
  static final int TOOL_RESULT_MAX_CHARS = 8000;
  static final int MAX_CONCURRENT = 10;
  static final int MAX_TOTAL_SUBTASKS = DOC_TEST_MODE ? 2 : 200;
  static final int MAX_SUBAGENT_TURNS = DOC_TEST_MODE ? 1 : 15;
  static final int MAX_MAIN_TURNS = DOC_TEST_MODE ? 1 : 30;
  static final int TURNS_BETWEEN_REFRESHERS = 10;
  static final Path JOURNAL_PATH = Path.of(Optional.ofNullable(System.getenv("ORCH_JOURNAL"))
          .filter(s -> !s.isEmpty()).orElse("orchestration_journal.json"));
  ```

  ```php PHP
  use Anthropic\Client;
  use Anthropic\Messages\TextBlock;
  use Anthropic\Messages\ToolUseBlock;

  $client = new Client();

  const MODEL = 'claude-opus-5';
  define('DOC_TEST_MODE', (string) getenv('DOC_TEST_MODE') !== '');
  const EFFORT = 'xhigh';

  const SYSTEM_PROMPT = 'You are a helpful general-purpose agent. Answer the user\'s request directly.';

  const REQUEST_TIMEOUT_SECONDS = 600;
  const BASH_TIMEOUT_SECONDS = 60;
  const TOOL_RESULT_MAX_CHARS = 8000;
  const MAX_CONCURRENT = 10;
  define('MAX_TOTAL_SUBTASKS', DOC_TEST_MODE ? 2 : 200);
  define('MAX_SUBAGENT_TURNS', DOC_TEST_MODE ? 1 : 15);
  define('MAX_MAIN_TURNS', DOC_TEST_MODE ? 1 : 30);
  const TURNS_BETWEEN_REFRESHERS = 10;
  define('JOURNAL_PATH', getenv('ORCH_JOURNAL') ?: 'orchestration_journal.json');
  ```

  ```ruby Ruby
  require "anthropic"
  require "digest"
  require "fileutils"
  require "json"
  require "open3"
  require "tmpdir"

  CLIENT = Anthropic::Client.new

  MODEL = "claude-opus-5"
  EFFORT = :xhigh

  SYSTEM_PROMPT = "You are a helpful general-purpose agent. Answer the user's request directly."

  REQUEST_TIMEOUT_SECONDS = 600
  BASH_TIMEOUT_SECONDS = 60
  TOOL_RESULT_MAX_CHARS = 8000
  MAX_CONCURRENT = 10
  DOC_TEST_MODE = !ENV["DOC_TEST_MODE"].to_s.empty?
  MAX_TOTAL_SUBTASKS = DOC_TEST_MODE ? 2 : 200
  MAX_SUBAGENT_TURNS = DOC_TEST_MODE ? 1 : 15
  MAX_MAIN_TURNS = DOC_TEST_MODE ? 1 : 30
  TURNS_BETWEEN_REFRESHERS = 10
  JOURNAL_PATH = ENV["ORCH_JOURNAL"].to_s.empty? ? "orchestration_journal.json" : ENV["ORCH_JOURNAL"]
  ```

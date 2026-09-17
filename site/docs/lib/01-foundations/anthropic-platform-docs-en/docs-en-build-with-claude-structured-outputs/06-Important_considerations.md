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
sourceRel: "docs/en/build-with-claude/structured-outputs.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/build-with-claude/structured-outputs.md"
sourceSha256: "4e500fed30c759764ba06bcd96b9df7160ecb8e5e7611aae9bc229086e0b9204"
pageSha256: "c636c194d69064109681a76aa00e5ef77262dd50a98a950d04f6fe0f4cb87f65"
contentMode: "local-full"
zh: ""
---

## Important considerations

### Grammar compilation and caching

Structured outputs use constrained sampling with compiled grammar artifacts. This introduces some performance characteristics to be aware of:

* **First request latency:** The first time you use a specific schema, there is additional latency while the grammar compiles

* **Automatic caching:** Compiled grammars are cached for 24 hours from last use, making subsequent requests much faster

* **Cache invalidation:** The cache is invalidated if you change:

  * The JSON schema structure
  * The set of tools in your request (when using both structured outputs and tool use)
  * Changing only `name` or `description` fields does not invalidate the cache

### Prompt modification and token costs

When using structured outputs, Claude automatically receives an additional system prompt explaining the expected output format. This means:

* Your input token count is slightly higher
* The injected prompt costs you tokens like any other system prompt
* Changing the `output_config.format` parameter will invalidate any [prompt cache](https://platform.claude.com/docs/en/build-with-claude/prompt-caching) for that conversation thread

### JSON Schema limitations

Structured outputs support standard JSON Schema with some limitations. Both JSON outputs and strict tool use share these limitations.

  * All basic types: object, array, string, integer, number, boolean, null
  * `enum` (strings, numbers, bools, or nulls only - no complex types; see [Invalid outputs](https://platform.claude.com/docs/en/build-with-claude/structured-outputs#invalid-outputs) for a capitalization caveat)
  * `const`
  * `anyOf` and `allOf` (with limitations - `allOf` with `$ref` not supported)
  * `$ref`, `$def`, and `definitions` (external `$ref` not supported)
  * `default` property for all supported types
  * `required` and `additionalProperties` (must be set to `false` for objects)
  * String formats: `date-time`, `time`, `date`, `duration`, `email`, `hostname`, `uri`, `ipv4`, `ipv6`, `uuid`
  * Array `minItems` (only values 0 and 1 supported)

  * Recursive schemas
  * Complex types within enums
  * External `$ref` (for example, `'$ref': 'http://...'`)
  * Numerical constraints (such as `minimum`, `maximum`, `multipleOf`)
  * String constraints (`minLength`, `maxLength`)
  * Array constraints beyond `minItems` of 0 or 1
  * `additionalProperties` set to anything other than `false`

  If you use an unsupported feature, you'll receive a 400 error with details.

  **Supported regex features:**

  * Full matching (`^...$`) and partial matching
  * Quantifiers: `*`, `+`, `?`, simple `\{n,m\}` cases
  * Character classes: `[]`, `.`, `\d`, `\w`, `\s`
  * Groups: `(...)`

  **NOT supported:**

  * Backreferences to groups (for example, `\1`, `\2`)
  * Lookahead/lookbehind assertions (for example, `(?=...)`, `(?!...)`)
  * Word boundaries: `\b`, `\B`
  * Complex `\{n,m\}` quantifiers with large ranges

  Simple regex patterns work well. Complex patterns may result in 400 errors.

  The Python, TypeScript, Ruby, and PHP SDKs can automatically transform schemas with unsupported features by removing them and adding constraints to field descriptions. The C# and Go SDKs do the same when the schema is derived from a native type. See [SDK-specific methods](https://platform.claude.com/docs/en/build-with-claude/structured-outputs#sdk-specific-methods) for details.

### Property ordering

When using structured outputs, properties in objects maintain their defined ordering from your schema, with one important caveat: **required properties appear first, followed by optional properties**.

For example, given this schema:

```json
{
  "type": "object",
  "properties": {
    "notes": { "type": "string" },
    "name": { "type": "string" },
    "email": { "type": "string" },
    "age": { "type": "integer" }
  },
  "required": ["name", "email"],
  "additionalProperties": false
}
```

The output will order properties as:

1. `name` (required, in schema order)
2. `email` (required, in schema order)
3. `notes` (optional, in schema order)
4. `age` (optional, in schema order)

This means the output might look like:

```json
{
  "name": "John Smith",
  "email": "john@example.com",
  "notes": "Interested in enterprise plan",
  "age": 35
}
```

If property order in the output is important to your application, mark all properties as required, or account for this reordering in your parsing logic.

### Invalid outputs

While structured outputs guarantee schema compliance in most cases, there are scenarios where the output may not match your schema:

**Refusals** (`stop_reason: "refusal"`)

Claude maintains its safety and helpfulness properties even when using structured outputs. If Claude refuses a request for safety reasons:

* The response has `stop_reason: "refusal"`
* You'll receive a 200 status code
* You'll be billed for the tokens generated
* The output may not match your schema because the refusal message takes precedence over schema constraints

**Token limit reached** (`stop_reason: "max_tokens"`)

If the response is cut off due to reaching the `max_tokens` limit:

* The response has `stop_reason: "max_tokens"`
* The output may be incomplete and not match your schema
* Retry with a higher `max_tokens` value to get the complete structured output

**Enum value casing**

Structured outputs don't guarantee the capitalization of string `enum` and `const` values: Claude may return a value that differs from your schema only in capitalization, typically in the first letter of a word following a space. For example, given this schema:

```json
{
  "type": "string",
  "enum": ["Conversation Topic 1", "Conversation Topic 2", "Conversation topic 3"]
}
```

The output may contain `"Conversation Topic 3"` (capital "T") even though that exact value isn't in the enum. The response completes normally, with no error and no special `stop_reason`. This applies to both JSON outputs and strict tool use. Compare enum values case-insensitively, and avoid enum values that differ only in capitalization.

### Schema complexity limits

Structured outputs work by compiling your JSON schemas into a grammar that constrains Claude's output. More complex schemas produce larger grammars that take longer to compile. To protect against excessive compilation times, the API enforces several complexity limits.

#### Explicit limits

The following limits apply to all requests with `output_config.format` or `strict: true`:

| Limit                       | Value | Description                                                                                                                                                                                              |
| --------------------------- | ----- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Strict tools per request    | 20    | Maximum number of tools with `strict: true`. Non-strict tools don't count toward this limit.                                                                                                             |
| Optional parameters         | 24    | Total optional parameters across all strict tool schemas and JSON output schemas. Each parameter not listed in `required` counts toward this limit.                                                      |
| Parameters with union types | 16    | Total parameters that use `anyOf` or type arrays (for example, `"type": ["string", "null"]`) across all strict schemas. These are especially expensive because they create exponential compilation cost. |

  These limits apply to the combined total across all strict schemas in a single request. For example, if you have 4 strict tools with 6 optional parameters each, you'll reach the 24-parameter limit even though no single tool seems complex.

#### Additional internal limits

Beyond the explicit limits in the preceding table, there are additional internal limits on the compiled grammar size. These limits exist because schema complexity doesn't reduce to a single dimension: features like optional parameters, union types, nested objects, and number of tools interact with each other in ways that can make the compiled grammar disproportionately large.

When these limits are exceeded, you'll receive a 400 error with the message "Schema is too complex for compilation." These errors mean the combined complexity of your schemas exceeds what can be efficiently compiled, even if each individual limit in the preceding table is satisfied. As a final stop-gap, the API also enforces a **compilation timeout of 180 seconds**. Schemas that pass all explicit checks but produce very large compiled grammars may hit this timeout.

#### Tips for reducing schema complexity

If you're hitting complexity limits, try these strategies in order:

1. **Mark only critical tools as strict.** If you have many tools, reserve it for tools where schema violations cause real problems, and rely on Claude's natural adherence for simpler tools.

2. **Reduce optional parameters.** Make parameters `required` where possible. Each optional parameter roughly doubles a portion of the grammar's state space. If a parameter always has a reasonable default, consider making it required and having Claude provide that default explicitly.

3. **Simplify nested structures.** Deeply nested objects with optional fields compound the complexity. Flatten structures where possible.

4. **Split into multiple requests.** If you have many strict tools, consider splitting them across separate requests or sub-agents.

For persistent issues with valid schemas, [contact support](https://support.claude.com/en/articles/9015913-how-to-get-support) with your schema definition.

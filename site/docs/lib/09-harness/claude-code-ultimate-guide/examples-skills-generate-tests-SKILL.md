---
title: "Generate Tests"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/skills/generate-tests/SKILL.md"
sourceRel: "examples/skills/generate-tests/SKILL.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/examples/skills/generate-tests/SKILL.md"
sourceSha256: "3dad1a42dbd82343126e45ad7084d6a2a0b9ac0a3595d4ee2e90a8e5aa0b05ff"
pageSha256: "3dad1a42dbd82343126e45ad7084d6a2a0b9ac0a3595d4ee2e90a8e5aa0b05ff"
contentMode: "local-full"
zh: ""
---

# Generate Tests

Generate comprehensive tests for specified code.

## Instructions

1. Read the target file(s)
2. Identify testable units (functions, classes, methods)
3. Generate tests following project conventions
4. Ensure high coverage of edge cases

## Test Generation Process

### 1. Analyze Target
- Identify public interfaces
- Understand dependencies
- Note edge cases and boundaries

### 2. Detect Test Framework
Check for:
- `jest.config.js` → Jest
- `vitest.config.ts` → Vitest
- `pytest.ini` → pytest
- `mocha` in package.json → Mocha

### 3. Generate Tests
Follow the detected framework conventions.

## Test Categories

### Happy Path
Normal expected behavior with valid input.

### Edge Cases
- Empty inputs
- Null/undefined values
- Boundary values (0, -1, MAX_INT)
- Single item vs multiple items

### Error Cases
- Invalid input types
- Missing required parameters
- Network/IO failures
- Timeout scenarios

### Integration Points
- Database interactions
- External API calls
- File system operations

## Output Format

```typescript
describe('[ComponentName]', () => {
  describe('[methodName]', () => {
    // Happy path
    it('should [expected behavior] when [condition]', () => {
      // Arrange
      // Act
      // Assert
    });

    // Edge cases
    it('should handle empty input', () => {});
    it('should handle null values', () => {});

    // Error cases
    it('should throw when [invalid condition]', () => {});
  });
});
```

## Conventions

- One assertion per test (when practical)
- Descriptive test names
- AAA pattern (Arrange-Act-Assert)
- No test interdependence
- Mock external dependencies

## Usage

```
/generate-tests src/utils/calculator.ts
/generate-tests src/services/
```

$ARGUMENTS

---
title: "Phase 1: Precheck"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-upgrade/references/languages/java/workflow/phase-1-precheck.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-upgrade/references/languages/java/workflow/phase-1-precheck.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-upgrade/references/languages/java/workflow/phase-1-precheck.md"
sourceSha256: "843325e10a328ea6b5f66247c5f6474c9caf8ca1267bbe2497648fe1c7de0a97"
pageSha256: "843325e10a328ea6b5f66247c5f6474c9caf8ca1267bbe2497648fe1c7de0a97"
contentMode: "local-full"
zh: ""
---

# Phase 1: Precheck

Load this file when executing Phase 1. Refer back to [`upgrade-success-criteria`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-upgrade-references-languages-java-rules-upgrade-success-criteria) and [`upgrade-strategy`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-upgrade-references-languages-java-rules-upgrade-strategy) for success criteria and strategy, and [`../rules/troubleshooting.md`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-upgrade-references-languages-java-rules-troubleshooting) when failures occur.

| Category            | Scenario                         | Action                                                 |
| ------------------- | -------------------------------- | ------------------------------------------------------ |
| Unsupported Project | Not a Maven/Gradle project       | STOP with error                                        |
| Unsupported Project | Git not installed or not managed | Log warning, continue without git                      |
| Invalid Goal        | No legacy Azure SDK deps found   | STOP — nothing to migrate                              |
| Java Version        | Below JDK 8                      | Include Java upgrade as part of the migration plan     |

**Prerequisites**: JDK 8+ and Maven or Gradle must be pre-installed.

**Environment detection**:

Detect available JDKs:
1. Check `JAVA_HOME` and `JDK_HOME` environment variables
2. Run `java -version` and `javac -version` to detect the default JDK
3. Search common JDK installation paths (platform-specific: Program Files on Windows, /usr/lib/jvm on Linux, /Library/Java on macOS)
4. Check for version manager installations (SDKMAN, ASDF, jenv, Jabba)
5. For each found JDK, read the `release` file to determine the version

Report all found JDKs with their path, version, and discovery source.

Detect build tools:
1. Check for Maven Wrapper (`mvnw`/`mvnw.cmd`) or Gradle Wrapper (`gradlew`/`gradlew.bat`) in the project root — prefer wrappers when present
2. If a wrapper exists, read `.mvn/wrapper/maven-wrapper.properties` or `gradle/wrapper/gradle-wrapper.properties` to determine the wrapper-defined version
3. Run `mvn --version` or `gradle --version` to detect system installations
4. Check `MAVEN_HOME`/`M2_HOME` environment variables

Report all found installations with their path, version, and source.

**On success**: Create `.github/java-upgrade/\{RUN_ID\}/plan.md` from the Plan Template — replace placeholders (`<RUN_ID>`, `<PROJECT_NAME>`, `<current_branch>`, `<current_commit_id>`, datetime) and follow the HTML-comment instructions to populate each section.

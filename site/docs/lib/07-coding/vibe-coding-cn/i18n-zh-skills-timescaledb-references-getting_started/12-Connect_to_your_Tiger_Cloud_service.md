---
title: "Vibe Coding CN"
sourceId: "07-coding/vibe-coding-cn"
sourceTitle: "Vibe Coding CN"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/2025Emma/vibe-coding-cn"
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/getting_started.md"
sourceRel: "i18n/zh/skills/timescaledb/references/getting_started.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/timescaledb/references/getting_started.md"
sourceSha256: "d89ee1583c1ea9641e14a8f176f27150301b48061cbde17049ed1e459820f0d5"
pageSha256: "a67b39bf6dd29d24bf8cc3f5da09f85372b0b8b6176ec408353e845ebcc4a52e"
contentMode: "local-full"
zh: ""
---

## Connect to your Tiger Cloud service

In this section, you create a connection to your service using an application in
a single file. You can use any of your favorite build tools, including `gradle`
or `maven`.

1.  Create a directory containing a text file called `Main.java`, with this content:

1.  From the command line in the current directory, run the application:

If the command is successful, `Hello, World!` line output is printed
    to your console.

1.  Import the PostgreSQL JDBC driver. If you are using a dependency manager,
   include the [PostgreSQL JDBC Driver][pg-jdbc-driver-dependency] as a
   dependency.

1.  Download the [JAR artifact of the JDBC Driver][pg-jdbc-driver-artifact] and
   save it with the `Main.java` file.

1.  Import the `JDBC Driver` into the Java application and display a list of
   available drivers for the check:

1.  Run all the examples:

If the command is successful, a string similar to
   `org.postgresql.Driver@7f77e91b` is printed to your console. This means that you
   are ready to connect to TimescaleDB from Java.

1.  Locate your TimescaleDB credentials and use them to compose a connection
   string for JDBC.

*   password
      *   username
      *   host URL
      *   port
      *   database name

1.  Compose your connection string variable, using this format:

For more information about creating connection strings, see the [JDBC documentation][pg-jdbc-driver-conn-docs].

This method of composing a connection string is for test or development
    purposes only. For production, use environment variables for sensitive
    details like your password, hostname, and port number.

If the command is successful, a string similar to
    `\{ApplicationName=PostgreSQL JDBC Driver\}` is printed to your console.

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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/postgresql/references/getting_started.md"
sourceRel: "i18n/zh/skills/postgresql/references/getting_started.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/postgresql/references/getting_started.md"
sourceSha256: "95aeb537e6898c59d5a2c6a293e6fb7b5e8dba332b70a50912fef1b7f208ade6"
pageSha256: "2bcda10bf5bde6e21970beaac81cdd181bd6ed27823f6058286b373a3f370752"
contentMode: "local-full"
zh: ""
---

## PostgreSQL: Documentation: 18: 17.5. Post-Installation Setup

**URL:** https://www.postgresql.org/docs/current/install-post.html

**Contents:**
- 17.5. Post-Installation Setup #
  - 17.5.1. Shared Libraries #
  - 17.5.2. Environment Variables #

On some systems with shared libraries you need to tell the system how to find the newly installed shared libraries. The systems on which this is not necessary include FreeBSD, Linux, NetBSD, OpenBSD, and Solaris.

The method to set the shared library search path varies between platforms, but the most widely-used method is to set the environment variable LD_LIBRARY_PATH like so: In Bourne shells (sh, ksh, bash, zsh):

Replace /usr/local/pgsql/lib with whatever you set --libdir to in Step 1. You should put these commands into a shell start-up file such as /etc/profile or ~/.bash_profile. Some good information about the caveats associated with this method can be found at http://xahlee.info/UnixResource_dir/_/ldpath.html.

On some systems it might be preferable to set the environment variable LD_RUN_PATH before building.

On Cygwin, put the library directory in the PATH or move the .dll files into the bin directory.

If in doubt, refer to the manual pages of your system (perhaps ld.so or rld). If you later get a message like:

then this step was necessary. Simply take care of it then.

If you are on Linux and you have root access, you can run:

(or equivalent directory) after installation to enable the run-time linker to find the shared libraries faster. Refer to the manual page of ldconfig for more information. On FreeBSD, NetBSD, and OpenBSD the command is:

instead. Other systems are not known to have an equivalent command.

If you installed into /usr/local/pgsql or some other location that is not searched for programs by default, you should add /usr/local/pgsql/bin (or whatever you set --bindir to in Step 1) into your PATH. Strictly speaking, this is not necessary, but it will make the use of PostgreSQL much more convenient.

To do this, add the following to your shell start-up file, such as ~/.bash_profile (or /etc/profile, if you want it to affect all users):

If you are using csh or tcsh, then use this command:

To enable your system to find the man documentation, you need to add lines like the following to a shell start-up file unless you installed into a location that is searched by default:

The environment variables PGHOST and PGPORT specify to client applications the host and port of the database server, overriding the compiled-in defaults. If you are going to run client applications remotely then it is convenient if every user that plans to use the database sets PGHOST. This is not required, however; the settings can be communicated via command line options to most client programs.

**Examples:**

Example 1 (unknown):
```unknown
LD_LIBRARY_PATH=/usr/local/pgsql/lib
export LD_LIBRARY_PATH
```

Example 2 (unknown):
```unknown
setenv LD_LIBRARY_PATH /usr/local/pgsql/lib
```

Example 3 (unknown):
```unknown
psql: error in loading shared libraries
libpq.so.2.1: cannot open shared object file: No such file or directory
```

Example 4 (unknown):
```unknown
/sbin/ldconfig /usr/local/pgsql/lib
```

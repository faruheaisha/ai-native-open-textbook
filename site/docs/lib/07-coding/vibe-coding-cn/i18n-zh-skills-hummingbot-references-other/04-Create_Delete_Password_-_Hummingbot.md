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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/hummingbot/references/other.md"
sourceRel: "i18n/zh/skills/hummingbot/references/other.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/hummingbot/references/other.md"
sourceSha256: "7bd57673fc3df5b901db36ae3eac6be136526e8e2dbb141702c9a6ebc26b607a"
pageSha256: "ac65edb4b528cd8710b1fd7d84bf0505cf75cbfdb53372a142917a0159e83eb6"
contentMode: "local-full"
zh: ""
---

## Create/Delete Password - Hummingbot

**URL:** https://hummingbot.org/client/password/

**Contents:**
- Create and Delete Password¶
- Creating a password¶
- Deleting a password¶

The password in Hummingbot encrypts sensitive data such as API keys, secret keys, and wallet private keys. For security reasons, the password is only stored locally in encrypted form, and we do not have access to it.

If you are using Hummingbot for the first time, the system will prompt you to create a password. There are no character requirements, although we recommend using a strong password for additional security.

You can click the OK button on the welcome screen or you can press TAB to navigate the selection and ENTER to confirm.

Passwords are stored locally in your computer. No passwords are uploaded to any server.

The password is stored as an encrypted .password_verification file in the /conf directory within the hummingbot folder.

Delete the .password_verification file under the hummingbot_conf folder to reset the password. Note that the .password_verification file is hidden so you won't be able to see it by default unless you set your system to show all hidden files. In the terminal use the ls -a command to list all files

Note that if you do remove the .password_verification file you'll also need to remove the existing connector.yml files under the conf/connector folder otherwise you'll run into an issue where the bot throws an error message and doesn't start.

This is because Hummingbot encrypts the connector files with the same password you use to login. Resetting the password by deleting the password verification file will prevent the existing connector files from being decrypted which means you'll also need to reconnect your API keys.

Use the command sudo rm -rf .password_verification to delete the file

In older versions the passwords and private keys are saved as encrypted files in hummingbot_conf (via Docker and binary) or /conf directory (installed from source). To reset your password, delete all files starting with encrypted_ prefix.

This will disconnect your API keys from Hummingbot. You will have to re-connect your API keys.

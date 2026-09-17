---
title: "claude-code-docs-official"
sourceId: "09-harness/claude-code-docs-official"
sourceTitle: "claude-code-docs-official"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://code.claude.com/docs"
entryUrl: "https://code.claude.com/docs"
sourceRel: "en/tools-reference.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/tools-reference.md"
sourceSha256: "f928a98a3f2e69421eeadeb064439c827340f4b19a28c7ad920c2a0e60b142f9"
pageSha256: "0b12a85262476dae1c74576303e7a1b4c07622d898362e8e41daf1955b98ed83"
contentMode: "local-full"
zh: ""
---

## Read tool behavior

The Read tool takes a file path and returns the contents with line numbers. Claude is instructed to always pass absolute paths.

By default, Read returns the file from the start. When a whole-file read exceeds the token limit, Read returns the first page with a `PARTIAL view` notice that tells Claude how much of the file it received and how to read more with `offset` and `limit`. A read that passes an explicit `offset` or `limit` and still exceeds the token limit returns an error.

A read with an explicit `limit` stops as soon as the selected lines exceed what the token limit could ever fit and returns an error without loading the rest of the range. The error tells Claude to use a smaller `limit`, or to search for specific content with [Grep](#grep-tool-behavior) instead when a single line is that large. Before v2.1.208, Claude Code loaded the whole range into memory before rejecting it, so reading a file with an extremely long single line could run it out of memory.

Reading an empty file returns a notice that the file exists but its contents are empty, and an `offset` past the last line returns a notice giving the file's line count. Before v2.1.208, reading an empty file returned the past-the-end notice instead.

Read handles several file types beyond plain text:

* **Images**: PNG, JPG, and other image formats are returned as visual content that Claude can see, not as raw bytes. Claude Code resizes and recompresses large images to fit the model's image size limits before sending them, so Claude may see a downscaled version of a large screenshot. As of v2.1.196, an image that is still larger than 500KB after that resize is re-encoded as a JPEG at reduced quality with its pixel dimensions unchanged. If Claude misses fine pixel-level detail in a large image, ask it to crop the region of interest first, for example with ImageMagick via Bash.
* **PDFs**: Claude reads short `.pdf` files whole. For PDFs longer than 10 pages, it reads in ranges with a `pages` parameter, such as `"1-5"`, up to 20 pages at a time.
* **Jupyter notebooks**: `.ipynb` files return all cells with their outputs, including code, markdown, and visualizations. Claude Code refuses to read a notebook file over 100 MB; the error tells Claude how to read a portion of the notebook instead, such as a slice of cells, with a shell command.

Read only reads files, not directories. Claude lists directory contents with a shell command such as `ls`.

---
title: "openai-plugins-docs"
sourceId: "11-personal-agents/openai-plugins-docs"
sourceTitle: "openai-plugins-docs"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "11-personal-agents"
sourceUrl: "https://developers.openai.com/plugins"
entryUrl: "https://developers.openai.com/plugins"
sourceRel: "plugins/deploy/submission-errors.md"
rawUrl: "/raw/11-personal-agents/openai-plugins-docs/plugins/deploy/submission-errors.md"
sourceSha256: "c475dca167f14136260f331f35c506f730e1c93d226a3ec5ebe9ce1e385f2380"
pageSha256: "8a292e8a560cbbfbd5355dcf822f16662c92bc3ed48ad1ffc17a5f3df38defc0"
contentMode: "local-full"
zh: ""
---

## Image errors

Directory branding images must use a supported file type and meet the size and
dimension limits below. These rules apply to packaged branding assets;
starter-prompt screenshots use the separate portal limits listed above.

| Name                                      | Requirement                                                                |
| ----------------------------------------- | -------------------------------------------------------------------------- |
| `plugin_logo_path_missing`                | `interface.logo` is required and must reference a square image.            |
| `plugin_composer_icon_path_missing`       | `interface.composerIcon` is required and must reference a square image.    |
| `image_file_unreadable`                   | Image file must be readable.                                               |
| `image_file_too_large`                    | Image must not exceed 5 MiB.                                               |
| `image_file_format_unsupported`           | Image filename must end in `.png`, `.jpg`, `.jpeg`, `.webp`, or `.svg`.    |
| `raster_image_decode_failed`              | Raster image must be a PNG, JPEG, or WebP file that can be decoded safely. |
| `raster_image_extension_content_mismatch` | Image filename extension must match the detected image format.             |
| `raster_image_not_square`                 | Image must be square.                                                      |
| `raster_image_dimensions_too_small`       | Image dimensions must be at least 48×48 pixels.                            |
| `raster_image_dimensions_too_large`       | Image dimensions must not exceed 4,096×4,096 pixels.                       |
| `svg_xml_malformed`                       | SVG must contain valid UTF-8 XML.                                          |
| `svg_root_element_invalid`                | SVG root element must be `<svg>`.                                          |
| `svg_dimensions_missing`                  | SVG must define a numeric `viewBox` or numeric `width` and `height`.       |
| `svg_dimensions_not_numeric`              | SVG dimensions must be numeric and omit units and percentages.             |
| `svg_dimensions_not_positive`             | SVG width and height must be positive finite numbers.                      |
| `svg_dimensions_not_square`               | SVG dimensions must be square.                                             |
| `svg_dimensions_too_small`                | SVG dimensions must be at least 48×48 pixels.                              |

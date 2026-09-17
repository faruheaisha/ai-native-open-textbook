---
title: "Risks & Misuses"
sourceId: "10-context-memory/prompt-engineering-guide"
sourceTitle: "Prompt Engineering Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide"
entryUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide/blob/57673726396dd94acb23bdb1e67f27c78ee85a8e/pages/risks.kr.mdx"
sourceRel: "pages/risks.kr.mdx"
rawUrl: "/raw/10-context-memory/prompt-engineering-guide/pages/risks.kr.mdx"
sourceSha256: "ecdc05f389a7354f6c355479ec29949c2982b6d2a9255dc06fb9bbb259ca07c0"
pageSha256: "ecdc05f389a7354f6c355479ec29949c2982b6d2a9255dc06fb9bbb259ca07c0"
contentMode: "local-full"
zh: ""
---

# Risks & Misuses

import \{ Callout \} from 'nextra-theme-docs'
import ContentFileNames from 'components/ContentFileNames'

우리는 이미 잘 만들어진 프롬프트가 few-shot learning and chain-of-thought prompting과 같은 기법을 사용하여 다양한 작업에 얼마나 효과적인지 보았습니다. LLMs을 기반으로 실제 어플리케이션을 구축할 때 언어 모델과 관련된 오용, 위험 및 안전 관행에 대해 생각하는 것이 중요해졌습니다.

이 장에서는 프롬프트 삽입과 같은 기술을 통해 LLMs의 몇 가지 위험과 오용을 강조하는 데 중점을 둡니다. 또한 유해한 행동을 지적하고, 효과적인 프롬프트 기술을 통해 이를 잠재적으로 완화할 수 있는 방법을 강조합니다. 그 밖에도 일반화 가능성, 보정, 편향성, 사회적 편견, 사실성 등 다양한 주제를 다룹니다.

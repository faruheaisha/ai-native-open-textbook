---
title: "Chapter 2. LLM API 호출 이해하기"
sourceId: "07-coding/fastcampus-ai-agent-vibecoding"
sourceTitle: "FastCampus AI Agent 바이브코딩 강의"
sourceKind: "系统课程"
licenseLabel: "仅引用"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/Koomook/fastcampus-ai-agent-vibecoding"
entryUrl: "https://github.com/Koomook/fastcampus-ai-agent-vibecoding/blob/b24208b48c3945769327dbcafc2d632189369520/Part2_Agent_개념과_아키텍처/Chapter2_LLM_API_호출_이해하기/README.md"
sourceRel: "Part2_Agent_개념과_아키텍처/Chapter2_LLM_API_호출_이해하기/README.md"
rawUrl: "/raw/07-coding/fastcampus-ai-agent-vibecoding/Part2_Agent_개념과_아키텍처/Chapter2_LLM_API_호출_이해하기/README.md"
sourceSha256: "1a9b386abb069ebb5960fe735ef039e42a6a5791cc9678221eb4392adaf84f73"
pageSha256: "1a9b386abb069ebb5960fe735ef039e42a6a5791cc9678221eb4392adaf84f73"
contentMode: "local-full"
zh: ""
---

# Chapter 2. LLM API 호출 이해하기

LLM API의 기본 개념부터 고급 파라미터 활용까지 학습합니다.

## 학습 목표
- LLM API의 기본 구조와 호출 방법 이해
- reasoning_effort, verbosity, max_token 등 주요 파라미터 활용
- 효과적인 프롬프트 작성 기법 습득

---

## 📋 예시 코드 파일 구성

### 기본 API 호출 (Clip 1)
- **01_basic_openai_call.py**: OpenAI API 직접 호출 기본 예시
- **02_langchain_basic.py**: LangChain을 사용한 LLM 호출 및 프롬프트 템플릿

### 고급 파라미터 (Clip 2)
- **03_verbosity_demo.py**: verbosity 파라미터 실험 (low/medium/high)
- **04_max_tokens_vs_verbosity.py**: max_tokens와 verbosity의 차이 비교
- **05_reasoning_effort.py**: reasoning_effort 파라미터와 사고 깊이 조절

## 💡 주요 개념

### verbosity (응답 상세도)
- `low`: 간결한 응답
- `medium`: 보통 수준 (기본값)
- `high`: 매우 자세한 응답

### max_tokens (최대 토큰 수)
- 하드 제한: 지정된 토큰 수에서 강제 종료
- 문장이 끊길 수 있음
- 토큰 비용 절약에 효과적

### reasoning_effort (사고 깊이)
- `low`: 빠른 추론 (간단한 작업)
- `medium`: 균형잡힌 추론 (일반적 작업)
- `high`: 깊은 추론 (복잡한 문제)

## 🔧 실무 활용 팁

1. **verbosity + max_tokens 조합**
   - `verbosity`로 스타일 조절
   - `max_tokens`로 비용 상한 설정

2. **대화 히스토리 관리**
   - 최대 20개 메시지로 제한
   - 오래된 메시지 자동 삭제

3. **프롬프트 템플릿**
   - 반복 작업은 템플릿화
   - 유지보수와 재사용성 향상

## ⚠️ 주의사항

- API 키는 절대 코드에 하드코딩하지 마세요
- 환경변수나 `.env` 파일 사용 권장
- API 호출 비용을 고려하여 파라미터 조절

## 📖 참고 자료

- [OpenAI API 공식 문서](https://platform.openai.com/docs/api-reference)
- [LangChain 공식 문서](https://python.langchain.com/)

---
title: "Chapter 3. 우리 회사 DB를 쿼리하는 MCP server 구현하기"
sourceId: "07-coding/fastcampus-ai-agent-vibecoding"
sourceTitle: "FastCampus AI Agent 바이브코딩 강의"
sourceKind: "系统课程"
licenseLabel: "仅引用"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/Koomook/fastcampus-ai-agent-vibecoding"
entryUrl: "https://github.com/Koomook/fastcampus-ai-agent-vibecoding/blob/b24208b48c3945769327dbcafc2d632189369520/Part4_바이브코딩으로_MCP_server_구현하기/Chapter3_우리_회사_DB를_쿼리하는_MCP_SERVER_구현하기/README.md"
sourceRel: "Part4_바이브코딩으로_MCP_server_구현하기/Chapter3_우리_회사_DB를_쿼리하는_MCP_SERVER_구현하기/README.md"
rawUrl: "/raw/07-coding/fastcampus-ai-agent-vibecoding/Part4_바이브코딩으로_MCP_server_구현하기/Chapter3_우리_회사_DB를_쿼리하는_MCP_SERVER_구현하기/README.md"
sourceSha256: "721fa283d1dd8cba8eb04da39b9f2f3ece583ca0da05a1352d4dec3ef614f3f3"
pageSha256: "721fa283d1dd8cba8eb04da39b9f2f3ece583ca0da05a1352d4dec3ef614f3f3"
contentMode: "local-full"
zh: ""
---

# Chapter 3. 우리 회사 DB를 쿼리하는 MCP server 구현하기

이 챕터에서는 실제 비즈니스 환경에서 데이터베이스와 연동하는 MCP 서버를 구현합니다.
PostgreSQL을 기반으로 회사의 데이터를 조회하고 관리하는 MCP 서버를 바이브코딩으로 만들어봅니다.

## 학습 목표
- PostgreSQL 기반 MCP 서버 구현 이해하기
- Mock 데이터를 활용한 실습 환경 구성
- 데이터베이스 읽기/쓰기 도구 설계 및 구현
- Claude와 DB 연동 MCP 서버의 실제 활용 방법

## 클립 구성
1. **Postgresql MCP Server 구현체 보기**: 기존 PostgreSQL MCP 서버 코드 분석
2. **Mock 스키마 만들고 데이터 합성해서 집어넣기**: 실습을 위한 데이터베이스 환경 구성
3. **DB Write Tool 설계하기**: 데이터베이스 쓰기 기능 설계 및 구현
4. **클로드에 연결해서 써보기**: 구현한 MCP 서버를 Claude와 연결하여 실제 동작 확인

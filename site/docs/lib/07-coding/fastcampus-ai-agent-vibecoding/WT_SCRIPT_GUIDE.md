---
title: "Git Worktree 자동화 스크립트 (wt)"
sourceId: "07-coding/fastcampus-ai-agent-vibecoding"
sourceTitle: "FastCampus AI Agent 바이브코딩 강의"
sourceKind: "系统课程"
licenseLabel: "仅引用"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/Koomook/fastcampus-ai-agent-vibecoding"
entryUrl: "https://github.com/Koomook/fastcampus-ai-agent-vibecoding/blob/b24208b48c3945769327dbcafc2d632189369520/WT_SCRIPT_GUIDE.md"
sourceRel: "WT_SCRIPT_GUIDE.md"
rawUrl: "/raw/07-coding/fastcampus-ai-agent-vibecoding/WT_SCRIPT_GUIDE.md"
sourceSha256: "ef56b7bcae5442382769a71a7e77c9a4bb16b7e76d211acba6c8afc858637bf0"
pageSha256: "ef56b7bcae5442382769a71a7e77c9a4bb16b7e76d211acba6c8afc858637bf0"
contentMode: "local-full"
zh: ""
---

# Git Worktree 자동화 스크립트 (`wt`)

## 📋 개요

이 스크립트는 Git worktree를 자동으로 생성하고 설정하는 도구입니다. 새로운 작업 환경을 빠르게 준비할 수 있습니다.

## ✨ 주요 기능

- ✓ 새로운 worktree 자동 생성
- ✓ 패키지 자동 설치 (uv 사용)
- ✓ .env 파일 자동 복사
- ✓ 진행 상황 실시간 표시
- ✓ 명확한 에러 메시지
- ✓ 완료 후 다음 단계 가이드 제공

## 🚀 사용법

### 기본 사용법

```bash
./wt <브랜치명>
```

### 예시

```bash
# 새 기능 개발용 worktree 생성
./wt feature/new-feature

# 버그 수정용 worktree 생성
./wt bugfix/critical-issue

# 실험용 worktree 생성
./wt experiment/try-new-approach
```

## 📋 동작 절차

### 1단계: 유효성 검사
- 현재 디렉토리가 git 저장소인지 확인
- 브랜치가 이미 사용 중인지 확인
- worktree 경로가 이미 존재하는지 확인

### 2단계: Worktree 생성
```
새 경로: ../프로젝트명-브랜치명
예시: ../fastcampus-lecture-feature/new-feature
```

### 3단계: .env 파일 복사
- 기존 .env 파일이 있으면 새 worktree로 자동 복사

### 4단계: 패키지 설치
- `uv sync` 명령어로 의존성 자동 설치

## 🔧 실행 권한 설정

스크립트를 처음 다운로드했을 때는 실행 권한이 없을 수 있습니다.

### 방법 1: chmod 명령어 (권장)

```bash
chmod +x wt
```

권한 확인:
```bash
ls -la wt
# -rwxr-xr-x@ 1 bong  staff  3536 Oct 19 15:36 wt
```

### 방법 2: Git 커밋 속성 설정

```bash
git config core.fileMode true
git add wt
git commit -m "Add executable permission to wt script"
```

### 방법 3: 다른 방식으로 실행

실행 권한이 없다면:
```bash
bash wt <브랜치명>
# 또는
sh wt <브랜치명>
```

## 📊 출력 메시지 해석

### 성공 메시지
```
✓ worktree 생성 완료
✓ .env 파일 복사 완료
✓ 패키지 설치 완료
```

### 진행 중 메시지
```
⟳ 새 worktree 생성 중...
⟳ .env 파일 복사 중...
⟳ 패키지 설치 중...
```

### 정보 메시지
```
ℹ .env 파일이 없습니다.
```

### 에러 메시지
```
❌ 에러: 현재 디렉토리가 git 저장소가 아닙니다.
❌ 에러: worktree가 이미 존재합니다.
❌ 에러: uv가 설치되어 있지 않습니다.
```

## ⚠️ 에러 상황별 해결 방법

### "uv가 설치되어 있지 않습니다"

```bash
# macOS (Homebrew)
brew install uv

# Linux
pip install uv

# 또는 공식 설치 스크립트
curl -LsSf https://astral.sh/uv/install.sh | sh
```

### "worktree가 이미 존재합니다"

```bash
# 기존 worktree 제거
git worktree remove ../fastcampus-lecture-feature/new-feature

# 또는 강제 제거
rm -rf ../fastcampus-lecture-feature/new-feature
```

### "브랜치가 이미 worktree에서 사용 중입니다"

```bash
# 현재 worktree 목록 확인
git worktree list

# 해당 worktree 확인 및 제거

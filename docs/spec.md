# Spec — Skate Journal

## 콘텐츠 구성
1. **Sessions (트레이닝 로그)**: 날짜, 장소, 연습한 기술(push, ollie 등), 상태, 메모, 사진/영상.
2. **Posts (글)**: culture, spirit, skateboarding zen, 개인 경험에 대한 에세이. 다른 콘텐츠를 인용/연결한다.
3. **Gear**: 데크, 트럭, 휠, 신발 등. 어디서 샀는지 포함.
4. **Places**: 타는 스팟, 특징.
5. **References (임시 수집함)**: 유사 앱, 주요 웹사이트, 한국과 해외 씬, 관련 도서, zen 관련 글, cultures around skateboarding. 글의 재료이며 영구 보관이 목적이 아니다.
6. **Media**: 내 사진, 영상. 여러 콘텐츠에 연결 가능.

핵심은 이들 사이의 **연결**이다. 한 편의 글이 세션, 스팟, 장비, 레퍼런스, 영상을 엮어서 이야기가 된다.

## 핵심 기능
- 마크다운(MDX) 글쓰기 + 다른 콘텐츠 임베드/링크
- 사진, 영상 연결
- 세션 기록 빠른 입력 (타고 난 직후 모바일에서)
- 레퍼런스 수집: URL + 한 줄 메모 + 태그
- 공유: 콘텐츠 단위 public/private, public만 공개 페이지로 노출

## MVP 범위
- 포함: 글 작성, 세션 기록, 사진 연결, 레퍼런스 수집, 글 단위 공개 페이지.
- 제외: `LATER.md` 참조.

## 기술 스택 (제안 — 확정되면 DECISIONS.md에 기록하고 이 절을 갱신)
- 사이트: Astro 또는 Next.js + MDX. 콘텐츠 중심이므로 Astro 우선 검토.
- 콘텐츠 저장: Git 저장소의 파일(MDX + frontmatter). 필요해지면 DB로 이동.
- 미디어: 로컬 또는 오브젝트 스토리지(Cloudflare R2, S3 등). 영상 용량 문제를 먼저 확인.
- 배포: 정적 배포(Vercel, Cloudflare Pages 등). private 콘텐츠는 빌드에서 제외.
- 모바일 빠른 입력 방식은 미정 (간단한 입력 폼, 노트 앱 연동, 음성 입력 등).

## 콘텐츠 스키마 (초안)
```yaml
# session
date: 2026-10-18
place: spot-slug
gear: [deck-slug]
skills: [push, ollie]
condition: "메모"
media: [media-id]
visibility: private

# post
title: ""
date: ""
tags: [culture, zen, experience]
links: { sessions: [], places: [], gear: [], references: [] }
visibility: public | private

# gear
name: ""
type: deck | trucks | wheels | bearings | shoes | other
bought_at: ""
since: ""

# place
name: ""
region: ""
note: ""

# reference
url: ""
title: ""
kind: app | website | book | article | video | scene
region: KR | US | JP | ...
note: "한 줄 메모"
tags: []
```

## 폴더 구조 (제안)
```
content/
  posts/  sessions/  gear/  places/  references/
media/            원본 (수정 금지)
```

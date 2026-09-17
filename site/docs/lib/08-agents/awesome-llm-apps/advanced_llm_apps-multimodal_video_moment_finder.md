---
title: "🎬 Multimodal Video Moment Finder"
sourceId: "08-agents/awesome-llm-apps"
sourceTitle: "Awesome LLM Apps"
sourceKind: "清单与速查"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "08-agents"
sourceUrl: "https://github.com/Shubhamsaboo/awesome-llm-apps"
entryUrl: "https://github.com/Shubhamsaboo/awesome-llm-apps/blob/9848ec842c5f559ad42654288cc6a38db6b175fb/advanced_llm_apps/multimodal_video_moment_finder/README.md"
sourceRel: "advanced_llm_apps/multimodal_video_moment_finder/README.md"
rawUrl: "/raw/08-agents/awesome-llm-apps/advanced_llm_apps/multimodal_video_moment_finder/README.md"
sourceSha256: "25f8c453a6e1725b815128ab57fca1f23e2f93ea187a85e29bc5671044f295ed"
pageSha256: "25f8c453a6e1725b815128ab57fca1f23e2f93ea187a85e29bc5671044f295ed"
contentMode: "local-full"
zh: ""
---

# 🎬 Multimodal Video Moment Finder

  <img src="/mirror/8f/8f8b5532176a786905e0673e9c253370b2263a82.png" alt="Multimodal Video Moment Finder" width="700">

Find any moment in a video using images or text. Drop a screenshot to find where it appears, or describe a scene in words. Pure visual matching, zero transcription.

Powered by **Gemini Embedding 2** for native cross-modal search.

## How It Works

1. **Upload a video** — frames are extracted at 1fps using ffmpeg
2. **Each frame is embedded** natively with `gemini-embedding-2-preview`
3. **Search by image** — embed your photo, cosine similarity against all frames
4. **Search by text** — embed your description, cross-modal match against frames
5. **Jump to the moment** — click any result to play the video at that timestamp

No transcription. No captions. No OCR. The embedding model understands visual content directly.

## Stack

- **Backend**: FastAPI + Gemini Embedding 2 + ChromaDB
- **Frontend**: Next.js (dark theme, split panel)
- **Frame extraction**: ffmpeg (1fps)
- **Frame descriptions**: Gemini 3 Flash
- **Models**: `gemini-embedding-2-preview` (embeddings), `gemini-3-flash-preview` (descriptions)

## Project Structure

```
advanced_llm_apps/multimodal_video_moment_finder/
├── backend/
│   ├── server.py           # FastAPI server with upload, search & video management endpoints
│   ├── video_store.py      # Video processing, frame extraction, embedding & ChromaDB storage
│   └── requirements.txt    # Python dependencies
├── frontend/
│   ├── app/
│   │   ├── page.tsx        # Main UI — video upload, image/text search, result playback
│   │   ├── layout.tsx      # Root layout
│   │   └── globals.css     # Global styles
│   ├── package.json
│   ├── next.config.ts
│   └── tsconfig.json
└── README.md
```

## Setup

### Prerequisites

- Python 3.10+
- Node.js 18+
- ffmpeg installed (`brew install ffmpeg` or `apt install ffmpeg`)
- [Google AI API key](https://aistudio.google.com/apikey)

### Backend

```bash
cd advanced_llm_apps/multimodal_video_moment_finder/backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt

export GOOGLE_API_KEY="your-api-key"
python server.py
```

Backend runs on `http://localhost:8890`.

### Frontend

```bash
cd advanced_llm_apps/multimodal_video_moment_finder/frontend
npm install
echo 'NEXT_PUBLIC_API_URL=http://localhost:8890' > .env.local
npm run dev
```

Frontend runs on `http://localhost:3000`.

## Usage

1. Open `http://localhost:3000`
2. Upload a video (any format ffmpeg supports)
3. Wait for frame extraction and embedding (1 frame/second)
4. Search:
   - **Image**: drop a screenshot or photo to find where it appears
   - **Text**: describe a scene ("person on stage", "aerial view of city")
5. Click any result to jump the video to that moment

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/upload-video` | Upload and index a video |
| POST | `/find-moment` | Search by image (multipart form) |
| POST | `/find-moment-text` | Search by text description |
| GET | `/videos` | List indexed videos |
| DELETE | `/videos/\{id\}` | Remove a video |
| GET | `/health` | Status check |

## Architecture

  <img src="/mirror/99/9919e1a4eee38b8f933b015bc3559fc92ae225ca.png" alt="Architecture Diagram" width="600">

## Key Insight

Gemini Embedding 2 embeds images and text into the same vector space natively. This means you can search for a visual moment using either another image or a text description, without any intermediate captioning or transcription step. The model understands what's in the frame directly.

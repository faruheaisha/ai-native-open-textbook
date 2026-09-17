---
title: "🎬 Video RAG with Gemini"
sourceId: "10-context-memory/ai-engineering-hub"
sourceTitle: "AI Engineering Hub"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/patchy631/ai-engineering-hub"
entryUrl: "https://github.com/patchy631/ai-engineering-hub/blob/2c9b106168d4540b88e727e4aa316c06c856c2b7/video-rag-gemini/README.md"
sourceRel: "video-rag-gemini/README.md"
rawUrl: "/raw/10-context-memory/ai-engineering-hub/video-rag-gemini/README.md"
sourceSha256: "ba23912ae4312f7c8fa0707a47ae2de573d7cf8fd980911d9062651d2a4389f8"
pageSha256: "ba23912ae4312f7c8fa0707a47ae2de573d7cf8fd980911d9062651d2a4389f8"
contentMode: "local-full"
zh: ""
---

# 🎬 Video RAG with Gemini

A Streamlit demo that allows you to upload videos and chat with them using Google's Gemini AI with multimodal capabilities.

## Features

- 📹 **Video Upload**: Support for multiple video formats (MP4, AVI, MOV, MKV, WEBM)
- 🤖 **AI-Powered Chat**: Ask questions about your video content using Gemini's advanced video understanding
- 💬 **Interactive Interface**: Clean chat interface with streaming responses
- 🔄 **Session Management**: Maintain chat history and video context
- ⚡ **Real-time Processing**: Upload and process videos with progress feedback

## Setup

1. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

2. **Get Gemini API Key**
   - Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
   - Create a new API key
   - Keep it secure - you'll enter it in the app

3. **Run the Application**
   ```bash
   streamlit run app.py
   ```

## Usage

1. **Enter API Key**: Input your Gemini API key in the sidebar
2. **Upload Video**: Choose a video file (supported formats listed above)
3. **Wait for Processing**: The video will be uploaded and processed by Gemini
4. **Start Chatting**: Ask questions about your video content!

## Example Questions

- "What is happening in this video?"
- "Summarize the main events"
- "Who are the people in this video?"
- "What objects can you see?"
- "Describe the setting and environment"
- "What actions are taking place?"

## Technical Details

- **Video Processing**: Uses Gemini's File API for video upload and processing
- **Multimodal AI**: Combines video understanding with natural language processing
- **File Size Limits**: Large files (>100MB) may take longer to process
- **Supported Formats**: MP4, AVI, MOV, MKV, WEBM

## Limitations

- Video processing time depends on file size and complexity
- Large files may fail to upload or process
- API rate limits may apply based on your Gemini API plan
- Some video formats may not be supported

## Troubleshooting

- **Upload Fails**: Check video format and file size
- **Processing Stuck**: Wait a few minutes, large files take time
- **API Errors**: Verify your API key is correct and has sufficient quota
- **No Response**: Try refreshing the page and re-uploading the video

## Built With

- [Streamlit](https://streamlit.io/) - Web app framework
- [Google Gemini API](https://ai.google.dev/gemini-api) - Multimodal AI capabilities
- [Python](https://python.org/) - Backend processing

---

*Part of the AI Engineering Hub - Building practical AI applications*

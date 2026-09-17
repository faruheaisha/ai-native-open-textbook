---
title: "Issue description"
sourceId: "08-agents/ed-donner-production"
sourceTitle: "AI in Production"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://github.com/ed-donner/production"
entryUrl: "https://github.com/ed-donner/production/blob/daeb3dae34be3287842ea7faa3e6f4cba467028b/community_contributions/streaming_error_fix_day2_vikas.md"
sourceRel: "community_contributions/streaming_error_fix_day2_vikas.md"
rawUrl: "/raw/08-agents/ed-donner-production/community_contributions/streaming_error_fix_day2_vikas.md"
sourceSha256: "5a80af0c2b43cfda35563fc318b596dbd7f4a22bba5ce7307b91a1005abac019"
pageSha256: "5a80af0c2b43cfda35563fc318b596dbd7f4a22bba5ce7307b91a1005abac019"
contentMode: "local-full"
zh: ""
---

# Issue description

I was trying to run day2 code solution Business Idea Generator. But the React UI application was failing at run time while trying process response stream from the OpenAI.

# Fix description

That error usually happens when the response stream is abruptly ended without a notification to the front-end application regarding end of stream, and the front-end application breaks anticipating for more data stream. 

As a solution, I updated event_stream() function and added try/finally block to return [DONE] at the end of stream response. Front-end application recognizes [DONE] and the connection is closed seamlessly instead terminating abruptly. This worked for me.

def event_stream():
        try:
            for chunk in stream:
                content = chunk.choices[0].delta.content
                if content:
                    
                    full_response.append(content)
                    lines = content.split("\n")
                    for line in lines[:-1]:
                        yield f"data: \{line\}\n\n"
                        yield "data:  \n"
                    yield f"data: \{lines[-1]\}\n\n"
        except Exception as e:
            logging.error(f"Error during streaming: \{str(e)\}")
            yield f"data: Error: \{str(e)\}\n\n"
        finally:
            yield "data: [DONE]\n\n"
            complete_response = ''.join(full_response)
            logging.info(f"Complete response: \{repr(complete_response)\}")
    return StreamingResponse(event_stream(), media_type="text/event-stream")

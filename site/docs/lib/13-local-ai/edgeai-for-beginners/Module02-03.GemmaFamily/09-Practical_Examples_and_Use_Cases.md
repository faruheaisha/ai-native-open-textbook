---
title: "EdgeAI for Beginners"
sourceId: "13-local-ai/edgeai-for-beginners"
sourceTitle: "EdgeAI for Beginners"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "13-local-ai"
sourceUrl: "https://github.com/microsoft/edgeai-for-beginners"
entryUrl: "https://github.com/microsoft/edgeai-for-beginners/blob/e88f123a4bb5796594919db3a13257c429d1288c/Module02/03.GemmaFamily.md"
sourceRel: "Module02/03.GemmaFamily.md"
rawUrl: "/raw/13-local-ai/edgeai-for-beginners/Module02/03.GemmaFamily.md"
sourceSha256: "a3bf4d27c85249d63d641ae400ed1815a0866c0bc33a21b849cda45ec2ca07a2"
pageSha256: "66cc45e6b8ebc7660d13e9991150f96bae530eb43eb5537537e291199e9a537e"
contentMode: "local-full"
zh: ""
---

## Practical Examples and Use Cases

Before diving into the technical details, let's explore some concrete examples of what Gemma models can accomplish:

### Multimodal Understanding Example

Gemma 3 can process both text and images simultaneously for comprehensive analysis:

```
User: [Image of a complex chart showing financial data] 
What trends can you identify in this quarterly revenue chart, and what might be causing the fluctuation in Q3?

Gemma 3: Looking at this quarterly revenue chart, I can identify several key patterns:

**Revenue Trends:**
1. **Steady Growth Pattern**: Q1 and Q2 show consistent upward trajectory with approximately 15% quarter-over-quarter growth
2. **Q3 Anomaly**: Notable dip of roughly 8% compared to Q2, breaking the growth pattern
3. **Q4 Recovery**: Strong rebound with 22% growth, reaching new highs

**Potential Q3 Factors:**
- **Seasonal Business Cycles**: Many industries experience summer slowdowns
- **Market Disruption**: Possible competitive pressure or economic uncertainty
- **Operational Changes**: Internal restructuring or supply chain adjustments
- **Product Lifecycle**: End-of-cycle for key products before Q4 launches

**Strategic Implications:**
The Q4 recovery suggests the Q3 dip was temporary rather than systemic, indicating resilient underlying business fundamentals with effective adaptation strategies.
```

### Multilingual Support Example

Gemma models demonstrate strong multilingual capabilities across 140+ languages:

```
User: Explain the concept of sustainable development in English, Spanish, and Chinese.

Gemma: **English:**
Sustainable development refers to meeting the needs of the present without compromising the ability of future generations to meet their own needs. It balances economic growth, environmental protection, and social equity to create long-term prosperity while preserving natural resources and ecosystems for future use.

**Español:**
El desarrollo sostenible se refiere a satisfacer las necesidades del presente sin comprometer la capacidad de las generaciones futuras para satisfacer sus propias necesidades. Equilibra el crecimiento económico, la protección ambiental y la equidad social para crear prosperidad a largo plazo mientras preserva los recursos naturales y ecosistemas para uso futuro.

**中文:**
可持续发展是指在满足当代人需求的同时，不损害后代满足其需求的能力。它平衡经济增长、环境保护和社会公平，创造长期繁荣，同时为未来使用保护自然资源和生态系统。
```

### Function Calling Example

Gemma 3 supports function calling for building natural language interfaces:

```python
# Example function definitions
available_functions = {
    "get_weather": {
        "description": "Get current weather for a location",
        "parameters": {
            "location": "string",
            "units": "string (optional, default: celsius)"
        }
    },
    "schedule_meeting": {
        "description": "Schedule a meeting with participants",
        "parameters": {
            "title": "string",
            "participants": "array of strings",
            "datetime": "ISO datetime string",
            "duration": "integer (minutes)"
        }
    }
}

User: "Can you check the weather in Tokyo and schedule a team meeting for tomorrow at 2 PM about project updates?"

Gemma 3: I'll help you with both tasks. Let me check the weather and schedule your meeting.

Function Calls:
1. get_weather(location="Tokyo", units="celsius")
2. schedule_meeting(
   title="Project Updates Team Meeting",
   participants=["user", "team"],
   datetime="2025-07-08T14:00:00",
   duration=60
)

Based on the results: Tokyo currently has partly cloudy weather at 24°C. Your project updates meeting has been scheduled for tomorrow (July 8th) at 2:00 PM for one hour. Meeting invitations will be sent to team participants.
```

### Mobile Deployment Example (Gemma 3n)

Gemma 3n is optimized for mobile and edge deployment with efficient memory usage:

```python
# Mobile-optimized inference with Gemma 3n
from transformers import AutoModelForCausalLM, AutoTokenizer
import torch

# Load Gemma 3n for mobile deployment
model = AutoModelForCausalLM.from_pretrained(
    "google/gemma-3n-E2B-it",
    torch_dtype=torch.float16,
    device_map="auto",
    load_in_8bit=True  # Further optimize for mobile
)

tokenizer = AutoTokenizer.from_pretrained("google/gemma-3n-E2B-it")

def mobile_inference(prompt, max_tokens=100):
    """Optimized inference for mobile devices"""
    inputs = tokenizer(
        prompt, 
        return_tensors="pt", 
        max_length=512, 
        truncation=True
    )
    
    with torch.no_grad():
        outputs = model.generate(
            **inputs,
            max_new_tokens=max_tokens,
            do_sample=True,
            temperature=0.7,
            early_stopping=True,
            pad_token_id=tokenizer.eos_token_id
        )
    
    response = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return response.replace(prompt, "").strip()

# Example mobile usage
user_query = "Quick summary of renewable energy benefits"
response = mobile_inference(user_query)
print(f"Mobile Response: {response}")
```

### Audio Processing Example (Gemma 3n)

Gemma 3n includes advanced audio capabilities for speech recognition and translation:

```python
# Audio processing with Gemma 3n
def process_audio_input(audio_file_path, task="transcribe", target_language="en"):
    """
    Process audio input for transcription or translation
    
    Args:
        audio_file_path: Path to audio file
        task: "transcribe" or "translate"
        target_language: Target language for translation
    """
    
    # Gemma 3n audio processing pipeline
    if task == "transcribe":
        prompt = f"<audio>{audio_file_path}</audio>\nTranscribe this audio:"
    elif task == "translate":
        prompt = f"<audio>{audio_file_path}</audio>\nTranslate this audio to {target_language}:"
    
    # Process with Gemma 3n
    inputs = tokenizer(prompt, return_tensors="pt")
    outputs = model.generate(**inputs, max_new_tokens=256)
    
    result = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return result.replace(prompt, "").strip()

# Example usage
# Transcribe Spanish audio to text
transcription = process_audio_input("spanish_audio.wav", task="transcribe")
print(f"Transcription: {transcription}")

# Translate Spanish speech to English text
translation = process_audio_input("spanish_audio.wav", task="translate", target_language="English")
print(f"Translation: {translation}")
```

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
pageSha256: "bc98ce519ad9c56f26d0621bb2be7af88d802b3d90402f1d6dade1a21a7a93c1"
contentMode: "local-full"
zh: ""
---

## Development and Integration Examples

### Quick Start with Transformers

Here's how to get started with Gemma models using the Hugging Face Transformers library:

```python
from transformers import AutoModelForCausalLM, AutoTokenizer
import torch

# Load Gemma 3-8B model
model_name = "google/gemma-3-8b-it"
model = AutoModelForCausalLM.from_pretrained(
    model_name,
    torch_dtype="auto",
    device_map="auto",
    trust_remote_code=True
)
tokenizer = AutoTokenizer.from_pretrained(model_name)

# Prepare conversation
messages = [
    {"role": "user", "content": "Explain quantum computing and its potential applications."}
]

# Generate response
input_text = tokenizer.apply_chat_template(
    messages,
    tokenize=False,
    add_generation_prompt=True
)

model_inputs = tokenizer([input_text], return_tensors="pt").to(model.device)
generated_ids = model.generate(
    **model_inputs,
    max_new_tokens=512,
    do_sample=True,
    temperature=0.7,
    top_p=0.9
)

# Extract and display response
output_ids = generated_ids[0][len(model_inputs.input_ids[0]):].tolist()
response = tokenizer.decode(output_ids, skip_special_tokens=True)
print(response)
```

### Multimodal Usage with Gemma 3

```python
from transformers import AutoProcessor, AutoModelForVision2Seq
from PIL import Image

# Load Gemma 3 vision model
model_name = "google/gemma-3-4b-it"
model = AutoModelForVision2Seq.from_pretrained(
    model_name,
    torch_dtype="auto",
    device_map="auto"
)
processor = AutoProcessor.from_pretrained(model_name)

# Process image and text input
image = Image.open("chart.jpg")
messages = [
    {
        "role": "user", 
        "content": [
            {"type": "image"},
            {"type": "text", "text": "Analyze this chart and explain the key trends you observe."}
        ]
    }
]

# Prepare inputs
text = processor.apply_chat_template(messages, tokenize=False, add_generation_prompt=True)
model_inputs = processor(text=text, images=image, return_tensors="pt").to(model.device)

# Generate multimodal response
generated_ids = model.generate(
    **model_inputs,
    max_new_tokens=512,
    do_sample=True,
    temperature=0.7
)

response = processor.decode(generated_ids[0], skip_special_tokens=True)
print(response)
```

### Function Calling Implementation

```python
import json

# Define available functions
functions = [
    {
        "name": "get_current_weather",
        "description": "Get the current weather in a given location",
        "parameters": {
            "type": "object",
            "properties": {
                "location": {"type": "string", "description": "City and state, e.g. San Francisco, CA"},
                "unit": {"type": "string", "enum": ["celsius", "fahrenheit"]}
            },
            "required": ["location"]
        }
    },
    {
        "name": "calculate_math",
        "description": "Perform mathematical calculations",
        "parameters": {
            "type": "object",
            "properties": {
                "expression": {"type": "string", "description": "Mathematical expression to evaluate"}
            },
            "required": ["expression"]
        }
    }
]

def gemma_function_calling(user_query, available_functions):
    """Implement function calling with Gemma 3"""
    
    # Create system prompt with function definitions
    system_prompt = f"""You are a helpful assistant with access to the following functions:

{json.dumps(available_functions, indent=2)}

When the user asks for something that requires a function call, respond with a JSON object containing:
- "function_name": the name of the function to call
- "parameters": the parameters to pass to the function

If no function call is needed, respond normally."""

    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": user_query}
    ]
    
    # Process with Gemma
    input_text = tokenizer.apply_chat_template(messages, tokenize=False, add_generation_prompt=True)
    model_inputs = tokenizer([input_text], return_tensors="pt").to(model.device)
    
    generated_ids = model.generate(
        **model_inputs,
        max_new_tokens=256,
        temperature=0.3  # Lower temperature for more structured output
    )
    
    response = tokenizer.decode(generated_ids[0][len(model_inputs.input_ids[0]):], skip_special_tokens=True)
    
    # Parse function call if present
    try:
        function_call = json.loads(response.strip())
        if "function_name" in function_call:
            return function_call
    except json.JSONDecodeError:
        pass
    
    return {"response": response}

# Example usage
user_request = "What's the weather like in Tokyo and calculate 15% of 850"
result = gemma_function_calling(user_request, functions)
print(result)
```

### 📱 Mobile Deployment with Gemma 3n

```python
# Optimized mobile deployment
from transformers import AutoModelForCausalLM, AutoTokenizer
import torch

class MobileGemmaService:
    """Optimized Gemma 3n service for mobile deployment"""
    
    def __init__(self, model_name="google/gemma-3n-E2B-it"):
        self.model_name = model_name
        self.model = None
        self.tokenizer = None
        self._load_optimized_model()
    
    def _load_optimized_model(self):
        """Load model with mobile optimizations"""
        self.tokenizer = AutoTokenizer.from_pretrained(self.model_name)
        
        # Load with optimizations for mobile
        self.model = AutoModelForCausalLM.from_pretrained(
            self.model_name,
            torch_dtype=torch.float16,
            device_map="auto",
            load_in_8bit=True,  # Quantization for efficiency
            low_cpu_mem_usage=True,
            trust_remote_code=True
        )
        
        # Optimize for inference
        self.model.eval()
        if torch.cuda.is_available():
            self.model = torch.jit.trace(self.model, example_inputs=...)  # JIT optimization
    
    def mobile_chat(self, user_input, max_tokens=150):
        """Optimized chat for mobile devices"""
        messages = [{"role": "user", "content": user_input}]
        
        input_text = self.tokenizer.apply_chat_template(
            messages,
            tokenize=False,
            add_generation_prompt=True,
            max_length=512,
            truncation=True
        )
        
        inputs = self.tokenizer(input_text, return_tensors="pt", max_length=512, truncation=True)
        
        with torch.no_grad():
            outputs = self.model.generate(
                **inputs,
                max_new_tokens=max_tokens,
                do_sample=True,
                temperature=0.7,
                top_p=0.9,
                early_stopping=True,
                pad_token_id=self.tokenizer.eos_token_id
            )
        
        response = self.tokenizer.decode(outputs[0], skip_special_tokens=True)
        return response.replace(input_text, "").strip()
    
    def process_audio(self, audio_path, task="transcribe"):
        """Process audio input with Gemma 3n"""
        if task == "transcribe":
            prompt = f"<audio>{audio_path}</audio>\nTranscribe:"
        elif task == "translate":
            prompt = f"<audio>{audio_path}</audio>\nTranslate to English:"
        
        inputs = self.tokenizer(prompt, return_tensors="pt")
        
        with torch.no_grad():
            outputs = self.model.generate(
                **inputs,
                max_new_tokens=200,
                temperature=0.3
            )
        
        result = self.tokenizer.decode(outputs[0], skip_special_tokens=True)
        return result.replace(prompt, "").strip()

# Initialize mobile service
mobile_gemma = MobileGemmaService()

# Example mobile usage
quick_response = mobile_gemma.mobile_chat("Summarize renewable energy benefits in 2 sentences")
print(f"Mobile Response: {quick_response}")

# Audio processing example
# audio_transcript = mobile_gemma.process_audio("voice_note.wav", task="transcribe")
# print(f"Audio Transcript: {audio_transcript}")
```

### API Deployment with vLLM

```python
from vllm import LLM, SamplingParams
import asyncio
from typing import List, Dict

class GemmaAPIService:
    """High-performance Gemma API service using vLLM"""
    
    def __init__(self, model_name="google/gemma-3-8b-it"):
        self.llm = LLM(
            model=model_name,
            tensor_parallel_size=1,
            gpu_memory_utilization=0.8,
            trust_remote_code=True
        )
        
        self.sampling_params = SamplingParams(
            temperature=0.7,
            top_p=0.9,
            max_tokens=512,
            stop_token_ids=[self.llm.get_tokenizer().eos_token_id]
        )
    
    def format_messages(self, messages: List[Dict[str, str]]) -> str:
        """Format messages for API processing"""
        tokenizer = self.llm.get_tokenizer()
        return tokenizer.apply_chat_template(
            messages,
            tokenize=False,
            add_generation_prompt=True
        )
    
    async def generate_batch(self, batch_messages: List[List[Dict[str, str]]]) -> List[str]:
        """Generate responses for batch of conversations"""
        formatted_prompts = [self.format_messages(messages) for messages in batch_messages]
        
        # Generate responses
        outputs = self.llm.generate(formatted_prompts, self.sampling_params)
        
        # Extract responses
        responses = []
        for output in outputs:
            response = output.outputs[0].text.strip()
            responses.append(response)
        
        return responses
    
    async def stream_generate(self, messages: List[Dict[str, str]]):
        """Stream generation for real-time applications"""
        formatted_prompt = self.format_messages(messages)
        
        # Note: vLLM streaming implementation would go here
        # This is a simplified example
        outputs = self.llm.generate([formatted_prompt], self.sampling_params)
        response = outputs[0].outputs[0].text
        
        # Simulate streaming by yielding chunks
        words = response.split()
        for i in range(0, len(words), 3):  # Yield 3 words at a time
            chunk = " ".join(words[i:i+3])
            yield chunk
            await asyncio.sleep(0.1)  # Simulate streaming delay

# Example API usage
async def api_example():
    api_service = GemmaAPIService()
    
    # Batch processing
    batch_conversations = [
        [{"role": "user", "content": "Explain machine learning briefly"}],
        [{"role": "user", "content": "What are the benefits of renewable energy?"}],
        [{"role": "user", "content": "How does photosynthesis work?"}]
    ]
    
    responses = await api_service.generate_batch(batch_conversations)
    for i, response in enumerate(responses):
        print(f"Response {i+1}: {response}")
    
    # Streaming example
    print("\nStreaming response:")
    stream_messages = [{"role": "user", "content": "Write a short story about AI and humans working together"}]
    async for chunk in api_service.stream_generate(stream_messages):
        print(chunk, end=" ", flush=True)

# Run API example
# asyncio.run(api_example())
```

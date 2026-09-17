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
pageSha256: "5011bf166b3eee4390261bca7463b01cf4a5ffd3506c3f2fb3fdbfd1058a7e60"
contentMode: "local-full"
zh: ""
---

## Advanced Usage Patterns

### Fine-tuning Examples

```python
from transformers import AutoModelForCausalLM, AutoTokenizer, TrainingArguments
from peft import LoraConfig, get_peft_model
from trl import SFTTrainer
from datasets import load_dataset
import torch

# Load Gemma model for fine-tuning
model_name = "google/gemma-3-8b-it"
model = AutoModelForCausalLM.from_pretrained(
    model_name,
    torch_dtype=torch.bfloat16,
    device_map="auto",
    trust_remote_code=True
)

tokenizer = AutoTokenizer.from_pretrained(model_name)
tokenizer.pad_token = tokenizer.eos_token

# Configure LoRA for efficient fine-tuning
peft_config = LoraConfig(
    r=16,
    lora_alpha=32,
    lora_dropout=0.1,
    bias="none",
    task_type="CAUSAL_LM",
    target_modules=["q_proj", "k_proj", "v_proj", "o_proj", "gate_proj", "up_proj", "down_proj"]
)

# Apply LoRA to model
model = get_peft_model(model, peft_config)

# Training configuration optimized for Gemma
training_args = TrainingArguments(
    output_dir="./gemma-finetuned",
    learning_rate=2e-5,
    per_device_train_batch_size=2,
    gradient_accumulation_steps=8,
    num_train_epochs=3,
    warmup_steps=100,
    logging_steps=10,
    save_steps=500,
    evaluation_strategy="steps",
    eval_steps=500,
    bf16=True,
    remove_unused_columns=False,
    dataloader_pin_memory=False
)

def format_gemma_instruction(example):
    """Format instruction for Gemma chat template"""
    messages = [
        {"role": "user", "content": example['instruction']},
        {"role": "assistant", "content": example['output']}
    ]
    return {"text": tokenizer.apply_chat_template(messages, tokenize=False)}

# Load and prepare dataset
dataset = load_dataset("your-custom-dataset")
dataset = dataset.map(format_gemma_instruction, remove_columns=dataset["train"].column_names)

# Initialize trainer
trainer = SFTTrainer(
    model=model,
    args=training_args,
    train_dataset=dataset["train"],
    eval_dataset=dataset["validation"],
    tokenizer=tokenizer,
    max_seq_length=2048,
    packing=True
)

# Start fine-tuning
trainer.train()

# Save the fine-tuned model
model.save_pretrained("./gemma-custom-model")
tokenizer.save_pretrained("./gemma-custom-model")
```

### Specialized Prompt Engineering

**For Multimodal Tasks:**
```python
def create_multimodal_prompt(text_query, image_description="", task_type="analysis"):
    """Create structured prompt for multimodal tasks"""
    
    if task_type == "analysis":
        system_msg = """You are Gemma, an AI assistant with advanced vision capabilities. 
        When analyzing images, provide detailed, accurate descriptions and insights.
        Structure your analysis with clear sections for visual elements, context, and implications."""
    
    elif task_type == "comparison":
        system_msg = """You are Gemma, an AI assistant specialized in visual comparison tasks.
        Compare images systematically, highlighting similarities, differences, and key insights.
        Organize your comparison with clear categories and specific observations."""
    
    messages = [
        {"role": "system", "content": system_msg},
        {
            "role": "user", 
            "content": [
                {"type": "image"},
                {"type": "text", "text": f"{text_query}\n\nAdditional context: {image_description}"}
            ]
        }
    ]
    
    return messages

# Example usage for image analysis
analysis_prompt = create_multimodal_prompt(
    "Analyze this business chart and identify key trends, patterns, and actionable insights.",
    "This appears to be a quarterly revenue chart spanning 2 years",
    task_type="analysis"
)
```

**For Function Calling with Context:**
```python
def create_function_calling_prompt(user_query, available_functions, context=""):
    """Create structured prompt for function calling with Gemma 3"""
    
    function_descriptions = []
    for func in available_functions:
        func_desc = f"- {func['name']}: {func['description']}"
        if 'parameters' in func:
            params = ", ".join([f"{k} ({v.get('type', 'string')})" 
                              for k, v in func['parameters'].get('properties', {}).items()])
            func_desc += f"\n  Parameters: {params}"
        function_descriptions.append(func_desc)
    
    system_prompt = f"""You are Gemma, an AI assistant with access to specific functions.

Available Functions:
{chr(10).join(function_descriptions)}

When a user request requires function calls:
1. Identify which function(s) to use
2. Extract appropriate parameters from the user's request
3. Respond with function calls in this format:
   FUNCTION_CALL: function_name(param1="value1", param2="value2")

If multiple functions are needed, list them separately.
If no function is needed, respond normally.

{f"Context: {context}" if context else ""}"""

    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": user_query}
    ]
    
    return messages

# Example function definitions
weather_functions = [
    {
        "name": "get_weather_forecast",
        "description": "Get weather forecast for a specific location and time period",
        "parameters": {
            "properties": {
                "location": {"type": "string", "description": "City and country"},
                "days": {"type": "integer", "description": "Number of days (1-7)"},
                "units": {"type": "string", "description": "Temperature units (celsius/fahrenheit)"}
            }
        }
    },
    {
        "name": "get_weather_alerts",
        "description": "Get current weather alerts and warnings",
        "parameters": {
            "properties": {
                "location": {"type": "string", "description": "City and country"},
                "severity": {"type": "string", "description": "Minimum alert severity"}
            }
        }
    }
]

# Create function calling prompt
user_request = "I'm traveling to Tokyo next week. Can you check the 5-day weather forecast and any severe weather warnings?"
prompt = create_function_calling_prompt(user_request, weather_functions)
```

### Multilingual Applications with Cultural Context

```python
def create_culturally_aware_prompt(query, target_cultures, response_style="formal"):
    """Create prompts that consider cultural context"""
    
    cultural_guidelines = {
        "japanese": "Use respectful honorifics, avoid direct confrontation, emphasize group harmony",
        "american": "Be direct and practical, focus on individual benefits, use casual tone",
        "german": "Be precise and thorough, provide detailed explanations, maintain professionalism",
        "brazilian": "Be warm and personable, use inclusive language, consider social aspects",
        "indian": "Show respect for hierarchy, consider diverse regional perspectives, be comprehensive"
    }
    
    style_instructions = {
        "formal": "Use professional language, proper grammar, and respectful tone",
        "casual": "Use conversational language while remaining informative",
        "educational": "Explain concepts clearly with examples and context"
    }
    
    cultural_notes = []
    for culture in target_cultures:
        if culture.lower() in cultural_guidelines:
            cultural_notes.append(f"For {culture} audience: {cultural_guidelines[culture.lower()]}")
    
    system_prompt = f"""You are Gemma, a culturally-aware AI assistant. Provide responses that are 
    appropriate for different cultural contexts while maintaining accuracy and helpfulness.

    Response Style: {style_instructions.get(response_style, style_instructions['formal'])}
    
    Cultural Considerations:
    {chr(10).join(cultural_notes)}
    
    Provide your response in the requested languages with cultural appropriateness."""

    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": query}
    ]
    
    return messages

# Example culturally-aware usage
multicultural_query = """Explain the concept of work-life balance and provide practical advice 
for maintaining it. Please provide responses suitable for Japanese and American workplace cultures."""

culturally_aware_prompt = create_culturally_aware_prompt(
    multicultural_query, 
    target_cultures=["Japanese", "American"],
    response_style="educational"
)
```

### Production Deployment Patterns

```python
import asyncio
import logging
from typing import List, Dict, Optional, Union
from dataclasses import dataclass
import torch
from transformers import AutoModelForCausalLM, AutoTokenizer
from PIL import Image
import time

@dataclass
class GenerationConfig:
    max_tokens: int = 512
    temperature: float = 0.7
    top_p: float = 0.9
    repetition_penalty: float = 1.05
    do_sample: bool = True

@dataclass
class MultimodalInput:
    text: str
    images: Optional[List[Union[str, Image.Image]]] = None
    audio_path: Optional[str] = None

class ProductionGemmaService:
    """Production-ready Gemma service with multimodal support"""
    
    def __init__(self, model_name: str, device: str = "auto", enable_multimodal: bool = True):
        self.model_name = model_name
        self.device = device
        self.enable_multimodal = enable_multimodal
        self.model = None
        self.tokenizer = None
        self.processor = None
        self.logger = self._setup_logging()
        self._load_model()
    
    def _setup_logging(self):
        """Setup production logging"""
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
        )
        return logging.getLogger(f"GemmaService-{self.model_name}")
    
    def _load_model(self):
        """Load model and tokenizer with error handling"""
        try:
            self.logger.info(f"Loading model: {self.model_name}")
            
            self.tokenizer = AutoTokenizer.from_pretrained(
                self.model_name,
                trust_remote_code=True
            )
            
            if self.enable_multimodal and "gemma-3" in self.model_name.lower():
                # Load multimodal variant
                from transformers import AutoProcessor
                self.processor = AutoProcessor.from_pretrained(self.model_name)
                
                self.model = AutoModelForCausalLM.from_pretrained(
                    self.model_name,
                    torch_dtype=torch.bfloat16,
                    device_map=self.device,
                    trust_remote_code=True,
                    low_cpu_mem_usage=True
                )
            else:
                # Load text-only model
                self.model = AutoModelForCausalLM.from_pretrained(
                    self.model_name,
                    torch_dtype=torch.bfloat16,
                    device_map=self.device,
                    trust_remote_code=True,
                    low_cpu_mem_usage=True
                )
            
            # Optimize for inference
            self.model.eval()
            self.logger.info("Model loaded successfully")
            
        except Exception as e:
            self.logger.error(f"Failed to load model: {str(e)}")
            raise
    
    def _prepare_multimodal_input(self, multimodal_input: MultimodalInput) -> Dict:
        """Prepare multimodal input for processing"""
        if not self.enable_multimodal or not self.processor:
            # Text-only processing
            return {"text": multimodal_input.text}
        
        inputs = {"text": multimodal_input.text}
        
        if multimodal_input.images:
            # Process images
            processed_images = []
            for img in multimodal_input.images:
                if isinstance(img, str):
                    img = Image.open(img)
                processed_images.append(img)
            inputs["images"] = processed_images
        
        if multimodal_input.audio_path:
            # Process audio (Gemma 3n specific)
            inputs["audio"] = multimodal_input.audio_path
        
        return inputs
    
    async def generate_async(
        self, 
        messages: List[Dict[str, str]], 
        config: GenerationConfig = GenerationConfig(),
        multimodal_input: Optional[MultimodalInput] = None
    ) -> str:
        """Async generation with multimodal support"""
        
        start_time = time.time()
        
        try:
            if multimodal_input and self.enable_multimodal:
                # Multimodal processing
                processed_input = self._prepare_multimodal_input(multimodal_input)
                
                if self.processor:
                    # Use processor for multimodal input
                    text = self.processor.apply_chat_template(
                        messages, 
                        tokenize=False, 
                        add_generation_prompt=True
                    )
                    
                    model_inputs = self.processor(
                        text=text,
                        images=processed_input.get("images"),
                        return_tensors="pt"
                    ).to(self.model.device)
                else:
                    # Fallback to text-only
                    formatted_text = self.tokenizer.apply_chat_template(
                        messages,
                        tokenize=False,
                        add_generation_prompt=True
                    )
                    model_inputs = self.tokenizer(
                        formatted_text,
                        return_tensors="pt"
                    ).to(self.model.device)
            else:
                # Text-only processing
                formatted_text = self.tokenizer.apply_chat_template(
                    messages,
                    tokenize=False,
                    add_generation_prompt=True
                )
                model_inputs = self.tokenizer(
                    formatted_text,
                    return_tensors="pt",
                    truncation=True,
                    max_length=4096
                ).to(self.model.device)
            
            # Generate response
            with torch.no_grad():
                outputs = await asyncio.get_event_loop().run_in_executor(
                    None,
                    lambda: self.model.generate(
                        **model_inputs,
                        max_new_tokens=config.max_tokens,
                        temperature=config.temperature,
                        top_p=config.top_p,
                        repetition_penalty=config.repetition_penalty,
                        do_sample=config.do_sample,
                        pad_token_id=self.tokenizer.eos_token_id
                    )
                )
            
            # Extract generated text
            if self.processor and multimodal_input:
                generated_text = self.processor.decode(
                    outputs[0][model_inputs["input_ids"].shape[1]:],
                    skip_special_tokens=True
                )
            else:
                generated_text = self.tokenizer.decode(
                    outputs[0][model_inputs["input_ids"].shape[1]:],
                    skip_special_tokens=True
                )
            
            generation_time = time.time() - start_time
            self.logger.info(f"Generation completed in {generation_time:.2f}s")
            
            return generated_text.strip()
            
        except Exception as e:
            self.logger.error(f"Generation failed: {str(e)}")
            raise
    
    def health_check(self) -> Dict[str, Union[str, bool, float]]:
        """Comprehensive health check"""
        health_status = {
            "status": "healthy",
            "model_loaded": False,
            "multimodal_enabled": self.enable_multimodal,
            "response_time": None,
            "memory_usage": None,
            "errors": []
        }
        
        try:
            # Check if model is loaded
            if self.model is not None and self.tokenizer is not None:
                health_status["model_loaded"] = True
            else:
                health_status["errors"].append("Model not properly loaded")
                health_status["status"] = "unhealthy"
                return health_status
            
            # Test basic functionality
            start_time = time.time()
            test_messages = [{"role": "user", "content": "Hello"}]
            
            # Synchronous test for health check
            formatted_text = self.tokenizer.apply_chat_template(
                test_messages,
                tokenize=False,
                add_generation_prompt=True
            )
            
            inputs = self.tokenizer(formatted_text, return_tensors="pt").to(self.model.device)
            
            with torch.no_grad():
                outputs = self.model.generate(
                    **inputs,
                    max_new_tokens=10,
                    do_sample=False,
                    pad_token_id=self.tokenizer.eos_token_id
                )
            
            response_time = time.time() - start_time
            health_status["response_time"] = response_time
            
            # Check memory usage
            if torch.cuda.is_available():
                memory_used = torch.cuda.memory_allocated() / 1024 / 1024  # MB
                health_status["memory_usage"] = memory_used
            
            # Evaluate response time
            if response_time > 5.0:  # seconds
                health_status["errors"].append("Response time exceeds threshold")
                health_status["status"] = "degraded"
            
        except Exception as e:
            health_status["status"] = "unhealthy"
            health_status["errors"].append(f"Health check failed: {str(e)}")
        
        return health_status

# Example production usage
async def production_example():
    # Initialize production service
    gemma_service = ProductionGemmaService(
        model_name="google/gemma-3-8b-it",
        enable_multimodal=True
    )
    
    # Health check
    health = gemma_service.health_check()
    print(f"Service Health: {health}")
    
    if health["status"] != "healthy":
        print("Service not healthy, aborting")
        return
    
    # Text-only generation
    text_messages = [
        {"role": "user", "content": "Explain the importance of sustainable development"}
    ]
    
    response = await gemma_service.generate_async(text_messages)
    print(f"Text Response: {response}")
    
    # Multimodal generation (if supported)
    if gemma_service.enable_multimodal:
        multimodal_messages = [
            {
                "role": "user", 
                "content": [
                    {"type": "image"},
                    {"type": "text", "text": "Describe what you see in this image and explain its significance"}
                ]
            }
        ]
        
        # Example with image
        multimodal_input = MultimodalInput(
            text="Analyze this business chart",
            images=["path/to/chart.jpg"]
        )
        
        multimodal_response = await gemma_service.generate_async(
            multimodal_messages,
            multimodal_input=multimodal_input
        )
        print(f"Multimodal Response: {multimodal_response}")

# Run production example
# asyncio.run(production_example())
```

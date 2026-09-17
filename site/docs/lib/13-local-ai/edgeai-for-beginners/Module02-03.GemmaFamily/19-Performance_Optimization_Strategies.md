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
pageSha256: "52a59ccfcc352354caed7b208e07bab9981788fe856792fcaba18738064903f3"
contentMode: "local-full"
zh: ""
---

## Performance Optimization Strategies

### Memory Optimization

```python
from transformers import AutoModelForCausalLM, BitsAndBytesConfig
import torch

# Memory-efficient loading strategies for Gemma models
def load_optimized_gemma(model_name, optimization_level="balanced"):
    """Load Gemma with various optimization levels"""
    
    if optimization_level == "maximum_efficiency":
        # 4-bit quantization for maximum memory efficiency
        quantization_config = BitsAndBytesConfig(
            load_in_4bit=True,
            bnb_4bit_compute_dtype=torch.bfloat16,
            bnb_4bit_use_double_quant=True,
            bnb_4bit_quant_type="nf4"
        )
        
        model = AutoModelForCausalLM.from_pretrained(
            model_name,
            quantization_config=quantization_config,
            device_map="auto",
            low_cpu_mem_usage=True,
            trust_remote_code=True
        )
        
    elif optimization_level == "balanced":
        # 8-bit quantization for balanced performance
        quantization_config = BitsAndBytesConfig(
            load_in_8bit=True,
            llm_int8_threshold=6.0,
        )
        
        model = AutoModelForCausalLM.from_pretrained(
            model_name,
            quantization_config=quantization_config,
            device_map="auto",
            torch_dtype=torch.bfloat16,
            trust_remote_code=True
        )
        
    elif optimization_level == "performance":
        # Full precision for maximum performance
        model = AutoModelForCausalLM.from_pretrained(
            model_name,
            device_map="auto",
            torch_dtype=torch.bfloat16,
            trust_remote_code=True
        )
    
    return model

# Example usage
efficient_model = load_optimized_gemma("google/gemma-3-8b-it", "maximum_efficiency")
```

### Inference Optimization

```python
import torch
from torch.nn.attention import SDPABackend, sdpa_kernel
from transformers import AutoTokenizer
import time

class OptimizedGemmaInference:
    """Optimized inference class for Gemma models"""
    
    def __init__(self, model, tokenizer):
        self.model = model
        self.tokenizer = tokenizer
        self._setup_optimizations()
    
    def _setup_optimizations(self):
        """Configure various inference optimizations"""
        
        # Enable optimized attention mechanisms
        if torch.cuda.is_available():
            torch.backends.cuda.enable_flash_sdp(True)
            torch.backends.cuda.enable_math_sdp(True)
            torch.backends.cuda.enable_mem_efficient_sdp(True)
        
        # Set optimal threading for CPU operations
        torch.set_num_threads(min(8, torch.get_num_threads()))
        
        # Enable JIT compilation for repeated patterns
        if hasattr(torch.jit, 'set_fusion_strategy'):
            torch.jit.set_fusion_strategy([('STATIC', 3), ('DYNAMIC', 20)])
        
        # Optimize model for inference
        self.model.eval()
        
        # Enable torch.compile if available (PyTorch 2.0+)
        if hasattr(torch, 'compile'):
            try:
                self.model = torch.compile(self.model, mode="reduce-overhead")
            except Exception as e:
                print(f"Torch compile failed: {e}")
    
    def fast_generate(self, messages, max_tokens=256, use_cache=True):
        """Optimized generation with various performance enhancements"""
        
        start_time = time.time()
        
        # Format input
        formatted_text = self.tokenizer.apply_chat_template(
            messages,
            tokenize=False,
            add_generation_prompt=True
        )
        
        inputs = self.tokenizer(
            formatted_text,
            return_tensors="pt",
            truncation=True,
            max_length=2048
        ).to(self.model.device)
        
        # Use optimized attention backend
        with torch.no_grad():
            if torch.cuda.is_available():
                with sdpa_kernel(SDPABackend.FLASH_ATTENTION):
                    outputs = self.model.generate(
                        **inputs,
                        max_new_tokens=max_tokens,
                        do_sample=True,
                        temperature=0.7,
                        top_p=0.9,
                        use_cache=use_cache,
                        pad_token_id=self.tokenizer.eos_token_id,
                        early_stopping=True
                    )
            else:
                outputs = self.model.generate(
                    **inputs,
                    max_new_tokens=max_tokens,
                    do_sample=True,
                    temperature=0.7,
                    top_p=0.9,
                    use_cache=use_cache,
                    pad_token_id=self.tokenizer.eos_token_id,
                    early_stopping=True
                )
        
        # Extract response
        response = self.tokenizer.decode(
            outputs[0][inputs.input_ids.shape[1]:],
            skip_special_tokens=True
        )
        
        generation_time = time.time() - start_time
        tokens_generated = outputs.shape[1] - inputs.input_ids.shape[1]
        tokens_per_second = tokens_generated / generation_time if generation_time > 0 else 0
        
        return {
            "response": response.strip(),
            "generation_time": generation_time,
            "tokens_per_second": tokens_per_second,
            "tokens_generated": tokens_generated
        }
    
    def batch_generate(self, batch_messages, max_tokens=256):
        """Optimized batch generation"""
        
        # Format all inputs
        formatted_texts = []
        for messages in batch_messages:
            formatted_text = self.tokenizer.apply_chat_template(
                messages,
                tokenize=False,
                add_generation_prompt=True
            )
            formatted_texts.append(formatted_text)
        
        # Tokenize batch with padding
        inputs = self.tokenizer(
            formatted_texts,
            return_tensors="pt",
            padding=True,
            truncation=True,
            max_length=2048
        ).to(self.model.device)
        
        start_time = time.time()
        
        with torch.no_grad():
            outputs = self.model.generate(
                **inputs,
                max_new_tokens=max_tokens,
                do_sample=True,
                temperature=0.7,
                top_p=0.9,
                use_cache=True,
                pad_token_id=self.tokenizer.eos_token_id,
                early_stopping=True
            )
        
        # Extract all responses
        responses = []
        for i, output in enumerate(outputs):
            response = self.tokenizer.decode(
                output[inputs.input_ids[i].shape[0]:],
                skip_special_tokens=True
            )
            responses.append(response.strip())
        
        generation_time = time.time() - start_time
        
        return {
            "responses": responses,
            "batch_generation_time": generation_time,
            "average_time_per_item": generation_time / len(batch_messages)
        }

# Example usage
tokenizer = AutoTokenizer.from_pretrained("google/gemma-3-8b-it")
model = load_optimized_gemma("google/gemma-3-8b-it", "balanced")

optimized_inference = OptimizedGemmaInference(model, tokenizer)

# Single optimized generation
test_messages = [{"role": "user", "content": "Explain machine learning in simple terms"}]
result = optimized_inference.fast_generate(test_messages)
print(f"Response: {result['response']}")
print(f"Speed: {result['tokens_per_second']:.1f} tokens/second")
```

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
entryUrl: "https://github.com/microsoft/edgeai-for-beginners/blob/e88f123a4bb5796594919db3a13257c429d1288c/Module02/04.BitNETFamily.md"
sourceRel: "Module02/04.BitNETFamily.md"
rawUrl: "/raw/13-local-ai/edgeai-for-beginners/Module02/04.BitNETFamily.md"
sourceSha256: "1822b91fcf2934caf01d104dbd3afb8f5ca1e88edd8b7e380c8924690ce1f7fc"
pageSha256: "d88cc0281cf7c354ff62984476610ecd1b20673d31c4b634bb0cbb7b1f138e27"
contentMode: "local-full"
zh: ""
---

## Development and Integration Examples

### Quick Start with Transformers

Here's how to get started with BitNET models using the Hugging Face Transformers library:

```python
from transformers import AutoModelForCausalLM, AutoTokenizer
import torch

# Load BitNET b1.58 2B model
model_name = "microsoft/bitnet-b1.58-2B-4T"
model = AutoModelForCausalLM.from_pretrained(
    model_name,
    torch_dtype=torch.bfloat16,
    device_map="auto",
    trust_remote_code=True
)
tokenizer = AutoTokenizer.from_pretrained(model_name)

# Prepare conversation
messages = [
    {"role": "user", "content": "Explain the advantages of 1-bit neural networks and their potential impact on AI deployment."}
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
    top_p=0.9,
    repetition_penalty=1.05
)

# Extract and display response
output_ids = generated_ids[0][len(model_inputs.input_ids[0]):].tolist()
response = tokenizer.decode(output_ids, skip_special_tokens=True)
print(response)
```

### ⚡ High-Performance Deployment with bitnet.cpp

```python
import subprocess
import json
import os
from typing import Dict, List, Optional

class BitNetCppService:
    """High-performance BitNET service using bitnet.cpp"""
    
    def __init__(self, model_path: str = "models/BitNet-b1.58-2B-4T/ggml-model-i2_s.gguf"):
        self.model_path = model_path
        self.bitnet_executable = "run_inference.py"
        self._verify_setup()
    
    def _verify_setup(self):
        """Verify bitnet.cpp setup and model availability"""
        if not os.path.exists(self.model_path):
            raise FileNotFoundError(f"BitNET model not found at {self.model_path}")
        
        if not os.path.exists(self.bitnet_executable):
            raise FileNotFoundError("bitnet.cpp inference script not found")
    
    def generate_text(
        self,
        prompt: str,
        max_tokens: int = 256,
        temperature: float = 0.7,
        conversation_mode: bool = True
    ) -> Dict[str, any]:
        """Generate text using optimized bitnet.cpp"""
        
        cmd = [
            "python", self.bitnet_executable,
            "-m", self.model_path,
            "-p", prompt,
            "-n", str(max_tokens),
            "-temp", str(temperature),
            "-t", "4"  # threads
        ]
        
        if conversation_mode:
            cmd.append("-cnv")
        
        try:
            start_time = time.time()
            result = subprocess.run(
                cmd,
                capture_output=True,
                text=True,
                timeout=60
            )
            
            generation_time = time.time() - start_time
            
            if result.returncode == 0:
                return {
                    "success": True,
                    "response": result.stdout.strip(),
                    "generation_time": generation_time,
                    "tokens_per_second": max_tokens / generation_time if generation_time > 0 else 0,
                    "framework": "bitnet.cpp",
                    "optimized": True
                }
            else:
                return {
                    "success": False,
                    "error": result.stderr,
                    "generation_time": generation_time
                }
                
        except subprocess.TimeoutExpired:
            return {
                "success": False,
                "error": "Generation timed out",
                "timeout": True
            }
        except Exception as e:
            return {
                "success": False,
                "error": str(e)
            }
    
    def benchmark_performance(
        self,
        test_prompts: List[str],
        num_runs: int = 3
    ) -> Dict[str, any]:
        """Comprehensive performance benchmarking"""
        
        results = []
        total_tokens = 0
        total_time = 0
        
        for run in range(num_runs):
            run_results = []
            run_start = time.time()
            
            for prompt in test_prompts:
                result = self.generate_text(prompt, max_tokens=100)
                if result["success"]:
                    run_results.append(result)
                    total_tokens += 100  # approximate
            
            run_time = time.time() - run_start
            total_time += run_time
            results.extend(run_results)
        
        successful_runs = [r for r in results if r["success"]]
        
        if not successful_runs:
            return {"error": "No successful generations"}
        
        avg_generation_time = sum(r["generation_time"] for r in successful_runs) / len(successful_runs)
        avg_tokens_per_second = sum(r["tokens_per_second"] for r in successful_runs) / len(successful_runs)
        
        return {
            "framework": "bitnet.cpp",
            "total_runs": len(results),
            "successful_runs": len(successful_runs),
            "success_rate": len(successful_runs) / len(results),
            "average_generation_time": avg_generation_time,
            "average_tokens_per_second": avg_tokens_per_second,
            "total_tokens_generated": total_tokens,
            "efficiency_rating": "ultra-high",
            "memory_footprint_mb": 400,  # BitNET 2B approximate
            "energy_efficiency": "55-82% reduction vs full-precision"
        }

# Example bitnet.cpp usage
def bitnet_cpp_example():
    """Example of using BitNET with optimized inference"""
    
    try:
        service = BitNetCppService()
        
        # Single generation
        prompt = "Explain the revolutionary impact of 1-bit neural networks on AI deployment"
        result = service.generate_text(prompt)
        
        if result["success"]:
            print(f"BitNET Response: {result['response']}")
            print(f"Generation Time: {result['generation_time']:.2f}s")
            print(f"Speed: {result['tokens_per_second']:.1f} tokens/second")
            print(f"Framework: {result['framework']} (optimized)")
        else:
            print(f"Generation failed: {result['error']}")
        
        # Performance benchmark
        test_prompts = [
            "What are the benefits of renewable energy?",
            "Explain machine learning algorithms",
            "How does quantum computing work?",
            "Describe sustainable development goals"
        ]
        
        benchmark = service.benchmark_performance(test_prompts)
        
        if "error" not in benchmark:
            print(f"\nPerformance Benchmark:")
            print(f"Success Rate: {benchmark['success_rate']:.2%}")
            print(f"Average Speed: {benchmark['average_tokens_per_second']:.1f} tokens/s")
            print(f"Efficiency: {benchmark['energy_efficiency']}")
            print(f"Memory Usage: {benchmark['memory_footprint_mb']}MB")
        
    except Exception as e:
        print(f"BitNET service initialization failed: {e}")
        print("Ensure bitnet.cpp is properly installed and configured")

# bitnet_cpp_example()
```

### Advanced Fine-tuning and Customization

```python
from transformers import AutoModelForCausalLM, AutoTokenizer, TrainingArguments
from peft import LoraConfig, get_peft_model, TaskType
from trl import SFTTrainer
from datasets import load_dataset, Dataset
import torch

class BitNETFineTuner:
    """Advanced fine-tuning for BitNET models"""
    
    def __init__(self, base_model_name="microsoft/bitnet-b1.58-2B-4T"):
        self.base_model_name = base_model_name
        self.model = None
        self.tokenizer = None
        self.peft_model = None
        
    def setup_model_for_training(self):
        """Setup BitNET model for efficient fine-tuning"""
        
        # Load tokenizer
        self.tokenizer = AutoTokenizer.from_pretrained(self.base_model_name)
        self.tokenizer.pad_token = self.tokenizer.eos_token
        
        # Load base model
        self.model = AutoModelForCausalLM.from_pretrained(
            self.base_model_name,
            torch_dtype=torch.bfloat16,
            device_map="auto",
            trust_remote_code=True,
            load_in_8bit=True  # Additional quantization for training efficiency
        )
        
        # Configure LoRA for efficient fine-tuning
        peft_config = LoraConfig(
            r=32,  # Higher rank for BitNET models
            lora_alpha=64,
            lora_dropout=0.1,
            bias="none",
            task_type=TaskType.CAUSAL_LM,
            target_modules=[
                "q_proj", "k_proj", "v_proj", "o_proj",
                "gate_proj", "up_proj", "down_proj"
            ]
        )
        
        # Apply LoRA
        self.peft_model = get_peft_model(self.model, peft_config)
        
        # Print trainable parameters
        self.peft_model.print_trainable_parameters()
        
        return self.peft_model
    
    def prepare_dataset(self, dataset_name_or_path, max_samples=1000):
        """Prepare dataset for BitNET fine-tuning"""
        
        if isinstance(dataset_name_or_path, str):
            # Load from Hugging Face or local path
            try:
                dataset = load_dataset(dataset_name_or_path, split="train")
            except:
                # Fallback to local loading
                dataset = load_dataset("json", data_files=dataset_name_or_path, split="train")
        else:
            # Direct dataset object
            dataset = dataset_name_or_path
        
        # Limit dataset size for efficient training
        if len(dataset) > max_samples:
            dataset = dataset.select(range(max_samples))
        
        def format_instruction(example):
            """Format data for instruction following"""
            if "instruction" in example and "output" in example:
                messages = [
                    {"role": "user", "content": example["instruction"]},
                    {"role": "assistant", "content": example["output"]}
                ]
            elif "input" in example and "output" in example:
                messages = [
                    {"role": "user", "content": example["input"]},
                    {"role": "assistant", "content": example["output"]}
                ]
            else:
                # Fallback formatting
                content = str(example.get("text", ""))
                if len(content) > 10:
                    mid_point = len(content) // 2
                    messages = [
                        {"role": "user", "content": content[:mid_point]},
                        {"role": "assistant", "content": content[mid_point:]}
                    ]
                else:
                    return None
            
            # Apply chat template
            formatted_text = self.tokenizer.apply_chat_template(
                messages,
                tokenize=False,
                add_generation_prompt=False
            )
            
            return {"text": formatted_text}
        
        # Format dataset
        formatted_dataset = dataset.map(
            format_instruction,
            remove_columns=dataset.column_names
        )
        
        # Remove None entries
        formatted_dataset = formatted_dataset.filter(lambda x: x["text"] is not None)
        
        return formatted_dataset
    
    def fine_tune(
        self,
        train_dataset,
        output_dir="./bitnet-finetuned",
        num_epochs=3,
        learning_rate=1e-4,
        batch_size=2
    ):
        """Fine-tune BitNET model with optimized settings"""
        
        # Training arguments optimized for BitNET
        training_args = TrainingArguments(
            output_dir=output_dir,
            learning_rate=learning_rate,
            per_device_train_batch_size=batch_size,
            gradient_accumulation_steps=8,
            num_train_epochs=num_epochs,
            warmup_steps=100,
            logging_steps=10,
            save_steps=500,
            eval_steps=500,
            evaluation_strategy="steps",
            save_total_limit=3,
            load_best_model_at_end=True,
            metric_for_best_model="eval_loss",
            greater_is_better=False,
            bf16=True,
            dataloader_pin_memory=False,
            remove_unused_columns=False,
            report_to=None,  # Disable wandb/tensorboard
            gradient_checkpointing=True,  # Memory efficiency
        )
        
        # Initialize trainer
        trainer = SFTTrainer(
            model=self.peft_model,
            args=training_args,
            train_dataset=train_dataset,
            tokenizer=self.tokenizer,
            max_seq_length=2048,
            packing=True,
            dataset_text_field="text"
        )
        
        # Start training
        print("Starting BitNET fine-tuning...")
        trainer.train()
        
        # Save the fine-tuned model
        trainer.save_model()
        self.tokenizer.save_pretrained(output_dir)
        
        print(f"Fine-tuning completed. Model saved to {output_dir}")
        
        return trainer
    
    def create_custom_dataset(self, data_points):
        """Create custom dataset from data points"""
        formatted_data = []
        
        for item in data_points:
            if isinstance(item, dict) and "input" in item and "output" in item:
                messages = [
                    {"role": "user", "content": item["input"]},
                    {"role": "assistant", "content": item["output"]}
                ]
                
                formatted_text = self.tokenizer.apply_chat_template(
                    messages,
                    tokenize=False,
                    add_generation_prompt=False
                )
                
                formatted_data.append({"text": formatted_text})
        
        return Dataset.from_list(formatted_data)

# Example fine-tuning workflow
def bitnet_finetuning_example():
    """Example of fine-tuning BitNET for specific tasks"""
    
    # Initialize fine-tuner
    fine_tuner = BitNETFineTuner()
    
    # Setup model
    model = fine_tuner.setup_model_for_training()
    
    # Create custom dataset for domain-specific fine-tuning
    custom_data = [
        {
            "input": "Explain the environmental benefits of 1-bit neural networks",
            "output": "1-bit neural networks offer significant environmental benefits through dramatic energy efficiency improvements. They reduce power consumption by 55-82% compared to full-precision models, leading to lower carbon emissions and more sustainable AI deployment. This efficiency enables broader AI adoption while minimizing environmental impact."
        },
        {
            "input": "How do BitNET models achieve such high efficiency?",
            "output": "BitNET models achieve efficiency through innovative 1.58-bit quantization, where weights are constrained to ternary values {-1, 0, +1}. This extreme quantization dramatically reduces computational requirements while specialized training procedures and optimized inference kernels maintain performance quality."
        },
        {
            "input": "What are the deployment advantages of BitNET?",
            "output": "BitNET deployment advantages include minimal memory footprint (0.4GB vs 2-4.8GB for comparable models), fast inference speeds with 1.37x to 6.17x speedups, energy efficiency for mobile and edge deployment, and cost-effective scaling for enterprise applications."
        },
        # Add more domain-specific examples...
    ]
    
    # Prepare dataset
    train_dataset = fine_tuner.create_custom_dataset(custom_data)
    
    print(f"Prepared {len(train_dataset)} training examples")
    
    # Fine-tune the model
    trainer = fine_tuner.fine_tune(
        train_dataset,
        output_dir="./bitnet-efficiency-expert",
        num_epochs=5,
        learning_rate=2e-4,
        batch_size=1  # Adjust based on available memory
    )
    
    print("Fine-tuning completed!")
    
    # Test the fine-tuned model
    test_prompt = "What makes BitNET suitable for sustainable AI deployment?"
    
    # Load fine-tuned model for testing
    from transformers import AutoModelForCausalLM
    
    finetuned_model = AutoModelForCausalLM.from_pretrained(
        "./bitnet-efficiency-expert",
        torch_dtype=torch.bfloat16,
        device_map="auto"
    )
    
    messages = [{"role": "user", "content": test_prompt}]
    prompt = fine_tuner.tokenizer.apply_chat_template(
        messages,
        tokenize=False,
        add_generation_prompt=True
    )
    
    inputs = fine_tuner.tokenizer(prompt, return_tensors="pt").to(finetuned_model.device)
    
    with torch.no_grad():
        outputs = finetuned_model.generate(
            **inputs,
            max_new_tokens=200,
            temperature=0.7,
            do_sample=True
        )
    
    response = fine_tuner.tokenizer.decode(
        outputs[0][inputs['input_ids'].shape[1]:],
        skip_special_tokens=True
    )
    
    print(f"\nFine-tuned BitNET Response: {response}")

# bitnet_finetuning_example()
```

### Production Deployment Strategies

```python
import asyncio
import aiohttp
import json
import logging
import time
from typing import Dict, List, Optional, Union
from dataclasses import dataclass, asdict
from contextlib import asynccontextmanager
import torch
from transformers import AutoModelForCausalLM, AutoTokenizer

@dataclass
class BitNETRequest:
    """Structured request for BitNET service"""
    id: str
    prompt: str
    max_tokens: int = 256
    temperature: float = 0.7
    top_p: float = 0.9
    stream: bool = False
    metadata: Optional[Dict] = None

@dataclass
class BitNETResponse:
    """Structured response from BitNET service"""
    id: str
    response: str
    generation_time: float
    tokens_generated: int
    tokens_per_second: float
    success: bool
    error_message: Optional[str] = None
    metadata: Optional[Dict] = None

class ProductionBitNETService:
    """Production-ready BitNET service with enterprise features"""
    
    def __init__(
        self,
        model_name: str = "microsoft/bitnet-b1.58-2B-4T",
        max_concurrent_requests: int = 10,
        request_timeout: float = 30.0,
        enable_caching: bool = True
    ):
        self.model_name = model_name
        self.max_concurrent_requests = max_concurrent_requests
        self.request_timeout = request_timeout
        self.enable_caching = enable_caching
        
        # Service state
        self.model = None
        self.tokenizer = None
        self.request_semaphore = asyncio.Semaphore(max_concurrent_requests)
        self.request_cache = {}
        self.metrics = {
            "total_requests": 0,
            "successful_requests": 0,
            "failed_requests": 0,
            "total_generation_time": 0.0,
            "total_tokens_generated": 0
        }
        
        # Setup logging
        self.logger = self._setup_logging()
        
    def _setup_logging(self):
        """Setup production logging configuration"""
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - BitNET-Production - %(levelname)s - %(message)s',
            handlers=[
                logging.StreamHandler(),
                logging.FileHandler('bitnet_service.log')
            ]
        )
        return logging.getLogger("BitNET-Production")
    
    async def initialize(self):
        """Initialize the BitNET service"""
        try:
            self.logger.info(f"Initializing BitNET service with model: {self.model_name}")
            
            # Load tokenizer
            self.tokenizer = AutoTokenizer.from_pretrained(self.model_name)
            
            # Load model with optimization
            self.model = AutoModelForCausalLM.from_pretrained(
                self.model_name,
                torch_dtype=torch.bfloat16,
                device_map="auto",
                trust_remote_code=True,
                low_cpu_mem_usage=True
            )
            
            # Optimize for inference
            self.model.eval()
            
            # Warm up the model
            await self._warmup_model()
            
            self.logger.info("BitNET service initialized successfully")
            
        except Exception as e:
            self.logger.error(f"Failed to initialize BitNET service: {str(e)}")
            raise
    
    async def _warmup_model(self):
        """Warm up the model with a test generation"""
        try:
            warmup_request = BitNETRequest(
                id="warmup",
                prompt="Hello, this is a warmup test.",
                max_tokens=10
            )
            
            await self._generate_internal(warmup_request)
            self.logger.info("Model warmup completed")
            
        except Exception as e:
            self.logger.warning(f"Model warmup failed: {str(e)}")
    
    def _generate_cache_key(self, request: BitNETRequest) -> str:
        """Generate cache key for request"""
        key_data = {
            "prompt": request.prompt,
            "max_tokens": request.max_tokens,
            "temperature": request.temperature,
            "top_p": request.top_p
        }
        return str(hash(json.dumps(key_data, sort_keys=True)))
    
    async def _generate_internal(self, request: BitNETRequest) -> BitNETResponse:
        """Internal generation method"""
        start_time = time.time()
        
        try:
            # Check cache
            if self.enable_caching:
                cache_key = self._generate_cache_key(request)
                if cache_key in self.request_cache:
                    cached_response = self.request_cache[cache_key]
                    self.logger.info(f"Cache hit for request {request.id}")
                    return BitNETResponse(
                        id=request.id,
                        response=cached_response["response"],
                        generation_time=cached_response["generation_time"],
                        tokens_generated=cached_response["tokens_generated"],
                        tokens_per_second=cached_response["tokens_per_second"],
                        success=True,
                        metadata={"cache_hit": True}
                    )
            
            # Prepare input
            messages = [{"role": "user", "content": request.prompt}]
            formatted_prompt = self.tokenizer.apply_chat_template(
                messages,
                tokenize=False,
                add_generation_prompt=True
            )
            
            inputs = self.tokenizer(
                formatted_prompt,
                return_tensors="pt",
                truncation=True,
                max_length=2048
            ).to(self.model.device)
            
            # Generate response
            generation_start = time.time()
            
            with torch.no_grad():
                outputs = self.model.generate(
                    **inputs,
                    max_new_tokens=request.max_tokens,
                    temperature=request.temperature,
                    top_p=request.top_p,
                    do_sample=True,
                    pad_token_id=self.tokenizer.eos_token_id,
                    early_stopping=True
                )
            
            generation_time = time.time() - generation_start
            
            # Extract response
            response_text = self.tokenizer.decode(
                outputs[0][inputs['input_ids'].shape[1]:],
                skip_special_tokens=True
            ).strip()
            
            tokens_generated = outputs.shape[1] - inputs['input_ids'].shape[1]
            tokens_per_second = tokens_generated / generation_time if generation_time > 0 else 0
            
            # Create response object
            response = BitNETResponse(
                id=request.id,
                response=response_text,
                generation_time=generation_time,
                tokens_generated=tokens_generated,
                tokens_per_second=tokens_per_second,
                success=True,
                metadata={"model": self.model_name, "cache_hit": False}
            )
            
            # Cache the response
            if self.enable_caching:
                cache_key = self._generate_cache_key(request)
                self.request_cache[cache_key] = {
                    "response": response_text,
                    "generation_time": generation_time,
                    "tokens_generated": tokens_generated,
                    "tokens_per_second": tokens_per_second
                }
            
            # Update metrics
            self.metrics["successful_requests"] += 1
            self.metrics["total_generation_time"] += generation_time
            self.metrics["total_tokens_generated"] += tokens_generated
            
            return response
            
        except Exception as e:
            self.logger.error(f"Generation failed for request {request.id}: {str(e)}")
            self.metrics["failed_requests"] += 1
            
            return BitNETResponse(
                id=request.id,
                response="",
                generation_time=time.time() - start_time,
                tokens_generated=0,
                tokens_per_second=0,
                success=False,
                error_message=str(e)
            )
    
    async def generate(self, request: BitNETRequest) -> BitNETResponse:
        """Public generation method with concurrency control"""
        self.metrics["total_requests"] += 1
        
        async with self.request_semaphore:
            try:
                # Apply timeout
                response = await asyncio.wait_for(
                    self._generate_internal(request),
                    timeout=self.request_timeout
                )
                
                self.logger.info(
                    f"Request {request.id} completed: "
                    f"{response.tokens_per_second:.1f} tokens/s, "
                    f"{response.generation_time:.2f}s"
                )
                
                return response
                
            except asyncio.TimeoutError:
                self.logger.error(f"Request {request.id} timed out")
                self.metrics["failed_requests"] += 1
                
                return BitNETResponse(
                    id=request.id,
                    response="",
                    generation_time=self.request_timeout,
                    tokens_generated=0,
                    tokens_per_second=0,
                    success=False,
                    error_message="Request timed out"
                )
    
    async def generate_batch(self, requests: List[BitNETRequest]) -> List[BitNETResponse]:
        """Process multiple requests concurrently"""
        tasks = [self.generate(request) for request in requests]
        responses = await asyncio.gather(*tasks)
        return responses
    
    def get_metrics(self) -> Dict[str, Union[int, float]]:
        """Get comprehensive service metrics"""
        total_requests = self.metrics["total_requests"]
        successful_requests = self.metrics["successful_requests"]
        
        avg_generation_time = (
            self.metrics["total_generation_time"] / max(1, successful_requests)
        )
        
        avg_tokens_per_second = (
            self.metrics["total_tokens_generated"] / 
            max(0.001, self.metrics["total_generation_time"])
        )
        
        return {
            "total_requests": total_requests,
            "successful_requests": successful_requests,
            "failed_requests": self.metrics["failed_requests"],
            "success_rate": successful_requests / max(1, total_requests),
            "average_generation_time": avg_generation_time,
            "average_tokens_per_second": avg_tokens_per_second,
            "total_tokens_generated": self.metrics["total_tokens_generated"],
            "cache_size": len(self.request_cache),
            "model_efficiency": "1-bit quantized (BitNET)",
            "memory_footprint_estimate_mb": 400
        }
    
    def health_check(self) -> Dict[str, any]:
        """Comprehensive health check"""
        try:
            health_status = {
                "status": "healthy",
                "model_loaded": self.model is not None,
                "tokenizer_loaded": self.tokenizer is not None,
                "metrics": self.get_metrics(),
                "cache_enabled": self.enable_caching,
                "max_concurrent_requests": self.max_concurrent_requests
            }
            
            # Check model functionality
            if self.model is None or self.tokenizer is None:
                health_status["status"] = "unhealthy"
                health_status["error"] = "Model or tokenizer not loaded"
            
            # Check memory usage
            if torch.cuda.is_available():
                health_status["gpu_memory_mb"] = torch.cuda.memory_allocated() / 1024 / 1024
                health_status["gpu_memory_reserved_mb"] = torch.cuda.memory_reserved() / 1024 / 1024
            
            return health_status
            
        except Exception as e:
            return {
                "status": "unhealthy",
                "error": str(e),
                "model_loaded": False
            }

# Production deployment example
async def production_deployment_example():
    """Example of production BitNET deployment"""
    
    # Initialize service
    service = ProductionBitNETService(
        max_concurrent_requests=5,
        request_timeout=20.0,
        enable_caching=True
    )
    
    await service.initialize()
    
    # Health check
    health = service.health_check()
    print(f"Service Health: {health['status']}")
    print(f"Model Loaded: {health['model_loaded']}")
    
    # Single request example
    request = BitNETRequest(
        id="req_001",
        prompt="Explain the advantages of using 1-bit neural networks for sustainable AI deployment",
        max_tokens=200,
        temperature=0.7
    )
    
    response = await service.generate(request)
    
    if response.success:
        print(f"\nRequest ID: {response.id}")
        print(f"Response: {response.response}")
        print(f"Generation Time: {response.generation_time:.2f}s")
        print(f"Speed: {response.tokens_per_second:.1f} tokens/s")
    else:
        print(f"Request failed: {response.error_message}")
    
    # Batch processing example
    batch_requests = [
        BitNETRequest(id=f"batch_{i}", prompt=f"Question {i}: What is artificial intelligence?")
        for i in range(3)
    ]
    
    print(f"\nProcessing batch of {len(batch_requests)} requests...")
    batch_responses = await service.generate_batch(batch_requests)
    
    for response in batch_responses:
        if response.success:
            print(f"ID: {response.id}, Speed: {response.tokens_per_second:.1f} tokens/s")
    
    # Final metrics
    final_metrics = service.get_metrics()
    print(f"\nFinal Service Metrics:")
    print(f"Total Requests: {final_metrics['total_requests']}")
    print(f"Success Rate: {final_metrics['success_rate']:.2%}")
    print(f"Average Speed: {final_metrics['average_tokens_per_second']:.1f} tokens/s")
    print(f"Cache Size: {final_metrics['cache_size']}")
    print(f"Model Efficiency: {final_metrics['model_efficiency']}")

# Run production example
# asyncio.run(production_deployment_example())
```

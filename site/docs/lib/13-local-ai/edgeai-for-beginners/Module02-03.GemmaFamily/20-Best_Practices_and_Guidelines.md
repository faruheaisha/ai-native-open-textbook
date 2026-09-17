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
pageSha256: "36233ab66b6f6e9ea5f9d27dec6db628cc0302a3a5d38a4bbbcd01040e212664"
contentMode: "local-full"
zh: ""
---

## Best Practices and Guidelines

### Security and Privacy

```python
import hashlib
import time
import re
from typing import List, Dict, Optional
import logging

class SecureGemmaService:
    """Security-focused Gemma service implementation"""
    
    def __init__(self, model_name: str, max_requests_per_hour: int = 100):
        self.model_name = model_name
        self.max_requests_per_hour = max_requests_per_hour
        self.model = None
        self.tokenizer = None
        self.request_logs = {}
        self.logger = logging.getLogger("SecureGemmaService")
        self._load_model()
    
    def _load_model(self):
        """Load model with security considerations"""
        from transformers import AutoModelForCausalLM, AutoTokenizer
        
        self.tokenizer = AutoTokenizer.from_pretrained(
            self.model_name,
            trust_remote_code=True  # Only enable for trusted models
        )
        
        self.model = AutoModelForCausalLM.from_pretrained(
            self.model_name,
            torch_dtype=torch.bfloat16,
            device_map="auto",
            trust_remote_code=True
        )
    
    def _sanitize_input(self, text: str) -> str:
        """Comprehensive input sanitization"""
        if not isinstance(text, str):
            raise ValueError("Input must be a string")
        
        # Remove potentially harmful patterns
        dangerous_patterns = [
            r"",
            r"javascript:",
            r"data:text/html",
            r"<iframe[^>]*>.*?</iframe>",
            r"<object[^>]*>.*?</object>",
            r"<embed[^>]*>.*?</embed>"
        ]
        
        sanitized = text
        for pattern in dangerous_patterns:
            sanitized = re.sub(pattern, "", sanitized, flags=re.IGNORECASE | re.DOTALL)
        
        # Limit length to prevent resource exhaustion
        max_length = 8192
        if len(sanitized) > max_length:
            sanitized = sanitized[:max_length]
            self.logger.warning(f"Input truncated to {max_length} characters")
        
        return sanitized
    
    def _rate_limit_check(self, user_id: str) -> bool:
        """Advanced rate limiting with sliding window"""
        current_time = time.time()
        window_size = 3600  # 1 hour in seconds
        
        if user_id not in self.request_logs:
            self.request_logs[user_id] = []
        
        # Clean old requests outside the time window
        self.request_logs[user_id] = [
            req_time for req_time in self.request_logs[user_id]
            if current_time - req_time < window_size
        ]
        
        # Check if limit exceeded
        if len(self.request_logs[user_id]) >= self.max_requests_per_hour:
            self.logger.warning(f"Rate limit exceeded for user {user_id[:8]}...")
            return False
        
        # Log current request
        self.request_logs[user_id].append(current_time)
        return True
    
    def _validate_messages(self, messages: List[Dict[str, str]]) -> List[Dict[str, str]]:
        """Validate and sanitize message structure"""
        if not isinstance(messages, list):
            raise ValueError("Messages must be a list")
        
        if len(messages) == 0:
            raise ValueError("Messages list cannot be empty")
        
        if len(messages) > 50:  # Reasonable conversation limit
            raise ValueError("Too many messages in conversation")
        
        validated_messages = []
        for message in messages:
            if not isinstance(message, dict):
                raise ValueError("Each message must be a dictionary")
            
            if "role" not in message or "content" not in message:
                raise ValueError("Each message must have 'role' and 'content' fields")
            
            # Validate role
            valid_roles = ["user", "assistant", "system"]
            if message["role"] not in valid_roles:
                raise ValueError(f"Invalid role: {message['role']}")
            
            # Sanitize content
            sanitized_content = self._sanitize_input(message["content"])
            
            validated_messages.append({
                "role": message["role"],
                "content": sanitized_content
            })
        
        return validated_messages
    
    def _content_filter(self, text: str) -> tuple[bool, str]:
        """Basic content filtering for inappropriate content"""
        # This is a simplified example - in production, use more sophisticated filtering
        prohibited_keywords = [
            "violence", "hate", "illegal", "harmful",
            # Add more as needed for your use case
        ]
        
        text_lower = text.lower()
        for keyword in prohibited_keywords:
            if keyword in text_lower:
                return False, f"Content contains prohibited keyword: {keyword}"
        
        return True, ""
    
    def _hash_sensitive_data(self, data: str) -> str:
        """Hash sensitive data for logging"""
        return hashlib.sha256(data.encode()).hexdigest()[:16]
    
    def secure_generate(
        self, 
        messages: List[Dict[str, str]], 
        user_id: str,
        max_tokens: int = 512
    ) -> Dict[str, any]:
        """Generate response with comprehensive security measures"""
        
        try:
            # Rate limiting
            if not self._rate_limit_check(user_id):
                return {
                    "success": False,
                    "error": "Rate limit exceeded. Please try again later.",
                    "error_code": "RATE_LIMIT_EXCEEDED"
                }
            
            # Input validation
            validated_messages = self._validate_messages(messages)
            
            # Content filtering
            for message in validated_messages:
                is_safe, filter_message = self._content_filter(message["content"])
                if not is_safe:
                    self.logger.warning(f"Content filtered for user {user_id[:8]}...: {filter_message}")
                    return {
                        "success": False,
                        "error": "Content violates safety guidelines",
                        "error_code": "CONTENT_FILTERED"
                    }
            
            # Log request (with hashed content for privacy)
            content_hash = self._hash_sensitive_data(str(validated_messages))
            self.logger.info(f"Processing request from user {user_id[:8]}... Content hash: {content_hash}")
            
            # Validate token limit
            max_allowed_tokens = min(max_tokens, 1024)
            
            # Generate response
            start_time = time.time()
            
            formatted_prompt = self.tokenizer.apply_chat_template(
                validated_messages,
                tokenize=False,
                add_generation_prompt=True
            )
            
            inputs = self.tokenizer(formatted_prompt, return_tensors="pt").to(self.model.device)
            
            with torch.no_grad():
                outputs = self.model.generate(
                    **inputs,
                    max_new_tokens=max_allowed_tokens,
                    temperature=0.7,
                    top_p=0.9,
                    repetition_penalty=1.05,
                    do_sample=True,
                    pad_token_id=self.tokenizer.eos_token_id,
                    early_stopping=True
                )
            
            response = self.tokenizer.decode(
                outputs[0][inputs.input_ids.shape[1]:],
                skip_special_tokens=True
            ).strip()
            
            generation_time = time.time() - start_time
            
            # Filter response content
            is_safe_response, filter_message = self._content_filter(response)
            if not is_safe_response:
                self.logger.warning(f"Response filtered for user {user_id[:8]}...: {filter_message}")
                return {
                    "success": False,
                    "error": "Generated response violates safety guidelines",
                    "error_code": "RESPONSE_FILTERED"
                }
            
            # Log successful generation
            self.logger.info(f"Successful generation for user {user_id[:8]}... in {generation_time:.2f}s")
            
            return {
                "success": True,
                "response": response,
                "generation_time": generation_time,
                "tokens_used": max_allowed_tokens
            }
            
        except ValueError as e:
            self.logger.error(f"Validation error for user {user_id[:8]}...: {str(e)}")
            return {
                "success": False,
                "error": f"Input validation failed: {str(e)}",
                "error_code": "VALIDATION_ERROR"
            }
        
        except Exception as e:
            self.logger.error(f"Generation error for user {user_id[:8]}...: {str(e)}")
            return {
                "success": False,
                "error": "An error occurred while processing your request",
                "error_code": "GENERATION_ERROR"
            }
    
    def get_usage_statistics(self, user_id: str) -> Dict[str, any]:
        """Get usage statistics for a user"""
        current_time = time.time()
        window_size = 3600  # 1 hour
        
        if user_id not in self.request_logs:
            return {
                "requests_last_hour": 0,
                "remaining_requests": self.max_requests_per_hour,
                "reset_time": current_time + window_size
            }
        
        # Count recent requests
        recent_requests = [
            req_time for req_time in self.request_logs[user_id]
            if current_time - req_time < window_size
        ]
        
        requests_last_hour = len(recent_requests)
        remaining_requests = max(0, self.max_requests_per_hour - requests_last_hour)
        
        # Calculate reset time (when oldest request expires)
        reset_time = min(recent_requests) + window_size if recent_requests else current_time
        
        return {
            "requests_last_hour": requests_last_hour,
            "remaining_requests": remaining_requests,
            "reset_time": reset_time
        }

# Example secure usage
secure_service = SecureGemmaService("google/gemma-3-8b-it", max_requests_per_hour=50)

# Safe generation
user_messages = [
    {"role": "user", "content": "Explain the benefits of renewable energy"}
]

result = secure_service.secure_generate(user_messages, user_id="user123")

if result["success"]:
    print(f"Secure Response: {result['response']}")
else:
    print(f"Error: {result['error']} (Code: {result['error_code']})")

# Check usage statistics
usage_stats = secure_service.get_usage_statistics("user123")
print(f"Usage Statistics: {usage_stats}")
```

### Monitoring and Evaluation

```python
import time
import psutil
import torch
from dataclasses import dataclass, asdict
from typing import List, Dict, Any, Optional
import json
from datetime import datetime
import statistics

@dataclass
class PerformanceMetrics:
    """Comprehensive performance metrics for Gemma models"""
    timestamp: float
    response_time: float
    memory_usage_mb: float
    gpu_memory_mb: float
    token_count: int
    tokens_per_second: float
    model_name: str
    input_length: int
    success: bool
    error_message: Optional[str] = None

@dataclass
class QualityMetrics:
    """Quality assessment metrics"""
    relevance_score: float  # 0-1
    coherence_score: float  # 0-1
    safety_score: float     # 0-1
    factual_accuracy: float # 0-1
    user_satisfaction: Optional[float] = None  # 0-1

class GemmaMonitoringService:
    """Comprehensive monitoring service for Gemma models"""
    
    def __init__(self, model_name: str):
        self.model_name = model_name
        self.performance_history: List[PerformanceMetrics] = []
        self.quality_history: List[QualityMetrics] = []
        self.alert_thresholds = {
            "max_response_time": 10.0,  # seconds
            "max_memory_usage": 8192,   # MB
            "min_tokens_per_second": 5.0,
            "min_success_rate": 0.95    # 95%
        }
    
    def measure_performance(
        self, 
        model, 
        tokenizer, 
        messages: List[Dict[str, str]],
        expected_tokens: int = 256
    ) -> PerformanceMetrics:
        """Comprehensive performance measurement"""
        
        start_time = time.time()
        start_memory = psutil.Process().memory_info().rss / 1024 / 1024  # MB
        
        # GPU metrics
        gpu_memory = 0
        if torch.cuda.is_available():
            torch.cuda.reset_peak_memory_stats()
            gpu_memory = torch.cuda.memory_allocated() / 1024 / 1024  # MB
        
        success = True
        error_message = None
        token_count = 0
        
        try:
            # Format input
            formatted_text = tokenizer.apply_chat_template(
                messages,
                tokenize=False,
                add_generation_prompt=True
            )
            
            input_length = len(tokenizer.encode(formatted_text))
            
            inputs = tokenizer(formatted_text, return_tensors="pt").to(model.device)
            
            # Generate response
            with torch.no_grad():
                outputs = model.generate(
                    **inputs,
                    max_new_tokens=expected_tokens,
                    temperature=0.7,
                    do_sample=True,
                    pad_token_id=tokenizer.eos_token_id
                )
            
            token_count = outputs.shape[1] - inputs.input_ids.shape[1]
            
        except Exception as e:
            success = False
            error_message = str(e)
            input_length = 0
        
        # Calculate final metrics
        end_time = time.time()
        end_memory = psutil.Process().memory_info().rss / 1024 / 1024
        
        response_time = end_time - start_time
        memory_usage = end_memory - start_memory
        
        if torch.cuda.is_available():
            gpu_memory = torch.cuda.max_memory_allocated() / 1024 / 1024
        
        tokens_per_second = token_count / response_time if response_time > 0 and success else 0
        
        metrics = PerformanceMetrics(
            timestamp=start_time,
            response_time=response_time,
            memory_usage_mb=memory_usage,
            gpu_memory_mb=gpu_memory,
            token_count=token_count,
            tokens_per_second=tokens_per_second,
            model_name=self.model_name,
            input_length=input_length,
            success=success,
            error_message=error_message
        )
        
        self.performance_history.append(metrics)
        return metrics
    
    def evaluate_quality(
        self, 
        input_text: str, 
        generated_text: str,
        reference_text: Optional[str] = None
    ) -> QualityMetrics:
        """Evaluate response quality using various metrics"""
        
        # Simple quality assessment (in production, use more sophisticated methods)
        relevance_score = self._assess_relevance(input_text, generated_text)
        coherence_score = self._assess_coherence(generated_text)
        safety_score = self._assess_safety(generated_text)
        factual_accuracy = self._assess_factual_accuracy(generated_text, reference_text)
        
        quality_metrics = QualityMetrics(
            relevance_score=relevance_score,
            coherence_score=coherence_score,
            safety_score=safety_score,
            factual_accuracy=factual_accuracy
        )
        
        self.quality_history.append(quality_metrics)
        return quality_metrics
    
    def _assess_relevance(self, input_text: str, output_text: str) -> float:
        """Simple relevance assessment based on keyword overlap"""
        input_words = set(input_text.lower().split())
        output_words = set(output_text.lower().split())
        
        if len(input_words) == 0:
            return 0.0
        
        overlap = len(input_words.intersection(output_words))
        return min(1.0, overlap / len(input_words) * 2)  # Scale appropriately
    
    def _assess_coherence(self, text: str) -> float:
        """Simple coherence assessment"""
        sentences = text.split('.')
        if len(sentences) < 2:
            return 0.8  # Short text, assume reasonably coherent
        
        # Simple heuristic: check for reasonable sentence length
        avg_sentence_length = sum(len(s.split()) for s in sentences) / len(sentences)
        
        if 5 <= avg_sentence_length <= 25:
            return 0.9
        elif 3 <= avg_sentence_length <= 30:
            return 0.7
        else:
            return 0.5
    
    def _assess_safety(self, text: str) -> float:
        """Simple safety assessment"""
        harmful_indicators = [
            "violence", "harmful", "dangerous", "illegal",
            "hate", "discriminat", "threaten"
        ]
        
        text_lower = text.lower()
        harmful_count = sum(1 for indicator in harmful_indicators if indicator in text_lower)
        
        if harmful_count == 0:
            return 1.0
        elif harmful_count <= 2:
            return 0.7
        else:
            return 0.3
    
    def _assess_factual_accuracy(self, text: str, reference: Optional[str] = None) -> float:
        """Simple factual accuracy assessment"""
        if reference is None:
            # Without reference, use simple heuristics
            confidence_indicators = [
                "according to", "research shows", "studies indicate",
                "data suggests", "evidence shows"
            ]
            
            text_lower = text.lower()
            confidence_count = sum(1 for indicator in confidence_indicators if indicator in text_lower)
            
            return min(0.8, 0.5 + confidence_count * 0.1)
        
        # With reference, calculate similarity (simplified)
        ref_words = set(reference.lower().split())
        text_words = set(text.lower().split())
        
        if len(ref_words) == 0:
            return 0.5
        
        overlap = len(ref_words.intersection(text_words))
        return min(1.0, overlap / len(ref_words))
    
    def get_performance_summary(self, last_n: int = 100) -> Dict[str, Any]:
        """Get comprehensive performance summary"""
        if not self.performance_history:
            return {"error": "No performance data available"}
        
        recent_metrics = self.performance_history[-last_n:]
        successful_metrics = [m for m in recent_metrics if m.success]
        
        if not successful_metrics:
            return {"error": "No successful operations in recent history"}
        
        summary = {
            "total_requests": len(recent_metrics),
            "successful_requests": len(successful_metrics),
            "success_rate": len(successful_metrics) / len(recent_metrics),
            "avg_response_time": statistics.mean(m.response_time for m in successful_metrics),
            "avg_memory_usage": statistics.mean(m.memory_usage_mb for m in successful_metrics),
            "avg_tokens_per_second": statistics.mean(m.tokens_per_second for m in successful_metrics),
            "p95_response_time": statistics.quantiles([m.response_time for m in successful_metrics], n=20)[18],
            "total_tokens_generated": sum(m.token_count for m in successful_metrics),
        }
        
        if torch.cuda.is_available():
            summary["avg_gpu_memory"] = statistics.mean(m.gpu_memory_mb for m in successful_metrics)
        
        return summary
    
    def get_quality_summary(self, last_n: int = 100) -> Dict[str, Any]:
        """Get quality metrics summary"""
        if not self.quality_history:
            return {"error": "No quality data available"}
        
        recent_quality = self.quality_history[-last_n:]
        
        return {
            "total_evaluations": len(recent_quality),
            "avg_relevance": statistics.mean(q.relevance_score for q in recent_quality),
            "avg_coherence": statistics.mean(q.coherence_score for q in recent_quality),
            "avg_safety": statistics.mean(q.safety_score for q in recent_quality),
            "avg_factual_accuracy": statistics.mean(q.factual_accuracy for q in recent_quality),
            "overall_quality": statistics.mean([
                (q.relevance_score + q.coherence_score + q.safety_score + q.factual_accuracy) / 4
                for q in recent_quality
            ])
        }
    
    def check_alerts(self) -> List[Dict[str, Any]]:
        """Check for performance alerts"""
        alerts = []
        
        if not self.performance_history:
            return alerts
        
        recent_metrics = self.performance_history[-10:]  # Last 10 requests
        successful_metrics = [m for m in recent_metrics if m.success]
        
        if not successful_metrics:
            alerts.append({
                "type": "error",
                "message": "No successful requests in recent history",
                "severity": "high",
                "timestamp": time.time()
            })
            return alerts
        
        # Check response time
        avg_response_time = statistics.mean(m.response_time for m in successful_metrics)
        if avg_response_time > self.alert_thresholds["max_response_time"]:
            alerts.append({
                "type": "performance",
                "message": f"High response time: {avg_response_time:.2f}s (threshold: {self.alert_thresholds['max_response_time']}s)",
                "severity": "medium",
                "timestamp": time.time()
            })
        
        # Check memory usage
        avg_memory = statistics.mean(m.memory_usage_mb for m in successful_metrics)
        if avg_memory > self.alert_thresholds["max_memory_usage"]:
            alerts.append({
                "type": "memory",
                "message": f"High memory usage: {avg_memory:.1f}MB (threshold: {self.alert_thresholds['max_memory_usage']}MB)",
                "severity": "medium",
                "timestamp": time.time()
            })
        
        # Check tokens per second
        avg_tps = statistics.mean(m.tokens_per_second for m in successful_metrics)
        if avg_tps < self.alert_thresholds["min_tokens_per_second"]:
            alerts.append({
                "type": "performance",
                "message": f"Low generation speed: {avg_tps:.1f} tokens/s (threshold: {self.alert_thresholds['min_tokens_per_second']} tokens/s)",
                "severity": "low",
                "timestamp": time.time()
            })
        
        # Check success rate
        success_rate = len(successful_metrics) / len(recent_metrics)
        if success_rate < self.alert_thresholds["min_success_rate"]:
            alerts.append({
                "type": "reliability",
                "message": f"Low success rate: {success_rate:.2%} (threshold: {self.alert_thresholds['min_success_rate']:.2%})",
                "severity": "high",
                "timestamp": time.time()
            })
        
        return alerts
    
    def export_metrics(self, filepath: str):
        """Export metrics to JSON file"""
        export_data = {
            "model_name": self.model_name,
            "export_timestamp": datetime.now().isoformat(),
            "performance_metrics": [asdict(m) for m in self.performance_history],
            "quality_metrics": [asdict(q) for q in self.quality_history],
            "performance_summary": self.get_performance_summary(),
            "quality_summary": self.get_quality_summary(),
            "current_alerts": self.check_alerts()
        }
        
        with open(filepath, 'w') as f:
            json.dump(export_data, f, indent=2)

# Example monitoring usage
def monitoring_example():
    """Example of comprehensive Gemma monitoring"""
    
    # Initialize monitoring
    monitor = GemmaMonitoringService("google/gemma-3-8b-it")
    
    # Load model for testing
    from transformers import AutoModelForCausalLM, AutoTokenizer
    
    model = AutoModelForCausalLM.from_pretrained(
        "google/gemma-3-8b-it",
        torch_dtype=torch.bfloat16,
        device_map="auto"
    )
    
    tokenizer = AutoTokenizer.from_pretrained("google/gemma-3-8b-it")
    
    # Test various scenarios
    test_scenarios = [
        [{"role": "user", "content": "What is machine learning?"}],
        [{"role": "user", "content": "Explain quantum computing in simple terms"}],
        [{"role": "user", "content": "Write a short story about AI"}],
        [{"role": "user", "content": "How does photosynthesis work?"}],
        [{"role": "user", "content": "What are the benefits of renewable energy?"}]
    ]
    
    print("Running performance tests...")
    for i, messages in enumerate(test_scenarios):
        print(f"Test {i+1}/5: {messages[0]['content'][:50]}...")
        
        # Measure performance
        perf_metrics = monitor.measure_performance(model, tokenizer, messages)
        print(f"  Response time: {perf_metrics.response_time:.2f}s")
        print(f"  Tokens/sec: {perf_metrics.tokens_per_second:.1f}")
        print(f"  Success: {perf_metrics.success}")
        
        if perf_metrics.success:
            # Generate actual response for quality evaluation
            formatted_text = tokenizer.apply_chat_template(messages, tokenize=False, add_generation_prompt=True)
            inputs = tokenizer(formatted_text, return_tensors="pt").to(model.device)
            
            with torch.no_grad():
                outputs = model.generate(**inputs, max_new_tokens=100, temperature=0.7)
            
            response = tokenizer.decode(outputs[0][inputs.input_ids.shape[1]:], skip_special_tokens=True)
            
            # Evaluate quality
            quality_metrics = monitor.evaluate_quality(messages[0]['content'], response)
            print(f"  Quality score: {(quality_metrics.relevance_score + quality_metrics.coherence_score + quality_metrics.safety_score + quality_metrics.factual_accuracy) / 4:.2f}")
        
        print()
    
    # Get comprehensive summary
    perf_summary = monitor.get_performance_summary()
    quality_summary = monitor.get_quality_summary()
    alerts = monitor.check_alerts()
    
    print("=== Performance Summary ===")
    print(f"Success Rate: {perf_summary.get('success_rate', 0):.2%}")
    print(f"Average Response Time: {perf_summary.get('avg_response_time', 0):.2f}s")
    print(f"Average Tokens/Second: {perf_summary.get('avg_tokens_per_second', 0):.1f}")
    print(f"Total Tokens Generated: {perf_summary.get('total_tokens_generated', 0)}")
    
    print("\n=== Quality Summary ===")
    print(f"Overall Quality Score: {quality_summary.get('overall_quality', 0):.2f}")
    print(f"Average Relevance: {quality_summary.get('avg_relevance', 0):.2f}")
    print(f"Average Safety: {quality_summary.get('avg_safety', 0):.2f}")
    
    print(f"\n=== Alerts ({len(alerts)}) ===")
    for alert in alerts:
        print(f"[{alert['severity'].upper()}] {alert['type']}: {alert['message']}")
    
    # Export metrics
    monitor.export_metrics("gemma_monitoring_report.json")
    print("\nMetrics exported to gemma_monitoring_report.json")

# Run monitoring example
# monitoring_example()
```

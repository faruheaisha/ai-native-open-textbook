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
pageSha256: "76a0a2b52695a0ca4bc6487c1aab9ac22be7d135bc674f3b8c15f56e7fb692ab"
contentMode: "local-full"
zh: ""
---

## Best Practices and Guidelines

### Security and Reliability

```python
import hashlib
import time
import logging
import threading
from typing import Dict, List, Optional, Any
from dataclasses import dataclass
from concurrent.futures import ThreadPoolExecutor, as_completed
import torch

@dataclass
class SecurityConfig:
    """Security configuration for BitNET deployment"""
    max_input_length: int = 4096
    max_output_tokens: int = 1024
    rate_limit_requests_per_minute: int = 60
    enable_content_filtering: bool = True
    log_requests: bool = True
    sanitize_inputs: bool = True

class SecureBitNETService:
    """Production-ready secure BitNET service"""
    
    def __init__(
        self,
        model_name: str = "microsoft/bitnet-b1.58-2B-4T",
        security_config: SecurityConfig = None
    ):
        self.model_name = model_name
        self.security_config = security_config or SecurityConfig()
        self.model = None
        self.tokenizer = None
        
        # Security tracking
        self.request_history = {}
        self.blocked_requests = []
        self.security_lock = threading.Lock()
        
        # Setup logging
        self.logger = self._setup_security_logging()
        
        # Load model
        self._load_secure_model()
    
    def _setup_security_logging(self):
        """Setup security-focused logging"""
        logger = logging.getLogger("BitNET-Security")
        logger.setLevel(logging.INFO)
        
        # File handler for security logs
        file_handler = logging.FileHandler("bitnet_security.log")
        file_handler.setLevel(logging.INFO)
        
        # Console handler
        console_handler = logging.StreamHandler()
        console_handler.setLevel(logging.WARNING)
        
        # Formatter
        formatter = logging.Formatter(
            '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
        )
        
        file_handler.setFormatter(formatter)
        console_handler.setFormatter(formatter)
        
        logger.addHandler(file_handler)
        logger.addHandler(console_handler)
        
        return logger
    
    def _load_secure_model(self):
        """Load model with security considerations"""
        try:
            from transformers import AutoModelForCausalLM, AutoTokenizer
            
            self.logger.info(f"Loading BitNET model securely: {self.model_name}")
            
            self.tokenizer = AutoTokenizer.from_pretrained(
                self.model_name,
                trust_remote_code=True  # Only for trusted models
            )
            
            self.model = AutoModelForCausalLM.from_pretrained(
                self.model_name,
                torch_dtype=torch.bfloat16,
                device_map="auto",
                trust_remote_code=True,
                low_cpu_mem_usage=True
            )
            
            self.model.eval()
            self.logger.info("BitNET model loaded securely")
            
        except Exception as e:
            self.logger.error(f"Secure model loading failed: {str(e)}")
            raise
    
    def _hash_client_id(self, client_id: str) -> str:
        """Hash client ID for privacy"""
        return hashlib.sha256(client_id.encode()).hexdigest()[:16]
    
    def _rate_limit_check(self, client_id: str) -> bool:
        """Advanced rate limiting with sliding window"""
        hashed_id = self._hash_client_id(client_id)
        current_time = time.time()
        window_size = 60  # 1 minute
        
        with self.security_lock:
            if hashed_id not in self.request_history:
                self.request_history[hashed_id] = []
            
            # Remove old requests
            self.request_history[hashed_id] = [
                req_time for req_time in self.request_history[hashed_id]
                if current_time - req_time < window_size
            ]
            
            # Check rate limit
            if len(self.request_history[hashed_id]) >= self.security_config.rate_limit_requests_per_minute:
                self.logger.warning(f"Rate limit exceeded for client {hashed_id}")
                self.blocked_requests.append({
                    "client_id": hashed_id,
                    "timestamp": current_time,
                    "reason": "rate_limit"
                })
                return False
            
            # Log current request
            self.request_history[hashed_id].append(current_time)
            return True
    
    def _sanitize_input(self, text: str) -> str:
        """Comprehensive input sanitization"""
        if not self.security_config.sanitize_inputs:
            return text
        
        # Remove potentially harmful patterns
        import re
        
        # Remove script tags, javascript, etc.
        dangerous_patterns = [
            r"",
            r"javascript:",
            r"data:text/html",
            r"<iframe[^>]*>.*?</iframe>",
        ]
        
        sanitized = text
        for pattern in dangerous_patterns:
            sanitized = re.sub(pattern, "", sanitized, flags=re.IGNORECASE | re.DOTALL)
        
        # Limit length
        if len(sanitized) > self.security_config.max_input_length:
            sanitized = sanitized[:self.security_config.max_input_length]
            self.logger.warning(f"Input truncated to {self.security_config.max_input_length} characters")
        
        return sanitized
    
    def _content_filter(self, text: str) -> tuple[bool, str]:
        """Content filtering for inappropriate content"""
        if not self.security_config.enable_content_filtering:
            return True, ""
        
        # Simplified content filtering (use advanced NLP tools in production)
        prohibited_patterns = [
            r"\b(violence|violent|kill|murder)\b",
            r"\b(hate|hatred|discriminat)\b",
            r"\b(illegal|unlawful|criminal)\b",
            r"\b(harmful|dangerous|toxic)\b"
        ]
        
        import re
        text_lower = text.lower()
        
        for pattern in prohibited_patterns:
            if re.search(pattern, text_lower):
                return False, f"Content contains prohibited pattern: {pattern}"
        
        return True, ""
    
    def secure_generate(
        self,
        prompt: str,
        client_id: str,
        max_tokens: Optional[int] = None,
        temperature: float = 0.7
    ) -> Dict[str, Any]:
        """Generate response with comprehensive security measures"""
        
        hashed_client = self._hash_client_id(client_id)
        
        try:
            # Rate limiting
            if not self._rate_limit_check(client_id):
                return {
                    "success": False,
                    "error": "Rate limit exceeded",
                    "error_code": "RATE_LIMIT_EXCEEDED",
                    "retry_after": 60
                }
            
            # Input validation and sanitization
            if not isinstance(prompt, str) or len(prompt.strip()) == 0:
                return {
                    "success": False,
                    "error": "Invalid prompt",
                    "error_code": "INVALID_INPUT"
                }
            
            sanitized_prompt = self._sanitize_input(prompt)
            
            # Content filtering
            is_safe, filter_reason = self._content_filter(sanitized_prompt)
            if not is_safe:
                self.logger.warning(f"Content filtered for client {hashed_client}: {filter_reason}")
                return {
                    "success": False,
                    "error": "Content violates safety guidelines",
                    "error_code": "CONTENT_FILTERED"
                }
            
            # Security logging
            if self.security_config.log_requests:
                self.logger.info(f"Processing secure request from client {hashed_client}")
            
            # Validate token limits
            max_tokens = min(
                max_tokens or self.security_config.max_output_tokens,
                self.security_config.max_output_tokens
            )
            
            # Generate response
            start_time = time.time()
            
            messages = [{"role": "user", "content": sanitized_prompt}]
            formatted_prompt = self.tokenizer.apply_chat_template(
                messages,
                tokenize=False,
                add_generation_prompt=True
            )
            
            inputs = self.tokenizer(formatted_prompt, return_tensors="pt").to(self.model.device)
            
            with torch.no_grad():
                outputs = self.model.generate(
                    **inputs,
                    max_new_tokens=max_tokens,
                    temperature=temperature,
                    top_p=0.9,
                    repetition_penalty=1.05,
                    do_sample=True,
                    pad_token_id=self.tokenizer.eos_token_id,
                    early_stopping=True
                )
            
            response = self.tokenizer.decode(
                outputs[0][inputs['input_ids'].shape[1]:],
                skip_special_tokens=True
            ).strip()
            
            generation_time = time.time() - start_time
            
            # Filter response content
            is_safe_response, response_filter_reason = self._content_filter(response)
            if not is_safe_response:
                self.logger.warning(f"Response filtered for client {hashed_client}: {response_filter_reason}")
                return {
                    "success": False,
                    "error": "Generated response violates safety guidelines",
                    "error_code": "RESPONSE_FILTERED"
                }
            
            # Success response
            self.logger.info(f"Secure generation completed for client {hashed_client} in {generation_time:.2f}s")
            
            return {
                "success": True,
                "response": response,
                "generation_time": generation_time,
                "tokens_used": max_tokens,
                "model": "BitNET-1.58bit",
                "security_verified": True
            }
            
        except Exception as e:
            self.logger.error(f"Secure generation failed for client {hashed_client}: {str(e)}")
            return {
                "success": False,
                "error": "Internal processing error",
                "error_code": "GENERATION_ERROR"
            }
    
    def get_security_metrics(self) -> Dict[str, Any]:
        """Get comprehensive security metrics"""
        with self.security_lock:
            total_clients = len(self.request_history)
            total_requests = sum(len(requests) for requests in self.request_history.values())
            blocked_count = len(self.blocked_requests)
            
            recent_blocks = [
                block for block in self.blocked_requests
                if time.time() - block["timestamp"] < 3600  # Last hour
            ]
            
            return {
                "total_unique_clients": total_clients,
                "total_requests_processed": total_requests,
                "total_blocked_requests": blocked_count,
                "recent_blocks_last_hour": len(recent_blocks),
                "security_config": {
                    "max_input_length": self.security_config.max_input_length,
                    "max_output_tokens": self.security_config.max_output_tokens,
                    "rate_limit_per_minute": self.security_config.rate_limit_requests_per_minute,
                    "content_filtering_enabled": self.security_config.enable_content_filtering,
                    "request_logging_enabled": self.security_config.log_requests
                },
                "service_status": "secure_operational"
            }

# Example secure deployment
def secure_bitnet_example():
    """Demonstrate secure BitNET deployment"""
    
    # Configure security settings
    security_config = SecurityConfig(
        max_input_length=2048,
        max_output_tokens=512,
        rate_limit_requests_per_minute=30,
        enable_content_filtering=True,
        log_requests=True,
        sanitize_inputs=True
    )
    
    # Initialize secure service
    secure_service = SecureBitNETService(security_config=security_config)
    
    print("=== Secure BitNET Service Demo ===\n")
    
    # Test legitimate requests
    legitimate_requests = [
        {
            "prompt": "Explain the benefits of renewable energy for sustainable development",
            "client_id": "client_001"
        },
        {
            "prompt": "How do 1-bit neural networks contribute to energy-efficient AI?",
            "client_id": "client_002"
        },
        {
            "prompt": "What are the deployment advantages of BitNET models?",
            "client_id": "client_001"  # Same client
        }
    ]
    
    print("Processing legitimate requests:")
    for i, req in enumerate(legitimate_requests):
        result = secure_service.secure_generate(
            prompt=req["prompt"],
            client_id=req["client_id"],
            max_tokens=150
        )
        
        if result["success"]:
            print(f"\n✅ Request {i+1} (Client: {req['client_id']}):")
            print(f"Response: {result['response'][:100]}...")
            print(f"Time: {result['generation_time']:.2f}s")
        else:
            print(f"\n❌ Request {i+1} failed: {result['error']} ({result['error_code']})")
    
    # Test security features
    print(f"\n=== Security Feature Tests ===\n")
    
    # Test rate limiting
    print("Testing rate limiting...")
    for i in range(5):
        result = secure_service.secure_generate(
            prompt="Quick test",
            client_id="rate_test_client",
            max_tokens=10
        )
        
        if not result["success"] and result["error_code"] == "RATE_LIMIT_EXCEEDED":
            print(f"✅ Rate limiting triggered after {i} requests")
            break
    else:
        print("Rate limiting not triggered (may need more requests)")
    
    # Test content filtering
    print("\nTesting content filtering...")
    filtered_prompt = "This content contains harmful and dangerous information"
    result = secure_service.secure_generate(
        prompt=filtered_prompt,
        client_id="filter_test_client",
        max_tokens=50
    )
    
    if not result["success"] and result["error_code"] == "CONTENT_FILTERED":
        print("✅ Content filtering working correctly")
    else:
        print("⚠️ Content filtering may need adjustment")
    
    # Security metrics
    metrics = secure_service.get_security_metrics()
    print(f"\n=== Security Metrics ===")
    print(f"Total Unique Clients: {metrics['total_unique_clients']}")
    print(f"Total Requests: {metrics['total_requests_processed']}")
    print(f"Blocked Requests: {metrics['total_blocked_requests']}")
    print(f"Service Status: {metrics['service_status']}")
    print(f"Rate Limit: {metrics['security_config']['rate_limit_per_minute']}/min")

# secure_bitnet_example()
```

### Monitoring and Performance Analytics

```python
import time
import psutil
import threading
import json
from datetime import datetime, timedelta
from typing import Dict, List, Optional, Tuple
from dataclasses import dataclass, asdict
import torch
import statistics

@dataclass
class PerformanceSnapshot:
    """Detailed performance snapshot for BitNET"""
    timestamp: float
    memory_usage_mb: float
    cpu_usage_percent: float
    gpu_memory_mb: Optional[float]
    tokens_per_second: float
    active_requests: int
    cache_hit_rate: float
    error_rate: float
    average_latency_ms: float

class BitNETMonitoringService:
    """Comprehensive monitoring service for BitNET deployments"""
    
    def __init__(self, monitoring_interval: float = 60.0):
        self.monitoring_interval = monitoring_interval
        self.performance_history: List[PerformanceSnapshot] = []
        self.request_metrics = {
            "total_requests": 0,
            "successful_requests": 0,
            "failed_requests": 0,
            "total_tokens_generated": 0,
            "total_generation_time": 0.0,
            "cache_hits": 0,
            "cache_misses": 0
        }
        
        # Alerting thresholds
        self.alert_thresholds = {
            "max_memory_mb": 1024,
            "max_cpu_percent": 80,
            "min_tokens_per_second": 5.0,
            "max_error_rate": 0.05,
            "max_latency_ms": 5000
        }
        
        # Monitoring state
        self.monitoring_active = False
        self.monitoring_thread = None
        self.alerts = []
        self.lock = threading.Lock()
    
    def start_monitoring(self):
        """Start background monitoring"""
        if self.monitoring_active:
            return
        
        self.monitoring_active = True
        self.monitoring_thread = threading.Thread(target=self._monitoring_loop, daemon=True)
        self.monitoring_thread.start()
        print("BitNET monitoring started")
    
    def stop_monitoring(self):
        """Stop background monitoring"""
        self.monitoring_active = False
        if self.monitoring_thread:
            self.monitoring_thread.join(timeout=5)
        print("BitNET monitoring stopped")
    
    def _monitoring_loop(self):
        """Background monitoring loop"""
        while self.monitoring_active:
            try:
                snapshot = self._capture_performance_snapshot()
                
                with self.lock:
                    self.performance_history.append(snapshot)
                    
                    # Keep only last 24 hours of data
                    cutoff_time = time.time() - 24 * 3600
                    self.performance_history = [
                        s for s in self.performance_history
                        if s.timestamp > cutoff_time
                    ]
                
                # Check for alerts
                self._check_alerts(snapshot)
                
                time.sleep(self.monitoring_interval)
                
            except Exception as e:
                print(f"Monitoring error: {e}")
                time.sleep(self.monitoring_interval)
    
    def _capture_performance_snapshot(self) -> PerformanceSnapshot:
        """Capture current performance metrics"""
        
        # System metrics
        memory_usage = psutil.Process().memory_info().rss / 1024 / 1024
        cpu_usage = psutil.cpu_percent(interval=1)
        
        # GPU metrics
        gpu_memory = None
        if torch.cuda.is_available():
            gpu_memory = torch.cuda.memory_allocated() / 1024 / 1024
        
        # Calculate derived metrics
        with self.lock:
            total_requests = self.request_metrics["total_requests"]
            successful_requests = self.request_metrics["successful_requests"]
            failed_requests = self.request_metrics["failed_requests"]
            total_generation_time = self.request_metrics["total_generation_time"]
            total_tokens = self.request_metrics["total_tokens_generated"]
            cache_hits = self.request_metrics["cache_hits"]
            cache_misses = self.request_metrics["cache_misses"]
        
        # Calculate rates
        tokens_per_second = total_tokens / max(0.001, total_generation_time)
        error_rate = failed_requests / max(1, total_requests)
        cache_hit_rate = cache_hits / max(1, cache_hits + cache_misses)
        average_latency = (total_generation_time / max(1, successful_requests)) * 1000  # ms
        
        return PerformanceSnapshot(
            timestamp=time.time(),
            memory_usage_mb=memory_usage,
            cpu_usage_percent=cpu_usage,
            gpu_memory_mb=gpu_memory,
            tokens_per_second=tokens_per_second,
            active_requests=0,  # Would need request tracking
            cache_hit_rate=cache_hit_rate,
            error_rate=error_rate,
            average_latency_ms=average_latency
        )
    
    def _check_alerts(self, snapshot: PerformanceSnapshot):
        """Check performance snapshot against alert thresholds"""
        alerts = []
        
        if snapshot.memory_usage_mb > self.alert_thresholds["max_memory_mb"]:
            alerts.append({
                "type": "memory",
                "severity": "warning",
                "message": f"High memory usage: {snapshot.memory_usage_mb:.1f}MB",
                "timestamp": snapshot.timestamp
            })
        
        if snapshot.cpu_usage_percent > self.alert_thresholds["max_cpu_percent"]:
            alerts.append({
                "type": "cpu",
                "severity": "warning",
                "message": f"High CPU usage: {snapshot.cpu_usage_percent:.1f}%",
                "timestamp": snapshot.timestamp
            })
        
        if snapshot.tokens_per_second < self.alert_thresholds["min_tokens_per_second"]:
            alerts.append({
                "type": "performance",
                "severity": "warning",
                "message": f"Low generation speed: {snapshot.tokens_per_second:.1f} tokens/s",
                "timestamp": snapshot.timestamp
            })
        
        if snapshot.error_rate > self.alert_thresholds["max_error_rate"]:
            alerts.append({
                "type": "reliability",
                "severity": "critical",
                "message": f"High error rate: {snapshot.error_rate:.2%}",
                "timestamp": snapshot.timestamp
            })
        
        if snapshot.average_latency_ms > self.alert_thresholds["max_latency_ms"]:
            alerts.append({
                "type": "latency",
                "severity": "warning",
                "message": f"High latency: {snapshot.average_latency_ms:.1f}ms",
                "timestamp": snapshot.timestamp
            })
        
        if alerts:
            with self.lock:
                self.alerts.extend(alerts)
                # Keep only recent alerts (last 6 hours)
                cutoff = time.time() - 6 * 3600
                self.alerts = [a for a in self.alerts if a["timestamp"] > cutoff]
    
    def record_request(self, success: bool, generation_time: float, tokens_generated: int, cache_hit: bool = False):
        """Record metrics for a completed request"""
        with self.lock:
            self.request_metrics["total_requests"] += 1
            
            if success:
                self.request_metrics["successful_requests"] += 1
                self.request_metrics["total_generation_time"] += generation_time
                self.request_metrics["total_tokens_generated"] += tokens_generated
            else:
                self.request_metrics["failed_requests"] += 1
            
            if cache_hit:
                self.request_metrics["cache_hits"] += 1
            else:
                self.request_metrics["cache_misses"] += 1
    
    def get_performance_summary(self, hours: int = 24) -> Dict[str, any]:
        """Get comprehensive performance summary"""
        cutoff_time = time.time() - hours * 3600
        
        with self.lock:
            recent_snapshots = [
                s for s in self.performance_history
                if s.timestamp > cutoff_time
            ]
        
        if not recent_snapshots:
            return {"error": "No recent performance data available"}
        
        # Calculate statistics
        memory_values = [s.memory_usage_mb for s in recent_snapshots]
        cpu_values = [s.cpu_usage_percent for s in recent_snapshots]
        tps_values = [s.tokens_per_second for s in recent_snapshots]
        latency_values = [s.average_latency_ms for s in recent_snapshots]
        
        summary = {
            "time_period_hours": hours,
            "data_points": len(recent_snapshots),
            "memory_usage": {
                "average_mb": statistics.mean(memory_values),
                "peak_mb": max(memory_values),
                "min_mb": min(memory_values)
            },
            "cpu_usage": {
                "average_percent": statistics.mean(cpu_values),
                "peak_percent": max(cpu_values)
            },
            "performance": {
                "average_tokens_per_second": statistics.mean(tps_values),
                "peak_tokens_per_second": max(tps_values),
                "average_latency_ms": statistics.mean(latency_values)
            },
            "reliability": {
                "total_requests": self.request_metrics["total_requests"],
                "success_rate": self.request_metrics["successful_requests"] / max(1, self.request_metrics["total_requests"]),
                "cache_hit_rate": self.request_metrics["cache_hits"] / max(1, self.request_metrics["cache_hits"] + self.request_metrics["cache_misses"])
            }
        }
        
        # Add GPU metrics if available
        gpu_values = [s.gpu_memory_mb for s in recent_snapshots if s.gpu_memory_mb is not None]
        if gpu_values:
            summary["gpu_memory"] = {
                "average_mb": statistics.mean(gpu_values),
                "peak_mb": max(gpu_values)
            }
        
        return summary
    
    def get_active_alerts(self) -> List[Dict[str, any]]:
        """Get currently active alerts"""
        with self.lock:
            return self.alerts.copy()
    
    def export_metrics(self, filepath: str, hours: int = 24):
        """Export detailed metrics to file"""
        cutoff_time = time.time() - hours * 3600
        
        with self.lock:
            export_data = {
                "export_timestamp": datetime.now().isoformat(),
                "time_period_hours": hours,
                "performance_snapshots": [
                    asdict(s) for s in self.performance_history
                    if s.timestamp > cutoff_time
                ],
                "request_metrics": self.request_metrics.copy(),
                "active_alerts": self.alerts.copy(),
                "alert_thresholds": self.alert_thresholds.copy(),
                "performance_summary": self.get_performance_summary(hours)
            }
        
        with open(filepath, 'w') as f:
            json.dump(export_data, f, indent=2, default=str)
        
        print(f"Metrics exported to {filepath}")

# Example monitoring usage
def bitnet_monitoring_example():
    """Demonstrate comprehensive BitNET monitoring"""
    
    from transformers import AutoModelForCausalLM, AutoTokenizer
    
    # Initialize monitoring
    monitor = BitNETMonitoringService(monitoring_interval=5.0)  # 5 second intervals for demo
    monitor.start_monitoring()
    
    # Load BitNET model
    print("Loading BitNET model for monitoring demo...")
    model_name = "microsoft/bitnet-b1.58-2B-4T"
    tokenizer = AutoTokenizer.from_pretrained(model_name)
    model = AutoModelForCausalLM.from_pretrained(
        model_name,
        torch_dtype=torch.bfloat16,
        device_map="auto",
        trust_remote_code=True
    )
    
    # Simulate workload
    test_prompts = [
        "Explain machine learning concepts",
        "What are the benefits of renewable energy?",
        "How does quantum computing work?",
        "Describe sustainable development goals",
        "What is artificial intelligence?"
    ]
    
    print("Simulating BitNET workload...")
    
    for i, prompt in enumerate(test_prompts):
        messages = [{"role": "user", "content": prompt}]
        formatted_prompt = tokenizer.apply_chat_template(
            messages,
            tokenize=False,
            add_generation_prompt=True
        )
        
        inputs = tokenizer(formatted_prompt, return_tensors="pt").to(model.device)
        
        start_time = time.time()
        
        try:
            with torch.no_grad():
                outputs = model.generate(
                    **inputs,
                    max_new_tokens=100,
                    temperature=0.7,
                    do_sample=True,
                    pad_token_id=tokenizer.eos_token_id
                )
            
            generation_time = time.time() - start_time
            tokens_generated = outputs.shape[1] - inputs['input_ids'].shape[1]
            
            # Record successful request
            monitor.record_request(
                success=True,
                generation_time=generation_time,
                tokens_generated=tokens_generated,
                cache_hit=(i % 3 == 0)  # Simulate some cache hits
            )
            
            print(f"Request {i+1}: {generation_time:.2f}s, {tokens_generated} tokens")
            
        except Exception as e:
            # Record failed request
            monitor.record_request(
                success=False,
                generation_time=time.time() - start_time,
                tokens_generated=0
            )
            print(f"Request {i+1} failed: {e}")
        
        time.sleep(2)  # Simulate request intervals
    
    # Wait for monitoring data collection
    time.sleep(10)
    
    # Get performance summary
    summary = monitor.get_performance_summary(hours=1)
    
    print("\n=== Performance Summary ===")
    print(f"Data Points: {summary['data_points']}")
    print(f"Average Memory: {summary['memory_usage']['average_mb']:.1f}MB")
    print(f"Peak Memory: {summary['memory_usage']['peak_mb']:.1f}MB")
    print(f"Average CPU: {summary['cpu_usage']['average_percent']:.1f}%")
    print(f"Average Speed: {summary['performance']['average_tokens_per_second']:.1f} tokens/s")
    print(f"Success Rate: {summary['reliability']['success_rate']:.2%}")
    print(f"Cache Hit Rate: {summary['reliability']['cache_hit_rate']:.2%}")
    
    # Check alerts
    alerts = monitor.get_active_alerts()
    if alerts:
        print(f"\n=== Active Alerts ({len(alerts)}) ===")
        for alert in alerts[-5:]:  # Show last 5 alerts
            print(f"[{alert['severity'].upper()}] {alert['type']}: {alert['message']}")
    else:
        print("\n✅ No active alerts")
    
    # Export metrics
    monitor.export_metrics("bitnet_metrics_report.json", hours=1)
    
    # Stop monitoring
    monitor.stop_monitoring()
    
    print("\nMonitoring demo completed!")

# bitnet_monitoring_example()
```

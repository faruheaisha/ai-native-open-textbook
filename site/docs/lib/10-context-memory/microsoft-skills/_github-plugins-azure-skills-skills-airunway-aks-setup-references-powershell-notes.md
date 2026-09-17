---
title: "PowerShell Command Variants"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/airunway-aks-setup/references/powershell-notes.md"
sourceRel: ".github/plugins/azure-skills/skills/airunway-aks-setup/references/powershell-notes.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/airunway-aks-setup/references/powershell-notes.md"
sourceSha256: "82ee93effe3c62b87ff4b9520a06c814ccd42f8d25a620781865f8a564c91e81"
pageSha256: "82ee93effe3c62b87ff4b9520a06c814ccd42f8d25a620781865f8a564c91e81"
contentMode: "local-full"
zh: ""
---

# PowerShell Command Variants

This reference provides PowerShell equivalents for commands in steps 1, 4, 5, and 6 that use Bash-specific syntax.

## Prerequisite Check (Step 1)

```powershell
@('kubectl', 'make', 'curl') | ForEach-Object {
  if (Get-Command $_ -ErrorAction SilentlyContinue) {
    Write-Host "✓ $_ found"
  } else {
    Write-Host "✗ $_ NOT FOUND — install before continuing"
  }
}
```

## GPU Detection (Step 1)

```powershell
# Extract GPU count and model per node (requires NVIDIA device plugin labels)
# PowerShell does not need the bash single-quote escaping — pass the jsonpath directly
kubectl get nodes -o jsonpath='{range .items[*]}{.metadata.name}{"\t"}{.status.allocatable.nvidia\.com/gpu}{"\t"}{.metadata.labels.nvidia\.com/gpu\.product}{"\n"}{end}'
```

> **Note:** If the output shows empty GPU fields, use the fallback:

```powershell
kubectl describe nodes | Select-String -Pattern "nvidia" -Context 0,2
```

## Provider Check (Step 4)

```powershell
# Check if providers are already registered (errors indicate CRD not yet installed — expected on a fresh cluster)
kubectl get inferenceproviderconfigs --all-namespaces
```

## Provider Discovery (Step 4)

```powershell
# List available providers
Get-ChildItem providers/

# Check default image for a provider
Get-Content providers/<provider>/Makefile | Select-String -Pattern 'IMG\s*\?='
```

## HuggingFace Token Secret (Step 5)

```powershell
$token = Read-Host -Prompt "HuggingFace token" -AsSecureString
$bstr = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($token)
try {
  [System.Runtime.InteropServices.Marshal]::PtrToStringAuto($bstr) |
    Set-Content -NoNewline -Encoding UTF8 -Path "$env:TEMP\hf-token.txt"
} finally {
  [System.Runtime.InteropServices.Marshal]::ZeroFreeBSTR($bstr)
}

kubectl create secret generic hf-token `
  --from-file=token="$env:TEMP\hf-token.txt" `
  -n <namespace> `
  --dry-run=client -o yaml | kubectl apply -f -

Remove-Item -Force "$env:TEMP\hf-token.txt"
```

## ModelDeployment CR (Step 5)

**For gated models (Llama etc.):**

```powershell
$manifest = @"
apiVersion: airunway.ai/v1alpha1
kind: ModelDeployment
metadata:

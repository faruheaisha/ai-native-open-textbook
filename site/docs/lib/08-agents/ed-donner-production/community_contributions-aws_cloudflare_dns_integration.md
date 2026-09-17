---
title: "AI in Production"
sourceId: "08-agents/ed-donner-production"
sourceTitle: "AI in Production"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://github.com/ed-donner/production"
entryUrl: "https://github.com/ed-donner/production/blob/daeb3dae34be3287842ea7faa3e6f4cba467028b/community_contributions/aws_cloudflare_dns_integration.md"
sourceRel: "community_contributions/aws_cloudflare_dns_integration.md"
rawUrl: "/raw/08-agents/ed-donner-production/community_contributions/aws_cloudflare_dns_integration.md"
sourceSha256: "1365ec647fa57b99c5b221673b5cdbbc7758da04201297158f477a3c75b3e4b6"
pageSha256: "1365ec647fa57b99c5b221673b5cdbbc7758da04201297158f477a3c75b3e4b6"
contentMode: "local-full"
zh: ""
---

# AI in Production

For the people not use route53 like me but Cloudflare as domain provider, CloudFront has a convenient 3-step flow for this:

### 1. CloudFront -> Distributions -> Add domain

Open your distribution, choose **Add domain** and enter the domain you want to use, for example:

```text
www.your-domain.com
```

CloudFront then walks you through:

```text
Step 1: Configure domains
Step 2: Get TLS certificate
Step 3: Review changes
```

### 2. Configure domains

Add your custom domain:

```text
www.your-domain.com
```

CloudFront will associate this hostname with the distribution.

### 3. Get TLS certificate

Choose to create or use an ACM certificate.

For CloudFront, the certificate must be in:

```text
us-east-1 (N. Virginia)
```

Even if your AWS application itself is running in a region like `us-west-1`.

CloudFront will give you a DNS validation CNAME record. Go to:

```
Cloudflare -> DNS -> Records
```

and add that CNAME as **DNS only**, not proxied.

After adding the validation record in Cloudflare, ACM may remain on "Pending validation" for a minute or two. That's normal. Just wait for it to become:

```text
Issued
```

### 4. Review changes

Once the certificate is validated, review the configuration and apply the changes to the CloudFront distribution.

### 5. Point Cloudflare to CloudFront

In Cloudflare DNS, create:

```text
Type: CNAME
Name: www
Target: xxx.cloudfront.net
Proxy: DNS only
```

For the root domain:

```text
Type: CNAME
Name: @
Target: xxx.cloudfront.net
Proxy: DNS only
```

### 6. Enable HTTPS

In:

```
CloudFront -> Distribution -> Behaviors -> Edit
```

set Viewer protocol policy to:

```text
HTTPS only
```

or, for a normal public website:

```text
Redirect HTTP to HTTPS
```

Final flow:

```text
www.your-domain.com
      |
      v
Cloudflare DNS
      |
      v
CloudFront + ACM TLS
      |
      v
AWS origin
```

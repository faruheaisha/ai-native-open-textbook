---
title: "Spring Dependency Configuration Patterns"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-cloud-migrate/references/services/container-apps/spring-dependency-patterns.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-cloud-migrate/references/services/container-apps/spring-dependency-patterns.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-cloud-migrate/references/services/container-apps/spring-dependency-patterns.md"
sourceSha256: "3ce796085ff758858ab29a4c2fd7afd9707ad65707aa8488e301485f8d7a5a82"
pageSha256: "3ce796085ff758858ab29a4c2fd7afd9707ad65707aa8488e301485f8d7a5a82"
contentMode: "local-full"
zh: ""
---

# Spring Dependency Configuration Patterns

Common dependency and configuration patterns to identify during assessment.

## Database Configuration

**Maven (pom.xml):**
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>
```

**application.properties:**
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/mydb
spring.datasource.username=dbuser
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
```

**application.yml:**
```yaml
spring:
  data:
    mongodb:
      uri: mongodb://<username>:<password>@server:27017
```

## JMS Message Brokers

**ActiveMQ (pom.xml):**
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-activemq</artifactId>
</dependency>
```

**application.properties:**
```properties
spring.activemq.broker-url=tcp://localhost:61616
spring.activemq.user=admin
```

## External Caches

**Redis with Spring Data Redis:**
- Check for `spring-boot-starter-data-redis` dependency
- Review application.properties for Redis connection strings
- Check for Spring Session configuration (in-memory → Redis)

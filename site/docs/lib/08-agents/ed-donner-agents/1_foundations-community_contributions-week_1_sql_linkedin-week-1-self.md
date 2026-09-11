---
title: "Q&A Database Schema and Example"
sourceId: "08-agents/ed-donner-agents"
sourceTitle: "Ed Donner：AI Agents 实战课"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://github.com/ed-donner/agents"
entryUrl: ""
zh: ""
---

# Q&A Database Schema and Example

## ✅ 1. Create the Table

```sql
CREATE TABLE qa (
    id SERIAL PRIMARY KEY,
    question TEXT NOT NULL,
    answer TEXT NOT NULL
);

INSERT INTO qa (question, answer) VALUES
('What are your hobbies ?', 'playing guitar');

SELECT * FROM qa;

---

### ✅ Save this as `qa.md`.

When viewed in a Markdown viewer, it will display nicely formatted code blocks and a table.

Would you like me to export this into an actual `.md` file for you?

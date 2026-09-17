---
title: "Appendix 1: Common Computer Terminology Quick Reference"
sourceId: "07-coding/easy-vibe"
sourceTitle: "Easy-Vibe（Datawhale：从零做出真实产品）"
sourceKind: "课时教程"
licenseLabel: "限非商用"
lang: "中英混排"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/datawhalechina/easy-vibe"
entryUrl: "https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/en/stage-1/introduction-to-ai-ide/index.md"
sourceRel: "docs/en/stage-1/introduction-to-ai-ide/index.md"
rawUrl: "/raw/07-coding/easy-vibe/docs/en/stage-1/introduction-to-ai-ide/index.md"
sourceSha256: "13fd25e7d82dd0da51b31d7f243a2a4f837d06416066b43c09ca80a2273228b8"
pageSha256: "1d580237879f5d7fb3213bb12a79d5e36247290b05b693d47f590aa626005e42"
contentMode: "local-full"
zh: ""
---

# Appendix 1: Common Computer Terminology Quick Reference

You don't need to deliberately memorize this section. What's more important is to first establish an impression in your mind.

## <span id="term-tool-ui">[1. Words Related to "Tool Interface"](#appendix-1-map)</span>

### 1. IDE, Editor, Terminal

**IDE (Integrated Development Environment)**
You can think of an IDE as a "programmer's workbench":

- One side is a writing desk (editor),
- One side has power outlets and buttons (run, debug),
- Drawers contain various small tools (search, version management).
  VS Code, Trae, Cursor all belong to IDEs or tools based on IDEs.

**Code Editor (Editor)**
More like an "advanced notepad," only responsible for:

- Letting you type code;
- Using colors to distinguish different content (syntax highlighting);
- Giving you auto-completion.
  The area in the IDE where you write code is the code editor.

**Terminal / Command Line (Terminal / Command Line Window)**
A window with black background and white text, where you **input commands** for the computer to work:

- For example: `npm run dev` means "help me start the development server";
- `python main.py` means "run this Python file."
  You can think of it as: "You send the computer text message commands one by one, and it replies with execution results in text."

### 2. Several Common Areas in the IDE

**Activity Bar**
The row of small vertical icons on the far left, like "function tabs":

- Click file icon → file list displays on the left;
- Click magnifying glass icon → left becomes search;
- Click Git icon → left displays version management.

**Side Bar**
The large area to the right of the Activity Bar, specifically displaying content for the current mode:

- File mode: shows files and folders in the project;
- Search mode: shows search results list;
- Source control mode: shows which files have been modified.

**Editor Area**
The largest area in the middle, where you actually see and modify content after opening a file;
The tabs above are "which files are currently open."

**Panel**
Generally at the bottom, common types include:

- Terminal: input commands to run projects;
- Problems: lists error files and line numbers;
- Output: some tool-printed runtime information;
- Debug Console: output during debugging.

**Status Bar**
The thin bar at the very bottom:

- Displays what language the current file is (JS, HTML, Python, etc.);
- Displays whether indentation is "2 spaces" or "4 spaces";
- Displays whether there are errors, what the current Git branch is.
  You can think of it as "a small health check of the current editing environment."

## <span id="term-network">[2. Words Related to "Webpage / Network / Service"](#appendix-1-map)</span>

### 1. URL, HTTP, Port, Local Service

**URL (Web Address)**
That string of things in the browser address bar, such as:

- `https://www.trae.cn/`
- `http://localhost:3000/`
  It's like "the complete address of a room in the internet world."

**HTTP / HTTPS**
The `http://` or `https://` you see at the beginning of a URL:

- HTTP: ordinary transmission method;
- HTTPS: adds a layer of encryption, more secure.
  You can first remember: "When writing webpage addresses, usually start with `http` or `https`."

**Port (Port)**
You can imagine a computer as a building, and ports are **room numbers for each room**:

- `:3000` means room 3000;
- The same computer can run multiple services simultaneously, each occupying a port.
  `http://localhost:3000` means "access the service running in room 3000 on my own computer."

**Local (Local / localhost)**
Refers to your own computer.

- `localhost` can be understood as "this machine itself."
  When you access `http://localhost:3000`, you're actually interacting with a program running on your own computer, not accessing someone else's server online.

**Service (Service / Server)**
A "service" is a **program that keeps running in the background, always listening for your commands**:

- Web service: when a browser accesses an address, it returns webpage content;
- Game service: responsible for managing matches, saves, leaderboards, etc.
  Executing `npm run dev` in the terminal to start a project is essentially "opening a web service locally."

## <span id="term-frontend-backend">[3. Words Related to "Frontend / Backend / Data"](#appendix-1-map)</span>

### 1. Frontend, Backend

**Frontend**
The part that users **can see and click**:

- Buttons, text, images, animations on webpages;
- Pages written in React / Vue.
  Responsible for displaying interfaces and responding to user operations (clicks, inputs, drags, etc.).

**Backend**
The part that users **cannot see**, running on the server:

- Storing and reading data (user information, orders, scores, etc.);
- Executing business rules (login verification, permission judgment).
  You can think of frontend as "storefront and clerk," and backend as "warehouse and ledger system."

### 2. Interface, Request, Response, JSON

**Interface / API**
A set of "question + answer" rules agreed upon in advance between frontend and backend.

- Frontend says: "I'll ask you using this address, this format";
- Backend says: "I'll return results to you in this format."

**Request (Request)**
A "question" sent from frontend to backend:

- Where is the request going (URL);
- What method is used (GET, POST, etc.);
- What parameters are brought (such as user ID).

**Response (Response)**
The "answer" given by backend to frontend:

- Status code (200 success, 404 not found, 500 server error);
- Actual data (mostly JSON).

**JSON**
A format for representing data using **syntax very similar to JavaScript code**, such as:

```json
{
  "name": "Alice",
  "score": 120
}
```

Can be understood as "a machine version of key-value notepad," often used by frontend and backend to exchange data.

## <span id="term-code-basic">[4. Words Related to "Writing Code Itself"](#appendix-1-map)</span>

### 1. Variable, Identifier, State

**Variable (Variable)**
"A label attached to a piece of data."

- For example, recording the score as `score`;
- Later using the name `score`, you can read and write this data:

```js
let score = 0
score = score + 10
```

**Identifier (Identifier)**
A general term for "various names you give yourself":

- Variable name: `score`
- Function name: `moveSnake`
- Component name: `SnakeGame`
  Like naming folders "Photos," "Work," "Bills" for easy distinction between different "things" in code.

**State (State)**
The "key situation record" of the program's current state:

- Whether the game has ended;
- Which grid the snake is currently on;
- What the current score is.
  In React, it's generally understood this way: **when state changes, the interface must follow and update**.

### 2. Function, Component, Module

**Function (Function)**
Package something that "can be done repeatedly" and give it a name:

```js
function sayHello(name) {
  console.log('Hello, ' + name)
}
```

Later, just writing `sayHello('Bob')` equals executing those lines again.

**Component (Component)**
In frontend, "a small interface + small logic that can be reused":

- A button can be a component;
- A top navigation can be a component;
- The entire game area can also be a component.
  Components can be assembled together, like building with LEGO.

**Module (Module)**
"A file composed of a group of related codes":

- `snakeLogic.ts` specifically stores code related to "how the snake moves";
- `score.ts` specifically stores code for calculating scores.
  Modules can "import / export" between each other, like tools in different drawers.

### 3. Syntax, Programming Language, Framework

**Syntax (Syntax)**
The "grammar rules" and "punctuation habits" of a programming language:

- Strings need quotes;
- Whether to write a semicolon at the end of each statement;
- Code blocks need to be wrapped in `\{\}`.
  Writing syntax errors, compilers / interpreters will directly report "syntax errors."

**Programming Language (Programming Language)**
A complete set of rules and vocabulary for communicating with computers, such as:

- JavaScript, Python, Java, C++, Go...
  Different languages are suitable for different things, have different writing styles and tool ecosystems.

**Framework (Framework)**
A large set of code and patterns that others have "pre-built the skeleton" for you:

- Frontend: React, Vue (helping you handle interface updates, state management, etc.);
- Backend: Django, Spring Boot, etc.
  You're essentially "filling in content on a ready-made skeleton," much easier than building from scratch.

## <span id="term-debug">[5. Words Related to "Debugging / Troubleshooting"](#appendix-1-map)</span>

### 1. Bug, Error, Log / console.log

**Bug**
When program behavior differs from what you expect, that's a bug:

- Buttons that should appear don't appear;
- Should add 10 points but added a bunch more;
- Page shows white screen as soon as it opens.

**Error Message (Error Message)**
That "scary-looking" English that appears on the screen / in the terminal after a program crashes.
Although ugly, it usually tells you:

- Roughly where the error is;
- Which file, near which line needs checking.
  You can directly copy it and throw it to AI for translation and analysis.

**Log (Log)**
What the program "says" during operation.
Most common in frontend is:

```js
console.log('Current score', score)
```

You can think of it as: **actively reporting numbers at key steps to confirm whether the program is running as you expect**.

> **What is console.log?**
>
> - `console` can be understood as "a small blackboard for debugging";
> - `.log` is "writing a line on the small blackboard";
> - Press F12 in the browser to open the Console panel in developer tools to see these outputs.

### 2. Debug, Breakpoint, Step-by-Step Execution, Snapshot

**Debug (Debug / Debugging)**
When a program has problems, instead of randomly modifying:

- Let the program pause at a certain line (breakpoint);
- Look at the value of each variable at the moment;
- Walk through step by step, observing "where it starts to go wrong."

**Breakpoint (Breakpoint)**
You can think of a breakpoint as "a pause button inserted at this line":

- Programs normally run all the way through;
- When running to the line where you inserted the breakpoint, it will temporarily stop and wait for your inspection.

**Step-by-Step Execution (Step)**
After stopping from a breakpoint, you can choose:

- Execute line by line (step over);
- Go inside a certain function to see details (step into).
  Like watching a dance broken down into moves, rather than watching a fast-forward video directly.

**Snapshot (Snapshot) — Simplified Understanding**
Here "snapshot" can be understood as:

> **Taking a photo of the "current state" at a certain point in time for future comparison.**
> In actual tools, "snapshot" may refer to:

- The complete state of the project at the moment of a commit;
- The overall situation of memory / variables at a certain point during debugging.
  Just remember this analogy for now: **snapshot ≈ a photo of state at a certain moment**.

## <span id="term-project">[6. Words Related to "Project Management"](#appendix-1-map)</span>

### 1. Project, Workspace, Folder

**Project (Project)**
For implementing an application, placed in the same folder:

- Source code files
- Configuration files
- Assets (images, audio, etc.)

**Workspace (Workspace)**
A concept used by VS Code / Trae to describe "what group of things is currently open this time":

- Opening a folder → a simple workspace;
- Sometimes multiple folders are combined into a multi-project workspace.

### 2. Git, Repository, Commit

**Git (Version Control Tool)**
Can be understood as a "time machine" for projects:

- After each batch of modifications, you can "take a version photo";
- When needed in the future, you can return to a certain historical state.

**Repository (Repository / Repo)**
After enabling Git, that project folder with "version records" is called a "repository."

**Commit (Commit)**
Every time you feel "this round of modifications counts as a meaningful milestone," you can:

- Write a description (such as: `Add score panel`);
- Package all current modifications into a version;
- Git will save the state at this moment.
  This action is called "making a commit."

## <span id="term-ai-tool">[7. Words Related to "AI Development Tools"](#appendix-1-map)</span>

### 1. AI IDE, Agent, SOLO Mode

**AI IDE**
On the basis of ordinary IDEs, adds a layer of AI that "can understand human language and take action itself":

- You say "make a Snake game," it can help you set up the project, write code;
- You give it a screenshot of an error, it can first explain then try to fix;
- It can modify across multiple files together, not just complete line by line.

**Agent (Agent)**
You can think of an Agent as an **AI junior engineer on long-term standby**:

- Will read your project structure;
- Will break down tasks (install dependencies first, then generate code, then run project);
- After errors occur, will adjust plans based on error information.

**SOLO Mode (taking Trae as an example)**
Means:

> You only need to clearly state the "destination,"
> It plans the "route" itself,
> Executes step by step locally,
> Only asks whether to continue at key nodes midway.

### 2. Model, Key (API Key)

**Model (Model, here specifically referring to large language models)**
This word can be simply understood as "that big AI brain behind it":

- Such as GPT, Claude, Kimi, GLM, etc.;
- Different models have different levels in "understanding Chinese," "writing code," "reasoning";
- AI IDEs usually allow switching between different models in dropdown menus.

**Key / API Key**
You can understand an API Key as **a very long "advanced password + ID number,"**
Its only function is:

> Tell someone else's server: "I'm which user, please allow me to use your AI service, and help me keep accounts."

Key points:

- This thing is usually a long string of random letters and numbers;
- Can't be sent to public places (repositories, screenshots, group chats), others can impersonate your account if they get it;
- Filling in the API Key in the tool is like "inserting the key into the lock," after which the tool can help you call the corresponding AI service.

## <span id="term-browser">[8. Words Related to "Browser / Developer Tools"](#appendix-1-map)</span>

**Chrome (Google Browser)**
One of the most commonly used browsers for frontend development now:

- Opens webpages fast;
- Comes with relatively strong "developer tools" for easy problem checking.

**Refresh (Refresh / Reload)**
Reload the current webpage:

- After modifying frontend code, if there are no automatic refresh tools, you need to manually refresh to see the effect.

**Developer Tools (DevTools)**
A set of tool panels in the browser specifically for developers:

- View webpage structure (Elements);
- View styles (Styles);
- Check errors and logs (Console);
- Check network requests (Network).
  In Chrome, usually opened by pressing `F12` or `Ctrl+Shift+I`.

**Console (Console)**
A tab in developer tools, specifically displaying:

- The output of your `console.log(...)`;
- Errors that occurred during operation (red text).
  You can think of it as "the program's chat box":
- When the program has something to say, it writes here;
- This is what you most often look at when debugging.

If you encounter new words in the learning process later, you can also have AI assist you in supplementing all content in this style:

- First write a sentence about "what it does";
- Then write a sentence about "what you can imagine it as";
- Finally give a particularly simple small example.
  This way your "personal glossary" will grow longer and more practical, gradually enabling better communication with computers.

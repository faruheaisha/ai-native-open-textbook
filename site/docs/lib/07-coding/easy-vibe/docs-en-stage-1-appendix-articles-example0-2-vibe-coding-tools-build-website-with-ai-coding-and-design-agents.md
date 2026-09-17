---
title: "Design a Website with Design and Coding Agents"
sourceId: "07-coding/easy-vibe"
sourceTitle: "Easy-Vibe（Datawhale：从零做出真实产品）"
sourceKind: "课时教程"
licenseLabel: "限非商用"
lang: "中英混排"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/datawhalechina/easy-vibe"
entryUrl: "https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/en/stage-1/appendix-articles/example0-2/vibe-coding-tools-build-website-with-ai-coding-and-design-agents.md"
sourceRel: "docs/en/stage-1/appendix-articles/example0-2/vibe-coding-tools-build-website-with-ai-coding-and-design-agents.md"
rawUrl: "/raw/07-coding/easy-vibe/docs/en/stage-1/appendix-articles/example0-2/vibe-coding-tools-build-website-with-ai-coding-and-design-agents.md"
sourceSha256: "9873a8596e26c0f38f997ae0ccaaf2cb5492394e31e6bd9b3bb6b8fa8a0655a3"
pageSha256: "9873a8596e26c0f38f997ae0ccaaf2cb5492394e31e6bd9b3bb6b8fa8a0655a3"
contentMode: "local-full"
zh: ""
---

# Design a Website with Design and Coding Agents

## Chapter Introduction

This chapter shows how AI can connect design and development. We will direct a **design Agent** to create a logo, color palette, and page layout, then ask a **coding Agent** to turn the design into a working website. The result is a reusable workflow from an initial idea to a running page.

---

# 1. Getting Started

## 1. Tutorial Introduction

We will use AI design Agents and coding Agents to build a complete website from scratch.

- **Design Agent:** creates logos, page layouts, color schemes, and other visual elements.
- **Coding Agent:** writes HTML, CSS, JavaScript, and other code from the requirements and design supplied in a prompt.

## 2. Design Agents and Coding Agents

- **Design Agent:** generates images, page mockups, or visual styles from prompts.
  - MasterGo
  - Lovart
  - Figma MCP
- **Coding Agent:** writes runnable code from the requested features and layout.
  - Z.AI
  - Trae
  - Cursor
  - Lovable

---

# 2. Create a Logo with a Design Agent

## 1. Key Elements of Logo Design

A logo strongly affects a website’s first impression. A design Agent needs a clear description of the desired result.

1. **Brand name or text**

- Text that must appear in the logo, such as the website title or brand name.

2. **Style or mood**

- The overall feeling the logo should convey.
- _Examples: minimalist, cute, simple, modern, vintage, or futuristic._

3. **Color scheme** (optional)

- The logo colors should fit the website’s overall tone.
- Specify exact hex values or a general palette such as warm or cool colors.
- _Examples: **`#171721`** (black) and **`#FF7130`** (orange)._

4. **Form or composition**

- State whether the logo needs a particular shape or arrangement.
- _Examples: text inside a circle, an icon with text, or an icon-led logo._

5. **Icon or symbol** (optional)

- Describe any graphic or symbol that should appear.
- _Examples: a book, lightning bolt, AI motif, or abstract geometric form._

## 2. Write a Logo Design Prompt

**Example prompts**

```
"Design a minimalist logo for the brand 'My First Website'.
Use black (#171721) and orange (#FF7130), and place the text inside a circle."
```

```
"Design a logo for the brand 'AIID'.
Use a futuristic, clean, and simple style with blue and white as the main colors.
Combine an abstract symbol of AI with the text, and export a transparent PNG."
```

## 3. Ask the Agent for Designs

- Enter the prompts above and compare several drafts from the Agent.

![](/mirror/e6/e62b51f856d181cf79a04abf2ac734773fdd21df.webp)![](/mirror/29/296413a2320f9147ed71aa8b17926f2ed9186816.webp)

## 4. Choose the Final Logo

- Select the preferred draft and download it.

---

# 3. Plan the Website Structure

## 1. Understand the Basic Sections

Before building the website, decide which menu items or sections it needs. The structure depends on what visitors should see and what actions they should take. Most websites begin with sections such as **Home, About, and Contact**.

## 2. Sketch a Structure First (Optional)

Write a simple menu structure based on the website’s purpose.

### Basic Menu

1. **Home**
   1. The first page visitors see.
   2. Usually includes the logo, a hero area, and a short statement or introduction.
2. **About**
   1. Explains who we are or the purpose of the project or service.
   2. Portfolio: a short introduction and résumé.
   3. Service website: its vision, goals, and main capabilities.
3. **Contact**
   1. Email, telephone number, social links, or other contact details.
   2. May also include a simple contact form.

### Optional Menu

4. **Services / Projects**
   1. Presents services, projects, or portfolio work.
   2. Often displayed as a list or a set of cards.

5. **Gallery**
   1. Displays images, photographs, or design work.

6. **Blog / News**
   1. Publishes articles, updates, or logs.

7. **FAQ**
   1. Collects common visitor questions and answers.

## 3. Choose a Color Scheme (Optional)

If a logo already exists, or the website should use a particular palette, include the desired color codes in the prompt.

**Example:** `#171721, #872B97, #FF7130, #FF3C68`

When no palette comes to mind, use a color website or search by keyword.

- **Color references**
  - https://colorhunt.co/
  - https://coolors.co/

![](/mirror/89/899b5741c9e61fa4aac32e330f438ef8b2420710.webp)![](/mirror/c0/c07328c24d5670f7529ba3a123d24ce8f5d81ba3.webp)

- **Search for palettes by keyword on Google**

![](/mirror/50/5090582d82be122c430680f0c081c27f133a0fe1.webp)

## 4. Write the Website Design Prompt

**Example prompt**

```
"Design a single-page website with Home, About, and Contact sections.
Use #171721, #FF7130, and #FF3C68.
Keep the overall style modern and clean."
```

---

# 4. Design the Website with a Design Agent

## 1. Enter the Prompt and Generate a Design

- Include the planned structure and chosen color scheme in the prompt.

**MasterGo prompt example**

![](/mirror/57/576b2d68e0d4b80a011da65498fce92ac5744f02.webp)![](/mirror/8e/8e0277b40980bd0aeb49dd7e5af653accb18ec1c.webp)

## 2. Review the Design and Request Changes

Give the Agent concrete feedback, for example:

- “This is too ornate. Make the overall style simpler.”
- “Use a different typeface.”
- “Adjust the color scheme.”
- “Remove this section.”

![](/mirror/2d/2dafa5ad1a3f7d522758756365b2cc858cbf3977.webp)

## 3. Finalize the Design

After several revisions, convert the approved design into a form that a coding Agent can understand. The exact method depends on the design platform and usually involves a plugin.

**MasterGo example**

1. Open the [MasterGo plugin site](https://mastergo.com/community/plugin) and search for **seal**.

![](/mirror/50/5012da65d20003fe14de0663023d0d3ee77157a2.webp)

2. Return to the design page and click the **block icon (Plugins)**.

![](/mirror/46/4620278f5306d3abd9a79119e3e2a2f57044095b.png)

3. Select the area to convert and click **Generate** to produce code.

![](/mirror/ea/eae6c319eb6e16d11a426ca2a291fe102f29a12a.webp)

---

# 5. Build the Website with a Coding Agent

## 1. Understand the Basics of HTML, CSS, and JavaScript

A website is built from three main languages:

- **HTML (HyperText Markup Language)** → structure
- **CSS (Cascading Style Sheets)** → appearance
- **JavaScript (JS)** → behavior

Together, they form the web pages we use.

1. **🏗️ HTML (structure)**

- Defines what appears on the page.
- Places text, images, buttons, links, and other elements.
- Acts like the walls and frame of a building.

**Example**

```html
<h1>Hello!</h1>
<p>This is my first website.</p>
[Contact](contact.html)
```

2. **🎨 CSS (appearance)**

- Defines how the content is displayed.
- Controls text size, color, spacing, backgrounds, and button shape.
- Gives the HTML its visual clothing and style.

**Example**

```css
h1 {
  color: #FF7130;   /* Text color */
  font-size: 36px;  /* Font size */
  text-align: center; /* Center alignment */
}

body {
  background-color: #171721; /* Background color */
  color: white; /* Default text color */
}
```

3. **⚙️ JavaScript (behavior)**

- Lets the page respond to the user.
- Supports button clicks, menus, carousels, form submission, and other interactions.
- If HTML and CSS provide the body and appearance, JavaScript is the brain that makes the page act.

**Example**

```javascript
function showAlert() {
  alert("The button has been clicked!");
}
```

```html
<button onclick="showAlert()">Click me</button>
```

## 2. Ask the Coding Agent to Generate Code

**Example prompt**

```
"Write the HTML and CSS for a single-page website with Home, About, and Contact sections.
Use #171721, #FF7130, and #FF3C68.
Use a black background and white text."
```

![](/mirror/82/824e4ac3e812682a860182cc5cff63990cce763a.webp)

## 3. Run the Website

After generating the draft, the Agent usually starts the project and displays the website automatically.

If the Agent has restarted or the preview is missing, enter a prompt such as:

```
"Please activate the project"
```

The Agent will restart the project and open the preview.

## 4. Make Simple Changes

Continue refining the draft in natural language:

- “Make the button larger.”
- “Use a heavier font weight.”

![](/mirror/cb/cb0d35d9aef517d10cc8dbd28786c3f0410c79a3.png)![](/mirror/b8/b80a64c5f183d52b49f5d17cd8dbb6be27749df0.png)

## 5. Replace the Website Copy

The initial website often contains generated placeholder text. Prepare the real content and ask the Agent to replace it.

**Example:** update the About page of the AIID website.

1. Write the desired About content. Markdown makes the structure easier for the Agent to understand.

![](/mirror/02/0244507be6e16dcf6d689634853c30111a17aa1c.webp)

2. Ask the Agent to apply that file to the target page.

![](/mirror/3d/3d6bdb0a338fa1820d3731f63b9ab2426ff78686.png)

3. Review the updated page.

![](/mirror/23/23be317055c1f33aad3baeddd4f697e4d50c4f95.webp)

## 6. Insert Images

To add a logo, background, or other specific image, upload it to the project folder and tell the Agent where it should appear.

- **Example:**

![](/mirror/82/8256c810b3c603086cc6af48690b7c62cf977b86.png)![](/mirror/bb/bb3f1ebc0f6f1bd4b56d0c2bb4e2033fc8bf3001.png)![](/mirror/ea/ea6d5b9203eb57a16494ebf12abb497b5fa0d01d.png)

- **Result:**

![](/mirror/e4/e465e541d4fa8cae728e31960033e4c202950f16.webp)

---

# 6. Integrate Design and Code

## 1. Integrate Design Files with the Website Code (Optional)

After downloading code from the design Agent, move it into the current project and ask the coding Agent to merge it with the existing implementation.

- **Example:**

![](/mirror/27/272ef2db6a3ad3837f378b18e3ef9952f436fabd.webp)

- **Result:**

![](/mirror/cc/ccb37b38a41205a1d59dde7f1d33cf861e3e5b8d.webp)

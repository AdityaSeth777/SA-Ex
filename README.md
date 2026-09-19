# Software Architecture Foundations

A study companion for first-year undergraduates learning software
architecture - not a submission platform or LMS. It helps students study
architecture diagrams before class, and gives instructors ready-to-open
live classroom design challenges.

**Learning progression:** Study → Understand → Trace → Modify → Design.

## What's here

- **Learn** (`/learn`) - the core building blocks (Client, Frontend,
  Backend, API, Database, Cache, Load Balancer, Message Queue, Object
  Storage, CDN, Authentication), each with a plain-language explanation
  and an interactive diagram.
- **Case Studies** (`/case-studies`) - 13 systems across three levels
  (Basic, Intermediate, Scale), each with a scenario, requirements, a
  Mermaid diagram, component explanations, a step-by-step request flow,
  "Think About It" discussion questions, and "What Happens If...?"
  failure/scaling scenarios.
- **Architecture Evolution** (`/evolution`) - three systems (Chat, Video
  Streaming, Food Delivery) shown at three points of scale, illustrating
  how requirements at scale force architectural change.
- **Live Challenges** (`/challenges`) - 8 classroom-ready design
  problems with a blank Mermaid canvas and a hidden reference
  architecture instructors can reveal after discussion.
- **Architecture Playground** (`/playground`) - a live Mermaid editor
  with a starter cheat sheet.

## Content structure

Educational content lives under `content/`, mirroring a study-repo layout:

```
content/
  01-basics/
  02-intermediate/
  03-scale/
  04-architecture-evolution/
  05-live-challenges/
  mermaid-examples.ts
  components-glossary.ts
```

Each case study/challenge/evolution file carries a `sourcePath` used to
generate its "View source on GitHub" link.

## Architecture

### System architecture

How the app itself is put together: static/SSG Next.js pages read
structured content at build time, the browser renders Mermaid diagrams
and the Playground editor client-side, and each piece of content links
back to its source file in this GitHub repo.

```mermaid
flowchart LR
  subgraph Browser["Browser"]
    UI["React UI Components"]
    MermaidJS["mermaid.js renderer"]
    CM["CodeMirror editor (Playground)"]
    Theme["next-themes (dark/light)"]
  end

  UI --> MermaidJS
  UI --> CM
  UI --> Theme

  subgraph NextApp["Next.js App Router"]
    Pages["Pages & Layouts<br/>(Home, Learn, Case Studies, Evolution,<br/>Challenges, Playground)"]
    OG["opengraph-image route<br/>(next/og)"]
  end

  UI <--> Pages
  Pages --> OG

  subgraph ContentLayer["Content Layer"]
    Data["content/*.ts<br/>(case studies, challenges,<br/>evolution, glossary)"]
  end

  Pages --> Data
  Data -.->|"sourcePath → View source"| GitHub[("GitHub repo<br/>AdityaSeth777/SA-Ex")]
```

### Sequence diagram: studying a case study

A typical flow: a student opens a case study, traces the request flow
step by step, then jumps into the Playground with that diagram
pre-loaded to experiment with it.

```mermaid
sequenceDiagram
  participant S as Student
  participant B as Browser (Client)
  participant Srv as Next.js (SSG page)
  participant C as content/*.ts
  participant M as mermaid.js

  S->>B: Click "URL Shortener" case study
  B->>Srv: Request /case-studies/url-shortener
  Srv->>C: Read case study data
  C-->>Srv: CaseStudy object (scenario, flow, diagram)
  Srv-->>B: Pre-rendered HTML
  B->>M: Render Mermaid diagram (client-side)
  M-->>B: SVG diagram
  S->>B: Click "Next Step" (Request Flow)
  B-->>S: Highlight current step
  S->>B: Click "Open in Playground"
  B->>Srv: Navigate to /playground?code=...
  Srv-->>B: Playground page, code pre-filled
  B->>M: Re-render diagram on every edit
```

### User flow diagram

How a student (or instructor) moves through the app, following the
Study → Understand → Trace → Modify → Design progression.

```mermaid
flowchart TD
  Home["Home"] --> Learn["Learn:<br/>How to Read an Architecture"]
  Learn --> CaseStudies["Case Studies"]

  CaseStudies --> Basic["Level 1 - Basic"]
  CaseStudies --> Intermediate["Level 2 - Intermediate"]
  CaseStudies --> Scale["Level 3 - Scale"]

  CaseStudies --> Evolution["Architecture Evolution"]
  Evolution --> Challenges["Live Challenges"]

  Challenges -->|design live| Canvas["Blank Mermaid Canvas"]
  Challenges -->|instructor reveals| Reference["Reference Architecture"]

  Home --> Playground["Architecture Playground"]
  Canvas --> Playground
  Playground -->|iterate on a design| Challenges
```

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Stack

Next.js (App Router) + TypeScript + Tailwind CSS, `mermaid` for diagram
rendering, `@uiw/react-codemirror` for the playground editor, and
`next-themes` for dark/light mode.

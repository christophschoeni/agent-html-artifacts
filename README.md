# Agent HTML Artifacts

Portable workflow for Codex, Claude Code, and Gemini CLI that keeps AI-facing project knowledge in Markdown or JSON, but turns longer human-facing outputs into self-contained HTML artifacts.

## Why

Use Markdown for source-of-truth files that agents need to read, diff, grep, and update. Use HTML when a human needs to review a long plan, code review, research brief, module map, decision matrix, timeline, or one-off editor.

The default rule in this package:

- Keep `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, specs, memory, and durable project notes in Markdown.
- Prefer HTML for human-facing outputs above roughly 100-150 lines, or whenever layout, tables, diagrams, filters, tabs, timelines, or interactivity matter.
- When an HTML artifact is durable, keep a `source.md`, `source.json`, or `source.yaml` next to it.

## Install

Install directly from GitHub with `npx`:

```bash
npx --yes github:christophschoeni/agent-html-artifacts all
```

Install only one target:

```bash
npx --yes github:christophschoeni/agent-html-artifacts codex
npx --yes github:christophschoeni/agent-html-artifacts claude
npx --yes github:christophschoeni/agent-html-artifacts gemini
```

Equivalent explicit `npm exec` form:

```bash
npm exec --yes --package github:christophschoeni/agent-html-artifacts agent-html-artifacts -- all
```

From a cloned repo:

```bash
npm run install:codex
npm run install:claude
```

Or install everything supported:

```bash
npm run install:all
```

Test the installer without touching your real home directories:

```bash
AGENT_HTML_ARTIFACTS_HOME=/tmp/aha-test npx --yes github:christophschoeni/agent-html-artifacts all
```

Review the repository before running the installer if you are installing from the network. The package does not require API keys or credentials.

## What Gets Installed

- Codex plugin: `~/plugins/agent-html-artifacts`
- Codex marketplace entry: `~/.agents/plugins/marketplace.json`
- Claude skill: `~/.claude/skills/html-artifact`
- Claude agent: `~/.claude/agents/html-artifact-designer.md`
- Claude command: `~/.claude/commands/html-artifact.md`
- Gemini skill and command, when requested

## GUI

Open `index.html` in a browser. It is a static GUI for browsing the rules, templates, installation commands, and starter prompts.

## Quick Prompts

```text
Use $html-artifact to turn this long implementation plan into a self-contained HTML artifact. Keep the source plan in Markdown.
```

```text
Create an HTML code review artifact for this PR. Render changed files, severity, call paths, risks, and reviewer focus areas.
```

```text
Build a throwaway HTML editor for triaging these tickets. Include an export button that copies Markdown and JSON.
```

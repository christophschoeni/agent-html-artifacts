# Agent HTML Artifacts Project Rules

Use this repository to package a portable workflow for Codex, Claude Code, and Gemini CLI.

## Format Policy

- Keep agent-facing project instructions, memory, specs, and source-of-truth files in Markdown, JSON, or YAML.
- Use self-contained HTML for long human-facing plans, reports, code reviews, research briefs, module maps, and throwaway editors.
- If an HTML artifact is durable, keep a sibling `.source.md` or `.source.json` file.
- Avoid external CDNs or network calls in generated artifacts unless explicitly requested.

## Validation

Run:

```bash
npm run validate
```

Optionally generate the demo:

```bash
npm run demo
```

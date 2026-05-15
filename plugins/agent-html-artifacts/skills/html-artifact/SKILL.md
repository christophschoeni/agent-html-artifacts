---
name: html-artifact
description: Use when a user asks for a long human-facing plan, report, code review, research brief, architecture map, design comparison, or throwaway editor. Create self-contained HTML artifacts for humans while keeping agent-facing source of truth in Markdown, JSON, or YAML.
---

# HTML Artifact

## Core Rule

Use Markdown, JSON, or YAML for durable agent context. Use self-contained HTML for long or visual human-facing output.

Prefer HTML when any of these are true:

- The output would be more than roughly 100-150 lines of Markdown.
- The user needs to compare options, scan status, review a PR, understand a module, or present findings.
- Tables, timelines, diagrams, tabs, filters, accordions, color-coded severity, or export buttons would materially improve the work.
- The task is a one-off editor where the user should manipulate state and export it back to Markdown or JSON.

Keep Markdown/JSON/YAML when:

- The file is instructions for agents, memory, project rules, specs used as source of truth, or anything expected to be grep-friendly and diff-friendly.
- The answer is short enough that HTML would add ceremony.
- The user explicitly asks for Markdown.

## Output Contract

For durable artifacts, create two files:

- `name.source.md` or `name.source.json`: canonical content for agents and version control.
- `name.html`: human-facing rendered artifact.

For throwaway artifacts, a single `name.html` is enough if it includes an export control.

Every HTML artifact must be complete, self-contained, responsive, printable, and free of external runtime dependencies unless the user asks otherwise.

## Workflow

1. Decide whether HTML is warranted.
2. Preserve or create source Markdown/JSON/YAML when the content is durable.
3. Create the self-contained HTML view.
4. Include copy/export buttons when the artifact captures decisions or structured data.
5. Validate that layout, buttons, and responsive behavior work.

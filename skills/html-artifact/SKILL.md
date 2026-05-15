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

Every HTML artifact must:

- Be a complete single file with embedded CSS and JavaScript.
- Avoid external CDNs, fonts, images, and network calls unless the user asks.
- Include responsive layout, print styles, and useful headings.
- Include provenance: title, date, generator, and source files if known.
- Include copy/export buttons when the artifact captures decisions, triage, prompts, or structured data.
- Keep UI dense and scannable; avoid marketing-style heroes for operational reports.

## Workflow

1. Decide whether HTML is warranted using the Core Rule.
2. Preserve or create a Markdown/JSON/YAML source when the content is durable.
3. Pick the closest template from `templates/` or use `scripts/render-artifact.mjs` for JSON input.
4. Create the HTML artifact and keep it self-contained.
5. If possible, open or validate the artifact locally. Check that content does not overlap and buttons work.

## Template Selection

- Implementation plans: use `templates/implementation-plan.html`.
- Code reviews: use `templates/code-review.html`.
- Research and learning briefs: use `templates/research-brief.html`.
- Architecture and module understanding: use `templates/module-map.html`.
- Triage, prompt tuning, feature flags, and ordering tasks: use `templates/interactive-editor.html`.

## Prompt Pattern

When another agent will implement from the artifact, pass the source Markdown/JSON to that agent first. Use the HTML as a companion for human review, not as the primary machine context.


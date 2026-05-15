# HTML Artifact Policy

## Good HTML Candidates

- PR or code review with multiple files, findings, severity levels, or call paths.
- Research synthesis with alternatives, evidence, open questions, and source notes.
- Architecture or module explanation where spatial structure matters.
- Implementation plan with milestones, dependency order, risks, and verification.
- Recurring reports where status, charts, and timeline improve scanning.
- One-off editors for triage, prompt tuning, ordering, grouping, or configuration changes.

## Poor HTML Candidates

- Agent instructions and memory files.
- READMEs intended to be edited by humans in GitHub.
- Short answers.
- Machine-readable data contracts.
- Anything that needs clean line-by-line code review as the primary workflow.

## Hybrid Pattern

Use structured source plus rendered artifact:

```text
report.source.json
report.html
```

or:

```text
plan.source.md
plan.html
```

The source is canonical. The HTML is a view.

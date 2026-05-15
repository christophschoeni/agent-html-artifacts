#!/usr/bin/env node
import { access, readFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const required = [
  "index.html",
  "package.json",
  "plugins/agent-html-artifacts/.codex-plugin/plugin.json",
  "plugins/agent-html-artifacts/skills/html-artifact/SKILL.md",
  "skills/html-artifact/SKILL.md",
  "skills/html-artifact/templates/base.html",
  "plugins/agent-html-artifacts/skills/html-artifact/templates/base.html",
  "claude/agents/html-artifact-designer.md",
  "claude/commands/html-artifact.md",
  "gemini/commands/html-artifact.toml",
  "templates/base.html"
];

for (const file of required) {
  await access(join(root, file));
}

JSON.parse(await readFile(join(root, "package.json"), "utf8"));
JSON.parse(await readFile(join(root, "plugins/agent-html-artifacts/.codex-plugin/plugin.json"), "utf8"));

console.log(`Validated ${required.length} required files.`);

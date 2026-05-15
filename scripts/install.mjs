#!/usr/bin/env node
import { cp, mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { homedir } from "node:os";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const homeRoot = process.env.AGENT_HTML_ARTIFACTS_HOME || homedir();
const mode = process.argv[2] || "all";

const targets = new Set(mode === "all" ? ["codex", "claude", "gemini"] : [mode]);
const valid = new Set(["codex", "claude", "gemini"]);

for (const target of targets) {
  if (!valid.has(target)) {
    console.error(`Unknown install target: ${target}`);
    console.error("Use one of: codex, claude, gemini, all");
    process.exit(1);
  }
}

async function copyDir(source, destination) {
  await mkdir(dirname(destination), { recursive: true });
  await cp(source, destination, { recursive: true, force: true });
}

async function writeJson(path, value) {
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, `${JSON.stringify(value, null, 2)}\n`);
}

async function readJson(path, fallback) {
  if (!existsSync(path)) return fallback;
  return JSON.parse(await readFile(path, "utf8"));
}

async function installCodex() {
  const pluginSource = join(root, "plugins", "agent-html-artifacts");
  const pluginDestination = join(homeRoot, "plugins", "agent-html-artifacts");
  await copyDir(pluginSource, pluginDestination);

  const marketplacePath = join(homeRoot, ".agents", "plugins", "marketplace.json");
  const marketplace = await readJson(marketplacePath, {
    name: "local",
    interface: { displayName: "Local Plugins" },
    plugins: []
  });

  marketplace.plugins = (marketplace.plugins || []).filter((plugin) => plugin.name !== "agent-html-artifacts");
  marketplace.plugins.push({
    name: "agent-html-artifacts",
    source: {
      source: "local",
      path: "./plugins/agent-html-artifacts"
    },
    policy: {
      installation: "AVAILABLE",
      authentication: "ON_INSTALL"
    },
    category: "Productivity"
  });
  await writeJson(marketplacePath, marketplace);
  console.log(`Installed Codex plugin: ${pluginDestination}`);
  console.log(`Updated marketplace: ${marketplacePath}`);
}

async function installClaude() {
  await copyDir(join(root, "skills", "html-artifact"), join(homeRoot, ".claude", "skills", "html-artifact"));
  await copyDir(join(root, "claude", "agents", "html-artifact-designer.md"), join(homeRoot, ".claude", "agents", "html-artifact-designer.md"));
  await copyDir(join(root, "claude", "commands", "html-artifact.md"), join(homeRoot, ".claude", "commands", "html-artifact.md"));
  console.log("Installed Claude skill, agent, and command.");
}

async function installGemini() {
  await copyDir(join(root, "skills", "html-artifact"), join(homeRoot, ".gemini", "skills", "html-artifact"));
  await copyDir(join(root, "gemini", "commands", "html-artifact.toml"), join(homeRoot, ".gemini", "commands", "html-artifact.toml"));
  console.log("Installed Gemini skill and command.");
}

if (targets.has("codex")) await installCodex();
if (targets.has("claude")) await installClaude();
if (targets.has("gemini")) await installGemini();

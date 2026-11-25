import assert from "node:assert/strict";
import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));

function walk(dir) {
  const files = [];
  for (const name of readdirSync(dir)) {
    const full = path.join(dir, name);
    if (statSync(full).isDirectory()) files.push(...walk(full));
    else files.push(full);
  }
  return files;
}

test("Git owns code in two services and the place stays in Studio", () => {
  const project = JSON.parse(readFileSync(path.join(root, "default.project.json"), "utf8"));
  const services = Object.keys(project.tree).filter((key) => !key.startsWith("$"));

  assert.deepEqual(services.sort(), ["ReplicatedStorage", "ServerScriptService"]);

  for (const serviceName of services) {
    const service = project.tree[serviceName];
    assert.equal(service.Content.$className, "Folder");
    assert.equal(service.Content.$ignoreUnknownInstances, true);
  }

  assert.equal(project.tree.ReplicatedStorage.Client.$properties.RunContext, "Client");
  assert.equal(
    project.tree.ReplicatedStorage.Client.$path,
    "src/ReplicatedStorage/Client.server.luau",
  );
  assert.equal(project.tree.ServerScriptService.Server.$properties.RunContext, "Server");
  assert.equal(
    project.tree.ServerScriptService.Server.$path,
    "src/ServerScriptService/Server.server.luau",
  );

  const srcFiles = walk(path.join(root, "src")).map((file) => path.relative(root, file));
  const entries = srcFiles.filter((file) => file.endsWith(".server.luau"));
  assert.deepEqual(entries.sort(), [
    "src/ReplicatedStorage/Client.server.luau",
    "src/ServerScriptService/Server.server.luau",
  ]);
  assert.equal(
    srcFiles.some((file) => file.endsWith(".client.luau")),
    false,
  );

  const replicatedEntries = entries.filter((file) => file.startsWith("src/ReplicatedStorage/"));
  assert.deepEqual(replicatedEntries, ["src/ReplicatedStorage/Client.server.luau"]);
});

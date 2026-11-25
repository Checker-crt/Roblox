# Architecture

Git owns Luau. The open Studio place owns the world. Rojo syncs the code in this repo into that place. This is the partially managed layout from Roblox’s project docs. See `docs/decisions/partially-managed-rojo.md`.

## Map

| Path | DataModel | Who edits it |
| --- | --- | --- |
| `src/ReplicatedStorage/Client.server.luau` | `ReplicatedStorage.Client` (`Script`, `RunContext` Client) | Git. The only client entry. |
| `src/ReplicatedStorage/` modules (`*.luau`) | `ReplicatedStorage` | Git. Shared rules both sides may require. |
| `src/ServerScriptService/Server.server.luau` | `ServerScriptService.Server` (`Script`, `RunContext` Server) | Git. The only server entry. |
| `src/ServerScriptService/` modules (`*.luau`) | `ServerScriptService` | Git. Server-only behavior. The client cannot require these. |
| `ReplicatedStorage.Content` and `ServerScriptService.Content` | Folders with `$ignoreUnknownInstances` | The place file. Rojo does not delete what Studio adds there. |
| `Workspace`, `Lighting`, terrain, spawns | The place file | Studio. Not in `default.project.json`. |

The next server behavior is a ModuleScript at `src/ServerScriptService/<Name>.luau`. `Server.server.luau` requires it and calls `start()`. The next shared rule is a ModuleScript at `src/ReplicatedStorage/<Name>.luau`. Do not add a second Script, and do not add a `*.client.luau` file.

Place markers Kit is allowed to find live in the place at `Workspace.Markers`. Wren names them. They are not in Git.

Notes that are not acceptance criteria yet live in `docs/design/`. A player-facing behavior moves into `docs/product.md` before anyone implements it.

## Contract

`default.project.json` is the contract between the repo and the DataModel.

- Inputs: the `src/` tree and this project file.
- Outputs: `ReplicatedStorage.Client`, `ServerScriptService.Server`, and a `Content` folder under each service.
- Failures: a `Workspace` or `Lighting` key, a `*.client.luau` file, a server entry whose `RunContext` is not `Server`, or a client entry whose `RunContext` is not `Client`. `project.test.js` fails on those.

`Server.server.luau` is the server edge. It requires server modules and calls `start()`. It does not invent a result. With no modules yet, it finishes without starting a system.

`Client.server.luau` is the client edge. It may present. It does not grant a reward. With no modules yet, it finishes without starting a system.

## Commands

- Test: `node --test`. There are no npm dependencies and no lockfile.
- Lint: none, until the first Luau system
- Build: none in CI. After `rokit install`, `rojo serve` syncs into the open place. `rojo build -o build/place.rbxl` builds a place file from the code only.
- Deploy: none. No place id is the production target.

Toolchain versions are pinned in `rokit.toml`. Tests for this layout live in `project.test.js` beside `default.project.json`. A later Luau module is locked with the Studio unit-test harness, not with `node --test`.

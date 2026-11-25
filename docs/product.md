# Product

## Audience

Ryan, designing one Roblox game in this repo and in Studio.

## Problem

The repo has no place for the player-facing spec, no map from files to the DataModel, and no record of which files Git owns versus which instances the place file owns.

## Promise

A reader can find the spec, the file-to-DataModel map, and the boundary between code in Git and the place in Studio.

## Non-goals

- A game loop, scoring, inventory, or win condition.
- A published place, packages, or User, Dev, Stable, and Prod places.
- A production deploy.
- MeshParts, terrain, lighting, or Workspace layout in Git.

## Acceptance criteria

- The Rojo project maps Git code to `ReplicatedStorage` and `ServerScriptService` only.
- The Rojo project does not map `Workspace`, `Lighting`, or terrain.
- Each of those two services has a `Content` folder that Rojo leaves alone.
- One Script under `ServerScriptService`, with `RunContext` `Server`, is the only server entry.
- One Script under `ReplicatedStorage`, with `RunContext` `Client`, is the only client entry.
- The repo has no `LocalScript` (no `*.client.luau` file).
- Server-only code is not stored under `src/ReplicatedStorage`.

## Claims

- A reader can see which folders Git owns and which the place file owns. Proof: the acceptance criteria above, `project.test.js`, and `docs/architecture.md`.

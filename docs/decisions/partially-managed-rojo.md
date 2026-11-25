# Partially managed Rojo

## Decision

Git owns Luau under `src/ReplicatedStorage` and `src/ServerScriptService`. The Studio place owns `Workspace`, lighting, terrain, and anything under the `Content` folders. Rojo syncs code only, with `$ignoreUnknownInstances` on `Content`.

## Evidence

Roblox’s project docs recommend partial management for most teams that use Git: code in Git, art and the level in the place. The same docs say Rojo cannot sync MeshParts. Script location docs put one server Script in `ServerScriptService` and one client Script with `RunContext` Client in `ReplicatedStorage`.

## Cost of the other option

A fully managed project would put the place in Git and make CI the publisher. Rojo would still drop MeshParts, and the next place edit in Studio would fight the project file. There is no place id to publish yet.

# Lantern touch

First player-facing concept. It is not an acceptance criterion until the prompt below updates `docs/product.md`.

Paste the prompt as one message. The agent stops after Wren so you can allow the permanent model upload before Kit writes code.

```
Start the lantern-touch concept in this repo. Run Sag, then Blender, then Wren, then stop. Do not start Kit until I allow the upload.

Concept: a player spawns in a small yard, walks to one lantern, and touches it. The server counts one point for that player, once per life. The client shows the number.

This place is the open Studio place. Git owns Luau under src/. Studio owns Workspace, Lighting, and terrain. Do not add Workspace or Lighting to default.project.json. Do not add a second Script, a LocalScript, or a *.client.luau file. Markers live at Workspace.Markers and stay out of Git.

Sag: docs/product.md currently lists scoring as a non-goal. Add one acceptance criterion and take only this touch out of the non-goals. Leave inventory, a win condition, publishing, and Workspace-in-Git as non-goals.

Criterion: a player who spawns in the yard and touches Workspace.Markers.Lantern receives one point. A second touch in the same life does not add another. The client displays the point. One server module owns the count.

Blender: generate one object only, a small weathered lantern with a glass chamber and a handle on one side. Name it Lantern. Do not build a scene, a ground, or extra parts. Before export, record the triangle count, the size in metres, the materials, and which side the handle is on.

Wren: export that lantern as a GLB into the approved upload folder and import it with the rbx-import-asset skill. Ask me before creating a permanent asset. Insert it into the open place. Build a flat yard from parts, with a spawn a few studs from the lantern. Parent the model at Workspace.Markers.Lantern. Anchor it, stand it so the handle matches the side you recorded, and scale it to about chest height. Capture the yard. Do not write gameplay. Stop here.

Kit, only after I allow the upload: add src/ServerScriptService/LanternScore.luau. Server.server.luau requires it and calls start(). The server adds one point when that player touches the marker, once per life. The client only displays the number. A shared rule, if both sides need it, is a ModuleScript under src/ReplicatedStorage. Lock the once-only rule with rbx-unit-test. Keep node --test passing. Sync the Luau into the open place with rojo serve. Do not move the place.

Pip, after Kit has synced: play the criterion. Spawn, walk to the lantern, touch it, the score is 1, touch it again and the score stays 1, and the console has no errors. Stop play. Report the criterion, the steps you drove, and the console result.
```

## Source lantern

Recorded in Blender before export. One mesh named `Lantern`. No 3D generator was enabled, so this mesh was modeled in the open Blender file. The default cube was removed. Camera and light were left as they were.

- Triangles: 488. The Roblox per-mesh limit is 20,000.
- Size: 0.273 m wide, 0.184 m deep, 0.348 m tall. World bounds from (−0.092, −0.092, 0) to (0.181, 0.092, 0.348) metres. Expected size if 1 metre is 0.28 studs: about 0.98 × 0.66 × 1.24 studs, before the chest-height scale in Studio.
- Handle: on the +X side. In the front view that looks along +Y, the handle is on the right.
- Materials, with no image textures. Weathering is a procedural roughness noise on the metal and may flatten to the base color in a GLB.
  - `LanternMetal`: base color (0.20, 0.15, 0.11), metallic, roughness varied around 0.62.
  - `LanternGlass`: base color (0.55, 0.72, 0.48), transmission weight 0.92, IOR 1.45.
  - `LanternGlow`: base color (1.0, 0.58, 0.18), emission color (1.0, 0.45, 0.10), emission strength 6.

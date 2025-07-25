// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_app from "./routes/_app.tsx";
import * as $demo from "./routes/demo.tsx";
import * as $index from "./routes/index.tsx";
import * as $AgentSquad from "./islands/AgentSquad.tsx";
import * as $TetheredFlow from "./islands/TetheredFlow.tsx";
import type { Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/_app.tsx": $_app,
    "./routes/demo.tsx": $demo,
    "./routes/index.tsx": $index,
  },
  islands: {
    "./islands/AgentSquad.tsx": $AgentSquad,
    "./islands/TetheredFlow.tsx": $TetheredFlow,
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;

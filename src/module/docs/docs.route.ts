import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";

export const docsRoute = new Elysia().use(
  swagger({
    path: "/docs",
    provider: "scalar",
    documentation: {
      info: {
        title: "NovaAPI",
        description: "A simple API for Nova",
        version: "1.0.0",
      },
    },
  })
);

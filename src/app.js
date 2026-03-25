import { Hono } from "hono";
import { logger } from "hono/logger";
import { serveStatic } from "hono/deno";

export const createApp = () => {
  const app = new Hono();

  app.use(logger());

  app.get("/github-webhook", async (c) => {
    const payload = await c.req.body();
    const conclusion = payload["workflow_run"].conclusion;

    await fetch("http://localhost:8000/indicate", {
      method: "post",
      body: conclusion,
    });

    return c.text("light request sent...");
  });

  app.get("*", serveStatic({ root: "./public" }));

  return app;
};

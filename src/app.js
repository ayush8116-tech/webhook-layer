import { Hono } from "hono";
import { logger } from "hono/logger";
import { serveStatic } from "hono/deno";

export const createApp = () => {
  const app = new Hono();

  app.use(logger());

  app.post("/github-webhook", async (c) => {
    const payload = await c.req.json();
    console.log(payload);
    
    const conclusion = payload["workflow_run"].conclusion;

    const res = await fetch("http://localhost:8000/indicate", {
      method: "post",
      body: conclusion,
    });
    console.log(await res.text());

    return c.text("light request sent...");
  });

  
  app.get("*", serveStatic({ root: "./public" }));
  
  return app;
};



// app.get("/", async (c) => {
//   const payload = {
//     "workflow_run": {
//       conclusion: "success",
//     },
//   };
  
//   const res = await fetch("http://localhost:2000/github-webhook", {
//     method: "post",
//     body : JSON.stringify(payload),
//     "content-type": "application/json",
//   });

//   console.log(await res.text());

//   return c.text("request is going to own server");
// });

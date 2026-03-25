import { createApp } from "./src/app.js";

const main = () => {
  const app = createApp();
  Deno.serve({ port: 2000 }, app.fetch);
};

main()

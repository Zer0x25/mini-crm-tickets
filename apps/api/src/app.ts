import Fastify from "fastify";

const app = Fastify();

app.get("/health", async () => {
  return {
    status: "ok",
    timestamp: new Date().toISOString(),
  };
});

app.get("/", async () => {
  return {
    message: "Mini CRM Tickets API - implementation pending",
  };
});

export default app;

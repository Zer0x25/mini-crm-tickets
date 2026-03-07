import app from "./app.js";

const PORT = Number(process.env.API_PORT ?? process.env.PORT ?? 3001);

const start = async () => {
  try {
    await app.listen({ port: PORT, host: "0.0.0.0" });
    app.log.info({ port: PORT }, "Server running");
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};

void start();

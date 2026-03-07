import express from "express";

const app = express();

// Middleware
app.use(express.json());

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Placeholder routes
app.get("/", (req, res) => {
  res.json({ message: "Mini CRM Tickets API - Implementation pending" });
});

export default app;

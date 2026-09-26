import express from "express";
import paymentRoutes from "./routes/payment.routes.js";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import { env } from "./config/env.js";

const app = express();

// Security
app.disable("x-powered-by");

app.use(helmet());

// CORS
app.use(
  cors({
    origin: env.CLIENT_URL,
    credentials: true,
  })
);

// Rate limiting
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(globalLimiter);

// Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is running",
  });
});

// Body parser
app.use(
  express.json({
    limit: "100kb",
  })
);

// Payment routes
app.use("/api/payments", paymentRoutes);

export default app;
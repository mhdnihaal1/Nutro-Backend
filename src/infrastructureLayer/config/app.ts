import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../.env") });
import express from "express";

import cookieParser from "cookie-parser";
import session from "express-session";

import http from "http";
import cors from "cors";

import userRoute from "../router/user-route";
import adminRoute from "../router/admin-route";
import agentRoute from "../router/agent-route";

const app = express();

export const httpServer = http.createServer(app);

app.use(
  cors({
    origin: "*",
    // methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    // credentials: true,
    // allowedHeaders: ['Content-Type', 'Authorization']
  })
);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(cookieParser());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "default-secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use("/api/user", userRoute);
app.use("/api/admin", adminRoute);
app.use("/api/agent", agentRoute);

export default app;

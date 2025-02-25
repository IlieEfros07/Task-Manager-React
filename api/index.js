import express from "express";
import dotenv from "dotenv";
import { TasksRouter } from "./routes/router.tasks.js";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = 3107;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/v1/tasks", TasksRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`SERVER STARTED => http://localhost:${PORT}`);
});

import express from "express";
import { TasksRouter } from "./routes/router.tasks.js";
import cors from "cors";

const app = express();
const PORT = 3107;

app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());

app.use("/api/v1/tasks", TasksRouter);

app.listen(PORT, () => {
  console.log(`SERVER STARTED => http://localhost:${PORT}`);
});

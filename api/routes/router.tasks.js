import { Router } from "express";
import { GetTasksController } from "../controllers/get.tasks.controller.js";
import { PostTaskController } from "../controllers/post.tasks.controller.js";
import { PutTaskController } from "../controllers/put.tasks.controller.js";
import { DeleteTaskController } from "../controllers/delete.tasks.controller.js";
import { CreateTaskDTO } from "../dtos/create.task.dto.js";
import { UpdateTaskDTO } from "../dtos/update.task.dto.js";
import { ValidateDTO } from "../dtos/validate.task.dto.js";

export const TasksRouter = Router();

TasksRouter.get("/", GetTasksController);
TasksRouter.post("/", CreateTaskDTO, ValidateDTO, PostTaskController);
TasksRouter.put("/:id", UpdateTaskDTO, ValidateDTO, PutTaskController);
TasksRouter.delete("/:id", DeleteTaskController);

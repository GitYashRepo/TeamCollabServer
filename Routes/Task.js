import { Router } from "express";
import { CreateNewTask, GetTasks, UpdateTask, AddComment, GetComments } from "../AppController/Task";
const router = Router();

/**
 * @route POST /tasks
 * @desc Create a new task
 */
router.post("/", authMiddleware, CreateNewTask);

/**
 * @route GET /tasks
 * @desc Get tasks for logged-in user, optional filter by status
 */
router.get("/", authMiddleware, GetTasks);

/**
 * @route PUT /tasks/:id
 * @desc Update task details or status
 */
router.put("/:id", authMiddleware, UpdateTask);

/**
 * @route POST /tasks/:id/comments
 * @desc Add comment to a task
 */
router.post("/:id/comments", authMiddleware, AddComment);

/**
 * @route GET /tasks/:id/comments
 * @desc Get comments for a task
 */
router.get("/:id/comments", authMiddleware, GetComments);

export default router;

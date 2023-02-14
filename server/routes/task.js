import express from "express";
import { getTasks, createTask, setUser, getTasksByUserId } from "../controllers/task.js";

const router = express.Router();

router.get("/", getTasks);
router.get("/getTasksByUserId/:id", getTasksByUserId);


router.post("/createTask", createTask);
router.post("/setUser/:id", setUser);


export default router;

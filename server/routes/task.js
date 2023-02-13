import express from "express";
import { getTasks, createTask, setUser } from "../controllers/task.js";

const router = express.Router();

router.get("/", getTasks);


router.post("/createTask", createTask);
router.post("/setUser/:id", setUser);


export default router;

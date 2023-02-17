import express from "express";
import { getTasks, createTask, setUser, getTasksByCompanyId } from "../controllers/task.js";

const router = express.Router();

router.get("/", getTasks);
router.get("/getTasksByCompanyId/:id", getTasksByCompanyId);


router.post("/createTask", createTask);
router.post("/setUser/:id", setUser);


export default router;

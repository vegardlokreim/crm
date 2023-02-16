import express from "express";
import { getUsers, createUser, getUser } from "../controllers/user.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUser);
router.post("/createUser", createUser);

export default router;
import express from "express";
import { getContacts } from "../controllers/contact.js";

const router = express.Router();

router.get("/", getContacts);


export default router;
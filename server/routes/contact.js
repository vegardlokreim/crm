import express from "express";
import { getContacts, createContact } from "../controllers/contact.js";

const router = express.Router();

router.get("/", getContacts);
router.post("/createContact", createContact);


export default router;
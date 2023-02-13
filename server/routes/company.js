import express from "express";
import { getCompanies, createCompany, addContact, getCompany } from "../controllers/company.js";

const router = express.Router();


/* GET REQUESTS */
router.get("/", getCompanies);
router.get("/:id", getCompany);

/* POST REQUESTS */
router.post("/createCompany", createCompany);
router.post("/addContact/:id", addContact);


export default router;
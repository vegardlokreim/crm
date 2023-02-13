import express from "express";
import { getCompanies, createCompany } from "../controllers/company.js";

const router = express.Router();


/* GET REQUESTS */
router.get("/", getCompanies);

/* POST REQUESTS */
router.post("/createCompany", createCompany);


export default router;
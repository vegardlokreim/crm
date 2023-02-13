import express from "express";
import { getCompanies } from "../controllers/company.js";

const router = express.Router();


router.get("/", getCompanies);

export default router;
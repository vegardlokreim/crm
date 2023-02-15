import express from "express";
import { createDeal, getDeals, getDealsByCompanyId } from "../controllers/deal.js";

const router = express.Router();

router.get("/", getDeals);
router.get("/getDealsByCompanyId/:id", getDealsByCompanyId);

router.post("/createDeal/", createDeal);



export default router;
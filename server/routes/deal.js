import express from "express";
import { createDeal, getDeals, getDealsByCompanyId, getDealsByStatus } from "../controllers/deal.js";

const router = express.Router();

router.get("/", getDeals);
router.get("/getDealsByCompanyId/:id", getDealsByCompanyId);
router.get("/getDealsByStatus/:status", getDealsByStatus);

router.post("/createDeal/", createDeal);



export default router;
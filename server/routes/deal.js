import express from "express";
import { createDeal, getDeal, getDeals, getDealsByCompanyId, getDealsByStatus, getDealsByUserId, updateDeal } from "../controllers/deal.js";

const router = express.Router();

router.get("/", getDeals);
router.get("/getDealsByCompanyId/:id", getDealsByCompanyId);
router.get("/getDealsByStatus/:status", getDealsByStatus);
router.get("/getDealsByuserId/:id", getDealsByUserId);
router.get("/:id", getDeal);

router.post("/createDeal/", createDeal);


//update deal from updateDeal
router.put("/updateDeal/:id", updateDeal);


export default router;
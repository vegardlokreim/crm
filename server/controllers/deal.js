import Deal from "../models/Deal.js";

//endpoint to get all deals
export const getDeals = async (req, res) => {
    try {
        const deals = await Deal.find();
        res.status(200).json(deals);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//endpoint to create a deal
export const createDeal = async (req, res) => {
    try {
        const deal = await Deal.create(req.body);
        res.status(201).json(deal);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getDealsByCompanyId = async (req, res) => {
    try {
        const deals = await Deal.find({ companyId: req.params.id }).populate("userId");
        res.status(200).json(deals);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
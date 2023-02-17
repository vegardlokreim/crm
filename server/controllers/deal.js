import Deal from "../models/Deal.js";

//endpoint to get all deals
export const getDeals = async (req, res) => {
    try {
        const deals = await Deal.find().populate(["companyId", "userId"]);
        res.status(200).json(deals);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
//endpoint to get one deal
//TODO: Change this to get deal by id
export const getDeal = async (req, res) => {
    try {
        const deal = await Deal.findById(req.params.id).populate(["companyId", "userId"]);
        res.status(200).json(deal);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export const getDealsByStatus = async (req, res) => {
    try {
        const deals = await Deal.find({ status: req.params.status }).populate(["companyId", "userId"]);
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
export const getDealsByUserId = async (req, res) => {
    try {
        const deals = await Deal.find({ userId: req.params.id }).populate(["companyId", "userId"]);
        res.status(200).json(deals);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//endpoint to update a deal
export const updateDeal = async (req, res) => {
    try {
        const deal = await Deal.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(deal);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
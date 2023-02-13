import Company from "../models/Company.js";

export const getCompanies = async (req, res) => {
    try {
        const companies = await Company.find().populate("contacts.contactId");
        res.status(200).json(companies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// export const getCompany = async (req, res) => {
//     try {
//         let company = await Company.findById(req.params.id);
//         if (req.query.contacts === "true") {
//             company = await company.populate("contacts.contactId");
//         }
//         res.status(200).json(company);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// }

export const getCompany = async (req, res) => {
    try {
        const company = await Company.findById(req.params.id);//.populate("contacts.contactId");;
        res.status(200).json(company);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const createCompany = async (req, res) => {
    try {
        const company = await Company.create(req.body);
        res.status(201).json(company);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const addContact = async (req, res) => {
    try {
        const company = await Company.findById(req.params.id);
        company.contacts.push(req.body);
        await company.save();
        res.status(201).json(company);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
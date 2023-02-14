import Company from "../models/Company.js";
import mongoose from "mongoose";

export const getCompanies = async (req, res) => {
    try {
        const companies = await Company.find().populate("contacts.contactId");
        const result = companies.map(company => ({
            ...company._doc,
            numberOfContacts: company.contacts.length
        }));
        res.status(200).json(result);
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
        const company = await Company.findById(req.params.id).populate("contacts.contactId");;
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

//get endpoint wich only returns populated contacts array
export const getContacts = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid company ID " + req.params.id });
        }
        const company = await Company.findById(req.params.id).populate("contacts.contactId");
        const contacts = company.contacts.map(contact => {
            return {
                role: contact.role,
                _idOfContactId: contact.contactId._id,
                firstName: contact.contactId.firstName,
                lastName: contact.contactId.lastName,
                email: contact.contactId.email,
                phone: contact.contactId.phone,
                __v: contact.contactId.__v,
                _id: contact._id
            };
        });
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
// export const getContacts = async (req, res) => {
//     try {
//         if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
//             return res.status(400).json({ message: "Invalid company ID " + req.params.id });
//         }
//         const company = await Company.findById(req.params.id).populate("contacts.contactId");
//         res.status(200).json(company.contacts);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// }
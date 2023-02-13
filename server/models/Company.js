import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    organizationId: {
        type: Number,
        required: true,
        unique: true
    },
    customerId: {
        type: Number,
        required: true,
        unique: true
    },
    contacts: [
        {
            role: {
                type: String,
                required: true
            },
            contactId: {
                type: mongoose.Types.ObjectId,
                required: true,
                ref: "Contact"
            }
        }
    ]
});

const Company = mongoose.model("Company", CompanySchema);
export default Company;
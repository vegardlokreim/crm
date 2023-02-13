import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    organizationId: {
        type: Number,
        required: true
    },
    customerId: {
        type: Number,
        required: true
    }
});

const Company = mongoose.model("Company", CompanySchema);
export default Company;
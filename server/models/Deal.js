import mongoose from "mongoose";

const DealSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    }, description: {
        type: String,
        required: true
    }, price: {
        type: Number,
        required: true
    }, status: {
        type: String,
        enum: ["pending", "won", "lost"],
        default: "pending",
    }, dateCreated: {
        type: Date,
        default: Date.now
    }, dateUpdated: {
        type: Date,
    }, dateClosed: {
        type: Date
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company"
    }, userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

const Deal = mongoose.model("Deal", DealSchema);

export default Deal;
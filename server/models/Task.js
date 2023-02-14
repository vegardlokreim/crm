import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    }, description: {
        type: String,
    }, companyId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Company"
    }, user: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }, status: {
        type: String,
        enum: ["pending", "done", "active"],
        default: "pending",
    },
});

const Task = mongoose.model("Task", TaskSchema);

export default Task;
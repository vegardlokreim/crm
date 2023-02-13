import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    }, lastName: {
        type: String,
        required: true
    }, email: {
        type: String,
        required: true
    }, phone: {
        type: String
    }
});

const Contact = mongoose.model('Contact', ContactSchema);

export default Contact;
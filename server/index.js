import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";

/* IMPORTING ROUTES */
import companyRoutes from "./routes/company.js";
import contactsRoutes from "./routes/contact.js";
import taskRoutes from "./routes/task.js";
import userRoutes from "./routes/user.js";
import groupRoutes from "./routes/group.js";

/* CONFIG */
dotenv.config();
const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 5000;
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`)
    });
}).catch((error) => {
    console.log(`${error} did not connect`)
});

/* ROUTES */
app.use("/company", companyRoutes);
app.use("/contact", contactsRoutes);
app.use("/task", taskRoutes);
app.use("/user", userRoutes);
app.use("/group", groupRoutes);


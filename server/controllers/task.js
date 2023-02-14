import Task from "../models/Task.js";

export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find().populate(["companyId", "user"]);
        res.status(201).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        res.status(200).json(task);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getTasksByUserId = async (req, res) => {
    try {
        const tasks = await Task.find({ companyId: req.params.id }).populate("user");
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body);
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const setUser = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        task.user = req.body.userId;
        const savedTask = await task.save();
        res.status(200).json(savedTask);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
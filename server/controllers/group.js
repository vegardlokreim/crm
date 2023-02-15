import Group from "../models/Group.js";

export const getGroups = async (req, res) => {
    try {
        const groups = await Group.find();
        res.status(200).json(groups);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


//endpoint to create a new group
export const createGroup = async (req, res) => {
    try {
        const group = new Group(req.body);
        const savedGroup = await group.save();
        res.status(201).json(savedGroup);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//endpoint to update a group
export const updateGroup = async (req, res) => {
    try {
        const group = await Group.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(group);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//endpoint to delete a group
export const deleteGroup = async (req, res) => {
    try {
        const group = await Group.findByIdAndDelete(req.params.id);
        res.status(200).json(group);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

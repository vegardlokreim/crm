
import mongoose from 'mongoose';

const GroupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }, description: {
        type: String
    }, users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
});

const Group = mongoose.model('Group', GroupSchema);

export default Group;
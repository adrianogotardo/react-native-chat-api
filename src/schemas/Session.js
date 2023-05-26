import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
});

const Session = mongoose.model('sessions', sessionSchema);

export { Session }
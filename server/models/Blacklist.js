import mongoose from "mongoose";

const BlacklistSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
    },
}, { timestamps: true });

export const Blacklist = mongoose.model("blacklist", BlacklistSchema);

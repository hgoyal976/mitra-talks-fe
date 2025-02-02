import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    conversationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Conversation",
        required: true,
    },
    message: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const Message = mongoose.model("Message", messageSchema);
export default Message;
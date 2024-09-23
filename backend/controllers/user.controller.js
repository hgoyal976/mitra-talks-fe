import Conversation from "../models/conversation.model.js";
import User from "../models/user.model.js";

export const getUserForSideBar = async (req, res) => {
    try {
        let loggedInUSerID = req.user._id;

        const filteredUSerList = await User.find({ _id: { $ne: loggedInUSerID } }).select("-password");
        return res.status(200).json(filteredUSerList);

    } catch (err) {
        res.status(500).json({ message: "Interval server error" });
    }
}

export const getConversationsForSideBar = async (req, res) => {
    try {
        let loggedInUSer = req.user._id;
        const filteredConversationList = await Conversation.find({ participants: { $in: [loggedInUSer] } }).populate("messages");
        return res.status(200).json(filteredConversationList);

    } catch (err) {
        res.status(500).json({ message: "Interval server error" });
    }
}
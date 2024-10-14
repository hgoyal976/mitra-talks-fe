import Conversation from "../models/conversation.model.js";
import User from "../models/user.model.js";

export const getUserForSideBar = async (req, res) => {
  try {
    let loggedInUSerID = req.user._id;

    const filteredUSerList = await User.find({
      _id: { $ne: loggedInUSerID },
    }).select("-password");
    return res.status(200).json(filteredUSerList);
  } catch (err) {
    res.status(500).json({ message: "Interval server error" });
  }
};

export const getConversationsForSideBar = async (req, res) => {
  try {
    const userId = req.user._id;

    const conversations = await Conversation.find({
      participants: userId,
    }).populate("participants", "fullName userName profilePic");
    const conversationsSet = new Set();
    conversations.forEach((conversation) => {
      const users = new Set();

      conversation.participants.forEach((participant) => {
        if (participant._id.toString() !== userId.toString()) {
          users.add(participant);
        }
      });
      conversationsSet.add({
        name: conversation.groupName
          ? conversation.groupName
          : users.size === 1
          ? Array.from(users)[0].fullName
          : Array.from(users)
              .map((user) => user.fullName)
              .join(", "),
        profilePic: Array.from(users)[0].profilePic,
        _id: conversation._id,
      });
    });

    res.status(200).json({
      succes: true,
      message: "Users fetched successfully",
      data: {
        users: Array.from(conversationsSet),
      },
    });
  } catch (error) {
    console.log("Error fetching conversations", error);
    res.status(500).json({ error: error, message: "Internal server error" });
  }
};

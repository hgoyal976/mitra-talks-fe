import mongoose from "mongoose";
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
  console.log("checking::::", req.body.recievers);
  try {
    let { message, conversationId } = req.body;
    // let { id: receiversID } = req.params;
    let senderID = req.user._id;
    // const recieversArr = recievers.map(i => new mongoose.Types.ObjectId(i))
    // console.log("checking ids:::", senderID.toString(), recieversArr);
    let conversation = await Conversation.findOne({
      _id: conversationId,
    });
    console.log(conversation);
    // if (!conversation) {
    //     conversation = await Conversation.create({
    //         participants: [...recieversArr]
    //     })
    // }
    console.log(conversation);
    const newMessage = new Message({
      senderID,
      conversationId: conversation._id,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }
    await conversation.save();
    await newMessage.save();

    res.status(201).json(newMessage);
  } catch (err) {
    console.log("error in message controller", err);
    res.status(500).json({ error: "Interal server error" });
  }
};

export const getMessage = async (req, res) => {
  try {
    let { id: conversationId } = req.params;
    let senderID = req.user._id;

    let conversation = await Message.find({
      conversationId: new mongoose.Types.ObjectId(conversationId),
    }).populate("senderID"); // populate we can use because we have given ref in our model. and this will collect all the doucuments and convert it to array of objects
    console.log(conversation);
    if (!conversation) return res.status(201).json([]);

    return res.status(201).json(conversation);
  } catch (err) {
    console.log("error in getMessage in controller", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createNewConversation = async (req, res) => {
  try {
    let { recievers, groupName = "" } = req.body;
    let senderID = req.user._id;
    console.log(senderID, recievers);
    let conversation = await Conversation.findOne({
      participants: [senderID, ...recievers],
    });
    if (!conversation || recievers.length > 1) {
      conversation = new Conversation({
        participants: [senderID, ...recievers],
        groupName: groupName,
      });
      await conversation.save();
    }
    console.log(conversation);
    if (!conversation) return res.status(201).json([]);

    return res.status(201).json(conversation);
  } catch (err) {
    console.log("error in create conversation in controller", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

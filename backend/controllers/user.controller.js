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
        console.log("checking idss:::", loggedInUSer)
        const filteredConversationList = await Conversation.aggregate([
            {$match : {participants : {$in : [loggedInUSer]}}},
            {
              $lookup: {
                from: "users",
                localField: "participants",
                foreignField: "_id",
                as: "result",
              },
            },
            {
              $addFields: {
                participantsNames: {
                  $filter: {
                    input: {
                      $map: {
                        input: "$result",
                        as: "result",
                        in: {
                          $cond: {
                            if: {
                              $ne: [
                                "$$result._id",
                                loggedInUSer,
                              ],
                            },
                            then: "$$result.fullName",
                            else: null,
                          },
                        },
                      },
                    },
                    as: "name",
                    cond: {
                      $ne: ["$$name", null],
                    },
                  },
                },
                participantsProfilePic : {
                    $filter: {
                        input: {
                          $map: {
                            input: "$result",
                            as: "result",
                            in: {
                              $cond: {
                                if: {
                                  $ne: [
                                    "$$result._id",
                                    loggedInUSer,
                                  ],
                                },
                                then: "$$result.profilePic",
                                else: null,
                              },
                            },
                          },
                        },
                        as: "name",
                        cond: {
                          $ne: ["$$name", null],
                        },
                      },
                }
              },
            },
            {
              $project: {
                result: 0,
                // participants: 0,
                messages: 0,
              },
            },
          ])
        return res.status(200).json(filteredConversationList);
        

    } catch (err) {
        res.status(500).json({ message: "Interval server error" });
        console.log(err)
    }
}
import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useCreateConversation = () => {
  const [loading, setLoading] = useState(false);
  const { setCreatedConversationId } = useConversation();
  const createConversation = async (recievers, groupName) => {
    try {
      setLoading(true);
      const res = await fetch("/api/messages/create-conversation/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: groupName
          ? JSON.stringify({ recievers: recievers, groupName: groupName })
          : JSON.stringify({ recievers: recievers }),
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      console.log("createion:::", data);
      setCreatedConversationId(data._id);
    } catch (err) {
      toast.error(err.message);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return { loading, createConversation };
};
export default useCreateConversation;

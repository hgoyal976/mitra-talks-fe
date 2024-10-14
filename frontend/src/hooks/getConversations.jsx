import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation";

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  const { setSelectedConversation, createdConversationId } = useConversation();

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/users/conversations");
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setConversations(data);
        if (createdConversationId) {
          setSelectedConversation(
            [...data.data?.users]?.find((i) => i._id == createdConversationId)
          );
        }
      } catch (err) {
        toast.error(err.message);
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    getConversations();
  }, [createdConversationId]);

  return { loading, conversations };
};
export default useGetConversations;

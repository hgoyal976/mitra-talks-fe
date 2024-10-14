import { useState } from "react"
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useSendMessage = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();

    const sendMessage = async (messageToSend) => {
        try {
            setLoading(true);
            const res = await fetch("/api/messages/send/",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ "message": messageToSend, "conversationId": selectedConversation._id })
                }
            )
            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }
            setMessages([...messages, data]);
        } catch (err) {
            toast.error(err.message);
console.log(err);
        } finally {
            setLoading(false);
        }

    }

    return { loading, sendMessage };
}
export default useSendMessage;
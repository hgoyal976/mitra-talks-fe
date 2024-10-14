import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useGetMessages = () => {
    const { selectedConversation, messages, setMessages } = useConversation();
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        const getMessages = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/messages/${selectedConversation._id}`);
                const data = await res.json();
                if (data.error) {
                    throw new Error(data.error)
                }
                setMessages(data);
            } catch (err) {
                toast.error(err.message);
console.log(err);
            } finally {
                setLoading(false);
            }
        }
        if (selectedConversation._id)
            getMessages();


    }, [selectedConversation]);

    return { loading, messages };

}
export default useGetMessages;
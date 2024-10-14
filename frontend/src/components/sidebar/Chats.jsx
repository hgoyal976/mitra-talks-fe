import useGetConversations from "../../hooks/getConversations";
import Chat from "./Chat";
function Chats() {
    const { loading, conversations } = useGetConversations();
    console.log("checkkk", conversations);
    return <div className="py-2 flex flex-col overflow-auto">
        {conversations?.data?.users.map((item, idx) => {
            return <Chat
                key={item._id}
                conversation={item}
                lastIdx={conversations.length - 1 === idx}
            />
        })}
    </div>

}
export default Chats;
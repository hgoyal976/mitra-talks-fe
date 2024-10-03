import useConversation from "../../zustand/useConversation";
import "./chat.css"

function Chat({ conversation, lastIdx }) {

    const { selectedConversation, setSelectedConversation } = useConversation();

    const isSelected = conversation._id === selectedConversation?._id;

    return <div className={`flex gap-2 items-center hover:bg-purple-200 rounded p-2 py-1 cursor-pointer ${isSelected ? "bg-purple-200" : ""}`}
        style={{ display: "flex", gap: "20px", alignItems: "center", padding: "5px 10px", borderTop: "1px solid #a6adbb", borderBottom: `${lastIdx ? "1px solid #a6adbb" : ""}`, width: "20vw" }}
        onClick={() => { setSelectedConversation(conversation) }}
    >
        <div style={{ width: "27px", height: "27px" }}>
            <img src={conversation?.participantsProfilePic?.length === 1 ? conversation?.participantsProfilePic[0] : ""} />
        </div>
        <label className="chat-username">{conversation.groupName === "" ? conversation.participantsNames?.toString() : conversation.groupName}</label>
        {/* <label className="chat-last-message">yesterday</label> */}
    </div>
}
export default Chat;
import Cookies from "js-cookie";
const Message = ({ message }) => {
  console.log("message:::", message);

  const dateConverter = (timeI) => {
    const date = new Date(timeI);
    const time = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    return time;
  };
  const token = localStorage.getItem("chat-user");
  const selfMessage = JSON.parse(token)._id === message?.senderID?._id;
  //   console.log("checking cookie", token);

  return (
    <div className={`chat ${selfMessage ? "chat-end" : "chat-start"}`}>
      <div className="chat-image avatar">
        <div
          className="w-10 rounded-full"
          style={{ height: "30px", width: "30px" }}
        >
          <img
            alt="Tailwind CSS chat bubble component"
            src={message?.senderID?.profilePic}
          />
        </div>
      </div>
      <div className="chat-bubble text-gray-400 bg-slate-900">
        {message.message}
      </div>
      {/* <div className='chat-footer text-slate-900 opacity-50 text-xs flex gap-1 items-center'>{dateConverter(message.createdAt)}</div> */}
    </div>
  );
};
export default Message;

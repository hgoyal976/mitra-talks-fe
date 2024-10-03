import { TiMessages } from "react-icons/ti";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import useConversation from "../zustand/useConversation";
import { useEffect } from "react";

const MessageContainer = () => {
    // const noChatSelected = true;
    const { selectedConversation, setSelectedConversation } = useConversation();
    console.log("selected:::", selectedConversation);

    useEffect(() => {
        return () => {
            setSelectedConversation(null);
        }
    }, [])
    return (
        <div className='md:min-w-[450px] flex flex-col'>
            {!selectedConversation ? (<NoChatSelected />) : <>
                {/* Header */}
                <div className='bg-slate-900 px-4 py-2 mb-2'>
                    <span className='label-text'>To:</span> <span className='text-gray-400 font-bold'>{selectedConversation?.participantsNames[0]}</span>
                </div>

                <Messages />
                <MessageInput />
            </>}

        </div>
    );
};

const NoChatSelected = () => {
    // const { authUser } = useAuthContext();
    return (
        <div className='flex items-center justify-center w-full h-full'>
            <div className='px-4 text-center sm:text-lg md:text-xl text-slate-900 font-semibold flex flex-col items-center gap-2'>
                <p>Welcome 👋 Priyanshu Bagherwal ❄</p>
                <p>Select a chat to start messaging</p>
                <TiMessages className='text-3xl md:text-6xl text-center' />
            </div>
        </div>
    );
};
export default MessageContainer;
import { BsSend } from "react-icons/bs";
import useSendMessage from "../hooks/useSendMessage";
import { useState } from "react";

const MessageInput = () => {
	const { loading, sendMessage } = useSendMessage();
	const [typedMessage, setTypedMessage] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		await sendMessage(typedMessage);
		setTypedMessage("");
	}


	return (
		<form className='px-4 my-3' onSubmit={handleSubmit}>
			<div className='w-full relative'>
				<input
					type='text'
					className='border text-sm rounded-lg block w-full p-2.5  bg-slate-900 border-gray-600 text-white'
					placeholder='Send a message'
					onChange={(e) => { setTypedMessage(e.target.value) }}
					value={typedMessage}
				/>

				<button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'>
					{loading ? <span className="loading loading-spinner"></span> : <BsSend />}
				</button>
			</div>
		</form>
	);
};
export default MessageInput;
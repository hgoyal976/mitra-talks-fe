import useGetMessages from "../hooks/useGetMessages";
import Message from "./Message";

const Messages = () => {
	const { loading, messages } = useGetMessages();
	console.log("chekinggg:::", messages);
	return (<>
		{loading ? <span className="loading loading-spinner"></span> : <div className='px-4 flex-1 overflow-auto'>
			{messages?.map((i) => {
				return <Message message={i} />
			})}

		</div>
		}
	</>
	);
};
export default Messages;
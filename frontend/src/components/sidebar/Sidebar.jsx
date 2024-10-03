import Chats from "./chats";
import Profile from "./profile";
import SearchInput from "./searchInput";

function Sidebar() {
    return <div className='border-r border-slate-500 p-4 flex flex-col'>
        <SearchInput />
        <div className="divider px-3"></div>
        <Chats />
        <Profile />
    </div>
}
export default Sidebar;
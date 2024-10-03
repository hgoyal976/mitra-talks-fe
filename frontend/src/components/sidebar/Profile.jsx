import { BiLogOut } from "react-icons/bi";
import { FaUserPlus } from "react-icons/fa";
import useLogout from "../../hooks/logoutHook";
function Profile() {
    const { loading, logout } = useLogout();
    return <div className='mt-3 flex justify-between align-baseline'>
        {!loading ?
            <>
                <BiLogOut className='w-6 h-6 text-black cursor-pointer' onClick={logout} />
                <FaUserPlus className='w-6 h-6 text-black cursor-pointer' /></>
            : <sapn className="loading loading-spinner"></sapn>}
    </div>

}
export default Profile;
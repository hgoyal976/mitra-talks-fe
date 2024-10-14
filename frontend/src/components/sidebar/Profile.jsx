import { BiLogOut } from "react-icons/bi";
import { FaUserPlus } from "react-icons/fa";
import useLogout from "../../hooks/logoutHook";
import AddChatModal from "./AddChat.Modal";
import { useState } from "react";
import "./profile.css";
function Profile() {
  const { loading, logout } = useLogout();
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <div className="mt-3 flex justify-between align-baseline">
        {!loading ? (
          <>
            <div className="log-out-btn" onClick={() => setModalOpen(true)}>
              <BiLogOut
                className="w-6 h-6 text-black cursor-pointer log-out-icon"
                onClick={logout}
                style={{ display: "inline" }}
              />
              <span className="w-6 h-6 text-black cursor-pointer log-out-text">
                Logout
              </span>
            </div>

            <div className="new-text-btn" onClick={() => setModalOpen(true)}>
              <span className="w-6 h-6 text-black cursor-pointer new-chat-text">
                Start new chat
              </span>
              <FaUserPlus
                className="w-6 h-6 text-black cursor-pointer new-text-icon"
                style={{ display: "inline" }}
              />
            </div>
          </>
        ) : (
          <sapn className="loading loading-spinner"></sapn>
        )}
      </div>
      <AddChatModal
        open={modalOpen}
        handleClose={() => {
          setModalOpen(false);
        }}
      />
    </>
  );
}
export default Profile;

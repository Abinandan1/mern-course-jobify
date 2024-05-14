import { FaCaretDown, FaUserCircle } from "react-icons/fa";
import Wrapper from "../wrappers/LogoutContainer";
import { useDashboardContext } from "../pages/DashboardLayout";
import { useState } from "react";

const LogoutContainer = () => {
  const { user, logoutUser } = useDashboardContext();
  const [showLogout, setShowLogout] = useState(false);

  return (
    <Wrapper>
      <button
        type="button"
        className="btn logout-btn"
        onClick={() => setShowLogout(!showLogout)}
      >
        {user.avatar ? <img src={user.avatar} alt="" /> : <FaUserCircle />}
        {user?.name}
        <FaCaretDown />
      </button>
      <div className={`${showLogout && "show-dropdown"} dropdown`}>
        <button type="button" className="dropdown-btn" onClick={logoutUser}>
          logout
        </button>
      </div>
    </Wrapper>
  );
};
export default LogoutContainer;

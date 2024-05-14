import { NavLink } from "react-router-dom";
import links from "../utils/links";
import { useDashboardContext } from "../pages/DashboardLayout";

const NavLinks = ({ isBigSidebar }) => {
  const { toggleSidebar, user } = useDashboardContext();
  const isAdmin = user.role === "admin";
  return (
    <div className="nav-links">
      {links.map((link, index) => {
        const { text, path, icon } = link;
        if (!isAdmin && path === "admin") return;
        return (
          <NavLink
            onClick={!isBigSidebar && toggleSidebar}
            key={text}
            to={path}
            className="nav-link"
            end
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};
export default NavLinks;

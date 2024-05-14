import { useDashboardContext } from "../pages/DashboardLayout";
import Wrapper from "../wrappers/BigSidebar";
import Logo from "./Logo";
import { NavLinks } from "../components";

const BigSidebar = () => {
  const { showSidebar } = useDashboardContext();
  return (
    <Wrapper>
      <div className={`${!showSidebar && "show-sidebar"} sidebar-container`}>
        <div className="content">
          <header>
            <Logo />
          </header>
          <NavLinks isBigSidebar />
        </div>
      </div>
    </Wrapper>
  );
};
export default BigSidebar;

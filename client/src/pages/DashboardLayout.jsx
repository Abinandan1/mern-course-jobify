import {
  Outlet,
  redirect,
  useLoaderData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import { BigSidebar, Loading, Navbar, SmallSidebar } from "../components";
import Wrapper from "../wrappers/Dashboard";
import { createContext, useContext, useEffect, useState } from "react";
import { getThemeFromLocalStorage } from "../App";
import { customFetch } from "../utils/customFetch";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";

const userQuery = {
  queryKey: ["user"],
  queryFn: async () => {
    const response = await customFetch("/users/current-user");
    return response.data;
  },
};

export const loader = (queryClient) => async () => {
  try {
    return await queryClient.ensureQueryData(userQuery);
  } catch (error) {
    // AUTHENTICATION
    toast.error(error?.response?.data?.msg);
    return redirect("/");
  }
};

const DashboardContext = createContext();
const DashboardLayout = ({ queryClient }) => {
  const {
    data: { user },
  } = useQuery(userQuery);
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(getThemeFromLocalStorage());
  const [isAuthError, setIsAuthError] = useState(false);
  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    document.body.classList.toggle("dark-theme", newDarkTheme);
    localStorage.setItem("theme", newDarkTheme);
  };
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  const logoutUser = async () => {
    const response = await customFetch("/auth/logout");
    queryClient.invalidateQueries();
    toast.success(response.data.msg);
    navigate("/");
  };
  // INTERCEPTORS
  customFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error?.response?.status === 401) {
        setIsAuthError(true);
      }
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    if (isAuthError) {
      logoutUser();
    }
    return;
  }, [isAuthError]);
  return (
    <DashboardContext.Provider
      value={{
        user,
        showSidebar,
        isDarkTheme,
        toggleDarkTheme,
        toggleSidebar,
        logoutUser,
      }}
    >
      <Wrapper>
        <main className="dashboard">
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />
            <div className="dashboard-page">
              {isLoading ? <Loading /> : <Outlet context={{ user }} />}
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
};
export const useDashboardContext = () => useContext(DashboardContext);
export default DashboardLayout;

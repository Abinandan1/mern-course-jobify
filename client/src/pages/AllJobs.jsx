import { toast } from "react-toastify";
import { JobsContainer, SearchContainer } from "../components";
import { customFetch } from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";
import { createContext, useContext } from "react";
export const loader = async ({ request }) => {
  const url = new URL(request.url);
  let params = Object.fromEntries([...url.searchParams.entries()]);
  try {
    const response = await customFetch(`/jobs`, { params });
    return { data: response.data, searchValues: { ...params } };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};
const AllJobsContext = createContext();
const AllJobs = () => {
  const {
    data: { numberOfPages, currentPage, totalJobs, jobs },
    searchValues,
  } = useLoaderData();
  return (
    <AllJobsContext.Provider
      value={{ numberOfPages, currentPage, totalJobs, jobs, searchValues }}
    >
      <SearchContainer />
      <JobsContainer />
    </AllJobsContext.Provider>
  );
};
export const useAllJobsContext = () => useContext(AllJobsContext);
export default AllJobs;

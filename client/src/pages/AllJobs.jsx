import { toast } from "react-toastify";
import { JobsContainer, SearchContainer } from "../components";
import { customFetch } from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";
import { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";

const allJobsQuery = (params) => {
  const { search, jobStatus, jobType, sort, page } = params;
  return {
    queryKey: [
      "jobs",
      search ?? "",
      jobStatus ?? "all",
      jobType ?? "all",
      sort ?? "newest",
      page ?? 1,
    ],
    queryFn: async () => {
      const response = await customFetch(`/jobs`, { params });
      return response.data;
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ request }) => {
    const url = new URL(request.url);
    let params = Object.fromEntries([...url.searchParams.entries()]);
    await queryClient.ensureQueryData(allJobsQuery(params));
    return { searchValues: { ...params } };
  };
const AllJobsContext = createContext();
const AllJobs = () => {
  const { searchValues } = useLoaderData();
  const { data } = useQuery(allJobsQuery(searchValues));
  const { numberOfPages, currentPage, totalJobs, jobs } = data;
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

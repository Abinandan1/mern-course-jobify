import { useLoaderData } from "react-router-dom";
import { customFetch } from "../utils/customFetch";
import { ChartsContainer, StatsContainer } from "../components";
import { useQuery } from "@tanstack/react-query";

const statsQuery = {
  queryKey: ["stats"],
  queryFn: async () => {
    const response = await customFetch("/jobs/stats");
    return response.data;
  },
};

export const loader = (queryClient) => async () => {
  const data = await queryClient.ensureQueryData(statsQuery);
  return null;
};

const Stats = () => {
  const { data } = useQuery(statsQuery);
  const { stats, monthlyApplications } = data;

  return (
    <>
      <StatsContainer defaultStats={stats} />
      {monthlyApplications?.length > 1 && (
        <ChartsContainer monthlyApplications={monthlyApplications} />
      )}
    </>
  );
};
export default Stats;

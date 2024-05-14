import { useLoaderData } from "react-router-dom";
import { customFetch } from "../utils/customFetch";
import { ChartsContainer, StatsContainer } from "../components";

export const loader = async () => {
  try {
    const response = await customFetch("/jobs/stats");
    return response.data;
  } catch (error) {
    return error;
  }
  return null;
};
const Stats = () => {
  const { stats, monthlyApplications } = useLoaderData();
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

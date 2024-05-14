import { useState } from "react";
import Wrapper from "../wrappers/ChartsContainer";
import BarChart from "./BarChart";
import AreaChart from "./AreaChart";

const ChartsContainer = ({ monthlyApplications }) => {
  const [barChart, setBarChart] = useState(true);
  return (
    <Wrapper>
      <h4>Monthly Applications</h4>
      <button type="button" onClick={() => setBarChart(!barChart)}>
        {barChart ? "Area chart" : "Bar chart"}
      </button>
      {barChart ? (
        <BarChart monthlyApplications={monthlyApplications} />
      ) : (
        <AreaChart monthlyApplications={monthlyApplications} />
      )}
    </Wrapper>
  );
};
export default ChartsContainer;

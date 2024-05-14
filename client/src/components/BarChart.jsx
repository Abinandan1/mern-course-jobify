import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
const BarChartComponent = ({ monthlyApplications }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={monthlyApplications} margin={{ top: 40 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis allowDecimals={false} />
        <Tooltip
          contentStyle={{
            color: "var(--text-color)",
            textTransform: "capitalize",
            borderRadius: "0.25rem",
            background: "var(--background-color)",
            border: "1px solid var(--text-color)",
          }}
        />
        <Bar dataKey="count" fill="#2cb1bc" barSize={75} />
      </BarChart>
    </ResponsiveContainer>
  );
};
export default BarChartComponent;

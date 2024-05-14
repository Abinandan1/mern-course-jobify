import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
const AreaChartComponent = ({ monthlyApplications }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={monthlyApplications} margin={{ top: 50 }}>
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
        <Area type="monotone" dataKey="count" stroke="#2cb1bc" fill="#bef8fd" />
      </AreaChart>
    </ResponsiveContainer>
  );
};
export default AreaChartComponent;

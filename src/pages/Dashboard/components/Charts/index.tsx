import { BarChart } from "@mantine/charts";

import "@mantine/charts/styles.css";


const data = [
  { month: "January", income: 1200, expenses: 900, investments: 200 },
  { month: "February", income: 1900, expenses: 1200, investments: 400 },
  { month: "March", income: 400, expenses: 1000, investments: 200 },
  { month: "April", income: 1000, expenses: 200, investments: 800 },
  { month: "May", income: 800, expenses: 1400, investments: 1200 },
  { month: "June", income: 750, expenses: 600, investments: 1000 },
];

export const Charts = () => {
  return (
    <BarChart
      h={300}
      data={data}
      dataKey="month"
      xAxisLabel="Month"
      yAxisLabel="Amount"
      series={[
        { name: "income", color: "violet.6" },
        { name: "expenses", color: "blue.6" },
        { name: "investments", color: "teal.6" },
      ]}
      tickLine="y"
    />
  );
};

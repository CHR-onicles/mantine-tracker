export interface DataItem {
  title: string;
  value: string;
  diff?: number;
}

export interface MonthData {
  month: number; // Zero-indexed month
  data: DataItem[]; // Array of data items for the month
}

export interface YearData {
  year: number; // Year
  months: MonthData[]; // Array of month data
}

export type YearsData = YearData[];

// Default data structure
const data: DataItem[] = [
  { title: "Income", value: "50,460" },
  { title: "Expenses", value: "20,229" },
  { title: "Investments", value: "2,550" },
  { title: "Loans", value: "200" },
];

// Generate static array with objects containing year and months
const yearsData: YearsData = [];

// Number of years to generate data for
const numYears = 10;

// Generate data for each year
for (let i = 0; i < numYears; i++) {
  const year = 2020 + i;
  const monthsData: MonthData[] = [];

  // Generate data for each month (zero-indexed)
  for (let j = 0; j < 12; j++) {
    const month = j;
    const monthData = data.map(item => ({
      title: item.title,
      value: getRandomValue(),
    }));
    monthsData.push({ month, data: monthData });
  }

  yearsData.push({ year, months: monthsData });
}

// console.log(yearsData);

// Function to generate a random value string
function getRandomValue(): string {
  const value = Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000;
  return value.toLocaleString();
}

export default yearsData;

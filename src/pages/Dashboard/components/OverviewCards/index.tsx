import { useEffect, useState } from "react";
import { Group, Paper, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import { MonthPickerInput } from "@mantine/dates";
import {
  IconArrowDownRight,
  IconArrowUpRight,
  IconBriefcase,
  IconCalendar,
  IconCoin,
  IconDiscount2,
  IconReceipt2,
} from "@tabler/icons-react";

import yearsData, {
  DataItem,
  MonthData,
  YearData,
  YearsData,
} from "./generateData";
import { StyledOverviewCards } from "./OverviewCards.styled";


const icons = {
  briefcase: IconBriefcase,
  discount: IconDiscount2,
  receipt: IconReceipt2,
  coin: IconCoin,
};

// const data = [
//   { title: "Income", icon: "receipt", value: "50,460", diff: 69 },
//   { title: "Expenses", icon: "coin", value: "20,229", diff: -17 },
//   { title: "Investments", icon: "discount", value: "2,550", diff: 15 },
//   { title: "Loans", icon: "briefcase", value: "200", diff: -90 },
// ] as const;

const iconMap = {
  Income: "receipt",
  Expenses: "coin",
  Investments: "discount",
  Loans: "briefcase",
};

function getDiff(
  year: number,
  month: number,
  yearsData: YearsData
): DataItem[] | null {
  // Subtract 1 from the month to get the previous month
  const prevMonth = month === 0 ? 11 : month - 1;

  // Adjust year accordingly if month is January
  const prevYear = month === 0 ? year - 1 : year;

  // Find data for the previous month
  const prevMonthData = yearsData.reduce(
    (acc: DataItem[] | null, yearData: YearData) => {
      if (yearData.year === prevYear) {
        const monthData = yearData.months.find(
          (m: MonthData) => m.month === prevMonth
        );
        if (monthData) {
          return monthData.data;
        }
      }
      return acc;
    },
    null
  );

  return prevMonthData;
}

function calculatePercentageChange(oldValue: string, newValue: string): number {
  const oldVal = parseInt(oldValue?.replace(/,/g, ""));
  const newVal = parseInt(newValue?.replace(/,/g, ""));

  // console.log(oldVal, newVal);
  const val = +(((newVal - oldVal) / oldVal) * 100).toFixed(1);
  // console.log(val);

  return val;
}

export const OverviewCards = () => {
  const colorScheme = "light"; // todo: Change later to use store
  const [date, setDate] = useState<Date | null>(new Date());
  const [filteredData, setFilteredData] = useState([] as DataItem[]);
  const [prevMonthData, setPrevMonthData] = useState([] as DataItem[]);

  const stats = filteredData.map((stat, index) => {
    const percentage = calculatePercentageChange(
      prevMonthData?.at(index)?.value as string,
      stat.value
    );

    const Icon =
      icons[iconMap[stat.title as keyof typeof iconMap] as keyof typeof icons]; // Could have made this simpler but ah well
    const DiffIcon = percentage > 0 ? IconArrowUpRight : IconArrowDownRight;

    return (
      <Paper withBorder p="md" radius="md" key={stat.title}>
        <Group justify="space-between">
          <Text size="xs" c="dimmed" fw={700} tt={"uppercase"}>
            {stat.title}
          </Text>
          <Icon className={"icon"} size="1.4rem" stroke={1.5} />
        </Group>

        <Group align="flex-end" gap="xs" mt={25}>
          <Text className={"value"}>{stat.value}</Text>
          <Text
            c={percentage > 0 ? "teal" : "red"}
            fz="sm"
            fw={500}
            className={"diff"}>
            <span>{Math.abs(percentage)}%</span>
            <DiffIcon size="1rem" stroke={1.5} />
          </Text>
        </Group>

        <Text fz="xs" c="dimmed" mt={7}>
          Compared to previous month
        </Text>
      </Paper>
    );
  });

  useEffect(() => {
    yearsData;
    if (date) {
      const year = date.getFullYear();
      const month = date.getMonth();

      const filteredData = yearsData.reduce(
        (acc: DataItem[], yearData: YearData) => {
          if (yearData.year === year) {
            const monthData = yearData.months.find(
              (m: MonthData) => m.month === month
            );
            if (monthData) {
              return monthData.data;
            }
          }
          return acc;
        },
        []
      );

      setFilteredData(filteredData);

      setPrevMonthData(
        getDiff(
          date?.getFullYear() as number,
          date?.getMonth() as number,
          yearsData
        ) as DataItem[]
      );
    }
  }, [date]);

  return (
    <Stack mt={"sm"}>
      <Group justify="space-between">
        <Title order={3} fw={600} fz={20} mb={"xs"} c={"dimmed"}>
          Overview for{" "}
          {date?.toLocaleDateString("en-GB", {
            month: "long",
            year: "numeric",
          })}
        </Title>

        <Group gap={10}>
          <Text fw={500} c="dimmed">
            Period
          </Text>
          <MonthPickerInput
            leftSection={<IconCalendar size={20} />}
            leftSectionPointerEvents="none"
            placeholder="Pick date"
            value={date}
            onChange={setDate}
          />
        </Group>
      </Group>

      <StyledOverviewCards $colorScheme={colorScheme} className={"root"}>
        <SimpleGrid cols={{ base: 1, xs: 2, md: 4 }}>{stats}</SimpleGrid>
      </StyledOverviewCards>
    </Stack>
  );
};

import { Group, Paper, SimpleGrid, Text } from "@mantine/core";
import {
  IconArrowDownRight,
  IconArrowUpRight,
  IconBriefcase,
  IconCoin,
  IconDiscount2,
  IconReceipt2,
} from "@tabler/icons-react";

import { StyledOverviewCards } from "./OverviewCards.styled";


const icons = {
  briefcase: IconBriefcase,
  discount: IconDiscount2,
  receipt: IconReceipt2,
  coin: IconCoin,
};

const data = [
  { title: "Income", icon: "receipt", value: "50,460", diff: 69 },
  { title: "Expenses", icon: "coin", value: "20,229", diff: -17 },
  { title: "Investments", icon: "discount", value: "2,550", diff: 15 },
  { title: "Loans", icon: "briefcase", value: "200", diff: -90 },
] as const;

export const OverviewCards = () => {
  const colorScheme = "light"; // todo: Change later to use store

  const stats = data.map(stat => {
    const Icon = icons[stat.icon];
    const DiffIcon = stat.diff > 0 ? IconArrowUpRight : IconArrowDownRight;

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
            c={stat.diff > 0 ? "teal" : "red"}
            fz="sm"
            fw={500}
            className={"diff"}>
            <span>{stat.diff}%</span>
            <DiffIcon size="1rem" stroke={1.5} />
          </Text>
        </Group>

        <Text fz="xs" c="dimmed" mt={7}>
          Compared to previous month
        </Text>
      </Paper>
    );
  });

  return (
    <StyledOverviewCards $colorScheme={colorScheme} className={"root"}>
      <SimpleGrid cols={{ base: 1, xs: 2, md: 4 }}>{stats}</SimpleGrid>
    </StyledOverviewCards>
  );
};

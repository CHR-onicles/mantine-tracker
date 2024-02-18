import { useMemo, useState } from "react";
import {
  ActionIcon,
  Badge,
  Center,
  Checkbox,
  Group,
  Menu,
  Pagination,
  rem,
  Table,
  Text,
} from "@mantine/core";
import {
  IconDots,
  IconMessages,
  IconNote,
  IconPencil,
  IconReportAnalytics,
  IconTrash,
} from "@tabler/icons-react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  Row,
  useReactTable,
} from "@tanstack/react-table";


interface Transaction {
  id: number;
  type: "income" | "expense" | "investment";
  amount: number;
  timestamp: Date;
  action?: string;
  _?: string;
}

function chunk<T>(array: T[], size: number): T[][] {
  if (!array.length) {
    return [];
  }
  const head = array.slice(0, size);
  const tail = array.slice(size);
  return [head, ...chunk(tail, size)];
}

const transactions: Transaction[] = [
  {
    id: 1,
    type: "income",
    amount: 500,
    timestamp: new Date("2023-12-01T12:00:00.000Z"),
  },
  {
    id: 2,
    type: "expense",
    amount: 300,
    timestamp: new Date("2023-11-25T08:30:00.000Z"),
  },
  {
    id: 3,
    type: "investment",
    amount: 700,
    timestamp: new Date("2023-11-20T15:45:00.000Z"),
  },
  {
    id: 4,
    type: "income",
    amount: 200,
    timestamp: new Date("2023-11-15T18:20:00.000Z"),
  },
  {
    id: 5,
    type: "expense",
    amount: 100,
    timestamp: new Date("2023-11-10T09:10:00.000Z"),
  },
  {
    id: 6,
    type: "investment",
    amount: 900,
    timestamp: new Date("2023-11-05T14:55:00.000Z"),
  },
  {
    id: 7,
    type: "income",
    amount: 800,
    timestamp: new Date("2023-10-30T11:30:00.000Z"),
  },
  {
    id: 8,
    type: "expense",
    amount: 600,
    timestamp: new Date("2023-10-25T16:25:00.000Z"),
  },
  {
    id: 9,
    type: "investment",
    amount: 400,
    timestamp: new Date("2023-10-20T13:15:00.000Z"),
  },
  {
    id: 10,
    type: "income",
    amount: 1000,
    timestamp: new Date("2023-10-15T07:45:00.000Z"),
  },
];

const data = chunk(transactions, 5);

const colors: Record<string, string> = {
  income: "green",
  investment: "blue",
  expense: "pink",
};

const columnHelper = createColumnHelper<Transaction>();

export const RecentActivityTable = () => {
  const [searchFilter, setSearchFilter] = useState("");
  const [activePage, setPage] = useState(1);

  const columns = useMemo(
    () => [
      columnHelper.accessor("_", {
        header: ({ table }) => (
          <Checkbox
            aria-label="Select row"
            checked={table.getIsAllRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
            indeterminate={table.getIsSomeRowsSelected()}
          />
        ),
        cell: info => (
          <Checkbox
            aria-label="Select row"
            checked={info.row.getIsSelected()}
            onChange={info.row.getToggleSelectedHandler()}
          />
        ),
      }),
      columnHelper.accessor("id", {
        header: "ID",
        cell: info => `#${info.cell.getValue()}`,
      }),
      columnHelper.accessor("type", {
        header: "Type",
        cell: info => (
          <Badge
            color={colors[info.cell.getValue().toLowerCase()]}
            variant="light">
            {info.cell.getValue()}
          </Badge>
        ),
      }),
      columnHelper.accessor("amount", {
        header: "Amount",
        cell: info =>
          `${Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(info.cell.getValue())}`,
      }),
      columnHelper.accessor("timestamp", {
        header: "Timestamp",
        cell: info => (
          <Text c={"dimmed"}>
            {info.cell.getValue().toLocaleString("en-US", {
              year: "numeric",
              month: "long",
              day: "2-digit",
              hourCycle: "h12",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })}
          </Text>
        ),
      }),
      columnHelper.accessor("action", {
        header: "",
        cell: () => {
          return (
            <Group gap={0} justify="flex-end">
              <ActionIcon variant="subtle" color="gray">
                <IconPencil
                  style={{ width: rem(16), height: rem(16) }}
                  stroke={1.5}
                />
              </ActionIcon>
              <Menu
                transitionProps={{ transition: "pop" }}
                withArrow
                position="bottom-end"
                withinPortal>
                <Menu.Target>
                  <ActionIcon variant="subtle" color="gray">
                    <IconDots
                      style={{ width: rem(16), height: rem(16) }}
                      stroke={1.5}
                    />
                  </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item
                    leftSection={
                      <IconMessages
                        style={{ width: rem(16), height: rem(16) }}
                        stroke={1.5}
                      />
                    }>
                    Send message
                  </Menu.Item>
                  <Menu.Item
                    leftSection={
                      <IconNote
                        style={{ width: rem(16), height: rem(16) }}
                        stroke={1.5}
                      />
                    }>
                    Add note
                  </Menu.Item>
                  <Menu.Item
                    leftSection={
                      <IconReportAnalytics
                        style={{ width: rem(16), height: rem(16) }}
                        stroke={1.5}
                      />
                    }>
                    Analytics
                  </Menu.Item>
                  <Menu.Item
                    leftSection={
                      <IconTrash
                        style={{ width: rem(16), height: rem(16) }}
                        stroke={1.5}
                      />
                    }
                    color="red">
                    Delete transaction
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Group>
          );
        },
      }),
    ],
    []
  );

  const table = useReactTable({
    data: data[activePage - 1],
    columns,
    state: {
      globalFilter: searchFilter,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setSearchFilter,
    globalFilterFn: (
      row: Row<Transaction>,
      columnId: string,
      value: string
    ) => {
      if (columnId === "id" || columnId === "type" || columnId === "amount") {
        return (row.getValue(columnId) as string)
          .toLocaleLowerCase()
          .includes(value);
      }
      return false;
    },
  });

  return (
    <Table.ScrollContainer minWidth={500} maw={800}>
      <Table verticalSpacing={"md"} striped>
        <Table.Thead>
          {table.getHeaderGroups().map(headerGroup => (
            <Table.Tr key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                return (
                  <Table.Th
                    // ta={header.id === "amount" ? "right" : "left"}
                    pr={header.id === "amount" ? "sm" : "xl"}
                    key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </Table.Th>
                );
              })}
            </Table.Tr>
          ))}
        </Table.Thead>

        <Table.Tbody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map(row => (
              <Table.Tr
                key={row.id}
                bg={
                  row.getIsSelected()
                    ? "var(--mantine-color-blue-light)"
                    : undefined
                }>
                {row.getVisibleCells().map(cell => (
                  <Table.Td
                    key={cell.id}
                    className={cell.id}
                    // maw={cell.id.includes("type") ? "180" : "auto"}
                    // pr={
                    //   cell.id.includes("amount") || cell.id.includes("action")
                    //     ? "sm"
                    //     : "xl"
                    // }
                    // ta={cell.id.includes("amount") ? "right" : "left"}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Table.Td>
                ))}
              </Table.Tr>
            ))
          ) : (
            <Table.Tr>
              <Table.Td colSpan={columns.length} h={24} pt={"xl"}>
                <Center>No results to display.</Center>
              </Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>
      <Group justify="space-between" align="center" mt={"xl"}>
        <Text c="dimmed" fz={"md"}>
          {table.getSelectedRowModel().rows.length} of 5 rows selected
        </Text>
        <Pagination value={activePage} onChange={setPage} total={2} />
      </Group>
    </Table.ScrollContainer>
  );
};

import { useEffect, useMemo, useState } from "react";
import {
  ActionIcon,
  Badge,
  Button,
  Center,
  Checkbox,
  CloseButton,
  Group,
  Menu,
  Pagination,
  rem,
  Stack,
  Table,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import {
  IconChevronDown,
  IconChevronUp,
  IconDots,
  IconMessages,
  IconNote,
  IconPencil,
  IconPlus,
  IconReportAnalytics,
  IconSearch,
  IconSelector,
  IconTrash,
} from "@tabler/icons-react";
import {
  Column,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  Row,
  SortingState,
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
  {
    id: 11,
    type: "expense",
    amount: 450,
    timestamp: new Date("2023-09-25T14:20:00.000Z"),
  },
  {
    id: 12,
    type: "income",
    amount: 850,
    timestamp: new Date("2023-09-20T09:35:00.000Z"),
  },
  {
    id: 13,
    type: "investment",
    amount: 600,
    timestamp: new Date("2023-09-15T11:50:00.000Z"),
  },
  {
    id: 14,
    type: "expense",
    amount: 200,
    timestamp: new Date("2023-09-10T13:45:00.000Z"),
  },
  {
    id: 15,
    type: "income",
    amount: 750,
    timestamp: new Date("2023-09-05T17:30:00.000Z"),
  },
  {
    id: 16,
    type: "investment",
    amount: 550,
    timestamp: new Date("2023-08-30T08:15:00.000Z"),
  },
  {
    id: 17,
    type: "income",
    amount: 300,
    timestamp: new Date("2023-08-25T10:40:00.000Z"),
  },
  {
    id: 18,
    type: "expense",
    amount: 150,
    timestamp: new Date("2023-08-20T12:55:00.000Z"),
  },
  {
    id: 19,
    type: "investment",
    amount: 950,
    timestamp: new Date("2023-08-15T15:10:00.000Z"),
  },
  {
    id: 20,
    type: "income",
    amount: 400,
    timestamp: new Date("2023-08-10T18:25:00.000Z"),
  },
];

const colors: Record<string, string> = {
  income: "green",
  investment: "blue",
  expense: "pink",
};

const columnHelper = createColumnHelper<Transaction>();

export const RecentActivityTable = () => {
  const [searchFilter, setSearchFilter] = useState("");
  const [debounced] = useDebouncedValue(searchFilter, 300);
  const [sorting, setSorting] = useState<SortingState>([]);

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
        header: ({ column }) => SortButton(column, "ID"),
        cell: info => <Text pl={"xs"}>{`#${info.cell.getValue()}`}</Text>,
      }),
      columnHelper.accessor("type", {
        header: ({ column }) => SortButton(column, "Type"),
        cell: info => (
          <Badge
            color={colors[info.cell.getValue().toLowerCase()]}
            variant="light">
            {info.cell.getValue()}
          </Badge>
        ),
      }),
      columnHelper.accessor("amount", {
        header: ({ column }) => SortButton(column, "Amount"),
        cell: info => (
          <Text pl={"xs"}>
            {Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(info.cell.getValue())}
          </Text>
        ),
      }),
      columnHelper.accessor("timestamp", {
        header: ({ column }) => SortButton(column, "Timestamp"),
        cell: info => (
          <Text c={"dimmed"} pl={"xs"}>
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
    data: transactions,
    columns,
    state: {
      sorting,
      globalFilter: debounced,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onGlobalFilterChange: setSearchFilter,
    globalFilterFn: (
      row: Row<Transaction>,
      columnId: string,
      value: string
    ) => {
      if (columnId === "id" || columnId === "type" || columnId === "amount") {
        return (row.getValue(columnId) as string | number)
          .toString()
          .toLocaleLowerCase()
          .includes(value);
      }
      return false;
    },
  });

  useEffect(() => {
    table.setPageSize(5);
  }, []);

  return (
    <Stack mt={"sm"}>
      <Group justify="space-between">
        <Title order={3} fw={600} fz={20} mb={"0"} c={"dimmed"}>
          Recent activity
        </Title>
        <Group>
          <TextInput
            placeholder="Search..."
            value={searchFilter}
            onChange={event => {
              setSearchFilter(event.currentTarget.value);
            }}
            leftSectionPointerEvents="none"
            leftSection={<IconSearch size={18} />}
            rightSection={
              <CloseButton
                size={"xs"}
                aria-label="Clear input"
                onClick={() => setSearchFilter("")}
                style={{ display: searchFilter ? undefined : "none" }}
              />
            }
          />
          <Button leftSection={<IconPlus size={18} stroke={2} />}>
            Create
          </Button>
        </Group>
      </Group>

      <Table.ScrollContainer minWidth={600}>
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
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
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
            {table.getSelectedRowModel().rows.length} of{" "}
            {table.getPageCount() * table.getRowModel().rows.length} rows
            selected
          </Text>
          <Pagination
            value={table.getState().pagination.pageIndex + 1}
            onChange={val => table.setPageIndex(val - 1)}
            onNextPage={() => table.nextPage()}
            onPreviousPage={() => table.previousPage()}
            total={table.getPageCount()}
          />
        </Group>
      </Table.ScrollContainer>
    </Stack>
  );
};

const SortButton = (
  column: Column<Transaction, string | number | Date>,
  columnHeader: string
) => {
  return (
    <Button
      color={"gray"}
      variant="subtle"
      px={"xs"}
      rightSection={
        column.getIsSorted() === "desc" ? (
          <IconChevronDown size={16} />
        ) : column.getIsSorted() === "asc" ? (
          <IconChevronUp size={16} />
        ) : (
          <IconSelector size={16} />
        )
      }
      onClick={() => {
        console.log(column.getIsSorted());
        if (column.getIsSorted() === "asc") {
          column.toggleSorting(true);
        } else if (column.getIsSorted() === "desc") {
          column.clearSorting();
        } else column.toggleSorting(false);
      }}>
      <Text c="black" fz={14} fw={700}>
        {columnHeader}
      </Text>
    </Button>
  );
};

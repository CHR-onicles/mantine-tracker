import { useEffect, useMemo, useState } from "react";
import {
  ActionIcon,
  Badge,
  Button,
  Center,
  Checkbox,
  CloseButton,
  Container,
  Group,
  Menu,
  Pagination,
  rem,
  Select,
  Stack,
  Table,
  Text,
  TextInput,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useDebouncedValue } from "@mantine/hooks";
import {
  IconCalendar,
  IconDots,
  IconNote,
  IconPencil,
  IconPlus,
  IconReportAnalytics,
  IconSearch,
  IconTrash,
} from "@tabler/icons-react";
import {
  ColumnFiltersState,
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

import { SortButton } from "@pages/Dashboard/components/RecentActivityTable";

import { AppShellLayout } from "@layouts/AppShell";

import { colors, generateRandomTransactions } from "@data/transactions";

import { Transaction } from "@customTypes/index";


const columnHelper = createColumnHelper<Transaction>();

const data = generateRandomTransactions(500);

const isWithinRange = (
  row: Row<Transaction>,
  columnId: string,
  value: [Date, Date]
) => {
  const date = row.getValue(columnId) as Date;
  const rawDate = date.setHours(0, 0, 0, 0); // This is needed because the actual date may have hours and mins we can't reproduce in our date picker

  // console.log(value);
  const [start, end] = value;
  // console.log("value:", value, "date", date);

  if ((start || end) && !date) return false;
  if (start && !end) {
    return rawDate >= start.getTime();
  } else if (!start && end) {
    return rawDate <= end.getTime();
  } else if (start && end) {
    // console.log("entered >= or <=");
    return rawDate >= start.getTime() && rawDate <= end.getTime();
  } else return true;
};

export const Transactions = () => {
  const [searchFilter, setSearchFilter] = useState("");
  const [debounced] = useDebouncedValue(searchFilter, 300);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [filterType, setFilterType] = useState<string | null>("");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [dates, setDates] = useState<[Date | null, Date | null]>([null, null]);

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
        filterFn: isWithinRange,
        cell: info => (
          <Text c={"dimmed"} pl={"xs"} lh={"xs"} fz={"sm"}>
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
    data,
    columns,
    state: {
      sorting,
      globalFilter: debounced,
      columnFilters,
    },
    filterFns: {
      isWithinRange,
    },
    onColumnFiltersChange: setColumnFilters,
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
    table.setPageSize(20);
    table.getColumn("timestamp")?.toggleSorting(true);
  }, []);

  useEffect(() => {
    if (filterType) {
      table.getColumn("type")?.setFilterValue(filterType.toLocaleLowerCase());
    } else {
      table.resetColumnFilters();
    }
  }, [filterType]);

  useEffect(() => {
    if (dates[0] !== null && dates[1] !== null) {
      table.getColumn("timestamp")?.setFilterValue(dates);
    } else {
      table.resetColumnFilters();
    }
  }, [dates]);

  return (
    <AppShellLayout>
      <Container maw={1360}>
        <Stack mt={"sm"}>
          <Group justify="space-between">
            <TextInput
              flex={"1"}
              maw={400}
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
            <Group>
              <DatePickerInput
                placeholder="Filter by date"
                leftSection={<IconCalendar size={20} stroke={1.2} />}
                type="range"
                clearable
                value={dates}
                onChange={setDates}
                allowSingleDateInRange
              />
              <Select
                placeholder="Filter by Type"
                data={["Income", "Expense", "Investment"]}
                clearable
                value={filterType}
                onChange={setFilterType}
              />
              <Button leftSection={<IconPlus size={18} stroke={2} />}>
                Add Transaction
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
                {table.getPrePaginationRowModel().rows.length} rows selected
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
      </Container>
    </AppShellLayout>
  );
};

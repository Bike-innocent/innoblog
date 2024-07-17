import React, { useEffect } from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
} from "@nextui-org/react";
import { PlusIcon } from "./PlusIcon";
import { VerticalDotsIcon } from "./VerticalDotsIcons";
import { SearchIcon } from "./SearchIcon";
import { ChevronDownIcon } from "./ChevronDownIcon";
import axiosInstance from '../../axiosInstance'; // Make sure to import your axios instance
import { capitalize } from "./utils";

// Define status color map and initial columns
const statusColorMap = {
  published: "success",
  unpublished: "warning",
};

const INITIAL_VISIBLE_COLUMNS = ["title", "image", "category", "subcategory", "status", "date", "actions"];

// Define columns
const columns = [
  // { name: "ID", uid: "id", sortable: true },
  { name: "TITLE", uid: "title", sortable: true },
  { name: "IMAGE", uid: "image" },
  { name: "CATEGORY", uid: "category", sortable: true },
  { name: "SUBCATEGORY", uid: "subcategory", sortable: true },
  { name: "STATUS", uid: "status", sortable: true },
  { name: "DATE", uid: "date", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

// Define status options
const statusOptions = [
  { name: "Published", uid: "published" },
  { name: "Unpublished", uid: "unpublished" },
];

export default function Mypost() {
  const [posts, setPosts] = React.useState([]);
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState(new Set(INITIAL_VISIBLE_COLUMNS));
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "date",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);

  // Fetch posts data
  useEffect(() => {
    axiosInstance.get('/posts')
      .then(response => {
        console.log('API Response:', response.data); // Debugging log
        setPosts(response.data.posts || []); // Extract posts from the response object
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
        setPosts([]); // Ensure posts is always an array even if the request fails
      });
  }, []);

  const pages = Math.ceil(posts.length / rowsPerPage);
  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;
    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredPosts = [...posts];

    if (hasSearchFilter) {
      filteredPosts = filteredPosts.filter((post) =>
        post.title.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }
    if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
      filteredPosts = filteredPosts.filter((post) =>
        Array.from(statusFilter).includes(post.status),
      );
    }

    return filteredPosts;
  }, [posts, filterValue, statusFilter]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;
      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((post, columnKey) => {
    const cellValue = post[columnKey];

    switch (columnKey) {
      case "title":
        return <span>{cellValue}</span>;
      case "image":
        return <img src={cellValue} alt={post.title} width="50" />;
      case "category":
        return <span>{post.category.name}</span>;
      case "subcategory":
        return <span>{post.sub_category ? post.sub_category.name : 'N/A'}</span>;
      case "status":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[post.status]}
            size="sm"
            variant="dot"
          >
            {cellValue}
          </Chip>
        );
      case "date":
        return <span>{new Date(post.created_at).toLocaleDateString()}</span>;
      case "actions":
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly radius="full" size="sm" variant="light">
                  <VerticalDotsIcon />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem>View</DropdownItem>
                <DropdownItem>Edit</DropdownItem>
                <DropdownItem>Delete</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onRowsPerPageChange = React.useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            placeholder="Search by title..."
            size="sm"
            startContent={<SearchIcon />}
            value={filterValue}
            variant="bordered"
            onClear={() => setFilterValue("")}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger>
                <Button endContent={<ChevronDownIcon />} size="sm" variant="flat">
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger>
                <Button endContent={<ChevronDownIcon />} size="sm" variant="flat">
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button className="bg-foreground text-background" endContent={<PlusIcon />} size="sm">
              Add New
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">Total {posts.length} posts</span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-default-100 ml-2 cursor-pointer rounded-lg border border-default-200 py-1 px-2 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [posts.length, filterValue, onSearchChange, onRowsPerPageChange, statusFilter, visibleColumns]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2">
        <Pagination
          isCompact
          page={page}
          onChange={setPage}
          total={pages}
          showControls
          showShadow
        />
      </div>
    );
  }, [page, pages]);

  return (
    <div className="w-full border-none shadow-none">
      <Table
        aria-label="Posts table with sorting"
        bottomContent={bottomContent}
        className=""
        headerLined
        lined
        shadow="none"
        sortDescriptor={sortDescriptor}
        sticked
        topContent={topContent}
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={sortedItems}>
          {(post) => (
            <TableRow key={post.id}>
              {(columnKey) => <TableCell>{renderCell(post, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

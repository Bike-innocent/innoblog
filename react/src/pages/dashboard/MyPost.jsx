// import React, { useEffect } from 'react';
// import {
//   Table,
//   TableHeader,
//   TableColumn,
//   TableBody,
//   TableRow,
//   TableCell,
//   Input,
//   Button,
//   DropdownTrigger,
//   Dropdown,
//   DropdownMenu,
//   DropdownItem,
//   Chip,
//   Pagination,
// } from "@nextui-org/react";
// import { PlusIcon } from "./PlusIcon";
// import { VerticalDotsIcon } from "./VerticalDotsIcons";
// import { SearchIcon } from "./SearchIcon";
// import { ChevronDownIcon } from "./ChevronDownIcon";
// import axiosInstance from '../../axiosInstance'; // Make sure to import your axios instance
// import { capitalize } from "./utils";
// import { Link } from 'react-router-dom';
// import PostActions from './PostActions';

// // Define status color map and initial columns
// const statusColorMap = {
//   1: "success",  // Published
//   0: "warning"   // Unpublished
// };

// const INITIAL_VISIBLE_COLUMNS = ["title", "image", "category", "subcategory", "status", "date", "actions"];

// // Define columns
// const columns = [
//   { name: "TITLE", uid: "title", sortable: true },
//   { name: "IMAGE", uid: "image" },
//   { name: "CATEGORY", uid: "category", sortable: true },
//   { name: "SUBCATEGORY", uid: "subcategory", sortable: true },
//   { name: "STATUS", uid: "status", sortable: true },
//   { name: "DATE", uid: "date", sortable: true },
//   { name: "ACTIONS", uid: "actions" },
// ];

// // Define status options
// const statusOptions = [
//   { name: "Published", uid: "1" },
//   { name: "Unpublished", uid: "0" },
// ];

// export default function Mypost() {
//   const [posts, setPosts] = React.useState([]);
//   const [filterValue, setFilterValue] = React.useState("");

//   const [visibleColumns, setVisibleColumns] = React.useState(new Set(INITIAL_VISIBLE_COLUMNS));
//   const [statusFilter, setStatusFilter] = React.useState(new Set(["1", "0"]));
//   const [rowsPerPage, setRowsPerPage] = React.useState(5);
//   const [sortDescriptor, setSortDescriptor] = React.useState({
//     column: "date",
//     direction: "ascending",
//   });
//   const [page, setPage] = React.useState(1);

//   // Fetch posts data
//   useEffect(() => {
//     axiosInstance.get('/posts')
//       .then(response => {
//         console.log('API Response:', response.data); // Debugging log
//         setPosts(response.data.posts || []); // Extract posts from the response object
//       })
//       .catch(error => {
//         console.error('Error fetching posts:', error);
//         setPosts([]); // Ensure posts is always an array even if the request fails
//       });
//   }, []);

//   const refreshPosts = () => {
//     axiosInstance.get('/posts')
//       .then(response => {
//         setPosts(response.data.posts || []);
//       })
//       .catch(error => {
//         console.error('Error refreshing posts:', error);
//       });
//   };

//   const pages = Math.ceil(posts.length / rowsPerPage);
//   const hasSearchFilter = Boolean(filterValue);

//   const headerColumns = React.useMemo(() => {
//     if (visibleColumns === "all") return columns;
//     return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
//   }, [visibleColumns]);

//   const filteredItems = React.useMemo(() => {
//     let filteredPosts = [...posts];

//     if (hasSearchFilter) {
//       filteredPosts = filteredPosts.filter((post) =>
//         post.title.toLowerCase().includes(filterValue.toLowerCase()),
//       );
//     }

//     // Apply status filter
//     if (statusFilter.size > 0) {
//       filteredPosts = filteredPosts.filter((post) =>
//         Array.from(statusFilter).some(status => String(post.status) === status)
//       );
//     }

//     return filteredPosts;
//   }, [posts, filterValue, statusFilter]);

//   const items = React.useMemo(() => {
//     const start = (page - 1) * rowsPerPage;
//     const end = start + rowsPerPage;
//     return filteredItems.slice(start, end);
//   }, [page, filteredItems, rowsPerPage]);

//   const sortedItems = React.useMemo(() => {
//     return [...items].sort((a, b) => {
//       const first = a[sortDescriptor.column];
//       const second = b[sortDescriptor.column];
//       const cmp = first < second ? -1 : first > second ? 1 : 0;
//       return sortDescriptor.direction === "descending" ? -cmp : cmp;
//     });
//   }, [sortDescriptor, items]);

//   const handleSortChange = (column) => {
//     const isCurrentColumn = sortDescriptor.column === column;
//     const direction = isCurrentColumn && sortDescriptor.direction === "ascending" ? "descending" : "ascending";
//     setSortDescriptor({ column, direction });
//   };

//   const renderCell = React.useCallback((post, columnKey) => {
//     const cellValue = post[columnKey];

//     switch (columnKey) {
//       case "title":
//         return <span>{cellValue}</span>;
//       case "image":
//         return <img src={cellValue} alt={post.title} width="50" />;
//       case "category":
//         return <span>{post.category.name}</span>;
//       case "subcategory":
//         return <span>{post.sub_category ? post.sub_category.name : 'N/A'}</span>;
//       case "status":
//         const statusText = post.status === 1 ? "Published" : "Unpublished";
//         return (
//           <Chip
//             className="capitalize"
//             color={statusColorMap[post.status]}
//             size="sm"
//             variant="dot"
//             border={statusColorMap[post.status]}
//           >
//             {statusText}
//           </Chip>
//         );
//       case "date":
//         return <span>{new Date(post.created_at).toLocaleDateString()}</span>;
//       case "actions":
//         return <PostActions postId={post.id} isPublished={post.status === 1} refreshPosts={refreshPosts} />;
//       default:
//         return cellValue;
//     }
//   }, [refreshPosts]);

//   const onRowsPerPageChange = React.useCallback((e) => {
//     setRowsPerPage(Number(e.target.value));
//     setPage(1);
//   }, []);

//   const onSearchChange = React.useCallback((value) => {
//     setFilterValue(value);
//     setPage(1);
//   }, []);

//   const onStatusFilterChange = React.useCallback((selectedKeys) => {
//     setStatusFilter(new Set(selectedKeys));
//     setPage(1);
//   }, []);

//   return (
//     <div className="flex w-full flex-col gap-8">
//       <div className="flex flex-col items-start justify-between gap-3 md:flex-row md:items-center">
//         <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center">
//           <Input
//             isClearable
//             className="w-full sm:max-w-[20%]"
//             placeholder="Search by title..."
//             size="md"
//             startContent={<SearchIcon />}
//             value={filterValue}
//             onClear={() => setFilterValue("")}
//             onChange={(e) => onSearchChange(e.target.value)}
//           />
//           <Dropdown
//             className="w-full sm:max-w-[15%]"
//             closeOnSelect={false}
//             selectionMode="multiple"
//             selectedKeys={statusFilter}
//             onSelectionChange={onStatusFilterChange}
//           >
//             <DropdownTrigger>
//               <Button
//                 endContent={<ChevronDownIcon />}
//                 variant="flat"
//               >
//                 Status
//               </Button>
//             </DropdownTrigger>
//             <DropdownMenu
//               aria-label="Select Status"
//               disallowEmptySelection
//               selectionMode="multiple"
//               selectedKeys={statusFilter}
//             >
//               {statusOptions.map((status) => (
//                 <DropdownItem key={status.uid}>{status.name}</DropdownItem>
//               ))}
//             </DropdownMenu>
//           </Dropdown>
//         </div>
//         <Button
//           className="max-w-full sm:max-w-[10%]"
//           startContent={<PlusIcon />}
//         >
//           <Link to='/create-post' className="block">Create Post</Link>
//         </Button>
//       </div>
//       <Table
//         aria-label="Post Table"
//         bordered={true}
//         isHeaderSticky
//         bottomContent={
//           <div className="flex w-full items-center justify-between border-t border-divider p-2">
//             <div className="flex items-center">
//               <small>Rows per page:</small>
//               <select
//                 className="bg-default-100 ml-2 rounded-lg p-1"
//                 onChange={onRowsPerPageChange}
//                 value={rowsPerPage}
//               >
//                 {[5, 10, 15, 20].map((rows) => (
//                   <option key={rows} value={rows}>
//                     {rows}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <Pagination
//               showControls
//               isCompact
//               page={page}
//               total={pages}
//               onChange={(newPage) => setPage(newPage)}
//             />
//           </div>
//         }
//         headerLined
//         sortDescriptor={sortDescriptor}
//         onSortChange={handleSortChange}
//       >
//         <TableHeader columns={headerColumns}>
//           {(column) => (
//             <TableColumn
//               key={column.uid}
//               allowsSorting={column.sortable}
//               width={column.uid === "actions" ? 150 : "auto"}
//             >
//               {column.name}
//             </TableColumn>
//           )}
//         </TableHeader>
//         <TableBody items={sortedItems}>
//           {(item) => (
//             <TableRow key={item.id}>
//               {(columnKey) => (
//                 <TableCell>
//                   {renderCell(item, columnKey)}
//                 </TableCell>
//               )}
//             </TableRow>
//           )}
//         </TableBody>
//       </Table>
//     </div>
//   );
// }


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
    Pagination,
} from "@nextui-org/react";
import { PlusIcon } from "./PlusIcon";
import { VerticalDotsIcon } from "./VerticalDotsIcons";
import { SearchIcon } from "./SearchIcon";
import { ChevronDownIcon } from "./ChevronDownIcon";
import axiosInstance from '../../axiosInstance'; // Make sure to import your axios instance
import { capitalize } from "./utils";
import { Link } from 'react-router-dom';
import PostActions from './PostActions';

// Define status color map and initial columns
const statusColorMap = {
    1: "success",  // Published
    0: "warning"   // Unpublished
};

const INITIAL_VISIBLE_COLUMNS = ["title", "image", "category", "subcategory", "status", "date", "actions"];

// Define columns
const columns = [
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
    { name: "Published", uid: "1" },
    { name: "Unpublished", uid: "0" },
];

export default function Mypost() {
    const [posts, setPosts] = React.useState([]);
    const [filterValue, setFilterValue] = React.useState("");

    const [visibleColumns, setVisibleColumns] = React.useState(new Set(INITIAL_VISIBLE_COLUMNS));
    const [statusFilter, setStatusFilter] = React.useState(new Set(["1", "0"]));
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

    const refreshPosts = () => {
        axiosInstance.get('/posts')
            .then(response => {
                setPosts(response.data.posts || []);
            })
            .catch(error => {
                console.error('Error refreshing posts:', error);
            });
    };


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

        // Apply status filter
        if (statusFilter.size > 0) {
            filteredPosts = filteredPosts.filter((post) =>
                Array.from(statusFilter).some(status => String(post.status) === status)
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

    const handleSortChange = (column) => {
        const isCurrentColumn = sortDescriptor.column === column;
        const direction = isCurrentColumn && sortDescriptor.direction === "ascending" ? "descending" : "ascending";
        setSortDescriptor({ column, direction });
    };

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
                const statusText = post.status === 1 ? "Published" : "Unpublished";
                return (
                    <Chip
                        className="capitalize"
                        color={statusColorMap[post.status]}
                        size="sm"
                        variant="dot"
                        border={statusColorMap[post.status]}
                    >
                        {statusText}
                    </Chip>
                );
            case "date":
                return <span>{new Date(post.created_at).toLocaleDateString()}</span>;
            case "actions":
                return <PostActions postId={post.id} isPublished={post.status === 1} refreshPosts={refreshPosts} />;
            default:
                return cellValue;
        }
    },  [refreshPosts]);

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
                                onSelectionChange={(keys) => {
                                    if (keys.size === 0) {
                                        setStatusFilter(new Set(["1", "0"]));
                                    } else {
                                        setStatusFilter(keys);
                                    }
                                }}
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
                            <option value={20}>20</option>
                        </select>
                    </label>
                </div>
            </div>
        );
    }, [posts.length, filterValue, onSearchChange, statusFilter, visibleColumns, onRowsPerPageChange]);

    return (
        <div className="w-full">
            <Table
                aria-label="Post table"
                className="bg-default-100"
                sortDescriptor={sortDescriptor}
                topContent={topContent}
                onSortChange={handleSortChange}
            >
                <TableHeader columns={headerColumns}>
                    {(column) => (
                        <TableColumn
                            key={column.uid}
                            allowsSorting={column.sortable}
                            onClick={() => column.sortable && handleSortChange(column.uid)}
                        >
                            {column.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody items={sortedItems}>
                    {(item) => (
                        <TableRow key={item.id}>
                            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <div className="flex justify-between mt-4">
                <Pagination
                    total={pages}
                    initialPage={1}
                    onChange={(page) => setPage(page)}
                    rowsPerPage={rowsPerPage}
                />
            </div>
        </div>
    );
}


import { useAppSelector } from "../../redux";
import Header from "@/src/components/Header";
import { dataGridClassNames, dataGridSxStyles } from "@/src/lib/utils";
import { useGetTasksQuery } from "@/src/state/api";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React from "react";

type Props = {
  id: string;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

const columns: GridColDef[] = [
  { field: "title", headerName: "Title", width: 100 },
  { field: "description", headerName: "Description", width: 200 },
  {
    field: "status",
    headerName: "Status",
    width: 130,
    renderCell: (params) => (
      <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
        {params.value}
      </span>
    ),
  },
  { field: "priority", headerName: "Priority", width: 75 },
  { field: "tags", headerName: "Tags", width: 130 },
  { field: "startDate", headerName: "Start Date", width: 130 },
  { field: "dueDate", headerName: "Due Date", width: 130 },
  {
    field: "author",
    headerName: "Author",
    width: 150,
    renderCell: (params) => params.value?.username || "Unknown",
  },
  {
    field: "assignee",
    headerName: "Assignee",
    width: 150,
    renderCell: (params) => params.value?.username || "Unassigned",
  },
];

const TableView = ({ id, setIsModalNewTaskOpen }: Props) => {
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  const {
    data: tasks,
    error,
    isLoading,
  } = useGetTasksQuery({ projectId: Number(id) });

  if (isLoading) return <div>Loading...</div>;
  if (error || !tasks) return <div>An error occurred while fetching tasks</div>;

  return (
    <div className="flex h-screen w-full flex-col px-4 pb-8 xl:px-6">
      <div className="pt-5">
        <Header
          name="Table"
          buttonComponent={
            <button
              className="flex items-center rounded bg-blue-primary px-3 py-2 text-white hover:bg-blue-600"
              onClick={() => setIsModalNewTaskOpen(true)}
            >
              Add Task
            </button>
          }
          isSmallText
        />
      </div>
      <div className="flex flex-grow flex-col overflow-hidden">
        <DataGrid
          rows={tasks || []}
          columns={columns}
          className={dataGridClassNames}
          sx={{
            ...dataGridSxStyles(isDarkMode),
            display: "flex",
            flexDirection: "column-reverse", // Positions pagination above rows
            "& .MuiDataGrid-virtualScroller": {
              overflowY: "auto",
              maxHeight: "calc(100vh - 250px)", // Adjust based on screen height
            },
            "& .MuiDataGrid-footerContainer": {
              position: "sticky",
              top: 0,
              backgroundColor: isDarkMode ? "#1d1f21" : "white",
              zIndex: 1,
            },
          }}
          pagination
        />
      </div>
    </div>
  );
};

export default TableView;

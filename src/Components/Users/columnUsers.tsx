import { UserData } from "@/types/users";
import { Button, Stack } from "@mui/material";
import { MRT_PaginationState, type MRT_ColumnDef } from "material-react-table";
import Link from "next/link";

export const columnsUsers = (
  deleteSingleUser: (id: number) => void,
  pagination: MRT_PaginationState
): MRT_ColumnDef<UserData>[] => [
  {
    header: "No.",
    Cell: ({ row }) =>
      row.index + 1 + pagination.pageIndex * pagination.pageSize,
  },
  {
    accessorKey: "first_name", //access nested data with dot notation
    header: "First Name",
    size: 150,
  },
  {
    accessorKey: "last_name",
    header: "Last Name",
    size: 150,
  },
  {
    header: "Action",
    enableColumnFilter: false,
    Cell: ({ cell }) => {
      return (
        <Stack direction="row" gap={2}>
          <Button
            variant="contained"
            color="primary"
            size="small"
            sx={{ textTransform: "none" }}
            component={Link}
            href={`/users/view/${cell.row.original.id}`}
          >
            View
          </Button>
          <Button
            variant="contained"
            color="error"
            size="small"
            sx={{ textTransform: "none" }}
            onClick={() => deleteSingleUser(cell.row.original.id)}
          >
            Delete
          </Button>
        </Stack>
      );
    },
  },
];

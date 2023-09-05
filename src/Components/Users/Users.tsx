"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { deleteSingleUser, getListUsers } from "@/api/fetch";
import {
  ApiResponseDataUsers,
  ApiResponseDelete,
  DataUsersType,
} from "@/types/users";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { MaterialReactTable, MRT_PaginationState } from "material-react-table";
import { columnsUsers } from "./columnUsers";
import { Box, Typography } from "@mui/material";
import { MUTATION_KEY } from "@/api/helpers/api.helpers";
import { toast } from "react-toastify";

const Users = () => {
  const [dataUsers, setDataUsers] = useState<DataUsersType>();
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const getListUsersMutation: UseMutationOptions<ApiResponseDataUsers> = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationFn: (params: any) => getListUsers(params),
    mutationKey: [MUTATION_KEY.GET_LIST_USERS],
    onSuccess: (data) => setDataUsers(data.data),
  };

  const mutationGetListUsers =
    useMutation<ApiResponseDataUsers>(getListUsersMutation);

  const deleteSingleUserMutation: UseMutationOptions<ApiResponseDelete> = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationFn: (params: any) => deleteSingleUser(params),
    mutationKey: [MUTATION_KEY.DELETE_USER],
    onSuccess: () => onSuccessDeleteSingleUser(),
    onError: (err) => alert(err),
  };

  const mutationDeleteSingleUser = useMutation<ApiResponseDelete>(
    deleteSingleUserMutation
  );

  const onSuccessDeleteSingleUser = useCallback(() => {
    toast.success("User has been delete!");
    const payload = {
      page: pagination.pageIndex + 1,
      per_page: pagination.pageSize,
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationGetListUsers.mutate(payload as any);
  }, [mutationGetListUsers, pagination.pageIndex, pagination.pageSize]);

  const handleDeleteSingleUser = useCallback(
    (id: number) => {
      const payload = { id };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      mutationDeleteSingleUser.mutate(payload as any);
    },
    [mutationDeleteSingleUser]
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChangPagination = useCallback((value: any) => {
    setPagination(value);
  }, []);

  useEffect(() => {
    const payload = {
      page: pagination.pageIndex + 1,
      per_page: pagination.pageSize,
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationGetListUsers.mutate(payload as any);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.pageIndex, pagination.pageSize]);

  const renderUsers = useMemo(() => {
    return (
      <Box mt={3}>
        <MaterialReactTable
          columns={columnsUsers(handleDeleteSingleUser, pagination)}
          data={dataUsers?.data || []}
          rowCount={dataUsers?.total || 0}
          initialState={{
            showColumnFilters: false,
            density: "compact",
            pagination,
          }}
          enableSorting={false}
          enableFullScreenToggle={false}
          enableDensityToggle={false}
          enableHiding={false}
          enableColumnFilters={false}
          enableRowNumbers={false}
          enableColumnActions={false}
          manualPagination
          onPaginationChange={handleChangPagination}
          renderTopToolbarCustomActions={() => (
            <Typography sx={{ fontWeight: "700", fontSize: "20px" }}>
              USERS
            </Typography>
          )}
          muiTableBodyRowProps={() => ({
            sx: {
              backgroundColor: "#FFFFFF",
            },
          })}
          muiTableHeadRowProps={() => ({
            sx: {
              backgroundColor: "#F5F5F7",
            },
          })}
          state={{
            pagination,
            isLoading: mutationGetListUsers.isLoading,
          }}
        />
      </Box>
    );
  }, [
    dataUsers?.data,
    dataUsers?.total,
    handleChangPagination,
    handleDeleteSingleUser,
    mutationGetListUsers.isLoading,
    pagination,
  ]);

  return renderUsers;
};

export default Users;

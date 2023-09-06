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
import { Box, Button, Stack, Typography } from "@mui/material";
import { MUTATION_KEY } from "@/api/helpers/api.helpers";
import { toast } from "react-toastify";
import BasicModal from "../Modal/BasicModal";

const Users = () => {
  const [dataUsers, setDataUsers] = useState<DataUsersType>();
  const [showModal, setshowModal] = useState<boolean>(false);
  const [userId, setUserId] = useState<number>();

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

  const handleClose = useCallback(() => {
    setshowModal(false);
  }, []);

  const handleOpen = useCallback((id: number) => {
    setUserId(id);
    setshowModal(true);
  }, []);

  const handleDeleteSingleUser = useCallback(() => {
    const payload = { userId };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationDeleteSingleUser.mutate(payload as any);
    handleClose();
  }, [handleClose, mutationDeleteSingleUser, userId]);

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
      <>
        <Box mt={3}>
          <MaterialReactTable
            columns={columnsUsers({
              deleteSingleUser: handleOpen,
              isLoading: mutationDeleteSingleUser.isLoading,
              pagination,
            })}
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
            enableStickyHeader
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
                maxHeight: "100px",
              },
            })}
            muiTableContainerProps={{ sx: { maxHeight: "500px" } }}
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
        <BasicModal open={showModal} handleClose={handleClose}>
          <Stack gap={2}>
            <Typography sx={{ fontWeight: "500", fontSize: "20px" }}>
              Are you sure delete this data?
            </Typography>
            <Stack direction="row" gap={2} justifyContent="flex-end">
              <Button
                onClick={handleClose}
                size="small"
                color="warning"
                variant="outlined"
              >
                Cancel
              </Button>
              <Button
                onClick={handleDeleteSingleUser}
                size="small"
                color="info"
                variant="outlined"
              >
                Delete
              </Button>
            </Stack>
          </Stack>
        </BasicModal>
      </>
    );
  }, [
    dataUsers?.data,
    dataUsers?.total,
    handleChangPagination,
    handleClose,
    handleDeleteSingleUser,
    handleOpen,
    mutationDeleteSingleUser.isLoading,
    mutationGetListUsers.isLoading,
    pagination,
    showModal,
  ]);

  return renderUsers;
};

export default Users;

"use client";

import { getSingleUser } from "@/api/fetch";
import { MUTATION_KEY } from "@/api/helpers/api.helpers";
import { ApiResponseSingleUser, ResponseSingleUser } from "@/types/users";
import { Box, Button, Card, Stack, Typography } from "@mui/material";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useCallback, useEffect, useMemo, useState } from "react";

const ViewUser = () => {
  const params = useParams();
  const [dataUser, setDataUser] = useState<ResponseSingleUser>();

  const getSingleUserMutation: UseMutationOptions<ApiResponseSingleUser> = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationFn: (params: any) => getSingleUser(params),
    mutationKey: [MUTATION_KEY.GET_SINGLE_USER],
    onSuccess: (data) => setDataUser(data.data),
  };

  const mutationGetSingleUser = useMutation<ApiResponseSingleUser>(
    getSingleUserMutation
  );

  useEffect(() => {
    const payload = {
      id: params.id,
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationGetSingleUser.mutate(payload as any);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  const renderCardContent = useCallback((dataUser: ResponseSingleUser) => {
    return (
      <>
        <Image
          src={dataUser?.data.avatar}
          width={100}
          height={100}
          alt={dataUser?.data.email}
          style={{
            borderRadius: "10px",
          }}
        />
        <Box>
          <Typography sx={{ fontWeight: "700", fontSize: "20px" }}>
            {dataUser?.data.first_name} {dataUser?.data.last_name}
          </Typography>
          <Typography>{dataUser?.data.email}</Typography>
        </Box>
        <Typography component="q" sx={{ fontStyle: "italic" }}>
          {dataUser?.support.text}
        </Typography>
        <Button component={Link} href="/users">
          Back to list users
        </Button>
      </>
    );
  }, []);

  const renderViewUser = useMemo(() => {
    return (
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{ width: "100%", height: "100vh" }}
      >
        <Card
          sx={{
            p: 4,
            minWidth: { md: "60%", lg: "80%" },
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {dataUser && renderCardContent(dataUser)}
        </Card>
      </Stack>
    );
  }, [dataUser, renderCardContent]);

  return renderViewUser;
};

export default ViewUser;

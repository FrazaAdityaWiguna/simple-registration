"use client";

import { postRegisterUser } from "@/api/fetch";
import { MUTATION_KEY } from "@/api/helpers/api.helpers";
import { ApiResponseRegister, PayloadRegisterUsers } from "@/types/users";
import { Button, Card, Stack, TextField, Typography } from "@mui/material";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import InputPassword from "../TextInput/InputPassword";

const Register = () => {
  const router = useRouter();

  const {
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<PayloadRegisterUsers>();

  const postRegisterUserMutation: UseMutationOptions<ApiResponseRegister> = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationFn: (params: any) => postRegisterUser(params),
    mutationKey: [MUTATION_KEY.REGISTER_USER],
    onSuccess: () => handleSuccessRegister(),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (err: any) => toast.error(err.response.data.error),
  };

  const mutationRegisterUser = useMutation<ApiResponseRegister>(
    postRegisterUserMutation
  );

  const handleSuccessRegister = useCallback(() => {
    toast.success("Register Success!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    router.push("/users");
  }, [router]);

  const onSubmit = useCallback(
    (value: PayloadRegisterUsers) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      mutationRegisterUser.mutate(value as any);
    },
    [mutationRegisterUser]
  );

  const renderRegister = useMemo(() => {
    return (
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{ width: "100%", height: "100vh" }}
      >
        <Card
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            p: 4,
            minWidth: { xs: "80%", md: "30%" },
          }}
        >
          <Typography
            align="center"
            sx={{ fontWeight: "700", fontSize: "26px", letterSpacing: 1 }}
          >
            Register User
          </Typography>

          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                required
                label="E-mail"
                variant="outlined"
                error={Boolean(errors.email)}
                type="email"
                InputLabelProps={{
                  shrink: Boolean(watch("email")),
                }}
                helperText={errors.email && errors.email.message}
              />
            )}
          />

          <InputPassword
            control={control}
            name="password"
            errors={errors.password}
          />

          <Button
            variant="contained"
            type="submit"
            disabled={mutationRegisterUser.isLoading}
          >
            Submit
          </Button>
        </Card>
      </Stack>
    );
  }, [
    control,
    errors.email,
    errors.password,
    handleSubmit,
    mutationRegisterUser.isLoading,
    onSubmit,
    watch,
  ]);

  return renderRegister;
};

export default Register;

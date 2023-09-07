"use client";

import { loginUser } from "@/api/fetch";
import { MUTATION_KEY } from "@/api/helpers/api.helpers";
import storageKey from "@/constant/storage";
import storagePlugin from "@/plugin/storage.plugin";
import { ApiResponseLoginType, PayloadLoginType } from "@/types/auth";
import { Button, Card, Stack, TextField, Typography } from "@mui/material";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import InputPassword from "../TextInput/InputPassword";

const Login = () => {
  const router = useRouter();

  const {
    watch,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PayloadLoginType>();

  const loginUserMutation: UseMutationOptions<ApiResponseLoginType> = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationFn: (params: any) => loginUser(params),
    mutationKey: [MUTATION_KEY.LOGIN_USER],
    onSuccess: (response) => handleSuccess(response),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (err: any) => toast.error(err.response.data.error),
  };

  const mutationLogin = useMutation<ApiResponseLoginType>(loginUserMutation);

  const onSubmit = useCallback(
    (e: PayloadLoginType) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      mutationLogin.mutate(e as any);
    },
    [mutationLogin]
  );

  const handleSuccess = useCallback(
    (data: ApiResponseLoginType) => {
      storagePlugin.saveStr(storageKey.storageKey, data.data.token);
      router.push("/");
    },
    [router]
  );

  const renderLogin = useMemo(() => {
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
            LOGIN
          </Typography>

          <Typography align="center">
            For the login process, you can verify the account on the Fake API at{" "}
            <Link href="https://reqres.in/" target="_blank">
              reqres.in{" "}
            </Link>
            .
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
            disabled={mutationLogin.isLoading}
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
    mutationLogin.isLoading,
    onSubmit,
    watch,
  ]);

  return renderLogin;
};

export default Login;

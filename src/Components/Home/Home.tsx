"use client";

import { Button, Stack, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";
import Lottie from "lottie-react";
import lottieWelcome from "@/assets/lottie/welcome.json";

const Home = () => {
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{ width: "100%", height: "100vh" }}
    >
      <Lottie
        animationData={lottieWelcome}
        autoplay={true}
        loop={true}
        style={{
          height: 400,
          width: 400,
        }}
      />
      <Typography align="center" sx={{ maxWidth: "500px" }}>
        This project is a simple user registration and management system,
        allowing users to register, view, and delete user data. It utilizes the{" "}
        <Link href="https://reqres.in/" target="_blank">
          reqres.in
        </Link>{" "}
        API as a mock API for testing and development purposes.
      </Typography>
      <Button component={Link} href="/users" sx={{ mt: 2 }}>
        Go to list users
      </Button>
    </Stack>
  );
};

export default Home;

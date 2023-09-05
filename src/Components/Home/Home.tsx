"use client";

import { Button, Stack } from "@mui/material";
import Link from "next/link";
import React from "react";

const Home = () => {
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{ width: "100%", height: "100vh" }}
    >
      <Button component={Link} href="/users">
        Test User
      </Button>
    </Stack>
  );
};

export default Home;

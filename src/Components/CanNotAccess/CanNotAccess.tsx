// "use client";

import React from "react";
import { Button, Stack, Typography } from "@mui/material";
import lottieNotAuth from "@/assets/lottie/not-auth.json";
import Lottie from "lottie-react";
import Link from "next/link";

const CanNotAccess = () => {
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{ width: "100%", height: "100vh" }}
      gap={2}
    >
      <Lottie
        animationData={lottieNotAuth}
        autoplay={true}
        loop={true}
        style={{
          height: 400,
          width: 400,
        }}
      />
      <Typography sx={{ fontWeight: "600", fontSize: "20px" }}>
        Upss... You can not access this page
      </Typography>
      <Button component={Link} href="/">
        Home
      </Button>
    </Stack>
  );
};

export default CanNotAccess;

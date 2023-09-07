"use client";

import CanNotAccess from "@/Components/CanNotAccess/CanNotAccess";
import NavBar from "@/Components/NavBar/NavBar";
import { Container } from "@mui/material";
import React from "react";

interface Layout1Props {
  children: React.ReactNode;
  isLogin: boolean;
}

const Layout1 = (props: Layout1Props) => {
  const { children, isLogin } = props;

  if (isLogin) {
    return (
      <>
        <NavBar />
        <Container maxWidth="xl">{children}</Container>
      </>
    );
  }

  return <CanNotAccess />;
};

export default Layout1;

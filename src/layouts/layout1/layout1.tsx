import NavBar from "@/Components/NavBar/NavBar";
import { Container } from "@mui/material";
import React from "react";

interface Layout1Props {
  children: React.ReactNode;
}

const Layout1 = (props: Layout1Props) => {
  const { children } = props;
  return (
    <>
      <NavBar />
      <Container maxWidth="xl">{children}</Container>
    </>
  );
};

export default Layout1;

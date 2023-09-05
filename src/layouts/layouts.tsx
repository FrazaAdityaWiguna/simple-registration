"use client";

import React from "react";
import { ThemeProvider as ThemeProviderMui } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import themeMui from "@/styles/themeMui.style";
import Layout1 from "./layout1/layout1";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface LayoutProps {
  children: React.ReactNode;
}

const Layouts = (props: LayoutProps) => {
  const { children } = props;
  const queryClient = new QueryClient();

  return (
    <ThemeProviderMui theme={themeMui}>
      <QueryClientProvider client={queryClient}>
        <Layout1>{children}</Layout1>
        <ToastContainer />
      </QueryClientProvider>
    </ThemeProviderMui>
  );
};

export default Layouts;

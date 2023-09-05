import React from "react";
import { ThemeProvider as ThemeProviderMui } from "@mui/material";
import themeMui from "@/styles/themeMui.style";
import Layout1 from "./layout1/layout1";

interface LayoutProps {
  children: React.ReactNode;
}

const Layouts = (props: LayoutProps) => {
  const { children } = props;

  return (
    <ThemeProviderMui theme={themeMui}>
      <Layout1>{children}</Layout1>
    </ThemeProviderMui>
  );
};

export default Layouts;

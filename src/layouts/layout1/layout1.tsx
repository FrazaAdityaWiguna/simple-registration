import React from "react";

interface Layout1Props {
  children: React.ReactNode;
}

const Layout1 = (props: Layout1Props) => {
  const { children } = props;
  return <div>{children}</div>;
};

export default Layout1;

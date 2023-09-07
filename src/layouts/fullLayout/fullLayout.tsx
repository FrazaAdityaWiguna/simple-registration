import React from "react";

interface FullLayoutType {
  children: React.ReactNode;
}

const FullLayout = (props: FullLayoutType) => {
  const { children } = props;
  return <>{children}</>;
};

export default FullLayout;

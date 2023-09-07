import ViewUser from "@/Components/Users/ViewUser";
import dynamic from "next/dynamic";
import React from "react";

const DetailUserPage = () => {
  return <ViewUser />;
};

export default dynamic(() => Promise.resolve(DetailUserPage), {
  ssr: false,
});

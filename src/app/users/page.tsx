import Users from "@/Components/Users/Users";
import dynamic from "next/dynamic";
import React from "react";

const UsersPage = () => {
  return <Users />;
};

export default dynamic(() => Promise.resolve(UsersPage), {
  ssr: false,
});

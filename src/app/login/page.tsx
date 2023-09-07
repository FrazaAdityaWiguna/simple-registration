import Login from "@/Components/Login/Login";
import dynamic from "next/dynamic";
import React from "react";

const LoginPage = () => {
  return <Login />;
};

export default dynamic(() => Promise.resolve(LoginPage), {
  ssr: false,
});

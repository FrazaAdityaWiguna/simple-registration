import Register from "@/Components/Register/Register";
import dynamic from "next/dynamic";
import React from "react";

const RegisterPage = () => {
  return <Register />;
};

export default dynamic(() => Promise.resolve(RegisterPage), {
  ssr: false,
});

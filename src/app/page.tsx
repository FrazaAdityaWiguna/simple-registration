import Home from "@/Components/Home/Home";
import dynamic from "next/dynamic";

const HomePage = () => {
  return <Home />;
};

export default dynamic(() => Promise.resolve(HomePage), {
  ssr: false,
});

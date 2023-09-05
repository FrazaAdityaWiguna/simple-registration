import dynamic from "next/dynamic";

const Home = () => {
  return <main>Home</main>;
};

export default dynamic(() => Promise.resolve(Home), {
  ssr: false,
});

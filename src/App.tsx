// import { useState } from "react";
import "./App.css";
import Layout from "./components/Layout/index";
import Hero from "./components/Hero";
import Highlights from "./components/Highlights";
import Model from "./components/Model";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Layout>
        <Hero />
        <Highlights />
        <Model/>
      </Layout>
    </>
  );
}

export default App;

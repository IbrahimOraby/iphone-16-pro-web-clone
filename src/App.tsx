// import { useState } from "react";
import "./App.css";
import Layout from "./components/Layout/index";
import Hero from "./components/Hero";
import Highlights from "./components/Highlights";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Layout>
        <Hero />
        <Highlights />
      </Layout>
    </>
  );
}

export default App;

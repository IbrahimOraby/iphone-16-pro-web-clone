// import { useState } from "react";
import "./App.css";
import Layout from "./components/Layout/index";
import Hero from "./components/Hero";
import Highlights from "./components/Highlights";
import Model from "./components/Model";
import Titanium from "./components/Titanium";
import CameraControl from "./components/CameraControl";
import ProVideo from "./components/ProVideo";
import Telephoto from "./components/Telephoto";
import Photographic from "./components/Photographic";
import A18Pro from "./components/A18Pro";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Layout>
        <Hero />
        <Highlights />
        <Model />
        <Titanium />
        <CameraControl />
        <ProVideo />
        <Telephoto />
        <Photographic />
        <A18Pro />
      </Layout>
    </>
  );
}

export default App;

import React from "react";
import HorizontalSlider from "./HorizontalSlider";
import VerticalSlider from "./VerticalSlider";

function Photographic() {
  return (
    <section className="w-full h-full overflow-hidden bg-custom-black">
      <div className=" w-[87.5%] mx-auto text-center flex flex-col items-center my-24 leading-[1.1]">
        <h1 className="text-[80px] font-semibold text-custom-gray-100 opacity-100">
          Choose your
        </h1>
        <h1
          className="text-[80px] font-semibold text-custom-white opacity-100"
          style={{
            textShadow:
              "0px 0px 5px #ffffff, 0px 0px 12px #fab472, 0px 18px 72px #fd7724, 0px 8px 82px #fd9424, 8px 38px 82px #1B1410"
          }}
        >
          Photographic Style.
        </h1>
        <h1 className="text-[80px] font-semibold text-custom-gray-100 opacity-100">
          Change it up.
        </h1>
        <h1 className="text-[80px] font-semibold text-custom-gray-100 opacity-100">
          Change it back.
        </h1>
      </div>
      <HorizontalSlider />

      <div className="w-[61.5rem] mx-auto px-46 h-full my-16 text-center">
        <p className="text-custom-gray-200 text-[21px] font-semibold">
          Our latest generation of Photographic Styles gives you greater
          creative flexibility than ever before, so you can
          <span className="text-custom-white-100 ">
            {" "}
            make every photo even more you
          </span>
          . And thanks to advances in our image pipeline, you can now reverse
          any style, anytime.
        </p>
      </div>
      
      <VerticalSlider />
      <div className="w-full h-[1000px] bg-custom-white"></div>
    </section>
  );
}

export default Photographic;

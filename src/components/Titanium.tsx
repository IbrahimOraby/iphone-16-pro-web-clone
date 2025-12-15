import React, { useRef } from "react";
import { titaniumVideo } from "../utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import ImageCarousel from "./ImageCarousel";
gsap.registerPlugin(ScrollTrigger);

function Titanium() {
  const videoRef = useRef(null);
  useGSAP(() => {
    gsap.to(videoRef.current, {
      opacity: 1,
      delay: 0.5,
      scrollTrigger: {
        trigger: videoRef.current,
        start: "top 50%",
        toggleActions: "play none none none"
        // markers: true
      }
    });
  }, []);

  return (
    <section className="w-full overflow-hidden bg-custom-black py-40 text-custom-white">
      <div className=" w-[87.5%] mx-auto text-center flex flex-col items-center pb-24 leading-[1.1]">
        <h1 className="text-[80px] font-semibold text-custom-gray-100 opacity-100">
          Strength. Beauty.
        </h1>
        <h1
          className="text-[80px] font-semibold text-custom-white opacity-100"
          style={{
            textShadow:
              "0px 0px 5px #ffffff, 0px 0px 12px #fab472, 0px 18px 72px #fd7724, 0px 8px 82px #fd9424, 8px 38px 82px #1B1410"
          }}
        >
          Titanium.
        </h1>
      </div>
      <div className="w-full h-full overflow-clip">
        <video
          ref={videoRef}
          src={titaniumVideo}
          autoPlay
          muted
          className="w-full h-full object-cover opacity-0 scale-108"
        />
      </div>

      <div className="w-full h-full bg-linear-to-b from-custom-black via-custom-brown to-custom-black py-72">
        {/* First row - Two columns */}
        <div className="w-[87.5%] mx-auto px-24 grid grid-cols-2 gap-48 text-[21px] font-semibold mb-20">
          <p className="text-custom-gray-200">
            iPhone 16 Pro features a Grade 5 titanium design with a new, refined
            microblasted finish. Titanium has one of the highest
            strength-to-weight ratios of any metal, making these models{" "}
            <span className="text-custom-white-100">
              incredibly strong and impressively light
            </span>
            . iPhone 16 Pro comes in four stunning colors — including new Desert
            Titanium.
          </p>

          <p className="text-custom-gray-200">
            Internal design improvements — including a 100 percent recycled
            aluminum thermal substructure and back glass optimizations that
            further dissipate heat — enable up to 20 percent{" "}
            <span className="text-custom-white-100">
              better sustained performance
            </span>{" "}
            than iPhone 15 Pro. So you can do all the things you love — like
            high-intensity gaming — for longer.
          </p>
        </div>

        {/* Middle row - Full width carousel */}
        <div className="w-full my-20">
          <ImageCarousel />
        </div>

        {/* Third row - Two columns */}
        <div className="w-[87.5%] mx-auto px-24 grid grid-cols-2 gap-48 text-[21px] font-semibold">
          <p className="text-custom-gray-200">
            New display technology allows us to route display data under active
            pixels with no distortion, resulting in thinner borders for larger
            6.3-inch and 6.9-inch <span className="text-custom-white-100">Super Retina XDR displays</span> that feel great in
            the hand.
          </p>

          <p className="text-custom-gray-200">
            iPhone 16 Pro is splash, water, and dust resistant. It's also
            remarkably durable, <span className="text-custom-white-100">with our latest-generation Ceramic Shield front.</span>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Titanium;

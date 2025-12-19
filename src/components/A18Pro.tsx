import { useRef } from "react";
import { a18ProVideo } from "../utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gamingImg } from "../utils";
gsap.registerPlugin(ScrollTrigger);

function A18Pro() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useGSAP(() => {
    if (!videoRef.current) return;
    gsap.to(videoRef.current, {
      opacity: 1,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: videoRef.current,
        start: "top 80%",
        once: true,
        onEnter: () => {
          videoRef.current?.play();
        },
        markers: true
      }
    });
  }, []);
  return (
    <section className="w-full overflow-hidden bg-custom-black text-custom-white my-24">
      {" "}
      <div className="w-full h-full overflow-hidden">
        <video
          ref={videoRef}
          src={a18ProVideo}
          preload="auto"
          muted
          playsInline={true}
          key={a18ProVideo}
          className="w-full h-full object-cover opacity-0"
        />
      </div>
      <div className=" w-[87.5%] mx-auto text-center flex flex-col items-center my-24 leading-[1.1]">
        <h1
          className="text-[80px] font-semibold text-custom-white opacity-100"
          style={{
            textShadow:
              "0px 0px 5px #ffffff, 0px 0px 12px #fab472, 0px 18px 72px #fd7724, 0px 8px 82px #fd9424, 8px 38px 82px #1B1410"
          }}
        >
          A18 Pro.
        </h1>
        <h1 className="text-[80px] font-semibold text-custom-gray-100 opacity-100">
          A colossally capable{" "}
        </h1>
        <h1 className="text-[80px] font-semibold text-custom-gray-100 opacity-100">
          chip.{" "}
        </h1>
      </div>
      <div className="w-[61.5rem] mx-auto px-24 h-full my-32 text-center ">
        <p className="text-custom-gray-200 text-[21px] font-semibold">
          <span className="text-custom-white-100 ">
            {" "}
            A phenomenally powerful chip{" "}
          </span>
          A phenomenally powerful chip that brings exceptional speed and
          efficiency to iPhone 16 Pro. It also drives advanced video and photo
          features like Camera Control — and delivers outstanding graphics
          performance for AAA gaming.
        </p>
      </div>
      <div className="w-[61.5rem] mx-auto grid grid-cols-2 gap-32 my-16 leading-[1.1]">
        <div className="flex flex-col  border-t border-custom-gray-200 pt-6">
          <p className="text-custom-white-100 text-[28px] font-semibold ">
            New 16-core Neural Engine
          </p>
          <p className="text-custom-gray-200 text-[28px] font-semibold">
            makes on-device intelligence faster and more efficient
          </p>
        </div>
        <div className="flex flex-col  border-t border-custom-gray-200 pt-6">
          <p className="text-custom-white-100 text-[28px] font-semibold">
            New 6-core GPU
          </p>
          <p className="text-custom-gray-200 text-[28px] font-semibold">
            gives you enhanced graphics performance
          </p>
        </div>
        <div className="flex flex-col gap-2 border-t border-custom-gray-200 pt-6">
          <p className="text-custom-white-100 text-[28px] font-semibold">
            New 6-core CPU
          </p>
          <p className="text-custom-gray-200 text-[28px] font-semibold">
            runs complex workloads faster with less power
          </p>
        </div>
        <div className="flex flex-col  border-t border-custom-gray-200 pt-6">
          <p className="text-custom-white-100 text-[28px] font-semibold">
            17% increase in total system memory bandwidth,
          </p>
          <p className="text-custom-gray-200 text-[28px] font-semibold">
            the highest ever in iPhone, for outstanding performance
          </p>
        </div>
      </div>
      {/* Compare With */}
      <div className="w-full h-full px-24">
        <div className="w-full mx-auto py-12 px-24 rounded-3xl h-full my-24 bg-gradient-to-b from-[#151515]  to-[#000000]">
          <div className="flex flex-col items-start justify-center">
            <div className="flex items-center justify-center gap-16 mb-8">
              <p className="text-custom-white-100 text-[24px] font-semibold ">
                Compare With
              </p>
              {/*dropdown*/}
              <p className="text-custom-gray-100 text-[24px] font-semibold border border-custom-white rounded-full px-12 py-1">
               IPhone 12 Pro
              </p>
            </div>

            <div className="flex gap-64 items-start justify-center">
              <div className="flex flex-col items-start justify-center">
                <p className="text-custom-gray-200 text-[16px] font-semibold">
                  Up to
                </p>
                <p className="text-[#f9d6c3] text-[28px] font-semibold">
                  60% faster
                </p>
                <p className="text-custom-gray-200 text-[16px] font-semibold">
                  6‑core CPU
                </p>
              </div>
              <div className="flex flex-col items-start justify-center">
                <p className="text-custom-gray-200 text-[16px] font-semibold">
                  Up to
                </p>
                <p className="text-[#f9d6c3] text-[28px] font-semibold">
                  2x faster
                </p>
                <p className="text-custom-gray-200 text-[16px] font-semibold">
                  6‑core GPU
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Gaming */}
        <div className="w-full h-full text-center relative">
          <p className="text-custom-gray-200 absolute top-2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[12px] font-semibold">
            DEATH STRANDING DIRECTOR’S CUT
          </p>
          <img
            src={gamingImg}
            alt="gaming"
            className="w-full h-full object-cover"
          />
          <div className=" flex flex-col items-center justify-center gap-16 -translate-y-[120px]">
            <div className="flex flex-col items-center justify-center leading-[1.1] text-start">
              {" "}
              <h1 className="text-[64px] font-semibold text-custom-white opacity-78">
                Gaming.
              </h1>
              <h1 className="text-[64px] font-semibold text-custom-white">
                In a whole new light.
              </h1>
            </div>

            <div className="flex flex-row items-start justify-between gap-24 px-64">
              <p className="text-custom-gray-200 text-[21px] font-semibold text-start">
                With up to two times faster hardware-accelerated ray tracing,
                A18 Pro makes games look and feel beautifully lifelike — with
                more fluid graphics and realistic lighting{" "}
              </p>
              <p className="text-custom-gray-200 text-[21px] font-semibold text-start">
                And with Game Mode in iOS 18, you’ll get better sustained frame
                rates for continuous play and improved responsiveness if you’re
                using wireless controllers and AirPods.{" "}
              </p>
            </div>

            <div className="flex flex-col items-center justify-center leading-[1.1] letter-spacing-[0] ">
              <p className="text-custom-white-100 text-[40px] font-semibold">Up to 2x faster hardware-</p>
              <p className="text-custom-white-100 text-[40px] font-semibold">accelerated ray tracing than</p>
              <p className="text-custom-gray-200 text-[40px] font-semibold">A17 Pro</p>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="w-full h-[1000px] bg-custom-white"></div> */}
    </section>
  );
}

export default A18Pro;

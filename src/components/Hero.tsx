import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { heroVideo } from "../utils";

function Hero() {
  useGSAP(() => {
    gsap.to("#hero", {
      opacity: 1,
      duration: 2,
      delay: 0.5
    });

    gsap.to("#cta", {
      opacity: 1,
      duration: 1,
      delay: 0.5
    });

  }, []);
  return (
    <section className="w-full  min-h-svh bg-custom-black relative pb-16">
      <div className="w-full flex-center flex-col bg-custom-black relative">
        <div className="absolute top-2/12 left-1/2 -translate-x-1/2">
          <p
            id="hero"
            className="text-center font-semibold text-[28px] text-custom-white-100 opacity-0 "
          >
            iPhone 16 Pro
          </p>
        </div>
        <div className="w-full h-[790px] overflow-hidden flex items-center justify-center">
          <video
            autoPlay
            muted
            playsInline={true}
            key={heroVideo}
            className="h-full w-full object-cover object-center"
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
        </div>

        <div id ="cta" className="flex flex-col items-center  absolute bottom-2/12 left-1/2 -translate-x-1/2 opacity-0">
          <button className="bg-custom-blue text-custom-white-100 text-lg font-normal py-2 px-4 rounded-full cursor-pointer ">Buy</button>
        </div>
      </div>
    </section>
  );
}

export default Hero;

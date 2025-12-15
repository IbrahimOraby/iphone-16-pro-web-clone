import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import VideoCarousel from "./VideoCarousel";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

function Highlights() {
  useGSAP(() => {
    gsap.to(".highlights-carousel", {
      opacity: 1,
      duration: 1,
      y: 0,
      delay: 0.5,
      scrollTrigger: {
        trigger: ".highlights-carousel",
        start: "top 110%",
        toggleActions: "play none none none"
        // markers: true
      }
    });
  }, []);
  return (
    <section className="w-full overflow-hidden bg-custom-gray-300 py-40 text-custom-white ">
      <div>
        <div className="w-[87.5%] mx-auto">
          <h1
            id="title"
            className="text-custom-white text-[56px] font-semibold opacity-0 translate-y-14 pb-20 leading-[1.1] highlights-carousel"
          >
            Get the highlights.
          </h1>
        </div>
          <VideoCarousel />
      </div>
    </section>
  );
}

export default Highlights;

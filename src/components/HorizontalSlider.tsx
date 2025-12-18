import React, { useRef } from "react";
import { photographic1Img, photographic2Img, photographic3Img } from "../utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

function HorizontalSlider() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const maskRef1 = useRef<HTMLDivElement>(null);
  const maskRef2 = useRef<HTMLDivElement>(null);
  const stickRef1 = useRef<HTMLDivElement>(null);
  const stickRef2 = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (
      !sliderRef.current ||
      !maskRef1.current ||
      !maskRef2.current ||
      !stickRef1.current ||
      !stickRef2.current
    )
      return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sliderRef.current,
        start: "top top",
        end: "+=200%",
        scrub: 1,
        pin: true,
        // snap: 0,
        
        // markers: true
      }
    });

    // gsap.set(sliderRef.current, {
    //   borderRadius: "0"
    // });

    tl.to(maskRef1.current, {
      clipPath: "inset(0 0 0 -5%)",
      ease: "none"
    })
      .to(
        stickRef1.current,
        {
          left: "-5%",
          ease: "none"
        },
        0
      )
      .to(maskRef2.current, {
        clipPath: "inset(0 0 0 -5%)",
        ease: "none"
      })
      .to(
        stickRef2.current,
        {
          left: "-5%",
          ease: "none"
        },
        "<"
      );
  }, []);

  return (
    <div
      ref={sliderRef}
      className="relative w-full h-screen overflow-hidden"
    >
      <img
        src={photographic1Img}
        className="absolute inset-0 w-full h-full object-cover"
        alt=""
      />

      <div
        ref={maskRef1}
        className="absolute inset-0 w-full h-full"
        style={{
          clipPath: "inset(0 0 0 100%)"
        }}
      >
        <img
          src={photographic2Img}
          className="absolute inset-0 w-full h-full object-cover"
          alt=""
        />
      </div>

      <div
        ref={stickRef1}
        className="absolute top-0 h-full bg-custom-black z-20 w-[22px]"
        style={{
          left: "100%"
        }}
      />

      <div
        ref={maskRef2}
        className="absolute inset-0 w-full h-full"
        style={{
          clipPath: "inset(0 0 0 100%)"
        }}
      >
        <img
          src={photographic3Img}
          className="absolute inset-0 w-full h-full object-cover"
          alt=""
        />
      </div>

      <div
        ref={stickRef2}
        className="absolute top-0 h-full bg-custom-black z-30 w-[22px]"
        style={{
          left: "100%"
        }}
      />
    </div>
  );
}

export default HorizontalSlider;

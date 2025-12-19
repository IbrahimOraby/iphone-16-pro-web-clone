import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { styles1Img, styles2Img, styles3Img } from "../utils";

gsap.registerPlugin(ScrollTrigger);

function VerticalSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const panelsContainerRef = useRef<HTMLDivElement>(null);
  const imagesContainerRef = useRef<HTMLDivElement>(null);
  const currentIndexRef = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Initialize first image as visible
  useEffect(() => {
    if (!imagesContainerRef.current) return;

    const images = gsap.utils.toArray(
      imagesContainerRef.current.querySelectorAll("img")
    ) as HTMLImageElement[];

    gsap.set(images, { opacity: 0 });
    gsap.set(images[0], { opacity: 1 });
  }, []);

  useGSAP(() => {
    if (!containerRef.current || !panelsContainerRef.current) return;

    const panels = panelsContainerRef.current.querySelectorAll(".panel");
    if (panels.length === 0) return;

    const panelHeight = window.innerHeight;
    const totalHeight = (panels.length - 1) * panelHeight;
    const translateY = -totalHeight;

    gsap.to(panelsContainerRef.current, {
      y: translateY,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: `+=${totalHeight - 190}`,
        scrub: 1,
        pin: true,
        pinSpacing: false, // This removes the excessive spacing
        onUpdate: (self) => {
          const progress = self.progress;
          const newIndex = Math.round(progress * (panels.length - 1));
          
          if (newIndex !== currentIndexRef.current) {
            currentIndexRef.current = newIndex;
            setCurrentIndex(newIndex);
          }
        }
        // markers: true
      }
    });
  }, []);

  // Crossfade animation on image change
  useGSAP(
    () => {
      if (!imagesContainerRef.current) return;

      const images = gsap.utils.toArray(
        imagesContainerRef.current.querySelectorAll("img")
      ) as HTMLImageElement[];

      if (images.length === 0) return;

      gsap.killTweensOf(images);

      const tl = gsap.timeline();

      // Fade out all images
      tl.to(
        images,
        {
          opacity: 0,
          duration: 1,
          ease: "power2.inOut"
        },
        0
      );

      // Fade in current image WHILE others are fading out (overlap)
      tl.to(
        images[currentIndex],
        {
          opacity: 1,
          duration: 1,
          ease: "power2.inOut"
        },
        0 // Start at the SAME time (creates overlap)
      );
    },
    { scope: imagesContainerRef, dependencies: [currentIndex] }
  );

  return (
    <div
      ref={containerRef}
      className="container flex gap-50 w-[61.5rem] mx-auto h-full "
    >
      <div
        ref={panelsContainerRef}
        className="w-full h-full flex flex-col gap-2 text-white text-lg"
      >
        <section className="panel snap-start h-screen flex flex-col items-start justify-center">
          <h2 className="text-[40px] font-semibold text-custom-white mb-16">
            Lock in your look1.
          </h2>
          <p className="text-custom-gray-200 text-[21px] font-semibold">
            We've created new styles that let you dial in your exact desired
            look with more advanced skin-tone rendering and set it across your
            photos.
          </p>
        </section>
        <section className="panel snap-start h-screen flex flex-col items-start justify-center">
          <h2 className="text-[40px] font-semibold text-custom-white mb-16">
            Lock in your look2.
          </h2>
          <p className="text-custom-gray-200 text-[21px] font-semibold">
            We've created new styles that let you dial in your exact desired
            look with more advanced skin-tone rendering and set it across your
            photos.
          </p>
        </section>
        <section className="panel snap-start h-screen flex flex-col items-start justify-center">
          <h2 className="text-[40px] font-semibold text-custom-white">
            Lock in your look3.
          </h2>
          <p className="text-custom-gray-200 text-[21px] font-semibold">
            We've created new styles that let you dial in your exact desired
            look with more advanced skin-tone rendering and set it across your
            photos.
          </p>
        </section>
      </div>
      <div className="w-full h-[780px] flex flex-col items-center justify-center relative">
        <div 
          ref={imagesContainerRef}
          className="relative  w-full h-full"
        >
          <img
            className="absolute top-0 left-0 w-full h-full object-contain"
            src={styles1Img}
            alt=""
            style={{ willChange: "opacity" }}
          />
          <img
            className="absolute top-0 left-0 w-full h-full object-contain"
            src={styles2Img}
            alt=""
            style={{ willChange: "opacity" }}
          />
          <img
            className="absolute top-0 left-0 w-full h-full object-contain"
            src={styles3Img}
            alt=""
            style={{ willChange: "opacity" }}
          />
        </div>
      </div>
    </div>
  );
}

export default VerticalSlider;

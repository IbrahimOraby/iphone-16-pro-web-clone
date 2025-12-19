import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { iphoneGoldFrameImg, iphoneLensImg, telephotoImg } from "../utils";
import { lensExamples } from "../constants";
import { rightArrowIcon } from "../icons";

gsap.registerPlugin(ScrollTrigger);

function Telephoto() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const phoneWrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const [currentIndex, setCurrentIndex] = useState(1);
  const [isDeeperLookVisible, setIsDeeperLookVisible] = useState(false);

  const slidingPillRef = useRef<HTMLDivElement>(null);
  const lensButtonContainerRef = useRef<HTMLUListElement>(null);

  const lensInfoRef = useRef<HTMLDivElement>(null);
  const lensImgContainerRef = useRef<HTMLDivElement>(null);

  // Initialize first image as visible
  useEffect(() => {
    if (!lensImgContainerRef.current) return;

    const images = gsap.utils.toArray(
      lensImgContainerRef.current.querySelectorAll("img")
    ) as HTMLImageElement[];

    gsap.set(images, { opacity: 0 });
    gsap.set(images[currentIndex], { opacity: 1 });
  }, []);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=200%",
          scrub: true,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1
        }
      });

      tl.to(
        imgRef.current,
        {
          opacity: 1,
          duration: 0.1,
          ease: "power2.inOut",
          force3D: true
        },
        0.04
      );

      tl.to(
        textRef.current,
        {
          yPercent: -200,
          opacity: 0,
          duration: 0.1,
          ease: "power2.inOut",
          force3D: true
        },
        0.04
      );

      tl.to(
        phoneWrapRef.current,
        {
          scale: 0.75,
          scrub: true,
          force3D: true
        },
        0.3
      );
    },
    { scope: containerRef }
  );

  useGSAP(
    () => {
      if (!slidingPillRef.current || !lensButtonContainerRef.current) return;

      const buttons = lensButtonContainerRef.current.querySelectorAll("li");
      if (buttons.length === 0 || !buttons[currentIndex]) return;

      const selectedButton = buttons[currentIndex] as HTMLElement;
      const containerRect =
        lensButtonContainerRef.current.getBoundingClientRect();
      const buttonRect = selectedButton.getBoundingClientRect();

      const translateX = buttonRect.left - containerRect.left - 24;

      gsap.to(slidingPillRef.current, {
        x: translateX,
        width: buttonRect.width,
        duration: 0.3,
        ease: "power2.inOut",
        force3D: true
      });
    },
    { scope: lensButtonContainerRef, dependencies: [currentIndex] }
  );

  useGSAP(
    () => {
      if (!lensInfoRef.current) return;

      const tl = gsap.timeline();

      tl.to(lensInfoRef.current, {
        opacity: 0,
        duration: 0,
        ease: "power.inOut"
      }).to(lensInfoRef.current, {
        opacity: 1,
        duration: 0.5,
        delay: 0.2,
        ease: "power2.inOut"
      });
    },
    { dependencies: [currentIndex] }
  );

  // Crossfade animation on image change
  useGSAP(
    () => {
      if (!lensImgContainerRef.current) return;
  
      const images = gsap.utils.toArray(
        lensImgContainerRef.current.querySelectorAll("img")
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
    { scope: lensImgContainerRef, dependencies: [currentIndex] }
  );

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: "#telephoto-container",
      start: "top bottom",
      end: "bottom bottom",
      onEnter: () => {
        // Kill any existing animations first
        gsap.killTweensOf("#telephoto-deeper-look");
        gsap.killTweensOf("#media-player");
        gsap.killTweensOf("#model-picker");
        gsap.killTweensOf("#control-deeper-look");
        gsap.killTweensOf("#pro-deeper-look");
        
        // Set visibility state
        setIsDeeperLookVisible(true);
        
        // Immediately hide all other buttons when telephoto button becomes active
        gsap.set("#media-player", {
          zIndex: 40,
          opacity: 0,
          scale: 0.9,
          y: 0
        });
        gsap.set("#model-picker", {
          zIndex: 40,
          opacity: 0,
          scale: 0.9,
          y: 0
        });
        gsap.set("#control-deeper-look", {
          zIndex: 40,
          opacity: 0,
          scale: 0.9,
          y: 0
        });
        gsap.set("#pro-deeper-look", {
          zIndex: 40,
          opacity: 0,
          scale: 0.9,
          y: 0
        });
        
        // Set z-index immediately for telephoto button
        gsap.set("#telephoto-deeper-look", { zIndex: 60 });
        
        // Animate only opacity and transform for telephoto button
        gsap.to("#telephoto-deeper-look", {
          opacity: 0.8,
          duration: 0.5,
          delay: 0,
          y: -20,
          ease: "power2.inOut",
          scale: 1.1
        });
      },
      onLeave: () => {
        gsap.killTweensOf("#telephoto-deeper-look");
        gsap.set("#telephoto-deeper-look", { zIndex: 50 });
        
        // Set visibility state
        setIsDeeperLookVisible(false);
        
        // Hide immediately, no animation delay
        gsap.set("#telephoto-deeper-look", {
          opacity: 0,
          scale: 0.9,
          y: 0
        });
      },
      onLeaveBack: () => {
        gsap.killTweensOf("#telephoto-deeper-look");
        gsap.set("#telephoto-deeper-look", { zIndex: 50 });
        
        // Set visibility state
        setIsDeeperLookVisible(false);
        
        // Hide immediately
        gsap.set("#telephoto-deeper-look", {
          opacity: 0,
          scale: 0.9,
          y: 0
        });
      },
      onEnterBack: () => {
        // Kill any existing animations first
        gsap.killTweensOf("#telephoto-deeper-look");
        gsap.killTweensOf("#media-player");
        gsap.killTweensOf("#model-picker");
        gsap.killTweensOf("#control-deeper-look");
        gsap.killTweensOf("#pro-deeper-look");
        
        // Set visibility state
        setIsDeeperLookVisible(true);
        
        // Immediately hide all other buttons
        gsap.set("#media-player", {
          zIndex: 40,
          opacity: 0,
          scale: 0.9,
          y: 0
        });
        gsap.set("#model-picker", {
          zIndex: 40,
          opacity: 0,
          scale: 0.9,
          y: 0
        });
        gsap.set("#control-deeper-look", {
          zIndex: 40,
          opacity: 0,
          scale: 0.9,
          y: 0
        });
        gsap.set("#pro-deeper-look", {
          zIndex: 40,
          opacity: 0,
          scale: 0.9,
          y: 0
        });
        
        // Set z-index immediately
        gsap.set("#telephoto-deeper-look", { zIndex: 60 });
        
        gsap.to("#telephoto-deeper-look", {
          opacity: 0.8,
          duration: 0.5,
          delay: 0,
          y: -20,
          ease: "power2.inOut",
          scale: 1.1
        });
      }
    });
  });

  const handleIndexChange = (index: number) => {
    if (index < 0) {
      setCurrentIndex(lensExamples.length - 1);
    } else if (index >= lensExamples.length) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(index);
    }
  };

  return (
    <section id="telephoto-container" className="w-full h-full overflow-hidden bg-custom-black">
      <div
        ref={containerRef}
        className="relative h-screen w-full overflow-hidden bg-custom-black"
        style={{ willChange: "transform" }}
      >
        <div
          className="absolute inset-0 z-30 flex items-center justify-center text-white"
          ref={textContainerRef}
        >
          <div
            className="text-[80px] tracking-tighter font-semibold flex flex-col gap-0 text-center leading-[1.1]"
            ref={textRef}
            style={{ willChange: "transform, opacity" }}
          >
            <h1>4K 120 fps Dolby Vision.</h1>
            <h1>Cinemasterful.</h1>
          </div>
        </div>

        <div ref={phoneWrapRef} className="h-full w-full scale-[2.8]">
          <div className="absolute inset-2 rounded-[152px] overflow-hidden">
            <img
              ref={imgRef}
              src={telephotoImg}
              className="absolute inset-0 h-full w-full object-cover background-custom-gray-300 opacity-60"
              style={{ willChange: "opacity" }}
            />
          </div>

          <img
            src={iphoneGoldFrameImg}
            alt=""
            className="pointer-events-none absolute inset-0 z-10 h-full w-full"
            style={{ willChange: "transform" }}
          />
        </div>
      </div>

      <div className="w-[61.5rem] mx-auto grid grid-cols-2 gap-28 text-[21px] font-semibold my-24">
        <p className="text-custom-gray-200">
          iPhone 16 Pro adds a second 48MP camera to the Pro camera system. The
          new 48MP Ultra Wide camera has a more advanced quad-pixel sensor for
          super-high-resolution 48MP ProRAW and HEIF photos with autofocus.
        </p>
        <p className="text-custom-gray-200">
          So you can{" "}
          <span className="text-custom-white-100">
            capture a mesmerizing new level of detail
          </span>{" "}
          in macro photos and sweeping, wide-angle shots.
        </p>
      </div>

      <div className="w-[61.5rem] mx-auto h-full mb-16 flex flex-col items-center justify-center">
        {/* All images stacked - create crossfade */}
        <div
          ref={lensImgContainerRef}
          className="relative h-[738px] w-full mb-8 overflow-hidden"
        >
          {lensExamples.map((lens) => (
            <img
              key={lens.label}
              src={lens.img}
              alt={lens.label}
              className="absolute h-full w-full object-cover"
              style={{
                willChange: "opacity"
              }}
            />
          ))}
        </div>

        <ul
          ref={lensButtonContainerRef}
          className="relative flex bg-custom-gray-250 rounded-[3rem] px-6 py-2 gap-4 justify-between w-fit"
        >
          <div
            ref={slidingPillRef}
            className="absolute left-6 top-2 h-10 rounded-full bg-custom-white"
            style={{
              willChange: "transform, width"
            }}
          />

          {lensExamples.map((lens, index) => (
            <li key={lens.label} className="relative z-10">
              <button
                onClick={() => handleIndexChange(index)}
                className={`cursor-pointer relative px-4 py-2 transition-colors duration-300 text-[16px] font-semibold ${
                  currentIndex === index
                    ? "text-custom-black"
                    : "text-custom-white-100"
                }`}
              >
                {lens.label}
              </button>
            </li>
          ))}
        </ul>

        <div
          className="w-full h-full rounded-[3rem] p-6 text-center mb-16"
          ref={lensInfoRef}
          style={{ opacity: 0 }}
        >
          <p className="text-custom-white-100 text-[16px] font-semibold inline">
            {lensExamples[currentIndex].zoomLevel}{" "}
          </p>
          <p className="text-custom-gray-200 text-[16px] font-semibold inline">
            {lensExamples[currentIndex].mode}
          </p>
        </div>
      </div>

      <div className="w-[87.5%] mx-auto h-full mb-16 grid grid-cols-2 gap-24">
        <p className="text-[21px] font-semibold text-custom-gray-200 pt-12 ps-56">
          More zoom? Boom. Now you can shoot in 120 mm with the 5x Telephoto
          camera on both Pro models and get{" "}
          <span className="text-custom-white-100">
            sharper close-ups from farther away
          </span>
          . With multiple framing options, it's like having seven pro lenses in
          your pocket, everywhere you go.
        </p>
        <div className="h-[320px] w-full flex items-center justify-center">
          <img
            src={iphoneLensImg}
            alt="iPhone Lens"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
      <div
        className={`fixed bottom-7 left-1/2 -translate-x-1/2 bg-neutral-700 backdrop-blur px-3 py-3 rounded-full cursor-pointer z-[60] pointer-events-auto opacity-0 ${
          isDeeperLookVisible ? "" : "hidden"
        }`}
        id="telephoto-deeper-look"
      >
        <div className="flex items-center justify-center gap-4">
          <p className="text-custom-white-100 text-[16px] font-semibold">Zoom in on 5x Telephoto</p>
          <span className="text-custom-white-100 w-8 h-8 bg-custom-blue-100 rounded-full ">{rightArrowIcon()} </span>
        </div>
      </div>
    </section>
  );
}

export default Telephoto;

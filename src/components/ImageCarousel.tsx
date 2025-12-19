import { useRef, useState, useEffect } from "react";
import { titaniumCarouselData } from "../constants";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { leftArrowIcon, rightArrowIcon } from "../icons";

function ImageCarousel() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Calculate item width including gap (512px + 32px gap = 544px)
  const itemWidth = 512 + 32; // 544px

  useGSAP(() => {
    if (!sliderRef.current) return;

    // Calculate translateX based on current index
    // Each item is 544px (512px width + 32px gap)
    const translateX = -currentIndex * itemWidth;

    gsap.to(sliderRef.current, {
      x: translateX,
      duration: 0.8,
      ease: "power2.inOut"
    });
  }, [currentIndex]);

  useGSAP(() => {
    gsap.to("#card-image", {
      opacity: 1,
      duration: 1,
      stagger: 0.2,
      delay: 0.3,
      y: 0,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: "#card-image",
        start: "top 100%",
        toggleActions: "play none none none"
      }
    });
  }, []);

  // Update button states based on current index
  useEffect(() => {
    setCanScrollLeft(currentIndex > 0);
    setCanScrollRight(currentIndex < titaniumCarouselData.length - 1);
  }, [currentIndex]);

  const scroll = (direction: "left" | "right") => {
    if (direction === "left" && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else if (
      direction === "right" &&
      currentIndex < titaniumCarouselData.length - 1
    ) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className="relative w-full py-20">
      {/* Carousel Container */}
      <div className="flex items-center ml-[175px] gap-8  w-full">
        <div
          ref={sliderRef}
          className="flex gap-8"
          style={{ willChange: "transform" }}
        >
          {titaniumCarouselData.map((card, index) => (
            <div
              key={index}
              className="flex-none w-[512px] opacity-0 translate-y-10"
              id="card-image"
            >
              {/* Card Image */}
              <div className="w-full h-[512px] bg-zinc-900 rounded-3xl overflow-hidden mb-6 ">
                <img
                  src={card.img}
                  alt={card.text}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Card Text */}
              <p className="text-[17px] font-semibold text-center px-4 bg-gradient-to-r from-[#efcdbb] via-[#dab8a4] to-[#a3735e] bg-clip-text text-transparent">
                {card.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="absolute -translate-y-1/2 bottom-0 right-64 flex items-center justify-center gap-4 z-[70]">
        <button
          onClick={() => scroll("left")}
          disabled={!canScrollLeft}
          className={`w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center transition-opacity  ${
            !canScrollLeft
              ? "opacity-30 cursor-default"
              : "opacity-100 hover:bg-zinc-700 cursor-pointer"
          }`}
        >
          {leftArrowIcon()}
        </button>

        <button
          onClick={() => scroll("right")}
          disabled={!canScrollRight}
          className={`w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center transition-opacity  ${
            !canScrollRight
              ? "opacity-30 cursor-default"
              : "opacity-100 hover:bg-zinc-700 cursor-pointer"
          }`}
        >
          {rightArrowIcon()}
        </button>
      </div>
    </div>
  );
}

export default ImageCarousel;

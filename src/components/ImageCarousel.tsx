import React, { useRef, useState, useEffect } from "react";
import { titaniumCarouselData } from "../constants";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

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

  // Update button states based on current index
  useEffect(() => {
    setCanScrollLeft(currentIndex > 0);
    setCanScrollRight(currentIndex < titaniumCarouselData.length - 1);
  }, [currentIndex]);

  const scroll = (direction: "left" | "right") => {
    if (direction === "left" && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else if (direction === "right" && currentIndex < titaniumCarouselData.length - 1) {
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
              className="flex-none w-[512px]"
            >
              {/* Card Image */}
              <div className="w-full h-[512px] bg-zinc-900 rounded-3xl overflow-hidden mb-6">
                <img
                  src={card.img}
                  alt={card.text}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Card Text */}
              <p className="text-white text-lg md:text-xl font-semibold text-center px-4">
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
          className={`w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center transition-opacity ${
            !canScrollLeft
              ? "opacity-30 cursor-not-allowed"
              : "opacity-100 hover:bg-zinc-700"
          }`}
        >
          <svg
            className="icon-control icon-control-chevronleft fill-custom-white size-8"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 36 36"
          >
            <path d="m20 25c-.3838 0-.7676-.1465-1.0605-.4395l-5.5-5.5c-.5859-.5854-.5859-1.5356 0-2.1211l5.5-5.5c.5859-.5859 1.5352-.5859 2.1211 0 .5859.5854.5859 1.5356 0 2.1211l-4.4395 4.4395 4.4395 4.4395c.5859.5854.5859 1.5356 0 2.1211-.293.293-.6768.4395-1.0605.4395z"></path>
          </svg>
        </button>

        <button
          onClick={() => scroll("right")}
          disabled={!canScrollRight}
          className={`w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center transition-opacity ${
            !canScrollRight
              ? "opacity-30 cursor-not-allowed"
              : "opacity-100 hover:bg-zinc-700"
          }`}
        >
          <svg
            className="icon-control icon-control-chevronright fill-custom-white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 36 36"
          >
            <path d="m22.5597 16.9375-5.5076-5.5c-.5854-.5854-1.5323-.5825-2.1157.0039-.5835.5869-.5815 1.5366.0039 2.1211l4.4438 4.4375-4.4438 4.4375c-.5854.5845-.5874 1.5342-.0039 2.1211.2922.2944.676.4414 1.0598.4414.3818 0 .7637-.1455 1.0559-.4375l5.5076-5.5c.2815-.2812.4403-.6636.4403-1.0625s-.1588-.7812-.4403-1.0625z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default ImageCarousel;

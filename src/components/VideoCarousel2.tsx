import { useRef, useState, useEffect } from "react";
import { cameraControlData } from "../constants";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import {
  leftArrowIcon,
  pauseIcon,
  playIcon,
  replayIcon,
  rightArrowIcon
} from "../icons";

gsap.registerPlugin(ScrollTrigger);

function VideoCarousel2() {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const sliderRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const [isPlaying, setIsPlaying] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);
  const [hasStarted, setHasStarted] = useState(false); // Track if carousel is in view

  const itemWidth = 512 + 32;

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 80%",
      once: true, 
      onEnter: () => {
        setHasStarted(true);
        // Play first video
        if (videoRefs.current[0]) {
          videoRefs.current[0].play();
        }
      }
    });
  }, []);

  useGSAP(() => {
    if (!sliderRef.current) return;

    const translateX = -currentIndex * itemWidth;

    gsap.to(sliderRef.current, {
      x: translateX,
      duration: 0.8,
      ease: "power2.inOut"
    });
  }, [currentIndex]);

  useGSAP(() => {
    gsap.to("#card-video", {
      opacity: 1,
      duration: 1,
      stagger: 0.2,
      delay: 0.3,
      y: 0,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: "#card-video",
        start: "top 100%",
        toggleActions: "play none none none"
      }
    });
  }, []);

  // Play/pause videos based on current index (only if carousel has started)
  useEffect(() => {
    if (!hasStarted) return; // Don't play until carousel is in view

    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === currentIndex) {
          video.play();
          setIsPlaying(true);
          setHasEnded(false);
        } else {
          video.pause();
          video.currentTime = 0;
        }
      }
    });
  }, [currentIndex, hasStarted]);

  useEffect(() => {
    setCanScrollLeft(currentIndex > 0);
    setCanScrollRight(currentIndex < cameraControlData.length - 1);
  }, [currentIndex]);

  const scroll = (direction: "left" | "right") => {
    if (direction === "left" && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else if (
      direction === "right" &&
      currentIndex < cameraControlData.length - 1
    ) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleReplay = () => {
    const currentVideo = videoRefs.current[currentIndex];
    if (currentVideo) {
      currentVideo.currentTime = 0;
      currentVideo.play();
      setIsPlaying(true);
      setHasEnded(false);
    }
  };

  const handlePause = () => {
    const currentVideo = videoRefs.current[currentIndex];
    if (currentVideo) {
      currentVideo.pause();
      setIsPlaying(false);
    }
  };

  const handlePlay = () => {
    const currentVideo = videoRefs.current[currentIndex];
    if (currentVideo) {
      currentVideo.play();
      setIsPlaying(true);
      setHasEnded(false);
    }
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
    setHasEnded(true);
  };

  return (
    <div ref={containerRef} className="relative w-full py-20">
      <div className="flex items-center ml-[175px] gap-8 w-full">
        <div
          ref={sliderRef}
          className="flex gap-8"
          style={{ willChange: "transform" }}
        >
          {cameraControlData.map((card, index) => (
            <div
              key={index}
              className="flex-none w-[512px] opacity-0 translate-y-10"
              id="card-video"
            >
              <div className="relative w-full h-[512px] bg-zinc-900 rounded-3xl overflow-hidden mb-6">
                <video
                  src={card.video}
                  preload="auto"
                  muted
                  playsInline
                  ref={(el) => (videoRefs.current[index] = el)}
                  onEnded={handleVideoEnded}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-6 right-6">
                  {index === currentIndex && (
                    <>
                      {hasEnded ? (
                        <button
                          onClick={handleReplay}
                          className="bg-gray-200 opacity-50 text-custom-white-100 rounded-full cursor-pointer hover:opacity-60 transition-opacity"
                        >
                          {replayIcon("fill-custom-gray-300 size-10")}
                        </button>
                      ) : !isPlaying ? (
                        <button
                          onClick={handlePlay}
                          className="bg-gray-200 opacity-50 text-custom-white-100 rounded-full cursor-pointer hover:opacity-60 transition-opacity"
                        >
                          {playIcon("fill-custom-gray-300 size-10")}
                        </button>
                      ) : (
                        <button
                          onClick={handlePause}
                          className="bg-gray-200 opacity-50 text-custom-white-100 rounded-full cursor-pointer hover:opacity-60 transition-opacity"
                        >
                          {pauseIcon("fill-custom-gray-300 size-10")}
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>

              {card.text.map((textElement, idx) => (
                <div key={idx}>{textElement}</div>
              ))}
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
              ? "opacity-30 cursor-default"
              : "opacity-100 hover:bg-zinc-700 cursor-pointer"
          }`}
        >
          {leftArrowIcon()}
        </button>

        <button
          onClick={() => scroll("right")}
          disabled={!canScrollRight}
          className={`w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center transition-opacity ${
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

export default VideoCarousel2;

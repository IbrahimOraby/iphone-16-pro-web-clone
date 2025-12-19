import { useEffect, useRef, useState } from "react";
import { highlightsSlides } from "../constants";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { playIcon, pauseIcon, replayIcon } from "../icons";
gsap.registerPlugin(ScrollTrigger);


type VideoState = {
  isEnd: boolean;
  startPlay: boolean;
  videoId: number;
  isLastVideo: boolean;
  isPlaying: boolean;
};

const VideoCarousel = () => {
  //   const videoRef = useRef([]);
  //   const videoSpanRef = useRef([]);
  //   const videoDivRef = useRef([]);
  const videoRef = useRef<(HTMLVideoElement | null)[]>([]);
  const videoSpanRef = useRef<(HTMLSpanElement | null)[]>([]);
  const videoDivRef = useRef<(HTMLDivElement | null)[]>([]);

  // video and indicator
  //   const [video, setVideo] = useState({
  //     isEnd: false,
  //     startPlay: false,
  //     videoId: 0,
  //     isLastVideo: false,
  //     isPlaying: false
  //   });
  const [video, setVideo] = useState<VideoState>({
    isEnd: false,
    startPlay: false,
    videoId: 0,
    isLastVideo: false,
    isPlaying: false
  });

  const [loadedData, setLoadedData] = useState<Event[]>([]);
  const { isEnd, isLastVideo, startPlay, videoId, isPlaying } = video;

  const [isMediaPlayerVisible, setIsMediaPlayerVisible] = useState(false);

  useGSAP(() => {
    // slider animation to move the video out of the screen and bring the next video in
    gsap.to("#slider", {
      transform: `translateX(${-102 * videoId}%)`,
      duration: 1,
      ease: "power2.inOut" // show visualizer https://gsap.com/docs/v3/Eases
    });

    // gsap.to(".highlights-text", {
    //   opacity: 1,
    //   x: -20,
    //   duration: 0.5,
    //   scrollTrigger: {
    //     trigger: ".highlights-text",
    //     start: "top 110%",
    //     toggleActionsered: "play none none none"
    //   }
    // });

    // video animation to play the video when it is in the view
    gsap.to("#video", {
      scrollTrigger: {
        trigger: ".video-item",
        toggleActions: "restart none none none"
      },
      onComplete: () => {
        setVideo((pre) => ({
          ...pre,
          startPlay: true,
          isPlaying: true
        }));
      }
    });
  }, [isEnd, videoId]);

  useGSAP(() => {
    const currentSlideTexts = document.querySelectorAll(
      `.slider-item:nth-child(${videoId + 1}) .highlights-text`
    );

    const allTexts = document.querySelectorAll(".highlights-text");

    const tl = gsap.timeline();

    tl.to(allTexts, {
      opacity: 0,
      x: 30,
      duration: 0.75,
      ease: "power2.in"
    }).to(
      currentSlideTexts,
      {
        opacity: 0.8,
        x: -5,
        duration: 0.5,
        ease: "power2.out"
      },
      "+=0.2"
    ); // 0.2s pause after exit
  }, [videoId]);

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: "#carousel-container",
      start: "center bottom",
      end: "bottom center",
      onEnter: () => {
        // Kill any existing animations first
        gsap.killTweensOf("#media-player");
        gsap.killTweensOf("#model-picker");
        gsap.killTweensOf("#control-deeper-look");
        gsap.killTweensOf("#pro-deeper-look");
        gsap.killTweensOf("#telephoto-deeper-look");
        
        // Set visibility state
        setIsMediaPlayerVisible(true);
        
        // Immediately hide all other buttons when media player becomes active
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
        gsap.set("#telephoto-deeper-look", {
          zIndex: 40,
          opacity: 0,
          scale: 0.9,
          y: 0
        });
        
        // Set z-index immediately for media player
        gsap.set("#media-player", { zIndex: 60 });
        
        // Animate only opacity and transform for media player
        gsap.to("#media-player", {
          opacity: 0.8,
          duration: 0.5,
          delay: 0,
          y: -20,
          ease: "power2.inOut",
          scale: 1.1
        });
      },
      onLeave: () => {
        gsap.killTweensOf("#media-player");
        gsap.set("#media-player", { zIndex: 50 });
        
        // Set visibility state
        setIsMediaPlayerVisible(false);
        
        // Hide immediately, no animation delay
        gsap.set("#media-player", { 
          opacity: 0,
          scale: 0.9,
          y: 0
        });
      },
      onLeaveBack: () => {
        gsap.killTweensOf("#media-player");
        gsap.set("#media-player", { zIndex: 50 });
        
        // Set visibility state
        setIsMediaPlayerVisible(false);
        
        // Hide immediately
        gsap.set("#media-player", { 
          opacity: 0,
          scale: 0.9,
          y: 0
        });
      },
      onEnterBack: () => {
        // Kill any existing animations first
        gsap.killTweensOf("#media-player");
        gsap.killTweensOf("#model-picker");
        gsap.killTweensOf("#control-deeper-look");
        gsap.killTweensOf("#pro-deeper-look");
        gsap.killTweensOf("#telephoto-deeper-look");
        
        // Set visibility state
        setIsMediaPlayerVisible(true);
        
        // Immediately hide all other buttons
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
        gsap.set("#telephoto-deeper-look", {
          zIndex: 40,
          opacity: 0,
          scale: 0.9,
          y: 0
        });
        
        // Set z-index immediately
        gsap.set("#media-player", { zIndex: 60 });
        
        gsap.to("#media-player", {
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

  useEffect(() => {
    let currentProgress = 0;
    const span = videoSpanRef.current;

    if (span[videoId]) {
      // animation to move the indicator
      let anim = gsap.to(span[videoId], {
        onUpdate: () => {
          // get the progress of the video
          const progress = Math.ceil(anim.progress() * 100);

          if (progress != currentProgress) {
            currentProgress = progress;

            // set the width of the progress bar
            gsap.to(videoDivRef.current[videoId], {
              width: "4vw" // laptop
            });

            // set the background color of the progress bar
            gsap.to(span[videoId], {
              width: `${currentProgress}%`,
              backgroundColor: "#FFFFFF"
            });
          }
        },

        // when the video is ended, replace the progress bar with the indicator and change the background color
        onComplete: () => {
          if (isPlaying) {
            gsap.to(videoDivRef.current[videoId], {
              width: "0.5rem"
            });
            gsap.to(span[videoId], {
              backgroundColor: "rgba(255, 255, 255, 0.8)"
            });
          }
        }
      });

      if (videoId == 0) {
        anim.restart();
      }

      // update the progress bar
      const animUpdate = () => {
        anim.progress(
          videoRef.current[videoId].currentTime /
            highlightsSlides[videoId].videoDuration
        );
      };

      if (isPlaying) {
        // ticker to update the progress bar
        gsap.ticker.add(animUpdate);
      } else {
        // remove the ticker when the video is paused (progress bar is stopped)
        gsap.ticker.remove(animUpdate);
      }
    }
  }, [videoId, startPlay]);

  useEffect(() => {
    if (loadedData.length > 5) {
      if (!isPlaying) {
        videoRef.current[videoId].pause();
      } else {
        startPlay && videoRef.current[videoId].play();
      }
    }
  }, [startPlay, videoId, isPlaying, loadedData]);

  // vd id is the id for every video until id becomes number 3
  const handleProcess = (
    type: "video-end" | "video-last" | "video-reset" | "play" | "pause",
    i?: number
  ) => {
    switch (type) {
      case "video-end":
        setVideo((pre) => ({ ...pre, isEnd: true, videoId: i + 1 }));
        break;

      case "video-last":
        setVideo((pre) => ({ ...pre, isLastVideo: true }));
        break;

      case "video-reset":
        setVideo((pre) => ({ ...pre, videoId: 0, isLastVideo: false }));
        break;

      case "pause":
        setVideo((pre) => ({ ...pre, isPlaying: !pre.isPlaying }));
        break;

      case "play":
        setVideo((pre) => ({ ...pre, isPlaying: !pre.isPlaying }));
        break;

      default:
        return video;
    }
  };

  const handleLoadedMetaData = (i, e) => setLoadedData((pre) => [...pre, e]);

  return (
    <>
      <div className="relative" id="carousel-container">
        <div
          className={`fixed bottom-2 -translate-y-1/2 w-full justify-center z-[60] pointer-events-auto opacity-0 h-13 ${isMediaPlayerVisible ? '' : 'hidden'}`}
          id="media-player"
        >
          <div className="flex items-center justify-center gap-4 pointer-events-auto">
            <button
              className="rounded-full bg-neutral-700 backdrop-blur flex items-center justify-center cursor-pointer"
              onClick={
                isLastVideo
                  ? () => handleProcess("video-reset")
                  : !isPlaying
                  ? () => handleProcess("play")
                  : () => handleProcess("pause")
              }
            >
              {isLastVideo ? replayIcon('size-14 fill-custom-white') : !isPlaying ? playIcon('size-14 fill-custom-white') : pauseIcon('size-14 fill-custom-white')}
            </button>

            <div className="flex items-center justify-center py-5 px-7 bg-neutral-700 backdrop-blur rounded-full gap-2 ">
              {videoRef.current.map((_, i) => (
                <span
                  key={i}
                  ref={(el) => (videoDivRef.current[i] = el)}
                  className="mx-1 my-1 w-2 h-2 bg-custom-gray-100 rounded-full relative cursor-pointer"
                >
                  <span
                    className="absolute h-full w-full rounded-full"
                    ref={(el) => (videoSpanRef.current[i] = el)}
                  />
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center ml-[95px] gap-5 relative highlights-carousel translate-y-14 opacity-0">
          {highlightsSlides.map((list, i) => (
            <div className="slider-item" id="slider" key={list.id}>
              <div className="relative w-[87vw] h-[710px]">
                <div className="w-full h-full flex items-center justify-center rounded-3xl overflow-hidden bg-custom-black">
                  <video
                    className="size-full object-cover video-item"
                    id="video"
                    playsInline
                    preload="auto"
                    muted
                    ref={(el) => {
                      videoRef.current[i] = el;
                    }}
                    onEnded={() =>
                      i !== highlightsSlides.length - 1
                        ? handleProcess("video-end", i)
                        : handleProcess("video-last")
                    }
                    onPlay={() => {
                      setVideo((prevVideo) => ({
                        ...prevVideo,
                        isPlaying: true
                      }));
                    }}
                    onLoadedMetadata={(e) => handleLoadedMetaData(i, e)}
                  >
                    <source src={list.video} type="video/mp4" />
                  </video>
                </div>

                <div className="absolute top-12 left-12 z-10">
                  {list.textLists.map((text: string, idx: number) => (
                    <p
                      className="font-semibold text-[28px] leading-[1.1] highlights-text"
                      key={idx}
                    >
                      {text}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default VideoCarousel;

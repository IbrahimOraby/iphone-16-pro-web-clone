import { useEffect, useRef, useState } from "react";
import { highlightsSlides } from "../constants";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

const playImg = (
  <svg
    className="icon-control icon-control-play-super svg-icon play-icon fill-custom-white size-14"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 56 56"
  >
    <path d="m23.7555 36.6237c.4478 0 .8598-.1343 1.4241-.4568l10.9178-6.3322c.8598-.5016 1.3614-1.021 1.3614-1.8361 0-.8061-.5016-1.3255-1.3614-1.8271l-10.9178-6.3322c-.5643-.3314-.9762-.4657-1.4241-.4657-.9315 0-1.7555.7165-1.7555 1.9435v13.3629c0 1.227.824 1.9435 1.7555 1.9435z" />
  </svg>
);

const pauseImg = (
  <svg
    className="icon-control icon-control-pause-super svg-icon pause-icon fill-custom-white size-14"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 56 56"
  >
    <path d="m21.7334 36.67h2.5342c1.1483 0 1.7324-.5796 1.7324-1.7193v-13.9015c0-1.12-.5841-1.6898-1.7324-1.7193h-2.5342c-1.1483 0-1.7324.5698-1.7324 1.7193v13.9015c-.0297 1.1396.5544 1.7193 1.7324 1.7193zm9.9992 0h2.5347c1.1485 0 1.7327-.5796 1.7327-1.7193v-13.9015c0-1.12-.5842-1.7193-1.7327-1.7193h-2.5347c-1.1485 0-1.7327.5698-1.7327 1.7193v13.9015c0 1.1396.5545 1.7193 1.7327 1.7193z" />
  </svg>
);

const replayImg = (
  <svg
    className="icon-control icon-control-replay-super svg-icon replay-icon fill-custom-white size-14"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 56 56"
  >
    <path d="m36.2448 26.6447c-1.1073 0-2.0052.8978-2.0052 2.0052 0 3.4405-2.7992 6.2397-6.2397 6.2397s-6.2397-2.7992-6.2397-6.2397 2.7992-6.2397 6.2397-6.2397c.0283 0 .0546-.0072.0825-.0083l-1.2839 1.2841c-.7833.7828-.7833 2.0526 0 2.8354.3911.3916.9047.5874 1.4177.5874s1.0266-.1958 1.4177-.5874l4.4406-4.4406c.7833-.7828.7833-2.0526 0-2.8354l-4.657-4.657c-.7823-.7833-2.0531-.7833-2.8354 0-.7833.7828-.7833 2.0526 0 2.8354l.9973.9974c-5.4561.223-9.8295 4.7189-9.8295 10.2287 0 5.6517 4.5983 10.25 10.25 10.25s10.25-4.5983 10.25-10.25c0-1.1073-.8978-2.0052-2.0052-2.0052z" />
  </svg>
);

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
        
        // Immediately hide the model picker when media player becomes active
        gsap.set("#model-picker", { 
          zIndex: 40, 
          opacity: 0,  // Hide immediately
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
        
        // Immediately hide the model picker
        gsap.set("#model-picker", { 
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
    let span = videoSpanRef.current;

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
          className="fixed bottom-2 -translate-y-1/2 w-full justify-center z-[60] pointer-events-auto opacity-0 h-13"
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
              {isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
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

import { useGSAP } from "@gsap/react";
import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { cameraControlVideo } from "../utils";
import VideoCarousel2 from "./VideoCarousel2";
gsap.registerPlugin(ScrollTrigger);

function CameraControl() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: videoRef.current,
      start: "top 80%",
      once: true, // Only trigger once
      onEnter: () => {
        videoRef.current?.play();
        setIsPlaying(true);
        setHasEnded(false);
      }
    });

    gsap.to(videoRef.current, {
      opacity: 1,
      scale: 1.08,
      delay: 0.5,
      scrollTrigger: {
        trigger: videoRef.current,
        start: "top 50%",
        toggleActions: "play none none none"
        // markers: true
      }
    });
  }, []);

  // Function to replay video
  const handleReplay = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0; // Reset to beginning
      videoRef.current.play();
      setIsPlaying(true);
      setHasEnded(false);
    }
  };

  const handlePause = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
      setHasEnded(false);
    }
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
    setHasEnded(true);
  };

  return (
    <section className="w-full overflow-hidden bg-custom-black text-custom-white">
      <div className=" w-[87.5%] mx-auto text-center flex flex-col items-center pb-24 leading-[1.1]">
        <h1 className="text-[80px] font-semibold text-custom-gray-100 opacity-100">
          Take total
        </h1>
        <h1
          className="text-[80px] font-semibold text-custom-white opacity-100"
          style={{
            textShadow:
              "0px 0px 5px #ffffff, 0px 0px 12px #fab472, 0px 18px 72px #fd7724, 0px 8px 82px #fd9424, 8px 38px 82px #1B1410"
          }}
        >
          Camera Control.
        </h1>
      </div>
      <div className="w-full h-full overflow-clip relative">
        <div className=" w-full h-full flex items-center justify-center z-10">
          {hasEnded ? (
            <button
              onClick={handleReplay}
              className="text-custom-blue-100 text-lg font-normal py-2 px-4 rounded-full cursor-pointer hover:underline bg-black/50 backdrop-blur-sm"
            >
              Replay
            </button>
          ) : !isPlaying ? (
            <button
              onClick={handlePlay}
              className="text-custom-blue-100 text-lg font-normal py-2 px-4 rounded-full cursor-pointer hover:underline bg-black/50 backdrop-blur-sm"
            >
              Play
            </button>
          ) : (
            <button
              onClick={handlePause}
              className="text-custom-blue-100 text-lg font-normal py-2 px-4 rounded-full cursor-pointer hover:underline bg-black/50 backdrop-blur-sm"
            >
              Pause
            </button>
          )}
        </div>

        <div className="w-full h-full overflow-hidden">
          <video
            ref={videoRef}
            src={cameraControlVideo}
            preload="auto"
            muted
            playsInline={true}
            key={cameraControlVideo}
            className="w-full h-full object-cover opacity-0"
            onEnded={handleVideoEnded}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />
        </div>
      </div>

      <div className="w-full h-full bg-linear-to-b from-custom-black to-custom-gray-300 py-30">
        {/* First row - Two columns */}
        <div className="w-[61.5rem] mx-auto grid grid-cols-2 gap-48 text-[21px] font-semibold mb-20">
          <p className="text-custom-gray-200">
            Now you can take the perfect photo or video in record time. Camera
            Control gives you an simpler{" "}
            <span className="text-custom-white-100">
              easier way to quickly access camera tools
            </span>
            . Simply slide your finger to adjust camera functions like exposure
            or depth of field, and toggle through each lens or use digital zoom
            to frame your shot — just how you like it.
          </p>

          <div className="w-full h-full flex flex-col justify-between ">
            <p className="text-custom-gray-200">
              Camera Control features a two-stage shutter that lets you
              <span className="text-custom-white-100">
                automatically lock focus and exposure
              </span>{" "}
              with a light press — so you can reframe your shot without losing
              focus on your subject.
            </p>{" "}
            <a
              className="text-custom-blue-100 text-lg font-semibold  cursor-pointer hover:underline pb-4"
              href="#"
            >
              How to use Camera Control
            </a>
          </div>
        </div>

        <div className="w-full my-20">
          <VideoCarousel2 />
        </div>

        {/* Third row - Two columns */}
        {/* <div className="w-[87.5%] mx-auto px-24 grid grid-cols-2 gap-48 text-[21px] font-semibold">
          <p className="text-custom-gray-200">
            New display technology allows us to route display data under active
            pixels with no distortion, resulting in thinner borders for larger
            6.3-inch and 6.9-inch{" "}
            <span className="text-custom-white-100">
              Super Retina XDR displays
            </span>{" "}
            that feel great in the hand.
          </p>

          <p className="text-custom-gray-200">
            iPhone 16 Pro is splash, water, and dust resistant. It's also
            remarkably durable,{" "}
            <span className="text-custom-white-100">
              with our latest-generation Ceramic Shield front.
            </span>
          </p>
        </div> */}
      </div>
    </section>
  );
}

export default CameraControl;

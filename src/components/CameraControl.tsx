import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { cameraControlVideo } from "../utils";
import VideoCarousel2 from "./VideoCarousel2";
import { rightArrowIcon } from "../icons";
gsap.registerPlugin(ScrollTrigger);

function CameraControl() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);
  const [isDeeperLookVisible, setIsDeeperLookVisible] = useState(false);

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: videoRef.current,
      start: "top 80%",
      once: true,
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

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: "#camera-control-container",
      start: "top bottom",
      end: "bottom bottom",
      // markers: true,
      onEnter: () => {
        // Kill any existing animations first
        gsap.killTweensOf("#control-deeper-look");
        gsap.killTweensOf("#media-player");
        gsap.killTweensOf("#model-picker");
        gsap.killTweensOf("#pro-deeper-look");
        gsap.killTweensOf("#telephoto-deeper-look");
        
        // Set visibility state
        setIsDeeperLookVisible(true);
        
        // Immediately hide all other buttons when deeper look becomes active
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
        
        // Set z-index immediately for deeper look button
        gsap.set("#control-deeper-look", { zIndex: 60 });
        
        // Animate only opacity and transform for deeper look button
        gsap.to("#control-deeper-look", {
          opacity: 0.8,
          duration: 0.5,
          delay: 0,
          y: -20,
          ease: "power2.inOut",
          scale: 1.1
        });
      },
      onLeave: () => {
        gsap.killTweensOf("#control-deeper-look");
        gsap.set("#control-deeper-look", { zIndex: 50 });
        
        // Set visibility state
        setIsDeeperLookVisible(false);
        
        // Hide immediately, no animation delay
        gsap.set("#control-deeper-look", {
          opacity: 0,
          scale: 0.9,
          y: 0
        });
      },
      onLeaveBack: () => {
        gsap.killTweensOf("#control-deeper-look");
        gsap.set("#control-deeper-look", { zIndex: 50 });
        
        // Set visibility state
        setIsDeeperLookVisible(false);
        
        // Hide immediately
        gsap.set("#control-deeper-look", {
          opacity: 0,
          scale: 0.9,
          y: 0
        });
      },
      onEnterBack: () => {
        // Kill any existing animations first
        gsap.killTweensOf("#control-deeper-look");
        gsap.killTweensOf("#media-player");
        gsap.killTweensOf("#model-picker");
        gsap.killTweensOf("#pro-deeper-look");
        gsap.killTweensOf("#telephoto-deeper-look");
        
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
        gsap.set("#control-deeper-look", { zIndex: 60 });
        
        gsap.to("#control-deeper-look", {
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
    <section id="camera-control-container" className="w-full overflow-hidden bg-custom-black text-custom-white">
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
        <div className="w-[61.5rem] mx-auto grid grid-cols-2 gap-48  mb-20">
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
      <div
        className={`fixed bottom-7 left-1/2 -translate-x-1/2 bg-neutral-700 backdrop-blur px-3 py-3 rounded-full cursor-pointer z-[60] pointer-events-auto opacity-0 ${
          isDeeperLookVisible ? "" : "hidden"
        }`}
        id="control-deeper-look"
      >
        <div className="flex items-center justify-center gap-4">
          <p className="text-custom-white-100 text-[16px] font-semibold">Go Deeper on Camera Control</p>
          <span className="text-custom-white-100 w-8 h-8 bg-custom-blue-100 rounded-full ">{rightArrowIcon()} </span>
        </div>
      </div>
    </section>
  );
}

export default CameraControl;

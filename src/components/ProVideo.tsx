import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { audioMixImg, dolbyVisionVideo, iphoneBlackFrameImg } from "../utils";
import { audioModes } from "../constants";
import { rightArrowIcon } from "../icons";

gsap.registerPlugin(ScrollTrigger);

export default function ProVideo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const phoneWrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const altVideoTextRef = useRef<HTMLDivElement>(null);
  const [isDeeperLookVisible, setIsDeeperLookVisible] = useState(false);
  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=200%",
          scrub: true,
          pin: true,
        }
      });

      // Background filter disappears
      tl.to(
        videoRef.current,
        {
          opacity: 1,
          duration: 0.1,
          ease: "power2.inOut",
          force3D: true
        },
        0.04
      );

      // Text moves up and fades out
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

      // Phone wrapper zooms out from 1.8 to 0.75
      tl.to(
        phoneWrapRef.current,
        {
          scale: 0.75,
          scrub: true,
          force3D: true
        },
        0.3
      );

      // Alt video text appears
      tl.to(
        altVideoTextRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.inOut",
          force3D: true
        },
        0.4
      );
    },
    { scope: containerRef }
  );

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: "#pro-video-container",
      start: "top bottom",
      end: "bottom bottom",
      onEnter: () => {
        // Kill any existing animations first
        gsap.killTweensOf("#pro-deeper-look");
        gsap.killTweensOf("#media-player");
        gsap.killTweensOf("#model-picker");
        gsap.killTweensOf("#control-deeper-look");
        gsap.killTweensOf("#telephoto-deeper-look");
        
        // Set visibility state
        setIsDeeperLookVisible(true);
        
        // Immediately hide all other buttons when pro video button becomes active
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
        gsap.set("#telephoto-deeper-look", {
          zIndex: 40,
          opacity: 0,
          scale: 0.9,
          y: 0
        });
        
        // Set z-index immediately for pro video button
        gsap.set("#pro-deeper-look", { zIndex: 60 });
        
        // Animate only opacity and transform for pro video button
        gsap.to("#pro-deeper-look", {
          opacity: 0.8,
          duration: 0.5,
          delay: 0,
          y: -20,
          ease: "power2.inOut",
          scale: 1.1
        });
      },
      onLeave: () => {
        gsap.killTweensOf("#pro-deeper-look");
        gsap.set("#pro-deeper-look", { zIndex: 50 });
        
        // Set visibility state
        setIsDeeperLookVisible(false);
        
        // Hide immediately, no animation delay
        gsap.set("#pro-deeper-look", {
          opacity: 0,
          scale: 0.9,
          y: 0
        });
      },
      onLeaveBack: () => {
        gsap.killTweensOf("#pro-deeper-look");
        gsap.set("#pro-deeper-look", { zIndex: 50 });
        
        // Set visibility state
        setIsDeeperLookVisible(false);
        
        // Hide immediately
        gsap.set("#pro-deeper-look", {
          opacity: 0,
          scale: 0.9,
          y: 0
        });
      },
      onEnterBack: () => {
        // Kill any existing animations first
        gsap.killTweensOf("#pro-deeper-look");
        gsap.killTweensOf("#media-player");
        gsap.killTweensOf("#model-picker");
        gsap.killTweensOf("#control-deeper-look");
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
        gsap.set("#control-deeper-look", {
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
        gsap.set("#pro-deeper-look", { zIndex: 60 });
        
        gsap.to("#pro-deeper-look", {
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

  return (
    <section id="pro-video-container" className="w-full overflow-hidden bg-custom-black">
      <div
        ref={containerRef}
        className="relative h-screen w-full overflow-hidden bg-custom-black"
        style={{ willChange: "transform" }}
      >
        {/* Big text overlay */}
        <div
          className="absolute inset-0 z-30 flex items-center justify-center text-white "
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

        {/* Phone + Video wrapper - starts zoomed in at 1.2, then shrinks to 0.6 */}
        <div
          ref={phoneWrapRef}
          className=" h-full w-full scale-[1.2] "
          style={{
            // transform: "translate(-50%, -50%) scale(1.2)",
            // transformOrigin: "50% 50%",
            // willChange: "transform"
          }}
        >
          {/* Video */}
          <div className="absolute inset-2 rounded-[152px] overflow-hidden">
            <video
              ref={videoRef}
              src={dolbyVisionVideo}
              autoPlay
              muted
              playsInline
              preload="auto"
              className="absolute inset-0 h-full w-full object-cover background-custom-gray-300 opacity-60"
              style={{ willChange: "opacity" }}
            />
          </div>

          {/* iPhone frame */}
          <img
            src={iphoneBlackFrameImg}
            alt=""
            className="pointer-events-none absolute inset-0 z-10 h-full w-full"
            style={{ willChange: "transform" }}
          />
        </div>
        <p
          className="text-custom-gray-200 absolute bottom-8 left-1/2 -translate-x-1/2 translate-y-10 text-[14px] font-semibold opacity-0"
          ref={altVideoTextRef}
          style={{ willChange: "transform, opacity" }}
        >
          A herd of Icelandic horses, captured in stunning 4K 120 fps Dolby
          Vision
        </p>
      </div>

      <div className="w-full h-full my-16">
        <div className="w-[61.5rem] mx-auto grid grid-cols-2 gap-28 text-[21px] font-semibold mb-20">
          <p className="text-custom-gray-200">
            iPhone 16 Pro takes video capture to a whole new level with{" "}
            <span className="text-custom-white-100">
              4K 120 fps Dolby Vision{" "}
            </span>{" "}
            — our highest resolution and frame rate combo yet. Enabled by the
            new 48MP Fusion camera with second-generation quad-pixel sensor and
            our powerful A18 Pro chip, iPhone 16 Pro lets you record 4K 120 fps
            Dolby Vision in video mode or slo-mo.
          </p>

          <div className="w-full h-full flex flex-col ">
            <p className="text-custom-gray-200 text-[40px] leading-[1.1]">
              <span className=" text-custom-white-100">Stunning </span>{" "}
              high-quality video
            </p>{" "}
          </div>
        </div>

        <div className="w-[61.5rem] mx-auto  grid grid-cols-2 gap-28 text-[21px] font-semibold ">
          <p className="text-custom-gray-200">
            And now you can{" "}
            <span className=" text-custom-white-100">
              adjust the playback speed after capture
            </span>{" "}
            in the redesigned Photos app, giving you greater editing
            capabilities. To add a dreamy quality to your shot, try out the new
            half-speed option. Or for a cinematic effect, slow it right down to
            24 fps playback.
          </p>

          <div className="w-full h-full flex flex-col ">
            <p className="text-custom-gray-200 ">
              iPhone 16 Pro also provides{" "}
              <span className=" text-custom-white-100">
                a big leap in audio performance
              </span>{" "}
              with four studio-quality mics for higher-quality recording. They
              provide a lower noise floor so you get more true-to-life sounds.
              New Spatial Audio capture makes your videos sound more immersive
              when listening with AirPods. And thanks to wind noise reduction,
              the audio quality is even clearer.
            </p>{" "}
          </div>
        </div>
      </div>
      <div className="w-[87.5%] mx-auto px-24 text-center flex flex-col gap-16 items-center mt-32 mb-16">
        <div className="w-full h-full flex flex-col">
          <h1 className="text-[64px] leading-[1.1] font-semibold text-custom-white opacity-100">
            Audio Mix.
          </h1>
          <h1 className="text-[64px] leading-[1.1] font-semibold text-custom-white opacity-100 mb-16">
            Make your voice heard.
          </h1>
          <p className="text-custom-gray-200 text-[21px] font-semibold px-38">
            Powered by advanced intelligence and Spatial Audio capture, Audio
            Mix lets you{" "}
            <span className=" text-custom-white-100">
              adjust the way voices sound in your videos
            </span>{" "}
            using three different voice options. Want to decrease background
            sound? Or just focus on the voices that are in frame? Simply select
            the mix and adjust intensity to get the sound you want after video
            capture.
          </p>
        </div>
      </div>
      <div className="w-[87.5%] mx-auto">
        <img
          src={audioMixImg}
          alt=""
          className="w-full h-full object-cover scale-84"
        />
      </div>
      <div className="w-[87.5%] px-24 mx-auto mb-64">
        <div className="grid grid-cols-3  gap-12">
          {audioModes.map((mode, index) => (
            <div key={index} className="flex flex-col">
              <h3 className="text-2xl font-semibold text-custom-white pb-4 border-b border-gray-600 mb-6">
                {mode.title}
              </h3>

              <p className="text-base text-custom-gray-200 leading-relaxed">
                {mode.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div
        className={`fixed bottom-7 left-1/2 -translate-x-1/2 bg-neutral-700 backdrop-blur px-3 py-3 rounded-full cursor-pointer z-[60] pointer-events-auto opacity-0 ${
          isDeeperLookVisible ? "" : "hidden"
        }`}
        id="pro-deeper-look"
      >
        <div className="flex items-center justify-center gap-4">
          <p className="text-custom-white-100 text-[16px] font-semibold">Nerd out on Pro Video</p>
          <span className="text-custom-white-100 w-8 h-8 bg-custom-blue-100 rounded-full ">{rightArrowIcon()} </span>
        </div>
      </div>
    </section>
  );
}

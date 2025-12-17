import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { audioMixImg, dolbyVisionVideo, iphoneBlackFrameImg } from "../utils";
import { audioModes } from "../constants";

gsap.registerPlugin(ScrollTrigger);

export default function ProVideo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const phoneWrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const altVideoTextRef = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=200%",
          scrub: true,
          pin: true
          // markers: true,
        }
      });

      // Background filter disappears IMMEDIATELY (instant)
      tl.to(
        videoRef.current,
        {
          opacity: 1,
          duration: 0.1,
          ease: "power2.inOut"
        },
        0.04 // start at the very beginning
      );

      // Text moves up and fades out (slower, happens after)
      tl.to(
        textRef.current,
        {
          yPercent: -200,
          opacity: 0,
          duration: 0.1,
          ease: "power2.inOut"
        },
        0.04 // starts slightly after background disappears
      );

      // Phone wrapper zooms out from 1.8 to 0.6
      tl.to(
        phoneWrapRef.current,
        {
          scale: 0.75,
          scrub: true
        },
        0.3
      );

      tl.to(
        altVideoTextRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.inOut"
        },
        0.4
      );
    },
    { scope: containerRef }
  );

  return (
    <section className="w-full overflow-hidden bg-custom-black">
      <div
        ref={containerRef}
        className="relative h-screen w-full overflow-hidden bg-custom-black"
      >
        {/* Big text overlay */}
        <div
          className="absolute inset-0 z-30 flex items-center justify-center text-white "
          ref={textContainerRef}
        >
          <div
            className="text-[80px] tracking-tighter font-semibold flex flex-col gap-0 text-center leading-[1.1]"
            ref={textRef}
          >
            <h1>4K 120 fps Dolby Vision.</h1>
            <h1>Cinemasterful.</h1>
          </div>
        </div>

        {/* Phone + Video wrapper - starts zoomed in at 1.8, then shrinks to 0.6 */}

        <div
          ref={phoneWrapRef}
          className="relative absolute left-1/2 top-1/2 h-full w-full "
          style={{
            transform: "translate(-50%, -50%) scale(1.20)",
            transformOrigin: "50% 50%"
          }}
        >
          {/* Video */}
          <video
            ref={videoRef}
            src={dolbyVisionVideo}
            autoPlay
            muted
            playsInline
            className="absolute inset-0 h-full w-full rounded-[7rem] object-cover scale-98 background-custom-gray-300 opacity-60"
          />

          {/* iPhone frame */}
          <img
            src={iphoneBlackFrameImg}
            alt=""
            className="pointer-events-none absolute inset-0 z-10 h-full w-full"
          />
        </div>
        <p
          className="text-custom-gray-200 absolute bottom-8 left-1/2 -translate-x-1/2 translate-y-10 text-[14px] font-semibold opacity-0"
          ref={altVideoTextRef}
        >
          A herd of Icelandic horses, captured in stunning 4K 120 fps Dolby
          Vision
        </p>
      </div>

      <div className="w-full h-full my-16">
        <div className="w-[87.5%] mx-auto px-24 grid grid-cols-2 gap-28 text-[21px] font-semibold mb-20">
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

        <div className="w-[87.5%] mx-auto px-24 grid grid-cols-2 gap-28 text-[21px] font-semibold ">
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
        {/* Grid with 3 columns on desktop, 1 on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {audioModes.map((mode, index) => (
            <div key={index} className="flex flex-col">
              {/* Title with bottom border */}
              <h3 className="text-xl md:text-2xl font-semibold text-white pb-4 border-b border-gray-600 mb-6">
                {mode.title}
              </h3>

              {/* Description */}
              <p className="text-sm md:text-base text-gray-400 leading-relaxed">
                {mode.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

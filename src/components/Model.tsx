// Model.tsx
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import React, { useEffect, useRef, useState } from "react";
import ModelView from "./ModelView";
import { yellowImg } from "../utils";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { View } from "@react-three/drei";
import { models, sizes } from "../constants";
import { animateWithGsapTimeline } from "../utils/animations";

gsap.registerPlugin(ScrollTrigger);

function Model() {
  const [size, setSize] = useState("small");
  const [model, setModel] = useState({
    title: `iPhone 16 Pro in Natural Titanium`,
    color: ["#8F8A81", "#FFE7B9", "#6F6C64"],
    img: yellowImg
  });
  
  const [isModelPickerVisible, setIsModelPickerVisible] = useState(false);
  
  const cameraControlSmall = useRef();
  const cameraControlLarge = useRef();
  const small = useRef(new THREE.Group());
  const large = useRef(new THREE.Group());
  const [smallRotation, setSmallRotation] = useState(0);
  const [largeRotation, setLargeRotation] = useState(0);

  const tl = gsap.timeline();

  useEffect(() => {
    console.log(size);
    if (size === "large") {
      animateWithGsapTimeline(tl, small, smallRotation, "#view1", "#view2", {
        transform: "translateX(-100%)",
        duration: 2
      });
    }

    if (size === "small") {
      animateWithGsapTimeline(tl, large, largeRotation, "#view2", "#view1", {
        transform: "translateX(0)",
        duration: 2
      });
    }
  }, [size]);

  useGSAP(() => {
    gsap.to("#model-title", {
      opacity: 1,
      duration: 1,
      y: 0,
      delay: 0.5,
      scrollTrigger: {
        trigger: "#model-title",
        start: "top 110%",
        toggleActions: "play none none none"
      }
    });
  }, []);

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: "#model-container",
      start: "15% bottom",
      end: "bottom center",
      onEnter: () => {
        // Kill any existing animations first
        gsap.killTweensOf("#model-picker");
        gsap.killTweensOf("#media-player");
        
        // Set visibility state
        setIsModelPickerVisible(true);
        
        // Immediately hide the media player when model picker becomes active
        gsap.set("#media-player", { 
          zIndex: 40, 
          opacity: 0,
          scale: 0.9,
          y: 0
        });
        
        // Set z-index immediately for model picker
        gsap.set("#model-picker", { zIndex: 60 });
        
        // Animate only opacity and transform for model picker
        gsap.to("#model-picker", {
          opacity: 0.8,
          duration: 0.5,
          delay: 0,
          y: -20,
          ease: "power2.inOut",
          scale: 1.1
        });
      },
      onLeave: () => {
        gsap.killTweensOf("#model-picker");
        gsap.set("#model-picker", { zIndex: 10 });
        
        // Set visibility state
        setIsModelPickerVisible(false);
        
        // Hide immediately, no animation delay
        gsap.set("#model-picker", { 
          opacity: 0,
          scale: 0.9,
          y: 0
        });
      },
      onLeaveBack: () => {
        gsap.killTweensOf("#model-picker");
        gsap.set("#model-picker", { zIndex: 10 });
        
        // Set visibility state
        setIsModelPickerVisible(false);
        
        // Hide immediately
        gsap.set("#model-picker", { 
          opacity: 0,
          scale: 0.9,
          y: 0
        });
      },
      onEnterBack: () => {
        // Kill any existing animations first
        gsap.killTweensOf("#model-picker");
        gsap.killTweensOf("#media-player");
        
        // Set visibility state
        setIsModelPickerVisible(true);
        
        // Immediately hide the media player
        gsap.set("#media-player", { 
          zIndex: 40, 
          opacity: 0,
          scale: 0.9,
          y: 0
        });
        
        // Set z-index immediately
        gsap.set("#model-picker", { zIndex: 60 });
        
        gsap.to("#model-picker", {
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
    <section className="w-full overflow-hidden bg-custom-black py-40 text-custom-white">
      <div>
        <div className="">
          <h1
            id="model-title"
            className="text-custom-white text-[56px] font-semibold translate-y-14 pb-20 leading-[1.1] w-[87.5%] mx-auto"
          >
            Take a closer look.
          </h1>

          <div
            className="flex flex-col items-center mt-5 w-full"
            id="model-container"
          >
            <div className="w-full h-[75vh] md:h-[90vh] overflow-hidden relative">
              {/* Model Picker UI */}
              <div
                className={`fixed bottom-7 left-1/2 -translate-x-1/2 w-full max-w-sm z-[60] pointer-events-auto opacity-0 ${isModelPickerVisible ? '' : 'hidden'}`}
                id="model-picker"
              >
                <p className="text-xs font-semibold leading-4 text-center mb-5">
                  {`${size === "small" ? sizes[0].label : sizes[1].label} ${
                    model.title
                  }`}
                </p>
                <div className="flex items-center justify-center">
                  <ul className="color-container flex items-center gap-4 justify-center py-3 px-3 bg-neutral-700 rounded-full backdrop-blur h-15">
                    {models.map((item, i) => (
                      <div
                        key={i}
                        className="rounded-full bg-transparent border-b border-b-white"
                      >
                        <li
                          className={`w-7 h-7 rounded-full m-0 cursor-pointer ${model.color === item.color ? "ring-2 ring-white ring-offset-2 ring-offset-black" : ""}`}
                          style={{ backgroundColor: item.color[0] }}
                          onClick={() => setModel(item)}
                        />
                      </div>
                    ))}
                  </ul>

                  <button className="flex items-center justify-center p-1 rounded-full bg-neutral-700 backdrop-blur ml-3 gap-1">
                    {sizes.map(({ label, value }) => (
                      <span
                        key={label}
                        className="w-12 h-12 text-[16px] font-semibold leading-[21px] flex items-center justify-center bg-custom-white text-custom-black rounded-full transition-all duration-300 cursor-pointer"
                        style={{
                          backgroundColor:
                            size === value ? "white" : "transparent",
                          color: size === value ? "black" : "white"
                        }}
                        onClick={() => setSize(value)}
                      >
                        {label}
                      </span>
                    ))}
                  </button>
                </div>
              </div>

              {/* Model Views */}
              <ModelView
                index={1}
                groupRef={small}
                gsapType="view1"
                controlRef={cameraControlSmall}
                setRotationState={setSmallRotation}
                item={model}
                size={size}
              />

              <ModelView
                index={2}
                groupRef={large}
                gsapType="view2"
                controlRef={cameraControlLarge}
                setRotationState={setLargeRotation}
                item={model}
                size={size}
              />

              {/* Fixed Canvas Overlay - MOVED OUTSIDE AND FIXED POSITIONING */}
              <Canvas
                className="w-full h-full"
                style={{
                  position: "fixed",
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                  pointerEvents: "none",
                  zIndex: 1  // Explicitly below both pickers
                }}
                eventSource={document.getElementById("root")}
                eventPrefix="client"
              >
                <View.Port />
              </Canvas>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Model;
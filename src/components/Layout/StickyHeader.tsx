import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function StickyHeader() {
  const headerRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: "#hero-section",
      start: "bottom top",
      onEnter: () => {
        setIsVisible(true);
        gsap.to(headerRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out"
        });
      },
      onLeaveBack: () => {
        setIsVisible(false);
        gsap.to(headerRef.current, {
          opacity: 0,
          y: -20,
          duration: 0.3,
          ease: "power2.in"
        });
      }
    });
  }, []);

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-xl text-custom-white-100 max-h-11 flex items-center px-8 opacity-0 py-6 border-b border-custom-gray-100/30 border-solid ${
        isVisible ? "" : "pointer-events-none"
      }`}
    >
        
      <p className="text-[21px] font-semibold w-[87.5%] px-24 mx-auto">iPhone 16 Pro</p>
    </header>
  );
}

export default StickyHeader;


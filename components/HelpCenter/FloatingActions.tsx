"use client";

import { QrCode, Phone, ArrowUp } from "lucide-react";
import { useState, useEffect } from "react";

export default function FloatingActions() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isPhoneHover, setIsPhoneHover] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="fixed right-6 bottom-10 flex flex-col gap-3 z-40">
      <button className="w-12 h-12 bg-[#2d2d2d] hover:bg-black rounded-full flex items-center justify-center text-white shadow-lg transition-colors cursor-pointer group relative">
        <QrCode className="w-5 h-5" />
        <span className="absolute right-14 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Scan QR Code
        </span>
      </button>
      <div
        className="relative"
        onMouseEnter={() => setIsPhoneHover(true)}
        onMouseLeave={() => setIsPhoneHover(false)}
      >
        <button
          className="w-12 h-12 bg-[#2d2d2d] hover:bg-black rounded-full flex items-center justify-center text-white shadow-lg transition-colors cursor-pointer group relative"
          aria-label="Contact Us"
          type="button"
        >
          <Phone className="w-5 h-5" />
          
        </button>

        <div
          className={`absolute right-[4.75rem] bottom-0 flex items-center gap-8 transition-all duration-200 origin-right ${
            isPhoneHover ? "opacity-100 translate-x-0 scale-100 pointer-events-auto" : "opacity-0 translate-x-4 scale-95 pointer-events-none"
          }`}
        >
          <div className="w-[300px] rounded-xl bg-white text-[#2a2a2a] shadow-[0_10px_25px_rgba(0,0,0,0.15)] border border-black/5 px-4 py-5">
            <p className="text-[20px] leading-tight font-light tracking-[-0.02em] mb-2">
              Customer service hotline:
            </p>
            <p className="text-[24px] leading-tight font-semibold tracking-[-0.03em] mb-5">
              (852) 2153 3838
            </p>
            <div className="text-[14px] leading-[1.2] font-light tracking-[-0.02em]">
              <p>Service Hours:</p>
              <p>Monday to Friday (excluding public holidays)</p>
             
              <div className="mt-4 flex items-center gap-10">
                <span>9:00-12:00</span>
                <span>13:00-18:00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="w-12 h-12 bg-[#2d2d2d] hover:bg-black rounded-full flex items-center justify-center text-white shadow-lg transition-colors cursor-pointer"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}

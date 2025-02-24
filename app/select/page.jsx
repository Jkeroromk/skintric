"use client";

import Link from "next/link";
import React, { useRef, useCallback } from "react";
import Header from "@/components/header";
import { gsap } from "gsap";

const SelectionScreen = () => {
  const diamondRefs = useRef(Array(4).fill(null));

  const handleHover = useCallback((index) => {
    gsap.to(diamondRefs.current[index], {
      opacity: 1,
      scale: 1,
      duration: 0.3,
      stagger: 0.2,
    });
  }, []);

  const handleLeave = useCallback((index) => {
    gsap.to(diamondRefs.current[index], {
      opacity: 0,
      scale: 0.8,
      duration: 0.3,
      stagger: 0.2,
    });
  }, []);

  const handleSelection = useCallback((selectionType) => {
    // Handle selection logic here
    console.log("Selected:", selectionType);
    // If you need to navigate or update state, do it here
  }, []);

  return (
    <>
      <div className="absolute top-10 left-8 text-left mt-5">
        <h1 className="text-normal font-bold">A.I. ANALYSIS</h1>
        <p className="text-xs mt-1 text-muted-foreground">
          A.I. has estimated the following.
          <br />
          Fix estimated information if needed.
        </p>
      </div>

      <div className="h-[80dvh] flex flex-col items-center justify-center bg-white text-black">
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center">
            {[400, 430, 450, 470].map((size, i) => (
              <div
                key={i}
                ref={(el) => (diamondRefs.current[i] = el)}
                className="absolute border-2 border-dotted border-gray-400 transform rotate-45 opacity-0"
                style={{ width: size, height: size }}
              />
            ))}
          </div>

          <div className="relative z-10 grid grid-cols-3 grid-rows-3 gap-[1px]">
            {[
              { position: 1, label: "Demographics", link: "/final" },
              { position: 3, label: "Cosmetic Concerns" },
              { position: 5, label: "Skin Type Details" },
              { position: 7, label: "Weather" },
            ].map((item, index) => (
              <div
                key={item.position}
                className={`flex items-center justify-center ${
                  item.position === 1 ? "col-start-2" : 
                  item.position === 3 ? "row-start-2 col-start-1" :
                  item.position === 5 ? "row-start-2 col-start-3" : 
                  "row-start-3 col-start-2"
                }`}
              >
                {item.link ? (
                  <Link href={item.link}>
                    <button
                      className="w-32 h-32 bg-gray-200 hover:bg-gray-300 rounded transform rotate-45 flex items-center justify-center -m-4"
                      onMouseEnter={() => handleHover(index)}
                      onMouseLeave={() => handleLeave(index)}
                      onClick={() => handleSelection(item.label)}
                    >
                      <span className="transform -rotate-45">{item.label}</span>
                    </button>
                  </Link>
                ) : (
                  <button
                    className="w-32 h-32 bg-gray-100 hover:bg-gray-300 rounded transform rotate-45 flex items-center justify-center -m-4"
                    onMouseEnter={() => handleHover(index)}
                    onMouseLeave={() => handleLeave(index)}
                    onClick={() => handleSelection(item.label)}
                  >
                    <span className="transform -rotate-45">{item.label}</span>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 w-full flex justify-between px-8">
          <Link href="/result">
            <div className="relative w-12 h-12 flex items-center justify-center border border-black rotate-45 cursor-pointer">
              <span className="absolute rotate-[-45deg] text-xs font-semibold">Back</span>
            </div>
          </Link>

          <Link href="/">
            <div className="relative w-12 h-12 flex items-center justify-center border border-black rotate-45 cursor-pointer">
              <span className="absolute rotate-[-45deg] text-xs font-semibold">Home</span>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default SelectionScreen;

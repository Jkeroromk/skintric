"use client";

import React, { useState } from "react";
import Diamond from "@/components/diamond";
import { Button } from "./ui/button";
import Link from "next/link";

const Hero = () => {
  const [hoveredDiamond, setHoveredDiamond] = useState(null);

  const headingShift =
    hoveredDiamond === "left"
      ? "translate-x-[20rem]"
      : hoveredDiamond === "right"
      ? "-translate-x-[20rem]"
      : "translate-x-0";

  return (
    <>
      {/* Wrapper div for scaling on mobile */}
      <div className="max-sm:scale-[0.75] max-sm:origin-center max-sm:p-6">
        <div
          className="
            flex flex-col items-center justify-center h-[71dvh]
            md:fixed md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2
            
          "
        >
          {/* Mobile Diamonds */}
          <div className="absolute inset-0 flex items-center justify-center lg:hidden">
            <Diamond
              className="absolute top-1/2 left-1/2 -translate-x-[52%] -translate-y-1/2 w-[420px] h-[420px]"
              dotted
              borderColorClass="border-black"
            />
            <Diamond
              className="absolute top-1/2 left-1/2 -translate-x-[52%] -translate-y-1/2 w-[280px] h-[280px]"
              dotted
              borderColorClass="border-black"
            />
          </div>

          {/* Heading (centered, shifts via transform) */}
          <div
            className={`
              relative z-10 text-center transition-transform duration-700 ease-in-out ${headingShift}
            `}
          >
            <h1 className="text-[60px] lg:text-[100px] font-inter font-normal tracking-tighter leading-none">
              Sophisticated
              <br />
              <span
                className={`
                  block transition-transform duration-700 ease-in-out
                  ${
                    hoveredDiamond === "left"
                      ? "translate-x-[6rem]"
                      : hoveredDiamond === "right"
                      ? "-translate-x-[6rem]"
                      : "translate-x-0"
                  }
                `}
              >
                skincare
              </span>
            </h1>
          </div>

          {/* Mobile text */}
          <p className=" z-10 block lg:hidden w-[30ch] mt-4 text-[16px] font-semibold text-center text-muted-foreground">
            Skinstric developed an A.I. that creates a highly-personalized
            routine tailored to what your skin needs.
          </p>

          {/* Mobile button */}
          <div className=" z-10 mt-4 lg:hidden">
            <Link href="/testing">
              <button className="relative flex items-center gap-4">
                <span className="text-[12px] font-bold">ENTER EXPERIENCE</span>
                <Diamond
                  className="rotate-45"
                  size="w-[24px] h-[24px]"
                  dotted={false}
                />
                <span className="absolute left-[134px] scale-[0.5]">
                  <svg
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    className="fill-current text-black"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </button>
            </Link>
          </div>
        </div>

        {/* Desktop text */}
        <div
          className="
            hidden lg:block fixed bottom-10 left-10
            font-normal text-sm text-black space-y-3
          "
        >
          <p>
            Skinstric developed an A.I. that creates a
            <br />
            highly-personalized routine tailored to
            <br />
            what your skin needs.
          </p>
        </div>

        {/* LEFT Diamond */}
        <div
          className={`
            hidden lg:block absolute top-1/2 left-[-350px] -translate-y-1/2 w-[500px] h-[500px]
            transition-opacity duration-500 ease-in-out
            ${
              hoveredDiamond === "right"
                ? "opacity-0 pointer-events-none"
                : "opacity-100"
            }
          `}
        >
          <div className="relative w-full h-full">
            <Diamond
              className="absolute inset-0"
              size="w-full h-full"
              dotted
              borderColorClass="border-black"
            />
            <Button
              onMouseEnter={() => setHoveredDiamond("left")}
              onMouseLeave={() => setHoveredDiamond(null)}
              className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 px-3 py-1"
              variant="ghost"
            >
              Discover A.I.
              <Diamond
                className="rotate-45"
                size="w-[30px] h-[30px]"
                dotted={false}
              />
              <span className="absolute left-[115px] scale-[0.6]">
                &#x25B6;
              </span>
            </Button>
          </div>
        </div>

        {/* RIGHT Diamond */}
        <div
          className={`
            hidden lg:block absolute top-1/2 right-[-350px] -translate-y-1/2 w-[500px] h-[500px]
            transition-opacity duration-500 ease-in-out
            ${
              hoveredDiamond === "left"
                ? "opacity-0 pointer-events-none"
                : "opacity-100"
            }
          `}
        >
          <div className="relative w-full h-full">
            <Diamond
              className="absolute inset-0"
              size="w-full h-full"
              dotted
              borderColorClass="border-black"
            />
            <Link href="/testing" passHref>
              <Button
                onMouseEnter={() => setHoveredDiamond("right")}
                onMouseLeave={() => setHoveredDiamond(null)}
                className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 px-3 py-1"
                variant="ghost"
              >
                <Diamond
                  className="rotate-45"
                  size="w-[30px] h-[30px]"
                  dotted={false}
                />
                <span className="absolute left-[20px] scale-[0.6] rotate-180">
                  &#x25B6;
                </span>
                Take the Test
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;

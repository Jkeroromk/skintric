"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/header";

const FinalPage = () => {
  const [analysisResult, setAnalysisResult] = useState(null);
  const [activeSection, setActiveSection] = useState("race");

  useEffect(() => {
    const storedResult = localStorage.getItem("analysisResult");
    if (storedResult) {
      try {
        const parsedResult = JSON.parse(storedResult);
        parsedResult.data && setAnalysisResult(parsedResult.data);
      } catch (error) {
        console.error("Error parsing analysis result:", error);
      }
    }
  }, []);

  const getHighestConfidence = (category) => {
    if (!analysisResult) return [["", 0]];
    return Object.entries(analysisResult[category]).reduce((a, b) =>
      a[1] > b[1] ? a : b
    );
  };

  const getSortedConfidenceData = (category) => {
    if (!analysisResult) return [];
    return Object.entries(analysisResult[category]).sort((a, b) => b[1] - a[1]);
  };

  return (
    <div className="h-screen flex flex-col">
      <Header />

      <main className="flex-1 w-full bg-white md:overflow-hidden overflow-auto">
        <div className="h-full max-w-6xl mx-auto px-4 md:px-8 flex flex-col">
          {/* Header Section */}
          <div className="text-start mb-4 md:mb-6">
            <h2 className="text-lg md:text-xl font-bold mb-1">A.I. ANALYSIS</h2>
            <h3 className="text-4xl md:text-6xl font-normal leading-tight">
              DEMOGRAPHICS
            </h3>
            <h4 className="text-sm md:text-base mt-1">PREDICTED RACE & AGE</h4>
          </div>

          {/* Main Content Grid */}
          <div className="flex-1 grid md:grid-cols-[3fr_7fr_5fr] gap-4 md:gap-6 pb-16 md:pb-0">
            {/* Selection Column */}
            <div className="bg-gray-100 p-4 rounded-lg space-y-4">
              {["race", "age", "gender"].map((section) => (
                <div
                  key={section}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    activeSection === section
                      ? "bg-black text-white"
                      : "bg-white"
                  }`}
                  onClick={() => setActiveSection(section)}
                >
                  <h4 className="text-sm font-medium mb-1">
                    {section.toUpperCase()}
                  </h4>
                  {analysisResult ? (
                    <p className="text-xs">
                      {section === "age"
                        ? getHighestConfidence(section)[0]
                        : getHighestConfidence(section)[0].toUpperCase()}
                    </p>
                  ) : (
                    <p className="text-xs">Loading...</p>
                  )}
                </div>
              ))}
            </div>

            {/* Progress Chart */}
            <div className="bg-gray-100 p-4 rounded-lg flex flex-col items-center justify-center">
              {analysisResult ? (
                <>
                  <div className="relative w-full max-w-[300px] aspect-square mb-4">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        className="text-gray-200"
                        stroke="currentColor"
                        strokeWidth="6"
                        fill="transparent"
                      />
                      <circle
                        className="text-black"
                        stroke="currentColor"
                        strokeWidth="6"
                        fill="transparent"
                        strokeLinecap="round"
                        strokeDasharray={`${2 * Math.PI * 40}`}
                        strokeDashoffset={`${
                          2 *
                          Math.PI *
                          40 *
                          (1 - getHighestConfidence(activeSection)[1])
                        }`}
                        transform="rotate(-90 50 50)"
                        cx="50"
                        cy="50"
                        r="40"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <p className="text-3xl md:text-5xl font-bold">
                        {(getHighestConfidence(activeSection)[1] * 100).toFixed(
                          0
                        )}
                        %
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 text-center mb-2">
                    {getHighestConfidence(activeSection)[0].toUpperCase()}
                  </p>
                  <p className="text-xs text-gray-600 text-center">
                    If A.I. estimate is wrong, select the correct one.
                  </p>
                </>
              ) : (
                <p className="text-sm">Loading...</p>
              )}
            </div>

            {/* Confidence Bars */}
            <div className="bg-gray-100 p-4 rounded-lg">
              <div className="space-y-2">
                <h4 className="text-sm font-medium mb-2">A.I. CONFIDENCE</h4>
                {analysisResult ? (
                  getSortedConfidenceData(activeSection).map(([key, value]) => (
                    <div key={key} className="flex items-center gap-2 text-xs">
                      <span className="w-20 truncate">
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-black h-2 rounded-full"
                          style={{ width: `${(value * 100).toFixed(2)}%` }}
                        />
                      </div>
                      <span className="w-8 text-right">
                        {(value * 100).toFixed(1)}%
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-sm">Loading...</p>
                )}
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="border-t pt-4 pb-6 bg-white sticky bottom-20 md:static md:bottom-0 mb-8 md:mb-0">
            <div className="flex justify-between max-w-6xl mx-auto px-4 md:px-8">
              <Link
                href="/select"
                className="rotate-45 hover:bg-gray-100 transition-colors w-10 h-10 flex items-center justify-center border border-black"
              >
                <span className="rotate-[-45deg] text-xs font-semibold">
                  Back
                </span>
              </Link>
              <Link
                href="/"
                className="rotate-45 hover:bg-gray-100 transition-colors w-10 h-10 flex items-center justify-center border border-black"
              >
                <span className="rotate-[-45deg] text-xs font-semibold">
                  Home
                </span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FinalPage;

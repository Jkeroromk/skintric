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
        if (parsedResult.data) {
          setAnalysisResult(parsedResult.data);
        }
      } catch (error) {
        console.error("Error parsing analysis result:", error);
      }
    }
  }, []);

  const getHighestConfidence = (category) => {
    if (!analysisResult) return null;
    return Object.entries(analysisResult[category]).reduce((a, b) =>
      a[1] > b[1] ? a : b
    );
  };

  const getSortedConfidenceData = (category) => {
    if (!analysisResult) return [];
    return Object.entries(analysisResult[category]).sort((a, b) => b[1] - a[1]);
  };

  return (
    <>
      <Header />
      <div className="h-[80vh] flex flex-col items-center justify-center bg-white text-black relative">
        <div className="w-full max-w-6xl px-8">
          {/* Header Section */}
          <div className="flex flex-col align-baseline text-start mb-8">
            <h2 className="text-xl font-bold mb-2 ml-1">A.I. ANALYSIS</h2>
            <h3
              className="text-7xl font-normal mb-2"
              style={{
                fontFamily: "Roobert TRIAL",
                fontWeight: 400,
                lineHeight: "64px",
                letterSpacing: "-6%",
              }}
            >
              DEMOGRAPHICS
            </h3>
            <h4 className="ml-1">PREDICTED RACE & AGE</h4>
          </div>

          {/* Three Column Layout */}
          <div className="grid grid-cols-[3fr_7fr_5fr] gap-8">
            {/* Left Column - Selection Buttons */}
            <div className="bg-gray-100 p-6 rounded-lg space-y-6">
              <div
                className={`p-4 rounded-lg cursor-pointer ${
                  activeSection === "race" ? "bg-black text-white" : "bg-white"
                }`}
                onClick={() => setActiveSection("race")}
              >
                <h4 className="text-md font-medium mb-2">RACE</h4>
                {analysisResult ? (
                  <p className="text-sm">
                    {getHighestConfidence("race")[0].toUpperCase()}
                  </p>
                ) : (
                  <p className="text-sm">Loading...</p>
                )}
              </div>

              <div
                className={`p-4 rounded-lg cursor-pointer ${
                  activeSection === "age" ? "bg-black text-white" : "bg-white"
                }`}
                onClick={() => setActiveSection("age")}
              >
                <h4 className="text-md font-medium mb-2">AGE</h4>
                {analysisResult ? (
                  <p className="text-sm">{getHighestConfidence("age")[0]}</p>
                ) : (
                  <p className="text-sm">Loading...</p>
                )}
              </div>

              <div
                className={`p-4 rounded-lg cursor-pointer ${
                  activeSection === "gender"
                    ? "bg-black text-white"
                    : "bg-white"
                }`}
                onClick={() => setActiveSection("gender")}
              >
                <h4 className="text-md font-medium mb-2">SEX</h4>
                {analysisResult ? (
                  <p className="text-sm">
                    {getHighestConfidence("gender")[0].toUpperCase()}
                  </p>
                ) : (
                  <p className="text-sm">Loading...</p>
                )}
              </div>
            </div>

            <div className="bg-gray-100 p-6 rounded-lg flex flex-col justify-center">
              <div className="flex items-center justify-center h-full">
                {analysisResult ? (
                  <div className="text-center">
                    <div className="relative w-60 h-60 mx-auto mb-4">
                      {/* Circular Progress Background */}
                      <div className="absolute inset-0">
                        <svg className="w-full h-full" viewBox="0 0 100 100">
                          <circle
                            cx="50"
                            cy="50"
                            r="40"
                            className="text-gray-200"
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="transparent"
                          />
                        </svg>
                      </div>

                      {/* Progress Circle */}
                      <div className="absolute inset-0">
                        <svg
                          className="w-full h-full transform -rotate-90"
                          viewBox="0 0 100 100"
                        >
                          <circle
                            cx="50"
                            cy="50"
                            r="40"
                            className="text-black"
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="transparent"
                            strokeLinecap="round"
                            strokeDasharray={`${2 * Math.PI * 40}`}
                            strokeDashoffset={`${
                              2 *
                              Math.PI *
                              40 *
                              (1 - getHighestConfidence(activeSection)[1])
                            }`}
                          />
                        </svg>
                      </div>

                      {/* Percentage Text */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <p className="text-6xl font-bold">
                          {(
                            getHighestConfidence(activeSection)[1] * 100
                          ).toFixed(0)}
                          %
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      {getHighestConfidence(activeSection)[0].toUpperCase()}
                    </p>
                  </div>
                ) : (
                  <p className="text-sm">Loading...</p>
                )}
              </div>
              <p className="text-sm text-gray-600 mt-4 text-center">
                If A.I. estimate is wrong, select the correct one.
              </p>
            </div>

            {/* Right Column - Confidence Bars */}
            <div className="bg-gray-100 p-6 rounded-lg">
              <div className="space-y-2">
                <h4 className="text-md font-medium mb-2">A.I. CONFIDENCE</h4>
                {analysisResult ? (
                  getSortedConfidenceData(activeSection).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex items-center justify-between gap-4"
                    >
                      <span className="text-sm w-32">
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </span>
                      <div className="flex-1 max-w-[480px]">
                        <div className="bg-gray-200 rounded-full h-2.5 w-full">
                          <div
                            className="bg-black h-2.5 rounded-full"
                            style={{ width: `${(value * 100).toFixed(2)}%` }}
                          ></div>
                        </div>
                      </div>
                      <span className="text-sm w-16 text-right">
                        {(value * 100).toFixed(2)}%
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-sm">Loading...</p>
                )}
              </div>
            </div>
          </div>

          <div className="fixed bottom-10 left-4 right-4">
            <div className="mx-auto max-w-6xl px-4">
              {" "}
              {/* Added container with max-width */}
              <div className="flex justify-between w-full">
                <Link href="/select">
                  <div className="relative w-12 h-12 flex items-center justify-center border border-black rotate-45 hover:bg-gray-100 transition-colors">
                    <span className="absolute rotate-[-45deg] text-xs font-semibold">
                      Back
                    </span>
                  </div>
                </Link>

                <Link href="/">
                  <div className="relative w-12 h-12 flex items-center justify-center border border-black rotate-45 hover:bg-gray-100 transition-colors">
                    <span className="absolute rotate-[-45deg] text-xs font-semibold">
                      Home
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FinalPage;

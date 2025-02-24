"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { Camera, Image as ImageIcon } from "lucide-react";
import Diamond from "@/components/diamond";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";

const continuousRotation = (target, duration) => {
  gsap.to(target, {
    rotation: "+=360",
    duration: duration,
    repeat: -1,
    ease: "linear",
    transformOrigin: "50% 50%",
    onUpdate: () => {
      const currentRotation = gsap.getProperty(target, "rotation");
      gsap.set(target, { rotation: currentRotation % 360 });
    },
  });
};

const Result = () => {
  const router = useRouter();
  const fileInputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [apiProgress, setApiProgress] = useState(0);
  const [apiMessage, setApiMessage] = useState("");

  const outerDiamondRefCamera = useRef(null);
  const midDiamondRefCamera = useRef(null);
  const innerDiamondRefCamera = useRef(null);
  const outerDiamondRefGallery = useRef(null);
  const midDiamondRefGallery = useRef(null);
  const innerDiamondRefGallery = useRef(null);

  useEffect(() => {
    const storedImage = localStorage.getItem("capturedImage");
    if (storedImage) {
      setPreviewImage(storedImage);
    } else {
      setPreviewImage(null);
    }

    if (outerDiamondRefCamera.current) {
      continuousRotation(outerDiamondRefCamera.current, 5);
    }
    if (midDiamondRefCamera.current) {
      continuousRotation(midDiamondRefCamera.current, 5.25);
    }
    if (innerDiamondRefCamera.current) {
      continuousRotation(innerDiamondRefCamera.current, 5.5);
    }
    if (outerDiamondRefGallery.current) {
      continuousRotation(outerDiamondRefGallery.current, 5);
    }
    if (midDiamondRefGallery.current) {
      continuousRotation(midDiamondRefGallery.current, 5.25);
    }
    if (innerDiamondRefGallery.current) {
      continuousRotation(innerDiamondRefGallery.current, 5.5);
    }

    return () => {
      setPreviewImage(null);
    };
  }, []);

  const handleCameraAccess = () => {
    router.push("/scan");
  };

  const handleGalleryUpload = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setPreviewImage(base64String);
        localStorage.setItem("capturedImage", base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const LoadingOverlay = () => (
    <div className="fixed inset-0 bg-white bg-opacity-90 flex flex-col justify-center items-center z-50">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      {apiMessage && <p className="mt-4 text-lg font-medium">{apiMessage}</p>}
      {apiProgress > 0 && <p className="mt-2 text-sm">Progress: {apiProgress}%</p>}
    </div>
  );

  const handleProcessImage = async () => {
    if (!previewImage) return;

    setIsLoading(true);
    setApiMessage("Starting image processing...");
    setApiProgress(0);

    try {
      const response = await fetch(
        "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseTwo",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: previewImage }),
        }
      );

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const result = await response.json();
      localStorage.setItem("analysisResult", JSON.stringify(result));

      setApiMessage("Processing complete!");
      await new Promise((resolve) => setTimeout(resolve, 1000));

      router.push("/select");
    } catch (error) {
      console.error("Error processing image:", error);
      setApiMessage("An error occurred during processing.");
    } finally {
      setIsLoading(false);
      setApiProgress(0);
      setApiMessage("");
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col bg-white relative md:pt-[64px]">
        {isLoading && <LoadingOverlay />}
        
        {/* Instruction Text */}
        <div className="absolute top-2 left-9 md:left-8 text-left">
          <p className="text-black font-semibold text-xs md:text-sm">TO START ANALYSIS</p>
        </div>

        {/* Main Content Container */}
        <div className="flex-1 flex flex-col md:flex-row items-center justify-center relative mb-32 md:mb-60 space-y-16 md:space-y-0">
          {/* Camera Section */}
          <div
            className="relative md:absolute md:left-[40%] md:-translate-x-full flex flex-col items-center cursor-pointer"
            onClick={handleCameraAccess}
          >
            {/* Diamond Components */}
            <Diamond
              ref={outerDiamondRefCamera}
              className="w-[160px] h-[160px] md:w-[300px] md:h-[300px] rotate-45 border-gray-800"
              dotted borderColorClass="border-gray-800"
            />
            <Diamond
              ref={midDiamondRefCamera}
              className="w-[150px] h-[150px] md:w-[290px] md:h-[290px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45 border-gray-800"
              dotted borderColorClass="border-gray-800"
            />
            <Diamond
              ref={innerDiamondRefCamera}
              className="w-[140px] h-[140px] md:w-[280px] md:h-[280px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45 border-gray-800"
              dotted borderColorClass="border-gray-800"
            />
            
            {/* Camera Icon and Label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <Camera className="w-8 h-8 md:w-12 md:h-12" />
              <div className="absolute top-[55%] right-[-60px] md:right-[-90px] translate-y-[-20px]">
                <div className="w-[50px] md:w-[80px] h-px bg-black" />
                <p className="text-[8px] md:text-[10px] font-semibold mt-1 leading-tight">
                  ALLOW A.I.<br />TO SCAN YOUR FACE
                </p>
              </div>
            </div>
          </div>

          {/* Gallery Section */}
          <div
            className="relative md:absolute md:left-[60%] flex flex-col items-center cursor-pointer mt-12 md:mt-0"
            onClick={handleGalleryUpload}
          >
            {/* Diamond Components */}
            <Diamond
              ref={outerDiamondRefGallery}
              className="w-[160px] h-[160px] md:w-[300px] md:h-[300px] rotate-45 border-gray-800"
              dotted borderColorClass="border-gray-800"
            />
            <Diamond
              ref={midDiamondRefGallery}
              className="w-[150px] h-[150px] md:w-[290px] md:h-[290px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45 border-gray-800"
              dotted borderColorClass="border-gray-800"
            />
            <Diamond
              ref={innerDiamondRefGallery}
              className="w-[140px] h-[140px] md:w-[280px] md:h-[280px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45 border-gray-800"
              dotted borderColorClass="border-gray-800"
            />
            
            {/* Gallery Icon and Label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <ImageIcon className="w-8 h-8 md:w-12 md:h-12" />
              <div className="absolute top-[55%] left-[-60px] md:left-[-90px] translate-y-[20px]">
                <div className="w-[50px] md:w-[80px] h-px bg-black" />
                <p className="text-[8px] md:text-[10px] font-semibold mt-1 leading-tight">
                  ALLOW A.I.<br />ACCESS GALLERY
                </p>
              </div>
            </div>
          </div>

          {/* Hidden File Input */}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
        </div>

        {/* Preview Image Section */}
        {previewImage && (
          <div className="absolute top-4 right-4 md:top-0 md:right-8">
            <h1 className="text-xs md:text-sm font-extrabold mb-1">Preview</h1>
            <div className="w-24 h-24 md:w-32 md:h-32 border rounded overflow-hidden">
              <img
                src={previewImage}
                alt="Preview"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="absolute bottom-48 md:bottom-28  left-6 md:left-8">
          <div className="relative w-10 h-10 md:w-12 md:h-12 flex items-center justify-center border border-black rotate-45">
            <span className="absolute rotate-[-45deg] text-xs font-semibold">
              BACK
            </span>
            <Link href="/" className="absolute inset-0" aria-label="Back" />
          </div>
        </div>

        {/* Process Button */}
        {previewImage && (
          <div className="absolute bottom-48 md:bottom-28  right-6 md:right-8">
            <div 
              className="relative w-10 h-10 md:w-12 md:h-12 flex items-center justify-center border border-black rotate-45 cursor-pointer "
              onClick={handleProcessImage}
            >
              <span className="absolute rotate-[-45deg] text-xs scale-[0.7] md:scale-[0.8] font-semibold">
                PROCESS
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Result;

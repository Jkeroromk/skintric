"use client";

import React, { useState } from "react";
import Link from "next/link";
import Diamond from "@/components/diamond";
import Headers from "@/components/header";
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import {
  ToastProvider,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastViewport,
} from "@/components/ui/toast";
import Backbutton from "../../components/backButton";

const Testing = () => {
  const [step, setStep] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [userData, setUserData] = useState({
    username: "",
    country: "",
    location: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [toast, setToast] = useState(null);

  const handleSubmit = async (locationInput) => {
    setLoading(true);
    try {
      await addDoc(collection(db, "users"), {
        username: userData.username,
        country: userData.country,
        location: locationInput, // ✅ Use the input directly
        createdAt: new Date(),
      });

      setSubmitted(true);
      setToast({
        title: "Success",
        description: "Your information has been submitted successfully!",
      });
    } catch (error) {
      console.error("Error adding document: ", error);
      setToast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      if (step === 0) {
        setUserData({ ...userData, username: inputValue });
        setInputValue("");
        setStep(1);
      } else if (step === 1) {
        setUserData({ ...userData, country: inputValue });
        setInputValue("");
        setStep(2);
      } else if (step === 2) {
        setUserData({ ...userData, location: inputValue });
        handleSubmit(inputValue);
      }
    }
  };

  return (
    <ToastProvider>
      <Headers />
      <div className="min-h-screen flex flex-col items-center justify-center bg-white text-center">
        {/* Top Left Text */}
        <div className="absolute top-16 left-9 text-left">
          <p className="text-black font-semibold text-xs">TO START ANALYSIS</p>
        </div>

        {/* Centered Content */}
        <div className="relative flex flex-col items-center justify-center mb-40">
          {submitted ? (
            <>
              <h1 className="text-3xl font-semibold">
                Thank you for submitting!
              </h1>
              <h2 className="mt-1 font-semibold">
                Ready for the result? Process for the next Step
              </h2>
            </>
          ) : (
            <>
              <p className="text-[10px] text-gray-400 tracking-wider uppercase mb-1">
                CLICK TO TYPE
              </p>
              {step <= 2 && (
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyPress}
                  className="text-3xl font-semibold text-center bg-transparent border-b border-black focus:outline-none appearance-none w-[300px] leading-none pt-1"
                  placeholder={
                    step === 0
                      ? "Introduce Yourself"
                      : step === 1
                      ? "Where are you from?"
                      : "Where do you live?"
                  }
                  autoFocus
                />
              )}
            </>
          )}
        </div>

        {/* Back Button */}
        <Backbutton/>

        {/* Process Button */}
        {submitted && (
          <div className="absolute bottom-10 right-8 flex items-center gap-1">
            <div className="relative w-12 h-12 right-4 flex items-center justify-center border border-black rotate-45 scale-[0.85]">
              <span className="absolute rotate-[-45deg] text-xs font-semibold">
                Process
              </span>
            </div>
            <Link
              href="/result"
              className="absolute inset-0"
              aria-label="Process"
            />
          </div>
        )}

        {toast && (
          <Toast variant={toast.variant}>
            <ToastTitle>{toast.title}</ToastTitle>
            <ToastDescription>{toast.description}</ToastDescription>
          </Toast>
        )}
        <ToastViewport />
      </div>
    </ToastProvider>
  );
};

export default Testing;

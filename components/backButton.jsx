import Link from "next/link";
import React from "react";

const Backbutton = () => {
  return (
    <div className="absolute bottom-10 w-full flex justify-between px-10">
      <div className="relative w-12 h-12 left-4 flex items-center justify-center border border-black rotate-45 scale-[0.85]">
        <span className="absolute rotate-[-45deg] text-xs font-semibold">
          BACK
        </span>
      </div>
      <Link href="/" className="absolute inset-0" aria-label="Back" />
    </div>
  );
};

export default Backbutton;

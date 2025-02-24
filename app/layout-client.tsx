"use client";

import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/header";
import { usePathname } from "next/navigation";

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <>
      {pathname !== "/scan" && <Header />}
      {children}
      <Toaster />
    </>
  );
}

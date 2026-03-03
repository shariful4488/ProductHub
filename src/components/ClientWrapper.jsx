"use client";

import { useState, useEffect } from "react";
import LoadingScreen from "@/components/ui/LoadingScreen"; 

export default function ClientWrapper({ children }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Shurute 1.5 second loading dekhabe
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading && <LoadingScreen />}
      <div className={isLoading ? "hidden" : "block animate-in fade-in duration-1000"}>
        {children}
      </div>
    </>
  );
}
"use client";
import { ShoppingBag } from "lucide-react";

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white">
      {/* Animated Logo */}
      <div className="relative flex items-center justify-center mb-4">
        <div className="absolute w-20 h-20 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
        <ShoppingBag className="w-8 h-8 text-blue-600 animate-pulse" />
      </div>
      
      {/* Loading Text */}
      <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent animate-pulse">
        PROHUB
      </h2>
      <p className="text-gray-400 text-sm mt-2 tracking-widest uppercase">Loading Experience</p>
    </div>
  );
}


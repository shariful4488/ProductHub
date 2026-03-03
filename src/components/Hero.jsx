"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ShoppingBag, Sparkles } from "lucide-react";
import Link from "next/link";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop",
    badge: "Next-Gen Directory",
    title: "Modern Product",
    gradientText: "Management Hub",
    description: "The ultimate platform to organize and showcase your premium inventory with precision.",
    color: "from-blue-500 via-indigo-400 to-blue-500"
  },
  {
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
    badge: "Enterprise Security",
    title: "Secure Your",
    gradientText: "Digital Assets",
    description: "Built with elite security protocols to keep your business data protected 24/7.",
    color: "from-emerald-400 via-teal-300 to-emerald-500"
  },
  {
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    badge: "Performance First",
    title: "Optimized For",
    gradientText: "Maximum Speed",
    description: "Experience lightning-fast analytics and real-time updates on your product performance.",
    color: "from-orange-400 via-red-400 to-orange-500"
  }
];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[85vh] md:h-[90vh] w-full flex items-center justify-center overflow-hidden">
      
      {/* Background with Zoom Effect */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ scale: 1.15, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-slate-950/70 dark:bg-slate-950/85 z-10" />
            <img 
              src={slides[current].image} 
              alt="Background" 
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content Container */}
      <div className="container mx-auto px-6 relative z-20">
        <div className="flex flex-col items-center text-center">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full"
            >
              {/* Short Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-6">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                <span className="text-[10px] md:text-xs font-bold text-blue-100 uppercase tracking-[0.2em]">
                  {slides[current].badge}
                </span>
              </div>

              {/* Professional Short Title - Fixed Spacing */}
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[1.1] mb-6 tracking-tight">
                {slides[current].title} <br />
                <span className={`bg-gradient-to-r ${slides[current].color} bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient pb-2`}>
                  {slides[current].gradientText}
                </span>
              </h1>

              {/* Subtitle */}
              <p className="max-w-xl mx-auto text-sm md:text-lg text-slate-300 font-medium leading-relaxed mb-8 px-4">
                {slides[current].description}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Buttons - Mobile Responsive */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto px-6">
            <Link
              href="/products"
              className="w-full sm:w-auto group px-8 py-3.5 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:bg-blue-700 transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Explore Hub</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/register"
              className="w-full sm:w-auto px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl border border-white/20 backdrop-blur-md transition-all text-center"
            >
              Get Started
            </Link>
          </div>

          {/* Progress Indicators */}
          <div className="flex justify-center gap-2 mt-12 md:mt-16">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className="relative h-1 w-8 md:w-12 bg-white/20 rounded-full overflow-hidden"
              >
                {current === index && (
                  <motion.div 
                    layoutId="progress-bar"
                    className="absolute inset-0 bg-blue-500"
                    initial={{ x: "-100%" }}
                    animate={{ x: 0 }}
                    transition={{ duration: 6, ease: "linear" }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
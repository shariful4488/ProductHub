"use client";

import { Search, CreditCard, Download, ArrowRight } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: <Search className="text-blue-600" size={32} />,
      title: "Browse Assets",
      desc: "Explore our curated collection of premium software, templates, and UI kits.",
      color: "bg-blue-600/10",
    },
    {
      icon: <CreditCard className="text-emerald-600" size={32} />,
      title: "Secure Checkout",
      desc: "Choose your plan and pay securely with our encrypted payment gateway.",
      color: "bg-emerald-600/10",
    },
    {
      icon: <Download className="text-amber-600" size={32} />,
      title: "Instant Access",
      desc: "Get your download links immediately and start building your dream project.",
      color: "bg-amber-600/10",
    },
  ];

  return (
    <section className="py-24 px-6 bg-white dark:bg-slate-900/20">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-blue-600 font-black uppercase tracking-widest text-xs mb-4">
            Process
          </h2>
          <h3 className="text-3xl md:text-5xl font-black text-blue-600 tracking-tight">
            How it <span className="text-blue-600">Works</span>
          </h3>
          <p className="mt-4 text-slate-500 max-w-xl mx-auto text-sm md:text-base">
            Get started in minutes with our simple three-step process to acquire premium digital assets.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {/* Connecting Line (Desktop Only) */}
          <div className="hidden lg:block absolute top-1/4 left-1/4 right-1/4 h-0.5 border-t-2 border-dashed border-slate-200 dark:border-slate-800 -z-0"></div>

          {steps.map((step, idx) => (
            <div key={idx} className="relative z-10 flex flex-col items-center text-center group">
              <div className={`w-24 h-24 ${step.color} rounded-[2.5rem] flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-sm`}>
                {step.icon}
              </div>
              
              <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-black mb-4 shadow-lg shadow-blue-500/40">
                {idx + 1}
              </div>

              <h4 className="text-xl font-bold dark:text-white mb-3 tracking-tight">
                {step.title}
              </h4>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed px-4">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
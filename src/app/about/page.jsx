"use client";

import { ShieldCheck, Zap, Globe, Users } from "lucide-react";

const AboutPage = () => {
  const stats = [
    { label: "Digital Assets", value: "10K+" },
    { label: "Active Users", value: "50K+" },
    { label: "Premium Authors", value: "1.2K+" },
    { label: "Success Rate", value: "99.9%" },
  ];

  const features = [
    {
      icon: <Zap className="text-amber-500" size={24} />,
      title: "Instant Access",
      desc: "Download your assets immediately after purchase without any delay.",
    },
    {
      icon: <ShieldCheck className="text-emerald-500" size={24} />,
      title: "Secure Licensing",
      desc: "Every asset comes with a clear, worry-free license for your projects.",
    },
    {
      icon: <Globe className="text-blue-500" size={24} />,
      title: "Global Community",
      desc: "Join thousands of creators worldwide sharing high-quality resources.",
    },
    {
      icon: <Users className="text-purple-500" size={24} />,
      title: "Expert Support",
      desc: "Our team is always here to help you with any technical integration.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="space-y-6">
            <h2 className="text-blue-600 font-black tracking-widest uppercase text-sm">Who We Are</h2>
            <h1 className="text-4xl md:text-6xl font-black dark:text-white tracking-tighter leading-tight">
              We empower <span className="text-blue-600">creativity</span> through digital excellence.
            </h1>
            <p className="text-slate-500 text-lg leading-relaxed">
              Founded in 2024, our platform was built to bridge the gap between world-class designers and developers. 
              We provide a curated collection of premium assets that help you launch your ideas faster.
            </p>
            <div className="pt-4">
               <button className="px-8 py-4 bg-slate-900 dark:bg-white dark:text-slate-900 text-white rounded-2xl font-bold hover:opacity-90 transition-all shadow-lg">
                 Learn More
               </button>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -inset-4 bg-blue-600/10 rounded-[3rem] blur-2xl"></div>
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800" 
              alt="About Us" 
              className="relative rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-2xl object-cover h-[450px] w-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {features.map((item, index) => (
            <div key={index} className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="mb-4 bg-slate-50 dark:bg-slate-800 w-14 h-14 rounded-2xl flex items-center justify-center">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold dark:text-white mb-2">{item.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-blue-600 rounded-[3rem] p-12 md:p-16 grid grid-cols-2 lg:grid-cols-4 gap-10 text-center shadow-2xl shadow-blue-500/30">
          {stats.map((stat, index) => (
            <div key={index} className="space-y-2">
              <div className="text-4xl md:text-5xl font-black text-white">{stat.value}</div>
              <div className="text-blue-100 font-bold uppercase tracking-widest text-xs">{stat.label}</div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default AboutPage;
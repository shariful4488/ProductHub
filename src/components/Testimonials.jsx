"use client";

import { Star, Quote } from "lucide-react";

const Testimonials = () => {
  const reviews = [
    {
      name: "Alex Johnson",
      role: "UI Designer",
      comment: "The assets here are game-changing. Saved me weeks of work on my last project!",
      avatar: "https://i.pravatar.cc/150?u=alex",
    },
    {
      name: "Sarah Chen",
      role: "Software Engineer",
      comment: "Clean code and premium designs. The software templates are worth every penny.",
      avatar: "https://i.pravatar.cc/150?u=sarah",
    },
    {
      name: "Michael Ross",
      role: "Startup Founder",
      comment: "Finally, a marketplace that prioritizes quality over quantity. Highly recommended!",
      avatar: "https://i.pravatar.cc/150?u=michael",
    },
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-12 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-blue-600 font-black uppercase tracking-[0.2em] text-xs mb-4">
            Testimonials
          </h2>
          <h3 className="text-3xl sm:text-4xl md:text-6xl font-black dark:text-white tracking-tight">
            What our <span className="text-blue-600">Clients Say</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-14">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="group bg-white dark:bg-slate-900 p-10 rounded-[3.5rem] border border-slate-200 dark:border-slate-800 shadow-xl relative transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl flex flex-col h-full"
            >
              <Quote
                className="absolute top-10 right-10 text-slate-100 dark:text-slate-800 group-hover:text-blue-600/10 transition-colors duration-500"
                size={80}
              />

              <div className="flex gap-1.5 mb-6 relative z-10">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className="fill-amber-400 text-amber-400"
                  />
                ))}
              </div>

              <div className="flex-1 relative z-10">
                <p className="text-slate-500 dark:text-slate-400 text-lg italic leading-relaxed mb-10">
                  &quot;{rev.comment}&quot;
                </p>
              </div>
              <div className="flex items-center gap-5 pt-8 border-t border-slate-100 dark:border-slate-800 relative z-10">
                <div className="relative">
                  <div className="absolute -inset-1 bg-blue-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
                  <img
                    src={rev.avatar}
                    alt={rev.name}
                    className="relative w-14 h-14 rounded-2xl object-cover border-2 border-white dark:border-slate-800"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-lg dark:text-white leading-none mb-1">
                    {rev.name}
                  </h4>
                  <p className="text-[10px] text-blue-600 font-black uppercase tracking-widest">
                    {rev.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

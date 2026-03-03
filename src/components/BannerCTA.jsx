import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function BannerCTA() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto bg-slate-900 dark:bg-blue-600 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-8">Ready to boost your <br/> creative workflow?</h2>
          <Link href="/login" className="inline-flex items-center gap-2 bg-white text-slate-900 px-10 py-4 rounded-full font-black hover:scale-105 transition-transform shadow-xl">
            Get Started Now <ArrowRight size={20}/>
          </Link>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
      </div>
    </section>
  );
}
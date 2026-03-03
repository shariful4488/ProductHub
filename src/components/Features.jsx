import { Zap, Shield, Smartphone } from "lucide-react";

const Features = () => {
  const features = [
    { icon: <Zap className="text-amber-500" />, title: "Fast Delivery", desc: "Instant digital delivery to your dashboard." },
    { icon: <Shield className="text-blue-500" />, title: "Secure Payments", desc: "Protected by 256-bit SSL encryption." },
    { icon: <Smartphone className="text-emerald-500" />, title: "Mobile Ready", desc: "Access your products from any device." }
  ];

  return (
    <section className="py-20 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black mb-4 dark:text-white tracking-tighter">Why ProHub?</h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium">The most trusted marketplace for modern creators.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div key={i} className="p-10 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 hover:bg-white dark:hover:bg-slate-900 transition-all hover:shadow-2xl hover:-translate-y-2 group">
              <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {f.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 dark:text-white">{f.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
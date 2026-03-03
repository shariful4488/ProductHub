"use client";

import { Check, ArrowRight } from "lucide-react";

const PricingPage = () => {
  const plans = [
    {
      name: "Starter",
      price: "0",
      description: "Perfect for exploring our digital library.",
      features: ["5 Free Assets", "Standard License", "Community Support", "No Credit Card Required"],
      buttonText: "Start for Free",
      isPopular: false,
    },
    {
      name: "Pro Pack",
      price: "49",
      description: "Best for professional designers and devs.",
      features: ["Unlimited Assets", "Extended License", "Priority Support", "Early Access to New Drops"],
      buttonText: "Get Pro Access",
      isPopular: true,
    },
    {
      name: "Enterprise",
      price: "199",
      description: "Custom solutions for large scale teams.",
      features: ["Custom Assets", "Multi-user License", "24/7 Dedicated Support", "API Access"],
      buttonText: "Contact Sales",
      isPopular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto text-center">
        {/* Header */}
        <div className="mb-16">
          <h2 className="text-blue-600 font-black tracking-widest uppercase text-sm mb-4">Pricing Plans</h2>
          <h1 className="text-4xl md:text-6xl font-black dark:text-white tracking-tighter mb-6">
            Ready to <span className="text-blue-600">Level Up?</span>
          </h1>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">
            Choose the plan that fits your creative needs. Unlock premium assets and start building today.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative group p-8 rounded-[3rem] border transition-all duration-500 flex flex-col h-full ${
                plan.isPopular
                  ? "bg-white dark:bg-slate-900 border-blue-600 shadow-2xl shadow-blue-500/20 scale-105 z-10"
                  : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-xl hover:shadow-2xl"
              }`}
            >
              {plan.isPopular && (
                <span className="absolute -top-5 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-lg">
                  Most Popular
                </span>
              )}

              <div className="mb-8">
                <h3 className="text-2xl font-bold dark:text-white mb-2">{plan.name}</h3>
                <p className="text-slate-500 text-sm">{plan.description}</p>
              </div>

              <div className="mb-8 flex items-baseline justify-center gap-1">
                <span className="text-5xl font-black dark:text-white">${plan.price}</span>
                <span className="text-slate-400 font-bold">/month</span>
              </div>

              {/* Features List */}
              <div className="space-y-4 mb-10 flex-1">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 text-slate-600 dark:text-slate-400 font-medium">
                    <div className="bg-blue-600/10 p-1 rounded-full">
                      <Check size={16} className="text-blue-600" />
                    </div>
                    {feature}
                  </div>
                ))}
              </div>

              <button
                className={`w-full py-4 rounded-2xl font-black transition-all flex items-center justify-center gap-2 group/btn ${
                  plan.isPopular
                    ? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/30"
                    : "bg-slate-100 dark:bg-slate-800 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900"
                }`}
              >
                {plan.buttonText}
                <ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>

       
        <p className="mt-16 text-slate-500 font-medium">
          Need a custom plan for your agency? <span className="text-blue-600 cursor-pointer hover:underline">Get in touch</span>
        </p>
      </div>
    </div>
  );
};

export default PricingPage;
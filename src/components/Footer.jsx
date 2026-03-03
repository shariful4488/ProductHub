"use client";

import Link from "next/link";
import { Github, Twitter, Linkedin, Mail, ArrowUpRight } from "lucide-react";

const Footer = () => {
  const socialLinks = [
    { Icon: Twitter, href: "https://x.com/it_shariful", label: "Twitter" },
    { Icon: Github, href: "https://github.com/shariful4488", label: "Github" },
    { Icon: Linkedin, href: "https://www.linkedin.com/in/shariful-islam-30907b267/", label: "Linkedin" },
  ];

  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-900 pt-20 pb-10 px-6 md:px-12 mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          <div className="space-y-6">
            <h2 className="text-2xl font-black dark:text-white tracking-tighter">
              DIGITAL<span className="text-blue-600">ASSETS</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-xs">
              Premium marketplace for world-class digital resources. Build faster, design better.
            </p>
            
        
            <div className="flex gap-3">
              {socialLinks.map((social, i) => (
                <a 
                  key={i} 
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label={social.label}
                  className="p-3 bg-slate-50 dark:bg-slate-900 rounded-2xl text-slate-400 hover:text-blue-600 hover:scale-110 transition-all border border-slate-100 dark:border-slate-800"
                >
                  <social.Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold dark:text-white mb-6 uppercase text-xs tracking-widest text-blue-600">Explore</h4>
            <ul className="space-y-4 text-slate-500 dark:text-slate-400 text-sm font-medium">
              <li><Link href="/products" className="hover:text-blue-600 transition-colors flex items-center gap-1">All Assets <ArrowUpRight size={14}/></Link></li>
              <li><Link href="/pricing" className="hover:text-blue-600 transition-colors">Pricing</Link></li>
              <li><Link href="/about" className="hover:text-blue-600 transition-colors">About</Link></li>
            </ul>
          </div>

        
          <div>
            <h4 className="font-bold dark:text-white mb-6 uppercase text-xs tracking-widest text-blue-600">Support</h4>
            <ul className="space-y-4 text-slate-500 dark:text-slate-400 text-sm font-medium">
              <li><Link href="/about" className="hover:text-blue-600 transition-colors">About Us</Link></li>
              <li><Link href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-blue-600 transition-colors">License info</Link></li>
              <li><Link href="#" className="hover:text-blue-600 transition-colors">Contact Support</Link></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="font-bold dark:text-white mb-6 uppercase text-xs tracking-widest text-blue-600">Newsletter</h4>
            <form onSubmit={(e) => e.preventDefault()} className="relative group">
              <input 
                type="email" 
                placeholder="hello@example.com" 
                className="w-full pl-5 pr-12 py-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 dark:text-white transition-all"
              />
              <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 text-white p-2.5 rounded-xl hover:bg-blue-700 transition-colors">
                <Mail size={18} />
              </button>
            </form>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">
              Get weekly updates on new assets.
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-100 dark:border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
            © 2026 DIGITAL ASSETS INC.
          </p>
          <div className="flex gap-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
            <a href="#" className="hover:text-blue-600">Terms</a>
            <a href="#" className="hover:text-blue-600">Privacy</a>
            <a href="#" className="hover:text-blue-600">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, X, LogOut, PlusCircle, 
  ChevronDown, ShoppingBag, Moon, Sun, Settings, User
} from "lucide-react";

const Navbar = () => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // Theme Logic
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark" || (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    document.documentElement.classList.toggle("dark", newDark);
    localStorage.setItem("theme", newDark ? "dark" : "light");
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setIsProfileOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Pricing", href: "/pricing" }, 
    { name: "About", href: "/about" },
  ];

  return (
    <nav className={`fixed top-0 z-[100] w-full transition-all duration-300 ${
      scrolled 
      ? "bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl shadow-lg py-3" 
      : "bg-white dark:bg-slate-950 py-5"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 z-[110] group">
            <div className="bg-blue-600 p-2 rounded-xl text-white shadow-lg shadow-blue-500/20 group-hover:rotate-6 transition-transform">
              <ShoppingBag size={20} />
            </div>
            <span className="text-xl md:text-2xl font-black text-slate-900 dark:text-white tracking-tighter">
              PRO<span className="text-blue-600">HUB</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                  pathname === link.href 
                    ? "text-blue-600 bg-blue-50 dark:bg-blue-900/40" 
                    : "text-slate-600 dark:text-slate-400 hover:text-blue-600"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2 md:gap-4 z-[110]">
            <button 
              onClick={toggleTheme}
              className="p-2.5 rounded-full border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-300 transition-all hover:scale-110 active:scale-90"
            >
              {isDark ? <Sun size={18} className="text-amber-500" /> : <Moon size={18} />}
            </button>

            <div className="hidden md:flex items-center gap-2">
              {session ? (
                <div className="relative">
                  <button 
                    onClick={() => setIsProfileOpen(!isProfileOpen)} 
                    className="flex items-center gap-2 p-1 pr-3 rounded-full border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 hover:ring-2 hover:ring-blue-500/20 transition-all"
                  >
                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center overflow-hidden shadow-md border-2 border-white dark:border-slate-700">
                      {session.user?.image ? (
                        <img 
                          src={session.user.image} 
                          alt="Profile" 
                          className="w-full h-full object-cover"
                          onError={(e) => e.target.style.display = 'none'} 
                        />
                      ) : (
                        <span className="text-xs font-bold">{session.user?.name?.[0].toUpperCase()}</span>
                      )}
                    </div>
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
                      {session.user?.name?.split(' ')[0]}
                    </span>
                    <ChevronDown size={14} className={`transition-transform duration-200 ${isProfileOpen ? "rotate-180" : ""}`} />
                  </button>

                  <AnimatePresence>
                    {isProfileOpen && (
                      <>
                        <div className="fixed inset-0 z-[-1]" onClick={() => setIsProfileOpen(false)} />
                        <motion.div
                          initial={{ opacity: 0, y: 15, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          className="absolute right-0 mt-3 w-64 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl p-2 z-[120]"
                        >
                          <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 mb-2 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center overflow-hidden">
                               {session.user?.image ? (
                                 <img src={session.user.image} alt="Avatar" className="w-full h-full object-cover" />
                               ) : (
                                 <User size={20} className="text-blue-600" />
                               )}
                            </div>
                            <div className="flex-1 truncate">
                              <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{session.user?.name}</p>
                              <p className="text-[10px] font-medium text-slate-500 truncate">{session.user?.email}</p>
                            </div>
                          </div>

                          <div className="space-y-1">
                            <Link 
                              href="/add-product" 
                              className="flex items-center gap-3 w-full px-4 py-2.5 text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 rounded-xl transition-all"
                            >
                              <PlusCircle size={18} className="text-blue-500" /> Add Product
                            </Link>

                            <Link 
                              href="/manage-products" 
                              className="flex items-center gap-3 w-full px-4 py-2.5 text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 rounded-xl transition-all"
                            >
                              <Settings size={18} className="text-emerald-500" /> Manage Products
                            </Link>

                            <div className="h-[1px] bg-slate-100 dark:bg-slate-800 my-2" />

                            <button 
                              onClick={() => signOut({ callbackUrl: "/login" })}
                              className="flex items-center gap-3 w-full px-4 py-2.5 text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-xl transition-all"
                            >
                              <LogOut size={18} /> Sign Out
                            </button>
                          </div>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link href="/login" className="px-5 py-2 text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-colors">Login</Link>
                  <Link href="/register" className="bg-blue-600 text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-blue-500/20 hover:scale-105 transition-all active:scale-95">Register</Link>
                </div>
              )}
            </div>

            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-900 rounded-lg"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 top-0 left-0 w-full bg-white dark:bg-slate-950 z-[105] md:hidden pt-24 px-6 overflow-y-auto"
          >
            <div className="flex flex-col gap-2 pb-10">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-2xl font-bold py-4 px-4 rounded-2xl ${
                    pathname === link.href ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20" : "text-slate-600 dark:text-slate-400"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              
              <div className="h-[1px] bg-slate-100 dark:bg-slate-800 my-4" />

              {session ? (
                <div className="flex flex-col gap-4 px-4">
                  <div className="flex items-center gap-3 mb-4">
                     <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center overflow-hidden text-xl font-bold shadow-lg">
                        {session.user?.image ? (
                          <img src={session.user.image} alt="User" className="w-full h-full object-cover" />
                        ) : (
                          <span className="uppercase">{session.user?.name?.[0]}</span>
                        )}
                     </div>
                     <div>
                        <p className="font-bold dark:text-white text-lg">{session.user?.name}</p>
                        <p className="text-sm text-slate-500 truncate max-w-[200px]">{session.user?.email}</p>
                     </div>
                  </div>
                  <Link href="/add-product" className="flex items-center gap-4 text-xl font-bold text-slate-700 dark:text-slate-200 py-2">
                    <PlusCircle className="text-blue-600" size={24} /> Add Product
                  </Link>
                  <Link href="/manage-products" className="flex items-center gap-4 text-xl font-bold text-slate-700 dark:text-slate-200 py-2">
                    <Settings className="text-emerald-500" size={24} /> Manage Products
                  </Link>
                  <button onClick={() => signOut()} className="flex items-center gap-4 text-xl font-bold text-red-500 text-left mt-4 py-2">
                    <LogOut size={24} /> Sign Out
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-4 px-2 mt-4">
                  <Link href="/login" className="w-full py-4 text-center rounded-2xl font-bold border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                    Login
                  </Link>
                  <Link href="/register" className="w-full py-4 text-center rounded-2xl font-bold bg-blue-600 text-white shadow-xl">
                    Register Now
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}; 

export default Navbar;
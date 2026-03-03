"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (result.ok) {
      router.push("/");
      router.refresh(); // Navbar আপডেট করার জন্য
    } else {
      alert(result.error || "Login failed!");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4 pt-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-2xl">
          <h2 className="text-3xl font-black text-center text-slate-900 dark:text-white mb-8 tracking-tighter">Welcome Back</h2>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input {...register("email", { required: true })} type="email" className="w-full bg-slate-100 dark:bg-slate-800 rounded-2xl py-4 pl-12 pr-4 outline-none dark:text-white" placeholder="email@example.com" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input {...register("password", { required: true })} type={showPassword ? "text" : "password"} className="w-full bg-slate-100 dark:bg-slate-800 rounded-2xl py-4 pl-12 pr-12 outline-none dark:text-white" placeholder="••••••••" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-2">
              {loading ? "Signing in..." : "Sign In"} <ArrowRight size={18} />
            </button>
          </form>

          <div className="mt-8 relative flex items-center justify-center">
            <div className="border-t border-slate-200 dark:border-slate-800 w-full"></div>
            <span className="bg-white dark:bg-slate-900 px-4 text-xs font-bold text-slate-400 absolute">OR</span>
          </div>

          <button onClick={() => signIn('google', { callbackUrl: '/' })} className="mt-6 w-full flex items-center justify-center gap-3 py-4 border border-slate-200 dark:border-slate-800 rounded-2xl font-bold dark:text-white shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
            <FcGoogle size={22} /> Continue with Google
          </button>

          <p className="text-center mt-8 text-sm font-bold text-slate-600 dark:text-slate-400">
            New here? <Link href="/register" className="text-blue-600 hover:underline ml-1">Create Account</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
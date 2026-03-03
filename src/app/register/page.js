"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Lock, ArrowRight, Eye, EyeOff, AtSign, Link as LinkIcon } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const imageUrl = watch("image");

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          username: data.username.trim().toLowerCase(),
          email: data.email.trim().toLowerCase(),
          password: data.password,
          image: data.image || `https://ui-avatars.com/api/?name=${data.name}&background=random`, 
        }),
      });

      const result = await res.json();

      if (res.ok) {
        const loginRes = await signIn("credentials", {
          redirect: false,
          email: data.email.trim().toLowerCase(),
          password: data.password,
        });
        
        if (loginRes.ok) {
          router.push("/");
          router.refresh();
        }
      } else {
        alert(result.error || "Signup failed");
      }
    } catch (error) {
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4 pt-24 pb-12 text-slate-900 dark:text-white">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-xl">
        <div className="bg-white dark:bg-slate-900 p-8 md:p-10 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-2xl">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-black tracking-tighter">Create Account</h2>
            <p className="text-slate-500 dark:text-slate-400 font-medium mt-1">Fill in the details to get started.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            
            {/* Profile Image Preview */}
            <div className="flex flex-col items-center mb-6">
              <div className="w-24 h-24 rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-blue-500/30 flex items-center justify-center overflow-hidden shadow-inner ring-4 ring-white dark:ring-slate-800">
                {imageUrl ? (
                  <img 
                    src={imageUrl} 
                    alt="Profile" 
                    className="w-full h-full object-cover" 
                    onError={(e) => { e.target.src = "https://ui-avatars.com/api/?name=User"; }} 
                  />
                ) : (
                  <User size={40} className="text-slate-400" />
                )}
              </div>
              <p className="text-[10px] font-bold text-slate-400 uppercase mt-3 tracking-widest">Live Preview</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-bold ml-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <input {...register("name", { required: "Name is required" })} className="w-full bg-slate-100 dark:bg-slate-800 rounded-xl py-3.5 pl-10 pr-4 outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm dark:text-white text-slate-900" placeholder="John Doe" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-bold ml-1">Username</label>
                <div className="relative">
                  <AtSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <input {...register("username", { required: "Username is required" })} className="w-full bg-slate-100 dark:bg-slate-800 rounded-xl py-3.5 pl-10 pr-4 outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm dark:text-white text-slate-900" placeholder="johndoe12" />
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-bold ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input {...register("email", { required: "Email is required" })} type="email" className="w-full bg-slate-100 dark:bg-slate-800 rounded-xl py-3.5 pl-10 pr-4 outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm dark:text-white text-slate-900" placeholder="john@example.com" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-bold ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input {...register("password", { required: "Required", minLength: 6 })} type={showPassword ? "text" : "password"} className="w-full bg-slate-100 dark:bg-slate-800 rounded-xl py-3.5 pl-10 pr-12 outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm dark:text-white text-slate-900" placeholder="••••••••" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-500">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-bold ml-1">Profile Image URL (Optional)</label>
              <div className="relative">
                <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input 
                  {...register("image")} 
                  className="w-full bg-slate-100 dark:bg-slate-800 rounded-xl py-3.5 pl-10 pr-4 outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm dark:text-white text-slate-900" 
                  placeholder="https://example.com/photo.jpg" 
                />
              </div>
            </div>

            <button disabled={loading} type="submit" className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-black py-4 rounded-2xl shadow-xl shadow-blue-500/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2 group mt-4">
              {loading ? "Creating Account..." : "Create Account"} <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          {/* Divider */}
          <div className="relative flex items-center justify-center my-8">
            <div className="border-t border-slate-200 dark:border-slate-800 w-full"></div>
            <span className="bg-white dark:bg-slate-900 px-4 text-xs font-bold text-slate-400 uppercase absolute">Or join with</span>
          </div>

          {/* Google Login Section */}
          <button 
            type="button"
            onClick={() => signIn('google', { callbackUrl: '/' })}
            className="w-full flex items-center justify-center gap-3 py-4 border border-slate-200 dark:border-slate-800 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all font-bold text-slate-600 dark:text-slate-300 shadow-sm"
          >
            <FcGoogle size={22} />
            Register with Google
          </button>

          <p className="text-center mt-8 text-slate-600 dark:text-slate-400 font-bold text-sm">
            Already a member? <Link href="/login" className="text-blue-600 hover:underline ml-1">Sign In</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
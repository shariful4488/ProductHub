"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { 
  PlusCircle, Package, DollarSign, Image as ImageIcon, 
  Tag, AlignLeft, Check, Loader2, ArrowLeft 
} from "lucide-react";
import Link from "next/link";

const AddProduct = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();

  
  const imageUrl = watch("image");

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          authorEmail: session?.user?.email, 
          authorName: session?.user?.name,
        }),
      });

      if (res.ok) {
        alert("Product added successfully! 🎉");
        reset();
        router.push("/products");
      } else {
        alert("Something went wrong!");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to add product");
    } finally {
      setLoading(false);
    }
  };


  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="font-bold text-slate-500">Please login to add products.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-28 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/" className="p-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-blue-600 transition-all">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-3xl font-black dark:text-white tracking-tight">Add New Product</h1>
            <p className="text-slate-500 text-sm font-medium">List your digital asset on ProHub marketplace.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Form Side */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-xl">
              
              <div className="space-y-4">
                {/* Product Title */}
                <div className="space-y-2">
                  <label className="text-sm font-bold ml-1 dark:text-slate-300 flex items-center gap-2">
                    <Package size={16} className="text-blue-500" /> Product Title
                  </label>
                  <input 
                    {...register("title", { required: "Title is required" })}
                    className="w-full bg-slate-50 dark:bg-slate-800/50 rounded-2xl py-4 px-5 outline-none focus:ring-2 focus:ring-blue-500 transition-all dark:text-white border border-transparent focus:border-blue-500"
                    placeholder="e.g. Premium SaaS Dashboard Kit"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Price */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold ml-1 dark:text-slate-300 flex items-center gap-2">
                      <DollarSign size={16} className="text-emerald-500" /> Price ($)
                    </label>
                    <input 
                      type="number"
                      {...register("price", { required: "Price is required" })}
                      className="w-full bg-slate-50 dark:bg-slate-800/50 rounded-2xl py-4 px-5 outline-none focus:ring-2 focus:ring-blue-500 transition-all dark:text-white border border-transparent focus:border-blue-500"
                      placeholder="49"
                    />
                  </div>

                  {/* Category */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold ml-1 dark:text-slate-300 flex items-center gap-2">
                      <Tag size={16} className="text-purple-500" /> Category
                    </label>
                    <select 
                      {...register("category")}
                      className="w-full bg-slate-50 dark:bg-slate-800/50 rounded-2xl py-4 px-5 outline-none focus:ring-2 focus:ring-blue-500 transition-all dark:text-white border border-transparent focus:border-blue-500 appearance-none"
                    >
                      <option value="Software">Software</option>
                      <option value="Design">Design</option>
                      <option value="Template">Template</option>
                      <option value="Icons">Icons</option>
                      <option value="Fonts">AI Tools</option>
                    </select>
                  </div>
                </div>

                {/* Image URL */}
                <div className="space-y-2">
                  <label className="text-sm font-bold ml-1 dark:text-slate-300 flex items-center gap-2">
                    <ImageIcon size={16} className="text-pink-500" /> Image URL
                  </label>
                  <input 
                    {...register("image", { required: "Image URL is required" })}
                    className="w-full bg-slate-50 dark:bg-slate-800/50 rounded-2xl py-4 px-5 outline-none focus:ring-2 focus:ring-blue-500 transition-all dark:text-white border border-transparent focus:border-blue-500"
                    placeholder="https://images.unsplash.com/photo..."
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label className="text-sm font-bold ml-1 dark:text-slate-300 flex items-center gap-2">
                    <AlignLeft size={16} className="text-amber-500" /> Description
                  </label>
                  <textarea 
                    rows={4}
                    {...register("description", { required: "Description is required" })}
                    className="w-full bg-slate-50 dark:bg-slate-800/50 rounded-2xl py-4 px-5 outline-none focus:ring-2 focus:ring-blue-500 transition-all dark:text-white border border-transparent focus:border-blue-500 resize-none"
                    placeholder="Describe your product features..."
                  />
                </div>
              </div>

              <button 
                disabled={loading}
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-black py-5 rounded-2xl shadow-xl shadow-blue-500/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="animate-spin" /> : <PlusCircle size={20} />}
                {loading ? "Publishing..." : "Publish Product"}
              </button>
            </form>
          </div>

          {/* Preview Side */}
          <div className="lg:col-span-1">
            <div className="sticky top-28">
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-4 ml-2">Live Preview</h3>
              <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl group">
                <div className="aspect-video bg-slate-100 dark:bg-slate-800 relative overflow-hidden">
                  {imageUrl ? (
                    <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400 italic text-sm">Image will appear here</div>
                  )}
                </div>
                <div className="p-6">
                  <span className="text-[10px] font-black text-blue-600 uppercase bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded-md">
                    {watch("category") || "Category"}
                  </span>
                  <h3 className="font-bold text-xl dark:text-white mt-3 truncate">
                    {watch("title") || "Your Product Title"}
                  </h3>
                  <p className="text-slate-500 text-sm mt-2 line-clamp-2">
                    {watch("description") || "Product description will be shown here..."}
                  </p>
                  <div className="flex justify-between items-center mt-6">
                    <span className="text-2xl font-black dark:text-white">
                      ${watch("price") || "0"}
                    </span>
                    <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-400">
                      <Check size={20} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AddProduct;
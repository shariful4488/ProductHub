"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { Loader2, Save, ArrowLeft, Package } from "lucide-react";
import Link from "next/link";

const EditProduct = () => {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        if (res.ok) {
          const data = await res.json();
          setValue("title", data.title);
          setValue("price", data.price);
          setValue("category", data.category);
          setValue("image", data.image);
          setValue("description", data.description);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    setUpdating(true);
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        alert("Product updated successfully!");
        router.push("/manage-products");
      }
    } catch (err) {
      alert("Failed to update product.");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <Loader2 className="animate-spin text-blue-600" size={40} />
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/manage-products" className="flex items-center gap-2 text-slate-500 mb-6 hover:text-blue-600 transition-all">
          <ArrowLeft size={18} /> Back to Dashboard
        </Link>
        
        <div className="bg-white dark:bg-slate-900 p-8 md:p-12 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-2xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-4 bg-blue-600/10 rounded-2xl text-blue-600"><Package size={30} /></div>
            <h1 className="text-3xl font-black dark:text-white">Edit Asset</h1>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold dark:text-slate-400">Asset Title</label>
                <input {...register("title")} className="w-full bg-slate-50 dark:bg-slate-800 p-4 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 dark:text-white" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold dark:text-slate-400">Price ($)</label>
                <input type="number" {...register("price")} className="w-full bg-slate-50 dark:bg-slate-800 p-4 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 dark:text-white" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold dark:text-slate-400">Image URL</label>
              <input {...register("image")} className="w-full bg-slate-50 dark:bg-slate-800 p-4 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 dark:text-white" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold dark:text-slate-400">Description</label>
              <textarea rows={4} {...register("description")} className="w-full bg-slate-50 dark:bg-slate-800 p-4 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 dark:text-white resize-none" />
            </div>

            <button 
              disabled={updating}
              className="w-full bg-blue-600 py-4 rounded-2xl text-white font-black text-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition-all active:scale-95 shadow-xl shadow-blue-500/20"
            >
              {updating ? <Loader2 className="animate-spin" /> : <Save size={20} />}
              {updating ? "Saving Changes..." : "Update Product"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
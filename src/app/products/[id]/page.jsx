"use client";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, CreditCard, User } from "lucide-react";

const ProductDetails = ({ params }) => {
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();

        const found = data.find((p) => p._id === id);
        setProduct(found);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchProduct();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
      <Loader2 className="animate-spin text-blue-600" size={40} />
    </div>
  );

  if (!product) return <div className="pt-40 text-center font-bold">Product not found! ID: {id}</div>;

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 pb-20 pt-32 px-4">
      <div className="max-w-5xl mx-auto">
        <button onClick={() => router.back()} className="flex items-center gap-2 font-bold mb-6 text-slate-500">
           <ArrowLeft size={20} /> Back
        </button>
        
        <div className="h-62.5 md:h-7.5  w-full rounded-4xl overflow-hidden mb-10 shadow-lg border border-slate-200 dark:border-slate-800">
          <img src={product.image} className="w-full h-full object-cover" alt={product.title} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <h1 className="text-5xl font-black dark:text-white mb-6">{product.title}</h1>
            <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed">
              {product.description}
            </p>
          </div>
          
          <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 h-fit">
            <p className="text-sm font-bold text-blue-600 uppercase">Price</p>
            <h2 className="text-4xl font-black dark:text-white mb-6">${product.price}</h2>
            <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2">
              <CreditCard size={20} /> Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
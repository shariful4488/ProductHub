"use client";

import { useState, useEffect } from "react";
import { ShoppingCart, Heart, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";

const ProductPreview = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // ব্যাকেন্ড থেকে ডাটা ফেচ করা
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products"); // আপনার API রুট অনুযায়ী পরিবর্তন করুন
        const data = await res.json();
        // হোম পেজে মাত্র ৪টি প্রোডাক্ট দেখানোর জন্য slice করা হলো
        setProducts(data.slice(0, 4));
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="py-20 flex justify-center items-center">
        <Loader2 className="animate-spin text-blue-600" size={40} />
      </div>
    );
  }

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-black dark:text-white tracking-tight">Trending Items</h2>
            <p className="text-slate-500 text-sm mt-1">Handpicked premium assets for you.</p>
          </div>
          <Link href="/products" className="text-blue-600 font-bold flex items-center gap-2 hover:gap-3 transition-all">
            See All <ArrowRight size={18} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product._id} className="group">
              {/* কার্ডে ক্লিক করলে ডিটেইলস পেজে যাবে */}
              <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-4 border border-slate-200 dark:border-slate-800 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                
                <Link href={`/products/${product._id}`}>
                  <div className="aspect-square bg-slate-100 dark:bg-slate-800 rounded-[1.5rem] mb-4 relative overflow-hidden cursor-pointer">
                    <button className="absolute top-3 right-3 p-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-full text-slate-400 hover:text-red-500 transition-colors z-10">
                      <Heart size={16} />
                    </button>
                    
                    {product.image ? (
                      <img 
                        src={product.image} 
                        alt={product.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-300 font-bold">No Image</div>
                    )}
                  </div>
                </Link>

                <div className="px-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{product.category || "General"}</span>
                      <Link href={`/products/${product._id}`}>
                        <h3 className="font-bold text-lg dark:text-white mt-1 hover:text-blue-600 transition-colors cursor-pointer truncate max-w-[150px]">
                          {product.title}
                        </h3>
                      </Link>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mt-5">
                    <div className="flex flex-col">
                       <span className="text-xs text-slate-400 font-bold">Price</span>
                       <span className="text-xl font-black dark:text-white">${product.price}</span>
                    </div>
                    <button className="bg-blue-600 text-white p-3 rounded-xl hover:scale-110 active:scale-95 transition-all shadow-lg shadow-blue-500/20">
                      <ShoppingCart size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductPreview;
"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { Trash2, Eye, Edit3, Plus, Search, Loader2, Package } from "lucide-react";
import Link from "next/link";

const ManageProducts = () => {
  const { data: session, status: authStatus } = useSession();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        if (res.ok) {
          const data = await res.json();
          setProducts(data);
        }
      } catch (err) {
        console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    if (authStatus === "authenticated") fetchProducts();
  }, [authStatus]);

  const handleDelete = async (id) => {
    if (!confirm("Delete this asset?")) return;
    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (res.ok) setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      alert("Error deleting product");
    }
  };

  const filtered = products.filter((p) => 
    p.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (authStatus === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950">
        <Loader2 className="animate-spin text-blue-600" size={40} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-16 md:pt-28 pb-20 px-2 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6 px-1">
          <h1 className="text-xl sm:text-4xl font-black dark:text-white tracking-tighter uppercase leading-none">
            Assets <span className="text-blue-600 block sm:inline">List</span>
          </h1>
          <Link href="/add-product" className="bg-blue-600 text-white p-2 sm:px-6 sm:py-3 rounded-xl font-bold flex items-center gap-1 sm:gap-2 shadow-lg active:scale-95 transition-all">
            <Plus size={18} /> <span className="text-[10px] sm:text-base">Add New</span>
          </Link>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl mb-6 flex items-center px-4 gap-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-600/20">
          <Search className="text-slate-400" size={16} />
          <input 
            type="text" 
            placeholder="Search by name..." 
            className="bg-transparent border-none outline-none w-full py-3 dark:text-white text-xs sm:text-sm"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-[1.5rem] sm:rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-xl">
          <div className="w-full">
            <table className="w-full text-left table-fixed border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 text-slate-400 font-black text-[9px] sm:text-xs uppercase tracking-widest">
                  <th className="p-3 sm:p-6 w-[50%] xs:w-[45%] sm:w-[50%]">Asset</th>
                  <th className="p-3 sm:p-6 w-[20%] xs:w-[25%] text-center">Price</th>
                  <th className="p-3 sm:p-6 w-[30%] text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filtered.map((item) => (
                  <tr key={item._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                    
                    <td className="p-2 sm:p-6">
                      <div className="flex items-center gap-2 sm:gap-4 overflow-hidden">
                        <img 
                          src={item.image} 
                          className="w-8 h-8 sm:w-14 sm:h-14 rounded-lg object-cover flex-shrink-0 bg-slate-100 dark:border-slate-700 border" 
                          alt="" 
                        />
                        <div className="min-w-0 flex flex-col">
                          <h4 className="font-bold dark:text-white text-[10px] sm:text-base leading-tight truncate">
                            {item.title}
                          </h4>
                          <span className="text-[8px] sm:text-[10px] text-blue-600 font-black uppercase mt-0.5 truncate">
                            {item.category}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Column 2: Price (Center Aligned) */}
                    <td className="p-2 sm:p-6 text-center font-black dark:text-white text-[10px] sm:text-lg whitespace-nowrap">
                      ${item.price}
                    </td>

                    {/* Column 3: Actions (Fixed for mobile) */}
                    <td className="p-2 sm:p-6">
                      <div className="flex justify-end items-center gap-1 sm:gap-2">
                        <Link href={`/products/${item._id}`} className="p-1.5 sm:p-3 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-500 hover:text-blue-600 transition-all active:bg-blue-50">
                          <Eye size={14} className="sm:w-5 sm:h-5" />
                        </Link>
                        <Link href={`/edit-product/${item._id}`} className="p-1.5 sm:p-3 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-500 hover:text-amber-600 transition-all active:bg-amber-50">
                          <Edit3 size={14} className="sm:w-5 sm:h-5" />
                        </Link>
                        <button 
                          onClick={() => handleDelete(item._id)} 
                          className="p-1.5 sm:p-3 bg-red-50/50 dark:bg-red-900/10 rounded-lg text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-sm"
                        >
                          <Trash2 size={14} className="sm:w-5 sm:h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filtered.length === 0 && (
            <div className="p-12 text-center">
               <Package className="mx-auto text-slate-200 dark:text-slate-800 mb-2" size={32} />
               <p className="text-slate-400 text-xs font-bold italic">No items found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageProducts;
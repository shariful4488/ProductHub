"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Loader2, ArrowUpRight, Tag, DollarSign, Search } from "lucide-react";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Software", "Design", "Template", "Icons", "AI Tools"];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let result = products;
    if (activeCategory !== "All") {
      result = result.filter((p) => p.category === activeCategory);
    }
    if (searchQuery) {
      result = result.filter((p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredProducts(result);
  }, [searchQuery, activeCategory, products]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <Loader2 className="animate-spin text-blue-600" size={48} />
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 md:pt-32 pb-16 md:pb-20 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black dark:text-white tracking-tight">
            Our <span className="text-blue-600">Digital Assets</span>
          </h1>

          <div className="relative w-full md:w-80 group">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search assets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none dark:text-white shadow-sm"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto mb-12 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap border ${
                activeCategory === cat
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white dark:bg-slate-900 text-slate-500 border-slate-200 dark:border-slate-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="group bg-white dark:bg-slate-900 rounded-[2.5rem] p-5 border border-slate-200 dark:border-slate-800 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col h-full"
            >
              <div className="relative h-52 w-full overflow-hidden rounded-[2rem] mb-5 bg-slate-100 dark:bg-slate-800">
                <img
                  src={product.image}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  alt={product.title}
                />
                <div className="absolute top-4 left-4">
                  <span className="flex items-center gap-1 px-3 py-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-full text-[10px] font-bold text-blue-600 uppercase border border-white/20">
                    <Tag size={10} /> {product.category || "Digital"}
                  </span>
                </div>
              </div>

              <div className="flex-1">
                <h3 className="font-bold text-xl dark:text-white mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
                  {product.title}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 line-clamp-2 leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-slate-100 dark:border-slate-800 mt-auto">
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                    Price
                  </span>
                  <span className="text-2xl font-black dark:text-white flex items-center">
                    <DollarSign size={20} className="text-emerald-500" />
                    {product.price}
                  </span>
                </div>

                <Link
                  href={`/products/${product._id}`}
                  className="flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold shadow-lg shadow-blue-500/20 transition-all active:scale-95 group-hover:translate-x-1"
                >
                  Details
                  <ArrowUpRight size={18} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;

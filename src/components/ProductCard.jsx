import { Package, Tag, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-2xl hover:shadow-blue-500/10 transition-all group">
      <div className="aspect-video relative overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img 
          src={product.image} 
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-blue-600 border border-white/20">
            {product.category}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold dark:text-white mb-2 truncate group-hover:text-blue-500 transition-colors">
          {product.title}
        </h3>
        <p className="text-slate-500 text-sm line-clamp-2 mb-6">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Price</p>
            <span className="text-2xl font-black dark:text-white">${product.price}</span>
          </div>
          <Link 
            href={`/products/${product._id}`}
            className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl shadow-lg shadow-blue-500/20 transition-all active:scale-95"
          >
            <ArrowUpRight size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
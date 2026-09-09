import React from "react";
import { Star, ShoppingCart, Eye, Sparkles, CheckCircle2 } from "lucide-react";
import { useApp } from "../../context/AppContext";

export default function ProductCard({ product }) {
  const { addToCart, setSelectedProduct } = useApp();

  const discountPercent =
    product.originalPrice > product.price
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) *
            100,
        )
      : 0;

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden group">
      {/* Image container */}
      <div
        className="relative aspect-[4/3] bg-slate-50 overflow-hidden cursor-pointer"
        onClick={() => setSelectedProduct(product)}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 items-start">
          {discountPercent > 0 && (
            <span className="bg-red-500 text-white text-[11px] font-black px-2 py-0.5 rounded-lg shadow-sm">
              -{discountPercent}%
            </span>
          )}
          {product.badge && (
            <span className="bg-emerald-600/90 backdrop-blur text-white text-[10px] font-bold px-2 py-0.5 rounded-lg shadow-sm flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              {product.badge}
            </span>
          )}
        </div>

        {/* Quick View Button on Hover */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSelectedProduct(product);
          }}
          className="absolute bottom-3 right-3 px-3 py-1.5 rounded-xl bg-white/90 hover:bg-white text-slate-800 text-xs font-semibold shadow-md flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-y-2 group-hover:translate-y-0"
        >
          <Eye className="w-3.5 h-3.5 text-fruit-green" />
          <span>Xem nhanh</span>
        </button>
      </div>

      {/* Card Info */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Origin and Category */}
          <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium mb-1">
            <span>{product.origin}</span>
            <span className="text-emerald-600 font-semibold">
              {product.unit}
            </span>
          </div>

          {/* Product Name */}
          <h3
            onClick={() => setSelectedProduct(product)}
            className="font-bold text-sm text-slate-900 line-clamp-2 hover:text-fruit-green cursor-pointer transition-colors leading-snug"
          >
            {product.name}
          </h3>

          {/* Sweetness tag */}
          <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
            <span className="truncate">{product.sweetness}</span>
          </p>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-2">
            <div className="flex items-center text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span className="text-xs font-bold text-slate-700 ml-1">
                {product.rating}
              </span>
            </div>
            <span className="text-[11px] text-slate-400">
              ({product.reviewCount} đánh giá)
            </span>
          </div>
        </div>

        {/* Pricing & Add to Cart */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <div className="text-base font-black text-emerald-700">
              {product.price.toLocaleString("vi-VN")}đ
            </div>
            {product.originalPrice > product.price && (
              <div className="text-xs text-slate-400 line-through">
                {product.originalPrice.toLocaleString("vi-VN")}đ
              </div>
            )}
          </div>

          <button
            onClick={() => addToCart(product, 1)}
            className="px-3.5 py-2 bg-fruit-green hover:bg-emerald-700 active:scale-95 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm shadow-fruit-green/30 transition-all"
            title="Thêm vào giỏ"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>Mua</span>
          </button>
        </div>
      </div>
    </div>
  );
}

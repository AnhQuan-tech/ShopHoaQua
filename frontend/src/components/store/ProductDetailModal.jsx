import React, { useState } from "react";
import {
  X,
  Star,
  ShoppingCart,
  ShieldCheck,
  Truck,
  RotateCcw,
  Check,
  Minus,
  Plus,
  Heart,
  Share2,
} from "lucide-react";
import { useApp } from "../../context/AppContext";

export default function ProductDetailModal() {
  const { selectedProduct, setSelectedProduct, addToCart } = useApp();
  const [quantity, setQuantity] = useState(1);
  const [selectedUnit, setSelectedUnit] = useState("1kg");

  if (!selectedProduct) return null;

  const discountPercent =
    selectedProduct.originalPrice > selectedProduct.price
      ? Math.round(
          ((selectedProduct.originalPrice - selectedProduct.price) /
            selectedProduct.originalPrice) *
            100,
        )
      : 0;

  const handleAddToCart = () => {
    addToCart(selectedProduct, quantity);
    setSelectedProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col md:flex-row">
        {/* Close Button */}
        <button
          onClick={() => setSelectedProduct(null)}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors shadow-sm"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Product Image */}
        <div className="md:w-1/2 bg-slate-50 relative p-6 flex items-center justify-center">
          <img
            src={selectedProduct.image}
            alt={selectedProduct.name}
            className="w-full h-auto max-h-80 object-cover rounded-2xl shadow-md"
          />
          {discountPercent > 0 && (
            <span className="absolute top-6 left-6 bg-red-600 text-white text-xs font-black px-2.5 py-1 rounded-xl shadow">
              SALE -{discountPercent}%
            </span>
          )}
        </div>

        {/* Right: Product Details */}
        <div className="md:w-1/2 p-6 sm:p-8 overflow-y-auto flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                {selectedProduct.categoryName}
              </span>
              <span className="text-xs text-slate-400">
                Xuất xứ: {selectedProduct.origin}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
              {selectedProduct.name}
            </h2>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-2 text-xs">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
              <span className="font-bold text-slate-700">
                {selectedProduct.rating}
              </span>
              <span className="text-slate-400">
                ({selectedProduct.reviewCount} khách hàng hài lòng)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 my-4">
              <span className="text-2xl font-black text-emerald-700">
                {selectedProduct.price.toLocaleString("vi-VN")}đ
              </span>
              {selectedProduct.originalPrice > selectedProduct.price && (
                <span className="text-sm text-slate-400 line-through">
                  {selectedProduct.originalPrice.toLocaleString("vi-VN")}đ
                </span>
              )}
              <span className="text-xs text-slate-500 font-medium">
                /{selectedProduct.unit}
              </span>
            </div>

            {/* Description */}
            <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
              {selectedProduct.description}
            </p>

            {/* Highlights */}
            <div className="grid grid-cols-2 gap-2 mt-4 text-[11px] text-slate-600 font-medium">
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-500" />
                <span>Độ ngọt: {selectedProduct.sweetness}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Bao ăn 1 đổi 1 trong 24h</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-emerald-500" />
                <span>Giao hỏa tốc lạnh 2 giờ</span>
              </div>
              <div className="flex items-center gap-1.5">
                <RotateCcw className="w-4 h-4 text-emerald-500" />
                <span>Tồn kho: {selectedProduct.stock} sản phẩm</span>
              </div>
            </div>

            {/* Quantity Stepper */}
            <div className="flex items-center gap-4 mt-6 pt-4 border-t border-slate-100">
              <span className="text-xs font-bold text-slate-700">
                Số lượng:
              </span>
              <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
                <button
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  className="px-3 py-1.5 hover:bg-slate-200 text-slate-700 transition-colors"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-4 py-1 font-bold text-xs text-slate-800">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="px-3 py-1.5 hover:bg-slate-200 text-slate-700 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 mt-6">
            <button
              onClick={handleAddToCart}
              className="flex-1 py-3 bg-fruit-green hover:bg-emerald-700 active:scale-98 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-fruit-green/30 transition-all"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>
                Thêm Vào Giỏ -{" "}
                {(selectedProduct.price * quantity).toLocaleString("vi-VN")}đ
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

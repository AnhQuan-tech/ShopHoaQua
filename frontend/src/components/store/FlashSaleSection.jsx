import React, { useState, useEffect } from "react";
import { Flame, Clock, Zap, ShoppingCart, Eye } from "lucide-react";
import { useApp } from "../../context/AppContext";

export default function FlashSaleSection() {
  const { products, addToCart, setSelectedProduct } = useApp();
  const flashProducts = products.filter((p) => p.isFlashSale).slice(0, 4);

  // Countdown timer: 5 hours from now
  const [timeLeft, setTimeLeft] = useState({
    hours: 5,
    minutes: 42,
    seconds: 19,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 6, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (flashProducts.length === 0) return null;

  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-red-500 via-orange-500 to-amber-500 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-orange-500/20">
          {/* Header with Title & Countdown */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/20">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center shadow-inner">
                <Flame className="w-7 h-7 text-yellow-300 animate-bounce" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl sm:text-3xl font-black tracking-tight uppercase">
                    GIỜ VÀNG GIÁ SỐC
                  </h2>
                  <span className="bg-white text-red-600 font-extrabold text-[11px] px-2 py-0.5 rounded-full uppercase shadow">
                    Sale 50%
                  </span>
                </div>
                <p className="text-xs text-white/90">
                  Trái cây nhập khẩu tươi mới cập bến, số lượng có hạn!
                </p>
              </div>
            </div>

            {/* Countdown Clocks */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-white/90 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> Kết thúc sau:
              </span>
              <div className="flex items-center gap-1.5 font-mono font-black text-sm">
                <span className="bg-slate-950/80 px-2.5 py-1.5 rounded-lg shadow-inner">
                  {String(timeLeft.hours).padStart(2, "0")}
                </span>
                <span>:</span>
                <span className="bg-slate-950/80 px-2.5 py-1.5 rounded-lg shadow-inner">
                  {String(timeLeft.minutes).padStart(2, "0")}
                </span>
                <span>:</span>
                <span className="bg-slate-950/80 px-2.5 py-1.5 rounded-lg shadow-inner text-yellow-300">
                  {String(timeLeft.seconds).padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pt-6">
            {flashProducts.map((p, idx) => {
              const discountPercent = Math.round(
                ((p.originalPrice - p.price) / p.originalPrice) * 100,
              );
              const soldPercent = 65 + idx * 9; // sample sold progress

              return (
                <div
                  key={p.id}
                  className="bg-white rounded-2xl p-4 text-slate-800 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group"
                >
                  {/* Image container */}
                  <div className="relative aspect-square rounded-xl overflow-hidden mb-3 bg-slate-100">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-black px-2 py-0.5 rounded-lg shadow">
                      -{discountPercent}%
                    </span>
                    <button
                      onClick={() => setSelectedProduct(p)}
                      className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-slate-700 flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Xem chi tiết"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-orange-600 tracking-wider">
                        {p.categoryName}
                      </span>
                      <h3
                        onClick={() => setSelectedProduct(p)}
                        className="font-bold text-sm text-slate-900 line-clamp-1 hover:text-fruit-green cursor-pointer mt-0.5"
                      >
                        {p.name}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1">
                        {p.origin} • {p.unit}
                      </p>
                    </div>

                    <div className="mt-3">
                      <div className="flex items-baseline gap-2">
                        <span className="text-base font-extrabold text-red-600">
                          {p.price.toLocaleString("vi-VN")}đ
                        </span>
                        <span className="text-xs text-slate-400 line-through">
                          {p.originalPrice.toLocaleString("vi-VN")}đ
                        </span>
                      </div>

                      {/* Progress Bar */}
                      <div className="mt-2">
                        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden relative">
                          <div
                            className="bg-gradient-to-r from-orange-500 to-red-500 h-full rounded-full transition-all"
                            style={{ width: `${soldPercent}%` }}
                          />
                        </div>
                        <span className="text-[10px] text-slate-500 font-semibold mt-1 flex items-center gap-1">
                          <Zap className="w-3 h-3 text-orange-500 fill-orange-500" />{" "}
                          Đã bán {soldPercent}%
                        </span>
                      </div>

                      <button
                        onClick={() => addToCart(p, 1)}
                        className="w-full mt-3 py-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition-transform active:scale-95"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        <span>Thêm Vào Giỏ</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

import React, { useState } from "react";
import {
  Search,
  ShoppingBag,
  ShieldCheck,
  Sparkles,
  Settings,
  Phone,
  MapPin,
  ChevronRight,
  Flame,
} from "lucide-react";
import { useApp } from "../../context/AppContext";

export default function Header() {
  const {
    cartCount,
    cartSubtotal,
    setIsCartOpen,
    setCurrentView,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    categories,
    isPluginActive,
    getPlugin,
    settings,
  } = useApp();

  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const countdownPlugin = getPlugin("wp_countdown_bar");
  const showCountdown = isPluginActive("wp_countdown_bar");

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100 transition-all">
      {/* Top Banner Marquee (Plugin WP Countdown Bar) */}
      {showCountdown && (
        <div className="bg-gradient-to-r from-emerald-600 via-fruit-green to-teal-600 text-white py-1.5 px-4 text-xs font-semibold overflow-hidden">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center gap-2 truncate">
              <span className="flex items-center gap-1 bg-white/20 px-2 py-0.5 rounded-full text-[11px] uppercase tracking-wider font-bold">
                <Flame className="w-3.5 h-3.5 text-yellow-300 animate-pulse" />{" "}
                Flash Deal
              </span>
              <span className="truncate">
                {countdownPlugin?.settings?.message ||
                  "Giảm 20% đơn từ 300k - Freeship hỏa tốc toàn quốc!"}
              </span>
            </div>
            <div className="hidden md:flex items-center gap-4 text-white/90 shrink-0">
              <span className="flex items-center gap-1">
                <Phone className="w-3 h-3" /> Hotline:{" "}
                {settings.hotline || "1900 8888"}
              </span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> 100% Trái cây sạch VietGAP
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Main Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between gap-4 md:gap-8">
          {/* Brand Logo */}
          <div
            onClick={() => {
              setSelectedCategory("all");
              setSearchQuery("");
            }}
            className="flex items-center gap-3 cursor-pointer group shrink-0"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-fruit-green to-emerald-400 flex items-center justify-center text-white shadow-md shadow-fruit-green/30 group-hover:scale-105 transition-transform">
              <span className="text-2xl select-none">🍎</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-fruit-green to-emerald-700 bg-clip-text text-transparent">
                  FRUIT PARADISE
                </span>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.5 rounded uppercase">
                  Organic
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium tracking-wide">
                Hoa Quả Nhập Khẩu & Sạch 100%
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl hidden sm:block">
            <div
              className={`relative transition-all duration-200 ${isSearchFocused ? "ring-2 ring-fruit-green/30" : ""}`}
            >
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                placeholder="Tìm táo Envy, nho Mẫu Đơn, cherry Mỹ, sầu riêng Ri6..."
                className="w-full pl-11 pr-4 py-2.5 bg-slate-100 hover:bg-slate-50 focus:bg-white rounded-xl text-sm border-transparent focus:border-fruit-green focus:outline-none transition-colors"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-3 text-xs text-slate-400 hover:text-slate-600 bg-slate-200 rounded-full w-5 h-5 flex items-center justify-center"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Action Buttons: Cart & WordPress Admin Switch */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Switch to WP Admin Button */}
            <button
              onClick={() => setCurrentView("admin")}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-sm hover:shadow transition-all group"
              title="Vào trang quản trị WordPress (tk: admin / pass: admin)"
            >
              <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center font-serif font-black text-[11px] text-white">
                W
              </div>
              <span className="hidden md:inline font-medium">
                Trang Quản Trị WP
              </span>
              <span className="bg-emerald-500 text-white text-[10px] px-1.5 py-0.5 rounded font-mono">
                Admin
              </span>
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2.5 px-4 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100/80 text-emerald-800 font-semibold text-sm transition-colors border border-emerald-200/60"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-fruit-green" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 text-white text-[11px] font-bold flex items-center justify-center shadow-sm animate-bounce-slight">
                    {cartCount}
                  </span>
                )}
              </div>
              <div className="hidden lg:flex flex-col text-left">
                <span className="text-[10px] text-emerald-600 uppercase font-bold tracking-wider leading-none">
                  Giỏ hàng
                </span>
                <span className="text-xs font-bold text-slate-800 leading-tight">
                  {cartSubtotal.toLocaleString("vi-VN")}đ
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Search Input */}
        <div className="mt-2.5 sm:hidden">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm hoa quả tươi sạch..."
              className="w-full pl-10 pr-4 py-2 bg-slate-100 rounded-xl text-xs border-none focus:outline-none focus:ring-2 focus:ring-fruit-green"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          </div>
        </div>

        {/* Category Navigation Chips */}
        <nav className="flex items-center gap-2 overflow-x-auto pt-3 pb-1 no-scrollbar text-xs font-medium">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isActive
                    ? "bg-fruit-green text-white font-semibold shadow-sm shadow-fruit-green/30"
                    : "bg-slate-100/90 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900"
                }`}
              >
                {cat.id === "all" && <Sparkles className="w-3.5 h-3.5" />}
                {cat.name}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

import React, { useState, useEffect } from "react";
import { X, Sparkles, Tag, Gift, Check, ArrowRight } from "lucide-react";
import confetti from "canvas-confetti";
import { useApp } from "../../context/AppContext";

export default function MegaSalePopup() {
  const { isPluginActive, getPlugin, applyVoucherCode, showToast } = useApp();
  const plugin = getPlugin("wp_mega_popup");
  const isActive = isPluginActive("wp_mega_popup");

  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isActive) return;
    const dismissed = sessionStorage.getItem("fruit_mega_popup_dismissed");
    if (dismissed === "true") return;

    const delay = (plugin?.settings?.delaySeconds || 1.5) * 1000;
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [isActive, plugin]);

  if (!isActive || !isOpen) return null;

  const settings = plugin?.settings || {};
  const coupon = settings.couponCode || "HOAQUA50";

  const handleClaim = () => {
    applyVoucherCode(coupon);
    setCopied(true);
    confetti({ particleCount: 70, spread: 60 });
    setTimeout(() => {
      setIsOpen(false);
      sessionStorage.setItem("fruit_mega_popup_dismissed", "true");
    }, 1200);
  };

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem("fruit_mega_popup_dismissed", "true");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in zoom-in-95 duration-300">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-emerald-500/30">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white flex items-center justify-center transition-colors shadow"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Top Banner Image with Badge */}
        <div className="relative h-44 bg-slate-900 overflow-hidden">
          <img
            src={
              settings.imageUrl ||
              "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=700&q=80"
            }
            alt="Promotion Banner"
            className="w-full h-full object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          <div className="absolute bottom-4 left-6 right-6 text-white">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-extrabold uppercase tracking-wider mb-1.5 shadow">
              <Sparkles className="w-3 h-3 text-yellow-300" />
              {settings.badgeText || "FLASH DEAL ĐẶC BIỆT"}
            </span>
            <h3 className="text-xl font-black text-white leading-tight drop-shadow-md">
              {settings.title || "🎉 ĐẠI TIỆC HOA QUẢ NHẬP KHẨU GIẢM 50%"}
            </h3>
          </div>
        </div>

        {/* Body content */}
        <div className="p-6 text-center">
          <p className="text-xs text-slate-600 leading-relaxed max-w-sm mx-auto">
            {settings.subtitle ||
              "Chào bạn mới! Tặng ngay voucher giảm 50.000đ cho đơn hàng hoa quả tươi đầu tiên."}
          </p>

          {/* Voucher Box */}
          <div className="my-5 p-3.5 bg-emerald-50/70 border-2 border-dashed border-emerald-400 rounded-2xl flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 text-left">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <Tag className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-emerald-600">
                  Mã Khuyến Mãi
                </span>
                <p className="text-base font-black font-mono text-slate-900 tracking-wider">
                  {coupon}
                </p>
              </div>
            </div>

            <button
              onClick={handleClaim}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow transition-all active:scale-95 flex items-center gap-1.5"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : null}
              <span>{copied ? "Đã Nhận!" : "Sao Chép"}</span>
            </button>
          </div>

          {/* Claim Button */}
          <button
            onClick={handleClaim}
            className="w-full py-3 bg-gradient-to-r from-fruit-green to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-fruit-green/30 transition-all flex items-center justify-center gap-2"
          >
            <Gift className="w-4 h-4" />
            <span>{settings.ctaText || "ÁP DỤNG MÃ VÀ MUA NGAY"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <p className="text-[10px] text-slate-400 mt-3">
            *Áp dụng cho mọi đơn hàng hoa quả từ 300.000đ. Có hiệu lực trong hôm
            nay.
          </p>
        </div>
      </div>
    </div>
  );
}

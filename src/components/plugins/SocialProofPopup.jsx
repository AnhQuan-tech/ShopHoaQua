import React, { useState, useEffect } from "react";
import { ShoppingBag, CheckCircle2, X } from "lucide-react";
import { useApp } from "../../context/AppContext";

const NOTIFICATIONS = [
  {
    name: "Chị Mai Anh",
    area: "Hoàn Kiếm, Hà Nội",
    item: "2kg Táo Envy New Zealand Size 35",
    time: "3 phút trước",
    image:
      "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=150&q=80",
  },
  {
    name: "Anh Quốc Tuấn",
    area: "Bình Thạnh, TP.HCM",
    item: "Giỏ Quà Trái Cây Hoàng Gia VIP",
    time: "5 phút trước",
    image:
      "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=150&q=80",
  },
  {
    name: "Chị Thu Phương",
    area: "Cầu Giấy, Hà Nội",
    item: "1 Chùm Nho Mẫu Đơn Shine Muscat 750g",
    time: "1 phút trước",
    image:
      "https://images.unsplash.com/photo-1596363505729-4190a9506133?auto=format&fit=crop&w=150&q=80",
  },
  {
    name: "Anh Minh Trí",
    area: "Hải Châu, Đà Nẵng",
    item: "3kg Sầu Riêng Ri6 Đắk Lắk Cơm Vàng",
    time: "7 phút trước",
    image:
      "https://images.unsplash.com/photo-1587132137056-bfbf0166836e?auto=format&fit=crop&w=150&q=80",
  },
  {
    name: "Cô Hoàng Yến",
    area: "Quận 1, TP.HCM",
    item: "Hộp 500g Cherry Đỏ Washington Premium",
    time: "vừa xong",
    image:
      "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=150&q=80",
  },
];

export default function SocialProofPopup() {
  const { isPluginActive, getPlugin } = useApp();
  const isActive = isPluginActive("wp_social_proof");
  const plugin = getPlugin("wp_social_proof");

  const [currentIdx, setCurrentIdx] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (!isActive || dismissed) return;

    const intervalSeconds = (plugin?.settings?.intervalSeconds || 9) * 1000;

    // Show popup
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    // Loop interval
    const loopInterval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIdx((prev) => (prev + 1) % NOTIFICATIONS.length);
        setIsVisible(true);
      }, 800);
    }, intervalSeconds);

    return () => {
      clearTimeout(showTimer);
      clearInterval(loopInterval);
    };
  }, [isActive, dismissed, plugin]);

  if (!isActive || dismissed || !isVisible) return null;

  const current = NOTIFICATIONS[currentIdx];

  return (
    <div className="fixed bottom-5 left-5 z-40 max-w-sm animate-in fade-in slide-in-from-bottom-5 duration-500">
      <div className="bg-white/95 backdrop-blur-md rounded-2xl p-3 border border-slate-200/80 shadow-xl shadow-slate-900/10 flex items-center gap-3 relative">
        <button
          onClick={() => setDismissed(true)}
          className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-600 flex items-center justify-center text-[10px]"
        >
          <X className="w-3 h-3" />
        </button>

        <img
          src={current.image}
          alt={current.item}
          className="w-12 h-12 rounded-xl object-cover shrink-0 shadow-sm border border-slate-100"
        />

        <div className="flex-1 pr-2">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-slate-800">
              {current.name}
            </span>
            <span className="text-[10px] text-slate-400">({current.area})</span>
          </div>
          <p className="text-[11px] text-emerald-700 font-medium line-clamp-1 mt-0.5">
            Đã đặt: {current.item}
          </p>
          <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-0.5">
            <CheckCircle2 className="w-3 h-3 text-emerald-500" />
            <span>Đã xác nhận • {current.time}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

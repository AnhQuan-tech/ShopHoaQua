import React, { useState, useEffect } from "react";
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Truck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useApp } from "../../context/AppContext";

const SLIDES = [
  {
    id: 1,
    tag: "Tươi Ngon Thượng Hạng",
    title: "Đại Tiệc Trái Cây Nhập Khẩu Đường Hàng Không",
    subtitle:
      "Táo Envy New Zealand, Nho Mẫu Đơn Shine Muscat, Cherry đỏ Washington chuẩn VIP cập bến mỗi ngày.",
    badge: "GIẢM ĐẾN 30% HÔM NAY",
    btnText: "Sắm Trái Cây Ngay",
    image:
      "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=1200&q=85",
    category: "nhap-khau",
  },
  {
    id: 2,
    tag: "Đặc Sản Vùng Miền",
    title: "Sầu Riêng Ri6 Đắk Lắk Cơm Vàng Hạt Lép",
    subtitle:
      "Bao ăn 1 đổi 1 tận tay! Múi cơm vàng óng, dẻo quánh, vị ngọt béo ngậy thơm nức mũi.",
    badge: "BAO ĂN 100% HOÀN TIỀN",
    btnText: "Xem Sầu Riêng Ri6",
    image:
      "https://images.unsplash.com/photo-1587132137056-bfbf0166836e?auto=format&fit=crop&w=1200&q=85",
    category: "noi-dia",
  },
  {
    id: 3,
    tag: "Quà Tặng Doanh Nghiệp & Gia Đình",
    title: "Giỏ Quà Trái Cây Hoàng Gia Thiết Kế Độc Quyền",
    subtitle:
      "Món quà tri ân đẳng cấp, trang trí nơ lụa thủ công và thiệp chúc mừng thiết kế riêng.",
    badge: "TẶNG THIỆP & NƠ LỤA VIP",
    btnText: "Đặt Giỏ Quà Biếu Tặng",
    image:
      "https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&w=1200&q=85",
    category: "gio-qua",
  },
];

export default function HeroBanner() {
  const { setSelectedCategory } = useApp();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = SLIDES[currentSlide];

  return (
    <section className="relative overflow-hidden pt-4 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-slate-900 shadow-2xl min-h-[420px] md:min-h-[480px] flex items-center">
          {/* Background Image with Gradient Overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-all duration-1000 transform scale-105"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/70 to-transparent"></div>
          </div>

          {/* Slide Content */}
          <div className="relative z-10 max-w-2xl px-6 sm:px-12 py-12 text-white">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fruit-green/30 border border-fruit-green/50 text-fruit-green text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{slide.tag}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-fruit-green"></span>
              <span className="text-yellow-400">{slide.badge}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight mb-4 text-white">
              {slide.title}
            </h1>

            <p className="text-sm sm:text-base text-slate-300 mb-8 leading-relaxed line-clamp-3">
              {slide.subtitle}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => setSelectedCategory(slide.category)}
                className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-fruit-green to-emerald-500 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold text-sm shadow-lg shadow-fruit-green/40 hover:scale-105 transition-all"
              >
                <span>{slide.btnText}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-3 text-xs text-slate-300 font-medium">
                <span className="flex items-center gap-1">
                  <Truck className="w-4 h-4 text-emerald-400" /> Giao lạnh 2h
                </span>
                <span className="w-1 h-1 rounded-full bg-slate-500"></span>
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" /> 100% Tươi
                  ngon
                </span>
              </div>
            </div>
          </div>

          {/* Controls Prev/Next */}
          <button
            onClick={() =>
              setCurrentSlide(
                (prev) => (prev - 1 + SLIDES.length) % SLIDES.length,
              )
            }
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur flex items-center justify-center transition-all z-20"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() =>
              setCurrentSlide((prev) => (prev + 1) % SLIDES.length)
            }
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur flex items-center justify-center transition-all z-20"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Indicators */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
            {SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 rounded-full transition-all ${idx === currentSlide ? "w-8 bg-fruit-green" : "w-2 bg-white/40"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

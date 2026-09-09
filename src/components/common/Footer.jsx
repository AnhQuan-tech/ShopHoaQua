import React from "react";
import {
  ShieldCheck,
  Truck,
  RotateCcw,
  Award,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import { useApp } from "../../context/AppContext";

export default function Footer() {
  const { settings, setCurrentView } = useApp();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800 mt-20">
      {/* 4 Value Propositions / Commitments */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 rounded-2xl bg-slate-800/60 border border-slate-700/60">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">
                100% Nguồn Gốc Rõ Ràng
              </h4>
              <p className="text-xs text-slate-400">
                VietGAP & GlobalGAP chuẩn VIP
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">
                Bao Ăn 1 Đổi 1 Trong 24H
              </h4>
              <p className="text-xs text-slate-400">
                Cam kết ngọt ngon từng quả
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">
                Giao Hỏa Tốc 2 Giờ
              </h4>
              <p className="text-xs text-slate-400">
                Bảo quản lạnh giữ trọn độ tươi
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">
                Giỏ Quà Thiết Kế VIP
              </h4>
              <p className="text-xs text-slate-400">
                Sang trọng cho lễ Tết & sự kiện
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-slate-800">
          {/* Col 1: Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="text-3xl">🍎</span>
              <span className="text-xl font-extrabold text-white tracking-tight">
                FRUIT PARADISE
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Hệ thống cửa hàng phân phối trái cây nhập khẩu đường bay cao cấp
              và nông sản nội địa đặc sản hàng đầu Việt Nam.
            </p>
            <div className="pt-2">
              <button
                onClick={() => setCurrentView("admin")}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono transition-colors border border-slate-700"
              >
                <span>WordPress Admin CMS (admin/admin)</span>
              </button>
            </div>
          </div>

          {/* Col 2: Liên kết nhanh */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Danh Mục Trái Cây
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="hover:text-emerald-400 cursor-pointer">
                Táo Envy & Cherry Mỹ
              </li>
              <li className="hover:text-emerald-400 cursor-pointer">
                Nho Mẫu Đơn Shine Muscat
              </li>
              <li className="hover:text-emerald-400 cursor-pointer">
                Sầu Riêng Ri6 Hạt Lép Đắk Lắk
              </li>
              <li className="hover:text-emerald-400 cursor-pointer">
                Giỏ Quà Trái Cây Biếu Tặng VIP
              </li>
              <li className="hover:text-emerald-400 cursor-pointer">
                Nước Ép & Detox Tươi Sạch
              </li>
            </ul>
          </div>

          {/* Col 3: Chính sách */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Hỗ Trợ Khách Hàng
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="hover:text-emerald-400 cursor-pointer">
                Chính sách bao ăn 1 đổi 1
              </li>
              <li className="hover:text-emerald-400 cursor-pointer">
                Chính sách vận chuyển hỏa tốc
              </li>
              <li className="hover:text-emerald-400 cursor-pointer">
                Hướng dẫn đặt giỏ quà doanh nghiệp
              </li>
              <li className="hover:text-emerald-400 cursor-pointer">
                Hình thức thanh toán MoMo / VietQR
              </li>
            </ul>
          </div>

          {/* Col 4: Liên hệ */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Thông Tin Cửa Hàng
            </h4>
            <div className="space-y-3 text-xs text-slate-400">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  {settings.address ||
                    "Landmark 81, TP.HCM & 88 Hai Bà Trưng, Hà Nội"}
                </span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-white font-bold">
                  {settings.phone || "0988.888.999"}
                </span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{settings.email || "contact@fruitparadise.vn"}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>
            © 2026 Fruit Paradise. Giao diện chuẩn UI/UX Pro Max & Hệ thống quản
            trị WordPress CMS.
          </p>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-400 cursor-pointer">Bảo mật</span>
            <span className="hover:text-slate-400 cursor-pointer">
              Điều khoản
            </span>
            <span className="hover:text-slate-400 cursor-pointer">Sitemap</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

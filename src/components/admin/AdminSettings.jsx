import React, { useState } from "react";
import {
  Settings,
  Save,
  Shield,
  KeyRound,
  Truck,
  Plus,
  Trash2,
  Tag,
} from "lucide-react";
import { useApp } from "../../context/AppContext";

export default function AdminSettings() {
  const { settings, saveSettings, showToast } = useApp();
  const [formData, setFormData] = useState({ ...settings });
  const [newVoucher, setNewVoucher] = useState({
    code: "",
    discount: "",
    minOrder: "",
    desc: "",
  });

  const handleChange = (field, val) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    await saveSettings(formData);
  };

  const handleAddVoucher = (e) => {
    e.preventDefault();
    if (!newVoucher.code || !newVoucher.discount) {
      showToast("Vui lòng nhập mã và số tiền giảm!", "error");
      return;
    }

    const updatedVouchers = [
      ...(formData.vouchers || []),
      {
        code: newVoucher.code.toUpperCase().trim(),
        discount: Number(newVoucher.discount),
        minOrder: Number(newVoucher.minOrder) || 0,
        desc:
          newVoucher.desc ||
          `Giảm ${Number(newVoucher.discount).toLocaleString("vi-VN")}đ`,
      },
    ];

    setFormData((prev) => ({ ...prev, vouchers: updatedVouchers }));
    setNewVoucher({ code: "", discount: "", minOrder: "", desc: "" });
    showToast('Đã thêm mã voucher mới! Đừng quên bấm "Lưu Cài Đặt"', "info");
  };

  const handleRemoveVoucher = (index) => {
    const updated = (formData.vouchers || []).filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, vouchers: updated }));
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Cài Đặt Hệ Thống & Cửa Hàng
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Cấu hình thông tin thương hiệu, vận chuyển, mã voucher và mật khẩu
          quản trị viên
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6 text-xs">
        {/* General Store Info */}
        <div className="bg-white p-6 rounded-xl border border-[#c3c4c7] shadow-sm space-y-4">
          <h2 className="font-bold text-sm text-slate-900 border-b border-slate-100 pb-2">
            1. Thông Tin Cửa Hàng Hoa Quả
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Tên Thương Hiệu Shop
              </label>
              <input
                type="text"
                value={formData.siteTitle || ""}
                onChange={(e) => handleChange("siteTitle", e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:bg-white"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Hotline Đặt Hàng
              </label>
              <input
                type="text"
                value={formData.hotline || ""}
                onChange={(e) => handleChange("hotline", e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Số Điện Thoại Di Động / Zalo
              </label>
              <input
                type="text"
                value={formData.phone || ""}
                onChange={(e) => handleChange("phone", e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:bg-white"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Email Liên Hệ
              </label>
              <input
                type="email"
                value={formData.email || ""}
                onChange={(e) => handleChange("email", e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Địa Chỉ Các Chi Nhánh Cửa Hàng
            </label>
            <input
              type="text"
              value={formData.address || ""}
              onChange={(e) => handleChange("address", e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:bg-white"
            />
          </div>
        </div>

        {/* Shipping settings */}
        <div className="bg-white p-6 rounded-xl border border-[#c3c4c7] shadow-sm space-y-4">
          <h2 className="font-bold text-sm text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
            <Truck className="w-4 h-4 text-emerald-600" />
            <span>2. Chính Sách Vận Chuyển Hỏa Tốc</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Phí Vận Chuyển Tiêu Chuẩn (VNĐ)
              </label>
              <input
                type="number"
                value={formData.shippingFee || 25000}
                onChange={(e) =>
                  handleChange("shippingFee", Number(e.target.value))
                }
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:bg-white font-semibold"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Giá Trị Đơn Hàng Tối Thiểu Được Miễn Phí Ship (VNĐ)
              </label>
              <input
                type="number"
                value={formData.freeShippingMin || 300000}
                onChange={(e) =>
                  handleChange("freeShippingMin", Number(e.target.value))
                }
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:bg-white font-semibold"
              />
            </div>
          </div>
        </div>

        {/* Admin Credentials */}
        <div className="bg-white p-6 rounded-xl border border-[#c3c4c7] shadow-sm space-y-4">
          <h2 className="font-bold text-sm text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#2271b1]" />
            <span>3. Tài Khoản Quản Trị Viên (WordPress Admin)</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Tên Đăng Nhập Admin
              </label>
              <input
                type="text"
                value={formData.adminUser || "admin"}
                onChange={(e) => handleChange("adminUser", e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:bg-white font-mono font-bold"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Mật Khẩu Admin
              </label>
              <input
                type="text"
                value={formData.adminPass || "admin"}
                onChange={(e) => handleChange("adminPass", e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:bg-white font-mono font-bold text-red-600"
              />
            </div>
          </div>
          <p className="text-[11px] text-slate-400">
            *Mặc định tài khoản là <strong>admin</strong> và mật khẩu là{" "}
            <strong>admin</strong> theo đúng yêu cầu của bạn.
          </p>
        </div>

        {/* Voucher Management */}
        <div className="bg-white p-6 rounded-xl border border-[#c3c4c7] shadow-sm space-y-4">
          <h2 className="font-bold text-sm text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
            <Tag className="w-4 h-4 text-emerald-600" />
            <span>4. Quản Lý Mã Voucher Giảm Giá</span>
          </h2>

          <div className="space-y-2">
            {(formData.vouchers || []).map((v, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono font-black text-xs text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded">
                    {v.code}
                  </span>
                  <div>
                    <span className="font-bold text-slate-800">
                      Giảm {v.discount.toLocaleString("vi-VN")}đ
                    </span>
                    <span className="text-slate-400 ml-2">
                      (Đơn từ {v.minOrder.toLocaleString("vi-VN")}đ)
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveVoucher(idx)}
                  className="text-slate-400 hover:text-red-500 p-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          {/* Add voucher row */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5 pt-2">
            <input
              type="text"
              placeholder="Mã (VD: HE2026)"
              value={newVoucher.code}
              onChange={(e) =>
                setNewVoucher({ ...newVoucher, code: e.target.value })
              }
              className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg outline-none uppercase font-mono"
            />
            <input
              type="number"
              placeholder="Số tiền giảm (VNĐ)"
              value={newVoucher.discount}
              onChange={(e) =>
                setNewVoucher({ ...newVoucher, discount: e.target.value })
              }
              className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg outline-none"
            />
            <input
              type="number"
              placeholder="Đơn tối thiểu (VNĐ)"
              value={newVoucher.minOrder}
              onChange={(e) =>
                setNewVoucher({ ...newVoucher, minOrder: e.target.value })
              }
              className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg outline-none"
            />
            <button
              type="button"
              onClick={handleAddVoucher}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-900 text-white rounded-lg font-bold flex items-center justify-center gap-1"
            >
              <Plus className="w-3 h-3" />
              <span>Thêm Mã</span>
            </button>
          </div>
        </div>

        {/* Save button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-6 py-2.5 bg-[#2271b1] hover:bg-[#135e96] text-white font-bold rounded-xl shadow-md flex items-center gap-2 text-xs"
          >
            <Save className="w-4 h-4" />
            <span>Lưu Toàn Bộ Cài Đặt</span>
          </button>
        </div>
      </form>
    </div>
  );
}

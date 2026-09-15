import React, { useState } from "react";
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  Tag,
  Truck,
  CheckCircle2,
} from "lucide-react";
import { useApp } from "../../context/AppContext";

export default function CartDrawer() {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    cartCount,
    updateCartQty,
    removeFromCart,
    cartSubtotal,
    shippingFee,
    discountAmount,
    cartTotal,
    appliedVoucher,
    applyVoucherCode,
    setIsCheckoutOpen,
    settings,
  } = useApp();

  const [voucherInput, setVoucherInput] = useState("");

  if (!isCartOpen) return null;

  const freeShippingThreshold = settings.freeShippingMin || 300000;
  const remainingForFreeShip = Math.max(
    0,
    freeShippingThreshold - cartSubtotal,
  );
  const freeShipPercent = Math.min(
    100,
    Math.round((cartSubtotal / freeShippingThreshold) * 100),
  );

  const handleApplyVoucher = (e) => {
    e.preventDefault();
    if (!voucherInput.trim()) return;
    applyVoucherCode(voucherInput);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Drawer Header */}
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-fruit-green" />
              <h2 className="text-base font-extrabold text-slate-900">
                Giỏ Hàng Của Bạn ({cartCount})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="px-5 py-3 bg-emerald-50/60 border-b border-emerald-100/60">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="flex items-center gap-1.5 font-bold text-emerald-800">
                <Truck className="w-3.5 h-3.5 text-fruit-green" />
                {remainingForFreeShip === 0
                  ? "Chúc mừng! Đơn hàng được FREESHIP hỏa tốc 🎉"
                  : `Mua thêm ${remainingForFreeShip.toLocaleString("vi-VN")}đ để được FREESHIP`}
              </span>
              <span className="text-[11px] font-extrabold text-emerald-700">
                {freeShipPercent}%
              </span>
            </div>
            <div className="w-full bg-emerald-100 rounded-full h-2 overflow-hidden">
              <div
                className="bg-fruit-green h-full rounded-full transition-all duration-300"
                style={{ width: `${freeShipPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="py-16 text-center">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3 text-3xl">
                  🛒
                </div>
                <h3 className="font-bold text-sm text-slate-700">
                  Giỏ hàng đang trống
                </h3>
                <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                  Hãy chọn thêm các loại hoa quả tươi ngon nhập khẩu và nội địa
                  để thưởng thức nhé!
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-5 px-5 py-2 rounded-xl bg-fruit-green text-white text-xs font-bold hover:bg-emerald-700 transition-colors shadow-sm"
                >
                  Khám phá hoa quả ngay
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3.5 p-3 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-md transition-all"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-xl shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-bold text-xs text-slate-800 line-clamp-1">
                          {item.name}
                        </h4>
                        <span className="text-[10px] text-slate-400">
                          {item.unit}
                        </span>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-slate-400 hover:text-red-500 transition-colors p-1"
                        title="Xóa khỏi giỏ"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      {/* Stepper */}
                      <div className="flex items-center border border-slate-200 rounded-lg bg-white overflow-hidden shadow-xs">
                        <button
                          onClick={() => updateCartQty(item.id, -1)}
                          className="px-2 py-0.5 hover:bg-slate-100 text-slate-600 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold text-slate-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQty(item.id, 1)}
                          className="px-2 py-0.5 hover:bg-slate-100 text-slate-600 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-bold text-xs text-emerald-700">
                        {(item.price * item.quantity).toLocaleString("vi-VN")}đ
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer & Checkout */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-slate-100 bg-white space-y-3.5">
              {/* Voucher Code Form */}
              <form onSubmit={handleApplyVoucher} className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={voucherInput}
                    onChange={(e) => setVoucherInput(e.target.value)}
                    placeholder="Nhập mã: HOAQUA50, FREESHIP"
                    className="w-full pl-8 pr-3 py-2 bg-slate-100 rounded-xl text-xs uppercase font-medium focus:bg-white focus:ring-2 focus:ring-fruit-green outline-none"
                  />
                  <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors"
                >
                  Áp Dụng
                </button>
              </form>

              {appliedVoucher && (
                <div className="flex items-center justify-between text-xs bg-emerald-50 text-emerald-800 px-3 py-1.5 rounded-lg border border-emerald-200">
                  <span className="flex items-center gap-1 font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Mã:{" "}
                    {appliedVoucher.code}
                  </span>
                  <span>
                    - {appliedVoucher.discount.toLocaleString("vi-VN")}đ
                  </span>
                </div>
              )}

              {/* Price Calculations */}
              <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
                <div className="flex justify-between">
                  <span>Tạm tính:</span>
                  <span className="font-semibold text-slate-800">
                    {cartSubtotal.toLocaleString("vi-VN")}đ
                  </span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Giảm giá voucher:</span>
                    <span>-{discountAmount.toLocaleString("vi-VN")}đ</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Phí giao hàng:</span>
                  <span className="font-semibold text-slate-800">
                    {shippingFee === 0 ? (
                      <span className="text-emerald-600 font-bold">
                        Miễn phí (Freeship)
                      </span>
                    ) : (
                      `${shippingFee.toLocaleString("vi-VN")}đ`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-base font-black text-slate-900 pt-2 border-t border-slate-100">
                  <span>Tổng thanh toán:</span>
                  <span className="text-emerald-700">
                    {cartTotal.toLocaleString("vi-VN")}đ
                  </span>
                </div>
              </div>

              {/* Proceed to Checkout Button */}
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setIsCheckoutOpen(true);
                }}
                className="w-full py-3.5 bg-gradient-to-r from-fruit-green to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 active:scale-98 text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-fruit-green/30 transition-all"
              >
                <span>Đặt Hàng Ngay</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

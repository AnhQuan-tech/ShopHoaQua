import React, { useState } from "react";
import {
  X,
  CheckCircle2,
  ShieldCheck,
  Truck,
  QrCode,
  Banknote,
  Sparkles,
  ArrowLeft,
  Copy,
} from "lucide-react";
import confetti from "canvas-confetti";
import { useApp } from "../../context/AppContext";

export default function CheckoutModal() {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartTotal,
    cartSubtotal,
    discountAmount,
    shippingFee,
    placeOrder,
    showToast,
  } = useApp();

  const [formData, setFormData] = useState({
    customer: "",
    phone: "",
    address: "",
    note: "",
    paymentMethod: "COD", // 'COD' | 'QR'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);

  if (!isCheckoutOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.customer.trim() ||
      !formData.phone.trim() ||
      !formData.address.trim()
    ) {
      showToast(
        "Vui lòng điền đầy đủ Họ tên, Số điện thoại và Địa chỉ nhận hàng!",
        "error",
      );
      return;
    }

    setIsSubmitting(true);
    const order = await placeOrder(formData);
    setIsSubmitting(false);

    if (order) {
      setCompletedOrder(order);
      // Trigger confetti celebration!
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  const handleClose = () => {
    setCompletedOrder(null);
    setIsCheckoutOpen(false);
  };

  // Generate VietQR dynamic link
  const qrUrl = `https://img.vietqr.io/image/MB-0988888999-compact2.png?amount=${cartTotal}&addInfo=FRUIT%20${completedOrder ? completedOrder.id : "ORDER"}&accountName=FRUIT%20PARADISE`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Order Completed Success View */}
        {completedOrder ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h2 className="text-2xl font-black text-slate-900">
              Đặt Hàng Thành Công! 🎉
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Mã đơn hàng:{" "}
              <span className="font-mono font-bold text-emerald-600 text-sm">
                {completedOrder.id}
              </span>
            </p>
            <p className="text-xs text-slate-600 mt-3 max-w-md mx-auto leading-relaxed">
              Cảm ơn quý khách{" "}
              <span className="font-bold text-slate-800">
                {completedOrder.customer}
              </span>
              ! Nhân viên Fruit Paradise đang chuẩn bị hoa quả tươi ngon và sẽ
              liên hệ giao hàng trong 2 giờ.
            </p>

            {/* QR Payment info if QR selected */}
            {completedOrder.paymentMethod === "QR" && (
              <div className="mt-6 p-5 bg-slate-50 rounded-2xl border border-slate-200 max-w-sm mx-auto">
                <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-slate-800 mb-2">
                  <QrCode className="w-4 h-4 text-emerald-600" />
                  <span>Quét Mã VietQR / MoMo Để Thanh Toán</span>
                </div>
                <img
                  src={qrUrl}
                  alt="VietQR Payment"
                  className="w-48 h-48 mx-auto rounded-xl shadow-sm border border-slate-200"
                />
                <p className="text-[11px] text-slate-500 mt-2 font-mono">
                  Số tiền:{" "}
                  <strong className="text-emerald-700">
                    {completedOrder.total.toLocaleString("vi-VN")}đ
                  </strong>
                </p>
                <p className="text-[10px] text-slate-400">
                  Nội dung: FRUIT {completedOrder.id}
                </p>
              </div>
            )}

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={handleClose}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-fruit-green hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-fruit-green/30 transition-all"
              >
                Tiếp Tục Mua Sắm
              </button>
            </div>
          </div>
        ) : (
          /* Normal Checkout Form */
          <div>
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-fruit-green" />
                <h2 className="text-lg font-black text-slate-900">
                  Thông Tin Giao Hàng & Thanh Toán
                </h2>
              </div>
              <button
                onClick={handleClose}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* Customer Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Họ và tên người nhận <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.customer}
                    onChange={(e) =>
                      setFormData({ ...formData, customer: e.target.value })
                    }
                    placeholder="Nguyễn Văn A"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:ring-2 focus:ring-fruit-green outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Số điện thoại nhận hàng{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="0987 654 321"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:ring-2 focus:ring-fruit-green outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Địa chỉ giao hoa quả chi tiết{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:ring-2 focus:ring-fruit-green outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Ghi chú đơn hàng (ví dụ: giao trước 11h, viết thiệp mừng sinh
                  nhật...)
                </label>
                <textarea
                  rows="2"
                  value={formData.note}
                  onChange={(e) =>
                    setFormData({ ...formData, note: e.target.value })
                  }
                  placeholder="Yêu cầu riêng về độ chín hoa quả, thiệp chúc mừng..."
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:ring-2 focus:ring-fruit-green outline-none resize-none"
                />
              </div>

              {/* Payment Method Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  Phương thức thanh toán:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <div
                    onClick={() =>
                      setFormData({ ...formData, paymentMethod: "COD" })
                    }
                    className={`p-3.5 rounded-xl border-2 cursor-pointer flex items-center gap-3 transition-all ${
                      formData.paymentMethod === "COD"
                        ? "border-fruit-green bg-emerald-50/50 text-emerald-900"
                        : "border-slate-200 hover:border-slate-300 bg-white"
                    }`}
                  >
                    <Banknote className="w-5 h-5 text-emerald-600 shrink-0" />
                    <div>
                      <p className="text-xs font-bold">
                        Thanh toán tiền mặt (COD)
                      </p>
                      <p className="text-[10px] text-slate-500">
                        Kiểm tra hoa quả rồi thanh toán
                      </p>
                    </div>
                  </div>

                  <div
                    onClick={() =>
                      setFormData({ ...formData, paymentMethod: "QR" })
                    }
                    className={`p-3.5 rounded-xl border-2 cursor-pointer flex items-center gap-3 transition-all ${
                      formData.paymentMethod === "QR"
                        ? "border-fruit-green bg-emerald-50/50 text-emerald-900"
                        : "border-slate-200 hover:border-slate-300 bg-white"
                    }`}
                  >
                    <QrCode className="w-5 h-5 text-emerald-600 shrink-0" />
                    <div>
                      <p className="text-xs font-bold">
                        Quét mã QR Ngân Hàng / MoMo
                      </p>
                      <p className="text-[10px] text-slate-500">
                        Sinh mã VietQR chuyển khoản nhanh
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Mini Summary */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs space-y-1.5">
                <div className="flex justify-between text-slate-600">
                  <span>Số lượng sản phẩm:</span>
                  <span className="font-bold text-slate-800">
                    {cart.length} loại hoa quả
                  </span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Tạm tính:</span>
                  <span>{cartSubtotal.toLocaleString("vi-VN")}đ</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Giảm giá voucher:</span>
                    <span>-{discountAmount.toLocaleString("vi-VN")}đ</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-600">
                  <span>Phí giao hàng:</span>
                  <span>
                    {shippingFee === 0
                      ? "Miễn phí"
                      : `${shippingFee.toLocaleString("vi-VN")}đ`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-black text-slate-900 pt-2 border-t border-slate-200">
                  <span>Tổng thanh toán:</span>
                  <span className="text-emerald-700 text-base">
                    {cartTotal.toLocaleString("vi-VN")}đ
                  </span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-gradient-to-r from-fruit-green to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 active:scale-98 text-white rounded-2xl font-bold text-sm shadow-lg shadow-fruit-green/30 transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>Đang tạo đơn hàng...</span>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>
                      Xác Nhận Đặt Hàng ({cartTotal.toLocaleString("vi-VN")}đ)
                    </span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

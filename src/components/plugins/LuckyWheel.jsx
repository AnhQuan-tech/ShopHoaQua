import React, { useState } from "react";
import { Gift, X, Sparkles, ArrowRight, Award } from "lucide-react";
import confetti from "canvas-confetti";
import { useApp } from "../../context/AppContext";

const PRIZES = [
  { label: "Voucher 50.000đ", code: "HOAQUA50", color: "#16a34a", isWin: true },
  { label: "Chúc Bạn May Mắn", code: null, color: "#f59e0b", isWin: false },
  {
    label: "Freeship Toàn Quốc",
    code: "FREESHIP",
    color: "#0284c7",
    isWin: true,
  },
  { label: "Thêm 1 Lượt Quay", code: null, color: "#9333ea", isWin: false },
  { label: "Voucher VIP 100K", code: "VIP100", color: "#dc2626", isWin: true },
  {
    label: "Hộp Dâu Tây Miễn Phí",
    code: "HOAQUA50",
    color: "#ea580c",
    isWin: true,
  },
];

export default function LuckyWheel() {
  const { isPluginActive, getPlugin, applyVoucherCode, showToast } = useApp();
  const isActive = isPluginActive("wp_lucky_wheel");
  const plugin = getPlugin("wp_lucky_wheel");

  const [isOpen, setIsOpen] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState(null);

  if (!isActive) return null;

  const spinWheel = () => {
    if (spinning) return;
    setSpinning(true);
    setResult(null);

    // Pick winning index
    const winIndex = Math.floor(Math.random() * PRIZES.length);
    const segmentAngle = 360 / PRIZES.length;

    // Add 5 full rotations (1800 deg) + target segment
    const targetRotation =
      rotation + 1800 + (360 - winIndex * segmentAngle - segmentAngle / 2);
    setRotation(targetRotation);

    setTimeout(() => {
      setSpinning(false);
      const wonPrize = PRIZES[winIndex];
      setResult(wonPrize);

      if (wonPrize.isWin) {
        confetti({ particleCount: 90, spread: 70 });
        if (wonPrize.code) {
          applyVoucherCode(wonPrize.code);
        }
      }
    }, 4000);
  };

  return (
    <>
      {/* Floating Gift Box Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-5 z-40 p-3 rounded-full bg-gradient-to-tr from-amber-500 to-orange-400 text-white shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 animate-bounce group"
        title="Vòng Quay May Mắn - Nhận Quà Hoa Quả"
      >
        <div className="relative">
          <Gift className="w-6 h-6" />
          <span className="absolute -top-3 -right-2 bg-red-600 text-white font-extrabold text-[9px] px-1.5 py-0.5 rounded-full uppercase shadow">
            Quà
          </span>
        </div>
      </button>

      {/* Wheel Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl text-center overflow-hidden">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Vòng Quay May Mắn</span>
            </div>
            <h3 className="text-xl font-black text-slate-900">
              Quay Là Trúng Quà Tươi Ngon!
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Cơ hội nhận voucher 100k, freeship và dâu tây miễn phí!
            </p>

            {/* Wheel graphic */}
            <div className="relative w-64 h-64 mx-auto my-2">
              {/* Pointer */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 w-0 h-0 border-x-8 border-x-transparent border-t-[18px] border-t-red-600 drop-shadow-md" />

              {/* Rotating disk */}
              <div
                className="w-full h-full rounded-full border-4 border-amber-400 shadow-xl overflow-hidden spin-transition relative"
                style={{ transform: `rotate(${rotation}deg)` }}
              >
                {PRIZES.map((prize, idx) => {
                  const rot = idx * 60;
                  return (
                    <div
                      key={idx}
                      className="absolute inset-0 flex items-start justify-center pt-3 text-[11px] font-black text-white"
                      style={{
                        transform: `rotate(${rot}deg)`,
                        transformOrigin: "50% 50%",
                        backgroundColor: prize.color,
                        clipPath: "polygon(50% 50%, 21% 0%, 79% 0%)",
                      }}
                    >
                      <span className="transform -rotate-90 origin-bottom mt-6 text-center leading-tight">
                        {prize.label}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Center Hub */}
              <div className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-white border-4 border-amber-400 shadow-md flex items-center justify-center font-black text-xs text-slate-800 pointer-events-none">
                FRUIT
              </div>
            </div>

            {/* Result Box */}
            {result && (
              <div className="mt-4 p-3 bg-amber-50 rounded-xl border border-amber-200 animate-in zoom-in-95 duration-200">
                <p className="text-xs font-bold text-slate-800">
                  {result.isWin
                    ? `🎉 Chúc mừng bạn trúng: ${result.label}!`
                    : "Chúc bạn may mắn lần quay sau nhé!"}
                </p>
                {result.code && (
                  <p className="text-[11px] text-emerald-700 font-mono font-bold mt-1">
                    Đã tự động áp dụng mã: {result.code}
                  </p>
                )}
              </div>
            )}

            {/* Spin CTA */}
            <button
              onClick={spinWheel}
              disabled={spinning}
              className="w-full mt-6 py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 active:scale-95 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-orange-500/30 transition-all disabled:opacity-50"
            >
              {spinning ? "Đang quay..." : "QUAY NGAY BÂY GIỜ 🚀"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

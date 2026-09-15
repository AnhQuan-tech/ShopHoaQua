import React, { useState } from "react";
import { Lock, User, ArrowLeft, KeyRound, Check } from "lucide-react";
import { useApp } from "../../context/AppContext";

export default function AdminLogin() {
  const { loginAdmin, setCurrentView } = useApp();
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin");
  const [remember, setRemember] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    loginAdmin(username, password);
  };

  const handleQuickFill = () => {
    setUsername("admin");
    setPassword("admin");
  };

  return (
    <div className="min-h-screen bg-[#f0f0f1] flex flex-col items-center justify-center p-4">
      {/* WordPress Admin Login Box */}
      <div className="w-full max-w-sm">
        {/* WordPress Big Logo */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 rounded-full bg-[#2271b1] flex items-center justify-center shadow-md mb-2">
            <span className="font-serif font-black text-3xl text-white select-none">
              W
            </span>
          </div>
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">
            WordPress CMS
          </h1>
          <p className="text-xs text-slate-500">
            Hệ thống quản trị Cửa Hàng Hoa Quả
          </p>
        </div>

        {/* Login Form Box */}
        <div className="bg-white p-7 rounded-lg shadow-md border border-[#c3c4c7]">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Tên người dùng hoặc Địa chỉ Email
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border border-[#8c8f94] rounded text-sm focus:border-[#2271b1] focus:ring-1 focus:ring-[#2271b1] outline-none font-medium"
                />
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Mật khẩu
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border border-[#8c8f94] rounded text-sm focus:border-[#2271b1] focus:ring-1 focus:ring-[#2271b1] outline-none font-medium"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="rounded border-[#8c8f94] text-[#2271b1] focus:ring-[#2271b1]"
                />
                <span>Tự động đăng nhập</span>
              </label>
              <button
                type="button"
                onClick={handleQuickFill}
                className="text-[#2271b1] hover:underline font-semibold"
              >
                Điền sẵn admin/admin
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-[#2271b1] hover:bg-[#135e96] text-white rounded font-bold text-sm shadow-sm transition-colors mt-2"
            >
              Đăng Nhập
            </button>
          </form>

          {/* Quick Credential Tip */}
          <div className="mt-5 pt-4 border-t border-slate-100 bg-amber-50 -mx-7 -mb-7 p-4 rounded-b-lg text-xs text-amber-900 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <KeyRound className="w-4 h-4 text-amber-600 shrink-0" />
              <div>
                <p className="font-bold">Tài khoản mặc định:</p>
                <p className="font-mono text-[11px]">
                  tk: <strong>admin</strong> | pass: <strong>admin</strong>
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleQuickFill}
              className="px-2.5 py-1 bg-amber-200 hover:bg-amber-300 rounded text-[11px] font-bold text-amber-900 transition-colors"
            >
              Sử dụng
            </button>
          </div>
        </div>

        {/* Back to store link */}
        <div className="mt-5 text-center">
          <button
            onClick={() => setCurrentView("store")}
            className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-[#2271b1] font-semibold transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>← Quay lại Cửa Hàng Trái Cây (Fruit Paradise)</span>
          </button>
        </div>
      </div>
    </div>
  );
}

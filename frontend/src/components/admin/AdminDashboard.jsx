import React from "react";
import {
  DollarSign,
  ShoppingBag,
  Apple,
  Clock,
  ArrowUpRight,
  TrendingUp,
  Plus,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { useApp } from "../../context/AppContext";

export default function AdminDashboard() {
  const { products, orders, plugins, setAdminTab } = useApp();

  const totalRevenue = orders
    .filter((o) => o.status === "completed" || o.status === "delivering")
    .reduce((sum, o) => sum + (o.total || 0), 0);

  const pendingOrders = orders.filter((o) => o.status === "pending");
  const lowStockProducts = products.filter((p) => p.stock <= 30);
  const activePlugins = plugins.filter((p) => p.active);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Title & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Bảng Tin Quản Trị (WordPress Dashboard)
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Tổng quan hoạt động kinh doanh hoa quả tươi sạch hôm nay
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setAdminTab("products")}
            className="px-4 py-2 bg-[#2271b1] hover:bg-[#135e96] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-sm transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Thêm Hoa Quả Mới</span>
          </button>
          <button
            onClick={() => setAdminTab("plugins")}
            className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-sm transition-colors"
          >
            <span>Cài Đặt Plugins ({activePlugins.length} bật)</span>
          </button>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Doanh thu */}
        <div className="bg-white p-5 rounded-xl border border-[#c3c4c7] shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">
              Doanh Thu Đơn Hàng
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-black text-slate-900">
              {totalRevenue.toLocaleString("vi-VN")}đ
            </span>
          </div>
          <p className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> Tăng trưởng +18% so với tuần
            trước
          </p>
        </div>

        {/* Tổng đơn hàng */}
        <div className="bg-white p-5 rounded-xl border border-[#c3c4c7] shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">
              Tổng Đơn Hàng
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-[#2271b1] flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-black text-slate-900">
              {orders.length} đơn
            </span>
          </div>
          <p className="text-[11px] text-blue-600 font-semibold mt-1">
            {pendingOrders.length} đơn mới đang chờ xử lý
          </p>
        </div>

        {/* Số loại hoa quả */}
        <div className="bg-white p-5 rounded-xl border border-[#c3c4c7] shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">
              Hoa Quả Trong Kho
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
              <Apple className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-black text-slate-900">
              {products.length} loại
            </span>
          </div>
          <p className="text-[11px] text-amber-700 font-semibold mt-1">
            100% đạt chuẩn chất lượng
          </p>
        </div>

        {/* Đơn chờ duyệt */}
        <div className="bg-white p-5 rounded-xl border border-[#c3c4c7] shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">
              Cần Giao Hàng
            </span>
            <div className="w-8 h-8 rounded-lg bg-red-100 text-red-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-black text-red-600">
              {pendingOrders.length} đơn
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            Cam kết giao hỏa tốc trong 2 giờ
          </p>
        </div>
      </div>

      {/* Row 2: Recent Orders & Stock Alert */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-[#c3c4c7] shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="font-bold text-sm text-slate-900">
              Đơn Hàng Hoa Quả Mới Nhất
            </h2>
            <button
              onClick={() => setAdminTab("orders")}
              className="text-xs text-[#2271b1] hover:underline font-semibold"
            >
              Xem tất cả đơn hàng →
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-100">
                <tr>
                  <th className="p-3">Mã đơn</th>
                  <th className="p-3">Khách hàng</th>
                  <th className="p-3">Số tiền</th>
                  <th className="p-3">Phương thức</th>
                  <th className="p-3">Trạng thái</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {orders.slice(0, 5).map((ord) => {
                  const statusColors = {
                    pending: "bg-amber-100 text-amber-800",
                    delivering: "bg-blue-100 text-blue-800",
                    completed: "bg-emerald-100 text-emerald-800",
                    cancelled: "bg-red-100 text-red-800",
                  };
                  const statusLabels = {
                    pending: "Chờ xử lý",
                    delivering: "Đang giao",
                    completed: "Hoàn thành",
                    cancelled: "Đã hủy",
                  };

                  return (
                    <tr key={ord.id} className="hover:bg-slate-50/80">
                      <td className="p-3 font-mono font-bold text-slate-900">
                        {ord.id}
                      </td>
                      <td className="p-3">
                        <div className="font-semibold text-slate-800">
                          {ord.customer}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {ord.phone}
                        </div>
                      </td>
                      <td className="p-3 font-bold text-emerald-700">
                        {ord.total.toLocaleString("vi-VN")}đ
                      </td>
                      <td className="p-3">
                        <span className="font-mono px-2 py-0.5 rounded bg-slate-100 text-[10px] font-bold">
                          {ord.paymentMethod}
                        </span>
                      </td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-1 rounded-full text-[10px] font-bold ${statusColors[ord.status] || "bg-slate-100"}`}
                        >
                          {statusLabels[ord.status] || ord.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Low stock alert & System Info (1 col) */}
        <div className="space-y-6">
          {/* Low Stock Alert */}
          <div className="bg-white rounded-xl border border-[#c3c4c7] shadow-sm p-4">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <h3 className="font-bold text-xs text-slate-900 uppercase">
                Cảnh Báo Tồn Kho Thấp
              </h3>
            </div>
            {lowStockProducts.length === 0 ? (
              <p className="text-xs text-emerald-600 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Tất cả hoa quả đều dồi
                dào tồn kho.
              </p>
            ) : (
              <div className="space-y-2.5">
                {lowStockProducts.slice(0, 4).map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center justify-between text-xs p-2 rounded-lg bg-amber-50/60 border border-amber-100"
                  >
                    <span className="font-semibold text-slate-800 truncate pr-2">
                      {p.name}
                    </span>
                    <span className="font-bold text-amber-800 shrink-0">
                      Còn {p.stock} {p.unit}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Plugins Status */}
          <div className="bg-white rounded-xl border border-[#c3c4c7] shadow-sm p-4">
            <h3 className="font-bold text-xs text-slate-900 uppercase mb-3">
              Trạng Thái Plugins & Popups
            </h3>
            <div className="space-y-2">
              {plugins.slice(0, 4).map((pl) => (
                <div
                  key={pl.id}
                  className="flex items-center justify-between text-xs"
                >
                  <span className="text-slate-700 truncate pr-2">
                    {pl.name}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${pl.active ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-400"}`}
                  >
                    {pl.active ? "Đang bật" : "Tắt"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

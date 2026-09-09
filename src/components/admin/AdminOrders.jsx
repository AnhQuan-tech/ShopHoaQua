import React, { useState } from "react";
import {
  ShoppingBag,
  Search,
  Clock,
  Truck,
  CheckCircle2,
  XCircle,
  MapPin,
  Phone,
  Banknote,
  QrCode,
  Eye,
  Filter,
} from "lucide-react";
import { useApp } from "../../context/AppContext";

export default function AdminOrders() {
  const { orders, updateOrderStatus } = useApp();
  const [filterStatus, setFilterStatus] = useState("all");
  const [search, setSearch] = useState("");
  const [viewOrderDetail, setViewOrderDetail] = useState(null);

  const filteredOrders = orders.filter((o) => {
    const matchStatus = filterStatus === "all" || o.status === filterStatus;
    const matchSearch =
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.toLowerCase().includes(search.toLowerCase()) ||
      o.phone.includes(search);
    return matchStatus && matchSearch;
  });

  const STATUS_CONFIG = {
    pending: {
      label: "Chờ xử lý",
      color: "bg-amber-100 text-amber-800 border-amber-200",
      icon: <Clock className="w-3.5 h-3.5" />,
    },
    delivering: {
      label: "Đang giao hàng",
      color: "bg-blue-100 text-blue-800 border-blue-200",
      icon: <Truck className="w-3.5 h-3.5" />,
    },
    completed: {
      label: "Hoàn thành",
      color: "bg-emerald-100 text-emerald-800 border-emerald-200",
      icon: <CheckCircle2 className="w-3.5 h-3.5" />,
    },
    cancelled: {
      label: "Đã hủy",
      color: "bg-red-100 text-red-800 border-red-200",
      icon: <XCircle className="w-3.5 h-3.5" />,
    },
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Quản Lý Đơn Hàng Hoa Quả
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Theo dõi tiến độ giao hàng và xác nhận thanh toán đơn của khách hàng
        </p>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 rounded-xl border border-[#c3c4c7] shadow-sm flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm theo mã đơn (ORD-...), tên khách, SĐT..."
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:ring-1 focus:ring-[#2271b1] outline-none"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>

        {/* Status filter tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto text-xs font-semibold">
          <button
            onClick={() => setFilterStatus("all")}
            className={`px-3 py-1.5 rounded-lg transition-colors ${filterStatus === "all" ? "bg-[#2271b1] text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
          >
            Tất cả ({orders.length})
          </button>
          <button
            onClick={() => setFilterStatus("pending")}
            className={`px-3 py-1.5 rounded-lg transition-colors ${filterStatus === "pending" ? "bg-amber-500 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
          >
            Chờ xử lý ({orders.filter((o) => o.status === "pending").length})
          </button>
          <button
            onClick={() => setFilterStatus("delivering")}
            className={`px-3 py-1.5 rounded-lg transition-colors ${filterStatus === "delivering" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
          >
            Đang giao ({orders.filter((o) => o.status === "delivering").length})
          </button>
          <button
            onClick={() => setFilterStatus("completed")}
            className={`px-3 py-1.5 rounded-lg transition-colors ${filterStatus === "completed" ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
          >
            Hoàn thành ({orders.filter((o) => o.status === "completed").length})
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl border border-[#c3c4c7] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 uppercase text-[11px]">
              <tr>
                <th className="p-3.5">Mã đơn</th>
                <th className="p-3.5">Khách hàng</th>
                <th className="p-3.5">Địa chỉ nhận hoa quả</th>
                <th className="p-3.5">Chi tiết sản phẩm</th>
                <th className="p-3.5">Tổng tiền</th>
                <th className="p-3.5">Thanh toán</th>
                <th className="p-3.5">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="7" className="p-8 text-center text-slate-400">
                    Không tìm thấy đơn hàng nào phù hợp
                  </td>
                </tr>
              ) : (
                filteredOrders.map((ord) => {
                  const cfg =
                    STATUS_CONFIG[ord.status] || STATUS_CONFIG.pending;
                  return (
                    <tr
                      key={ord.id}
                      className="hover:bg-slate-50/80 transition-colors"
                    >
                      <td className="p-3.5 font-mono font-bold text-slate-900">
                        {ord.id}
                        <div className="text-[10px] text-slate-400 font-sans mt-0.5">
                          {new Date(ord.createdAt).toLocaleTimeString("vi-VN", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}{" "}
                          •{" "}
                          {new Date(ord.createdAt).toLocaleDateString("vi-VN")}
                        </div>
                      </td>

                      <td className="p-3.5">
                        <p className="font-bold text-slate-800">
                          {ord.customer}
                        </p>
                        <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5 font-mono">
                          <Phone className="w-3 h-3 text-slate-400" />{" "}
                          {ord.phone}
                        </p>
                      </td>

                      <td className="p-3.5 max-w-xs text-slate-600">
                        <p className="line-clamp-2">{ord.address}</p>
                        {ord.note && (
                          <p className="text-[10px] text-amber-700 bg-amber-50 p-1 rounded mt-1 line-clamp-1">
                            Ghi chú: {ord.note}
                          </p>
                        )}
                      </td>

                      <td className="p-3.5 max-w-xs">
                        <div className="space-y-0.5">
                          {ord.items.map((it, idx) => (
                            <p key={idx} className="text-slate-700 truncate">
                              • <strong>{it.quantity}x</strong> {it.name}
                            </p>
                          ))}
                        </div>
                      </td>

                      <td className="p-3.5">
                        <span className="font-black text-emerald-700 text-sm">
                          {ord.total.toLocaleString("vi-VN")}đ
                        </span>
                        {ord.discount > 0 && (
                          <div className="text-[10px] text-emerald-600 font-semibold">
                            Đã giảm {ord.discount.toLocaleString("vi-VN")}đ
                          </div>
                        )}
                      </td>

                      <td className="p-3.5">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded font-bold text-[10px] ${
                            ord.paymentMethod === "QR"
                              ? "bg-purple-50 text-purple-700 border border-purple-200"
                              : "bg-slate-100 text-slate-700"
                          }`}
                        >
                          {ord.paymentMethod === "QR" ? (
                            <QrCode className="w-3 h-3" />
                          ) : (
                            <Banknote className="w-3 h-3" />
                          )}
                          {ord.paymentMethod === "QR"
                            ? "VietQR / MoMo"
                            : "Tiền mặt COD"}
                        </span>
                      </td>

                      <td className="p-3.5">
                        <select
                          value={ord.status}
                          onChange={(e) =>
                            updateOrderStatus(ord.id, e.target.value)
                          }
                          className={`px-2.5 py-1.5 rounded-lg text-xs font-bold border outline-none cursor-pointer ${cfg.color}`}
                        >
                          <option value="pending">⏳ Chờ xử lý</option>
                          <option value="delivering">🚚 Đang giao hàng</option>
                          <option value="completed">✅ Đã hoàn thành</option>
                          <option value="cancelled">❌ Đã hủy</option>
                        </select>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

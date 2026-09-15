import React from "react";
import {
  LayoutDashboard,
  Apple,
  ShoppingBag,
  Puzzle,
  Megaphone,
  Settings,
  ExternalLink,
  LogOut,
  User,
  Bell,
  Home,
} from "lucide-react";
import { useApp } from "../../context/AppContext";
import AdminDashboard from "./AdminDashboard";
import AdminProducts from "./AdminProducts";
import AdminOrders from "./AdminOrders";
import AdminPlugins from "./AdminPlugins";
import AdminSettings from "./AdminSettings";

export default function AdminLayout() {
  const {
    adminTab,
    setAdminTab,
    setCurrentView,
    logoutAdmin,
    orders,
    plugins,
  } = useApp();

  const pendingOrdersCount = orders.filter(
    (o) => o.status === "pending",
  ).length;
  const activePluginsCount = plugins.filter((p) => p.active).length;

  const NAV_ITEMS = [
    {
      id: "dashboard",
      label: "Bảng Tin",
      icon: <LayoutDashboard className="w-4 h-4" />,
    },
    {
      id: "products",
      label: "Sản Phẩm Hoa Quả",
      icon: <Apple className="w-4 h-4" />,
    },
    {
      id: "orders",
      label: "Đơn Hàng",
      icon: <ShoppingBag className="w-4 h-4" />,
      badge: pendingOrdersCount > 0 ? pendingOrdersCount : null,
    },
    {
      id: "plugins",
      label: "Gói Mở Rộng (Plugins)",
      icon: <Puzzle className="w-4 h-4" />,
      badge: `${activePluginsCount} bật`,
    },
    {
      id: "settings",
      label: "Cài Đặt Hệ Thống",
      icon: <Settings className="w-4 h-4" />,
    },
  ];

  return (
    <div className="min-h-screen bg-[#f0f0f1] flex flex-col text-slate-800 font-sans">
      {/* 1. WordPress Top Admin Bar */}
      <header className="h-8 bg-[#1d2327] text-white flex items-center justify-between px-4 z-40 select-none text-xs">
        <div className="flex items-center gap-4">
          {/* WordPress Icon */}
          <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center font-serif font-black text-xs text-white">
            W
          </div>

          {/* Site name & link to store */}
          <button
            onClick={() => setCurrentView("store")}
            className="flex items-center gap-1.5 text-slate-300 hover:text-white font-semibold transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Fruit Paradise</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </button>

          {/* New Orders notification */}
          {pendingOrdersCount > 0 && (
            <button
              onClick={() => setAdminTab("orders")}
              className="flex items-center gap-1 px-2 py-0.5 rounded bg-red-600 text-white font-bold text-[10px]"
            >
              <Bell className="w-3 h-3" />
              <span>{pendingOrdersCount} đơn chờ duyệt</span>
            </button>
          )}
        </div>

        {/* Right user info */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-slate-300">
            <div className="w-5 h-5 rounded-full bg-emerald-600 flex items-center justify-center text-[10px] font-bold text-white">
              A
            </div>
            <span>
              Chào, <strong className="text-white">admin</strong>
            </span>
          </div>

          <button
            onClick={logoutAdmin}
            className="flex items-center gap-1 text-slate-400 hover:text-red-400 text-xs transition-colors"
            title="Đăng xuất"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Đăng xuất</span>
          </button>
        </div>
      </header>

      {/* 2. Main Admin Workspace with Sidebar */}
      <div className="flex-1 flex overflow-hidden">
        {/* WordPress Sidebar */}
        <aside className="w-56 bg-[#1e1e2d] text-slate-300 flex flex-col shrink-0 select-none border-r border-[#151521]">
          <div className="p-4 border-b border-slate-700/40">
            <div className="flex items-center gap-2.5">
              <span className="text-xl">🍎</span>
              <div>
                <h2 className="font-bold text-xs text-white uppercase tracking-wider">
                  Fruit WP-Admin
                </h2>
                <p className="text-[10px] text-emerald-400">
                  Phiên bản 6.4.2 Pro
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
            {NAV_ITEMS.map((item) => {
              const isActive = adminTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setAdminTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-[#2271b1] text-white shadow-sm"
                      : "text-slate-300 hover:bg-[#27273a] hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                        isActive
                          ? "bg-white text-[#2271b1]"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Visit Store Button in Sidebar */}
          <div className="p-3 border-t border-slate-700/40">
            <button
              onClick={() => setCurrentView("store")}
              className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-colors shadow"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Xem Cửa Hàng</span>
            </button>
          </div>
        </aside>

        {/* Content Pane */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          {adminTab === "dashboard" && <AdminDashboard />}
          {adminTab === "products" && <AdminProducts />}
          {adminTab === "orders" && <AdminOrders />}
          {adminTab === "plugins" && <AdminPlugins />}
          {adminTab === "settings" && <AdminSettings />}
        </main>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import {
  Puzzle,
  Settings2,
  Power,
  CheckCircle2,
  X,
  Sliders,
  Sparkles,
  AlertCircle,
  HelpCircle,
} from "lucide-react";
import { useApp } from "../../context/AppContext";

export default function AdminPlugins() {
  const { plugins, togglePlugin, updatePluginSettings, showToast } = useApp();
  const [editingPlugin, setEditingPlugin] = useState(null);
  const [configForm, setConfigForm] = useState({});

  const handleOpenSettings = (plugin) => {
    setEditingPlugin(plugin);
    setConfigForm({ ...plugin.settings });
  };

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    if (!editingPlugin) return;
    const success = await updatePluginSettings(editingPlugin.id, configForm);
    if (success) {
      setEditingPlugin(null);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Quản Lý Gói Mở Rộng (WordPress Plugins & Popups)
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Bật/tắt và cấu hình các plugin popup quảng cáo, vòng quay may mắn,
          hiệu ứng rơi hoa quả sinh động
        </p>
      </div>

      {/* Info Alert */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3 text-xs text-blue-900">
        <Sparkles className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Hệ thống Plugin Đa Dạng:</span> Bạn có thể
          bật hoặc tắt từng hiệu ứng và popup quảng cáo bất kỳ lúc nào. Thay đổi
          sẽ có hiệu lực ngay lập tức trên cửa hàng mà không cần khởi động lại.
        </div>
      </div>

      {/* Plugins Table */}
      <div className="bg-white rounded-xl border border-[#c3c4c7] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 uppercase text-[11px]">
              <tr>
                <th className="p-4">Tên Plugin</th>
                <th className="p-4">Mô tả & Chức năng</th>
                <th className="p-4">Tác giả</th>
                <th className="p-4">Trạng thái</th>
                <th className="p-4 text-right">Cấu hình</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {plugins.map((plugin) => (
                <tr
                  key={plugin.id}
                  className={`transition-colors ${plugin.active ? "bg-white" : "bg-slate-50/50 text-slate-400"}`}
                >
                  {/* Plugin Name & Icon */}
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                          plugin.active
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-slate-200 text-slate-500"
                        }`}
                      >
                        <Puzzle className="w-5 h-5" />
                      </div>
                      <div>
                        <p
                          className={`font-bold text-sm ${plugin.active ? "text-slate-900" : "text-slate-500"}`}
                        >
                          {plugin.name}
                        </p>
                        <p className="text-[10px] text-slate-400 mt-0.5 font-mono">
                          Phiên bản {plugin.version}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Description */}
                  <td className="p-4 max-w-md text-slate-600">
                    <p className="leading-relaxed">{plugin.description}</p>
                  </td>

                  {/* Author */}
                  <td className="p-4 text-slate-500 whitespace-nowrap">
                    {plugin.author}
                  </td>

                  {/* Active Toggle Switch */}
                  <td className="p-4 whitespace-nowrap">
                    <button
                      onClick={() => togglePlugin(plugin.id)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                        plugin.active ? "bg-emerald-600" : "bg-slate-300"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          plugin.active ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                    <span
                      className={`ml-2 text-xs font-bold ${plugin.active ? "text-emerald-700" : "text-slate-400"}`}
                    >
                      {plugin.active ? "Đang Bật" : "Đã Tắt"}
                    </span>
                  </td>

                  {/* Settings Button */}
                  <td className="p-4 text-right whitespace-nowrap">
                    <button
                      onClick={() => handleOpenSettings(plugin)}
                      className="px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-100 text-slate-700 font-semibold text-xs transition-colors inline-flex items-center gap-1.5"
                    >
                      <Settings2 className="w-3.5 h-3.5" />
                      <span>Cài Đặt</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Plugin Configuration Modal */}
      {editingPlugin && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6 overflow-hidden">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-base font-black text-slate-900">
                  Cài Đặt: {editingPlugin.name}
                </h3>
                <p className="text-[11px] text-slate-400">
                  Tùy biến nội dung và hành vi hiển thị của plugin
                </p>
              </div>
              <button
                onClick={() => setEditingPlugin(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form
              onSubmit={handleSaveSettings}
              className="mt-4 space-y-4 text-xs"
            >
              {/* Dynamic fields based on plugin type */}
              {editingPlugin.id === "wp_mega_popup" && (
                <>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Tiêu đề Popup
                    </label>
                    <input
                      type="text"
                      value={configForm.title || ""}
                      onChange={(e) =>
                        setConfigForm({ ...configForm, title: e.target.value })
                      }
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Mã Voucher Giảm Giá Tặng Kèm
                    </label>
                    <input
                      type="text"
                      value={configForm.couponCode || ""}
                      onChange={(e) =>
                        setConfigForm({
                          ...configForm,
                          couponCode: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none uppercase font-mono font-bold"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Thời gian chờ trước khi popup hiện (giây)
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      value={configForm.delaySeconds || 1.5}
                      onChange={(e) =>
                        setConfigForm({
                          ...configForm,
                          delaySeconds: Number(e.target.value),
                        })
                      }
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Đường dẫn ảnh Banner Popup
                    </label>
                    <input
                      type="url"
                      value={configForm.imageUrl || ""}
                      onChange={(e) =>
                        setConfigForm({
                          ...configForm,
                          imageUrl: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none"
                    />
                  </div>
                </>
              )}

              {editingPlugin.id === "wp_social_proof" && (
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Chu kỳ lặp thông báo (giây)
                  </label>
                  <input
                    type="number"
                    value={configForm.intervalSeconds || 9}
                    onChange={(e) =>
                      setConfigForm({
                        ...configForm,
                        intervalSeconds: Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">
                    Cứ mỗi X giây sẽ nhảy thông báo 1 khách mua hoa quả mới ở
                    góc dưới.
                  </p>
                </div>
              )}

              {editingPlugin.id === "wp_floating_contact" && (
                <>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Số điện thoại Hotline
                    </label>
                    <input
                      type="text"
                      value={configForm.hotline || ""}
                      onChange={(e) =>
                        setConfigForm({
                          ...configForm,
                          hotline: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Số điện thoại Zalo
                    </label>
                    <input
                      type="text"
                      value={configForm.zalo || ""}
                      onChange={(e) =>
                        setConfigForm({ ...configForm, zalo: e.target.value })
                      }
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none"
                    />
                  </div>
                </>
              )}

              {editingPlugin.id === "wp_countdown_bar" && (
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Nội dung thông báo trên cùng
                  </label>
                  <input
                    type="text"
                    value={configForm.message || ""}
                    onChange={(e) =>
                      setConfigForm({ ...configForm, message: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none"
                  />
                </div>
              )}

              {editingPlugin.id === "wp_lucky_wheel" && (
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Chữ trên nút hộp quà
                  </label>
                  <input
                    type="text"
                    value={configForm.buttonText || ""}
                    onChange={(e) =>
                      setConfigForm({
                        ...configForm,
                        buttonText: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none"
                  />
                </div>
              )}

              {editingPlugin.id === "wp_falling_fruits" && (
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Mật độ hoa quả và lá rơi
                  </label>
                  <select
                    value={configForm.density || "medium"}
                    onChange={(e) =>
                      setConfigForm({ ...configForm, density: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none font-semibold"
                  >
                    <option value="low">Thấp (nhẹ nhàng)</option>
                    <option value="medium">Vừa phải</option>
                    <option value="high">Dày đặc (tưng bừng)</option>
                  </select>
                </div>
              )}

              {/* Actions */}
              <div className="flex justify-end gap-2.5 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingPlugin(null)}
                  className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 font-semibold hover:bg-slate-50"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#2271b1] hover:bg-[#135e96] text-white rounded-lg font-bold shadow-sm"
                >
                  Lưu Cấu Hình
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

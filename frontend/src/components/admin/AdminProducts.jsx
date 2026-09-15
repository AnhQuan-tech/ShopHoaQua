import React, { useState } from "react";
import {
  Plus,
  Search,
  Edit3,
  Trash2,
  X,
  Check,
  Sparkles,
  Image as ImageIcon,
  Flame,
  Filter,
} from "lucide-react";
import { useApp } from "../../context/AppContext";

export default function AdminProducts() {
  const { products, categories, saveProduct, deleteProduct, showToast } =
    useApp();
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState("all");

  // Modal State for Add / Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "nhap-khau",
    categoryName: "Trái Cây Nhập Khẩu",
    price: "",
    originalPrice: "",
    stock: 50,
    unit: "1 Kg",
    origin: "Nhập khẩu",
    sweetness: "Giòn ngọt đậm đà",
    badge: "Tươi Ngon",
    image: "",
    description: "",
    isFlashSale: false,
    featured: true,
  });

  // Filter products
  const filtered = products.filter((p) => {
    const matchCat = selectedCat === "all" || p.category === selectedCat;
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      (p.origin && p.origin.toLowerCase().includes(search.toLowerCase()));
    return matchCat && matchSearch;
  });

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormData({
      name: "",
      category: "nhap-khau",
      categoryName: "Trái Cây Nhập Khẩu",
      price: "",
      originalPrice: "",
      stock: 50,
      unit: "1 Kg",
      origin: "New Zealand",
      sweetness: "Giòn ngọt thơm lừng",
      badge: "Mới Về",
      image:
        "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=600&q=80",
      description: "Hoa quả tươi nhập khẩu hàng không chất lượng cao.",
      isFlashSale: false,
      featured: false,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (p) => {
    setEditingProduct(p);
    setFormData({
      ...p,
      price: String(p.price),
      originalPrice: String(p.originalPrice),
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price) {
      showToast("Vui lòng nhập tên hoa quả và giá bán!", "error");
      return;
    }

    const matchedCat = categories.find((c) => c.id === formData.category);
    const payload = {
      ...formData,
      id: editingProduct ? editingProduct.id : undefined,
      categoryName: matchedCat ? matchedCat.name : "Trái Cây",
      price: Number(formData.price),
      originalPrice: Number(formData.originalPrice) || Number(formData.price),
      stock: Number(formData.stock),
    };

    const success = await saveProduct(payload);
    if (success) {
      setIsModalOpen(false);
    }
  };

  const handleDelete = (id, name) => {
    if (
      window.confirm(
        `Bạn có chắc muốn xóa loại hoa quả "${name}" khỏi cửa hàng?`,
      )
    ) {
      deleteProduct(id);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Quản Lý Sản Phẩm Hoa Quả
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Tổng cộng {products.length} loại trái cây nhập khẩu và đặc sản nội
            địa
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 bg-[#2271b1] hover:bg-[#135e96] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-sm transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Thêm Hoa Quả Mới</span>
        </button>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 rounded-xl border border-[#c3c4c7] shadow-sm flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm theo tên trái cây, xuất xứ..."
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:ring-1 focus:ring-[#2271b1] outline-none"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <select
            value={selectedCat}
            onChange={(e) => setSelectedCat(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:bg-white outline-none w-full sm:w-auto"
          >
            <option value="all">Tất cả danh mục</option>
            {categories
              .filter((c) => c.id !== "all")
              .map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl border border-[#c3c4c7] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 uppercase text-[11px]">
              <tr>
                <th className="p-3.5 w-16">Hình ảnh</th>
                <th className="p-3.5">Tên hoa quả</th>
                <th className="p-3.5">Danh mục</th>
                <th className="p-3.5">Giá bán</th>
                <th className="p-3.5">Tồn kho</th>
                <th className="p-3.5">Xuất xứ</th>
                <th className="p-3.5">Flash Sale</th>
                <th className="p-3.5 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filtered.map((p) => (
                <tr
                  key={p.id}
                  className="hover:bg-slate-50/80 transition-colors"
                >
                  <td className="p-3.5">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-12 h-12 object-cover rounded-lg shadow-xs border border-slate-200"
                    />
                  </td>
                  <td className="p-3.5 max-w-xs">
                    <p className="font-bold text-slate-900 line-clamp-1">
                      {p.name}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      {p.unit} • {p.sweetness}
                    </p>
                  </td>
                  <td className="p-3.5">
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-semibold text-[10px]">
                      {p.categoryName}
                    </span>
                  </td>
                  <td className="p-3.5">
                    <div className="font-bold text-emerald-700">
                      {p.price.toLocaleString("vi-VN")}đ
                    </div>
                    {p.originalPrice > p.price && (
                      <div className="text-[10px] text-slate-400 line-through">
                        {p.originalPrice.toLocaleString("vi-VN")}đ
                      </div>
                    )}
                  </td>
                  <td className="p-3.5">
                    <span
                      className={`font-bold ${p.stock <= 30 ? "text-red-600" : "text-slate-800"}`}
                    >
                      {p.stock}
                    </span>
                  </td>
                  <td className="p-3.5 text-slate-600">{p.origin}</td>
                  <td className="p-3.5">
                    {p.isFlashSale ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
                        <Flame className="w-3 h-3" /> Sale sốc
                      </span>
                    ) : (
                      <span className="text-slate-400 text-[11px]">-</span>
                    )}
                  </td>
                  <td className="p-3.5 text-right space-x-1.5">
                    <button
                      onClick={() => handleOpenEdit(p)}
                      className="p-1.5 hover:bg-slate-100 text-[#2271b1] rounded-lg transition-colors"
                      title="Sửa hoa quả"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(p.id, p.name)}
                      className="p-1.5 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                      title="Xóa hoa quả"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Add / Edit Product */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-6 overflow-hidden">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h2 className="text-lg font-black text-slate-900">
                {editingProduct
                  ? "Chỉnh Sửa Thông Tin Hoa Quả"
                  : "Thêm Loại Hoa Quả Mới"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="mt-4 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Tên loại hoa quả <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Táo Envy New Zealand..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Danh mục hoa quả
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white outline-none font-medium"
                  >
                    {categories
                      .filter((c) => c.id !== "all")
                      .map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Giá bán (VNĐ) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    placeholder="149000"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white outline-none font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Giá gốc niêm yết (VNĐ)
                  </label>
                  <input
                    type="number"
                    value={formData.originalPrice}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        originalPrice: e.target.value,
                      })
                    }
                    placeholder="185000"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Số lượng tồn kho
                  </label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) =>
                      setFormData({ ...formData, stock: e.target.value })
                    }
                    placeholder="50"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Đơn vị tính
                  </label>
                  <input
                    type="text"
                    value={formData.unit}
                    onChange={(e) =>
                      setFormData({ ...formData, unit: e.target.value })
                    }
                    placeholder="Hộp 1kg / Chùm 750g..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Xuất xứ
                  </label>
                  <input
                    type="text"
                    value={formData.origin}
                    onChange={(e) =>
                      setFormData({ ...formData, origin: e.target.value })
                    }
                    placeholder="New Zealand / Đắk Lắk..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Huy hiệu nổi bật
                  </label>
                  <input
                    type="text"
                    value={formData.badge}
                    onChange={(e) =>
                      setFormData({ ...formData, badge: e.target.value })
                    }
                    placeholder="Bán chạy, VietGAP..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Độ ngọt / Đặc điểm hương vị
                </label>
                <input
                  type="text"
                  value={formData.sweetness}
                  onChange={(e) =>
                    setFormData({ ...formData, sweetness: e.target.value })
                  }
                  placeholder="15° Brix (Giòn ngọt đậm đà)"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Đường dẫn ảnh hoa quả (URL Image)
                </label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Mô tả chi tiết sản phẩm
                </label>
                <textarea
                  rows="2"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Giới thiệu dinh dưỡng, hương vị, cách bảo quản..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white outline-none resize-none"
                />
              </div>

              {/* Checkboxes */}
              <div className="flex items-center gap-6 pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-red-600">
                  <input
                    type="checkbox"
                    checked={formData.isFlashSale}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        isFlashSale: e.target.checked,
                      })
                    }
                    className="rounded text-red-600"
                  />
                  <span>Đưa vào mục Giờ Vàng Giá Sốc (Flash Sale)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-emerald-700">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) =>
                      setFormData({ ...formData, featured: e.target.checked })
                    }
                    className="rounded text-emerald-600"
                  />
                  <span>Sản phẩm nổi bật trang chủ</span>
                </label>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Hủy Bỏ
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#2271b1] hover:bg-[#135e96] text-white rounded-lg text-xs font-bold shadow-sm"
                >
                  {editingProduct ? "Lưu Thay Đổi" : "Thêm Hoa Quả"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

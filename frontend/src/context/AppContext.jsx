import React, { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  // Navigation: 'store' | 'admin'
  const [currentView, setCurrentView] = useState("store");
  const [adminTab, setAdminTab] = useState("dashboard"); // 'dashboard', 'products', 'orders', 'plugins', 'settings'

  // Admin Auth state
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return localStorage.getItem("fruit_admin_auth") === "true";
  });

  // Core Data
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [orders, setOrders] = useState([]);
  const [plugins, setPlugins] = useState([]);
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);

  // Storefront Filter & Search
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Cart & Modals
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("fruit_cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null); // for detail modal
  const [appliedVoucher, setAppliedVoucher] = useState(null);

  // Toast notifications
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Sync cart to localStorage
  useEffect(() => {
    localStorage.setItem("fruit_cart", JSON.stringify(cart));
  }, [cart]);

  // Initial fetch from backend
  const fetchData = async () => {
    try {
      const [resProd, resCat, resOrd, resPlug, resSet] = await Promise.all([
        fetch("/api/products").then((r) => r.json()),
        fetch("/api/categories").then((r) => r.json()),
        fetch("/api/orders").then((r) => r.json()),
        fetch("/api/plugins").then((r) => r.json()),
        fetch("/api/settings").then((r) => r.json()),
      ]);

      if (Array.isArray(resProd)) setProducts(resProd);
      if (Array.isArray(resCat)) setCategories(resCat);
      if (Array.isArray(resOrd)) setOrders(resOrd);
      if (Array.isArray(resPlug)) setPlugins(resPlug);
      if (resSet && typeof resSet === "object") setSettings(resSet);
    } catch (err) {
      console.error("Error fetching data from API:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Cart Actions
  const addToCart = (product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }
      return [...prev, { ...product, quantity }];
    });
    showToast(
      `Đã thêm ${quantity} x "${product.name}" vào giỏ hàng!`,
      "success",
    );
  };

  const updateCartQty = (productId, delta) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
    showToast("Đã xóa sản phẩm khỏi giỏ hàng", "info");
  };

  const clearCart = () => {
    setCart([]);
    setAppliedVoucher(null);
  };

  // Cart Totals
  const cartSubtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const discountAmount = appliedVoucher ? appliedVoucher.discount : 0;
  const shippingFee =
    cartSubtotal >= (settings.freeShippingMin || 300000) || cartSubtotal === 0
      ? 0
      : settings.shippingFee || 25000;
  const cartTotal = Math.max(
    0,
    cartSubtotal - discountAmount + (cartSubtotal > 0 ? shippingFee : 0),
  );
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Apply Voucher
  const applyVoucherCode = (code) => {
    const vouchers = settings.vouchers || [];
    const cleanCode = code.trim().toUpperCase();
    const found = vouchers.find((v) => v.code.toUpperCase() === cleanCode);

    if (!found) {
      showToast(`Mã giảm giá "${cleanCode}" không hợp lệ!`, "error");
      return false;
    }
    if (cartSubtotal < found.minOrder) {
      showToast(
        `Đơn hàng tối thiểu ${found.minOrder.toLocaleString("vi-VN")}đ để dùng mã này!`,
        "error",
      );
      return false;
    }

    setAppliedVoucher(found);
    showToast(
      `Áp dụng mã ${found.code} thành công! Giảm ${found.discount.toLocaleString("vi-VN")}đ`,
      "success",
    );
    return true;
  };

  // Order Placement
  const placeOrder = async (orderData) => {
    try {
      const payload = {
        ...orderData,
        items: cart,
        subtotal: cartSubtotal,
        discount: discountAmount,
        total: cartTotal,
      };

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const newOrder = await res.json();
        setOrders((prev) => [newOrder, ...prev]);
        clearCart();
        setIsCheckoutOpen(false);
        return newOrder;
      }
    } catch (err) {
      console.error("Error placing order:", err);
    }
    return null;
  };

  // Admin Actions
  const loginAdmin = (username, password) => {
    const validUser = settings.adminUser || "admin";
    const validPass = settings.adminPass || "admin";
    if (username === validUser && password === validPass) {
      setIsAdminLoggedIn(true);
      localStorage.setItem("fruit_admin_auth", "true");
      showToast("Đăng nhập WordPress Admin thành công!", "success");
      return true;
    }
    showToast("Tên đăng nhập hoặc mật khẩu admin không đúng!", "error");
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem("fruit_admin_auth");
    showToast("Đã đăng xuất khỏi trang quản trị", "info");
  };

  // Product CRUD
  const saveProduct = async (productData) => {
    try {
      const isEdit = !!productData.id;
      const url = isEdit ? `/api/products/${productData.id}` : "/api/products";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });

      if (res.ok) {
        const saved = await res.json();
        if (isEdit) {
          setProducts((prev) =>
            prev.map((p) => (p.id === saved.id ? saved : p)),
          );
          showToast("Đã cập nhật sản phẩm thành công!", "success");
        } else {
          setProducts((prev) => [saved, ...prev]);
          showToast("Đã thêm sản phẩm hoa quả mới!", "success");
        }
        return true;
      }
    } catch (err) {
      console.error("Error saving product:", err);
      showToast("Lỗi khi lưu sản phẩm", "error");
    }
    return false;
  };

  const deleteProduct = async (id) => {
    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (res.ok) {
        setProducts((prev) => prev.filter((p) => p.id !== id));
        showToast("Đã xóa sản phẩm khỏi danh sách", "success");
        return true;
      }
    } catch (err) {
      console.error("Error deleting product:", err);
      showToast("Lỗi khi xóa sản phẩm", "error");
    }
    return false;
  };

  // Order Status Update
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const res = await fetch(`/api/orders/${orderId}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        const updated = await res.json();
        setOrders((prev) => prev.map((o) => (o.id === orderId ? updated : o)));
        showToast(`Đã cập nhật đơn ${orderId} sang "${newStatus}"`, "success");
        return true;
      }
    } catch (err) {
      console.error("Error updating order status:", err);
    }
    return false;
  };

  // Plugin Management
  const togglePlugin = async (pluginId) => {
    try {
      const res = await fetch(`/api/plugins/${pluginId}/toggle`, {
        method: "PUT",
      });
      if (res.ok) {
        const updated = await res.json();
        setPlugins((prev) =>
          prev.map((p) => (p.id === pluginId ? updated : p)),
        );
        showToast(
          `Đã ${updated.active ? "Kích hoạt" : "Hủy kích hoạt"} plugin ${updated.name}`,
          "info",
        );
      }
    } catch (err) {
      console.error("Error toggling plugin:", err);
    }
  };

  const updatePluginSettings = async (pluginId, newSettings) => {
    try {
      const res = await fetch(`/api/plugins/${pluginId}/settings`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSettings),
      });
      if (res.ok) {
        const updated = await res.json();
        setPlugins((prev) =>
          prev.map((p) => (p.id === pluginId ? updated : p)),
        );
        showToast(`Đã lưu cấu hình plugin ${updated.name}`, "success");
        return true;
      }
    } catch (err) {
      console.error("Error updating plugin settings:", err);
    }
    return false;
  };

  // Settings Update
  const saveSettings = async (newSettings) => {
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSettings),
      });
      if (res.ok) {
        const updated = await res.json();
        setSettings(updated);
        showToast("Đã lưu cài đặt website thành công!", "success");
        return true;
      }
    } catch (err) {
      console.error("Error saving settings:", err);
    }
    return false;
  };

  // Helper to check if a plugin is active
  const isPluginActive = (pluginId) => {
    const p = plugins.find((item) => item.id === pluginId);
    return p ? p.active : false;
  };

  const getPlugin = (pluginId) => {
    return plugins.find((item) => item.id === pluginId) || null;
  };

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        adminTab,
        setAdminTab,
        isAdminLoggedIn,
        loginAdmin,
        logoutAdmin,
        products,
        categories,
        orders,
        plugins,
        settings,
        loading,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        cart,
        cartCount,
        cartSubtotal,
        discountAmount,
        shippingFee,
        cartTotal,
        addToCart,
        updateCartQty,
        removeFromCart,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        selectedProduct,
        setSelectedProduct,
        appliedVoucher,
        applyVoucherCode,
        placeOrder,
        saveProduct,
        deleteProduct,
        updateOrderStatus,
        togglePlugin,
        updatePluginSettings,
        saveSettings,
        isPluginActive,
        getPlugin,
        toast,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within an AppProvider");
  return context;
}

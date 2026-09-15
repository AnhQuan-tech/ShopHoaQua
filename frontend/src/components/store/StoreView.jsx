import React from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";
import HeroBanner from "./HeroBanner";
import FlashSaleSection from "./FlashSaleSection";
import ProductCard from "./ProductCard";
import ProductDetailModal from "./ProductDetailModal";
import CartDrawer from "./CartDrawer";
import CheckoutModal from "./CheckoutModal";
import MegaSalePopup from "../plugins/MegaSalePopup";
import SocialProofPopup from "../plugins/SocialProofPopup";
import LuckyWheel from "../plugins/LuckyWheel";
import FruitFallEffect from "../plugins/FruitFallEffect";
import FloatingContact from "../plugins/FloatingContact";
import { useApp } from "../../context/AppContext";
import { Sparkles, ShieldAlert } from "lucide-react";

export default function StoreView() {
  const {
    products,
    categories,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
  } = useApp();

  // Filter products by category and search
  const filteredProducts = products.filter((p) => {
    const matchCat =
      selectedCategory === "all" || p.category === selectedCategory;
    const matchSearch =
      !searchQuery ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.description &&
        p.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (p.origin && p.origin.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCat && matchSearch;
  });

  const currentCatObj = categories.find((c) => c.id === selectedCategory) || {
    name: "Tất Cả Sản Phẩm",
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] relative selection:bg-emerald-100 selection:text-emerald-900">
      {/* Header */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* If user is searching or has filtered, skip hero banner or show banner when on 'all' */}
        {selectedCategory === "all" && !searchQuery && (
          <>
            <HeroBanner />
            <FlashSaleSection />
          </>
        )}

        {/* Product Catalog Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Section Heading */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full uppercase mb-2">
                <Sparkles className="w-3.5 h-3.5 text-fruit-green" />
                <span>Tuyển Chọn Tươi Ngon Nhất</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {searchQuery
                  ? `Kết quả tìm kiếm cho: "${searchQuery}"`
                  : currentCatObj.name}
              </h2>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Hiển thị{" "}
              <strong className="text-slate-800">
                {filteredProducts.length}
              </strong>{" "}
              loại trái cây chuẩn sạch
            </p>
          </div>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="py-16 text-center bg-white rounded-3xl border border-slate-100 p-8">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3 text-3xl">
                🔍
              </div>
              <h3 className="font-bold text-base text-slate-800">
                Không tìm thấy hoa quả phù hợp
              </h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Bạn thử tìm kiếm từ khóa khác như "Táo Envy", "Nho Mẫu Đơn",
                "Cherry" hoặc chọn danh mục khác nhé!
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("all");
                }}
                className="mt-4 px-4 py-2 rounded-xl bg-fruit-green text-white text-xs font-bold"
              >
                Xem tất cả hoa quả
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals & Overlays */}
      <CartDrawer />
      <CheckoutModal />
      <ProductDetailModal />

      {/* Plugins & Popups linh tinh lung tung beng */}
      <MegaSalePopup />
      <SocialProofPopup />
      <LuckyWheel />
      <FruitFallEffect />
      <FloatingContact />
    </div>
  );
}

import React from "react";
import { useApp } from "./context/AppContext";
import StoreView from "./components/store/StoreView";
import AdminLayout from "./components/admin/AdminLayout";
import AdminLogin from "./components/admin/AdminLogin";
import Toast from "./components/common/Toast";

export default function App() {
  const { currentView, isAdminLoggedIn } = useApp();

  return (
    <>
      <Toast />
      {currentView === "store" && <StoreView />}
      {currentView === "admin" &&
        (isAdminLoggedIn ? <AdminLayout /> : <AdminLogin />)}
    </>
  );
}

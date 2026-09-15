import React from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";
import { useApp } from "../../context/AppContext";

export default function Toast() {
  const { toast } = useApp();
  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />,
    info: <Info className="w-5 h-5 text-blue-500 shrink-0" />,
  };

  const bgColors = {
    success: "border-emerald-200 bg-emerald-50 text-emerald-900",
    error: "border-red-200 bg-red-50 text-red-900",
    info: "border-blue-200 bg-blue-50 text-blue-900",
  };

  return (
    <div className="fixed top-5 right-5 z-50 max-w-sm animate-in fade-in slide-in-from-top-4 duration-300">
      <div
        className={`flex items-center gap-3 p-4 rounded-xl border shadow-lg ${bgColors[toast.type] || bgColors.info}`}
      >
        {icons[toast.type] || icons.info}
        <p className="text-sm font-medium flex-1">{toast.message}</p>
      </div>
    </div>
  );
}

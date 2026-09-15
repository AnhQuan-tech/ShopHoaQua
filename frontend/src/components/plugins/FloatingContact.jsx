import React, { useState } from "react";
import { Phone, MessageCircle, MessageSquare, X } from "lucide-react";
import { useApp } from "../../context/AppContext";

export default function FloatingContact() {
  const { isPluginActive, getPlugin, settings } = useApp();
  const isActive = isPluginActive("wp_floating_contact");
  const plugin = getPlugin("wp_floating_contact");

  const [isExpanded, setIsExpanded] = useState(false);

  if (!isActive) return null;

  const hotline = plugin?.settings?.hotline || settings.phone || "0988 888 999";
  const zalo = plugin?.settings?.zalo || settings.phone || "0988 888 999";

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2.5">
      {/* Expanded options */}
      {isExpanded && (
        <div className="flex flex-col gap-2 animate-in slide-in-from-bottom-3 duration-200">
          {/* Zalo Button */}
          <a
            href={`https://zalo.me/${zalo.replace(/[^0-9]/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-lg hover:scale-105 transition-all"
          >
            <div className="w-5 h-5 rounded-full bg-white text-blue-600 flex items-center justify-center font-bold text-[10px]">
              Z
            </div>
            <span>Chat Zalo Tư Vấn</span>
          </a>

          {/* Hotline Call */}
          <a
            href={`tel:${hotline.replace(/[^0-9]/g, "")}`}
            className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-lg hover:scale-105 transition-all"
          >
            <Phone className="w-4 h-4" />
            <span>Gọi Hotline: {hotline}</span>
          </a>
        </div>
      )}

      {/* Main Toggle Button */}
      <button
        onClick={() => setIsExpanded((prev) => !prev)}
        className="w-13 h-13 p-3.5 rounded-full bg-gradient-to-tr from-emerald-600 to-fruit-green text-white shadow-xl shadow-fruit-green/40 hover:scale-110 active:scale-95 transition-all flex items-center justify-center"
        title="Liên hệ tư vấn hoa quả"
      >
        {isExpanded ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6 animate-pulse" />
        )}
      </button>
    </div>
  );
}

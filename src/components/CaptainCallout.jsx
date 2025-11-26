import React from 'react';

export default function CaptainCallout({ title, children, type = "info" }) {
  const getIcon = () => {
    switch(type) {
      case "tip": return "💡";
      case "checklist": return "✅";
      case "warning": return "⚠️";
      case "security": return "🔒";
      default: return "🤖";
    }
  };

  return (
    <div className="bg-orange-50 border-l-4 border-orange-500 rounded-r-lg p-6 my-6 shadow-sm relative overflow-hidden">
      <div className="flex items-center gap-3 mb-3 font-bold text-orange-800">
        <span className="text-2xl filter drop-shadow-sm">{getIcon()}</span>
        <h4 className="uppercase tracking-wide text-sm">{title || "CAPTAIN EFFICIENCY SAYS"}</h4>
      </div>
      
      <div className="text-gray-800 leading-relaxed relative z-10">
        {children}
      </div>

      {/* Decorative background element */}
      <div className="absolute -bottom-4 -right-4 opacity-5 pointer-events-none">
        <span className="text-9xl">🤖</span>
      </div>
    </div>
  );
}

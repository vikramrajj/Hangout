import React, { useEffect } from 'react';

// Toast notification — auto-dismisses after 3s
export default function Toast({ message, icon, visible, onHide }) {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(onHide, 3000);
      return () => clearTimeout(timer);
    }
  }, [visible, onHide]);

  if (!visible) return null;

  return (
    <div className="fixed top-4 left-4 right-4 z-[100] flex justify-center pointer-events-none">
      <div className="bg-warmgray text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 slide-down max-w-sm pointer-events-auto">
        {icon && <span className="text-lg">{icon}</span>}
        <span className="text-sm font-medium">{message}</span>
      </div>
    </div>
  );
}

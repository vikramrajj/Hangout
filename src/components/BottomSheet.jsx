import React from 'react';

// Bottom sheet modal — slides up from bottom
export default function BottomSheet({ children, onClose, title }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end fade-in" onClick={onClose}>
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
      <div
        className="relative w-full bg-cream rounded-t-3xl p-6 slide-up max-h-[70vh] overflow-y-auto no-scrollbar"
        onClick={e => e.stopPropagation()}
      >
        <div className="w-10 h-1 bg-stone rounded-full mx-auto mb-4" />
        {title && <h3 className="text-lg font-semibold text-warmgray mb-3">{title}</h3>}
        {children}
      </div>
    </div>
  );
}

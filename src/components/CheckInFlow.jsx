import React, { useState, useEffect } from 'react';
import { Icons } from '../icons/Icons';

export default function CheckInFlow({ onConfirm, onCancel }) {
  const [stage, setStage] = useState('scan'); // scan | confirm
  const [visibility, setVisibility] = useState('close');
  const [shareCircle, setShareCircle] = useState(false);

  useEffect(() => {
    if (stage === 'scan') {
      const timer = setTimeout(() => setStage('confirm'), 2500);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  if (stage === 'scan') {
    return (
      <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center">
        <div className="relative w-[280px] h-[280px] rounded-3xl overflow-hidden bg-gray-900">
          {/* Scanner frame */}
          <div className="absolute inset-4 border-2 border-white/40 rounded-2xl">
            <div className="absolute top-0 left-0 w-6 h-6 border-t-3 border-l-3 border-terracotta rounded-tl-lg" />
            <div className="absolute top-0 right-0 w-6 h-6 border-t-3 border-r-3 border-terracotta rounded-tr-lg" />
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-3 border-l-3 border-terracotta rounded-bl-lg" />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-3 border-r-3 border-terracotta rounded-br-lg" />
            {/* Scanning line */}
            <div className="absolute left-2 right-2 h-0.5 bg-terracotta/80 scanner-line" />
          </div>
        </div>
        <p className="text-white/80 text-sm mt-6 text-center px-8">Scan the code at your table or venue</p>
        <p className="text-white/40 text-xs mt-2">or tap NFC if supported</p>
        <button onClick={onCancel} className="mt-8 text-white/60 text-sm">Cancel</button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-end fade-in">
      <div className="w-full bg-cream rounded-t-3xl p-6 slide-up">
        <div className="w-10 h-1 bg-stone rounded-full mx-auto mb-5" />
        <h3 className="text-lg font-semibold text-warmgray mb-1">You're here!</h3>
        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-xl bg-stone/50 flex items-center justify-center text-xl">☕</div>
          <div>
            <p className="font-medium text-warmgray">Blue Bottle Coffee</p>
            <p className="text-xs text-warmgray/60">123 Shoreditch High St</p>
          </div>
        </div>

        <p className="text-xs font-medium text-warmgray/70 mb-2">WHO CAN SEE THIS?</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {[
            { id: 'close', label: 'Close Friends' },
            { id: 'all', label: 'All Friends' },
            { id: 'me', label: 'Just Me' },
          ].map(v => (
            <button
              key={v.id}
              onClick={() => setVisibility(v.id)}
              className={`px-3 py-2 rounded-full text-xs font-medium transition-all ${
                visibility === v.id ? 'bg-moss text-white' : 'bg-stone/50 text-warmgray'
              }`}
            >
              {v.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => setShareCircle(!shareCircle)}
          className="flex items-center gap-3 mb-5 p-3 rounded-xl bg-stone/30 w-full"
        >
          <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
            shareCircle ? 'bg-moss border-moss' : 'border-warmgray/40'
          }`}>
            {shareCircle && <span className="text-white text-xs">✓</span>}
          </div>
          <span className="text-sm text-warmgray">Also share with Cafe Regulars circle</span>
        </button>

        <div className="flex items-center gap-2 mb-5 text-xs text-warmgray/50">
          {Icons.clock}
          <span>Visible for 2 hours, then auto-hides</span>
        </div>

        <button
          onClick={() => onConfirm({ venue: 'Blue Bottle Coffee', visibility })}
          className="w-full py-3.5 rounded-xl bg-terracotta text-white font-medium text-sm active:scale-[0.98] transition-transform"
        >
          Confirm check-in
        </button>
      </div>
    </div>
  );
}

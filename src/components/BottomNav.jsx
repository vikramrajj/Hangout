import React from 'react';
import { Icons } from '../icons/Icons';

// Unified bottom navigation — single component, no duplication
export default function BottomNav({ activeTab, onTabChange, onCheckIn }) {
  const tabs = [
    { id: 'map', icon: Icons.map, label: 'Map' },
    { id: 'circles', icon: Icons.circles, label: 'Circles' },
    { id: 'invites', icon: Icons.invites, label: 'Activity' },
    { id: 'profile', icon: Icons.profile, label: 'Profile' },
  ];

  return (
    <div className="bg-cream/98 backdrop-blur-md border-t border-stone/40 px-2 pb-2 pt-1.5 flex items-center justify-around z-30 safe-area-bottom">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex flex-col items-center py-1 px-3 rounded-xl min-w-[60px] transition-all ${
            activeTab === tab.id
              ? 'bg-moss/10 text-moss'
              : 'text-warmgray/40'
          }`}
        >
          <div className="transition-transform active:scale-90">
            {tab.icon}
          </div>
          <span className={`text-[10px] mt-0.5 font-medium ${
            activeTab === tab.id ? 'text-moss' : 'text-warmgray/40'
          }`}>
            {tab.label}
          </span>
        </button>
      ))}

      {/* Check-in FAB — sits above the nav */}
      <div className="relative">
        <button
          onClick={onCheckIn}
          className="w-12 h-12 rounded-full bg-terracotta shadow-lg shadow-terracotta/30 flex items-center justify-center text-white -mt-5 active:scale-90 transition-transform"
        >
          {Icons.camera}
        </button>
      </div>
    </div>
  );
}

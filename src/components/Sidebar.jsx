import React from 'react';
import { Icons } from '../icons/Icons';

// Desktop sidebar navigation
export default function Sidebar({ activeTab, onTabChange, onCheckIn }) {
  const navItems = [
    { id: 'map', icon: Icons.map, label: 'Map', desc: 'See friends nearby' },
    { id: 'circles', icon: Icons.circles, label: 'Circles', desc: 'Discover groups' },
    { id: 'invites', icon: Icons.invites, label: 'Activity', desc: 'Recent updates' },
    { id: 'profile', icon: Icons.profile, label: 'Profile', desc: 'Your settings' },
  ];

  return (
    <aside className="w-64 bg-cream border-r border-stone/30 flex flex-col h-full">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-stone/20">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-terracotta flex items-center justify-center">
            <span className="text-white text-lg">◎</span>
          </div>
          <div>
            <h1 className="text-lg font-bold text-warmgray leading-tight">Hangout</h1>
            <p className="text-[10px] text-warmgray/50">Real-life social</p>
          </div>
        </div>
      </div>

      {/* Check-in CTA */}
      <div className="px-4 py-4">
        <button
          onClick={onCheckIn}
          className="w-full py-3 px-4 rounded-xl bg-terracotta text-white font-medium text-sm flex items-center justify-center gap-2 shadow-lg shadow-terracotta/20 hover:bg-terracotta/90 active:scale-[0.98] transition-all"
        >
          {Icons.camera}
          Check in
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-2">
        <p className="text-[10px] font-semibold text-warmgray/40 uppercase tracking-wider px-3 mb-2">Menu</p>
        <ul className="space-y-1">
          {navItems.map(item => (
            <li key={item.id}>
              <button
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all ${
                  activeTab === item.id
                    ? 'bg-moss/10 text-moss'
                    : 'text-warmgray/70 hover:bg-stone/30 hover:text-warmgray'
                }`}
              >
                <span className={`transition-transform ${activeTab === item.id ? 'scale-110' : ''}`}>
                  {item.icon}
                </span>
                <div>
                  <span className="text-sm font-medium block">{item.label}</span>
                  <span className={`text-[10px] ${activeTab === item.id ? 'text-moss/70' : 'text-warmgray/40'}`}>
                    {item.desc}
                  </span>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Privacy quick access */}
      <div className="px-4 py-4 border-t border-stone/20">
        <button
          onClick={() => onTabChange('profile')}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left hover:bg-stone/30 transition-all"
        >
          <span className="text-warmgray/60">{Icons.shield}</span>
          <div>
            <span className="text-sm font-medium text-warmgray/70 block">Privacy</span>
            <span className="text-[10px] text-warmgray/40">Who can see you</span>
          </div>
        </button>
      </div>

      {/* User */}
      <div className="px-4 py-4 border-t border-stone/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-moss flex items-center justify-center text-white text-sm font-bold">
            V
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-warmgray truncate">Vikram</p>
            <p className="text-[10px] text-warmgray/50">Member since 2024</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

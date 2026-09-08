import React from 'react';
import { circles } from '../data/mockData';
import { Icons } from '../icons/Icons';

export default function ProfileView() {
  return (
    <div className="h-full flex flex-col bg-cream">
      <div className="px-4 pt-4 pb-2">
        <h2 className="text-xl font-bold text-warmgray">Profile</h2>
      </div>
      <div className="flex-1 overflow-y-auto px-4 pb-4 no-scrollbar">
        {/* User card */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-16 h-16 rounded-full bg-moss flex items-center justify-center text-white text-xl font-bold">
            V
          </div>
          <div>
            <h3 className="font-semibold text-warmgray text-base">Vikram</h3>
            <p className="text-sm text-warmgray/60">Member since 2024</p>
          </div>
        </div>

        {/* Privacy — always visible, not collapsible */}
        <div className="bg-moss/10 rounded-xl p-4 mb-4">
          <div className="flex items-center gap-2 mb-2">
            {Icons.eye}
            <span className="text-sm font-medium text-moss">Who can see me right now</span>
          </div>
          <p className="text-xs text-warmgray/70 mb-3">
            Right now: 4 close friends can see you're at Blue Bottle Coffee
          </p>
          <div className="space-y-2">
            {[
              { cat: '☕ Food & Cafe', vis: 'Close Friends' },
              { cat: '🏃 Fitness', vis: 'Just Me' },
              { cat: '📚 Reading', vis: 'All Friends' },
              { cat: '🎮 Gaming', vis: 'Close Friends' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-xs text-warmgray">{item.cat}</span>
                <span className="text-xs text-moss font-medium">{item.vis}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 pt-3 border-t border-moss/20">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-xs text-warmgray">Always ask before sharing to new Circle</span>
              <div className="w-9 h-5 bg-moss rounded-full relative">
                <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm" />
              </div>
            </label>
          </div>
        </div>

        {/* Circles joined */}
        <h4 className="text-sm font-semibold text-warmgray mb-2">Circles joined</h4>
        <div className="space-y-2 mb-6">
          {circles.slice(0, 4).map(c => (
            <div key={c.id} className="flex items-center gap-3 bg-white rounded-xl p-3 shadow-sm">
              <span className="text-lg">{c.icon}</span>
              <span className="text-sm text-warmgray flex-1">{c.name}</span>
              <button className="text-xs text-warmgray/40">Leave</button>
            </div>
          ))}
        </div>

        {/* Check-in history */}
        <h4 className="text-sm font-semibold text-warmgray mb-2">Check-in history</h4>
        <p className="text-xs text-warmgray/50 mb-2">Only visible to you</p>
        <div className="space-y-2">
          {[
            { venue: 'Blue Bottle Coffee', time: 'Today, 2:14 PM' },
            { venue: 'Hampstead Heath', time: 'Yesterday, 8:00 AM' },
            { venue: 'British Library', time: 'Last Tue, 3:30 PM' },
          ].map((h, i) => (
            <div key={i} className="flex items-center justify-between bg-white rounded-xl p-3 shadow-sm">
              <div>
                <p className="text-sm text-warmgray">{h.venue}</p>
                <p className="text-xs text-warmgray/50">{h.time}</p>
              </div>
              <button className="text-xs text-warmgray/30">Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

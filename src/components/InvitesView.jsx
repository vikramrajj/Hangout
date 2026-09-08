import React from 'react';
import { invites } from '../data/mockData';
import { Icons } from '../icons/Icons';

export default function InvitesView({ onNavigate }) {
  return (
    <div className="h-full flex flex-col bg-cream">
      <div className="px-4 pt-4 pb-2">
        <h2 className="text-xl font-bold text-warmgray">Activity</h2>
      </div>
      <div className="flex-1 overflow-y-auto px-4 pb-4 no-scrollbar">
        {invites.map(inv => (
          <div
            key={inv.id}
            className="flex items-start gap-3 py-3 border-b border-stone/30 cursor-pointer active:bg-stone/20 -mx-2 px-2 rounded-lg transition-colors"
            onClick={() => inv.type === 'checkin' && onNavigate && onNavigate('map')}
          >
            <div className="w-10 h-10 rounded-full bg-moss/20 flex items-center justify-center shrink-0">
              {inv.type === 'checkin' && <span className="text-sm">📍</span>}
              {inv.type === 'circle' && <span className="text-sm">🏃</span>}
              {inv.type === 'invite' && <span className="text-sm">📨</span>}
            </div>
            <div className="flex-1">
              <p className="text-sm text-warmgray">
                <span className="font-medium">{inv.user || inv.circle}</span>{' '}
                {inv.message}
                {inv.venue && <span className="text-warmgray/60"> · {inv.venue}</span>}
              </p>
              <p className="text-xs text-warmgray/40 mt-0.5">{inv.time}</p>
            </div>
            {Icons.chevron}
          </div>
        ))}
        <div className="text-center py-8">
          <div className="w-12 h-12 rounded-full bg-stone/30 flex items-center justify-center mx-auto mb-2">
            <span className="text-lg">✓</span>
          </div>
          <p className="text-sm text-warmgray/50">You're all caught up</p>
        </div>
      </div>
    </div>
  );
}

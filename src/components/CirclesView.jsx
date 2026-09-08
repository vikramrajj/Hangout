import React, { useState } from 'react';
import { circles, categories } from '../data/mockData';
import { Icons } from '../icons/Icons';

export default function CirclesView() {
  const [activeCat, setActiveCat] = useState('all');
  const [selectedCircle, setSelectedCircle] = useState(null);
  const [circleTab, setCircleTab] = useState('meetups');

  const filtered = activeCat === 'all' ? circles : circles.filter(c => c.category === activeCat);

  if (selectedCircle) {
    return (
      <CircleDetail
        circle={selectedCircle}
        tab={circleTab}
        onTabChange={setCircleTab}
        onBack={() => setSelectedCircle(null)}
      />
    );
  }

  return (
    <div className="h-full flex flex-col bg-cream">
      <div className="px-4 pt-4 pb-2">
        <h2 className="text-xl font-bold text-warmgray mb-3">Circles</h2>
        <div className="relative mb-3">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-warmgray/40">{Icons.search}</span>
          <input
            type="text"
            placeholder="Search circles..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone/40 text-sm text-warmgray placeholder:text-warmgray/40 outline-none"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
          {categories.map(c => (
            <button
              key={c.id}
              onClick={() => setActiveCat(c.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                activeCat === c.id ? 'bg-moss text-white' : 'bg-stone/50 text-warmgray'
              }`}
            >
              {c.icon} {c.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-4 no-scrollbar">
        {filtered.map(circle => (
          <div
            key={circle.id}
            onClick={() => setSelectedCircle(circle)}
            className="bg-white rounded-2xl p-4 mb-3 shadow-sm cursor-pointer active:scale-[0.98] transition-transform"
          >
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-xl bg-stone/30 flex items-center justify-center text-xl shrink-0">
                {circle.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-warmgray text-sm">{circle.name}</h4>
                  {circle.sensitive && (
                    <span className="text-[10px] bg-amber/20 text-amber px-1.5 py-0.5 rounded-full">Private</span>
                  )}
                </div>
                <p className="text-xs text-warmgray/60 mt-0.5">
                  {circle.members} members · <span className="text-moss font-medium">{circle.nearby} nearby now</span>
                </p>
                <p className="text-xs text-warmgray/70 mt-1.5 line-clamp-1">{circle.desc}</p>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex -space-x-2">
                    {['A', 'B', 'C'].map((l, i) => (
                      <div
                        key={i}
                        className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center text-[9px] text-white font-medium"
                        style={{ background: ['#5C6B4F', '#7BA05B', '#C4704B'][i] }}
                      >
                        {l}
                      </div>
                    ))}
                  </div>
                  <button className="px-4 py-1.5 rounded-full bg-moss/10 text-moss text-xs font-medium">
                    Join
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CircleDetail({ circle, tab, onTabChange, onBack }) {
  return (
    <div className="h-full flex flex-col bg-cream fade-in">
      <div className="px-4 pt-4 pb-2 flex items-center gap-3">
        <button onClick={onBack} className="w-8 h-8 rounded-full bg-stone/40 flex items-center justify-center text-warmgray">
          {Icons.back}
        </button>
        <h2 className="text-lg font-bold text-warmgray flex-1">{circle.name}</h2>
        <button className="text-xs text-moss font-medium">Joined</button>
      </div>

      <div className="px-4 pb-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-14 h-14 rounded-2xl bg-stone/30 flex items-center justify-center text-2xl">
            {circle.icon}
          </div>
          <div>
            <p className="text-sm text-warmgray/70">{circle.members} members</p>
            <p className="text-xs text-moss font-medium">{circle.nearby} active nearby</p>
          </div>
        </div>
        <p className="text-sm text-warmgray/80 mb-1">{circle.desc}</p>
        <p className="text-xs text-warmgray/50">{circle.cadence}</p>
      </div>

      <div className="flex border-b border-stone/50 px-4">
        {['meetups', 'nearby', 'about'].map(t => (
          <button
            key={t}
            onClick={() => onTabChange(t)}
            className={`flex-1 py-2.5 text-xs font-medium ${
              tab === t ? 'text-moss border-b-2 border-moss' : 'text-warmgray/50'
            }`}
          >
            {t === 'meetups' ? 'Upcoming' : t === 'nearby' ? 'Nearby' : 'About'}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 pb-4 no-scrollbar">
        {tab === 'meetups' && (
          <div className="space-y-3">
            {[
              { date: 'Sat 14 Sep', time: '8:00 AM', loc: 'Hampstead Heath', going: 6 },
              { date: 'Sun 22 Sep', time: '9:00 AM', loc: "Regent's Park", going: 3 },
              { date: 'Sat 28 Sep', time: '8:00 AM', loc: 'Hampstead Heath', going: 8 },
            ].map((m, i) => (
              <div key={i} className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-moss">{m.date}</span>
                  <span className="text-xs text-warmgray/50">{m.going} going</span>
                </div>
                <p className="text-sm font-medium text-warmgray">{m.time} · {m.loc}</p>
                <button className="mt-3 px-4 py-2 rounded-lg bg-moss/10 text-moss text-xs font-medium">I'm in</button>
              </div>
            ))}
          </div>
        )}
        {tab === 'nearby' && (
          <div>
            <div className="grid grid-cols-3 gap-4">
              {(circle.sensitive
                ? [
                    { name: 'Alex', show: false },
                    { name: 'Sam', show: false },
                    { name: 'Jo', show: false },
                  ]
                : [
                    { name: 'Alex T.', show: true },
                    { name: 'Sam K.', show: true },
                    { name: 'Jo R.', show: true },
                    { name: 'Dev M.', show: true },
                    { name: 'Priya S.', show: true },
                    { name: 'Lee W.', show: true },
                  ]
              ).map((m, i) => (
                <div key={i} className="text-center">
                  <div
                    className={`w-14 h-14 rounded-full mx-auto mb-1.5 flex items-center justify-center text-white text-sm font-medium ${
                      m.show ? 'bg-moss/70' : 'bg-stone'
                    }`}
                  >
                    {m.name.charAt(0)}
                  </div>
                  <p className="text-xs text-warmgray/70 truncate">
                    {m.show ? m.name : 'Anonymous'}
                  </p>
                </div>
              ))}
            </div>
            {circle.sensitive && (
              <div className="mt-4 p-3 bg-amber/10 rounded-xl">
                <p className="text-xs text-amber font-medium">Members are anonymous by default</p>
                <p className="text-xs text-warmgray/50 mt-0.5">Opt in to appear with your name</p>
              </div>
            )}
          </div>
        )}
        {tab === 'about' && (
          <div className="space-y-4">
            <p className="text-sm text-warmgray/80">{circle.desc}</p>
            <p className="text-sm text-warmgray/80">{circle.cadence}</p>
            <div className="p-3 bg-stone/30 rounded-xl">
              <p className="text-xs text-warmgray/60">
                Joining this circle does not share your location. You control visibility at every check-in.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

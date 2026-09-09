import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import { friends, circles } from '../data/mockData';
import { Icons } from '../icons/Icons';
import BottomSheet from './BottomSheet';

export default function MapView({ activeFilter, onFilterChange, onCheckIn, checkedIn, onShowPrivacy, isDesktop }) {
  const [selectedPin, setSelectedPin] = useState(null);
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);

  const filteredFriends = activeFilter === 'circles' ? [] : friends;
  const circlePins = activeFilter === 'friends' ? [] : circles.filter(c => c.nearby > 0).slice(0, 4);
  const hasPins = filteredFriends.length > 0 || circlePins.length > 0;

  // Initialize map once
  useEffect(() => {
    if (mapInstanceRef.current || !mapRef.current) return;

    const map = L.map(mapRef.current, {
      center: [51.5300, -0.1100],
      zoom: 13,
      zoomControl: false,
      attributionControl: true,
    });

    // OpenStreetMap tiles with unique cache-busting per tile
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
      tileUrlFunction: function(coords) {
        return `https://tile.openstreetmap.org/${coords.z}/${coords.x}/${coords.y}.png?r=${Math.random().toString(36).substring(2)}`;
      }
    }).addTo(map);

    // User location marker with pulse
    const userIcon = L.divIcon({
      className: '',
      html: `<div style="position:relative;width:20px;height:20px;">
        <div class="pulse-ring"></div>
        <div class="user-marker" style="position:relative;z-index:1;"></div>
      </div>`,
      iconSize: [20, 20],
      iconAnchor: [10, 10]
    });
    L.marker([51.5300, -0.1100], { icon: userIcon }).addTo(map);

    // "You're here" label
    const labelIcon = L.divIcon({
      className: '',
      html: `<div style="margin-top:6px;background:#FAF7F2;padding:2px 6px;border-radius:4px;font-size:9px;color:#6B6560;font-weight:500;white-space:nowrap;box-shadow:0 1px 3px rgba(0,0,0,0.1);">You</div>`,
      iconSize: [30, 12],
      iconAnchor: [15, 0]
    });
    L.marker([51.5300, -0.1100], { icon: labelIcon, interactive: false }).addTo(map);

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update markers when filter changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear existing markers
    markersRef.current.forEach(m => map.removeLayer(m));
    markersRef.current = [];

    // Add friend markers
    if (activeFilter !== 'circles') {
      friends.forEach(f => {
        const ringColor = f.ring === 'green' ? '#7BA05B' : '#D4A853';
        const icon = L.divIcon({
          className: '',
          html: `<div class="friend-marker" style="width:40px;height:40px;background:${f.color};border-color:${ringColor};position:relative;">
            ${f.initials}
            <div style="position:absolute;bottom:-8px;left:50%;transform:translateX(-50%);background:#FAF7F2;padding:1px 4px;border-radius:3px;font-size:8px;color:#6B6560;font-weight:600;white-space:nowrap;box-shadow:0 1px 2px rgba(0,0,0,0.1);">${f.distance}</div>
          </div>`,
          iconSize: [40, 40],
          iconAnchor: [20, 20]
        });
        const marker = L.marker([f.lat, f.lng], { icon }).addTo(map);
        marker.on('click', () => setSelectedPin({ ...f, type: 'friend' }));
        markersRef.current.push(marker);
      });
    }

    // Add circle markers
    if (activeFilter !== 'friends') {
      circles.filter(c => c.nearby > 0).slice(0, 4).forEach(c => {
        const icon = L.divIcon({
          className: '',
          html: `<div class="circle-marker" style="width:42px;height:42px;">${c.icon}</div>`,
          iconSize: [42, 42],
          iconAnchor: [21, 21]
        });
        const marker = L.marker([c.lat, c.lng], { icon }).addTo(map);
        marker.on('click', () => setSelectedPin({ ...c, type: 'circle' }));
        markersRef.current.push(marker);
      });
    }
  }, [activeFilter]);

  const handleRecenter = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView([51.5300, -0.1100], 13, { animate: true });
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Top Bar — hide header on desktop since sidebar has it */}
      <div className={`bg-cream/95 backdrop-blur-md px-4 ${isDesktop ? 'pt-3 pb-2' : 'pt-4 pb-2'} z-20`}>
        {!isDesktop && (
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-terracotta/10 flex items-center justify-center text-terracotta">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.3"/></svg>
              </div>
              <h1 className="text-xl font-bold text-warmgray tracking-tight">Hangout</h1>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={onShowPrivacy} className="w-8 h-8 rounded-full bg-stone/50 flex items-center justify-center text-warmgray hover:bg-stone/70 transition-colors">
                {Icons.privacy}
              </button>
              <button onClick={onShowPrivacy} className="w-8 h-8 rounded-full bg-moss flex items-center justify-center text-white text-xs font-bold hover:bg-moss/90 transition-colors">
                V
              </button>
            </div>
          </div>
        )}
        {isDesktop && (
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-base font-semibold text-warmgray">Friends Map</h2>
            <button
              onClick={onCheckIn}
              className="px-4 py-2 rounded-lg bg-terracotta text-white text-xs font-medium flex items-center gap-1.5 shadow-sm hover:bg-terracotta/90 transition-colors"
            >
              {Icons.camera} Check in
            </button>
          </div>
        )}
        <div className="flex gap-2">
          {['friends', 'circles', 'both'].map(f => (
            <button
              key={f}
              onClick={() => onFilterChange(f)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeFilter === f
                  ? 'bg-moss text-white shadow-sm'
                  : 'bg-stone/40 text-warmgray hover:bg-stone/60'
              }`}
            >
              {f === 'both' ? 'Both' : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Map Area */}
      <div className="flex-1 relative overflow-hidden">
        <div ref={mapRef} className="absolute inset-0 z-0" />

        {/* Empty State */}
        {!hasPins && (
          <div className="absolute inset-0 flex items-center justify-center p-8 z-10 pointer-events-none">
            <div className="text-center bg-cream/95 backdrop-blur-sm rounded-2xl p-6 max-w-[280px] shadow-lg pointer-events-auto">
              <div className="w-12 h-12 rounded-full bg-stone/50 flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">📍</span>
              </div>
              <p className="text-warmgray text-sm font-medium mb-2">No friends checked in nearby</p>
              <p className="text-warmgray/60 text-xs mb-4">See who's hosting a Circle instead</p>
              <button className="px-4 py-2 bg-moss text-white text-xs font-medium rounded-full">
                Browse Circles
              </button>
            </div>
          </div>
        )}

        {/* Check-in banner */}
        {checkedIn && (
          <div className="absolute top-3 left-3 right-3 bg-softgreen rounded-xl px-4 py-3 flex items-center justify-between z-20 shadow-lg slide-down">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-sm">📍</span>
              </div>
              <div>
                <span className="text-white text-xs font-medium block">Checked in at {checkedIn.venue}</span>
                <span className="text-white/70 text-[10px]">{checkedIn.timeLeft} remaining</span>
              </div>
            </div>
            <button className="text-white/90 text-xs font-medium underline">Check out</button>
          </div>
        )}

        {/* Floating buttons */}
        <div className="absolute bottom-4 right-4 flex flex-col gap-3 z-20">
          <button
            onClick={handleRecenter}
            className="w-11 h-11 rounded-full bg-cream shadow-lg flex items-center justify-center text-warmgray active:scale-90 transition-transform"
          >
            {Icons.locate}
          </button>
        </div>
      </div>

      {/* Bottom Sheet */}
      {selectedPin && (
        <BottomSheet onClose={() => setSelectedPin(null)}>
          {selectedPin.type === 'friend' ? (
            <FriendSheet friend={selectedPin} />
          ) : (
            <CircleSheet circle={selectedPin} />
          )}
        </BottomSheet>
      )}
    </div>
  );
}

function FriendSheet({ friend }) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-14 h-14 rounded-full flex items-center justify-center font-bold text-white" style={{ background: friend.color }}>
          {friend.initials}
        </div>
        <div>
          <h4 className="font-semibold text-warmgray text-base">{friend.name}</h4>
          <p className="text-sm text-warmgray/70">{friend.category} {friend.venue}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 mb-4 p-3 bg-stone/30 rounded-xl text-xs text-warmgray/70">
        {Icons.clock}
        <span>Checked in {friend.time} min ago</span>
        <span className="ml-auto font-medium text-moss">{friend.distance} away</span>
      </div>
      <div className="flex gap-3">
        <button className="flex-1 py-3 rounded-xl bg-stone/50 text-warmgray text-sm font-medium flex items-center justify-center gap-2 active:scale-95 transition-transform">
          {Icons.message} Message
        </button>
        <button className="flex-1 py-3 rounded-xl bg-moss text-white text-sm font-medium flex items-center justify-center gap-2 active:scale-95 transition-transform">
          {Icons.walk} Head over
        </button>
      </div>
    </div>
  );
}

function CircleSheet({ circle }) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-14 h-14 rounded-2xl bg-terracotta/10 flex items-center justify-center text-2xl">
          {circle.icon}
        </div>
        <div>
          <h4 className="font-semibold text-warmgray text-base">{circle.name}</h4>
          <p className="text-sm text-moss font-medium">{circle.nearby} members nearby now</p>
        </div>
      </div>
      <p className="text-sm text-warmgray/80 mb-4">{circle.desc}</p>
      <div className="flex gap-3">
        <button className="flex-1 py-3 rounded-xl bg-stone/50 text-warmgray text-sm font-medium active:scale-95 transition-transform">
          View Circle
        </button>
        <button className="flex-1 py-3 rounded-xl bg-terracotta text-white text-sm font-medium active:scale-95 transition-transform">
          Join meetup
        </button>
      </div>
    </div>
  );
}

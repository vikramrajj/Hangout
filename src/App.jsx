import React, { useState, useEffect } from 'react';
import MapView from './components/MapView';
import CirclesView from './components/CirclesView';
import CheckInFlow from './components/CheckInFlow';
import InvitesView from './components/InvitesView';
import ProfileView from './components/ProfileView';
import BottomNav from './components/BottomNav';
import Sidebar from './components/Sidebar';
import Toast from './components/Toast';
import { Icons } from './icons/Icons';

export default function App() {
  const [activeTab, setActiveTab] = useState('map');
  const [mapFilter, setMapFilter] = useState('both');
  const [showCheckIn, setShowCheckIn] = useState(false);
  const [checkedIn, setCheckedIn] = useState(null);
  const [toast, setToast] = useState({ visible: false, message: '', icon: null });
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  // Responsive detection
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleCheckIn = () => setShowCheckIn(true);

  const handleCheckInConfirm = (data) => {
    setShowCheckIn(false);
    setCheckedIn({ venue: data.venue, timeLeft: '1h 58m' });
    setToast({ visible: true, message: `Checked in at ${data.venue}`, icon: '☕' });
  };

  const handleTabChange = (tab) => setActiveTab(tab);

  const renderContent = () => {
    switch (activeTab) {
      case 'map':
        return (
          <MapView
            activeFilter={mapFilter}
            onFilterChange={setMapFilter}
            onCheckIn={handleCheckIn}
            checkedIn={checkedIn}
            onShowPrivacy={() => setActiveTab('profile')}
            isDesktop={isDesktop}
          />
        );
      case 'circles':
        return <CirclesView />;
      case 'invites':
        return <InvitesView onNavigate={handleTabChange} />;
      case 'profile':
        return <ProfileView />;
      default:
        return null;
    }
  };

  // Desktop layout: sidebar + main content
  if (isDesktop) {
    return (
      <div className="h-screen w-screen bg-cream flex overflow-hidden">
        {/* Sidebar Navigation */}
        <Sidebar
          activeTab={activeTab}
          onTabChange={handleTabChange}
          onCheckIn={handleCheckIn}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Desktop Header */}
          <header className="bg-cream/95 backdrop-blur-md border-b border-stone/30 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-terracotta/10 flex items-center justify-center">
                <span className="text-terracotta text-lg">◎</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-warmgray">Hangout</h1>
                <p className="text-xs text-warmgray/50">Find your people nearby</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveTab('profile')}
                className="w-9 h-9 rounded-full bg-stone/50 flex items-center justify-center text-warmgray hover:bg-stone/70 transition-colors"
                title="Privacy settings"
              >
                {Icons.privacy}
              </button>
              <div className="w-9 h-9 rounded-full bg-moss flex items-center justify-center text-white text-sm font-bold cursor-pointer">
                V
              </div>
            </div>
          </header>

          {/* Content */}
          <main className="flex-1 overflow-hidden">
            <div className="h-full fade-in">
              {renderContent()}
            </div>
          </main>
        </div>

        {/* Check-in Flow Overlay */}
        {showCheckIn && (
          <CheckInFlow
            onConfirm={handleCheckInConfirm}
            onCancel={() => setShowCheckIn(false)}
          />
        )}

        {/* Toast notifications */}
        <Toast
          message={toast.message}
          icon={toast.icon}
          visible={toast.visible}
          onHide={() => setToast({ ...toast, visible: false })}
        />
      </div>
    );
  }

  // Mobile layout: full-screen content + bottom nav
  return (
    <div className="h-screen w-screen max-w-[430px] mx-auto bg-cream flex flex-col relative overflow-hidden shadow-2xl">
      {/* Main content */}
      <div className="flex-1 overflow-hidden relative">
        <div className="h-full fade-in">
          {renderContent()}
        </div>
      </div>

      {/* Bottom Nav with FAB */}
      <BottomNav
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onCheckIn={handleCheckIn}
      />

      {/* Check-in Flow Overlay */}
      {showCheckIn && (
        <CheckInFlow
          onConfirm={handleCheckInConfirm}
          onCancel={() => setShowCheckIn(false)}
        />
      )}

      {/* Toast notifications */}
      <Toast
        message={toast.message}
        icon={toast.icon}
        visible={toast.visible}
        onHide={() => setToast({ ...toast, visible: false })}
      />
    </div>
  );
}

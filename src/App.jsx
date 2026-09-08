import React, { useState } from 'react';
import MapView from './components/MapView';
import CirclesView from './components/CirclesView';
import CheckInFlow from './components/CheckInFlow';
import InvitesView from './components/InvitesView';
import ProfileView from './components/ProfileView';
import BottomNav from './components/BottomNav';
import Toast from './components/Toast';

export default function App() {
  const [activeTab, setActiveTab] = useState('map');
  const [mapFilter, setMapFilter] = useState('both');
  const [showCheckIn, setShowCheckIn] = useState(false);
  const [checkedIn, setCheckedIn] = useState(null);
  const [toast, setToast] = useState({ visible: false, message: '', icon: null });

  const handleCheckIn = () => setShowCheckIn(true);

  const handleCheckInConfirm = (data) => {
    setShowCheckIn(false);
    setCheckedIn({ venue: data.venue, timeLeft: '1h 58m' });
    setToast({ visible: true, message: `Checked in at ${data.venue}`, icon: '☕' });
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="h-screen w-screen max-w-[430px] mx-auto bg-cream flex flex-col relative overflow-hidden shadow-2xl">
      {/* Main content with fade transition */}
      <div className="flex-1 overflow-hidden relative">
        <div className="h-full fade-in">
          {activeTab === 'map' && (
            <MapView
              activeFilter={mapFilter}
              onFilterChange={setMapFilter}
              onCheckIn={handleCheckIn}
              checkedIn={checkedIn}
              onShowPrivacy={() => setActiveTab('profile')}
            />
          )}
          {activeTab === 'circles' && <CirclesView />}
          {activeTab === 'invites' && <InvitesView onNavigate={handleTabChange} />}
          {activeTab === 'profile' && <ProfileView />}
        </div>
      </div>

      {/* Unified Bottom Nav with FAB */}
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

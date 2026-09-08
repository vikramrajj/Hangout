// Mock friend data with real London coordinates
export const friends = [
  { id: 1, name: 'Ravi', initials: 'R', venue: 'Blue Bottle Coffee', category: '☕', lat: 51.5265, lng: -0.0785, time: 12, color: '#7BA05B', ring: 'green', distance: '0.3 mi' },
  { id: 2, name: 'Priya', initials: 'P', venue: 'Waterloo Station', category: '🚇', lat: 51.5031, lng: -0.1115, time: 8, color: '#5C6B4F', ring: 'green', distance: '1.2 mi' },
  { id: 3, name: 'Dev', initials: 'D', venue: 'Hampstead Heath', category: '🏃', lat: 51.5607, lng: -0.1636, time: 45, color: '#D4A853', ring: 'amber', distance: '2.1 mi' },
  { id: 4, name: 'Amara', initials: 'A', venue: 'British Library', category: '📚', lat: 51.5299, lng: -0.1277, time: 22, color: '#7BA05B', ring: 'green', distance: '0.8 mi' },
  { id: 5, name: 'Sam', initials: 'S', venue: 'The Castle Climbing', category: '🧗', lat: 51.5512, lng: -0.0756, time: 5, color: '#5C6B4F', ring: 'green', distance: '1.5 mi' },
  { id: 6, name: 'Jordan', initials: 'J', venue: 'Regent\'s Park', category: '🏃', lat: 51.5313, lng: -0.1569, time: 90, color: '#D4A853', ring: 'amber', distance: '1.1 mi' },
];

// Interest circles with coordinates
export const circles = [
  { id: 1, name: 'Trail & Trek', icon: '🏃', category: 'fitness', members: 142, nearby: 6, lat: 51.5580, lng: -0.1650, desc: 'Sunday morning trail runs, all paces welcome', cadence: 'Saturdays 8am, Hampstead Heath', sensitive: false },
  { id: 2, name: 'Cafe Regulars', icon: '☕', category: 'social', members: 89, nearby: 3, lat: 51.5125, lng: -0.1300, desc: 'Find your coffee spot crew — no pressure, just presence', cadence: 'Drop-in, various locations', sensitive: false },
  { id: 3, name: 'Gaming Den', icon: '🎮', category: 'gaming', members: 234, nearby: 8, lat: 51.5450, lng: -0.0550, desc: 'Board games, D&D, retro consoles — weekly meetups', cadence: 'Wednesdays 7pm, Hackney', sensitive: false },
  { id: 4, name: 'Book Fan Club', icon: '📚', category: 'reading', members: 67, nearby: 4, lat: 51.5350, lng: -0.1050, desc: 'Monthly reads across genres, currently reading Ishiguro', cadence: 'First Sunday monthly', sensitive: false },
  { id: 5, name: 'Reading Nearby', icon: '📖', category: 'reading', members: 198, nearby: 12, lat: 51.5200, lng: -0.1100, desc: 'Silent reading sessions in parks and cafes', cadence: 'Tuesdays & Thursdays', sensitive: false },
  { id: 6, name: 'Sober Meetup', icon: '💬', category: 'support', members: 54, nearby: 2, lat: 51.5150, lng: -0.0900, desc: 'Social gatherings without alcohol — walks, coffee, talks', cadence: 'Various, member-led', sensitive: true },
  { id: 7, name: 'Meet People', icon: '❤️', category: 'dating', members: 312, nearby: 15, lat: 51.5135, lng: -0.1200, desc: 'Low-pressure ways to meet new people in your area', cadence: 'Weekly mixers', sensitive: false },
  { id: 8, name: 'Climbers Unite', icon: '🧗', category: 'fitness', members: 96, nearby: 5, lat: 51.5400, lng: -0.0700, desc: 'Bouldering and roped climbing sessions for all levels', cadence: 'Mon/Wed/Fri evenings', sensitive: false },
];

// Activity feed
export const invites = [
  { id: 1, type: 'checkin', user: 'Ravi', message: 'checked in near you', venue: 'Blue Bottle Coffee', time: '2m ago' },
  { id: 2, type: 'circle', circle: 'Trail & Trek', message: 'Saturday run — 4 going', time: '18m ago' },
  { id: 3, type: 'invite', user: 'Amara', message: 'invited you to Book Fan Club', time: '1h ago' },
  { id: 4, type: 'checkin', user: 'Priya', message: 'is heading to Waterloo', time: '2h ago' },
  { id: 5, type: 'circle', circle: 'Gaming Den', message: 'New meetup: Board game night this Wed', time: '5h ago' },
];

// Category filters
export const categories = [
  { id: 'all', label: 'All', icon: '✦' },
  { id: 'fitness', label: 'Trail & Trek', icon: '🏃' },
  { id: 'social', label: 'Cafe Regulars', icon: '☕' },
  { id: 'gaming', label: 'Gaming', icon: '🎮' },
  { id: 'reading', label: 'Book Club', icon: '📚' },
  { id: 'support', label: 'Support', icon: '💬' },
  { id: 'dating', label: 'Meet People', icon: '❤️' },
];

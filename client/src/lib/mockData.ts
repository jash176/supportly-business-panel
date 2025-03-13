// User and Chat Data
export interface User {
  id: string;
  name: string;
  avatar: string;
  email: string;
  location: string;
  country: string;
  status: 'online' | 'offline' | 'idle';
  lastActive: string;
  timezone: string;
  role?: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: string;
  read: boolean;
}

export interface Chat {
  id: string;
  userId: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}

export interface SharedFile {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadDate: string;
  icon: string;
  bgColor: string;
}

// Contact Data
export interface Contact extends User {
  segment: 'Customer' | 'Partner' | 'Prospect';
  score: number;
}

// Visitor Data
export interface Visitor extends User {
  city: string;
  countryCode: string;
  activityStatus: string;
  coordinates: [number, number]; // [latitude, longitude]
}

// Visitor Stats
export interface VisitorStat {
  label: string;
  value: string;
  change: number;
}

export const users: User[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    email: 'sarah.chen@example.com',
    location: 'San Francisco, USA',
    country: 'USA',
    status: 'online',
    lastActive: 'Online',
    timezone: 'Pacific Time (GMT-7)'
  },
  {
    id: '2',
    name: 'Michael Roberts',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    email: 'michael.roberts@example.com',
    location: 'New York, USA',
    country: 'USA',
    status: 'offline',
    lastActive: 'Yesterday',
    timezone: 'Eastern Time (GMT-5)'
  },
  {
    id: '3',
    name: 'Jessica Miller',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    email: 'jessica.miller@example.com',
    location: 'London, UK',
    country: 'UK',
    status: 'offline',
    lastActive: 'Mon',
    timezone: 'Greenwich Mean Time (GMT+0)'
  },
  {
    id: '4',
    name: 'David Kim',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    email: 'david.kim@example.com',
    location: 'Tokyo, Japan',
    country: 'Japan',
    status: 'online',
    lastActive: 'Online',
    timezone: 'Japan Standard Time (GMT+9)'
  }
];

export const currentUser: User = {
  id: '0',
  name: 'Alex Johnson',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  email: 'alex.johnson@example.com',
  location: 'Chicago, USA',
  country: 'USA',
  status: 'online',
  lastActive: 'Online',
  timezone: 'Central Time (GMT-6)',
  role: 'Customer Support Manager'
};

export const chats: Chat[] = [
  {
    id: '1',
    userId: '1',
    lastMessage: "I'll send you the updated designs this afternoon",
    lastMessageTime: '10:42 AM',
    unreadCount: 0
  },
  {
    id: '2',
    userId: '2',
    lastMessage: 'Looking forward to our meeting tomorrow',
    lastMessageTime: 'Yesterday',
    unreadCount: 0
  },
  {
    id: '3',
    userId: '3',
    lastMessage: 'Can you review the latest version?',
    lastMessageTime: 'Mon',
    unreadCount: 0
  },
  {
    id: '4',
    userId: '4',
    lastMessage: 'Thanks for your help with the project!',
    lastMessageTime: 'Sun',
    unreadCount: 0
  }
];

export const messages: ChatMessage[] = [
  {
    id: '1',
    senderId: '1',
    receiverId: '0',
    text: 'Hi there! I just reviewed the designs and they look great. Just a few minor adjustments needed.',
    timestamp: '10:32 AM',
    read: true
  },
  {
    id: '2',
    senderId: '0',
    receiverId: '1',
    text: "Thanks for the feedback! I'll send you the updated designs this afternoon.",
    timestamp: '10:42 AM',
    read: true
  },
  {
    id: '3',
    senderId: '1',
    receiverId: '0',
    text: 'Perfect, I appreciate that. Do you think we can finalize everything by Friday?',
    timestamp: '10:45 AM',
    read: true
  },
  {
    id: '4',
    senderId: '0',
    receiverId: '1',
    text: "Absolutely, I already have most of the changes mapped out. Friday shouldn't be a problem at all.",
    timestamp: '10:47 AM',
    read: true
  }
];

export const sharedFiles: SharedFile[] = [
  {
    id: '1',
    name: 'Design_Mockup_v2.png',
    type: 'image',
    size: '2.3 MB',
    uploadDate: 'Yesterday',
    icon: 'file-image',
    bgColor: 'bg-blue-100'
  },
  {
    id: '2',
    name: 'Project_Specs.pdf',
    type: 'pdf',
    size: '4.1 MB',
    uploadDate: 'Aug 24',
    icon: 'file-pdf',
    bgColor: 'bg-red-100'
  }
];

export const contacts: Contact[] = [
  {
    ...users[0],
    segment: 'Customer',
    score: 4.5
  },
  {
    ...users[1],
    segment: 'Partner',
    score: 4.0
  },
  {
    ...users[2],
    segment: 'Prospect',
    score: 3.0
  },
  {
    ...users[3],
    segment: 'Customer',
    score: 5.0
  }
];

export const visitors: Visitor[] = [
  {
    ...users[0],
    city: 'San Francisco',
    countryCode: 'us',
    activityStatus: 'Active now',
    coordinates: [37.7749, -122.4194]
  },
  {
    ...users[1],
    city: 'New York',
    countryCode: 'us',
    activityStatus: 'Active now',
    coordinates: [40.7128, -74.0060]
  },
  {
    ...users[2],
    city: 'London',
    countryCode: 'gb',
    activityStatus: 'Idle for 5 min',
    coordinates: [51.5074, -0.1278]
  },
  {
    ...users[3],
    city: 'Tokyo',
    countryCode: 'jp',
    activityStatus: 'Active now',
    coordinates: [35.6762, 139.6503]
  }
];

export const visitorStats: VisitorStat[] = [
  {
    label: 'Total Visitors',
    value: '1,234',
    change: 12.5
  },
  {
    label: 'Active Now',
    value: '42',
    change: 5.2
  },
  {
    label: 'Avg. Session',
    value: '3m 24s',
    change: -2.1
  },
  {
    label: 'Bounce Rate',
    value: '24.8%',
    change: -8.3
  }
];

export const locationBreakdown = [
  { country: 'USA', percentage: 45 },
  { country: 'UK', percentage: 17 },
  { country: 'Japan', percentage: 12 },
  { country: 'Other', percentage: 26 }
];

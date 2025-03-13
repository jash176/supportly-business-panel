// Types
export interface Person {
  id: string;
  name: string;
  avatar: string;
  email: string;
  role: string;
  isOnline: boolean;
  lastActive: string; // ISO date string
  localTime: string;
  location: {
    city: string;
    country: string;
    countryCode: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  notes?: string;
}

export interface Message {
  id: string;
  text: string;
  timestamp: string; // ISO date string
  isSender: boolean; // true if the current user sent this message
}

export interface Chat {
  id: string;
  person: Person;
  messages: Message[];
  lastMessage: {
    text: string;
    timestamp: string; // ISO date string
  };
}

export interface Contact extends Person {
  segments: string[];
  score: number; // 1-5 rating
}

export interface Visitor extends Person {
  location: Person['location'] & {
    region: string;
  };
}

// Mock Data
export const people: Person[] = [
  {
    id: '1',
    name: 'Emma Wilson',
    avatar: 'https://github.com/shadcn.png',
    email: 'emma.wilson@example.com',
    role: 'Product Designer',
    isOnline: true,
    lastActive: new Date(Date.now() - 2 * 60 * 1000).toISOString(), // 2 minutes ago
    localTime: '10:23 AM (GMT-7)',
    location: {
      city: 'San Francisco',
      country: 'USA',
      countryCode: 'US',
      coordinates: {
        lat: 37.7749,
        lng: -122.4194
      }
    },
    notes: 'Working on the new design system for the product dashboard.'
  },
  {
    id: '2',
    name: 'James Rodriguez',
    avatar: 'https://github.com/shadcn.png',
    email: 'james.r@example.com',
    role: 'Marketing Manager',
    isOnline: false,
    lastActive: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    localTime: '6:23 PM (GMT+1)',
    location: {
      city: 'London',
      country: 'UK',
      countryCode: 'GB',
      coordinates: {
        lat: 51.5074,
        lng: -0.1278
      }
    }
  },
  {
    id: '3',
    name: 'Sarah Johnson',
    avatar: 'https://github.com/shadcn.png',
    email: 'sarah.j@example.com',
    role: 'Sales Representative',
    isOnline: true,
    lastActive: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    localTime: '3:23 PM (GMT-4)',
    location: {
      city: 'Toronto',
      country: 'Canada',
      countryCode: 'CA',
      coordinates: {
        lat: 43.6532,
        lng: -79.3832
      }
    }
  },
  {
    id: '4',
    name: 'Michael Brown',
    avatar: 'https://github.com/shadcn.png',
    email: 'michael.b@example.com',
    role: 'Software Engineer',
    isOnline: false,
    lastActive: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    localTime: '1:23 AM (GMT+10)',
    location: {
      city: 'Sydney',
      country: 'Australia',
      countryCode: 'AU',
      coordinates: {
        lat: -33.8688,
        lng: 151.2093
      }
    }
  },
  {
    id: '5',
    name: 'Jennifer Lee',
    avatar: 'https://github.com/shadcn.png',
    email: 'jennifer.l@example.com',
    role: 'Product Manager',
    isOnline: true,
    lastActive: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
    localTime: '11:23 PM (GMT+8)',
    location: {
      city: 'Singapore',
      country: 'Singapore',
      countryCode: 'SG',
      coordinates: {
        lat: 1.3521,
        lng: 103.8198
      }
    }
  }
];

// Generate messages for each chat
const generateMessages = (personId: string): Message[] => {
  const baseTime = new Date();
  baseTime.setHours(10, 0, 0, 0); // Set to 10:00 AM today
  
  const messages: Message[] = [];
  
  // First message - from the person
  messages.push({
    id: `${personId}-1`,
    text: 'Hi there! I was checking on the status of the design project. Have you had a chance to review the latest updates?',
    timestamp: new Date(baseTime.getTime() + 12 * 60 * 1000).toISOString(), // 10:12 AM
    isSender: false
  });
  
  // Second message - from the current user
  messages.push({
    id: `${personId}-2`,
    text: 'Hey! Yes, I\'ve been looking at them this morning. They look great overall.',
    timestamp: new Date(baseTime.getTime() + 15 * 60 * 1000).toISOString(), // 10:15 AM
    isSender: true
  });
  
  // Third message - from the person
  messages.push({
    id: `${personId}-3`,
    text: 'That\'s great to hear! Do you have any specific feedback on the color scheme? I was thinking we might need to adjust it slightly.',
    timestamp: new Date(baseTime.getTime() + 18 * 60 * 1000).toISOString(), // 10:18 AM
    isSender: false
  });
  
  // Fourth message - from the current user
  messages.push({
    id: `${personId}-4`,
    text: 'I think the colors work well together. The contrast is good and it fits the brand identity. Maybe we could make the accent color a bit more vibrant?',
    timestamp: new Date(baseTime.getTime() + 20 * 60 * 1000).toISOString(), // 10:20 AM
    isSender: true
  });
  
  // Fifth message - from the person (last message)
  if (personId === '1') {
    messages.push({
      id: `${personId}-5`,
      text: 'That\'s a good point! I\'ll work on some variations with a more vibrant accent and share them with you later today. Thanks for the feedback!',
      timestamp: new Date(baseTime.getTime() + 23 * 60 * 1000).toISOString(), // 10:23 AM
      isSender: false
    });
  } else if (personId === '2') {
    messages.push({
      id: `${personId}-5`,
      text: 'I\'ll send the report by EOD, thanks!',
      timestamp: new Date(baseTime.getTime() - 24 * 60 * 60 * 1000).toISOString(), // Yesterday
      isSender: false
    });
  } else if (personId === '3') {
    messages.push({
      id: `${personId}-5`,
      text: 'Hey, are we still meeting today?',
      timestamp: new Date(baseTime.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
      isSender: false
    });
  } else if (personId === '4') {
    messages.push({
      id: `${personId}-5`,
      text: 'Thanks for your help with the project!',
      timestamp: new Date(baseTime.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
      isSender: false
    });
  } else if (personId === '5') {
    messages.push({
      id: `${personId}-5`,
      text: 'Let\'s discuss the new marketing strategy.',
      timestamp: new Date(baseTime.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
      isSender: false
    });
  }
  
  return messages;
};

// Create chats from people
export const chats: Chat[] = people.map(person => {
  const messages = generateMessages(person.id);
  const lastMessage = messages[messages.length - 1];
  
  return {
    id: person.id,
    person,
    messages,
    lastMessage: {
      text: lastMessage.text,
      timestamp: lastMessage.timestamp
    }
  };
});

// Create contacts from people
export const contacts: Contact[] = people.map((person, index) => {
  // Assign segments based on the person's role
  let segments: string[] = [];
  
  if (person.role.includes('Design')) {
    segments.push('Design');
  }
  if (person.role.includes('Product')) {
    segments.push('Product');
  }
  if (person.role.includes('Market')) {
    segments.push('Marketing');
  }
  if (person.role.includes('Sales')) {
    segments.push('Sales');
  }
  if (person.role.includes('Engineer')) {
    segments.push('Engineering');
  }
  if (segments.length === 0) {
    segments.push('Support');
  }
  
  // Assign scores
  const scores = [4.5, 3, 5, 3.5, 4];
  
  return {
    ...person,
    segments,
    score: scores[index]
  };
});

// Create visitors from people, adding region information
export const visitors: Visitor[] = people.map(person => {
  let region = 'North America';
  
  if (person.location.country === 'UK') {
    region = 'Europe';
  } else if (person.location.country === 'Australia') {
    region = 'Oceania';
  } else if (person.location.country === 'Singapore') {
    region = 'Asia';
  } else if (person.location.country === 'Canada') {
    region = 'North America';
  } else if (person.location.country === 'USA') {
    region = 'North America';
  }
  
  return {
    ...person,
    location: {
      ...person.location,
      region
    }
  };
});

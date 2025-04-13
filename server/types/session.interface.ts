interface SessionAttributes {
  id: number;
  businessId: number;
  customerEmail: string | null;
  name: string;
  sid: string; // Used for anonymous users
  assignedAgentId: number | null;
  isResolved: boolean; // Whether the chat is resolved or not
  createdAt: Date;
  notes: string | null; // Notes about the session
  segments: string[]; // Array of customer segments or tags

  // Geolocation information
  geolocationCountry: string | null;
  geolocationRegion: string | null;
  geolocationCity: string | null;
  geolocationLatitude: number | null;
  geolocationLongitude: number | null;
  geolocationCountryCode: string | null; // Optional country code

  // System and browser information
  osVersion: string | null;
  osName: string | null;
  engineName: string | null;
  engineVersion: string | null;
  browserName: string | null;
  browserVersion: string | null;
  userAgent: string | null;

  lastActive: Date | null;
  ratings: number | null;
}

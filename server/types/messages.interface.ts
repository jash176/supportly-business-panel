interface SessionMetadata {
  sessionId: string;
  geolocation?: {
    country?: string;
    region?: string;
    city?: string;
    latitude?: number;
    longitude?: number;
    countryCode?: string;
  };
  system?: {
    osVersion?: string;
    osName?: string;
    engineName?: string;
    engineVersion?: string;
    browserName?: string;
    browserVersion?: string;
    userAgent?: string;
  };
  notes: string;
  segments: string;
}

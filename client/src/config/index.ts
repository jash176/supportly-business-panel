export const config = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || "https://supportly.site/api",
  socketBaseUrl: import.meta.env.VITE_API_BASE_URL || "https://supportly.site",
} as const;

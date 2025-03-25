const isDev = process.env.NODE_ENV === "development";

// Set custom root path based on environment
export const ROOT_DIR = isDev
  ? new URL(".", import.meta.url).pathname // or a hardcoded path like '/Users/you/project-root'
  : "."; // or whatever makes sense in production (e.g. 'dist' or '/app')

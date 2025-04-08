import path from "path";

const isDev = process.env.NODE_ENV === "development";

// Set custom root path based on environment
// export const ROOT_DIR = path.resolve(__dirname); // or whatever makes sense in production (e.g. 'dist' or '/app')
export const ROOT_DIR = isDev
  ? new URL(".", import.meta.url).pathname // or a hardcoded path like '/Users/you/project-root'
  : path.resolve(process.cwd()); // or whatever makes sense in production (e.g. 'dist' or '/app')

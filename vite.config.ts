import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// Use an async function to handle dynamic import
export default defineConfig(async () => {
  const themePlugin = (await import("@replit/vite-plugin-shadcn-theme-json"))
    .default;
  const runtimeErrorOverlay = (
    await import("@replit/vite-plugin-runtime-error-modal")
  ).default;
  const plugins = [react(), runtimeErrorOverlay(), themePlugin()];

  if (
    process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
  ) {
    const cartographerModule = await import("@replit/vite-plugin-cartographer");
    plugins.push(cartographerModule.cartographer());
  }

  return {
    plugins,
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "client", "src"),
        "@shared": path.resolve(__dirname, "shared"),
      },
    },
    root: path.resolve(__dirname, "client"),
    build: {
      outDir: path.resolve(__dirname, "dist/public"),
      emptyOutDir: true,
    },
    optimizeDeps: {
      exclude: ["dotenv"],
    },
  };
});

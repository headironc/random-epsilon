import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: [
      {
        find: "@",
        replacement: "/src",
      },
    ],
  },
  server: {
    proxy: {
      "/hai/HttpEntry/": {
        target: "http://192.168.61.68:7876",
        changeOrigin: true,
      },
    },
  },
});

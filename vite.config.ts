import path from "node:path";
import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@/validators": "/src/utils/validators/index.ts",
      "@/components": "/src/components/index.ts",
      "@/helpers": "/src/utils/helpers/index.ts",
      "@/constants": "/src/utils/constants/index.ts",
      "@/context": "/src/utils/context/index.ts",
      "@/hooks": "/src/utils/hooks/index.ts",
      "@/services": "/src/utils/services/index.ts",
      "@/pages": "/src/pages/index.ts",
      "@/assets": path.resolve(__dirname, "./src/assets"),
      "@/config": path.resolve(__dirname, "./src/utils/config"),
      "@/HOC": path.resolve(__dirname, "./src/utils/HOC"),
    },
  },
});

import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ mode } ) => {
  // Load environment variables based on the current mode (development, production, etc.)
  // The third parameter '' ensures all env variables are loaded, not just those prefixed with VITE_
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:5000',
          changeOrigin: true,
        },
      },
    },
    // Expose environment variables to your client-side code
    // This is crucial for production builds to pick up VITE_API_URL
    define: {
      // Ensure VITE_API_URL is available in the client-side code
      // It will be replaced with the actual value during build
      'process.env.VITE_API_URL': JSON.stringify(env.VITE_API_URL ),
    },
  }
})

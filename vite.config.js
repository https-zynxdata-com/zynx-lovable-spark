import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig(async ({ mode }) => {
  const plugins = [react()]
  
  if (mode === 'development') {
    try {
      const { componentTagger } = await import('lovable-tagger')
      plugins.push(componentTagger())
    } catch (error) {
      console.warn('lovable-tagger not available in development mode')
    }
  }

  return {
    plugins,
  server: {
    host: "::",
    port: 8080,
    open: true
  },
  build: {
    target: 'esnext',
    minify: 'terser',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'lucide-icons': ['lucide-react']
        }
      }
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'lucide-react']
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}))
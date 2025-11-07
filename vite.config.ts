import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  
  const remoteUrl = env.VITE_REMOTE_APP_URL || 'http://localhost:5001'
  const remoteEntry = `${remoteUrl}/assets/remoteEntry.js`
  
  console.log('🔍 VITE_REMOTE_APP_URL:', remoteUrl)
  console.log('🌐 Remote URL completa:', remoteEntry)

  return {
    plugins: [
      react(),
      federation({
        name: 'host',
        exposes: {
          './store': './src/store/globalStore.ts'
        },
        remotes: {
          remote: remoteEntry
        },
        shared: ['react', 'react-dom', 'zustand']
      })
    ],
    build: {
      modulePreload: false,
      target: 'esnext',
      minify: false,
      cssCodeSplit: false
    }
  }
})

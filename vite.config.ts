import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  console.log(process.env.VITE_REMOTE_APP_URL, 'process.env.VITE_REMOTE_APP_URL via PROCESS )))))))))))))))')
  console.log(env.VITE_REMOTE_APP_URL, 'env.VITE_REMOTE_APP_URL via env mode ------------------')
  const remoteUrl = 'https://remote-module-federation.vercel.app'
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

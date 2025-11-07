import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [
      react(),
      federation({
        name: 'host',
        remotes: {
          remote: `${env.REMOTE_APP_URL || 'https://remote-module-federation.vercel.app'}/assets/remoteEntry.js`
        },
        shared: ['react', 'react-dom']
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

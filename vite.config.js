import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '') // 모든 환경 변수 로드

  return {
    server: {
      proxy: {
        '/api': {
          target: env.VITE_API_URL, // ✅ 정상 동작
          changeOrigin: true,
          secure: false
        },
        '/oauth2': {
          target: env.VITE_API_URL,
          changeOrigin: true,
          secure: false
        },
        '/ws': { // WebSocket 프록시 추가
          target: env.VITE_WS_URL,
          changeOrigin: true,
          ws: true, // WebSocket 프록시 활성화
          secure: false
        },
      },
      port: 3000,
    },
    plugins: [react()],
  }
})
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'), // 入口文件
        about: resolve(__dirname, 'pages/index.html'), // 账号设置页面
        // 修改内容脚本构建配置，确保它作为独立的入口点
        content: resolve(__dirname, 'src/content/index.js')
      },
      output: {
        entryFileNames: (chunkInfo) => {
          // 为内容脚本使用不同的命名规则
          if (chunkInfo.name === 'content') {
            return 'content/index.js'
          }
          return '[name]/index.js'
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    }
  },
  // 添加base配置确保资源路径正确
  base: './'
})
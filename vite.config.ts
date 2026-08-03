import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import ElementPlus from 'unplugin-element-plus/vite';
import { codeInspectorPlugin } from 'code-inspector-plugin';
import path from 'path';
import legacy from '@vitejs/plugin-legacy';
import svgPluginEnhance from 'vite-plugin-svg-icons-enhance';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const isProd = mode === 'production';
  const isLegacy = env.VITE_LEGACY === 'true'; // 处理打包兼容低版本浏览器

  return {
    plugins: [
      vue(),
      tailwindcss(),
      isProd &&
        isLegacy &&
        legacy({
          targets: ['defaults', 'not IE 11', 'chrome >= 50', 'firefox >= 50'],
          modernPolyfills: true,
        }),
      svgPluginEnhance({
        dir: path.resolve(__dirname, 'src/assets/icons'),
      }),
      !isProd && codeInspectorPlugin({ bundler: 'vite' }),
      ElementPlus({
        useSource: true,
      }),
      AutoImport({
        resolvers: [ElementPlusResolver({ importStyle: 'sass' })],
      }),
      Components({
        resolvers: [ElementPlusResolver({ importStyle: 'sass' })],
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      host: true,
      port: Number(env.VITE_PORT) || 3000,
      open: env.VITE_OPEN === 'true',
      proxy: {
        '/api': {
          target: env.VITE_PROXY_TARGET || 'http://localhost:8080',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    optimizeDeps: {
      include: ['element-plus/es/locale/lang/zh-cn', 'element-plus/es/locale/lang/en'],
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
        } as any,
      },
    },
  };
});

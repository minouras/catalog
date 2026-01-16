import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import { visualizer } from 'rollup-plugin-visualizer';
// 相対パスで出したい場合、↓をインストールして使用
// import relativeLinks from 'astro-relative-links';

// https://astro.build/config
export default defineConfig({
  // *** テストサーバー用 ************
  site: 'https://minouras.github.io/catalog',
  base: '/catalog-page/',
  // ***********************
  integrations: [
    mdx(),
    sitemap(),
    // relativeLinks(),  ※相対パスにしたい時
  ],
  vite: {
    define: {
      'import.meta.vitest': 'undefined',
    },
    // @ts-ignore
    plugins: [visualizer(), tailwindcss()],
    build: {
      rollupOptions: {
        output: {
          assetFileNames: (assetInfo) => {
            let extType = assetInfo.name?.split('.').pop();
            if (/ttf|otf|eot|woff|woff2/i.test(extType || '')) {
              extType = 'assets/fonts';
            } else if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType || '')) {
              extType = 'astroAssets';
            } else if (extType === 'css') {
              // swiper等のjs経由でcssが複数バンドルされてしまう時
              // @ts-ignore
              // if (assetInfo.name.includes('index.css')) {
              //   return `assets/css/style.css`;
              // }
              return `assets/css/[name].css`;
            } else {
              return `${extType}/[name][extname]`;
            }
            return `${extType}/[name][extname]`;
          },
          entryFileNames: 'assets/js/common.js',
        },
      },
    },
  },
  build: {
    assets: 'astroAssets',
    inlineStylesheets: `never`,
  },
});

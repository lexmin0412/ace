import { defineConfig } from 'dumi';

export default defineConfig({
  base: '/antd-components-enhanced',
  publicPath: '/antd-components-enhanced/',
  outputPath: 'docs-dist',
  themeConfig: {
    nav: [
      { title: 'Guide', link: '/guide' },
      { title: 'Components', link: '/components/color-picker' },
    ],
    name: 'AntD CE',
    footer: `<div>Copyright © 2023 | Powered by <a href="https://d.umijs.org/guide" target="_blank">dumi</a> | Authored by <a href="https://github.com/lexmin0412" target="_blank">Lexmin0412</a>.</div>`,
    socialLinks: {
      github: 'https://github.com/lexmin0412/antd-components-enhanced',
    },
  },
  locales: [{ id: 'en-US', name: 'English' }],
});

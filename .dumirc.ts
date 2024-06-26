import { defineConfig } from 'dumi';

export default defineConfig({
  base: '/ace',
  publicPath: '/ace/',
  outputPath: 'docs-dist',
  themeConfig: {
    nav: [
      { title: 'Guide', link: '/guide' },
      { title: 'Components', link: '/components/color-picker' },
    ],
    name: 'ACE',
    footer: `<div>Copyright © 2023 | Powered by <a href="https://d.umijs.org/guide" target="_blank">dumi</a> | Authored by <a href="https://github.com/lexmin0412" target="_blank">Lexmin0412</a>.</div>`,
    socialLinks: {
      github: 'https://github.com/lexmin0412/ace',
    },
  },
  locales: [{ id: 'en-US', name: 'English' }],
});

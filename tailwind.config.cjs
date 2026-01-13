// /* eslint-env node */
// const fs = require('node:fs');
// const path = require('node:path');
// const postcss = require('postcss');
// const plugin = require('tailwindcss/plugin');

// /**
//  * Loads CSS files through Tailwind’s plugin system to enable IntelliSense support.
//  *
//  * This plugin scans CSS files located in the `src/styles` directory and appends them to their
//  * respective layers based on the file naming convention:
//  *
//  * - Files named `src/styles/base.{name}.css` are added to the base layer.
//  * - Files named `src/styles/components.{name}.css` are added to the components layer.
//  * - Files named `src/styles/utilities.{name}.css` are added to the utilities layer.
//  */
// const cssFiles = plugin(({ addBase, addComponents, addUtilities }) => {
//   const dirname = path.join(__dirname, 'src/styles');
//   const files = fs.readdirSync(dirname);

//   for (const file of files) {
//     const matched = /^(base|components|utilities)\..+\.css$/.exec(file);

//     if (matched) {
//       const layer = matched[1];
//       const addStyles = {
//         base: addBase,
//         components: addComponents,
//         utilities: addUtilities,
//       }[layer];
//       const content = fs.readFileSync(path.join(dirname, file), 'utf8');
//       const styles = postcss.parse(content);

//       addStyles(styles.nodes);
//     }
//   }
// });

// /**
//  * Create a responsive grid layout without media queries using CSS Grid.
//  *
//  * This plugin is based on a method provided by Andy Bell on piccalil.li.
//  * See: https://piccalil.li/tutorial/create-a-responsive-grid-layout-with-no-media-queries-using-css-grid/
//  */
// const autoGrid = plugin(
//   ({ addComponents, matchComponents, theme }) => {
//     const values = theme('autoGrid');

//     matchComponents(
//       {
//         'auto-grid': (value) => ({
//           display: 'grid',
//           'grid-template-columns': `repeat(auto-fill, minmax(min(${value}, 100%), 1fr))`,
//         }),
//       },
//       { values },
//     );

//     addComponents({
//       '.auto-grid-none': {
//         display: 'revert',
//         'grid-template-columns': 'revert',
//       },
//     });
//   },
//   {
//     theme: {
//       autoGrid: ({ theme }) => ({
//         ...theme('spacing'),
//       }),
//     },
//   },
// );

// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
//   future: {
//     hoverOnlyWhenSupported: true,
//   },
//   theme: {
//     fontSize: {
//       xs: '1.2rem',
//       sm: '1.4rem',
//       base: '1.6rem',
//       lg: '1.8rem',
//       xl: '2rem',
//       '2xl': '2.4rem',
//       '3xl': '3rem',
//       '4xl': '3.6rem',
//       '5xl': '4.8rem',
//       '6xl': '6rem',
//     },
//     extend: {
//       screens: {
//         min_sm: '414px',
//         min_md: '768px',
//         min_xl: '1200px',
//         min_xxl: '1440px',
//         min_xxxl: '1920px',
//         max_sm: { max: '413px' },
//         max_md: { max: '767px' },
//       },
//       colors: {
//         dark: '#333333',
//         gray: '#808080',
//       },
//     },
//   },
//   plugins: [cssFiles, autoGrid],
// };

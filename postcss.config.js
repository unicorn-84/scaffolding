const prod = process.env.npm_lifecycle_event === 'start';

module.exports = () => ({
  plugins: {
    'postcss-import': {},
    tailwindcss: {},
    'postcss-nested': {},
    'postcss-preset-env': { stage: 1 },
    '@fullhuman/postcss-purgecss': prod ? {
      content: ['./src/**/*.pug'],
      defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
    } : false,
    cssnano: prod ? {
      preset: ['default', {
        discardComments: {
          removeAll: true,
        },
      }],
    } : false,
  },
});

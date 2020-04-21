const presets = [
  [
    'next/babel', // use the nextjs presets
    {
      'preset-env': {
        useBuiltIns: 'usage', // include any required polyfills in the component where they are used
        corejs: '2.6.9', // Add corejs version that babel is using otherwise it will be using the default verion, and to avoid showing the build warning
      },
    },
  ],
];
const plugins = [];

module.exports = { presets, plugins };

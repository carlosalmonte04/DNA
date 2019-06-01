const presets = [
  '@babel/preset-flow',
  'module:metro-react-native-babel-preset',
];

const plugins = [
  '@babel/plugin-transform-flow-strip-types',
  '@babel/plugin-proposal-class-properties',
  '@babel/plugin-transform-exponentiation-operator',
  [
    'module-resolver',
    {
      root: ['./src/'],
    },
  ],
];

module.exports = { presets, plugins };

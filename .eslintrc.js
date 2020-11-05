module.exports = {
  extends: [
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
    'prettier',
    'prettier/react',
  ],
  rules: {
    'import/no-unresolved': 'off',
    'prettier/prettier': 'error',
    'import/prefer-default-export': 'off', // useless
    'typescript-eslint/ban-ts-comment': 'off',
    'no-use-before-define': 'off', // doesn't work with similar ts rule
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        mjs: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': [
      'error',
      { enableDangerousAutofixThisMayCauseInfiniteLoops: true },
    ],
  },
  parser: '@typescript-eslint/parser',
  plugins: ['prettier', 'react-hooks', '@typescript-eslint'],
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
      },
    },
  },
};

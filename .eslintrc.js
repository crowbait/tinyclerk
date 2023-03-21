module.exports = {
  extends: 'erb',
  rules: {
    // A temporary hack related to IDE not resolving correct package.json
    'import/no-extraneous-dependencies': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': 'off',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'import/no-import-module-exports': 'off',
    'prettier/prettier': 'off',
    'no-console': 'off',
    'object-shorthand': 'off',
    'no-nested-ternary': 'off',
    'radix': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'react/no-array-index-key': 'off',
    'react/destructuring-assignment': 'off',
    'react/function-component-definition': 'off',
    'react/require-default-props': 'off',
    'promise/always-return': 'off',
    'promise/catch-or-return': 'off',
    'no-param-reassign': 'off',
    'no-plusplus': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'prefer-destructuring': 'off',
    'react/no-unescaped-entities': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'consistent-return': 'off'
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    createDefaultProgram: true,
  },
  settings: {
    'import/resolver': {
      // See https://github.com/benmosher/eslint-plugin-import/issues/1396#issuecomment-575727774 for line below
      node: {},
      webpack: {
        config: require.resolve('./.erb/configs/webpack.config.eslint.ts'),
      },
      typescript: {},
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
  },
};

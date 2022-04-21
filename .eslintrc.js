module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'no-debugger': 'warn',
    'no-duplicate-case': 'warn',
    'no-invalid-regexp': 'error',
    'no-irregular-whitespace': 'warn',
    'use-isnan': 'warn',
    'valid-typeof': 'error',
    'no-undefined': 'warn',
    'require-yield': 'warn',
    'no-mixed-spaces-and-tabs': 'warn',

    'no-console': 'warn',
    'no-alert': 'off',
    'no-shadow': 'warn',
    'max-len': [
      'warn',
      {
        code: 120,
        tabWidth: 2,
        ignoreComments: true,
        ignoreTrailingComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true
      }
    ],
    'max-depth': ['error', 4],
    'max-lines': ['error', { max: 1000 }],

    'prettier/prettier': [
      'warn',
      {
        endOfLine: 'auto'
      }
    ],
    'import/prefer-default-export': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-explicit-any': 'off',

    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'react/prop-types': 'warn',

    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'off',

    'import/no-unresolved': 'off',
    'import/named': 'off'
  },
  overrides: [
    {
      files: '*.{css, scss}'
    }
  ],
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    },
    react: {
      version: 'detect',
      linkComponents: [
        // Layout used as alternatives to <a> for linking, eg. <Link to={ url } />
        'Hyperlink',
        { name: 'Link', linkAttribute: 'to' }
      ]
    }
  }
};

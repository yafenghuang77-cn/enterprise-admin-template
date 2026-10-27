import { react as aliReact } from 'eslint-config-ali';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const globals = require('globals');
const tsParser = require('@typescript-eslint/parser');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const react = require('eslint-plugin-react');
const hooks = require('eslint-plugin-react-hooks');
const a11y = require('eslint-plugin-jsx-a11y');
const importSort = require('eslint-plugin-simple-import-sort');
const jest = require('eslint-plugin-jest');
const prettier = require('eslint-config-prettier');

const projectPlugins = { '@typescript-eslint': tsPlugin, react, 'react-hooks': hooks };

export default [
  {
    ignores: [
      'dist/**',
      'framework/**',
      'public/pdfjs/**',
      'src/.umi*/**',
      'node_modules/**',
      'coverage/**',
      'playwright-report/**',
      'test-results/**',
      '.pnpm-store/**',
      '.turbopack/**',
      '**/*.min.js',
    ],
  },
  ...aliReact.map((config) => ({
    ...config,
    ...(config.plugins && {
      plugins: Object.fromEntries(
        Object.entries(config.plugins).map(([name, plugin]) => [
          name,
          projectPlugins[name] || plugin,
        ]),
      ),
    }),
  })),
  {
    files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: { ...globals.browser, ...globals.node },
    },
    plugins: {
      react,
      'react-hooks': hooks,
      'jsx-a11y': a11y,
      'simple-import-sort': importSort,
    },
    settings: { react: { version: 'detect' } },
    rules: {
      ...hooks.configs.recommended.rules,
      ...a11y.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/self-closing-comp': 'error',
      'react/jsx-key': 'error',
      'react/jsx-no-target-blank': 'error',
      'react/no-direct-mutation-state': 'error',
      'react-hooks/exhaustive-deps': 'error',
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      curly: ['error', 'all'],
      'no-var': 'error',
      'prefer-const': 'error',
      'no-debugger': 'error',
      'no-control-regex': 'error',
      'no-new-native-nonconstructor': 'error',
      'no-unsafe-negation': 'error',
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'prefer-rest-params': 'error',
      'prefer-spread': 'error',
      'no-inner-declarations': ['error', 'functions', { blockScopedFunctions: 'disallow' }],
      'array-callback-return': 'error',
      'guard-for-in': 'error',
      'no-eval': 'error',
      'no-global-assign': 'error',
      'no-param-reassign': 'error',
      'no-promise-executor-return': 'error',
      'no-self-compare': 'error',
      'no-loop-func': 'error',
      'react/button-has-type': 'error',
      'no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' },
      ],
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^\\u0000'],
            ['^react(?:$|/)', '^react-dom(?:$|/)'],
            ['^@?\\w'],
            ['^@/'],
            ['^\\.'],
            ['^.+\\u0000$'],
          ],
        },
      ],
      'simple-import-sort/exports': 'error',
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    plugins: { '@typescript-eslint': tsPlugin },
    rules: {
      'no-undef': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
      '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
      '@typescript-eslint/ban-ts-comment': 'error',
      '@typescript-eslint/no-confusing-non-null-assertion': 'error',
      '@typescript-eslint/no-extra-non-null-assertion': 'error',
      '@typescript-eslint/no-misused-new': 'error',
      'no-dupe-class-members': 'off',
      '@typescript-eslint/no-dupe-class-members': 'error',
      'no-redeclare': 'off',
      '@typescript-eslint/no-redeclare': 'error',
      'no-use-before-define': 'off',
      '@typescript-eslint/no-use-before-define': 'error',
      'no-useless-constructor': 'off',
      '@typescript-eslint/no-useless-constructor': 'error',
      'no-invalid-this': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
    },
  },
  {
    files: ['tests/setup.ts', 'tests/unit/**/*.{ts,tsx}'],
    plugins: { jest },
    languageOptions: { globals: jest.environments.globals.globals },
    settings: { jest: { version: 30 } },
    rules: { ...jest.configs['flat/recommended'].rules },
  },
  prettier,
  { rules: { curly: ['error', 'all'] } },
];

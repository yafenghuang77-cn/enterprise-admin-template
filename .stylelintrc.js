module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-ali'],
  ignoreFiles: [
    '**/node_modules/**',
    '**/.umi*/**',
    'dist/**',
    'framework/**',
    'public/pdfjs/**',
    'playwright-report/**',
    'test-results/**',
    'coverage/**',
    '.pnpm-store/**',
    '.turbopack/**',
  ],
  overrides: [
    {
      files: ['**/*.less'],
      extends: ['stylelint-config-standard-less', 'stylelint-config-ali'],
      customSyntax: 'postcss-less',
      rules: { 'media-feature-range-notation': 'prefix' },
    },
  ],
  rules: {
    'selector-class-pattern': null,
    'block-no-empty': [true, { severity: 'error' }],
    'font-family-no-missing-generic-family-keyword': [true, { severity: 'error' }],
    'no-descending-specificity': null,
    'no-duplicate-selectors': true,
    'declaration-block-no-duplicate-properties': [
      true,
      { ignore: ['consecutive-duplicates-with-different-syntaxes'] },
    ],
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'theme',
          'utility',
          'variant',
          'custom-variant',
          'source',
          'apply',
          'reference',
          'config',
          'plugin',
        ],
      },
    ],
  },
};

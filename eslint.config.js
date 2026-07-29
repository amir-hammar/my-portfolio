// Flat config (ESLint 9+). Replaces the `eslintConfig` block that used to sit
// in package.json and be run for us by react-scripts during every build.
// Vite does not lint, so linting is now an explicit step: `npm run lint`.
import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['build/**', 'coverage/**', 'node_modules/**'],
  },
  {
    files: ['src/**/*.{ts,tsx,js,jsx}'],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs['recommended-latest'].rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],

      // These two are stricter than what react-scripts used to enforce, so
      // existing code trips them. Warnings for now rather than a red build --
      // see the "known warnings" note in the README.
      '@typescript-eslint/no-explicit-any': 'warn',
      'react-hooks/static-components': 'warn',
    },
  },
  {
    // Config files run in Node, not the browser.
    files: ['vite.config.ts', 'eslint.config.js'],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    languageOptions: {
      globals: globals.node,
    },
  },
);

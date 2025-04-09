import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import { FlatCompat } from '@eslint/eslintrc';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const clientCompatConfig = new FlatCompat({
  baseDirectory: path.resolve(__dirname, 'apps/client'),
});

export default defineConfig([
  {
    ignores: [
      'coverage',
      '**/public',
      '**/dist',
      'pnpm-lock.yaml',
      'pnpm-workspace.yaml',
      '**/node_modules',
      '.next',
      '.husky',
    ],
  },

  tseslint.configs.recommended,

  eslintPluginPrettierRecommended,

  {
    files: ['apps/client/**/*.{js,jsx,ts,tsx}'],
    ...clientCompatConfig.extends('next/core-web-vitals', 'next/typescript'),
  },
]);

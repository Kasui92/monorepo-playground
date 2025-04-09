import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import { FlatCompat } from '@eslint/eslintrc';
import path from 'path';
import { fileURLToPath } from 'url';

// Necessario per __dirname in moduli ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Crea un'istanza FlatCompat per la cartella client
const clientCompatConfig = new FlatCompat({
  baseDirectory: path.resolve(__dirname, 'apps/client'),
});

export default defineConfig([
  // Configurazione globale
  {
    ignores: [
      'coverage',
      '**/public',
      '**/dist',
      'pnpm-lock.yaml',
      'pnpm-workspace.yaml',
      'node_modules',
    ],
  },

  // Configurazione base TypeScript
  tseslint.configs.recommended,

  // Configurazione Prettier per tutti i file
  eslintPluginPrettierRecommended,

  // Configurazione specifica per Next.js
  {
    files: ['apps/client/**/*.{js,jsx,ts,tsx}'],
    ...clientCompatConfig.extends('next/core-web-vitals', 'next/typescript'),
  },
]);

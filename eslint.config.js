import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";


export default [
  {files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"]},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,

  {
    rules: {
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports' }
      ],
      quotes: ['error', 'single'],
      'max-lines': ['error', 90],
      'react/jsx-props-no-spreading': 'off',
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      '@typescript-eslint/comma-dangle': 'off',
      'array-bracket-newline': [
        'error',
        {
          multiline: true,
          minItems: 5
        }
      ],
      'react/function-component-definition': 'off',
      'max-len': ['error', { code: 90 }]
    }
  },

  // Ignored files/folders
  {
    ignores: [
      'dist/', // Ignore build folder
      'node_modules/', // Ignore dependencies folder
      '*.min.js', // Ignore minified files
      '.config.js',
      'libs'
    ],
  }
];
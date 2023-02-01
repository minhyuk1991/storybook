module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-typescript/base',
    'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:eslint-comments/recommended',
    'plugin:import/recommended',
    'plugin:promise/recommended',
    'prettier',
  ],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.eslint.json'],
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'svelte3', 'prettier', 'import'],
  rules: {
    'semi':2,
    '@typescript-eslint/semi': ['error'],
    'prettier/prettier': 'error',
    'no-plusplus': 0,
    'import/extensions': ['error', { ts: 'never' }],
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    '@typescript-eslint/no-var-requires': 'warn',
    '@typescript-eslint/no-unused-vars': ['error'],
    'prettier/prettier': [
      'error',
      {
          endOfLine: 'auto',
      },
  ],
  },
  ignorePatterns: ['build/*', 'node_modules/*'],
	overrides: [
		{
			files: ['**/*.svelte'],
			processor: 'svelte3/svelte3',
		},
	],
  settings: {
    'svelte3/typescript': () => require('typescript'), 
		'svelte3/ignore-styles': () => true,
		'import/extensions': ['.js', '.ts'],
		'import/resolver': {
			node: {
				extensions: ['.js', '.ts'],
			},
			typescript: {},
		},
	},
};

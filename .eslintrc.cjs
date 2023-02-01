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
		semi: ['error', 'always'],
		'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
		'tsdoc/syntax': 'warn',
		'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
		'import/prefer-default-export': 2,
		'import/no-mutable-exports': 0,
		'no-labels': 0,
		'no-restricted-syntax': 0,
		'@typescript-eslint/no-var-requires': 'warn',
		'@typescript-eslint/no-unused-vars': [
			2,
			{
				args: 'none',
			},
		],
		'no-unused-vars': 'warn',
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

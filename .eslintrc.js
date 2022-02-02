module.exports = {
	parser: '@babel/eslint-parser',
	parserOptions: {
		requireConfigFile: false,
		babelOptions: {
			presets: ['@babel/preset-react'],
		},
	},
	env: {
		browser: true,
	},
	extends: [
		'53js/react',
		'plugin:jest/recommended',
	],
	rules: {
		'react/jsx-one-expression-per-line': 0, // Buggy
		'import/prefer-default-export': 0,
		'react/react-in-jsx-scope': 'off',
		'no-multiple-empty-lines': 'warn',
		'react/jsx-indent': 'warn',
		'max-len': 'warn',
		'arrow-parens': 'warn',
		indent: 'warn',
		'object-curly-newline': 'warn',
		semi: 'warn',
	},
	settings: {
		'import/resolver': 'webpack',
	},
};

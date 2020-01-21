module.exports = {
	extends: [
		'53js/react',
	],
	env: {
		browser: true,
	},
	rules: {
		// ici on peut overrider des rules
		'react/jsx-one-expression-per-line': 'off',
	}
};

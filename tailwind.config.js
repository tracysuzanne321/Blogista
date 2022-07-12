/** @type {import('tailwindcss').Config} */

module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
	],

	theme: {
		extend: {
			colors: {
				blogistaBlue: '#7A9E9F',
				blogistaRed: '#FE5F55',
				blogistaBeige: '#EEF5DB',
				blogistaDeepBlue: '#4F6367',
				blogistaPowderblue: '#B8D8D8',
			},
		},
	},

	plugins: [],
};

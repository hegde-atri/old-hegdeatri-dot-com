const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		colors: {
			transparent: 'transparent',
			current: 'currentColor',
			'background': {
				50: '#f5f6fa',
				100: '#eaebf4',
				200: '#d0d5e7',
				300: '#a7b1d2',
				400: '#7887b8',
				500: '#5768a0',
				600: '#445285',
				700: '#38436c',
				800: '#31395b',
				light: '#171A26',
				lighter: '#252A40',
				DEFAULT: '#0f111a',
			},
			'foreground': {
				50: '#edf5ff',
				100: '#dfebff',
				200: '#c5daff',
				DEFAULT: '#b1cbff',
				400: '#7d9dfc',
				500: '#5e79f6',
				600: '#4153ea',
				700: '#3340cf',
				800: '#2c38a7',
				900: '#2b3684',
			},
			'yellow': '#67EAEA',
			black: colors.black,
			white: colors.white,
			gray: colors.gray,
			emerald: colors.emerald,
			blue: colors.blue,
			indigo: colors.indigo,
			yellow: colors.yellow,
			
			
		}
	},
	plugins: [],
}

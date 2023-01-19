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
				900: '#0f111a',
				light: '#171A26',
				lighter: '#252A40',
				// 900
				DEFAULT: '#0f111a',
			},
			'foreground': {
				50: '#edf5ff',
				100: '#dfebff',
				200: '#c5daff',
				300: '#b1cbff',
				400: '#7d9dfc',
				500: '#5e79f6',
				600: '#4153ea',
				700: '#3340cf',
				800: '#2c38a7',
				900: '#2b3684',
				// 300
				DEFAULT: '#b1cbff',
			},
			'tb': {
				50: '#eefdfc',
				00: '#d3faf9',
				200: '#adf4f3',
				300: '#67eaea',
				400: '#34d9dc',
				500: '#19bdc1',
				600: '#1798a3',
				700: '#1a7984',
				800: '#1e626c',
				900: '#1d525c',
			},			
			'yellow': '#67EAEA',
			black: colors.black,
			white: colors.white,
			gray: colors.gray,
			emerald: colors.emerald,
			blue: colors.blue,
			indigo: colors.indigo,
			yellow: colors.yellow,
			pink: colors.pink,
			
			
		},
		extend: {
			typography: ({ theme }) => ({
				DEFAULT: {
					// TODO
				  css: {
					'--tw-prose-body': theme('colors.foreground[900]'),
					'--tw-prose-headings': theme('colors.background[800]'),
					'--tw-prose-lead': theme('colors.blue[700]'),
					'--tw-prose-links': theme('colors.blue[900]'),
					'--tw-prose-bold': theme('colors.blue[900]'),
					'--tw-prose-counters': theme('colors.blue[600]'),
					'--tw-prose-bullets': theme('colors.blue[400]'),
					'--tw-prose-hr': theme('colors.blue[800]'),
					'--tw-prose-quotes': theme('colors.indigo[900]'),
					'--tw-prose-quote-borders': theme('colors.indigo[500]'),
					'--tw-prose-captions': theme('colors.indigo[700]'),
					'--tw-prose-code': theme('colors.background[900]'),
					'--tw-prose-pre-code': theme('colors.background[100]'),
					'--tw-prose-pre-bg': theme('colors.background[900]'),
					'--tw-prose-th-borders': theme('colors.background[300]'),
					'--tw-prose-td-borders': theme('colors.background[200]'),
					// ----------------------------------------------------
					'--tw-prose-invert-body': theme('colors.foreground[100]'),
					'--tw-prose-invert-headings': theme('colors.foreground[500]'),
					'--tw-prose-invert-lead': theme('colors.tb[200]'),
					'--tw-prose-invert-links': theme('colors.white'),
					'--tw-prose-invert-bold': theme('colors.white'),
					'--tw-prose-invert-counters': theme('colors.tb[400]'),
					'--tw-prose-invert-bullets': theme('colors.tb[600]'),
					'--tw-prose-invert-hr': theme('colors.pink[700]'),
					'--tw-prose-invert-quotes': theme('colors.foreground[50]'),
					'--tw-prose-invert-quote-borders': theme('colors.tb[600]'),
					'--tw-prose-invert-captions': theme('colors.tb[100]'),
					'--tw-prose-invert-code': theme('colors.white'),
					'--tw-prose-invert-pre-code': theme('colors.tb[100]'),
					'--tw-prose-invert-pre-bg': 'rgb(0 0 0 / 50%)',
					'--tw-prose-invert-th-borders': theme('colors.tb[300]'),
					'--tw-prose-invert-td-borders': theme('colors.tb[400]'),
				  },
				},
			  }),
		}
	},
	plugins: [require(`@tailwindcss/typography`)],
}

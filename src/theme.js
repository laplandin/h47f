import { createMuiTheme, TypographyStyle, createPalette } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#04BF7B',
		},
		secondary: {
			main: '#004284',
		},
		error: {
			main: red.A400,
		},
		text: {
			primary: 'rgba(0, 15, 30, 0.8)',
			secondary: '#cecece',
		},
		background: {
			default: '#fff',
		},
		containerBackground: 'rgba(0, 66, 132, 0.05)',
		inactive: 'rgba(0, 15, 30, 0.6)',
	},
	typography: {
		fontFamily: [
			'Raleway',
			'Helvetica'
		].join(',')
	}
});

export default theme;

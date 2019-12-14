import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import AppLayout from '../../src/AppLayout';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import AddIcon from '@material-ui/icons/Add';
import { useRouter } from 'next/router';

const useStyles = makeStyles(theme => ({
	card: {
		minWidth: 275,
	},
	bullet: {
		display: 'inline-block',
		margin: '0 2px',
		transform: 'scale(0.8)',
	},
	title: {
		fontSize: 14,
	},
	pos: {
		marginBottom: 12,
	},
	textInput: {
		width: '100%',
		fontFamily: 'Raleway',
	},
	inputWrapper: {
		marginBottom: '30px',
	},
	flex: {
		display: 'flex',
	},
	fileUploader: {
		backgroundColor: theme.palette.primary.main,
		width: '70%',
		height: '100px',
		display: 'flex',
		justifyItems: 'center',
		justifyContent: 'center',
		alignItems: 'center',
		cursor: 'pointer',
	},
	addIcon: {
		color: 'white',
		fontSize: '50px',
	},
	actions: {
		marginTop: '20px',
		display: 'flex',
		justifyContent: 'flex-end'
	}
}));

export default function CreateCourse() {
	const router = useRouter();
	const classes = useStyles();
	const [value, setValue] = React.useState('eco1');
	
	const handleChange = event => {
		setValue(event.target.value);
	};
	
	const back = () => {
		router.back();
	};
	
	return (
		<AppLayout>
			<Card className={classes.card}>
				<CardContent>
					<Typography className={classes.title} color="textSecondary" gutterBottom>
						Добавление курса
					</Typography>
					<form className={classes.root} noValidate autoComplete="off">
						<div className={classes.inputWrapper}>
							<TextField className={classes.textInput} id="standard-basic" label="Наименование курса" />
						</div>
						<div className={classes.inputWrapper}>
							<TextField className={classes.textInput} id="filled-basic" label="Описание курса" />
						</div>
					</form>
					<div className={classes.flex}>
						<div style={{width: '40%'}}>
							<Typography className={classes.title} color="textSecondary" gutterBottom>
								Категория курса
							</Typography>
							<FormControl component="fieldset" className={classes.formControl}>
								<RadioGroup aria-label="gender" name="gender2" value={value} onChange={handleChange}>
									<FormControlLabel
										value="eco1"
										control={<Radio color="primary" />}
										label="Категория 1"
									/>
									<FormControlLabel
										value="eco2"
										control={<Radio color="primary" />}
										label="Категория 2"
									/>
									<FormControlLabel
										value="eco3"
										control={<Radio color="primary" />}
										label="Категория 3"
									/>
								</RadioGroup>
							</FormControl>
						</div>
						<div style={{ width: '40%' }}>
							<Typography className={classes.title} color="textSecondary" gutterBottom>
								Обложка курса
							</Typography>
							<div className={classes.fileUploader}>
								<AddIcon className={classes.addIcon}/>
							</div>
						</div>
					</div>
					<div className={classes.actions}>
						<Button color="secondary">Отмена</Button>
						<Button onClick={back} color="secondary">Назад</Button>
						<Button color="primary" >Сохранить</Button>
					</div>
				</CardContent>
			</Card>
		</AppLayout>
	)
}

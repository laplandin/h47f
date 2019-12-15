import {makeStyles} from "@material-ui/core";
import {useRouter} from "next/router";
import Fab from "@material-ui/core/Fab";
import AddIcon from '@material-ui/icons/Add';
import React from "react";

const useFabStyles = makeStyles(theme =>({
	fab: {
		background: theme.palette.primary.main,
		position: 'absolute',
		right: '50px',
		bottom: '50px',
		color: 'white'
	},
}));

export default function AddFab () {
	console.log('fire');
	const router = useRouter();
	const classes = useFabStyles();
	const onClick = () => {
		router.push('/course/create');
	};

	return (
		<Fab onClick={onClick} className={classes.fab} color="primary" aria-label="add">
			<AddIcon />
		</Fab>
	)
}
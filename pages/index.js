import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import AppLayout from "../src/AppLayout";
import AllIcon from '../assets/ic-all-tabs.svg';
import TreeIcon from '../assets/ic-tree-tabs.svg';
import CloudyIcon from '../assets/ic-weather-tabs.svg';
import BatIcon from '../assets/ic-animals-tabs.svg';
import {CircularProgress} from "@material-ui/core";
import Box from '@material-ui/core/Box';
import CardList from '../components/CardList';
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/core/SvgIcon/SvgIcon";

const fabStyled = makeStyles(theme => ({
	fab: {
		position: 'absolute',
		right: 0,
		bottom: 0,
	},
}));

function AddFab () {
	return (
		<Fab className={fabStyled.fab} color="primary" aria-label="add">
			<AddIcon />
		</Fab>
	)
}

export default function Index(props) {
	return (
		<AppLayout>
			<CustomizedTabs/>
			<AddFab />
		</AppLayout>
	)
}

const AntTabs = withStyles(theme =>({
	root: {
		borderBottom: '1px solid #e8e8e8',
		color: theme.palette.inactive,
	},
	indicator: {
		backgroundColor: theme.palette.primary.main,
	},
}))(Tabs);

const AntTab = withStyles(theme => ({
	root: {
		paddingLeft: '24px',
		textTransform: 'none',
		minWidth: 72,
		fontWeight: theme.typography.fontWeightRegular,
		marginRight: theme.spacing(4),
		'& svg': {
			position: 'absolute',
			left: 0,
			fill: theme.palette.inactive,
		},
		'&$selected svg': {
			fill: theme.palette.primary.main
		},
		'&:active svg': {
			fill: theme.palette.primary.main
		},
		'&:hover': {
			color: theme.palette.primary.inactive,
			opacity: 1,
		},
		'&$selected': {
			color: theme.palette.primary.main,
			fontWeight: theme.typography.fontWeightMedium,
		},
		'&:focus': {
			color: theme.palette.primary.main
		},
	},
	selected: {},
}))(props => <Tab disableRipple {...props} />);

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
	},
	padding: {
		padding: theme.spacing(3),
	},
	demo1: {
		backgroundColor: 'transparent',
	},
}));

const GET_COURSE_LIST = gql`
    {
        courses {
            id
            title
            description
            coverImage
            level
            duration
            tag
            enrolledUsers
        }
    }
`;

function TabPanel(props) {
	const { children, value, index, ...other } = props;
	
	return (
		<Typography
			component="div"
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && <Box p={3}>{children}</Box>}
		</Typography>
	);
}

function CustomizedTabs() {
	const { loading, error, data } = useQuery(GET_COURSE_LIST);
	const [value, setValue] = React.useState(0);
	const classes = useStyles();
	
	if (error) {
		console.log('fetch error', error);
		return <div />;
	}
	if (!loading) {
		console.log('>>', data);
	}
	
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	
	if (loading) return <CircularProgress />
	
	return (
		<div className={classes.root}>
			<div className={classes.demo1}>
				<AntTabs value={value} onChange={handleChange} aria-label="ant example">
					<AntTab icon={<AllIcon/>} label="Все" />
					<AntTab icon={<TreeIcon/>} label="Категория 1" />
					<AntTab icon={<CloudyIcon/>} label="Категория 2" />
					<AntTab icon={<BatIcon/>} label="Категория 3" />
				</AntTabs>
				<TabPanel value={value} index={0}>
					<CardList items={data} />
				</TabPanel>
				<TabPanel value={value} index={1}>
					Item Two
				</TabPanel>
				<TabPanel value={value} index={2}>
					Item Three
				</TabPanel>
				<TabPanel value={value} index={3}>
					Item Four
				</TabPanel>
				<Typography className={classes.padding} />
			</div>
		</div>
	);
}


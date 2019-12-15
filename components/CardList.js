import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import Link from 'next/link';
import { TAG_MAP } from "../consts";

const useStyles = makeStyles(theme => ({
	card: {
		marginLeft: '10px',
		marginRight: '10px',
		maxWidth: 345,
		minWidth: 345,
	},
	media: {
		height: 0,
		paddingTop: '56.25%', // 16:9
	},
	share: {
		marginLeft: 'auto',
	},
	avatar: {
		backgroundColor: theme.palette.primary.main,
	},
}));

function CardItem(props) {
	const { id, tag, title, description, enrolledUsers, coverImage} = props;
	const CatIcon = (TAG_MAP[tag] && TAG_MAP[tag].icon) || TAG_MAP['eco1'].icon;
	const classes = useStyles();
	const [expanded, setExpanded] = React.useState(false);
	
	const handleExpandClick = () => {
		setExpanded(!expanded);
	};
	
	return (
		<Card className={classes.card}>
			<CardHeader
				avatar={
					<Avatar aria-label="recipe" className={classes.avatar} >
						<CatIcon style={{ fill: 'white' }} />
					</Avatar>
				}
				action={
					<IconButton aria-label="settings">
						<MoreVertIcon />
					</IconButton>
				}
				title={title}
				subheader="September 14, 2016"
			/>
			<CardMedia
				className={classes.media}
				image={coverImage}
				title={title}
			/>
			<CardContent>
				<Typography variant="body2" color="textPrimary" component="p">
					{`${description.slice(0, 100)} ${description.length>100 ? '...' : ''}`}
				</Typography>
			</CardContent>
			<CardActions disableSpacing>
				<div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
					<Link href={`/course/[id]`} as={`/course/${id}`}>
						<Button color="primary">Подробнее</Button>
					</Link>
				</div>
			</CardActions>
		</Card>
	);
}

export default function CardList (props) {
	const { items: { courses } } = props;
	return (
		<div style={{ display: 'flex'}}>
			{ courses.map(item => <CardItem {...item} key={item.id} />) }
		</div>
	)
}

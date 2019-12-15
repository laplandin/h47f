import AppLayout from "../../../src/AppLayout";
import React from "react";
import { useRouter } from 'next/router';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import Link from 'next/link';
import Typography from '@material-ui/core/Typography';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { TAG_MAP } from '../../../consts';
import Avatar from "@material-ui/core/Avatar";
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';

const useLoaderStyles = makeStyles({
	root: {
		display: 'flex',
		justifyContent: 'center',
		'& > * + *': {
			marginLeft: 'auto'
		},
	},
});

const useStyles = makeStyles((theme) => {
	return {
		banner: {
			height: '382px',
			backgroundImage: (props) => `url("${props.coverImage}")`,
			backgroundSize: 'cover',
		},
		title: {
			color: 'rgba(0, 15, 30, 0.8)',
		},
		avatar: {
			background: theme.palette.primary.main,
			marginRight: '20px',
			'& svg': {
				fill: 'white'
			}
		},
		flex: {
			padding: '16px',
			display: 'flex',
			alignItems: 'center',
			height: '103px',
			background: 'rgba(255,255,255,.6)',
		},
		cardContent: {
			paddingLeft: '10%',
			paddingRight: '10%',
		},
		link: {
			color: theme.palette.primary.main,
			paddingTop: '20px',
			paddingBottom: '20px',
		},
		actions: {
			display: 'flex',
			justifyContent: 'flex-end',
		}
	}
});

const GET_COURSE = gql`
    query course($id: ID!){
        course(id: $id) {
            id
            title
            coverImage
						description
            duration
            level
            tag
						chapters {
								id
								title
                done
                duration
						}
        }
    }
`;

const Course = (props) => {
	const router = useRouter();
	const classes = useLoaderStyles();
	const { courseId } = router.query;
	const { loading, error, data } = useQuery(GET_COURSE, {
		variables: { id: courseId}
	});

	if (loading) {
		return (
			<div className={classes.root}>
				<CircularProgress />
			</div>
		)
	} else {
		return <CourseCard course={data.course} />
	}
};

function CourseCard (props) {
	const router = useRouter();
	const { courseId } = router.query;
	const { course } = props;
	const classes = useStyles({coverImage: course.coverImage });
	const { chapters } = course;
	const { tag } = course;
	const TagIcon = (TAG_MAP[tag] && TAG_MAP[tag].icon) || TAG_MAP['eco1'].icon;
	const toIndex = () => {
		router.push('/');
	}
	return (
		<Card>
			<div className={classes.banner} >
				<div className={classes.flex}>
					<Avatar aria-label="recipe" className={classes.avatar} >
						<TagIcon color="white" />
					</Avatar>
					<div>
						<h1 className={classes.title}>{course.title}</h1>
					</div>
				</div>
			</div>
			<CardContent className={classes.cardContent}>
				<Typography>Описание</Typography>
				<p>{course.description}</p>
				<Typography>Содержание</Typography>
				{
					chapters.map((chapter, index) => (
						<div style={{ marginTop: '15px' }}>
							<Link key={chapter.id} href={`/course/${courseId}/${chapter.id}`}>
								<a className={classes.link}>{`${index+1}.${chapter.title}`}</a>
							</Link>
						</div>
					))
				}
				<div className={classes.actions}>
					<Button onClick={toIndex} color="secondary">ОТМЕНА</Button>
					<Button color="secondary">УДАЛИТЬ</Button>
					<Button color="primary">РЕДАКТИРОВАТЬ</Button>
				</div>
			</CardContent>
		</Card>
	)
}

function CoursePage(props) {
	return (
		<AppLayout>
			<Course/>
		</AppLayout>
	)
}

export default CoursePage;

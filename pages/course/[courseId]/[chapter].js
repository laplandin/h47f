import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import AppLayout from '../../../src/AppLayout';
import dynamic from 'next/dynamic'
import {useRouter} from "next/router";
import CircularProgress from "@material-ui/core/CircularProgress";
import React from "react";

const EditorJs = dynamic(
	() => import('../../../components/Editor.js'),
	{ ssr: false }
);

const useLoaderStyles = makeStyles({
	root: {
		display: 'flex',
		justifyContent: 'center',
		'& > * + *': {
			marginLeft: 'auto'
		},
	},
});

const GET_COURSE = gql`
    query course($id: ID!){
        course(id: $id) {
            id
            chapters {
                id
                title
                done
                duration
								content
            }
        }
    }
`;

export default function Chapter(props) {
	const router = useRouter();
	const classes = useLoaderStyles();
	const { courseId } = router.query;
	const { loading, error, data } = useQuery(GET_COURSE, {
		variables: { id: courseId}
	});
	
	if (loading) {
		return (
			<AppLayout>
				<div className={classes.root}>
					<CircularProgress />
				</div>
			</AppLayout>
		)
	} else {
		const { course } = data;
		const { chapter: chapterId } = router.query;
		const chapter = course.chapters.find(c => c.id === chapterId);
		return (
			<AppLayout>
				<ChapterEditor chapter={chapter} />
			</AppLayout>
		)
	}
};

function ChapterEditor(props) {
	const { chapter } = props;
	console.log(JSON.parse(chapter.content))
	return (
			<EditorJs data={JSON.parse(chapter.content)} />
	)
}

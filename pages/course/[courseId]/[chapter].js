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

const GET_CHAPTER = gql`
    query chapter($courseId: ID!, $chapterId: ID!){
        chapter(courseId: $courseId, chapterId: $chapterId) {
            id
			title
			done
			duration
			content
        }
    }
`;

export default function Chapter(props) {
	const router = useRouter();
	const classes = useLoaderStyles();
	const { courseId, chapter: chapterId } = router.query;
	const { loading, error, data } = useQuery(GET_CHAPTER, {
		variables: { courseId, chapterId }
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
		const { chapter } = data;
		return (
			<AppLayout>
				<ChapterEditor content={chapter.content} />
			</AppLayout>
		)
	}
};

function ChapterEditor(props) {
	const { content } = props;
	console.log(JSON.parse(content));
	return (
		<EditorJs data={JSON.parse(content)} />
	)
}

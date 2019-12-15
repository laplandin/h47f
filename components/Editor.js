import React, { useState } from 'react';
import gql from 'graphql-tag';
import {useRouter} from "next/router";
import { useMutation } from '@apollo/react-hooks';
import Button from '@material-ui/core/Button';

import EditorJs from 'react-editor-js';

import Embed from '@editorjs/embed'
import Table from '@editorjs/table'
import Paragraph from '@editorjs/paragraph'
import List from '@editorjs/list'
import LinkTool from '@editorjs/link'
import Image from '@editorjs/image'
import Raw from '@editorjs/raw'
import Header from '@editorjs/header'
import Quote from '@editorjs/quote'
import Marker from '@editorjs/marker'
import CheckList from '@editorjs/checklist'
import Delimiter from '@editorjs/delimiter'
import SimpleImage from '@editorjs/simple-image'

export const EDITOR_JS_TOOLS = {
	embed: Embed,
	table: Table,
	paragraph: Paragraph,
	list: List,
	linkTool: LinkTool,
	image: Image,
	raw: Raw,
	header: Header,
	quote: Quote,
	marker: Marker,
	checklist: CheckList,
	delimiter: Delimiter,
	simpleImage: SimpleImage
};

const UPDATE_CHAPTER_CONTENT = gql`
    mutation updateChapterContent($chapterId: String!, $content: String!){
        updateChapterContent(chapterId: $chapterId, content: $content) {
            content
        }
    }
`;

export default function Editor(props) {
	const router = useRouter();
	const [editorRef, setEditorRef] = useState(null);
	const { courseId, chapter: chapterId } = router.query;
	const [updateChapterContent, { data }] = useMutation(UPDATE_CHAPTER_CONTENT);

	const handleSave = async () => {
		const content = await editorRef.save();
		const res = await updateChapterContent({ variables: { chapterId, content: JSON.stringify(content) }});
	};
	return (
		<>
			<EditorJs instanceRef={instance => setEditorRef(instance)} data={props.data} tools={EDITOR_JS_TOOLS} />
			<div style={{ display: 'flex', justifyContent: 'center' }}>
				<Button onClick={handleSave} variant="contained" color="secondary">
					Сохранить
				</Button>
			</div>
		</>
	)
};


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

export default function Editor(props) {
	return <EditorJs data={props.data} tools={EDITOR_JS_TOOLS} />;
};


import dynamic from 'next/dynamic'

const EditorJs = dynamic(
	() => import('../../../components/Editor.js'),
	{ ssr: false }
);

export default function Chapter(props) {
	return (
			<EditorJs />
	)
	};


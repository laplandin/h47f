import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';

const data = {
	"time" : 1576333420254,
	"blocks" : [
		{
			type: "header",
			data: {
				text: "Editor.js",
				level: 2
			}
		},
		{
			type: "paragraph",
			data: {
				text:
					"Hey. Meet the new Editor. On this page you can see it in action — try to edit this text."
			}
		},
	]
};

const mountEdit = function EditorJs(props) {
	new EditorJS({
		holder: 'mount',
		tools: {
			linkTool: {
				config: {
					endpoint: 'http://localhost:8008/fetchUrl', // Your backend endpoint for url data fetching
				}
			},
			list: {
				inlineToolbar: true,
				config: {
					endpoint: 'https://cdn.jsdelivr.net/npm/@editorjs/list@1.0.2'
				}
			},
			image: {
				config: {
					endpoints: {
						byFile: 'http://localhost:8008/uploadFile', // Your backend file uploader endpoint
						byUrl: 'http://localhost:8008/fetchUrl', // Your endpoint that provides uploading by Url
					}
				}
			}
		}
	});
};

export default function Chapter(props) {
	const router = useRouter();
	useEffect(() => {
		mountEdit({
			holderId: 'mount'
		})
	}, []);
	const { chapter } = router.query;
	if (typeof window !== 'undefined' && window.document) {
		return (
			<div>
				<h1>{chapter}</h1>
				<div id="mount" />
			</div>
	)
	}
	return null
	};


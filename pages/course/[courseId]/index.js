import AppLayout from "../../../src/AppLayout";
import React from "react";
import { useRouter } from 'next/router';

const Course = (props) => {
	const router = useRouter();
	const { courseId } = router.query;
	return <h1>{courseId}</h1>
};

function CoursePage(props) {
	return (
		<AppLayout>
			<Course/>
		</AppLayout>
	)
}

export default CoursePage;

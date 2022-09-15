/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useContext } from 'react';
import { CourseContext } from '~/actions/context/CourseContext';
import ManageCourse from '~/component/ManageCourse';
import UpdateCourse from './UpdateCourse';
import classNames from 'classnames/bind';
import styles from './Manage.module.scss'
import { Fragment } from 'react';
import Button from 'react-bootstrap/Button';
import AddIcon from '@material-ui/icons/Add';
import DeleteCourseModal from './DeleteCourse';

const cx = classNames.bind(styles)

function Manage() {

	const {
		courseState: { course, courses, coursesLoading },
		// showToast: { show, message, type },
		// setShowToast
	} = useContext(CourseContext)

	let body = null

	if (courses.length === 0) {
		body = (
			<h1>No courses posted.</h1>
		)
	} else {
		body = (
			<div className={cx('list_courses')}>
				{courses.map((course) => {
					return <ManageCourse key={course._id} data={course} />
				})}
			</div>
		)
	}

	return (
		<div className={cx('course_body')}>

			<p className={cx('header_courses')}>LIST YOUR COURSES</p>

			{body}

			{course !== null && <UpdateCourse />}

			{course !== null && <DeleteCourseModal />}
		</div>
	);
}

export default Manage;
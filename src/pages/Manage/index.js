/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useContext } from 'react';
import { CourseContext } from '~/actions/context/CourseContext';
import { AuthContext } from '~/actions/context/AuthContext';
import { LessonContext } from '~/actions/context/LessonContext';
import ManageCourse from '~/component/ManageCourse';
import UpdateCourse from './UpdateCourse';
import classNames from 'classnames/bind';
import styles from './Manage.module.scss'
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import DeleteCourseModal from './DeleteCourse';

const cx = classNames.bind(styles)

function Manage() {

	const {
		authState: { user: { _id, role } },
	} = useContext(AuthContext)

	const {
		courseState: { course, courses, coursesLoading },
		// showToast: { show, message, type },
		// setShowToast
	} = useContext(CourseContext)

	const {
		setShowAddLessonModal,
	} = useContext(LessonContext)

	let body = null

	if(role !== 'creator') {
		body = (
			<h1>Access denied</h1>
		)
	}else{
		if (courses.length === 0) {
			body = (
				<Fragment>
					<p className={cx('header_courses')}>LIST YOUR COURSES</p>
					<h1>No courses posted.</h1>
				</Fragment>
			)
		} else {
			body = (
				<Fragment>
					<p className={cx('header_courses')}>LIST YOUR COURSES</p>
					<div className={cx('option')}>

						<Button
							className={cx('add-lesson')}
							onClick={setShowAddLessonModal.bind(this, true)}
						>
							Add Lesson
						</Button>

					</div>
					<div className={cx('list_courses')}>
						{courses.map((course) => {
							if(course.user === _id){
								return <ManageCourse key={course._id} data={course} />
							}
						})}
					</div>
				</Fragment>
			)
		}
	}


	return (
		<Fragment>
				<div className={cx('course_body')}>
	
					{body}

					{role === 'creator' && 
						<Fragment>
							{course !== null && <UpdateCourse />}
			
							{course !== null && <DeleteCourseModal />}
						</Fragment>
					}

				</div>
		</Fragment>
	);
}

export default Manage;
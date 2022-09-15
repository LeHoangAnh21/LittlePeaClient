/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useContext } from 'react';
import { CourseContext } from '~/actions/context/CourseContext';
import { LessonContext } from '~/actions/context/LessonContext';
import CourseItem from '~/component/CourseItem';
import AddCourseModal from './AddCourse';
import classNames from 'classnames/bind';
import styles from './Courses.module.scss'
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import AddIcon from '@material-ui/icons/Add';

const cx = classNames.bind(styles)

function Courses() {

	const {
		setShowAddLessonModal,
	} = useContext(LessonContext)

	const {
		courseState: { course, courses, coursesLoading },
		setShowAddCourseModal,
		getCourses,
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
					return <CourseItem key={course._id} data={course} />
				})}
			</div>
		)
	}

	return (
		<div className={cx('course_body')}>

			<div>
				<p className={cx('header_courses')}>LIST COURSES</p>

				<div className={cx('option')}>

					<Button
						className={cx('add-lesson')}
						onClick={setShowAddLessonModal.bind(this, true)}
					>
						Add Lesson
					</Button>

					<Link to={`/manage`} className={cx('button_learn')}>
						<Button variant="success">
							Manage Course
						</Button>
					</Link>

				</div>
			</div>


			{body}

			<Fragment>
				<Button
					className={cx('btn-floating')}
					onClick={setShowAddCourseModal.bind(this, true)}
				>
					<AddIcon />
				</Button>
			</Fragment>

			<AddCourseModal />
		</div>
	);
}

export default Courses;
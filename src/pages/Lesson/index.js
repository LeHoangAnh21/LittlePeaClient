import { LessonContext } from '~/actions/context/LessonContext';
import { CourseContext } from '~/actions/context/CourseContext';
import { Fragment, useContext, } from 'react';
import LessonItem from '~/component/LessonItem';
import classNames from 'classnames/bind';
import styles from './Lesson.module.scss'
import { useParams } from 'react-router-dom';

const cx = classNames.bind(styles)

function Lesson() {
	const { id } = useParams();

	const courseId = id;

	const {
		courseState: { course, courses, coursesLoading },
	} = useContext(CourseContext)

	let intro = null

	if(courses !== null){
		intro = (
			<div className={cx('intro')}>
				{courses.map((course) => {
					if(courseId === course._id){
						return (
							<Fragment>
								<div className={cx('title_course')}>
									<span>{course.name}</span>
								</div>
								<div className={cx('description_course')}>
									<span>{course.description || 'None'}</span>
								</div>
							</Fragment>
						)
					}
				})}
			</div>
		)
	}

	const {
		lessonState: { lesson, lessons, lessonsLoading },
		// showToast: { show, message, type },
		// setShowToast
	} = useContext(LessonContext)

	let body = null

	if (lessons.length === 0) {
		body = (
			<h1>No lessons posted.</h1>
		)
	} else {
		body = (
			<div className={cx('list_lessons')}>
				{lessons.map((lesson) => {
					if (lesson.course === courseId) {
						return <LessonItem key={lesson._id} data={lesson} />
					}
				})}
			</div>
		)
	}

	return (
		<div>

			{intro}

			<div className={cx('body')}>
				{body}
				<div className={cx('empty')}></div>
			</div>
		</div>
	);
}

export default Lesson;
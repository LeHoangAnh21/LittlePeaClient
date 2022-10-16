import { LessonContext } from '~/actions/context/LessonContext';
import { CourseContext } from '~/actions/context/CourseContext';
import { TestContext } from '~/actions/context/TestContext';
import { Fragment, useContext, useEffect, useState } from 'react';
import LessonItem from '~/component/LessonItem';
import classNames from 'classnames/bind';
import styles from './Lesson.module.scss'
import { useParams } from 'react-router-dom';
import TestItem from '~/component/TestItem';
import Button from 'react-bootstrap/Button';

const cx = classNames.bind(styles)

function Lesson() {
	const { id } = useParams();

	const courseId = id;

	const {
		courseState: { courses },
	} = useContext(CourseContext)

	const [showTest, setShowTest] = useState(false)

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
								<div className={cx('option')}>

									<Button
										className={cx('add-lesson')}
										onClick={() => setShowTest(true)}
									>
										Completed
									</Button>

								</div>
							</Fragment>
						)
					}
				})}
			</div>
		)
	}

	const {
		lessonState: { lessons },
		getLessons,
		// showToast: { show, message, type },
		// setShowToast
	} = useContext(LessonContext)

	useEffect(() => {
		getLessons()
	}, [])

	let body = null
	let lessonList = []

	lessons.map((lesson) => {
		if (lesson.course === courseId) {
			lessonList.push(lesson)
		}
	})

	const {
		testState: { tests },
		getTest,
	} = useContext(TestContext)

	useEffect(() => {
		getTest()
	}, [])

	let testBody = null;
	let testList = [];

	tests.map((test) => {
		if (test.course === courseId) {
			testList.push(test)
		}
	})

	if (showTest === false){
		if (lessonList.length === 0) {
			body = (
				<div className={cx('list_lessons')}>
					<h1>Lesson</h1>
					<span>No lesson posted.</span>
				</div>
			)
		} else {
			body = (
				<div className={cx('list_lessons')}>
					<h1>Lessons</h1>
					{lessonList.map((lesson) => {
						if (lesson.course === courseId) {
							return <LessonItem key={lesson._id} data={lesson} />
						}
					})}
				</div>
			)
		}
	} else{
		if (testList.length === 0) {
			testBody = (
				<div className={cx('list_lessons')}>
					<h1>Test</h1>
					<span>No test posted.</span>
				</div>
			)
		} else {
			testBody = (
				<div className={cx('list_lessons')}>
					<h1>Test</h1>

					{testList.map((test, index) => {
						if (test.course === courseId) {

							return (
								<Fragment>
									<TestItem key={test._id} data={test} />
								</Fragment>
							)

						}

					})}
				</div>
			)
		}
	}



	return (
		<div>

			{intro}

			{body}

			{testBody}

		</div>
	);
}

export default Lesson;
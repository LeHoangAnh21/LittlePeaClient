import { LessonContext } from '~/actions/context/LessonContext';
import { CourseContext } from '~/actions/context/CourseContext';
import { TestContext } from '~/actions/context/TestContext';
import { Fragment, useContext, useEffect, useState } from 'react';
import LessonItem from '~/component/LessonItem';
import classNames from 'classnames/bind';
import styles from './Lesson.module.scss'
import { Link, useParams } from 'react-router-dom';
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
	let posterId = null

	if(courses !== null){
		intro = (
			<div className={cx('intro')}>
				{courses.map((course) => {
					if(courseId === course._id){
						posterId = course.user
						return (
							<Fragment>
								<div className={cx('title_course')}>
									<span>{course.name}</span>
								</div>
								<div className={cx('description_course')}>
									<span>{course.description || 'None'}</span>
								</div>
								<div className={cx('option')}>
									{showTest === false ? 
										<Button
											className={cx('add-lesson')}
											onClick={() => setShowTest(true)}
										>
											Completed
										</Button>
										:
										<Button
											className={cx('add-lesson')}
											onClick={() => setShowTest(false)}
										>
											Back
										</Button>
									}

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

	let offer = null
	let offerList = []

	console.log(posterId);

	if (courses !== null && posterId !== null) {
		courses.map((course) => {
			if (course.user === posterId && course._id !== courseId && course.status === 'Public'){
				offerList.push(course)
			}
		})
	}

	if (offerList.length !== 0) {
		offer = (
			<div className={cx('offer')}>
				<span className={cx('offer-title')}>Courses with the same author:</span>

				{offerList.map(offerListItem => {
					return (
						<Link to={`/courses/${offerListItem._id}`}>
							<span className={cx('offer-course-title')}>{offerListItem.name}</span>
						</Link>
					)
				})}
			</div>
		)
	} else {
		offer = (
			<div className={cx('offer')}>
				<span className={cx('offer-title')}>Courses with the same author:</span>
				<span className={cx('offer-course-title')}>The author has no other courses.</span>
			</div>
		)
	}

	return (
		<div>

			{courses !== null && courses.map(course => {
				if (courseId === course._id){
					if(course.status === 'Public'){
						return (
							<div>
								{intro}
					
								{body}
					
								{testBody}
					
								{offer}
							</div>
						)
					} else {
						return <h1>This course has been hidden or deleted!</h1>
					}
				}
			})}


		</div>
	);
}

export default Lesson;
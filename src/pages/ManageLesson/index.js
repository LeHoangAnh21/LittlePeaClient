import { LessonContext } from '~/actions/context/LessonContext';
import { CourseContext } from '~/actions/context/CourseContext';
import { TestContext } from '~/actions/context/TestContext';
import { Fragment, useContext, useEffect, } from 'react';
import LessonItem from '~/component/LessonItem';
import classNames from 'classnames/bind';
import styles from './ManageLesson.module.scss'
import { useParams } from 'react-router-dom';
import ManageLessonItem from '~/component/ManageLessonItem';
import UpdateLesson from './UpdateLesson';
import DeleteLessonModal from './DeleteLesson';
import { Button } from 'react-bootstrap';
import AddTestModal from '../ManageTest/AddTest';
import ManagaTestItem from '~/component/ManageTestItem';

const cx = classNames.bind(styles)

function ManageLesson() {
	const { id } = useParams();

	const courseId = id;

	const {
		courseState: {courses },
	} = useContext(CourseContext)

	let intro = null

	if (courses !== null) {
		intro = (
			<div className={cx('intro')}>
				{courses.map((course) => {
					if (courseId === course._id) {
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
		lessonState: { lesson, lessons },
		getLessons,
		// showToast: { show, message, type },
		// setShowToast
	} = useContext(LessonContext)

	useEffect(() => {
		getLessons()
	}, [])

	let body = null
	let lessonList = [];

	// eslint-disable-next-line no-lone-blocks
	{lessons.map((lesson) => {
		if (lesson.course === courseId) {
			lessonList.push(lesson)
		}
	})}

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
				<Fragment>
					<h1>Lessons</h1>
					{lessonList.map((lesson) => {
						if (lesson.course === courseId) {
							return <ManageLessonItem key={lesson._id} data={lesson} />
						}
					})}
				</Fragment>
			</div>
		)
	}

	const {
		testState: { tests },
		setShowAddTestModal,
		getTest,
		// showToast: { show, message, type },
		// setShowToast
	} = useContext(TestContext)

	useEffect(() => {
		getTest()
	}, [])

	let test = null;
	let testList = [];

	// eslint-disable-next-line no-lone-blocks
	{tests.map((test) => {
		if (test.course === courseId) {
			testList.push(test)
		}
	})}

	if (testList.length === 0) {
		test = (
			<div className={cx('list_lessons')}>
				<h1>Test</h1>
				<span>No test posted.</span>
			</div>
		)
	} else {
		test = (
			<div className={cx('list_lessons')}>
				<Fragment>
					<h1>Test</h1>
					{testList.map((test) => {
						if (test.course === courseId) {
							return <ManagaTestItem key={test._id} data={test} />
						}
					
					})}
				</Fragment>
			</div>
		)
	}

	return (
		<div>

			{intro}

			<div className={cx('option')}>

				<Button
					className={cx('add-test')}
					onClick={setShowAddTestModal.bind(this, true)}
				>
					Add Test
				</Button>

			</div>

			<div className={cx('body')}>
				{body}
				<div className={cx('empty')}></div>
			</div>

			<div className={cx('body')}>
				{test}
			</div>

			{lesson !== null && <UpdateLesson />}

			{lesson !== null && <DeleteLessonModal />}

			<AddTestModal courseId={courseId} />

		</div>
	);
}

export default ManageLesson;
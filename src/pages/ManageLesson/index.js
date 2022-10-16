import { LessonContext } from '~/actions/context/LessonContext';
import { CourseContext } from '~/actions/context/CourseContext';
import { TestContext } from '~/actions/context/TestContext';
import { QuestionContext } from '~/actions/context/QuestionContext';
import { Fragment, useContext, useEffect, } from 'react';
import classNames from 'classnames/bind';
import styles from './ManageLesson.module.scss'
import { useParams } from 'react-router-dom';
import ManageLessonItem from '~/component/ManageLessonItem';
import UpdateLesson from './UpdateLesson';
import DeleteLessonModal from './DeleteLesson';
import { Button } from 'react-bootstrap';
import AddTestModal from '../ManageTest/AddTest';
import ManagaTestItem from '~/component/ManageTestItem';
import DeleteTestModal from '../ManageTest/DeleteTest';
import UpdateTest from '../ManageTest/UpdateTest';
import AddQuestionModal from '../Q&A/AddQuestion';
import UpdateQuestion from '../Q&A/UpdateQuestion';
import DeleteQuestionModal from '../Q&A/DeleteQuestion';
import { AnswerContext } from '~/actions/context/AnswerContext';
import { AuthContext } from '~/actions/context/AuthContext';
import AddAnswerModal from '~/pages/Q&A/AddAnswer';
import UpdateAnswer from '~/pages/Q&A/UpdateAnswer';
import DeleteAnswerModal from '../Q&A/DeleteAnswer';

const cx = classNames.bind(styles)

function ManageLesson() {

	const {
		authState: { user: { _id, role } },
	} = useContext(AuthContext)

	const {
		answerState: { answer, answers },
		getAnswer,
	} = useContext(AnswerContext)

	useEffect(() => {
		getAnswer()
	}, [])


	const { id } = useParams();

	const {
		questionState: { question },
		getQuestions,
	} = useContext(QuestionContext)

	useEffect(() => {
		getQuestions()
	}, [])

	const courseId = id;

	const {
		courseState: {courses },
	} = useContext(CourseContext)

	let intro = null

	if(role !== 'creator') {
		intro = (
			<h1>Access denied</h1>
		)
	}else{
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
	}


	const {
		lessonState: { lesson, lessons },
		getLessons,
		// showToast: { show, message, type },
		// setShowToast
	} = useContext(LessonContext)

	useEffect(() => {
		getLessons()
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	let body = null
	let lessonList = []

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
				<h1>Lessons</h1>
				{lessonList.map((lesson) => {
					if (lesson.course === courseId) {
						return <ManageLessonItem key={lesson._id} data={lesson} />
					}
				})}
			</div>
		)
	}

	const {
		testState: { test, tests },
		setShowAddTestModal,
		getTest,
	} = useContext(TestContext)

	useEffect(() => {
		getTest()
	}, [])

	let testBody = null;
	let testList = [];

	// eslint-disable-next-line no-lone-blocks
	{tests.map((test) => {
		if (test.course === courseId) {
			testList.push(test)
		}
	})}

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
				<Fragment>
					<h1>Test</h1>
					{testList.map((test) => {
						if (test.course === courseId) {
							return <ManagaTestItem key={test.id} data={test} />
						}
					
					})}
				</Fragment>
			</div>
		)
	}

	return (
		<div>

			{courses.map(course => {

				let userId = null

				if(course._id === id){
					userId = course.user

					if (userId !== _id) {
						return <h1>Access denied</h1>
					} else {
						return (
							<Fragment>
								{intro}

								{role === 'creator' &&
									<Fragment>
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
											{testBody}
										</div>

										{lesson !== null && <UpdateLesson />}

										{lesson !== null && <DeleteLessonModal />}

										<AddTestModal />

										{test !== null && <DeleteTestModal />}

										{test !== null && <UpdateTest />}

										<AddQuestionModal />

										{question !== null && <UpdateQuestion />}

										{question !== null && <DeleteQuestionModal />}

										{test !== null && <AddAnswerModal />}

										{answer !== null && <UpdateAnswer />}

										{answer !== null && <DeleteAnswerModal />}

									</Fragment>
								}
							</Fragment>
						)

					}
				}

			})}


		</div>
	);
}

export default ManageLesson;
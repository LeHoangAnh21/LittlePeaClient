import { useContext, useState, useEffect, Fragment, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from "./TestItem.module.scss";
import DescriptionIcon from '@material-ui/icons/Description';
import ArrowDropDownTwoToneIcon from '@material-ui/icons/ArrowDropDownTwoTone';
import CloseIcon from '@material-ui/icons/Close';
import { PointContext } from '~/actions/context/PointContext';
import { QuestionContext } from '~/actions/context/QuestionContext';
import { AnswerContext } from '~/actions/context/AnswerContext';
import { AuthContext } from '~/actions/context/AuthContext';
import Button from 'react-bootstrap/Button';
import { CToast, CToastHeader, CToastBody, CToaster, CButton, CToastClose } from '@coreui/bootstrap-react'

import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'

const cx = classNames.bind(styles)

function TestItem({ data }) {

	const {
		authState: { user: {_id} }
	} = useContext(AuthContext)

	const [hidden, setHidden] = useState(true);
	const [show, setShow] = useState(false);
	const handleClick = () => {
		setHidden(!hidden);
		setShow(!show);
	};

	const {
		questionState: { questions },
		getQuestions,
	} = useContext(QuestionContext)

	useEffect(() => {
		getQuestions()
	}, [])

	const {
		answerState: { answers },
		getAnswer,
	} = useContext(AnswerContext)

	useEffect(() => {
		getAnswer()
	}, [])

	let numberQuestion = 0;

	const [finalResult, setFinalResult] = useState(false);
	const [score, setScore] = useState(0)
	let [currentQuestion, setCurrentQuestion] = useState(0)
	const [answerTrue, setAnswerTrue] = useState(null)

	const Welcome = cx({
		'null': true,
		'display': answerTrue === null,
	})

	const True = cx({
		'true': true, 
		'display': answerTrue === true,
	})

	const False = cx({
		'false': true,
		'display': answerTrue === false,
	})

	const Restart = cx({
		'restart': true,
		'display': answerTrue === 0,
	})


	const [toast, addToast] = useState(0)
	const toaster = useRef()
	
	const exampleToast = (
		<CToast autohide={true} visible={true} color="info" className="text-white align-items-center">
			<div className="d-flex">
				<CToastBody>
					<span className={True}>Question {currentQuestion}, Correct!</span>
					<span className={False}>Question {currentQuestion}, Incorrect!</span>
					<span className={Welcome}>Let's just do a test!</span>
					<span className={Restart}>Let's do it again!</span>
				</CToastBody>
				<CToastClose className="me-2 m-auto" />
			</div>
		</CToast>
	)

	const answerClick = (isTrue) => {

		if (isTrue === 'true') {
			setScore(score + 1)
			setAnswerTrue(true)
		} else {
			setAnswerTrue(false)
			setScore(score + 0)
		}

		if (currentQuestion + 1 < data.Question) {
			setCurrentQuestion(currentQuestion + 1)
		} else {
			setCurrentQuestion(currentQuestion + 1)
			setFinalResult(true)
		}
	}

	const restartTest = () => {
		setScore(0)
		setFinalResult(false)
		setCurrentQuestion(0)
		setAnswerTrue(0)
	}

	const {
		pointState: { points },
		getPoints,
		showAddPointModal,
		setShowAddPointModal,
		addPoint,
		findPointId,
	} = useContext(PointContext)
	
	useEffect(() => {
		getPoints()
	}, [])
	
	let PointOfCourse = {}

	let ListPointOfCourse = []
	
	const scoreFinal = (100 / data.Question) * score

	points.map(pointlist => {
		if (pointlist.course === data.course){
			ListPointOfCourse.push(pointlist)
		}
	})

	ListPointOfCourse.map(IdOfUser => {
		if (IdOfUser.user === _id){
			PointOfCourse = IdOfUser
		}
	})

	const questionsList = []

	questions.map(question => {
		if (question.test === data._id) {
			questionsList.push(question)
		}
	})

	console.log(questionsList);

	// State
	const [newPoint, setNewPoint] = useState({
		point: scoreFinal + ' / 100',
		course: data.course,
	})

	useEffect(() => setNewPoint({ point: scoreFinal + ' / 100', course: data.course }), [score])

	const { point, course } = newPoint

	const onChangeNewPoint = (e) =>
		setNewPoint({ ...newPoint, [e.target.name]: e.target.value })

	const closeModal = () => {
		resetAddPointData()
	}

	const onSubmit = async event => {
		event.preventDefault()
		const { success, message } = await addPoint(newPoint)
		resetAddPointData()
		// setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
	}

	const resetAddPointData = () => {
		setNewPoint({ point: '', course: data.course })
		setShowAddPointModal(false)
	}

	useEffect(() => {
		addToast(exampleToast)
	}, [currentQuestion])

	let body = null
	
	if (PointOfCourse && PointOfCourse.user === _id) {
		body = (
			<Fragment>
				<div className={cx('result-component')}>
					<span className={cx('result-title')}>Final Result</span>
					<span className={cx('result')}>Your point: {PointOfCourse.point}</span>
				</div>
				<div>
					{questions.map((question) => {

						if (question.test === data._id) {

							numberQuestion = numberQuestion + 1

							return (
								<div className={cx('question-component')}>
									<div className={cx('question-header')}>
										<span className={cx('question-number')}>
											Question {numberQuestion} out of {data.Question}
										</span>
									</div>

									<span className={cx('question')}>
										{question.title}
									</span>

									<ul className={cx('answer')}>
										{answers.map(answer => {
											if (answer.questionId === question._id) {
												return (
													<Fragment>

														<li className={cx('answer-item', { show: show })} key={answer._id}>
															{answer.title}
														</li>

													</Fragment>
												)
											}
										})}
									</ul>
								</div>
							)

						}
					})}
				</div>
			</Fragment>
		)
	} else {
		if (finalResult) {
			body = (
				<div className={cx('result-component')}>
					<span className={cx('result-title')}>Final Result</span>
					<span className={cx('result')}>{score} out of {data.Question} correct</span>
					<span className={cx('result')}>Your point: {point}</span>

					<Form onSubmit={onSubmit} >
						<Modal.Body>

						</Modal.Body>

						<div className={cx('result-button')}>

							<Button onClick={restartTest}>Restart test</Button>

							<Button variant='primary' type='submit'>
								Save result
							</Button>

						</div>

					</Form>
				</div>
			)
		} else {
			body = (
				<div>

					{questionsList.map((question, index) => {
							
						numberQuestion = numberQuestion + 1

						if (currentQuestion === index) {
							return (
								<div className={cx('question-component')}>
									<div className={cx('question-header')}>
										<span className={cx('question-number')}>
											Question {numberQuestion} out of {data.Question}
										</span>
									</div>

									<span className={cx('question')}>
										{question.title}
									</span>

									<ul className={cx('answer')}>
										{answers.map(answer => {
											if (answer.questionId === question._id) {
												return (
													<Fragment>

														<li className={cx('answer-item', { show: show })} key={answer._id} onClick={() => {
															answerClick(answer.isTrue)
														}}>
															{answer.title}
														</li>

													</Fragment>
												)
											}
										})}
									</ul>
								</div>
							)

						}
					})}
				</div>
			)
		}
	}

	return (
		<div className={cx('test-item')}>
			<div className={cx('title')}>
				<div className={cx('title-header')} onClick={handleClick}>
					<div>
						<DescriptionIcon className={cx('icon')} />
					</div>
					<span>{data.title}</span>
				</div>

				<div className={cx('title-footer')}>
					<div className={cx({ show: show })} >
						<ArrowDropDownTwoToneIcon className={cx('icon')} />
					</div>
					<div className={cx({ hidden: hidden })} >
						<CloseIcon className={cx('icon')} />
					</div>
				</div>
			</div>
			<div className={cx({hidden: hidden})}>
				<div className={cx('description')}>
					<span>{data.description || 'None'}</span>
				</div>

				{body}

				<CToaster ref={toaster} push={toast} answerTrue={answerTrue} placement="top-end" />

			</div>
		</div>
	);
}

export default TestItem;
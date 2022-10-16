import { useContext, useState, useEffect, Fragment, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from "./TestItem.module.scss";
import DescriptionIcon from '@material-ui/icons/Description';
import ArrowDropDownTwoToneIcon from '@material-ui/icons/ArrowDropDownTwoTone';
import CloseIcon from '@material-ui/icons/Close';
import { TestContext } from '~/actions/context/TestContext';
import { QuestionContext } from '~/actions/context/QuestionContext';
import { AnswerContext } from '~/actions/context/AnswerContext';
import Button from 'react-bootstrap/Button';
import { CToast, CToastHeader, CToastBody, CToaster, CButton, CToastClose } from '@coreui/bootstrap-react'

import Pagination from 'react-bootstrap/Pagination';

const cx = classNames.bind(styles)

function TestItem({ data }) {

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

	useEffect(() => {
		addToast(exampleToast)
	}, [currentQuestion])

	const restartTest = () => {
		setScore(0)
		setFinalResult(false)
		setCurrentQuestion(0)
		setAnswerTrue(0)
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

				{finalResult ? (
					<div className={cx('result-component')}>
						<span className={cx('result-title')}>Final Result</span>
						<span className={cx('result')}>{score} out of {data.Question} correct</span>
						<div className={cx('result-button')}>
							<Button onClick={restartTest}>Restart test</Button>
							<Button>Save result</Button>
						</div>
					</div>
				) : (

					<div>

						{questions.map((question, index) => {
	
							if (question.test === data._id) {
								
								numberQuestion = numberQuestion + 1

								if (currentQuestion === index){
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
													if (answer.question === question._id) {
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
							}
						})}
					</div>
				)}

				<CToaster ref={toaster} push={toast} answerTrue={answerTrue} placement="top-end" />

			</div>
		</div>
	);
}

export default TestItem;
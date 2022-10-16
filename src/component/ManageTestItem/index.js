
import { useContext, useState, useEffect, Fragment } from 'react';
import classNames from 'classnames/bind';
import styles from "./ManageTestItem.module.scss";
import DescriptionIcon from '@material-ui/icons/Description';
import Button from 'react-bootstrap/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import { TestContext } from '~/actions/context/TestContext';
import { QuestionContext } from '~/actions/context/QuestionContext';
import { AnswerContext } from '~/actions/context/AnswerContext';

const cx = classNames.bind(styles)

function ManagaTestItem({ data }) {

	const {
		getTest,
		findTestId,
		setShowUpdateTestModal,
		setShowDeleteTestModal,
	} = useContext(TestContext)

	useEffect(() => {
		getTest()
	}, [])

	const { 
		questionState: { questions },
		getQuestions,
		findQuestionId,
		setShowAddQuestionModal,
		setShowUpdateQuestionModal,
		setShowDeleteQuestionModal,
	} = useContext(QuestionContext)

	useEffect(() => {
		getQuestions()
	}, [])

	const {
		answerState: { answers },
		getAnswer,
		findAnswerId,
		setShowAddAnswerModal,
		setShowUpdateAnswerModal,
		setShowDeleteAnswerModal,
	} = useContext(AnswerContext)

	useEffect(() => {
		getAnswer()
	}, [])

	const [hidden, setHidden] = useState(true);
	
	const handleClick = () => {
		setHidden(!hidden)
	}

	const chooseTest = testId => {
		findTestId(testId)
		setShowUpdateTestModal(true)
	}

	const deleteTest = testId => {
		findTestId(testId)
		setShowDeleteTestModal(true)
	}

	const addQuestion = testId => {
		findTestId(testId)
		setShowAddQuestionModal(true)
	}

	const chooseQuestion = questionId => {
		findQuestionId(questionId)
		setShowUpdateQuestionModal(true)
	}

	const deleteQuestion = questionId => {
		findQuestionId(questionId)
		setShowDeleteQuestionModal(true)
	}

	const addAnswer = testId => {
		findTestId(testId)
		setShowAddAnswerModal(true)
	}

	const chooseAnswer = answerId => {
		findAnswerId(answerId)
		setShowUpdateAnswerModal(true)
	}

	const deleteAnswer = answerId => {
		findAnswerId(answerId)
		setShowDeleteAnswerModal(true)
	}

	let numberQuestion = 0;

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

					<Button className={cx('button_edit')} onClick={addQuestion.bind(this, data._id)}>
						Add Question
					</Button>

					<Button className={cx('button_edit')} onClick={chooseTest.bind(this, data._id)}>
						<EditIcon />
					</Button>

					<Button className={cx('button_delete')} onClick={deleteTest.bind(this, data._id)}>
						<DeleteIcon />
					</Button>
					
				</div>
			</div>
			<div className={cx({ hidden: hidden })}>
				<div className={cx('description')}>
					<span>{data.description || 'None'}</span>
				</div>

				{data.Question !== 0 && 
					<Button className={cx('button_edit')} onClick={addAnswer.bind(this, data._id)}>
						Add new answer
					</Button>
				}

				{questions.map((question) => {
					
					if(question.test === data._id){

						numberQuestion = numberQuestion + 1

						return (
							<div className={cx('question-component')}>
								<div className={cx('question-header')}>
									<span className={cx('question-number')}>
										Question {numberQuestion} out of {data.Question}
									</span>

									<div>
										<Button className={cx('button_edit')} onClick={chooseQuestion.bind(this, question._id)}>
											<EditIcon />
										</Button>

										<Button className={cx('button_delete')} onClick={deleteQuestion.bind(this, question._id)}>
											<DeleteIcon />
										</Button>
									</div>

								</div>
	
								<span className={cx('question')}>
									{question.title}
								</span>
	
								<ul className={cx('answer')}>
									{answers.map(answer => {
										if (answer.question === question._id){

											return (
												<Fragment>
													<Fragment>
														<Button className={cx('button_edit')} onClick={chooseAnswer.bind(this, answer._id)}>
															<EditIcon />
														</Button>
		
														<Button className={cx('button_delete')} onClick={deleteAnswer.bind(this, answer._id)}>
															<DeleteIcon />
														</Button>
													</Fragment>

													<li className={cx('answer-item')} key={answer._id}>
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
		</div>
	);
}

export default ManagaTestItem;
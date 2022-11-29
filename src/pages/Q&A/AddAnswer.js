import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext, useState, useEffect } from 'react'
import { AnswerContext } from '~/actions/context/AnswerContext'
import { QuestionContext } from '~/actions/context/QuestionContext';
import { TestContext } from '~/actions/context/TestContext';
import { Fragment } from 'react'

const AddAnswerModal = () => {

	const {
		testState: { test },
		getTest,
	} = useContext(TestContext)

	useEffect(() => {
		getTest()
	}, [])

	const {
		questionState: { question, questions },
		getQuestions,
	} = useContext(QuestionContext)

	useEffect(() => {
		getQuestions()
	}, [])

	const { 
		answerState: { answers },
		getAnswer,
		showAddAnswerModal, 
		setShowAddAnswerModal, 
		addAnswer,
		setToastAnswer
	} = useContext(AnswerContext)

	const [checkIsTrue, setCheckIsTrue] = useState(false)

	// State
	const [newAnswer, setNewAnswer] = useState({
		title: '',
		isTrue: '',
		questionId: question._id
	})

	useEffect(() => {
		setNewAnswer({
			title: '',
			isTrue: '',
			questionId: question._id
		})
	}, [question])

	const { title, isTrue, questionId } = newAnswer

	const onChangeNewAnswer = (e) =>
		setNewAnswer({ ...newAnswer, [e.target.name]: e.target.value })

	const closeModal = () => {
		resetAddAnswerData()
	}

	const onSubmit = async event => {
		event.preventDefault()
		const { success, messageAnswer } = await addAnswer(newAnswer)
		resetAddAnswerData()
		setToastAnswer({ showToastAnswer: true, messageAnswer, typeToastAnswer: success ? 'success' : 'danger' })
	}

	const resetAddAnswerData = () => {
		if (checkIsTrue === false) {
			setNewAnswer({ title: '', isTrue: '', questionId: question._id })
		} else {
			setNewAnswer({ title: '', isTrue: 'false', questionId: question._id })
		}
		setShowAddAnswerModal(false)
	}

	console.log(checkIsTrue);

	useEffect(() => {
		getAnswer()
	}, [])

	useEffect(() => {
		setCheckIsTrue(false)
	}, [newAnswer])
	
	useEffect(() => {
		answers.map((answer) => {
			if (answer.questionId === question._id){
				if (answer.isTrue === 'true') {
					setCheckIsTrue(true)
				}
			} 
		})
	}, [newAnswer])

	return (
		<Modal show={showAddAnswerModal} onHide={closeModal}>

			<Modal.Header closeButton>
				<Modal.Title>ADD Answer</Modal.Title>
			</Modal.Header>

			<Form onSubmit={onSubmit} >
				<Modal.Body>
					<Form.Group>

						<Form.Control
							type='text'
							placeholder='Title (*Required)'
							name='title'
							required
							aria-describedby='title-help'
							value={title}
							onChange={onChangeNewAnswer}
						/>

					</Form.Group><br />

					<Form.Group>

						{checkIsTrue === false && 
							<Fragment>
								<Form.Check
									value="true"
									name='isTrue'
									type="radio"
									aria-label="radio 1"
									label="True"
									onChange={onChangeNewAnswer}
								/>
							</Fragment>
						}

						<Form.Check
							value="false"
							name='isTrue'
							type="radio"
							aria-label="radio 2"
							label="False"
							onChange={onChangeNewAnswer}
						/>

					</Form.Group><br />
					
					{checkIsTrue === true &&
						<Form.Label>
							You added a correct answer earlier. You can only add one correct answer.
						</Form.Label>
					}

				</Modal.Body>

				<Modal.Footer>

					<Button variant='secondary' onClick={closeModal} >
						Cancel
					</Button>

					<Button variant='primary' type='submit'>
						Submit
					</Button>

				</Modal.Footer>

			</Form>

		</Modal>
	)
}

export default AddAnswerModal;

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext, useState, useEffect } from 'react'
import { AnswerContext } from '~/actions/context/AnswerContext'
import { QuestionContext } from '~/actions/context/QuestionContext';
import { TestContext } from '~/actions/context/TestContext';

const AddAnswerModal = () => {

	const {
		testState: { test },
		getTest,
	} = useContext(TestContext)

	useEffect(() => {
		getTest()
	}, [])

	const {
		questionState: { questions },
		getQuestions,
	} = useContext(QuestionContext)

	useEffect(() => {
		getQuestions()
	}, [])

	const { 
		showAddAnswerModal, 
		setShowAddAnswerModal, 
		addAnswer,
	} = useContext(AnswerContext)

	// State

	const [newAnswer, setNewAnswer] = useState({
		title: '',
		isTrue: '',
		question: '',
	})

	const { title, isTrue, question, } = newAnswer

	const onChangeNewAnswer = (e) =>
		setNewAnswer({ ...newAnswer, [e.target.name]: e.target.value })

	const closeModal = () => {
		resetAddAnswerData()
	}

	const onSubmit = async event => {
		event.preventDefault()
		const { success, message } = await addAnswer(newAnswer)
		resetAddAnswerData()
		// setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
	}

	const resetAddAnswerData = () => {
		setNewAnswer({ title: '', isTrue: '', question: ''})
		setShowAddAnswerModal(false)
	}

	const questionFit = []

	// eslint-disable-next-line no-lone-blocks
	{questions.map(question => {
		if(question.test === test._id){
			questionFit.push(question)
		}
	})}

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

						<Form.Control
							as='select'
							name='isTrue'
							value={isTrue}
							onChange={onChangeNewAnswer}
							placeholder='Option'
						>
							<option selected>True or False</option>
							<option value="true" key="true">True</option>
							<option value="false" key="false">False</option>
						</Form.Control>

					</Form.Group><br />

					<Form.Group>

						<Form.Control
							as='select'
							name='question'
							value={question}
							onChange={onChangeNewAnswer}
						>
							<option>Question</option>
							{questionFit.map((question) => (
								<option value={question._id} key={question._id}>{question.title}</option>
							))}
						</Form.Control>

					</Form.Group><br />

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
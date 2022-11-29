import { QuestionContext } from '~/actions/context/QuestionContext';
import { TestContext } from '~/actions/context/TestContext'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext, useState, useEffect } from 'react'

const UpdateQuestion = () => {

	const {
		testState: { tests },
		getTest,
	} = useContext(TestContext)

	useEffect(() => {
		getTest()
	}, [])

	const {
		questionState: { question },
		updateQuestion,
		showUpdateQuestionModal,
		setShowUpdateQuestionModal,
		setToastQuestion
	} = useContext(QuestionContext)

	// State
	const [updatedQuestion, setUpdatedQuestion] = useState(question)

	useEffect(() => setUpdatedQuestion(question), [question])

	const { title, test } = updatedQuestion

	const onUpdateQuestion = (e) =>
		setUpdatedQuestion({ ...updatedQuestion, [e.target.name]: e.target.value })

	const closeModal = () => {
		setUpdatedQuestion(question)
		setShowUpdateQuestionModal(false)
	}

	const onSubmit = async event => {
		event.preventDefault()
		const { success, messageQuestion } = await updateQuestion(updatedQuestion)
		setShowUpdateQuestionModal(false)
		setToastQuestion({ showToastQuestion: true, messageQuestion, typeToastQuestion: success ? 'success' : 'danger' })
	}

	return (
		<Modal show={showUpdateQuestionModal} onHide={closeModal}>

			<Modal.Header closeButton>
				<Modal.Title>UPDATE Question</Modal.Title>
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
							onChange={onUpdateQuestion}
						/>

					</Form.Group><br />

					<Form.Group>

						<Form.Control
							as='select'
							name='test'
							value={test}
							onChange={onUpdateQuestion}
							disabled
						>
							<option>Choose Test</option>
							{tests.map((test) => (
								<option value={test._id} key={test._id}>{test.title}</option>
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

export default UpdateQuestion;
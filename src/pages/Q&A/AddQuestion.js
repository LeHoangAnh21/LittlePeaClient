import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext, useState, useEffect } from 'react'
import { QuestionContext } from '~/actions/context/QuestionContext'
import { TestContext } from '~/actions/context/TestContext';
import { useParams } from 'react-router-dom'

const AddQuestionModal = () => {

	const { id } = useParams();

	const courseId = id;

	const {
		testState: { tests },
		getTest,
	} = useContext(TestContext)

	useEffect(() => {
		getTest()
	}, [])

	const { 
		showAddQuestionModal, 
		setShowAddQuestionModal, 
		addQuestion,
		setToastQuestion	
	} = useContext(QuestionContext)

	let testId

	tests.map(test => {
		if (test.course === courseId) {
			testId = test._id
		}
	})

	// State

	const [newQuestion, setNewQuestion] = useState({
		title: '',
		test: testId,
	})

	useEffect(() => setNewQuestion({ title: '', test: testId }), [testId])
	
	const { title, test } = newQuestion
	// console.log(test);

	const onChangeNewQuestion = (e) =>
		setNewQuestion({ ...newQuestion, [e.target.name]: e.target.value })

	const closeModal = () => {
		resetAddQuestionData()
	}

	const onSubmit = async event => {
		event.preventDefault()
		const { success, messageQuestion } = await addQuestion(newQuestion)
		resetAddQuestionData()
		setToastQuestion({ showToastQuestion: true, messageQuestion, typeToastQuestion: success ? 'success' : 'danger' })
	}

	const resetAddQuestionData = () => {
		setNewQuestion({ title: '', test: testId, })
		setShowAddQuestionModal(false)
	}

	return (
		<Modal show={showAddQuestionModal} onHide={closeModal}>

			<Modal.Header closeButton>
				<Modal.Title>ADD Question</Modal.Title>
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
							onChange={onChangeNewQuestion}
						/>

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

export default AddQuestionModal;
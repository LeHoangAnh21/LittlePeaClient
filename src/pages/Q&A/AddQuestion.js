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
	} = useContext(QuestionContext)

	// State

	const [newQuestion, setNewQuestion] = useState({
		title: '',
		test: '',
	})

	const { title, test } = newQuestion

	const onChangeNewQuestion = (e) =>
		setNewQuestion({ ...newQuestion, [e.target.name]: e.target.value })

	const closeModal = () => {
		resetAddQuestionData()
	}

	const onSubmit = async event => {
		event.preventDefault()
		const { success, message } = await addQuestion(newQuestion)
		resetAddQuestionData()
		// setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
	}

	const resetAddQuestionData = () => {
		setNewQuestion({ title: '', test: '', })
		setShowAddQuestionModal(false)
	}

	const testList = [];

	// eslint-disable-next-line no-lone-blocks
	{tests.map(test => {
		if (test.course === courseId) {
			testList.push(test)
		}
	})}

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

					<Form.Group>

						<Form.Control
							as='select'
							name='test'
							value={test}
							onChange={onChangeNewQuestion}
						>
							<option>Choose Test</option>
							{testList.map((test) => (
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

export default AddQuestionModal;
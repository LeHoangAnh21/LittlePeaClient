import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext, useState, useEffect } from 'react'
import { QuestionContext } from '~/actions/context/QuestionContext'

const DeleteQuestionModal = () => {

	const {
		questionState: { question },
		deleteQuestion,
		showDeleteQuestionModal,
		setShowDeleteQuestionModal,
	} = useContext(QuestionContext)

	// State
	const [deletedQuestion, setDeletedQuestion] = useState(question)

	useEffect(() => setDeletedQuestion(question), [question])

	const closeModal = () => {
		setShowDeleteQuestionModal(false)
	}

	const onSubmit = async event => {
		event.preventDefault()
		setShowDeleteQuestionModal(false)
	}

	return (
		<Modal show={showDeleteQuestionModal} onHide={closeModal}>

			<Modal.Header closeButton>
				<Modal.Title>Are you sure you want to delete this Question?</Modal.Title>

			</Modal.Header>

			<Form onSubmit={onSubmit} >

				<Modal.Body>
					<h4>Question title: {question.title}</h4>
				</Modal.Body>

				<Modal.Footer>

					<Button variant='secondary' onClick={closeModal} >
						No
					</Button>

					<Button variant='primary' type='submit' onClick={deleteQuestion.bind(this, question._id)}>
						Yes
					</Button>

				</Modal.Footer>

			</Form>

		</Modal>
	)
}

export default DeleteQuestionModal;


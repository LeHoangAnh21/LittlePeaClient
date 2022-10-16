import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext, useState, useEffect } from 'react'
import { AnswerContext } from '~/actions/context/AnswerContext'

const DeleteAnswerModal = () => {

	const {
		answerState: { answer },
		deleteAnswer,
		showDeleteAnswerModal,
		setShowDeleteAnswerModal,
	} = useContext(AnswerContext)

	// State
	const [deletedAnswer, setDeletedAnswer] = useState(answer)

	useEffect(() => setDeletedAnswer(answer), [answer])

	const closeModal = () => {
		setShowDeleteAnswerModal(false)
	}

	const onSubmit = async event => {
		event.preventDefault()
		setShowDeleteAnswerModal(false)
	}

	return (
		<Modal show={showDeleteAnswerModal} onHide={closeModal}>

			<Modal.Header closeButton>
				<Modal.Title>Are you sure you want to delete this Answer?</Modal.Title>

			</Modal.Header>

			<Form onSubmit={onSubmit} >

				<Modal.Body>
					<h4>Answer title: {answer.title}</h4>
				</Modal.Body>

				<Modal.Footer>

					<Button variant='secondary' onClick={closeModal} >
						No
					</Button>

					<Button variant='primary' type='submit' onClick={deleteAnswer.bind(this, answer._id)}>
						Yes
					</Button>

				</Modal.Footer>

			</Form>

		</Modal>
	)
}

export default DeleteAnswerModal;


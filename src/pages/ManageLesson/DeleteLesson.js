import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext, useState, useEffect } from 'react'
import { LessonContext } from '~/actions/context/LessonContext'

const DeleteLessonModal = () => {

	const {
		lessonState: { lesson, },
		deleteLesson,
		showDeleteLessonModal,
		setShowDeleteLessonModal,
	} = useContext(LessonContext)

	// State
	const [deletedLesson, setDeletedLesson] = useState(lesson)

	useEffect(() => setDeletedLesson(lesson), [lesson])

	const closeModal = () => {
		setShowDeleteLessonModal(false)
	}

	const onSubmit = async event => {
		event.preventDefault()
		setShowDeleteLessonModal(false)
	}

	return (
		<Modal show={showDeleteLessonModal} onHide={closeModal}>

			<Modal.Header closeButton>
				<Modal.Title>Are you sure you want to delete this Lesson?</Modal.Title>

			</Modal.Header>

			<Form onSubmit={onSubmit} >

				<Modal.Body>
					<h4>Lesson title: {lesson.title}</h4>
				</Modal.Body>

				<Modal.Footer>

					<Button variant='secondary' onClick={closeModal} >
						No
					</Button>

					<Button variant='primary' type='submit' onClick={deleteLesson.bind(this, lesson._id)}>
						Yes
					</Button>

				</Modal.Footer>

			</Form>

		</Modal>
	)
}

export default DeleteLessonModal;


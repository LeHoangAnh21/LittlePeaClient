import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext, useState, useEffect } from 'react'
import { CourseContext } from '~/actions/context/CourseContext'

const DeleteCourseModal = () => {

	const {
		courseState: { course, },
		deleteCourse,
		showDeleteCourseModal,
		setShowDeleteCourseModal,
	} = useContext(CourseContext)

	// State
	const [deletedCourse, setDeletedCourse] = useState(course)

	useEffect(() => setDeletedCourse(course), [course])

	const closeModal = () => {
		setShowDeleteCourseModal(false)
	}

	const onSubmit = async event => {
		event.preventDefault()
		setShowDeleteCourseModal(false)
	}

	return (
		<Modal show={showDeleteCourseModal} onHide={closeModal}>

			<Modal.Header closeButton>
				<Modal.Title>Are you sure you want to delete this course?</Modal.Title>

			</Modal.Header>

			<Form onSubmit={onSubmit} >

				<Modal.Body>
					<h4>Course title: {course.name}</h4>
				</Modal.Body>

				<Modal.Footer>

					<Button variant='secondary' onClick={closeModal} >
						No
					</Button>

					<Button variant='primary' type='submit' onClick={deleteCourse.bind(this, course._id)}>
						Yes
					</Button>

				</Modal.Footer>

			</Form>

		</Modal>
	)
}

export default DeleteCourseModal;



import { LessonContext } from '~/actions/context/LessonContext';
import { CourseContext } from '~/actions/context/CourseContext'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext, useState, useEffect } from 'react'

const UpdateLesson = () => {

	const {
		courseState: { courses, },
		getCourses,
	} = useContext(CourseContext)

	useEffect(() => {
		getCourses()
	}, [])

	const {
		lessonState: { lesson, lessons, lessonsLoading },
		updateLesson,
		showUpdateLessonModal,
		setShowUpdateLessonModal,
		// showToast: { show, message, type },
		// setShowToast
	} = useContext(LessonContext)

	// State
	const [updatedLesson, setUpdatedLesson] = useState(lesson)

	useEffect(() => setUpdatedLesson(lesson), [lesson])

	const { title, description, videoId, course } = updatedLesson

	const onUpdateLesson = (e) =>
		setUpdatedLesson({ ...updatedLesson, [e.target.name]: e.target.value })

	const closeModal = () => {
		setUpdatedLesson(lesson)
		setShowUpdateLessonModal(false)
	}

	const onSubmit = async event => {
		event.preventDefault()
		const { success, message } = await updateLesson(updatedLesson)
		setShowUpdateLessonModal(false)
		// setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
	}

	console.log(lesson._id);

	return (
		<Modal show={showUpdateLessonModal} onHide={closeModal}>

			<Modal.Header closeButton>
				<Modal.Title>UPDATE LESSON</Modal.Title>
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
							onChange={onUpdateLesson}
						/>

					</Form.Group><br />

					<Form.Group>

						<Form.Control
							as='textarea'
							rows={5}
							placeholder='Description'
							name='description'
							value={description}
							onChange={onUpdateLesson}
						/>

					</Form.Group><br /><br />

					<Form.Group>

						<Form.Control
							type='text'
							placeholder='Video ID'
							name='videoId'
							aria-describedby='title-help'
							value={videoId}
							onChange={onUpdateLesson}
						/>

					</Form.Group><br />

					<Form.Group>
						<Form.Control
							as='select'
							value={course}
							name='course'
							onChange={onUpdateLesson}
							disabled
						>
							<option>Course</option>
							{courses.map((course) => (
								<option value={course._id} key={course._id}>{course.name}</option>
							))}

						</Form.Control>
					</Form.Group>

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

export default UpdateLesson;